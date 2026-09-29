import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch10_p2: SimDef = {
    id: 'v3_c6_hin_ch10_p2',
    title: 'पाठ 10 · Part 2/3',
    subtitle: 'यह नोड \'दीनबंधु की सेवा\' (मल्हार कक्षा 6, (राजस्थानी कथा)) के इस पहलू तक सीमित है.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 10 · Part 2/3',
    chapters: ['c6_hin_ch10'],
    nodeIds: ['c6_hin_cbse_10_007', 'c6_hin_cbse_10_008', 'c6_hin_cbse_10_009', 'c6_hin_cbse_10_010', 'c6_hin_cbse_10_011', 'c6_hin_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '\'दीनबंधु की सेवा\' में सेवा, देवगढ़ गौण विषय हैं — वे मुख्य विषय सेवा-भाव और वचनबद्धता को पूरक करते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — गौण विषय', text: '\'दीनबंधु की सेवा\' के गौण विषय — सेवा, देवगढ़ जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — गौण', 'पाठ 10 — साहित्यिक', 'पाठ 10 — पदावली', 'पाठ 10 — व्याकरण', 'पाठ 10 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 2/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — \'दीनबंधु की सेवा\' में भाषा-प्रयोग — (राजस्थानी कथा) ने गद्य के अनुरूप शब्द, शैली और लय.', answer: '10 -', options: ['10 -', '10 - -'] },
            { id: 's2', label: '10 - -', prompt: 'Which idea is this? — \'दीनबंधु की सेवा\' के वस्तुनिष्ठ प्रश्न — रचनाकार (राजस्थानी कथा), विधा गद्य, विषय.', answer: '10 - -', options: ['10 - -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 10 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 10 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 10 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_007', difficulty: 'standard',
          question: '\'दीनबंधु की सेवा\' के गौण विषय — सेवा, देवगढ़ जैसे सहायक विचार मुख्य विषय को.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दीनबंधु की सेवा\' के गौण विषय',
                  options: ['\'दीनबंधु की सेवा\' के गौण विषय', '\'दीनबंधु की सेवा\' का पृष्ठभूमि और रचनाकार परिचय', '\'दीनबंधु की सेवा\' का कथानक/पाठ', '\'दीनबंधु की सेवा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_008', difficulty: 'standard',
          question: '\'दीनबंधु की सेवा\' में बिंब/चित्रण — (राजस्थानी कथा) ने दीनबंधु, सेवा, देवगढ़.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दीनबंधु की सेवा\' में बिंब/चित्रण',
                  options: ['\'दीनबंधु की सेवा\' में बिंब/चित्रण', '\'दीनबंधु की सेवा\' का पृष्ठभूमि और रचनाकार परिचय', '\'दीनबंधु की सेवा\' का कथानक/पाठ', '\'दीनबंधु की सेवा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_009', difficulty: 'standard',
          question: '\'दीनबंधु की सेवा\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें मिलकर गहरा.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दीनबंधु की सेवा\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'दीनबंधु की सेवा\' में विरोधाभास/विशेष युक्तियाँ', '\'दीनबंधु की सेवा\' का पृष्ठभूमि और रचनाकार परिचय', '\'दीनबंधु की सेवा\' का कथानक/पाठ', '\'दीनबंधु की सेवा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_010', difficulty: 'standard',
          question: '\'दीनबंधु की सेवा\' की पदावली — मुख्य शब्द दीनबंधु, सेवा, देवगढ़, दीवान जिनका.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दीनबंधु की सेवा\' की पदावली',
                  options: ['\'दीनबंधु की सेवा\' की पदावली', '\'दीनबंधु की सेवा\' का पृष्ठभूमि और रचनाकार परिचय', '\'दीनबंधु की सेवा\' का कथानक/पाठ', '\'दीनबंधु की सेवा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_011', difficulty: 'standard',
          question: '\'दीनबंधु की सेवा\' में भाषा-प्रयोग — (राजस्थानी कथा) ने गद्य के अनुरूप शब्द.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दीनबंधु की सेवा\' में भाषा-प्रयोग',
                  options: ['\'दीनबंधु की सेवा\' में भाषा-प्रयोग', '\'दीनबंधु की सेवा\' का पृष्ठभूमि और रचनाकार परिचय', '\'दीनबंधु की सेवा\' का कथानक/पाठ', '\'दीनबंधु की सेवा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_012', difficulty: 'standard',
          question: '\'दीनबंधु की सेवा\' के वस्तुनिष्ठ प्रश्न — रचनाकार (राजस्थानी कथा), विधा गद्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दीनबंधु की सेवा\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'दीनबंधु की सेवा\' के वस्तुनिष्ठ प्रश्न', '\'दीनबंधु की सेवा\' का पृष्ठभूमि और रचनाकार परिचय', '\'दीनबंधु की सेवा\' का कथानक/पाठ', '\'दीनबंधु की सेवा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
