import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch02_p3: SimDef = {
    id: 'v3_c8_hin_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'यह नोड \'घर में तीन\' (मल्हार कक्षा 6, (लघु-कथा/गद्य)) के इस पहलू तक सीमित है — वास्तविक.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c8_hin_ch02'],
    nodeIds: ['c8_hin_cbse_02_013', 'c8_hin_cbse_02_014', 'c8_hin_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'घर में तीन\' का विश्लेषण — (लघु-कथा/गद्य) ने घर का सराय-स्वरूप — पक्षी और जीव ही असली मक़ान-मालिक क्यों चुना?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'घर में तीन\' का आलोचनात्मक चिंतन — (लघु-कथा/गद्य) का उद्देश्य, पाठ की सफलता, और प्रमाण-आधारित मूल्यांकन।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_02_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 3/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — आलोचनात्मक — 3-स्टेशन: (1) पंक्ति-चर्चा-3[\'पंक्ति-1-माँ-ठंडी-रीडिंग-घोंसला-बना-खिड़की-बंद.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — लेखन-वाचन-समापन — 7-बेंच: (1) संवाद-अभिनय-4[\'नन्ही-परिचय + माता-पिता-नाच-रिव्यू.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_02_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_013', difficulty: 'standard',
          question: '\'घर में तीन\' का आलोचनात्मक चिंतन — (लघु-कथा/गद्य) का उद्देश्य, पाठ की सफलता, और.',
          hint: 'Work step by step.',
          misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' का आलोचनात्मक चिंतन',
                  options: ['\'घर में तीन\' का आलोचनात्मक चिंतन', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_014', difficulty: 'standard',
          question: 'आलोचनात्मक — 3-स्टेशन: (1).',
          hint: 'यदि अटका हुआ महसूस हो तो: स्टेशन-3 + पंक्ति-3 + सवाल-8 — 3-स्टेशन, 3-पंक्ति-चर्चा.',
          misconception: 'छात्र सोच-विचार में \'क्या-हुआ\' दोहराते हैं — स्तर-अंतर: स्टेशन-क्या-हुआ-पार-क्या-मतलब-कैसे-पता-पूछते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक — 3-स्टेशन: (1) पंक्ति-चर्चा-3[\'पंक्ति-1-माँ-ठंडी-रीडिंग-घोंसला-बना-खिड़की-बंद',
                  options: ['आलोचनात्मक — 3-स्टेशन: (1) पंक्ति-चर्चा-3[\'पंक्ति-1-माँ-ठंडी-रीडिंग-घोंसला-बना-खिड़की-बंद', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'यदि अटका हुआ महसूस हो तो: स्टेशन-3 + पंक्ति-3 + सवाल-8 — 3-स्टेशन, 3-पंक्ति-चर्चा, 8-सोच-सवाल; तीन.',
                  misconception: 'छात्र सोच-विचार में \'क्या-हुआ\' दोहराते हैं — स्तर-अंतर: स्टेशन-क्या-हुआ-पार-क्या-मतलब-कैसे-पता-पूछते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) स्टेशन-3 — पंक्ति-सोच-अनुमान-3-स्टेशन। (2) पंक्ति-3 — खिड़की-रास्ता-कीमत-3-पंक्ति। (3) सवाल-8-6 — सोच-8.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_015', difficulty: 'standard',
          question: 'लेखन-वाचन-समापन — 7-बेंच: (1) संवाद-अभिनय-4[\'नन्ही-परिचय + माता-पिता-नाच-रिव्यू.',
          hint: 'यदि अटका हुआ महसूस हो तो: बेंच-7 + दृश्य-4 + मित्र-4 — 7-बेंच-नाम, 4-अभिनय-दृश्य.',
          misconception: 'छात्र झरोखे-से को \'अतिरिक्त-कहानी\' मानते हैं — कथा-आईना: मित्रलाभ-मुख्य-कहानी-का-आईना-जोड़ी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन-वाचन-समापन — 7-बेंच: (1) संवाद-अभिनय-4[\'नन्ही-परिचय + माता-पिता-नाच-रिव्यू +',
                  options: ['लेखन-वाचन-समापन — 7-बेंच: (1) संवाद-अभिनय-4[\'नन्ही-परिचय + माता-पिता-नाच-रिव्यू +', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'यदि अटका हुआ महसूस हो तो: बेंच-7 + दृश्य-4 + मित्र-4 — 7-बेंच-नाम, 4-अभिनय-दृश्य, 4-मित्र-पात्र.',
                  misconception: 'छात्र झरोखे-से को \'अतिरिक्त-कहानी\' मानते हैं — कथा-आईना: मित्रलाभ-मुख्य-कहानी-का-आईना-जोड़ी.' }
          ],
            remediations: { '2-1': { steps: ['**उपचार**: (1) बेंच-7 — अभिनय-बदली-प्राणी-तालिका-मल्हार-विवाद-झरोखा-7-नाम। (2) दृश्य-4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
