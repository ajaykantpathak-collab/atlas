import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch04_p2: SimDef = {
    id: 'v3_c8_hin_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'यह नोड केवल \'पाठ 4\' के गौण विषयों की पहचान, विश्लेषण और मुख्य विषय से संबंध पर केंद्रित.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c8_hin_ch04'],
    nodeIds: ['c8_hin_cbse_04_007', 'c8_hin_cbse_04_008', 'c8_hin_cbse_04_009', 'c8_hin_cbse_04_010', 'c8_hin_cbse_04_011', 'c8_hin_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुम एक फिल्म देख रहे हो — मुख्य कहानी \'हीरो का बदला\' है, लेकिन बार-बार एक बूढ़ा माली पौधे सींचता.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — गौण विषय', text: 'गौण विषय (Sub-theme) वह द्वितीयक केंद्रीय विचार है जो मुख्य विषय का समर्थन करता है, उसे गहराई देता है, या कहानी के किसी विशेष पहलू को उजागर करता है, परन्तु स्वयं कहानी का प्राथमिक संदेश नहीं होता।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — गौण', 'पाठ 4 — साहित्यिक', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 2/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्द चयन (शब्दावली), वाक्य संरचना.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ (Objective) प्रश्न पाठ में दिए गए स्पष्ट तथ्यों, घटनाओं या विवरणों की जाँच.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह द्वितीयक केंद्रीय विचार है जो मुख्य विषय का समर्थन करता.',
          hint: 'यदि अटके, तो c8_hin_cbse_04_006 (मुख्य विषय) दोबारा पढ़ें और पाठ 4 के कथानक (नोड 002) की.',
          misconception: 'छात्र समझते हैं कि \'जो विषय बार-बार आए, वही मुख्य विषय है\' — इसलिए वे \'गौण विषय\' को भी मुख्य विषय मान लेते हैं यदि वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह द्वितीयक केंद्रीय विचार है जो मुख्य विषय का समर्थन करता है, उसे',
                  options: ['गौण विषय (Sub-theme) वह द्वितीयक केंद्रीय विचार है जो मुख्य विषय का समर्थन करता है, उसे', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'यदि अटके, तो c8_hin_cbse_04_006 (मुख्य विषय) दोबारा पढ़ें और पाठ 4 के कथानक (नोड 002) की घटना-क्रम.',
                  misconception: 'छात्र समझते हैं कि \'जो विषय बार-बार आए, वही मुख्य विषय है\' — इसलिए वे \'गौण विषय\' को भी मुख्य विषय मान लेते हैं यदि वह दोहराया जाए (जैसे पाठ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: \'पहले नोड 006 (मुख्य विषय) का उत्तर दोबारा पढ़ो और एक पंक्ति में मुख्य विषय लिखो।\' 2.', 'फिर पाठ 4 के 5-6 प्रमुख प्रसंगों की सूची बनवाओ। 3.', 'प्रत्येक प्रसंग के आगे लिखवाओ: \'यह मुख्य विषय को कैसे आगे बढ़ाता है?\' 4.', 'जिन प्रसंगों का उत्तर \'सीधे नहीं, बल्कि संदर्भ/तनाव/मानवीयता देता है\' — वही गौण विषय के प्रमाण हैं। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** is the use of vivid, sensory language that appeals to the.',
          hint: 'If stuck, review Class 7 Chapter 4 node c7_hin_cbse_04_008 for basic definitions, then.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **हर तुलना रूपक है** — वे "जैसे/जैसा" वाले वाक्यों को भी रूपक कह देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** is the use of vivid, sensory language that appeals to the five senses',
                  options: ['**बिंब (Imagery)** is the use of vivid, sensory language that appeals to the five senses', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'If stuck, review Class 7 Chapter 4 node c7_hin_cbse_04_008 for basic definitions, then practice the.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **हर तुलना रूपक है** — वे "जैसे/जैसा" वाले वाक्यों को भी रूपक कह देते हैं। साथ ही, वे बिंब को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**रूपक/उपमा भेद के लिए:** छात्र को 10 वाक्य दें (मिश्रित: 5 उपमा, 5 रूपक)। कहें: "हर वाक्य में \'जैसे/जैसा/समान/तुल्य\'.', '**बहु-इंद्रिय बिंब के लिए:** कक्षा में 5 वस्तुएँ रखें (फूल, घंटी, बर्फ, नींबू, रेशम)। प्रत्येक को.', '**पुष्टि:** अगले पाठ में किसी अनदेखे अंश से 2 रूपक और 3 बिंब (कम से कम 2 इंद्रियाँ) पहचानने को कहें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन.',
          hint: 'यदि अटका हुआ लगे, तो c8_hin_cbse_04_008 (बिंब और रूपक) के कार्यित उदाहरण दोहराएँ — विशेष.',
          misconception: 'छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति (Oxymoron)** समझ बैठते हैं — जैसे "मधुर कड़वाहट" (Oxymoron: दो विरोधी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन या विचार',
                  options: ['**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन या विचार', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'यदि अटका हुआ लगे, तो c8_hin_cbse_04_008 (बिंब और रूपक) के कार्यित उदाहरण दोहराएँ — विशेष रूप से.',
                  misconception: 'छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति (Oxymoron)** समझ बैठते हैं — जैसे "मधुर कड़वाहट" (Oxymoron: दो विरोधी विशेषण एक संज्ञा के.' }
          ],
            remediations: { 'oxymoron-oxymoron': { steps: ['छात्र से कहें: "एक वाक्य लिखो जहाँ दो विपरीत बातें हों पर साथ में सच लगें" — यदि वह Oxymoron दे (जैसे "जीवित लाश"), तो.', 'प्रतीक के लिए: एक वस्तु दें (जैसे \'पुराना पत्र\') और पूछें: "यह कागज़-कलम से आगे क्या कहता है?" — यदि उत्तर "यादें" तक.', 'क्या यह पत्र किसी टूटे रिश्ते का प्रतीक है?', 'किसी खोए युग का?" — इस तरह परतें खोलते जाएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_010', difficulty: 'standard',
          question: 'पदावली (शब्द-संपदा) किसी पाठ में प्रयुक्त उन मुख्य शब्दों का समूह है जो पाठ के.',
          hint: 'If stuck, review "कथानक और आख्यान-संरचना" (c8_hin_cbse_04_002) to relocate the word.',
          misconception: 'Students treat "पदावली: मुख्य शब्द" as a **vocabulary list to memorize** (word → meaning) rather than a **set.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (शब्द-संपदा) किसी पाठ में प्रयुक्त उन मुख्य शब्दों का समूह है जो पाठ के विषय, भाव',
                  options: ['पदावली (शब्द-संपदा) किसी पाठ में प्रयुक्त उन मुख्य शब्दों का समूह है जो पाठ के विषय, भाव', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'If stuck, review "कथानक और आख्यान-संरचना" (c8_hin_cbse_04_002) to relocate the word in the story.',
                  misconception: 'Students treat "पदावली: मुख्य शब्द" as a **vocabulary list to memorize** (word → meaning) rather than a **set of analytical tools** (word →.' }
          ],
            remediations: { 'students-treat-as-a-vocabulary': { steps: ['**Re-anchor**: Take ONE word from the chapter.', 'Read the *exact sentence* it appears in.', 'Ask: "What idea is the author expressing here?" Then reveal the word.', 'Ask: "Why *this* word?" 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्द चयन (शब्दावली), वाक्य संरचना.',
          hint: 'यदि अटके: **वाच्य परिवर्तन अभ्यास** (कर्तृ↔कर्मणी) और **वाक्य प्रकार पहचान** के 10-15.',
          misconception: 'छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है **व्याकरण के नियम पहचानना** (जैसे: "यह विशेषण है", "यह कर्मणी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्द चयन (शब्दावली), वाक्य संरचना',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्द चयन (शब्दावली), वाक्य संरचना', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'यदि अटके: **वाच्य परिवर्तन अभ्यास** (कर्तृ↔कर्मणी) और **वाक्य प्रकार पहचान** के 10-15 उदाहरण हल.',
                  misconception: 'छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है **व्याकरण के नियम पहचानना** (जैसे: "यह विशेषण है", "यह कर्मणी वाच्य है")। वे **पहचान**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक **परिचित स्थिति** दें (जैसे: माँ का गुस्सा — "तूने फिर गंदगी कर दी!" बनाम "यह कमरा अव्यवस्थित है")। 2.', 'पूछें: **"दोनों का अर्थ समान है, फिर माँ ने पहला क्यों चुना?"** 3.', 'फिर पाठ के **वास्तविक अंश** पर यही प्रश्न लागू करें: "लेखक ने *यह* शब्द/रचना *यहाँ* क्यों चुनी?" 4.', 'छात्र से **PEEL शीट** भरवाएँ: Point (क्या प्रयोग), Evidence (उद्धरण), Explanation (क्यों/क्या प्रभाव), Link (पाठ के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ (Objective) प्रश्न पाठ में दिए गए स्पष्ट तथ्यों, घटनाओं या विवरणों.',
          hint: 'If stuck, review **c8_hin_cbse_04_008 (बिंब और रूपक)** to recognize non-literal language.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आशय-सूचक प्रश्न का उत्तर मेरी *व्यक्तिगत राय* (Personal opinion) है" और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ (Objective) प्रश्न पाठ में दिए गए स्पष्ट तथ्यों, घटनाओं या विवरणों की जाँच',
                  options: ['वस्तुनिष्ठ (Objective) प्रश्न पाठ में दिए गए स्पष्ट तथ्यों, घटनाओं या विवरणों की जाँच', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'If stuck, review **c8_hin_cbse_04_008 (बिंब और रूपक)** to recognize non-literal language, and.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आशय-सूचक प्रश्न का उत्तर मेरी *व्यक्तिगत राय* (Personal opinion) है" और "वस्तुनिष्ठ प्रश्न का.' }
          ],
            remediations: { 'personal-opinion-rote-memory-3': { steps: ['**चरण 1 (वापसी):** छात्र को पाठ 4 का एक छोटा अनुच्छेद (3-4 पंक्तियाँ) दें। कहें: "केवल वही लिखो जो **दिखाई दे रहा है**.', '**चरण 2 (सेतु):** अब उसी अनुच्छेद के लिए पूछें: "लेखक ने \'तेज़\' शब्द क्यों चुना, \'धीमा\' क्यों नहीं?', 'पाठ में कौन सा शब्द इसका सुराग देता है?" — यह **शब्द चयन (Diction)** पर ध्यान केंद्रित कराता है। 3.', '**चरण 3 (संरचना):** उत्तर लिखने का टेम्पलेट दें: **"पाठ में लिखा है [उद्धरण], इसलिए मुझे लगता है [अनुमान], क्योंकि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
