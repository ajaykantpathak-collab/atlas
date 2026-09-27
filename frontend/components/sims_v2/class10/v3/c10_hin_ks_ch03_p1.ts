import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch03_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'इस नोड में कवि के जीवनीपरिचय, ऐतिहासिक एवं सामाजिक पृष्ठभूमि और उनका रचनात्मक प्रभाव.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c10_hin_ks_ch03'],
    nodeIds: ['c10_hin_ks_cbse_03_001', 'c10_hin_ks_cbse_03_002', 'c10_hin_ks_cbse_03_003', 'c10_hin_ks_cbse_03_004', 'c10_hin_ks_cbse_03_005', 'c10_hin_ks_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप कक्षा में एक नई कविता पढ़ रहे हैं और सोच रहे हैं कि इस कविता में इतनी गहरी भावना क्यों है?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक संदर्भ, शैक्षिक योग्यता और प्रमुख जीवन घटनाओं का संक्षिप्त विवरण, जो उसकी रचना को समझने में सहायक होता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — कवि', 'पाठ 3 — पद्यांश-वार', 'पाठ 3 — काव्य-संरचना', 'पाठ 3 — केंद्रीय', 'पाठ 3 — छंद', 'पाठ 3 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 1/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक पद्यांश.', answer: '3 -', options: ['3 -', '3 - -', '3 -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है: पदों/बंधों.', answer: '3 - -', options: ['3 - -', '3 -', '3 -'] },
            { id: 's3', label: '3 -', prompt: 'Which idea is this? — छंद किसी पद्य पंक्ति में अक्षरों की मात्रा (मात्रा) और लघु-गुरु पैटर्न का निश्चित नियम.', answer: '3 -', options: ['3 -', '3 -', '3 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक.',
          hint: 'यदि कवि के नाम या युग की पहचान में कठिनाई हो, तो कक्षा 9 के हिन्दी पाठ्यपुस्तक में दिए गए.',
          misconception: 'छात्र अक्सर सोचते हैं कि कवि की कोई विशिष्ट जीवन घटना (जैसे पिता की मृत्यु) कविता के प्रत्येक दुखद भाव का सीधा कारण है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक संदर्भ,',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक संदर्भ,', 'पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक पद्यांश', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है: पदों/बंधों', 'केंद्रीय भाव कविता का मुख्य भाव या संदेश होता है जिसे कवि अभिव्यक्त करना चाहता है'],
                  hint: 'यदि कवि के नाम या युग की पहचान में कठिनाई हो, तो कक्षा 9 के हिन्दी पाठ्यपुस्तक में दिए गए “कवि.',
                  misconception: 'छात्र अक्सर सोचते हैं कि कवि की कोई विशिष्ट जीवन घटना (जैसे पिता की मृत्यु) कविता के प्रत्येक दुखद भाव का सीधा कारण है और इसलिए वे हर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए दो अलग‑अलग कविताएँ जो एक ही घटना (जैसे बाढ़) पर आधारित हैं लेकिन एक में निराशा और दूसरे में आशा का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक.',
          hint: 'यदि अटके तो **नोड 001 के \'कवि का दर्शन\' खंड** को दोबारा पढ़ें — विशेषकर कवि के जीवन की.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'शब्दार्थ\' (word-meaning) को \'भावार्थ\' (sense/interpretation) समझ लेते हैं**। **ठोस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक पद्यांश',
                  options: ['पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक पद्यांश', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक संदर्भ,', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है: पदों/बंधों', 'केंद्रीय भाव कविता का मुख्य भाव या संदेश होता है जिसे कवि अभिव्यक्त करना चाहता है'],
                  hint: 'यदि अटके तो **नोड 001 के \'कवि का दर्शन\' खंड** को दोबारा पढ़ें — विशेषकर कवि के जीवन की 2-3 प्रमुख.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'शब्दार्थ\' (word-meaning) को \'भावार्थ\' (sense/interpretation) समझ लेते हैं**। **ठोस उदाहरण:** पाठ 3 के किसी.' }
          ],
            remediations: { 'word-meaning-sense-interpretation-3': { steps: ['**लक्षित उपचार (4 चरण):** 1.', '**पढ़ें-सुनें:** छात्र से कहें — "पद्यांश को **धीरे-धीरे दो बार ज़ोर से पढ़ो**, आँखें बंद करके **दृश्य (visualize)**.', '**शब्द→भाव तालिका:** एक शीट पर दो कॉलम बनवाएँ: **शब्द | शाब्दिक | भावगत** — हर कठिन शब्द के लिए भरवाएँ। 3.', '**\'क्यों?\' पूछें:** हर भावगत अर्थ के बाद पूछें — "कवि ने **यही शब्द क्यों चुना**?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है.',
          hint: 'यदि अटका हुआ महसूस हो तो: **कक्षा 9 की \'छंद परिचय\' इकाई (मात्रा, गण, यति.',
          misconception: '**विशिष्ट भ्रांति:** "छंद पहचानना = मात्रा गिनकर नाम बताना (दोहा, चौपाई, सवैया)।" **वास्तविकता:** बोर्ड परीक्षा में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है: पदों/बंधों',
                  options: ['काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है: पदों/बंधों', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक संदर्भ,', 'पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक पद्यांश', 'केंद्रीय भाव कविता का मुख्य भाव या संदेश होता है जिसे कवि अभिव्यक्त करना चाहता है'],
                  hint: 'यदि अटका हुआ महसूस हो तो: **कक्षा 9 की \'छंद परिचय\' इकाई (मात्रा, गण, यति, दोहा/चौपाई/सवैया के.',
                  misconception: '**विशिष्ट भ्रांति:** "छंद पहचानना = मात्रा गिनकर नाम बताना (दोहा, चौपाई, सवैया)।" **वास्तविकता:** बोर्ड परीक्षा में पूछा जाता है: **"इस छंद.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "एक दोहा और एक रोला जोर से पढ़ो — तुमको अपनी साँस/गति में क्या अंतर लगता है?" (दोहा में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_004', difficulty: 'standard',
          question: 'केंद्रीय भाव कविता का मुख्य भाव या संदेश होता है जिसे कवि अभिव्यक्त करना चाहता.',
          hint: 'यदि फंसें तो stanza‑wise भावार्थ (node 002) और काव्य‑संरचना (node 003) की समीक्षा करें।',
          misconception: 'छात्र अक्सर मानते हैं कि केंद्रीय भाव और रस एक ही thing हैं क्योंकि दोनों भावना से संबंधित होते हैं; वे उदाहरण के लिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव कविता का मुख्य भाव या संदेश होता है जिसे कवि अभिव्यक्त करना चाहता है',
                  options: ['केंद्रीय भाव कविता का मुख्य भाव या संदेश होता है जिसे कवि अभिव्यक्त करना चाहता है', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक संदर्भ,', 'पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक पद्यांश', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है: पदों/बंधों'],
                  hint: 'यदि फंसें तो stanza‑wise भावार्थ (node 002) और काव्य‑संरचना (node 003) की समीक्षा करें।',
                  misconception: 'छात्र अक्सर मानते हैं कि केंद्रीय भाव और रस एक ही thing हैं क्योंकि दोनों भावना से संबंधित होते हैं; वे उदाहरण के लिए कह देते हैं कि "कविता.' }
          ],
            remediations: { 'thing': { steps: ['छात्र को पहले कविता का वाक्य‑वाक्य अर्थ निकालने के लिए कहिए (स्टanza‑वार भावार्थ); फिर पूछिए "कवि यहाँ क्या बताना चाह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_005', difficulty: 'standard',
          question: 'छंद किसी पद्य पंक्ति में अक्षरों की मात्रा (मात्रा) और लघु-गुरु पैटर्न का.',
          hint: 'Work step by step.',
          misconception: 'छात्र अक्सर छंद और लय-विधान को एक ही概念 मानते हैं, और इस कारण वे किसी पद्यांश में मात्रा की गणना करके छंद पहचान लेते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद किसी पद्य पंक्ति में अक्षरों की मात्रा (मात्रा) और लघु-गुरु पैटर्न का निश्चित नियम',
                  options: ['छंद किसी पद्य पंक्ति में अक्षरों की मात्रा (मात्रा) और लघु-गुरु पैटर्न का निश्चित नियम', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक संदर्भ,', 'पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक पद्यांश', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है: पदों/बंधों'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र अक्सर छंद और लय-विधान को एक ही概念 मानते हैं, और इस कारण वे किसी पद्यांश में मात्रा की गणना करके छंद पहचान लेते हैं लेकिन लय-विधान के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस गलती को सुधारने के लिए: 1.', 'पहले छात्र को किसी पद्यांश में मात्रा की गणना करके छंद पहचानने का अभ्यास करवाएँ (जैसे दोहा की पंक्तियों में 13+11 matra.', 'फिर उसी पद्यांश को声に出して पढ़ने के लिए कहें और उन शब्दों पर ध्यान दें जहाँ उच्चारण में रुकावट (यति) या बल (जैसे अनुस्वार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_006', difficulty: 'standard',
          question: 'अलंकार शब्दों या अर्थों की विशेष योजना द्वारा काव्य में सौंदर्य.',
          hint: 'यदि अटके तो **\'पद्यांश-वार भावार्थ\' (c10_hin_ks_cbse_03_002)** और **\'केंद्रीय भाव और रस\'.',
          misconception: '**सबसे घातक भ्रम:** "अलंकार पहचानना = केवल नाम बताना (उपमा, रूपक, अनुप्रास)।" छात्र पंक्ति देखते ही \'उपमा है\' लिख देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार शब्दों या अर्थों की विशेष योजना द्वारा काव्य में सौंदर्य, प्रभावोत्पादकता और',
                  options: ['अलंकार शब्दों या अर्थों की विशेष योजना द्वारा काव्य में सौंदर्य, प्रभावोत्पादकता और', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, सामाजिक- सांस्कृतिक संदर्भ,', 'पद्यांश-वार भावार्थ (Stanza-wise Interpretation) का अर्थ है कविता के प्रत्येक पद्यांश', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के बाह्य और आंतरिक ढांचे से है: पदों/बंधों'],
                  hint: 'यदि अटके तो **\'पद्यांश-वार भावार्थ\' (c10_hin_ks_cbse_03_002)** और **\'केंद्रीय भाव और रस\'.',
                  misconception: '**सबसे घातक भ्रम:** "अलंकार पहचानना = केवल नाम बताना (उपमा, रूपक, अनुप्रास)।" छात्र पंक्ति देखते ही \'उपमा है\' लिख देते हैं, लेकिन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — सूचक शब्दों की सूची बनवाएं:** उपमा (सा, जैसा, समान, सा), रूपक (कोई सूचक नहीं, सीधा आरोप), उत्प्रेक्षा (मानो.', '**चरण 2 — उपमेय/उपमान/साधारण/विशेषण पहचान का अभ्यास:** "कमल सा मुख" → उपमेय: मुख, उपमान: कमल, साधारण धर्म: सुंदरता.', '**चरण 3 — प्रभाव-लेखन फ्रेम दें:** "यह अलंकार ______ भाव को ______ करके ______ करता है।" — रिक्त स्थान भरने का अभ्यास.', '**चरण 4 — बोर्ड नमूना उत्तर दिखाएं:** टॉपर की उत्तर पुस्तिका से 3 अंक वाले अलंकार प्रश्न का उत्तर दिखाएं — संरचना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
