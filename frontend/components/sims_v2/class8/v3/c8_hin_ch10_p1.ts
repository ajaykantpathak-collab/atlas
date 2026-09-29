import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch10_p1: SimDef = {
    id: 'v3_c8_hin_ch10_p1',
    title: 'तरुण के स्वप्न · Part 1/3',
    subtitle: 'यह नोड \'स्वाधीन समाज का सपना (नेताजी)\' (मल्हार कक्षा 6, सुभाष चंद्र बोस) के इस पहलू तक.',
    classLevel: 8, subject: 'hin', topic: 'तरुण के स्वप्न · Part 1/3',
    chapters: ['c8_hin_ch10'],
    nodeIds: ['c8_hin_cbse_10_001', 'c8_hin_cbse_10_002', 'c8_hin_cbse_10_003', 'c8_hin_cbse_10_004', 'c8_hin_cbse_10_005', 'c8_hin_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'पहले रचनाकार: सुभाष चंद्र बोस। फिर काल और परिवेश। फिर \'स्वाधीन समाज का सपना (नेताजी)\' का विषय — नेताजी का.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तरुण के स्वप्न — पृष्ठभूमि और रचनाकार परिचय', text: '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय — सुभाष चंद्र बोस द्वारा रचित गद्य (उद्बोधन)। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तरुण के स्वप्न —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c8_hin_cbse_10_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['रचनाकार सुभाष चंद्र बोस का काल/परिचय।', 'पाठ का विषय नेताजी का स्वप्न — स्वाधीन, संपन्न, समतामूलक.', 'जुड़ाव — कवि का अनुभव पाठ में झलकता है।'], answer: 'रचनाकार सुभाष चंद्र बोस का काल/परिचय। पाठ का विषय नेताजी का स्वप्न — स्वाधीन, संपन्न, समतामूलक. जुड़ाव — कवि का अनुभव पाठ में झलकता है।' } },
        { type: 'case', nodeId: 'c8_hin_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through तरुण के स्वप्न like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? तरुण के स्वप्न · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तरुण के स्वप्न · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_001', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय — सुभाष चंद्र बोस.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'स्वाधीन समाज का सपना (नेताजी)\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश', '\'स्वाधीन समाज का सपना (नेताजी)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'स्वाधीन समाज का सपना (नेताजी)\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_002', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ — नेताजी सुभाष चंद्र बोस का 29.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'स्वाधीन समाज का सपना (नेताजी)\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश', '\'स्वाधीन समाज का सपना (नेताजी)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'स्वाधीन समाज का सपना (नेताजी)\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_003', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश — गद्य (उद्बोधन) किस स्थान, समय.',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_004', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' का पात्र/केंद्रीय विचार — नेताजी सुभाष बोस.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'स्वाधीन समाज का सपना (नेताजी)\' में नेताजी सुभाष बोस पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' का पात्र/केंद्रीय विचार',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' का पात्र/केंद्रीय विचार', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'स्वाधीन समाज का सपना (नेताजी)\' में नेताजी सुभाष बोस पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_005', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' के सहायक पात्र/तत्व — युवक, देशबंधु चित्तरंजन.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' के सहायक पात्र/तत्व',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' के सहायक पात्र/तत्व', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_006', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' का मुख्य विषय — नेताजी का स्वप्न — स्वाधीन.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'स्वाधीन समाज का सपना (नेताजी)\' की घटनाएँ कथानक हैं, नेताजी का स्वप्न विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' का मुख्य विषय',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' का मुख्य विषय', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'स्वाधीन समाज का सपना (नेताजी)\' की घटनाएँ कथानक हैं, नेताजी का स्वप्न विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
