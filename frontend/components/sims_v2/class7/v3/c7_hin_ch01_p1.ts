import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch01_p1: SimDef = {
    id: 'v3_c7_hin_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'यह नोड \'माँ, कह एक कहानी\' (मल्हार कक्षा 6, (बालगीत/कविता)) के इस पहलू तक सीमित है.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c7_hin_ch01'],
    nodeIds: ['c7_hin_cbse_01_001', 'c7_hin_cbse_01_002', 'c7_hin_cbse_01_003', 'c7_hin_cbse_01_004', 'c7_hin_cbse_01_005', 'c7_hin_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'पहले रचनाकार: (बालगीत/कविता)। फिर काल और परिवेश। फिर \'माँ, कह एक कहानी\' का विषय — बच्चे की जिज्ञासा और.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय — (बालगीत/कविता) द्वारा रचित कविता। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 1/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — \'माँ, कह एक कहानी\' का कथानक/पाठ — बच्ची माँ से कहानी माँगती है — \'माँ, कह एक कहानी\'; माँ.', answer: '1 -', options: ['1 -', '1 -'] },
            { id: 's2', label: '1 -', prompt: 'Which idea is this? — \'माँ, कह एक कहानी\' का पाठ्य-परिवेश — कविता किस स्थान, समय और वातावरण में घटित है।', answer: '1 -', options: ['1 -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_001', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय — (बालगीत/कविता) द्वारा रचित.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'माँ, कह एक कहानी\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश', '\'माँ, कह एक कहानी\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'माँ, कह एक कहानी\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_002', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' का कथानक/पाठ — बच्ची माँ से कहानी माँगती है — \'माँ, कह एक.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'माँ, कह एक कहानी\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' का कथानक/पाठ',
                  options: ['\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश', '\'माँ, कह एक कहानी\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'माँ, कह एक कहानी\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_003', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश — कविता किस स्थान, समय और वातावरण में घटित.',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश',
                  options: ['\'माँ, कह एक कहानी\' का पाठ्य-परिवेश', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_004', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' का पात्र/केंद्रीय विचार — बेटी मुख्य पात्र/अवधारणा है, जिसके.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'माँ, कह एक कहानी\' में बेटी पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' का पात्र/केंद्रीय विचार',
                  options: ['\'माँ, कह एक कहानी\' का पात्र/केंद्रीय विचार', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'माँ, कह एक कहानी\' में बेटी पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_005', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' के सहायक पात्र/तत्व — माँ, नानी मुख्य के साथ रहकर पाठ को आगे.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' के सहायक पात्र/तत्व',
                  options: ['\'माँ, कह एक कहानी\' के सहायक पात्र/तत्व', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_006', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' का मुख्य विषय — बच्चे की जिज्ञासा और माँ-बेटी का प्रेम.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'माँ, कह एक कहानी\' की घटनाएँ कथानक हैं, बच्चे की जिज्ञासा और माँ-बेटी का प्रेम विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' का मुख्य विषय',
                  options: ['\'माँ, कह एक कहानी\' का मुख्य विषय', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'माँ, कह एक कहानी\' की घटनाएँ कथानक हैं, बच्चे की जिज्ञासा और माँ-बेटी का प्रेम विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
