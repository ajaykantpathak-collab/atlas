import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch10_p2: SimDef = {
    id: 'v3_c7_hin_ch10_p2',
    title: 'मीरा के पद · Part 2/3',
    subtitle: 'यह नोड \'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' (मल्हार कक्षा 6, मीराबाई) के इस पहलू तक.',
    classLevel: 7, subject: 'hin', topic: 'मीरा के पद · Part 2/3',
    chapters: ['c7_hin_ch10'],
    nodeIds: ['c7_hin_cbse_10_007', 'c7_hin_cbse_10_008', 'c7_hin_cbse_10_009', 'c7_hin_cbse_10_010', 'c7_hin_cbse_10_011', 'c7_hin_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में कृष्ण, नंदलाल गौण विषय हैं — वे मुख्य विषय कृष्ण-भक्ति को पूरक.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'मीरा के पद — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' के गौण विषय — कृष्ण, नंदलाल जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['मीरा के पद —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c7_hin_cbse_10_008', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['पंक्ति — बसो मेरे नैनन में नंदलाल। मोहिन मूरत साँवरी सूरत.', 'भाव पर असर।', 'उसमें छिपा दृश्य।'], answer: 'पंक्ति — बसो मेरे नैनन में नंदलाल। मोहिन मूरत साँवरी सूरत. उसमें छिपा दृश्य। भाव पर असर।' } },
        { type: 'case', nodeId: 'c7_hin_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through मीरा के पद like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? मीरा के पद · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — मीरा के पद · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_007', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' के गौण विषय — कृष्ण, नंदलाल जैसे सहायक.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' के गौण विषय',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' के गौण विषय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_008', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में बिंब/चित्रण — मीराबाई ने मीरा.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में बिंब/चित्रण',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में बिंब/चित्रण', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_009', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में विरोधाभास/विशेष युक्तियाँ — जहाँ.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में विरोधाभास/विशेष युक्तियाँ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_010', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' की पदावली — मुख्य शब्द मीरा, कृष्ण.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' की पदावली',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' की पदावली', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_011', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में भाषा-प्रयोग — मीराबाई ने कविता (पद).',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में भाषा-प्रयोग',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' में भाषा-प्रयोग', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_012', difficulty: 'standard',
          question: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' के वस्तुनिष्ठ प्रश्न — रचनाकार मीराबाई.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' के वस्तुनिष्ठ प्रश्न', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पृष्ठभूमि और रचनाकार परिचय', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का कथानक/पाठ', '\'बसो मेरे नैनन में नंदलाल (मीरा के पद)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
