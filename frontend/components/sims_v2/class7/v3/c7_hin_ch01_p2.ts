import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch01_p2: SimDef = {
    id: 'v3_c7_hin_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'यह नोड \'माँ, कह एक कहानी\' (मल्हार कक्षा 6, (बालगीत/कविता)) के इस पहलू तक सीमित है.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c7_hin_ch01'],
    nodeIds: ['c7_hin_cbse_01_007', 'c7_hin_cbse_01_008', 'c7_hin_cbse_01_009', 'c7_hin_cbse_01_010', 'c7_hin_cbse_01_011', 'c7_hin_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: '\'माँ, कह एक कहानी\' में नानी, कहानी गौण विषय हैं — वे मुख्य विषय बच्चे की जिज्ञासा और माँ-बेटी का प्रेम को.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: '\'माँ, कह एक कहानी\' के गौण विषय — नानी, कहानी जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 2/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — \'माँ, कह एक कहानी\' में भाषा-प्रयोग — (बालगीत/कविता) ने कविता के अनुरूप शब्द, शैली और लय.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — \'माँ, कह एक कहानी\' के वस्तुनिष्ठ प्रश्न — रचनाकार (बालगीत/कविता), विधा कविता, विषय बच्चे.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_007', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' के गौण विषय — नानी, कहानी जैसे सहायक विचार मुख्य विषय को.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' के गौण विषय',
                  options: ['\'माँ, कह एक कहानी\' के गौण विषय', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_008', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' में बिंब/चित्रण — (बालगीत/कविता) ने माँ, नानी, कहानी जैसे.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' में बिंब/चित्रण',
                  options: ['\'माँ, कह एक कहानी\' में बिंब/चित्रण', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_009', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें मिलकर गहरा.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'माँ, कह एक कहानी\' में विरोधाभास/विशेष युक्तियाँ', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_010', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' की पदावली — मुख्य शब्द माँ, नानी, कहानी, राजा-रानी जिनका.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' की पदावली',
                  options: ['\'माँ, कह एक कहानी\' की पदावली', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_011', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' में भाषा-प्रयोग — (बालगीत/कविता) ने कविता के अनुरूप शब्द.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' में भाषा-प्रयोग',
                  options: ['\'माँ, कह एक कहानी\' में भाषा-प्रयोग', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_012', difficulty: 'standard',
          question: '\'माँ, कह एक कहानी\' के वस्तुनिष्ठ प्रश्न — रचनाकार (बालगीत/कविता), विधा कविता.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माँ, कह एक कहानी\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'माँ, कह एक कहानी\' के वस्तुनिष्ठ प्रश्न', '\'माँ, कह एक कहानी\' का पृष्ठभूमि और रचनाकार परिचय', '\'माँ, कह एक कहानी\' का कथानक/पाठ', '\'माँ, कह एक कहानी\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
