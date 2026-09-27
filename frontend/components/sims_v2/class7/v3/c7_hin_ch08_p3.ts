import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch08_p3: SimDef = {
    id: 'v3_c7_hin_ch08_p3',
    title: 'पाठ 8 · Part 3/3',
    subtitle: 'यह नोड कक्षा 7 के पाठ 8 के संदर्भ में विश्लेषण और व्याख्या की **उन्नत रणनीतियाँ** सिखाता.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 8 · Part 3/3',
    chapters: ['c7_hin_ch08'],
    nodeIds: ['c7_hin_cbse_08_013', 'c7_hin_cbse_08_014', 'c7_hin_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुमने एक विज्ञापन देखा जिसमें एक बच्चा महँगे जूते पहनकर दौड़ जीतता है — पहली नज़र में लगता है.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या वह प्रक्रिया है जिसमें पाठ के तथ्यों (कथानक, पात्र, भाषा) को तोड़कर उनके अंतर्संबंध खोजे जाते हैं (विश्लेषण) और फिर उनसे लेखक का उद्देश्य, गहरा अर्थ या.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — आलोचनात्मक', 'पाठ 8 — लेखन', 'पाठ 8 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_08_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 3/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — पाठ आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ को पढ़कर, समझकर और विश्लेषण करके.', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु वे संरचित प्रश्न और विषय होते हैं जो किसी पाठ को पढ़ने या सुनने.', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 8 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या वह प्रक्रिया है जिसमें पाठ के तथ्यों.',
          hint: 'यदि फँस जाएँ तो **c7_hin_cbse_08_012 (बोध-प्रश्न: आशय-सूचक)** पर लौटें — वहाँ अनुमान.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **पाठ में कमियाँ निकालना** (fault-finding) या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या वह प्रक्रिया है जिसमें पाठ के तथ्यों (कथानक,',
                  options: ['आलोचनात्मक चिंतन: विश्लेषण और व्याख्या वह प्रक्रिया है जिसमें पाठ के तथ्यों (कथानक,', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'यदि फँस जाएँ तो **c7_hin_cbse_08_012 (बोध-प्रश्न: आशय-सूचक)** पर लौटें — वहाँ अनुमान लगाने का वही.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **पाठ में कमियाँ निकालना** (fault-finding) या **अपनी निजी राय देना**.' }
          ],
            remediations: { 'fault-finding': { steps: ['**शब्द-भेद स्पष्ट करें**: बोर्ड पर लिखें — \'आलोचना (criticism) = दोष निकालना\' बनाम \'आलोचनात्मक चिंतन (critical.', '**\'मैं\' को हटाने का अभ्यास**: छात्र से कहें — \'अपने पिछले उत्तर में हर "मुझे लगता है / मुझे पसंद नहीं" को काटकर उसकी.', '**साक्ष्य-आधारित वाक्य-ढाँचा दें**: "पृष्ठ ___ पर ___ संवाद/विवरण से पता चलता है कि ___ क्योंकि ___।" — इसे 3 बार.', '**सहकर्मी समीक्षा**: दो छात्रों के उत्तर आमने-सामने रखें — एक जिसमें \'मैं\' हो, एक जिसमें केवल पाठ-प्रमाण हो। कक्षा से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_014', difficulty: 'standard',
          question: 'पाठ आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ को पढ़कर, समझकर और.',
          hint: 'यदि छात्र फंसे हुए हैं तो उन्हें पाठ बोध (c7_hin_cbse_08_012) की दोबारा समीक्षा करनी.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ आधारित लेखन में पाठ से लंबा उद्धरण कॉपी करना पर्याप्त है और उनका अपना स्पष्टीकरण या जोड़.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ को पढ़कर, समझकर और विश्लेषण करके',
                  options: ['पाठ आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ को पढ़कर, समझकर और विश्लेषण करके', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'यदि छात्र फंसे हुए हैं तो उन्हें पाठ बोध (c7_hin_cbse_08_012) की दोबारा समीक्षा करनी चाहिए जहाँ वे.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ आधारित लेखन में पाठ से लंबा उद्धरण कॉपी करना पर्याप्त है और उनका अपना स्पष्टीकरण या जोड़ जोड़ने की आवश्यकता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक लंबा उद्धरण बिना स्पष्टीकरण के जैसे एक पहेली का टुकड़ा रखना है बिना बताए कि यह कहाँ फिट होता है।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वे संरचित प्रश्न और विषय होते हैं जो किसी पाठ को पढ़ने.',
          hint: 'यदि विद्यार्थी चर्चा-बिंदु नहीं बना पा रहा, तो पहले "मुख्य विषय और संदेश".',
          misconception: 'विद्यार्थी समझते हैं कि "चर्चा-बिंदु" का अर्थ है **पाठ से जुड़े प्रश्नों की सूची बनाना** — वे प्रश्न लिखते हैं: "कौन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वे संरचित प्रश्न और विषय होते हैं जो किसी पाठ को पढ़ने या सुनने',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वे संरचित प्रश्न और विषय होते हैं जो किसी पाठ को पढ़ने या सुनने', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'यदि विद्यार्थी चर्चा-बिंदु नहीं बना पा रहा, तो पहले "मुख्य विषय और संदेश" (c7_hin_cbse_08_006) और.',
                  misconception: 'विद्यार्थी समझते हैं कि "चर्चा-बिंदु" का अर्थ है **पाठ से जुड़े प्रश्नों की सूची बनाना** — वे प्रश्न लिखते हैं: "कौन आया?", "क्या हुआ?".' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: विद्यार्थी को एक ही पाठ पर दो सेट दिखाओ — सेट A: 5 तथ्यात्मक प्रश्न; सेट B: 2 विश्लेषणात्मक + 1 मूल्यांकनात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
