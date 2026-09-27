import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch11_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch11_p2',
    title: 'पाठ 11 · Part 2/3',
    subtitle: 'इस नोड में प्रतीक (जैसे राष्ट्रीय ध्वज = स्वतंत्रता) और बिंब (जैसे "लाल गुलाब" = प्रेम की.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 11 · Part 2/3',
    chapters: ['c10_hin_ks_ch11'],
    nodeIds: ['c10_hin_ks_cbse_11_007', 'c10_hin_ks_cbse_11_008', 'c10_hin_ks_cbse_11_009', 'c10_hin_ks_cbse_11_010', 'c10_hin_ks_cbse_11_011', 'c10_hin_ks_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप किसी त्योहार की तस्वीर देख रहे हैं—आप पहले रंग, रोशनी और smiling चेहरों को देखते हैं, फिर.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक वह वस्तु, 人物 या घटना है जो अपने bezpośredिक अर्थ के अलावा कोई गहरा अमूर्त विचार या भाव व्यक्त करती है; बिंब वह संवेदनात्मक विवरण है जो पाठक के मन में स्पष्ट चित्र बनाता है और प्रतीक के माध्यम.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — साहित्यिक', 'पाठ 11 — मुख्य', 'पाठ 11 — गौण', 'पाठ 11 — पदावली', 'पाठ 11 — व्याकरण', 'पाठ 11 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 2/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — पद्य में भाषा-प्रयोग का तात्पर्य कवि द्वारा शब्दों, वाक्य रचना, ध्वनि और अर्थ के चयनात्मक.', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे दिए गए तथ्यों पर आधारित होते हैं.', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 11 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_007', difficulty: 'standard',
          question: 'प्रतीक वह वस्तु, 人物 या घटना है जो अपने bezpośredिक अर्थ के अलावा कोई गहरा.',
          hint: 'अगर stuck हों तो अलंकार vs प्रतीक-भेद की समीक्षा करें—उदाहरण के लिए, "जैसे चाँद" (उपमा.',
          misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही चीज़ मान लेते हैं और किसी भी चित्रात्मक विवरण को "प्रतीक" कह देते हैं—जैसे "लाल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक वह वस्तु, 人物 या घटना है जो अपने bezpośredिक अर्थ के अलावा कोई गहरा अमूर्त विचार या',
                  options: ['प्रतीक वह वस्तु, 人物 या घटना है जो अपने bezpośredिक अर्थ के अलावा कोई गहरा अमूर्त विचार या', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि'],
                  hint: 'अगर stuck हों तो अलंकार vs प्रतीक-भेद की समीक्षा करें—उदाहरण के लिए, "जैसे चाँद" (उपमा, सिर्फ.',
                  misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही चीज़ मान लेते हैं और किसी भी चित्रात्मक विवरण को "प्रतीक" कह देते हैं—जैसे "लाल गुलाब देखिए, यह प्रेम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो कॉलम वाली तालिका बनवाइए: बाएँ कॉलम में कविता की पंक्ति (जैसे "उसके Augen में आँसू थे") और दाएँ कॉलम में दो.', '(शाब्दिक बिंब) (2) इससे क्या इशारा हो रहा है?', '(प्रतीकात्मक अर्थ)। यदि दूसरा उत्तर अमूर्त नहीं है (जैसे "वह दुखी है" के बजाय "उसकी आंतरिक शांति का उजड़ना"), तो समझाइए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_008', difficulty: 'standard',
          question: 'मुख्य भाव वह मूल मनोस्थिति या अनुभूति है जो कविता के पूरे पाठ में दोहराई जाती.',
          hint: 'यदि फंसे हों तो c10_hin_ks_cbse_11_002 (पद्यांश-वार भावार्थ) की अवधारणा दोहराएँ।',
          misconception: 'छात्र अक्सर मुख्य भाव को कविता के अंतिम stanza में आए स्पष्ट निष्कर्ष या道德 शिक्षा मान लेते हैं, जबकि मुख्य भाव निरंतर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव वह मूल मनोस्थिति या अनुभूति है जो कविता के पूरे पाठ में दोहराई जाती है और कविता',
                  options: ['मुख्य भाव वह मूल मनोस्थिति या अनुभूति है जो कविता के पूरे पाठ में दोहराई जाती है और कविता', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि'],
                  hint: 'यदि फंसे हों तो c10_hin_ks_cbse_11_002 (पद्यांश-वार भावार्थ) की अवधारणा दोहराएँ।',
                  misconception: 'छात्र अक्सर मुख्य भाव को कविता के अंतिम stanza में आए स्पष्ट निष्कर्ष या道德 शिक्षा मान लेते हैं, जबकि मुख्य भाव निरंतर अनुभूति होती है जो.' }
          ],
            remediations: { 'stanza': { steps: ['पहले छात्र से कविता के प्रत्येक stanza को पढ़ने और एक भाव-वाचक शब्द (जैसे दुःख, खुशी, डर) लिखने के लिए कहें। फिर उन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_009', difficulty: 'standard',
          question: 'गौण भाव कविता या गद्य के मुख्य भाव का समर्थन करने वाले छोटे, सहायक भाव होते.',
          hint: 'यदि फंसे हुए महसूस हो तो मुख्य भाव और रस (c10_hin_ks_cbse_11_004) नोड की पुनरावृत्ति.',
          misconception: 'छात्र अक्सर गौण भाव और विषयांतर को मुख्य भाव के समानांतर स्वतंत्र भाव मानते हैं, जैसे कि वे कविता में तीन अलग-अलग विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव कविता या गद्य के मुख्य भाव का समर्थन करने वाले छोटे, सहायक भाव होते हैं, जो मुख्य',
                  options: ['गौण भाव कविता या गद्य के मुख्य भाव का समर्थन करने वाले छोटे, सहायक भाव होते हैं, जो मुख्य', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि'],
                  hint: 'यदि फंसे हुए महसूस हो तो मुख्य भाव और रस (c10_hin_ks_cbse_11_004) नोड की पुनरावृत्ति कीजिए — मुख्य.',
                  misconception: 'छात्र अक्सर गौण भाव और विषयांतर को मुख्य भाव के समानांतर स्वतंत्र भाव मानते हैं, जैसे कि वे कविता में तीन अलग-अलग विषय चल रहे हों — उदाहरण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कोई भी पंक्ति मुख्य भाव के बिना गौण भाव या विषयांतर नहीं हो सकती — जैसे "रात में पढ़ता रहा" केवल तभी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_010', difficulty: 'standard',
          question: 'कठिन शब्द वे शब्द हैं जिनका शाब्दिक अर्थ पाठ के संदर्भ में नहीं फिट बैठता और.',
          hint: 'शब्दकोश के अर्थ और वाक्य रचना की समीक्षा करें — विशेषकर नाम, क्रिया और विशेषण के उपयोग।',
          misconception: 'छात्र अक्सर कठिन शब्द और मुहावरे के अर्थ को शब्दकोश के पहले अर्थ से जोड़कर लगाते हैं, बिना पाठ के संदर्भ को देखे — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कठिन शब्द वे शब्द हैं जिनका शाब्दिक अर्थ पाठ के संदर्भ में नहीं फिट बैठता और deren',
                  options: ['कठिन शब्द वे शब्द हैं जिनका शाब्दिक अर्थ पाठ के संदर्भ में नहीं फिट बैठता और deren', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि'],
                  hint: 'शब्दकोश के अर्थ और वाक्य रचना की समीक्षा करें — विशेषकर नाम, क्रिया और विशेषण के उपयोग।',
                  misconception: 'छात्र अक्सर कठिन शब्द और मुहावरे के अर्थ को शब्दकोश के पहले अर्थ से जोड़कर लगाते हैं, बिना पाठ के संदर्भ को देखे — जैसे \'विरह\' को केवल \'दूर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि शब्द का अर्थ कैसे बदलता है: पहले शब्दकोश अर्थ लिखिए (जैसे \'विरह = अलग होना\'), फिर कविता की पंक्ति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का तात्पर्य कवि द्वारा शब्दों, वाक्य रचना, ध्वनि और अर्थ.',
          hint: 'यदि फंसें तो c10_hin_ks_cbse_11_004 (केंद्रीय भाव और रस) की अवधारणा की समीक्षा करें।',
          misconception: 'छात्र अक्सर सोचते हैं कि पद्य में भाषा-प्रयोग का अर्थ केवल अलंकार (उपमा, रूपक आदि) की पहचान करना है, और वे वाक्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का तात्पर्य कवि द्वारा शब्दों, वाक्य रचना, ध्वनि और अर्थ के चयनात्मक',
                  options: ['पद्य में भाषा-प्रयोग का तात्पर्य कवि द्वारा शब्दों, वाक्य रचना, ध्वनि और अर्थ के चयनात्मक', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि'],
                  hint: 'यदि फंसें तो c10_hin_ks_cbse_11_004 (केंद्रीय भाव और रस) की अवधारणा की समीक्षा करें।',
                  misconception: 'छात्र अक्सर सोचते हैं कि पद्य में भाषा-प्रयोग का अर्थ केवल अलंकार (उपमा, रूपक आदि) की पहचान करना है, और वे वाक्य विन्यास, ध्वनि प्रभाव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस भ्रम को दूर करने के लिए, छात्र को दिए गए पद्यांश में प्रत्येक पंक्ति के लिए तीन स्तरों पर प्रश्न पूछने की आदत डालनी.', '**शब्द स्तर**: प्रत्येक शब्द का अर्थ और भावात्मक भार क्या है?', '**ध्वनि स्तर**: क्या कोई दोहराव, राइम या असोनेंस है जो भाव को प्रभावित करता है?', '**वाक्य स्तर**: वाक्य की संरचना क्या है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_11_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे दिए गए तथ्यों पर आधारित.',
          hint: 'यदि फंसें तो c10_hin_ks_cbse_11_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_11_008.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि प्रश्न का उत्तर पाठ में लिखा हुआ है तो वह वस्तुनिष्ठ है, और यदि उत्तर सोचना पड़े तो वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे दिए गए तथ्यों पर आधारित होते हैं',
                  options: ['वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे दिए गए तथ्यों पर आधारित होते हैं', 'कवि परिचय और पृष्ठभूमि का अर्थ उस कवि के जीवन, उसके समय के सामाजिक-राजनीतिक परिदृश्य,', 'पद्यांश-वार भावार्थ कविता के प्रत्येक stanza (पद्यांश) के शब्दों, चित्रों और भावों का', 'काव्य-संरचना कविता के शब्दों, पंक्तियों और stanza के व्यवस्थित क्रम को कहते हैं, जबकि'],
                  hint: 'यदि फंसें तो c10_hin_ks_cbse_11_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_11_008 (केंद्रीय भाव.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि प्रश्न का उत्तर पाठ में लिखा हुआ है तो वह वस्तुनिष्ठ है, और यदि उत्तर सोचना पड़े तो वह आशय-सूचक है—यह गलत है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को स्पष्ट करें कि वस्तुनिष्ठ और आशय-सूचक का अंतर उत्तर के स्रोत में नहीं, बल्कि उत्तर की प्रकृति में है: 1.', 'कोई भी प्रश्न लें और पूछें—"क्या इस प्रश्न का केवल एक सही, तथ्यात्मक उत्तर हो सकता है?" यदि हाँ → वस्तुनिष्ठ (जैसे.', 'यदि उत्तर में तर्क, भाव या लेखक के अभिप्राय की व्याख्या चाहिए और एक से अधिक तर्कसंगत उत्तर संभव हों → आशय-सूचक (जैसे.', 'अभ्यास के लिए दो प्रश्न दीजिए—एक स्पष्ट तथ्य पर आधारित (वस्तुनिष्ठ), एक ही वाक्य से भाव पूछने वाला (आशय-सूचक)—और छात्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
