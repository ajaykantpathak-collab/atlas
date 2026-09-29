import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch05_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch05_p1',
    title: 'उषा · Part 1/3',
    subtitle: 'The poem is the plough — and inequality is the field',
    classLevel: 12, subject: 'hin_ar', topic: 'उषा · Part 1/3',
    chapters: ['c12_hin_ar_ch05'],
    nodeIds: ['c12_hin_ar_cbse_05_001', 'c12_hin_ar_cbse_05_002', 'c12_hin_ar_cbse_05_003', 'c12_hin_ar_cbse_05_004', 'c12_hin_ar_cbse_05_005', 'c12_hin_ar_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Symbolic poetry reader', intro: 'A folk tale about a cornfield becomes, in a symbolist\'s hands, a field report on inequality.', goal: 'Read Makka through Kedarnath Singh\'s post-1943 symbolic method — folk tale into social allegory.' },
    discovery: {
        question: 'Kedarnath Singh says the poet isn\'t a spectator of inequality but wants to touch it \'with the plough of poetry.\' What\'s being claimed about the poem itself?',
        options: ['The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield', 'Farmers should write poems', 'Poetry is hard labour literally', 'Agriculture needs poets'],
        answer: 'The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield',
        hook: 'After 1943 his images stopped describing and started symbolising — the maize field is a rural world, the dark night its weight, the plough the poet\'s intervention. \'Makka\' grows from a folk tale: read the field as a symbolic landscape, not a sketch.',
    },
    teaching: [
        { title: 'उषा — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Work the symbolic field: trace folk-tale roots into the poem\'s images, decode what maize, night and plough each stand for, and judge a poet who ploughs inequality rather than just watching it.',
        labels: ['उषा — कवि परिचय', 'उषा — पद्यांश-वार भावार्थ', 'उषा — काव्य-संरचना और', 'उषा — केंद्रीय भाव', 'उषा — छंद और', 'उषा — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_001', title: 'उषा — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 05 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the poet of the poem \'Makka\' and what is his significance in Hindi literature?', options: [
                { text: 'The poet is Kedarnath Singh (1911–1993), a major modern Hindi poet known for his symbolic', outcome: 'The poet is Kedarnath Singh (1911–1993), a major modern Hindi poet known for his symbolic and.' },
                { text: 'another poet like Nirala or Muktibodh', outcome: 'Not quite — Students often treat the \'Before You Read\' section as optional background to skip, thinking the.', reveals: 'students-often-treat-the-before' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_004', title: 'उषा — केंद्रीय भाव और रस',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'छरह फोह्क्कोजह तक्ष झ\' में छरह-फोह्क्कोजह-तक्ष-झ से पात्र उभरता है।',
            decisions: [{ prompt: '"उषा" कविता का केंद्रीय भाव एक वाक्य में लिखिए। (केवल याददाश्त से — पाठ न देखें)', options: [
                { text: '**Correct answer:** "उषा" का केंद्रीय भाव है', outcome: '**Correct answer:** "उषा" का केंद्रीय भाव है — अंधकार और जड़ता पर चेतना और प्रकाश की अनिवार्य विजय.' },
                { text: 'उषा कविता सूर्योदय का वर्णन करती है', outcome: 'Not quite — **Students treat "केंद्रीय भाव" and "रस" as interchangeable labels** — e.g., writing "केंद्रीय भाव.', reveals: 'students-treat-and-as-interchangeable' },
                { text: 'आशा का संदेश देती है', outcome: 'Not quite — **Students treat "केंद्रीय भाव" and "रस" as interchangeable labels** — e.g., writing "केंद्रीय भाव.', reveals: 'students-treat-and-as-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a photo-story assignment, your partner wants to scrap shots of a foggy winter field — \'nothing happens in them; we need drama.\' You suspect the quiet frames are the story.',
            decisions: [{ prompt: 'How does Nirala\'s \'मक्क\' settle the argument?', options: [
                { text: 'Keep them — the poem opens on a still, frost-covered morning and ends by realising the morning itself has become the poem; the ordinary observed fully is the subject, not the preface to one.', outcome: 'The structure — observation widening into realisation — is the claim: poetic weight isn\'t imported through drama but uncovered by attention, so \'nothing happens\' frames can carry the whole piece.' },
                { text: 'Scrap them — a subject must be dramatic for the art to be strong; description without event is filler.', outcome: 'That reads the poem\'s opening stanza as waiting-room material; the chapter shows the jump from scene to insight is the poem\'s spine — cutting the \'uneventful\' images cuts the argument.', reveals: 'drama-equals-subject' },
                { text: 'Keep them but add a dramatic climax shot so the essay has a proper arc.', outcome: 'That grafts a foreign arc onto the form: \'मक्क\' resolves by deepening the view, not by injecting an event — the epiphany is that nothing needed to happen.', reveals: 'arc-needs-a-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a poem\'s images as instruments of change — symbolism that works the soil instead of framing it.',
            decisions: [{ prompt: 'What comes next? उषा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — उषा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_08_001 (Imagery and Metaphor) and.',
          misconception: 'Students often treat the \'Before You Read\' section as optional background to skip, thinking the poem speaks for itself.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक', '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)', '\'छरह फोह्क्कोजह तक्ष झ\' का पात्र-चित्रण'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_08_001 (Imagery and Metaphor) and.',
                  misconception: 'Students often treat the \'Before You Read\' section as optional background to skip, thinking the poem speaks for itself.' }
          ],
            remediations: { 'students-often-treat-the-before': { steps: ['If a student cannot articulate the poet\'s symbolic method or the folk tale connection, do NOT have them re-read the.', 'Instead: (1) Give them a 2-minute oral summary: \'Kedarnath Singh = symbolic poet; "Makka" = folk tale turned symbolic.', '(3) Re-diagnose with Diagnostic Question 4 — if they can now explain the metaphor, they\'ve grasped the core.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_002', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक — \'छरह फोह्क्कोजह तक्ष झ\' — आरोह भाग-2 का पाठ।.',
          hint: 'अगर अटकें तो \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_002) के पहले दो पद्यांशों का भावार्थ.',
          misconception: 'छात्र समझते हैं कि \'पद्यांश-वार भावार्थ\' का अर्थ है प्रत्येक पद्यांश का शब्दार्थ (word-meaning) लिख देना। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक',
                  options: ['\'छरह फोह्क्कोजह तक्ष झ\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)', '\'छरह फोह्क्कोजह तक्ष झ\' का पात्र-चित्रण'],
                  hint: 'अगर अटकें तो \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_002) के पहले दो पद्यांशों का भावार्थ फिर से.',
                  misconception: 'छात्र समझते हैं कि \'पद्यांश-वार भावार्थ\' का अर्थ है प्रत्येक पद्यांश का शब्दार्थ (word-meaning) लिख देना। वास्तव में भावार्थ में: (1).' }
          ],
            remediations: { 'word-meaning-1': { steps: ['चरण 1: छात्र से कहें — "पहले पद्यांश को पढ़कर आँख बंद करें और बताएँ क्या दृश्य उभरता है?" (दृश्यकरण/visualization)। चरण.', 'प्रतीक्षा?" (भावानुभूति/affective response)। चरण 3: फिर कहें — "अब कवि के शब्दों में कौन-सा शब्द इस भाव को ले जाता है?', '\'टुकड़ा\' क्यों लिखा, \'भाग\' क्यों नहीं?" (शब्द-चयन विश्लेषण/word choice analysis)। चरण 4: अंत में — "दूसरे पद्यांश में.', 'वह बदलाव पहले पद्यांश के किस शब्द से जुड़ा है?" (संक्रमण विश्लेषण/transition analysis)। इस 4-चरणीय प्रक्रिया को 2-3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_003', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'अगर पद-क्रम का भाव-तर्क न दिखे, तो c11_hin_ar_cbse_16_003 (आओ, मलिकर बचाएँ.',
          misconception: 'छात्र समझते हैं कि \'काव्य-संरचना\' = पदों की गिनती + छंद का नाम। वास्तव में, उषा में **पद-क्रम भाव-तर्क से बंधा है**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)',
                  options: ['\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक', '\'छरह फोह्क्कोजह तक्ष झ\' का पात्र-चित्रण'],
                  hint: 'अगर पद-क्रम का भाव-तर्क न दिखे, तो c11_hin_ar_cbse_16_003 (आओ, मलिकर बचाएँ — काव्य-संरचना) के.',
                  misconception: 'छात्र समझते हैं कि \'काव्य-संरचना\' = पदों की गिनती + छंद का नाम। वास्तव में, उषा में **पद-क्रम भाव-तर्क से बंधा है**: प्रत्येक पद पिछले पद.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: उषा कविता को **स्वर में पढ़कर** रिकॉर्ड करो, फिर सुनो — कहाँ साँस स्वाभाविक रुकती है?', 'वही पद-संधि है। चरण 2: हर पद के लिए लिखो: "यह पद पिछले पद का **कौन-सा प्रश्न हल करता है** और **कौन-सा नया प्रश्न खड़ा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_004', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'If stuck, revisit **c11_hin_a_cbse_13_004** (जाग तुझको दूर जाना — केंद्रीय भाव और रस) and.',
          misconception: '**Students treat "केंद्रीय भाव" and "रस" as interchangeable labels** — e.g., writing "केंद्रीय भाव: वीर रस" or "रस.',
          parts: [
                { id: 'a', prompt: '"उषा" कविता का केंद्रीय भाव एक वाक्य में लिखिए। (केवल याददाश्त से — पाठ न देखें)', answer: '**Correct answer:** "उषा" का केंद्रीय भाव है',
                  options: ['**Correct answer:** "उषा" का केंद्रीय भाव है', 'उषा कविता सूर्योदय का वर्णन करती है', 'आशा का संदेश देती है'],
                  hint: 'If stuck, revisit **c11_hin_a_cbse_13_004** (जाग तुझको दूर जाना — केंद्रीय भाव और रस) and re-do the.',
                  misconception: '**Students treat "केंद्रीय भाव" and "रस" as interchangeable labels** — e.g., writing "केंद्रीय भाव: वीर रस" or "रस: आशा" — because both are.' },
                { id: 'b', prompt: '"उषा" कविता में **वीर रस** की निष्पत्ति (manifestation) कैसे होती है? विभाव, अनुभाव, और संचारी भाव — तीनों की दृष्टि से एक-एक उदाहरण देकर समझाइए।', answer: '**Correct answer with steps:** 1',
                  options: ['**Correct answer with steps:** 1', 'नवजीवन का संचार', 'उषा का आना'],
                  hint: 'If stuck, revisit **c11_hin_a_cbse_13_004** (जाग तुझको दूर जाना — केंद्रीय भाव और रस) and re-do the.',
                  misconception: '**Students treat "केंद्रीय भाव" and "रस" as interchangeable labels** — e.g., writing "केंद्रीय भाव: वीर रस" or "रस: आशा" — because both are.' }
          ],
            remediations: { 'students-treat-and-as-interchangeable': { steps: ['** Give them two columns — left: "कथन/विचार" (proposition), right: "आस्वाद/भावना" (relishable feeling).', '** Show the **rasa formula**: स्थायी भाव + विभाव + अनुभाव + संचारी भाव = रस.', '** Assign a micro-task: "Pick any *other* poem (e.g., \'बादल को घिरते देखा है\') and write its केंद्रीय भाव in one.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_005', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि मात्रा-निर्धारण में अटके: **संयुक्त व्यंजन नियम** (जैसे \'किरण\' = कि+रण → गुरु+गुरु).',
          misconception: '**"छंद = तुकांत (Rhyme)"** — यह सबसे घातक भ्रम है। छात्र सोचते हैं कि यदि पंक्तियों के अंत में तुक (राइम) है, तो छंद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'छरह फोह्क्कोजह तक्ष झ\' के सहायक पात्र',
                  options: ['\'छरह फोह्क्कोजह तक्ष झ\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक', '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मात्रा-निर्धारण में अटके: **संयुक्त व्यंजन नियम** (जैसे \'किरण\' = कि+रण → गुरु+गुरु) और.',
                  misconception: '**"छंद = तुकांत (Rhyme)"** — यह सबसे घातक भ्रम है। छात्र सोचते हैं कि यदि पंक्तियों के अंत में तुक (राइम) है, तो छंद है; और यदि तुक नहीं.' }
          ],
            remediations: { 'rhyme': { steps: ['**पुनः अभ्यास:** Class 11 के **\'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_005)** और **\'घर में वापसी\'.', '**मात्रा-तालिका बनाएँ:** देवनागरी वर्णमाला के प्रत्येक वर्ण की मात्रा (लघु/गुरु) लिखकर दीवार पर चिपकाएँ — संयुक्त.', '**पुनः-निदान (Re-diagnostic):** अगले 3 दिन रोज एक पंक्ति (किसी भी कविता की) लें, मात्रा चिह्नित करें, गण बनाएँ, यति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_006', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' का मुख्य विषय — \'छरह फोह्क्कोजह तक्ष झ\' का केंद्रीय भाव.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_16_006** (आओ, मलिकर बचाएँ — अलंकार) के.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि \'जैसे/सी/समान\' शब्द आने पर **सदैव उपमा** ही होती है — जबकि \'उषा\' में "चाँद-सी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'छरह फोह्क्कोजह तक्ष झ\' का मुख्य विषय',
                  options: ['\'छरह फोह्क्कोजह तक्ष झ\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक', '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_16_006** (आओ, मलिकर बचाएँ — अलंकार) के \'उपमा-रूपक-उत्प्रेक्षा तुलना.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि \'जैसे/सी/समान\' शब्द आने पर **सदैव उपमा** ही होती है — जबकि \'उषा\' में "चाँद-सी शीतल" उपमा है, लेकिन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** Class 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_006) और \'आओ, मलिकर बचाएँ\' (c11_hin_ar_cbse_16_006) के.', '**चरण 2:** \'उषा\' कविता के 5 पदों में से प्रत्येक से **एक-एक अलंकार** निकालकर उसकी **पहचान → भेद → उपमान/उपमेय/सूचक →.', '**चरण 3:** किसी सहपाठी को समझाएँ — यदि आप समझा सके तो मास्टरी है, नहीं तो चरण 1 पर लौटें। 4.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_2 और 4 को फिर से हल करें — अब सही होने चाहिए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
