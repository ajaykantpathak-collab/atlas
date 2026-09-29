import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch10_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch10_p2',
    title: 'पाठ 10 · Part 2/3',
    subtitle: 'यह नोड पाठ 10 की कविताओं में प्रतीक और बिंब की पहचान, विश्लेषण और उनके भावात्मक प्रभाव की.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 10 · Part 2/3',
    chapters: ['c10_hin_ks_ch10'],
    nodeIds: ['c10_hin_ks_cbse_10_007', 'c10_hin_ks_cbse_10_008', 'c10_hin_ks_cbse_10_009', 'c10_hin_ks_cbse_10_010', 'c10_hin_ks_cbse_10_011', 'c10_hin_ks_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में बरसात-की-बूँदें-टिन-की-छत-पर-टकराती-हुईं जैसे सहायक विचार आते.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — साहित्यिक', 'पाठ 10 — मुख्य', 'पाठ 10 — गौण', 'पाठ 10 — पदावली', 'पाठ 10 — व्याकरण', 'पाठ 10 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 2/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — \'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे.', answer: '10 -', options: ['10 -', '10 - -'] },
            { id: 's2', label: '10 - -', prompt: 'Which idea is this? — \'बरसात की बूँदें टिन की छत पर टकराती हुईं\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे.', answer: '10 - -', options: ['10 - -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 10 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 10 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 10 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_007', difficulty: 'standard',
          question: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' के गौण विषय — मुख्य विषय के साथ चलने.',
          hint: 'अलंकार की पहचान - विशेष रूप से उपमा और रूपक के बीच का अंतर',
          misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही समझते हैं और किसी भी वर्णनात्मक भाषा को दोनों में से किसी एक के रूप में लेबल कर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' के गौण विषय',
                  options: ['\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' के गौण विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि के जीवन के चयनित तथ्य (जन्म, शिक्षा, प्रमुख', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का कथानक', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अलंकार की पहचान - विशेष रूप से उपमा और रूपक के बीच का अंतर',
                  misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही समझते हैं और किसी भी वर्णनात्मक भाषा को दोनों में से किसी एक के रूप में लेबल कर देते हैं, विशेष रूप से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र प्रतीक और बिंब के बीच का अंतर नहीं समझ पा रहा है, तो उसे निम्नलिखित चरण-दर-चरण अभ्यास करवाइए: - चरण 1: कविता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_008', difficulty: 'standard',
          question: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में बिंब (imagery) — शब्दों से बने.',
          hint: 'यदि अटके तो c10_hin_ks_cbse_10_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_10_004.',
          misconception: 'छात्र अक्सर \'मुख्य भाव\' के उत्तर में पूरी कविता का सारांश (summary) लिख देते हैं — जैसे "कवि सुबह जंगल गया, पेड़ देखे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में बिंब (imagery)',
                  options: ['\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि के जीवन के चयनित तथ्य (जन्म, शिक्षा, प्रमुख', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का कथानक', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_10_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_10_004 (केंद्रीय भाव और.',
                  misconception: 'छात्र अक्सर \'मुख्य भाव\' के उत्तर में पूरी कविता का सारांश (summary) लिख देते हैं — जैसे "कवि सुबह जंगल गया, पेड़ देखे, पक्षी सुने, शांति.' }
          ],
            remediations: { 'summary': { steps: ['चरण 1: छात्र से कहें — "कविता की 10 पंक्तियों को 1 वाक्य में बाँधो जिसमें कोई घटना न हो, केवल विचार हो।" चरण 2: उस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_009', difficulty: 'standard',
          question: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में विरोधाभास — विपरीत बातें मिलकर.',
          hint: 'यदि फंसे तो केंद्रीय भाव और रस (c10_hin_ks_cbse_10_004) नोड की समीक्षा करें — मुख्य भाव.',
          misconception: 'छात्र अक्सर गौण भाव को किसी भी छोटे भाव के रूप में पहचान लेते हैं, चाहे वह मुख्य भाव से संबंधित हो या नहीं — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में विरोधाभास',
                  options: ['\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में विरोधाभास', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि के जीवन के चयनित तथ्य (जन्म, शिक्षा, प्रमुख', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का कथानक', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे तो केंद्रीय भाव और रस (c10_hin_ks_cbse_10_004) नोड की समीक्षा करें — मुख्य भाव की पहचान.',
                  misconception: 'छात्र अक्सर गौण भाव को किसी भी छोटे भाव के रूप में पहचान लेते हैं, चाहे वह मुख्य भाव से संबंधित हो या नहीं — जैसे प्रकृति का वर्णन करके उसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए: "इस भाव का मुख्य भाव से क्या संबंध है?', 'क्या यह मुख्य भाव को समझाने में मदद करता है या उसे कमजोर करता है?" फिर मुख्य भाव को पहचानने में मदद कीजिए, फिर देखिए कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_010', difficulty: 'standard',
          question: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' की पदावली — मुख्य शब्द और प्रयोग जो.',
          hint: 'यदि अटके तो पाठ 10 के पद्यांश-वार भावार्थ (c10_hin_ks_cbse_10_002) को दोबारा पढ़ें।',
          misconception: 'छात्र अक्सर मुहावरों का अर्थ शब्दकोश में दिए गए शाब्दिक अर्थ से लगा लेते हैं, जैसे "नाक कटना" का अर्थ वे "नाक का कट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' की पदावली',
                  options: ['\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' की पदावली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि के जीवन के चयनित तथ्य (जन्म, शिक्षा, प्रमुख', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का कथानक', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो पाठ 10 के पद्यांश-वार भावार्थ (c10_hin_ks_cbse_10_002) को दोबारा पढ़ें।',
                  misconception: 'छात्र अक्सर मुहावरों का अर्थ शब्दकोश में दिए गए शाब्दिक अर्थ से लगा लेते हैं, जैसे "नाक कटना" का अर्थ वे "नाक का कट जाना" लिख देते हैं जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को 5 मुहावरे दें और उनके शाब्दिक व भावार्थ लिखवाएं, फिर अंतर स्पष्ट करें। चरण 2: पाठ 10 की दो पंक्तियां.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_011', difficulty: 'standard',
          question: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक.',
          hint: 'कक्षा 9 हिंदी व्याकरण: \'वाक्य विचार\' और \'पद परिचय\' दोहराएं; विशेषकर क्रिया पद की पहचान और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि पद्य में व्याकरणिक विचलन (जैसे क्रिया का अंत में आना, \'हिय\' जैसे शब्द) **कवि की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में भाषा-प्रयोग',
                  options: ['\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' में भाषा-प्रयोग', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि के जीवन के चयनित तथ्य (जन्म, शिक्षा, प्रमुख', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का कथानक', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का पाठ्य-परिवेश (setting)'],
                  hint: 'कक्षा 9 हिंदी व्याकरण: \'वाक्य विचार\' और \'पद परिचय\' दोहराएं; विशेषकर क्रिया पद की पहचान और कारक.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि पद्य में व्याकरणिक विचलन (जैसे क्रिया का अंत में आना, \'हिय\' जैसे शब्द) **कवि की मजबूरी या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मानक क्रम पुनर्अभ्यास**: कक्षा 9 के \'वाक्य रचना\' नोट्स से SOV क्रम के 10 वाक्य लिखो, फिर प्रत्येक को 3 तरीकों से बदलो.', '**पद्यांश पर मैपिंग**: क्षितिज के किसी काव्य की 5 पंक्तियाँ लो, उनका गद्यानुवाद लिखो, फिर दोनों की तुलना करके हर अंतर.', '**छंद-जांच**: प्रत्येक विचलन के लिए पूछो — "अगर मैं मानक रूप रखूं तो मात्रा/गण कैसे बदलेगा?" — इससे \'मजबूरी\' बनाम \'चयन\'.', '**उत्तर-लेखन अभ्यास**: बोर्ड शैली में एक प्रश्न हल करो: "पंक्ति में आए व्याकरणिक विचलन की पहचान कर उसके सौंदर्यात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_10_012', difficulty: 'standard',
          question: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में.',
          hint: 'यदि छात्र प्रश्नों के प्रकार की पहचान में कठिनाई महसूस कर रहा है, तो.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि प्रश्न में "क्यों", "कैसे", या "स्पष्ट कीजिए" जैसे शब्द नहीं हैं, तो वह वस्तुनिष्ठ होना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि के जीवन के चयनित तथ्य (जन्म, शिक्षा, प्रमुख', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का कथानक', '\'बरसात की बूँदें टिन की छत पर टकराती हुईं\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र प्रश्नों के प्रकार की पहचान में कठिनाई महसूस कर रहा है, तो c10_hin_ks_cbse_10_002.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि प्रश्न में "क्यों", "कैसे", या "स्पष्ट कीजिए" जैसे शब्द नहीं हैं, तो वह वस्तुनिष्ठ होना चाहिए, और यदि इन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही पंक्ति से दो प्रकार के प्रश्न बनाए जा सकते हैं: (1) "पंक्ति की चौथी शब्द क्या है?" (वस्तुनिष्ठ.', 'भाव पर इसके प्रभाव की व्याख्या कीजिए।" (आशय-सूचक — स्पष्टीकरण आवश्यक)। फिर अभ्यास के लिए 5 मिश्रित प्रश्न दें और छात्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
