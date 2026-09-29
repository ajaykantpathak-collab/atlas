import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch01_p1: SimDef = {
    id: 'v3_c8_hin_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'यह नोड \'स्वदेश\' (मल्हार कक्षा 6, (देशभक्ति कविता)) के इस पहलू तक सीमित है — वास्तविक पाठ.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c8_hin_ch01'],
    nodeIds: ['c8_hin_cbse_01_001', 'c8_hin_cbse_01_002', 'c8_hin_cbse_01_003', 'c8_hin_cbse_01_004', 'c8_hin_cbse_01_005', 'c8_hin_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'पहले रचनाकार: (देशभक्ति कविता)। फिर काल और परिवेश। फिर \'स्वदेश\' का विषय — स्वदेश-प्रेम — देश के प्रति प्यार न.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: '\'स्वदेश\' का पृष्ठभूमि और रचनाकार परिचय — (देशभक्ति कविता) द्वारा रचित कविता। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 1/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — \'स्वदेश\' का कथानक/पाठ — कविता कहती है कि जिस हृदय में स्वदेश का प्यार नहीं, वह पत्थर है.', answer: '1 -', options: ['1 -', '1 -'] },
            { id: 's2', label: '1 -', prompt: 'Which idea is this? — \'स्वदेश\' का पाठ्य-परिवेश — कविता किस स्थान, समय और वातावरण में घटित है।', answer: '1 -', options: ['1 -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_01_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_001', difficulty: 'standard',
          question: '\'स्वदेश\' का पृष्ठभूमि और रचनाकार परिचय — (देशभक्ति कविता) द्वारा रचित कविता।.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'स्वदेश\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वदेश\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'स्वदेश\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वदेश\' का कथानक/पाठ', '\'स्वदेश\' का पाठ्य-परिवेश', '\'स्वदेश\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'स्वदेश\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_002', difficulty: 'standard',
          question: '\'स्वदेश\' का कथानक/पाठ — कविता कहती है कि जिस हृदय में स्वदेश का प्यार नहीं, वह.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'स्वदेश\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वदेश\' का कथानक/पाठ',
                  options: ['\'स्वदेश\' का कथानक/पाठ', '\'स्वदेश\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वदेश\' का पाठ्य-परिवेश', '\'स्वदेश\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'स्वदेश\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_003', difficulty: 'standard',
          question: '\'स्वदेश\' का पाठ्य-परिवेश — कविता किस स्थान, समय और वातावरण में घटित है।',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वदेश\' का पाठ्य-परिवेश',
                  options: ['\'स्वदेश\' का पाठ्य-परिवेश', '\'स्वदेश\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वदेश\' का कथानक/पाठ', '\'स्वदेश\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_004', difficulty: 'standard',
          question: '\'स्वदेश\' का पात्र/केंद्रीय विचार — कवि-वाणी मुख्य पात्र/अवधारणा है, जिसके.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'स्वदेश\' में कवि-वाणी पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वदेश\' का पात्र/केंद्रीय विचार',
                  options: ['\'स्वदेश\' का पात्र/केंद्रीय विचार', '\'स्वदेश\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वदेश\' का कथानक/पाठ', '\'स्वदेश\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'स्वदेश\' में कवि-वाणी पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_005', difficulty: 'standard',
          question: '\'स्वदेश\' के सहायक पात्र/तत्व — स्वदेश, हृदय मुख्य के साथ रहकर पाठ को आगे बढ़ाते.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वदेश\' के सहायक पात्र/तत्व',
                  options: ['\'स्वदेश\' के सहायक पात्र/तत्व', '\'स्वदेश\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वदेश\' का कथानक/पाठ', '\'स्वदेश\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_006', difficulty: 'standard',
          question: '\'स्वदेश\' का मुख्य विषय — स्वदेश-प्रेम — देश के प्रति प्यार न हो तो हृदय पत्थर.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'स्वदेश\' की घटनाएँ कथानक हैं, स्वदेश-प्रेम विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वदेश\' का मुख्य विषय',
                  options: ['\'स्वदेश\' का मुख्य विषय', '\'स्वदेश\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वदेश\' का कथानक/पाठ', '\'स्वदेश\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'स्वदेश\' की घटनाएँ कथानक हैं, स्वदेश-प्रेम विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
