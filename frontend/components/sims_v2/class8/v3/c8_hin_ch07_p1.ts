import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch07_p1: SimDef = {
    id: 'v3_c8_hin_ch07_p1',
    title: 'पाठ 7 · Part 1/3',
    subtitle: 'यह नोड \'मत बाँधो\' (मल्हार कक्षा 6, (कविता)) के इस पहलू तक सीमित है — वास्तविक पाठ पर.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 7 · Part 1/3',
    chapters: ['c8_hin_ch07'],
    nodeIds: ['c8_hin_cbse_07_001', 'c8_hin_cbse_07_002', 'c8_hin_cbse_07_003', 'c8_hin_cbse_07_004', 'c8_hin_cbse_07_005', 'c8_hin_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'पहले रचनाकार: (कविता)। फिर काल और परिवेश। फिर \'मत बाँधो\' का विषय — स्वतंत्रता — सपनों के पंख मत काटो, गति मत.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय', text: '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय — (कविता) द्वारा रचित कविता। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — पृष्ठभूमि', 'पाठ 7 — कथानक', 'पाठ 7 — पाठ्य-परिवेश', 'पाठ 7 — पात्र-चित्रण', 'पाठ 7 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 1/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — \'मत बाँधो\' का कथानक/पाठ — कविता स्वतंत्रता का संदेश — सपनों के पंख न काटो, उनकी गति मत.', answer: '7 -', options: ['7 -', '7 -'] },
            { id: 's2', label: '7 -', prompt: 'Which idea is this? — \'मत बाँधो\' का पाठ्य-परिवेश — कविता किस स्थान, समय और वातावरण में घटित है।', answer: '7 -', options: ['7 -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_001', difficulty: 'standard',
          question: '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय — (कविता) द्वारा रचित कविता। रचनाकार.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'मत बाँधो\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पाठ्य-परिवेश', '\'मत बाँधो\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'मत बाँधो\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_002', difficulty: 'standard',
          question: '\'मत बाँधो\' का कथानक/पाठ — कविता स्वतंत्रता का संदेश — सपनों के पंख न काटो, उनकी.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'मत बाँधो\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' का कथानक/पाठ',
                  options: ['\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का पाठ्य-परिवेश', '\'मत बाँधो\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'मत बाँधो\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_003', difficulty: 'standard',
          question: '\'मत बाँधो\' का पाठ्य-परिवेश — कविता किस स्थान, समय और वातावरण में घटित है।',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' का पाठ्य-परिवेश',
                  options: ['\'मत बाँधो\' का पाठ्य-परिवेश', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_004', difficulty: 'standard',
          question: '\'मत बाँधो\' का पात्र/केंद्रीय विचार — सपने मुख्य पात्र/अवधारणा है, जिसके माध्यम.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'मत बाँधो\' में सपने पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' का पात्र/केंद्रीय विचार',
                  options: ['\'मत बाँधो\' का पात्र/केंद्रीय विचार', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'मत बाँधो\' में सपने पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_005', difficulty: 'standard',
          question: '\'मत बाँधो\' के सहायक पात्र/तत्व — सौरभ, बीज मुख्य के साथ रहकर पाठ को आगे बढ़ाते.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' के सहायक पात्र/तत्व',
                  options: ['\'मत बाँधो\' के सहायक पात्र/तत्व', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_006', difficulty: 'standard',
          question: '\'मत बाँधो\' का मुख्य विषय — स्वतंत्रता — सपनों के पंख मत काटो, गति मत बाँधो।',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'मत बाँधो\' की घटनाएँ कथानक हैं, स्वतंत्रता विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' का मुख्य विषय',
                  options: ['\'मत बाँधो\' का मुख्य विषय', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'मत बाँधो\' की घटनाएँ कथानक हैं, स्वतंत्रता विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
