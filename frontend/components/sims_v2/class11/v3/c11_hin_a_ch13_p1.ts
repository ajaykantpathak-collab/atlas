import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch13_p1: SimDef = {
    id: 'v3_c11_hin_a_ch13_p1',
    title: 'जाग तुझको दूर जाना · Part 1/3',
    subtitle: 'इस नोड में **अज्ञेय (सच्चिदानंद हीरानंद वात्स्यायन)** के जीवन के केवल उन पक्षों को शामिल.',
    classLevel: 11, subject: 'hin_a', topic: 'जाग तुझको दूर जाना · Part 1/3',
    chapters: ['c11_hin_a_ch13'],
    nodeIds: ['c11_hin_a_cbse_13_001', 'c11_hin_a_cbse_13_002', 'c11_hin_a_cbse_13_003', 'c11_hin_a_cbse_13_004', 'c11_hin_a_cbse_13_005', 'c11_hin_a_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'अंतरा भाग-1 खोलिए और पाठ 13 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'जाग तुझको दूर जाना — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['जाग तुझको दूर जाना'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_13_005', title: 'जाग तुझको दूर जाना — छंद और लय-विधान',
          caseStudy: { intro: '\'जाग तुझको दूर जाना\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'पंक्ति "जाग तुझको दूर जाना" में कितनी मात्राएँ हैं? गुरु और लघु वर्णों की पहचान करके बताइए।', options: [
                { text: '**उत्तर:** "जाग तुझको दूर जाना" = जा(ग) तु(झ) को दू(र) जा(ना) → मात्रा गणना: जा(2) + ग(1)', outcome: '**उत्तर:** "जाग तुझको दूर जाना" = जा(ग) तु(झ) को दू(र) जा(ना) → मात्रा गणना: जा(2) + ग(1) + तु(1).' },
                { text: 'counting syllables', outcome: 'Not quite — Students believe that **छंद (meter) is just "counting syllables"** and that once you label the.', reveals: 'meter-is-just-counting-syllables' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through जाग तुझको दूर जाना like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? जाग तुझको दूर जाना · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — जाग तुझको दूर जाना · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'यदि फँसें तो **\'हिंदी काव्य आंदोलनों का तुलनात्मक चार्ट\' (छायावाद → प्रगतिवाद → प्रयोगवाद.',
          misconception: 'विद्यार्थी प्रायः समझते हैं कि **\'कवि परिचय\' का अर्थ कवि की \'जन्म-तिथि, मृत्यु-तिथि, प्रमुख रचनाएँ, पुरस्कार\' याद करना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का कथानक', '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)', '\'जाग तुझको दूर जाना\' का पात्र-चित्रण'],
                  hint: 'यदि फँसें तो **\'हिंदी काव्य आंदोलनों का तुलनात्मक चार्ट\' (छायावाद → प्रगतिवाद → प्रयोगवाद → नई.',
                  misconception: 'विद्यार्थी प्रायः समझते हैं कि **\'कवि परिचय\' का अर्थ कवि की \'जन्म-तिथि, मृत्यु-तिथि, प्रमुख रचनाएँ, पुरस्कार\' याद करना है** — यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** विद्यार्थी से कहें — "अज्ञेय के जीवन की **तीन घटनाएँ** चुनो जो तुम्हें सबसे अधिक \'तीव्र\' लगती हैं (जेल.', 'बाहर नहीं, भीतर।" (उत्तर: भय → जिम्मेदारी; अकेलापन → स्वर-निर्माण; विस्थापन → सार्वभौमिकता)। **चरण 3:** अब कविता के.', '**चरण 4:** अंत में लिखवाएँ — एक पैराग्राफ में: "अज्ञेय की जेल-यात्रा ने \'अंधेरे\' को **भौतिक से रूपकात्मक** कैसे बनाया?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_002', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' का कथानक — \'जाग तुझको दूर जाना\' — अंतरा भाग-1 का पाठ। पाठ.',
          hint: 'यदि फँसें तो **c11_hin_a_cbse_13_001 (कवि परिचय)** दोबारा पढ़ें — विशेषकर दिनकर के \'वीर.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'भावार्थ\' को \'अन्वय\' (Prose order) या \'शब्दार्थ\' (Word-meaning) समझकर लिख देते हैं**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जाग तुझको दूर जाना\' का कथानक',
                  options: ['\'जाग तुझको दूर जाना\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)', '\'जाग तुझको दूर जाना\' का पात्र-चित्रण'],
                  hint: 'यदि फँसें तो **c11_hin_a_cbse_13_001 (कवि परिचय)** दोबारा पढ़ें — विशेषकर दिनकर के \'वीर रस\' और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'भावार्थ\' को \'अन्वय\' (Prose order) या \'शब्दार्थ\' (Word-meaning) समझकर लिख देते हैं**। उदाहरण: "पथिक जागो.' }
          ],
            remediations: { 'prose-order-word-meaning': { steps: ['छात्र से कहो: **"पहले पद्यांश को बंद आँखों से सुनो — तुम्हें क्या महसूस होता है?', 'बेचैनी?"** — भाव पकड़ो, शब्द नहीं। 2.', 'फिर पूछो: **"कवि ने \'दूर जाना\' क्यों कहा?', '\'चलना\' क्यों नहीं?"** — शब्द-चयन (Diction) की विवेचना कराओ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_003', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटके तो `c11_hin_a_cbse_13_002` (पद्यांश-वार भावार्थ) दोहराएँ — विशेषकर पद 1, 3, 6 के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मानते हैं कि **\'पद्य-विन्यास\' का अर्थ केवल \'पंक्तियों को सुंदर ढंग से लिखना\' या \'तुक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)',
                  options: ['\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का कथानक', '\'जाग तुझको दूर जाना\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो `c11_hin_a_cbse_13_002` (पद्यांश-वार भावार्थ) दोहराएँ — विशेषकर पद 1, 3, 6 के भावार्थ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मानते हैं कि **\'पद्य-विन्यास\' का अर्थ केवल \'पंक्तियों को सुंदर ढंग से लिखना\' या \'तुक मिलाना\' है**। वे.' }
          ],
            remediations: { 'line-break': { steps: ['**चरण 1:** छात्र को कविता का **मुद्रित पाठ (printed layout)** दिखाएँ — पंक्तियों और पदों के श्वेत-स्थान (white space).', 'यदि यह गद्य होता तो क्या फर्क पड़ता?\'* **चरण 2:** एक पद (जैसे पद 1) को **गद्य में पुनर्लिखवाएँ** — फिर मूल पद्य और गद्य.', 'भाव पर क्या असर पड़ा?\'* **चरण 3:** **तुक-शब्दों को रंगीन पेन से घेरवाएँ** — पद 3 में \'आती\' ध्वनि की आवृत्ति गिनवाएँ।.', 'यदि तुक न होती तो?\'* **चरण 4:** अंत में **संरचना-भाव मैपिंग तालिका** बनवाएँ: *पद संख्या | पंक्ति-संख्या | तुक-प्रकार |.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_004', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_a_cbse_13_002 (पद्यांश-वार भावार्थ)** पर लौटें और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र प्रायः मान लेते हैं कि कविता में **\'जाग तुझको दूर जाना\'** का अर्थ है — "उठो, तुम्हें दूर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जाग तुझको दूर जाना\' का पात्र-चित्रण',
                  options: ['\'जाग तुझको दूर जाना\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का कथानक', '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_a_cbse_13_002 (पद्यांश-वार भावार्थ)** पर लौटें और प्रत्येक पद.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र प्रायः मान लेते हैं कि कविता में **\'जाग तुझको दूर जाना\'** का अर्थ है — "उठो, तुम्हें दूर किसी स्थान पर पहुँचना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read)**: छात्र से कहें — कविता के **अंतिम दो पद** मौन पढ़ें और बताएँ कि क्या साधक मंज़िल पर पहुँच गया?', '(नहीं पहुँचा, केवल चल पड़ा)। 2.', '**प्रश्न-शृंखला (Socratic questioning)**: पूछें — "यदि मंज़िल मिल गई होती, तो कवि आगे क्या कहता?" → छात्र कहेगा — "सो.', '**गीता-संदर्भ (Cross-link)**: गीता 2.47 ("कर्मण्येवाधिकारस्ते...") का श्लोक लिखवाएँ और पूछें — "कविता की कौन-सी पंक्ति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_005', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'Review "हिंदी वर्णमाला: स्वर-व्यंजन वर्गीकरण और मात्रा नियम" (Class 9-10 Hindi grammar).',
          misconception: 'Students believe that **छंद (meter) is just "counting syllables"** and that once you label the गण-s, the analysis.',
          parts: [
                { id: 'a', prompt: 'कविता में अनुप्रास अलंकार के दो उदाहरण दीजिए और विश्लेषण कीजिए कि वे लय (rhythmic density) को कैसे घनीभूत करते हैं?', answer: '**उत्तर:** 1',
                  options: ['**उत्तर:** 1', 'counting syllables'],
                  hint: 'Review "हिंदी वर्णमाला: स्वर-व्यंजन वर्गीकरण और मात्रा नियम" (Class 9-10 Hindi grammar).',
                  misconception: 'Students believe that **छंद (meter) is just "counting syllables"** and that once you label the गण-s, the analysis is complete.' }
          ],
            remediations: { 'meter-is-just-counting-syllables': { steps: ['**Return to गुरु-लघु decision tree:** Write 10 words from the poem on cards.', 'For each, apply the rule: "दीर्घ स्वर OR संयुक्त व्यंजन से पहले का स्वर = गुरु; अन्यथा लघु." Say each aloud while.', '**Re-scan one line physically:** Draw boxes for each मात्रा on paper.', 'Place each syllable in boxes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_13_006', difficulty: 'standard',
          question: '\'जाग तुझको दूर जाना\' का मुख्य विषय — \'जाग तुझको दूर जाना\' का केंद्रीय भाव और.',
          hint: 'यदि भावार्थ अस्पष्ट हो तो **c11_hin_a_cbse_13_002 (पद्यांश-वार भावार्थ)** पर लौटें.',
          misconception: '**विशिष्ट भ्रांति**: छात्र प्रायः **\'उपमा\' और \'रूपक\' को केवल \'साधन शब्दों (जैसे/सा/समान) की उपस्थिति/अनुपस्थिति\' से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जाग तुझको दूर जाना\' का मुख्य विषय',
                  options: ['\'जाग तुझको दूर जाना\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जाग तुझको दूर जाना\' का कथानक', '\'जाग तुझको दूर जाना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि भावार्थ अस्पष्ट हो तो **c11_hin_a_cbse_13_002 (पद्यांश-वार भावार्थ)** पर लौटें; विशेषकर \'पथ\'.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र प्रायः **\'उपमा\' और \'रूपक\' को केवल \'साधन शब्दों (जैसे/सा/समान) की उपस्थिति/अनुपस्थिति\' से पहचानते हैं**, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — साधन-शब्द टेस्ट**: छात्र को 5 वाक्य दें (कुछ में \'जैसे/सा\', कुछ बिना)। उसे केवल साधन-शब्द देखकर उपमा/रूपक.', '**चरण 2 — अर्थ-परीक्षण**: उन्हीं वाक्यों में पूछें: "क्या यहां दोनों वस्तुएं **पूरी तरह एक हो गई हैं** या **केवल समान.', '**चरण 3 — उत्प्रेक्षा vs अतिशयोक्ति**: दो कथन दें — "मानो वह उड़ रहा हो" (उत्प्रेक्षा) और "वह उड़कर बादल चीर गया".', '**चरण 4 — कविता-लागू**: कविता की 3 पंक्तियां दें; छात्र प्रत्येक में अलंकार नाम दे, परिभाषा लिखे, और एक वाक्य में बताए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
