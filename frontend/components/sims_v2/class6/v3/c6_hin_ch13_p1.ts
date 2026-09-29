import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch13_p1: SimDef = {
    id: 'v3_c6_hin_ch13_p1',
    title: 'पाठ 13 · Part 1/3',
    subtitle: 'यह नोड \'बीज की कथा\' (मल्हार कक्षा 6, (प्रकृति-कथा)) के इस पहलू तक सीमित है — वास्तविक पाठ.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 13 · Part 1/3',
    chapters: ['c6_hin_ch13'],
    nodeIds: ['c6_hin_cbse_13_001', 'c6_hin_cbse_13_002', 'c6_hin_cbse_13_003', 'c6_hin_cbse_13_004', 'c6_hin_cbse_13_005', 'c6_hin_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'पहले रचनाकार: (प्रकृति-कथा)। फिर काल और परिवेश। फिर \'बीज की कथा\' का विषय — बीज का जीवन-चक्र — मिट्टी से.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 13 — पृष्ठभूमि और रचनाकार परिचय', text: '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय — (प्रकृति-कथा) द्वारा रचित कहानी। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 13 — पृष्ठभूमि', 'पाठ 13 — कथानक', 'पाठ 13 — पाठ्य-परिवेश', 'पाठ 13 — पात्र-चित्रण', 'पाठ 13 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 13 · Part 1/3', spots: [
            { id: 's1', label: '13 -', prompt: 'Which idea is this? — \'बीज की कथा\' का कथानक/पाठ — मिट्टी के नीचे माहों पड़ा बीज वसंत-वर्षा में अंकुरित होता है.', answer: '13 -', options: ['13 -', '13 -'] },
            { id: 's2', label: '13 -', prompt: 'Which idea is this? — \'बीज की कथा\' का पाठ्य-परिवेश — कहानी किस स्थान, समय और वातावरण में घटित है।', answer: '13 -', options: ['13 -', '13 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 13 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 13 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 13 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_001', difficulty: 'standard',
          question: '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय — (प्रकृति-कथा) द्वारा रचित कहानी।.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'बीज की कथा\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पाठ्य-परिवेश', '\'बीज की कथा\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'बीज की कथा\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_002', difficulty: 'standard',
          question: '\'बीज की कथा\' का कथानक/पाठ — मिट्टी के नीचे माहों पड़ा बीज वसंत-वर्षा में.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'बीज की कथा\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' का कथानक/पाठ',
                  options: ['\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का पाठ्य-परिवेश', '\'बीज की कथा\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'बीज की कथा\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_003', difficulty: 'standard',
          question: '\'बीज की कथा\' का पाठ्य-परिवेश — कहानी किस स्थान, समय और वातावरण में घटित है।',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' का पाठ्य-परिवेश',
                  options: ['\'बीज की कथा\' का पाठ्य-परिवेश', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_004', difficulty: 'standard',
          question: '\'बीज की कथा\' का पात्र/केंद्रीय विचार — बीज/अंकुर मुख्य पात्र/अवधारणा है, जिसके.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'बीज की कथा\' में बीज/अंकुर पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' का पात्र/केंद्रीय विचार',
                  options: ['\'बीज की कथा\' का पात्र/केंद्रीय विचार', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'बीज की कथा\' में बीज/अंकुर पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_005', difficulty: 'standard',
          question: '\'बीज की कथा\' के सहायक पात्र/तत्व — जड़, तना मुख्य के साथ रहकर पाठ को आगे बढ़ाते.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' के सहायक पात्र/तत्व',
                  options: ['\'बीज की कथा\' के सहायक पात्र/तत्व', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_006', difficulty: 'standard',
          question: '\'बीज की कथा\' का मुख्य विषय — बीज का जीवन-चक्र — मिट्टी से अंकुर, अंकुर से वृक्ष।',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'बीज की कथा\' की घटनाएँ कथानक हैं, बीज का जीवन-चक्र विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' का मुख्य विषय',
                  options: ['\'बीज की कथा\' का मुख्य विषय', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'बीज की कथा\' की घटनाएँ कथानक हैं, बीज का जीवन-चक्र विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
