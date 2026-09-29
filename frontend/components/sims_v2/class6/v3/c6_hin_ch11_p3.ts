import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch11_p3: SimDef = {
    id: 'v3_c6_hin_ch11_p3',
    title: 'पाठ 11 · Part 3/3',
    subtitle: 'यह नोड \'रण-बीच चौकड़ी भर-भरकर\' (मल्हार कक्षा 6, श्यामनारायण पांडेय) के इस पहलू तक सीमित.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 11 · Part 3/3',
    chapters: ['c6_hin_ch11'],
    nodeIds: ['c6_hin_cbse_11_013', 'c6_hin_cbse_11_014', 'c6_hin_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '\'रण-बीच चौकड़ी भर-भरकर\' का विश्लेषण — श्यामनारायण पांडेय ने वीर-रस — राणा प्रताप और चेतक की वीरता का वर्णन.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'रण-बीच चौकड़ी भर-भरकर\' का आलोचनात्मक चिंतन — श्यामनारायण पांडेय का उद्देश्य, पाठ की सफलता, और प्रमाण-आधारित मूल्यांकन।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — आलोचनात्मक', 'पाठ 11 — लेखन', 'पाठ 11 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_11_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 3/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — \'रण-बीच चौकड़ी भर-भरकर\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की पुष्टि करना।', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — वाचन-चर्चा — (1) गति-वाचन: कविता की तुकांत-लय में वाचन — \'रण-बीच चौकडी भर-भरकर\' से.', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 11 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_013', difficulty: 'standard',
          question: '\'रण-बीच चौकड़ी भर-भरकर\' का आलोचनात्मक चिंतन — श्यामनारायण पांडेय का उद्देश्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रण-बीच चौकड़ी भर-भरकर\' का आलोचनात्मक चिंतन',
                  options: ['\'रण-बीच चौकड़ी भर-भरकर\' का आलोचनात्मक चिंतन', '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय', '\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ', '\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_014', difficulty: 'standard',
          question: '\'रण-बीच चौकड़ी भर-भरकर\' पर पाठ-आधारित लेखन — पाठ से उद्धरण लेकर उत्तर की पुष्टि.',
          hint: 'Work step by step.',
          misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रण-बीच चौकड़ी भर-भरकर\' पर पाठ-आधारित लेखन',
                  options: ['\'रण-बीच चौकड़ी भर-भरकर\' पर पाठ-आधारित लेखन', '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय', '\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ', '\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र अपनी राय लिखते हैं, पाठ से प्रमाण नहीं — पाठ-आधारित उत्तर उद्धरण माँगता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_015', difficulty: 'standard',
          question: 'वाचन-चर्चा — (1) गति-वाचन: कविता की तुकांत-लय में वाचन — \'रण-बीच चौकडी भर-भरकर\'.',
          hint: 'यदि अटका हुआ महसूस हो तो: तीन याद — अंत-ध्वनि-ज़ोर (वाचन), \'नींद-पतंग-नक्शा\' (पहेली).',
          misconception: 'छात्र \'पतंग\' को असली-पक्षी मानते हैं — \'बिना पंख उड़ रहा\' — पतंग काइट है, असली पक्षी नहीं; \'गले में लंबी डोर\' से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-चर्चा — (1) गति-वाचन: कविता की तुकांत-लय में वाचन — \'रण-बीच चौकडी भर-भरकर\' से',
                  options: ['वाचन-चर्चा — (1) गति-वाचन: कविता की तुकांत-लय में वाचन — \'रण-बीच चौकडी भर-भरकर\' से', '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय', '\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ', '\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश'],
                  hint: 'यदि अटका हुआ महसूस हो तो: तीन याद — अंत-ध्वनि-ज़ोर (वाचन), \'नींद-पतंग-नक्शा\' (पहेली), \'युद्ध नहीं\'.',
                  misconception: 'छात्र \'पतंग\' को असली-पक्षी मानते हैं — \'बिना पंख उड़ रहा\' — पतंग काइट है, असली पक्षी नहीं; \'गले में लंबी डोर\' से काइट-डोर की पुष्टि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) गति-वाचन — अंत-ध्वनि पर ज़ोर। (2) दो पहेली — \'नींद\' (3-अक्षर-समान), \'पतंग\' (बिना-पंख-डोर)। (3) \'युद्ध.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
