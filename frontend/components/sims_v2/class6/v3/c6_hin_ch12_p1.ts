import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch12_p1: SimDef = {
    id: 'v3_c6_hin_ch12_p1',
    title: 'पाठ 12 · Part 1/3',
    subtitle: 'यह नोड \'यात्रा वृत्तांत — मॉरिशस की ओर\' (मल्हार कक्षा 6, (यात्रा-वृत्तांत)) के इस पहलू तक.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 12 · Part 1/3',
    chapters: ['c6_hin_ch12'],
    nodeIds: ['c6_hin_cbse_12_001', 'c6_hin_cbse_12_002', 'c6_hin_cbse_12_003', 'c6_hin_cbse_12_004', 'c6_hin_cbse_12_005', 'c6_hin_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'पहले रचनाकार: (यात्रा-वृत्तांत)। फिर काल और परिवेश। फिर \'यात्रा वृत्तांत — मॉरिशस की ओर\' का विषय.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — पृष्ठभूमि और रचनाकार परिचय', text: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' का पृष्ठभूमि और रचनाकार परिचय — (यात्रा-वृत्तांत) द्वारा रचित गद्य। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — पृष्ठभूमि', 'पाठ 12 — कथानक', 'पाठ 12 — पाठ्य-परिवेश', 'पाठ 12 — पात्र-चित्रण', 'पाठ 12 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 1/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई.', answer: '12 -', options: ['12 -', '12 -'] },
            { id: 's2', label: '12 -', prompt: 'Which idea is this? — यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल.', answer: '12 -', options: ['12 -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 12 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_001', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' का पृष्ठभूमि और रचनाकार परिचय.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'यात्रा वृत्तांत — मॉरिशस की ओर\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'यात्रा वृत्तांत — मॉरिशस की ओर\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_002', difficulty: 'standard',
          question: 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15.',
          hint: 'यदि अटका हुआ महसूस हो तो: पाँच खंड — नैरोबी-सिंह, हिरन-ठिठके, मॉरिशस-पहुँचा, \'छोटा-भारत\'.',
          misconception: 'छात्र \'छोटा-सा हिंदुस्तान\' को केवल नाम-समानता मानते हैं — इसका अर्थ भारतीय-संस्कृति का पूरा जमाव (67% भारतीय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,',
                  options: ['पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', '\'यात्रा वृत्तांत', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', '\'यात्रा वृत्तांत'],
                  hint: 'यदि अटका हुआ महसूस हो तो: पाँच खंड — नैरोबी-सिंह, हिरन-ठिठके, मॉरिशस-पहुँचा, \'छोटा-भारत\'.',
                  misconception: 'छात्र \'छोटा-सा हिंदुस्तान\' को केवल नाम-समानता मानते हैं — इसका अर्थ भारतीय-संस्कृति का पूरा जमाव (67% भारतीय, धर्म-डटना, शिवालय, पर्व.' }
          ],
            remediations: { '67': { steps: ['**उपचार**: (1) पाँच खंड — यात्रा-आरंभ, सिंह-दृश्य, हिरन-जिराफ, मॉरिशस-परिचय, भारतीयता। (2) तीन तथ्य — 67% भारतीय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_003', difficulty: 'standard',
          question: 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का.',
          hint: 'यदि अटका हुआ महसूस हो तो: दो ठिकाने — नैरोबी-जंगल (चिड़ियाघर-नहीं) और मॉरिशस-द्वीप.',
          misconception: 'छात्र \'नेशनल पार्क\' को \'चिड़ियाघर\' मानते हैं — \'नेशनल पार्क चिड़ियाघर नहीं है\' — पार्क खुला-जंगल है (गाड़ी से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल',
                  options: ['यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', '\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', '\'यात्रा वृत्तांत'],
                  hint: 'यदि अटका हुआ महसूस हो तो: दो ठिकाने — नैरोबी-जंगल (चिड़ियाघर-नहीं) और मॉरिशस-द्वीप (720-मील-मोती).',
                  misconception: 'छात्र \'नेशनल पार्क\' को \'चिड़ियाघर\' मानते हैं — \'नेशनल पार्क चिड़ियाघर नहीं है\' — पार्क खुला-जंगल है (गाड़ी से जानवर-दर्शन), चिड़ियाघर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) नैरोबी-पार्क — खुला-जंगल, घास-भूमि, गाड़ी-यात्रा। (2) मॉरिशस — 20°-दक्षिण, 720-वर्गमील, \'मोती-सितारा\'।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_004', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' का पात्र/केंद्रीय विचार — लेखक मुख्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'यात्रा वृत्तांत — मॉरिशस की ओर\' में लेखक पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'यात्रा वृत्तांत — मॉरिशस की ओर\' में लेखक पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_005', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' के सहायक पात्र/तत्व — सिंह, बंदर-लंगूर मुख्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_006', difficulty: 'standard',
          question: '\'यात्रा वृत्तांत — मॉरिशस की ओर\' का मुख्य विषय — यात्रा-अनुभव — नैरोबी नेशनल.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'यात्रा वृत्तांत — मॉरिशस की ओर\' की घटनाएँ कथानक हैं, यात्रा-अनुभव विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यात्रा वृत्तांत',
                  options: ['\'यात्रा वृत्तांत', 'पाठ-सार — पाँच-खंड यात्रा: **खंड 1 (यात्रा-आरंभ):** \'यात्रा पर मैं दिल्ली से 15 जुलाई,', 'यात्रा-परिवेश — दो स्थान: (1) नैरोबी नेशनल पार्क (केन्या, अफ़्रीका): \'नैरोबी का नेशनल', 'प्रमुख घटनाएँ — (1) प्रस्थान-क्रम: \'यात्रा पर मैं दिल्ली से 15 जुलाई, बंबई से 16 जुलाई और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'यात्रा वृत्तांत — मॉरिशस की ओर\' की घटनाएँ कथानक हैं, यात्रा-अनुभव विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
