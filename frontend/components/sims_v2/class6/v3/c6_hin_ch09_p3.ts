import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch09_p3: SimDef = {
    id: 'v3_c6_hin_ch09_p3',
    title: 'पाठ 9 · Part 3/3',
    subtitle: 'यह नोड \'मैया मैं नहिं माखन खायो\' (मल्हार कक्षा 6, सूरदास) के इस पहलू तक सीमित है.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 9 · Part 3/3',
    chapters: ['c6_hin_ch09'],
    nodeIds: ['c6_hin_cbse_09_013', 'c6_hin_cbse_09_014', 'c6_hin_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '\'मैया मैं नहिं माखन खायो\' का विश्लेषण — सूरदास ने बालकृष्ण की माखन-लीला और माता-पुत्र का प्रेम क्यों चुना?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'मैया मैं नहिं माखन खायो\' का आलोचनात्मक चिंतन — सूरदास का उद्देश्य, पाठ की सफलता, और प्रमाण-आधारित मूल्यांकन।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — आलोचनात्मक', 'पाठ 9 — लेखन', 'पाठ 9 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_09_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 3/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — \'मैया मैं नहिं माखन खायो\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की पुष्टि करना।', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — \'मैया मैं नहिं माखन खायो\' पर वाचन-श्रवण और चर्चा — कविता (पद) को सुनने, पढ़ने और उस पर.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 9 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_013', difficulty: 'standard',
          question: '\'मैया मैं नहिं माखन खायो\' का आलोचनात्मक चिंतन — सूरदास का उद्देश्य, पाठ की.',
          hint: 'Work step by step.',
          misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैया मैं नहिं माखन खायो\' का आलोचनात्मक चिंतन',
                  options: ['\'मैया मैं नहिं माखन खायो\' का आलोचनात्मक चिंतन', '\'मैया मैं नहिं माखन खायो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मैया मैं नहिं माखन खायो\' का कथानक/पाठ', '\'मैया मैं नहिं माखन खायो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_014', difficulty: 'standard',
          question: '\'मैया मैं नहिं माखन खायो\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की.',
          hint: 'Work step by step.',
          misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैया मैं नहिं माखन खायो\' पर पाठ-आधारित लेखन',
                  options: ['\'मैया मैं नहिं माखन खायो\' पर पाठ-आधारित लेखन', '\'मैया मैं नहिं माखन खायो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मैया मैं नहिं माखन खायो\' का कथानक/पाठ', '\'मैया मैं नहिं माखन खायो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_015', difficulty: 'standard',
          question: '\'मैया मैं नहिं माखन खायो\' पर वाचन-श्रवण और चर्चा — कविता (पद) को सुनने, पढ़ने.',
          hint: 'Work step by step.',
          misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैया मैं नहिं माखन खायो\' पर वाचन-श्रवण और चर्चा',
                  options: ['\'मैया मैं नहिं माखन खायो\' पर वाचन-श्रवण और चर्चा', '\'मैया मैं नहिं माखन खायो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मैया मैं नहिं माखन खायो\' का कथानक/पाठ', '\'मैया मैं नहिं माखन खायो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
