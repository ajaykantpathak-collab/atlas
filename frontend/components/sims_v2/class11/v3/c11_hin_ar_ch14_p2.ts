import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch14_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch14_p2',
    title: 'पाठ 14 · Part 2/3',
    subtitle: 'Read the poems of a woman the palace tried to silence — and the canon tried to forget.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 14 · Part 2/3',
    chapters: ['c11_hin_ar_ch14'],
    nodeIds: ['c11_hin_ar_cbse_14_007', 'c11_hin_ar_cbse_14_008', 'c11_hin_ar_cbse_14_009', 'c11_hin_ar_cbse_14_010', 'c11_hin_ar_cbse_14_011', 'c11_hin_ar_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a locked diary that got out anyway', intro: 'Imprisoned for writing, released on conditions, betrayed, escaped — her biography isn\'t background; it\'s the poems\' skeleton.', goal: 'Read biography as the structural logic of the poems and evaluate their unresolved moral ending.' },
    discovery: {
        question: 'A queen imprisoned by her own king for writing poetry negotiates three conditions for release, he breaks them, she breaks out — what is this life to her poems?',
        options: ['The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice', 'Nothing — biography shouldn\'t colour literary analysis', 'It\'s background colour for a romantic reading', 'It proves the poems are only about palace politics'],
        answer: 'The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice',
        hook: 'A Chhayavad-era woman wrote in Braj Bhasha so village women could read her — and the canon excluded her for decades for exactly that choice.',
    },
    teaching: [
        { title: 'पाठ 14 — गौण विषय', text: '\'आरोह भाग-1 — पाठ 14\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the two poems as a diptych — systemic oppression in one, a hunter\'s frozen moral crisis in the other — and judge the unresolved \'if I kill her\' ending.',
        labels: ['पाठ 14 — गौण', 'पाठ 14 — साहित्यिक', 'पाठ 14 — पदावली', 'पाठ 14 — व्याकरण', 'पाठ 14 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_010', title: 'पाठ 14 — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 14\' के मुख्य शब्द: आरोह-भाग-1-—-पाठ-14 — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'Define "vocabulary in context" and explain how it differs from looking up a word in a standard Hindi dictionary (शब्दकोश).', options: [
                { text: 'Vocabulary in context means determining a word\'s meaning based on how it functions within', outcome: 'Vocabulary in context means determining a word\'s meaning based on how it functions within.' },
                { text: 'both give the same meaning', outcome: 'Not quite — Students believe "vocabulary in context" means finding the *one correct dictionary definition* that.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means finding the *one correct dictionary definition* that.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_011', title: 'पाठ 14 — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 14\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'Identify the grammatical function of the suffix "एर" in the phrase "एर एप्य" from the first poem, and state its modern Hindi equivalent.', options: [
                { text: 'The suffix "एर" functions as the genitive case marker (कारक चिह्न) equivalent to modern', outcome: 'The suffix "एर" functions as the genitive case marker (कारक चिह्न) equivalent to modern Hindi.' },
                { text: 'or locative', outcome: 'Not quite — Students consistently treat Braj Bhasha forms as "incorrect" or "corrupted" Hindi rather than as.', reveals: 'students-consistently-treat-braj-bhasha' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary society is debating why a Chhayavad-era queen who wrote in Braj Bhasha — imprisoned by her own husband for writing — was left out of the canon for decades. A member says: \'Probably her poems were just weaker; canon committees judge merit, not politics.\'',
            decisions: [{ prompt: 'What does her case actually reveal?', options: [
                { text: 'Read exclusion as power, not merit: she wrote in Braj so village women could access her work — a choice the Khari Boli canon punished. And biography is structural logic: imprisoned for writing, she negotiated three release conditions, he broke them, and she broke out — so the second poem\'s knocking on the door is a political act, and the first\'s call for reform is a survivor\'s testimony, not abstract preaching.', outcome: 'The debate reframes: canon-making is a struggle over language, gender and authority — her life is the interpretive key, not an anecdote.' },
                { text: 'Accept the merit explanation — the canon reflects quality, and exclusion just means weaker verse.', outcome: 'That ignores the documented mechanism: her Braj Bhasha choice — made for accessibility — was itself the grounds for exclusion, a language-and-gender judgment dressed as taste.', reveals: 'canon-is-pure-merit' },
                { text: 'Separate the poems from her life — read them on their own without biography.', outcome: 'Here biography IS the structure: the diptych pairs systemic oppression (poem 1) with the individual moral crisis it produces (poem 2) — her imprisonment and escape are the logic, not decoration.', reveals: 'ignore-biography-read-text-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'The hunter\'s hand stays raised and the poem refuses to lower it — the reader must live inside the poor man\'s eternal dilemma.',
            decisions: [{ prompt: 'What comes next? पाठ 14 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 14 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_007', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि फंसे तो **नोड 006 (मुख्य विषय और संदेश)** पर लौटें — मुख्य विषय के \'की-वर्ड्स\' (जैसे.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर \'गौण विषय\' को \'गौण पात्र\' (minor characters) समझ लेते हैं और मानते हैं कि गौण पात्रों के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'आरोह भाग-1 — पाठ 14\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे तो **नोड 006 (मुख्य विषय और संदेश)** पर लौटें — मुख्य विषय के \'की-वर्ड्स\' (जैसे.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर \'गौण विषय\' को \'गौण पात्र\' (minor characters) समझ लेते हैं और मानते हैं कि गौण पात्रों के प्रसंग ही गौण विषय.' }
          ],
            remediations: { 'minor-characters': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें — "गौण पात्र = व्यक्ति; गौण विषय = उस व्यक्ति के इर्द-गिर्द बुनी गई **कहानी की एक.', '**दृश्यीकरण कराएं:** एक कागज पर मुख्य विषय को मोटी रेखा (मेन हाईवे) और गौण विषय को पतली समानांतर रेखाओं (सर्विस रोड) के.', '**पाठगत अभ्यास:** पाठ 14 के 3-4 पन्ने देकर कहें — "हर पन्ने पर निशान लगाओ: यहाँ मुख्य विषय की बात हो रही है, यहाँ गौण.', '**मौखिक जांच:** पूछें — "अगर यह गौण विषय हटा दें तो मुख्य विषय पर क्या असर पड़ेगा?" यदि छात्र कहे \'कोई असर नहीं\', तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_008', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फँस जाएँ तो **कक्षा 10 हिंदी पाठ्यपुस्तक (क्षितिज/कृतिका) के अलंकार संबंधी अध्याय**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **रूपक केवल \'सुंदरता/अलंकार\' के लिए होता है** — अर्थात् यह कथन को \'सजाता\' मात्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'आरोह भाग-1 — पाठ 14\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ तो **कक्षा 10 हिंदी पाठ्यपुस्तक (क्षितिज/कृतिका) के अलंकार संबंधी अध्याय** दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **रूपक केवल \'सुंदरता/अलंकार\' के लिए होता है** — अर्थात् यह कथन को \'सजाता\' मात्र है, अर्थ नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — इंद्रिय-सूची बनवाएँ:** छात्र को 5 कॉलम वाली शीट दें (दृश्य, श्रवण, घ्राण, स्पर्श, स्वाद)। किसी भी परिचित.', '**चरण 2 — रूपक शल्य-क्रिया (Metaphor Surgery):** एक सरल रूपक लें ("समय पैसा है")। बोर्ड पर दो कॉलम बनाएँ: उपमेय (समय).', 'फिर पूछें: "कौन सा गुण *नहीं* मिलता?" (पैसा भौतिक है, समय नहीं) — इससे रूपक = **चुनिंदा गुण-स्थानांतरण (Selective.', '**चरण 3 — मिश्रित अभ्यास:** एक छोटा गद्यांश दें जिसमें बिंब और रूपक दोनों हों। छात्र को पहले बिंब घेरने को कहें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_009', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'Review the distinction between metaphor (direct comparison) and symbol (object.',
          misconception: 'Students often confuse irony with mere coincidence or bad luck, and they treat symbols as just \'metaphors\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 14\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'Review the distinction between metaphor (direct comparison) and symbol (object representing an idea.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck, and they treat symbols as just \'metaphors\'.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['Re-read the two poems focusing only on lines where the speaker\'s tone suggests a gap between words and reality (irony).', 'Create a two-column table: Column A – Literal meaning; Column B – Implied meaning. Fill for 3-4 key lines.', 'For symbolism, list the object, its literal function, and its abstract association in the poem.', 'Write one paragraph explaining how the contradiction (irony) or the object (symbol) deepens the theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_010', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'Review "ध्वनि-चित्रण" (onomatopoeia/phonetic imaging) and "अनुप्रास" (alliteration) from.',
          misconception: 'Students believe "vocabulary in context" means finding the *one correct dictionary definition* that fits the sentence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 14\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'Review "ध्वनि-चित्रण" (onomatopoeia/phonetic imaging) and "अनुप्रास" (alliteration) from Node.',
                  misconception: 'Students believe "vocabulary in context" means finding the *one correct dictionary definition* that fits the sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Give the student a single line from the poem (e.g., "पजकपज! एर पवद वोलज") and ask: "What does the *sound* of पजकपज make.', 'Have them list 5 words that *sound* like panic (धड़क, काँप, थर्र, etc.) and compare phonetic textures.', 'Return to the line - now ask: "If the poet wrote \'डर\' instead, what would be lost?"', 'Guide them to write: "पजकपज enacts panic through its repetitive plosives; \'डर\' only names it." This shifts focus from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "vocabulary in context" means finding the *one correct dictionary definition* that fits the sentence.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The word \'पूएफवाइडकटज़क़ु\' in the introductory note is just a synonym for \'कवि\' (poet).', answer: 'Refute',
                  options: ['Refute', 'vocabulary in context'],
                  hint: 'Review "ध्वनि-चित्रण" (onomatopoeia/phonetic imaging) and "अनुप्रास" (alliteration) from Node.',
                  misconception: 'Students believe "vocabulary in context" means finding the *one correct dictionary definition* that fits the sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Give the student a single line from the poem (e.g., "पजकपज! एर पवद वोलज") and ask: "What does the *sound* of पजकपज make.', 'Have them list 5 words that *sound* like panic (धड़क, काँप, थर्र, etc.) and compare phonetic textures.', 'Return to the line - now ask: "If the poet wrote \'डर\' instead, what would be lost?"', 'Guide them to write: "पजकपज enacts panic through its repetitive plosives; \'डर\' only names it." This shifts focus from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_011', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'Review the शब्द-अर्थ (word-meaning) list from the textbook\'s \'शब्द-नोट\' section and.',
          misconception: 'Students consistently treat Braj Bhasha forms as "incorrect" or "corrupted" Hindi rather than as a systematic literary.',
          parts: [
                { id: 'a', prompt: 'Explain why the poet uses "पन" instead of standard Braj "पर" or modern Hindi "पर/में" in "रमि एर" and "एपक एर मफक्य-इकफक्य", and what phonological process this.', answer: '"पन" represents the Braj Bhasha locative postposition where the dental nasal \'न\'',
                  options: ['"पन" represents the Braj Bhasha locative postposition where the dental nasal \'न\'', 'as a separate lexical item or modern Hindi'],
                  hint: 'Review the शब्द-अर्थ (word-meaning) list from the textbook\'s \'शब्द-नोट\' section and practice.',
                  misconception: 'Students consistently treat Braj Bhasha forms as "incorrect" or "corrupted" Hindi rather than as a systematic literary dialect with its own.' }
          ],
            remediations: { 'students-consistently-treat-braj-bhasha': { steps: ['Give the student a three-column table — Column A: Braj form from poem, Column B: Modern Khari Boli equivalent, Column.', 'Ask them to read aloud both versions and clap the meter — they will hear how "एर" (light) vs "का" (heavy) changes the.', 'Show a parallel example from Surdas or Mirabai where the same Braj forms appear, proving these are literary conventions.', 'Have them rewrite one stanza in pure Khari Boli and compare emotional/rustic effect — they will perceive the loss.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_012', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि **तथ्य याद न रहें** → **कथानक-सारांश (Plot Summary) नोट्स** दोबारा पढ़ें.',
          misconception: '**भ्रांति**: *"आशय-सूचक प्रश्नों के उत्तर में **पाठ की पंक्तियाँ जितनी अधिक उद्धृत (Quote) करेंगे, उतने अधिक अंक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 14\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि **तथ्य याद न रहें** → **कथानक-सारांश (Plot Summary) नोट्स** दोबारा पढ़ें.',
                  misconception: '**भ्रांति**: *"आशय-सूचक प्रश्नों के उत्तर में **पाठ की पंक्तियाँ जितनी अधिक उद्धृत (Quote) करेंगे, उतने अधिक अंक मिलेंगे।"* **वास्तविकता**.' }
          ],
            remediations: { 'quote': { steps: ['**चरण १ — पहचान (Identify)**: छात्र से कहें — *"अपना लिखा उत्तर पढ़ो और बताओ: इसमें **तुम्हारे अपने शब्द (Your Own.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
