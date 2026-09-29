import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch14_p2: SimDef = {
    id: 'v3_c11_eng_w_ch14_p2',
    title: 'Mother Tongue (Poem) · Part 2/3',
    subtitle: 'Watch a request for a pen become a language\'s fight for its script.',
    classLevel: 11, subject: 'eng_w', topic: 'Mother Tongue (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch14'],
    nodeIds: ['c11_eng_w_cbse_14_007', 'c11_eng_w_cbse_14_008', 'c11_eng_w_cbse_14_009', 'c11_eng_w_cbse_14_010', 'c11_eng_w_cbse_14_011', 'c11_eng_w_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a petitioner negotiating with a reed for a quill', intro: '\'Give me a quill, quickly — she must be looking for me.\' The urgency is a whole language demanding to be written down.', goal: 'Read the poem\'s request-and-response structure as an allegory of script deprivation.' },
    discovery: {
        question: 'A poet begs a reed for a quill, and the reed cuts off its own hand to give one. What is the poem actually asking for?',
        options: ['A script — the quill is Dogri\'s lost written form, and the reed\'s severed hand is the cost of a language claiming it', 'A pen — the poet simply needs to write a poem', 'Ink — the reed produces writing fluid', 'Inspiration — the reed is a muse figure'],
        answer: 'A script — the quill is Dogri\'s lost written form, and the reed\'s severed hand is the cost of a language claiming it',
        hook: 'She serves \'a Shahni, not a Shah\' — the climax isn\'t the gift of the quill but the naming of who it\'s for: her mother tongue.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Mother Tongue\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_14_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map the six stanzas onto the dramatic arc, place the climax at the revelation of Dogri, and weigh what translation keeps and loses.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Mother Tongue\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the difference between a primary theme and a secondary theme in a poem?', options: [
                { text: 'A primary theme is the central, unifying idea that the entire work revolves around (in', outcome: 'A primary theme is the central, unifying idea that the entire work revolves around (in "Mother.' },
                { text: 'imagery', outcome: 'Not quite — Students often confuse **literary devices** (personification, metaphor, imagery) with **secondary.', reveals: 'students-often-confuse-literary-devices' },
                { text: 'metaphor', outcome: 'Not quite — Students often confuse **literary devices** (personification, metaphor, imagery) with **secondary.', reveals: 'students-often-confuse-literary-devices' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Mother Tongue\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "extended metaphor" and give the two primary tenor-vehicle pairs in "Mother Tongue" without quoting the poem.', options: [
                { text: 'An extended metaphor sustains a single comparison across multiple lines or stanzas,', outcome: 'An extended metaphor sustains a single comparison across multiple lines or stanzas, developing the.' },
                { text: 'quill = pen', outcome: 'Not quite — Students confuse *personification* (attributing human actions to non-human things) with *metaphor*.', reveals: 'students-confuse-personification-attributing-hum' },
                { text: 'only identifies "quill = pen" misses the abstraction (script vs', outcome: 'Not quite — Students confuse *personification* (attributing human actions to non-human things) with *metaphor*.', reveals: 'students-confuse-personification-attributing-hum' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Mother Tongue\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'What is the literal meaning of the word "quill" in the poem, and what does it symbolise in the context of Dogri language?', options: [
                { text: 'The literal meaning of "quill" is a feather used as a pen', outcome: 'The literal meaning of "quill" is a feather used as a pen; symbolically, it represents the Sharade.' },
                { text: 'quill symbolises the poet\'s creativity', outcome: 'Not quite — Students often think the irony in the poem is simply that a reed talks (personification) or that.', reveals: 'the-irony-in-the-poem' },
                { text: 'writing tool', outcome: 'Not quite — Students often think the irony in the poem is simply that a reed talks (personification) or that.', reveals: 'the-irony-in-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Mother Tongue\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of an unfamiliar word in a literary text without using a dictionary?', options: [
                { text: 'The primary strategy is using context clues', outcome: 'The primary strategy is using context clues — such as surrounding words, sentence structure, tone.' },
                { text: 'guessing', outcome: 'Not quite — Students often believe "vocabulary in context" means finding a synonym that fits the sentence.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'skipping the word', outcome: 'Not quite — Students often believe "vocabulary in context" means finding a synonym that fits the sentence.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Mother Tongue\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Define personification in grammatical terms: which specific part of speech and grammatical choice primarily enables personification.', options: [
                { text: 'Personification is grammatically enacted primarily through **verb selection**—attributing', outcome: 'Personification is grammatically enacted primarily through **verb selection**—attributing.' },
                { text: 'using adjectives like \'kind\'', outcome: 'Not quite — Students equate "language usage" with "difficult vocabulary" or "figures of speech" (simile.', reveals: 'students-equate-language-usage-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Mother Tongue\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the fundamental difference between a literal comprehension question and an inferential comprehension question in the context.', options: [
                { text: 'A literal question asks for information explicitly stated in the poem (e.g., "What did', outcome: 'A literal question asks for information explicitly stated in the poem (e.g., "What did the poet ask.' },
                { text: 'what do you feel?', outcome: 'Not quite — Students often treat inferential questions as "opinion questions" where any creative answer.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your linguistics club is preparing a stall on endangered scripts. A junior suggests Padma Sachdev\'s Dogri poem about the reed but summarises it as \'a poet asks a plant for a pen so she can write.\' You know the stakes are bigger than stationery.',
            decisions: [{ prompt: 'What\'s the right interpretation to put on the stall poster?', options: [
                { text: 'Frame it as a language claiming its right to be written: Dogri lost its own script (Sharade) and survives in borrowed scripts, so the reed\'s violent generosity — cutting off its own hand to become the poet\'s quill — allegorises what a script-less language demands. The climax isn\'t the gift of the pen but the revelation \'That Shahni is my mother tongue / Dogri.\'', outcome: 'The poster now explains the allegory: the quill is the script itself, and the reed\'s sacrifice mirrors a community adapting to keep its language alive.' },
                { text: 'Keep the junior\'s summary — it\'s a charming request for a pen, which suits a stationery-themed corner of the stall.', outcome: 'The literal reading erases the poem\'s subject: a whole language\'s deprivation, not one poet\'s need for a writing tool.', reveals: 'literally-about-a-pen' },
                { text: 'Present it as an environmental poem — the reed is harmed, so it\'s about plants suffering for human art.', outcome: 'The reed offers itself willingly; the wound serves the allegory of a mother tongue demanding written form, not a conservation message.', reveals: 'reed-poem-is-environmental' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'The reed refuses until it hears the mistress\'s name — a language without a script is a servant asking to be written.',
            decisions: [{ prompt: 'What comes next? Mother Tongue (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mother Tongue (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_007', difficulty: 'standard',
          question: 'Secondary themes in \'Mother Tongue\' — the supporting ideas and motifs that.',
          hint: 'Review node 006 (Primary Theme) and node 002 (Narrative Structure) — specifically the.',
          misconception: 'Students often confuse **literary devices** (personification, metaphor, imagery) with **secondary themes**, listing.',
          parts: [
                { id: 'a', prompt: 'In the poem, the reed says "I too am her servant" after giving the speaker a quill.', answer: 'This moment reveals the secondary theme of **devoted servitude**',
                  options: ['This moment reveals the secondary theme of **devoted servitude**', 'personification', 'personification of the reed'],
                  hint: 'Review node 006 (Primary Theme) and node 002 (Narrative Structure) — specifically the speaker\'s.',
                  misconception: 'Students often confuse **literary devices** (personification, metaphor, imagery) with **secondary themes**, listing "personification of the.' },
                { id: 'b', prompt: 'Apply the concept of secondary themes to analyze the "accountant/Shah" reference in lines 5-8.', answer: 'The stem\'s accusation',
                  options: ['The stem\'s accusation', 'personification of the reed'],
                  hint: 'Review node 006 (Primary Theme) and node 002 (Narrative Structure) — specifically the speaker\'s.',
                  misconception: 'Students often confuse **literary devices** (personification, metaphor, imagery) with **secondary themes**, listing "personification of the.' },
                { id: 'c', prompt: 'Compare the personification of the stem (irritated, questioning) with the personification of the reed (sacrificial, humble).', answer: 'The stem represents the *severed* script (Sharade)',
                  options: ['The stem represents the *severed* script (Sharade)', 'giving human qualities', 'personification of the reed'],
                  hint: 'Review node 006 (Primary Theme) and node 002 (Narrative Structure) — specifically the speaker\'s.',
                  misconception: 'Students often confuse **literary devices** (personification, metaphor, imagery) with **secondary themes**, listing "personification of the.' }
          ],
            remediations: { 'students-often-confuse-literary-devices': { steps: ['Have the student create a two-column table: Column A = "Device/Image in Poem" (e.g., reed cutting hand), Column.', 'For each entry, ask: "If this image were removed, what thematic nuance would be lost?" — forcing them to see the device.', 'Then have them write one sentence per secondary theme using the template: "The [device/image] develops the secondary.', 'Finally, ask them to explain how *all* secondary themes together make the primary theme feel "lived" rather than.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse **literary devices** (personification, metaphor, imagery) with **secondary themes**, listing.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The urgency in the poem\'s final lines (\'She must be looking for me\') is merely a narrative device to create tension." Defend or refute.', answer: 'Refute',
                  options: ['Refute', 'personification of the reed'],
                  hint: 'Review node 006 (Primary Theme) and node 002 (Narrative Structure) — specifically the speaker\'s.',
                  misconception: 'Students often confuse **literary devices** (personification, metaphor, imagery) with **secondary themes**, listing "personification of the.' }
          ],
            remediations: { 'students-often-confuse-literary-devices': { steps: ['Have the student create a two-column table: Column A = "Device/Image in Poem" (e.g., reed cutting hand), Column.', 'For each entry, ask: "If this image were removed, what thematic nuance would be lost?" — forcing them to see the device.', 'Then have them write one sentence per secondary theme using the template: "The [device/image] develops the secondary.', 'Finally, ask them to explain how *all* secondary themes together make the primary theme feel "lived" rather than.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_008', difficulty: 'standard',
          question: 'Imagery in \'Mother Tongue\' — the vivid, sensory language that creates.',
          hint: 'Review the "tenor-vehicle" terminology and the seven sensory modes of imagery using the.',
          misconception: 'Students confuse *personification* (attributing human actions to non-human things) with *metaphor* (equating two.',
          parts: [
                { id: 'a', prompt: 'In a new context, a student writes: "The constitution is the spine of democracy." Identify the tenor, vehicle, and the specific quality transferred.', answer: 'Tenor = Constitution',
                  options: ['Tenor = Constitution', 'A wrong answer that says', 'or transfers'],
                  hint: 'Review the "tenor-vehicle" terminology and the seven sensory modes of imagery using the Class 6.',
                  misconception: 'Students confuse *personification* (attributing human actions to non-human things) with *metaphor* (equating two nouns).' }
          ],
            remediations: { 'students-confuse-personification-attributing-hum': { steps: ['Have the student reread the poem with three colored pencils: one for nouns involved in metaphors (quill, Shahni.', 'Ask them to draw a two-column table: Column A = Vehicle (image), Column B = Tenor (abstract concept) for every metaphor.', 'For each sensory word, name the sense organ activated.', 'Finally, rewrite one stanza replacing all metaphors with literal statements — the loss of urgency will make the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Mother Tongue\' — where opposite things are both true,.',
          hint: 'Review personification from c11_eng_w_cbse_14_008 and the "About the Poet" note in the.',
          misconception: 'Students often think the irony in the poem is simply that a reed talks (personification) or that the poet asks a plant.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the word "quill" in the poem, and what does it symbolise in the context of Dogri language?', answer: 'The literal meaning of "quill" is a feather used as a pen',
                  options: ['The literal meaning of "quill" is a feather used as a pen', 'quill symbolises the poet\'s creativity', 'writing tool', 'About the Poet'],
                  hint: 'Review personification from c11_eng_w_cbse_14_008 and the "About the Poet" note in the textbook for.',
                  misconception: 'Students often think the irony in the poem is simply that a reed talks (personification) or that the poet asks a plant for a pen.' },
                { id: 'b', prompt: 'Explain in your own words why the reed\'s response ("Are you some sort of an accountant / With some Shah / Writing account books / Where you need a new pen.', answer: 'The irony lies in the reed treating the poet\'s request for a quill as a trivial,',
                  options: ['The irony lies in the reed treating the poet\'s request for a quill as a trivial,', 'It is ironic because reeds don\'t talk', 'writing tool', 'About the Poet'],
                  hint: 'Review personification from c11_eng_w_cbse_14_008 and the "About the Poet" note in the textbook for.',
                  misconception: 'Students often think the irony in the poem is simply that a reed talks (personification) or that the poet asks a plant for a pen.' },
                { id: 'c', prompt: 'Analyze how the symbol of the "Shahni" (the mother tongue Dogri) and the "servants" (the reed, the poet, and others) work together to develop the theme.', answer: 'The Shahni represents Dogri as a benevolent but demanding mistress',
                  options: ['The Shahni represents Dogri as a benevolent but demanding mistress', 'Shahni is just a rich woman', 'writing tool', 'About the Poet'],
                  hint: 'Review personification from c11_eng_w_cbse_14_008 and the "About the Poet" note in the textbook for.',
                  misconception: 'Students often think the irony in the poem is simply that a reed talks (personification) or that the poet asks a plant for a pen.' }
          ],
            remediations: { 'the-irony-in-the-poem': { steps: ['Re-read the "About the Poet" note to grasp the historical fact: Dogri lost its native Sharade script.', 'List every object in the poem (quill, reed, hand, Shahni, servants) and write its literal and symbolic meaning side.', 'Trace the conversation: mark where expectation (reed\'s complaint) clashes with reality (poet\'s mission).', 'Write one PEEL paragraph explaining the quill\'s symbolism using the historical context as evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Mother Tongue\' — the words and phrases you must know to read.',
          hint: 'Review the "Personification" section in c11_eng_w_cbse_14_008 and practice with the "Reed.',
          misconception: 'Students often believe "vocabulary in context" means finding a synonym that fits the sentence grammatically.',
          parts: [
                { id: 'a', prompt: 'What is the primary strategy for determining the meaning of an unfamiliar word in a literary text without using a dictionary?', answer: 'The primary strategy is using context clues',
                  options: ['The primary strategy is using context clues', 'guessing', 'skipping the word', 'vocabulary in context'],
                  hint: 'Review the "Personification" section in c11_eng_w_cbse_14_008 and practice with the "Reed.',
                  misconception: 'Students often believe "vocabulary in context" means finding a synonym that fits the sentence grammatically.' },
                { id: 'b', prompt: 'In the poem, the speaker says, "That Shahni is my mother tongue / Dogri." Explain what "Shahni" literally means and what it represents metaphorically in this.', answer: 'Literally, "Shahni" means a wealthy or noble woman (the feminine of "Shah")',
                  options: ['Literally, "Shahni" means a wealthy or noble woman (the feminine of "Shah")', 'vocabulary in context'],
                  hint: 'Review the "Personification" section in c11_eng_w_cbse_14_008 and practice with the "Reed.',
                  misconception: 'Students often believe "vocabulary in context" means finding a synonym that fits the sentence grammatically.' },
                { id: 'c', prompt: 'The reed "cut off its hand / Gave it to me." Using context clues, infer the meaning of "quill" in the opening stanza and explain why the reed\'s action.', answer: '"Quill" literally means a feather pen',
                  options: ['"Quill" literally means a feather pen', 'vocabulary in context'],
                  hint: 'Review the "Personification" section in c11_eng_w_cbse_14_008 and practice with the "Reed.',
                  misconception: 'Students often believe "vocabulary in context" means finding a synonym that fits the sentence grammatically.' },
                { id: 'd', prompt: 'Compare the connotations of "servant" in the lines "I am not the only one / Working for her / She has many servants" with the reed\'s statement "I too am her.', answer: 'Initially "servant" suggests the poet\'s humble devotion',
                  options: ['Initially "servant" suggests the poet\'s humble devotion', 'vocabulary in context'],
                  hint: 'Review the "Personification" section in c11_eng_w_cbse_14_008 and practice with the "Reed.',
                  misconception: 'Students often believe "vocabulary in context" means finding a synonym that fits the sentence grammatically.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Have the student re-read only the stanza containing the target word and list every noun, verb, and adjective near it.', 'Ask: "If this word were removed, what would the line lose?" 3.', 'Provide a two-column table: Literal Meaning vs.', 'Poetic Function; fill it together for "quill" and "reed".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_011', difficulty: 'standard',
          question: 'Language and style in \'Mother Tongue\' — how the writer chose words, sentences.',
          hint: 'Review Class 6 Grammar: Sentence Structure and Types of Sentences (c6_english_u4_038) and.',
          misconception: 'Students equate "language usage" with "difficult vocabulary" or "figures of speech" (simile, metaphor) and overlook.',
          parts: [
                { id: 'a', prompt: 'APPLY: Below is a new four-line stanza. Identify every imperative structure and explain how each creates urgency. "Listen, river, speak to me.', answer: 'Imperatives: "Listen," "speak," "Flow faster," "reach," "Carry," "do not pause,"',
                  options: ['Imperatives: "Listen," "speak," "Flow faster," "reach," "Carry," "do not pause,"', 'Listen', 'Flow faster'],
                  hint: 'Review Class 6 Grammar: Sentence Structure and Types of Sentences (c6_english_u4_038) and Class 6.',
                  misconception: 'Students equate "language usage" with "difficult vocabulary" or "figures of speech" (simile, metaphor) and overlook *syntax*—sentence type.' }
          ],
            remediations: { 'students-equate-language-usage-with': { steps: ['**Re-teach sentence types in context**: Give the student three lines from the poem; have them label each.', '**Verb-swap exercise**: Replace "cut off its hand" with "broke off a branch" and "gave" with "dropped"; ask how the.', '**Pronoun mapping**: Create a two-column table: Subject Pronoun → Referent (he→reed, she→Dogri, I→poet, we→servants).', 'Have the student explain why "she" for a language matters.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Mother Tongue\' — questions answered straight from the.',
          hint: 'Review the PEEL answer structure (Point, Evidence, Explanation, Link) from c8_engl_ch1_17.',
          misconception: 'Students often treat inferential questions as "opinion questions" where any creative answer is acceptable.',
          parts: [
                { id: 'a', prompt: 'Given the lines "The reed cut off its hand / Gave it to me and said / Take it / I too am her servant," infer why the reed refers to itself as a servant of the.', answer: 'The reed personifies itself as a willing servant',
                  options: ['The reed personifies itself as a willing servant', 'the reed is a person', 'what do you feel?'],
                  hint: 'Review the PEEL answer structure (Point, Evidence, Explanation, Link) from c8_engl_ch1_17 and.',
                  misconception: 'Students often treat inferential questions as "opinion questions" where any creative answer is acceptable.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['Give the student a two-column table: Column A lists 5 literal questions from the poem, Column B lists 5 inferential.', 'Ask them to label each and underline the keywords that signaled the type.', 'For each inferential question, have them list 2-3 exact textual clues (line references) before writing the answer.', 'Practice converting a literal fact ("reed gives hand") into an inference ("reed is devoted") by explicitly stating the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
