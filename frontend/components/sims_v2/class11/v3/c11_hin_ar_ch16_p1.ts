import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch16_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch16_p1',
    title: 'Hkkjrh; f\'k{kk · Part 1/3',
    subtitle: 'Enter a poem that shelters the village inside language itself.',
    classLevel: 11, subject: 'hin_ar', topic: 'Hkkjrh; f\'k{kk · Part 1/3',
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
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory section that provides essential historical, social, and biographical information about the poet and the poem\'s setting, enabling students.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_16_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the three-stanza arc — invitation, catalog of burdens, quiet resistance — and test whether the shape is inevitable or arbitrary.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a film set in a village in 1980s Vidarbha—you\'d want to know what crops they grow, what languages they speak, what debts keep.',
            decisions: [{ prompt: 'Who is the poet of "vkvks] feydj cpk,¡" and what are the two key biographical details that shape his poetic perspective?', options: [
                { text: 'The poet is FueZyk iqrqy (born 1972, Nagpur, Maharashtra)', outcome: 'The poet is FueZyk iqrqy (born 1972, Nagpur, Maharashtra). The two key details: (1) he was born.' },
                { text: 'Before You Read', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia—memorising the poet\'s birth year and.', reveals: 'students-treat-before-you-read' },
                { text: 'a different poet or giving only birth year', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia—memorising the poet\'s birth year and.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are telling a friend about a bad day — you don\'t just dump all details at once; you start with "You won\'t believe what happened," then list events.',
            decisions: [{ prompt: 'What is the primary structural movement from stanza one to stanza three in "vkvks] feydj cpk,¡"?', options: [
                { text: 'The poem moves from a direct imperative address ("come, let\'s hide") in stanza one, to an', outcome: 'The poem moves from a direct imperative address ("come, let\'s hide") in stanza one, to an expansive.' },
                { text: 'three stanzas', outcome: 'Not quite — Students treat "narrative structure" in poetry as merely counting stanzas or identifying.', reveals: 'students-treat-narrative-structure-in' },
                { text: 'hiding theme', outcome: 'Not quite — Students treat "narrative structure" in poetry as merely counting stanzas or identifying.', reveals: 'students-treat-narrative-structure-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are visiting your ancestral village at dusk after years in the city.',
            decisions: [{ prompt: 'What is the primary physical and temporal setting established in the first stanza of the poem?', options: [
                { text: 'The primary setting is a rural village (nkSj) at evening/dusk (fnup;kZ, iwjh), depicted', outcome: 'The primary setting is a rural village (nkSj) at evening/dusk (fnup;kZ, iwjh), depicted through.' },
                { text: 'village', outcome: 'Not quite — Students often conflate setting with mere geographical location ("the poem is set in a village").', reveals: 'students-often-conflate-setting-with' },
                { text: 'evening', outcome: 'Not quite — Students often conflate setting with mere geographical location ("the poem is set in a village").', reveals: 'students-often-conflate-setting-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a village elder speaking to a young migrant leaving for the city: "Before you go, promise me you\'ll protect these things," and then.',
            decisions: [{ prompt: 'In the poem "वक्ष, फेयद्ज़ चप्किं", who is the primary addressee of the speaker\'s appeal, and what grammatical form indicates this address?', options: [
                { text: 'The primary addressee is an implied listener/companion addressed as "वक्ष" (come) and', outcome: 'The primary addressee is an implied listener/companion addressed as "वक्ष" (come) and "चप्किं".' },
                { text: 'चप्किं', outcome: 'Not quite — Students often think "supporting characters" in a poem must be named human figures like in a story.', reveals: 'supporting-characters-in-a-poem' },
                { text: 'supporting characters', outcome: 'Not quite — Students often think "supporting characters" in a poem must be named human figures like in a story.', reveals: 'supporting-characters-in-a-poem' }
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
            decisions: [{ prompt: 'What comes next? Hkkjrh; f\'k{kk · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Hkkjrh; f\'k{kk · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory section that.',
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
          question: 'Narrative structure in poetry refers to the organized progression of ideas.',
          hint: 'Review the concept of "rhetorical structure" in c11_hin_ar_cbse_16_001 — specifically how.',
          misconception: 'Students treat "narrative structure" in poetry as merely counting stanzas or identifying beginning/middle/end.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Narrative structure in poetry refers to the organized progression of ideas, images, and',
                  options: ['Narrative structure in poetry refers to the organized progression of ideas, images, and', '"Before You Read: Context and Background" is a preparatory section that provides', 'Setting in a poem refers to the time, place, and social environment in', 'Character analysis of the protagonist in poetry involves examining the poetic speaker\'s'],
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
          question: 'Setting in a poem refers to the time, place, and social environment in which.',
          hint: 'Review the \'kCn&Nfo\' (word-meanings) section at the end of the chapter and practice.',
          misconception: 'Students often conflate setting with mere geographical location ("the poem is set in a village") and atmosphere with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting in a poem refers to the time, place, and social environment in',
                  options: ['Setting in a poem refers to the time, place, and social environment in', '"Before You Read: Context and Background" is a preparatory section that provides', 'Narrative structure in poetry refers to the organized progression of ideas, images, and', 'Character analysis of the protagonist in poetry involves examining the poetic speaker\'s'],
                  hint: 'Review the \'kCn&Nfo\' (word-meanings) section at the end of the chapter and practice identifying the.',
                  misconception: 'Students often conflate setting with mere geographical location ("the poem is set in a village") and atmosphere with general mood ("it.' }
          ],
            remediations: { 'students-often-conflate-setting-with': { steps: ['If a student reduces setting to location, guide them through a three-column annotation: Column 1 – Time markers.', 'Then ask: "Which column has the most entries?', 'What does that tell you about the poem\'s focus?" Next, for atmosphere, have them underline every adjective and verb.', 'Ask: "Group these into \'comfort\' and \'discomfort\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves examining the poetic.',
          hint: 'Review the concept of "kavya-vaktā" (poetic speaker) from Class 10 Hindi.',
          misconception: 'Students treat the poetic speaker as either (a) the poet themselves, or (b) a fictional character like in a story.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in poetry involves examining the poetic speaker\'s',
                  options: ['Character analysis of the protagonist in poetry involves examining the poetic speaker\'s', '"Before You Read: Context and Background" is a preparatory section that provides', 'Narrative structure in poetry refers to the organized progression of ideas, images, and', 'Setting in a poem refers to the time, place, and social environment in'],
                  hint: 'Review the concept of "kavya-vaktā" (poetic speaker) from Class 10 Hindi (Kshitij/Kritika).',
                  misconception: 'Students treat the poetic speaker as either (a) the poet themselves, or (b) a fictional character like in a story.' }
          ],
            remediations: { 'students-treat-the-poetic-speaker': { steps: ['Have the student read the poem aloud *only in Hindi*, marking every verb addressing "cfLr;ksa" (cpk,¡, cpk,¡, laosQr.', 'Ask: "Who is speaking these verbs?', 'Does the text ever say \'main Fuezyk iqrqy bol raha hoon\'?" 3.', 'Show the NCERT note: "laFkkyh Hkk\'kk ls fganh :ikarj v\'kksd flag us fd;k gS"—the translator\'s presence proves mediation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in poetry involves examining the.',
          hint: 'Review the protagonist analysis (node 004) focusing on the speaker\'s protective stance.',
          misconception: 'Students often think "supporting characters" in a poem must be named human figures like in a story.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet includes both natural elements (like मिट्टी, रात, धूप) and human activities (like ह्क्र्ज, क्स्र्क्स, फेह) in the same.', answer: 'The poet blends nature and human life',
                  options: ['The poet blends nature and human life', 'supporting characters', '"supporting characters" in a poem must be named human figures like in a story'],
                  hint: 'Review the protagonist analysis (node 004) focusing on the speaker\'s protective stance, then reread.',
                  misconception: 'Students often think "supporting characters" in a poem must be named human figures like in a story.' },
                { id: 'b', prompt: 'Apply the concept of "personification as supporting character" to the line "ह्क्र्ज की व्क्स, ऋकु्क की म्क्ज्ह".', answer: 'The deer\'s fear (व्क्स) and the season\'s fragility (म्क्ज्ह) are projected human',
                  options: ['The deer\'s fear (व्क्स) and the season\'s fragility (म्क्ज्ह) are projected human', 'supporting characters', '"supporting characters" in a poem must be named human figures like in a story'],
                  hint: 'Review the protagonist analysis (node 004) focusing on the speaker\'s protective stance, then reread.',
                  misconception: 'Students often think "supporting characters" in a poem must be named human figures like in a story.' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['Ask the student to reread the poem marking every noun that follows "चप्किं" (explicit or implied).', 'Have them sort these into: natural elements, animals, human roles, abstract states, and pronouns.', 'For each category, ask: "What happens to the poem\'s argument if this category is removed?" 4.', 'Guide them to see that the poem\'s power comes from the TOTALITY of the list—each "character" is a thread in the rural.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
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
