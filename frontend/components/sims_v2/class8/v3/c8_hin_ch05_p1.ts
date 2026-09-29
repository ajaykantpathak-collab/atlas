import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch05_p1: SimDef = {
    id: 'v3_c8_hin_ch05_p1',
    title: 'पाठ 5 · Part 1/3',
    subtitle: 'यह नोड \'साँच बराबर तप नहीं (कबीर के दोहे)\' (मल्हार कक्षा 6, कबीर दास) के इस पहलू तक सीमित.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 5 · Part 1/3',
    chapters: ['c8_hin_ch05'],
    nodeIds: ['c8_hin_cbse_05_001', 'c8_hin_cbse_05_002', 'c8_hin_cbse_05_003', 'c8_hin_cbse_05_004', 'c8_hin_cbse_05_005', 'c8_hin_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'पहले रचनाकार: कबीर दास। फिर काल और परिवेश। फिर \'साँच बराबर तप नहीं (कबीर के दोहे)\' का विषय — कबीर की नीति.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय', text: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय — कबीर दास द्वारा रचित कविता (दोहे)। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — पृष्ठभूमि', 'पाठ 5 — कथानक', 'पाठ 5 — पाठ्य-परिवेश', 'पाठ 5 — पात्र-चित्रण', 'पाठ 5 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 1/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — \'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ — कबीर के दोहे — साँच बराबर तप नहीं, झूठ.', answer: '5 -', options: ['5 -', '5 -'] },
            { id: 's2', label: '5 -', prompt: 'Which idea is this? — \'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश — कविता (दोहे) किस स्थान, समय और.', answer: '5 -', options: ['5 -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_001', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय — कबीर दास.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'साँच बराबर तप नहीं (कबीर के दोहे)\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'साँच बराबर तप नहीं (कबीर के दोहे)\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_002', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ — कबीर के दोहे — साँच बराबर तप.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'साँच बराबर तप नहीं (कबीर के दोहे)\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'साँच बराबर तप नहीं (कबीर के दोहे)\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_003', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश — कविता (दोहे) किस स्थान.',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_004', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पात्र/केंद्रीय विचार — कबीर (कवि-वाणी).',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'साँच बराबर तप नहीं (कबीर के दोहे)\' में कबीर (कवि-वाणी) पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पात्र/केंद्रीय विचार',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पात्र/केंद्रीय विचार', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'साँच बराबर तप नहीं (कबीर के दोहे)\' में कबीर (कवि-वाणी) पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_005', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' के सहायक पात्र/तत्व — गुरु, खजूर का पेड़.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' के सहायक पात्र/तत्व',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' के सहायक पात्र/तत्व', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_006', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का मुख्य विषय — कबीर की नीति — सत्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'साँच बराबर तप नहीं (कबीर के दोहे)\' की घटनाएँ कथानक हैं, कबीर की नीति विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का मुख्य विषय',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' का मुख्य विषय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'साँच बराबर तप नहीं (कबीर के दोहे)\' की घटनाएँ कथानक हैं, कबीर की नीति विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
