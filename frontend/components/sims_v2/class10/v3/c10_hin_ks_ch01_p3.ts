import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch01_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch01_p3',
    title: 'पाठ 1 · Part 3/3',
    subtitle: 'यह नोड केवल पाठ 1 की कविता के पद्यांशों पर आशय-स्पष्टीकरण और विश्लेषण लिखने का अभ्यास.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 1 · Part 3/3',
    chapters: ['c10_hin_ks_ch01'],
    nodeIds: ['c10_hin_ks_cbse_01_013', 'c10_hin_ks_cbse_01_014', 'c10_hin_ks_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'जब आप किसी पुराने दोस्त का इमोशनल वॉइस नोट सुनते हैं, तो आप केवल शब्द नहीं सुनते — आप उनके पीछे का दर्द.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण और विश्लेषण अभ्यास कविता के किसी पद्यांश का शाब्दिक अर्थ, भावार्थ, प्रसंग, अलंकार/बिंब/प्रतीक की पहचान, और केंद्रीय भाव से संबंध स्थापित करते हुए संरचित व्याख्या लिखने की कौशल है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — आशय-स्पष्टीकरण', 'पाठ 1 — परीक्षा-उत्तर', 'पाठ 1 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_01_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 3/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — आशय-स्पष्टीकरण और विश्लेषण अभ्यास कविता के किसी पद्यांश का शाब्दिक अर्थ, भावार्थ, प्रसंग.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — वाचन-पाठ वह प्रक्रिया है जिसमें छात्र कविता या गद्यांश को聲調, विराम और उचित जोर के साथ.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 1 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण और विश्लेषण अभ्यास कविता के किसी पद्यांश का शाब्दिक अर्थ.',
          hint: 'यदि फंसे: c10_hin_ks_cbse_01_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_01_006 (अलंकार).',
          misconception: 'छात्र समझते हैं कि **आशय-स्पष्टीकरण = भावार्थ लिखना** (सिर्फ सरल भाषा में अनुवाद)। वे प्रसंग (कविता में पद्यांश कहाँ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण और विश्लेषण अभ्यास कविता के किसी पद्यांश का शाब्दिक अर्थ, भावार्थ, प्रसंग,',
                  options: ['आशय-स्पष्टीकरण और विश्लेषण अभ्यास कविता के किसी पद्यांश का शाब्दिक अर्थ, भावार्थ, प्रसंग,', 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का'],
                  hint: 'यदि फंसे: c10_hin_ks_cbse_01_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_01_006 (अलंकार) दोबारा.',
                  misconception: 'छात्र समझते हैं कि **आशय-स्पष्टीकरण = भावार्थ लिखना** (सिर्फ सरल भाषा में अनुवाद)। वे प्रसंग (कविता में पद्यांश कहाँ आता है, उससे पहले/बाद.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "एक पद्यांश लो, उसके **चार कॉलम** बनाओ: प्रसंग | शाब्दिक अर्थ | भावार्थ+युक्तियाँ | केंद्रीय भाव से.', 'पहले दो कॉलम मौखिक रूप से भरवाएं, फिर तीसरे में **कम से कम एक अलंकार/बिंब/प्रतीक का नाम + उसका प्रभाव** लिखवाएं। 3.', 'चौथे कॉलम में पूछें: "यह पद्यांश कविता के मुख्य संदेश (जैसे \'भगवद्भक्ति ही परम शांति देती है\') को कैसे आगे बढ़ाता है?".', 'अंत में चारों कॉलम जोड़कर 60-80 शब्दों का पैराग्राफ बनवाएं और बोर्ड मार्किंग स्कीम (प्रसंग 1, अर्थ 1, युक्ति+प्रभाव 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है CBSE बोर्ड परीक्षा के मानकों के अनुसार.',
          hint: 'यदि फँसें तो c10_hin_ks_cbse_01_013 (आशय-स्पष्टीकरण अभ्यास) दोहराएँ — वहाँ व्याख्या कौशल.',
          misconception: 'छात्र मानते हैं कि "अधिक शब्द = अधिक अंक" और इसलिए 5-अंक के प्रश्न में 200 शब्द लिख डालते हैं बिना संरचना के। वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है CBSE बोर्ड परीक्षा के मानकों के अनुसार संरचित,',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है CBSE बोर्ड परीक्षा के मानकों के अनुसार संरचित,', 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का'],
                  hint: 'यदि फँसें तो c10_hin_ks_cbse_01_013 (आशय-स्पष्टीकरण अभ्यास) दोहराएँ — वहाँ व्याख्या कौशल का आधारभूत.',
                  misconception: 'छात्र मानते हैं कि "अधिक शब्द = अधिक अंक" और इसलिए 5-अंक के प्रश्न में 200 शब्द लिख डालते हैं बिना संरचना के। वास्तव में CBSE अंकन योजना.' }
          ],
            remediations: { '5-200-cbse': { steps: ['चरण 1: छात्र से एक कमजोर उत्तर लिखवाएँ और फिर उसे PEEL चरणों में विभाजित करने को कहें। चरण 2: प्रत्येक चरण के लिए रंगीन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_015', difficulty: 'standard',
          question: 'वाचन-पाठ वह प्रक्रिया है जिसमें छात्र कविता या गद्यांश को聲調, विराम और उचित जोर.',
          hint: 'यदि छात्र Voix‑आधारित अर्थ‑निर्माण में कठिनाई महसूस कर रहा है, तो उसे.',
          misconception: 'छात्र अक्सर सोचते हैं कि वाचन‑पाठ का अर्थ केवल शब्द‑शब्द सही उच्चारण करना है, और इसलिए वे कविता की लय, विराम और Voix की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ वह प्रक्रिया है जिसमें छात्र कविता या गद्यांश को聲調, विराम और उचित जोर के साथ',
                  options: ['वाचन-पाठ वह प्रक्रिया है जिसमें छात्र कविता या गद्यांश को聲調, विराम और उचित जोर के साथ', 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का'],
                  hint: 'यदि छात्र Voix‑आधारित अर्थ‑निर्माण में कठिनाई महसूस कर रहा है, तो उसे c10_hin_ks_cbse_01_005 (छंद.',
                  misconception: 'छात्र अक्सर सोचते हैं कि वाचन‑पाठ का अर्थ केवल शब्द‑शब्द सही उच्चारण करना है, और इसलिए वे कविता की लय, विराम और Voix की बदलाव को नजरअंदाज.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र वाचन में केवल उच्चारण पर ध्यान दे रहा है, तो उसे कविता की दो पंक्तियाँ उसी स्वर में और फिर Voix में परिवर्तन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
