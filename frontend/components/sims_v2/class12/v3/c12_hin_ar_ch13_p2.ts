import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch13_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch13_p2',
    title: 'पहलवान की ढोलक · Part 2/3',
    subtitle: 'The king knew his name; the new order didn\'t',
    classLevel: 12, subject: 'hin_ar', topic: 'पहलवान की ढोलक · Part 2/3',
    chapters: ['c12_hin_ar_ch13'],
    nodeIds: ['c12_hin_ar_cbse_13_007', 'c12_hin_ar_cbse_13_008', 'c12_hin_ar_cbse_13_009', 'c12_hin_ar_cbse_13_010', 'c12_hin_ar_cbse_13_011', 'c12_hin_ar_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A folk singer\'s world ran on patronage and memory. Then the rules changed — and rules don\'t remember anyone.', goal: 'Read Dwivedi\'s story as the collision of feudal patronage and institutional modernity through a folk artist\'s fate.' },
    discovery: {
        question: 'A folk singer thrives under a king\'s patronage — then a new system of laws arrives that recognises neither his art nor his claim. What actually changed?',
        options: ['Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority', 'Just the ruler changed', 'The singer lost his voice', 'Art became free'],
        answer: 'Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority',
        hook: 'Dwivedi pioneered experimental fiction in Hindi — folk speech, oral rhythm, the lives of common people rendered with documentary warmth. The story isn\'t nostalgia for kings; it stages the collision where \'the system\' replaced \'the sovereign\' — and nobody told the artist.',
    },
    teaching: [
        { title: 'पहलवान की ढोलक — गौण विषय', text: '\'आरोह भाग-2 — पाठ 13\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch a folk artist meet the new order: weigh the king\'s court against bureaucratic law, track how art becomes \'profession\' under pressure, and find where dignity survives the transition.',
        labels: ['पहलवान की ढोलक —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_008', title: 'पहलवान की ढोलक — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 13\' में बिंब ढूँढिए — पाठ-13 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define \'Imagery\' (चित्रात्मकता) in literature and list its five types corresponding to the five senses.', options: [
                { text: 'Imagery is the use of descriptive language that appeals to the senses to create mental', outcome: 'Imagery is the use of descriptive language that appeals to the senses to create mental pictures.' },
                { text: 'the fair was noisy', outcome: 'Not quite — **Misconception:** "Imagery is just \'beautiful description\' and Metaphor is just \'fancy comparison\'.', reveals: 'misconception-imagery-is-just-beautiful' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_010', title: 'पहलवान की ढोलक — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 13\' के मुख्य शब्द: पाठ-13 — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the primary purpose of using context clues when encountering an unपरिचित word in a literary text?', options: [
                { text: 'The primary purpose is to infer the word\'s meaning from the surrounding text', outcome: 'The primary purpose is to infer the word\'s meaning from the surrounding text — such as synonyms.' },
                { text: 'to memorize the word for the exam', outcome: 'Not quite — Students often believe that **every unपरिचित word must be looked up in a dictionary immediately**.', reveals: 'every-un-word-must-be' },
                { text: 'last resort', outcome: 'Not quite — Students often believe that **every unपरिचित word must be looked up in a dictionary immediately**.', reveals: 'every-un-word-must-be' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A folk singer from your district gets signed by a big label that drops her dialect, renames her, and reworks her songs into a commercial formula. Two years later she returns to perform in a hometown she barely recognises — and only family gathers to listen.',
            decisions: [{ prompt: 'How does \'युगुक की ढोलकी\' / the flautist\'s tale frame her trajectory?', options: [
                { text: 'As ironic return — the village flautist\'s music was the community\'s lifeblood until court patronage lifted him out; he comes back to a transformed village where his art survives only as a private act for grandchildren — the circle closes but the commons is gone.', outcome: 'The chapter\'s structural point is that the ending mirrors the opening with the centre shifted: patronage didn\'t just elevate the artist, it displaced the audience — her homecoming performance is the same image, emptied.' },
                { text: 'As a success story — she gained a platform the village could never give her, so the arc is upward.', outcome: 'That reads the rise and skips the resolution\'s irony: the flautist also \'rose\' to court, and the story counts what the rise cost — a village waking to sirens instead of music isn\'t the same audience at a new address.', reveals: 'platform-equals-progress' },
                { text: 'As proof she should never have left — artists who take patronage are sellouts.', outcome: 'The story doesn\'t damn the move; it mourns the structural change — the new order that renamed the village and industrialised its rhythm. The artist didn\'t sell the community; the ground under it was sold around both.', reveals: 'patronage-equals-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a period story as a study of systems changing — and spot the person caught between the old legitimacy and the new.',
            decisions: [{ prompt: 'What comes next? पहलवान की ढोलक · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पहलवान की ढोलक · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_007', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटका हुआ महसूस हो तो: c12_hin_ar_cbse_13_005 (सहायक पात्र) और c12_hin_ar_cbse_13_006.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर \'गौण विषय\' को \'गौण पात्र\' (minor characters) या \'उपकथा\' (sub-plot) समझ लेते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'आरोह भाग-2 — पाठ 13\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो: c12_hin_ar_cbse_13_005 (सहायक पात्र) और c12_hin_ar_cbse_13_006 (मुख्य.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर \'गौण विषय\' को \'गौण पात्र\' (minor characters) या \'उपकथा\' (sub-plot) समझ लेते हैं। उदाहरण: वे लिखते.' }
          ],
            remediations: { 'minor-characters-sub-plot': { steps: ['छात्र से कहें: "कहानी में चौधरी क्या *करता* है?', '(कथानक) → चौधरी क्या *दिखाता* है?', '(गौण विषय: जातिगत श्रेष्ठता)।" इस अंतर को 3 उदाहरणों से स्पष्ट करें। 2.', 'पाठ से 5 संवाद छाँटें (चौधरी, पंडित, पतोहू, साहूकार, पहलवान) और प्रत्येक से पूछें: "यह संवाद किस *सामाजिक मूल्य* को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_008', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck on tenor/vehicle/ground: Review Class 11 Hindi Aroh Chapter 13.',
          misconception: '**Misconception:** "Imagery is just \'beautiful description\' and Metaphor is just \'fancy comparison\' — both are.',
          parts: [
                { id: 'a', prompt: 'In the scene where Yaqub Ali plays at the circus (नैक्सी), the narrator describes: "नक्सी में शहनाई की वादन वादन... याकूब अली की शहनाई *बोल* उठी".', answer: 'Metaphor: "शहनाई बोल उठी" (the shehnai spoke)',
                  options: ['Metaphor: "शहनाई बोल उठी" (the shehnai spoke)', 'Yaqub Ali', 'the shehnai\'s sound'],
                  hint: 'If stuck on tenor/vehicle/ground: Review Class 11 Hindi Aroh Chapter 13 (c11_hin_ar_cbse_13_008).',
                  misconception: '**Misconception:** "Imagery is just \'beautiful description\' and Metaphor is just \'fancy comparison\' — both are decorative ornaments added.' }
          ],
            remediations: { 'misconception-imagery-is-just-beautiful': { steps: ['If a student cannot distinguish imagery types or identify tenor/vehicle/ground: 1.', '**Revisit Class 11 node c11_hin_ar_cbse_13_008** (Literary Devices: Imagery and Metaphor) — re-do the \'sensory mapping\'.', '**Use a 3-column table** for any passage: Column 1 = Quote, Column 2 = Sense triggered, Column 3 = Effect on reader.', 'Practice with the opening paragraph of "Igayoku ki <ksyd".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_009', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If unable to separate literal vs. symbolic level, practice with a परिचित fable (e.g.',
          misconception: 'Students often confuse *symbolism* with *metaphor* (covered in previous node) and treat every object as a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'आरोह भाग-2 — पाठ 13\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If unable to separate literal vs. symbolic level, practice with a परिचित fable (e.g., "The Golden.',
                  misconception: 'Students often confuse *symbolism* with *metaphor* (covered in previous node) and treat every object as a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Revisit node **c12_hin_ar_cbse_13_008** (Imagery and Metaphor) to re-learn the distinction: metaphor = direct.', 'Re-read the three parrot scenes (gift, cage, escape) and complete a two-column table: Column A = literal event; Column.', 'Attempt Diagnostic Question 4 again with the table.', 'If still stuck, review Class 11 node **c11_hin_ar_cbse_13_009** for foundational irony/symbolism definitions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_010', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, revisit **c11_hin_ar_cbse_13_010** (Class 11 Vocabulary in Context) and re-do.',
          misconception: 'Students often believe that **every unपरिचित word must be looked up in a dictionary immediately**, and that context.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of using context clues when encountering an unपरिचित word in a literary text?', answer: 'The primary purpose is to infer the word\'s meaning from the surrounding text',
                  options: ['The primary purpose is to infer the word\'s meaning from the surrounding text', 'to memorize the word for the exam', 'last resort'],
                  hint: 'If stuck, revisit **c11_hin_ar_cbse_13_010** (Class 11 Vocabulary in Context) and re-do the three.',
                  misconception: 'Students often believe that **every unपरिचित word must be looked up in a dictionary immediately**, and that context clues are only a "last.' }
          ],
            remediations: { 'every-un-word-must-be': { steps: ['Have the student re-read the **first two pages of the chapter** and highlight every word they cannot define.', 'For each highlighted word, guide them to **write the two preceding and two following sentences** on a separate sheet.', 'Ask them to **circle any repeated nouns, adjectives, or contrast words** (e.g., "लेकिन", "परंतु", "जैसे") that relate.', 'Finally, have them **write a one-sentence hypothesis** for each word and only then check a dictionary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **every unपरिचित word must be looked up in a dictionary immediately**, and that context.',
          parts: [
                { id: 'a', prompt: 'The narrator says: "इग्योकु की गायकी में वह बात न रही जो पहले थी।" Evaluate whether the word "बात" here means "word", "matter", or "excellence/quality".', answer: '"बात" means "excellence/quality" (a colloquial use common in music criticism)',
                  options: ['"बात" means "excellence/quality" (a colloquial use common in music criticism)', 'last resort'],
                  hint: 'If stuck, revisit **c11_hin_ar_cbse_13_010** (Class 11 Vocabulary in Context) and re-do the three.',
                  misconception: 'Students often believe that **every unपरिचित word must be looked up in a dictionary immediately**, and that context clues are only a "last.' }
          ],
            remediations: { 'every-un-word-must-be': { steps: ['Have the student re-read the **first two pages of the chapter** and highlight every word they cannot define.', 'For each highlighted word, guide them to **write the two preceding and two following sentences** on a separate sheet.', 'Ask them to **circle any repeated nouns, adjectives, or contrast words** (e.g., "लेकिन", "परंतु", "जैसे") that relate.', 'Finally, have them **write a one-sentence hypothesis** for each word and only then check a dictionary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_011', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि पद-परिचय या समास में अटके, तो कक्षा 11 के व्याकरण नोड (c11_hin_ar_cbse_13_011) के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **कठिन शब्दों के अर्थ लिखना** या **पद-परिचय करना** है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'आरोह भाग-2 — पाठ 13\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि पद-परिचय या समास में अटके, तो कक्षा 11 के व्याकरण नोड (c11_hin_ar_cbse_13_011) के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **कठिन शब्दों के अर्थ लिखना** या **पद-परिचय करना** है। वे यह नहीं देख पाते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें** केवल **भाषा की दृष्टि से**: हर वाक्य को रेखांकित करें, पूछें — "यहाँ लेखक ने *इस*.', '**कक्षा 11 के व्याकरण नोड (c11_hin_ar_cbse_13_011)** पर लौटें: वहाँ पद-परिचय, समास, कारक, मुहावरे की आधारभूत पहचान का.', '**एक अनुच्छेद चुनें** (जैसे पहलवान का संवाद) और उसका **मानक हिंदी में पुनर्लेखन** करें। फिर दोनों की तुलना करें: क्या.', '**पुनः निदान:** DIAGNOSTIC_QUESTION_2 और 5 को दोबारा हल करें बिना नोट्स देखे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_012', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'अगर फँस जाएँ तो **c12_hin_ar_cbse_13_004 (पात्र-चित्रण: नायक)** और.',
          misconception: '**भ्रांति:** "आशय-सूचक प्रश्न का उत्तर मेरी \'समझ\' (understanding) है, इसलिए जो मैं महसूस करूँ वही सही है — पाठ से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'आरोह भाग-2 — पाठ 13\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर फँस जाएँ तो **c12_hin_ar_cbse_13_004 (पात्र-चित्रण: नायक)** और **c12_hin_ar_cbse_13_008 (बिंब.',
                  misconception: '**भ्रांति:** "आशय-सूचक प्रश्न का उत्तर मेरी \'समझ\' (understanding) है, इसलिए जो मैं महसूस करूँ वही सही है — पाठ से उद्धरण (quote) देना.' }
          ],
            remediations: { 'understanding': { steps: ['**पुनर्निदान (Re-diagnose):** छात्र से कहो — "पाठ का कोई एक वाक्य चुनो जो तुम्हारी बात सिद्ध करे।" अगर वह न ढूँढ़ पाए.', '**लक्षित अभ्यास (Targeted practice):** उसे पाठ के 5 वाक्य दो (मिश्रित: तथ्यात्मक और बिंबात्मक)। प्रत्येक से एक.', '**मॉडलिंग (Modelling):** बोर्ड के मार्किंग स्कीम (marking scheme) से 2-3 नमूना उत्तर दिखाओ — एक पूर्ण अंक वाला (साक्ष्य.', '**पुनर्मूल्यांकन (Re-assess):** 2 दिन बाद उसी प्रकार का नया गद्यांश देकर आशय-सूचक प्रश्न पूछो — अब साक्ष्य अनिवार्य है।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
