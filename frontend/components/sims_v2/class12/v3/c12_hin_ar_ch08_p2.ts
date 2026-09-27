import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch08_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch08_p2',
    title: 'रुबाइयाँ · Part 2/3',
    subtitle: 'The village finally spoke — in its own voice',
    classLevel: 12, subject: 'hin_ar', topic: 'रुबाइयाँ · Part 2/3',
    chapters: ['c12_hin_ar_ch08'],
    nodeIds: ['c12_hin_ar_cbse_08_007', 'c12_hin_ar_cbse_08_008', 'c12_hin_ar_cbse_08_009', 'c12_hin_ar_cbse_08_010', 'c12_hin_ar_cbse_08_011', 'c12_hin_ar_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-language poetry reader', intro: 'A freedom fighter from Araria refused to translate the village for the city. The dialect is the poem\'s argument.', goal: 'Read Renu\'s poem through lok-bhasha politics, body-as-knowing and post-Quit India longing.' },
    discovery: {
        question: 'Premchand wrote about villages in standard Hindi; Renu wrote from inside the village in its own folk speech. Why is the difference more than style?',
        options: ['Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature', 'Renu couldn\'t write proper Hindi', 'Dialect is just local colour', 'No real difference'],
        answer: 'Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature',
        hook: 'Renu\'s philosophy erased the body-mind split — mud on knees IS knowing the world. A Quit India prisoner writing children\'s free play isn\'t just nostalgic: that village is the autonomous world he fought for, reclaimed in folk speech.',
    },
    teaching: [
        { title: 'रुबाइयाँ — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**प्रतीक (Symbol):** काव्य में प्रयुक्त वह शब्द/पद/चित्र जो अपने स्थूल अर्थ के अतिरिक्त किसी अमूर्त भाव, विचार या मूल्य को संकेतित करता है। **बिंब (Imagery):** काव्य-भाषा द्वारा निर्मित वह संवेदी.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hear a poem in lok-bhasha: weigh dialect as political choice, read bodily play as a way of knowing, and connect a freedom fighter\'s childhood to the freedom he couldn\'t finish.',
        labels: ['रुबाइयाँ — साहित्यिक युक्तियाँ', 'रुबाइयाँ — मुख्य भाव', 'रुबाइयाँ — गौण भाव', 'रुबाइयाँ — पदावली: कठिन', 'रुबाइयाँ — व्याकरण: पद्य', 'रुबाइयाँ — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend selected for a national poetry fest wants to strip the dialect words from her village poems — \'real Hindi shouldn\'t smell of fields.\' The poems\' best lines are built from exactly those folk words and her grandmother\'s sayings.',
            decisions: [{ prompt: 'What does Renu\'s poem with the vine refrain say to her plan?', options: [
                { text: 'Keep the dialect — the poem builds from village scenes to the claim that script clings to language and language to life like a vine to a tree; cutting the folk idiom severs the very root the refrain keeps reaffirming.', outcome: 'The refrain isn\'t decoration: each stanza\'s memory ends by clinging back to the soil, so her \'impure\' words are the structural backbone of what makes the poems live.' },
                { text: 'Support the polish — standard literary Hindi is the tree; dialect is a creeper that needs pruning to grow upward.', outcome: 'The poem reverses that hierarchy — the vine survives because it clings; dialect isn\'t a parasite on standard language but the living connection that keeps the whole organism fed.', reveals: 'standard-above-dialect' },
                { text: 'Suggest writing two versions: a dialect draft for home and a cleaned-up one for the fest.', outcome: 'The poem\'s fourth stanza universalises the personal — the folk voice is the argument, not a first draft to be translated away; the split treats rootedness as a private habit to hide in public.', reveals: 'dialect-is-private-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear regional speech as literature\'s politics — and read a child\'s muddy play as reclaimed freedom.',
            decisions: [{ prompt: 'What comes next? रुबाइयाँ · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — रुबाइयाँ · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_007', difficulty: 'standard',
          question: '**प्रतीक (Symbol):** काव्य में प्रयुक्त वह शब्द/पद/चित्र जो अपने स्थूल अर्थ के.',
          hint: 'यदि अटके तो: कक्षा 11 आरोह नोड `c11_hin_ar_cbse_16_007` (आओ, मलिकर बचाएँ — प्रतीक और.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **"हर रूपक प्रतीक है" और "हर बिंब अलंकार है"।** - **वास्तविकता:** रूपक में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**प्रतीक (Symbol):** काव्य में प्रयुक्त वह शब्द/पद/चित्र जो अपने स्थूल अर्थ के अतिरिक्त',
                  options: ['**प्रतीक (Symbol):** काव्य में प्रयुक्त वह शब्द/पद/चित्र जो अपने स्थूल अर्थ के अतिरिक्त', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि अटके तो: कक्षा 11 आरोह नोड `c11_hin_ar_cbse_16_007` (आओ, मलिकर बचाएँ — प्रतीक और बिंब) का "बिंब.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **"हर रूपक प्रतीक है" और "हर बिंब अलंकार है"।** - **वास्तविकता:** रूपक में **स्पष्ट तुलना** होती है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** कक्षा 11 के नोड `c11_hin_a_cbse_13_007` (जाग तुझको दूर जाना — प्रतीक और बिंब) या `c11_hin_ar_cbse_16_007`.', '**चरण 2:** रुबाइयों के **पद 1 और पद 5** साथ रखो। पद 1 में "सुबह/बहार/चिड़ियाँ" के **बिंब** छाँटो; पद 5 में "शाम/उजड़ा.', '**चरण 3:** एक शीट पर दो कॉलम बनाओ: **बिंब (संवेदी प्रकार + पंक्ति)** | **प्रतीक (स्थूल अर्थ → गूढ़ार्थ + थीम लिंक)**।.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_3 और 4 फिर से हल करो — अब अंतर स्पष्ट होगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_008', difficulty: 'standard',
          question: 'रुबाइयाँ उमर खय्याम द्वारा रचित फारसी चतुष्पदियों का हिंदी अनुवाद है, जिनका.',
          hint: 'यदि मुख्य भाव नहीं पकड़ में आए: c12_hin_ar_cbse_08_007 की प्रतीक-सारणी दोहराएँ — प्रत्येक.',
          misconception: '**सबसे आम गलती:** छात्र रुबाइयों को **\'शराब-प्रशंसा की कविताएँ\'** मान लेते हैं क्योंकि \'मधुशाला\', \'प्याला\', \'साकी\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रुबाइयाँ उमर खय्याम द्वारा रचित फारसी चतुष्पदियों का हिंदी अनुवाद है, जिनका **मुख्य भाव**',
                  options: ['रुबाइयाँ उमर खय्याम द्वारा रचित फारसी चतुष्पदियों का हिंदी अनुवाद है, जिनका **मुख्य भाव**', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि मुख्य भाव नहीं पकड़ में आए: c12_hin_ar_cbse_08_007 की प्रतीक-सारणी दोहराएँ — प्रत्येक प्रतीक के.',
                  misconception: '**सबसे आम गलती:** छात्र रुबाइयों को **\'शराब-प्रशंसा की कविताएँ\'** मान लेते हैं क्योंकि \'मधुशाला\', \'प्याला\', \'साकी\', \'मय\' शब्द आते हैं। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**तुरंत पुनरावृत्ति:** c12_hin_ar_cbse_08_007 (प्रतीक और बिंब) पढ़ें — विशेषकर \'मधुशाला\', \'प्याला\', \'साकी\', \'खाक\' के.', '**सूफी काव्य परंपरा** का 5 मिनट का वीडियो देखें (यूट्यूब: "सूफी काव्य में मधुशाला प्रतीक")। 3.', '**पुनः-निदान:** उपरोक्त DIAGNOSTIC_QUESTION_2 और 4 फिर से हल करें — अब प्रतीकार्थ सही आने चाहिए। 4.', 'यदि फिर भी अटके: c11_hin_a_cbse_13_008 (जाग तुझको दूर जाना — मुख्य भाव) देखें — वहाँ भी \'पथ\', \'दीपक\' प्रतीकों से यही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_009', difficulty: 'standard',
          question: 'गौण भाव (Secondary Themes) वे सहायक विचार या प्रसंग हैं जो कविता के केंद्रीय.',
          hint: 'अगर अटके तो c12_hin_ar_cbse_08_004 (केंद्रीय भाव) और c12_hin_ar_cbse_08_007 (प्रतीक और.',
          misconception: 'छात्र अक्सर गौण भाव और विषयांतर को \'मुख्य विषय से भटकाव\' या \'सजावटी बातें\' मानकर नजरअंदाज कर देते हैं। विशेषकर वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव (Secondary Themes) वे सहायक विचार या प्रसंग हैं जो कविता के केंद्रीय भाव को',
                  options: ['गौण भाव (Secondary Themes) वे सहायक विचार या प्रसंग हैं जो कविता के केंद्रीय भाव को', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'अगर अटके तो c12_hin_ar_cbse_08_004 (केंद्रीय भाव) और c12_hin_ar_cbse_08_007 (प्रतीक और बिंब) दोबारा.',
                  misconception: 'छात्र अक्सर गौण भाव और विषयांतर को \'मुख्य विषय से भटकाव\' या \'सजावटी बातें\' मानकर नजरअंदाज कर देते हैं। विशेषकर वे \'क़ज़ा\', \'साकी\', \'गुलाब\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें कि वह रुबाई 1-3 पढ़े और हर पंक्ति के आगे लिखे: \'यह मुख्य भाव है / गौण भाव है / विषयांतर है\'। चरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_010', difficulty: 'standard',
          question: 'पदावली (Vocabulary) का अर्थ है कविता में प्रयुक्त विशिष्ट शब्दों (कठिन शब्दों).',
          hint: 'यदि अटके तो **c12_hin_ar_cbse_08_007** (प्रतीक और बिंब) के \'सूफी प्रतीकों की सूची\' को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'कठिन शब्दों के अर्थ रट लेना\' ही पदावली की तैयारी है। वे \'शाब्दिक अर्थ\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Vocabulary) का अर्थ है कविता में प्रयुक्त विशिष्ट शब्दों (कठिन शब्दों) तथा',
                  options: ['पदावली (Vocabulary) का अर्थ है कविता में प्रयुक्त विशिष्ट शब्दों (कठिन शब्दों) तथा', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि अटके तो **c12_hin_ar_cbse_08_007** (प्रतीक और बिंब) के \'सूफी प्रतीकों की सूची\' को दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'कठिन शब्दों के अर्थ रट लेना\' ही पदावली की तैयारी है। वे \'शाब्दिक अर्थ\' (dictionary meaning) और.' }
          ],
            remediations: { 'dictionary-meaning-contextual-connotative-meanin': { steps: ['चरण 1: छात्र से कहें — "रुबाई की कोई एक पंक्ति चुनो जिसमें कठिन शब्द/मुहावरा हो। पहले उसका शाब्दिक अर्थ लिखो, फिर आँख.', 'वह चित्र ही प्रतीकात्मक अर्थ है।" चरण 2: पूर्ववर्ती नोड **c12_hin_ar_cbse_08_007** (प्रतीक और बिंब) को दोबारा पढ़ें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है काव्य-रचना में शब्द-चयन (डिक्शन), वाक्य-विन्यास.',
          hint: 'यदि क्रिया-रूप पहचानने में अटकें तो कक्षा 10 हिंदी व्याकरण \'क्रिया\' पाठ (काल, पक्ष, मूड).',
          misconception: 'छात्र समझते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ है **कठिन शब्दों के अर्थ लिखना** या **अलंकार पहचानना**। वे यह नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है काव्य-रचना में शब्द-चयन (डिक्शन), वाक्य-विन्यास',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है काव्य-रचना में शब्द-चयन (डिक्शन), वाक्य-विन्यास', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि क्रिया-रूप पहचानने में अटकें तो कक्षा 10 हिंदी व्याकरण \'क्रिया\' पाठ (काल, पक्ष, मूड) दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ है **कठिन शब्दों के अर्थ लिखना** या **अलंकार पहचानना**। वे यह नहीं देखते कि फ़िराक़.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को रुबाइयों के 2-3 पद्यांश दें और कहें: "हर क्रिया को घेरे में लें, उसका काल/पक्ष/मूड लिखें, फिर पूछें — कवि ने.', 'सर्वनामों (\'मैं\', \'हम\', \'तुम\', \'यह\', \'वह\') को अलग रंग से चिह्नित करवाएँ और प्रत्येक परिवर्तन पर लिखवाएँ: "कौन बोल रहा.', 'एक पंक्ति लें, उसके 3 संस्करण बनवाएँ: (क) मूल, (ख) विराम-चिह्न डालकर, (ग) शब्द-क्रम बदलकर — फिर तीनों पढ़वाएँ और अंतर.', 'पुनः निदान: उपरोक्त DIAGNOSTIC_QUESTION_3 और 4 दोहराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर एक शब्द, एक वाक्य या.',
          hint: 'यदि फँस जाएँ: पहले c12_hin_ar_cbse_08_002 (भावार्थ) से प्रसंग दोहराएँ, फिर.',
          misconception: 'छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर \'अपनी राय\' देना है** — "मुझे लगता है कवि ऐसा कह रहे हैं क्योंकि..."।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर एक शब्द, एक वाक्य या विकल्प',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर एक शब्द, एक वाक्य या विकल्प', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि फँस जाएँ: पहले c12_hin_ar_cbse_08_002 (भावार्थ) से प्रसंग दोहराएँ, फिर c12_hin_ar_cbse_08_007.',
                  misconception: 'छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर \'अपनी राय\' देना है** — "मुझे लगता है कवि ऐसा कह रहे हैं क्योंकि..."। वास्तविकता: आशय-सूचक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**निदान**: छात्र से कहो — "पहले केवल वस्तुनिष्ठ प्रश्नों के 10 अभ्यास करो (c12_hin_ar_cbse_08_012 के अभ्यास खंड से).', '**पुनर्परीक्षण**: यदि वस्तुनिष्ठ में कीवर्ड छूटते हैं → c12_hin_ar_cbse_08_010 (पदावली) दोहराओ। यदि आशय-सूचक में प्रमाण.', '**पुनः निदान**: 3 दिन बाद मिश्रित प्रश्न-पत्र (5 वस्तुनिष्ठ + 2 आशय-सूचक) देकर जाँचो — क्या अब PEEL स्वतः आ रहा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
