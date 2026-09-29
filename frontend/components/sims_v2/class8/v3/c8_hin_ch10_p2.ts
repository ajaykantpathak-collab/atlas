import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch10_p2: SimDef = {
    id: 'v3_c8_hin_ch10_p2',
    title: 'तरुण के स्वप्न · Part 2/3',
    subtitle: 'यह नोड \'स्वाधीन समाज का सपना (नेताजी)\' (मल्हार कक्षा 6, सुभाष चंद्र बोस) के इस पहलू तक.',
    classLevel: 8, subject: 'hin', topic: 'तरुण के स्वप्न · Part 2/3',
    chapters: ['c8_hin_ch10'],
    nodeIds: ['c8_hin_cbse_10_007', 'c8_hin_cbse_10_008', 'c8_hin_cbse_10_009', 'c8_hin_cbse_10_010', 'c8_hin_cbse_10_011', 'c8_hin_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'स्वाधीन समाज का सपना (नेताजी)\' में स्वप्न, स्वाधीनता गौण विषय हैं — वे मुख्य विषय नेताजी का स्वप्न को पूरक.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तरुण के स्वप्न — गौण विषय', text: '\'स्वाधीन समाज का सपना (नेताजी)\' के गौण विषय — स्वप्न, स्वाधीनता जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तरुण के स्वप्न —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c8_hin_cbse_10_008', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['पंक्ति — नेताजी सुभाषचंद्र बोस ऐसे स्वाधीन संपन्न समाज और.', 'उसमें छिपा दृश्य।', 'भाव पर असर।'], answer: 'पंक्ति — नेताजी सुभाषचंद्र बोस ऐसे स्वाधीन संपन्न समाज और. उसमें छिपा दृश्य। भाव पर असर।' } },
        { type: 'case', nodeId: 'c8_hin_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through तरुण के स्वप्न like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? तरुण के स्वप्न · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तरुण के स्वप्न · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_007', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' के गौण विषय — स्वप्न, स्वाधीनता जैसे सहायक.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' के गौण विषय',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' के गौण विषय', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_008', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' में बिंब/चित्रण — सुभाष चंद्र बोस ने नेताजी.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' में बिंब/चित्रण',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' में बिंब/चित्रण', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_009', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' में विरोधाभास/विशेष युक्तियाँ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_010', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' की पदावली — मुख्य शब्द नेताजी, स्वप्न.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' की पदावली',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' की पदावली', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_011', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' में भाषा-प्रयोग — सुभाष चंद्र बोस ने गद्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' में भाषा-प्रयोग',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' में भाषा-प्रयोग', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_012', difficulty: 'standard',
          question: '\'स्वाधीन समाज का सपना (नेताजी)\' के वस्तुनिष्ठ प्रश्न — रचनाकार सुभाष चंद्र बोस.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्वाधीन समाज का सपना (नेताजी)\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'स्वाधीन समाज का सपना (नेताजी)\' के वस्तुनिष्ठ प्रश्न', '\'स्वाधीन समाज का सपना (नेताजी)\' का पृष्ठभूमि और रचनाकार परिचय', '\'स्वाधीन समाज का सपना (नेताजी)\' का कथानक/पाठ', '\'स्वाधीन समाज का सपना (नेताजी)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
