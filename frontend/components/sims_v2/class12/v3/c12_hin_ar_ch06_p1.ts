import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch06_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch06_p1',
    title: 'बादल राग · Part 1/3',
    subtitle: 'Why Nirala chose the moment even Rama knelt',
    classLevel: 12, subject: 'hin_ar', topic: 'बादल राग · Part 1/3',
    chapters: ['c12_hin_ar_ch06'],
    nodeIds: ['c12_hin_ar_cbse_06_001', 'c12_hin_ar_cbse_06_002', 'c12_hin_ar_cbse_06_003', 'c12_hin_ar_cbse_06_004', 'c12_hin_ar_cbse_06_005', 'c12_hin_ar_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Epic-poetry analyst', intro: 'A Chhayavad master builds an epic around the one scene where the perfect man admits he isn\'t enough.', goal: 'Read Ram Ki Shakti Puja as Chhayavad epic — personal struggle and national allegory inside a mythic frame.' },
    discovery: {
        question: 'Of every Ramayana moment — birth, exile, coronation — Nirala chose the instant Rama kneels to the Goddess before the final battle. Why that one?',
        options: ['It dramatises human vulnerability against impossible odds — the ideal man needing divine strength mirrors a poet\'s own wars with poverty and loss, and a nation\'s fight to be free', 'It\'s the most exciting scene', 'The battle needed a prayer', 'Random selection'],
        answer: 'It dramatises human vulnerability against impossible odds — the ideal man needing divine strength mirrors a poet\'s own wars with poverty and loss, and a nation\'s fight to be free',
        hook: 'Not a retelling — a re-visioning: an eleven-canto blank-verse epic that claims classical lineage for modern Hindi while encoding a freedom struggle and private grief inside Rama\'s helplessness. Chhayavad\'s interiority scaled to epic architecture.',
    },
    teaching: [
        { title: 'बादल राग — कवि परिचय और पृष्ठभूमि', text: 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में से एक हैं, जिन्होंने खड़ी बोली कविता को मुक्त छंद दिया, संस्कृतनिष्ठ भाषा के साथ जनभाषा का मेल किया, और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand beside Rama before Lanka: weigh why Shakti Puja was the chosen moment, compare epic structure with lyric intensity, and hunt the allegory running beneath the myth.',
        labels: ['बादल राग — कवि', 'बादल राग — पद्यांश-वार', 'बादल राग — काव्य-संरचना', 'बादल राग — केंद्रीय', 'बादल राग — छंद', 'बादल राग — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_005', title: 'बादल राग — छंद और लय-विधान',
          caseStudy: { intro: 'Have you ever noticed how your heartbeat feels different when you’re waiting for exam results (slow, heavy thuds) versus when you’re sprinting to catch a bus.',
            decisions: [{ prompt: '"बादल राग" के पहले पद में प्रयुक्त छंद का नाम बताइए और उसके गण-विधान (लघु/गुरु क्रम) को लिखिए।', options: [
                { text: '**Correct answer:** पहले पद में **मुक्तक/मुक्तछंद** (free verse) की प्रवृत्ति है; कोई', outcome: '**Correct answer:** पहले पद में **मुक्तक/मुक्तछंद** (free verse) की प्रवृत्ति है; कोई निश्चित.' },
                { text: 'इंद्रवज्रा', outcome: 'Not quite — **Exact error:** Students scan "बादल राग" using **वर्णिक छंद नियम** (गण = य/र/त/ज/भ/न/स/म based.', reveals: 'exact-error-students-scan-using' },
                { text: 'वसंततिलका', outcome: 'Not quite — **Exact error:** Students scan "बादल राग" using **वर्णिक छंद नियम** (गण = य/र/त/ज/भ/न/स/म based.', reveals: 'exact-error-students-scan-using' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior is spiralling after a brutal internship rejection: \'This is who I am now — the guy who fails.\' You remember the Firaq poem where a tree loses its leaves to the season yet the final stanza returns to the same rooted presence.',
            decisions: [{ prompt: 'How do you use the poem\'s structure with him?', options: [
                { text: 'Point out the poem moves through noon shadow, wind, bare winter — then circles back to the rooted tree; a hard season is weather passing through, not the trunk. His rejection is a stanza, not the whole structure.', outcome: 'The poem\'s circular return exists to make exactly this claim: the ending echoes the opening image, but now carrying the endurance the middle proved — the tree that was always rooted.' },
                { text: 'Tell him the seasons prove everything changes, so this failure will soon be replaced by success — wait it out.', outcome: 'That reads only the seasonal half and skips the rootedness the poem insists on; passive waiting isn\'t the tree\'s endurance — the structure pairs change outside with continuity within.', reveals: 'time-heals-passively' },
                { text: 'Tell him to treat the rejection as the final stanza — some stories end bare, and that\'s honest.', outcome: 'That amputates the poem\'s actual resolution: the final stanza deliberately returns to rooted presence, so calling the bare season the ending misreads where the structure chooses to stop.', reveals: 'hard-season-is-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read an epic as both myth and mirror — where a god\'s prayer for strength speaks for a poet, and a people, beseeching power.',
            decisions: [{ prompt: 'What comes next? बादल राग · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बादल राग · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_001', difficulty: 'standard',
          question: 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार.',
          hint: 'यदि निराला की पहचान अन्य छायावादी कवियों से स्पष्ट न हो, तो c11_hin_ar_cbse_13_001 और.',
          misconception: '**सबसे घातक भ्रम:** "निराला = छायावादी कवि = प्रकृति-प्रेमी, भावुक, रहस्यवादी — बस।" छात्र यह भूल जाते हैं कि निराला ने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में',
                  options: ['सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,', '**केंद्रीय भाव** (Central Theme/Feeling) वह प्रमुख भावना या विचार है जो पूरी कविता में'],
                  hint: 'यदि निराला की पहचान अन्य छायावादी कवियों से स्पष्ट न हो, तो c11_hin_ar_cbse_13_001 और.',
                  misconception: '**सबसे घातक भ्रम:** "निराला = छायावादी कवि = प्रकृति-प्रेमी, भावुक, रहस्यवादी — बस।" छात्र यह भूल जाते हैं कि निराला ने **छायावाद को तोड़ा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: निराला की जीवनी का एक पैराग्राफ (NCERT \'आरोह\' भाग-2 की भूमिका या कोई विश्वसनीय स्रोत) पढ़ें — केवल तथ्य नहीं.', 'क्यों?" चरण 3: c11_hin_a_cbse_13_001 (जाग तुझको दूर जाना — कवि परिचय) और c11_hin_a_cbse_14_001 (बादल को घरिते देखा है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ.',
          hint: 'यदि निराला की प्रगतिवादी दृष्टि स्पष्ट न हो, तो c12_hin_ar_cbse_06_001 (कवि परिचय और.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'बादल राग\' के पद्यांशों का भावार्थ लिखते समय **\'कृष्ण\', \'ग्वाल-बाल\', \'बंसी\', \'मोर\'** जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,', '**केंद्रीय भाव** (Central Theme/Feeling) वह प्रमुख भावना या विचार है जो पूरी कविता में'],
                  hint: 'यदि निराला की प्रगतिवादी दृष्टि स्पष्ट न हो, तो c12_hin_ar_cbse_06_001 (कवि परिचय और पृष्ठभूमि) के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'बादल राग\' के पद्यांशों का भावार्थ लिखते समय **\'कृष्ण\', \'ग्वाल-बाल\', \'बंसी\', \'मोर\'** जैसे शब्दों को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पहला पद्यांश पढ़ो और बताओ: कृष्ण यहाँ भगवान हैं या प्रतीक?', 'प्रमाण दो।" — यदि वह \'भगवान\' कहे, तो चरण 2: समझाएं — "निराला छायावादी नहीं, **प्रगतिवादी** कवि हैं; वे मिथक को **तोड़ते.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी.',
          hint: 'यदि छात्र **एनजैम्बमेंट** या **तुकांत योजना पहचानने** में अटके, तो कक्षा 11 के नोड्स.',
          misconception: '**छात्र मानते हैं कि \'काव्य-संरचना\' का अर्थ केवल \'छंद पहचानना\' (जैसे रोला, चौपाई) या \'तुकांत बताना\' है।** वे यह नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,',
                  options: ['काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', '**केंद्रीय भाव** (Central Theme/Feeling) वह प्रमुख भावना या विचार है जो पूरी कविता में'],
                  hint: 'यदि छात्र **एनजैम्बमेंट** या **तुकांत योजना पहचानने** में अटके, तो कक्षा 11 के नोड्स.',
                  misconception: '**छात्र मानते हैं कि \'काव्य-संरचना\' का अर्थ केवल \'छंद पहचानना\' (जैसे रोला, चौपाई) या \'तुकांत बताना\' है।** वे यह नहीं देखते कि **पदों की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता का **मुद्रित रूप (printed layout)** दिखाओ — उसे पदों को **बॉक्स में घेरने** को कहो। 2.', 'प्रत्येक बॉक्स की **पंक्तियाँ गिनवाओ** और **लंबाई की तुलना** करवाओ (पद 1 vs पद 6, पद 2-5 vs पद 1)। 3.', 'पूछो: **"कवि ने यहाँ अधिक जगह क्यों ली?', 'यहाँ कम क्यों?"** — उत्तर में \'भाव\' शब्द आना चाहिए (जैसे: "क्योंकि यहाँ बादल बन रहा है, समय लगता है")। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_004', difficulty: 'standard',
          question: '**केंद्रीय भाव** (Central Theme/Feeling) वह प्रमुख भावना या विचार है जो पूरी.',
          hint: 'यदि रस-सूत्र या विभाव/अनुभाव/व्यभिचारी का भेद भूल गए हों तो **c11_hin_a_cbse_13_004**.',
          misconception: '**सबसे घातक भ्रम**: छात्र समझते हैं कि **\'केंद्रीय भाव\' = \'कविता का विषय\' (बादल/वर्षा)** और **\'रस\' = \'कविता का मूड\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**केंद्रीय भाव** (Central Theme/Feeling) वह प्रमुख भावना या विचार है जो पूरी कविता में',
                  options: ['**केंद्रीय भाव** (Central Theme/Feeling) वह प्रमुख भावना या विचार है जो पूरी कविता में', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'यदि रस-सूत्र या विभाव/अनुभाव/व्यभिचारी का भेद भूल गए हों तो **c11_hin_a_cbse_13_004** (जाग तुझको.',
                  misconception: '**सबसे घातक भ्रम**: छात्र समझते हैं कि **\'केंद्रीय भाव\' = \'कविता का विषय\' (बादल/वर्षा)** और **\'रस\' = \'कविता का मूड\' (उदास/खुश)**।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहो — "कविता का **विषय** एक तरफ लिखो, **भाव** दूसरी तरफ। विषय = \'बादल\', भाव = \'बादल न आने की.', 'कौन-सा **आता-जाता** है?" → स्थायी vs व्यभिचारी स्पष्ट होगा। **चरण 4**: दोबारा डायग्नोस्टिक Q4 करवाओ — अब तर्क के साथ रस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_005', difficulty: 'standard',
          question: 'छंद (meter) is the systematic organization of poetic lines into measurable.',
          hint: 'यदि स्कैनिंग में अटकें: **c11_hin_a_cbse_13_005** के कार्याभ्यास (worked examples) को.',
          misconception: '**Exact error:** Students scan "बादल राग" using **वर्णिक छंद नियम** (गण = य/र/त/ज/भ/न/स/म based on *varna* sequence).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद (meter) is the systematic organization of poetic lines into measurable rhythmic units',
                  options: ['छंद (meter) is the systematic organization of poetic lines into measurable rhythmic units', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'यदि स्कैनिंग में अटकें: **c11_hin_a_cbse_13_005** के कार्याभ्यास (worked examples) को दोहराएँ.',
                  misconception: '**Exact error:** Students scan "बादल राग" using **वर्णिक छंद नियम** (गण = य/र/त/ज/भ/न/स/म based on *varna* sequence) instead of **मात्रिक.' }
          ],
            remediations: { 'exact-error-students-scan-using': { steps: ['**Immediate remediation:** Take any 2 lines from "बादल राग" (e.g., first stanza, last stanza).', '**Step-by-step re-scan:** Write each word → break into syllables → mark ह्रस्व/दीर्घ/संयुक्त/अनुनासिक → assign 1 (लघु).', '**Cross-check with Class 11 node:** Revisit **c11_hin_a_cbse_13_005** (जाग तुझको दूर जाना — छंद और लय-विधान).', '**Re-diagnostic:** After 2 practice scans, attempt **Diagnostic Question 3** again.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_006', difficulty: 'standard',
          question: 'अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के.',
          hint: 'यदि भेद स्पष्ट न हों तो **कक्षा 11 आरोह के नोड c11_hin_a_cbse_13_006 (जाग तुझको दूर जाना.',
          misconception: 'छात्र समझते हैं कि **\'अलंकार पहचानना = नाम बता देना\'** (जैसे: "यह अनुप्रास है")। **गलत:** बोर्ड/प्रतियोगी परीक्षा में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशिष्ट',
                  options: ['अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशिष्ट', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'यदि भेद स्पष्ट न हों तो **कक्षा 11 आरोह के नोड c11_hin_a_cbse_13_006 (जाग तुझको दूर जाना.',
                  misconception: 'छात्र समझते हैं कि **\'अलंकार पहचानना = नाम बता देना\'** (जैसे: "यह अनुप्रास है")। **गलत:** बोर्ड/प्रतियोगी परीक्षा में पूछा जाता है — **"इस.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** c12_hin_ar_cbse_06_002 (पद्यांश-वार भावार्थ) — जिन पंक्तियों में अलंकार हैं, उनका **सटीक अर्थ** समझें.', '**अभ्यास करें:** c11_hin_a_cbse_13_006 / c11_hin_a_cbse_14_006 / c11_hin_a_cbse_15_006 / c11_hin_a_cbse_16_006 (कक्षा.', '**लिखित अभ्यास:** कविता की 5 प्रमुख पंक्तियाँ चुनें, प्रत्येक में **अलंकार नाम + भेद + प्रभाव (3 वाक्य)** लिखें।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
