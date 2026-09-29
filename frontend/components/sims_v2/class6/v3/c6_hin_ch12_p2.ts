import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch12_p2: SimDef = {
    id: 'v3_c6_hin_ch12_p2',
    title: 'पाठ 12 · Part 2/3',
    subtitle: 'यह नोड \'यात्रा वृत्तांत — मॉरिशस की ओर\' (मल्हार कक्षा 6, (यात्रा-वृत्तांत)) के इस पहलू तक.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 12 · Part 2/3',
    chapters: ['c6_hin_ch12'],
    nodeIds: ['c6_hin_cbse_12_007', 'c6_hin_cbse_12_008', 'c6_hin_cbse_12_009', 'c6_hin_cbse_12_010', 'c6_hin_cbse_12_011', 'c6_hin_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' में नैरोबी, नेशनल पार्क गौण विषय हैं — वे मुख्य विषय यात्रा-अनुभव को पूरक.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — गौण विषय', text: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' के गौण विषय — नैरोबी, नेशनल पार्क जैसे सहायक विचार मुख्य विषय को गहराई देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — गौण', 'पाठ 12 — साहित्यिक', 'पाठ 12 — पदावली', 'पाठ 12 — व्याकरण', 'पाठ 12 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_12_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 2/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — \'यात्रा वृत्तांत — मॉरिशस की ओर\' में भाषा-प्रयोग — (यात्रा-वृत्तांत) ने गद्य के अनुरूप.', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — \'यात्रा वृत्तांत — मॉरिशस की ओर\' के वस्तुनिष्ठ प्रश्न — रचनाकार (यात्रा-वृत्तांत), विधा.', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 12 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_007', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' के गौण विषय — नैरोबी, नेशनल पार्क जैसे सहायक.',
          hint: 'Work step by step.',
          misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र गौण विषय को \'कमज़ोर\' मानते हैं — वे मुख्य विषय की परतें हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_008', difficulty: 'standard',
          question: 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से.',
          hint: 'यदि अटका हुआ महसूस हो तो: पाँच घटनाएँ — प्रस्थान, सिंह-सफ़ारी, हिरन-ठिठके, मॉरिशस-पहुँचा.',
          misconception: 'छात्र \'रात-बारिश-भीड़\' को \'साधारण-स्वागत\' मानते हैं — \'मगर\' (बावजूद) का भाव है — रात-अँधेरा-बारिश के बावजूद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और',
                  options: ['प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और', '\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल'],
                  hint: 'यदि अटका हुआ महसूस हो तो: पाँच घटनाएँ — प्रस्थान, सिंह-सफ़ारी, हिरन-ठिठके, मॉरिशस-पहुँचा.',
                  misconception: 'छात्र \'रात-बारिश-भीड़\' को \'साधारण-स्वागत\' मानते हैं — \'मगर\' (बावजूद) का भाव है — रात-अँधेरा-बारिश के बावजूद भीड़-स्वागत; यह \'छोटा-भारत\' की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) पाँच घटनाएँ — प्रस्थान, सफ़ारी, हिरन, आगमन, चित्र। (2) दो प्रमाण — \'रात-बारिश-भीड़\' (स्वागत).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_009', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' में विरोधाभास/विशेष युक्तियाँ — जहाँ विपरीत.',
          hint: 'Work step by step.',
          misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विरोध को \'गलती\' मानते हैं — साहित्य में वह गहराई का द्वार है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_010', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' की पदावली — मुख्य शब्द यात्रा, नैरोबी, नेशनल.',
          hint: 'Work step by step.',
          misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कठिन शब्दों को छोड़ देते हैं — पदावली ही पाठ की चाबी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_011', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' में भाषा-प्रयोग — (यात्रा-वृत्तांत) ने गद्य के.',
          hint: 'Work step by step.',
          misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र भाषा को \'साधारण\' मानते हैं — सरलता में ही कुशलता छिपी है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_012', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' के वस्तुनिष्ठ प्रश्न — रचनाकार.',
          hint: 'Work step by step.',
          misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र वस्तुनिष्ठ प्रश्नों में अनुमान लगाते हैं — उत्तर पाठ में ही है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
