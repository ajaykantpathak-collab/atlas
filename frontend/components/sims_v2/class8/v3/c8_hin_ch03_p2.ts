import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch03_p2: SimDef = {
    id: 'v3_c8_hin_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'यह नोड \'एक आशीर्वाद\' (मल्हार कक्षा 6, (कविता)) के इस पहलू तक सीमित है — वास्तविक पाठ पर.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c8_hin_ch03'],
    nodeIds: ['c8_hin_cbse_03_007', 'c8_hin_cbse_03_008', 'c8_hin_cbse_03_009', 'c8_hin_cbse_03_010', 'c8_hin_cbse_03_011', 'c8_hin_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'एक आशीर्वाद\' में स्वप्न, भावना गौण विषय हैं — वे मुख्य विषय आशीर्वाद को पूरक करते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: '\'एक आशीर्वाद\' के गौण विषय — स्वप्न, भावना जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 2/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — \'एक आशीर्वाद\' में भाषा-प्रयोग — (कविता) ने कविता के अनुरूप शब्द, शैली और लय चुने हैं।', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — \'एक आशीर्वाद\' के वस्तुनिष्ठ प्रश्न — रचनाकार (कविता), विधा कविता, विषय आशीर्वाद, और पाठ.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_007', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' के गौण विषय — स्वप्न, भावना जैसे सहायक विचार मुख्य विषय को गहराई.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' के गौण विषय',
                  options: ['\'एक आशीर्वाद\' के गौण विषय', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_008', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' में बिंब/चित्रण — (कविता) ने आशीर्वाद, स्वप्न, भावना जैसे दृश्यों.',
          hint: 'Work step by step.',
          misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' में बिंब/चित्रण',
                  options: ['\'एक आशीर्वाद\' में बिंब/चित्रण', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र बिंब को सजावट मानते हैं — यहाँ बिंब ही भाव का वाहक है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_009', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत बातें मिलकर गहरा सत्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' में विरोधाभास/विशेष युक्तियाँ',
                  options: ['\'एक आशीर्वाद\' में विरोधाभास/विशेष युक्तियाँ', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_010', difficulty: 'standard',
          question: 'पदावली — 6-दुकान-छलनी: (1) पृथ्वी[\'धरा-वसुधा-अवनि-सुता-4-पर्याय.',
          hint: 'यदि अटका हुआ महसूस हो तो: दुकान-6 + घुसपैठ-5 + परीक्षा-4 — 6-दुकान-नाम, 5-घुसपैठ-नाम.',
          misconception: 'छात्र \'तारक-दीन\' जैसे पड़ोसी-शब्दों को पर्याय मानते हैं — श्रेणी-तना-अंतर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली — 6-दुकान-छलनी: (1) पृथ्वी[\'धरा-वसुधा-अवनि-सुता-4-पर्याय +',
                  options: ['पदावली — 6-दुकान-छलनी: (1) पृथ्वी[\'धरा-वसुधा-अवनि-सुता-4-पर्याय +', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पाठ्य-परिवेश'],
                  hint: 'यदि अटका हुआ महसूस हो तो: दुकान-6 + घुसपैठ-5 + परीक्षा-4 — 6-दुकान-नाम, 5-घुसपैठ-नाम.',
                  misconception: 'छात्र \'तारक-दीन\' जैसे पड़ोसी-शब्दों को पर्याय मानते हैं — श्रेणी-तना-अंतर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) दुकान-6 — पृथ्वी-चाँद-तारे-रोशनी-दीया-स्वप्न-6-नाम। (2) घुसपैठ-5 — यथार्थ-तारक-दीन-यथार्थ-उडुगण-5-नाम।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_011', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' में भाषा-प्रयोग — (कविता) ने कविता के अनुरूप शब्द, शैली और लय.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' में भाषा-प्रयोग',
                  options: ['\'एक आशीर्वाद\' में भाषा-प्रयोग', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_012', difficulty: 'standard',
          question: '\'एक आशीर्वाद\' के वस्तुनिष्ठ प्रश्न — रचनाकार (कविता), विधा कविता, विषय.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एक आशीर्वाद\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'एक आशीर्वाद\' के वस्तुनिष्ठ प्रश्न', '\'एक आशीर्वाद\' का पृष्ठभूमि और रचनाकार परिचय', '\'एक आशीर्वाद\' का कथानक/पाठ', '\'एक आशीर्वाद\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
