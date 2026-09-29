import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch02_p1: SimDef = {
    id: 'v3_c7_hin_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'यह नोड \'तीन बेटे (ज्ञान का धन)\' (मल्हार कक्षा 6, (लोककथा)) के इस पहलू तक सीमित है.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c7_hin_ch02'],
    nodeIds: ['c7_hin_cbse_02_001', 'c7_hin_cbse_02_002', 'c7_hin_cbse_02_003', 'c7_hin_cbse_02_004', 'c7_hin_cbse_02_005', 'c7_hin_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'पहले रचनाकार: (लोककथा)। फिर काल और परिवेश। फिर \'तीन बेटे (ज्ञान का धन)\' का विषय — धन नहीं, ज्ञान ही असली दौलत.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: '\'तीन बेटे (ज्ञान का धन)\' का पृष्ठभूमि और रचनाकार परिचय — (लोककथा) द्वारा रचित कहानी। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 1/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — \'तीन बेटे (ज्ञान का धन)\' का कथानक/पाठ — निर्धन पिता तीन बेटों को सिखाता है — रुपया-पैसा.', answer: '2 -', options: ['2 -', '2 -'] },
            { id: 's2', label: '2 -', prompt: 'Which idea is this? — \'तीन बेटे (ज्ञान का धन)\' का पाठ्य-परिवेश — कहानी किस स्थान, समय और वातावरण में घटित है।', answer: '2 -', options: ['2 -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_02_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_001', difficulty: 'standard',
          question: '\'तीन बेटे (ज्ञान का धन)\' का पृष्ठभूमि और रचनाकार परिचय — (लोककथा) द्वारा रचित.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'तीन बेटे (ज्ञान का धन)\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीन बेटे (ज्ञान का धन)\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'तीन बेटे (ज्ञान का धन)\' का पृष्ठभूमि और रचनाकार परिचय', '\'तीन बेटे (ज्ञान का धन)\' का कथानक/पाठ', '\'तीन बेटे (ज्ञान का धन)\' का पाठ्य-परिवेश', '\'तीन बेटे (ज्ञान का धन)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'तीन बेटे (ज्ञान का धन)\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_002', difficulty: 'standard',
          question: '\'तीन बेटे (ज्ञान का धन)\' का कथानक/पाठ — निर्धन पिता तीन बेटों को सिखाता है.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'तीन बेटे (ज्ञान का धन)\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीन बेटे (ज्ञान का धन)\' का कथानक/पाठ',
                  options: ['\'तीन बेटे (ज्ञान का धन)\' का कथानक/पाठ', '\'तीन बेटे (ज्ञान का धन)\' का पृष्ठभूमि और रचनाकार परिचय', '\'तीन बेटे (ज्ञान का धन)\' का पाठ्य-परिवेश', '\'तीन बेटे (ज्ञान का धन)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'तीन बेटे (ज्ञान का धन)\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_003', difficulty: 'standard',
          question: '\'तीन बेटे (ज्ञान का धन)\' का पाठ्य-परिवेश — कहानी किस स्थान, समय और वातावरण में.',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीन बेटे (ज्ञान का धन)\' का पाठ्य-परिवेश',
                  options: ['\'तीन बेटे (ज्ञान का धन)\' का पाठ्य-परिवेश', '\'तीन बेटे (ज्ञान का धन)\' का पृष्ठभूमि और रचनाकार परिचय', '\'तीन बेटे (ज्ञान का धन)\' का कथानक/पाठ', '\'तीन बेटे (ज्ञान का धन)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_004', difficulty: 'standard',
          question: '\'तीन बेटे (ज्ञान का धन)\' का पात्र/केंद्रीय विचार — निर्धन पिता मुख्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'तीन बेटे (ज्ञान का धन)\' में निर्धन पिता पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीन बेटे (ज्ञान का धन)\' का पात्र/केंद्रीय विचार',
                  options: ['\'तीन बेटे (ज्ञान का धन)\' का पात्र/केंद्रीय विचार', '\'तीन बेटे (ज्ञान का धन)\' का पृष्ठभूमि और रचनाकार परिचय', '\'तीन बेटे (ज्ञान का धन)\' का कथानक/पाठ', '\'तीन बेटे (ज्ञान का धन)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'तीन बेटे (ज्ञान का धन)\' में निर्धन पिता पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_005', difficulty: 'standard',
          question: '\'तीन बेटे (ज्ञान का धन)\' के सहायक पात्र/तत्व — तीन बेटे, संसार मुख्य के साथ.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीन बेटे (ज्ञान का धन)\' के सहायक पात्र/तत्व',
                  options: ['\'तीन बेटे (ज्ञान का धन)\' के सहायक पात्र/तत्व', '\'तीन बेटे (ज्ञान का धन)\' का पृष्ठभूमि और रचनाकार परिचय', '\'तीन बेटे (ज्ञान का धन)\' का कथानक/पाठ', '\'तीन बेटे (ज्ञान का धन)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_006', difficulty: 'standard',
          question: '\'तीन बेटे (ज्ञान का धन)\' का मुख्य विषय — धन नहीं, ज्ञान ही असली दौलत — तीन.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'तीन बेटे (ज्ञान का धन)\' की घटनाएँ कथानक हैं, धन नहीं, ज्ञान ही असली दौलत विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीन बेटे (ज्ञान का धन)\' का मुख्य विषय',
                  options: ['\'तीन बेटे (ज्ञान का धन)\' का मुख्य विषय', '\'तीन बेटे (ज्ञान का धन)\' का पृष्ठभूमि और रचनाकार परिचय', '\'तीन बेटे (ज्ञान का धन)\' का कथानक/पाठ', '\'तीन बेटे (ज्ञान का धन)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'तीन बेटे (ज्ञान का धन)\' की घटनाएँ कथानक हैं, धन नहीं, ज्ञान ही असली दौलत विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
