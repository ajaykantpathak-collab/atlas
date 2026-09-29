import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch03_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'इस नोड में केवल **प्रतीक** और **बिंब** की पहचान, वर्गीकरण, कार्यविधि और बोध-प्रश्नों में.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c10_hin_ks_ch03'],
    nodeIds: ['c10_hin_ks_cbse_03_007', 'c10_hin_ks_cbse_03_008', 'c10_hin_ks_cbse_03_009', 'c10_hin_ks_cbse_03_010', 'c10_hin_ks_cbse_03_011', 'c10_hin_ks_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'क्षितिज भाग-2 — पाठ 3\' में क्षितिज-भाग-2-—-पाठ-3 जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पद्य में \'अन्यथा\' (syntax inversion) का सबसे सरल उदाहरण कौन-सा है? एक वाक्य में लिखिए।',
        options: ['उदाहरण: "राम वन गयो" (पद्य) बनाम "राम वन गया" (गद्य)', 'incorrect', 'broken'],
        answer: 'उदाहरण: "राम वन गयो" (पद्य) बनाम "राम वन गया" (गद्य)',
        hook: 'Students believe poetic grammar is "incorrect" or "broken" Hindi that should be "corrected" to standard prose grammar.',
    },
    teaching: [
        { title: 'पाठ 3 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'क्षितिज भाग-2 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — साहित्यिक', 'पाठ 3 — मुख्य', 'पाठ 3 — गौण', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_03_011', title: 'पाठ 3 — व्याकरण: पद्य में भाषा-प्रयोग',
          caseStudy: { intro: '\'क्षितिज भाग-2 — पाठ 3\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'पद्य में \'अन्यथा\' (syntax inversion) का सबसे सरल उदाहरण कौन-सा है? एक वाक्य में लिखिए।', options: [
                { text: 'उदाहरण: "राम वन गयो" (पद्य) बनाम "राम वन गया" (गद्य)', outcome: 'उदाहरण: "राम वन गयो" (पद्य) बनाम "राम वन गया" (गद्य) — यहाँ क्रिया \'गयो\' प्राचीन रूप है और कर्तृ.' },
                { text: 'incorrect', outcome: 'Not quite — Students believe poetic grammar is "incorrect" or "broken" Hindi that should be "corrected".', reveals: 'poetic-grammar-is-incorrect-or' },
                { text: 'broken', outcome: 'Not quite — Students believe poetic grammar is "incorrect" or "broken" Hindi that should be "corrected".', reveals: 'poetic-grammar-is-incorrect-or' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_03_012', title: 'पाठ 3 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'क्षितिज भाग-2 — पाठ 3\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'क्षितिज भाग-2।',
            decisions: [{ prompt: 'पाठ 3 की कविता में से एक वस्तुनिष्ठ प्रश्न का उदाहरण दीजिए और बताइए कि वह वस्तुनिष्ठ क्यों है?', options: [
                { text: 'उदाहरण: "कविता में किस ऋतु का वर्णन है?"', outcome: 'उदाहरण: "कविता में किस ऋतु का वर्णन है?" — यह वस्तुनिष्ठ है क्योंकि उत्तर पाठ में स्पष्टतः दिया है.' },
                { text: 'मेरी राय में', outcome: 'Not quite — Students believe **आशय-सूचक प्रश्नों का उत्तर "मेरी राय में..." या "मुझे लगता है..." से शुरू होता.', reveals: 'wrong-idea' },
                { text: 'मुझे लगता है', outcome: 'Not quite — Students believe **आशय-सूचक प्रश्नों का उत्तर "मेरी राय में..." या "मुझे लगता है..." से शुरू होता.', reveals: 'wrong-idea' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_03_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_007', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो c10_hin_ks_cbse_03_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_03_006.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **प्रतीक** और **रूपक (Metaphor)** को एक मान लेते हैं। वे लिखते हैं: "कवि ने \'नदी\' को रूपक की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'क्षितिज भाग-2 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 3\' का कथानक — \'क्षितिज भाग-2 — पाठ 3\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_03_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_03_006 (अलंकार) दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **प्रतीक** और **रूपक (Metaphor)** को एक मान लेते हैं। वे लिखते हैं: "कवि ने \'नदी\' को रूपक की तरह प्रयुक्त किया.' }
          ],
            remediations: { 'metaphor': { steps: ['छात्र से कहें: "एक वाक्य लिखो जहाँ \'दीपक\' रूपक हो (उद: \'वह दीपक है\') और दूसरा जहाँ \'दीपक\' प्रतीक हो (उद: \'दीपक जलता.', 'दोनों में अंतर स्पष्ट करें: रूपक = पहचान/तुलना (He *is* a lamp); प्रतीक = निरूपण/संकेत (Lamp *stands for* hope)। 3.', 'कविता के दो पद दें — एक में रूपक, दूसरे में प्रतीक — छात्र को छाँटने को कहें। 4.', 'अंत में बोर्ड-शैली प्रश्न दें: "कवि ने \'X\' को प्रतीक रूप में प्रयुक्त किया है — स्पष्ट कीजिए।" छात्र को 3-चरणीय उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_008', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 3\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **पद-वार भावार्थ (c10_hin_ks_cbse_03_002)** दोहराएँ और प्रत्येक पद के लिए.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'कविता का सारांश\' (summary)** को **\'मुख्य भाव\' (central idea)** मान लेते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 3\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'क्षितिज भाग-2 — पाठ 3\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 3\' का कथानक — \'क्षितिज भाग-2 — पाठ 3\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो **पद-वार भावार्थ (c10_hin_ks_cbse_03_002)** दोहराएँ और प्रत्येक पद के लिए "कवि क्या कह.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'कविता का सारांश\' (summary)** को **\'मुख्य भाव\' (central idea)** मान लेते हैं। **उदाहरण:** कविता "पर्वत और.' }
          ],
            remediations: { 'summary-central-idea': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र से कहें: "किसी फ़िल्म का सारांश बताओ (क्या हुआ), फिर उसका संदेश बताओ (क्या सीखा)।.', 'कविता में भी ऐसा ही है।" 2.', '**चरण 2 — \'क्यों\' पूछने का अभ्यास:** हर पद के भावार्थ के बाद पूछें: "कवि यह **क्यों** कह रहा है?', 'वह हमें **क्या** समझाना चाहता है?" — उत्तर में आए \'क्यों/क्या\' को जोड़कर मुख्य भाव बनाएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_009', difficulty: 'standard',
          question: 'गौण भाव वह सूक्ष्म, सहायक अनुभव है जो मुख्य भाव को सपोर्ट करता है लेकिन.',
          hint: 'यदि फंसे तो नोड c10_hin_ks_cbse_03_004 (केंद्रीय भाव और रस) की मुख्य भाव पहचान की.',
          misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव का पर्याय मान लेते हैं और किसी भी सूक्ष्म भाव को “मुख्य” कह देते हैं; इसके साथ वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव वह सूक्ष्म, सहायक अनुभव है जो मुख्य भाव को सपोर्ट करता है लेकिन स्वतंत्र रूप से',
                  options: ['गौण भाव वह सूक्ष्म, सहायक अनुभव है जो मुख्य भाव को सपोर्ट करता है लेकिन स्वतंत्र रूप से', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 3\' का कथानक — \'क्षितिज भाग-2 — पाठ 3\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि फंसे तो नोड c10_hin_ks_cbse_03_004 (केंद्रीय भाव और रस) की मुख्य भाव पहचान की प्रक्रिया को.',
                  misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव का पर्याय मान लेते हैं और किसी भी सूक्ष्म भाव को “मुख्य” कह देते हैं; इसके साथ वे विषयांतर को केवल विषय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो‑तीन छोटे उदाहरण दें जहाँ मुख्य भाव स्पष्ट हो (जैसे प्रेम, साहस) और साथ‑में एक पंक्ति में गौण भाव दिखे (जैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_010', difficulty: 'standard',
          question: 'पदावली से तात्पर्य कविता में प्रयुक्त विशिष्ट शब्दों (कठिन शब्दों) और मुहावरों.',
          hint: 'अगर अटके तो "पद्यांश-वार भावार्थ" (c10_hin_ks_cbse_03_002) दोबारा पढ़ें और प्रत्येक पद का.',
          misconception: 'छात्र समझते हैं कि कठिन शब्दों के शब्दकोश अर्थ रट लेने से काम चल जाएगा। वे मुहावरों का शाब्दिक अर्थ लिख देते हैं (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली से तात्पर्य कविता में प्रयुक्त विशिष्ट शब्दों (कठिन शब्दों) और मुहावरों (लोकप्रिय',
                  options: ['पदावली से तात्पर्य कविता में प्रयुक्त विशिष्ट शब्दों (कठिन शब्दों) और मुहावरों (लोकप्रिय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 3\' का कथानक — \'क्षितिज भाग-2 — पाठ 3\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'अगर अटके तो "पद्यांश-वार भावार्थ" (c10_hin_ks_cbse_03_002) दोबारा पढ़ें और प्रत्येक पद का सार एक.',
                  misconception: 'छात्र समझते हैं कि कठिन शब्दों के शब्दकोश अर्थ रट लेने से काम चल जाएगा। वे मुहावरों का शाब्दिक अर्थ लिख देते हैं (जैसे "हाथ धोकर पीछे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को कविता के 2-3 पद दें और कहें "हर कठिन शब्द के आगे दो कॉलम बनाओ: शब्दकोश अर्थ / कविता-अर्थ"। चरण 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_011', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 3\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'Review Class 9 Hindi Vyakaran chapters: संधि (स्वरा/व्यंजन/विसर्ग), समास (तत्पुरुष.',
          misconception: 'Students believe poetic grammar is "incorrect" or "broken" Hindi that should be "corrected" to standard prose grammar.',
          parts: [
                { id: 'a', prompt: 'पद्य में \'अन्यथा\' (syntax inversion) का सबसे सरल उदाहरण कौन-सा है? एक वाक्य में लिखिए।', answer: 'उदाहरण: "राम वन गयो" (पद्य) बनाम "राम वन गया" (गद्य)',
                  options: ['उदाहरण: "राम वन गयो" (पद्य) बनाम "राम वन गया" (गद्य)', 'incorrect', 'broken', 'corrected'],
                  hint: 'Review Class 9 Hindi Vyakaran chapters: संधि (स्वरा/व्यंजन/विसर्ग), समास (तत्पुरुष, कर्मधारय.',
                  misconception: 'Students believe poetic grammar is "incorrect" or "broken" Hindi that should be "corrected" to standard prose grammar.' }
          ],
            remediations: { 'poetic-grammar-is-incorrect-or': { steps: ['**Side-by-side table:** Take 5 lines from the chapter.', 'Make a 3-column table: (पद्य रूप | गद्य रूप | परिवर्तन का नाम + कारण).', 'Do this *with* the student — don\'t give ready-made.', '**Metre-counting drill:** For each line, count मात्राएँ (mātrās) in both forms.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_03_012', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 3\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो c10_hin_ks_cbse_03_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_03_004.',
          misconception: 'Students believe **आशय-सूचक प्रश्नों का उत्तर "मेरी राय में..." या "मुझे लगता है..." से शुरू होता है**.',
          parts: [
                { id: 'a', prompt: 'पाठ 3 की कविता में से एक वस्तुनिष्ठ प्रश्न का उदाहरण दीजिए और बताइए कि वह वस्तुनिष्ठ क्यों है?', answer: 'उदाहरण: "कविता में किस ऋतु का वर्णन है?"',
                  options: ['उदाहरण: "कविता में किस ऋतु का वर्णन है?"', 'मेरी राय में', 'मुझे लगता है', '**आशय-सूचक प्रश्नों का उत्तर "मेरी राय में'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_03_002 (पद्यांश-वार भावार्थ) और c10_hin_ks_cbse_03_004 (केंद्रीय भाव).',
                  misconception: 'Students believe **आशय-सूचक प्रश्नों का उत्तर "मेरी राय में..." या "मुझे लगता है..." से शुरू होता है**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान ड्रिल:** 10 मिश्रित प्रश्न दें, छात्र को प्रत्येक के आगे \'व\' (वस्तुनिष्ठ) या \'आ\' (आशय-सूचक) लिखने को कहें — 2.', '**साक्ष्य-खोज खेल:** एक आशय-सूचक प्रश्न दें (जैसे "कवि प्रकृति को शिक्षक क्यों मानते हैं?"), छात्र को 3 मिनट में कविता.', '**PEI टेम्पलेट अभ्यास:** वही प्रश्न लें, छात्र से बुलवाएँ: "दावा: कवि प्रकृति को शिक्षक मानते हैं। प्रमाण: पद 2 में.', '**मॉडल उत्तर दिखाएँ:** बोर्ड के टॉपर उत्तर और औसत उत्तर साथ रखें, अंतर स्पष्ट करें — टॉपर हर दावे के बाद कोष्ठक में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
