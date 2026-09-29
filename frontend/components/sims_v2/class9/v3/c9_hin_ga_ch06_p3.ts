import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch06_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch06_p3',
    title: 'पाठ 6 · Part 3/3',
    subtitle: 'यह नोड पाठ 6 के संदर्भ में आलोचनात्मक विश्लेषण और व्याख्या की प्रक्रिया (साक्ष्य-आधारित.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 6 · Part 3/3',
    chapters: ['c9_hin_ga_ch06'],
    nodeIds: ['c9_hin_ga_cbse_06_013', 'c9_hin_ga_cbse_06_014', 'c9_hin_ga_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'प्रेमचंद के फटे जूते\' का विश्लेषण — (निबंध) का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'प्रेमचंद के फटे जूते\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — आलोचनात्मक', 'पाठ 6 — लेखन', 'पाठ 6 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_06_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 3/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — \'प्रेमचंद के फटे जूते\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '6 -', options: ['6 -', '6 - -'] },
            { id: 's2', label: '6 - -', prompt: 'Which idea is this? — \'प्रेमचंद के फटे जूते\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.', answer: '6 - -', options: ['6 - -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 6 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_013', difficulty: 'standard',
          question: '\'प्रेमचंद के फटे जूते\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि फंसें तो **c9_hin_ga_cbse_06_008 (बिंब/रूपक)** और **c9_hin_ga_cbse_06_009.',
          misconception: '**विशिष्ट भ्रांति:** "आलोचनात्मक चिंतन का अर्थ है पाठ में कमियाँ निकालना (Criticize) या अपनी निजी राय (Opinion) देना।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'प्रेमचंद के फटे जूते\' का आलोचनात्मक चिंतन',
                  options: ['\'प्रेमचंद के फटे जूते\' का आलोचनात्मक चिंतन', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'प्रेमचंद के फटे जूते\' का कथानक', '\'प्रेमचंद के फटे जूते\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसें तो **c9_hin_ga_cbse_06_008 (बिंब/रूपक)** और **c9_hin_ga_cbse_06_009 (विरोधाभास/प्रतीक)**.',
                  misconception: '**विशिष्ट भ्रांति:** "आलोचनात्मक चिंतन का अर्थ है पाठ में कमियाँ निकालना (Criticize) या अपनी निजी राय (Opinion) देना।" **छात्र ऐसा क्यों.' }
          ],
            remediations: { 'criticize-opinion': { steps: ['**शब्द-भेद स्पष्ट करें:** कक्षा में \'आलोचना\' (Criticism - दैनिक अर्थ: निंदा) और \'आलोचनात्मक चिंतन\' (Critical Thinking.', '**\'राय\' बनाम \'तर्क\' का अभ्यास:** एक विवादास्पद प्रसंग दें। पहले छात्रों से "आपकी राय" लिखवाएं, फिर उसी प्रसंग पर "पाठ.', '**साक्ष्य-तर्क-निष्कर्ष (Evidence-Reasoning-Claim) ढांचा दें:** हर उत्तर के लिए तीन कॉलम का टेम्पलेट दें: (कॉलम 1) पाठ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_014', difficulty: 'standard',
          question: '\'प्रेमचंद के फटे जूते\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटके: c9_hin_ga_cbse_06_013 (आलोचनात्मक चिंतन) पर लौटकर "कैसे/क्यों" प्रश्नों का.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि "पाठ से उद्धरण देना" (quoting) ही Evidence चरण पूरा करता है — वे 2-3.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'प्रेमचंद के फटे जूते\' पर पाठ-आधारित लेखन',
                  options: ['\'प्रेमचंद के फटे जूते\' पर पाठ-आधारित लेखन', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'प्रेमचंद के फटे जूते\' का कथानक', '\'प्रेमचंद के फटे जूते\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: c9_hin_ga_cbse_06_013 (आलोचनात्मक चिंतन) पर लौटकर "कैसे/क्यों" प्रश्नों का अभ्यास करें.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि "पाठ से उद्धरण देना" (quoting) ही Evidence चरण पूरा करता है — वे 2-3 पंक्तियाँ कॉपी कर देते.' }
          ],
            remediations: { 'quoting-evidence-2-3-link': { steps: ['**मॉडलिंग:** विद्यार्थी के सामने एक कमजोर उत्तर (केवल Evidence, बिना Explanation) और उसका सुधारा रूप (Explanation जोड़ा.', '**साझा लेखन:** एक नया प्रश्न लें; आप Point और Evidence लिखें, विद्यार्थी से *केवल* Explanation लिखवाएँ — प्रॉम्प्ट दें.', '\'क्योंकि\' या \'इससे पता चलता है कि\' से शुरू करो।" 3.', '**रंग-कोडिंग अभ्यास:** उनके लिखे उत्तर में हरे रंग से Point, पीले से Evidence, नीले से Explanation, गुलाबी से Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_015', difficulty: 'standard',
          question: '\'प्रेमचंद के फटे जूते\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि अटके तो c9_hin_ga_cbse_06_013 (आलोचनात्मक चिंतन) पर लौटकर \'पाठ-तनाव पहचानना\' पुनः.',
          misconception: 'छात्र अक्सर समझते हैं कि चर्चा-बिंदु का अर्थ है \'पाठ से प्रश्न बनाना\' — वे पाठ के तथ्यात्मक विवरणों पर प्रश्न बना लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'प्रेमचंद के फटे जूते\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'प्रेमचंद के फटे जूते\' पर वाचन-श्रवण और चर्चा-बिंदु', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'प्रेमचंद के फटे जूते\' का कथानक', '\'प्रेमचंद के फटे जूते\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c9_hin_ga_cbse_06_013 (आलोचनात्मक चिंतन) पर लौटकर \'पाठ-तनाव पहचानना\' पुनः अभ्यास करो।',
                  misconception: 'छात्र अक्सर समझते हैं कि चर्चा-बिंदु का अर्थ है \'पाठ से प्रश्न बनाना\' — वे पाठ के तथ्यात्मक विवरणों पर प्रश्न बना लेते हैं (जैसे \'नायक का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को पाठ 6 का एक छोटा अंश (5-6 पंक्तियाँ) देकर कहो: \'यहाँ तीन ऐसे प्रश्न लिखो जिनका उत्तर पाठ में सीधे नहीं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
