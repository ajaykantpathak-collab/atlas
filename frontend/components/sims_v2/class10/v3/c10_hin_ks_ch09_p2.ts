import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch09_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch09_p2',
    title: 'पाठ 9 · Part 2/3',
    subtitle: 'इस नोड में प्रतीक (symbol) और बिंब (image) की अवधारणा, उनके अंतर, कविता में उनके कार्य और.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 9 · Part 2/3',
    chapters: ['c10_hin_ks_ch09'],
    nodeIds: ['c10_hin_ks_cbse_09_007', 'c10_hin_ks_cbse_09_008', 'c10_hin_ks_cbse_09_009', 'c10_hin_ks_cbse_09_010', 'c10_hin_ks_cbse_09_011', 'c10_hin_ks_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप अपनी कक्षा में बैठे हैं और शिक्षक कहता है — "आज हम देखेंगे कि कवि अपने शब्दों में छुपे अर्थ.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक वह वस्तु, व्यक्ति या घटना है जो अपने शाब्दिक अर्थ के अलावा कोई गहरा अमूर्त भाव या विचार दर्शाती है; बिंब वह विवरण है जो पाँच इन्द्रियों के माध्यम से पाठक के मन में एक स्पष्ट संवेदी चित्र.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — साहित्यिक', 'पाठ 9 — मुख्य', 'पाठ 9 — गौण', 'पाठ 9 — पदावली', 'पाठ 9 — व्याकरण', 'पाठ 9 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 2/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — पद्य में भाषा-प्रयोग वह तकनीक है जिसमें कवि सामान्य व्याकरणिक नियमों, शब्द क्रम या ध्वनि.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे लिखे गए तथ्यों या जानकारी पर.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_007', difficulty: 'standard',
          question: 'प्रतीक वह वस्तु, व्यक्ति या घटना है जो अपने शाब्दिक अर्थ के अलावा कोई गहरा.',
          hint: 'अगर फँसें तो अलंकार (विशेष रूप से रूपक) की पिछली नोड c10_hin_ks_cbse_09_006 की सामग्री.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि किसी वस्तु का स्पष्ट विवरण दिया गया है (जैसे — "नीला आसमान", "गरम चाय का कप") तो वह अपने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक वह वस्तु, व्यक्ति या घटना है जो अपने शाब्दिक अर्थ के अलावा कोई गहरा अमूर्त भाव या',
                  options: ['प्रतीक वह वस्तु, व्यक्ति या घटना है जो अपने शाब्दिक अर्थ के अलावा कोई गहरा अमूर्त भाव या', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'अगर फँसें तो अलंकार (विशेष रूप से रूपक) की पिछली नोड c10_hin_ks_cbse_09_006 की सामग्री दोहराएँ.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि किसी वस्तु का स्पष्ट विवरण दिया गया है (जैसे — "नीला आसमान", "गरम चाय का कप") तो वह अपने आप प्रतीक भी बन जाती.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही चित्र दो तरह से काम कर सकता है — चरण 1: एक सरल बिंब दीजिए — "पीला सूरज सिर पर चढ़ रहा था".', 'चरण 3: संदर्भ जोड़िए — यदि कविता एक विद्यार्थी के परीक्षा के दिन की है, तो क्या यह सूरज घबराहट या नए दिन की आशा दर्शा.', 'चरण 4: निर्णय लीजिए — यदि कोई स्थिर अर्थ जुड़ता है (जैसे — सूरज = नई शुरुआत), तो यह प्रतीक भी बन जाता है; नहीं, तो केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_008', difficulty: 'standard',
          question: 'मुख्य भाव: कविता में छिपा हुआ प्रमुख मनोदशा या भावना जो कविता के शब्दों.',
          hint: 'यदि कविता के stanza-wise अर्थ समझने में कठिनाई हो, तो c10_hin_ks_cbse_09_002 (पद्यांश-वार.',
          misconception: 'छात्र अक्सर मुख्य भाव को कविता के विषय से भ्रमित कर देते हैं, जैसे वे कहते हैं "मुख्य भाव किसानी है" जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव: कविता में छिपा हुआ प्रमुख मनोदशा या भावना जो कविता के शब्दों, चित्रों और ध्वनि',
                  options: ['मुख्य भाव: कविता में छिपा हुआ प्रमुख मनोदशा या भावना जो कविता के शब्दों, चित्रों और ध्वनि', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'यदि कविता के stanza-wise अर्थ समझने में कठिनाई हो, तो c10_hin_ks_cbse_09_002 (पद्यांश-वार भावार्थ).',
                  misconception: 'छात्र अक्सर मुख्य भाव को कविता के विषय से भ्रमित कर देते हैं, जैसे वे कहते हैं "मुख्य भाव किसानी है" जबकि वास्तव में किसानी विषय (subject).' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र मुख्य भाव को विषय से भ्रमित कर रहा है, तो उसे निम्नलिखित चरण-दर-चरण अभ्यास करवाइए: 1.', 'कविता की एक पंक्ति दीजिए (जैसे "सूरज उगता है, किसान हल ले जाता है") और पूछिए: "इस पंक्ति का विषय क्या है?" (उत्तर.', 'फिर पूछिए: "इस पंक्ति को पढ़कर आपका मन कैसा महसूस करता है?', 'किस शब्द से आपको यह Gefühl आता है?" (उत्तर: मेहनत, उद्देश्यपूर्ण; शब्द: "उगता है", "ले जाता है" संकेत देते हैं कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_009', difficulty: 'standard',
          question: 'गौण भाव वे छोटे-छोटे भाव होते हैं जो मुख्य भाव को सपोर्ट करते हैं लेकिन.',
          hint: 'यदि गौण भाव की पहचान में कठिनाई हो तो केंद्रीय भाव और रस (c10_hin_ks_cbse_09_004) की.',
          misconception: 'छात्र अक्सर मानते हैं कि गौण भाव वे भाव होते हैं जो कविता में कम बार आते हैं, जबकि वास्तव में गौण भाव की परिभाषा उसकी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव वे छोटे-छोटे भाव होते हैं जो मुख्य भाव को सपोर्ट करते हैं लेकिन केंद्रीय नहीं होते',
                  options: ['गौण भाव वे छोटे-छोटे भाव होते हैं जो मुख्य भाव को सपोर्ट करते हैं लेकिन केंद्रीय नहीं होते', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'यदि गौण भाव की पहचान में कठिनाई हो तो केंद्रीय भाव और रस (c10_hin_ks_cbse_09_004) की अवधारणा को.',
                  misconception: 'छात्र अक्सर मानते हैं कि गौण भाव वे भाव होते हैं जो कविता में कम बार आते हैं, जबकि वास्तव में गौण भाव की परिभाषा उसकी आवृत्ति पर नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को स्पष्ट कीजिए कि "गौण" का अर्थ यहाँ "कम महत्वपूर्ण" नहीं, बल्कि "सहायक" है - जैसे टीम में मुख्य खिलाड़ी के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_010', difficulty: 'standard',
          question: 'पदावली का अर्थ है शब्दों का भंडार, जहाँ कठिन शब्दों के सटीक अर्थ और मुहावरों के.',
          hint: 'यदि कठिन शब्दों के अर्थ में confusion हो, तो c10_hin_ks_cbse_09_008 (केंद्रीय भाव और रस).',
          misconception: 'छात्र अक्सर मुहावरे के शब्दों को अलग-अलग लेकर उनका शाब्दिक अर्थ जोड़ते हैं, जैसे "हाथ धोना" को हाथ + धोना = हाथ धोना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली का अर्थ है शब्दों का भंडार, जहाँ कठिन शब्दों के सटीक अर्थ और मुहावरों के przeno',
                  options: ['पदावली का अर्थ है शब्दों का भंडार, जहाँ कठिन शब्दों के सटीक अर्थ और मुहावरों के przeno', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'यदि कठिन शब्दों के अर्थ में confusion हो, तो c10_hin_ks_cbse_09_008 (केंद्रीय भाव और रस) की समीक्षा.',
                  misconception: 'छात्र अक्सर मुहावरे के शब्दों को अलग-अलग लेकर उनका शाब्दिक अर्थ जोड़ते हैं, जैसे "हाथ धोना" को हाथ + धोना = हाथ धोना मानते हैं, जबकि इसका.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि "हाथ धोना" वाक्य में किस क्रिया को दर्शाता है — क्या कोई वास्तव में हाथ धो रहा है या कोई काम छोड़.', 'फिर तीन वाक्य दीजिए जहाँ इस मुहावरे का सही प्रयोग हो (जैसे "असाइनमेंट मुश्किल देखकर उसने हाथ धो लिया") और छात्र से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग वह तकनीक है जिसमें कवि सामान्य व्याकरणिक नियमों, शब्द क्रम.',
          hint: 'यदि फंसे हुए महसूस हो तो c10_hin_ks_cbse_09_005 (छंद और लय-विधान) की अवधारणा पर वापस जाएँ.',
          misconception: 'छात्र अक्सर भाषा-प्रयोग को केवल उन शब्दों के उपयोग से जोड़ लेते हैं जो मानक शब्दकोश में नहीं मिलते या जो पुराने या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग वह तकनीक है जिसमें कवि सामान्य व्याकरणिक नियमों, शब्द क्रम या ध्वनि',
                  options: ['पद्य में भाषा-प्रयोग वह तकनीक है जिसमें कवि सामान्य व्याकरणिक नियमों, शब्द क्रम या ध्वनि', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'यदि फंसे हुए महसूस हो तो c10_hin_ks_cbse_09_005 (छंद और लय-विधान) की अवधारणा पर वापस जाएँ — विशेष.',
                  misconception: 'छात्र अक्सर भाषा-प्रयोग को केवल उन शब्दों के उपयोग से जोड़ लेते हैं जो मानक शब्दकोश में नहीं मिलते या जो पुराने या तत्सम रूप हैं (जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए कि वह दिए गए पद्यांश को धीरे-धीरे आवाज में पढ़े और प्रत्येक विराम के बाद रुककर महसूस करे कि क्या उसकी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे लिखे गए तथ्यों या.',
          hint: 'यदि भाव पहचानने में कठिनाई हो तो c10_hin_ks_cbse_09_002 (स्टanza‑war भावार्थ) की दोबारा.',
          misconception: 'छात्र अक्सर आशय‑सूचक प्रश्न का उत्तर सीधे पाठ से ले आने की कोशिश करते हैं, जैसे कि प्रश्न “कवि ने क्यों उदासी का चित्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे लिखे गए तथ्यों या जानकारी पर',
                  options: ['वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे लिखे गए तथ्यों या जानकारी पर', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'यदि भाव पहचानने में कठिनाई हो तो c10_hin_ks_cbse_09_002 (स्टanza‑war भावार्थ) की दोबारा समीक्षा.',
                  misconception: 'छात्र अक्सर आशय‑सूचक प्रश्न का उत्तर सीधे पाठ से ले आने की कोशिश करते हैं, जैसे कि प्रश्न “कवि ने क्यों उदासी का चित्र बनाया?” के उत्तर में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को निम्नलिखित चरण‑दर‑चरण अभ्यास करवाइए: 1.', 'प्रश्न पढ़कर पहचानें कि इसमें “क्यों”, “कैसे”, “क्या प्रभाव” जैसे शब्द हैं; यदि हाँ, तो यह आशय‑सूचक है। 2.', 'पाठ में संबंधित वाक्य खोजें जो भाव या चित्र दर्शाता है। 3.', 'वह वाक्य पढ़ें और अपने शब्दों में लिखें कि वह क्या दिखा रहा है (उदा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
