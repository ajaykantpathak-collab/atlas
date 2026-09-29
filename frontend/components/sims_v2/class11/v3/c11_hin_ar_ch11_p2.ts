import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch11_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch11_p2',
    title: 'पाठ 11 · Part 2/3',
    subtitle: 'Walk through a remembered home that slowly relocates inside the speaker.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 11 · Part 2/3',
    chapters: ['c11_hin_ar_ch11'],
    nodeIds: ['c11_hin_ar_cbse_11_007', 'c11_hin_ar_cbse_11_008', 'c11_hin_ar_cbse_11_009', 'c11_hin_ar_cbse_11_010', 'c11_hin_ar_cbse_11_011', 'c11_hin_ar_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emigrant reconstructing a childhood home from memory', intro: 'A poet of the masses looks back at a mud-walled house — and finds the building was never the point.', goal: 'Analyse the poem\'s refrain-anchored structure and its movement from place to person to identity.' },
    discovery: {
        question: 'Bachchan\'s \'घर की याद\' keeps returning to the same refrain — is the repetition just decoration?',
        options: ['No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker', 'Yes — it\'s a leftover from oral tradition', 'Yes — poets repeat lines to fill stanzas', 'No — the refrain changes meaning each time, so it\'s three different lines'],
        answer: 'No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker',
        hook: 'The poem moves house → people → self: first walls and courtyards, then a father\'s voice and a mother\'s cooking, then the realization the home now lives inside the speaker.',
    },
    teaching: [
        { title: 'पाठ 11 — गौण विषय', text: '\'आरोह भाग-1 — पाठ 11\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split the poem into its three phases — physical house, human presence, internal landscape — and test what the circular ending gains.',
        labels: ['पाठ 11 — गौण', 'पाठ 11 — साहित्यिक', 'पाठ 11 — पदावली', 'पाठ 11 — व्याकरण', 'पाठ 11 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_008', title: 'पाठ 11 — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 11\' में बिंब ढूँढिए — आरोह-भाग-1-—-पाठ-11 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'What is the difference between imagery and metaphor? Give one example of each from the poem "Ghar ki Yaad" (you may describe the example.', options: [
                { text: 'Imagery refers to descriptive language that appeals to the five senses (e.g., the visual', outcome: 'Imagery refers to descriptive language that appeals to the five senses (e.g., the visual image.' },
                { text: 'confuses the two (e', outcome: 'Not quite — Students often think that any descriptive phrase is imagery, and any comparison is a metaphor.', reveals: 'any-descriptive-phrase-is-imagery' },
                { text: 'any descriptive phrase is imagery, and any comparison is a metaphor', outcome: 'Not quite — Students often think that any descriptive phrase is imagery, and any comparison is a metaphor.', reveals: 'any-descriptive-phrase-is-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_009', title: 'पाठ 11 — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 11\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example of each from everyday life (not from the poem).', options: [
                { text: 'Irony: A situation where the opposite of what is expected happens (e.g., a fire station', outcome: 'Irony: A situation where the opposite of what is expected happens (e.g., a fire station burning.' },
                { text: 'not home', outcome: 'Not quite — Students often think irony in this poem is only about the physical distance from home, missing the.', reveals: 'irony-in-this-poem-is' },
                { text: 'symbolism is just decoration, not reप्रस्तुति', outcome: 'Not quite — Students often think irony in this poem is only about the physical distance from home, missing the.', reveals: 'irony-in-this-poem-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_010', title: 'पाठ 11 — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 11\' के मुख्य शब्द: आरोह-भाग-1-—-पाठ-11 — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'Define the term \'uouhr\' (ऊउहर) as used in the line "cfgu vkbZ cki osQ ?kj" and explain why the poet chooses this specific Tadbhav word over.', options: [
                { text: '\'uouhr\' is a Tadbhav (तद्भव) word derived from Sanskrit \'anath\', meaning \'orphan\' or', outcome: '\'uouhr\' is a Tadbhav (तद्भव) word derived from Sanskrit \'anath\', meaning \'orphan\' or \'helpless\'.' },
                { text: 'it just means orphan', outcome: 'Not quite — Students treat \'Vocabulary in Context\' as "find the synonym from the options given." They memorize.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a poetry recital rehearsal, a classmate prepares Bachchan\'s \'Ghar ki Yaad\' and announces: \'It\'s a descriptive poem — the poet lists the walls, rooms and courtyard of his old house. I\'ll read it flat, like an estate agent\'s inventory.\'',
            decisions: [{ prompt: 'What should the performance convey instead?', options: [
                { text: 'Rebuild the reading around the arc: the poem moves from physical description to emotional memory — the father\'s voice, the mother\'s silence, the joint family — to philosophical reflection; the \'events\' are mental acts: remembering, comparing, realising. The refrain isn\'t decoration but the anchor pulling wandering memory back to the core truth: home is not a building but a living presence within the speaker.', outcome: 'The recital shifts register: the house outside becomes the house inside — a consciousness-driven journey, not an inventory.' },
                { text: 'Keep the flat reading — it IS a list of rooms and walls; honesty over drama.', outcome: 'Description is the entry, not the destination: the poem\'s structure carries the speaker from architecture to identity — flat reading strands it at the door.', reveals: 'poem-is-house-inventory' },
                { text: 'Add dramatic events instead — act out family scenes so the audience \'sees\' a plot.', outcome: 'Staging external scenes invents what the poem deliberately does internally: the structure is a memory-journey anchored by refrain, not a family drama.', reveals: 'invent-events-for-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'The house that \'stood silent\' in stanza one ends \'living in me\' — the same line, transformed by twelve stanzas of remembering.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_007', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय) पर लौटें: मुख्य विषय को 3-4 कीवर्ड में लिखें, फिर पाठ.',
          misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'गौण पात्र\' (minor character)** और **\'गौण विषय\' (sub-theme)** को मिला देते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 11\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'आरोह भाग-1 — पाठ 11\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 11\' का कथानक — \'आरोह भाग-1 — पाठ 11\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय) पर लौटें: मुख्य विषय को 3-4 कीवर्ड में लिखें, फिर पाठ दुबारा पढ़ते.',
                  misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'गौण पात्र\' (minor character)** और **\'गौण विषय\' (sub-theme)** को मिला देते हैं। वे सोचते हैं: "मित्र एक गौण.' }
          ],
            remediations: { 'minor-character-sub-theme': { steps: ['**पृथक्करण अभ्यास**: छात्र से कहो—पाठ के 5 पात्रों के नाम लिखो (स्तंभ अ) और 5 विचार/संघर्ष लिखो जो पाठ में उठते हैं.', '**प्रसंग-निष्कर्षण**: एक गौण विषय (जैसे \'भाषा का संकट\') दो। छात्र से कहो—पाठ से **तीन** भिन्न प्रसंग (अलग पात्र/स्थिति).', '**मुख्य-विषय से संवाद**: प्रत्येक प्रसंग के लिए छात्र से एक वाक्य में लिखवाओ: "यह प्रसंग मुख्य विषय \'X\' को कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_008', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, review the poem\'s narrative structure (c11_hin_ar_cbse_11_002) and the.',
          misconception: 'Students often think that any descriptive phrase is imagery, and any comparison is a metaphor.',
          parts: [
                { id: 'a', prompt: 'Identify a metaphor in the poem where the house is compared to something else.', answer: 'One metaphor is \'ghar mandir hai\' (home is a temple)',
                  options: ['One metaphor is \'ghar mandir hai\' (home is a temple)', 'any descriptive phrase is imagery, and any comparison is a metaphor'],
                  hint: 'If stuck, review the poem\'s narrative structure (c11_hin_ar_cbse_11_002) and the character of the.',
                  misconception: 'Students often think that any descriptive phrase is imagery, and any comparison is a metaphor.' }
          ],
            remediations: { 'any-descriptive-phrase-is-imagery': { steps: ['If a student cannot distinguish imagery from metaphor, do this: (1) Give them three short sentences: one factual, one.', 'Ask them to label each and justify.', '(2) Have them close their eyes and describe a childhood memory using only senses – then ask which words created the.', '(3) Show the line \'ghar mandir hai\' and ask: \'Does the poet say the house is *like* a temple, or *is* a temple?\' (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any descriptive phrase is imagery, and any comparison is a metaphor.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the metaphor \'the house is a temple of memories\' versus a possible simile \'the house is like a temple of memories\'.', answer: 'The metaphor is more effective',
                  options: ['The metaphor is more effective', 'any descriptive phrase is imagery, and any comparison is a metaphor'],
                  hint: 'If stuck, review the poem\'s narrative structure (c11_hin_ar_cbse_11_002) and the character of the.',
                  misconception: 'Students often think that any descriptive phrase is imagery, and any comparison is a metaphor.' }
          ],
            remediations: { 'any-descriptive-phrase-is-imagery': { steps: ['If a student cannot distinguish imagery from metaphor, do this: (1) Give them three short sentences: one factual, one.', 'Ask them to label each and justify.', '(2) Have them close their eyes and describe a childhood memory using only senses – then ask which words created the.', '(3) Show the line \'ghar mandir hai\' and ask: \'Does the poet say the house is *like* a temple, or *is* a temple?\' (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_009', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'Review the concept of metaphor and connotation from node c11_hin_ar_cbse_11_008 (Literary.',
          misconception: 'Students often think irony in this poem is only about the physical distance from home, missing the deeper existential.',
          parts: [
                { id: 'a', prompt: 'Compare the use of irony in the first stanza (where the poet says the house is far away) with the irony in the last stanza (where he says he is right but this.', answer: 'In the first stanza, irony is spatial: the house is physically distant',
                  options: ['In the first stanza, irony is spatial: the house is physically distant', 'not home'],
                  hint: 'Review the concept of metaphor and connotation from node c11_hin_ar_cbse_11_008 (Literary Devices.',
                  misconception: 'Students often think irony in this poem is only about the physical distance from home, missing the deeper existential irony: the poet.' }
          ],
            remediations: { 'irony-in-this-poem-is': { steps: ['Reread the poem focusing only on the word "घर" in each stanza; note how its meaning shifts from a physical place to.', 'List every concrete object mentioned (threshold, lap, voice, letters) and write what abstract feeling each evokes.', 'Practice writing one PEEL paragraph for one symbol, using the template: "The [object] symbolizes [abstract idea].', 'Discuss with a peer: "If the poet had said \'I miss my house\' directly, what would be lost?" to grasp the function.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_010', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, review the "Imagery and Metaphor" node (c11_hin_ar_cbse_11_008) to refresh the.',
          misconception: 'Students treat \'Vocabulary in Context\' as "find the synonym from the options given." They memorize the NCERT \'kCn&Nfo\'.',
          parts: [
                { id: 'a', prompt: 'Analyze the semantic shift of the word \'ifjrki\' (अफजर्की) from its standard meaning \'helpless/dependent\' to its contextual meaning in "gk; js ifjrki osQ ?kj!".', answer: 'Standard meaning: \'ifjrki\' = one who lacks support (nirashrit)',
                  options: ['Standard meaning: \'ifjrki\' = one who lacks support (nirashrit)', 'poor/helpless'],
                  hint: 'If stuck, review the "Imagery and Metaphor" node (c11_hin_ar_cbse_11_008) to refresh the poem\'s.',
                  misconception: 'Students treat \'Vocabulary in Context\' as "find the synonym from the options given." They memorize the NCERT \'kCn&Nfo\' glossary (e.g., gsVs.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['**Ban the Glossary:** Physically cover the \'kCn&Nfo\' box at the end of the poem.', '**Sound-First Drill:** Have the student read the target stanza *only aloud* 3 times, marking where the voice naturally.', '**Synonym Substitution Test:** Ask them to replace the target word with 3 synonyms (e.g., for \'gsVs\': bhay, dar, trasa).', 'They must articulate *what is lost* in sound, rhythm, and image with each swap.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_011', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck, review \'वाक्य भेद\' (sentence types), \'सर्वनाम विशेषकर पुरुषवाचक सर्वनाम के भेद\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'भाषा-प्रयोग विश्लेषण\' का अर्थ है — पाठ में आए *कठिन/तत्सम शब्दों की सूची.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 11\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'आरोह भाग-1 — पाठ 11\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 11\' का कथानक — \'आरोह भाग-1 — पाठ 11\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review \'वाक्य भेद\' (sentence types), \'सर्वनाम विशेषकर पुरुषवाचक सर्वनाम के भेद\' (pronoun.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'भाषा-प्रयोग विश्लेषण\' का अर्थ है — पाठ में आए *कठिन/तत्सम शब्दों की सूची बनाना* या *व्याकरणिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहें — "पाठ का कोई एक संवाद जोर से पढ़ो, जैसे तुम वही पात्र हो। फिर वही बात \'स्कूल के.', 'लिखो।" इससे वे \'रजिस्टर परिवर्तन\' (register shift) को शरीरानुभव करेंगे। 2.', '**दूसरा कदम:** पाठ से दो वाक्य दें — एक आंचलिक संवाद, एक साहित्यिक वर्णन। पूछें: "अगर लेखक यहाँ भी वही शब्द इस्तेमाल.', '**तीसरा कदम:** एक तालिका बनवाएँ: स्तंभ — पात्र / शब्द चयन / सर्वनाम / वाक्य प्रकार / प्रभाव। छात्र स्वयं भरें। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_012', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फंसे हों तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 009 (विरोधाभास और प्रतीक)** को.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **\'आशय-सूचक\' का अर्थ \'अपनी राय/कल्पना लिखना\' है**। वे उत्तर में पाठ-आधारित प्रमाण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 11\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 11\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 11\' का कथानक — \'आरोह भाग-1 — पाठ 11\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे हों तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 009 (विरोधाभास और प्रतीक)** को दोहराएं.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **\'आशय-सूचक\' का अर्थ \'अपनी राय/कल्पना लिखना\' है**। वे उत्तर में पाठ-आधारित प्रमाण (Textual Evidence).' }
          ],
            remediations: { 'textual-evidence': { steps: ['**चरण 1**: छात्र को एक ही विषय पर दो प्रश्न दें — एक वस्तुनिष्ठ ("होरी की मृत्यु कैसे हुई?"), एक आशय-सूचक ("होरी की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
