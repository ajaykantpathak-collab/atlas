import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch01_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'इस नोड में प्रतीक और बिंब की अवधारणा, उनकी पहचान, अर्थ व्याख्या और केंद्रीय भाव से संबंध.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c10_hin_ks_ch01'],
    nodeIds: ['c10_hin_ks_cbse_01_007', 'c10_hin_ks_cbse_01_008', 'c10_hin_ks_cbse_01_009', 'c10_hin_ks_cbse_01_010', 'c10_hin_ks_cbse_01_011', 'c10_hin_ks_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'मुहावरे\' में मुहावरे जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'मुहावरे\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — साहित्यिक', 'पाठ 1 — मुख्य', 'पाठ 1 — गौण', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 2/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — \'मुहावरे\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — \'मुहावरे\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_007', difficulty: 'standard',
          question: '\'मुहावरे\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि कठिनाई आए तो अलंकार (c10_hin_ks_cbse_01_006) और पद्यांश‑वार भावार्थ.',
          misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही मान लेते हैं और किसी भी दोहराए गए शब्द या चित्र को “प्रतीक” घोषित कर देते हैं, बिना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मुहावरे\' के गौण विषय',
                  options: ['\'मुहावरे\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', '\'मुहावरे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि कठिनाई आए तो अलंकार (c10_hin_ks_cbse_01_006) और पद्यांश‑वार भावार्थ (c10_hin_ks_cbse_01_002).',
                  misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही मान लेते हैं और किसी भी दोहराए गए शब्द या चित्र को “प्रतीक” घोषित कर देते हैं, बिना जाँचे कि क्या वह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो स्पष्ट उदाहरण दिखाएँ—एक बिंब (जैसे “लाल गुलाब” जो सिर्फ़ फूल है) और एक प्रतीक (जैसे “लाल गुलाब जो शहीदी का.', 'फिर कोई पंक्ति दें और पूछें: “इस वस्तु का प्रत्यक्ष अर्थ क्या है?', 'अब सोचिए, इस वस्तु से हम कौन‑सी भावना या विचार भी जोड़ सकते हैं?” 3.', 'यदि छात्र अभी भी conflate करता है, तो उसे एक तालिका बनाकर दो स्तंभ—बिंब (प्रत्यक्ष विवरण) और प्रतीक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_008', difficulty: 'standard',
          question: '**मुख्य भाव** (Central Theme) काव्य/गद्य का वह केंद्रीय विचार या सार है जो.',
          hint: 'यदि अटके तो **c10_hin_ks_cbse_01_002 (पद्यांश-वार भावार्थ)** के \'शब्द-अर्थ → भावार्थ\'.',
          misconception: '**सटीक भ्रम:** छात्र मानते हैं कि **मुख्य भाव = कथासार (summary)**। वे लिखते हैं: "कविता में कवि ने सुबह का वर्णन किया.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य भाव** (Central Theme) काव्य/गद्य का वह केंद्रीय विचार या सार है जो सम्पूर्ण रचना',
                  options: ['**मुख्य भाव** (Central Theme) काव्य/गद्य का वह केंद्रीय विचार या सार है जो सम्पूर्ण रचना', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', '\'मुहावरे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_ks_cbse_01_002 (पद्यांश-वार भावार्थ)** के \'शब्द-अर्थ → भावार्थ\' अभ्यास.',
                  misconception: '**सटीक भ्रम:** छात्र मानते हैं कि **मुख्य भाव = कथासार (summary)**। वे लिखते हैं: "कविता में कवि ने सुबह का वर्णन किया, फिर दोपहर, फिर.' }
          ],
            remediations: { 'summary': { steps: ['**पहला कदम:** छात्र से कहो — "कवानी को **एक वाक्य में** बताओ जैसे तुम किसी को **SMS** कर रहे हो (160 अक्षर)।" — यह उसे.', '**दूसरा कदम:** उस एक वाक्य में से **\'क्या हुआ\' (घटना) हटाओ**, केवल **\'क्या सीखा\' (सार)** रखो। 3.', '**तीसरा कदम:** पूछो — "यह सीख **तुम्हारे जीवन** में कहाँ काम आएगी?" — वही **संदेश** है। 4.', '**चौथा कदम:** अभ्यास के लिए **c10_hin_ks_cbse_01_014 (परीक्षा-उत्तर लेखन कौशल)** के \'PEEL ढाँचा\' कार्ड का प्रयोग कराओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_009', difficulty: 'standard',
          question: '\'मुहावरे\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो **नोड 008 (मुख्य भाव और संदेश)** के कार्यित उदाहरण दोबारा करो — विशेषकर.',
          misconception: '**सटीक भ्रम:** छात्र समझते हैं कि **हर वह प्रसंग जो मुख्य कथानक (कृष्ण लीला) से हटकर हो, वह \'विषयांतर\' ही है** — चाहे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मुहावरे\' में विरोधाभास',
                  options: ['\'मुहावरे\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', '\'मुहावरे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **नोड 008 (मुख्य भाव और संदेश)** के कार्यित उदाहरण दोबारा करो — विशेषकर \'मुख्य भाव एक.',
                  misconception: '**सटीक भ्रम:** छात्र समझते हैं कि **हर वह प्रसंग जो मुख्य कथानक (कृष्ण लीला) से हटकर हो, वह \'विषयांतर\' ही है** — चाहे वह मुख्य भाव को पुष्ट.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ कराओ:** छात्र को पद 1 और 2 केवल **भाव-परिवर्तन** के लिए पढ़ने को कहो — हर पंक्ति के बाद पूछो "भाव बदला या.', '**रंग-कोडिंग:** मुख्य भाव = लाल, गौण भाव = पीला, विषयांतर = नीला — तीन रंगों से पाठ चिह्नित कराओ। 3.', '**तुलना अभ्यास:** दो पदांश दो — एक गौण भाव, एक विषयांतर — छात्र को अंतर बताने को कहो। 4.', '**स्पष्ट नियम दें:** "यदि हटाने से मुख्य भाव **अधूरा/कमज़ोर** लगे → गौण भाव। यदि हटाने से मुख्य भाव **अप्रभावित** रहे →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_010', difficulty: 'standard',
          question: '\'मुहावरे\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'अगर अटके तो c10_hin_ks_cbse_01_002 (पद्यांश-वार भावार्थ) दोहराएँ — विशेषकर पहले दो पदों.',
          misconception: 'छात्र समझते हैं कि \'कठिन शब्द\' का अर्थ शब्दकोश से उठाकर लिख देना पर्याप्त है और मुहावरे का अर्थ भी शाब्दिक (literal).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मुहावरे\' की पदावली',
                  options: ['\'मुहावरे\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', '\'मुहावरे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर अटके तो c10_hin_ks_cbse_01_002 (पद्यांश-वार भावार्थ) दोहराएँ — विशेषकर पहले दो पदों का.',
                  misconception: 'छात्र समझते हैं कि \'कठिन शब्द\' का अर्थ शब्दकोश से उठाकर लिख देना पर्याप्त है और मुहावरे का अर्थ भी शाब्दिक (literal) लिखकर पूरे अंक मिल.' }
          ],
            remediations: { 'literal-contextual-meaning-0': { steps: ['चरण 1: छात्र से कहें — "पद को फिर पढ़ो और बताओ कृष्ण यहाँ क्या कर रहे हैं?" (प्रसंग स्थापित करें)। चरण 2: कठिन शब्द पर.', 'उसका क्या मतलब होता है?" (लोक-प्रचलित भावार्थ तक पहुँचें)। चरण 4: बोर्ड-उत्तर प्रारूप लिखवाएँ: "प्रसंग: ...', 'वाक्य: ..." — यही टेम्पलेट हर बार दोहराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_011', difficulty: 'standard',
          question: '\'मुहावरे\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।',
          hint: 'यदि अटके तो **c10_hin_ks_cbse_01_005 (छंद)** और **c10_hin_ks_cbse_01_006 (अलंकार)** के.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि पद्य में **कोई भी शब्द-क्रम चलता है** ("कवि की मर्जी")। वास्तव में, **हर विचलन के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मुहावरे\' में भाषा-प्रयोग',
                  options: ['\'मुहावरे\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', '\'मुहावरे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_ks_cbse_01_005 (छंद)** और **c10_hin_ks_cbse_01_006 (अलंकार)** के अभ्यास.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि पद्य में **कोई भी शब्द-क्रम चलता है** ("कवि की मर्जी")। वास्तव में, **हर विचलन के पीछे छंद-नियम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान अभ्यास:** छात्र को 5 पद्यांश दें; प्रत्येक में **लाल पेन से** विचलन घेरवाएं और **नाम लिखवाएं**.', '**गद्य-रूपांतरण:** उसी पंक्ति का **मानक गद्य** लिखवाएं — फिर दोनों पढ़कर **लय/भाव का अंतर** महसूस करवाएं। 3.', '**प्रभाव-तालिका:** तीन कॉलम बनवाएं — **उद्धरण | विचलन का नाम | छंद/अलंकार/रस पर प्रभाव**। 10 उदाहरण पूरे होने तक.', '**बोर्ड-उत्तर लेखन:** एक 3-अंक का प्रश्न देकर **PEEL संरचना** (Point-Evidence-Explanation-Link) में उत्तर लिखवाएं और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_012', difficulty: 'standard',
          question: '\'मुहावरे\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'Review c10_hin_ks_cbse_01_002 (पद्यांश-वार भावार्थ) and c10_hin_ks_cbse_01_008 (केंद्रीय.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि आशय-सूचक प्रश्न का उत्तर "पाठ से बाहर का ज्ञान" होता है। **वास्तविकता:** CBSE में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मुहावरे\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'मुहावरे\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', '\'मुहावरे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review c10_hin_ks_cbse_01_002 (पद्यांश-वार भावार्थ) and c10_hin_ks_cbse_01_008 (केंद्रीय भाव और रस).',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि आशय-सूचक प्रश्न का उत्तर "पाठ से बाहर का ज्ञान" होता है। **वास्तविकता:** CBSE में आशय-सूचक उत्तर **पाठ.' }
          ],
            remediations: { 'cbse-clues-1': { steps: ['**पहचान अभ्यास:** 10 प्रश्नों की सूची दें — छात्र को प्रत्येक को **V (वस्तुनिष्ठ)** या **A (आशय-सूचक)** में वर्गीकृत.', '**साक्ष्य-खोज खेल:** एक आशय-सूचक प्रश्न दें (जैसे "कवि निराश नहीं हैं, कैसे पता चलता है?")। छात्र को **3 पंक्तियाँ**.', '**उत्तर-निर्माण ढांचा:** सिखाएँ: **दावा (Claim) + पाठ प्रमाण (Text Evidence) + व्याख्या (Explanation)**। पहले मौखिक.', '**मॉडल उत्तर विश्लेषण:** बोर्ड के टॉपर उत्तर दिखाएँ — छात्र से पूछें "यहाँ दावा कहाँ है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
