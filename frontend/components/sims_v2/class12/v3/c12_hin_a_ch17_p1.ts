import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch17_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch17_p1: SimDef = {
    id: 'v3_c12_hin_a_ch17_p1',
    title: 'कुटज · Part 1/3',
    subtitle: 'The courtyard is its mornings — not its name',
    classLevel: 12, subject: 'hin_a', topic: 'कुटज · Part 1/3',
    chapters: ['c12_hin_a_ch17'],
    nodeIds: ['c12_hin_a_cbse_17_001', 'c12_hin_a_cbse_17_002', 'c12_hin_a_cbse_17_003', 'c12_hin_a_cbse_17_004', 'c12_hin_a_cbse_17_005', 'c12_hin_a_cbse_17_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Philosophical-essay reader', intro: 'A scholar who ran All India Radio asks whether a word should come from the dictionary or from the courtyard where life happens.', goal: 'Read Aangan through naam-versus-svaroop — social labels against lived essence, tyag as uncelebrated art.' },
    discovery: {
        question: 'An Aadhaar number opens every door — subsidies, banks, travel — yet it isn\'t you. A 1950s essayist said this exact thing about \'naam\' and \'svaroop.\' What\'s the split?',
        options: ['Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth', 'Aadhaar is fake identity', 'Names are always wrong', 'Svaroop means appearance'],
        answer: 'Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth',
        hook: 'Mishra insists on \'aangan\' over the Sanskritised \'angana\' — the lived word carries cow-dung smell and children\'s play; the formal word is sterile. And tyag is redefined: not self-denial or heroic martyrdom but daily, uncelebrated duty — a mother\'s life as art.',
    },
    teaching: [
        { title: 'कुटज — पृष्ठभूमि और रचनाकार परिचय', text: '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और साहित्यिक संदर्भों का विश्लेषण शामिल है जो उपन्यास के विषय, पात्रों और कथानक के निर्माण को प्रभावित करते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_17_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand in a courtyard at dawn: watch the space reveal itself as process, not object; weigh name against essence; and test whether sacrifice is suffering or transcendence.',
        labels: ['कुटज — पृष्ठभूमि और', 'कुटज — कथानक और', 'कुटज — पाठ्य-परिवेश और', 'कुटज — पात्र-चित्रण: नायक/प्रमुख', 'कुटज — पात्र-चित्रण: सहायक', 'कुटज — मुख्य विषय'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a housing-for-all poster contest, a teammate\'s entry shows a glossy apartment block with the line \'shelter = square feet.\' You recall the essay that starts on a mud-walled village lane and ends in a Sanskrit verse on what makes a dwelling a home.',
            decisions: [{ prompt: 'How would the essay \'कुटिर\' reframe the poster?', options: [
                { text: 'Shift the claim from floor area to shelter-as-value — the essay builds from one village lane to etymology to a universal ideal precisely to show a home is protection offered without discrimination, not a purchasable quantity.', outcome: 'The chapter\'s method is the message: digression from concrete scene to philosophy is how the essay lifts \'house\' into \'home\' — the poster needs that ascent, not a bigger number.' },
                { text: 'Keep the poster — for a scheme, square footage is the honest measurable promise.', outcome: 'Measurability isn\'t the essay\'s unit of meaning: the text argues a dwelling earns its name by what it shelters, and a poster that equates home with area repeats the reduction the essay spends its length undoing.', reveals: 'home-equals-area' },
                { text: 'Drop both and show a Sanskrit shloka alone — the philosophical ending is the essay\'s best part.', outcome: 'The verse lands because the village lane came first — the essay\'s frame pairs particular scene with universal ideal; keeping the abstraction without the mud walls cuts the argument\'s root.', reveals: 'abstraction-alone-convinces' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate the label from the life — and hear a Sanskrit scholar argue that the truest word is the one that\'s been lived in.',
            decisions: [{ prompt: 'What comes next? कुटज · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कुटज · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_001', difficulty: 'standard',
          question: '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक.',
          hint: 'यदि फंसे हुए महसूस हों, तो कक्षा 11 के किसी भी हिंदी पाठ के \'पृष्ठभूमि और रचनाकार परिचय\'.',
          misconception: 'छात्र अक्सर मानते हैं कि लेखक के परिचय में केवल जैविक तथ्य (जन्म, मृत्यु, शिक्षा) शामिल हैं, और वे इन तथ्यों को उपन्यास.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और',
                  options: ['\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक विवरण, भाषा, व्यवहार,'],
                  hint: 'यदि फंसे हुए महसूस हों, तो कक्षा 11 के किसी भी हिंदी पाठ के \'पृष्ठभूमि और रचनाकार परिचय\' नोड को.',
                  misconception: 'छात्र अक्सर मानते हैं कि लेखक के परिचय में केवल जैविक तथ्य (जन्म, मृत्यु, शिक्षा) शामिल हैं, और वे इन तथ्यों को उपन्यास के विषय से जोड़ने.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कैसे एक विशिष्ट तथ्य (जैसे लेखक का शिक्षक होना) को उपन्यास के एक विशिष्ट पहलू (जैसे ग्रामीण बच्चों.', 'इससे उपन्यास में बच्चों के चित्रण पर क्या प्रभाव पड़ सकता है?" फिर उन्हें इस संबंध को एक वाक्य में लिखने के लिए कहिए।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ.',
          hint: 'यदि फ्लैशबैक और समानांतर कथासूत्र समझ न आएँ तो c11_hin_a_cbse_02_002 (आवारा मसीहा — कथानक.',
          misconception: 'छात्र \'कथानक\' और \'आख्यान-संरचना\' को समानार्थी मानते हैं और परीक्षा में दोनों के लिए घटनाओं का सारांश लिख देते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर',
                  options: ['कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक विवरण, भाषा, व्यवहार,'],
                  hint: 'यदि फ्लैशबैक और समानांतर कथासूत्र समझ न आएँ तो c11_hin_a_cbse_02_002 (आवारा मसीहा — कथानक और.',
                  misconception: 'छात्र \'कथानक\' और \'आख्यान-संरचना\' को समानार्थी मानते हैं और परीक्षा में दोनों के लिए घटनाओं का सारांश लिख देते हैं। वे नहीं समझते कि कथानक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "कुटज की केवल तीन मुख्य घटनाएँ लिखो (बिना व्याख्या के)।" चरण 2: फिर पूछें — "लेखक ने इन्हें किस.', 'पहला क्या दिखाया, दूसरा क्या?" चरण 3: तुलना कराएँ: घटनाओं का वास्तविक कालक्रम (लोककथाएँ पुरानी हैं, कुटज देखना नया).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती.',
          hint: 'यदि सामाजिक परिवेश की पहचान में कठिनाई हो, तो c12_hin_a_cbse_17_001 (पृष्ठभूमि और रचनाकार.',
          misconception: 'छात्र अक्सरkutj के वातावरण को केवल शारीरिक वर्णन (जैसे नदी का पानी, खेतों की हरी-भरीता) तक सीमित रखते हैं, सामाजिक और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि',
                  options: ['पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक विवरण, भाषा, व्यवहार,'],
                  hint: 'यदि सामाजिक परिवेश की पहचान में कठिनाई हो, तो c12_hin_a_cbse_17_001 (पृष्ठभूमि और रचनाकार परिचय) को.',
                  misconception: 'छात्र अक्सरkutj के वातावरण को केवल शारीरिक वर्णन (जैसे नदी का पानी, खेतों की हरी-भरीता) तक सीमित रखते हैं, सामाजिक और ऐतिहासिक तनावों को.' }
          ],
            remediations: { 'kutj': { steps: ['पहले छात्र से kutj के दो अलग-अलग सामाजिक पृष्ठभूमि वाले पात्रों (जैसे एक ब्राह्मण और एक दलित) के बीच एक संवाद अंश चुनने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_004', difficulty: 'standard',
          question: 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक विवरण, भाषा.',
          hint: 'यदि छात्र पात्र के आंतरिक विश्लेषण में फंस जाए तो उसे कक्षा 11 के पात्र-चित्रण नोड.',
          misconception: 'छात्र अक्सर नायक के पात्र-चित्रण को केवल उसकेheroic कार्यों (जैसे मौजी द्वारा भोलिया को बचाना या खेत जोतना) तक सीमित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक विवरण, भाषा, व्यवहार,',
                  options: ['पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक विवरण, भाषा, व्यवहार,', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि छात्र पात्र के आंतरिक विश्लेषण में फंस जाए तो उसे कक्षा 11 के पात्र-चित्रण नोड.',
                  misconception: 'छात्र अक्सर नायक के पात्र-चित्रण को केवल उसकेheroic कार्यों (जैसे मौजी द्वारा भोलिया को बचाना या खेत जोतना) तक सीमित रखते हैं, मानते हैं कि.' }
          ],
            remediations: { 'heroic': { steps: ['छात्र से कहिए कि वह मौजी के किसी एक दृश्य (जैसे ठाकुर के सामने चुप रहना) को ले और पूछे: "इस पल में मौजी क्या कहना चाहता.', 'उसका शरीर क्या बता रहा है जो उसके शब्द नहीं बता रहे?', 'क्या वह अंदर से डर रहा है, भ्रमित है, या नियंत्रित हो रहा है?" फिर उस विश्लेषण को उसके आर्क (शुरूआती विद्रोह → भ्रम →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो मुख्य पात्र के साथ कहानी में महत्वपूर्ण भूमिका.',
          hint: 'यदि फंसे तो c12_hin_a_cbse_17_004 (मुख्य पात्रों का चरित्र-चित्रण) की अवधारणा को दोबारा.',
          misconception: 'छात्र अक्सर सहायक पात्रों को केवल कहानी की पृष्ठभूमि या filler मान लेते हैं और उनके मुख्य पात्रों के विकास या विषय के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो मुख्य पात्र के साथ कहानी में महत्वपूर्ण भूमिका निभाते',
                  options: ['सहायक पात्र वे पात्र होते हैं जो मुख्य पात्र के साथ कहानी में महत्वपूर्ण भूमिका निभाते', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि फंसे तो c12_hin_a_cbse_17_004 (मुख्य पात्रों का चरित्र-चित्रण) की अवधारणा को दोबारा देखें।',
                  misconception: 'छात्र अक्सर सहायक पात्रों को केवल कहानी की पृष्ठभूमि या filler मान लेते हैं और उनके मुख्य पात्रों के विकास या विषय के प्रसार में सक्रिय.' }
          ],
            remediations: { 'filler': { steps: ['छात्र से कहें कि वह कुटज के किसी एक अध्याय को दोबारा पढ़ें और केवल सहायक पात्रों के भाषण और कार्यों पर ध्यान केंद्रित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_006', difficulty: 'standard',
          question: 'कुटज उपन्यास का मुख्य विषय ग्रामीण समाज में पारंपरिक मूल्यों के टूटने और.',
          hint: 'यदि मुख्य विषय का विश्लेषण करने में कठिनाई हो, तो पहले पात्र-चित्रण नोड्स.',
          misconception: 'छात्र अक्सर kutj के मुख्य संदेश को \'शहरी जीवन बुरा है, ग्रामीण जीवन आदर्श है\' के रूप में सरलीकृत कर देते हैं, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कुटज उपन्यास का मुख्य विषय ग्रामीण समाज में पारंपरिक मूल्यों के टूटने और शहरीकरण के कारण',
                  options: ['कुटज उपन्यास का मुख्य विषय ग्रामीण समाज में पारंपरिक मूल्यों के टूटने और शहरीकरण के कारण', '\'कुटज\' उपन्यास के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत, सामाजिक, ऐतिहासिक और', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्यात्मक क्रम है जो संघर्ष से आरंभ होकर', 'पाठ्य-परिवेश वह समय, स्थान और सामाजिक परिस्थितियाँ हैं जिनमें कोई कथा घटित होती है, जबकि'],
                  hint: 'यदि मुख्य विषय का विश्लेषण करने में कठिनाई हो, तो पहले पात्र-चित्रण नोड्स (c12_hin_a_cbse_17_004 और.',
                  misconception: 'छात्र अक्सर kutj के मुख्य संदेश को \'शहरी जीवन बुरा है, ग्रामीण जीवन आदर्श है\' के रूप में सरलीकृत कर देते हैं, जबकि उपन्यास वास्तव में यह.' }
          ],
            remediations: { 'kutj': { steps: ['यदि छात्र kutj का संदेश केवल \'गाँव अच्छा, शहर बुरा\' मान रहा है, तो उसे सबसे पहले उपन्यास के उन अंशों की पहचान करने के.', 'क्या उनके बीच भी झगड़े, जातीय भेद, या आर्थिक असमानता है?', 'इस तुलनात्मक विश्लेषण के माध्यम से धीरे-धीरे उसे दिखाएँ कि उपन्यास किसी एक जीवन शैली को नहीं बल्कि विकास के उन रूपों की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
