import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch06_p1: SimDef = {
    id: 'v3_c7_hin_ch06_p1',
    title: 'पाठ 6 · Part 1/3',
    subtitle: 'यह नोड \'गिरधर कविराय की कुंडलिया\' (मल्हार कक्षा 6, गिरधर कविराय) के इस पहलू तक सीमित है.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 6 · Part 1/3',
    chapters: ['c7_hin_ch06'],
    nodeIds: ['c7_hin_cbse_06_001', 'c7_hin_cbse_06_002', 'c7_hin_cbse_06_003', 'c7_hin_cbse_06_004', 'c7_hin_cbse_06_005', 'c7_hin_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'पहले रचनाकार: गिरधर कविराय। फिर काल और परिवेश। फिर \'गिरधर कविराय की कुंडलिया\' का विषय — कुंडलिया छंद में नीति.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — पृष्ठभूमि और रचनाकार परिचय', text: '\'गिरधर कविराय की कुंडलिया\' का पृष्ठभूमि और रचनाकार परिचय — गिरधर कविराय द्वारा रचित कविता (कुंडलिया)। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — पृष्ठभूमि', 'पाठ 6 — कथानक', 'पाठ 6 — पाठ्य-परिवेश', 'पाठ 6 — पात्र-चित्रण', 'पाठ 6 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 1/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — \'गिरधर कविराय की कुंडलिया\' का कथानक/पाठ — कुंडलिया छंद की कविता — "बिना विचारे जो करै सो.', answer: '6 -', options: ['6 -', '6 -'] },
            { id: 's2', label: '6 -', prompt: 'Which idea is this? — \'गिरधर कविराय की कुंडलिया\' का पाठ्य-परिवेश — कविता (कुंडलिया) किस स्थान, समय और वातावरण.', answer: '6 -', options: ['6 -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_06_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_001', difficulty: 'standard',
          question: '\'गिरधर कविराय की कुंडलिया\' का पृष्ठभूमि और रचनाकार परिचय — गिरधर कविराय द्वारा.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'गिरधर कविराय की कुंडलिया\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गिरधर कविराय की कुंडलिया\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'गिरधर कविराय की कुंडलिया\' का पृष्ठभूमि और रचनाकार परिचय', '\'गिरधर कविराय की कुंडलिया\' का कथानक/पाठ', '\'गिरधर कविराय की कुंडलिया\' का पाठ्य-परिवेश', '\'गिरधर कविराय की कुंडलिया\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'गिरधर कविराय की कुंडलिया\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_002', difficulty: 'standard',
          question: '\'गिरधर कविराय की कुंडलिया\' का कथानक/पाठ — कुंडलिया छंद की कविता — "बिना विचारे.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'गिरधर कविराय की कुंडलिया\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गिरधर कविराय की कुंडलिया\' का कथानक/पाठ',
                  options: ['\'गिरधर कविराय की कुंडलिया\' का कथानक/पाठ', '\'गिरधर कविराय की कुंडलिया\' का पृष्ठभूमि और रचनाकार परिचय', '\'गिरधर कविराय की कुंडलिया\' का पाठ्य-परिवेश', '\'गिरधर कविराय की कुंडलिया\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'गिरधर कविराय की कुंडलिया\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_003', difficulty: 'standard',
          question: '\'गिरधर कविराय की कुंडलिया\' का पाठ्य-परिवेश — कविता (कुंडलिया) किस स्थान, समय और.',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गिरधर कविराय की कुंडलिया\' का पाठ्य-परिवेश',
                  options: ['\'गिरधर कविराय की कुंडलिया\' का पाठ्य-परिवेश', '\'गिरधर कविराय की कुंडलिया\' का पृष्ठभूमि और रचनाकार परिचय', '\'गिरधर कविराय की कुंडलिया\' का कथानक/पाठ', '\'गिरधर कविराय की कुंडलिया\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_004', difficulty: 'standard',
          question: '\'गिरधर कविराय की कुंडलिया\' का पात्र/केंद्रीय विचार — गिरधर कविराय (कवि-वाणी).',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'गिरधर कविराय की कुंडलिया\' में गिरधर कविराय (कवि-वाणी) पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गिरधर कविराय की कुंडलिया\' का पात्र/केंद्रीय विचार',
                  options: ['\'गिरधर कविराय की कुंडलिया\' का पात्र/केंद्रीय विचार', '\'गिरधर कविराय की कुंडलिया\' का पृष्ठभूमि और रचनाकार परिचय', '\'गिरधर कविराय की कुंडलिया\' का कथानक/पाठ', '\'गिरधर कविराय की कुंडलिया\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'गिरधर कविराय की कुंडलिया\' में गिरधर कविराय (कवि-वाणी) पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_005', difficulty: 'standard',
          question: '\'गिरधर कविराय की कुंडलिया\' के सहायक पात्र/तत्व — मन, जगत मुख्य के साथ रहकर पाठ.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गिरधर कविराय की कुंडलिया\' के सहायक पात्र/तत्व',
                  options: ['\'गिरधर कविराय की कुंडलिया\' के सहायक पात्र/तत्व', '\'गिरधर कविराय की कुंडलिया\' का पृष्ठभूमि और रचनाकार परिचय', '\'गिरधर कविराय की कुंडलिया\' का कथानक/पाठ', '\'गिरधर कविराय की कुंडलिया\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_006', difficulty: 'standard',
          question: '\'गिरधर कविराय की कुंडलिया\' का मुख्य विषय — कुंडलिया छंद में नीति — सोचकर काम.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'गिरधर कविराय की कुंडलिया\' की घटनाएँ कथानक हैं, कुंडलिया छंद में नीति विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गिरधर कविराय की कुंडलिया\' का मुख्य विषय',
                  options: ['\'गिरधर कविराय की कुंडलिया\' का मुख्य विषय', '\'गिरधर कविराय की कुंडलिया\' का पृष्ठभूमि और रचनाकार परिचय', '\'गिरधर कविराय की कुंडलिया\' का कथानक/पाठ', '\'गिरधर कविराय की कुंडलिया\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'गिरधर कविराय की कुंडलिया\' की घटनाएँ कथानक हैं, कुंडलिया छंद में नीति विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
