import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch20_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch20_p2: SimDef = {
    id: 'v3_c11_eng_w_ch20_p2',
    title: 'Ajamil and the Tigers (Poem) · Part 2/3',
    subtitle: 'Read a shepherd\'s treaty with tigers as Emergency-era satire.',
    classLevel: 11, subject: 'eng_w', topic: 'Ajamil and the Tigers (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch20'],
    nodeIds: ['c11_eng_w_cbse_20_007', 'c11_eng_w_cbse_20_008', 'c11_eng_w_cbse_20_009', 'c11_eng_w_cbse_20_010', 'c11_eng_w_cbse_20_011', 'c11_eng_w_cbse_20_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a leader shake paws with predators', intro: 'The tigers came for the sheep; the shepherd fed them lamb chops and called it diplomacy — and the pond got shared.', goal: 'Distinguish fable from satire and read the treaty as managed, not resolved, conflict.' },
    discovery: {
        question: 'Talking animals, rhyming ease, a shepherd and tigers — a children\'s fable with a tidy moral?',
        options: ['No — the fable form is a set-up: the shepherd collaborates with the tigers, making it a satire of political complicity', 'Yes — animal characters always mean a child\'s moral tale', 'Yes — the ending is a happy treaty, so the moral is trust', 'No — but only because of the leather jackets and swear words'],
        answer: 'No — the fable form is a set-up: the shepherd collaborates with the tigers, making it a satire of political complicity',
        hook: 'The tiger king lies \'we came as friends,\' Ajamil pretends to believe him — and both know the flock pays for the handshake.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Ajamil and the Tigers\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_20_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split fable, allegory and satire in the poem, spot the dramatic irony in the tiger king\'s lie, and judge whether the shared-pond ending resolves or merely manages the conflict.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Ajamil and the Tigers\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme in terms of function and.', options: [
                { text: 'A secondary theme is a subordinate but significant idea that runs parallel to the primary', outcome: 'A secondary theme is a subordinate but significant idea that runs parallel to the primary theme.' },
                { text: 'minor topics', outcome: 'Not quite — Students often treat "secondary themes" as a checklist of *topics* (friendship, betrayal, animals.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'subplots', outcome: 'Not quite — Students often treat "secondary themes" as a checklist of *topics* (friendship, betrayal, animals.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Ajamil and the Tigers\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from the poem "Ajamil and the Tigers" (do not quote full.', options: [
                { text: 'Imagery: Language appealing to senses (e.g., the tactile "tail in a sling" evokes', outcome: 'Imagery: Language appealing to senses (e.g., the tactile "tail in a sling" evokes physical injury).' },
                { text: 'imagery is just description', outcome: 'Not quite — Students often treat every descriptive phrase as "imagery" and every comparison as "metaphor,".', reveals: 'students-often-treat-every-descriptive' },
                { text: 'metaphor uses like/as', outcome: 'Not quite — Students often treat every descriptive phrase as "imagery" and every comparison as "metaphor,".', reveals: 'students-often-treat-every-descriptive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Ajamil and the Tigers\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define verbal irony and give one example from the poem where the tiger king uses verbal irony after his defeat.', options: [
                { text: 'Verbal irony occurs when a speaker says the opposite of what they mean, often to mock or', outcome: 'Verbal irony occurs when a speaker says the opposite of what they mean, often to mock or deceive.' },
                { text: 'symbolism', outcome: 'Not quite — Students often think "symbolism" means "anything that stands for something else" and list.', reveals: 'symbolism-means-anything-that-stands' },
                { text: 'anything that stands for something else', outcome: 'Not quite — Students often think "symbolism" means "anything that stands for something else" and list.', reveals: 'symbolism-means-anything-that-stands' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Ajamil and the Tigers\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define "vocabulary in context" as a reading skill. How is it different from looking up a word in a dictionary?', options: [
                { text: 'Vocabulary in context means figuring out what a word means *in that specific sentence,', outcome: 'Vocabulary in context means figuring out what a word means *in that specific sentence, spoken.' },
                { text: 'it means finding synonyms', outcome: 'Not quite — Students treat "vocabulary in context" as finding a synonym that fits the sentence grammatically.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Ajamil and the Tigers\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify two examples of non-standard or colloquial grammar used by the Tiger King in the poem and state the grammatical rule each violates.', options: [
                { text: 'Examples: "gonna" (violates standard "going to" future construction) and "I\'ve got it all', outcome: 'Examples: "gonna" (violates standard "going to" future construction) and "I\'ve got it all planned".' },
                { text: 'He cramps our style', outcome: 'Not quite — Students treat "grammar in literature" as spotting errors (e.g., "gonna is wrong") rather than.', reveals: 'students-treat-grammar-in-literature' },
                { text: 'cramps', outcome: 'Not quite — Students treat "grammar in literature" as spotting errors (e.g., "gonna is wrong") rather than.', reveals: 'students-treat-grammar-in-literature' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Ajamil and the Tigers\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "How many', outcome: 'A literal question asks for information directly stated in the text (e.g., "How many tigers were.' },
                { text: 'literal questions are easy and inferential questions are hard', outcome: 'Not quite — Students believe inferential answers are "personal opinions" and can be anything they feel.', reveals: 'inferential-answers-are-personal-opinions' },
                { text: 'personal opinions', outcome: 'Not quite — Students believe inferential answers are "personal opinions" and can be anything they feel.', reveals: 'inferential-answers-are-personal-opinions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school magazine\'s satire issue you submit Kolatkar\'s \'Ajamil and the Tigers\'. The editor returns it: \'Talking animals, treaty over lamb chops — this is a children\'s fable. What\'s it doing in a satire issue?\'',
            decisions: [{ prompt: 'How do you defend the submission?', options: [
                { text: 'Argue that the poem hijacks the fable form to subvert it: written during the Emergency era and drawn from Jejuri, it\'s an allegory where the tiger king is the political class, Ajamil the shepherd is the complicit middle class, and the sheep are the common people. The \'happy ending\' is a corrupt bargain — the shepherd pretends to believe the tigers\' lie and peace is bought with \'gifts of sheep.\' The moral isn\'t a lesson; it\'s a cynical exposé.', outcome: 'The editor sees the weapon under the whimsy: fable surface, allegory underneath — the resolution is exploitation dressed as harmony.' },
                { text: 'Withdraw it — the editor\'s right that animal stories with treaties belong in children\'s pages.', outcome: 'The animal fable surface is the disguise, not the genre: coarse language, treaty politics, and sacrificed sheep mark it as adult satire of a political class.', reveals: 'talking-animals-is-childrens-fable' },
                { text: 'Resubmit it as a poem about wildlife conservation — tigers and sheep learning to share the pond.', outcome: 'The shared pond is a full stomach maintained by exploitation; reading it as harmony repeats Ajamil\'s own self-deception.', reveals: 'treaty-is-happy-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_012', title: 'The bigger picture',
          caseStudy: { intro: 'Well-fed tigers, fat sheep, a flute all day — the peace is real only as long as someone keeps paying for it in mutton.',
            decisions: [{ prompt: 'What comes next? Ajamil and the Tigers (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Ajamil and the Tigers (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_007', difficulty: 'standard',
          question: 'Secondary themes in \'Ajamil and the Tigers\' — the supporting ideas and motifs.',
          hint: 'If unable to distinguish theme from topic, review c11_eng_w_cbse_20_006\'s worked examples.',
          misconception: 'Students often treat "secondary themes" as a checklist of *topics* (friendship, betrayal, animals, treaties) rather.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "complicity" to analyse Ajamil\'s refusal to meet the sheepdog\'s eyes.', answer: 'Step 1: Identify the moment',
                  options: ['Step 1: Identify the moment', 'pretended to believe', 'Ajamil wasn\'t a fool', 'cleverness'],
                  hint: 'If unable to distinguish theme from topic, review c11_eng_w_cbse_20_006\'s worked examples.',
                  misconception: 'Students often treat "secondary themes" as a checklist of *topics* (friendship, betrayal, animals, treaties) rather than as *arguable.' },
                { id: 'b', prompt: 'Compare the "friendship treaty" scene (final stanza) with the opening tiger complaint.', answer: 'The poem opens with tigers starving, demanding access to sheep',
                  options: ['The poem opens with tigers starving, demanding access to sheep', 'ironic ending', 'poetic justice'],
                  hint: 'If unable to distinguish theme from topic, review c11_eng_w_cbse_20_006\'s worked examples.',
                  misconception: 'Students often treat "secondary themes" as a checklist of *topics* (friendship, betrayal, animals, treaties) rather than as *arguable.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If the student lists topics instead of thematic statements: (1) Give them the formula: "Secondary theme = [abstract.', '(4) Check: does the statement make a claim that could be debated?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "secondary themes" as a checklist of *topics* (friendship, betrayal, animals, treaties) rather.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of satire as a vehicle for the secondary theme of **the common man\'s invisibility in political compromise**.', answer: 'The satire *sharpens* the critique by rendering the political theatre absurd',
                  options: ['The satire *sharpens* the critique by rendering the political theatre absurd', 'humour lightens the mood', 'makes it less serious'],
                  hint: 'If unable to distinguish theme from topic, review c11_eng_w_cbse_20_006\'s worked examples.',
                  misconception: 'Students often treat "secondary themes" as a checklist of *topics* (friendship, betrayal, animals, treaties) rather than as *arguable.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If the student lists topics instead of thematic statements: (1) Give them the formula: "Secondary theme = [abstract.', '(4) Check: does the statement make a claim that could be debated?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_008', difficulty: 'standard',
          question: 'Imagery in \'Ajamil and the Tigers\' — the vivid, sensory language that creates.',
          hint: 'Review Class 8 "Poetic Devices: Personification and Imagery in the Nature Poem".',
          misconception: 'Students often treat every descriptive phrase as "imagery" and every comparison as "metaphor," missing that in this.',
          parts: [
                { id: 'a', prompt: 'In the lines "He strung them all out in a daisy chain / and flung them in front of his boss in one big heap," identify the central image and explain what.', answer: 'Central image: the "daisy chain" of tigers flung in a heap',
                  options: ['Central image: the "daisy chain" of tigers flung in a heap', 'simile', 'daisy chain', 'tigers'],
                  hint: 'Review Class 8 "Poetic Devices: Personification and Imagery in the Nature Poem" (c8_engl_ch4_15).',
                  misconception: 'Students often treat every descriptive phrase as "imagery" and every comparison as "metaphor," missing that in this poem, Kolatkar uses.' }
          ],
            remediations: { 'students-often-treat-every-descriptive': { steps: ['Have the student list every sensory phrase in the poem (visual, auditory, tactile, olfactory, gustatory) in.', 'For each, ask: "If this detail were removed, what would the political satire lose?" 3.', 'Then guide them to distinguish the *overarching* allegory (animals = political actors) from *local* metaphors (e.g.', 'Finally, ask them to rewrite one stanza replacing all metaphors with literal political terms to see how the imagery.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Ajamil and the Tigers\' — where opposite things are both.',
          hint: 'If stuck, review the metaphor of "the cherry tree as growth" from Class 8 (c8_engl_ch4_8).',
          misconception: 'Students often think "symbolism" means "anything that stands for something else" and list superficial mappings (tigers.',
          parts: [
                { id: 'a', prompt: 'Analyze how the symbols of "the flute" and "the same pond" function together in the final stanza to represent the corrupt bargain between the political class.', answer: 'The flute symbolizes Ajamil\'s negligent leisure',
                  options: ['The flute symbolizes Ajamil\'s negligent leisure', 'symbolism', 'anything that stands for something else', 'leather jackets'],
                  hint: 'If stuck, review the metaphor of "the cherry tree as growth" from Class 8 (c8_engl_ch4_8) and.',
                  misconception: 'Students often think "symbolism" means "anything that stands for something else" and list superficial mappings (tigers = bad, sheep = good).' }
          ],
            remediations: { 'symbolism-means-anything-that-stands': { steps: ['If a student cannot distinguish irony types, give them a three-column table: Type | Definition | Poem Example.', 'Have them fill it using only the text.', 'For symbolism, ask: "If the tiger king is a corrupt politician, what specific political act does \'signing the treaty\'.', 'What does \'lamb chops\' represent?" Force them to move from character-level to system-level mapping.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Ajamil and the Tigers\' — the words and phrases you must know.',
          hint: 'Review the allegorical mapping in node c11_eng_w_cbse_20_006 (Primary Theme) and the.',
          misconception: 'Students treat "vocabulary in context" as finding a synonym that fits the sentence grammatically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Key vocabulary of \'Ajamil and the Tigers\'',
                  options: ['Key vocabulary of \'Ajamil and the Tigers\'', '\'Ajamil and the Tigers\' (Woven Words, ch', 'The plot/narrative arc of \'Ajamil and the Tigers\'', 'The setting of \'Ajamil and the Tigers\''],
                  hint: 'Review the allegorical mapping in node c11_eng_w_cbse_20_006 (Primary Theme) and the irony analysis.',
                  misconception: 'Students treat "vocabulary in context" as finding a synonym that fits the sentence grammatically.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Re-read the specific stanza aloud.', 'Identify the speaker and their immediate goal.', 'Ask: "Is this speaker lying, mocking, or telling an uncomfortable truth?" 4.', 'Map the characters to the allegory (refer to node c11_eng_w_cbse_20_006).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_011', difficulty: 'standard',
          question: 'Language and style in \'Ajamil and the Tigers\' — how the writer chose words.',
          hint: 'Review Class 6 Grammar nodes: Tenses (u2_018) for verb forms, Sentence Structure (u4_038).',
          misconception: 'Students treat "grammar in literature" as spotting errors (e.g., "gonna is wrong") rather than analyzing *deliberate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'Ajamil and the Tigers\'',
                  options: ['Language and style in \'Ajamil and the Tigers\'', '\'Ajamil and the Tigers\' (Woven Words, ch', 'The plot/narrative arc of \'Ajamil and the Tigers\'', 'The setting of \'Ajamil and the Tigers\''],
                  hint: 'Review Class 6 Grammar nodes: Tenses (u2_018) for verb forms, Sentence Structure (u4_038) for.',
                  misconception: 'Students treat "grammar in literature" as spotting errors (e.g., "gonna is wrong") rather than analyzing *deliberate deviation* for effect.' }
          ],
            remediations: { 'students-treat-grammar-in-literature': { steps: ['Re-read the Tiger King\'s lines aloud twice: once with contractions ("gonna", "I\'ve"), once with full forms ("going to".', 'List every speaker in the poem (tigers, king, queen, narrator, dog, Ajamil).', 'For each, quote one line and label its register (colloquial, formal, narrative).', 'Write one PEEL paragraph: Point—Kolatkar uses non-standard grammar to construct the Tiger King\'s fake populism.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Ajamil and the Tigers\' — questions answered straight.',
          hint: 'If stuck, review the irony node (c11_eng_w_cbse_20_009) to relearn how the poem says one.',
          misconception: 'Students believe inferential answers are "personal opinions" and can be anything they feel.',
          parts: [
                { id: 'a', prompt: 'A question asks: "Why does Ajamil refuse to meet the sheepdog\'s eyes?" Using the poem, list the steps you would take to construct an inferential answer.', answer: 'Step 1: Identify the literal action – Ajamil avoids eye contact',
                  options: ['Step 1: Identify the literal action – Ajamil avoids eye contact', 'Ajamil is shy', 'personal opinions', 'inferential answers are "personal opinions" and can be anything they feel'],
                  hint: 'If stuck, review the irony node (c11_eng_w_cbse_20_009) to relearn how the poem says one thing but.',
                  misconception: 'Students believe inferential answers are "personal opinions" and can be anything they feel.' }
          ],
            remediations: { 'inferential-answers-are-personal-opinions': { steps: ['If a student cannot distinguish inference from opinion, follow these steps: 1) Give them a two-column table: Column.', '2) Use the tiger king\'s "friends" lie: Column A = "We were coming to see you as friends"; Column B = "He lies to save.', '3) Ask them to find three more such pairs in the poem.', '4) Require every inferential answer in homework to include at least one Column A quote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
