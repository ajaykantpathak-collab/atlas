import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch08_p1: SimDef = {
    id: 'v3_c12_eng_k_ch08_p1',
    title: 'Poems by Blake (Poem) · Part 1/3',
    subtitle: 'One soul, two songs — and neither is the correction',
    classLevel: 12, subject: 'eng_k', topic: 'Poems by Blake (Poem) · Part 1/3',
    chapters: ['c12_eng_k_ch08'],
    nodeIds: ['c12_eng_k_cbse_08_001', 'c12_eng_k_cbse_08_002', 'c12_eng_k_cbse_08_003', 'c12_eng_k_cbse_08_004', 'c12_eng_k_cbse_08_005', 'c12_eng_k_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Romantic-era critic', intro: 'A poet-engraver who hated the industrial age wrote two books that disagree with each other — on purpose.', goal: 'Read Blake\'s Songs of Innocence and Experience as contrary states, and see how illuminated printing fuses text and image.' },
    discovery: {
        question: 'Blake writes \'The Divine Image\' praising Mercy, Pity, Peace, Love — then \'The Human Abstract\' showing cruelty growing from the same tree. Did the adult outgrow the child\'s innocence?',
        options: ['No — they\'re \'two contrary states of the human soul,\' simultaneous and warring, not a before-and-after correction', 'Yes — Experience replaced Innocence', 'They\'re unrelated poems', 'Innocence is for children only'],
        answer: 'No — they\'re \'two contrary states of the human soul,\' simultaneous and warring, not a before-and-after correction',
        hook: 'Innocence isn\'t naivety and Experience isn\'t just cynicism — both live in one person at once. And Blake etched his poems into copper himself because the image is part of the argument: illuminated printing was rebellion against art made by machine.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'This node provides the essential historical, biographical, and literary context for William Blake\'s paired poems "The Divine Image" (from *Songs of Innocence*) and "The Human Abstract" (from *Songs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hold both Blakes at once: read The Divine Image\'s prayer beside The Human Abstract\'s trap, then map how the same virtues become \'selfish loves\' when Experience twists them.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you open your textbook and see two poems with almost opposite titles — "The Divine Image" and "The Human Abstract" — by the same poet.',
            decisions: [{ prompt: 'What are the two collections from which the prescribed poems are taken, and what phrase does Blake use to describe the relationship between.', options: [
                { text: 'The poems are taken from *Songs of Innocence* ("The Divine Image") and *Songs of', outcome: 'The poems are taken from *Songs of Innocence* ("The Divine Image") and *Songs of Experience* ("The.' },
                { text: 'the two contrary states of the human soul', outcome: 'Not quite — Students often think "Innocence" = good/naive and "Experience" = bad/corrupt, so they read *The.', reveals: 'innocence-good-naive-and-experience' },
                { text: 'contrary states', outcome: 'Not quite — Students often think "Innocence" = good/naive and "Experience" = bad/corrupt, so they read *The.', reveals: 'innocence-good-naive-and-experience' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a time-lapse video of a building being constructed and then demolished — that\'s what Blake does with human virtue across these two.',
            decisions: [{ prompt: 'What is the stanza-by-stanza logical progression in *The Divine Image*?', options: [
                { text: 'Correct answer: Stanza 1 establishes the four virtues (Mercy, Pity, Peace, Love) as', outcome: 'Correct answer: Stanza 1 establishes the four virtues (Mercy, Pity, Peace, Love) as objects.' },
                { text: 'plot and narrative structure', outcome: 'Not quite — Students believe "plot and narrative structure" in poetry means identifying a story with characters.', reveals: 'plot-and-narrative-structure-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into two rooms: one is sunlit, quiet, and smells of flowers; the other is dim, smells of damp earth, and you hear a faint buzzing of insects.',
            decisions: [{ prompt: 'What is the metaphorical setting of "The Divine Image" and how does it differ from the setting of "The Human Abstract"?', options: [
                { text: 'The Divine Image locates virtues in the **human heart, face, form, and dress**', outcome: 'The Divine Image locates virtues in the **human heart, face, form, and dress** — the body as.' },
                { text: 'both are set in a church', outcome: 'Not quite — **Misconception:** "Setting in poetry always means a physical place like a village, forest,.', reveals: 'misconception-setting-in-poetry-always' },
                { text: 'both are set in nature', outcome: 'Not quite — **Misconception:** "Setting in poetry always means a physical place like a village, forest,.', reveals: 'misconception-setting-in-poetry-always' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are a director casting a play where the actors are not people but ideas: Mercy, Cruelty, Deceit. How would you costume them?',
            decisions: [{ prompt: 'List the four virtues personified in "The Divine Image" and the human attribute assigned to each (heart, face, form, dress).', options: [
                { text: 'Mercy → human heart', outcome: 'Mercy → human heart; Pity → human face; Love → human form divine; Peace → human dress.' },
                { text: 'The Human Abstract', outcome: 'Not quite — Students treat the personified virtues/vices as static symbols (e.g., "Mercy = kindness") rather.', reveals: 'students-treat-the-personified-virtues' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are listening to two sides of a debate: one voice says humans are naturally good and godly, the other says our goodness is twisted by society.',
            decisions: [{ prompt: 'What are the four virtues named in the first stanza of "The Divine Image"?', options: [
                { text: 'The four virtues are Mercy, Pity, Peace, and Love', outcome: 'The four virtues are Mercy, Pity, Peace, and Love. A wrong answer (e.g., listing Faith, Hope.' },
                { text: 'The Human Abstract', outcome: 'Not quite — Students often think "The Human Abstract" portrays the virtues as inherently evil.', reveals: 'the-human-abstract-portrays-the' },
                { text: 'Faith, Hope, Charity', outcome: 'Not quite — Students often think "The Human Abstract" portrays the virtues as inherently evil.', reveals: 'the-human-abstract-portrays-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An NGO head notices their flagship \'compassion programme\' quietly depends on keeping beneficiaries visibly needy for donors. Nobody wants to say it aloud.',
            decisions: [{ prompt: 'What would Blake\'s paired poems flag here?', options: [
                { text: 'That a \'virtue\' feeding on others\' misery is already corrupt — \'The Human Abstract\' shows pity engineered by those who need poverty to continue; redesign for dignity and self-sufficiency.', outcome: 'Blake\'s contrary states: the same organisation can house innocent intention and experienced cynicism — examine which your structure actually rewards.' },
                { text: 'Nothing — compassion is compassion; don\'t overthink a good deed.', outcome: 'The Divine Image taken alone misses that unexamined virtue can be manufactured by the very suffering it claims to relieve.', reveals: 'virtue-without-examination' },
                { text: 'Shut it down — all organised charity is hidden cynicism.', outcome: 'Blake doesn\'t crown Experience as truth; he shows both states are human and the task is integration, not abandonment.', reveals: 'experience-is-superior' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a poet\'s contradictions as dialectic, not confusion — Blake teaches that the divided soul is the honest one.',
            decisions: [{ prompt: 'What comes next? Poems by Blake (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Poems by Blake (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_001', difficulty: 'standard',
          question: 'This node provides the essential historical, biographical, and literary context.',
          hint: 'If stuck, review the "Before You Read" section of any Class 11 Hornbill/Snapshot chapter.',
          misconception: 'Students often think "Innocence" = good/naive and "Experience" = bad/corrupt, so they read *The Divine Image* as "the.',
          parts: [
                { id: 'a', prompt: 'What are the two collections from which the prescribed poems are taken, and what phrase does Blake use to describe the relationship between them?', answer: 'The poems are taken from *Songs of Innocence* ("The Divine Image") and *Songs of',
                  options: ['The poems are taken from *Songs of Innocence* ("The Divine Image") and *Songs of', 'the two contrary states of the human soul', 'contrary states', 'Innocence'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Hornbill/Snapshot chapter (e.g.',
                  misconception: 'Students often think "Innocence" = good/naive and "Experience" = bad/corrupt, so they read *The Divine Image* as "the happy poem" and *The.' },
                { id: 'b', prompt: 'In your own words, explain why Blake\'s method of "illuminated printing" (etching text and illustrations on the same copper plate) matters for interpreting his.', answer: 'Illuminated printing means the visual design and the verbal text are conceived',
                  options: ['Illuminated printing means the visual design and the verbal text are conceived', 'it just makes the book look pretty', 'Innocence', 'Experience'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Hornbill/Snapshot chapter (e.g.',
                  misconception: 'Students often think "Innocence" = good/naive and "Experience" = bad/corrupt, so they read *The Divine Image* as "the happy poem" and *The.' }
          ],
            remediations: { 'innocence-good-naive-and-experience': { steps: ['If a student cannot articulate the "contrary states" concept after this node, have them: (1) Re‑read the textbook\'s.', '(3) Complete a 5‑minute writing exercise: "Describe a time you felt both hopeful and cynical about the same issue — how.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Innocence" = good/naive and "Experience" = bad/corrupt, so they read *The Divine Image* as "the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Songs of Innocence presents a childish, idealistic worldview that Blake outgrew and corrected in Songs of Experience." Use evidence from.', answer: 'The claim is false',
                  options: ['The claim is false', 'Innocence', 'Experience', 'the happy poem'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Hornbill/Snapshot chapter (e.g.',
                  misconception: 'Students often think "Innocence" = good/naive and "Experience" = bad/corrupt, so they read *The Divine Image* as "the happy poem" and *The.' }
          ],
            remediations: { 'innocence-good-naive-and-experience': { steps: ['If a student cannot articulate the "contrary states" concept after this node, have them: (1) Re‑read the textbook\'s.', '(3) Complete a 5‑minute writing exercise: "Describe a time you felt both hopeful and cynical about the same issue — how.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to the organized progression.',
          hint: 'If stuck, review c11_eng_h_cbse_08_002 (single-poem stanza progression) and.',
          misconception: 'Students believe "plot and narrative structure" in poetry means identifying a story with characters and events like.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "narrative arc" to *The Human Abstract*: trace how the poem moves from abstract concept to concrete image to final revelation.', answer: 'Correct answer: The poem begins with abstract logic (stanza 1: virtues require',
                  options: ['Correct answer: The poem begins with abstract logic (stanza 1: virtues require', 'holy fears', 'plot and narrative structure'],
                  hint: 'If stuck, review c11_eng_h_cbse_08_002 (single-poem stanza progression) and c12_eng_k_cbse_08_001.',
                  misconception: 'Students believe "plot and narrative structure" in poetry means identifying a story with characters and events like in prose.' }
          ],
            remediations: { 'plot-and-narrative-structure-in': { steps: ['If the student cannot distinguish poetic narrative structure from prose plot: 1) Have them outline *The Divine Image*.', '2) Do the same for *The Human Abstract*: Premise 1 (virtues need suffering) → Mechanism (fear → cruelty) → Growth (tree.', '3) Ask: "Where is the \'character\' in this?', 'Where is the \'conflict\'?" 4) Re-read both poems aloud, pausing after each stanza to name its *function* in the argument.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_003', difficulty: 'standard',
          question: 'In poetry, **setting** refers to the time, place, and social environment where.',
          hint: 'If the student cannot distinguish the two atmospheres, have them read only the **first.',
          misconception: '**Misconception:** "Setting in poetry always means a physical place like a village, forest, or room.',
          parts: [
                { id: 'a', prompt: 'What is the metaphorical setting of "The Divine Image" and how does it differ from the setting of "The Human Abstract"?', answer: 'The Divine Image locates virtues in the **human heart, face, form, and dress**',
                  options: ['The Divine Image locates virtues in the **human heart, face, form, and dress**', 'both are set in a church', 'both are set in nature'],
                  hint: 'If the student cannot distinguish the two atmospheres, have them read only the **first and last.',
                  misconception: '**Misconception:** "Setting in poetry always means a physical place like a village, forest, or room.' },
                { id: 'b', prompt: 'Explain in your own words how the repetition of "Mercy, Pity, Peace, and Love" in The Divine Image creates a different atmosphere from the progression "Pity →.', answer: 'In The Divine Image, the **unchanging repetition** of the four virtues creates a',
                  options: ['In The Divine Image, the **unchanging repetition** of the four virtues creates a', 'both use repetition', 'both list virtues'],
                  hint: 'If the student cannot distinguish the two atmospheres, have them read only the **first and last.',
                  misconception: '**Misconception:** "Setting in poetry always means a physical place like a village, forest, or room.' }
          ],
            remediations: { 'misconception-setting-in-poetry-always': { steps: ['** Re-read both poems aloud, tapping the rhythm (da-DUM da-DUM...). **', '** Draw two columns: "Body Parts in The Divine Image" and "Mental/Abstract Spaces in The Human Abstract." Fill them.', '** For each item, write one adjective describing the *feeling* it evokes (e.g., heart → warm; brain → cold). **', '** Re-attempt Diagnostic Question 1 and 4. If still stuck, revisit **c11_eng_h_cbse_01_003** (Class 11 Hornbill.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_004', difficulty: 'standard',
          question: 'In poetry, character analysis examines the speaker/persona, personified.',
          hint: 'If stuck, review Class 11 node c11_eng_h_cbse_01_004 (Character Analysis: Protagonist).',
          misconception: 'Students treat "character analysis" in poetry as identifying a narrator or speaker with a name and biography.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "contrary states" to compare the depiction of Peace in both poems. How does Peace function differently as a "character" in each?', answer: 'In "The Divine Image," Peace is "the human dress"',
                  options: ['In "The Divine Image," Peace is "the human dress"', 'Peace is good in the first poem and bad in the second', 'says "Peace is good in the first poem and bad in the second" oversimplifies'],
                  hint: 'If stuck, review Class 11 node c11_eng_h_cbse_01_004 (Character Analysis: Protagonist) for the.',
                  misconception: 'Students treat "character analysis" in poetry as identifying a narrator or speaker with a name and biography.' }
          ],
            remediations: { 'students-treat-character-analysis-in': { steps: ['If the student insists on finding a human narrator, guide them through this sequence: (1) Re-read both poems and.', '(2) Ask: "Who performs actions in these poems?" — Mercy "has a heart," Pity "would be no more," Cruelty "knits.', '(4) Assign a micro-task: write a two-sentence "character sketch" of Cruelty as if it were a person in a play, using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_005', difficulty: 'standard',
          question: 'In Blake\'s paired poems, supporting characters are the personified virtues.',
          hint: 'Review "Literary Devices: Imagery and Metaphor" (c12_eng_k_cbse_08_008) for.',
          misconception: 'Students treat the personified virtues/vices as static symbols (e.g., "Mercy = kindness") rather than dynamic.',
          parts: [
                { id: 'a', prompt: 'List the four virtues personified in "The Divine Image" and the human attribute assigned to each (heart, face, form, dress).', answer: 'Mercy → human heart',
                  options: ['Mercy → human heart', 'The Human Abstract'],
                  hint: 'Review "Literary Devices: Imagery and Metaphor" (c12_eng_k_cbse_08_008) for personification drills.',
                  misconception: 'Students treat the personified virtues/vices as static symbols (e.g., "Mercy = kindness") rather than dynamic characters in a causal drama.' }
          ],
            remediations: { 'students-treat-the-personified-virtues': { steps: ['Re-read both poems aloud, circling every capitalized noun that performs a verb (knits, waters, grows, spreads, bears.', 'Make a two-column table: Column A = Virtue/Vice, Column B = Verb/Action.', 'For each row, write one sentence: "In the poem, [X] [verbs] because [cause from text]."', 'Re-attempt Diagnostic Question 3. If still stuck, revisit c12_eng_k_cbse_08_008 (Imagery and Metaphor) for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_006', difficulty: 'standard',
          question: 'The primary theme of Blake\'s paired poems "The Divine Image" and "The Human.',
          hint: 'Review the Class 11 theme nodes (e.g., c11_eng_h_cbse_01_006) for the method.',
          misconception: 'Students often think "The Human Abstract" portrays the virtues as inherently evil.',
          parts: [
                { id: 'a', prompt: 'What are the four virtues named in the first stanza of "The Divine Image"?', answer: 'The four virtues are Mercy, Pity, Peace, and Love',
                  options: ['The four virtues are Mercy, Pity, Peace, and Love', 'The Human Abstract', 'Faith, Hope, Charity', '"The Human Abstract" portrays the virtues as inherently evil'],
                  hint: 'Review the Class 11 theme nodes (e.g., c11_eng_h_cbse_01_006) for the method of extracting theme.',
                  misconception: 'Students often think "The Human Abstract" portrays the virtues as inherently evil.' },
                { id: 'b', prompt: 'Apply the concept of "contrary states" to explain why "Pity would be no more / If we did not make somebody Poor" in "The Human Abstract."', answer: 'In the state of Experience, pity arises only from inequality',
                  options: ['In the state of Experience, pity arises only from inequality', 'The Human Abstract', '"The Human Abstract" portrays the virtues as inherently evil'],
                  hint: 'Review the Class 11 theme nodes (e.g., c11_eng_h_cbse_01_006) for the method of extracting theme.',
                  misconception: 'Students often think "The Human Abstract" portrays the virtues as inherently evil.' },
                { id: 'c', prompt: 'Analyze how the "Tree" in "The Human Abstract" grows from the seeds of the four virtues.', answer: 'The tree grows as follows: mutual fear creates a fragile peace',
                  options: ['The tree grows as follows: mutual fear creates a fragile peace', 'The Human Abstract', 'lists stages without causal links shows superficial reading', '"The Human Abstract" portrays the virtues as inherently evil'],
                  hint: 'Review the Class 11 theme nodes (e.g., c11_eng_h_cbse_01_006) for the method of extracting theme.',
                  misconception: 'Students often think "The Human Abstract" portrays the virtues as inherently evil.' }
          ],
            remediations: { 'the-human-abstract-portrays-the': { steps: ['If the student holds this misconception, have them re-read both poems side by side, highlighting every occurrence.', 'Ask: "In which poem does each virtue appear as a pure quality?', 'In which does it become a mechanism of control?" Then guide them to note that the same words appear in both, but the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
