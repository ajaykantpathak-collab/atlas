import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch06_p2: SimDef = {
    id: 'v3_c6_hin_ch06_p2',
    title: 'पाठ 6 · Part 2/3',
    subtitle: 'यह नोड \'मेरी लखनऊ यात्रा\' (मल्हार कक्षा 6, (आत्मकथा/स्वतंत्रता-स्मरण)) के इस पहलू तक.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 6 · Part 2/3',
    chapters: ['c6_hin_ch06'],
    nodeIds: ['c6_hin_cbse_06_007', 'c6_hin_cbse_06_008', 'c6_hin_cbse_06_009', 'c6_hin_cbse_06_010', 'c6_hin_cbse_06_011', 'c6_hin_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '\'मेरी लखनऊ यात्रा\' में कांग्रेस, यात्रा गौण विषय हैं — वे मुख्य विषय स्वतंत्रता-संघर्ष के दिनों की यात्रा को.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — गौण विषय', text: '\'मेरी लखनऊ यात्रा\' के गौण विषय — कांग्रेस, यात्रा जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — गौण', 'पाठ 6 — साहित्यिक', 'पाठ 6 — पदावली', 'पाठ 6 — व्याकरण', 'पाठ 6 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 2/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — \'मेरी लखनऊ यात्रा\' में भाषा-प्रयोग — (आत्मकथा/स्वतंत्रता-स्मरण) ने गद्य के अनुरूप शब्द.', answer: '6 -', options: ['6 -', '6 - -'] },
            { id: 's2', label: '6 - -', prompt: 'Which idea is this? — \'मेरी लखनऊ यात्रा\' के वस्तुनिष्ठ प्रश्न — रचनाकार (आत्मकथा/स्वतंत्रता-स्मरण), विधा गद्य.', answer: '6 - -', options: ['6 - -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_007', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' के गौण विषय — कांग्रेस, यात्रा जैसे सहायक विचार मुख्य विषय.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' के गौण विषय',
                  options: ['\'मेरी लखनऊ यात्रा\' के गौण विषय', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_008', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' में बिंब/चित्रण — (आत्मकथा/स्वतंत्रता-स्मरण) ने लखनऊ.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' में बिंब/चित्रण',
                  options: ['\'मेरी लखनऊ यात्रा\' में बिंब/चित्रण', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_009', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें मिलकर गहरा.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'मेरी लखनऊ यात्रा\' में विरोधाभास/विशेष युक्तियाँ', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_010', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' की पदावली — मुख्य शब्द लखनऊ, कांग्रेस, यात्रा, बिस्मिल जिनका.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' की पदावली',
                  options: ['\'मेरी लखनऊ यात्रा\' की पदावली', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_011', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' में भाषा-प्रयोग — (आत्मकथा/स्वतंत्रता-स्मरण) ने गद्य के.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' में भाषा-प्रयोग',
                  options: ['\'मेरी लखनऊ यात्रा\' में भाषा-प्रयोग', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_012', difficulty: 'standard',
          question: '\'मेरी लखनऊ यात्रा\' के वस्तुनिष्ठ प्रश्न — रचनाकार (आत्मकथा/स्वतंत्रता-स्मरण).',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरी लखनऊ यात्रा\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'मेरी लखनऊ यात्रा\' के वस्तुनिष्ठ प्रश्न', '\'मेरी लखनऊ यात्रा\' का पृष्ठभूमि और रचनाकार परिचय', '\'मेरी लखनऊ यात्रा\' का कथानक/पाठ', '\'मेरी लखनऊ यात्रा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
