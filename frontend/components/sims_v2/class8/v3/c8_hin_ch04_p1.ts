import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch04_p1: SimDef = {
    id: 'v3_c8_hin_ch04_p1',
    title: 'पाठ 4 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 4 के रचनाकार परिचय, लेखन की पृष्ठभूमि (काल, समाज, राजनीति) और रचनाकार की.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 4 · Part 1/3',
    chapters: ['c8_hin_ch04'],
    nodeIds: ['c8_hin_cbse_04_001', 'c8_hin_cbse_04_002', 'c8_hin_cbse_04_003', 'c8_hin_cbse_04_004', 'c8_hin_cbse_04_005', 'c8_hin_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करें आप एक नई वेब सीरीज़ देखने बैठे हैं — आप सबसे पहले क्या करते हैं?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पाठ 4 की कहानी में, लेखक ने बारिश का वर्णन केवल मौसम बताने के लिए नहीं किया होगा। बारिश के संवेदी विवरण (आवाज़, गंध, स्पर्श) किस **विशिष्ट भावना** को जन्म देते.',
        options: ['**Correct answer:** बारिश की \'टप-टप\' आवाज़, भीगी मिट्टी की गंध, और ठंडक', 'rain sound, wet smell', 'atmosphere = adjectives'],
        answer: '**Correct answer:** बारिश की \'टप-टप\' आवाज़, भीगी मिट्टी की गंध, और ठंडक',
        hook: '**Specific error:** Students believe "atmosphere = adjectives." They underline words like *सुंदर, भयानक, शांत, गर्म*.',
    },
    teaching: [
        { title: 'पाठ 4 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक संदर्भ, रचनाकार के व्यक्तित्व, विचारधारा और साहित्यिक योगदान को जानकर पाठ की पूर्व-समझ (प्री-अंडरस्टैंडिंग).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — पृष्ठभूमि', 'पाठ 4 — कथानक', 'पाठ 4 — पाठ्य-परिवेश', 'पाठ 4 — पात्र-चित्रण', 'पाठ 4 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_04_003', title: 'पाठ 4 — पाठ्य-परिवेश और वातावरण',
          caseStudy: { intro: 'Think of a time you entered a room and *immediately* knew something was wrong — maybe the air felt heavy, or everyone went quiet. That\'s atmosphere.',
            decisions: [{ prompt: 'पाठ्य-परिवेश (setting) और वातावरण (atmosphere) में मूल अंतर क्या है? एक वाक्य में स्पष्ट कीजिए।', options: [
                { text: '**Correct answer:** पाठ्य-परिवेश कहानी का \'कहाँ और कब\' (भौतिक/सामाजिक संदर्भ) है, जबकि', outcome: '**Correct answer:** पाठ्य-परिवेश कहानी का \'कहाँ और कब\' (भौतिक/सामाजिक संदर्भ) है, जबकि वातावरण लेखक.' },
                { text: 'setting is place, atmosphere is mood', outcome: 'Not quite — **Specific error:** Students believe "atmosphere = adjectives." They underline words like *सुंदर.', reveals: 'specific-error-students-believe-atmosphere' },
                { text: 'atmosphere = adjectives', outcome: 'Not quite — **Specific error:** Students believe "atmosphere = adjectives." They underline words like *सुंदर.', reveals: 'specific-error-students-believe-atmosphere' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_04_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल.',
          hint: 'यदि अटका हुआ लगे, तो \'विचारधारा\' शब्द को दैनिक जीवन से जोड़ें: "जैसे तुम्हारे घर में कोई.',
          misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — रचनाकार का जन्म, मृत्यु, शिक्षा, पुरस्कार और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in', 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है कहानी के मुख्य पात्र के व्यवहार, बोलचाल, विचार'],
                  hint: 'यदि अटका हुआ लगे, तो \'विचारधारा\' शब्द को दैनिक जीवन से जोड़ें: "जैसे तुम्हारे घर में कोई अंकल हमेशा.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — रचनाकार का जन्म, मृत्यु, शिक्षा, पुरस्कार और पुस्तकों की सूची रट लेना।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "रचनाकार का बायोडाटा बंद करो। एक कागज पर तीन कॉलम बनाओ: (क) रचनाकार के जीवन की 2 बड़ी चुनौतियाँ/अनुभव.', 'यदि फिर न बने, तो एक परिचित उदाहरण दो: "जैसे तुम्हारे पड़ोस के अंकल जो खुद गरीबी से पढ़े हैं, वे जब \'शिक्षा\' पर बोलते.', 'अंत में पाठ 4 का पहला पैराग्राफ पढ़कर पूछें: "यहां जो दर्द/गुस्सा/उम्मीद दिख रही है, वह रचनाकार के किस अनुभव से निकली.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा ७ पाठ २ या ३ की कथानक-संरचना अभ्यास शीट्स** दोबारा देखें.',
          misconception: '**विशिष्ट भ्रम:** छात्र **कथानक के चरणों** (आरंभ, उद्दीपन, उभार, चरमोत्कर्ष, समाधान) को **आख्यान-संरचना के प्रकार**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है',
                  options: ['कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in', 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है कहानी के मुख्य पात्र के व्यवहार, बोलचाल, विचार'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा ७ पाठ २ या ३ की कथानक-संरचना अभ्यास शीट्स** दोबारा देखें — विशेषकर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **कथानक के चरणों** (आरंभ, उद्दीपन, उभार, चरमोत्कर्ष, समाधान) को **आख्यान-संरचना के प्रकार** (रैखिक, फ्लैशबैक, इन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**दृश्य विभेद (Visual Differentiation):** छात्र से कहो — एक कहानी लो (जैसे "शेर और चूहा")। दो कॉलम बनाओ: बाएं **कथानक**.', '**कारण-प्रभाव तीर (Cause-Effect Arrows):** कथानक कॉलम में हर घटना के बीच → तीर खींचो और लिखो "क्यों?" (शेर ने क्यों.', '→ चूहे ने दया की भीख मांगी)। आख्यान-संरचना कॉलम में तीर नहीं, **संख्या** लिखो: १, २, ३...', '(पाठक ने पहले क्या पढ़ा?)। इससे **तार्किक क्रम** बनाम **प्रस्तुति क्रम** स्पष्ट होता है। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in which.',
          hint: 'Review "संवेदी विवरण पहचानना" (identifying sensory details) from c7_hin_cbse_04_003.',
          misconception: '**Specific error:** Students believe "atmosphere = adjectives." They underline words like *सुंदर, भयानक, शांत, गर्म*.',
          parts: [
                { id: 'a', prompt: 'पाठ 4 की कहानी में, लेखक ने बारिश का वर्णन केवल मौसम बताने के लिए नहीं किया होगा। बारिश के संवेदी विवरण (आवाज़, गंध, स्पर्श) किस **विशिष्ट भावना** को जन्म देते.', answer: '**Correct answer:** बारिश की \'टप-टप\' आवाज़, भीगी मिट्टी की गंध, और ठंडक',
                  options: ['**Correct answer:** बारिश की \'टप-टप\' आवाज़, भीगी मिट्टी की गंध, और ठंडक', 'rain sound, wet smell', 'atmosphere = adjectives', '"atmosphere = adjectives'],
                  hint: 'Review "संवेदी विवरण पहचानना" (identifying sensory details) from c7_hin_cbse_04_003 — practice with.',
                  misconception: '**Specific error:** Students believe "atmosphere = adjectives." They underline words like *सुंदर, भयानक, शांत, गर्म* and think they have.' },
                { id: 'b', prompt: 'पाठ 4 में दो प्रमुख स्थान हैं: **गाँव का खुला मैदान** और **बंद कोठरीनुमा कमरा**। दोनों स्थानों के वातावरण की तुलना कीजिए और समझाइए कि लेखक ने यह विरोधाभास.', answer: '**Correct answer:** खुला मैदान',
                  options: ['**Correct answer:** खुला मैदान', 'one is open, one is closed', 'atmosphere = adjectives', '"atmosphere = adjectives'],
                  hint: 'Review "संवेदी विवरण पहचानना" (identifying sensory details) from c7_hin_cbse_04_003 — practice with.',
                  misconception: '**Specific error:** Students believe "atmosphere = adjectives." They underline words like *सुंदर, भयानक, शांत, गर्म* and think they have.' }
          ],
            remediations: { 'specific-error-students-believe-atmosphere': { steps: ['**Step-by-step remediation:** 1.', '**Ban adjectives for 10 minutes.** Give the student a photo (e.g., an abandoned swing set).', 'Ask them to write 5 lines *without any adjective* that make the reader feel *loneliness*.', 'They must use only nouns, verbs, sensory nouns (sound/smell/touch).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_004', difficulty: 'standard',
          question: 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है कहानी के मुख्य पात्र के व्यवहार.',
          hint: 'यदि फँसे तो पाठ्य-परिवेश और वातावरण (c8_hin_cbse_04_003) की समीक्षा करें—क्योंकि पात्र के.',
          misconception: 'छात्र अक्सर मानते हैं कि प्रमुख पात्र का चरित्र केवल उसके सबसे उल्लेखनीय एक या दो कार्यों से निर्धारित होता है (जैसे एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है कहानी के मुख्य पात्र के व्यवहार, बोलचाल, विचार',
                  options: ['पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है कहानी के मुख्य पात्र के व्यवहार, बोलचाल, विचार', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'यदि फँसे तो पाठ्य-परिवेश और वातावरण (c8_hin_cbse_04_003) की समीक्षा करें—क्योंकि पात्र के व्यवहार.',
                  misconception: 'छात्र अक्सर मानते हैं कि प्रमुख पात्र का चरित्र केवल उसके सबसे उल्लेखनीय एक या दो कार्यों से निर्धारित होता है (जैसे एक बार की वीरता या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कहानी के तीन छोटे अंश दें—प्रमुख पात्र की एक बड़ी क्रिया, एक रोजमर्रा की बातचीत, और एक निजी विचार का क्षण।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक में सक्रिय रूप.',
          hint: 'यदि फँसें तो c8_hin_cbse_04_004 (नायक चित्रण) के कार्य-उदाहरण दोहराएँ — वही विधि सहायक.',
          misconception: 'छात्र मानते हैं कि सहायक पात्र का चित्रण करते समय उसके \'अच्छे/बुरे\' गुण गिनाने पर्याप्त हैं। वे लिखते हैं: "रामू दयालु.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक में सक्रिय रूप से जुड़े',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक में सक्रिय रूप से जुड़े', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'यदि फँसें तो c8_hin_cbse_04_004 (नायक चित्रण) के कार्य-उदाहरण दोहराएँ — वही विधि सहायक पात्र पर.',
                  misconception: 'छात्र मानते हैं कि सहायक पात्र का चित्रण करते समय उसके \'अच्छे/बुरे\' गुण गिनाने पर्याप्त हैं। वे लिखते हैं: "रामू दयालु था, ईमानदार था, नायक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक परिचित फिल्म/कहानी (जैसे *तारे ज़मीन पर* का राम शंकर) दें और पूछें: "इस शिक्षक के *कौन से तीन कार्य* ईशान.', 'उन कार्यों को पाठ के संवाद/घटना से मिलान करवाएँ। 3.', 'फिर PEEL शीट दें: Point (राम शंकर उत्प्रेरक है), Evidence (वह ईशान की चित्रकला देखता है), Explanation (यह ईशान की पहचान.', 'अभ्यास करवाएँ जब तक छात्र विशेषण के बजाय \'कार्य+प्रसंग+प्रभाव\' न लिखने लगे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_006', difficulty: 'standard',
          question: 'मुख्य विषय (Main Theme) वह केंद्रीय विचार है जिसके चारों ओर पूरा पाठ घूमता है.',
          hint: 'If stuck, review **c8_hin_cbse_04_004 (नायक चरित्र-चित्रण)** — trace the protagonist\'s.',
          misconception: 'Students confuse **\'main subject\' (मुख्य विषय)** with **\'plot summary\' (कथानक सारांश)** and **\'message\' (संदेश)** with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Main Theme) वह केंद्रीय विचार है जिसके चारों ओर पूरा पाठ घूमता है, जबकि संदेश',
                  options: ['मुख्य विषय (Main Theme) वह केंद्रीय विचार है जिसके चारों ओर पूरा पाठ घूमता है, जबकि संदेश', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'If stuck, review **c8_hin_cbse_04_004 (नायक चरित्र-चित्रण)** — trace the protagonist\'s internal.',
                  misconception: 'Students confuse **\'main subject\' (मुख्य विषय)** with **\'plot summary\' (कथानक सारांश)** and **\'message\' (संदेश)** with **\'moral of the.' }
          ],
            remediations: { 'students-confuse-main-subject-with': { steps: ['**Step 1 — Separate plot from theme:** Give the student a 3-column table: Column A = "What happened?" (events), Column.', 'Fill Column A together from the text, then guide them to infer B and C.', '**Step 2 — Use the "So What?" test:** For each event they list, ask "So what?', 'Why does this matter?" repeatedly until they reach a universal idea (e.g., "Raju left village" → "So what?" → "He left.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
