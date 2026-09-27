import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch21_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch21_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch21_p1',
    title: 'कर चले हम फ़दिा · Part 1/3',
    subtitle: 'इस नोड में केवल कवि परिचय (जीवन, प्रमुख रचनाएँ, साहित्यिक योगदान) और कविता की ऐतिहासिक.',
    classLevel: 10, subject: 'hin_sp', topic: 'कर चले हम फ़दिा · Part 1/3',
    chapters: ['c10_hin_sp_ch21'],
    nodeIds: ['c10_hin_sp_cbse_21_001', 'c10_hin_sp_cbse_21_002', 'c10_hin_sp_cbse_21_003', 'c10_hin_sp_cbse_21_004', 'c10_hin_sp_cbse_21_005', 'c10_hin_sp_cbse_21_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना करें कि आप 1962 में एक रेडियो सुन रहे हैं और समाचार आता है: "चीनी सेना ने लद्दाख और अरुणाचल में हमला.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'कर चले हम फ़दिा — कवि परिचय और पृष्ठभूमि', text: '\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर युग के प्रमुख राष्ट्रीय कवि, पत्रकार और स्वतंत्रता सेनानी हैं; इस कविता की पृष्ठभूमि **1962 के भारत-चीन युद्ध** के समय की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_21_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['कर चले हम फ़दिा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_21_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through कर चले हम फ़दिा like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? कर चले हम फ़दिा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कर चले हम फ़दिा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_21_001', difficulty: 'standard',
          question: '\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 9 हिंदी स्पर्श के \'काव्य खंड\' में पढ़ी गई किसी भी.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि माखनलाल चतुर्वेदी **केवल एक भावुक देशभक्ति कवि** थे जो जोश में कविताएँ लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर युग के',
                  options: ['\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर युग के', '"कर चले हम फ़िदा" कविता के प्रत्येक पद्यांश (चार पंक्तियों के समूह) का भावार्थ स्पष्ट करना', '**काव्य-संरचना (Poetic Structure)** कविता के आंतरिक संगठन की वह योजना है जिसमें पद-विभाजन', '**केंद्रीय भाव** कविता का वह मूल संदेश या सार्वभौमिक सत्य है जिसे कवि अपनी रचना के माध्यम'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 9 हिंदी स्पर्श के \'काव्य खंड\' में पढ़ी गई किसी भी राष्ट्रीय कविता.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि माखनलाल चतुर्वेदी **केवल एक भावुक देशभक्ति कवि** थे जो जोश में कविताएँ लिखते थे। **वास्तविकता**: वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "कवि का जीवन तीन खंडों में बाँटो: (क) प्रारंभिक जीवन और शिक्षा, (ख) पत्रकारिता और स्वतंत्रता.', 'उनके जीवन के किन अनुभवों ने उन्हें यह लिखने को प्रेरित किया?" — इससे **जीवन और काव्य का संबंध** स्पष्ट होगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_21_002', difficulty: 'standard',
          question: '"कर चले हम फ़िदा" कविता के प्रत्येक पद्यांश (चार पंक्तियों के समूह) का भावार्थ.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_21_001 (कवि परिचय और पृष्ठभूमि) दोबारा पढ़ें — विशेषकर.',
          misconception: 'छात्र **प्रत्येक पद्यांश को स्वतंत्र इकाई** मानकर भावार्थ लिखते हैं — जैसे पहला पद्यांश "बलिदान", दूसरा "विदाई" — लेकिन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"कर चले हम फ़िदा" कविता के प्रत्येक पद्यांश (चार पंक्तियों के समूह) का भावार्थ स्पष्ट करना',
                  options: ['"कर चले हम फ़िदा" कविता के प्रत्येक पद्यांश (चार पंक्तियों के समूह) का भावार्थ स्पष्ट करना', '\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर युग के', '**काव्य-संरचना (Poetic Structure)** कविता के आंतरिक संगठन की वह योजना है जिसमें पद-विभाजन', '**केंद्रीय भाव** कविता का वह मूल संदेश या सार्वभौमिक सत्य है जिसे कवि अपनी रचना के माध्यम'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_21_001 (कवि परिचय और पृष्ठभूमि) दोबारा पढ़ें — विशेषकर "प्रगतिशील कविता.',
                  misconception: 'छात्र **प्रत्येक पद्यांश को स्वतंत्र इकाई** मानकर भावार्थ लिखते हैं — जैसे पहला पद्यांश "बलिदान", दूसरा "विदाई" — लेकिन **पद्यांशों के बीच.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: कविता को **एक बार में पूरी पढ़वाएं** (बिना रुके), फिर पूछें: "कहानी में क्या हुआ?', 'शुरुआत, मध्य, अंत क्या है?" — इससे **कथात्मक प्रवाह** समझ आएगा। चरण 2: प्रत्येक पद्यांश के लिए **दो प्रश्न** पूछें: (क).', '(ख) यह पिछले पद्यांश से कैसे जुड़ता है?', 'चरण 3: छात्र से **एक वाक्य में पूरी कविता का भाव-प्रवाह** लिखवाएं — जैसे: "शहीद सैनिक मरते समय अपने साथियों को देश की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_21_003', difficulty: 'standard',
          question: '**काव्य-संरचना (Poetic Structure)** कविता के आंतरिक संगठन की वह योजना है जिसमें.',
          hint: 'यदि पद-विभाजन अस्पष्ट हो → c10_hin_sp_cbse_21_002 के \'पद्यांश-वार भावार्थ\' नोट्स दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** "पद्य-विन्यास (stanza arrangement) केवल **बाहरी रूप (external form)** है — पंक्तियाँ गिनना, पद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**काव्य-संरचना (Poetic Structure)** कविता के आंतरिक संगठन की वह योजना है जिसमें पद-विभाजन',
                  options: ['**काव्य-संरचना (Poetic Structure)** कविता के आंतरिक संगठन की वह योजना है जिसमें पद-विभाजन', '\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर युग के', '"कर चले हम फ़िदा" कविता के प्रत्येक पद्यांश (चार पंक्तियों के समूह) का भावार्थ स्पष्ट करना', '**केंद्रीय भाव** कविता का वह मूल संदेश या सार्वभौमिक सत्य है जिसे कवि अपनी रचना के माध्यम'],
                  hint: 'यदि पद-विभाजन अस्पष्ट हो → c10_hin_sp_cbse_21_002 के \'पद्यांश-वार भावार्थ\' नोट्स दोबारा पढ़ें और.',
                  misconception: '**विशिष्ट भ्रांति:** "पद्य-विन्यास (stanza arrangement) केवल **बाहरी रूप (external form)** है — पंक्तियाँ गिनना, पद गिनना — इसका **भावार्थ.' }
          ],
            remediations: { 'stanza-arrangement-external-form': { steps: ['**चरण 1 (तत्काल):** कविता की **फोटोकॉपी/प्रिंटआउट** लो। प्रत्येक पद के आगे **बड़े अंकों में पद-संख्या** और **प्रत्येक.', 'हवा) — अब गिनो: **6 तत्व, 6 पंक्तियाँ**। **चरण 3 (लिखित अभ्यास):** एक वाक्य में उत्तर लिखो: "कवि ने 6 पंक्तियाँ इसलिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_21_004', difficulty: 'standard',
          question: '**केंद्रीय भाव** कविता का वह मूल संदेश या सार्वभौमिक सत्य है जिसे कवि अपनी रचना.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_21_002 (पद्यांश-वार भावार्थ)** दोबारा पढ़ें — हर पद का भाव.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **वीर रस = युद्ध/हिंसा का वर्णन**। इसलिए वे कविता में \'तोपें\', \'गोलियाँ\', \'लहू\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**केंद्रीय भाव** कविता का वह मूल संदेश या सार्वभौमिक सत्य है जिसे कवि अपनी रचना के माध्यम',
                  options: ['**केंद्रीय भाव** कविता का वह मूल संदेश या सार्वभौमिक सत्य है जिसे कवि अपनी रचना के माध्यम', '\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर युग के', '"कर चले हम फ़िदा" कविता के प्रत्येक पद्यांश (चार पंक्तियों के समूह) का भावार्थ स्पष्ट करना', '**काव्य-संरचना (Poetic Structure)** कविता के आंतरिक संगठन की वह योजना है जिसमें पद-विभाजन'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_21_002 (पद्यांश-वार भावार्थ)** दोबारा पढ़ें — हर पद का भाव लिखें, फिर.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **वीर रस = युद्ध/हिंसा का वर्णन**। इसलिए वे कविता में \'तोपें\', \'गोलियाँ\', \'लहू\' गिनाकर वीर रस सिद्ध.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: *"कविता की कोई एक पंक्ति चुनो जहाँ तुम्हें **गर्व** महसूस हो, न कि दुख। वह पंक्ति कागज़ पर लिखो।"* 2.', 'फिर पूछें: *"इस गर्व का **कारण (विभाव)** क्या है?', 'अब कहें: *"यह गर्व किस **भाव (संचारी)** को जन्म देता है?', 'अंत में मिलाएँ: *"विभाव + संचारी = स्थायी भाव (वीरता) = वीर रस।"* — इस **चरणबद्ध अभ्यास** से छात्र रस-निष्पत्ति की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_21_005', difficulty: 'standard',
          question: 'छंद (Metre) कविता की वह निश्चित लय-विधान है जिसमें प्रत्येक पंक्ति के चरणों में.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 9 की \'छंद परिचय\' पाठ्य-सामग्री (मात्रा, गण, यति) दोहराएँ.',
          misconception: '**सबसे बड़ी गलतफहमी:** छात्र समझते हैं कि \'कर चले हम फ़िदा\' में **तुक (rhyme) ही छंद है** — वे "फ़िदा/साथियों" और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद (Metre) कविता की वह निश्चित लय-विधान है जिसमें प्रत्येक पंक्ति के चरणों में मात्राओं',
                  options: ['छंद (Metre) कविता की वह निश्चित लय-विधान है जिसमें प्रत्येक पंक्ति के चरणों में मात्राओं', '\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर युग के', '"कर चले हम फ़िदा" कविता के प्रत्येक पद्यांश (चार पंक्तियों के समूह) का भावार्थ स्पष्ट करना', '**काव्य-संरचना (Poetic Structure)** कविता के आंतरिक संगठन की वह योजना है जिसमें पद-विभाजन'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 9 की \'छंद परिचय\' पाठ्य-सामग्री (मात्रा, गण, यति) दोहराएँ — विशेषकर.',
                  misconception: '**सबसे बड़ी गलतफहमी:** छात्र समझते हैं कि \'कर चले हम फ़िदा\' में **तुक (rhyme) ही छंद है** — वे "फ़िदा/साथियों" और "वतन/साथियों" की तुक.' }
          ],
            remediations: { 'rhyme': { steps: ['छात्र को **उच्चारण-आधारित मात्रा-निर्धारण** का अभ्यास कराएँ: 10 सरल शब्द (जैसे \'वतन\', \'साथी\', \'हवाले\', \'जान\', \'तन\').', 'पहली पंक्ति को साथ मिलकर **गणों में विभाजित** करें: बोर्ड पर लिखें — कर(ऽ) चले(ऽ) हम(।) फ़ि(।) दा(ऽ) | जा(ऽ) न(।) ओ(ऽ).', 'यति का **श्रवण-अभ्यास** कराएँ: छात्र आँख बंद करके पंक्ति सुने और बताए कि साँस स्वाभाविक रूप से कहाँ रुकती है — फिर उसे.', 'अंत में, छात्र से **दूसरी पंक्ति का स्वतंत्र विश्लेषण** करवाएँ और गलतियों पर चर्चा करें — "तुम्हारे" और "हवाले" जैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_21_006', difficulty: 'standard',
          question: 'अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों को उनके साधारण.',
          hint: 'यदि अटके: **c10_hin_sp_cbse_21_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_21_004.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'रूपक\' और \'उत्प्रेक्षा\' में अंतर केवल \'जैसे/वत\' शब्द का है** — यदि \'जैसे\' है तो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों को उनके साधारण अर्थ से',
                  options: ['अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों को उनके साधारण अर्थ से', '\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर युग के', '"कर चले हम फ़िदा" कविता के प्रत्येक पद्यांश (चार पंक्तियों के समूह) का भावार्थ स्पष्ट करना', '**काव्य-संरचना (Poetic Structure)** कविता के आंतरिक संगठन की वह योजना है जिसमें पद-विभाजन'],
                  hint: 'यदि अटके: **c10_hin_sp_cbse_21_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_21_004 (केंद्रीय.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'रूपक\' और \'उत्प्रेक्षा\' में अंतर केवल \'जैसे/वत\' शब्द का है** — यदि \'जैसे\' है तो उत्प्रेक्षा, नहीं तो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को दो वाक्य दें — (अ) "वह शेर **जैसे** लड़ता है" (उत्प्रेक्षा), (ब) "वह **शेर है** युद्ध में" (रूपक)।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
