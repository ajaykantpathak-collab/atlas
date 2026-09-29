import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch04_p2: SimDef = {
    id: 'v3_c12_hin_a_ch04_p2',
    title: 'बनारस, दशिा · Part 2/3',
    subtitle: 'Not the ghats — the lane where the city actually lives',
    classLevel: 12, subject: 'hin_a', topic: 'बनारस, दशिा · Part 2/3',
    chapters: ['c12_hin_a_ch04'],
    nodeIds: ['c12_hin_a_cbse_04_007', 'c12_hin_a_cbse_04_008', 'c12_hin_a_cbse_04_009', 'c12_hin_a_cbse_04_010', 'c12_hin_a_cbse_04_011', 'c12_hin_a_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist poetry reader', intro: 'A post-independence poet picks the narrowest space in the city and makes it speak.', goal: 'Read Banaras through Nayi Kavita\'s experimental lens — title as thesis, image over statement.' },
    discovery: {
        question: 'The poem is titled \'Banaras\' — not a highway or a plaza but a narrow lane, a cul-de-sac. What has the title already decided before line one?',
        options: ['The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre', 'Banaras is small', 'Lanes are pretty', 'Nothing — it\'s just a name'],
        answer: 'The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre',
        hook: 'A poet born in 1934 writes under Nayi Kavita\'s contract already broken — no fixed metre, image over statement, ambiguity as value. Where Bhakti verse transmits truth, this poetry enacts the search for it; context isn\'t a crutch, it\'s the knowledge the poem presupposes.',
    },
    teaching: [
        { title: 'बनारस, दशिा — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'अंतरा भाग-2 — पाठ 4\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the cul-de-sac of modernist verse: predict imagery from title and era, weigh ambiguity as method, and feel how the poem speaks from beneath the flyover, not from its span.',
        labels: ['बनारस, दशिा — साहित्यिक', 'बनारस, दशिा — मुख्य', 'बनारस, दशिा — गौण', 'बनारस, दशिा — पदावली', 'बनारस, दशिा — व्याकरण', 'बनारस, दशिा — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_007', title: 'बनारस, दशिा — साहित्यिक युक्तियाँ: प्रतीक और बिंब',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 4\' में अंतरा-भाग-2-—-पाठ-4 जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme in terms of scope and function.', options: [
                { text: 'A secondary theme is a subordinate idea that runs parallel to the primary theme,', outcome: 'A secondary theme is a subordinate idea that runs parallel to the primary theme, exploring specific.' },
                { text: 'minor topics', outcome: 'Not quite — Students often treat secondary themes as "less important themes" that can be listed like inventory.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'subplots', outcome: 'Not quite — Students often treat secondary themes as "less important themes" that can be listed like inventory.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_008', title: 'बनारस, दशिा — मुख्य भाव और संदेश',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 4\' में बिंब ढूँढिए — अंतरा-भाग-2-—-पाठ-4 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, giving one example of each from everyday language (not from the textbook).', options: [
                { text: 'Imagery: Language that appeals to the senses (e.g., "The aroma of frying pakoras filled', outcome: 'Imagery: Language that appeals to the senses (e.g., "The aroma of frying pakoras filled the.' },
                { text: 'Metaphor uses like or as', outcome: 'Not quite — Students often treat **imagery** and **metaphor** as interchangeable "figurative language" and.', reveals: 'students-often-treat-imagery-and' },
                { text: 'says "Metaphor uses like or as" reveals confusion with **simile**', outcome: 'Not quite — Students often treat **imagery** and **metaphor** as interchangeable "figurative language" and.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_009', title: 'बनारस, दशिा — गौण भाव और विषयांतर',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 4\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define "situational irony" and "symbol" in your own words, giving one example from daily life (not from the poem) for each.', options: [
                { text: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was', outcome: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was expected.' },
                { text: 'it rained on my picnic', outcome: 'Not quite — Students routinely confuse **irony** with **coincidence** or **misfortune** (e.g., "the pond dried.', reveals: 'students-routinely-confuse-irony-with' },
                { text: 'the pond is just a pond', outcome: 'Not quite — Students routinely confuse **irony** with **coincidence** or **misfortune** (e.g., "the pond dried.', reveals: 'students-routinely-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A short-film jury member rejects your submission about a child calling \'Papa — Papa\' toward a father who never comes, saying \'nothing happens — no climax, no arrival, no story.\'',
            decisions: [{ prompt: 'How does the structure of \'फ्नेक\' answer that verdict?', options: [
                { text: 'The climax is internal — the repeated \'पिता-पिता\' at widening intervals spirals the child\'s urgency upward while the father\'s absence grows more total; the non-arrival IS the event, and the final cry is the peak the film was building toward.', outcome: 'The chapter separates external event from structural peak: repetition placed at lengthening intervals propels time and loss forward — \'nothing happening\' is precisely what\'s happening.' },
                { text: 'The juror is right — a climax requires the awaited person to appear or definitively not appear on screen.', outcome: 'That demands an external resolution the poem refuses on purpose: the spiral structure makes absence itself the accumulating force, so an arrival would release the tension the film exists to hold.', reveals: 'climax-needs-arrival' },
                { text: 'Compromise — add a montage of the father elsewhere so the audience at least sees him.', outcome: 'Cutting away breaks the one-point perspective that makes the waiting legible; the poem never leaves the child\'s call because the structure\'s power is that we stay inside the unanswered side.', reveals: 'show-both-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now decode a title before the first line — and read Nayi Kavita\'s broken forms as the broken world\'s true shape.',
            decisions: [{ prompt: 'What comes next? बनारस, दशिा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बनारस, दशिा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_007', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, revisit c12_hin_a_cbse_04_006 (Primary Theme) and practice writing one-sentence.',
          misconception: 'Students often treat secondary themes as "less important themes" that can be listed like inventory items (e.g.',
          parts: [
                { id: 'a', prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme in terms of scope and function within a text?', answer: 'A secondary theme is a subordinate idea that runs parallel to the primary theme,',
                  options: ['A secondary theme is a subordinate idea that runs parallel to the primary theme,', 'minor topics', 'subplots'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_04_006 (Primary Theme) and practice writing one-sentence theme.',
                  misconception: 'Students often treat secondary themes as "less important themes" that can be listed like inventory items (e.g., "nature, time, fear.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists themes without relational analysis: (1) Have them reread the primary theme statement from node 006.', '(2) Give a two-column template: Column A = "Primary theme claim", Column B = "How secondary theme X *shapes* that.', '(3) Model one row together: Primary = "Village life is harmonious"; Secondary = "Perception shapes reality" → "Harmony.', '(5) Re-diagnose using Diagnostic Question 4 — require explicit "mediates/complicates/extends" language in the answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as "less important themes" that can be listed like inventory items (e.g.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The secondary theme of \'rural labor\' in \'चुकजल\' is merely decorative background — removing it would not change the poem\'s core.', answer: 'Refute',
                  options: ['Refute', 'message + decoration'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_04_006 (Primary Theme) and practice writing one-sentence theme.',
                  misconception: 'Students often treat secondary themes as "less important themes" that can be listed like inventory items (e.g., "nature, time, fear.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists themes without relational analysis: (1) Have them reread the primary theme statement from node 006.', '(2) Give a two-column template: Column A = "Primary theme claim", Column B = "How secondary theme X *shapes* that.', '(3) Model one row together: Primary = "Village life is harmonious"; Secondary = "Perception shapes reality" → "Harmony.', '(5) Re-diagnose using Diagnostic Question 4 — require explicit "mediates/complicates/extends" language in the answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_008', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, review "tenor/vehicle/ground" using the Class 11 poem "Badal Ko Ghirte Dekha".',
          misconception: 'Students often treat **imagery** and **metaphor** as interchangeable "figurative language" and write answers like "The.',
          parts: [
                { id: 'a', prompt: 'Identify the metaphor in the stanza beginning "bl \'kgj esa olar / vpkud vkrk gS".', answer: 'Tenor: the village lane / the scene of rain',
                  options: ['Tenor: the village lane / the scene of rain', 'the sky is a blanket'],
                  hint: 'If stuck, review "tenor/vehicle/ground" using the Class 11 poem "Badal Ko Ghirte Dekha" (node.',
                  misconception: 'Students often treat **imagery** and **metaphor** as interchangeable "figurative language" and write answers like "The poet uses imagery.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['**Revisit sensory listing**: Take any paragraph from a Hindi newspaper (e.g., a weather report) and highlight every.', '**Metaphor surgery**: Pick 5 common metaphors ("time is money", "heart of stone", etc.).', 'For each, write the tenor, vehicle, and **one quality transferred**.', 'Then change the vehicle to a fresh one and see how the meaning shifts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_009', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the "Image → Abstraction" mapping table from c12_hin_a_cbse_04_008.',
          misconception: 'Students routinely confuse **irony** with **coincidence** or **misfortune** (e.g., "the pond dried up — how ironic!".',
          parts: [
                { id: 'a', prompt: 'In the poem, the line "वक़्क़ गै ब्ल्ध कुकव" (this is the village) appears after descriptions of decay. Explain why this statement is ironic.', answer: 'The statement is ironic',
                  options: ['The statement is ironic', 'the poet is lying', 'sadness', 'the pond dried up'],
                  hint: 'If stuck, review the "Image → Abstraction" mapping table from c12_hin_a_cbse_04_008 Worked Example.',
                  misconception: 'Students routinely confuse **irony** with **coincidence** or **misfortune** (e.g., "the pond dried up — how ironic!" — no, that\'s just.' },
                { id: 'b', prompt: 'The phrase "लब्ज़ लक़ी" (tears of the eye/heart) appears in the poem.', answer: '"लब्ज़ लक़ी" functions as a **symbol**, not merely a metaphor',
                  options: ['"लब्ज़ लक़ी" functions as a **symbol**, not merely a metaphor', 'just a metaphor', 'the pond dried up'],
                  hint: 'If stuck, review the "Image → Abstraction" mapping table from c12_hin_a_cbse_04_008 Worked Example.',
                  misconception: 'Students routinely confuse **irony** with **coincidence** or **misfortune** (e.g., "the pond dried up — how ironic!" — no, that\'s just.' }
          ],
            remediations: { 'students-routinely-confuse-irony-with': { steps: ['**Revisit c12_hin_a_cbse_04_008 (Imagery and Metaphor):** Re-read the worked example on "extended metaphor" — symbols.', 'Do the "image → abstraction" mapping exercise again using the pond.', '**Micro-drill:** Take 3 concrete nouns from the poem (वीथी, लब्ज़ लक़ी, एक्कज-एक्कज).', 'For each, write *three* distinct abstract ideas it could symbolize, citing the line where each reading is triggered.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_010', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि छात्र मुहावरों के अर्थ को शब्दार्थ से निकालने में गलती कर रहा है, तो उसे.',
          misconception: 'छात्र अक्सर मुहावरों के अर्थ को उनके शब्दों के अलग-अलग अर्थ जोड़कर निकालते हैं, जैसे "घुटना टेकना" को "घुटने पर टेकना".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 4\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 4\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 4\' का कथानक — \'अंतरा भाग-2 — पाठ 4\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र मुहावरों के अर्थ को शब्दार्थ से निकालने में गलती कर रहा है, तो उसे c11_hin_a_cbse_01_010.',
                  misconception: 'छात्र अक्सर मुहावरों के अर्थ को उनके शब्दों के अलग-अलग अर्थ जोड़कर निकालते हैं, जैसे "घुटना टेकना" को "घुटने पर टेकना" मानकर शाब्दिक अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले उन मुहावरों की सूची दें जिनका शब्दार्थ और प्रयोगार्थ दोनों अलग हों (जैसे "हाथ धोना", "नाक में दम.', 'नहीं — इसलिए इसका अर्थ है "पाप से स्वयं को अलग करना"। इस प्रकार छात्र को शब्दार्थ से प्रयोगार्थ तक जाने की क्रिया करने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_011', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि फंसे हों तो c12_hin_a_cbse_04_002 (पद्यांश-वार भावार्थ) की दोबारा समीक्षा करें—भाव की.',
          misconception: 'छात्र अक्सर मानते हैं कि कविता में भाषा-प्रयोग का अर्थ केवल कठिन या पुराने शब्दों का प्रयोग है—जैसे "अमर" के बजाय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 4\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-2 — पाठ 4\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 4\' का कथानक — \'अंतरा भाग-2 — पाठ 4\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे हों तो c12_hin_a_cbse_04_002 (पद्यांश-वार भावार्थ) की दोबारा समीक्षा करें—भाव की पहचान.',
                  misconception: 'छात्र अक्सर मानते हैं कि कविता में भाषा-प्रयोग का अर्थ केवल कठिन या पुराने शब्दों का प्रयोग है—जैसे "अमर" के बजाय "अमरावती" लिखना। वे भूल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वह "शोर" शब्द की बजाय "अशांति की लहरें" क्यों नहीं लिख सकता—फिर दोनों वाक्यों के भावात्मक प्रभाव की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_012', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 4\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि छात्र आशय और भावार्थ में अंतर नहीं कर पा रहे हैं, तो उन्हें c12_hin_a_cbse_04_002.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में कविता के शब्दों के शाब्दिक अर्थ को दोहराते हैं और मानते हैं कि यदि उन्होंने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 4\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 4\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 4\' का कथानक — \'अंतरा भाग-2 — पाठ 4\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र आशय और भावार्थ में अंतर नहीं कर पा रहे हैं, तो उन्हें c12_hin_a_cbse_04_002 (पद्यांश-वार.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में कविता के शब्दों के शाब्दिक अर्थ को दोहराते हैं और मानते हैं कि यदि उन्होंने पंक्ति याद कर ली है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र शाब्दिक अर्थ को आशय के समान मान रहे हैं, तो उन्हें बताइए कि एक पंक्ति लें — जैसे "बनारस की गलियों में समय ठहर.', 'क्या लोग बूढ़े नहीं होते?" फिर स्पष्ट कीजिए कि यहाँ "समय ठहर गया" का अर्थ है कि बनारस में बदलाव की अनुभूति नहीं होती.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
