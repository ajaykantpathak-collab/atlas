import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch02_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'इस नोड में हम पद्य व गद्य दोनों के आशय स्पष्टीकरण और विश्लेषण के अभ्यास पर ध्यान देंगे.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c10_hin_ks_ch02'],
    nodeIds: ['c10_hin_ks_cbse_02_013', 'c10_hin_ks_cbse_02_014', 'c10_hin_ks_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप स्कूल की नोटिस बोर्ड पर एक सूचना पढ़ रहे हैं जिसमें वार्षिकोत्सव की तैयारियों के बारे में.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय‑स्पष्टीकरण का अर्थ है किसी पद्य या गद्य अंश के भाव, संदेश, लेखक के इरादे और प्रयुक्त साहित्यिक युक्तियों को स्पष्ट शब्दों में समझाना, साथ में विश्लेषण करके यह बताना कि प्रत्येक तत्व उस अर्थ में.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — आशय-स्पष्टीकरण', 'पाठ 2 — परीक्षा-उत्तर', 'पाठ 2 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_02_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 3/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — आशय‑स्पष्टीकरण का अर्थ है किसी पद्य या गद्य अंश के भाव, संदेश, लेखक के इरादे और प्रयुक्त.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वाचन-पाठ कविता को शुद्ध उच्चारण, उचित विराम-चिह्नों, छंदानुसार लय-गति, प्रसंगानुकूल.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 2 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_013', difficulty: 'standard',
          question: 'आशय‑स्पष्टीकरण का अर्थ है किसी पद्य या गद्य अंश के भाव, संदेश, लेखक के इरादे और.',
          hint: 'यदि फँसें तो नोड c10_hin_ks_cbse_02_012 (बोध‑प्रश्न: वस्तुनिष्ठ और आशय‑सूचक) की आशय‑सूचक.',
          misconception: 'छात्र अक्सर आशय‑स्पष्टीकरण को केवल पंक्तियों का शब्द‑शब्द हिन्दी में अनुवाद या सारांश मान लेते हैं, जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय‑स्पष्टीकरण का अर्थ है किसी पद्य या गद्य अंश के भाव, संदेश, लेखक के इरादे और प्रयुक्त',
                  options: ['आशय‑स्पष्टीकरण का अर्थ है किसी पद्य या गद्य अंश के भाव, संदेश, लेखक के इरादे और प्रयुक्त', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'यदि फँसें तो नोड c10_hin_ks_cbse_02_012 (बोध‑प्रश्न: वस्तुनिष्ठ और आशय‑सूचक) की आशय‑सूचक प्रश्नों.',
                  misconception: 'छात्र अक्सर आशय‑स्पष्टीकरण को केवल पंक्तियों का शब्द‑शब्द हिन्दी में अनुवाद या सारांश मान लेते हैं, जबकि वास्तव में इसमें लेखक के भाव, टोन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले पंक्तियों को 声 से पढ़ने को कहें, फिर कठिन शब्दों को underline करें; उसके बाद पूछें: “इस पंक्ति से आपको.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है CBSE बोर्ड परीक्षा के मानकों के अनुरूप.',
          hint: 'यदि छात्र अटका हो तो c10_hin_ks_cbse_02_013 (आशय-स्पष्टीकरण और विश्लेषण अभ्यास) पर वापस.',
          misconception: 'छात्र मानते हैं कि \'उत्तर लिखना\' = \'ज्ञान उगलना\' है। वे पढ़ी हुई सारी जानकारी क्रमहीन लिख डालते हैं — न प्रश्न की मांग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है CBSE बोर्ड परीक्षा के मानकों के अनुरूप, निर्धारित शब्द',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है CBSE बोर्ड परीक्षा के मानकों के अनुरूप, निर्धारित शब्द', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'यदि छात्र अटका हो तो c10_hin_ks_cbse_02_013 (आशय-स्पष्टीकरण और विश्लेषण अभ्यास) पर वापस जाएं — वहां.',
                  misconception: 'छात्र मानते हैं कि \'उत्तर लिखना\' = \'ज्ञान उगलना\' है। वे पढ़ी हुई सारी जानकारी क्रमहीन लिख डालते हैं — न प्रश्न की मांग समझते, न शब्द सीमा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक 3-अंकीय प्रश्न दें और उसका उत्तर लिखने को कहें। 2.', 'साथ मिलकर उसके उत्तर में PEEL के चारों चरण चिह्नित करें (हाइलाइटर से: Point=पीला, Evidence=हरा, Explanation=नीला.', 'जहां रंग गायब हो, वहां मौखिक रूप से पूछें: "यहां तुम्हारा दावा क्या है?', 'यह केंद्रीय भाव से कैसे जुड़ता है?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_02_015', difficulty: 'standard',
          question: 'वाचन-पाठ कविता को शुद्ध उच्चारण, उचित विराम-चिह्नों, छंदानुसार लय-गति.',
          hint: 'यदि वाचन में लय टूटे → c10_hin_ks_cbse_02_003 (काव्य-संरचना) का छंद-गणन दोहराएं; यदि भाव.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **वाचन-पाठ = \'तेज और साफ बोलना\'** तथा **चर्चा-बिंदु = \'पाठ का सारांश पूछना\'**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ कविता को शुद्ध उच्चारण, उचित विराम-चिह्नों, छंदानुसार लय-गति, प्रसंगानुकूल',
                  options: ['वाचन-पाठ कविता को शुद्ध उच्चारण, उचित विराम-चिह्नों, छंदानुसार लय-गति, प्रसंगानुकूल', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) के शब्दों, बिंबों,', 'काव्य-संरचना (Poetic Structure) कविता के अवयवों'],
                  hint: 'यदि वाचन में लय टूटे → c10_hin_ks_cbse_02_003 (काव्य-संरचना) का छंद-गणन दोहराएं; यदि भाव न पकड़े →.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **वाचन-पाठ = \'तेज और साफ बोलना\'** तथा **चर्चा-बिंदु = \'पाठ का सारांश पूछना\'**। **वास्तविकता:** CBSE.' }
          ],
            remediations: { 'cbse-25': { steps: ['**चरणबद्ध उपचार (अगले 20 मिनट में करें):** 1.', '**मॉडलिंग (5 मिनट):** शिक्षक/अभिभावक पहले पद को **जानबूझकर दो बार** पढ़ें — पहली बार सपाट/तेज (छात्र की तरह), दूसरी बार.', '**चिह्नांकन अभ्यास (5 मिनट):** छात्र को पेंसिल से पूरी कविता में **(//) विराम, (↑) बलाघात, (😢/😤) भाव-चिह्न** लगाने को.', '**सस्वर पुनरावृत्ति (5 मिनट):** छात्र चिह्नों के अनुसार पढ़े। शिक्षक केवल "रुको — यहाँ बलाघात छूटा" या "यहाँ गति तेज हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
