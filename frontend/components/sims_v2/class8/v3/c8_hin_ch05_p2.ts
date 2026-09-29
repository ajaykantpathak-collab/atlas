import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch05_p2: SimDef = {
    id: 'v3_c8_hin_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'यह नोड \'साँच बराबर तप नहीं (कबीर के दोहे)\' (मल्हार कक्षा 6, कबीर दास) के इस पहलू तक सीमित.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c8_hin_ch05'],
    nodeIds: ['c8_hin_cbse_05_007', 'c8_hin_cbse_05_008', 'c8_hin_cbse_05_009', 'c8_hin_cbse_05_010', 'c8_hin_cbse_05_011', 'c8_hin_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' में दोहे, साँच गौण विषय हैं — वे मुख्य विषय कबीर की नीति को पूरक करते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' के गौण विषय — दोहे, साँच जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 2/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — \'साँच बराबर तप नहीं (कबीर के दोहे)\' में भाषा-प्रयोग — कबीर दास ने कविता (दोहे) के अनुरूप.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — \'साँच बराबर तप नहीं (कबीर के दोहे)\' के वस्तुनिष्ठ प्रश्न — रचनाकार कबीर दास, विधा कविता.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_007', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' के गौण विषय — दोहे, साँच जैसे सहायक विचार.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' के गौण विषय',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' के गौण विषय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_008', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' में बिंब/चित्रण — कबीर दास ने कबीर, दोहे.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' में बिंब/चित्रण',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' में बिंब/चित्रण', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_009', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' में विरोधाभास/विशेष युक्तियाँ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_010', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' की पदावली — मुख्य शब्द कबीर, दोहे, साँच.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' की पदावली',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' की पदावली', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_011', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' में भाषा-प्रयोग — कबीर दास ने कविता (दोहे).',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' में भाषा-प्रयोग',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' में भाषा-प्रयोग', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_012', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' के वस्तुनिष्ठ प्रश्न — रचनाकार कबीर दास.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' के वस्तुनिष्ठ प्रश्न', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
