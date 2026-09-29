import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch09_p2: SimDef = {
    id: 'v3_c6_hin_ch09_p2',
    title: 'पाठ 9 · Part 2/3',
    subtitle: 'यह नोड \'मैया मैं नहिं माखन खायो\' (मल्हार कक्षा 6, सूरदास) के इस पहलू तक सीमित है.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 9 · Part 2/3',
    chapters: ['c6_hin_ch09'],
    nodeIds: ['c6_hin_cbse_09_007', 'c6_hin_cbse_09_008', 'c6_hin_cbse_09_009', 'c6_hin_cbse_09_010', 'c6_hin_cbse_09_011', 'c6_hin_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '\'मैया मैं नहिं माखन खायो\' में कृष्ण, यशोदा गौण विषय हैं — वे मुख्य विषय बालकृष्ण की माखन-लीला और माता-पुत्र.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — गौण विषय', text: '\'मैया मैं नहिं माखन खायो\' के गौण विषय — कृष्ण, यशोदा जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — गौण', 'पाठ 9 — साहित्यिक', 'पाठ 9 — पदावली', 'पाठ 9 — व्याकरण', 'पाठ 9 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 2/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — \'मैया मैं नहिं माखन खायो\' में भाषा-प्रयोग — सूरदास ने कविता (पद) के अनुरूप शब्द, शैली और.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — \'मैया मैं नहिं माखन खायो\' के वस्तुनिष्ठ प्रश्न — रचनाकार सूरदास, विधा कविता (पद), विषय.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_007', difficulty: 'standard',
          question: '\'मैया मैं नहिं माखन खायो\' के गौण विषय — कृष्ण, यशोदा जैसे सहायक विचार मुख्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैया मैं नहिं माखन खायो\' के गौण विषय',
                  options: ['\'मैया मैं नहिं माखन खायो\' के गौण विषय', '\'मैया मैं नहिं माखन खायो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मैया मैं नहिं माखन खायो\' का कथानक/पाठ', '\'मैया मैं नहिं माखन खायो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_008', difficulty: 'standard',
          question: '\'मैया मैं नहिं माखन खायो\' में बिंब/चित्रण — सूरदास ने सूरदास, कृष्ण, यशोदा जैसे.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैया मैं नहिं माखन खायो\' में बिंब/चित्रण',
                  options: ['\'मैया मैं नहिं माखन खायो\' में बिंब/चित्रण', '\'मैया मैं नहिं माखन खायो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मैया मैं नहिं माखन खायो\' का कथानक/पाठ', '\'मैया मैं नहिं माखन खायो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_009', difficulty: 'standard',
          question: '\'मैया मैं नहिं माखन खायो\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैया मैं नहिं माखन खायो\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'मैया मैं नहिं माखन खायो\' में विरोधाभास/विशेष युक्तियाँ', '\'मैया मैं नहिं माखन खायो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मैया मैं नहिं माखन खायो\' का कथानक/पाठ', '\'मैया मैं नहिं माखन खायो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_010', difficulty: 'standard',
          question: '\'मैया मैं नहिं माखन खायो\' की पदावली — मुख्य शब्द सूरदास, कृष्ण, यशोदा, माखन.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैया मैं नहिं माखन खायो\' की पदावली',
                  options: ['\'मैया मैं नहिं माखन खायो\' की पदावली', '\'मैया मैं नहिं माखन खायो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मैया मैं नहिं माखन खायो\' का कथानक/पाठ', '\'मैया मैं नहिं माखन खायो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_011', difficulty: 'standard',
          question: '\'मैया मैं नहिं माखन खायो\' में भाषा-प्रयोग — सूरदास ने कविता (पद) के अनुरूप.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैया मैं नहिं माखन खायो\' में भाषा-प्रयोग',
                  options: ['\'मैया मैं नहिं माखन खायो\' में भाषा-प्रयोग', '\'मैया मैं नहिं माखन खायो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मैया मैं नहिं माखन खायो\' का कथानक/पाठ', '\'मैया मैं नहिं माखन खायो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_012', difficulty: 'standard',
          question: '\'मैया मैं नहिं माखन खायो\' के वस्तुनिष्ठ प्रश्न — रचनाकार सूरदास, विधा कविता.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैया मैं नहिं माखन खायो\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'मैया मैं नहिं माखन खायो\' के वस्तुनिष्ठ प्रश्न', '\'मैया मैं नहिं माखन खायो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मैया मैं नहिं माखन खायो\' का कथानक/पाठ', '\'मैया मैं नहिं माखन खायो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
