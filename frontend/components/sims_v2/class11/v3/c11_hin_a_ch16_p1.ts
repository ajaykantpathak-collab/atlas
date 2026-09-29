import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch16_p1: SimDef = {
    id: 'v3_c11_hin_a_ch16_p1',
    title: 'घर में वापसी · Part 1/3',
    subtitle: 'यह नोड **केवल** कवि धूमिल का संक्षिप्त परिचय, उनकी काव्य-शैली की मूल प्रवृत्तियाँ.',
    classLevel: 11, subject: 'hin_a', topic: 'घर में वापसी · Part 1/3',
    chapters: ['c11_hin_a_ch16'],
    nodeIds: ['c11_hin_a_cbse_16_001', 'c11_hin_a_cbse_16_002', 'c11_hin_a_cbse_16_003', 'c11_hin_a_cbse_16_004', 'c11_hin_a_cbse_16_005', 'c11_hin_a_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'अंतरा भाग-1 खोलिए और पाठ 16 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'घर में वापसी — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_16_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['घर में वापसी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_16_005', title: 'घर में वापसी — छंद और लय-विधान',
          caseStudy: { intro: '\'घर में वापसी\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: '"घर में वापसी" कविता में प्रयुक्त छंद का प्रकार पहचानें और एक पंक्ति की मात्रा गणना करके दिखाएं।', options: [
                { text: 'यह कविता **मात्रिक छंद** (मात्रिक गेय छंद) में लिखी गई है, जहाँ प्रत्येक पंक्ति में **16', outcome: 'यह कविता **मात्रिक छंद** (मात्रिक गेय छंद) में लिखी गई है, जहाँ प्रत्येक पंक्ति में **16 मात्राएँ**.' },
                { text: 'the rhythm is regular', outcome: 'Not quite — Students believe that **चंद (meter) and लय (rhythm) are the same thing** — they scan the poem.', reveals: 'meter-and-rhythm-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through घर में वापसी like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? घर में वापसी · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — घर में वापसी · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'यदि अटके तो **\'नई कविता आंदोलन\' (New Poetry Movement)** के Class 10/11 के नोट्स दोहराएँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः \'घर में वापसी\' को **\'नॉस्टेल्जिया\' (Nostalgia/अतीत-मोह)** या **\'घर-वापसी की सुखद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'घर में वापसी\' का कथानक', '\'घर में वापसी\' का पाठ्य-परिवेश (setting)', '\'घर में वापसी\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **\'नई कविता आंदोलन\' (New Poetry Movement)** के Class 10/11 के नोट्स दोहराएँ — विशेषतः.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः \'घर में वापसी\' को **\'नॉस्टेल्जिया\' (Nostalgia/अतीत-मोह)** या **\'घर-वापसी की सुखद अनुभूति\'** मान लेते हैं.' }
          ],
            remediations: { 'nostalgia': { steps: ['**चरणबद्ध उपचार (Targeted Remediation):** **चरण 1:** छात्र से कहें: *"कविता का पहला और अंतिम पद्यांश एक साथ पढ़ो — क्या.', 'शब्दों को रेखांकित करो: पहले में \'अँगना\', \'बाबू\', \'अम्मा\' — अंत में \'कचहरी\', \'थाना\', \'बाबू का लड़का\', \'ट्रैक्टर\'।"*.', 'क्या वह घर नहीं पहचानता, या घर ने उसे नहीं पहचाना?"* — इस द्वंद्व को \'वर्ग-चश्मे\' (Class Lens) से देखने को कहें। **चरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_002', difficulty: 'standard',
          question: '\'घर में वापसी\' का कथानक — \'घर में वापसी\' — अंतरा भाग-1 का पाठ। पाठ का कथानक.',
          hint: 'अगर फँसें तो: c11_hin_a_cbse_16_001 (कवि परिचय और पृष्ठभूमि) दोबारा पढ़ें — विशेषकर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "भावार्थ = शब्दों का हिंदी अनुवाद" — इसलिए वे पद्यांश के प्रत्येक शब्द का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में वापसी\' का कथानक',
                  options: ['\'घर में वापसी\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'घर में वापसी\' का पाठ्य-परिवेश (setting)', '\'घर में वापसी\' का पात्र-चित्रण'],
                  hint: 'अगर फँसें तो: c11_hin_a_cbse_16_001 (कवि परिचय और पृष्ठभूमि) दोबारा पढ़ें — विशेषकर \'विस्थापन की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "भावार्थ = शब्दों का हिंदी अनुवाद" — इसलिए वे पद्यांश के प्रत्येक शब्द का समानार्थी लिखकर समझते हैं.' }
          ],
            remediations: { 'intention-implied-meaning': { steps: ['**चरण 1 — स्पष्ट करें:** "भावार्थ अनुवाद नहीं, **व्याख्या** है" — छात्र को एक पंक्ति दें (जैसे: "दीवारें बोलती नहीं").', 'भावार्थ क्या है?" — दोनों लिखवाएँ, अंतर दिखाएँ। **चरण 2 — बिंब-खोज अभ्यास:** उसी पंक्ति से पूछें: "यहाँ कौन-सा बिंब है?', 'वह क्या दर्शाता है?" — जब तक छात्र \'मौन दीवार = संवादहीनता/अजनबीयत\' न कहे, दोहराएँ। **चरण 3 — 4-चरणीय टेम्पलेट दें:**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_003', difficulty: 'standard',
          question: '\'घर में वापसी\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि पद-भावार्थ अस्पष्ट हो तो c11_hin_a_cbse_16_002 के \'पद्यांश-वार भावार्थ तालिका\' को.',
          misconception: 'छात्र समझते हैं कि **\'काव्य-संरचना\' = \'छंद/तुक/अलंकार\'** — यानी केवल बाह्य सजावट। जबकि \'घर में वापसी\' में संरचना का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में वापसी\' का पाठ्य-परिवेश (setting)',
                  options: ['\'घर में वापसी\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'घर में वापसी\' का कथानक', '\'घर में वापसी\' का पात्र-चित्रण'],
                  hint: 'यदि पद-भावार्थ अस्पष्ट हो तो c11_hin_a_cbse_16_002 के \'पद्यांश-वार भावार्थ तालिका\' को दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि **\'काव्य-संरचना\' = \'छंद/तुक/अलंकार\'** — यानी केवल बाह्य सजावट। जबकि \'घर में वापसी\' में संरचना का असली अर्थ है: **पद-क्रम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**कविता का \'मूक पाठ\' कराओ:** छात्र से कहो — "आँख बंद करो, मैं पढ़ता हूँ, तुम केवल **रुकावटें (पॉज)** गिनो — कहाँ मैं.', '**पद-मानचित्र बनवाओ:** A4 शीट पर 6 खाने खींचो, हर खाने में उस पद के **प्रमुख बिंब (चित्र बनवाओ/शब्द लिखवाओ)** और.', '**क्रम-परिवर्तन प्रयोग:** तीसरे और पाँचवें पद की अदला-बदली कर पढ़वाओ — पूछो "क्या फर्क पड़ा?" — इससे संरचना की.', '**लय-लेखन:** छात्र से कहो — "अंतिम पद की लय पर एक नया पद लिखो जो \'सुबह\' का हो।" इससे वह लय-नियम अंतर्ज्ञान से समझेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_004', difficulty: 'standard',
          question: '\'घर में वापसी\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_16_002 (पद्यांश-वार भावार्थ)** पर लौटें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'केंद्रीय भाव\' = \'कविता का सारांश\'** और **\'रस\' = \'कविता पढ़कर होने वाला कोई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में वापसी\' का पात्र-चित्रण',
                  options: ['\'घर में वापसी\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'घर में वापसी\' का कथानक', '\'घर में वापसी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_16_002 (पद्यांश-वार भावार्थ)** पर लौटें — प्रत्येक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'केंद्रीय भाव\' = \'कविता का सारांश\'** और **\'रस\' = \'कविता पढ़कर होने वाला कोई भी भाव\'**। **गलत तर्क.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र से कहें — "किसी फिल्म का **प्लॉट (कहानी)** बताओ, फिर बताओ **फिल्म का \'मैसेज\' क्या.', 'प्लॉट = सारांश, मैसेज = केंद्रीय भाव।" **चरण 2 — रस-निष्पत्ति का सूत्र दें:** **विभाव + अनुभाव + व्यभिचारी = रस** — इसे.', 'उसके लिए कौन-से विभाव जुटाए गए हैं?" — इससे छात्र **प्रक्रिया** सीखेगा, उत्तर रटेगा नहीं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_005', difficulty: 'standard',
          question: '\'घर में वापसी\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'Review गुरु-लघु नियम: (1) दीर्घ स्वर (आ, ई, ऊ, ए, ऐ, ओ, औ) → गुरु; (2) ह्रस्व स्वर (अ, इ.',
          misconception: 'Students believe that **चंद (meter) and लय (rhythm) are the same thing** — they scan the poem, count matras perfectly.',
          parts: [
                { id: 'a', prompt: 'कविता के मध्य भाग में छंद के आधारभूत ढाँचे (16 मात्रा) से विचलन (deviation) कहाँ-कहाँ दिखते हैं?', answer: 'उदाहरण 1: "स्मृति के कोने / झाँकते हैं"',
                  options: ['उदाहरण 1: "स्मृति के कोने / झाँकते हैं"', 'the rhythm is regular'],
                  hint: 'Review गुरु-लघु नियम: (1) दीर्घ स्वर (आ, ई, ऊ, ए, ऐ, ओ, औ) → गुरु; (2) ह्रस्व स्वर (अ, इ, उ) → लघु.',
                  misconception: 'Students believe that **चंद (meter) and लय (rhythm) are the same thing** — they scan the poem, count matras perfectly, and declare "the.' }
          ],
            remediations: { 'meter-and-rhythm-are-the': { steps: ['**Re-teach गुरु-लघु identification** using hand-clapping: क्लैप on गुरु (2 matra), tap on लघु (1 matra) for 3 lines.', '**Dual-reading drill**: Read one stanza twice — first "robot mode" (strict matra count), then "human mode" (natural.', 'Mark differences with colored pencils: red for यति shift, blue for अनुप्रास clusters.', '**Map rhythm to emotion**: Create a 3-column table — Line | Matra Pattern | Emotional Effect — and fill for 4 key.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_006', difficulty: 'standard',
          question: '\'घर में वापसी\' का मुख्य विषय — \'घर में वापसी\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अटके तो c11_hin_a_cbse_16_002 (भावार्थ) और c11_hin_a_cbse_16_005 (छंद-लय) को दोहराएँ।',
          misconception: 'छात्र समझते हैं कि **\'अलंकार पहचानना = नाम बता देना\'** पर्याप्त है। वे लिखते हैं: "यहाँ उपमा है" या "यहाँ अनुप्रास है".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में वापसी\' का मुख्य विषय',
                  options: ['\'घर में वापसी\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'घर में वापसी\' का कथानक', '\'घर में वापसी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_16_002 (भावार्थ) और c11_hin_a_cbse_16_005 (छंद-लय) को दोहराएँ।',
                  misconception: 'छात्र समझते हैं कि **\'अलंकार पहचानना = नाम बता देना\'** पर्याप्त है। वे लिखते हैं: "यहाँ उपमा है" या "यहाँ अनुप्रास है" और रुक जाते हैं।.' }
          ],
            remediations: { '2-0': { steps: ['**चरण 1 — सूत्र कार्ड बनाएँ:** प्रत्येक अलंकार का **पहचान-सूत्र** (उपमा: \'जैसे/सा/वत\', रूपक: सीधी स्थापना, अनुप्रास.', '**चरण 2 — रंगीन कोडिंग:** कविता की फोटोकॉपी लें; **उपमा=लाल, रूपक=नीला, अनुप्रास=हरा, मानवीकरण=पीला, यमक=नारंगी.', '**चरण 3 — \'क्यों?\' कॉलम जोड़ें:** प्रत्येक हाइलाइट के सामने एक कॉलम में लिखें: "यह अलंकार यहाँ **क्या** कर रहा है?', '(भाव गहरा रहा / चित्र स्पष्ट कर रहा / ध्वनि से माहौल बना रहा / प्रतीक रच रहा)"। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
