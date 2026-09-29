import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch06_p1: SimDef = {
    id: 'v3_c6_hin_ch06_p1',
    title: 'पाठ 6 · Part 1/3',
    subtitle: 'यह नोड \'मेरी लखनऊ यात्रा\' (मल्हार कक्षा 6, (आत्मकथा/स्वतंत्रता-स्मरण)) के इस पहलू तक.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 6 · Part 1/3',
    chapters: ['c6_hin_ch06'],
    nodeIds: ['c6_hin_cbse_06_001', 'c6_hin_cbse_06_002', 'c6_hin_cbse_06_003', 'c6_hin_cbse_06_004', 'c6_hin_cbse_06_005', 'c6_hin_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'पहले रचनाकार: (आत्मकथा/स्वतंत्रता-स्मरण)। फिर काल और परिवेश। फिर \'मेरी लखनऊ यात्रा\' का विषय.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — पृष्ठभूमि और रचनाकार परिचय', text: '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय — (आत्मकथा/स्वतंत्रता-स्मरण) द्वारा रचित गद्य। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — पृष्ठभूमि', 'पाठ 6 — कथानक', 'पाठ 6 — पाठ्य-परिवेश', 'पाठ 6 — पात्र-चित्रण', 'पाठ 6 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 1/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — \'मेरी लखनऊ यात्रा\' का कथानक/पाठ — लेखक लखनऊ कांग्रेस में जाने की इच्छा, माता-पिता का.', answer: '6 -', options: ['6 -', '6 -'] },
            { id: 's2', label: '6 -', prompt: 'Which idea is this? — \'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश — गद्य किस स्थान, समय और वातावरण में घटित है।', answer: '6 -', options: ['6 -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_001', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय — (आत्मकथा/स्वतंत्रता-स्मरण).',
          hint: 'Work step by step.',
          misconception: 'छात्र \'मेरी लखनऊ यात्रा\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश', '\'मेरी लखनऊ यात्रा\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'मेरी लखनऊ यात्रा\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_002', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ — लेखक लखनऊ कांग्रेस में जाने की इच्छा.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'मेरी लखनऊ यात्रा\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ',
                  options: ['\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश', '\'मेरी लखनऊ यात्रा\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'मेरी लखनऊ यात्रा\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_003', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश — गद्य किस स्थान, समय और वातावरण में घटित है।',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश',
                  options: ['\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_004', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' का पात्र/केंद्रीय विचार — लेखक मुख्य पात्र/अवधारणा है, जिसके.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'मेरी लखनऊ यात्रा\' में लेखक पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' का पात्र/केंद्रीय विचार',
                  options: ['\'मेरी लखनऊ यात्रा\' का पात्र/केंद्रीय विचार', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'मेरी लखनऊ यात्रा\' में लेखक पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_005', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' के सहायक पात्र/तत्व — रामप्रसाद बिस्मिल, दादीजी-पिताजी मुख्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' के सहायक पात्र/तत्व',
                  options: ['\'मेरी लखनऊ यात्रा\' के सहायक पात्र/तत्व', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_006', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' का मुख्य विषय — स्वतंत्रता-संघर्ष के दिनों की यात्रा.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'मेरी लखनऊ यात्रा\' की घटनाएँ कथानक हैं, स्वतंत्रता-संघर्ष के दिनों की यात्रा विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' का मुख्य विषय',
                  options: ['\'मेरी लखनऊ यात्रा\' का मुख्य विषय', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'मेरी लखनऊ यात्रा\' की घटनाएँ कथानक हैं, स्वतंत्रता-संघर्ष के दिनों की यात्रा विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
