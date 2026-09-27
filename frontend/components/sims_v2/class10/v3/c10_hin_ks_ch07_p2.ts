import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch07_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch07_p2',
    title: 'पाठ 7 · Part 2/3',
    subtitle: 'यह नोड केवल प्रतीक (prateek) और बिंब (bind) की पहचान, विश्लेषण और काव्यात्मक प्रभाव पर.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 7 · Part 2/3',
    chapters: ['c10_hin_ks_ch07'],
    nodeIds: ['c10_hin_ks_cbse_07_007', 'c10_hin_ks_cbse_07_008', 'c10_hin_ks_cbse_07_009', 'c10_hin_ks_cbse_07_010', 'c10_hin_ks_cbse_07_011', 'c10_hin_ks_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप अपने स्कूल के प्रांगण में सुबह की सैर कर रहे हैं और देखते हैं कि एक वृक्ष की जड़ें चट्टान को.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक वह वस्तु, चित्र या क्रिया है जो अपने प्रत्यक्ष अर्थ से परे किसी अमूर्त विचार, भावना या अवधारणा को दर्शाती है, जबकि बिंब वह विवरण है जो पाठक के मन में किसी इंद्रिय (दृष्टि, श्रवण, गंध आदि).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — साहित्यिक', 'पाठ 7 — मुख्य', 'पाठ 7 — गौण', 'पाठ 7 — पदावली', 'पाठ 7 — व्याकरण', 'पाठ 7 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 2/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों के चयन, क्रम, रूप (रूपांतर), संधि-समास.', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — बोध‑प्रश्न: वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर पाठ में सीधे उपलब्ध होता है और एक.', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_07_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_007', difficulty: 'standard',
          question: 'प्रतीक वह वस्तु, चित्र या क्रिया है जो अपने प्रत्यक्ष अर्थ से परे किसी अमूर्त.',
          hint: 'यदि फँसें तो अलंकार (विशेष रूप से उपमा और रूपक) की परिभाषा और उदाहरण दोबारा पढ़िए, फिर.',
          misconception: 'छात्र अक्सर प्रतीक और बिंब को समान मान लेते हैं और किसी भी चित्रात्मक विवरण को प्रतीक कह देते हैं, उदाहरण के लिए वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक वह वस्तु, चित्र या क्रिया है जो अपने प्रत्यक्ष अर्थ से परे किसी अमूर्त विचार,',
                  options: ['प्रतीक वह वस्तु, चित्र या क्रिया है जो अपने प्रत्यक्ष अर्थ से परे किसी अमूर्त विचार,', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि फँसें तो अलंकार (विशेष रूप से उपमा और रूपक) की परिभाषा और उदाहरण दोबारा पढ़िए, फिर ध्यान दीजिए.',
                  misconception: 'छात्र अक्सर प्रतीक और बिंब को समान मान लेते हैं और किसी भी चित्रात्मक विवरण को प्रतीक कह देते हैं, उदाहरण के लिए वे "नीला आकाश" को शांति का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही वस्तु दोनों कैसे हो सकती है: उदाहरण के लिए, "लाल गुलाब" एक बिंब है (दृष्टि और गंध से) लेकिन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_008', difficulty: 'standard',
          question: 'कविता का मुख्य भाव वह मूलभूत अनुभव या भावना है जो कवि व्यक्त करना चाहता है, और.',
          hint: 'यदि फंसे तो c10_hin_ks_cbse_07_002 की भावार्थ समीक्षा करें।',
          misconception: 'छात्र अक्सर मुख्य भाव को कविता का wydarや सारांश मान लेते हैं, अर्थात वे केवल घटनाओं को दोहराते हैं (जैसे "राजा जंगल गया.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कविता का मुख्य भाव वह मूलभूत अनुभव या भावना है जो कवि व्यक्त करना चाहता है, और संदेश वह',
                  options: ['कविता का मुख्य भाव वह मूलभूत अनुभव या भावना है जो कवि व्यक्त करना चाहता है, और संदेश वह', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि फंसे तो c10_hin_ks_cbse_07_002 की भावार्थ समीक्षा करें।',
                  misconception: 'छात्र अक्सर मुख्य भाव को कविता का wydarや सारांश मान लेते हैं, अर्थात वे केवल घटनाओं को दोहराते हैं (जैसे "राजा जंगल गया और वापस आया") जबकि.' }
          ],
            remediations: { 'wydar': { steps: ['छात्र से पूछें: "कविता पढ़कर आपको क्या чув हुआ?" और उस भावना को शब्दों में लिखने को कहें। 2.', 'फिर पूछें: "इस भावना के पीछे कौन सी बात या सीख हो सकती है?" ताकि संदेश सामने आए। 3.', 'अंत में छात्र को बताएं कि मुख्य भाव वह भावना है और संदेश वह विचार है जो उस भावना से निकलता है—इस प्रकार दोनों को अलग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_009', difficulty: 'standard',
          question: 'गौण भाव वह sekundary feeling है जो कविता के मुख्य भाव को समर्थन या विपरीत देता.',
          hint: 'यदि अटकें तो नोड c10_hin_ks_cbse_07_004 (केंद्रीय भाव और रस) की दोबारा समीक्षा करें.',
          misconception: 'छात्र अक्सर गौण भाव को कविता के किसी भी भाव या अनुभूति के रूप में ले लेते हैं, बिना यह देखे कि वह मुख्य भाव को कैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव वह sekundary feeling है जो कविता के मुख्य भाव को समर्थन या विपरीत देता है, जबकि',
                  options: ['गौण भाव वह sekundary feeling है जो कविता के मुख्य भाव को समर्थन या विपरीत देता है, जबकि', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि अटकें तो नोड c10_hin_ks_cbse_07_004 (केंद्रीय भाव और रस) की दोबारा समीक्षा करें, क्योंकि रस की.',
                  misconception: 'छात्र अक्सर गौण भाव को कविता के किसी भी भाव या अनुभूति के रूप में ले लेते हैं, बिना यह देखे कि वह मुख्य भाव को कैसे समर्थन या विपरीत दे रहा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो रंग के हाइलाइटर दें—एक मुख्य भाव के लिए, दूसरा गौण भाव के लिए। कविता की प्रत्येक पंक्ति पढ़ते समय मुख्य भाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_010', difficulty: 'standard',
          question: 'पदावली का वह भाग जिसमें कठिन शब्द (जिनका अर्थ सीधा शब्दकोश में नहीं मिलता) और.',
          hint: 'यदि कठिन शब्दों का अर्थ नहीं आ रहा है, तो c10_hin_ks_cbse_07_002 (स्टanza-wise भावार्थ).',
          misconception: 'छात्र अक्सर कठिन शब्दों के अर्थ को शब्दकोश के प्रथम अर्थ से बाँध लेते हैं और कविता के संदर्भ को अनदेखा कर देते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली का वह भाग जिसमें कठिन शब्द (जिनका अर्थ सीधा शब्दकोश में नहीं मिलता) और मुहावरे',
                  options: ['पदावली का वह भाग जिसमें कठिन शब्द (जिनका अर्थ सीधा शब्दकोश में नहीं मिलता) और मुहावरे', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि कठिन शब्दों का अर्थ नहीं आ रहा है, तो c10_hin_ks_cbse_07_002 (स्टanza-wise भावार्थ) की दोबारा.',
                  misconception: 'छात्र अक्सर कठिन शब्दों के अर्थ को शब्दकोश के प्रथम अर्थ से बाँध लेते हैं और कविता के संदर्भ को अनदेखा कर देते हैं। उदाहरण: पंक्ति "उसकी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि शब्द का अर्थ कैसे संदर्भ बदलता है: 1) शब्द "समा" को अलग-अलग वाक्यों में रखिए—"समा बंधा था" (समय).', 'नहीं, क्योंकि नज़र में समय बसता नहीं—इसलिए यहाँ समा का अर्थ बदल गया है।" फिर अभ्यास कराइए: छात्र को दो वाक्य दिए जाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों के चयन, क्रम, रूप (रूपांतर).',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 9 की \'हिन्दी व्याकरण\' पुस्तक के **संधि, समास, कारक.',
          misconception: '**विशिष्ट भ्रम:** छात्र पद्य में दिखने वाले **पुराने/तत्सम शब्द रूपों** (जैसे "कर" लिए "करता है", "होय" लिए "होता है".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों के चयन, क्रम, रूप (रूपांतर), संधि-समास,',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों के चयन, क्रम, रूप (रूपांतर), संधि-समास,', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 9 की \'हिन्दी व्याकरण\' पुस्तक के **संधि, समास, कारक, क्रिया** अध्याय.',
                  misconception: '**विशिष्ट भ्रम:** छात्र पद्य में दिखने वाले **पुराने/तत्सम शब्द रूपों** (जैसे "कर" लिए "करता है", "होय" लिए "होता है", "ते" लिए "तुम्हारे").' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को "होय/कर/ते" जैसे 5-6 रूप देकर पूछो: "ये किस बोली/काल के हैं?" — उसे **ब्रज/अवधी/आर्यिक** पहचानने तक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_012', difficulty: 'standard',
          question: 'बोध‑प्रश्न: वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर पाठ में सीधे उपलब्ध होता.',
          hint: 'यदि कठिनाई आए तो c10_hin_ks_cbse_07_002 (पद्यांश‑वार भावार्थ) और c10_hin_ks_cbse_07_006.',
          misconception: 'छात्र अक्सर मानते हैं कि वस्तुनिष्ठ प्रश्न का उत्तर हमेशा एक शब्द में देना होता है और आशय‑सूचक प्रश्न का उत्तर हमेशा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध‑प्रश्न: वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर पाठ में सीधे उपलब्ध होता है और एक',
                  options: ['बोध‑प्रश्न: वस्तुनिष्ठ प्रश्न वे होते हैं जिनका उत्तर पाठ में सीधे उपलब्ध होता है और एक', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, सामाजिक‑सांस्कृतिक वातावरण, शिक्षा,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का सरल भाषा में अर्थ', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि कठिनाई आए तो c10_hin_ks_cbse_07_002 (पद्यांश‑वार भावार्थ) और c10_hin_ks_cbse_07_006 (साहित्यिक.',
                  misconception: 'छात्र अक्सर मानते हैं कि वस्तुनिष्ठ प्रश्न का उत्तर हमेशा एक शब्द में देना होता है और आशय‑सूचक प्रश्न का उत्तर हमेशा पाठ की exact line.' }
          ],
            remediations: { 'exact-line': { steps: ['छात्र को बताइए कि हर प्रश्न में एक क्रिया शब्द होता है (क्या, कौन, क्यों, कैसे) जो उत्तर की दशा तय करता है। पहले वे इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
