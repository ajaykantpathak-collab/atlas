import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch04_p2: SimDef = {
    id: 'v3_c8_hin_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'यह नोड \'हरिद्वार (कविवचन सुधा पत्र)\' (मल्हार कक्षा 6, (पत्र/सम्पादकीय शैली)) के इस पहलू.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c8_hin_ch04'],
    nodeIds: ['c8_hin_cbse_04_007', 'c8_hin_cbse_04_008', 'c8_hin_cbse_04_009', 'c8_hin_cbse_04_010', 'c8_hin_cbse_04_011', 'c8_hin_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'हरिद्वार (कविवचन सुधा पत्र)\' में पर्वत, पवित्र भूमि गौण विषय हैं — वे मुख्य विषय हरिद्वार का वर्णन को पूरक.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — गौण विषय', text: '\'हरिद्वार (कविवचन सुधा पत्र)\' के गौण विषय — पर्वत, पवित्र भूमि जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — गौण', 'पाठ 4 — साहित्यिक', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 2/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — \'हरिद्वार (कविवचन सुधा पत्र)\' में भाषा-प्रयोग — (पत्र/सम्पादकीय शैली) ने गद्य के अनुरूप.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ-प्रश्न — 3-पंक्ति-क्विज़-बगीचा.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_007', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' के गौण विषय — पर्वत, पवित्र भूमि जैसे सहायक विचार.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' के गौण विषय',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' के गौण विषय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_008', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' में बिंब/चित्रण — (पत्र/सम्पादकीय शैली) ने.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' में बिंब/चित्रण',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' में बिंब/चित्रण', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_009', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' में विरोधाभास/विशेष युक्तियाँ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_010', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' की पदावली — मुख्य शब्द हरिद्वार, पर्वत, पवित्र.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' की पदावली',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' की पदावली', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_011', difficulty: 'standard',
          question: '\'हरिद्वार (कविवचन सुधा पत्र)\' में भाषा-प्रयोग — (पत्र/सम्पादकीय शैली) ने गद्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हरिद्वार (कविवचन सुधा पत्र)\' में भाषा-प्रयोग',
                  options: ['\'हरिद्वार (कविवचन सुधा पत्र)\' में भाषा-प्रयोग', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ-प्रश्न — 3-पंक्ति-क्विज़-बगीचा.',
          hint: 'यदि अटका हुआ महसूस हो तो: MCQ-6 + जोड़ी-6 + रजिस्टर-3 — 6-MCQ-उत्तर, 6-सही-जोड़ी.',
          misconception: 'छात्र \'स्वच्छता-प्रकृति-प्रेम\' (भोजन-MCQ-d) को सही-उत्तर मानते हैं — लगभग-सही-जाल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ-प्रश्न',
                  options: ['वस्तुनिष्ठ-प्रश्न', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पृष्ठभूमि और रचनाकार परिचय', '\'हरिद्वार (कविवचन सुधा पत्र)\' का कथानक/पाठ', '\'हरिद्वार (कविवचन सुधा पत्र)\' का पाठ्य-परिवेश'],
                  hint: 'यदि अटका हुआ महसूस हो तो: MCQ-6 + जोड़ी-6 + रजिस्टर-3 — 6-MCQ-उत्तर, 6-सही-जोड़ी, 3-पठन-रजिस्टर.',
                  misconception: 'छात्र \'स्वच्छता-प्रकृति-प्रेम\' (भोजन-MCQ-d) को सही-उत्तर मानते हैं — लगभग-सही-जाल.' }
          ],
            remediations: { 'mcq-d-locale-vs-engine': { steps: ['**उपचार**: (1) MCQ-6 — पेड़-भोजन-निष्कर्ष-पंडे-देवता-भाषा-6-उत्तर। (2) जोड़ी-6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
