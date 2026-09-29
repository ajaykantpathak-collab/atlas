import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch11_p1: SimDef = {
    id: 'v3_c6_hin_ch11_p1',
    title: 'पाठ 11 · Part 1/3',
    subtitle: 'यह नोड \'रण-बीच चौकड़ी भर-भरकर\' (मल्हार कक्षा 6, श्यामनारायण पांडेय) के इस पहलू तक सीमित.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 11 · Part 1/3',
    chapters: ['c6_hin_ch11'],
    nodeIds: ['c6_hin_cbse_11_001', 'c6_hin_cbse_11_002', 'c6_hin_cbse_11_003', 'c6_hin_cbse_11_004', 'c6_hin_cbse_11_005', 'c6_hin_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'पहले रचनाकार: श्यामनारायण पांडेय। फिर काल और परिवेश। फिर \'रण-बीच चौकड़ी भर-भरकर\' का विषय — वीर-रस — राणा.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — पृष्ठभूमि और रचनाकार परिचय', text: '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय — श्यामनारायण पांडेय द्वारा रचित कविता (वीर-रस)। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — पृष्ठभूमि', 'पाठ 11 — कथानक', 'पाठ 11 — पाठ्य-परिवेश', 'पाठ 11 — पात्र-चित्रण', 'पाठ 11 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 1/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — \'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ — वीर-रस की कविता में राणा प्रताप का घोड़ा चेतक.', answer: '11 -', options: ['11 -', '11 -'] },
            { id: 's2', label: '11 -', prompt: 'Which idea is this? — \'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश — कविता (वीर-रस) किस स्थान, समय और वातावरण में.', answer: '11 -', options: ['11 -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 11 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_001', difficulty: 'standard',
          question: '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय — श्यामनारायण पांडेय.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'रण-बीच चौकड़ी भर-भरकर\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय', '\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ', '\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश', '\'रण-बीच चौकड़ी भर-भरकर\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'रण-बीच चौकड़ी भर-भरकर\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_002', difficulty: 'standard',
          question: '\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ — वीर-रस की कविता में राणा प्रताप का घोड़ा.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'रण-बीच चौकड़ी भर-भरकर\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ',
                  options: ['\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ', '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय', '\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश', '\'रण-बीच चौकड़ी भर-भरकर\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'रण-बीच चौकड़ी भर-भरकर\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_003', difficulty: 'standard',
          question: '\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश — कविता (वीर-रस) किस स्थान, समय और.',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश',
                  options: ['\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश', '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय', '\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ', '\'रण-बीच चौकड़ी भर-भरकर\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_004', difficulty: 'standard',
          question: '\'रण-बीच चौकड़ी भर-भरकर\' का पात्र/केंद्रीय विचार — चेतक (घोड़ा) मुख्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'रण-बीच चौकड़ी भर-भरकर\' में चेतक (घोड़ा) पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रण-बीच चौकड़ी भर-भरकर\' का पात्र/केंद्रीय विचार',
                  options: ['\'रण-बीच चौकड़ी भर-भरकर\' का पात्र/केंद्रीय विचार', '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय', '\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ', '\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'रण-बीच चौकड़ी भर-भरकर\' में चेतक (घोड़ा) पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_005', difficulty: 'standard',
          question: '\'रण-बीच चौकड़ी भर-भरकर\' के सहायक पात्र/तत्व — राणा प्रताप, शत्रु मुख्य के साथ.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रण-बीच चौकड़ी भर-भरकर\' के सहायक पात्र/तत्व',
                  options: ['\'रण-बीच चौकड़ी भर-भरकर\' के सहायक पात्र/तत्व', '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय', '\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ', '\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_006', difficulty: 'standard',
          question: '\'रण-बीच चौकड़ी भर-भरकर\' का मुख्य विषय — वीर-रस — राणा प्रताप और चेतक की वीरता.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'रण-बीच चौकड़ी भर-भरकर\' की घटनाएँ कथानक हैं, वीर-रस विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रण-बीच चौकड़ी भर-भरकर\' का मुख्य विषय',
                  options: ['\'रण-बीच चौकड़ी भर-भरकर\' का मुख्य विषय', '\'रण-बीच चौकड़ी भर-भरकर\' का पृष्ठभूमि और रचनाकार परिचय', '\'रण-बीच चौकड़ी भर-भरकर\' का कथानक/पाठ', '\'रण-बीच चौकड़ी भर-भरकर\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'रण-बीच चौकड़ी भर-भरकर\' की घटनाएँ कथानक हैं, वीर-रस विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
