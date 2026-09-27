import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch27_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch27_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch27_p3',
    title: 'अब कहाँ दूसरे के दुख से दुखी होने वाले · Part 3/3',
    subtitle: 'यह नोड \'अब कहाँ दूसरे के दुख से दुखी होने वाले\' पाठ के **विश्लेषण और व्याख्या** कौशल तक.',
    classLevel: 10, subject: 'hin_sp', topic: 'अब कहाँ दूसरे के दुख से दुखी होने वाले · Part 3/3',
    chapters: ['c10_hin_sp_ch27'],
    nodeIds: ['c10_hin_sp_cbse_27_013', 'c10_hin_sp_cbse_27_014', 'c10_hin_sp_cbse_27_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'क्या तुमने कभी गौर किया है कि जब शिक्षक पूछते हैं "इस पंक्ति का आशय स्पष्ट कीजिए", तो तुम पंक्ति का भावार्थ.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'अब कहाँ दूसरे के दुख से दुखी होने वाले — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन एक उच्च-क्रम की सोच प्रक्रिया है जिसमें पाठ को केवल स्वीकार न करके, उसके अंतर्निहित तर्क, प्रमाण, पूर्वाग्रह और निहितार्थ की जाँच की जाती है तथा पाठ्य-साक्ष्य (Textual Evidence) के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_27_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['अब कहाँ दूसरे के'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_27_015', title: 'You made it',
          caseStudy: { intro: 'You finished अब कहाँ दूसरे के दुख से दुखी होने वाले — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन एक उच्च-क्रम की सोच प्रक्रिया है जिसमें पाठ को केवल स्वीकार न.',
          hint: 'यदि विश्लेषण में अटकें, तो **c10_hin_sp_cbse_27_008 (साहित्यिक उपकरण)** दोहराएँ — विशेषकर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"आलोचनात्मक चिंतन/विश्लेषण" का अर्थ पाठ की कमियाँ निकालना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन एक उच्च-क्रम की सोच प्रक्रिया है जिसमें पाठ को केवल स्वीकार न करके, उसके',
                  options: ['आलोचनात्मक चिंतन एक उच्च-क्रम की सोच प्रक्रिया है जिसमें पाठ को केवल स्वीकार न करके, उसके', 'यह कविता **सूर्यकांत त्रिपाठी \'निराला\'** द्वारा रचित एक **प्रगतिवादी (प्रगतिशील) कविता**', '**कथानक (Plot)** कहानी की घटनाओं का **कार्य-कारण संबंध (cause-effect link)** सहित', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का **काल, स्थान और सामाजिक'],
                  hint: 'यदि विश्लेषण में अटकें, तो **c10_hin_sp_cbse_27_008 (साहित्यिक उपकरण)** दोहराएँ — विशेषकर \'व्यंग्य\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"आलोचनात्मक चिंतन/विश्लेषण" का अर्थ पाठ की कमियाँ निकालना (Criticize/Fault-finding) या केवल.' }
          ],
            remediations: { 'criticize-fault-finding-judicious-examination': { steps: ['**शब्द-भेद स्पष्ट करें:** कक्षा में \'Criticism\' (निंदा) और \'Critical Thinking\' (विवेकपूर्ण चिंतन) का अंतर एक चार्ट पर.', '**\'संतुलित उत्तर\' का मॉडल दें:** पाठ का एक अंश लें और दर्शाएँ कि कैसे **दोनों पक्ष** (लेखक की सफलता: प्रतीक योजना, भाषा.', '**अभ्यास कराएँ:** एक छोटा अनुच्छेद दें और कहें: "इसके तीन बल और एक सीमा लिखो।" फिर चर्चा करें कि सीमा बताने से उत्तर.', '**बोर्ड उत्तर दिखाएँ:** CBSE टॉपर्स की उत्तर पुस्तिकाओं (Model Answers) के अंश दिखाएँ जहाँ उन्होंने पाठ की सराहना भी की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_014', difficulty: 'standard',
          question: 'लेखन कौशल (पाठ-आधारित) का अर्थ है: किसी दिए गए गद्यांश या काव्यांश के आधार पर.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_27_013 (आलोचनात्मक विवेचन)** दोहराएँ — वहाँ दी गई विडंबना.',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित प्रश्नों में पाठ का सारांश (summary) लिख देने से पूरे अंक मिल जाते हैं।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल (पाठ-आधारित) का अर्थ है: किसी दिए गए गद्यांश या काव्यांश के आधार पर पूछे गए',
                  options: ['लेखन कौशल (पाठ-आधारित) का अर्थ है: किसी दिए गए गद्यांश या काव्यांश के आधार पर पूछे गए', 'यह कविता **सूर्यकांत त्रिपाठी \'निराला\'** द्वारा रचित एक **प्रगतिवादी (प्रगतिशील) कविता**', '**कथानक (Plot)** कहानी की घटनाओं का **कार्य-कारण संबंध (cause-effect link)** सहित', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का **काल, स्थान और सामाजिक'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_27_013 (आलोचनात्मक विवेचन)** दोहराएँ — वहाँ दी गई विडंबना, प्रतीक.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित प्रश्नों में पाठ का सारांश (summary) लिख देने से पूरे अंक मिल जाते हैं।" **वास्तविकता:** CBSE बोर्ड में.' }
          ],
            remediations: { 'summary-cbse-0-1-analysis': { steps: ['**चरणबद्ध सुधार (Remediation):** 1.', '**पहचान:** छात्र से पूछें — "तुमने उत्तर में पाठ की कौन-सी **ठीक पंक्ति/संवाद** उद्धृत किया?" यदि वह नहीं बता पाए →.', '**मॉडलिंग:** उसी प्रश्न का एक **कमजोर उत्तर (केवल सारांश)** और एक **बलवान उत्तर (PEEL)** साथ रखकर दिखाएँ। छात्र से कहें.', 'कौन-सा उत्तर तुम्हें अधिक प्रभावी लगता है और क्यों?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वे पूर्व-निर्धारित विषय-वस्तु या प्रश्न हैं जो किसी पाठ.',
          hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_27_006 (मुख्य विषय)** और.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि **चर्चा-बिंदु = पाठ्यक्रम-प्रश्न (textbook question)** और इसलिए वे NCERT के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वे पूर्व-निर्धारित विषय-वस्तु या प्रश्न हैं जो किसी पाठ',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वे पूर्व-निर्धारित विषय-वस्तु या प्रश्न हैं जो किसी पाठ', 'यह कविता **सूर्यकांत त्रिपाठी \'निराला\'** द्वारा रचित एक **प्रगतिवादी (प्रगतिशील) कविता**', '**कथानक (Plot)** कहानी की घटनाओं का **कार्य-कारण संबंध (cause-effect link)** सहित', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का **काल, स्थान और सामाजिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_27_006 (मुख्य विषय)** और **c10_hin_sp_cbse_27_012.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि **चर्चा-बिंदु = पाठ्यक्रम-प्रश्न (textbook question)** और इसलिए वे NCERT के अंत में दिए गए.' }
          ],
            remediations: { 'textbook-question-ncert-9': { steps: ['**भेद स्पष्ट करें:** विद्यार्थी के सामने NCERT के \'बोध-प्रश्न\' और एक आदर्श \'चर्चा-बिंदु\' साथ रखें — अंतर दिखाएँ.', '**अभ्यास दें:** पाठ के 3 प्रसंग चुनकर उन पर **केवल चर्चा-बिंदु** बनाने को कहें (उत्तर नहीं) — फिर कक्षा में उनके.', '**तर्क-ढाँचा सिखाएँ:** हर चर्चा-बिंदु पर बोलने के लिए **PEEL** ढाँचा दें — **P**oint (मत), **E**vidence (पाठ-संदर्भ).', '**फीडबैक लूप:** प्रत्येक बोलने के बाद सहपाठी और शिक्षक से **विशिष्ट प्रतिक्रिया** लें: "तर्क पाठ से आया या बाहर से?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
