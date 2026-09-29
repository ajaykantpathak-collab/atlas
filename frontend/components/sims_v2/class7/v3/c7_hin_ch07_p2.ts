import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch07_p2: SimDef = {
    id: 'v3_c7_hin_ch07_p2',
    title: 'पाठ 7 · Part 2/3',
    subtitle: 'यह नोड \'वर्षा-बहार\' (मल्हार कक्षा 6, (ऋतु-वर्णन कविता)) के इस पहलू तक सीमित है — वास्तविक.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 7 · Part 2/3',
    chapters: ['c7_hin_ch07'],
    nodeIds: ['c7_hin_cbse_07_007', 'c7_hin_cbse_07_008', 'c7_hin_cbse_07_009', 'c7_hin_cbse_07_010', 'c7_hin_cbse_07_011', 'c7_hin_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: '\'वर्षा-बहार\' में बादल, बिजली गौण विषय हैं — वे मुख्य विषय वर्षा-ऋतु का चित्रण को पूरक करते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — गौण विषय', text: '\'वर्षा-बहार\' के गौण विषय — बादल, बिजली जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — गौण', 'पाठ 7 — साहित्यिक', 'पाठ 7 — पदावली', 'पाठ 7 — व्याकरण', 'पाठ 7 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 2/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — \'वर्षा-बहार\' में भाषा-प्रयोग — (ऋतु-वर्णन कविता) ने कविता के अनुरूप शब्द, शैली और लय चुने.', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — \'वर्षा-बहार\' के वस्तुनिष्ठ प्रश्न — रचनाकार (ऋतु-वर्णन कविता), विधा कविता, विषय वर्षा-ऋतु.', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_07_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_007', difficulty: 'standard',
          question: '\'वर्षा-बहार\' के गौण विषय — बादल, बिजली जैसे सहायक विचार मुख्य विषय को गहराई.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वर्षा-बहार\' के गौण विषय',
                  options: ['\'वर्षा-बहार\' के गौण विषय', '\'वर्षा-बहार\' का पृष्ठभूमि और रचनाकार परिचय', '\'वर्षा-बहार\' का कथानक/पाठ', '\'वर्षा-बहार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_008', difficulty: 'standard',
          question: '\'वर्षा-बहार\' में बिंब/चित्रण — (ऋतु-वर्णन कविता) ने वर्षा, बादल, बिजली जैसे.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वर्षा-बहार\' में बिंब/चित्रण',
                  options: ['\'वर्षा-बहार\' में बिंब/चित्रण', '\'वर्षा-बहार\' का पृष्ठभूमि और रचनाकार परिचय', '\'वर्षा-बहार\' का कथानक/पाठ', '\'वर्षा-बहार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_009', difficulty: 'standard',
          question: '\'वर्षा-बहार\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें मिलकर गहरा सत्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वर्षा-बहार\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'वर्षा-बहार\' में विरोधाभास/विशेष युक्तियाँ', '\'वर्षा-बहार\' का पृष्ठभूमि और रचनाकार परिचय', '\'वर्षा-बहार\' का कथानक/पाठ', '\'वर्षा-बहार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_010', difficulty: 'standard',
          question: '\'वर्षा-बहार\' की पदावली — मुख्य शब्द वर्षा, बादल, बिजली, झरने जिनका अर्थ पाठ-बोध.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वर्षा-बहार\' की पदावली',
                  options: ['\'वर्षा-बहार\' की पदावली', '\'वर्षा-बहार\' का पृष्ठभूमि और रचनाकार परिचय', '\'वर्षा-बहार\' का कथानक/पाठ', '\'वर्षा-बहार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_011', difficulty: 'standard',
          question: '\'वर्षा-बहार\' में भाषा-प्रयोग — (ऋतु-वर्णन कविता) ने कविता के अनुरूप शब्द, शैली.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वर्षा-बहार\' में भाषा-प्रयोग',
                  options: ['\'वर्षा-बहार\' में भाषा-प्रयोग', '\'वर्षा-बहार\' का पृष्ठभूमि और रचनाकार परिचय', '\'वर्षा-बहार\' का कथानक/पाठ', '\'वर्षा-बहार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_012', difficulty: 'standard',
          question: '\'वर्षा-बहार\' के वस्तुनिष्ठ प्रश्न — रचनाकार (ऋतु-वर्णन कविता), विधा कविता, विषय.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वर्षा-बहार\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'वर्षा-बहार\' के वस्तुनिष्ठ प्रश्न', '\'वर्षा-बहार\' का पृष्ठभूमि और रचनाकार परिचय', '\'वर्षा-बहार\' का कथानक/पाठ', '\'वर्षा-बहार\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
