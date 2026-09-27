import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch10_p2: SimDef = {
    id: 'v3_c7_hin_ch10_p2',
    title: 'मीरा के पद · Part 2/3',
    subtitle: 'यह नोड केवल मीरा के पदों में प्रयुक्त **प्रतीक और बिंब** की पहचान, विश्लेषण और.',
    classLevel: 7, subject: 'hin', topic: 'मीरा के पद · Part 2/3',
    chapters: ['c7_hin_ch10'],
    nodeIds: ['c7_hin_cbse_10_007', 'c7_hin_cbse_10_008', 'c7_hin_cbse_10_009', 'c7_hin_cbse_10_010', 'c7_hin_cbse_10_011', 'c7_hin_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'क्या तुमने कभी किसी पुराने गाने की धुन सुनी और अचानक बचपन की याद आ गई?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'नीचे दिए गए पदांश में से एक वस्तुनिष्ठ और एक आशय-सूचक प्रश्न बनाइए: "मेरे तो गिरधर गोपाल, दूसरो न कोई।"',
        options: ['वस्तुनिष्ठ: "मेरे तो गिरधर गोपाल" में \'गिरधर\' किसे कहा गया है?', 'आशय-सूचक', 'long answer'],
        answer: 'वस्तुनिष्ठ: "मेरे तो गिरधर गोपाल" में \'गिरधर\' किसे कहा गया है?',
        hook: 'Students believe that "आशय-सूचक" just means "long answer" and "वस्तुनिष्ठ" means "short answer." They write a paragraph.',
    },
    teaching: [
        { title: 'मीरा के पद — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**प्रतीक (Symbol)** वह शब्द या वस्तु है जो अपने शाब्दिक अर्थ से आगे जाकर एक गहरा, अमूर्त भाव या विचार व्यक्त करता है। **बिंब (Imagery)** वह भाषा-प्रयोग है जो पाठक की पाँचों इन्द्रियों (दृष्टि, श्रवण.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['मीरा के पद —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_hin_cbse_10_012', title: 'मीरा के पद — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Have you ever tried to follow a recipe where some steps say "add 1 tsp salt" (exact) and others say "cook until golden brown" (you have to judge)?',
            decisions: [{ prompt: 'पद "पायो जी मैंने राम रतन धन पायो" में "राम रतन धन" शब्द किसके लिए प्रयुक्त हुआ है? (वस्तुनिष्ठ प्रकार)', options: [
                { text: 'उत्तर: "राम रतन धन" मीरा के आराध्य कृष्ण/राम के लिए प्रयुक्त हुआ है। गलत उत्तर (जैसे', outcome: 'उत्तर: "राम रतन धन" मीरा के आराध्य कृष्ण/राम के लिए प्रयुक्त हुआ है। गलत उत्तर (जैसे "मीरा की.' },
                { text: 'आशय-सूचक', outcome: 'Not quite — Students believe that "आशय-सूचक" just means "long answer" and "वस्तुनिष्ठ" means "short answer.".', reveals: 'just-means-long-answer-and' },
                { text: 'long answer', outcome: 'Not quite — Students believe that "आशय-सूचक" just means "long answer" and "वस्तुनिष्ठ" means "short answer.".', reveals: 'just-means-long-answer-and' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hin_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through मीरा के पद like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? मीरा के पद · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — मीरा के पद · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_007', difficulty: 'standard',
          question: '**प्रतीक (Symbol)** वह शब्द या वस्तु है जो अपने शाब्दिक अर्थ से आगे जाकर एक.',
          hint: 'यदि छात्र अटका हो तो **कक्षा 6 के नोड c6_hin_cbse_01_008 (बिंब और रूपक) तथा.',
          misconception: '**सबसे आम गलतफहमी:** छात्र **प्रतीक और बिंब को एक ही समझ लेते हैं** — दोनों को "चित्रात्मक भाषा" मानकर अंतर नहीं करते।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**प्रतीक (Symbol)** वह शब्द या वस्तु है जो अपने शाब्दिक अर्थ से आगे जाकर एक गहरा, अमूर्त',
                  options: ['**प्रतीक (Symbol)** वह शब्द या वस्तु है जो अपने शाब्दिक अर्थ से आगे जाकर एक गहरा, अमूर्त', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)'],
                  hint: 'यदि छात्र अटका हो तो **कक्षा 6 के नोड c6_hin_cbse_01_008 (बिंब और रूपक) तथा c6_hin_cbse_01_009.',
                  misconception: '**सबसे आम गलतफहमी:** छात्र **प्रतीक और बिंब को एक ही समझ लेते हैं** — दोनों को "चित्रात्मक भाषा" मानकर अंतर नहीं करते। **ठीक-ठीक भ्रम:** वे.' }
          ],
            remediations: { '6-nod-c6-hin-cbse': { steps: ['**चरण 1 — भेद स्पष्ट करो (2 मिनट):** छात्र को दो कॉलम बनाने को कहो: **बिंब** (इन्द्रिय: देखना/सुनना/सूँघना/छूना/चखना).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_008', difficulty: 'standard',
          question: 'मीरा के पदों का मुख्य भाव **निर्गुण ब्रह्म की सगुन उपासना के माध्यम से कृष्ण के.',
          hint: 'यदि फँसें तो: c7_hin_cbse_10_002 (भावार्थ) और c7_hin_cbse_10_007 (प्रतीक/बिंब) दोहराएँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि मीरा का मुख्य भाव **"कृष्ण भक्ति"** मात्र है — जैसे कोई मंदिर जाकर पूजा करता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मीरा के पदों का मुख्य भाव **निर्गुण ब्रह्म की सगुन उपासना के माध्यम से कृष्ण के प्रति',
                  options: ['मीरा के पदों का मुख्य भाव **निर्गुण ब्रह्म की सगुन उपासना के माध्यम से कृष्ण के प्रति', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)'],
                  hint: 'यदि फँसें तो: c7_hin_cbse_10_002 (भावार्थ) और c7_hin_cbse_10_007 (प्रतीक/बिंब) दोहराएँ — विशेष रूप.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि मीरा का मुख्य भाव **"कृष्ण भक्ति"** मात्र है — जैसे कोई मंदिर जाकर पूजा करता है। **गलत तर्क:** वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ:** छात्र से कहो: *"पद \'मेरे तो गिरधर गोपाल\' को जोर से पढ़ो। \'मेरे\' और \'दूसरो न कोई\' पर जोर दो। अब बताओ: मीरा.', '**तुलना:** सामान्य भक्ति (मंदिर में आरती) और मीरा की भक्ति (विष पीना, महल छोड़ना, साधुओं संग नाचना) का **सारणी बनवाओ**.', '**व्यक्तिगत जोड़:** पूछो: *"क्या कोई ऐसा है जिसके लिए तुम अपनी सबसे प्रिय चीज़ छोड़ दोगे बिना शर्त?', 'मीरा के लिए वह कृष्ण हैं।"* 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_009', difficulty: 'standard',
          question: '**गौण भाव (Subsidiary Sentiment):** काव्य में मुख्य रस/भाव को पुष्ट करने वाला.',
          hint: 'यदि मुख्य भाव पहचानने में अटके, तो c7_hin_cbse_10_004 (केंद्रीय भाव और रस) और.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'विस्तार से लिखे गए प्रसंग\' को \'गौण भाव\' मान लेते हैं** — क्योंकि मीरा के पदों में लोक-प्रसंग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**गौण भाव (Subsidiary Sentiment):** काव्य में मुख्य रस/भाव को पुष्ट करने वाला सहायक भाव',
                  options: ['**गौण भाव (Subsidiary Sentiment):** काव्य में मुख्य रस/भाव को पुष्ट करने वाला सहायक भाव', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)'],
                  hint: 'यदि मुख्य भाव पहचानने में अटके, तो c7_hin_cbse_10_004 (केंद्रीय भाव और रस) और c7_hin_cbse_10_008.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'विस्तार से लिखे गए प्रसंग\' को \'गौण भाव\' मान लेते हैं** — क्योंकि मीरा के पदों में लोक-प्रसंग (गोपियों की बातें.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः परिभाषा दोहराओ:** "गौण भाव = मुख्य भाव का सहायक (सेवक), विषयांतर = मुख्य प्रसंग से भटका हुआ मुसाफिर।" — इसे.', '**दृश्य सहारा (Visual Anchor):** बोर्ड पर एक **तीर आरेख** बनाओ: मुख्य भाव ←— (गौण भाव) — मुख्य भाव → (विषयांतर: टूटा.', 'मुख्य भाव की ओर या दूर?" 3.', '**अभ्यास पद दें:** मीरा का एक छोटा पद दो (4-5 पंक्तियाँ) और छात्रों से **रंगीन पेंसिल** से चिह्नित करवाओ: **लाल**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_010', difficulty: 'standard',
          question: 'पदावली: कठिन शब्द और मुहावरे — मीरा के पदों में प्रयुक्त ब्रजभाषा/राजस्थानी मूल.',
          hint: 'अगर अटके तो c7_hin_cbse_10_002 (पद्यांश-वार भावार्थ) पर वापस जाओ — पद का भाव समझते ही.',
          misconception: 'छात्र **मुहावरों का शाब्दिक अर्थ ही अंतिम मान लेते हैं** — जैसे "पग घुंघरू बाँध मीरा नाची रे" पढ़कर वे लिख देते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: कठिन शब्द और मुहावरे',
                  options: ['पदावली: कठिन शब्द और मुहावरे', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)'],
                  hint: 'अगर अटके तो c7_hin_cbse_10_002 (पद्यांश-वार भावार्थ) पर वापस जाओ — पद का भाव समझते ही शब्दों के.',
                  misconception: 'छात्र **मुहावरों का शाब्दिक अर्थ ही अंतिम मान लेते हैं** — जैसे "पग घुंघरू बाँध मीरा नाची रे" पढ़कर वे लिख देते हैं: "मीरा ने घुंघरू बाँधकर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र को पद की 2 पंक्तियाँ जोर से पढ़वाओ और पूछो — "यहाँ कौन-सा शब्द अटपटा लगा?" **चरण 2**: उस शब्द का.', 'मीरा तो शब्दों का नया अर्थ गढ़ रही हैं।" **मुख्य सूत्र**: प्रसंग (context) > शब्दकोश (dictionary) — इसे दीवार पर लिखवा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग वह काव्यात्मक स्वतंत्रता है जहाँ कवि व्याकरण के कठोर.',
          hint: 'यदि अटका हुआ लगे तो कक्षा 6 के \'व्याकरण: पाठ में भाषा-प्रयोग\' (c6_hin_cbse_01_011) के.',
          misconception: 'छात्र समझते हैं कि मीरा \'अशुद्ध\' ब्रजभाषा लिखती हैं क्योंकि वे अनपढ़ थीं या व्याकरण नहीं जानती थीं। **सच्चाई**: मीरा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग वह काव्यात्मक स्वतंत्रता है जहाँ कवि व्याकरण के कठोर नियमों (जैसे',
                  options: ['पद्य में भाषा-प्रयोग वह काव्यात्मक स्वतंत्रता है जहाँ कवि व्याकरण के कठोर नियमों (जैसे', 'मीरा (1498–1547) मध्यकालीन हिंदी साहित्य की प्रमुख कवयित्री हैं जिन्होंने कृष्ण-भक्ति को', 'पद्यांश-वार भावार्थ का अर्थ है', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के विभिन्न भागों (जैसे स्थायी, अंतरा, चरण)'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा 6 के \'व्याकरण: पाठ में भाषा-प्रयोग\' (c6_hin_cbse_01_011) के कारक और काल.',
                  misconception: 'छात्र समझते हैं कि मीरा \'अशुद्ध\' ब्रजभाषा लिखती हैं क्योंकि वे अनपढ़ थीं या व्याकरण नहीं जानती थीं। **सच्चाई**: मीरा राजकुमारी थीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल वाक्य दें: "मैं राम को भजता हूँ" — फिर पूछें: "इसे गाने लायक कैसे बनाओगे?" (उत्तर: "राम भजत हूँ" — कारक.', 'फिर मीरा की एक पंक्ति दें: "गिरधर मोहे चाकर राखो" — पहचानने को कहें: यहाँ \'मोहे\' (मुझे) कारक है, \'राखो\' आज्ञार्थ.', 'अंत में तुलना कराएँ: मानक हिन्दी अनुवाद लिखवाएँ और पूछें — "कौन-सा रूप अधिक मार्मिक लगा और क्यों?" — इससे वे \'नियम\' और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (objective questions) test literal recall of facts, words,.',
          hint: 'Review "प्रतीक और बिंब" (c7_hin_cbse_10_007) and "पदावली: कठिन शब्द" (c7_hin_cbse_10_010).',
          misconception: 'Students believe that "आशय-सूचक" just means "long answer" and "वस्तुनिष्ठ" means "short answer." They write a paragraph.',
          parts: [
                { id: 'a', prompt: 'नीचे दिए गए पदांश में से एक वस्तुनिष्ठ और एक आशय-सूचक प्रश्न बनाइए: "मेरे तो गिरधर गोपाल, दूसरो न कोई।"', answer: 'वस्तुनिष्ठ: "मेरे तो गिरधर गोपाल" में \'गिरधर\' किसे कहा गया है?',
                  options: ['वस्तुनिष्ठ: "मेरे तो गिरधर गोपाल" में \'गिरधर\' किसे कहा गया है?', 'आशय-सूचक', 'long answer', 'वस्तुनिष्ठ'],
                  hint: 'Review "प्रतीक और बिंब" (c7_hin_cbse_10_007) and "पदावली: कठिन शब्द" (c7_hin_cbse_10_010) — without.',
                  misconception: 'Students believe that "आशय-सूचक" just means "long answer" and "वस्तुनिष्ठ" means "short answer." They write a paragraph for an inferential.' }
          ],
            remediations: { 'just-means-long-answer-and': { steps: ['Take a single couplet (e.g., "मेरे तो गिरधर गोपाल, दूसरो न कोई") and write BOTH question types on sticky notes: one.', 'Answer each aloud: for the first, point to the word; for the second, say "यह शब्द *क्यों* चुना गया?" and explain the.', 'Practice with 3 more couplets daily until the "point vs.', 'explain" switch becomes automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_10_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "आशय-सूचक" just means "long answer" and "वस्तुनिष्ठ" means "short answer." They write a paragraph.',
          parts: [
                { id: 'a', prompt: 'एक छात्र ने आशय-सूचक प्रश्न "मीरा \'साँवरिया\' संबोधन क्यों प्रयोग करती हैं?" का उत्तर दिया: "क्योंकि कृष्ण का रंग साँवला है।" इस उत्तर को 10 में से कितने अंक.', answer: '2/10 अंक। उत्तर शाब्दिक तथ्य तक सीमित है',
                  options: ['2/10 अंक। उत्तर शाब्दिक तथ्य तक सीमित है', 'आशय-सूचक', 'long answer', 'वस्तुनिष्ठ'],
                  hint: 'Review "प्रतीक और बिंब" (c7_hin_cbse_10_007) and "पदावली: कठिन शब्द" (c7_hin_cbse_10_010) — without.',
                  misconception: 'Students believe that "आशय-सूचक" just means "long answer" and "वस्तुनिष्ठ" means "short answer." They write a paragraph for an inferential.' }
          ],
            remediations: { 'just-means-long-answer-and': { steps: ['Take a single couplet (e.g., "मेरे तो गिरधर गोपाल, दूसरो न कोई") and write BOTH question types on sticky notes: one.', 'Answer each aloud: for the first, point to the word; for the second, say "यह शब्द *क्यों* चुना गया?" and explain the.', 'Practice with 3 more couplets daily until the "point vs.', 'explain" switch becomes automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
