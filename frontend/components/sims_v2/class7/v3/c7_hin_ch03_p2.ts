import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch03_p2: SimDef = {
    id: 'v3_c7_hin_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'यह नोड कक्षा 7 के पाठ 3 में गौण विषयों की पहचान, विश्लेषण और मुख्य विषय से उनके संबंध पर.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c7_hin_ch03'],
    nodeIds: ['c7_hin_cbse_03_007', 'c7_hin_cbse_03_008', 'c7_hin_cbse_03_009', 'c7_hin_cbse_03_010', 'c7_hin_cbse_03_011', 'c7_hin_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुम एक \'थाली\' (प्लेट) देख रहे हो — मुख्य विषय \'दाल\' है जो पोषण देती है, लेकिन गौण विषय \'सब्जी.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: 'गौण विषय (Sub-theme) पाठ में मुख्य विषय के समानांतर चलने वाले वे सहायक विचार या प्रसंग हैं जो कथानक को विस्तार देते हैं, पात्रों की मनोदशा उजागर करते हैं, और मुख्य संदेश को पुष्ट करने में सहायक होते.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 2/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — \'पाठ में भाषा-प्रयोग\' का अर्थ है लेखक द्वारा रचना के उद्देश्य, पात्र, परिवेश और भाव के.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective questions) test literal comprehension — the answer.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) पाठ में मुख्य विषय के समानांतर चलने वाले वे सहायक विचार या.',
          hint: 'यदि अटके तो c7_hin_cbse_03_006 (मुख्य विषय) और c6_hin_cbse_03_007 (कक्षा 6 का गौण विषय).',
          misconception: 'छात्र अक्सर गौण विषय को \'कम महत्वपूर्ण विषय\' मान लेते हैं क्योंकि शब्द में \'गौण\' लगा है — जबकि साहित्य में गौण विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) पाठ में मुख्य विषय के समानांतर चलने वाले वे सहायक विचार या प्रसंग',
                  options: ['गौण विषय (Sub-theme) पाठ में मुख्य विषय के समानांतर चलने वाले वे सहायक विचार या प्रसंग', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटके तो c7_hin_cbse_03_006 (मुख्य विषय) और c6_hin_cbse_03_007 (कक्षा 6 का गौण विषय) दोहराएँ',
                  misconception: 'छात्र अक्सर गौण विषय को \'कम महत्वपूर्ण विषय\' मान लेते हैं क्योंकि शब्द में \'गौण\' लगा है — जबकि साहित्य में गौण विषय अक्सर मुख्य विषय से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 3 का वह अंश दें जहाँ मुख्य कथा रुकती है और कोई वर्णन/संवाद शुरू होता है (जैसे: प्रकृति चित्रण, पुरानी याद.', 'एक \'दो-स्तंभ तालिका\' बनवाएँ: बाएँ स्तंभ में \'मुख्य कथा की घटना\', दाएँ में \'साथ-साथ चलने वाला प्रसंग\' — फिर पूछें.', 'यदि फिर भी न समझें, तो किसी परिचित फिल्म (जैसे \'तारे ज़मीन पर\') का उदाहरण लें: मुख्य विषय = डिस्लेक्सिया की समझ, गौण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों के माध्यम से इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श.',
          hint: 'यदि अटका हो तो कक्षा 6 के किसी भी पाठ (c6_hin_cbse_XX_008) के बिंब-रूपक अभ्यास दोहराएँ.',
          misconception: 'छात्र अक्सर **मानवीकरण (Personification)** को रूपक समझ बैठते हैं। उदाहरण: "हवा गुनगुना रही थी" — यहाँ हवा को मानव-गुण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों के माध्यम से इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श, स्वाद) को',
                  options: ['**बिंब (Imagery)** शब्दों के माध्यम से इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श, स्वाद) को', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटका हो तो कक्षा 6 के किसी भी पाठ (c6_hin_cbse_XX_008) के बिंब-रूपक अभ्यास दोहराएँ — विशेषकर.',
                  misconception: 'छात्र अक्सर **मानवीकरण (Personification)** को रूपक समझ बैठते हैं। उदाहरण: "हवा गुनगुना रही थी" — यहाँ हवा को मानव-गुण (गाना) दिया गया है.' }
          ],
            remediations: { 'personification': { steps: ['**चरण 1:** छात्र को दो वाक्य दें — "समय चोर है" (रूपक) और "घड़ी दौड़ रही है" (मानवीकरण)। पूछें: "किसमें दो चीज़ें आपस.', 'किसमें एक चीज़ को इंसान बना दिया?" 2.', '**चरण 2:** एक टेबल बनाएँ: स्तंभ 1 — उपमेय, स्तंभ 2 — उपमान, स्तंभ 3 — साझा गुण। छात्र से 3 उदाहरण भरवाएँ। 3.', '**चरण 3:** एक छोटी कविता दें जहाँ बिंब और रूपक दोनों हों। छात्र को पहले **रंगीन पेंसिल से** इंद्रिय-सूचक शब्द घेरने को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक.',
          hint: 'यदि अटके, तो कक्षा 6 के पाठ 1, 3, 4 के \'साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक\' नोड्स.',
          misconception: '**सबसे बड़ी गलतफहमी**: छात्र मानते हैं कि **विरोधाभास = गलती/भ्रम** और **प्रतीक = सजावट/अलंकार मात्र**। **ठीक-ठीक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ प्रस्तुत',
                  options: ['**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ प्रस्तुत', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटके, तो कक्षा 6 के पाठ 1, 3, 4 के \'साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक\' नोड्स.',
                  misconception: '**सबसे बड़ी गलतफहमी**: छात्र मानते हैं कि **विरोधाभास = गलती/भ्रम** और **प्रतीक = सजावट/अलंकार मात्र**। **ठीक-ठीक त्रुटि**: जब पाठ में "वह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**विरोधाभास के लिए**: छात्र को 3 दैनिक जीवन के विरोधाभास दें (जैसे "सबसे तेज़ दौड़ने वाला सबसे देर से पहुँचा" — क्योंकि.', 'गहरा सत्य क्या है?" — जब तक वह **\'क्यों\'** न बता दे, आगे न बढ़ें। 2.', '**प्रतीक के लिए**: कक्षा में 5 वस्तुएँ रखें (पत्थर, फूल, दीया, किताब, चाबी)। प्रत्येक के लिए कहें: "यह वस्तु क्या है?', 'यह किस बड़ी बात की याद दिलाती है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द उन महत्वपूर्ण शब्दों को कहते हैं जो किसी पाठ के विषय, भावना.',
          hint: 'यदि छात्र फंसे तो कक्षा 6 के पदावली: मुख्य शब्द (c6_hin_cbse_XX_010) के अभ्यास पत्रों को.',
          misconception: 'छात्र अक्सर मानते हैं कि मुख्य शब्द केवल वे होते हैं जो शब्दकोश में कठिन या अपरिचित होते हैं, जबकि सरल शब्द जैसे "जा".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द उन महत्वपूर्ण शब्दों को कहते हैं जो किसी पाठ के विषय, भावना या अर्थ को',
                  options: ['पदावली: मुख्य शब्द उन महत्वपूर्ण शब्दों को कहते हैं जो किसी पाठ के विषय, भावना या अर्थ को', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि छात्र फंसे तो कक्षा 6 के पदावली: मुख्य शब्द (c6_hin_cbse_XX_010) के अभ्यास पत्रों को दोहराकर.',
                  misconception: 'छात्र अक्सर मानते हैं कि मुख्य शब्द केवल वे होते हैं जो शब्दकोश में कठिन या अपरिचित होते हैं, जबकि सरल शब्द जैसे "जा", "आ", "है" भी पाठ में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल वाक्य दें जैसे "सूर्य उग रहा है।" पूछें: कौन सा शब्द क्रिया दिखा रहा है?', 'फिर बताएं कि "उग रहा है" क्रिया है जो समय और क्रिया को दर्शाता है, इसलिए यह भी एक मुख्य शब्द है। फिर एक और वाक्य दें.', 'इस तरह क्रिया, विशेषण और संज्ञा सभी को समान महत्व देते हुए अभ्यास करवाएं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_011', difficulty: 'standard',
          question: '\'पाठ में भाषा-प्रयोग\' का अर्थ है लेखक द्वारा रचना के उद्देश्य, पात्र, परिवेश और.',
          hint: 'अगर अटका हुआ लगे तो **कक्षा 6 के व्याकरण नोड्स (c6_hin_cbse_XX_011)** दोबारा देखें.',
          misconception: 'छात्र समझते हैं कि **\'अच्छा भाषा-प्रयोग\' = \'कठिन/तत्सम शब्दों का अधिक प्रयोग\'**। वे देशज, तद्भव, बोलचाल के शब्दों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पाठ में भाषा-प्रयोग\' का अर्थ है लेखक द्वारा रचना के उद्देश्य, पात्र, परिवेश और भाव के',
                  options: ['\'पाठ में भाषा-प्रयोग\' का अर्थ है लेखक द्वारा रचना के उद्देश्य, पात्र, परिवेश और भाव के', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'अगर अटका हुआ लगे तो **कक्षा 6 के व्याकरण नोड्स (c6_hin_cbse_XX_011)** दोबारा देखें — विशेष रूप से.',
                  misconception: 'छात्र समझते हैं कि **\'अच्छा भाषा-प्रयोग\' = \'कठिन/तत्सम शब्दों का अधिक प्रयोग\'**। वे देशज, तद्भव, बोलचाल के शब्दों को \'कमजोर\' मानते हैं और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पूछो — "तुम अपने दादा-दादी से कैसे बात करते हो?', 'प्रधानाचार्य को पत्र कैसे लिखोगे?" — तीनों उत्तर लिखवाओ। चरण 2: तीनों में **शब्द, वाक्य, लहज़े** का अंतर रेखांकित.', 'अगर दूसरी शैली में बोले तो क्या प्रभाव बदलेगा?" चरण 4: छात्र को एक ही बात तीन शैलियों में लिखने का अभ्यास कराओ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective questions) test literal comprehension — the answer.',
          hint: 'यदि अटके तो **c6_hin_cbse_03_012** (Class 6 पाठ 3 बोध-प्रश्न) के \'सबूत-निष्कर्ष\' लेखन.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर *कहीं भी से* आ सकता है — यह तो बस \'मेरा विचार\' है।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective questions) test literal comprehension',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective questions) test literal comprehension', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटके तो **c6_hin_cbse_03_012** (Class 6 पाठ 3 बोध-प्रश्न) के \'सबूत-निष्कर्ष\' लेखन अभ्यास को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर *कहीं भी से* आ सकता है — यह तो बस \'मेरा विचार\' है।" **गलत तर्क का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — सबूत-छँटाई (Evidence Sorting):** छात्र को पाठ के 5-6 वाक्य दें। पूछें: "कौन-से वाक्य *तथ्य* बताते हैं?', 'कौन-से *संकेत* देते हैं?" — उसे दो कॉलम में लिखवाएँ। 2.', '**चरण 2 — निष्कर्ष-सेतु (Inference Bridge):** एक संकेत-वाक्य चुनें (जैसे: "उसके हाथ काँप रहे थे")। पूछें: "यह क्या.', '*कौन-सा शब्द* तुम्हें इस निष्कर्ष तक ले आया?" — \'काँप रहे थे\' को रेखांकित करवाएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
