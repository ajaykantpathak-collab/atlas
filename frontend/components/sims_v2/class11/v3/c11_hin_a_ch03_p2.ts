import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch03_p2: SimDef = {
    id: 'v3_c11_hin_a_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'यह नोड केवल \'गौण विषय\' की पहचान, वर्गीकरण (सामाजिक/मनोवैज्ञानिक/प्रतीकात्मक), और मुख्य.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c11_hin_a_ch03'],
    nodeIds: ['c11_hin_a_cbse_03_007', 'c11_hin_a_cbse_03_008', 'c11_hin_a_cbse_03_009', 'c11_hin_a_cbse_03_010', 'c11_hin_a_cbse_03_011', 'c11_hin_a_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'अंतरा भाग-1 — पाठ 3\' में अंतरा-भाग-1-—-पाठ-3 जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: '\'अंतरा भाग-1 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 2/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 3\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 3\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_007', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) के \'WORKED_EXAMPLE_1\' को दोहराएं जहाँ मुख्य.',
          misconception: 'छात्र अक्सर मानते हैं कि \'गौण विषय\' का अर्थ \'कम महत्वपूर्ण विषय\' या \'सजावटी प्रसंग\' होता है जिसे परीक्षा में छोड़ा जा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) के \'WORKED_EXAMPLE_1\' को दोहराएं जहाँ मुख्य विषय की पहचान.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'गौण विषय\' का अर्थ \'कम महत्वपूर्ण विषय\' या \'सजावटी प्रसंग\' होता है जिसे परीक्षा में छोड़ा जा सकता है। यह भ्रम.' }
          ],
            remediations: { 'subordinate-but-essential': { steps: ['छात्र को \'गौण\' शब्द का भाषाई अर्थ (Subordinate ≠ Unimportant) स्पष्ट करें: संस्कृत मूल \'गौण\' = \'गौ\' (मुख्य/नेतृत्व करने.', 'पाठ से 5 प्रसंग चुनवाएं जो मुख्य कथानक को आगे न बढ़ाते हों; पूछें: "यदि लेखक इन्हें हटा दे तो क्या खो जाएगा?" 3.', 'छात्र स्वयं लिखे: "प्रसंग X मुख्य विषय Y को कैसे पूरा करता है?" — इस वाक्य संरचना (Sentence Frame) का अभ्यास कराएं। 4.', 'बोर्ड के मॉडल उत्तर दिखाएं जहाँ गौण विषय के बिना उत्तर अधूरा माना गया हो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_008', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फँसें तो **कक्षा 9-10 की हिंदी व्याकरण पुस्तक के \'अलंकार\' अध्याय का केवल रूपक-उपमा.',
          misconception: '**भ्रांति**: "जहाँ \'जैसा/जैसी/सा/सी/तुल्य\' शब्द आए, वह **उपमा** है; जहाँ न आए, वह **रूपक** है — बस इतना ही अंतर है।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो **कक्षा 9-10 की हिंदी व्याकरण पुस्तक के \'अलंकार\' अध्याय का केवल रूपक-उपमा खंड**.',
                  misconception: '**भ्रांति**: "जहाँ \'जैसा/जैसी/सा/सी/तुल्य\' शब्द आए, वह **उपमा** है; जहाँ न आए, वह **रूपक** है — बस इतना ही अंतर है।" **वास्तविकता**: यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "किसी भी पंक्ति को पढ़कर **आँख बंद करो** और बताओ: **क्या दिखा?', 'क्या स्वाद आया?** — जो भी आए, वही **बिंब** है।" इसे 5-6 पंक्तियों पर कराएँ। **चरण 2**: रूपक के लिए — "वाक्य में **दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_009', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि फँसें तो **c11_hin_a_cbse_03_008 (बिंब और रूपक)** के "रूपक बनाम प्रतीक" तुलना खंड को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **विरोधाभास** को "ऑक्सीमोरॉन (Oxymoron)" समझ लेते हैं — जैसे "मधुर कड़वाहट" — और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो **c11_hin_a_cbse_03_008 (बिंब और रूपक)** के "रूपक बनाम प्रतीक" तुलना खंड को दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **विरोधाभास** को "ऑक्सीमोरॉन (Oxymoron)" समझ लेते हैं — जैसे "मधुर कड़वाहट" — और दोनों को एक मानते हैं।.' }
          ],
            remediations: { 'oxymoron-word-level': { steps: ['**विरोधाभास बनाम ऑक्सीमोरॉन स्पष्टीकरण:** छात्र को दो कॉलम बनाने को कहें — बाएँ: ऑक्सीमोरॉन के 3 उदाहरण (मधुर पीड़ा.', '**प्रतीक स्थापना की चेकलिस्ट दें:** (क) क्या वस्तु प्रसंग में बार-बार आई?', '(ख) क्या उसका शाब्दिक कार्य से अलग भावात्मक भार है?', '(ग) क्या सांस्कृतिक/पारंपरिक संकेत है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_010', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'अगर अटके तो **c11_hin_a_cbse_03_011 (व्याकरण: पाठ में भाषा-प्रयोग)** के "क्रिया के रूप और.',
          misconception: 'छात्र **\'मुख्य शब्द\' (root/lexeme)** और **\'पद/शब्द-रूप\' (word form/token)** को समान मानते हैं। उदाहरण: वे \'पढ़ता\' को एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर अटके तो **c11_hin_a_cbse_03_011 (व्याकरण: पाठ में भाषा-प्रयोग)** के "क्रिया के रूप और प्रत्यय".',
                  misconception: 'छात्र **\'मुख्य शब्द\' (root/lexeme)** और **\'पद/शब्द-रूप\' (word form/token)** को समान मानते हैं। उदाहरण: वे \'पढ़ता\' को एक मुख्य शब्द मानते.' }
          ],
            remediations: { 'root-lexeme-word-form-token': { steps: ['चरण 1: छात्र को 5 परिचित क्रियाएँ दें (जैसे \'खाना\', \'जाना\', \'करना\', \'देना\', \'लेना\') और कहें — "प्रत्येक से \'ना\' हटाओ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_011', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck, review **c11_hin_a_cbse_03_010 (पदावली: मुख्य शब्द)** and practice classifying.',
          misconception: '**भ्रांति:** "भाषा-प्रयोग का विश्लेषण करने का अर्थ है पाठ में आए \'कठिन शब्दों\' की सूची बनाना और उनके अर्थ लिख देना।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review **c11_hin_a_cbse_03_010 (पदावली: मुख्य शब्द)** and practice classifying 20 random.',
                  misconception: '**भ्रांति:** "भाषा-प्रयोग का विश्लेषण करने का अर्थ है पाठ में आए \'कठिन शब्दों\' की सूची बनाना और उनके अर्थ लिख देना।" **वास्तविकता:** यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — शब्द-मानचित्रण (Word Mapping):** पाठ के 3 पृष्ठ लें। हर शब्द को रंगीन पेन से वर्गीकृत करें: 🔴 तत्सम, 🔵.', '**चरण 2 — \'क्यों?\' का पीछा करें:** हर रंग-घनत्व वाले क्षेत्र के लिए पूछें: *लेखक ने यहाँ इस रजिस्टर को क्यों चुना?', 'विकल्प चुनने से क्या बदलता?* 3.', '**चरण 3 — वाक्य-लय नोटेशन:** 5 वाक्य बोलकर पढ़ें — उनकी लय (rhythm), विराम (pauses), गति (tempo) नोट करें। फिर लिखें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_012', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँस जाएँ तो **c11_hin_a_cbse_03_002 (कथानक और आख्यान-संरचना)** तथा.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" या "अनुमान" होता है** जिसमें पाठ के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_a_cbse_03_002 (कथानक और आख्यान-संरचना)** तथा **c11_hin_a_cbse_03_006.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" या "अनुमान" होता है** जिसमें पाठ के प्रमाण की जरूरत नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — भेद स्पष्ट करो**: छात्र को 5-5 प्रश्न दो — 5 वस्तुनिष्ठ, 5 आशय-सूचक — और कहो: **"प्रत्येक को लेबल करो और बताओ.', '**चरण 2 — PEEL का अभ्यास**: एक छोटा गद्यांश दो, एक आशय-सूचक प्रश्न दो, और **PEEL शीट** भरवाओ (चार कॉलम: Point.', '**चरण 3 — \'लेखक कहता है\' प्रतिबंध**: अगले 3 अभ्यासों में नियम लगाओ: **"उत्तर में \'लेखक/कवि/रचनाकार\' शब्द नहीं आएगा"**.', '**चरण 4 — साक्ष्य अनिवार्य**: हर आशय-सूचक उत्तर के आगे **कोष्ठक में पाठ-पंक्ति संख्या/पैराग्राफ संदर्भ** लिखवाओ — बिना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
