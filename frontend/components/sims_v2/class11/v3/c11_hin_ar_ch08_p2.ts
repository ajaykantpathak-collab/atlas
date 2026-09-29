import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch08_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch08_p2',
    title: 'पाठ 8 · Part 2/3',
    subtitle: 'Read a prisoner\'s India — episodic, argumentative, and allergic to uniformity.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 8 · Part 2/3',
    chapters: ['c11_hin_ar_ch08'],
    nodeIds: ['c11_hin_ar_cbse_08_007', 'c11_hin_ar_cbse_08_008', 'c11_hin_ar_cbse_08_009', 'c11_hin_ar_cbse_08_010', 'c11_hin_ar_cbse_08_011', 'c11_hin_ar_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a prisoner composing a nation from memory', intro: 'From a cell, Nehru walks the whole country — and every conversation with a peasant becomes a meditation on what \'India\' even is.', goal: 'Analyse the episodic-reflective structure and the theme of unity built from diversity.' },
    discovery: {
        question: 'Nehru\'s chapter jumps from the Himalaya to a peasant\'s face to a Vedic hymn to a Kanpur factory — is the disorder a structural weakness?',
        options: ['No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity', 'Yes — history must run in dates', 'Yes — prison made him ramble', 'No — but only because it\'s a travelogue'],
        answer: 'No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity',
        hook: 'Written in a 1942-46 prison cell, \'Bharat Mata\' argues that India\'s unity lives in shared labour and suffering — not in cultural sameness.',
    },
    teaching: [
        { title: 'पाठ 8 — गौण विषय', text: '\'फागुन की कहानी\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate the journey\'s episodes from its reflective digressions, then defend whether diversity can ground unity without uniformity.',
        labels: ['पाठ 8 — गौण', 'पाठ 8 — साहित्यिक', 'पाठ 8 — पदावली', 'पाठ 8 — व्याकरण', 'पाठ 8 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_008', title: 'पाठ 8 — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'फागुन की कहानी\' में बिंब ढूँढिए — फागुन-की-कहानी — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define "imagery" (प्रतिबिंब) and "metaphor" (रूपक) in your own words, giving one example of each from everyday language (not from the.', options: [
                { text: 'Imagery is descriptive language that appeals to the senses (e.g., "The air smelled of wet', outcome: 'Imagery is descriptive language that appeals to the senses (e.g., "The air smelled of wet earth and.' },
                { text: 'Time is *like* a thief', outcome: 'Not quite — Students consistently confuse **imagery** with **metaphor** in this chapter because both create.', reveals: 'students-consistently-confuse-imagery-with' },
                { text: 'The sunset was red', outcome: 'Not quite — Students consistently confuse **imagery** with **metaphor** in this chapter because both create.', reveals: 'students-consistently-confuse-imagery-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For Independence Day, a student proposes a poster quoting Nehru\'s \'Bharat Mata\' essay beside a calendar image of the goddess Bharat Mata with a flag. Another teammate says the essay \'has no structure — it just rambles from mountains to peasants to philosophy.\'',
            decisions: [{ prompt: 'What do both get wrong about the text?', options: [
                { text: 'Separate symbol from argument: Nehru, writing in Ahmednagar Fort prison in Discovery of India, deliberately redefines Bharat Mata — not a goddess of land but \'the millions of individuals\', the people themselves. And the structure is the argument: an episodic travelogue where physical journey is the spine, encounters are self-contained units, and reflective digressions build the idea — fragments joined like the diverse-yet-united nation.', outcome: 'The poster gets redesigned — people, not iconography — and the \'rambling\' resolves into a deliberate episodic architecture mirroring India\'s unity-in-diversity.' },
                { text: 'Keep the goddess image — Bharat Mata is Bharat Mata, and the picture makes the poster devotional.', outcome: 'That projects external iconography onto the text: Nehru explicitly rejects goddess imagery for a secular, humanist definition — the people constitute the nation.', reveals: 'bharat-mata-is-goddess' },
                { text: 'Agree it has no structure — it\'s a prison diary, so wandering is natural.', outcome: 'Non-fiction has structure too: the journey spine, episodes, digressions and synthesis form an intellectual arc — the \'plot\' is the idea developing.', reveals: 'essay-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'The journey ends but the argument doesn\'t — the \'Bharat Mata\' Nehru finds is the people themselves, not a goddess on a map.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_007', difficulty: 'standard',
          question: '\'फागुन की कहानी\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो नोड 006 (मुख्य विषय और संदेश) के \'वॉकथ्रू\' और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि गौण विषय = \'पक्ष-कथाएँ\' (sub-plots) या \'छोटी घटनाएँ\'। **गलत तर्क:** वे पाठ में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फागुन की कहानी\' के गौण विषय',
                  options: ['\'फागुन की कहानी\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फागुन की कहानी\' का कथानक', '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो नोड 006 (मुख्य विषय और संदेश) के \'वॉकथ्रू\' और \'कार्य-उदाहरण 1\' को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि गौण विषय = \'पक्ष-कथाएँ\' (sub-plots) या \'छोटी घटनाएँ\'। **गलत तर्क:** वे पाठ में घटित **घटनाओं** को.' }
          ],
            remediations: { 'sub-plots': { steps: ['**भेद स्पष्ट करें:** छात्र से कहें — "पाठ की 5 घटनाएँ लिखो। अब प्रत्येक के आगे लिखो: यह घटना *किस बड़े विचार* की ओर.', '**मैपिंग अभ्यास:** एक तालिका बनाएँ — स्तंभ 1: घटना/संवाद, स्तंभ 2: संभावित गौण विषय, स्तंभ 3: मुख्य विषय से संबंध। 3-4.', '**परीक्षा-उन्मुख अभ्यास:** पिछले वर्ष के 2-3 प्रश्न दें जो गौण विषय पर हों (उदाहरण: "पाठ में \'मौन\' की भूमिका समझाइए").', '**फीडबैक लूप:** उसके उत्तर में लाल पेन से केवल \'मुख्य विषय से लिंक\' चिह्नित करें — जहाँ लिंक गायब हो, वहाँ लिखें: "यहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_008', difficulty: 'standard',
          question: '\'फागुन की कहानी\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'Review "figures of speech" basics from Class 9-10 Hindi grammar (अलंकार) — specifically.',
          misconception: 'Students consistently confuse **imagery** with **metaphor** in this chapter because both create "pictures." They label.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "tenor" (subject) and "vehicle" (image used for comparison) to this metaphor from the text: "Hkkjr ekrk njvly ;gh djksM+ksa yksx gSa".', answer: 'Tenor: "Hkkjr ekrk" (Mother India',
                  options: ['Tenor: "Hkkjr ekrk" (Mother India', 'pictures', 'snowy peaks', 'roaring rivers'],
                  hint: 'Review "figures of speech" basics from Class 9-10 Hindi grammar (अलंकार) — specifically the.',
                  misconception: 'Students consistently confuse **imagery** with **metaphor** in this chapter because both create "pictures." They label *any* vivid.' },
                { id: 'b', prompt: 'Analyze how the *extended metaphor* of "journey" (tylk/सफ़र) operates across the chapter.', answer: 'Stage 1: Physical journey',
                  options: ['Stage 1: Physical journey', 'pictures', 'snowy peaks', 'roaring rivers'],
                  hint: 'Review "figures of speech" basics from Class 9-10 Hindi grammar (अलंकार) — specifically the.',
                  misconception: 'Students consistently confuse **imagery** with **metaphor** in this chapter because both create "pictures." They label *any* vivid.' }
          ],
            remediations: { 'students-consistently-confuse-imagery-with': { steps: ['Give the student two side-by-side sentences from the text — one pure imagery ("dM+s yxku" — thick snow), one pure.', 'Ask: "Which one makes you *feel cold*? Which one makes you *rethink what a nation is*?"', 'Explicitly name the mechanism: "Imagery = sensory trigger. Metaphor = conceptual transfer."', 'Have them re-read the chapter and color-code: yellow for imagery (label the sense), blue for metaphor (label.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse **imagery** with **metaphor** in this chapter because both create "pictures." They label.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the metaphor "fons\'k rjDdh" (foreign rule/colonialism as a "demon/ogre") used implicitly when the author describes "vejhdk.', answer: 'The metaphor *clarifies emotionally but obscures analytically*',
                  options: ['The metaphor *clarifies emotionally but obscures analytically*', 'pictures', 'snowy peaks', 'roaring rivers'],
                  hint: 'Review "figures of speech" basics from Class 9-10 Hindi grammar (अलंकार) — specifically the.',
                  misconception: 'Students consistently confuse **imagery** with **metaphor** in this chapter because both create "pictures." They label *any* vivid.' },
                { id: 'b', prompt: 'Create your own metaphor for "India" (not "Mother India") using a *concrete, everyday object* from an Indian kitchen or street.', answer: 'Example: "India is a *thali*',
                  options: ['Example: "India is a *thali*', 'pictures', 'snowy peaks', 'roaring rivers'],
                  hint: 'Review "figures of speech" basics from Class 9-10 Hindi grammar (अलंकार) — specifically the.',
                  misconception: 'Students consistently confuse **imagery** with **metaphor** in this chapter because both create "pictures." They label *any* vivid.' }
          ],
            remediations: { 'students-consistently-confuse-imagery-with': { steps: ['Give the student two side-by-side sentences from the text — one pure imagery ("dM+s yxku" — thick snow), one pure.', 'Ask: "Which one makes you *feel cold*? Which one makes you *rethink what a nation is*?"', 'Explicitly name the mechanism: "Imagery = sensory trigger. Metaphor = conceptual transfer."', 'Have them re-read the chapter and color-code: yellow for imagery (label the sense), blue for metaphor (label.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_009', difficulty: 'standard',
          question: '\'फागुन की कहानी\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_08_008 (बिंब और रूपक)** के \'कार्यप्रणाली\' भाग.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'विरोधाभास\' (Paradox)** को **\'विरोधाभासी स्थिति\' (Oxymoron)** मान लेते हैं क्योंकि दोनों में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फागुन की कहानी\' में विरोधाभास',
                  options: ['\'फागुन की कहानी\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फागुन की कहानी\' का कथानक', '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_08_008 (बिंब और रूपक)** के \'कार्यप्रणाली\' भाग को दोहराएं.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'विरोधाभास\' (Paradox)** को **\'विरोधाभासी स्थिति\' (Oxymoron)** मान लेते हैं क्योंकि दोनों में \'विरोध\' शब्द आता है.' }
          ],
            remediations: { 'paradox-oxymoron': { steps: ['**दृष्टांत-आधारित भेद स्पष्टीकरण:** छात्र को तीन जोड़े दें: (क) "मधुर कड़वाहट" vs "कड़वाहट में मिठास छिपी है" (ख).', 'कौन-सा पूरा वाक्य/विचार है?" 2.', '**संरचनात्मक आरेख बनवाएं:** बोर्ड पर दो कॉलम बनवाएं — **पद-स्तर (Lexical)** और **वाक्य/स्थिति-स्तर.', '**पाठ-खोज अभ्यास:** पाठ से एक-एक उदाहरण ढूंढने को कहें — "ऑक्सीमोरॉन ढूंढो" फिर "पैराडॉक्स ढूंढो" — न मिलने पर चर्चा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_010', difficulty: 'standard',
          question: '\'फागुन की कहानी\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **\'शब्द-शक्ति निरूपण\' (हिंदी व्याकरण/साहित्य सिद्धांत, Class 10-11 NCERT)**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य शब्द\' = \'कठिन/बड़े/तत्सम शब्द\'** होते हैं। वे सरल/तद्भव/देशज शब्दों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फागुन की कहानी\' की पदावली',
                  options: ['\'फागुन की कहानी\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फागुन की कहानी\' का कथानक', '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **\'शब्द-शक्ति निरूपण\' (हिंदी व्याकरण/साहित्य सिद्धांत, Class 10-11 NCERT)** के उस.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य शब्द\' = \'कठिन/बड़े/तत्सम शब्द\'** होते हैं। वे सरल/तद्भव/देशज शब्दों (जैसे: \'बात\', \'काम\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पाठ से 10 \'सरल शब्द\' छाँटें** (जैसे: आना, जाना, देखना, मन, बात, रास्ता, समय, हाथ, आँख, नींद) — इन्हें \'मुख्य शब्द\'.', '**प्रत्येक शब्द के लिए 3 कॉलम बनाएं:** (क) शब्दकोशीय अर्थ, (ख) पाठ में प्रयुक्त वाक्य/प्रसंग, (ग) प्रासंगिक अर्थ.', '**शिक्षक/सहपाठी के साथ \'क्यों?\' खेलें:** "लेखक ने यहाँ \'देखा\' क्यों लिखा, \'निहारा\' या \'ताका\' क्यों नहीं?" — इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_011', difficulty: 'standard',
          question: '\'फागुन की कहानी\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'If stuck, review **\'पदावली: मुख्य शब्द\' (Node 010)** and practice the **\'Substitution.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'भाषा-प्रयोग\' का विश्लेषण करने का अर्थ है **अलंकार (Alankar) पहचानना** (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फागुन की कहानी\' में भाषा-प्रयोग',
                  options: ['\'फागुन की कहानी\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फागुन की कहानी\' का कथानक', '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **\'पदावली: मुख्य शब्द\' (Node 010)** and practice the **\'Substitution Test\'**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'भाषा-प्रयोग\' का विश्लेषण करने का अर्थ है **अलंकार (Alankar) पहचानना** (जैसे: यहाँ अनुप्रास है.' }
          ],
            remediations: { 'alankar': { steps: ['**चरण 1 - अलंकार सूची बंद करें:** छात्र से कहें: "अलंकार का नाम मत लिखो। केवल यह बताओ कि **यह शब्द/वाक्य पात्र के बारे.', '**चरण 2 - \'प्रतिस्थापन परीक्षण\' (Substitution Test) करवाएँ:** उस वाक्यांश को साधारण भाषा में बदलवाएँ (जैसे: "मुझे जवानी.', '**चरण 3 - संदर्भ जोड़ें:** पूछें: "यह पात्र ग्रामीण है/स्त्री है/शोषित है — क्या इस पृष्ठभूमि में \'आग\' शब्द का कोई.', '**चरण 4 - PEEL पैराग्राफ लिखवाएँ:** Point (भाषा चुनाव), Evidence (उद्धरण), Explanation (कार्य), Link (विषय/पात्र से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_012', difficulty: 'standard',
          question: '\'फागुन की कहानी\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँसें तो **पाठ 8 का कथानक-सार (नोड 002) और मुख्य विषय (नोड 006)** दोबारा पढ़ें.',
          misconception: 'छात्र समझते हैं कि **\'क्या\' से शुरू हर प्रश्न वस्तुनिष्ठ** होता है और **\'क्यों\' से शुरू हर प्रश्न आशय-सूचक** — जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फागुन की कहानी\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'फागुन की कहानी\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फागुन की कहानी\' का कथानक', '\'फागुन की कहानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **पाठ 8 का कथानक-सार (नोड 002) और मुख्य विषय (नोड 006)** दोबारा पढ़ें — आशय-सूचक के.',
                  misconception: 'छात्र समझते हैं कि **\'क्या\' से शुरू हर प्रश्न वस्तुनिष्ठ** होता है और **\'क्यों\' से शुरू हर प्रश्न आशय-सूचक** — जबकि वास्तविक भेद **उत्तर की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान अभ्यास:** पाठ 8 के 5-5 वस्तुनिष्ठ/आशय-सूचक प्रश्नों की सूची बनाओ; प्रत्येक के आगे **\'पाठ में स्पष्ट है\' / \'पाठ.', '**कीवर्ड से आगे बढ़ो:** 3 प्रश्न लो जिनमें \'क्या/कौन/कब\' हो लेकिन उत्तर **पाठ में न हो** (निष्कर्ष चाहिए) — उन्हें.', '**साक्ष्य-मानचित्रण:** एक आशय-सूचक प्रश्न लो; पाठ के **कम-से-कम 3 अलग-अलग वाक्यों/विवरणों** को तीर से जोड़कर दिखाओ कि.', '**PEEL पुनर्लेखन:** अपने पुराने आशय-सूचक उत्तरों को PEEL में दोबारा लिखो; जांचो कि **Evidence एक से अधिक वाक्यों से**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
