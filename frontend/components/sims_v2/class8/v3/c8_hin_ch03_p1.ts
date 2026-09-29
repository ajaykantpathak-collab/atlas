import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch03_p1: SimDef = {
    id: 'v3_c8_hin_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'यह नोड \'एक आशीर्वाद\' (मल्हार कक्षा 6, (कविता)) के इस पहलू तक सीमित है — वास्तविक पाठ पर.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c8_hin_ch03'],
    nodeIds: ['c8_hin_cbse_03_001', 'c8_hin_cbse_03_002', 'c8_hin_cbse_03_003', 'c8_hin_cbse_03_004', 'c8_hin_cbse_03_005', 'c8_hin_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'पहले रचनाकार: (कविता)। फिर काल और परिवेश। फिर \'एक आशीर्वाद\' का विषय — आशीर्वाद — सपनों को पृथ्वी पर उतारने और.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय — (कविता) द्वारा रचित कविता। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 1/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — \'एक आशीर्वाद\' का कथानक/पाठ — कविता एक आशीर्वाद है — जा, तेरे स्वप्न बड़े हों; भावना की.', answer: '3 -', options: ['3 -', '3 -'] },
            { id: 's2', label: '3 -', prompt: 'Which idea is this? — \'एक आशीर्वाद\' का पाठ्य-परिवेश — कविता किस स्थान, समय और वातावरण में घटित है।', answer: '3 -', options: ['3 -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_001', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय — (कविता) द्वारा रचित कविता।.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'एक आशीर्वाद\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पाठ्य-परिवेश', '\'एक आशीर्वाद\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'एक आशीर्वाद\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_002', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' का कथानक/पाठ — कविता एक आशीर्वाद है — जा, तेरे स्वप्न बड़े हों.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'एक आशीर्वाद\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' का कथानक/पाठ',
                  options: ['\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का पाठ्य-परिवेश', '\'एक आशीर्वाद\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'एक आशीर्वाद\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_003', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' का पाठ्य-परिवेश — कविता किस स्थान, समय और वातावरण में घटित है।',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' का पाठ्य-परिवेश',
                  options: ['\'एक आशीर्वाद\' का पाठ्य-परिवेश', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_004', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' का पात्र/केंद्रीय विचार — आशीर्वाद देने वाला मुख्य पात्र/अवधारणा.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'एक आशीर्वाद\' में आशीर्वाद देने वाला पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' का पात्र/केंद्रीय विचार',
                  options: ['\'एक आशीर्वाद\' का पात्र/केंद्रीय विचार', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'एक आशीर्वाद\' में आशीर्वाद देने वाला पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_005', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' के सहायक पात्र/तत्व — बच्चा/युवा, स्वप्न मुख्य के साथ रहकर पाठ को.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' के सहायक पात्र/तत्व',
                  options: ['\'एक आशीर्वाद\' के सहायक पात्र/तत्व', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_006', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' का मुख्य विषय — आशीर्वाद — सपनों को पृथ्वी पर उतारने और सच्चाइयों.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'एक आशीर्वाद\' की घटनाएँ कथानक हैं, आशीर्वाद विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' का मुख्य विषय',
                  options: ['\'एक आशीर्वाद\' का मुख्य विषय', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'एक आशीर्वाद\' की घटनाएँ कथानक हैं, आशीर्वाद विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
