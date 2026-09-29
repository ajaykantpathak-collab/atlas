import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch04_p1: SimDef = {
    id: 'v3_c8_hin_ch04_p1',
    title: 'पाठ 4 · Part 1/3',
    subtitle: 'यह नोड \'हरिद्वार (कविवचन सुधा पत्र)\' (मल्हार कक्षा 6, (पत्र/सम्पादकीय शैली)) के इस पहलू.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 4 · Part 1/3',
    chapters: ['c8_hin_ch04'],
    nodeIds: ['c8_hin_cbse_04_001', 'c8_hin_cbse_04_002', 'c8_hin_cbse_04_003', 'c8_hin_cbse_04_004', 'c8_hin_cbse_04_005', 'c8_hin_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'पहले रचनाकार: (पत्र/सम्पादकीय शैली)। फिर काल और परिवेश। फिर \'हरिद्वार (कविवचन सुधा पत्र)\' का विषय — हरिद्वार.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — पृष्ठभूमि और रचनाकार परिचय', text: '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय — (पत्र/सम्पादकीय शैली) द्वारा रचित गद्य। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — पृष्ठभूमि', 'पाठ 4 — कथानक', 'पाठ 4 — पाठ्य-परिवेश', 'पाठ 4 — पात्र-चित्रण', 'पाठ 4 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 1/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — \'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ — 1871 के कविवचन सुधा पत्र में हरिद्वार का.', answer: '4 -', options: ['4 -', '4 -'] },
            { id: 's2', label: '4 -', prompt: 'Which idea is this? — \'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश — गद्य किस स्थान, समय और वातावरण में घटित.', answer: '4 -', options: ['4 -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_001', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय — (पत्र/सम्पादकीय.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'हरिद्वार (कविवचन सुधा पत्र)\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'हरिद्वार (कविवचन सुधा पत्र)\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_002', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ — 1871 के कविवचन सुधा पत्र में.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'हरिद्वार (कविवचन सुधा पत्र)\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'हरिद्वार (कविवचन सुधा पत्र)\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_003', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश — गद्य किस स्थान, समय और वातावरण.',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_004', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' का पात्र/केंद्रीय विचार — पत्रकार/वर्णनकर्ता.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'हरिद्वार (कविवचन सुधा पत्र)\' में पत्रकार/वर्णनकर्ता पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' का पात्र/केंद्रीय विचार',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' का पात्र/केंद्रीय विचार', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'हरिद्वार (कविवचन सुधा पत्र)\' में पत्रकार/वर्णनकर्ता पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_005', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' के सहायक पात्र/तत्व — पर्वत, वृक्ष मुख्य के साथ.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' के सहायक पात्र/तत्व',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' के सहायक पात्र/तत्व', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_006', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' का मुख्य विषय — हरिद्वार का वर्णन — पवित्र भूमि.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'हरिद्वार (कविवचन सुधा पत्र)\' की घटनाएँ कथानक हैं, हरिद्वार का वर्णन विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' का मुख्य विषय',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' का मुख्य विषय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'हरिद्वार (कविवचन सुधा पत्र)\' की घटनाएँ कथानक हैं, हरिद्वार का वर्णन विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
