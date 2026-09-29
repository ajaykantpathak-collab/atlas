import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch09_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch09_p2',
    title: 'पाठ 9 · Part 2/3',
    subtitle: 'Hear a 15th-century weaver dismantle both temple and mosque in one couplet.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 9 · Part 2/3',
    chapters: ['c11_hin_ar_ch09'],
    nodeIds: ['c11_hin_ar_cbse_09_007', 'c11_hin_ar_cbse_09_008', 'c11_hin_ar_cbse_09_009', 'c11_hin_ar_cbse_09_010', 'c11_hin_ar_cbse_09_011', 'c11_hin_ar_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a disciple watching the loom instead of the scripture', intro: 'A Muslim-weaver saint in Kashi, persecuted by priests of both religions — and his whole theology woven into cloth metaphors.', goal: 'Situate Kabir in the Nirguna Bhakti tradition and read his weaver identity as the engine of his imagery.' },
    discovery: {
        question: 'A student writes \'Kabir rejected all religion.\' Accurate?',
        options: ['No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality', 'Yes — he mocked both temple and mosque, so he rejected both faiths', 'Yes — a weaver couldn\'t be religious', 'No — he actually founded a new organised religion'],
        answer: 'No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality',
        hook: '\'Kabir was a weaver\' is not trivia — every metaphor in his verse is a loom: warp, weft, thread, dye, knot. His caste is his poetics.',
    },
    teaching: [
        { title: 'पाठ 9 — गौण विषय', text: '\'आरोह भाग-1 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch Kabir teach disciples by silently weaving an odd pattern, then map why the lesson lands through action instead of explanation.',
        labels: ['पाठ 9 — गौण', 'पाठ 9 — साहित्यिक', 'पाठ 9 — पदावली', 'पाठ 9 — व्याकरण', 'पाठ 9 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_008', title: 'पाठ 9 — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 9\' में बिंब ढूँढिए — आरोह-भाग-1-—-पाठ-9 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define \'imagery\' (बिम्ब) and \'metaphor\' (रूपक) in your own words, giving one original example for each (not from the textbook).', options: [
                { text: 'Imagery: Language appealing to senses (e.g., "The sizzling jalebi dripped golden syrup"', outcome: 'Imagery: Language appealing to senses (e.g., "The sizzling jalebi dripped golden syrup".' },
                { text: 'Imagery is just description', outcome: 'Not quite — Students consistently confuse *metaphor* (रूपक) with *simile* (उपमा) in Hindi poetry because both.', reveals: 'students-consistently-confuse-metaphor-with' },
                { text: 'Metaphor uses \'like\'', outcome: 'Not quite — Students consistently confuse *metaphor* (रूपक) with *simile* (उपमा) in Hindi poetry because both.', reveals: 'students-consistently-confuse-metaphor-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_010', title: 'पाठ 9 — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 9\' के मुख्य शब्द: आरोह-भाग-1-—-पाठ-9 — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'Define "denotation" and "connotation" in your own words, then give one example from everyday Hindi usage where a word\'s connotation.', options: [
                { text: 'Denotation is the literal, dictionary definition of a word', outcome: 'Denotation is the literal, dictionary definition of a word — its neutral, context-free meaning.' },
                { text: 'another meaning of the word', outcome: 'Not quite — Students treat vocabulary analysis as *dictionary work* — they identify a "difficult" word, look.', reveals: 'students-treat-vocabulary-analysis-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is designing a Kabir exhibit. A teammate\'s panel reads: \'Kabir: 15th-century weaver from Kashi. Born c.1398, died 1518.\' He argues the weaver detail is just a biographical fact — \'the poetry is about God, not looms.\'',
            decisions: [{ prompt: 'Why is the weaver identity the key, not trivia?', options: [
                { text: 'Show the generative matrix: nearly every metaphor in Kabir — warp and weft, thread, dye, knot, unravelling — comes from the loom; \'untying the knot\' (granthi) is weaver\'s knowledge turned theology. Add the rest of the context: a low-caste julaha in Sadhukkadi speech challenging Brahmin and Qazi orthodoxy alike — the poetry\'s radicalism is inseparable from who spoke and in whose language.', outcome: 'The panel is rewritten: context stops being a fact-file and becomes the engine — weaving isn\'t Kabir\'s day job, it\'s his entire metaphor bank.' },
                { text: 'Keep the panel — dates and profession are background; the spiritual message stands alone.', outcome: 'Stripping the weaver identity leaves the images unexplained: the loom metaphors become decoration instead of embodied argument.', reveals: 'weaver-is-trivia' },
                { text: 'Reframe him as a social reformer first — the caste angle matters, the spiritual content is secondary.', outcome: 'That inverts without understanding: Kabir\'s social challenge works THROUGH spiritual metaphor — the poetry fuses the two, so splitting them flattens both.', reveals: 'kabir-is-only-reformer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'Neither Brahmin nor Qazi could claim him — the weaver\'s loom measured orthodoxy and found it hollow.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_007', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_09_006 (मुख्य विषय और संदेश)** और **c11_hin_ar_cbse_09_005.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = मुख्य विषय का उदाहरण/दृष्टांत/उपकथानक"। **गलत तर्क:** वे सोचते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'आरोह भाग-1 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_09_006 (मुख्य विषय और संदेश)** और **c11_hin_ar_cbse_09_005 (सहायक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = मुख्य विषय का उदाहरण/दृष्टांत/उपकथानक"। **गलत तर्क:** वे सोचते हैं — "मुख्य विषय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पृथक्करण अभ्यास:** छात्र से कहें — "पाठ के 10 प्रमुख प्रसंग लिखें। प्रत्येक के आगे लिखें: यह किस पात्र का प्रसंग है?', 'मुख्य नायक से संबंध है या नहीं?" 2.', '**थीम-लेबलिंग:** अब प्रत्येक प्रसंग को एक **अमूर्त संज्ञा-वाक्यांश** दें (जैसे: \'आर्थिक शोषण\', \'स्त्री-शिक्षा\'.', '**स्वतंत्रता परीक्षण:** पूछें — "यदि मुख्य नायक इस प्रसंग से हटा दिया जाए, तो क्या प्रसंग अपना अर्थ रखेगा?" जिनका उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_008', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, re-read the \'Before You Read\' section (node c11_hin_ar_cbse_09_001) focusing.',
          misconception: 'Students consistently confuse *metaphor* (रूपक) with *simile* (उपमा) in Hindi poetry because both compare.',
          parts: [
                { id: 'a', prompt: 'In the poem, the line "tSls ck<+h dk"V gh dkVS vfxfu u dkVS dksbZ" appears. Explain why this is a metaphor and not a simile. What two things are being compared?', answer: 'It is a metaphor',
                  options: ['It is a metaphor', 'gh dkVS'],
                  hint: 'If stuck, re-read the \'Before You Read\' section (node c11_hin_ar_cbse_09_001) focusing on Dabir\'s.',
                  misconception: 'Students consistently confuse *metaphor* (रूपक) with *simile* (उपमा) in Hindi poetry because both compare.' },
                { id: 'b', prompt: 'Compare the metaphor "ck<+h dk"V gh dkVS" with the implied metaphor in "ek;k nsf[k osQ txr yqHkkauka".', answer: 'First metaphor: Vehicle = \'sword\' (external, violent, threatening)',
                  options: ['First metaphor: Vehicle = \'sword\' (external, violent, threatening)', 'painful images'],
                  hint: 'If stuck, re-read the \'Before You Read\' section (node c11_hin_ar_cbse_09_001) focusing on Dabir\'s.',
                  misconception: 'Students consistently confuse *metaphor* (रूपक) with *simile* (उपमा) in Hindi poetry because both compare.' }
          ],
            remediations: { 'students-consistently-confuse-metaphor-with': { steps: ['Give the student two columns: Column A — lines with \'like/as\' (simile); Column B — lines where A *is* B (metaphor).', 'Include Dabir\'s "tSls ck<+h dk"V gh dkVS" in Column B.', 'Ask: "Where is the verb \'is\' (घ/है)?" 2.', 'Play an audio clip of a monsoon soundscape; ask them to list *only* non-visual sensations.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse *metaphor* (रूपक) with *simile* (उपमा) in Hindi poetry because both compare.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Dabir uses imagery only to decorate the poem; the metaphors are the real philosophical content." Defend or refute using evidence from.', answer: 'Refute',
                  options: ['Refute', 'figures of speech'],
                  hint: 'If stuck, re-read the \'Before You Read\' section (node c11_hin_ar_cbse_09_001) focusing on Dabir\'s.',
                  misconception: 'Students consistently confuse *metaphor* (रूपक) with *simile* (उपमा) in Hindi poetry because both compare.' }
          ],
            remediations: { 'students-consistently-confuse-metaphor-with': { steps: ['Give the student two columns: Column A — lines with \'like/as\' (simile); Column B — lines where A *is* B (metaphor).', 'Include Dabir\'s "tSls ck<+h dk"V gh dkVS" in Column B.', 'Ask: "Where is the verb \'is\' (घ/है)?" 2.', 'Play an audio clip of a monsoon soundscape; ask them to list *only* non-visual sensations.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_009', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके: **c11_hin_ar_cbse_09_008** के \'रूपक विश्लेषण चरण\' (Tenor-Vehicle-Ground) को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'विरोधाभास\' (Paradox)** को **\'विरोधाभासी अलंकार\' (Oxymoron)** समझ बैठते हैं और दोनों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 9\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 9\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके: **c11_hin_ar_cbse_09_008** के \'रूपक विश्लेषण चरण\' (Tenor-Vehicle-Ground) को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'विरोधाभास\' (Paradox)** को **\'विरोधाभासी अलंकार\' (Oxymoron)** समझ बैठते हैं और दोनों को समान मानते हैं। **गलत.' }
          ],
            remediations: { 'paradox-oxymoron-oxymoron-paradox-1': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**भेद स्पष्ट करो:** बोर्ड पर दो कॉलम बनाओ — **Oxymoron (यमक/विरोधाभासी अलंकार)**: दो विपरीत पदों का संयोग, तात्कालिक.', '**माइक्रो-व्यायाम:** 5 वाक्य दो — छात्र से प्रत्येक को Oxymoron/Paradox/दोनों/कोई नहीं में वर्गीकृत कराओ और **कारण.', '**पाठ-आधारित अनुप्रयोग:** वर्तमान पाठ (अरोह पाठ 9) से एक विरोधाभास और एक ऑक्सीमोरॉन ढूँढ़वाओ — यदि ऑक्सीमोरॉन न मिले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_010', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If the student cannot identify connotations beyond denotation, return to node 001 (Before.',
          misconception: 'Students treat vocabulary analysis as *dictionary work* — they identify a "difficult" word, look up its meaning, write.',
          parts: [
                { id: 'a', prompt: 'Define "denotation" and "connotation" in your own words, then give one example from everyday Hindi usage where a word\'s connotation significantly differs from.', answer: 'Denotation is the literal, dictionary definition of a word',
                  options: ['Denotation is the literal, dictionary definition of a word', 'another meaning of the word'],
                  hint: 'If the student cannot identify connotations beyond denotation, return to node 001 (Before You Read).',
                  misconception: 'Students treat vocabulary analysis as *dictionary work* — they identify a "difficult" word, look up its meaning, write the definition, and.' }
          ],
            remediations: { 'students-treat-vocabulary-analysis-as': { steps: ['Select a key passage from the chapter (3-4 sentences). Have the student list every word they consider "significant".', 'For each significant word, create a three-column table: Column A = denotation (dictionary meaning), Column.', 'Ask the student to circle all words in the passage that belong to the same semantic field (e.g., all words related.', 'Have the student rewrite the passage replacing three key words with synonyms.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_011', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'Review the *kCn&Nfo* box at the end of the NCERT poem text and the basic Hindi grammar.',
          misconception: 'Students treat Braj Bhasha as merely "old Hindi" and mechanically replace every unपरिचित ending with a modern Hindi one.',
          parts: [
                { id: 'a', prompt: 'Rewrite the Braj phrase **\'lc ?kfV varfj rw¡gh O;kid /jS l:iS lksbZAA\'** in modern standard Hindi, correctly mapping each case marker (*karak chinha*) and the.', answer: '**Step-by-step mapping:** 1',
                  options: ['**Step-by-step mapping:** 1', 'लेकिन क्षण भर किसी के हाथ में स्थिर नहीं रहती।'],
                  hint: 'Review the *kCn&Nfo* box at the end of the NCERT poem text and the basic Hindi grammar chapter.',
                  misconception: 'Students treat Braj Bhasha as merely "old Hindi" and mechanically replace every unपरिचित ending with a modern Hindi one (e.g., reading.' }
          ],
            remediations: { 'students-treat-braj-bhasha-as': { steps: ['**Build a 5-row comparison table** with columns: *Braj Form | Gloss | Modern Hindi | Grammatical Category | Function.', 'Fill it together for *tkauka, dgSa, rw¡gh, gh, vfxfu*.', '**Guided translation:** Have the student translate stanza 1 line-by-line, labeling every verb, case marker, and.', '**Mini-lecture (2 min):** Explain that *-auka* = *-tā hai* (habitual), *rw¡gh* = *kā*, zero copula = proverbial force.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_012', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'Review Node 011 (भाषा-प्रयोग) focusing on how adjectives, metaphors, and verb forms.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" (personal opinion) देना है** — जैसे "मुझे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 9\' का कथानक — \'आरोह भाग-1 — पाठ 9\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'Review Node 011 (भाषा-प्रयोग) focusing on how adjectives, metaphors, and verb forms create tone.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" (personal opinion) देना है** — जैसे "मुझे लगता है लेखक दुखी था".' }
          ],
            remediations: { 'personal-opinion-wrong-reasoning-intent': { steps: ['**लक्षित उपचार (Targeted Remediation — 4 चरण):** 1.', '**भेद स्पष्ट करें:** छात्र को दो वाक्य दें — *"आकाश नीला है"* (तथ्य) और *"आकाश उदास लगता है"* (आशय/प्रक्षेपण)। पूछें.', '**साक्ष्य-आधारित अभ्यास:** पाठ 9 के 5 वाक्य दें; छात्र को प्रत्येक को **F (Fact)** या **I (Inference)** लेबल करना.', '**PEEL टेम्पलेट दें:** रफ कॉपी पर P-E-E-L कॉलम बनवाएँ; हर आशय-सूचक उत्तर पहले इसमें भरें, फिर फेयर करें। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
