import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch16_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch16_p1',
    title: 'आओ, मलिकर बचाएँ · Part 1/3',
    subtitle: 'Enter a poem that shelters the village inside language itself.',
    classLevel: 11, subject: 'hin_ar', topic: 'आओ, मलिकर बचाएँ · Part 1/3',
    chapters: ['c11_hin_ar_ch16'],
    nodeIds: ['c11_hin_ar_cbse_16_001', 'c11_hin_ar_cbse_16_002', 'c11_hin_ar_cbse_16_003', 'c11_hin_ar_cbse_16_004', 'c11_hin_ar_cbse_16_005', 'c11_hin_ar_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village-born poet writing back to his own roots', intro: 'Rural hunger and city alienation share one poem — and the poet who left the village must decide whether to expose it or protect it.', goal: 'Analyse dialect as aesthetic choice and the poem\'s three-part protective structure.' },
    discovery: {
        question: 'A Nagpuri-speaking poet chooses \'tyok;q\' over standard Hindi \'tyok\' — just dialect flavour?',
        options: ['No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act', 'Yes — it means the same thing either way', 'Yes — he just didn\'t know standard Hindi', 'No — because Nagpuri is actually a different language entirely'],
        answer: 'No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act',
        hook: 'The poem\'s \'let\'s hide/save\' means both conceal and protect — the insider-outsider poet wraps language around wounds so they can be witnessed without being exposed.',
    },
    teaching: [
        { title: 'आओ, मलिकर बचाएँ — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_16_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the three-stanza arc — invitation, catalog of burdens, quiet resistance — and test whether the shape is inevitable or arbitrary.',
        labels: ['आओ, मलिकर बचाएँ —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_001', title: 'आओ, मलिकर बचाएँ — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 16 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the poet of "vkvks] feydj cpk,¡" and what are the two key biographical details that shape his poetic perspective?', options: [
                { text: 'The poet is FueZyk iqrqy (born 1972, Nagpur, Maharashtra)', outcome: 'The poet is FueZyk iqrqy (born 1972, Nagpur, Maharashtra). The two key details: (1) he was born.' },
                { text: 'Before You Read', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia—memorising the poet\'s birth year and.', reveals: 'students-treat-before-you-read' },
                { text: 'a different poet or giving only birth year', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia—memorising the poet\'s birth year and.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_002', title: 'आओ, मलिकर बचाएँ — पद्यांश-वार भावार्थ',
          caseStudy: { intro: '\'वक्वक्स] फेद्ज च्प्क,¡\' का क्रम: शुरुआत वक्वक्स]-फेद्ज-च्प्क से, घटनाएँ बढ़ती हैं, अंत \'वक्वक्स] फेद्ज च्प्क,¡\' का केंद्रीय भाव और संदेश पर।',
            decisions: [{ prompt: 'What is the primary structural movement from stanza one to stanza three in "vkvks] feydj cpk,¡"?', options: [
                { text: 'The poem moves from a direct imperative address ("come, let\'s hide") in stanza one, to an', outcome: 'The poem moves from a direct imperative address ("come, let\'s hide") in stanza one, to an expansive.' },
                { text: 'three stanzas', outcome: 'Not quite — Students treat "narrative structure" in poetry as merely counting stanzas or identifying.', reveals: 'students-treat-narrative-structure-in' },
                { text: 'hiding theme', outcome: 'Not quite — Students treat "narrative structure" in poetry as merely counting stanzas or identifying.', reveals: 'students-treat-narrative-structure-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_004', title: 'आओ, मलिकर बचाएँ — केंद्रीय भाव और रस',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'वक्वक्स] फेद्ज च्प्क,¡\' में वक्वक्स]-फेद्ज-च्प्क से पात्र उभरता है।',
            decisions: [{ prompt: 'केंद्रीय भाव (Central Emotion) और विषय (Theme/Subject) में मूलभूत अंतर क्या है?', options: [
                { text: '**Correct Answer:** विषय (Theme) कविता का *विषय-वस्तु* है', outcome: '**Correct Answer:** विषय (Theme) कविता का *विषय-वस्तु* है — यहाँ "मलिकर नामक लोककला/वाद्य का.' },
                { text: 'मलिकर नामक लोककला/वाद्य का संरक्षण', outcome: 'Not quite — **Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव").', reveals: 'specific-error-students-mechanically-apply' },
                { text: '। **Wrong Answer Reveals:** If', outcome: 'Not quite — **Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव").', reveals: 'specific-error-students-mechanically-apply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A translation club discusses a Nagpur-born poet who writes in Marathi and translates himself into Hindi, with a poem that begins \'come, let us hide\' and ends in quiet resistance. A member says: \'Pick either the village reading or the city reading — a poem can\'t be both. And the second stanza\'s long list is just imagery.\'',
            decisions: [{ prompt: 'What do both claims miss?', options: [
                { text: 'Hold the fracture: the poem speaks from inside the split between two Indias — the village with its caste, hunger and oral tradition versus the city with alienation and broken promises; the poet\'s self-translation embodies that crossing. And the list IS structure: stanza one commands (\'hide\'), stanza two stacks the burdens of modernity as rhythmic accumulation, stanza three turns declarative — \'even in this night, there\'s still much to hide.\' The form performs the hiding.', outcome: 'Both corrections land: the doubleness is the poem\'s subject, and the stanza pattern — imperative, catalogue, declaration — is the argument enacted, not ornament.' },
                { text: 'Choose the city reading — the poem lists modern burdens, so it\'s about urban alienation only.', outcome: 'Halving it destroys the tension: the poem\'s meaning lives in the contrast between village and city, agrarian memory and urban displacement.', reveals: 'pick-one-world-reading' },
                { text: 'Treat the middle stanza\'s list as decorative imagery to be sampled, not analysed.', outcome: 'The accumulation is structural enactment — the burdens pile up rhythmically so the reader feels the weight the speaker hides from.', reveals: 'list-is-just-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'Invitation → enumeration → affirmation: a three-beat arc where each stanza tucks the reader deeper into what the modern world erodes.',
            decisions: [{ prompt: 'What comes next? आओ, मलिकर बचाएँ · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आओ, मलिकर बचाएँ · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review the Class 10 Hindi "Before You Read" sections (e.g., for "Kabir".',
          misconception: 'Students treat "Before You Read" as optional background trivia—memorising the poet\'s birth year and birthplace—rather.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of "vkvks] feydj cpk,¡" and what are the two key biographical details that shape his poetic perspective?', answer: 'The poet is FueZyk iqrqy (born 1972, Nagpur, Maharashtra)',
                  options: ['The poet is FueZyk iqrqy (born 1972, Nagpur, Maharashtra)', 'Before You Read', 'a different poet or giving only birth year'],
                  hint: 'If stuck, review the Class 10 Hindi "Before You Read" sections (e.g., for "Kabir" or "Meera") and.',
                  misconception: 'Students treat "Before You Read" as optional background trivia—memorising the poet\'s birth year and birthplace—rather than as a *reading.' },
                { id: 'b', prompt: 'The note states the poem uses ">kj[kaMhiu Hkk"kk" (Nagpuri dialect/language).', answer: '"tyok;q" signals the poem\'s rootedness in spoken Nagpuri, marking the voice as',
                  options: ['"tyok;q" signals the poem\'s rootedness in spoken Nagpuri, marking the voice as', 'it means the same thing'],
                  hint: 'If stuck, review the Class 10 Hindi "Before You Read" sections (e.g., for "Kabir" or "Meera") and.',
                  misconception: 'Students treat "Before You Read" as optional background trivia—memorising the poet\'s birth year and birthplace—rather than as a *reading.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate the two societies and their contradiction, do not re-read the note passively.', 'Instead: (1) Have them draw a two-column table: left column "vkfnoklh lekt" — list 4 concrete details from the note.', '(2) Ask them to draw arrows where the note says the city *reproduces* village oppressions.', '(3) Have them write one sentence using the phrase "fozQ;k&izfrfozQ;k" to describe the relationship.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_002', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' का कथानक — \'वक्वक्स] फेद्ज च्प्क,¡\' — आरोह भाग-1 का.',
          hint: 'Review the concept of "rhetorical structure" in c11_hin_ar_cbse_16_001 — specifically how.',
          misconception: 'Students treat "narrative structure" in poetry as merely counting stanzas or identifying beginning/middle/end.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक्वक्स] फेद्ज च्प्क,¡\' का कथानक',
                  options: ['\'वक्वक्स] फेद्ज च्प्क,¡\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक्वक्स] फेद्ज च्प्क,¡\' का पाठ्य-परिवेश (setting)', '\'वक्वक्स] फेद्ज च्प्क,¡\' का पात्र-चित्रण'],
                  hint: 'Review the concept of "rhetorical structure" in c11_hin_ar_cbse_16_001 — specifically how Punjabi.',
                  misconception: 'Students treat "narrative structure" in poetry as merely counting stanzas or identifying beginning/middle/end.' }
          ],
            remediations: { 'students-treat-narrative-structure-in': { steps: ['Have the student physically map the poem: draw three boxes labeled "Invitation," "The World," "The Return" and place.', 'Ask them to read only the first lines of each stanza aloud: "vkvks] feydj cpk,¡" → "Hkhrj dh vkx" → "vkvks] feydj.', 'Give them a scrambled version of stanza 2\'s phrases and ask them to reorder — they\'ll discover no "correct" order.', 'Finally, have them rewrite stanza 3 as a question ("Is there still much to hide?") — they\'ll feel how the declarative.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "narrative structure" in poetry as merely counting stanzas or identifying beginning/middle/end.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the poem\'s three-stanza structure is inevitable or arbitrary. Could the same content work in two stanzas or five?', answer: 'The three-stanza structure is inevitable',
                  options: ['The three-stanza structure is inevitable', 'poet\'s choice', 'any number works'],
                  hint: 'Review the concept of "rhetorical structure" in c11_hin_ar_cbse_16_001 — specifically how Punjabi.',
                  misconception: 'Students treat "narrative structure" in poetry as merely counting stanzas or identifying beginning/middle/end.' }
          ],
            remediations: { 'students-treat-narrative-structure-in': { steps: ['Have the student physically map the poem: draw three boxes labeled "Invitation," "The World," "The Return" and place.', 'Ask them to read only the first lines of each stanza aloud: "vkvks] feydj cpk,¡" → "Hkhrj dh vkx" → "vkvks] feydj.', 'Give them a scrambled version of stanza 2\'s phrases and ask them to reorder — they\'ll discover no "correct" order.', 'Finally, have them rewrite stanza 3 as a question ("Is there still much to hide?") — they\'ll feel how the declarative.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_003', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_16_002 and create a 4-row table: Stanza | Core Meaning.',
          misconception: 'विद्यार्थी अक्सर समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल \'पद गिनना\' या \'तुक मिलाना\' है। वे यह नहीं देखते कि कवि ने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक्वक्स] फेद्ज च्प्क,¡\' का पाठ्य-परिवेश (setting)',
                  options: ['\'वक्वक्स] फेद्ज च्प्क,¡\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक्वक्स] फेद्ज च्प्क,¡\' का कथानक', '\'वक्वक्स] फेद्ज च्प्क,¡\' का पात्र-चित्रण'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_16_002 and create a 4-row table: Stanza | Core Meaning | Key.',
                  misconception: 'विद्यार्थी अक्सर समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल \'पद गिनना\' या \'तुक मिलाना\' है। वे यह नहीं देखते कि कवि ने *क्यों* तीसरे पद को 4.' }
          ],
            remediations: { '4-6-structural-silence-structural': { steps: ['चरण 1: विद्यार्थी से कहें — "कविता को फिर से पढ़ो, लेकिन इस बार आँखें बंद करके केवल *सुनो*: कहाँ तुम्हारी साँस.', 'वहीं पद-भंग (stanza break) है।" चरण 2: प्रत्येक पद की अंतिम पंक्ति को रेखांकित करो और पूछो: "यह पंक्ति अगले पद की पहली.', 'विरोध?" चरण 3: एक टेबल बनाओ: स्तंभ 1 = पद संख्या, स्तंभ 2 = पंक्ति संख्या, स्तंभ 3 = भाव-कार्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_004', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'If stuck, review **Class 10 Hindi (Kshitij/Kritika) Chapter on "रस और उसके भेद"**.',
          misconception: '**Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव") and Veer Rasa.',
          parts: [
                { id: 'a', prompt: 'केंद्रीय भाव (Central Emotion) और विषय (Theme/Subject) में मूलभूत अंतर क्या है? "आओ, मलिकर बचाएँ" कविता के संदर्भ में उदाहरण देकर स्पष्ट कीजिए।', answer: '**Correct Answer:** विषय (Theme) कविता का *विषय-वस्तु* है',
                  options: ['**Correct Answer:** विषय (Theme) कविता का *विषय-वस्तु* है', 'मलिकर नामक लोककला/वाद्य का संरक्षण', '। **Wrong Answer Reveals:** If', 'sadness'],
                  hint: 'If stuck, review **Class 10 Hindi (Kshitij/Kritika) Chapter on "रस और उसके भेद"** — specifically.',
                  misconception: '**Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव") and Veer Rasa ("ऊत्साह स्थायी भाव").' },
                { id: 'b', prompt: 'भरत के रस-सूत्र "विभावानुभावव्यभिचारिसंयोगाद्रसनिर्माणः" को इस कविता के **प्रथम दो पद्यांशों** पर लागू करके दिखाइए कि करुण रस की निष्पत्ति कैसे होती है। विभाव.', answer: '**Correct Answer:** * **आलम्बन विभाव:** मलिकर (वाद्य/कला)',
                  options: ['**Correct Answer:** * **आलम्बन विभाव:** मलिकर (वाद्य/कला)', 'फटे बही', 'टूटी तान', 'मौन पड़े साज'],
                  hint: 'If stuck, review **Class 10 Hindi (Kshitij/Kritika) Chapter on "रस और उसके भेद"** — specifically.',
                  misconception: '**Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव") and Veer Rasa ("ऊत्साह स्थायी भाव").' },
                { id: 'c', prompt: 'कविता के अंतिम पद्यांश में "आओ, मलिकर बचाएँ" की पुनरावृत्ति (अनुप्रास/अनुप्रासात्मक लय के साथ) करुण रस को वीर रस में कैसे परिवर्तित/संशोधित करती है?', answer: '**Correct Answer:** प्रारंभिक संचारी भाव',
                  options: ['**Correct Answer:** प्रारंभिक संचारी भाव', '(आह्वान)', '(संकल्प/कर्म)', 'को दबा नहीं देता, बल्कि उसे **वीर रस के स्थायी भाव'],
                  hint: 'If stuck, review **Class 10 Hindi (Kshitij/Kritika) Chapter on "रस और उसके भेद"** — specifically.',
                  misconception: '**Specific Error:** Students mechanically apply the *definition* of Karuna Rasa ("दुःख स्थायी भाव") and Veer Rasa ("ऊत्साह स्थायी भाव").' }
          ],
            remediations: { 'specific-error-students-mechanically-apply': { steps: ['**Step-by-Step Remediation:** 1.', '**Concrete Re-enactment:** Ask the student to recall a *personal* moment where grief turned into determined action.', 'Have them label their *own* shifting संचारी भाव: विषाद → चिंता → निश्चय → उत्साह। This grounds the abstract theory.', '**Text Mapping with Arrows:** Print the poem.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_005', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ.',
          hint: 'यदि मात्रा गिनने में अटकें तो **\'मात्रा-गणना नियम कार्ड\'** (Guru-Laghu Rule Card) बनाकर.',
          misconception: 'छात्र समझते हैं कि **छंद = तुकबंदी (Rhyme)**। वे पंक्ति के अंतिम शब्दों का मिलान (जैसे \'बचाएँ/बताएँ\') देखकर छंद पहचान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक्वक्स] फेद्ज च्प्क,¡\' के सहायक पात्र',
                  options: ['\'वक्वक्स] फेद्ज च्प्क,¡\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक्वक्स] फेद्ज च्प्क,¡\' का कथानक', '\'वक्वक्स] फेद्ज च्प्क,¡\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मात्रा गिनने में अटकें तो **\'मात्रा-गणना नियम कार्ड\'** (Guru-Laghu Rule Card) बनाकर रखें: दीर्घ.',
                  misconception: 'छात्र समझते हैं कि **छंद = तुकबंदी (Rhyme)**। वे पंक्ति के अंतिम शब्दों का मिलान (जैसे \'बचाएँ/बताएँ\') देखकर छंद पहचान लेते हैं और मात्रिक.' }
          ],
            remediations: { 'rhyme': { steps: ['**मात्रा-गणना अभ्यास**: छात्र को प्रतिदिन 5 पंक्तियाँ (पाठ्यपुस्तक से) देकर गुरु-लघु चिह्नित करवाएँ: दीर्घ स्वर (आ, ई.', '**छंद-लक्षण चार्ट** बनवाएँ: मत्तगयंद/रोला/हरिगीतिका/दोहा के लक्षण (मात्रा, यति, गति) एक टेबल में भरवाएँ। 3.', '**तुलनात्मक पठन**: उसी भाव को दो छंदों में पढ़वाएँ (मत्तगयंद vs रोला) और पूछें — "कौन-सा छंद आंदोलन का आह्वान लगता है?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_006', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' का मुख्य विषय — \'वक्वक्स] फेद्ज च्प्क,¡\' का केंद्रीय.',
          hint: 'If stuck, return to **c11_hin_ar_cbse_16_010 (Vocabulary)** and **c11_hin_ar_cbse_16_002.',
          misconception: 'Students conflate **"embrace" (cpk,¡ / tyok;q)** with **"endure" (bFkZ djuk)** or **"overcome" (ck<+uk)**.',
          parts: [
                { id: 'a', prompt: 'Apply the \'embrace\' framework to a new context: A student fails their Class 11 mid-term exams.', answer: '1) The shame of failure → embracing it builds empathy for others struggling',
                  options: ['1) The shame of failure → embracing it builds empathy for others struggling', 'study harder', 'ask teacher for help'],
                  hint: 'If stuck, return to **c11_hin_ar_cbse_16_010 (Vocabulary)** and **c11_hin_ar_cbse_16_002.',
                  misconception: 'Students conflate **"embrace" (cpk,¡ / tyok;q)** with **"endure" (bFkZ djuk)** or **"overcome" (ck<+uk)**.' }
          ],
            remediations: { 'students-conflate-embrace-cpk': { steps: ['1) **Re-read the vocabulary box**: Have the student write "cpk,¡ = tyok;q = to hold close, to hug, to welcome" — NOT.', '3) **Trace the verb**: Have them circle every occurrence of "cpk,¡" and its implied objects (vkcks&gok, vD[kM+iu.', 'a moment they *told* a crying friend "be strong." The physical memory of embrace vs.', 'instruction unlocks the distinction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
