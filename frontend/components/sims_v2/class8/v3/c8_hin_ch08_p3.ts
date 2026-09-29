import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch08_p3: SimDef = {
    id: 'v3_c8_hin_ch08_p3',
    title: 'पाठ 8 · Part 3/3',
    subtitle: 'यह नोड \'भारत का बड़ा नगर (नाट्य-दृश्य)\' (मल्हार कक्षा 6, (नाटक-अंश)) के इस पहलू तक सीमित.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 8 · Part 3/3',
    chapters: ['c8_hin_ch08'],
    nodeIds: ['c8_hin_cbse_08_013', 'c8_hin_cbse_08_014', 'c8_hin_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का विश्लेषण — (नाटक-अंश) ने नाट्य-दृश्य — ग्रीष्म रात के आठ बजे साधारण.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का आलोचनात्मक चिंतन — (नाटक-अंश) का उद्देश्य, पाठ की सफलता, और प्रमाण-आधारित मूल्यांकन।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — आलोचनात्मक', 'पाठ 8 — लेखन', 'पाठ 8 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_08_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 3/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — \'भारत का बड़ा नगर (नाट्य-दृश्य)\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की पुष्टि.', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — अभिनय-झरोखा-समापन — 4-स्टेशन.', answer: '8 - -', options: ['8 - -', '8 -'] }
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
          question: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का आलोचनात्मक चिंतन — (नाटक-अंश) का उद्देश्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का आलोचनात्मक चिंतन',
                  options: ['\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का आलोचनात्मक चिंतन', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पृष्ठभूमि और रचनाकार परिचय', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का कथानक/पाठ', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_014', difficulty: 'standard',
          question: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर.',
          hint: 'Work step by step.',
          misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' पर पाठ-आधारित लेखन',
                  options: ['\'भारत का बड़ा नगर (नाट्य-दृश्य)\' पर पाठ-आधारित लेखन', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पृष्ठभूमि और रचनाकार परिचय', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का कथानक/पाठ', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_015', difficulty: 'standard',
          question: 'अभिनय-झरोखा-समापन — 4-स्टेशन.',
          hint: 'यदि अटका हुआ महसूस हो तो: खोजबीन-3 + झरोखा-2 + सृजन-3 — 3-शोध, 2-पक्ष, 3-काम; तीन मिले तो.',
          misconception: 'छात्र \'पुराने-शब्द-तार-आना-गज-बस-आउटडेटेड-भूल-जाओ\' समझते हैं — खोजबीन-अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अभिनय-झरोखा-समापन',
                  options: ['अभिनय-झरोखा-समापन', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पृष्ठभूमि और रचनाकार परिचय', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का कथानक/पाठ', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पाठ्य-परिवेश'],
                  hint: 'यदि अटका हुआ महसूस हो तो: खोजबीन-3 + झरोखा-2 + सृजन-3 — 3-शोध, 2-पक्ष, 3-काम; तीन मिले तो समापन.',
                  misconception: 'छात्र \'पुराने-शब्द-तार-आना-गज-बस-आउटडेटेड-भूल-जाओ\' समझते हैं — खोजबीन-अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) खोजबीन-3 — तार-+आना-+गज-3-युग-शब्द। (2) झरोखा-2 — प्ले-लूट-+निराला-आनंद-2-फल। (3) सृजन-3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
