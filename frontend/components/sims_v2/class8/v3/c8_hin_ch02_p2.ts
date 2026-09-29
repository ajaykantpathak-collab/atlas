import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch02_p2: SimDef = {
    id: 'v3_c8_hin_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'यह नोड \'घर में तीन\' (मल्हार कक्षा 6, (लघु-कथा/गद्य)) के इस पहलू तक सीमित है — वास्तविक.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c8_hin_ch02'],
    nodeIds: ['c8_hin_cbse_02_007', 'c8_hin_cbse_02_008', 'c8_hin_cbse_02_009', 'c8_hin_cbse_02_010', 'c8_hin_cbse_02_011', 'c8_hin_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'घर में तीन\' में माँ, पिताजी गौण विषय हैं — वे मुख्य विषय घर का सराय-स्वरूप को पूरक करते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: '\'घर में तीन\' के गौण विषय — माँ, पिताजी जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — \'घर में तीन\' में भाषा-प्रयोग — (लघु-कथा/गद्य) ने गद्य के अनुरूप शब्द, शैली और लय चुने हैं।', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — \'घर में तीन\' के वस्तुनिष्ठ प्रश्न — रचनाकार (लघु-कथा/गद्य), विधा गद्य, विषय घर का.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_007', difficulty: 'standard',
          question: '\'घर में तीन\' के गौण विषय — माँ, पिताजी जैसे सहायक विचार मुख्य विषय को गहराई.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' के गौण विषय',
                  options: ['\'घर में तीन\' के गौण विषय', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_008', difficulty: 'standard',
          question: '\'घर में तीन\' में बिंब/चित्रण — (लघु-कथा/गद्य) ने घर, माँ, पिताजी जैसे दृश्यों.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' में बिंब/चित्रण',
                  options: ['\'घर में तीन\' में बिंब/चित्रण', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_009', difficulty: 'standard',
          question: '\'घर में तीन\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें मिलकर गहरा सत्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'घर में तीन\' में विरोधाभास/विशेष युक्तियाँ', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_010', difficulty: 'standard',
          question: '\'घर में तीन\' की पदावली — मुख्य शब्द घर, माँ, पिताजी, पक्षी जिनका अर्थ पाठ-बोध.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' की पदावली',
                  options: ['\'घर में तीन\' की पदावली', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_011', difficulty: 'standard',
          question: '\'घर में तीन\' में भाषा-प्रयोग — (लघु-कथा/गद्य) ने गद्य के अनुरूप शब्द, शैली और.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' में भाषा-प्रयोग',
                  options: ['\'घर में तीन\' में भाषा-प्रयोग', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_012', difficulty: 'standard',
          question: '\'घर में तीन\' के वस्तुनिष्ठ प्रश्न — रचनाकार (लघु-कथा/गद्य), विधा गद्य, विषय घर.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'घर में तीन\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'घर में तीन\' के वस्तुनिष्ठ प्रश्न', '\'घर में तीन\' का पृष्ठभूमि और रचनाकार परिचय', '\'घर में तीन\' का कथानक/पाठ', '\'घर में तीन\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
