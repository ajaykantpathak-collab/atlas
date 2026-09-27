import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch03_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'Watch a first creative act survive its own terror — and its own comedy.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c11_hin_ar_ch03'],
    nodeIds: ['c11_hin_ar_cbse_03_007', 'c11_hin_ar_cbse_03_008', 'c11_hin_ar_cbse_03_009', 'c11_hin_ar_cbse_03_010', 'c11_hin_ar_cbse_03_011', 'c11_hin_ar_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time creator guarding a small bottle of ink', intro: 'An adult writer looks back at the day everything that could go wrong on a makeshift stage did — and the dream survived anyway.', goal: 'Read the ink bottle as a symbol of fragile creative courage and locate the play-night climax.' },
    discovery: {
        question: 'A story built around a tiny ink bottle — \'दाई साल\' of a first attempt. Just a prop on a desk?',
        options: ['No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins', 'Yes — objects in titles are always decorative', 'No — the ink is secretly magical', 'Yes — the real subject is the writing desk'],
        answer: 'No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins',
        hook: 'The Nayi Kahani writer makes the labour of writing itself the story — doubt, ghosts, landlords and all.',
    },
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो कृति के मुख्य विषय के समानांतर चलता हुआ, उसे विस्तार, गहराई, यथार्थपरकता और बहुआयामिता प्रदान करता है तथा पात्रों के आंतरिक द्वंद्व या सामाजिक परिवेश को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track a first creative attempt through its chaos — the stage, the mix-up of two actors as one \'भूत\' — and ask why the imperfection is the point.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 2/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दावली (शब्द-चयन), वाक्य-संरचना.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर पाठ में स्पष्टतः लिखे तथ्यों, घटनाओं, पात्रों या.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary magazine plans a feature on \'writers writing about writing.\' A junior editor suggests Ikappiya\'s story but calls it \'a plain autobiography of a struggling writer — Nayi Kahani is just a label to memorise for exams.\'',
            decisions: [{ prompt: 'How do you pitch the story properly?', options: [
                { text: 'Pitch it as the Nayi Kahani sensibility in action: written in 1955, in a newly independent nation redefining its voice, the story rejects romantic idealism for middle-class realism — a writer afraid to dip his pen, the tiny ink bottle as symbol of fragile creation. The retrospective adult narration adds reflection and dramatic irony; the meandering, episode-based structure is the movement\'s rejection of plot-driven storytelling.', outcome: 'The feature now explains why a 1955 story about fearing a blank page matters differently — context turns autobiography into a movement\'s manifesto.' },
                { text: 'Run it as autobiography — the author\'s own struggle told straight, no movement talk needed.', outcome: 'Dropping the Nayi Kahani frame misreads the structure: the episodic drift and reflective hindsight are deliberate craft, not diary habits.', reveals: 'story-is-plain-autobiography' },
                { text: 'Extract a moral instead — \'every writer should just start writing\' — for an inspirational box item.', outcome: 'The story isn\'t a productivity lesson; it\'s about the doubt and precarity of becoming a writer when the nation itself is finding its voice.', reveals: 'story-is-motivation-piece' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'The botched performance isn\'t failure — it\'s proof that art gets made by people who risk wasting their only ink.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो कृति के मुख्य विषय के समानांतर.',
          hint: 'यदि अटके तो \'मुख्य विषय और संदेश\' (नोड 006) और \'पात्र-चित्रण\' (नोड 004, 005) दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = उपकथानक (sub-plot)" और दोनों को समानार्थी समझकर उत्तर लिख देते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो कृति के मुख्य विषय के समानांतर चलता हुआ,',
                  options: ['गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो कृति के मुख्य विषय के समानांतर चलता हुआ,', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the foundational', 'कथानक (Plot) कृति में घटित घटनाओं का कारण-परिणाम (Cause-Effect) पर आधारित तार्किक क्रम', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में वर्णित वह समग्र स्पेशियो-टेम्पोरल,'],
                  hint: 'यदि अटके तो \'मुख्य विषय और संदेश\' (नोड 006) और \'पात्र-चित्रण\' (नोड 004, 005) दोबारा पढ़ें — विशेष.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = उपकथानक (sub-plot)" और दोनों को समानार्थी समझकर उत्तर लिख देते हैं। **गलत तर्क:**.' }
          ],
            remediations: { 'sub-plot-sub-plot': { steps: ['**स्पष्टीकरण (2 मिनट):** बोर्ड पर लिखें — "उपकथानक = *क्या होता है* (घटनाएँ); गौण विषय = *क्या अर्थ निकलता है*.', '**अभ्यास (5 मिनट):** पाठ 3 से 3 प्रसंग दें, छात्र से प्रत्येक के लिए लिखवाएं: (क) घटना/उपकथानक, (ख) उससे जुड़ा गौण.', '**उत्तर-लेखन (10 मिनट):** एक बोर्ड-शैली प्रश्न दें: "पाठ 3 में किन्हीं दो उपकथानकों के माध्यम से उभरे गौण विषयों की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'पाठ 3 — मुख्य विषय और संदेश\' (c11_hin_ar_cbse_03_006)**.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **हर तुलना रूपक होती है** और **बिंब केवल \'सुंदर वर्णन\' के लिए होते हैं**। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक के मन',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक के मन', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the foundational', 'कथानक (Plot) कृति में घटित घटनाओं का कारण-परिणाम (Cause-Effect) पर आधारित तार्किक क्रम', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में वर्णित वह समग्र स्पेशियो-टेम्पोरल,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'पाठ 3 — मुख्य विषय और संदेश\' (c11_hin_ar_cbse_03_006)** दोहराएं और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **हर तुलना रूपक होती है** और **बिंब केवल \'सुंदर वर्णन\' के लिए होते हैं**। **गलत तर्क का उदाहरण**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पृथक्करण अभ्यास**: छात्र को 10 वाक्य दें (मिश्रित: उपमा, रूपक, केवल बिंब, साधारण कथन)। उससे कहें: *"केवल वही वाक्य.', '**इंद्रिय-मानचित्रण (Sensory Mapping)**: एक काव्यांश देकर कहें: *"हर पंक्ति के आगे लिखो: कौन-सी इंद्रिय जागी?', '(आँख/कान/नाक/त्वचा/जिह्वा)"* — इससे बिंब का **इंद्रिय-आधार** पक्का होगा। 3.', '**कार्य-प्रदर्शन (Function Demo)**: वही रूपक ("क्रोध भट्टी है") लेकर पूछें: *"अगर \'भट्टी\' की जगह \'आग\' रख दें तो क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली दृष्टि में असंगत या आत्म-विरोधी.',
          hint: 'यदि अटके हों तो **c11_hin_ar_cbse_03_008 (बिंब और रूपक)** के \'कार्यविधि\' खंड को दोहराएँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **प्रतीक = रूपक (Metaphor)** और दोनों का उपयोग विनिमेय (interchangeable) है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली दृष्टि में असंगत या आत्म-विरोधी लगता है,',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली दृष्टि में असंगत या आत्म-विरोधी लगता है,', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the foundational', 'कथानक (Plot) कृति में घटित घटनाओं का कारण-परिणाम (Cause-Effect) पर आधारित तार्किक क्रम', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में वर्णित वह समग्र स्पेशियो-टेम्पोरल,'],
                  hint: 'यदि अटके हों तो **c11_hin_ar_cbse_03_008 (बिंब और रूपक)** के \'कार्यविधि\' खंड को दोहराएँ — विशेषकर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **प्रतीक = रूपक (Metaphor)** और दोनों का उपयोग विनिमेय (interchangeable) है। **गलत तर्क का.' }
          ],
            remediations: { 'metaphor-interchangeable': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र से कहें — "एक वाक्य लिखो जो खुद से लड़ता लगे (पैराडॉक्स) और एक दो-शब्दों का युग्म.', '**चरण 2 — प्रतीक बनाम रूपक:** पाठ से एक रूपक (जैसे "जीवन यात्रा है") और एक प्रतीक (जैसे "बार-बार आने वाला रेलगाड़ी का.', 'कौन-सा बार-बार आया और अर्थ बदलता गया?" 3.', '**चरण 3 — मिनी-व्यायाम:** छात्र को एक वस्तु (चाबी, खिड़की, पुराना पत्र) देकर कहें: "इसे तीन अलग-अलग प्रसंगों में तीन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द या पद होते हैं जो किसी रचना के.',
          hint: 'यदि अटके तो **नोड 03_006 (मुख्य विषय और संदेश)** पर लौटें — थीम स्पष्ट होते ही शब्द स्वयं.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य शब्द\' वे ही हैं जो **पाठ में सबसे अधिक बार आए हों (Highest Frequency)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द या पद होते हैं जो किसी रचना के केंद्रीय',
                  options: ['पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द या पद होते हैं जो किसी रचना के केंद्रीय', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the foundational', 'कथानक (Plot) कृति में घटित घटनाओं का कारण-परिणाम (Cause-Effect) पर आधारित तार्किक क्रम', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में वर्णित वह समग्र स्पेशियो-टेम्पोरल,'],
                  hint: 'यदि अटके तो **नोड 03_006 (मुख्य विषय और संदेश)** पर लौटें — थीम स्पष्ट होते ही शब्द स्वयं \'चमकने\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य शब्द\' वे ही हैं जो **पाठ में सबसे अधिक बार आए हों (Highest Frequency)** या जो **सबसे कठिन/तत्सम.' }
          ],
            remediations: { 'highest-frequency-hardest-vocabulary-important': { steps: ['**चरणबद्ध सुधार (Remediation):** 1.', '**\'आवृत्ति भ्रम\' तोड़ें:** छात्र को पाठ के 2 पैराग्राफ दें और कहें: "सबसे ज्यादा आने वाले 5 शब्द छाँटो। फिर बताओ: कौन.', '**\'प्रसंग-चश्मा\' अभ्यास:** एक ही शब्द (जैसे \'आग\') के 3 वाक्य दें: (क) "चूल्हे में आग जलाओ।" (ख) "उसके क्रोध की आग भड़क.', '**\'थीम-मैपिंग\':** छात्र से कहें: "पाठ का केंद्रीय विषय (नोड 03_006) एक वाक्य में लिखो। अब पाठ से 3 शब्द चुनो जो इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दावली (शब्द-चयन).',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_03_010 (पदावली: मुख्य शब्द) पर लौटकर.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **शब्दों की सूची बनाना** (तत्सम, तद्भव, देशज गिनना) या **व्याकरण दोष.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दावली (शब्द-चयन), वाक्य-संरचना',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त शब्दावली (शब्द-चयन), वाक्य-संरचना', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the foundational', 'कथानक (Plot) कृति में घटित घटनाओं का कारण-परिणाम (Cause-Effect) पर आधारित तार्किक क्रम', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में वर्णित वह समग्र स्पेशियो-टेम्पोरल,'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_03_010 (पदावली: मुख्य शब्द) पर लौटकर शब्द-वर्गीकरण का.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **शब्दों की सूची बनाना** (तत्सम, तद्भव, देशज गिनना) या **व्याकरण दोष ढूँढ़ना** (वर्तनी, संधि).' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पाठ 3 खोलो और पृष्ठ 12-13 पर नायक के दो संवाद ढूँढ़ो: एक जहाँ वह गुस्से में है, एक जहाँ वह उदास.', 'कोई मुहावरा है?" चरण 3: एक टेबल बनवाएँ — कॉलम: प्रसंग / क्रिया-रूप / वाक्य-लंबाई / मुहावरा / प्रभाव। चरण 4: छात्र खुद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर पाठ में स्पष्टतः लिखे तथ्यों, घटनाओं.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_03_006 (मुख्य विषय और संदेश)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"आशय-सूचक प्रश्न का उत्तर = पाठ का सारांश (summary)"**। वे सोचते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर पाठ में स्पष्टतः लिखे तथ्यों, घटनाओं, पात्रों या',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर पाठ में स्पष्टतः लिखे तथ्यों, घटनाओं, पात्रों या', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the foundational', 'कथानक (Plot) कृति में घटित घटनाओं का कारण-परिणाम (Cause-Effect) पर आधारित तार्किक क्रम', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में वर्णित वह समग्र स्पेशियो-टेम्पोरल,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_03_006 (मुख्य विषय और संदेश)** और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"आशय-सूचक प्रश्न का उत्तर = पाठ का सारांश (summary)"**। वे सोचते हैं कि प्रसंग दोहराना ही.' }
          ],
            remediations: { 'summary-class-10-plot-retelling': { steps: ['**पहला कदम:** छात्र को एक ही प्रसंग पर **दो प्रश्न** दें — एक वस्तुनिष्ठ ("नायक ने दरवाजा कब बंद किया?"), एक आशय-सूचक.', '**दूसरा कदम:** दोनों उत्तरों की **तुलना** करवाएँ: पहले में \'कब/क्या\' (तथ्य), दूसरे में \'क्यों/क्या प्रतीक\' (व्याख्या.', '**तीसरा कदम:** छात्र से कहें कि वह आशय-सूचक उत्तर में **PEEL** चिह्नित करे — P (कथन), E (उद्धरण), E (व्याख्या), L (विषय.', '**चौथा कदम:** अगले 3 दिन तक रोज 1 आशय-सूचक प्रश्न का **PEEL-आधारित उत्तर** लिखने का अभ्यास करवाएँ; शिक्षक केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
