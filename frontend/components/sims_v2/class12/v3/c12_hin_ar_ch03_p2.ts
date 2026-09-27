import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch03_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch03_p2',
    title: 'कवतिा के बहाने, बात सीधी थी पर · Part 2/3',
    subtitle: 'Words as toys — and as traitors',
    classLevel: 12, subject: 'hin_ar', topic: 'कवतिा के बहाने, बात सीधी थी पर · Part 2/3',
    chapters: ['c12_hin_ar_ch03'],
    nodeIds: ['c12_hin_ar_cbse_03_007', 'c12_hin_ar_cbse_03_008', 'c12_hin_ar_cbse_03_009', 'c12_hin_ar_cbse_03_010', 'c12_hin_ar_cbse_03_011', 'c12_hin_ar_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental poetry reader', intro: 'A post-independence generation decided poetry needed to stop singing and start thinking.', goal: 'Read the two poems through Nayi Kavita\'s break with Chhayavad — play, defamiliarisation and language\'s limits.' },
    discovery: {
        question: '\'Poetry is a house of fungus; poetry is a child\'s game.\' A generation raised on sacred verse reads this — and calls it rebellion. What\'s the real move?',
        options: ['Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped', 'An insult to poetry', 'A nursery rhyme', 'Random metaphors'],
        answer: 'Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped',
        hook: 'Nayi Kavita broke with Chhayavad\'s romantic music for intellectual rigour and colloquial language. The twin poems test language both ways — in one, words are playthings freely mixed; in the other, language stammers and fails the very experience it tries to hold. Play and failure are the same anxiety.',
    },
    teaching: [
        { title: 'कवतिा के बहाने, बात सीधी थी पर — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**प्रतीक (Symbol):** एक ठोस वस्तु, व्यक्ति, क्रिया या स्थिति जो अपने शाब्दिक अर्थ के अतिरिक्त एक अमूर्त भाव, विचार, मूल्य या अवधारणा को निरूपित करती है (उदाहरण: दीपक = ज्ञान/आशा)। **बिंब.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the experimental decade: watch words treated as toys and then as traitors, weigh whether the poem about failed speech itself succeeds, and feel where a generation broke with the old music.',
        labels: ['कवतिा के बहाने, बात'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a student copywriting gig, your teammate wrestles a slogan for hours — forcing synonyms, then rage-quitting: \'The perfect word exists; I just have to grab it and pin it down.\'',
            decisions: [{ prompt: 'What does Raghuvir Sahay\'s \'बात सीधी थी पर\' say about hunting words?', options: [
                { text: 'Stop pinning — the poem shows a word slipping out of language\'s grip and the poet chasing it like a mischievous child; it merges into living language on its own, and the poet\'s job is to receive and restore it, not capture it by force.', outcome: 'The climax is the word\'s assimilation, not its capture — poetry emerges from the friction between word and experience, so wrestling harder is exactly what doesn\'t work.' },
                { text: 'Push harder — discipline means refusing to stop until the word submits.', outcome: 'That\'s the misreading of the chase: the word escapes precisely when gripped; the poem ends not with conquest but with the poet gently returning it to where it lives.', reveals: 'force-catches-words' },
                { text: 'Give up entirely — if words escape by nature, writing is luck, not labour.', outcome: 'The poem is about the poet\'s engaged pursuit, not passivity — the chase matters; what\'s released is the fantasy of total control, not the effort.', reveals: 'writing-is-pure-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read experimental poetry\'s double edge — language as both the only tool and the trap it can\'t escape.',
            decisions: [{ prompt: 'What comes next? कवतिा के बहाने, बात सीधी थी पर · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कवतिा के बहाने, बात सीधी थी पर · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_007', difficulty: 'standard',
          question: '**प्रतीक (Symbol):** एक ठोस वस्तु, व्यक्ति, क्रिया या स्थिति जो अपने शाब्दिक.',
          hint: 'यदि अटका महसूस हो तो **तुरंत** कक्षा 11 नोड `c11_hin_ar_cbse_13_007` (जाग तुझको दूर जाना.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **"बिंब = रूपक (metaphor)"** मान लेते हैं क्योंकि दोनों तुलना करते दीखते हैं। उदाहरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**प्रतीक (Symbol):** एक ठोस वस्तु, व्यक्ति, क्रिया या स्थिति जो अपने शाब्दिक अर्थ के',
                  options: ['**प्रतीक (Symbol):** एक ठोस वस्तु, व्यक्ति, क्रिया या स्थिति जो अपने शाब्दिक अर्थ के', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि अटका महसूस हो तो **तुरंत** कक्षा 11 नोड `c11_hin_ar_cbse_13_007` (जाग तुझको दूर जाना — प्रतीक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **"बिंब = रूपक (metaphor)"** मान लेते हैं क्योंकि दोनों तुलना करते दीखते हैं। उदाहरण: "पसीने की तरह फिसलते.' }
          ],
            remediations: { 'metaphor': { steps: ['**पुनः पढ़ें:** कक्षा 11 आरोह के किसी भी काव्य नोड (जैसे `c11_hin_ar_cbse_13_007` या `c11_hin_ar_cbse_16_007`) का \'बिंब.', '**अभ्यास:** उसी कविता से 5 बिंब छाँट कर इंद्रिय-वार वर्गीकृत करें (दृश्य/श्रवण/स्पर्श/घ्राण/स्वाद)। 3.', '**परीक्षण:** इस नोड के **DIAGNOSTIC_QUESTION_2** को फिर से हल करें — यदि अब स्पर्श-बिंब सही पहचाना, तो आगे बढ़ें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_008', difficulty: 'standard',
          question: 'कविता का **मुख्य भाव** (Central Theme) वह केंद्रीय विचार या अनुभूति है जो पूरी.',
          hint: 'अगर बिंबों की प्रतीकात्मकता स्पष्ट न हो, तो c12_hin_ar_cbse_03_006 (बिंब-रूपक) और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र प्रायः मान लेते हैं कि कविता का "मुख्य भाव" = **कवि की व्यक्तिगत मनोदशा (mood)** है — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कविता का **मुख्य भाव** (Central Theme) वह केंद्रीय विचार या अनुभूति है जो पूरी कविता को',
                  options: ['कविता का **मुख्य भाव** (Central Theme) वह केंद्रीय विचार या अनुभूति है जो पूरी कविता को', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'अगर बिंबों की प्रतीकात्मकता स्पष्ट न हो, तो c12_hin_ar_cbse_03_006 (बिंब-रूपक) और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र प्रायः मान लेते हैं कि कविता का "मुख्य भाव" = **कवि की व्यक्तिगत मनोदशा (mood)** है — जैसे "कवि निराश है", "कवि.' }
          ],
            remediations: { 'mood': { steps: ['छात्र से कहें: "कविता की कोई तीन पंक्तियाँ चुनो जहाँ \'मैं\' आया हो। अब प्रत्येक पंक्ति में \'मैं\' की जगह \'हर मनुष्य\' रखकर.', 'फिर पूछें: "कवि थका हुआ है — यह कहाँ लिखा है?', 'कौन-सा शब्द \'थकान\' कहता है?', 'क्या \'थकान\' के बाद \'रुकने में दर्द\' नहीं लिखा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_009', difficulty: 'standard',
          question: '**गौण भाव** (Subsidiary Emotion) वह सहायक भाव है जो कविता के मुख्य भाव (Central.',
          hint: 'यदि अटके तो: कविता का शीर्षक \'बात सीधी थी **पर**\' — इस \'पर\' के बाद जो भी आए, वही गौण.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **गौण भाव = कम महत्वपूर्ण भाव** और **विषयांतर = कविता का दोष/भटकाव**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**गौण भाव** (Subsidiary Emotion) वह सहायक भाव है जो कविता के मुख्य भाव (Central Emotion)',
                  options: ['**गौण भाव** (Subsidiary Emotion) वह सहायक भाव है जो कविता के मुख्य भाव (Central Emotion)', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि अटके तो: कविता का शीर्षक \'बात सीधी थी **पर**\' — इस \'पर\' के बाद जो भी आए, वही गौण भाव/विषयांतर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **गौण भाव = कम महत्वपूर्ण भाव** और **विषयांतर = कविता का दोष/भटकाव**। **वास्तविकता:** गौण भाव कविता.' }
          ],
            remediations: { 'co-emotion-structural-strategy-summary': { steps: ['**चरण 1:** छात्र से कहें — "कविता का कोई एक पद चुनो और बताओ कि कवि यहां **क्या कहना चाहता था** और **क्या कह गया**।".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_010', difficulty: 'standard',
          question: 'पदावली कठिन शब्द और मुहावरे का अर्थ उन शब्दों और वाक्यांशों को समझना है जो पाठ.',
          hint: 'यदि छात्र कठिन शब्दों के अर्थ नहीं निकाल पा रहा है, तो उसे c11_hin_a_cbse_03_010 (Class.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द हिन्दी में दिखता है (जैसे "उदासीन", "अनुशासित"), तो उसका अर्थ उसके अंग्रेजी दिखने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली कठिन शब्द और मुहावरे का अर्थ उन शब्दों और वाक्यांशों को समझना है जो पाठ में',
                  options: ['पदावली कठिन शब्द और मुहावरे का अर्थ उन शब्दों और वाक्यांशों को समझना है जो पाठ में', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि छात्र कठिन शब्दों के अर्थ नहीं निकाल पा रहा है, तो उसे c11_hin_a_cbse_03_010 (Class 11 में.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द हिन्दी में दिखता है (जैसे "उदासीन", "अनुशासित"), तो उसका अर्थ उसके अंग्रेजी दिखने वाले भाग से सीधा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि शब्द "उदास" + "नीत" का अर्थ नहीं निकलता, क्योंकि यह सही sandhi विग्रह नहीं है। फिर बताइए कि "उदासीन".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है — कविता के भाव, रस, छंद और कथ्य को व्यक्त करने.',
          hint: 'यदि अटके: c11_hin_ar_cbse_13_011 (पद्य में भाषा-प्रयोग — कक्षा 11) दोहराएँ — वहाँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि कविता में भाषा-प्रयोग का विश्लेषण करने का अर्थ है — **अलंकारों के नाम गिनाना**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि अटके: c11_hin_ar_cbse_13_011 (पद्य में भाषा-प्रयोग — कक्षा 11) दोहराएँ — वहाँ चरण-दर-चरण समझाया.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि कविता में भाषा-प्रयोग का विश्लेषण करने का अर्थ है — **अलंकारों के नाम गिनाना** (अनुप्रास, यमक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** कविता के **केवल पहले दो पद** लें। ज़ोर से पढ़ें। रेखांकित करें: (क) कौन-से शब्द \'भारी\' लगते हैं?', '(ख) कहाँ वाक्य-क्रम अस्वाभाविक लगता है?', '(ग) कौन-सी ध्वनि बार-बार आती है?', '**मैप करें:** प्रत्येक रेखांकित शब्द/पद के सामने लिखें — अभिधा/लक्षणा/व्यंजना?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ बोध-प्रश्न वे होते हैं जिनके उत्तर कविता के सीधे पाठ में मौजूद.',
          hint: 'यदि फंसें तो कक्षा 11 के पाठ 1-3 के बोध-प्रश्न नोड्स (c11_hin_a_cbse_01_012.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर देते समय कविता की पंक्तियों को शब्दशः दोहराते हैं और मान लेते हैं कि यही उत्तर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ बोध-प्रश्न वे होते हैं जिनके उत्तर कविता के सीधे पाठ में मौजूद तथ्यों पर',
                  options: ['वस्तुनिष्ठ बोध-प्रश्न वे होते हैं जिनके उत्तर कविता के सीधे पाठ में मौजूद तथ्यों पर', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि फंसें तो कक्षा 11 के पाठ 1-3 के बोध-प्रश्न नोड्स (c11_hin_a_cbse_01_012, c11_hin_a_cbse_02_012.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर देते समय कविता की पंक्तियों को शब्दशः दोहराते हैं और मान लेते हैं कि यही उत्तर है, जैसे कि यदि कविता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कैसे एक सरल वाक्य जैसे "वह रो रहा था" दो अर्थ रख सकता है: एक वस्तुनिष्ठ (वह आंसू बहा रहा था) और एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
