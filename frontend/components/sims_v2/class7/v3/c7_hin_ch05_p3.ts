import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch05_p3: SimDef = {
    id: 'v3_c7_hin_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'यह नोड \'अस्पताल की यात्रा\' (मल्हार कक्षा 6, (संस्मरण/गद्य)) के इस पहलू तक सीमित है.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c7_hin_ch05'],
    nodeIds: ['c7_hin_cbse_05_013', 'c7_hin_cbse_05_014', 'c7_hin_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: '\'अस्पताल की यात्रा\' का विश्लेषण — (संस्मरण/गद्य) ने अस्पताल का अनुभव — देखभाल, शांति और सेवा का माहौल क्यों.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'अस्पताल की यात्रा\' का आलोचनात्मक चिंतन — (संस्मरण/गद्य) का उद्देश्य, पाठ की सफलता, और प्रमाण-आधारित मूल्यांकन।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_05_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 3/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — \'अस्पताल की यात्रा\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की पुष्टि करना।', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — \'अस्पताल की यात्रा\' पर वाचन-श्रवण और चर्चा — गद्य को सुनने, पढ़ने और उस पर विचार-विमर्श.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 5 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_013', difficulty: 'standard',
          question: '\'अस्पताल की यात्रा\' का आलोचनात्मक चिंतन — (संस्मरण/गद्य) का उद्देश्य, पाठ की.',
          hint: 'Work step by step.',
          misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अस्पताल की यात्रा\' का आलोचनात्मक चिंतन',
                  options: ['\'अस्पताल की यात्रा\' का आलोचनात्मक चिंतन', '\'अस्पताल की यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'अस्पताल की यात्रा\' का कथानक/पाठ', '\'अस्पताल की यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_014', difficulty: 'standard',
          question: '\'अस्पताल की यात्रा\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की पुष्टि.',
          hint: 'Work step by step.',
          misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अस्पताल की यात्रा\' पर पाठ-आधारित लेखन',
                  options: ['\'अस्पताल की यात्रा\' पर पाठ-आधारित लेखन', '\'अस्पताल की यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'अस्पताल की यात्रा\' का कथानक/पाठ', '\'अस्पताल की यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_015', difficulty: 'standard',
          question: '\'अस्पताल की यात्रा\' पर वाचन-श्रवण और चर्चा — गद्य को सुनने, पढ़ने और उस पर.',
          hint: 'Work step by step.',
          misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अस्पताल की यात्रा\' पर वाचन-श्रवण और चर्चा',
                  options: ['\'अस्पताल की यात्रा\' पर वाचन-श्रवण और चर्चा', '\'अस्पताल की यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'अस्पताल की यात्रा\' का कथानक/पाठ', '\'अस्पताल की यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
