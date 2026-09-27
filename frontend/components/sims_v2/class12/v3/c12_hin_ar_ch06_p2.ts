import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch06_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch06_p2',
    title: 'बादल राग · Part 2/3',
    subtitle: 'Why Nirala chose the moment even Rama knelt',
    classLevel: 12, subject: 'hin_ar', topic: 'बादल राग · Part 2/3',
    chapters: ['c12_hin_ar_ch06'],
    nodeIds: ['c12_hin_ar_cbse_06_007', 'c12_hin_ar_cbse_06_008', 'c12_hin_ar_cbse_06_009', 'c12_hin_ar_cbse_06_010', 'c12_hin_ar_cbse_06_011', 'c12_hin_ar_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Epic-poetry analyst', intro: 'A Chhayavad master builds an epic around the one scene where the perfect man admits he isn\'t enough.', goal: 'Read Ram Ki Shakti Puja as Chhayavad epic — personal struggle and national allegory inside a mythic frame.' },
    discovery: {
        question: 'Of every Ramayana moment — birth, exile, coronation — Nirala chose the instant Rama kneels to the Goddess before the final battle. Why that one?',
        options: ['It dramatises human vulnerability against impossible odds — the ideal man needing divine strength mirrors a poet\'s own wars with poverty and loss, and a nation\'s fight to be free', 'It\'s the most exciting scene', 'The battle needed a prayer', 'Random selection'],
        answer: 'It dramatises human vulnerability against impossible odds — the ideal man needing divine strength mirrors a poet\'s own wars with poverty and loss, and a nation\'s fight to be free',
        hook: 'Not a retelling — a re-visioning: an eleven-canto blank-verse epic that claims classical lineage for modern Hindi while encoding a freedom struggle and private grief inside Rama\'s helplessness. Chhayavad\'s interiority scaled to epic architecture.',
    },
    teaching: [
        { title: 'बादल राग — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**प्रतीक (Symbol):** एक वस्तु, व्यक्ति, या स्थिति जो अपने शाब्दिक अर्थ के साथ-साथ एक गहरा, अमूर्त अर्थ (जैसे विचार, भावना, या आदर्श) भी धारण करती है। **बिंब (Image/Imagery):** कवि द्वारा शब्दों के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand beside Rama before Lanka: weigh why Shakti Puja was the chosen moment, compare epic structure with lyric intensity, and hunt the allegory running beneath the myth.',
        labels: ['बादल राग — साहित्यिक', 'बादल राग — मुख्य', 'बादल राग — गौण', 'बादल राग — पदावली', 'बादल राग — व्याकरण', 'बादल राग — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior is spiralling after a brutal internship rejection: \'This is who I am now — the guy who fails.\' You remember the Firaq poem where a tree loses its leaves to the season yet the final stanza returns to the same rooted presence.',
            decisions: [{ prompt: 'How do you use the poem\'s structure with him?', options: [
                { text: 'Point out the poem moves through noon shadow, wind, bare winter — then circles back to the rooted tree; a hard season is weather passing through, not the trunk. His rejection is a stanza, not the whole structure.', outcome: 'The poem\'s circular return exists to make exactly this claim: the ending echoes the opening image, but now carrying the endurance the middle proved — the tree that was always rooted.' },
                { text: 'Tell him the seasons prove everything changes, so this failure will soon be replaced by success — wait it out.', outcome: 'That reads only the seasonal half and skips the rootedness the poem insists on; passive waiting isn\'t the tree\'s endurance — the structure pairs change outside with continuity within.', reveals: 'time-heals-passively' },
                { text: 'Tell him to treat the rejection as the final stanza — some stories end bare, and that\'s honest.', outcome: 'That amputates the poem\'s actual resolution: the final stanza deliberately returns to rooted presence, so calling the bare season the ending misreads where the structure chooses to stop.', reveals: 'hard-season-is-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read an epic as both myth and mirror — where a god\'s prayer for strength speaks for a poet, and a people, beseeching power.',
            decisions: [{ prompt: 'What comes next? बादल राग · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बादल राग · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_007', difficulty: 'standard',
          question: '**प्रतीक (Symbol):** एक वस्तु, व्यक्ति, या स्थिति जो अपने शाब्दिक अर्थ के.',
          hint: 'यदि फँस जाएँ: **c11_hin_ar_cbse_01_009** (विरोधाभास और प्रतीक) के \'प्रतीक की द्विअर्थिता\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मानते हैं कि **हर बिंब एक प्रतीक होता है** (Every image is a symbol)। उदाहरण: कविता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**प्रतीक (Symbol):** एक वस्तु, व्यक्ति, या स्थिति जो अपने शाब्दिक अर्थ के साथ-साथ एक',
                  options: ['**प्रतीक (Symbol):** एक वस्तु, व्यक्ति, या स्थिति जो अपने शाब्दिक अर्थ के साथ-साथ एक', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'यदि फँस जाएँ: **c11_hin_ar_cbse_01_009** (विरोधाभास और प्रतीक) के \'प्रतीक की द्विअर्थिता\' खंड को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मानते हैं कि **हर बिंब एक प्रतीक होता है** (Every image is a symbol)। उदाहरण: कविता में "बादल गरजता है".' }
          ],
            remediations: { 'every-image-is-a-symbol': { steps: ['**चरण 1:** छात्र से कहें: "कविता से कोई एक बिंब चुनो (जैसे \'बिजली की चमक\') और बताओ — यह किस इंद्रिय को छूता है?', 'अब बताओ — यह किस बड़े विचार की ओर इशारा करता है?" यदि वह दूसरा भाग न बता पाए, तो **बिंब→प्रतीक मैपिंग** टूटी है। 2.', '**चरण 2:** नोड **c11_hin_ar_cbse_01_009** (विरोधाभास और प्रतीक) और **c11_hin_ar_cbse_01_008** (बिंब और रूपक) को दोबारा.', '**चरण 3:** अभ्यास: दैनिक जीवन की 5 वस्तुएँ (जैसे: दीया, नदी, बीज, दीवार, रास्ता) लें और प्रत्येक के लिए लिखें — (अ).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_008', difficulty: 'standard',
          question: 'बादल राग का मुख्य भाव कवि सूर्यकांत त्रिपाठी \'निराला\' की **मुक्तिकामी चेतना**.',
          hint: 'अगर अटके तो c12_hin_ar_cbse_06_007 के \'प्रतीक विश्लेषण\' खंड को दोहराएँ — विशेषकर \'बादल.',
          misconception: 'छात्र अक्सर \'बादल राग\' को **छायावादी प्रकृति-काव्य** मानकर केवल सौंदर्य-बोध (बादल की सुंदरता, वर्षा का वर्णन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बादल राग का मुख्य भाव कवि सूर्यकांत त्रिपाठी \'निराला\' की **मुक्तिकामी चेतना** और',
                  options: ['बादल राग का मुख्य भाव कवि सूर्यकांत त्रिपाठी \'निराला\' की **मुक्तिकामी चेतना** और', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'अगर अटके तो c12_hin_ar_cbse_06_007 के \'प्रतीक विश्लेषण\' खंड को दोहराएँ — विशेषकर \'बादल = मुक्त.',
                  misconception: 'छात्र अक्सर \'बादल राग\' को **छायावादी प्रकृति-काव्य** मानकर केवल सौंदर्य-बोध (बादल की सुंदरता, वर्षा का वर्णन, ऋतु-चित्रण) तक सीमित कर देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "कविता में \'बादल\' शब्द जहाँ-जहाँ आया है, वहाँ-वहाँ उसके आगे के क्रिया/विशेषण को घेरे में डालो (जैसे.', 'फिर पूछें: "ये क्रियाएँ बादल पर लागू होती हैं या किसी मनुष्य पर?', 'क्या बादल सच में \'विश्व-विजयी\' होता है?" 3.', 'अब समझाएँ: "कवि बादल के माध्यम से **मनुष्य की बात** कर रहा है — यह **प्रतीकात्मक काव्य** है, वर्णनात्मक नहीं।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_009', difficulty: 'standard',
          question: '**गौण भाव** काव्य में मुख्य भाव के समानांतर चलने वाले वे प्रसंग, चित्र या.',
          hint: 'यदि मुख्य भाव अस्पष्ट है, तो c12_hin_ar_cbse_06_004 (केंद्रीय भाव और रस) दोबारा पढ़ें.',
          misconception: '**सटीक भ्रम:** छात्र समझते हैं कि \'गौण भाव\' = \'कम महत्व का भाव\' और \'विषयांतर\' = \'लेखक का भटकना/गलती\'। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**गौण भाव** काव्य में मुख्य भाव के समानांतर चलने वाले वे प्रसंग, चित्र या संवेदनाएँ हैं',
                  options: ['**गौण भाव** काव्य में मुख्य भाव के समानांतर चलने वाले वे प्रसंग, चित्र या संवेदनाएँ हैं', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'यदि मुख्य भाव अस्पष्ट है, तो c12_hin_ar_cbse_06_004 (केंद्रीय भाव और रस) दोबारा पढ़ें — विशेषकर.',
                  misconception: '**सटीक भ्रम:** छात्र समझते हैं कि \'गौण भाव\' = \'कम महत्व का भाव\' और \'विषयांतर\' = \'लेखक का भटकना/गलती\'। **वास्तविकता:** गौण भाव कविता का.' }
          ],
            remediations: { 'broadening': { steps: ['छात्र को **कविता के तीन पद** जोर से पढ़वाओ; पूछो — \'प्रत्येक पद में बादल के अलावा क्या हो रहा है?\' (गौण भाव सूचीबद्ध.', 'फिर पूछो — \'कवि अचानक अपने बचपन में क्यों चला गया?', 'क्या बादल छोड़ दिया?\' (विषयांतर की **सचेतनता** स्पष्ट करो)। 3.', '**तुलना करवाओ:** \'केवल बादल का वर्णन\' vs \'बादल + किसान + बचपन\' — कौन-सी कविता अधिक \'जीवंत\' लगी?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_010', difficulty: 'standard',
          question: 'पदावली (Vocabulary) in poetry refers to the **curated set of difficult words.',
          hint: 'यदि अटके: **c12_hin_ar_cbse_06_002 (पद्यांश-वार भावार्थ)** पर लौटें — पहले **पंक्ति का.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"कठिन शब्द = तत्सम शब्द"** और **"मुहावरा = कोई भी वाक्यांश जिसका अर्थ शब्दों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Vocabulary) in poetry refers to the **curated set of difficult words (कठिन शब्द)',
                  options: ['पदावली (Vocabulary) in poetry refers to the **curated set of difficult words (कठिन शब्द)', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'यदि अटके: **c12_hin_ar_cbse_06_002 (पद्यांश-वार भावार्थ)** पर लौटें — पहले **पंक्ति का भाव**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"कठिन शब्द = तत्सम शब्द"** और **"मुहावरा = कोई भी वाक्यांश जिसका अर्थ शब्दों के योग से अलग हो"**।.' }
          ],
            remediations: { '1': { steps: ['**पुनः पठन (Re-read):** छात्र से कहें — "कविता की **केवल पहली दो पंक्तियाँ** मौन पढ़ो, फिर **जोर से पढ़ो**। बताओ.', 'क्यों?" → **ध्वनि-बोध (phonoaesthetic awareness)** जागृत करें। 2.', '**शब्द-शल्यक्रिया (Word dissection):** एक कठिन शब्द लें (जैसे \'घनघोर\') — बोर्ड पर लिखें: **घन + घोर = घनघोर**। पूछें.', '**मुहावरा-मानचित्र (Idiom mapping):** \'बादल फटना\' लें — तीन स्तंभ बनाएँ: **शाब्दिक अर्थ / काव्यात्मक अर्थ / सांस्कृतिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग refers to the deliberate and artistic manipulation.',
          hint: 'If stuck, revisit c11_hin_a_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में.',
          misconception: '**विशिष्ट भ्रांति:** "पद्य में व्याकरण की गलतियाँ होती हैं" या "कवि व्याकरण नहीं जानते, इसलिए ऐसा लिखते हैं।" **यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग refers to the deliberate and artistic manipulation of grammatical',
                  options: ['पद्य में भाषा-प्रयोग refers to the deliberate and artistic manipulation of grammatical', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'If stuck, revisit c11_hin_a_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में भाषा-प्रयोग) where.',
                  misconception: '**विशिष्ट भ्रांति:** "पद्य में व्याकरण की गलतियाँ होती हैं" या "कवि व्याकरण नहीं जानते, इसलिए ऐसा लिखते हैं।" **यह क्यों होती है:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** \'बादल राग\' की किन्हीं 5 पंक्तियाँ चुनें। प्रत्येक को जोर से पढ़ें — पहले मूल रूप में, फिर मानक गद्य में.', '**टेबल बनाएं:** दो कॉलम — \'पद्य रूप\' और \'गद्य रूप\'। तीसरा कॉलम: \'क्या बदला?\' (लोप/क्रम/शब्द)। चौथा कॉलम: \'क्या प्रभाव.', '**शिक्षक/सहपाठी से पूछें:** "यहाँ \'में\' क्यों नहीं है?', 'अगर डाल दें तो कविता कैसी लगेगी?" — उत्तर सुनकर स्वयं निष्कर्ष निकालें। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ्य-सामग्री से.',
          hint: 'यदि प्रश्न-प्रकार पहचान में भ्रम हो तो c11_hin_a_cbse_01_012 (कक्षा 11 गद्य बोध-प्रश्न).',
          misconception: 'छात्रों की सबसे घातक भ्रांति: "वस्तुनिष्ठ प्रश्न में \'सही विकल्प चुनना\' है और आशय-सूचक में \'भावार्थ लिख देना\' है।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ्य-सामग्री से सीधे,',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ्य-सामग्री से सीधे,', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'यदि प्रश्न-प्रकार पहचान में भ्रम हो तो c11_hin_a_cbse_01_012 (कक्षा 11 गद्य बोध-प्रश्न) के.',
                  misconception: 'छात्रों की सबसे घातक भ्रांति: "वस्तुनिष्ठ प्रश्न में \'सही विकल्प चुनना\' है और आशय-सूचक में \'भावार्थ लिख देना\' है।" वास्तविकता: वस्तुनिष्ठ.' }
          ],
            remediations: { 'distractors': { steps: ['चरण 1: छात्र से कहें — "पिछले 3 वर्षों के CBSE हिंदी कोर प्रश्नपत्र (खंड ख - काव्य) निकालो और केवल \'बादल राग\' या समान.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
