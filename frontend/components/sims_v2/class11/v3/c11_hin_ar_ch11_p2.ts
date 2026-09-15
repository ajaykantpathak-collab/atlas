import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch11_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch11_p2',
    title: 'èkeZohj Hkkjrh · Part 2/3',
    subtitle: 'Walk through a remembered home that slowly relocates inside the speaker.',
    classLevel: 11, subject: 'hin_ar', topic: 'èkeZohj Hkkjrh · Part 2/3',
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
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, motifs, or messages that run parallel to the primary theme in a literary work, enriching the text by adding layers of meaning, exploring related human.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split the poem into its three phases — physical house, human presence, internal landscape — and test what the circular ending gains.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are sitting in a hostel room far from home, and a sudden smell of rain on dry earth (mitti ki khushboo) transports you back to your childhood.',
            decisions: [{ prompt: 'What is the difference between imagery and metaphor? Give one example of each from the poem "Ghar ki Yaad" (you may describe the example.', options: [
                { text: 'Imagery refers to descriptive language that appeals to the five senses (e.g., the visual', outcome: 'Imagery refers to descriptive language that appeals to the five senses (e.g., the visual image.' },
                { text: 'confuses the two (e', outcome: 'Not quite — Students often think that any descriptive phrase is imagery, and any comparison is a metaphor.', reveals: 'any-descriptive-phrase-is-imagery' },
                { text: 'any descriptive phrase is imagery, and any comparison is a metaphor', outcome: 'Not quite — Students often think that any descriptive phrase is imagery, and any comparison is a metaphor.', reveals: 'any-descriptive-phrase-is-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are sitting in a new city, far from your childhood home, and you see a house that looks exactly like yours but feels completely unfamiliar.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example of each from everyday life (not from the poem).', options: [
                { text: 'Irony: A situation where the opposite of what is expected happens (e.g., a fire station', outcome: 'Irony: A situation where the opposite of what is expected happens (e.g., a fire station burning.' },
                { text: 'not home', outcome: 'Not quite — Students often think irony in this poem is only about the physical distance from home, missing the.', reveals: 'irony-in-this-poem-is' },
                { text: 'symbolism is just decoration, not representation', outcome: 'Not quite — Students often think irony in this poem is only about the physical distance from home, missing the.', reveals: 'irony-in-this-poem-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a WhatsApp message from a friend: "Ghar aaj bahut yaad aa raha hai." You instantly know "ghar" here doesn\'t just mean a building with.',
            decisions: [{ prompt: 'Define the term \'uouhr\' (ऊउहर) as used in the line "cfgu vkbZ cki osQ ?kj" and explain why the poet chooses this specific Tadbhav word over.', options: [
                { text: '\'uouhr\' is a Tadbhav (तद्भव) word derived from Sanskrit \'anath\', meaning \'orphan\' or', outcome: '\'uouhr\' is a Tadbhav (तद्भव) word derived from Sanskrit \'anath\', meaning \'orphan\' or \'helpless\'.' },
                { text: 'it just means orphan', outcome: 'Not quite — Students treat \'Vocabulary in Context\' as "find the synonym from the options given." They memorize.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine a friend telling you about a childhood home: "I *lived* there. I *played* in that courtyard.',
            decisions: [{ prompt: 'Explain in your own words how a poet\'s choice of tense (past, present, future) shapes the reader\'s experience of a poem about memory.', options: [
                { text: 'Past tense creates distance', outcome: 'Past tense creates distance — the event is over, the speaker is separated from it by time, and the.' },
                { text: 'when the action happens', outcome: 'Not quite — Students treat grammar as a *separate layer* from meaning — they analyze "what the poem says".', reveals: 'students-treat-grammar-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you receive a text from a friend: "Reached station. Train late." Literal: friend is at station, train is delayed.',
            decisions: [{ prompt: 'Identify the type of question: "कविता में \'पिता\' शब्द कितनी बार आया है?" (How many times does the word \'father\' appear in the poem?)', options: [
                { text: 'This is a **literal** question', outcome: 'This is a **literal** question because the answer can be found by directly counting the occurrences.' },
                { text: 'counting/retrieving', outcome: 'Not quite — Students believe "inferential" means "write your feelings about the poem." They write: "I feel sad.', reveals: 'inferential-means-write-your-feelings' },
                { text: 'interpreting', outcome: 'Not quite — Students believe "inferential" means "write your feelings about the poem." They write: "I feel sad.', reveals: 'inferential-means-write-your-feelings' }
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
            decisions: [{ prompt: 'What comes next? èkeZohj Hkkjrh · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — èkeZohj Hkkjrh · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, motifs, or messages that run.',
          hint: 'If stuck, review the distinction between "topic" (e.g., mother) and "theme" (e.g.',
          misconception: 'Students often confuse **secondary themes with mere topics or motifs**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying ideas, motifs, or messages that run parallel to the',
                  options: ['Secondary themes are the underlying ideas, motifs, or messages that run parallel to the', '"Before You Read: Context and Background" is a preparatory stage where students gather', 'Narrative structure in poetry refers to the organized sequence of stanzas, images, and', 'Setting refers to the physical, temporal, and social backdrop against which the poem\'s'],
                  hint: 'If stuck, review the distinction between "topic" (e.g., mother) and "theme" (e.g., maternal.',
                  misconception: 'Students often confuse **secondary themes with mere topics or motifs**.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['** Give the student a list of 5 nouns from the poem (mother, father, house, children, stove).', '** Provide two model thematic statements (one primary, one secondary) and ask the student to label them and justify.', '** Have the student re-read stanzas 4-6 (mother\'s description) and 7-9 (father\'s absence) and write one thematic.', '** If still stuck, use the "So what?" ladder: "The poem mentions the stove." -> "So what?" -> "The mother works at the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid and descriptive language that appeals to the senses.',
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
          question: 'Irony is a literary device where the intended meaning of words is opposite.',
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
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
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
          question: 'Grammar in the context of literary analysis refers to the study of how.',
          hint: 'If the student cannot connect grammar to emotion, return to node 006 (Theme) and.',
          misconception: 'Students treat grammar as a *separate layer* from meaning — they analyze "what the poem says" (content) and "what.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how a poet\'s choice of tense (past, present, future) shapes the reader\'s experience of a poem about memory.', answer: 'Past tense creates distance',
                  options: ['Past tense creates distance', 'when the action happens'],
                  hint: 'If the student cannot connect grammar to emotion, return to node 006 (Theme) and re-establish the.',
                  misconception: 'Students treat grammar as a *separate layer* from meaning — they analyze "what the poem says" (content) and "what devices it uses".' }
          ],
            remediations: { 'students-treat-grammar-as-a': { steps: ['Select a key stanza from the poem. Have the student identify every verb and label its tense (past, present, future).', 'Have the student mark every repeated word or phrase in the stanza. Ask: "Is the repetition exact or varied?', 'Have the student identify the sentence boundaries — where does each sentence start and end? Are there fragments?', 'Have the student rewrite the stanza in a single tense, without repetition, in complete sentences.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving information explicitly.',
          hint: 'If stuck, review the annotated summary of stanzas 2, 5, and 8 from node 002 (Plot) and.',
          misconception: 'Students believe "inferential" means "write your feelings about the poem." They write: "I feel sad because the house.',
          parts: [
                { id: 'a', prompt: 'Identify the type of question: "कविता में \'पिता\' शब्द कितनी बार आया है?" (How many times does the word \'father\' appear in the poem?)', answer: 'This is a **literal** question',
                  options: ['This is a **literal** question', 'counting/retrieving', 'interpreting', 'inferential'],
                  hint: 'If stuck, review the annotated summary of stanzas 2, 5, and 8 from node 002 (Plot) and the imagery.',
                  misconception: 'Students believe "inferential" means "write your feelings about the poem." They write: "I feel sad because the house is gone" instead.' },
                { id: 'b', prompt: 'Explain in your own words why the poet describes the house as "यादों का घर" (house of memories) rather than just "मेरा घर" (my house).', answer: 'This is an **inferential** question',
                  options: ['This is an **inferential** question', 'because the poet likes memories', 'inferential', 'write your feelings about the poem'],
                  hint: 'If stuck, review the annotated summary of stanzas 2, 5, and 8 from node 002 (Plot) and the imagery.',
                  misconception: 'Students believe "inferential" means "write your feelings about the poem." They write: "I feel sad because the house is gone" instead.' },
                { id: 'c', prompt: 'Compare the literal meaning of "नक्शा" (map) in the line "नक्शा बना लिया था" with its inferred symbolic meaning in the context of the poem\'s theme.', answer: '**Literal:** A physical architectural plan drawn by the father',
                  options: ['**Literal:** A physical architectural plan drawn by the father', 'map means plan', 'inferential', 'write your feelings about the poem'],
                  hint: 'If stuck, review the annotated summary of stanzas 2, 5, and 8 from node 002 (Plot) and the imagery.',
                  misconception: 'Students believe "inferential" means "write your feelings about the poem." They write: "I feel sad because the house is gone" instead.' }
          ],
            remediations: { 'inferential-means-write-your-feelings': { steps: ['**Re-anchor:** Give the student 3 explicit lines from the poem.', 'Ask: "What does this line *say*?" (Literal).', '**Bridge:** Ask: "What does this line *suggest* about the father/poet/time?" Force them to use the stem: "The line \'X\'.', '**Categorize:** Present 5 mixed questions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
