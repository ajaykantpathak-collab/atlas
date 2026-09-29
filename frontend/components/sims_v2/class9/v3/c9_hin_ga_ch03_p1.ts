import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch03_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'इस नोड में केवल पाठ 3 की विशिष्ट पृष्ठभूमि (काल, समाज, घटना) और रचनाकार के जीवन के **उन.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c9_hin_ga_ch03'],
    nodeIds: ['c9_hin_ga_cbse_03_001', 'c9_hin_ga_cbse_03_002', 'c9_hin_ga_cbse_03_003', 'c9_hin_ga_cbse_03_004', 'c9_hin_ga_cbse_03_005', 'c9_hin_ga_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'पहले रचनाकार: (निबंध)। फिर काल। फिर \'उपभोक्तावाद की संस्कृति\' का संदर्भ — उपभोक्तावाद की समीक्षा — आधुनिक.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय — \'उपभोक्तावाद की संस्कृति\' (निबंध) द्वारा रचित निबंध है। रचनाकार का जीवन, काल और साहित्यिक परिवेश पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 1/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — \'उपभोक्तावाद की संस्कृति\' का कथानक — निबंध उपभोक्तावादी संस्कृति की आलोचना करता है — जीवन.', answer: '3 -', options: ['3 -', '3 -'] },
            { id: 's2', label: '3 -', prompt: 'Which idea is this? — \'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.', answer: '3 -', options: ['3 -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_03_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_001', difficulty: 'standard',
          question: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय — \'उपभोक्तावाद की संस्कृति\' (निबंध) द्वारा.',
          hint: 'यदि अटका हुआ महसूस हो तो: **\'पाठ की पहली और अंतिम पंक्ति को पृष्ठभूमि के चश्मे से.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पृष्ठभूमि = केवल तिथियाँ और घटनाएँ (कब, कहाँ)" और "रचनाकार परिचय = केवल जीवनी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)', '\'उपभोक्तावाद की संस्कृति\' का पात्र-चित्रण'],
                  hint: 'यदि अटका हुआ महसूस हो तो: **\'पाठ की पहली और अंतिम पंक्ति को पृष्ठभूमि के चश्मे से पढ़ें\'** — अंतर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पृष्ठभूमि = केवल तिथियाँ और घटनाएँ (कब, कहाँ)" और "रचनाकार परिचय = केवल जीवनी तथ्य (जन्म, मृत्यु.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation Steps):** 1.', '**\'क्यों\' पूछने का अभ्यास:** छात्र से कहें: *"पाठ की पहली पंक्ति पढ़ो। अब पूछो — \'लेखक ने यह बात *इसी शब्द में, इसी.', 'इसका उत्तर पृष्ठभूमि/रचनाकार में ढूंढो।"* इसे 3-4 पंक्तियों पर दोहराएँ। 2.', '**मैपिंग तालिका बनवाएँ:** दो कॉलम बनाएँ — **कॉलम A: पाठ का विशिष्ट अंश/शब्द/प्रसंग** | **कॉलम B: पृष्ठभूमि/रचनाकार का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_002', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' का कथानक — निबंध उपभोक्तावादी संस्कृति की आलोचना करता.',
          hint: 'यदि फंसें तो "पृष्ठभूमि और रचनाकार परिचय" (c9_hin_ga_cbse_03_001) नोड को दोबारा पढ़ें.',
          misconception: 'छात्र अक्सर मानते हैं कि कथानक का चरमोत्कर्ष हमेशा सबसे लंबा, सबसेドラマटिक, या सबसे अधिक क्रिया वाला भाग होता है — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' का कथानक',
                  options: ['\'उपभोक्तावाद की संस्कृति\' का कथानक', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)', '\'उपभोक्तावाद की संस्कृति\' का पात्र-चित्रण'],
                  hint: 'यदि फंसें तो "पृष्ठभूमि और रचनाकार परिचय" (c9_hin_ga_cbse_03_001) नोड को दोबारा पढ़ें — विशेष रूप.',
                  misconception: 'छात्र अक्सर मानते हैं कि कथानक का चरमोत्कर्ष हमेशा सबसे लंबा, सबसेドラマटिक, या सबसे अधिक क्रिया वाला भाग होता है — जैसे एक युद्ध scène या एक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को तीन छोटे वाक्य दें: (1) "एक लड़का हर दिन स्कूल जाता है।" (2) "एक दिन वह देखता है कि उसका दोस्त रो रहा है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_003', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'यदि अटके तो **कथानक-रेखाचित्र (c9_hin_ga_cbse_03_002)** दोहराएँ: प्रत्येक प्रमुख घटना के.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "परिवेश = पृष्ठभूमि जानकारी (backdrop info) जिसे कहानी की शुरुआत में एक बार बता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)',
                  options: ['\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **कथानक-रेखाचित्र (c9_hin_ga_cbse_03_002)** दोहराएँ: प्रत्येक प्रमुख घटना के आगे लिखें.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "परिवेश = पृष्ठभूमि जानकारी (backdrop info) जिसे कहानी की शुरुआत में एक बार बता दिया जाता है और फिर वह.' }
          ],
            remediations: { 'backdrop-info-3-dynamic': { steps: ['**पुनः पठन (Re-read):** पाठ-3 के पहले और अंतिम पृष्ठ साथ रखकर पूछो: "क्या परिवेश बदला?', 'किसके कारण?" — अंतर लिखवाओ। 2.', '**रंग-कोडिंग (Colour-coding):** तीन रंगों से हाइलाइट करवाओ — **नीला** = भौतिक स्थान, **हरा** = सामाजिक नियम, **लाल**.', '**प्रतिपक्षी लेखन (Counterfactual writing):** "अगर यह घटना गाँव के बजाय शहर में होती / दिन के बजाय रात में / अमीर पात्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_004', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'यदि फंसें तो c9_hin_ga_cbse_03_003 (पाठ्य-परिवेश और वातावरण) की समीक्षा करें, विशेषकर.',
          misconception: 'छात्र अक्सर मानते हैं कि नायक का पात्र-चित्रण केवल उसके सकारात्मक गुणों (जैसे बहादुरी, ईमानदारी) पर केंद्रित होना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' का पात्र-चित्रण',
                  options: ['\'उपभोक्तावाद की संस्कृति\' का पात्र-चित्रण', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसें तो c9_hin_ga_cbse_03_003 (पाठ्य-परिवेश और वातावरण) की समीक्षा करें, विशेषकर वातावरण के.',
                  misconception: 'छात्र अक्सर मानते हैं कि नायक का पात्र-चित्रण केवल उसके सकारात्मक गुणों (जैसे बहादुरी, ईमानदारी) पर केंद्रित होना चाहिए, क्योंकि वे नायक को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले कहानी से एक ऐसा उदाहरण दिजिए जहाँ नायक ने कुछ गलत किया हो (जैसे झूठ बोलना या दूसरों को धोखा देना)।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_005', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ.',
          hint: 'अगर अटके तो नोड 004 (नायक चित्रण) की \'PEEL संरचना\' दोहराएं और नायक के तीन प्रमुख गुणों की.',
          misconception: 'छात्र मानते हैं कि सहायक पात्र का चित्रण करते समय केवल उसका \'स्वभाव\' (Nature) बताना काफी है (जैसे "वह दयालु था"), जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' के सहायक पात्र',
                  options: ['\'उपभोक्तावाद की संस्कृति\' के सहायक पात्र', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर अटके तो नोड 004 (नायक चित्रण) की \'PEEL संरचना\' दोहराएं और नायक के तीन प्रमुख गुणों की सूची.',
                  misconception: 'छात्र मानते हैं कि सहायक पात्र का चित्रण करते समय केवल उसका \'स्वभाव\' (Nature) बताना काफी है (जैसे "वह दयालु था"), जबकि बोर्ड परीक्षा माँगती.' }
          ],
            remediations: { 'nature': { steps: ['छात्र से कहें: "पाठ से एक सहायक पात्र चुनो और उसके तीन संवाद/कार्य लिखो जो सीधे नायक को प्रभावित करते हों।" 2.', 'फिर पूछें: "अगर ये संवाद/कार्य न होते तो नायक क्या करता?', 'अब छात्र को लिखने को कहें: "इसलिए यह पात्र ______ प्रकार का है क्योंकि यह नायक के ______ गुण को उभारता/कथानक को ______.', 'इस \'कारण-कार्य श्रृंखला\' (Cause-Effect Chain) का 2-3 पात्रों पर अभ्यास कराएं; फिर बोर्ड-शैली का 3-अंक का प्रश्न हल करने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_006', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' का मुख्य विषय — उपभोक्तावाद की समीक्षा — आधुनिक समाज.',
          hint: 'अगर अटके तो **नोड 004 (नायक-चित्रण)** के "महत्वपूर्ण निर्णय तालिका" को दोबारा देखें — वही.',
          misconception: '**विषय = कथानक का सारांश (Plot Summary)** — अधिकांश छात्र लिखते हैं: "पाठ 3 का विषय यह है कि नायक गाँव छोड़कर शहर गया.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' का मुख्य विषय',
                  options: ['\'उपभोक्तावाद की संस्कृति\' का मुख्य विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर अटके तो **नोड 004 (नायक-चित्रण)** के "महत्वपूर्ण निर्णय तालिका" को दोबारा देखें — वही विषय के.',
                  misconception: '**विषय = कथानक का सारांश (Plot Summary)** — अधिकांश छात्र लिखते हैं: "पाठ 3 का विषय यह है कि नायक गाँव छोड़कर शहर गया, वहाँ संघर्ष किया.' }
          ],
            remediations: { 'plot-summary-3': { steps: ['**चरण 1:** छात्र से कहें — "कहानी 3 वाक्यों में सुनाओ" (यह कथानक निकलेगा)। 2.', '**चरण 2:** फिर पूछें — "अब मुझे **एक शब्द** बताओ जो इस पूरी कहानी का सार हो" (जैसे: त्याग, संघर्ष, न्याय)। 3.', '**चरण 3:** उस एक शब्द को लेकर पूछें — "पाठ से **तीन जगह** दिखाओ जहाँ यह शब्द सच होता है" (प्रमाण ढूँढना)। 4.', '**चरण 4:** अंत में कहें — "अब इस एक शब्द को **एक सीख (Message)** में बदलो जो तुम अपने छोटे भाई को दे सको"। यह **Plot →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
