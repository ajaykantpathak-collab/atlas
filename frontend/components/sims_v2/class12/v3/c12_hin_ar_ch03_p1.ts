import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch03_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch03_p1',
    title: 'कवतिा के बहाने, बात सीधी थी पर · Part 1/3',
    subtitle: 'Words as toys — and as traitors',
    classLevel: 12, subject: 'hin_ar', topic: 'कवतिा के बहाने, बात सीधी थी पर · Part 1/3',
    chapters: ['c12_hin_ar_ch03'],
    nodeIds: ['c12_hin_ar_cbse_03_001', 'c12_hin_ar_cbse_03_002', 'c12_hin_ar_cbse_03_003', 'c12_hin_ar_cbse_03_004', 'c12_hin_ar_cbse_03_005', 'c12_hin_ar_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental poetry reader', intro: 'A post-independence generation decided poetry needed to stop singing and start thinking.', goal: 'Read the two poems through Nayi Kavita\'s break with Chhayavad — play, defamiliarisation and language\'s limits.' },
    discovery: {
        question: '\'Poetry is a house of fungus; poetry is a child\'s game.\' A generation raised on sacred verse reads this — and calls it rebellion. What\'s the real move?',
        options: ['Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped', 'An insult to poetry', 'A nursery rhyme', 'Random metaphors'],
        answer: 'Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped',
        hook: 'Nayi Kavita broke with Chhayavad\'s romantic music for intellectual rigour and colloquial language. The twin poems test language both ways — in one, words are playthings freely mixed; in the other, language stammers and fails the very experience it tries to hold. Play and failure are the same anxiety.',
    },
    teaching: [
        { title: 'कवतिा के बहाने, बात सीधी थी पर — कवि परिचय और पृष्ठभूमि', text: '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय, उनकी साहित्यिक यात्रा, प्रमुख कृतियाँ, रचनाधर्मिता (नई कविता आंदोलन में योगदान), और इस कविता की रचना-पृष्ठभूमि.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the experimental decade: watch words treated as toys and then as traitors, weigh whether the poem about failed speech itself succeeds, and feel where a generation broke with the old music.',
        labels: ['कवतिा के बहाने, बात'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_002', title: 'कवतिा के बहाने, बात सीधी थी पर — पद्यांश-वार भावार्थ',
          caseStudy: { intro: 'You open your textbook to the poem and see 8-10 stanzas — it feels like a wall of text. **Start here:** Read the *first stanza aloud* twice. Notice the rhythm.',
            decisions: [{ prompt: 'पद्यांश-वार भावार्थ और कविता के सारांश में मूल अंतर क्या है? एक वाक्य में लिखिए।', options: [
                { text: '**Correct Answer:** पद्यांश-वार भावार्थ प्रत्येक पद्यांश के सूक्ष्म भाव, बिंब और प्रसंग', outcome: '**Correct Answer:** पद्यांश-वार भावार्थ प्रत्येक पद्यांश के सूक्ष्म भाव, बिंब और प्रसंग की.' },
                { text: 'दोनों एक ही हैं', outcome: 'Not quite — **Specific Error:** Students treat "भावार्थ" as "शब्दार्थ" (word-meaning) or "अनुवाद".', reveals: 'specific-error-students-treat-as' },
                { text: 'भावार्थ बड़ा होता है', outcome: 'Not quite — **Specific Error:** Students treat "भावार्थ" as "शब्दार्थ" (word-meaning) or "अनुवाद".', reveals: 'specific-error-students-treat-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a student copywriting gig, your teammate wrestles a slogan for hours — forcing synonyms, then rage-quitting: \'The perfect word exists; I just have to grab it and pin it down.\'',
            decisions: [{ prompt: 'What does Raghuvir Sahay\'s \'बात सीधी थी पर\' say about hunting words?', options: [
                { text: 'Stop pinning — the poem shows a word slipping out of language\'s grip and the poet chasing it like a mischievous child; it merges into living language on its own, and the poet\'s job is to receive and restore it, not capture it by force.', outcome: 'The climax is the word\'s assimilation, not its capture — poetry emerges from the friction between word and experience, so wrestling harder is exactly what doesn\'t work.' },
                { text: 'Push harder — discipline means refusing to stop until the word submits.', outcome: 'That\'s the misreading of the chase: the word escapes precisely when gripped; the poem ends not with conquest but with the poet gently returning it to where it lives.', reveals: 'force-catches-words' },
                { text: 'Give up entirely — if words escape by nature, writing is luck, not labour.', outcome: 'The poem is about the poet\'s engaged pursuit, not passivity — the chase matters; what\'s released is the fantasy of total control, not the effort.', reveals: 'writing-is-pure-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read experimental poetry\'s double edge — language as both the only tool and the trap it can\'t escape.',
            decisions: [{ prompt: 'What comes next? कवतिा के बहाने, बात सीधी थी पर · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कवतिा के बहाने, बात सीधी थी पर · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_001', difficulty: 'standard',
          question: '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन.',
          hint: 'यदि \'नई कविता\' आंदोलन या आपातकाल की पृष्ठभूमि अस्पष्ट हो, तो कक्षा 11 हिंदी \'आरोह\' के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि \'कवि परिचय\' का अर्थ केवल \'जीवनी तथ्य\' (जन्म, मृत्यु, पुस्तकें, पुरस्कार).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,',
                  options: ['\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है', 'केंद्रीय भाव (Central Theme) कविता का वह **मूल विचार या संदेश** है जिसके चारों ओर सारी'],
                  hint: 'यदि \'नई कविता\' आंदोलन या आपातकाल की पृष्ठभूमि अस्पष्ट हो, तो कक्षा 11 हिंदी \'आरोह\' के नोड्स.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि \'कवि परिचय\' का अर्थ केवल \'जीवनी तथ्य\' (जन्म, मृत्यु, पुस्तकें, पुरस्कार) याद करना है। वे यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पठन (Re-read):** NCERT पाठ्यपुस्तक के \'कवि परिचय\' बॉक्स को नहीं, बल्कि कुँवर नारायण के किसी साक्षात्कार.', '**मैपिंग एक्सरसाइज (Mapping):** एक टेबल बनाएं: कॉलम 1 में कवि के जीवन की 5 प्रमुख घटनाएं (जैसे: बचपन में पिता का निधन.', '**पीयर डिस्कशन (Peer Discussion):** किसी सहपाठी से पूछें: "अगर कुँवर नारायण आईएएस न होते, प्रोफेसर होते, तो क्या यह.', '**पुनः निदान (Re-diagnostic):** उपरोक्त DIAGNOSTIC_QUESTION_4 को दोबारा हल करें; अब उत्तर में \'जीवन घटना -> दृष्टिकोण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का.',
          hint: 'If stuck, review "बिंब और प्रतीक की पहचान" from c11_hin_ar_cbse_16_006.',
          misconception: '**Specific Error:** Students treat "भावार्थ" as "शब्दार्थ" (word-meaning) or "अनुवाद" (translation).',
          parts: [
                { id: 'a', prompt: 'कविता के तीसरे और पाँचवें पद्यांश में \'समय\' की अवधारणा कैसे बदलती है? तुलनात्मक विश्लेषण कीजिए।', answer: '**Correct Answer:** तीसरे पद्यांश में समय \'देर\' (delay/struggle) के रूप में',
                  options: ['**Correct Answer:** तीसरे पद्यांश में समय \'देर\' (delay/struggle) के रूप में', 'दोनों में समय है', 'तीसरे में कम, पाँचवें में ज्यादा'],
                  hint: 'If stuck, review "बिंब और प्रतीक की पहचान" from c11_hin_ar_cbse_16_006 or c11_hin_a_cbse_13_006.',
                  misconception: '**Specific Error:** Students treat "भावार्थ" as "शब्दार्थ" (word-meaning) or "अनुवाद" (translation).' }
          ],
            remediations: { 'specific-error-students-treat-as': { steps: ['**Step-by-step Remediation:** 1.', '**Revisit Node c11_hin_ar_cbse_16_002 (आओ, मलिकर बचाएँ — पद्यांश-वार भावार्थ):** Pick *one stanza* from that poem.', 'Write its *literal translation* (शब्दार्थ) on left side of notebook.', 'On right side, write: "कवि यहाँ क्या *महसूस* कर रहा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है — कविता के अंतर्निहित ढाँचे (छंद, लय.',
          hint: 'यदि मात्रा-गण-यति में अटके: c11_hin_a_cbse_13_005 (छंद और लय-विधान) के \'मात्रा-गण अभ्यास\'.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "काव्य-संरचना = छंद नाम बताना (जैसे चौपाई, दोहा, रोला)"। **वास्तविकता**: संरचना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है',
                  options: ['काव्य-संरचना और पद्य-विन्यास का अर्थ है', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'केंद्रीय भाव (Central Theme) कविता का वह **मूल विचार या संदेश** है जिसके चारों ओर सारी'],
                  hint: 'यदि मात्रा-गण-यति में अटके: c11_hin_a_cbse_13_005 (छंद और लय-विधान) के \'मात्रा-गण अभ्यास\' खंड को.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "काव्य-संरचना = छंद नाम बताना (जैसे चौपाई, दोहा, रोला)"। **वास्तविकता**: संरचना = **छंद + लय-परिवर्तन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**तत्काल**: वर्ग 11 के छंद-परिचय नोड (c11_hin_a_cbse_13_005 / c11_hin_ar_cbse_16_005) से मात्रा-गण-यति की **अभ्यास.', '**अगला कदम**: किसी सरल कविता (जैसे \'पुष्प की अभिलाषा\') के 4 पद्यों का **पूर्ण संरचना-मानचित्र** बनाओ: मात्रा तालिका, गण.', '**पुनः निदान**: इस नोड के DIAGNOSTIC_QUESTION_3 को फिर से हल करो — यदि चरण 3-4 (पद-बंद → बिंब) अटके, तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) कविता का वह **मूल विचार या संदेश** है जिसके चारों.',
          hint: 'यदि विभाव/अनुभाव/संचारी की पहचान में अटकें → **c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना.',
          misconception: '**सबसे घातक गलतफहमी**: छात्र समझते हैं कि **\'रस\' का अर्थ \'भाव\' या \'मूड\' (Mood) होता है** — जैसे "कविता दुखी करती है तो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) कविता का वह **मूल विचार या संदेश** है जिसके चारों ओर सारी',
                  options: ['केंद्रीय भाव (Central Theme) कविता का वह **मूल विचार या संदेश** है जिसके चारों ओर सारी', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि विभाव/अनुभाव/संचारी की पहचान में अटकें → **c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय.',
                  misconception: '**सबसे घातक गलतफहमी**: छात्र समझते हैं कि **\'रस\' का अर्थ \'भाव\' या \'मूड\' (Mood) होता है** — जैसे "कविता दुखी करती है तो करुण रस"।.' }
          ],
            remediations: { 'mood-aesthetic-relish-situation': { steps: ['**चरण 1**: छात्र से कहें — "कविता का कोई एक पद पढ़ो और बताओ: **यहाँ कौन दुखी/संकट में है (आश्रय)?** और **किस कारण.', 'श्रद्धा?" — जो महसूस हुआ, वही **रस** है। अब उसे **तकनीकी नाम (वीर, करुण, शांत...)** दो। **चरण 3**: पुनः निदान.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_005', difficulty: 'standard',
          question: 'छंद काव्य की वह निश्चित संरचनात्मक इकाई है जिसमें मात्राओं या वर्णों की एक.',
          hint: 'यदि मात्रा गिनने में अटकें: "संयुक्त व्यंजन और अनुस्वार को गुरु मानना भूल गये हैं".',
          misconception: '**छात्र समझते हैं: "छंद पहचानना = मात्रा गिनकर छंद का नाम बता देना।"** **वास्तविकता:** बोर्ड/प्रतियोगी परीक्षा में पूछा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद काव्य की वह निश्चित संरचनात्मक इकाई है जिसमें मात्राओं या वर्णों की एक निश्चित',
                  options: ['छंद काव्य की वह निश्चित संरचनात्मक इकाई है जिसमें मात्राओं या वर्णों की एक निश्चित', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि मात्रा गिनने में अटकें: "संयुक्त व्यंजन और अनुस्वार को गुरु मानना भूल गये हैं" — कक्षा 11.',
                  misconception: '**छात्र समझते हैं: "छंद पहचानना = मात्रा गिनकर छंद का नाम बता देना।"** **वास्तविकता:** बोर्ड/प्रतियोगी परीक्षा में पूछा जाता है — *"छंद की.' }
          ],
            remediations: { 'rhythm-meaning-link': { steps: ['**तुरंत अभ्यास:** कक्षा 11 के छंद नोड्स (c11_hin_ar_cbse_16_005, c11_hin_a_cbse_13_005) से 5 पंक्तियाँ लेकर मात्रा-गणना.', '**लय-भाव जोड़:** वही पंक्तियाँ दो बार पढ़ो — पहली बार यन्त्रवत्, दूसरी बार भाव देकर; रिकॉर्ड करो और अंतर सुनो। 3.', '**पुनः निदान:** ऊपर का Diagnostic Q4 फिर से हल करो; यदि अब भी लय-भाव लिंक न बने, तो शिक्षक से \'गुरु-लघु का भाव-प्रभाव\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_006', difficulty: 'standard',
          question: 'अलंकार (Alankar) refers to figures of speech in Hindi poetry where words are.',
          hint: 'यदि अटके: c11_hin_a_cbse_01_009 के "उपमा vs उत्प्रेक्षा" तुलना सारणी को दोबारा बनाएँ — 3.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "उपमा" और "उत्प्रेक्षा" एक ही हैं क्योंकि दोनों में तुलना होती है — वे पंक्ति "बात.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Alankar) refers to figures of speech in Hindi poetry where words are arranged or',
                  options: ['अलंकार (Alankar) refers to figures of speech in Hindi poetry where words are arranged or', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि अटके: c11_hin_a_cbse_01_009 के "उपमा vs उत्प्रेक्षा" तुलना सारणी को दोबारा बनाएँ — 3 उदाहरण.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "उपमा" और "उत्प्रेक्षा" एक ही हैं क्योंकि दोनों में तुलना होती है — वे पंक्ति "बात सीधी थी पर / उसमें.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **c11_hin_a_cbse_01_009** (विरोधाभास और प्रतीक) और **c11_hin_ar_cbse_13_006** (जाग तुझको दूर जाना — अलंकार).', '5 पंक्तियाँ दें जिनमें \'जैसे/वैसे\' हो — छात्र से कहें: प्रत्येक में पहचानें कि उपमेय-उपमान अलग हैं (उपमा) या कवि ने.', 'पुनः निदान: उपरोक्त DIAGNOSTIC_QUESTION_2 फिर से दें — यदि अब सही उत्तर दे, तो आगे बढ़ें; नहीं तो c11_hin_a_cbse_13_006.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
