import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch08_p3: SimDef = {
    id: 'v3_c7_hin_ch08_p3',
    title: 'पाठ 8 · Part 3/3',
    subtitle: 'यह नोड \'बिरजू महाराज से साक्षात्कार\' (मल्हार कक्षा 6, (साक्षात्कार/श्रेया)) के इस पहलू तक.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 8 · Part 3/3',
    chapters: ['c7_hin_ch08'],
    nodeIds: ['c7_hin_cbse_08_013', 'c7_hin_cbse_08_014', 'c7_hin_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: '\'बिरजू महाराज से साक्षात्कार\' का विश्लेषण — (साक्षात्कार/श्रेया) ने कथक कलाकार बिरजू महाराज की जीवन-यात्रा.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'बिरजू महाराज से साक्षात्कार\' का आलोचनात्मक चिंतन — (साक्षात्कार/श्रेया) का उद्देश्य, पाठ की सफलता, और प्रमाण-आधारित मूल्यांकन।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — आलोचनात्मक', 'पाठ 8 — लेखन', 'पाठ 8 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_08_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 3/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — \'बिरजू महाराज से साक्षात्कार\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की पुष्टि.', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — वाचन-चर्चा-समापन — तीन-चक्र-बंदी: (1) वाचन-अभिनय-4-आवाज़.', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_08_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_013', difficulty: 'standard',
          question: '\'बिरजू महाराज से साक्षात्कार\' का आलोचनात्मक चिंतन — (साक्षात्कार/श्रेया) का.',
          hint: 'Work step by step.',
          misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बिरजू महाराज से साक्षात्कार\' का आलोचनात्मक चिंतन',
                  options: ['\'बिरजू महाराज से साक्षात्कार\' का आलोचनात्मक चिंतन', '\'बिरजू महाराज से साक्षात्कार\' का पृष्ठभूमि और रचनाकार परिचय', '\'बिरजू महाराज से साक्षात्कार\' का कथानक/पाठ', '\'बिरजू महाराज से साक्षात्कार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_014', difficulty: 'standard',
          question: '\'बिरजू महाराज से साक्षात्कार\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की.',
          hint: 'Work step by step.',
          misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बिरजू महाराज से साक्षात्कार\' पर पाठ-आधारित लेखन',
                  options: ['\'बिरजू महाराज से साक्षात्कार\' पर पाठ-आधारित लेखन', '\'बिरजू महाराज से साक्षात्कार\' का पृष्ठभूमि और रचनाकार परिचय', '\'बिरजू महाराज से साक्षात्कार\' का कथानक/पाठ', '\'बिरजू महाराज से साक्षात्कार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_015', difficulty: 'standard',
          question: 'वाचन-चर्चा-समापन — तीन-चक्र-बंदी: (1) वाचन-अभिनय-4-आवाज़.',
          hint: 'यदि अटका हुआ महसूस हो तो: चक्र-3 + आवाज़-4 + पड़ाव-10 — वाचन-खोज-समीक्षा-3.',
          misconception: 'छात्र समापन-अभ्यास को \'अध्याय-खत्म-बकवास\' मानते हैं — वाचन-खोजबीन-समीक्षा-तीनों-काम-हैं: 4-आवाज़-वाचन-आवाज़-भेद-सिखाता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-चर्चा-समापन',
                  options: ['वाचन-चर्चा-समापन', '\'बिरजू महाराज से साक्षात्कार\' का पृष्ठभूमि और रचनाकार परिचय', '\'बिरजू महाराज से साक्षात्कार\' का कथानक/पाठ', '\'बिरजू महाराज से साक्षात्कार\' का पाठ्य-परिवेश'],
                  hint: 'यदि अटका हुआ महसूस हो तो: चक्र-3 + आवाज़-4 + पड़ाव-10 — वाचन-खोज-समीक्षा-3.',
                  misconception: 'छात्र समापन-अभ्यास को \'अध्याय-खत्म-बकवास\' मानते हैं — वाचन-खोजबीन-समीक्षा-तीनों-काम-हैं: 4-आवाज़-वाचन-आवाज़-भेद-सिखाता.' }
          ],
            remediations: { '4': { steps: ['**उपचार**: (1) चक्र-3 — वाचन-खोजबीन-समीक्षा-3। (2) आवाज़-4 — श्रेया-तनुश्री-माणिक-बिरजू-4। (3) शिकार-4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
