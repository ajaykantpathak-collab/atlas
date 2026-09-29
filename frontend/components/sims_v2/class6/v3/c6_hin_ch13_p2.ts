import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch13_p2: SimDef = {
    id: 'v3_c6_hin_ch13_p2',
    title: 'पाठ 13 · Part 2/3',
    subtitle: 'यह नोड \'बीज की कथा\' (मल्हार कक्षा 6, (प्रकृति-कथा)) के इस पहलू तक सीमित है — वास्तविक पाठ.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 13 · Part 2/3',
    chapters: ['c6_hin_ch13'],
    nodeIds: ['c6_hin_cbse_13_007', 'c6_hin_cbse_13_008', 'c6_hin_cbse_13_009', 'c6_hin_cbse_13_010', 'c6_hin_cbse_13_011', 'c6_hin_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '\'बीज की कथा\' में अंकुर, जड़ गौण विषय हैं — वे मुख्य विषय बीज का जीवन-चक्र को पूरक करते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 13 — गौण विषय', text: '\'बीज की कथा\' के गौण विषय — अंकुर, जड़ जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 13 — गौण', 'पाठ 13 — साहित्यिक', 'पाठ 13 — पदावली', 'पाठ 13 — व्याकरण', 'पाठ 13 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_13_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 13 · Part 2/3', spots: [
            { id: 's1', label: '13 -', prompt: 'Which idea is this? — \'बीज की कथा\' में भाषा-प्रयोग — (प्रकृति-कथा) ने कहानी के अनुरूप शब्द, शैली और लय चुने हैं।', answer: '13 -', options: ['13 -', '13 - -'] },
            { id: 's2', label: '13 - -', prompt: 'Which idea is this? — \'बीज की कथा\' के वस्तुनिष्ठ प्रश्न — रचनाकार (प्रकृति-कथा), विधा कहानी, विषय बीज का.', answer: '13 - -', options: ['13 - -', '13 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 13 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 13 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 13 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_007', difficulty: 'standard',
          question: '\'बीज की कथा\' के गौण विषय — अंकुर, जड़ जैसे सहायक विचार मुख्य विषय को गहराई देते.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' के गौण विषय',
                  options: ['\'बीज की कथा\' के गौण विषय', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_008', difficulty: 'standard',
          question: '\'बीज की कथा\' में बिंब/चित्रण — (प्रकृति-कथा) ने बीज, अंकुर, जड़ जैसे दृश्यों से.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' में बिंब/चित्रण',
                  options: ['\'बीज की कथा\' में बिंब/चित्रण', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_009', difficulty: 'standard',
          question: '\'बीज की कथा\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें मिलकर गहरा सत्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'बीज की कथा\' में विरोधाभास/विशेष युक्तियाँ', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_010', difficulty: 'standard',
          question: '\'बीज की कथा\' की पदावली — मुख्य शब्द बीज, अंकुर, जड़, तना जिनका अर्थ पाठ-बोध की.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' की पदावली',
                  options: ['\'बीज की कथा\' की पदावली', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_011', difficulty: 'standard',
          question: '\'बीज की कथा\' में भाषा-प्रयोग — (प्रकृति-कथा) ने कहानी के अनुरूप शब्द, शैली और.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' में भाषा-प्रयोग',
                  options: ['\'बीज की कथा\' में भाषा-प्रयोग', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_012', difficulty: 'standard',
          question: '\'बीज की कथा\' के वस्तुनिष्ठ प्रश्न — रचनाकार (प्रकृति-कथा), विधा कहानी, विषय बीज.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बीज की कथा\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'बीज की कथा\' के वस्तुनिष्ठ प्रश्न', '\'बीज की कथा\' का पृष्ठभूमि और रचनाकार परिचय', '\'बीज की कथा\' का कथानक/पाठ', '\'बीज की कथा\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
