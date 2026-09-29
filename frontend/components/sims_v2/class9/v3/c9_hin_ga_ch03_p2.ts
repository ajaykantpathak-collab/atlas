import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch03_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'इस नोड में केवल गौण विषयों की पहचान, उनका मुख्य विषय से अंतर्संबंध, और पाठ की संरचना में.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c9_hin_ga_ch03'],
    nodeIds: ['c9_hin_ga_cbse_03_007', 'c9_hin_ga_cbse_03_008', 'c9_hin_ga_cbse_03_009', 'c9_hin_ga_cbse_03_010', 'c9_hin_ga_cbse_03_011', 'c9_hin_ga_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'उपभोक्तावाद की संस्कृति\' में उपभोक्तावाद, संस्कृति, समाज, मूल्य जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: '"आशय-सूचक प्रश्नों के उत्तर में विद्यार्थी अपनी व्यक्तिगत राय लिख सकते हैं क्योंकि उत्तर पाठ में नहीं होता।" — इस कथन का मूल्यांकन कीजिए। क्या यह बोर्ड परीक्षा.',
        options: ['**Correct Answer:** **अनुचित।** आशय-सूचक प्रश्नों का उत्तर \'व्यक्तिगत राय\' नहीं,', 'हाँ, क्योंकि उत्तर पाठ में नहीं है', 'आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढना पड़ता है'],
        answer: '**Correct Answer:** **अनुचित।** आशय-सूचक प्रश्नों का उत्तर \'व्यक्तिगत राय\' नहीं,',
        hook: '**Specific Error:** Students believe "आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढना पड़ता है" (The answer.',
    },
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: '\'उपभोक्तावाद की संस्कृति\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_03_012', title: 'पाठ 3 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'उपभोक्तावाद की संस्कृति\' के तथ्य: रचनाकार (निबंध), विषय उपभोक्तावाद की समीक्षा।',
            decisions: [{ prompt: 'पाठ 3 में \'वस्तुनिष्ठ प्रश्न\' और \'आशय-सूचक प्रश्न\' के बीच मूल अंतर क्या है? केवल परिभाषा की दृष्टि से स्पष्ट कीजिए।', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ प्रश्न का उत्तर पाठ में स्पष्ट रूप से लिखा होता है', outcome: '**Correct Answer:** वस्तुनिष्ठ प्रश्न का उत्तर पाठ में स्पष्ट रूप से लिखा होता है (तथ्य/विवरण).' },
                { text: 'वस्तुनिष्ठ प्रश्न छोटे होते हैं और आशय-सूचक बड़े', outcome: 'Not quite — **Specific Error:** Students believe "आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढना.', reveals: 'specific-error-students-believe' },
                { text: 'आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढना पड़ता है', outcome: 'Not quite — **Specific Error:** Students believe "आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढना.', reveals: 'specific-error-students-believe' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_007', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटका हुआ लगे, तो नोड 006 (मुख्य विषय और संदेश) के \'कार्येड उदाहरण\' दोबारा करें और.',
          misconception: 'छात्र समझते हैं कि \'गौण\' का अर्थ \'महत्वहीन\' या \'सजावटी\' होता है, इसलिए वे गौण विषयों को परीक्षा में छोड़ देते हैं या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' के गौण विषय',
                  options: ['\'उपभोक्तावाद की संस्कृति\' के गौण विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ लगे, तो नोड 006 (मुख्य विषय और संदेश) के \'कार्येड उदाहरण\' दोबारा करें और मुख्य विषय के.',
                  misconception: 'छात्र समझते हैं कि \'गौण\' का अर्थ \'महत्वहीन\' या \'सजावटी\' होता है, इसलिए वे गौण विषयों को परीक्षा में छोड़ देते हैं या केवल मुख्य विषय का सार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "पाठ के 5 प्रसंग लिखो जो नायक के मुख्य लक्ष्य से सीधे नहीं जुड़े।" चरण 2: प्रत्येक प्रसंग के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_008', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फंसें तो मुख्य विषय (c9_hin_ga_cbse_03_006) और पात्र-चित्रण (c9_hin_ga_cbse_03_004).',
          misconception: 'छात्र अक्सर सोचते हैं कि यदि कोई पंक्ति में "जैसे" या "वैसे" शब्द है तो वह अवश्य रूपक होगा, जबकि वास्तव में इन शब्दों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' में बिंब (imagery)',
                  options: ['\'उपभोक्तावाद की संस्कृति\' में बिंब (imagery)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसें तो मुख्य विषय (c9_hin_ga_cbse_03_006) और पात्र-चित्रण (c9_hin_ga_cbse_03_004) नोड्स की.',
                  misconception: 'छात्र अक्सर सोचते हैं कि यदि कोई पंक्ति में "जैसे" या "वैसे" शब्द है तो वह अवश्य रूपक होगा, जबकि वास्तव में इन शब्दों की उपस्थिति simile को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए कि वह दो वाक्य लिखे: एक में "जैसे" का उपयोग करके और दूसरे बिना किसी जोड़ने वाले शब्द के दो चीज़ों की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_009', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती.',
          hint: 'यदि अटका हुआ लगे तो c9_hin_ga_cbse_03_008 (बिंब और रूपक) के "रूपक बनाम प्रतीक".',
          misconception: 'छात्र **विरोधाभास** को **विडंबना (irony)** या **विरोधी बात** मान लेते हैं। विडंबना में **स्थिति/परिणाम** अपेक्षा के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' में विरोधाभास',
                  options: ['\'उपभोक्तावाद की संस्कृति\' में विरोधाभास', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ लगे तो c9_hin_ga_cbse_03_008 (बिंब और रूपक) के "रूपक बनाम प्रतीक" तुलना-चार्ट को.',
                  misconception: 'छात्र **विरोधाभास** को **विडंबना (irony)** या **विरोधी बात** मान लेते हैं। विडंबना में **स्थिति/परिणाम** अपेक्षा के विपरीत होता है (जैसे.' }
          ],
            remediations: { 'irony': { steps: ['छात्र को तीन वाक्य दें: (क) "वह रोता हुआ हँसा" (विरोधाभास), (ख) "अग्निशमन कर्मी का घर जला" (विडंबना), (ग) "समय चोर है".', 'फिर दो चित्र दिखाएँ: (क) एक दृश्य में "सफेद झंडा" (सार्वभौमिक प्रतीक = समर्पण), (ख) दूसरे में पाठ-विशिष्ट "फटा हुआ.', 'छात्र से कहें: "विरोधाभास ढूंढने के लिए वाक्य में \'लेकिन/फिर भी\' डालकर देखो; प्रतीक ढूंढने के लिए पूछो \'यह वस्तु अपने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_010', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी.',
          hint: 'यदि अटके तो c9_hin_ga_cbse_03_003 (पाठ्य-परिवेश) दोहराएं — वातावरण की पहचान से शब्दों की.',
          misconception: 'छात्र मानते हैं कि **मुख्य शब्द = कठिन/क्लिष्ट/संस्कृतनिष्ठ शब्द** — इसलिए वे सरल शब्दों (जैसे "जाना", "रहना", "चुप").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' की पदावली',
                  options: ['\'उपभोक्तावाद की संस्कृति\' की पदावली', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c9_hin_ga_cbse_03_003 (पाठ्य-परिवेश) दोहराएं — वातावरण की पहचान से शब्दों की \'मुख्यता\'.',
                  misconception: 'छात्र मानते हैं कि **मुख्य शब्द = कठिन/क्लिष्ट/संस्कृतनिष्ठ शब्द** — इसलिए वे सरल शब्दों (जैसे "जाना", "रहना", "चुप") को मुख्य शब्द नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पाठ का कोई एक सरल वाक्य लो (जैसे \'वह चुप रहा\')। अब \'चुप\' को \'मौन\', \'शांत\', \'स्तब्ध\' से एक-एक कर.', 'चरण 3: स्वयं उदाहरण दें: "दरवाज़ा बंद किया" vs "दरवाज़ा ढाँप दिया" — दूसरा शब्द ढकने/छिपाने/रक्षा करने का भाव लाता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_011', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' में भाषा-प्रयोग — (निबंध) ने कैसे शब्द, वाक्य और शैली.',
          hint: 'यदि अटके तो: c9_hin_ga_cbse_03_010 (पदावली: मुख्य शब्द) दोहराएँ — विशेषतः शब्दों के.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "पाठ में भाषा-प्रयोग" का अर्थ है — कठिन/तत्सम शब्दों का प्रयोग, लंबे वाक्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' में भाषा-प्रयोग',
                  options: ['\'उपभोक्तावाद की संस्कृति\' में भाषा-प्रयोग', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो: c9_hin_ga_cbse_03_010 (पदावली: मुख्य शब्द) दोहराएँ — विशेषतः शब्दों के \'भावार्थ\' और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "पाठ में भाषा-प्रयोग" का अर्थ है — कठिन/तत्सम शब्दों का प्रयोग, लंबे वाक्य लिखना, और अलंकारों की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — *"पाठ 3 का कोई एक संवाद चुनो जो तुम्हें \'असभ्य/सरल\' लगा हो। उसे \'शुद्ध/संस्कृतनिष्ठ\' में.', 'क्या प्रभाव बदला?"* यही भाषा-प्रयोग का बोध है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_012', difficulty: 'standard',
          question: '\'उपभोक्तावाद की संस्कृति\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, review **कथानक और आख्यान-संरचना (c9_hin_ga_cbse_03_002)** to rebuild the mental.',
          misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढना पड़ता है" (The answer.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'उपभोक्तावाद की संस्कृति\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'उपभोक्तावाद की संस्कृति\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'उपभोक्तावाद की संस्कृति\' का कथानक', '\'उपभोक्तावाद की संस्कृति\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **कथानक और आख्यान-संरचना (c9_hin_ga_cbse_03_002)** to rebuild the mental map.',
                  misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढना पड़ता है" (The answer is *hidden* in the.' }
          ],
            remediations: { 'specific-error-students-believe': { steps: ['**Step-by-step Remediation:** 1.', '**Isolate the operation:** Give the student a 3-sentence micro-text (e.g., "Mother kept the food covered.', 'Son came, saw it, drank only water, left.").', 'What is the *inference*?" Force them to label each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_03_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढना पड़ता है" (The answer.',
          parts: [
                { id: 'a', prompt: '"आशय-सूचक प्रश्नों के उत्तर में विद्यार्थी अपनी व्यक्तिगत राय लिख सकते हैं क्योंकि उत्तर पाठ में नहीं होता।" — इस कथन का मूल्यांकन कीजिए। क्या यह बोर्ड परीक्षा.', answer: '**Correct Answer:** **अनुचित।** आशय-सूचक प्रश्नों का उत्तर \'व्यक्तिगत राय\' नहीं,',
                  options: ['**Correct Answer:** **अनुचित।** आशय-सूचक प्रश्नों का उत्तर \'व्यक्तिगत राय\' नहीं,', 'हाँ, क्योंकि उत्तर पाठ में नहीं है', 'आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढना पड़ता है'],
                  hint: 'If stuck, review **कथानक और आख्यान-संरचना (c9_hin_ga_cbse_03_002)** to rebuild the mental map.',
                  misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढना पड़ता है" (The answer is *hidden* in the.' }
          ],
            remediations: { 'specific-error-students-believe': { steps: ['**Step-by-step Remediation:** 1.', '**Isolate the operation:** Give the student a 3-sentence micro-text (e.g., "Mother kept the food covered.', 'Son came, saw it, drank only water, left.").', 'What is the *inference*?" Force them to label each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
