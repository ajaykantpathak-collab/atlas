import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch09_p2: SimDef = {
    id: 'v3_c7_hin_ch09_p2',
    title: 'पाठ 9 · Part 2/3',
    subtitle: 'इस नोड में गौण विषय की पहचान, मुख्य विषय से उसके संबंध की विश्लेषण, और पाठगत प्रमाणों के.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 9 · Part 2/3',
    chapters: ['c7_hin_ch09'],
    nodeIds: ['c7_hin_cbse_09_007', 'c7_hin_cbse_09_008', 'c7_hin_cbse_09_009', 'c7_hin_cbse_09_010', 'c7_hin_cbse_09_011', 'c7_hin_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुम एक पिज़्ज़ा ऑर्डर करते हो — बेस (मुख्य विषय) तो चीज़ और टमाटर सॉस है, लेकिन टॉपिंग्स (गौण.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — गौण विषय', text: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य है जो मुख्य विषय के समानांतर चलता है, उसे विस्तार देता है, उसके विभिन्न आयाम खोलता है और कथा में गहराई, यथार्थपरकता और बहु-आयामिता लाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — गौण', 'पाठ 9 — साहित्यिक', 'पाठ 9 — पदावली', 'पाठ 9 — व्याकरण', 'पाठ 9 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_hin_cbse_09_012', title: 'पाठ 9 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Have you ever watched a cricket match and wondered: "The scoreboard says 250 runs (fact), but *why* did the captain declare early (inference)?" That\'s exactly.',
            decisions: [{ prompt: 'पाठ 9 में \'वस्तुनिष्ठ प्रश्न\' और \'आशय-सूचक प्रश्न\' में मूल अंतर क्या है? एक वाक्य में स्पष्ट कीजिए।', options: [
                { text: 'वस्तुनिष्ठ प्रश्न का उत्तर पाठ में स्पष्ट रूप से लिखा होता है (तथ्य-आधारित), जबकि', outcome: 'वस्तुनिष्ठ प्रश्न का उत्तर पाठ में स्पष्ट रूप से लिखा होता है (तथ्य-आधारित), जबकि आशय-सूचक प्रश्न.' },
                { text: 'आशय-सूचक प्रश्न का उत्तर पाठ में कहीं न कहीं छिपा होता है, बस ढूँढ़ना है', outcome: 'Not quite — Students believe that "आशय-सूचक प्रश्न का उत्तर पाठ में कहीं न कहीं छिपा होता है, बस ढूँढ़ना है".', reveals: 'wrong-idea' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hin_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य है जो मुख्य विषय के समानांतर चलता है, उसे.',
          hint: 'यदि मुख्य विषय ही अस्पष्ट है, तो c7_hin_cbse_09_006 पर लौटकर \'थीमैटिक स्टेटमेंट\' लिखने का.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय\' का अर्थ \'कम महत्वपूर्ण विषय\' होता है, इसलिए वे उसे नज़रअंदाज़ कर देते हैं या केवल सहायक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य है जो मुख्य विषय के समानांतर चलता है, उसे विस्तार',
                  options: ['गौण विषय (Sub-theme) वह द्वितीयक कथ्य है जो मुख्य विषय के समानांतर चलता है, उसे विस्तार', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'यदि मुख्य विषय ही अस्पष्ट है, तो c7_hin_cbse_09_006 पर लौटकर \'थीमैटिक स्टेटमेंट\' लिखने का अभ्यास.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय\' का अर्थ \'कम महत्वपूर्ण विषय\' होता है, इसलिए वे उसे नज़रअंदाज़ कर देते हैं या केवल सहायक पात्रों की छोटी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के 5-6 प्रमुख प्रसंग चुनने को कहें जहां मुख्य विषय *नहीं* चल रहा हो (नायक का मुख्य लक्ष्य स्थगित हो)। 2.', 'उन प्रसंगों में उभरती चिंताओं को सूचीबद्ध करवाएं (जैसे: जाति, शिक्षा, कर्ज, स्त्री-अधिकार, पर्यावरण)। 3.', 'प्रत्येक चिंता के लिए पूछें: "क्या यह पाठ में 3+ बार अलग-अलग रूप में आई है?" 4.', 'जो चिंताएं इस परीक्षा में पास हों, उन्हें गौण विषय मानकर मुख्य विषय से उनके संबंध के तीर खींचने को कहें — दृश्यीकरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_008', difficulty: 'standard',
          question: '**बिंब** शब्दों के माध्यम से पाठक के मन में किसी दृश्य, ध्वनि, गंध, स्पर्श या.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा ६ के पाठ १, ५, ९ के बिंब-रूपक अभ्यास** दोहराएँ — विशेषकर.',
          misconception: 'छात्र अक्सर समझते हैं कि **हर तुलना रूपक होती है**। वे "वह शेर जैसा बहादुर है" (उपमा) और "वह शेर है" (रूपक) में फर्क.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब** शब्दों के माध्यम से पाठक के मन में किसी दृश्य, ध्वनि, गंध, स्पर्श या स्वाद का',
                  options: ['**बिंब** शब्दों के माध्यम से पाठक के मन में किसी दृश्य, ध्वनि, गंध, स्पर्श या स्वाद का', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा ६ के पाठ १, ५, ९ के बिंब-रूपक अभ्यास** दोहराएँ — विशेषकर "बिंब.',
                  misconception: 'छात्र अक्सर समझते हैं कि **हर तुलना रूपक होती है**। वे "वह शेर जैसा बहादुर है" (उपमा) और "वह शेर है" (रूपक) में फर्क नहीं कर पाते क्योंकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['१) **रूपक पहचान ड्रिल:** १० वाक्य दें (मिश्रित उपमा/रूपक/साधारण)। छात्र पहले \'जैसे/सा/सी\' घेरे — जहाँ न हो, वही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_009', difficulty: 'standard',
          question: 'विरोधाभास (Paradox) एक साहित्यिक युक्ति है जिसमें दो विरोधी लगने वाले विचारों.',
          hint: 'अगर अटके तो c7_hin_cbse_09_008 (बिंब और रूपक) के कार्यित उदाहरण दोबारा करें — विशेष रूप.',
          misconception: 'छात्र अक्सर **विरोधाभास (Paradox)** और **विरोधाभासी स्थिति (Contradiction/Inconsistency)** को एक समझ लेते हैं। वे सोचते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास (Paradox) एक साहित्यिक युक्ति है जिसमें दो विरोधी लगने वाले विचारों को साथ रखकर',
                  options: ['विरोधाभास (Paradox) एक साहित्यिक युक्ति है जिसमें दो विरोधी लगने वाले विचारों को साथ रखकर', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'अगर अटके तो c7_hin_cbse_09_008 (बिंब और रूपक) के कार्यित उदाहरण दोबारा करें — विशेष रूप से \'रूपक.',
                  misconception: 'छात्र अक्सर **विरोधाभास (Paradox)** और **विरोधाभासी स्थिति (Contradiction/Inconsistency)** को एक समझ लेते हैं। वे सोचते हैं कि अगर कहानी.' }
          ],
            remediations: { 'paradox-contradiction-inconsistency': { steps: ['चरण 1: छात्र को दो वाक्य दें — एक विरोधाभास ("कम बोलना ज्यादा कहना है"), एक सामान्य विरोधाभासी स्थिति ("राम ने कहा वह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_010', difficulty: 'standard',
          question: 'किसी पाठ के केंद्रीय भाव, विषय या पात्र-चित्रण को स्पष्ट करने वाले उन चुनिंदा.',
          hint: 'यदि फँस जाएँ तो **\'प्रसंगिक अर्थ बनाम शब्दकोश अर्थ\'** (कक्षा 6 पाठ 3, नोड.',
          misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' वही हैं जो पाठ में **सबसे ज़्यादा बार आए हों** (frequency-based selection)।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'किसी पाठ के केंद्रीय भाव, विषय या पात्र-चित्रण को स्पष्ट करने वाले उन चुनिंदा शब्दों की',
                  options: ['किसी पाठ के केंद्रीय भाव, विषय या पात्र-चित्रण को स्पष्ट करने वाले उन चुनिंदा शब्दों की', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'यदि फँस जाएँ तो **\'प्रसंगिक अर्थ बनाम शब्दकोश अर्थ\'** (कक्षा 6 पाठ 3, नोड c6_hin_cbse_03_010).',
                  misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' वही हैं जो पाठ में **सबसे ज़्यादा बार आए हों** (frequency-based selection)। **वास्तविकता:** मुख्य शब्द.' }
          ],
            remediations: { 'frequency-based-selection': { steps: ['छात्र को पाठ 9 का एक छोटा अंश (5-6 पंक्तियाँ) दें और कहें: "इन पंक्तियों से **सिर्फ तीन शब्द** चुनो जिनके बिना इन.', 'फिर पूछें: "क्या ये वही शब्द हैं जो सबसे ज़्यादा बार आए?" — अंतर स्पष्ट करें। 3.', 'अब पूरे पाठ पर यही कसौटी लागू करवाएँ: प्रत्येक चुने शब्द के लिए पूछें — "अगर यह शब्द न होता तो पाठ का संदेश क्या.', 'अंत में छात्र से कहें: "मुख्य शब्द = **थीम की रीढ़**, न कि **गिनती का बादशाह**" — यह सूत्र याद करवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा किसी रचना में शब्दों, वाक्य-रचना.',
          hint: 'यदि छात्र काल/वाच्य/वाक्य-भेद पहचानने में अटके तो कक्षा 6 के व्याकरण अभ्यास.',
          misconception: 'छात्र समझते हैं कि "व्याकरण सही होना" ही भाषा-प्रयोग है — इसलिए वे विशेषण, क्रियाविशेषण, काल, वाच्य को केवल सही/गलत के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा किसी रचना में शब्दों, वाक्य-रचना, काल, वाच्य,',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा किसी रचना में शब्दों, वाक्य-रचना, काल, वाच्य,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'यदि छात्र काल/वाच्य/वाक्य-भेद पहचानने में अटके तो कक्षा 6 के व्याकरण अभ्यास (c6_hin_cbse_09_011 के.',
                  misconception: 'छात्र समझते हैं कि "व्याकरण सही होना" ही भाषा-प्रयोग है — इसलिए वे विशेषण, क्रियाविशेषण, काल, वाच्य को केवल सही/गलत के खाँचों में देखते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक ही घटना के दो संस्करण दिखाएँ: एक "रिपोर्ट शैली" में (सही व्याकरण, लंबे वाक्य, भूतकाल, कर्तृवाच्य) और दूसरा.', 'पूछें: "कौन-सा संस्करण तुम्हें घटना के *अंदर* ले जाता है?" — जब वह दूसरा चुने, तब बताएँ: "यही भाषा-प्रयोग है। व्याकरण.', 'फिर उसी छात्र से एक साधारण वाक्य लेकर तीन अलग-अलग मूड (भय, खुशी, ऊब) में लिखवाएँ — केवल वाक्य-लंबाई, काल, विराम चिह्न.', 'अंत में उससे पूछो: "तुमने भय के लिए वर्तमान काल क्यों चुना?" — उसका अपना उत्तर ही उसकी समझ का प्रमाण बनेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (objective questions) test direct factual recall from the.',
          hint: 'If stuck, review "पाठ्य-प्रमाण उद्धृत करना" (citing textual evidence) from.',
          misconception: 'Students believe that "आशय-सूचक प्रश्न का उत्तर पाठ में कहीं न कहीं छिपा होता है, बस ढूँढ़ना है" — they treat inference.',
          parts: [
                { id: 'a', prompt: 'पाठ 9 से एक आशय-सूचक प्रश्न चुनकर उसका उत्तर 4 चरणों में दीजिए: (1) दावा, (2) पाठ्य प्रमाण, (3) तर्क, (4) विषय से संबंध।', answer: '**प्रश्न:** "लेखक ने अंत में नायक की चुप्पी को \'सबसे बड़ा उत्तर\' क्यों कहा है?"',
                  options: ['**प्रश्न:** "लेखक ने अंत में नायक की चुप्पी को \'सबसे बड़ा उत्तर\' क्यों कहा है?"', 'आशय-सूचक प्रश्न का उत्तर पाठ में कहीं न कहीं छिपा होता है, बस ढूँढ़ना है'],
                  hint: 'If stuck, review "पाठ्य-प्रमाण उद्धृत करना" (citing textual evidence) from c6_hin_cbse_09_012 and.',
                  misconception: 'Students believe that "आशय-सूचक प्रश्न का उत्तर पाठ में कहीं न कहीं छिपा होता है, बस ढूँढ़ना है" — they treat inference as a hidden-object.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**Model the distinction visibly:** Take ONE inferential question.', 'Write a "lifted answer" (wrong) and a "reasoned answer" (right) side-by-side.', 'Ask: "Which one explains WHY?" 2.', '**Use the "So what?" ladder:** Student gives evidence → Teacher asks "So what does that show?" → Student explains →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "आशय-सूचक प्रश्न का उत्तर पाठ में कहीं न कहीं छिपा होता है, बस ढूँढ़ना है" — they treat inference.',
          parts: [
                { id: 'a', prompt: 'क्या पाठ 9 में लेखक का दृष्टिकोण (नैरेटिव वॉइस) नायक के प्रति सहानुभूतिपूर्ण है या आलोचनात्मक? पाठ से दो प्रमाण देकर अपने मत का बचाव कीजिए।', answer: '**मत:** लेखक का दृष्टिकोण सहानुभूतिपूर्ण है, पर अंधसमर्थन नहीं',
                  options: ['**मत:** लेखक का दृष्टिकोण सहानुभूतिपूर्ण है, पर अंधसमर्थन नहीं', 'आशय-सूचक प्रश्न का उत्तर पाठ में कहीं न कहीं छिपा होता है, बस ढूँढ़ना है'],
                  hint: 'If stuck, review "पाठ्य-प्रमाण उद्धृत करना" (citing textual evidence) from c6_hin_cbse_09_012 and.',
                  misconception: 'Students believe that "आशय-सूचक प्रश्न का उत्तर पाठ में कहीं न कहीं छिपा होता है, बस ढूँढ़ना है" — they treat inference as a hidden-object.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**Model the distinction visibly:** Take ONE inferential question.', 'Write a "lifted answer" (wrong) and a "reasoned answer" (right) side-by-side.', 'Ask: "Which one explains WHY?" 2.', '**Use the "So what?" ladder:** Student gives evidence → Teacher asks "So what does that show?" → Student explains →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
