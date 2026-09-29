import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch02_p1: SimDef = {
    id: 'v3_c8_hin_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'यह नोड \'घर में तीन\' (मल्हार कक्षा 6, (लघु-कथा/गद्य)) के इस पहलू तक सीमित है — वास्तविक.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c8_hin_ch02'],
    nodeIds: ['c8_hin_cbse_02_001', 'c8_hin_cbse_02_002', 'c8_hin_cbse_02_003', 'c8_hin_cbse_02_004', 'c8_hin_cbse_02_005', 'c8_hin_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'पहले रचनाकार: (लघु-कथा/गद्य)। फिर काल और परिवेश। फिर \'घर में तीन\' का विषय — घर का सराय-स्वरूप — पक्षी और जीव.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय — (लघु-कथा/गद्य) द्वारा रचित गद्य। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 1/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — \'घर में तीन\' का कथानक/पाठ — लेखक के घर में तीन लोग — माँ, पिताजी और वह — रहते हैं, पर.', answer: '2 -', options: ['2 -', '2 -'] },
            { id: 's2', label: '2 -', prompt: 'Which idea is this? — \'घर में तीन\' का पाठ्य-परिवेश — गद्य किस स्थान, समय और वातावरण में घटित है।', answer: '2 -', options: ['2 -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_001', difficulty: 'standard',
          question: '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय — (लघु-कथा/गद्य) द्वारा रचित गद्य।.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'घर में तीन\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश', '\'घर में तीन\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'घर में तीन\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_002', difficulty: 'standard',
          question: '\'घर में तीन\' का कथानक/पाठ — लेखक के घर में तीन लोग — माँ, पिताजी और वह — रहते.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'घर में तीन\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' का कथानक/पाठ',
                  options: ['\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का पाठ्य-परिवेश', '\'घर में तीन\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'घर में तीन\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_003', difficulty: 'standard',
          question: '\'घर में तीन\' का पाठ्य-परिवेश — गद्य किस स्थान, समय और वातावरण में घटित है।',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' का पाठ्य-परिवेश',
                  options: ['\'घर में तीन\' का पाठ्य-परिवेश', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_004', difficulty: 'standard',
          question: '\'घर में तीन\' का पात्र/केंद्रीय विचार — लेखक मुख्य पात्र/अवधारणा है, जिसके.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'घर में तीन\' में लेखक पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' का पात्र/केंद्रीय विचार',
                  options: ['\'घर में तीन\' का पात्र/केंद्रीय विचार', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'घर में तीन\' में लेखक पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_005', difficulty: 'standard',
          question: '\'घर में तीन\' के सहायक पात्र/तत्व — माँ, पिताजी मुख्य के साथ रहकर पाठ को आगे.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' के सहायक पात्र/तत्व',
                  options: ['\'घर में तीन\' के सहायक पात्र/तत्व', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_006', difficulty: 'standard',
          question: '\'घर में तीन\' का मुख्य विषय — घर का सराय-स्वरूप — पक्षी और जीव ही असली.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'घर में तीन\' की घटनाएँ कथानक हैं, घर का सराय-स्वरूप विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' का मुख्य विषय',
                  options: ['\'घर में तीन\' का मुख्य विषय', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'घर में तीन\' की घटनाएँ कथानक हैं, घर का सराय-स्वरूप विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
