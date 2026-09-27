import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch02_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch02_p1',
    title: 'पतंग · Part 1/3',
    subtitle: 'A poem that mourns without ever complaining',
    classLevel: 12, subject: 'hin_ar', topic: 'पतंग · Part 1/3',
    chapters: ['c12_hin_ar_ch02'],
    nodeIds: ['c12_hin_ar_cbse_02_001', 'c12_hin_ar_cbse_02_002', 'c12_hin_ar_cbse_02_003', 'c12_hin_ar_cbse_02_004', 'c12_hin_ar_cbse_02_005', 'c12_hin_ar_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Contemporary Hindi poetry reader', intro: 'A book-length poem built to hold a vanishing world — one precise image at a time.', goal: 'Read Patang inside Alok Dhanva\'s long poem — science-trained observation as elegy for a disappearing rural world.' },
    discovery: {
        question: 'A poet watches the village world of his childhood dissolve — yet never once writes in complaint. How does a poem protest without protesting?',
        options: ['Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique', 'By staying silent', 'By blaming politicians', 'It can\'t — complaint is required'],
        answer: 'Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique',
        hook: '\'No tone of complaint\' doesn\'t mean no criticism — the poet is also a science communicator, so the poem works like field notes: concrete, sensory, exact. It\'s one movement of a single book-length poem, an architecture of memory against erasure.',
    },
    teaching: [
        { title: 'पतंग — कवि परिचय और पृष्ठभूमि', text: '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की आकांक्षाओं, स्वतंत्रता की लालसा, और सामाजिक-परिवारिक बंधनों के द्वंद्व** को व्यक्त किया गया है; कवि परिचय में.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the long poem as preservation work: follow childhood idyll into encroaching modernity, weigh what the three-part textbook split gains and costs, and hear critique inside pure description.',
        labels: ['पतंग — कवि परिचय', 'पतंग — पद्यांश-वार भावार्थ', 'पतंग — काव्य-संरचना और', 'पतंग — केंद्रीय भाव', 'पतंग — छंद और', 'पतंग — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Curating a farewell exhibit, a teammate dismisses a photo essay of childhood monsoons — paper boats, wet gullies — as \'cute nostalgia with no real content.\' You think it\'s the strongest piece submitted.',
            decisions: [{ prompt: 'How does Kunwar Narain\'s poem structure defend the piece?', options: [
                { text: 'Point to the architecture — the poem moves from a concrete childhood scene to an adult meditation, showing memory isn\'t a discarded past but a layer still alive under the present; the essay\'s small wet moments are the vessel for a universal claim.', outcome: 'The poem proves that juxtaposing then and now is how memory actually works — the \'content\' is the endurance of childhood, not the boats themselves.' },
                { text: 'Concede — childhood images are sentimental raw material until they\'re processed into a serious argument.', outcome: 'That inverts the poem\'s method: the concrete scene is what earns the abstract reflection; stripping the sensory ground leaves the \'argument\' with nothing to stand on.', reveals: 'nostalgia-is-not-content' },
                { text: 'Defend it only as emotion — \'it feels true\' is enough without needing structure talk.', outcome: 'Feeling without structure undersells the piece: the chapter\'s point is that the arrangement — present tense scene widening into reflection — is what converts one person\'s memory into everyone\'s.', reveals: 'emotion-needs-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a poem argue without ever accusing — the nayi kavita way of making images carry the whole weight.',
            decisions: [{ prompt: 'What comes next? पतंग · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पतंग · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_001', difficulty: 'standard',
          question: '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_13_001 (मुक्तिबोध — कवि परिचय)** और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र अलोक धन्वा को **\'केवल जनवादी कवि\'** मान लेते हैं और उनकी कविताओं में **व्यक्तिगत संवेदना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की',
                  options: ['\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_13_001 (मुक्तिबोध — कवि परिचय)** और **c11_hin_ar_cbse_14_001.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र अलोक धन्वा को **\'केवल जनवादी कवि\'** मान लेते हैं और उनकी कविताओं में **व्यक्तिगत संवेदना, सौंदर्य-बोध, और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम**: छात्र से पूछें — "अलोक धन्वा की किन्हीं दो अन्य कविताओं (जैसे \'सुनो कारीगर\', \'पहाड़\') के नाम बताओ और.', '**दूसरा कदम**: उन्हें **c11_hin_ar_cbse_13_001 (जाग तुझको दूर जाना — कवि परिचय और पृष्ठभूमि)** और.', '**तीसरा कदम**: पुनः निदान: "अब \'पतंग\' की पृष्ठभूमि में जेपी आंदोलन के अलावा कौन-सा व्यक्तिगत प्रसंग हो सकता है?" — यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ.',
          hint: 'यदि अटके तो कक्षा 11 के नोड c11_hin_ar_cbse_16_002 \'आओ, मिलकर बचाएँ — पद्यांश-वार.',
          misconception: 'छात्र समझते हैं कि \'पद्यांश-वार भावार्थ\' का अर्थ है प्रत्येक पंक्ति का हिंदी अनुवाद लिख देना। वास्तव में भावार्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना'],
                  hint: 'यदि अटके तो कक्षा 11 के नोड c11_hin_ar_cbse_16_002 \'आओ, मिलकर बचाएँ — पद्यांश-वार भावार्थ\' को.',
                  misconception: 'छात्र समझते हैं कि \'पद्यांश-वार भावार्थ\' का अर्थ है प्रत्येक पंक्ति का हिंदी अनुवाद लिख देना। वास्तव में भावार्थ = शाब्दिक अर्थ + प्रसंग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता का केवल पहला पद्यांश दें और पूछें: \'यहाँ कवि क्या देख रहा है?', 'अगले पद्यांश में क्या हो सकता है?\' — केवल मौखिक चर्चा से शुरू करें। 2.', 'फिर \'शब्द-अर्थ\', \'सरलार्थ\', \'भावार्थ\' — तीन स्तंभों की सारणी बनवाएँ पहले पद्यांश के लिए। 3.', 'जब वे तीनों स्तंभ भर लें, तब दूसरे पद्यांश पर बढ़ें और पूछें: \'पहले पद्यांश का कौन-सा भाव यहाँ आगे बढ़ा?\' 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन.',
          hint: 'यदि अटके तो कक्षा 11 आरोह की \'आओ, मिलकर बचाएँ\' (c11_hin_ar_cbse_16_003) या \'जाग तुझको दूर.',
          misconception: '**विशिष्ट भ्रम:** "मुक्त छंद का अर्थ है **कोई संरचना नहीं** (no structure), इसलिए उसका विश्लेषण नहीं किया जा सकता।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,',
                  options: ['काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना'],
                  hint: 'यदि अटके तो कक्षा 11 आरोह की \'आओ, मिलकर बचाएँ\' (c11_hin_ar_cbse_16_003) या \'जाग तुझको दूर जाना\'.',
                  misconception: '**विशिष्ट भ्रम:** "मुक्त छंद का अर्थ है **कोई संरचना नहीं** (no structure), इसलिए उसका विश्लेषण नहीं किया जा सकता।" **क्यों होता है:**.' }
          ],
            remediations: { 'no-structure': { steps: ['**पुनर्पाठ (Re-read):** कविता को **तीन बार** पढ़ो — पहली बार केवल अर्थ के लिए, दूसरी बार **पेंसिल से पंक्ति-विराम और.', '**तुलना शीट बनाओ:** दो कॉलम — \'छंदबद्ध कविता (जैसे दोहा/चौपाई)\' vs \'पतंग (मुक्त छंद)\' — पंक्ति-लंबाई, तुक, मीटर.', '**लघु-लेखन:** 100 शब्दों में लिखो: "मुक्त छंद में संरचना कहाँ से आती है?" — उत्तर में \'भाव-प्रवाह\', \'बिंब-तर्क\'.', '**पुनः-निदान:** उपरोक्त DIAGNOSTIC_QUESTION_4 और 5 दोबारा हल करो; यदि अब सही आते हैं, अगले नोड (c12_hin_ar_cbse_02_004).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित.',
          hint: 'यदि रस-निष्पत्ति के चरण (विभाव/अनुभाव/संचारी भाव) पहचानने में अटके तो.',
          misconception: 'छात्र अक्सर समझते हैं कि केंद्रीय भाव = कविता का विषय (topic) होता है, जैसे \'पतंग उड़ाना\' — जबकि केंद्रीय भाव विषय का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना',
                  options: ['केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,'],
                  hint: 'यदि रस-निष्पत्ति के चरण (विभाव/अनुभाव/संचारी भाव) पहचानने में अटके तो c11_hin_a_cbse_13_004 और.',
                  misconception: 'छात्र अक्सर समझते हैं कि केंद्रीय भाव = कविता का विषय (topic) होता है, जैसे \'पतंग उड़ाना\' — जबकि केंद्रीय भाव विषय का गहरा अर्थ (theme) है.' }
          ],
            remediations: { 'topic': { steps: ['छात्र को पहले \'विभाव, अनुभाव, संचारी भाव\' की परिभाषाएँ c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय भाव और रस).', 'फिर \'पतंग\' कविता के प्रत्येक पद को पढ़कर तीनों भाव अलग-अलग रंग से रेखांकित करवाएँ। 3.', 'अंत में एक टेबल बनवाएँ: पद | विभाव | अनुभाव | संचारी भाव | रस — इससे रस-निष्पत्ति प्रक्रिया स्पष्ट हो जाएगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_005', difficulty: 'standard',
          question: 'छंद (meter) कविता की वह निश्चित मात्रिक या वर्णिक संरचना है जो प्रत्येक पंक्ति.',
          hint: 'यदि मात्रा-गणना में अटके तो c11_hin_ar_cbse_16_005 के WORKED_EXAMPLE_1 को दोहराएँ — वहाँ.',
          misconception: 'छात्र प्रायः **\'तुक मिलान\' (rhyme matching) को ही \'छंद-निर्धारण\' (meter identification) समझ लेते हैं** — उदाहरण के लिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद (meter) कविता की वह निश्चित मात्रिक या वर्णिक संरचना है जो प्रत्येक पंक्ति के वजन',
                  options: ['छंद (meter) कविता की वह निश्चित मात्रिक या वर्णिक संरचना है जो प्रत्येक पंक्ति के वजन', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,'],
                  hint: 'यदि मात्रा-गणना में अटके तो c11_hin_ar_cbse_16_005 के WORKED_EXAMPLE_1 को दोहराएँ — वहाँ "आओ मलिकर.',
                  misconception: 'छात्र प्रायः **\'तुक मिलान\' (rhyme matching) को ही \'छंद-निर्धारण\' (meter identification) समझ लेते हैं** — उदाहरण के लिए, "आसमान/जान/उड़ान".' }
          ],
            remediations: { 'rhyme-matching-meter-identification': { steps: ['छात्र को **मात्रा-गणना का अभ्यास** कराएँ: NCERT कक्षा 11 \'आओ मलिकर बचाएँ\' (c11_hin_ar_cbse_16_005) के छंद-विश्लेषण को.', '**यति-चिह्नीकरण** का अभ्यास: कविता की 5 पंक्तियाँ जोर से पढ़वाएँ, जहाँ स्वाभाविक साँस रुके वहाँ \'/\' लगवाएँ, फिर मात्रा.', '**तुक vs अनुप्रास** का अंतर स्पष्ट करने के लिए न्यूनतम युग्म (minimal pairs) दें: "कमल/कमल" (तुक) vs "कमल/कलम".', 'पुनः निदान: c12_hin_ar_cbse_02_005 के DIAGNOSTIC_QUESTION_1 और 3 को दोहराएँ — यदि अब सही हो तो आगे बढ़ें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_006', difficulty: 'standard',
          question: 'अलंकार काव्य-सौंदर्य को बढ़ाने वाली वह रचनात्मक युक्ति है जिसमें शब्दों या.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_13_008 (जाग तुझको दूर जाना — अलंकार)** और.',
          misconception: 'छात्र प्रायः **उपमा और रूपक को केवल "जैसा/वैसा" शब्द की उपस्थिति/अनुपस्थिति तक सीमित कर देते हैं** — वे यह नहीं समझते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार काव्य-सौंदर्य को बढ़ाने वाली वह रचनात्मक युक्ति है जिसमें शब्दों या अर्थों के',
                  options: ['अलंकार काव्य-सौंदर्य को बढ़ाने वाली वह रचनात्मक युक्ति है जिसमें शब्दों या अर्थों के', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_13_008 (जाग तुझको दूर जाना — अलंकार)** और **c11_hin_ar_cbse_14_008.',
                  misconception: 'छात्र प्रायः **उपमा और रूपक को केवल "जैसा/वैसा" शब्द की उपस्थिति/अनुपस्थिति तक सीमित कर देते हैं** — वे यह नहीं समझते कि रूपक **आरोप.' }
          ],
            remediations: { 'superimposition': { steps: ['छात्र को **उपमा-रूपक भेद** स्पष्ट करने के लिए 5-5 उदाहरण दें: (क) उपमा वाले वाक्य, (ख) उन्हीं को रूपक में बदलें — अंतर.', 'कविता "पतंग" की किन्हीं 3 पंक्तियों में आए अलंकारों की **टेबल** बनवाएँ: स्तंभ — पंक्ति, अलंकार नाम, प्रकार, घटक.', 'पुनः निदान: DIAGNOSTIC_QUESTION_1 और 3 फिर से करवाएँ — यदि अब सही हों तो अगले नोड (प्रतीक और बिंब) पर बढ़ें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
