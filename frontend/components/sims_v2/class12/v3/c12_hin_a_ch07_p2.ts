import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch07_p2: SimDef = {
    id: 'v3_c12_hin_a_ch07_p2',
    title: 'बारहमासा · Part 2/3',
    subtitle: 'A walking song where hunger means two hungers',
    classLevel: 12, subject: 'hin_a', topic: 'बारहमासा · Part 2/3',
    chapters: ['c12_hin_a_ch07'],
    nodeIds: ['c12_hin_a_cbse_07_007', 'c12_hin_a_cbse_07_008', 'c12_hin_a_cbse_07_009', 'c12_hin_a_cbse_07_010', 'c12_hin_a_cbse_07_011', 'c12_hin_a_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Varkari-tradition reader', intro: 'On the road to Pandharpur, a saint-poet handed the poorest pilgrims a song — and a subtle verdict on orthodoxy.', goal: 'Read Eknath\'s Abhang through the Varkari tradition — folk form carrying devotion and social critique.' },
    discovery: {
        question: 'A pilgrim woman sings to Vitthal of hunger and thirst on the road to Pandharpur — why does an Abhang carry both at once?',
        options: ['Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together', 'Pilgrims just get hungry', 'Folk songs need simple themes', 'Fasting is the ritual'],
        answer: 'Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together',
        hook: 'Eknath was a Brahmin who wrote for the marginalised — the Abhang\'s plain Marathi, folk rhythm and a woman\'s voice are the reform, not simplification. This is poetry made to be walked and sung, not recited from a throne.',
    },
    teaching: [
        { title: 'बारहमासा — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'कंजकली\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'March with the Varkaris: learn what makes an Abhang an Abhang, read hunger as both road and spirit, and hear how a saint smuggled equality into a song.',
        labels: ['बारहमासा — साहित्यिक युक्तियाँ', 'बारहमासा — मुख्य भाव', 'बारहमासा — गौण भाव', 'बारहमासा — पदावली: कठिन', 'बारहमासा — व्याकरण: पद्य', 'बारहमासा — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_010', title: 'बारहमासा — पदावली: कठिन शब्द और मुहावरे',
          caseStudy: { intro: '\'कंजकली\' के मुख्य शब्द: कंजकली — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the primary reason the poet uses dialect words like *nsol*, *fufl*, and *lhÅ* instead of standard Hindi equivalents like *din*.', options: [
                { text: 'Correct answer: To authentically capture the rural speaker\'s voice, cultural rootedness,', outcome: 'Correct answer: To authentically capture the rural speaker\'s voice, cultural rootedness, and.' },
                { text: 'to make the poem difficult', outcome: 'Not quite — Students memorize the NCERT glossary meanings (*nsol = din, fufl = raat*) and reproduce them.', reveals: 'students-memorize-the-ncert-glossary' },
                { text: 'because old Hindi was different', outcome: 'Not quite — Students memorize the NCERT glossary meanings (*nsol = din, fufl = raat*) and reproduce them.', reveals: 'students-memorize-the-ncert-glossary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a folk-style music video of a woman waiting through the night for someone who doesn\'t come. A teammate wants to cut the repeated shots — lamp, doorway, her face — because \'repetition is dead screen time.\'',
            decisions: [{ prompt: 'What does Mahadevi Verma\'s \'बारहमासा\'-style waiting poem say?', options: [
                { text: 'Keep the repeats — in the poem each stanza\'s return to lamp, night and call is the waiting itself; repetition isn\'t filler, it\'s the heartbeat, and each recurrence shifts from active seeking to inward endurance as the night deepens.', outcome: 'The chapter\'s point: in folk narrative the structure IS the emotion — time passing is the plot, and only the repeated images let the viewer feel its weight.' },
                { text: 'Cut them — montage it once and move on; viewers understand waiting from a single shot.', outcome: 'One shot conveys \'she waited\' as information; the poem\'s layered returns make the waiting an experience — the difference between being told a night passed and watching it refuse to pass.', reveals: 'repetition-is-filler' },
                { text: 'Keep one repeat at the end for rhythm but tighten the middle.', outcome: 'The poem needs the middle repetitions most — that\'s where \'the day passed, the night didn\'t\' stretches external time into her subjective endurance; trimming there trims the tension\'s source.', reveals: 'repeat-only-at-end' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a pilgrimage song as social reform in folk metre — Bhakti that walks, sings and quietly levels.',
            decisions: [{ prompt: 'What comes next? बारहमासा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बारहमासा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_007', difficulty: 'standard',
          question: '\'कंजकली\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review the primary theme of "ckjgeklk" (spiritual liberation through Guru\'s.',
          misconception: 'Students often think secondary themes are just \'sub-topics\' or \'less important topics\' that can be listed without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंजकली\' के गौण विषय',
                  options: ['\'कंजकली\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review the primary theme of "ckjgeklk" (spiritual liberation through Guru\'s grace) and.',
                  misconception: 'Students often think secondary themes are just \'sub-topics\' or \'less important topics\' that can be listed without analysis.' }
          ],
            remediations: { 'secondary-themes-are-just-sub': { steps: ['If a student cannot distinguish primary vs secondary themes or cannot trace a theme across stanzas: (1) Have them.', '(2) Ask: "Which of these does Kabir return to most?', 'Which one solves the problem?" — that\'s the primary theme.', '(3) For each other color, write one sentence: "This theme shows ___ and it pushes the seeker toward ___." (4) Practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_008', difficulty: 'standard',
          question: '\'कंजकली\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फंसें तो c12_hin_a_cbse_07_002: बारहमासा — पद्यांश-वार भावार्थ पर वापस जाएं और.',
          misconception: 'छात्र अक्सर बारहमासा के मुख्य भाव को वह भाव मान लेते हैं जो किसी एक विशेष महीने (जैसे वैशाख में अनुराग या कार्तिक में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंजकली\' में बिंब (imagery)',
                  options: ['\'कंजकली\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसें तो c12_hin_a_cbse_07_002: बारहमासा — पद्यांश-वार भावार्थ पर वापस जाएं और प्रत्येक महीने.',
                  misconception: 'छात्र अक्सर बारहमासा के मुख्य भाव को वह भाव मान लेते हैं जो किसी एक विशेष महीने (जैसे वैशाख में अनुराग या कार्तिक में विरह) में सबसे तीव्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए कि वह कविता की एक तालिका बनाए—पहले स्तंभ में महीने का नाम, दूसरे में प्रमुख भाव, तीसरे में भाव की तीव्रता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_009', difficulty: 'standard',
          question: '\'कंजकली\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि गौण भाव और मुख्य emoción के बीच संबंध समझ नहीं आ रहा है, तो c12_hin_a_cbse_07_008.',
          misconception: 'छात्र अक्सर गौण भाव को बस \'मुख्य भाव के अतिरिक्त सजावटी विवरण\' समझ बैठते हैं और सोचते हैं कि उनका केवल कविता को लम्बा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंजकली\' में विरोधाभास',
                  options: ['\'कंजकली\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि गौण भाव और मुख्य emoción के बीच संबंध समझ नहीं आ रहा है, तो c12_hin_a_cbse_07_008 (केंद्रीय भाव.',
                  misconception: 'छात्र अक्सर गौण भाव को बस \'मुख्य भाव के अतिरिक्त सजावटी विवरण\' समझ बैठते हैं और सोचते हैं कि उनका केवल कविता को लम्बा या सुंदर बनाने का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले एक स्पष्ट विपरीत उदाहरण दें: श्लोक "हरियाली भर आई है, कोयल कूकती है, पर मेरा मन तो उदास है" पूछिए कि यहाँ.', 'अकेला बैठा प्रेमी) ताकि वह सक्रिय रूप से विरोध की पहचान करना सीखे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_010', difficulty: 'standard',
          question: '\'कंजकली\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_07_010 (Vocabulary in Context: Key Words).',
          misconception: 'Students memorize the NCERT glossary meanings (*nsol = din, fufl = raat*) and reproduce them in exams as \'meanings\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंजकली\' की पदावली',
                  options: ['\'कंजकली\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_07_010 (Vocabulary in Context: Key Words).',
                  misconception: 'Students memorize the NCERT glossary meanings (*nsol = din, fufl = raat*) and reproduce them in exams as \'meanings\'.' }
          ],
            remediations: { 'students-memorize-the-ncert-glossary': { steps: ['If a student cannot move beyond glossary meanings: (1) Give them stanza 1 only.', 'What picture comes to mind with *nsol* that *din* erases?" (2) Have them replace each dialect word with its standard.', '(3) Assign: "Find 3 words in your home language that have no exact Hindi/English equivalent.', 'Write what they *feel* like." Re-diagnose with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_011', difficulty: 'standard',
          question: '\'कंजकली\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।',
          hint: 'यदि भाषा के प्रयोग के भाव पर प्रभाव को समझने में कठिनाई हो तो पहले c12_hin_a_cbse_07_005.',
          misconception: 'बारहमासा की कविता में भाषा के प्रयोग को समझते समय छात्र अक्सर यह मान लेते हैं कि यदि शब्दों का शब्दकोश अर्थ समझ आ गया.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंजकली\' में भाषा-प्रयोग',
                  options: ['\'कंजकली\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि भाषा के प्रयोग के भाव पर प्रभाव को समझने में कठिनाई हो तो पहले c12_hin_a_cbse_07_005 (छंद और.',
                  misconception: 'बारहमासा की कविता में भाषा के प्रयोग को समझते समय छात्र अक्सर यह मान लेते हैं कि यदि शब्दों का शब्दकोश अर्थ समझ आ गया है तो कविता समझ गई है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले एक सरल हिंदी वाक्य दें जैसे "मैं स्कूल जा रहा हूँ" और पूछिए कि इसका अर्थ बदलने के लिए आप क्या बदल.', 'फिर उन्हें दिखाइए कि यदि हम इसे "स्कूल जा रहा हूँ मैं" (उलटा वाक्य) लिखते हैं तो emphasis कैसे बदलता है, या "मैं-मैं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_012', difficulty: 'standard',
          question: '\'कंजकली\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि किसी माह का बिंब-प्रतीक याद न आए तो c12_hin_a_cbse_07_002 (पद्यांश-वार भावार्थ) की.',
          misconception: 'छात्र समझते हैं कि आशय-सूचक प्रश्नों का उत्तर **\'कवि क्या कहना चाहता है\'** के बजाय **\'मुझे क्या लगता है\'** लिख देना है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंजकली\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'कंजकली\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि किसी माह का बिंब-प्रतीक याद न आए तो c12_hin_a_cbse_07_002 (पद्यांश-वार भावार्थ) की तालिका.',
                  misconception: 'छात्र समझते हैं कि आशय-सूचक प्रश्नों का उत्तर **\'कवि क्या कहना चाहता है\'** के बजाय **\'मुझे क्या लगता है\'** लिख देना है। उदाहरण: "मुझे लगता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "पहले पद्यांश की **दो पंक्तियाँ** बोलकर सुनाओ जो प्रश्न से सीधे जुड़ती हैं।" चरण 2: पूछो — "इन.', 'उसका **सामान्य अर्थ** और **पाठ-विशेष अर्थ** क्या है?" चरण 3: फिर कहो — "अब अपने उत्तर को इस ढाँचे में लिखो: **उद्धरण →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
