import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch08_p2: SimDef = {
    id: 'v3_c8_hin_ch08_p2',
    title: 'पाठ 8 · Part 2/3',
    subtitle: 'यह नोड \'भारत का बड़ा नगर (नाट्य-दृश्य)\' (मल्हार कक्षा 6, (नाटक-अंश)) के इस पहलू तक सीमित.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 8 · Part 2/3',
    chapters: ['c8_hin_ch08'],
    nodeIds: ['c8_hin_cbse_08_007', 'c8_hin_cbse_08_008', 'c8_hin_cbse_08_009', 'c8_hin_cbse_08_010', 'c8_hin_cbse_08_011', 'c8_hin_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' में दृश्य, कमरा गौण विषय हैं — वे मुख्य विषय नाट्य-दृश्य को पूरक करते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — गौण विषय', text: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' के गौण विषय — दृश्य, कमरा जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — गौण', 'पाठ 8 — साहित्यिक', 'पाठ 8 — पदावली', 'पाठ 8 — व्याकरण', 'पाठ 8 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_08_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 2/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — \'भारत का बड़ा नगर (नाट्य-दृश्य)\' में भाषा-प्रयोग — (नाटक-अंश) ने नाटक के अनुरूप शब्द.', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — \'भारत का बड़ा नगर (नाट्य-दृश्य)\' के वस्तुनिष्ठ प्रश्न — रचनाकार (नाटक-अंश), विधा नाटक.', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_007', difficulty: 'standard',
          question: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' के गौण विषय — दृश्य, कमरा जैसे सहायक विचार.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' के गौण विषय',
                  options: ['\'भारत का बड़ा नगर (नाट्य-दृश्य)\' के गौण विषय', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पृष्ठभूमि और रचनाकार परिचय', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का कथानक/पाठ', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_008', difficulty: 'standard',
          question: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' में बिंब/चित्रण — (नाटक-अंश) ने नाटक, दृश्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' में बिंब/चित्रण',
                  options: ['\'भारत का बड़ा नगर (नाट्य-दृश्य)\' में बिंब/चित्रण', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पृष्ठभूमि और रचनाकार परिचय', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का कथानक/पाठ', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_009', difficulty: 'standard',
          question: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'भारत का बड़ा नगर (नाट्य-दृश्य)\' में विरोधाभास/विशेष युक्तियाँ', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पृष्ठभूमि और रचनाकार परिचय', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का कथानक/पाठ', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_010', difficulty: 'standard',
          question: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' की पदावली — मुख्य शब्द नाटक, दृश्य, कमरा.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' की पदावली',
                  options: ['\'भारत का बड़ा नगर (नाट्य-दृश्य)\' की पदावली', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पृष्ठभूमि और रचनाकार परिचय', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का कथानक/पाठ', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_011', difficulty: 'standard',
          question: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' में भाषा-प्रयोग — (नाटक-अंश) ने नाटक के अनुरूप.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' में भाषा-प्रयोग',
                  options: ['\'भारत का बड़ा नगर (नाट्य-दृश्य)\' में भाषा-प्रयोग', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पृष्ठभूमि और रचनाकार परिचय', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का कथानक/पाठ', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_012', difficulty: 'standard',
          question: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' के वस्तुनिष्ठ प्रश्न — रचनाकार (नाटक-अंश).',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'भारत का बड़ा नगर (नाट्य-दृश्य)\' के वस्तुनिष्ठ प्रश्न', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पृष्ठभूमि और रचनाकार परिचय', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का कथानक/पाठ', '\'भारत का बड़ा नगर (नाट्य-दृश्य)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
