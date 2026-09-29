import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch06_p3: SimDef = {
    id: 'v3_c8_hin_ch06_p3',
    title: 'एक टोकरी भर मट्टिी · Part 3/3',
    subtitle: 'यह नोड \'गरीब वृद्धा और ज़मींदार\' (मल्हार कक्षा 6, (सामाजिक कथा)) के इस पहलू तक सीमित है.',
    classLevel: 8, subject: 'hin', topic: 'एक टोकरी भर मट्टिी · Part 3/3',
    chapters: ['c8_hin_ch06'],
    nodeIds: ['c8_hin_cbse_06_013', 'c8_hin_cbse_06_014', 'c8_hin_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'गरीब वृद्धा और ज़मींदार\' का विश्लेषण — (सामाजिक कथा) ने गरीबी और अत्याचार — ज़मींदार के महल के पास वृद्धा की.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'एक टोकरी भर मट्टिी — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'गरीब वृद्धा और ज़मींदार\' का आलोचनात्मक चिंतन — (सामाजिक कथा) का उद्देश्य, पाठ की सफलता, और प्रमाण-आधारित मूल्यांकन।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['एक टोकरी भर मट्टिी'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You finished एक टोकरी भर मट्टिी — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_013', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' का आलोचनात्मक चिंतन — (सामाजिक कथा) का उद्देश्य, पाठ.',
          hint: 'Work step by step.',
          misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' का आलोचनात्मक चिंतन',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' का आलोचनात्मक चिंतन', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_014', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की.',
          hint: 'Work step by step.',
          misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' पर पाठ-आधारित लेखन',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' पर पाठ-आधारित लेखन', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_015', difficulty: 'standard',
          question: '\'गरीब वृद्धा और ज़मींदार\' पर वाचन-श्रवण और चर्चा — कहानी को सुनने, पढ़ने और उस.',
          hint: 'Work step by step.',
          misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गरीब वृद्धा और ज़मींदार\' पर वाचन-श्रवण और चर्चा',
                  options: ['\'गरीब वृद्धा और ज़मींदार\' पर वाचन-श्रवण और चर्चा', '\'गरीब वृद्धा और ज़मींदार\' का पृष्ठभूमि और रचनाकार परिचय', '\'गरीब वृद्धा और ज़मींदार\' का कथानक/पाठ', '\'गरीब वृद्धा और ज़मींदार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
