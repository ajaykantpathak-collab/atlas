import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch08_p3: SimDef = {
    id: 'v3_c8_hin_ch08_p3',
    title: 'पाठ 8 · Part 3/3',
    subtitle: 'यह नोड पाठ ८ के संदर्भ में विश्लेषण और व्याख्या की **प्रक्रिया** और **लेखन कौशल** सिखाता.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 8 · Part 3/3',
    chapters: ['c8_hin_ch08'],
    nodeIds: ['c8_hin_cbse_08_013', 'c8_hin_cbse_08_014', 'c8_hin_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुम एक जासूस हो जिसे एक रहस्यमय पत्र (पाठ) मिला है — तुम पहले उसे पूरा पढ़ते हो, फिर उन वाक्यों को.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के विभिन्न तत्वों (कथानक, पात्र, भाषा, प्रतीक) को व्यवस्थित रूप से विश्लेषण (Analysis) करके उनके अंतर्संबंध खोजना और फिर उनकी व्याख्या (Interpretation) करके.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — आलोचनात्मक', 'पाठ 8 — लेखन', 'पाठ 8 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_08_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 3/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें विद्यार्थी किसी दिए गए गद्यांश/पद्यांश से प्रमाण.', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें पाठ के सस्वर वाचन या श्रवण के बाद.', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 8 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के विभिन्न तत्वों (कथानक, पात्र, भाषा.',
          hint: 'अगर फँस जाएँ तो **c8_hin_cbse_08_012 (बोध-प्रश्न)** दोहराएँ — वहाँ के आशय-सूचक प्रश्न ही.',
          misconception: 'छात्र मानते हैं कि "आलोचनात्मक चिंतन" = "नुक्स निकालना" या "लेखक से असहमत होना"। असल में, इसका अर्थ है: **पाठ की आंतरिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के विभिन्न तत्वों (कथानक, पात्र, भाषा, प्रतीक)',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के विभिन्न तत्वों (कथानक, पात्र, भाषा, प्रतीक)', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'अगर फँस जाएँ तो **c8_hin_cbse_08_012 (बोध-प्रश्न)** दोहराएँ — वहाँ के आशय-सूचक प्रश्न ही विश्लेषण.',
                  misconception: 'छात्र मानते हैं कि "आलोचनात्मक चिंतन" = "नुक्स निकालना" या "लेखक से असहमत होना"। असल में, इसका अर्थ है: **पाठ की आंतरिक तर्क-प्रणाली को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **"आलोचना" और "विवेचन" का भेद** स्पष्ट करो: दैनिक जीवन में आलोचना = दोष निकालना; साहित्य में = संरचना समझाना।.', 'एक छोटा अंश (३-४ वाक्य) दो और कहो: "इसमें **क्या गलत है** मत ढूँढो, **क्या हो रहा है** ढूँढो — फिर पूछो **क्यों?**।" ३.', '**PEEL ढाँचा** (Point, Evidence, Explanation, Link) पर एक साथ अभ्यास कराओ: बिंदु बनाओ → पाठ से प्रमाण दो → समझाओ → विषय.', 'अगले ३ दिन रोज़ एक पैराग्राफ लिखवाओ जिसमें केवल **एक युक्ति** (प्रतीक/विरोधाभास/बिंब) का विश्लेषण हो — धीरे-धीरे जटिलता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें विद्यार्थी किसी दिए गए गद्यांश/पद्यांश.',
          hint: 'यदि अटका लगे तो **c8_hin_cbse_08_012 (बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक)** दोहराएँ.',
          misconception: 'विद्यार्थी समझते हैं कि **पाठ-आधारित उत्तर का अर्थ \'पाठ का सारांश लिखना\' है** — वे पूरी कहानी दोहरा देते हैं पर प्रश्न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें विद्यार्थी किसी दिए गए गद्यांश/पद्यांश से प्रमाण',
                  options: ['पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें विद्यार्थी किसी दिए गए गद्यांश/पद्यांश से प्रमाण', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'यदि अटका लगे तो **c8_hin_cbse_08_012 (बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक)** दोहराएँ — विशेषकर.',
                  misconception: 'विद्यार्थी समझते हैं कि **पाठ-आधारित उत्तर का अर्थ \'पाठ का सारांश लिखना\' है** — वे पूरी कहानी दोहरा देते हैं पर प्रश्न के विशिष्ट कोण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**प्रश्न डिकोड करना सिखाओ:** विद्यार्थी से कहो — "प्रश्न में कौन-सा **विशेषण/क्रिया** है?', '(जैसे: ईमानदारी, संघर्ष, निर्णय)। उस शब्द को घेरो।" 2.', '**पाठ में \'कीवर्ड हंट\' कराओ:** उसी विशेषण से जुड़े संवाद/घटना/वर्णन ढूँढने को कहो — हाइलाइटर से मार्क कराओ। 3.', '**PEEL टेम्पलेट दो:** एक खाका दो जहाँ Point, Evidence, Explanation, Link के खाने बने हों — पहले दो-तीन बार इसी में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें पाठ के सस्वर वाचन या श्रवण के.',
          hint: 'यदि फँसें तो c8_hin_cbse_08_013 (आलोचनात्मक चिंतन) के \'प्रमाण-आधारित व्याख्या\' खंड को.',
          misconception: 'विद्यार्थी समझते हैं कि चर्चा-बिंदु का अर्थ है "अपनी राय देना" — जैसे "मुझे कहानी पसंद आई क्योंकि नायक बहादुर था"। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें पाठ के सस्वर वाचन या श्रवण के बाद',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें पाठ के सस्वर वाचन या श्रवण के बाद', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'यदि फँसें तो c8_hin_cbse_08_013 (आलोचनात्मक चिंतन) के \'प्रमाण-आधारित व्याख्या\' खंड को दोहराएँ।',
                  misconception: 'विद्यार्थी समझते हैं कि चर्चा-बिंदु का अर्थ है "अपनी राय देना" — जैसे "मुझे कहानी पसंद आई क्योंकि नायक बहादुर था"। वे भूल जाते हैं कि कक्षा.' }
          ],
            remediations: { '8-textual-evidence': { steps: ['विद्यार्थी को एक छोटा अनुच्छेद (पाठ 8 से) देकर कहें: "यहाँ तीन वाक्य खोजो जो नायक के भय को दर्शाते हैं" — इससे प्रमाण.', 'फिर पूछें: "इन तीन वाक्यों के आधार पर तुम क्या निष्कर्ष निकालते हो?" — इससे प्रमाण→निष्कर्ष की कड़ी बनेगी। 3.', 'अंत में कहें: "अब इसी ढाँचे (प्रमाण + निष्कर्ष) में अपना चर्चा-बिंदु लिखो" — इससे वह \'राय\' से \'विश्लेषण\' की ओर बढ़ेगा।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
