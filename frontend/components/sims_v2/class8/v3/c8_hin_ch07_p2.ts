import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch07_p2: SimDef = {
    id: 'v3_c8_hin_ch07_p2',
    title: 'पाठ 7 · Part 2/3',
    subtitle: 'यह नोड \'मत बाँधो\' (मल्हार कक्षा 6, (कविता)) के इस पहलू तक सीमित है — वास्तविक पाठ पर.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 7 · Part 2/3',
    chapters: ['c8_hin_ch07'],
    nodeIds: ['c8_hin_cbse_07_007', 'c8_hin_cbse_07_008', 'c8_hin_cbse_07_009', 'c8_hin_cbse_07_010', 'c8_hin_cbse_07_011', 'c8_hin_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'मत बाँधो\' में सपने, पंख गौण विषय हैं — वे मुख्य विषय स्वतंत्रता को पूरक करते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — गौण विषय', text: '\'मत बाँधो\' के गौण विषय — सपने, पंख जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — गौण', 'पाठ 7 — साहित्यिक', 'पाठ 7 — पदावली', 'पाठ 7 — व्याकरण', 'पाठ 7 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 2/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — \'मत बाँधो\' में भाषा-प्रयोग — (कविता) ने कविता के अनुरूप शब्द, शैली और लय चुने हैं।', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — \'मत बाँधो\' के वस्तुनिष्ठ प्रश्न — रचनाकार (कविता), विधा कविता, विषय स्वतंत्रता, और पाठ की.', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_007', difficulty: 'standard',
          question: '\'मत बाँधो\' के गौण विषय — सपने, पंख जैसे सहायक विचार मुख्य विषय को गहराई देते.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' के गौण विषय',
                  options: ['\'मत बाँधो\' के गौण विषय', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_008', difficulty: 'standard',
          question: '\'मत बाँधो\' में बिंब/चित्रण — (कविता) ने स्वतंत्रता, सपने, पंख जैसे दृश्यों से.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' में बिंब/चित्रण',
                  options: ['\'मत बाँधो\' में बिंब/चित्रण', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_009', difficulty: 'standard',
          question: '\'मत बाँधो\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें मिलकर गहरा सत्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'मत बाँधो\' में विरोधाभास/विशेष युक्तियाँ', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_010', difficulty: 'standard',
          question: '\'मत बाँधो\' की पदावली — मुख्य शब्द स्वतंत्रता, सपने, पंख, सौरभ जिनका अर्थ.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' की पदावली',
                  options: ['\'मत बाँधो\' की पदावली', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_011', difficulty: 'standard',
          question: '\'मत बाँधो\' में भाषा-प्रयोग — (कविता) ने कविता के अनुरूप शब्द, शैली और लय चुने.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' में भाषा-प्रयोग',
                  options: ['\'मत बाँधो\' में भाषा-प्रयोग', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_012', difficulty: 'standard',
          question: '\'मत बाँधो\' के वस्तुनिष्ठ प्रश्न — रचनाकार (कविता), विधा कविता, विषय स्वतंत्रता.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मत बाँधो\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'मत बाँधो\' के वस्तुनिष्ठ प्रश्न', '\'मत बाँधो\' का पृष्ठभूमि और रचनाकार परिचय', '\'मत बाँधो\' का कथानक/पाठ', '\'मत बाँधो\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
