import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch03_p1: SimDef = {
    id: 'v3_c12_hin_a_ch03_p1',
    title: 'यह दीप अकेला, मैंने देखा एक बूँद · Part 1/3',
    subtitle: 'The poet who went to jail wrote about a little bird',
    classLevel: 12, subject: 'hin_a', topic: 'यह दीप अकेला, मैंने देखा एक बूँद · Part 1/3',
    chapters: ['c12_hin_a_ch03'],
    nodeIds: ['c12_hin_a_cbse_03_001', 'c12_hin_a_cbse_03_002', 'c12_hin_a_cbse_03_003', 'c12_hin_a_cbse_03_004', 'c12_hin_a_cbse_03_005', 'c12_hin_a_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modern Hindi poetry reader', intro: 'A freedom fighter turned editor turned poet — each life sharpened the next. Two poems show the whole arc.', goal: 'Read Vajra\'s two poems through his biography — activism, editorial craft, and the shift from exhortation to observation.' },
    discovery: {
        question: 'A poet jailed in 1942 writes of a small, dear bird begging to be let into a heart — \'इसे भी दिल को दे दो.\' What makes the plea more than birdwatching?',
        options: ['Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness', 'He loved birds', 'It\'s a children\'s poem', 'Sentimentality'],
        answer: 'Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness',
        hook: 'Vajra\'s two poems mark an evolution: the early one exhorts the collective \'you\' to accept the fragile; the later one whispers \'I saw\' — private epiphany replacing public call. Radio editing and Sanskrit-English schooling sharpened the ear that compresses so much into so few words.',
    },
    teaching: [
        { title: 'यह दीप अकेला, मैंने देखा एक बूँद — कवि परिचय और पृष्ठभूमि', text: '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के विरुद्ध एक व्यक्ति के प्रतिरोध को \'दीप\' के प्रतीक द्वारा अभिव्यक्त करती है; \'मैंने देखा एक बूँद\' उसी संग्रह.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track a poet across two registers: weigh the jailed activist\'s communal plea against the solitary observer\'s small epiphany, and hear the refrain built for a listening audience.',
        labels: ['यह दीप अकेला, मैंने'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a personality-development workshop, the facilitator insists each student define themselves in one word for the badge. A friend who\'s a painter-cricketer-caregiver freezes: \'None of these fit. Something\'s wrong with me.\'',
            decisions: [{ prompt: 'What do Dangwal\'s poems in this chapter tell her?', options: [
                { text: 'Nothing\'s wrong — \'नहीं वोश्यक\' spends four stanzas piling metaphor on metaphor precisely because identity won\'t sit in one word; each new facet re-reads all the others, and the refrain keeps inviting the search rather than closing it.', outcome: 'The refrain-catalogue structure enacts the refusal to be pinned down — the badge exercise mistakes a list for a person, while the poem shows elusiveness is the truth of a self.' },
                { text: 'Pick the dominant word — everyone has one core trait, and finding it is the point of the exercise.', outcome: 'That\'s the single-label fallacy the poem resists: every metaphor presented as \'the answer\' is immediately reframed by the next, proving the \'one word\' can\'t hold the subject.', reveals: 'one-word-captures-self' },
                { text: 'Skip the badge — since identity can\'t be fixed, the exercise is pointless.', outcome: 'The poem doesn\'t abandon the search — the refrain is an invitation to keep looking, not a verdict that looking is futile; the point is the seeking, not the surrender.', reveals: 'unfixable-means-pointless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read biography as a poetic instrument — and trace one poet\'s arc from barricades to the small bird at the window.',
            decisions: [{ prompt: 'What comes next? यह दीप अकेला, मैंने देखा एक बूँद · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — यह दीप अकेला, मैंने देखा एक बूँद · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_001', difficulty: 'standard',
          question: '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक.',
          hint: 'यदि अटके तो c11_hin_a_cbse_13_001 (निराला/छायावाद) और c11_hin_ar_cbse_16_001 (प्रतिरोध की.',
          misconception: 'छात्र समझते हैं कि अज्ञेय का \'अकेला\' शब्द नकारात्मक/निराशावादी है — "कोई साथ नहीं, मैं हार गया"। वास्तव में अज्ञेय के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के',
                  options: ['\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि समस्त बिंबों,'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_13_001 (निराला/छायावाद) और c11_hin_ar_cbse_16_001 (प्रतिरोध की कविता).',
                  misconception: 'छात्र समझते हैं कि अज्ञेय का \'अकेला\' शब्द नकारात्मक/निराशावादी है — "कोई साथ नहीं, मैं हार गया"। वास्तव में अज्ञेय के यहाँ \'अकेला\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "अकेला और एकांत शब्दकोश में खोजें, दोनों के भाव-अंतर लिखें।" चरण 2: कविता की पंक्ति "सचाई की एक.', 'दुखी आदमी या दृढ़ आदमी?" चरण 3: अज्ञेय के जीवन से एक प्रसंग दें (जेल में लिखी कविताएँ, संपादकीय संघर्ष) — सिद्ध करें कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः.',
          hint: 'यदि फंसे हैं तो c11_hin_a_cbse_03_002 (कथानक और आख्यान-संरचना) की समीक्षा करें — वहाँ.',
          misconception: 'छात्र अक्सर पद्यांश-वार भावार्थ में प्रत्येक पद्यांश को अलग-अलग अर्थ की इकाई मानते हैं और क्रम या भाव के विकास को नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि समस्त बिंबों,'],
                  hint: 'यदि फंसे हैं तो c11_hin_a_cbse_03_002 (कथानक और आख्यान-संरचना) की समीक्षा करें — वहाँ सीखा गया कि.',
                  misconception: 'छात्र अक्सर पद्यांश-वार भावार्थ में प्रत्येक पद्यांश को अलग-अलग अर्थ की इकाई मानते हैं और क्रम या भाव के विकास को नहीं देखते — जैसे पहले.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए: "यदि ये तीन पद्यांश एक फिल्म के तीन दृश्य हैं, तो क्या पहला दृश्य अंतिम से अलग भाव देता है?', 'क्या हीरो की सोच बदल रही है?" फिर पद्यांशों को क्रम में पढ़कर भाव के बदलाव को underline करने के लिए कहिए — जैसे पहले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे — छंद (meter).',
          hint: 'यदि छात्र तुकबंदी योजना निर्धारित करने में कठिनाई महसूस कर रहा है, तो.',
          misconception: 'छात्र अक्सर मानते हैं कि तुकबंदी योजना केवल अंतिम शब्दों की सटीक ध्वनि समानता पर आधारित होती है, जबकि हिंदी कविताओं में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे',
                  options: ['काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि समस्त बिंबों,'],
                  hint: 'यदि छात्र तुकबंदी योजना निर्धारित करने में कठिनाई महसूस कर रहा है, तो c11_hin_a_cbse_03_008.',
                  misconception: 'छात्र अक्सर मानते हैं कि तुकबंदी योजना केवल अंतिम शब्दों की सटीक ध्वनि समानता पर आधारित होती है, जबकि हिंदी कविताओं में असमान तुक (जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो शब्द pairs दें: (1) "बूँद" और "कूद" (सटीक तुक), (2) "बूँद" और "सूँ" (nasalized vs non-nasalized, लेकिन समान.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि समस्त.',
          hint: 'यदि प्रतीक-बोध या रस-निष्पत्ति में अटकें, तो Class 11 के \'जाग तुझको दूर जाना — केंद्रीय.',
          misconception: 'छात्र प्रायः समझते हैं कि \'यह दीप अकेला\' **निराशा की कविता** है क्योंकि दीप अकेला है और \'मैंने देखा एक बूँद\' **आशा की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि समस्त बिंबों,',
                  options: ['केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि समस्त बिंबों,', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'यदि प्रतीक-बोध या रस-निष्पत्ति में अटकें, तो Class 11 के \'जाग तुझको दूर जाना — केंद्रीय भाव और रस\'.',
                  misconception: 'छात्र प्रायः समझते हैं कि \'यह दीप अकेला\' **निराशा की कविता** है क्योंकि दीप अकेला है और \'मैंने देखा एक बूँद\' **आशा की कविता** है क्योंकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दोनों कविताएँ एक साथ रखकर **\'मैं\' (कर्ता) के क्रियापदों** (जलता हूँ, बरसाता हूँ, दिखाता हूँ / हूँ, सामना करता.', 'फिर पूछें: ये क्रियाएँ निष्क्रिय हैं या सक्रिय?', '\'अकेला\' शब्द के साथ आने वाले विशेषणों/क्रियाओं को मिलाकर पढ़ें: \'अकेला...', 'बरसाता हूँ\' — अकेलापन कर्तव्य का साथी है, शत्रु नहीं। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_005', difficulty: 'standard',
          question: 'छंद काव्य की वह निश्चित मात्रिक या वर्णिक संरचना है जिसमें प्रत्येक चरण.',
          hint: 'यदि गुरु-लघु निर्णय में अटके तो कक्षा 11 के \'मात्रा-निर्णय नियम\' (संयुक्त व्यंजन.',
          misconception: 'छात्र समझते हैं कि छंद पहचानना = केवल मात्राएँ गिन लेना; वे भूल जाते हैं कि गण-विधान, यति-स्थान, गति और अनुप्रास/यमक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद काव्य की वह निश्चित मात्रिक या वर्णिक संरचना है जिसमें प्रत्येक चरण (पंक्ति) में',
                  options: ['छंद काव्य की वह निश्चित मात्रिक या वर्णिक संरचना है जिसमें प्रत्येक चरण (पंक्ति) में', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'यदि गुरु-लघु निर्णय में अटके तो कक्षा 11 के \'मात्रा-निर्णय नियम\' (संयुक्त व्यंजन, अनुनासिक.',
                  misconception: 'छात्र समझते हैं कि छंद पहचानना = केवल मात्राएँ गिन लेना; वे भूल जाते हैं कि गण-विधान, यति-स्थान, गति और अनुप्रास/यमक मिलकर ही \'छंद\' बनाते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['कक्षा 11 के छंद-निरूपण नोड्स (c11_hin_a_cbse_13_005, c11_hin_a_cbse_14_005, c11_hin_a_cbse_15_005.', '\'यह दीप अकेला\' के पहले तीन चरणों को कापी पर लिखकर प्रत्येक अक्षर के नीचे मात्रा (1/2) लिखें, फिर गण बनाएँ। 3.', 'किसी सहपाठी/शिक्षक से अपने गण-विधान का मिलान कराएँ; जहाँ अंतर हो, वहाँ गुरु-लघु निर्णय पर पुनर्विचार करें। 4.', 'अंत में दोनों कविताएँ लयपूर्वक पढ़कर रिकॉर्ड करें और स्वयं सुनें — जहाँ अटकें, वहीं यति/गति की समस्या है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_006', difficulty: 'standard',
          question: 'साहित्यिक युक्तियाँ (अलंकार) वे भाषा के प्रयोग हैं जो अर्थ को सजाते, स्पष्ट.',
          hint: 'यदि अलंकार की पहचान में कठिनाई हो तो कक्षा 11 के节点 c11_hin_a_cbse_03_008 और.',
          misconception: 'छात्र अक्सर अलंकार को केवल भाषा की सजावट मानते हैं और यह मानते हैं कि यदि किसी पंक्ति में podobn शब्द हैं (जैसे "बूँद".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'साहित्यिक युक्तियाँ (अलंकार) वे भाषा के प्रयोग हैं जो अर्थ को सजाते, स्पष्ट करते या',
                  options: ['साहित्यिक युक्तियाँ (अलंकार) वे भाषा के प्रयोग हैं जो अर्थ को सजाते, स्पष्ट करते या', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'यदि अलंकार की पहचान में कठिनाई हो तो कक्षा 11 के节点 c11_hin_a_cbse_03_008 और c11_hin_a_cbse_03_009.',
                  misconception: 'छात्र अक्सर अलंकार को केवल भाषा की सजावट मानते हैं और यह मानते हैं कि यदि किसी पंक्ति में podobn शब्द हैं (जैसे "बूँद", "बूँदी") तो वह.' }
          ],
            remediations: { 'podobn': { steps: ['छात्र कोまず कविता की पंक्तियों को धीरे-धीरे głosem पढ़ने के लिए कहें और प्रत्येक शब्द के उच्चारण पर ध्यान दें — फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
