import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch20_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch20_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch20_p2',
    title: 'तोप · Part 2/3',
    subtitle: 'इस नोड में **केवल \'तोप\' कविता के प्रतीक और बिंब** का गहन विश्लेषण शामिल है; अन्य कविताओं.',
    classLevel: 10, subject: 'hin_sp', topic: 'तोप · Part 2/3',
    chapters: ['c10_hin_sp_ch20'],
    nodeIds: ['c10_hin_sp_cbse_20_007', 'c10_hin_sp_cbse_20_008', 'c10_hin_sp_cbse_20_009', 'c10_hin_sp_cbse_20_010', 'c10_hin_sp_cbse_20_011', 'c10_hin_sp_cbse_20_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'स्पर्श भाग-2 — पाठ 20\' में स्पर्श-भाग-2-—-पाठ-20 जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तोप — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'स्पर्श भाग-2 — पाठ 20\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_20_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तोप — साहित्यिक युक्तियाँ', 'तोप — मुख्य भाव', 'तोप — गौण भाव', 'तोप — पदावली: कठिन', 'तोप — व्याकरण: पद्य', 'तोप — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_20_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through तोप like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? तोप · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तोप · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_007', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 20\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'अगर अटके तो **c10_hin_sp_cbse_20_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_20_006.',
          misconception: '**विशिष्ट भ्रम**: छात्र **\'प्रतीक\' और \'रूपक\' (Metaphor) को एक मान लेते हैं** — लिखते हैं: *"लोहा रूपक है क्योंकि कवि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 20\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'स्पर्श भाग-2 — पाठ 20\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि वीरेन डंगवाल का जीवन-संक्षेप (पहाड़ी/उत्तराखंडी', '\'स्पर्श भाग-2 — पाठ 20\' का कथानक — \'स्पर्श भाग-2 — पाठ 20\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 20\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'अगर अटके तो **c10_hin_sp_cbse_20_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_20_006 (अलंकार)**.',
                  misconception: '**विशिष्ट भ्रम**: छात्र **\'प्रतीक\' और \'रूपक\' (Metaphor) को एक मान लेते हैं** — लिखते हैं: *"लोहा रूपक है क्योंकि कवि कहता है लोहा = साहस"*।.' }
          ],
            remediations: { 'metaphor-a-is-b': { steps: ['**चरण 1**: छात्र से कहो — **"कविता की कोई एक पंक्ति चुनो जहाँ लोहा/आग/हथौड़ा/तोप आए; अब आँख बंद करो और बताओ: तुम्हें.', '9 (आशय स्पष्टीकरण)** का मॉडल उत्तर दिखाओ जहाँ **बिंब → प्रतीक → केंद्रीय भाव** की कड़ी स्पष्ट है; छात्र से **अनुकरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_008', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 20\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका हुआ महसूस हो तो नोड 007 (प्रतीक और बिंब) के \'तोप = समय\' वाले खंड को दोबारा पढ़ें.',
          misconception: 'छात्र समझते हैं कि \'मुख्य भाव\' = \'कविता का सारांश\'। वे लिखते हैं: "कविता में तोप किले, सभ्यता, मनुष्य को मिटा देती है".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 20\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'स्पर्श भाग-2 — पाठ 20\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि वीरेन डंगवाल का जीवन-संक्षेप (पहाड़ी/उत्तराखंडी', '\'स्पर्श भाग-2 — पाठ 20\' का कथानक — \'स्पर्श भाग-2 — पाठ 20\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 20\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड 007 (प्रतीक और बिंब) के \'तोप = समय\' वाले खंड को दोबारा पढ़ें और.',
                  misconception: 'छात्र समझते हैं कि \'मुख्य भाव\' = \'कविता का सारांश\'। वे लिखते हैं: "कविता में तोप किले, सभ्यता, मनुष्य को मिटा देती है" — यह **सारांश** है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "कविता की 5 मुख्य घटनाएँ लिखो" (सारांश)। चरण 2: फिर पूछें — "इन घटनाओं से कवि तुम्हें क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_009', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 20\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो c10_hin_sp_cbse_20_008 (मुख्य भाव और संदेश) दोबारा पढ़ें — विशेषकर "तोप.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "जो भी मुख्य विषय (तोप) से अलग हो, वह विषयांतर है" — इसलिए "फूल-पत्ते झरते हैं" को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 20\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'स्पर्श भाग-2 — पाठ 20\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि वीरेन डंगवाल का जीवन-संक्षेप (पहाड़ी/उत्तराखंडी', '\'स्पर्श भाग-2 — पाठ 20\' का कथानक — \'स्पर्श भाग-2 — पाठ 20\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 20\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_20_008 (मुख्य भाव और संदेश) दोबारा पढ़ें — विशेषकर "तोप प्रतीक क्या.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "जो भी मुख्य विषय (तोप) से अलग हो, वह विषयांतर है" — इसलिए "फूल-पत्ते झरते हैं" को भी विषयांतर मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "तोप कविता के किसी एक पद को लो — पहचानो कि इसका *काम* क्या है?', 'क्या यह तोप की बात को आगे बढ़ा रहा है (गौण भाव) या तोप को छोड़कर नई बात शुरू कर रहा है (विषयांतर)?" 2.', 'दो कॉलम बनवाओ: "मुख्य प्रसंग से जुड़ा सहायक" (गौण भाव) vs "मुख्य प्रसंग से भटका हुआ नया प्रसंग" (विषयांतर) — कविता के.', 'फिर पूछो: "कवि ने विषयांतर *क्यों* किया होगा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_010', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 20\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_20_002 (पद्यांश-वार भावार्थ) और c10_hin_sp_cbse_20_004.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'कठिन शब्दों के अर्थ रट लेना\' और \'मुहावरों के शाब्दिक अर्थ जान लेना\' पदावली की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 20\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'स्पर्श भाग-2 — पाठ 20\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि वीरेन डंगवाल का जीवन-संक्षेप (पहाड़ी/उत्तराखंडी', '\'स्पर्श भाग-2 — पाठ 20\' का कथानक — \'स्पर्श भाग-2 — पाठ 20\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 20\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_20_002 (पद्यांश-वार भावार्थ) और c10_hin_sp_cbse_20_004 (केंद्रीय भाव और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'कठिन शब्दों के अर्थ रट लेना\' और \'मुहावरों के शाब्दिक अर्थ जान लेना\' पदावली की तैयारी पूरी कर देता.' }
          ],
            remediations: { 'contextual-meaning': { steps: ['**पुनः पठन (Re-reading):** छात्र से कहें — कविता की केवल वे 5 पंक्तियाँ जोर से पढ़ें जिनमें लक्षित कठिन शब्द/मुहावरे आए.', 'कवि \'स्थिर\' की जगह \'जड़\' क्यों लिखेगा?"* 2.', '**द्वि-स्तरीय सारणी (Two-column table):** एक कागज पर दो कॉलम बनाएं — बाएं: \'शब्दकोश अर्थ\', दाएं: \'कविता में विशेष अर्थ.', '**मुहावरा-चित्रण (Idiom mapping):** प्रत्येक मुहावरे के लिए — (क) शाब्दिक चित्र खींचें/कल्पना करें, (ख) कविता में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_011', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 20\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_20_006 (अलंकार)** और **c10_hin_sp_cbse_20_007.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'पद्य में भाषा-प्रयोग\' = \'अलंकारों की पहचान\'** मात्र है। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 20\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'स्पर्श भाग-2 — पाठ 20\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि वीरेन डंगवाल का जीवन-संक्षेप (पहाड़ी/उत्तराखंडी', '\'स्पर्श भाग-2 — पाठ 20\' का कथानक — \'स्पर्श भाग-2 — पाठ 20\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 20\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_20_006 (अलंकार)** और **c10_hin_sp_cbse_20_007 (प्रतीक/बिंब)** के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'पद्य में भाषा-प्रयोग\' = \'अलंकारों की पहचान\'** मात्र है। **वास्तविकता:** बोर्ड परीक्षा में पूछा.' }
          ],
            remediations: { 'selection': { steps: ['**चरण 1:** छात्र से कहें — **"कविता की कोई एक पंक्ति चुनो जिसमें तुम्हें \'अजीब\' शब्द-क्रम लगे। उसे गद्य में लिखो। दोनों.', 'उससे क्या \'ध्वनि\' बनी?"* (अनुप्रास/ध्वनि-सौंदर्य)। **चरण 4:** तीनों उत्तरों को **एक पैराग्राफ में जोड़कर** लिखवाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_012', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 20\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँसें तो **c10_hin_sp_cbse_20_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_20_007.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न\' का अर्थ \'अपनी राय/विचार लिखना\' (opinion-based) होता है**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 20\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'स्पर्श भाग-2 — पाठ 20\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि वीरेन डंगवाल का जीवन-संक्षेप (पहाड़ी/उत्तराखंडी', '\'स्पर्श भाग-2 — पाठ 20\' का कथानक — \'स्पर्श भाग-2 — पाठ 20\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 20\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि फँसें तो **c10_hin_sp_cbse_20_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_20_007 (प्रतीक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न\' का अर्थ \'अपनी राय/विचार लिखना\' (opinion-based) होता है**, जबकि वास्तव में यह.' }
          ],
            remediations: { 'opinion-based': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पहचान चरण:** छात्र से कहें — *"प्रश्न में \'क्यों/कैसे/क्या आशय\' शब्द देखो। रुको। सोचो: क्या उत्तर पाठ की किसी पंक्ति.', 'यदि नहीं, तो यह आशय-सूचक है।"* 2.', '**साक्ष्य-खोज चरण:** पद्यांश में **की-वर्ड (तोप, विश्व-विजयिनी, नर-मुंड, इतिहास की ढेरी)** को घेरें। पूछें — *"इन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
