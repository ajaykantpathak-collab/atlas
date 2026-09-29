import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch10_p3: SimDef = {
    id: 'v3_c8_hin_ch10_p3',
    title: 'तरुण के स्वप्न · Part 3/3',
    subtitle: 'यह नोड \'स्वाधीन समाज का सपना (नेताजी)\' (मल्हार कक्षा 6, सुभाष चंद्र बोस) के इस पहलू तक.',
    classLevel: 8, subject: 'hin', topic: 'तरुण के स्वप्न · Part 3/3',
    chapters: ['c8_hin_ch10'],
    nodeIds: ['c8_hin_cbse_10_013', 'c8_hin_cbse_10_014', 'c8_hin_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'स्वाधीन समाज का सपना (नेताजी)\' का विश्लेषण — सुभाष चंद्र बोस ने नेताजी का स्वप्न — स्वाधीन, संपन्न, समतामूलक.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तरुण के स्वप्न — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'स्वाधीन समाज का सपना (नेताजी)\' का आलोचनात्मक चिंतन — सुभाष चंद्र बोस का उद्देश्य, पाठ की सफलता, और प्रमाण-आधारित मूल्यांकन।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तरुण के स्वप्न —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You finished तरुण के स्वप्न — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_013', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' का आलोचनात्मक चिंतन — सुभाष चंद्र बोस का.',
          hint: 'Work step by step.',
          misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' का आलोचनात्मक चिंतन',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' का आलोचनात्मक चिंतन', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_014', difficulty: 'standard',
          question: 'लेखन-परियोजना — 4-कसरत-1-ढाँचा.',
          hint: 'यदि अटका हुआ महसूस हो तो: स्वप्न-2 + तरीका-2 + संग्रह-1 — 2-पैमाने, 2-प्रॉम्प्ट.',
          misconception: 'छात्र लेखन-कसरतों को \'रचना-लिखने-की-कसरत-अच्छी-भाषा-दिखाओ\' समझते हैं — ढाँचा-अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन-परियोजना — 4-कसरत-1-ढाँचा:',
                  options: ['लेखन-परियोजना — 4-कसरत-1-ढाँचा:', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'यदि अटका हुआ महसूस हो तो: स्वप्न-2 + तरीका-2 + संग्रह-1 — 2-पैमाने, 2-प्रॉम्प्ट, 1-क्यूरेटर; तीन.',
                  misconception: 'छात्र लेखन-कसरतों को \'रचना-लिखने-की-कसरत-अच्छी-भाषा-दिखाओ\' समझते हैं — ढाँचा-अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) स्वप्न-2 — देश-+समाज-2-पैमाने-क्लॉज-ढाँचा। (2) तरीका-2 — योजना-5-तरीके-+चेहरा-ठोस-इंसान। (3) संग्रह-1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_015', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' पर वाचन-श्रवण और चर्चा — गद्य (उद्बोधन) को.',
          hint: 'Work step by step.',
          misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' पर वाचन-श्रवण और चर्चा',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' पर वाचन-श्रवण और चर्चा', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
