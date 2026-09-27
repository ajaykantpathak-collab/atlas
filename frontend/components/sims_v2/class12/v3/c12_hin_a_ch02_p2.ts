import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch02_p2: SimDef = {
    id: 'v3_c12_hin_a_ch02_p2',
    title: 'सरोज स्मृति · Part 2/3',
    subtitle: 'He lost everything — and gained every register of the language',
    classLevel: 12, subject: 'hin_a', topic: 'सरोज स्मृति · Part 2/3',
    chapters: ['c12_hin_a_ch02'],
    nodeIds: ['c12_hin_a_cbse_02_007', 'c12_hin_a_cbse_02_008', 'c12_hin_a_cbse_02_009', 'c12_hin_a_cbse_02_010', 'c12_hin_a_cbse_02_011', 'c12_hin_a_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poet\'s biographer', intro: 'Three tragedies before forty — and a poetic range no one else matched. The biography explains the voice.', goal: 'Connect Nirala\'s losses and editorial life to his stylistic range and evolution beyond Chhayavad.' },
    discovery: {
        question: 'Orphaned young, widowed early, alone in a Kolkata boarding house — yet Nirala\'s poems celebrate life\'s fleeting beauty. How does grief become craft?',
        options: ['Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice', 'He suppressed the grief', 'Poetry was his therapy only', 'Luck and talent'],
        answer: 'Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice',
        hook: 'Nirala outgrew Chhayavad\'s self-centred lyricism — from subjective romance to epic history, satire and metaphysical inquiry. His language had \'many forms and levels\': the same pen wrote high-Sanskrit prayer and village-cornfield satire. Grief was the fuel; craft was the engine.',
    },
    teaching: [
        { title: 'सरोज स्मृति — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**प्रतीक (Symbol):** एक मूर्त वस्तु, व्यक्ति, क्रिया या स्थिति जो अपने शाब्दिक अर्थ से आगे जाकर किसी अमूर्त भाव, विचार, मूल्य या अवधारणा को निरूपित करती है। **बिंब (Imagery):** काव्य-भाषा में.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a poet\'s alchemy: follow the losses that forged him, map his leap beyond Chhayavad\'s bounds, and hear one voice speak in epic Sanskrit and village Avadhi both.',
        labels: ['सरोज स्मृति — साहित्यिक', 'सरोज स्मृति — मुख्य', 'सरोज स्मृति — गौण', 'सरोज स्मृति — पदावली', 'सरोज स्मृति — व्याकरण', 'सरोज स्मृति — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re making a memorial film for a departed grandparent. The editor wants strict chronology — birth, childhood, marriage, death — \'so it\'s clear.\' Your best asset is a single fading photograph of her as a young woman.',
            decisions: [{ prompt: 'What does the structure of Agyeya\'s \'लज्जत लेखा\' advise?', options: [
                { text: 'Open on the photograph — let the frame\'s mystery pull the viewer back through fragments of her life and return to the portrait at the end; the non-linear circle enacts how memory actually holds the dead, and makes impermanence felt rather than stated.', outcome: 'The poem begins with a portrait because the trace is all that survives — starting there gives the viewer the poet\'s own shock of discovery; chronology would flatten the loss into a record.' },
                { text: 'Go chronological — clarity is respect, and audiences shouldn\'t have to piece a life together.', outcome: 'The chapter\'s counter is that order is meaning: the circular frame mimics the mind returning to a fixed image; a straight birth-to-death line dilutes the irony that only the image remains.', reveals: 'clarity-demands-chronology' },
                { text: 'Drop the photograph and structure the film around interviews with people who knew her.', outcome: 'That trades the anchor for testimony: the poem\'s power is the single surviving image holding a whole life — without it, the memories float unattached.', reveals: 'testimony-beats-image' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a life into its poetry — and see how Nirala turned personal catastrophe into the widest range in modern Hindi verse.',
            decisions: [{ prompt: 'What comes next? सरोज स्मृति · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सरोज स्मृति · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_007', difficulty: 'standard',
          question: '**प्रतीक (Symbol):** एक मूर्त वस्तु, व्यक्ति, क्रिया या स्थिति जो अपने शाब्दिक.',
          hint: 'यदि अटके तो कक्षा 11 के `c11_hin_a_cbse_13_007` (प्रतीक और बिंब — जाग तुझको दूर जाना) के.',
          misconception: 'छात्र समझते हैं कि **प्रतीक = रूपक (Metaphor)** और **बिंब = अलंकारिक भाषा**। वे "सरोज कमल-सी है" को रूपक मानकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**प्रतीक (Symbol):** एक मूर्त वस्तु, व्यक्ति, क्रिया या स्थिति जो अपने शाब्दिक अर्थ से',
                  options: ['**प्रतीक (Symbol):** एक मूर्त वस्तु, व्यक्ति, क्रिया या स्थिति जो अपने शाब्दिक अर्थ से', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय'],
                  hint: 'यदि अटके तो कक्षा 11 के `c11_hin_a_cbse_13_007` (प्रतीक और बिंब — जाग तुझको दूर जाना) के कार्यित.',
                  misconception: 'छात्र समझते हैं कि **प्रतीक = रूपक (Metaphor)** और **बिंब = अलंकारिक भाषा**। वे "सरोज कमल-सी है" को रूपक मानकर प्रतीक-व्याख्या बंद कर देते.' }
          ],
            remediations: { 'metaphor': { steps: ['**चरण 1:** छात्र से कहो — "कविता के किसी एक पद को चुनो और बताओ कि यहाँ कवि ने क्या **दिखाया** है और क्या **छिपाया**.', '(ब) इससे कौन-से बिंब बन सकते हैं?', '— उत्तर लिखवाओ और चर्चा करो। **चरण 4:** पुनः निदान हेतु `DIAGNOSTIC_QUESTION_3` और `DIAGNOSTIC_QUESTION_4` दोहराओ; यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_008', difficulty: 'standard',
          question: '\'मुख्य भाव\' (Central Theme) कविता का वह **केंद्रीय विचार या संदेश** होता है.',
          hint: 'यदि अटके तो: नोड 002 (भावार्थ) से प्रसंग पढ़ो → नोड 007 (प्रतीक) से प्रतीक अर्थ लिखो →.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'मुख्य भाव\' (central theme)** और **\'केंद्रीय भाव/रस\' (dominant rasa/mood)** को एक मान लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मुख्य भाव\' (Central Theme) कविता का वह **केंद्रीय विचार या संदेश** होता है जिसे कवि अपनी',
                  options: ['\'मुख्य भाव\' (Central Theme) कविता का वह **केंद्रीय विचार या संदेश** होता है जिसे कवि अपनी', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय'],
                  hint: 'यदि अटके तो: नोड 002 (भावार्थ) से प्रसंग पढ़ो → नोड 007 (प्रतीक) से प्रतीक अर्थ लिखो → फिर इस नोड.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'मुख्य भाव\' (central theme)** और **\'केंद्रीय भाव/रस\' (dominant rasa/mood)** को एक मान लेते हैं। **ठीक-ठीक गलती:**.' }
          ],
            remediations: { 'central-theme-dominant-rasa-mood': { steps: ['**पुनः पढ़ो:** नोड 004 (केंद्रीय भाव और रस) का \'रस\' भाग दोबारा पढ़ो — रस और भाव का अंतर स्पष्ट करो। 2.', '**तालिका बनाओ:** एक कागज पर दो कॉलम बनाओ: **बायाँ — \'रस/भाव\' (करुण, शोक, विरह)**; **दायाँ — \'मुख्य भाव/संदेश\' (स्मृति.', '**परीक्षा-उत्तर अभ्यास:** नोड 014 (परीक्षा-उत्तर लेखन कौशल) का \'मुख्य भाव\' वाला मॉडल उत्तर देखो और PEEL संरचना में अपना.', '**पुनः निदान:** ऊपर दिए गए **DIAGNOSTIC_QUESTION_2** को फिर से हल करो — यदि अब सही कर पाए, तो अवधारणा स्पष्ट।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_009', difficulty: 'standard',
          question: 'गौण भाव कविता के मुख्य भाव का समर्थन करने वालेsecondary, सहायक भाव या विचार.',
          hint: 'यदि आप गौण भाव की पहचान में फंस रहे हैं, तो कविता के प्रत्येक stanza को पढ़कर खुद से.',
          misconception: 'छात्र अक्सर मानते हैं कि गौण भाव केवल "सजावटी विवरण" या "अर्थहीन अतिरिक्त लाइनें" हैं जो कविता को लंबा करने के लिए डाले.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव कविता के मुख्य भाव का समर्थन करने वालेsecondary, सहायक भाव या विचार होते हैं, जो',
                  options: ['गौण भाव कविता के मुख्य भाव का समर्थन करने वालेsecondary, सहायक भाव या विचार होते हैं, जो', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय'],
                  hint: 'यदि आप गौण भाव की पहचान में फंस रहे हैं, तो कविता के प्रत्येक stanza को पढ़कर खुद से पूछिए: "इस.',
                  misconception: 'छात्र अक्सर मानते हैं कि गौण भाव केवल "सजावटी विवरण" या "अर्थहीन अतिरिक्त लाइनें" हैं जो कविता को लंबा करने के लिए डाले गए हैं — जैसे.' }
          ],
            remediations: { 'stanza-2-stanza-4': { steps: ['यदि छात्र गौण भाव को केवल सजावट मान रहा है, तो उसे कविता की एक stanza (जैसे stanza 2) देकर पूछिए: "यदि इस पंक्ति को हटा.', 'कैसे?" फिर उसे उत्तर लिखने के लिए प्रोत्साहित कीजिए — वह देखेगा कि बच्चों की हँसी हटाने से शांति एकाकी और निराशाजनक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_010', difficulty: 'standard',
          question: 'पदावली: कठिन शब्द और मुहावरे — कविता \'सरोज स्मृति\' में प्रयुक्त क्लिष्ट, तत्सम.',
          hint: 'यदि छात्र अटका हो तो: कक्षा 11 के नोड c11_hin_a_cbse_13_010 (जाग तुझको दूर जाना — पदावली).',
          misconception: 'छात्र समझते हैं कि \'कठिन शब्द\' का अर्थ केवल \'शब्दकोश से अर्थ ढूँढ़ना\' है। वे \'वितान\' के लिए \'आकाश\' लिखकर संतुष्ट हो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: कठिन शब्द और मुहावरे',
                  options: ['पदावली: कठिन शब्द और मुहावरे', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय'],
                  hint: 'यदि छात्र अटका हो तो: कक्षा 11 के नोड c11_hin_a_cbse_13_010 (जाग तुझको दूर जाना — पदावली) और.',
                  misconception: 'छात्र समझते हैं कि \'कठिन शब्द\' का अर्थ केवल \'शब्दकोश से अर्थ ढूँढ़ना\' है। वे \'वितान\' के लिए \'आकाश\' लिखकर संतुष्ट हो जाते हैं। वास्तविक भूल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को कविता की 3-4 पंक्तियाँ दें जहाँ कठिन शब्द आए हैं। चरण 2: उससे पूछें — \'यह शब्द यहाँ क्यों आया?', 'आसान शब्द क्यों नहीं?\' चरण 3: शब्द की व्युत्पत्ति (धातु/उपसर्ग) साथ में लिखवाएँ। चरण 4: उसी भाव को व्यक्त करने वाले 2-3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा व्याकरणिक संरचनाओं (संज्ञा, क्रिया.',
          hint: 'यदि कारक पहचान में अटके — कक्षा ९-१० हिन्दी व्याकरण की **कारक-चिह्न (ने, को, से, के लिए.',
          misconception: '**सबसे घातक भ्रम:** "पद्य में व्याकरण ढीला होता है, नियम नहीं मानने पड़ते।" **सत्य:** निराला ने **व्याकरण का कठोर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा व्याकरणिक संरचनाओं (संज्ञा, क्रिया, विशेषण,',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा व्याकरणिक संरचनाओं (संज्ञा, क्रिया, विशेषण,', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय'],
                  hint: 'यदि कारक पहचान में अटके — कक्षा ९-१० हिन्दी व्याकरण की **कारक-चिह्न (ने, को, से, के लिए, में, पर.',
                  misconception: '**सबसे घातक भ्रम:** "पद्य में व्याकरण ढीला होता है, नियम नहीं मानने पड़ते।" **सत्य:** निराला ने **व्याकरण का कठोर अनुशासन** माना — तभी तो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **कक्षा ११ के \'व्याकरण: पद्य में भाषा-प्रयोग\' नोड्स** (c11_hin_a_cbse_13_011, c11_hin_a_cbse_14_011.', 'कहाँ चली?") और छात्र से **चरणबद्ध** करवाएँ: (क) हर शब्द का पद-परिचय, (ख) कारक पहचान, (ग) समास विग्रह (जहाँ लागू), (घ).', 'पुनः निदान: वही प्रश्न (DIAGNOSTIC_QUESTION_4) दें — अब छात्र **वाक्य-विन्यास विचलन को काव्य-युक्ति** के रूप में बता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_012', difficulty: 'standard',
          question: 'बोध-प्रश्न दो प्रकार के होते हैं: **वस्तुनिष्ठ** (Objective) — जिनका उत्तर पाठ.',
          hint: 'यदि अटके तो c12_hin_a_cbse_02_007 (प्रतीक और बिंब) नोड के \'प्रतीक → अभिप्राय\' सारणी वाले.',
          misconception: 'छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर पाठ की पंक्तियाँ ज्यों-की-त्यों उद्धृत कर देना है**। वे लिखते हैं: "आशय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न दो प्रकार के होते हैं: **वस्तुनिष्ठ** (Objective)',
                  options: ['बोध-प्रश्न दो प्रकार के होते हैं: **वस्तुनिष्ठ** (Objective)', 'सरोज स्मृति सरोजिनी नायडू की कविता का एक संग्रह है, जो उनके व्यक्तिगत अनुभवों,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद या पंक्तियों के समूह का गहन विश्लेषण', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के पदों (stanzas), पंक्तियों, छंद-विधान, लय'],
                  hint: 'यदि अटके तो c12_hin_a_cbse_02_007 (प्रतीक और बिंब) नोड के \'प्रतीक → अभिप्राय\' सारणी वाले खंड को.',
                  misconception: 'छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर पाठ की पंक्तियाँ ज्यों-की-त्यों उद्धृत कर देना है**। वे लिखते हैं: "आशय: \'तुम्हारी यह.' }
          ],
            remediations: { '1': { steps: ['यदि छात्र आशय-सूचक में पंक्तियाँ दोहराता है: **चरण 1:** उससे पूछें — "कवि ने \'धूलि-धूसर\' क्यों कहा?', 'क्या सरोज सच में गंदी थी?" — इससे शाब्दिक vs प्रतीकात्मक का भेद खुलेगा। **चरण 2:** c12_hin_a_cbse_02_007 (प्रतीक और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
