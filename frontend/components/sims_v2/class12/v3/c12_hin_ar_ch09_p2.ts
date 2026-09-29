import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch09_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch09_p2',
    title: 'छोटा मेरा खेत, बगुलों के पंख · Part 2/3',
    subtitle: 'She mapped a homeland that no longer existed',
    classLevel: 12, subject: 'hin_ar', topic: 'छोटा मेरा खेत, बगुलों के पंख · Part 2/3',
    chapters: ['c12_hin_ar_ch09'],
    nodeIds: ['c12_hin_ar_cbse_09_007', 'c12_hin_ar_cbse_09_008', 'c12_hin_ar_cbse_09_009', 'c12_hin_ar_cbse_09_010', 'c12_hin_ar_cbse_09_011', 'c12_hin_ar_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Partition-poetry reader', intro: 'A woman who crossed a new border learned that memory needs maps — and paintings — to survive.', goal: 'Read Mekhala Thakur\'s Nakshe and Chitrakala through Partition displacement and modernist free verse.' },
    discovery: {
        question: 'A poet born in Lyallpur loses her homeland in 1947 — then writes two poems titled \'Map\' and \'Painting of Birds.\' What are the titles already saying?',
        options: ['Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure', 'She liked geography and art', 'Birds migrate like refugees — that\'s all', 'Titles are random'],
        answer: 'Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure',
        hook: 'Partition\'s shadow runs through her — she translated Hamsun\'s \'Hunger,\' and the refugee\'s starvation is spiritual: a hunger for the lost home. Free verse and everyday speech were her modernist break — \'new direction\' means new freedom to say loss plainly.',
    },
    teaching: [
        { title: 'छोटा मेरा खेत, बगुलों के पंख — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'आरोह भाग-2 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a refugee\'s double elegy: decode the titles as preservation strategies, weigh memory-mapping against image-freezing, and feel how plain speech carries unhealable loss.',
        labels: ['छोटा मेरा खेत, बगुलों'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_007', title: 'छोटा मेरा खेत, बगुलों के पंख — साहित्यिक युक्तियाँ: प्रतीक और बिंब',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 9\' में पाठ-9 जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'Define "secondary theme" in the context of a poem and give one example from either "Naksara" or "Chidiyaon Ke Aage" without quoting lines.', options: [
                { text: 'A secondary theme is a recurring idea that supports and complicates the primary theme,', outcome: 'A secondary theme is a recurring idea that supports and complicates the primary theme, often.' },
                { text: 'the poem is about a map', outcome: 'Not quite — Students treat "secondary theme" as "minor theme" and write one sentence per theme (e.g., "Another.', reveals: 'students-treat-secondary-theme-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_008', title: 'छोटा मेरा खेत, बगुलों के पंख — मुख्य भाव और संदेश',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 9\' में बिंब ढूँढिए — पाठ-9 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define "imagery" (चित्रण) and "metaphor" (रूपक) in your own words, and give one original example of each in Hindi (not from the textbook).', options: [
                { text: 'Imagery: इंद्रियों को संबोधित करने वाला जीवंत भाषा-प्रयोग जो मानसिक चित्र बनाता है', outcome: 'Imagery: इंद्रियों को संबोधित करने वाला जीवंत भाषा-प्रयोग जो मानसिक चित्र बनाता है (उदाहरण: "धुएँ.' },
                { text: 'धुएँ की लकीरें शाम को चादर की तरह फैली थीं', outcome: 'Not quite — Students believe "finding the metaphor" means quoting the line and naming the two things compared.', reveals: 'finding-the-metaphor-means-quoting' },
                { text: 'समय एक नदी है जो कभी लौटती नहीं', outcome: 'Not quite — Students believe "finding the metaphor" means quoting the line and naming the two things compared.', reveals: 'finding-the-metaphor-means-quoting' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_009', title: 'छोटा मेरा खेत, बगुलों के पंख — गौण भाव और विषयांतर',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 9\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example from daily life for each (not from the poems).', options: [
                { text: 'Irony occurs when the outcome is opposite to what was expected (e.g., a fire station', outcome: 'Irony occurs when the outcome is opposite to what was expected (e.g., a fire station burning down).' },
                { text: 'any vivid description is a symbol', outcome: 'Not quite — Students often confuse *symbolism* with *imagery*: they think any vivid description is a symbol.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A hackathon teammate wants to demo straight from the whiteboard sketch — \'the blueprint IS the product, let\'s just present the plan.\' You think the sketch needs to become something people can actually walk into.',
            decisions: [{ prompt: 'How does Jayashankar Prasad\'s \'नक्शे मेरे घर\' frame this?', options: [
                { text: 'The map is the draft, not the house — the poem moves from courtyard corner to bricks laid with imagination to walls that finally bear weight; a blueprint only proves itself when someone can live inside what it drew.', outcome: 'The poem\'s extended metaphor makes each stanza a construction stage — sketching is a real stage, but the poem\'s whole point is that plans must materialise into habitable form.' },
                { text: 'He\'s right — a clear plan is the creative act; execution is just mechanical labour.', outcome: 'The poem gives the labour stanzas of their own — the chains of imagination, the weight-bearing — treating construction as where creation happens, not as clerical follow-up to it.', reveals: 'plan-is-the-product' },
                { text: 'Skip the blueprint stage entirely — real builders improvise.', outcome: 'The poem honours the map as a provisional, evolving draft — the error is worshipping it, not drawing it; deleting the plan loses the poem\'s first structural move.', reveals: 'drafts-are-disposable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Partition poetry as cartography of a vanished home — every title a survival plan for memory.',
            decisions: [{ prompt: 'What comes next? छोटा मेरा खेत, बगुलों के पंख · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — छोटा मेरा खेत, बगुलों के पंख · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_007', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, revisit node 006\'s worked examples on primary theme identification — the.',
          misconception: 'Students treat "secondary theme" as "minor theme" and write one sentence per theme (e.g., "Another theme is freedom").',
          parts: [
                { id: 'a', prompt: 'In "Chidiyaon Ke Aage", the birds\' flight is contrasted with the poet\'s grounded state.', answer: '(1) Identify the two poles: birds\' effortless, instinctive flight vs',
                  options: ['(1) Identify the two poles: birds\' effortless, instinctive flight vs', 'birds fly, poet sits'],
                  hint: 'If stuck, revisit node 006\'s worked examples on primary theme identification — the "thematic.',
                  misconception: 'Students treat "secondary theme" as "minor theme" and write one sentence per theme (e.g., "Another theme is freedom").' },
                { id: 'b', prompt: 'Analyze how the secondary theme of "alienation in modernity" operates differently in the two poems.', answer: 'In "Naksara", alienation is *epistemological*: the map (rational order) fails to',
                  options: ['In "Naksara", alienation is *epistemological*: the map (rational order) fails to', 'both show the poet is lonely'],
                  hint: 'If stuck, revisit node 006\'s worked examples on primary theme identification — the "thematic.',
                  misconception: 'Students treat "secondary theme" as "minor theme" and write one sentence per theme (e.g., "Another theme is freedom").' }
          ],
            remediations: { 'students-treat-secondary-theme-as': { steps: ['If a student cannot distinguish primary/secondary themes or trace them textually: (1) Have them re-read node 006.', '(2) Give them a 2-column table: Column A = Primary Theme Key Terms; Column B = Images/Lines that *don\'t fit* those.', '(3) Ask them to cluster Column B entries into 3 groups — each cluster is a candidate secondary theme.', '(4) Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "secondary theme" as "minor theme" and write one sentence per theme (e.g., "Another theme is freedom").',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The secondary theme of \'art as redemption\' resolves the tension of alienation in Muktibodh\'s poems." Defend or challenge using evidence.', answer: 'Challenge',
                  options: ['Challenge', 'yes, poetry saves him'],
                  hint: 'If stuck, revisit node 006\'s worked examples on primary theme identification — the "thematic.',
                  misconception: 'Students treat "secondary theme" as "minor theme" and write one sentence per theme (e.g., "Another theme is freedom").' }
          ],
            remediations: { 'students-treat-secondary-theme-as': { steps: ['If a student cannot distinguish primary/secondary themes or trace them textually: (1) Have them re-read node 006.', '(2) Give them a 2-column table: Column A = Primary Theme Key Terms; Column B = Images/Lines that *don\'t fit* those.', '(3) Ask them to cluster Column B entries into 3 groups — each cluster is a candidate secondary theme.', '(4) Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_008', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck on feature-transfer, review "Metaphor as Mapping" in c11_hin_ar_cbse_09_008.',
          misconception: 'Students believe "finding the metaphor" means quoting the line and naming the two things compared (e.g., "map = life").',
          parts: [
                { id: 'a', prompt: 'In "नक्शा एक सड़क", the poet calls the map "एक प्यासे रास्ते की तरह" (like a thirsty road). Is this a metaphor or a simile?', answer: 'It is a **simile** (उपमा)',
                  options: ['It is a **simile** (उपमा)', 'distinction doesn\'t matter', 'finding the metaphor', 'map = life'],
                  hint: 'If stuck on feature-transfer, review "Metaphor as Mapping" in c11_hin_ar_cbse_09_008 — practice.',
                  misconception: 'Students believe "finding the metaphor" means quoting the line and naming the two things compared (e.g., "map = life").' }
          ],
            remediations: { 'finding-the-metaphor-means-quoting': { steps: ['Take the metaphor "समय नदी है" (time is a river).', 'List 5 features of a river (flows, irreversible, carries debris, has banks, merges into sea).', 'For each, decide: transfers to time?', '(Yes: flows, irreversible, merges into eternity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_009', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'Review the "Metaphor vs. Symbol" comparison table in node c12_hin_ar_cbse_09_008 and.',
          misconception: 'Students often confuse *symbolism* with *imagery*: they think any vivid description is a symbol.',
          parts: [
                { id: 'a', prompt: 'In "NksVk esjk [ksr", the poet writes "dkx\\"k dk ,d iUuk] dksbZ vaèkM+ dgha ls vk;k {k.k dk cht ogk¡ cks;k x;k".', answer: 'A nest symbolizes safety and nurture',
                  options: ['A nest symbolizes safety and nurture', 'any vivid description is a symbol'],
                  hint: 'Review the "Metaphor vs. Symbol" comparison table in node c12_hin_ar_cbse_09_008 and re-do its.',
                  misconception: 'Students often confuse *symbolism* with *imagery*: they think any vivid description is a symbol.' },
                { id: 'b', prompt: 'Identify one symbol in "cxqyksa d ia[k" and explain how it operates on two levels: literal and symbolic.', answer: 'The "old trees" (dtjkjs cknyksa) are literally aged vegetation',
                  options: ['The "old trees" (dtjkjs cknyksa) are literally aged vegetation', 'they are just trees', 'any vivid description is a symbol'],
                  hint: 'Review the "Metaphor vs. Symbol" comparison table in node c12_hin_ar_cbse_09_008 and re-do its.',
                  misconception: 'Students often confuse *symbolism* with *imagery*: they think any vivid description is a symbol.' },
                { id: 'c', prompt: 'Compare the use of irony in both poems. How does the poet\'s tone shift from nostalgia to irony in each?', answer: 'In "NksVk esjk [ksr", nostalgia for the childhood home is undercut by the ironic',
                  options: ['In "NksVk esjk [ksr", nostalgia for the childhood home is undercut by the ironic', 'any vivid description is a symbol'],
                  hint: 'Review the "Metaphor vs. Symbol" comparison table in node c12_hin_ar_cbse_09_008 and re-do its.',
                  misconception: 'Students often confuse *symbolism* with *imagery*: they think any vivid description is a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Revisit node c12_hin_ar_cbse_09_008 (Imagery and Metaphor) to clarify the difference between an image and a symbol.', 'Image" T-chart: list five concrete nouns from the poems in column A; in column B write the abstract idea they *might*.', 'For irony, practice the "Expectation vs.', 'Reality" frame on three everyday situations before returning to the poems.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_010', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो — **c11_hin_a_cbse_13_010** (जाग तुझको दूर जाना — पदावली) दोहराएँ: वहाँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पदावली" का अर्थ है — **कठिन शब्दों के समानार्थी (synonyms) रट लेना**। वे "तलछट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 9\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'आरोह भाग-2 — पाठ 9\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो — **c11_hin_a_cbse_13_010** (जाग तुझको दूर जाना — पदावली) दोहराएँ: वहाँ मुहावरों की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पदावली" का अर्थ है — **कठिन शब्दों के समानार्थी (synonyms) रट लेना**। वे "तलछट = मैल", "बगुला.' }
          ],
            remediations: { 'synonyms': { steps: ['**चरण 1:** छात्र से कहें — "कविता की वह पंक्ति पढ़ो जहाँ यह शब्द आया है। आँख बंद करो और उस पंक्ति का **चलचित्र**.', '\'तल\' और \'छट\' अलग-अलग क्या कहते हैं?" **चरण 3:** शब्द-योग (etymology) समझाएँ: तल + छट (छटना/छँटना) = जो नीचे छँटकर बैठ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_011', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'यदि छात्र \'विशेषण\', \'कारक\', \'कृदंत\', \'नाम-वाक्य\' जैसे पद न पहचान पाए → कक्षा 9-10 हिंदी.',
          misconception: '**सबसे घातक भ्रांति:** "पद्य में व्याकरण के नियम ढीले होते हैं / कवि गलती करता है / यह अशुद्ध हिंदी है।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 9\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।',
                  options: ['\'आरोह भाग-2 — पाठ 9\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र \'विशेषण\', \'कारक\', \'कृदंत\', \'नाम-वाक्य\' जैसे पद न पहचान पाए → कक्षा 9-10 हिंदी व्याकरण.',
                  misconception: '**सबसे घातक भ्रांति:** "पद्य में व्याकरण के नियम ढीले होते हैं / कवि गलती करता है / यह अशुद्ध हिंदी है।" **वास्तविकता:** केदारनाथ सिंह जैसे.' }
          ],
            remediations: { 'deliberately-stylistic-deviation': { steps: ['**चरण 1:** छात्र को कविता की दो पंक्तियाँ (\'छोटा मेरा खेत / बगुलों के पंख\') जोर से पढ़वाओ — लय पर ध्यान दिलाओ। 2.', '**चरण 2:** उससे पूछो: "अगर मैं कहूँ \'मेरा खेत छोटा है\' तो क्या फर्क पड़ता है?" — उसके उत्तर में छिपी अंतर्दृष्टि.', '**चरण 3:** \'बगुलों के पंख\' पर वापस लाओ: "क्या खेत सचमुच बगुलों का है?" — नहीं → "तो \'के\' यहाँ क्या कर रहा है?" →.', '**चरण 4:** उसे एक साधारण वाक्य दो: \'फूल सुंदर है\' → कहो: "इसे काव्यात्मक बनाओ बिना शब्द बदले, केवल क्रम/संरचना बदलकर" →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_012', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो **c12_hin_ar_cbse_09_002 (पद्यांश-वार भावार्थ)** और **c12_hin_ar_cbse_09_006.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि **आशय-सूचक प्रश्न का उत्तर = पंक्ति का भावार्थ लिख देना**। वे प्रसंग नहीं लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'आरोह भाग-2 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **c12_hin_ar_cbse_09_002 (पद्यांश-वार भावार्थ)** और **c12_hin_ar_cbse_09_006 (साहित्यिक.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि **आशय-सूचक प्रश्न का उत्तर = पंक्ति का भावार्थ लिख देना**। वे प्रसंग नहीं लिखते, शैलीगत विशेषताएँ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — निदान**: छात्र से कहो: "पिछले वर्ष के बोर्ड पेपर का कोई एक आशय-सूचक प्रश्न उठाओ और **घड़ी लगाकर 5 मिनट में.', '**चरण 2 — पुनराभ्यास**: **c12_hin_ar_cbse_09_002** (पद्यांश-वार भावार्थ) और **c12_hin_ar_cbse_09_006/007** (साहित्यिक.', '**चरण 3 — वस्तुनिष्ठ अभ्यास**: **c11_hin_ar_cbse_09_012** (कक्षा 11 के बोध-प्रश्न) से 10 MCQ हल करो, प्रत्येक में.', '**चरण 4 — पुनः निदान**: एक नया पद्यांश (इसी कविता का अपरिचित अंश) देकर वही प्रक्रिया दोहराओ; इस बार **3/3 अंक** लक्ष्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
