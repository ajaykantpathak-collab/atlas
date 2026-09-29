import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch02_p3: SimDef = {
    id: 'v3_c6_hin_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'यह नोड केवल आलोचनात्मक चिंतन तक सीमित है — लेखन/चर्चा अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c6_hin_ch02'],
    nodeIds: ['c6_hin_cbse_02_013', 'c6_hin_cbse_02_014', 'c6_hin_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'विश्लेषण: (1) नायक ने हिंसा नहीं की — नैतिक जीत; (2) \'बदला\' की धमकी मनोयुद्ध — कुशलता या छल?; (3) अंत में.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन — क्या खेल में \'बदला\' उचित है? क्या प्रतिपक्षी की गलती माफ़ी योग्य थी? क्या ध्यानचंद ने सच में खेल-भावना दिखाई या मनोयुद्ध जीता?', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_02_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 3/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — लेखन-कौशल — खेल के मैदान की किसी सच्ची घटना का संस्मरण लिखना, या इस कथा के अंत का विस्तार.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वाचन-चर्चा — \'क्या खेल में बदला उचित है?\' पर समूह-बहस; \'क्षमा बनाम प्रतिशोध\' पर मत-विमत.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 2 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन — क्या खेल में \'बदला\' उचित है? क्या प्रतिपक्षी की गलती माफ़ी.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक बात जो आपको अच्छी लगी (शक्ति) और एक जो विवादास्पद लगी (सीमा).',
          misconception: '1. छात्र \'आलोचना\' को \'केवल प्रशंसा\' मानते हैं — आलोचना में शक्ति + सीमा दोनों; संतुलित मूल्यांकन। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन',
                  options: ['आलोचनात्मक चिंतन', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक बात जो आपको अच्छी लगी (शक्ति) और एक जो विवादास्पद लगी (सीमा) — दोनों.',
                  misconception: '1. छात्र \'आलोचना\' को \'केवल प्रशंसा\' मानते हैं — आलोचना में शक्ति + सीमा दोनों; संतुलित मूल्यांकन। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) \'आलोचना\' का अर्थ समझाओ — शक्ति + सीमा/विवाद, केवल प्रशंसा नहीं। (2) \'बदला\' की धमकी को दो दृष्टियों से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_014', difficulty: 'standard',
          question: 'लेखन-कौशल — खेल के मैदान की किसी सच्ची घटना का संस्मरण लिखना, या इस कथा के अंत.',
          hint: 'यदि अटका हुआ महसूस हो तो: अपनी एक खेल-घटना चुनिए, उसके 3 चरण लिखिए — क्या हुआ, कैसे हल.',
          misconception: '1. छात्र संस्मरण में \'कल्पना\' जोड़ देते हैं — संस्मरण सच्ची घटना का है; \'मैं\' की शैली, पर सत्य। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन-कौशल — खेल के मैदान की किसी सच्ची घटना का संस्मरण लिखना, या इस कथा के अंत का विस्तार',
                  options: ['लेखन-कौशल — खेल के मैदान की किसी सच्ची घटना का संस्मरण लिखना, या इस कथा के अंत का विस्तार', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: अपनी एक खेल-घटना चुनिए, उसके 3 चरण लिखिए — क्या हुआ, कैसे हल हुआ; संस्मरण.',
                  misconception: '1. छात्र संस्मरण में \'कल्पना\' जोड़ देते हैं — संस्मरण सच्ची घटना का है; \'मैं\' की शैली, पर सत्य। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) संस्मरण-क्रम समझाओ — स्थिति→संघर्ष→समाधान। (2) प्रतिपक्षी की दृष्टि से अंत लिखवाओ। (3) अपनी खेल-घटना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_015', difficulty: 'standard',
          question: 'वाचन-चर्चा — \'क्या खेल में बदला उचित है?\' पर समूह-बहस; \'क्षमा बनाम प्रतिशोध\' पर.',
          hint: 'यदि अटका हुआ महसूस हो तो: \'बदला\' पर एक तर्क पक्ष और एक विपक्ष लिखिए — चर्चा की शुरुआत।',
          misconception: '1. छात्र \'क्षमा\' को \'हमेशा सही\' मानते हैं — चर्चा में दो पक्ष हैं; क्षमा का संदर्भ-निर्भर अर्थ भी। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-चर्चा — \'क्या खेल में बदला उचित है?\' पर समूह-बहस',
                  options: ['वाचन-चर्चा — \'क्या खेल में बदला उचित है?\' पर समूह-बहस', 'मेजर ध्यानचंद (1905–1979)', 'कथा-विवरण — दो भाग: (1) 1933 में पंजाब रेजिमेंट बनाम सैंपर्स एंड माइनर्स मैच — प्रतिपक्षी', 'परिवेश — दो परिवेश: (1) 1933 का भारत, सेना की हॉकी टीमों का मैदान (पंजाब रेजिमेंट बनाम'],
                  hint: 'यदि अटका हुआ महसूस हो तो: \'बदला\' पर एक तर्क पक्ष और एक विपक्ष लिखिए — चर्चा की शुरुआत।',
                  misconception: '1. छात्र \'क्षमा\' को \'हमेशा सही\' मानते हैं — चर्चा में दो पक्ष हैं; क्षमा का संदर्भ-निर्भर अर्थ भी। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) चर्चा-नियम समझाओ — सुनो, प्रमाण दो, सम्मान करो। (2) \'बदला\' पर दो पक्ष लिखवाओ। (3) \'हार की जीत\' का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
