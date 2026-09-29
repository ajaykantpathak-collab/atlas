import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch24_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch24_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch24_p1',
    title: 'डायरी का एक पन्ना · Part 1/3',
    subtitle: 'यह नोड केवल **पृष्ठभूमि और रचनाकार परिचय** तक सीमित है — इसमें पाठ का कथानक.',
    classLevel: 10, subject: 'hin_sp', topic: 'डायरी का एक पन्ना · Part 1/3',
    chapters: ['c10_hin_sp_ch24'],
    nodeIds: ['c10_hin_sp_cbse_24_001', 'c10_hin_sp_cbse_24_002', 'c10_hin_sp_cbse_24_003', 'c10_hin_sp_cbse_24_004', 'c10_hin_sp_cbse_24_005', 'c10_hin_sp_cbse_24_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'पाठ के परिचय-खंड से राय-परिवार का तीन-पीढ़ी चार्ट बनाइए: दादा उपेंद्रकिशोर (छपाई, प्रकाशन, प्राविधिक कौतूहल).', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'डायरी का एक पन्ना — पृष्ठभूमि और रचनाकार परिचय', text: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार, लेखक, चित्रकार), उनकी बांग्ला परिवेश-विरासत — पिता सुकुमार राय (चित्रकार, कल्पनाशील लेखक, तकनीकी मेधावी) और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_24_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['डायरी का एक पन्ना'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_24_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through डायरी का एक पन्ना like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? डायरी का एक पन्ना · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — डायरी का एक पन्ना · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_001', difficulty: 'standard',
          question: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम.',
          hint: 'यदि अटके तो कक्षा 9 की डायरी-विधा (अन्य पाठों जैसे \'डायरी के पन्ने\' या \'अन्य डायरी अंश\').',
          misconception: '**विशिष्ट भ्रम:** अधिकांश छात्र \'पृष्ठभूमि और रचनाकार परिचय\' को **\'जीवनी के तथ्य रटना\'** (जन्मतिथि, मृत्युतिथि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,',
                  options: ['इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)', '\'डायरी का एक पन्ना\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो कक्षा 9 की डायरी-विधा (अन्य पाठों जैसे \'डायरी के पन्ने\' या \'अन्य डायरी अंश\') की.',
                  misconception: '**विशिष्ट भ्रम:** अधिकांश छात्र \'पृष्ठभूमि और रचनाकार परिचय\' को **\'जीवनी के तथ्य रटना\'** (जन्मतिथि, मृत्युतिथि, पुरस्कारों की सूची, फिल्मों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार:** (1) **पहला चरण:** छात्र से कहें — "राय की कोई एक फिल्म (पथेर पांचाली / अपराजितो / अपूर संसार) का कोई.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_002', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' का कथानक — \'डायरी का एक पन्ना\' — स्पर्श भाग-2 का पाठ। पाठ.',
          hint: 'अगर अटके तो नोड 001 (पृष्ठभूमि और रचनाकार परिचय) के \'डायरी-विधा की विशेषताएँ\' भाग को.',
          misconception: 'छात्र समझते हैं कि \'कथानक\' और \'आख्यान-संरचना\' एक ही चीज़ हैं — इसलिए वे केवल घटनाओं का क्रम लिख देते हैं (पहले ये हुआ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' का कथानक',
                  options: ['\'डायरी का एक पन्ना\' का कथानक', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)', '\'डायरी का एक पन्ना\' का पात्र-चित्रण'],
                  hint: 'अगर अटके तो नोड 001 (पृष्ठभूमि और रचनाकार परिचय) के \'डायरी-विधा की विशेषताएँ\' भाग को दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'कथानक\' और \'आख्यान-संरचना\' एक ही चीज़ हैं — इसलिए वे केवल घटनाओं का क्रम लिख देते हैं (पहले ये हुआ, फिर वो हुआ) और यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "पाठ की 5 प्रमुख घटनाएँ तारीखवार लिखो।" (यह कथानक बनेगा)। चरण 2: फिर पूछो — "लेखक ने इन्हें *इसी*.', 'उसने कहाँ अतीत को वर्तमान के बीच डाला?" (यह संरचना खोलेगा)। चरण 3: एक टेबल बनवाओ — कॉलम: \'घटना (कथानक)\' | \'पाठ में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_003', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटके तो \'डायरी का एक पन्ना — कथानक और आख्यान-संरचना\' (c10_hin_sp_cbse_24_002) दोबारा.',
          misconception: 'छात्र अक्सर \'परिवेश\' को केवल \'स्थान\' (Setting = Place) समझ लेते हैं और उत्तर में लिख देते हैं: "परिवेश गांव है" या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)',
                  options: ['\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो \'डायरी का एक पन्ना — कथानक और आख्यान-संरचना\' (c10_hin_sp_cbse_24_002) दोबारा पढ़ें और.',
                  misconception: 'छात्र अक्सर \'परिवेश\' को केवल \'स्थान\' (Setting = Place) समझ लेते हैं और उत्तर में लिख देते हैं: "परिवेश गांव है" या "परिवेश सुबह का समय है"।.' }
          ],
            remediations: { 'setting-place': { steps: ['चरण 1: छात्र से कहें कि वह अपनी कक्षा के अभी के परिवेश को पांचों घटकों में लिखे (काल: अभी का समय, स्थान: कक्षा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_004', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटके: c10_hin_sp_cbse_24_001 (पृष्ठभूमि) और c10_hin_sp_cbse_24_002 (कथानक) को दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पात्र-चित्रण\' = \'पात्र के गुणों की सूची बनाना\' (listing traits)। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' का पात्र-चित्रण',
                  options: ['\'डायरी का एक पन्ना\' का पात्र-चित्रण', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: c10_hin_sp_cbse_24_001 (पृष्ठभूमि) और c10_hin_sp_cbse_24_002 (कथानक) को दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पात्र-चित्रण\' = \'पात्र के गुणों की सूची बनाना\' (listing traits)। वे लिखते हैं: "नायक ईमानदार.' }
          ],
            remediations: { 'listing-traits': { steps: ['**चरण 1:** छात्र से कहें: "एक गुण चुनो जो तुम्हें लगता है नायक में है। अब पाठ खोलकर **वह एक पंक्ति/प्रसंग ढूँढो** जहाँ.', '**चरण 2:** उस प्रसंग को **PEEL संरचना** में लिखवाएँ: Point (गुण), Evidence (पंक्ति), Explanation (यह गुण कैसे सिद्ध.', '**चरण 3:** दोहराएँ 3-4 गुणों के लिए। फिर सभी को जोड़कर **अनुच्छेद (paragraph)** बनवाएँ, सूची नहीं। 4.', '**चरण 4:** अंत में पूछें: "क्या नायक में कोई कमी भी है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_005', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_24_004 (नायक का चरित्र-चित्रण)** दोहराएँ — विशेषकर नायक की.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि सहायक पात्रों के चरित्र-चित्रण में केवल उनका **स्वभाव (nature)** बताना काफी है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' के सहायक पात्र',
                  options: ['\'डायरी का एक पन्ना\' के सहायक पात्र', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_24_004 (नायक का चरित्र-चित्रण)** दोहराएँ — विशेषकर नायक की.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि सहायक पात्रों के चरित्र-चित्रण में केवल उनका **स्वभाव (nature)** बताना काफी है — जैसे "माँ दयालु.' }
          ],
            remediations: { 'nature': { steps: ['**पहला कदम**: छात्र से कहें — "पाठ खोलो, माँ/बहन/पड़ोसी के हर संवाद के आगे एक तीर (→) खींचो और लिखो: यह नायक को क्या.', '**दूसरा कदम**: तीन कॉलम की शीट बनवाएँ — पात्र | संवाद/कृत्य | नायक पर प्रभाव (भावना + क्रिया)। 3.', '**तीसरा कदम**: प्रत्येक पात्र के लिए एक **थीमैटिक वाक्य (thematic sentence)** लिखवाएँ — "यह पात्र नायक के ______ को.', '**चौथा कदम**: दो पात्रों की तुलना करवाएँ — "माँ और दोस्त नायक को विपरीत दिशाओं में खींचते हैं — कैसे?" **मूल मंत्र**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_006', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' का मुख्य विषय — \'डायरी का एक पन्ना\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अटके तो **पात्र-चित्रण नोड (c10_hin_sp_cbse_24_004)** दोबारा पढ़ें — विशेषकर \'आंतरिक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'मुख्य विषय\' को \'कथानक का सारांश\' (plot summary) लिख देते हैं** — जैसे "लेखक अस्पताल में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' का मुख्य विषय',
                  options: ['\'डायरी का एक पन्ना\' का मुख्य विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **पात्र-चित्रण नोड (c10_hin_sp_cbse_24_004)** दोबारा पढ़ें — विशेषकर \'आंतरिक गुण\' वाला.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'मुख्य विषय\' को \'कथानक का सारांश\' (plot summary) लिख देते हैं** — जैसे "लेखक अस्पताल में ड्यूटी करता था, रोगी.' }
          ],
            remediations: { 'plot-summary': { steps: ['**चरणबद्ध उपचार:** (1) छात्र से कहें: "पाठ की **किन्हीं तीन प्रविष्टियों** से एक-एक वाक्य उठाओ जहां लेखक के **मन का.', 'नहीं। **संतोष/गरिमा/कर्तव्य-बोध**?', 'हाँ।" (4) अब कहें: "यही समान भाव **मुख्य विषय** है; इसे एक वाक्य में लिखो।" (5) अभ्यास हेतु अन्य पाठ (जैसे \'बड़े भाई.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
