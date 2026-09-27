import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch17_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch17_p2: SimDef = {
    id: 'v3_c12_hin_a_ch17_p2',
    title: 'कुटज · Part 2/3',
    subtitle: 'The courtyard is its mornings — not its name',
    classLevel: 12, subject: 'hin_a', topic: 'कुटज · Part 2/3',
    chapters: ['c12_hin_a_ch17'],
    nodeIds: ['c12_hin_a_cbse_17_007', 'c12_hin_a_cbse_17_008', 'c12_hin_a_cbse_17_009', 'c12_hin_a_cbse_17_010', 'c12_hin_a_cbse_17_011', 'c12_hin_a_cbse_17_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Philosophical-essay reader', intro: 'A scholar who ran All India Radio asks whether a word should come from the dictionary or from the courtyard where life happens.', goal: 'Read Aangan through naam-versus-svaroop — social labels against lived essence, tyag as uncelebrated art.' },
    discovery: {
        question: 'An Aadhaar number opens every door — subsidies, banks, travel — yet it isn\'t you. A 1950s essayist said this exact thing about \'naam\' and \'svaroop.\' What\'s the split?',
        options: ['Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth', 'Aadhaar is fake identity', 'Names are always wrong', 'Svaroop means appearance'],
        answer: 'Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth',
        hook: 'Mishra insists on \'aangan\' over the Sanskritised \'angana\' — the lived word carries cow-dung smell and children\'s play; the formal word is sterile. And tyag is redefined: not self-denial or heroic martyrdom but daily, uncelebrated duty — a mother\'s life as art.',
    },
    teaching: [
        { title: 'कुटज — गौण विषय', text: 'गौण विषय (Sub-theme) वे सहायक विषय हैं जो कृति के मुख्य विषय को विस्तार देते हैं, उसे पुष्ट करते हैं, या उसके विभिन्न पहलुओं को उजागर करते हैं; ये कथा/पाठ में समानांतर चलते हुए मुख्य संदेश को गहराई.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_17_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand in a courtyard at dawn: watch the space reveal itself as process, not object; weigh name against essence; and test whether sacrifice is suffering or transcendence.',
        labels: ['कुटज — गौण विषय', 'कुटज — साहित्यिक युक्तियाँ', 'कुटज — पदावली: मुख्य', 'कुटज — व्याकरण: पाठ', 'कुटज — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a housing-for-all poster contest, a teammate\'s entry shows a glossy apartment block with the line \'shelter = square feet.\' You recall the essay that starts on a mud-walled village lane and ends in a Sanskrit verse on what makes a dwelling a home.',
            decisions: [{ prompt: 'How would the essay \'कुटिर\' reframe the poster?', options: [
                { text: 'Shift the claim from floor area to shelter-as-value — the essay builds from one village lane to etymology to a universal ideal precisely to show a home is protection offered without discrimination, not a purchasable quantity.', outcome: 'The chapter\'s method is the message: digression from concrete scene to philosophy is how the essay lifts \'house\' into \'home\' — the poster needs that ascent, not a bigger number.' },
                { text: 'Keep the poster — for a scheme, square footage is the honest measurable promise.', outcome: 'Measurability isn\'t the essay\'s unit of meaning: the text argues a dwelling earns its name by what it shelters, and a poster that equates home with area repeats the reduction the essay spends its length undoing.', reveals: 'home-equals-area' },
                { text: 'Drop both and show a Sanskrit shloka alone — the philosophical ending is the essay\'s best part.', outcome: 'The verse lands because the village lane came first — the essay\'s frame pairs particular scene with universal ideal; keeping the abstraction without the mud walls cuts the argument\'s root.', reveals: 'abstraction-alone-convinces' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate the label from the life — and hear a Sanskrit scholar argue that the truest word is the one that\'s been lived in.',
            decisions: [{ prompt: 'What comes next? कुटज · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कुटज · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वे सहायक विषय हैं जो कृति के मुख्य विषय को विस्तार देते.',
          hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो c12_hin_a_cbse_17_006 नोड के \'WORKED_EXAMPLE_1\' और.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय\' का अर्थ \'कम महत्वपूर्ण विषय\' होता है, इसलिए वे परीक्षा में केवल मुख्य विषय लिखकर पूर्णांक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वे सहायक विषय हैं जो कृति के मुख्य विषय को विस्तार देते हैं, उसे',
                  options: ['गौण विषय (Sub-theme) वे सहायक विषय हैं जो कृति के मुख्य विषय को विस्तार देते हैं, उसे', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो c12_hin_a_cbse_17_006 नोड के \'WORKED_EXAMPLE_1\' और.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय\' का अर्थ \'कम महत्वपूर्ण विषय\' होता है, इसलिए वे परीक्षा में केवल मुख्य विषय लिखकर पूर्णांक पाने की आशा करते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: कुटज पाठ को फिर से पढ़ें और केवल उन प्रसंगों को चिह्नित करें जो मुख्य कथा (नायक-कुटज संवाद/स्मृति) से हटकर हैं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_008', difficulty: 'standard',
          question: 'बिंब वह संवेदनात्मक विवरण है जो दृष्टि, श्रवण आदि इंद्रियों के माध्यम से भावना.',
          hint: 'अगर बिंब-रूपक के भावनात्मक प्रभाव को समझने में कठिनाई हो, तो c11_hin_a_cbse_08_008.',
          misconception: 'छात्र अक्सर बिंब और रूपक को सिर्फ "सुंदर भाषा" या "वर्णनात्मक अतिरिक्त" मानते हैं, और इसलिए वे इनकी पहचान तो कर लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह संवेदनात्मक विवरण है जो दृष्टि, श्रवण आदि इंद्रियों के माध्यम से भावना या विचार',
                  options: ['बिंब वह संवेदनात्मक विवरण है जो दृष्टि, श्रवण आदि इंद्रियों के माध्यम से भावना या विचार', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'अगर बिंब-रूपक के भावनात्मक प्रभाव को समझने में कठिनाई हो, तो c11_hin_a_cbse_08_008 revisit करें और.',
                  misconception: 'छात्र अक्सर बिंब और रूपक को सिर्फ "सुंदर भाषा" या "वर्णनात्मक अतिरिक्त" मानते हैं, और इसलिए वे इनकी पहचान तो कर लेते हैं लेकिन उनके.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले एकदम सरल वाक्य दें: "वह कमरे में बैठी थी।" फिर पूछें: इस वाक्य से आपको क्या भावना आती है?', 'जब वे कहेंगे "कोई खास नहीं", तो कहें: अब देखिए — "वह टूटे हुए खिलौने से भरे कमरे में बैठी थी, खिड़की से टूटा हुआ प्रकाश.', 'इस तुलना के माध्यम से बताइए कि बिंब कैसे भावना जोड़ता है — फिर इसी तर्क को रूपक पर बढ़ाइए: "जीवन एक बंधित नदी" कहने से.', 'इस प्रकार सजावट से अर्थ तक की यात्रा को अनुभवात्मक बनाकर, छात्र को इन उपकरणों के कार्यात्मक महत्व को समझने में मदद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_009', difficulty: 'standard',
          question: 'विरोधाभास वह साहित्यिक युक्ति है जिसमें दो विपरीत विचारों या स्थितियों को एक.',
          hint: 'यदि विद्यार्थी प्रतीक के अर्थ को समझने में कठिनाई महसूस कर रहा है, तो उसे.',
          misconception: 'विद्यार्थी अक्सर कुटज में प्रतीक को उसकी सांस्कृतिक या धार्मिक पहचान तक सीमित रखते हैं — जैसे कि पीपल का पत्ता केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास वह साहित्यिक युक्ति है जिसमें दो विपरीत विचारों या स्थितियों को एक साथ रखा जाता',
                  options: ['विरोधाभास वह साहित्यिक युक्ति है जिसमें दो विपरीत विचारों या स्थितियों को एक साथ रखा जाता', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि विद्यार्थी प्रतीक के अर्थ को समझने में कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_17_008.',
                  misconception: 'विद्यार्थी अक्सर कुटज में प्रतीक को उसकी सांस्कृतिक या धार्मिक पहचान तक सीमित रखते हैं — जैसे कि पीपल का पत्ता केवल इसलिए प्रतीक है क्योंकि.' }
          ],
            remediations: { 'hindu': { steps: ['छात्र को उपन्यास से दो विशिष्ट उदाहरण दें: एक जहाँ पीपल का पत्ता शांतिपूर्वक दिखाया गया है (जैसे पात्र उसके नीचे बैठकर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_010', difficulty: 'standard',
          question: 'पदावली (vocabulary) refers to the curated set of key words, phrases, and idioms.',
          hint: 'यदि प्रतीकवाद स्पष्ट नहीं है, तो c12_hin_a_cbse_17_009 (विरोधाभास और प्रतीक) के \'प्रतीक\'.',
          misconception: '**विशिष्ट भ्रम**: छात्र \'कुटज\', \'अरण्य\', \'तपस्या\' जैसे शब्दों को *केवल* प्रतीक (symbol) मानते हैं और भूल जाते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (vocabulary) refers to the curated set of key words, phrases, and idioms in a',
                  options: ['पदावली (vocabulary) refers to the curated set of key words, phrases, and idioms in a', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि प्रतीकवाद स्पष्ट नहीं है, तो c12_hin_a_cbse_17_009 (विरोधाभास और प्रतीक) के \'प्रतीक\' खंड को.',
                  misconception: '**विशिष्ट भ्रम**: छात्र \'कुटज\', \'अरण्य\', \'तपस्या\' जैसे शब्दों को *केवल* प्रतीक (symbol) मानते हैं और भूल जाते हैं कि उपन्यास में ये.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें** (15 मिनट): कुटज के उन 3-4 पृष्ठों को चिह्नित करें जहाँ \'कुटज\', \'अरण्य\', \'तपस्या\' शब्द आए हैं — केवल.', '**तुलना तालिका बनाएं** (10 मिनट): प्रत्येक शब्द के लिए दो कॉलम — \'शाब्दिक/यथार्थवादी प्रसंग\' और \'प्रतीकात्मक अर्थ\'।.', '**पुनः निदान** (5 मिनट): DIAGNOSTIC_QUESTION_1 और _2 को दोबारा हल करें — अब दोनों स्तरों पर उत्तर दें। यदि अभी भी केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_011', difficulty: 'standard',
          question: 'कुटज पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा उपयोग किए गए वाक्य संरचना.',
          hint: 'यदि फंसे हुए हों, तो कुटज — पात्र-चित्रण: सहायक पात्र (c12_hin_a_cbse_17_005) और कुटज.',
          misconception: 'छात्र अक्सर कुटज पाठ में भाषा-प्रयोग के विश्लेषण को केवल "कठिन शब्दों का अर्थ निकालना" या "मुहावरों की सूची बनाना".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कुटज पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा उपयोग किए गए वाक्य संरचना, विराम चिह्न,',
                  options: ['कुटज पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा उपयोग किए गए वाक्य संरचना, विराम चिह्न,', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि फंसे हुए हों, तो कुटज — पात्र-चित्रण: सहायक पात्र (c12_hin_a_cbse_17_005) और कुटज — मुख्य विषय.',
                  misconception: 'छात्र अक्सर कुटज पाठ में भाषा-प्रयोग के विश्लेषण को केवल "कठिन शब्दों का अर्थ निकालना" या "मुहावरों की सूची बनाना" मानते हैं, जबकि वास्तव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिए गए एक अंश में वाक्य की लंबाई और विराम चिह्नों पर ध्यान देने के लिए कहें: पहला कदम है वाक्य को पढ़कर.', 'क्या वे अनिश्चितता दिखाती हैं?" फिर मुहावरे के साथ दोहराएं: मुहावरा पहचानें, उसका शब्दार्थ अर्थ बताएं, फिर पूछें: "इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनका एक निश्चित सही उत्तर होता है और जिन्हें.',
          hint: 'यदि फंसें, तो कक्षा 11 के बोध-प्रश्न नोड (c11_hin_a_cbse_01_012) की समीक्षा करें ताकि.',
          misconception: 'छात्र अक्सर मान लेते हैं कि यदि एक प्रश्न में "क्यों", "क्या दर्शाता है", या "कैसे" जैसे शब्द हैं, तो यह स्वचालित रूप.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनका एक निश्चित सही उत्तर होता है और जिन्हें तथ्यात्मक',
                  options: ['वस्तुनिष्ठ प्रश्न वे होते हैं जिनका एक निश्चित सही उत्तर होता है और जिन्हें तथ्यात्मक', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि फंसें, तो कक्षा 11 के बोध-प्रश्न नोड (c11_hin_a_cbse_01_012) की समीक्षा करें ताकि मूलभूत अंतर.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि यदि एक प्रश्न में "क्यों", "क्या दर्शाता है", या "कैसे" जैसे शब्द हैं, तो यह स्वचालित रूप से आशय-सूचक है, और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें कि वह प्रत्येक प्रश्न को दो बार पढ़े: एक बार यह समझने के लिए कि क्या पूछा जा रहा है, और दूसरी बार यह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
