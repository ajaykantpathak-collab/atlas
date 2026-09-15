import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch09_p3: SimDef = {
    id: 'v3_c12_eng_k_ch09_p3',
    title: 'Poems by Wordsworth (Poem) · Part 3/3',
    subtitle: '300 lines dreamed, a knock at the door, and a poem left unfinished on purpose',
    classLevel: 12, subject: 'eng_k', topic: 'Poems by Wordsworth (Poem) · Part 3/3',
    chapters: ['c12_eng_k_ch09'],
    nodeIds: ['c12_eng_k_cbse_09_013', 'c12_eng_k_cbse_09_014', 'c12_eng_k_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Romantic poetry critic', intro: 'An emperor\'s pleasure-dome, an opium dream, one ill-timed visitor — and English literature\'s most famous fragment.', goal: 'Read Kubla Khan through its dream composition, Romantic aims and the power of the unfinished fragment.' },
    discovery: {
        question: 'Coleridge dreams 300 perfect lines of Kubla Khan, wakes, writes — and a \'person from Porlock\' knocks. The rest vanishes forever. Is that a tragedy for literature?',
        options: ['Maybe the opposite — the fragment perfectly performs the Romantic idea that imagination outruns any page; its incompleteness is the aesthetic', 'Pure tragedy — half a masterpiece lost', 'It was never a real dream anyway', 'He should have locked the door'],
        answer: 'Maybe the opposite — the fragment perfectly performs the Romantic idea that imagination outruns any page; its incompleteness is the aesthetic',
        hook: 'Coleridge\'s aim was \'presenting the supernatural as real\' — Xanadu\'s dome, the sacred river, the demon-lover told flat as fact. Where Wordsworth made the ordinary strange, Coleridge made the strange ordinary. The fragment isn\'t broken; it\'s a glimpse of infinity the page couldn\'t hold.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves evaluating a text\'s deeper meanings by examining how language, structure, and context interact to produce effects, rather than merely summarizing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_09_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter Xanadu as a Romantic: place the real Mongol emperor beside the dream palace, weigh the Porlock knock as loss or gift, and read how the supernatural gets narrated like a news report.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are asked: "Why does Coleridge end \'Kubla Khan\' with a warning — \'Beware!',
            decisions: [{ prompt: 'What is the subtitle of the poem "Kubla Khan" as given in the NCERT text, and what does it suggest about the poem\'s composition?', options: [
                { text: 'The subtitle is "A Vision in a Dream: A Fragment"', outcome: 'The subtitle is "A Vision in a Dream: A Fragment". It suggests the poem originated in a dream state.' },
                { text: 'A Vision in a Dream: A Complete Poem', outcome: 'Not quite — Students often treat "Kubla Khan" as a straightforward narrative about a historical emperor and his.', reveals: 'students-often-treat-kubla-khan' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: "Analyse how Coleridge uses contrasting imagery to present the creative process in Kubla Khan." Your.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers, and what is the purpose of each component?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. Point states the main argument; Evidence.' },
                { text: 'Point, Example, Explain, Leave', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the poem\'s story.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the poem\'s story.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a literature circle discussing "The World Is Too Much With Us" and a classmate says, "Wordsworth just hates cities." How do you move beyond.',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a Class 12 literature speaking-listening task?', options: [
                { text: 'A discussion point is a prepared, textually anchored observation or question designed to', outcome: 'A discussion point is a prepared, textually anchored observation or question designed to deepen.' },
                { text: 'sharing what I feel about the poem', outcome: 'Not quite — Students believe a good discussion contribution is a long, fluent speech expressing personal.', reveals: 'a-good-discussion-contribution-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A writer is mid-flow on a dazzling draft when a \'person from Porlock\' — a routine visitor — breaks the trance; the vision never fully returns.',
            decisions: [{ prompt: 'What does the Kubla Khan story teach a team managing creative work?', options: [
                { text: 'Protect uninterrupted flow — Coleridge\'s lost dream shows a vision in motion can\'t simply be \'resumed later\'; guard creative trance and capture what\'s salvageable rather than demanding instant re-entry.', outcome: 'The fragment is a wound, not a design: interruption destroyed the vision, and the surviving piece is still worth keeping.' },
                { text: 'No protection needed — you can always pick a thought back up where you left it.', outcome: 'Coleridge tried for hours and got only fragments; vision in flow is not a parked car.', reveals: 'flow-is-resumable' },
                { text: 'Discard the fragment — unfinished work is failed work.', outcome: 'Kubla Khan became a touchstone precisely as a fragment; incompleteness can still be monumental.', reveals: 'incomplete-means-worthless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You can now defend a fragment as a finished statement — and tell vision from fancy. The dome in air was never meant to be completed.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves evaluating a text\'s deeper.',
          hint: 'If stuck, return to c12_eng_k_cbse_09_008 (Literary Devices: Imagery and Metaphor) and.',
          misconception: 'Students often treat "Kubla Khan" as a straightforward narrative about a historical emperor and his palace, ignoring.',
          parts: [
                { id: 'a', prompt: 'What is the subtitle of the poem "Kubla Khan" as given in the NCERT text, and what does it suggest about the poem\'s composition?', answer: 'The subtitle is "A Vision in a Dream: A Fragment"',
                  options: ['The subtitle is "A Vision in a Dream: A Fragment"', 'A Vision in a Dream: A Complete Poem'],
                  hint: 'If stuck, return to c12_eng_k_cbse_09_008 (Literary Devices: Imagery and Metaphor) and.',
                  misconception: 'Students often treat "Kubla Khan" as a straightforward narrative about a historical emperor and his palace, ignoring the poem\'s.' }
          ],
            remediations: { 'students-often-treat-kubla-khan': { steps: ['If the student cannot move beyond plot summary: (1) Have them re-read only the final stanza and answer: "Who is \'I\'?', 'What is the \'dome in air\'?', 'Why \'Beware\'?" (2) Map the poem\'s pronouns on paper: circle every "he/his" (Kubla) and "I/me" (poet).', '(3) Ask: "Which builder succeeds — Kubla or the poet?" The answer (the poet, through the poem) reveals the meta-theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter refers to the ability to compose.',
          hint: 'If stuck, return to c12_eng_k_cbse_09_008 (Imagery and Metaphor) and practice converting.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the poem\'s story or listing poetic devices.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers, and what is the purpose of each component?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Point, Example, Explain, Leave', 'writing skills based on the chapter', 'naming the device is the answer, when it\'s only the starting point'],
                  hint: 'If stuck, return to c12_eng_k_cbse_09_008 (Imagery and Metaphor) and practice converting each.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the poem\'s story or listing poetic devices with definitions.' },
                { id: 'b', prompt: 'Compare these two responses to "Discuss the significance of the \'damsel with a dulcimer\' in the final stanza." Which is stronger and why?', answer: 'Response B is stronger',
                  options: ['Response B is stronger', 'discuss', 'writing skills based on the chapter', 'naming the device is the answer, when it\'s only the starting point'],
                  hint: 'If stuck, return to c12_eng_k_cbse_09_008 (Imagery and Metaphor) and practice converting each.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the poem\'s story or listing poetic devices with definitions.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student cannot move beyond feature-spotting: (1) Give them a weak answer (device-listing) and a strong answer.', '(2) Model the "So what?" drill: after every quote, ask "So what does this *do* for the reader?" until they articulate.', '(3) Assign a 6-mark question requiring zero device names — only effects and interpretations.', '(4) Revisit c12_eng_k_cbse_09_008 (Imagery and Metaphor) and c12_eng_k_cbse_09_009 (Irony and Symbolism) to rebuild.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the poem\'s story or listing poetic devices.',
          parts: [
                { id: 'a', prompt: 'Evaluate this thesis statement for a critical appreciation essay: "Kubla Khan is a poem about a dream Coleridge had after taking medicine, and it describes.', answer: 'No, this thesis is not exam-ready',
                  options: ['No, this thesis is not exam-ready', 'writing skills based on the chapter', 'naming the device is the answer, when it\'s only the starting point'],
                  hint: 'If stuck, return to c12_eng_k_cbse_09_008 (Imagery and Metaphor) and practice converting each.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the poem\'s story or listing poetic devices with definitions.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student cannot move beyond feature-spotting: (1) Give them a weak answer (device-listing) and a strong answer.', '(2) Model the "So what?" drill: after every quote, ask "So what does this *do* for the reader?" until they articulate.', '(3) Assign a 6-mark question requiring zero device names — only effects and interpretations.', '(4) Revisit c12_eng_k_cbse_09_008 (Imagery and Metaphor) and c12_eng_k_cbse_09_009 (Irony and Symbolism) to rebuild.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured practice.',
          hint: 'If stuck, revisit the "Critical Thinking: Analysis and Interpretation" node.',
          misconception: 'Students believe a good discussion contribution is a long, fluent speech expressing personal admiration for the poem\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured practice of orally',
                  options: ['Speaking and Listening: Discussion Points refers to the structured practice of orally', '"Before You Read: Context and Background" for *Kubla Khan* provides the essential', 'Plot and narrative structure in poetry refers to the deliberate arrangement of events,', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'If stuck, revisit the "Critical Thinking: Analysis and Interpretation" node (c12_eng_k_cbse_09_013).',
                  misconception: 'Students believe a good discussion contribution is a long, fluent speech expressing personal admiration for the poem\'s beauty.' }
          ],
            remediations: { 'a-good-discussion-contribution-is': { steps: ['If a student falls into the above misconception: (1) Assign a 5-minute silent re-read of one poem with the instruction.', '(4) Debrief: highlight how the template shifts focus from opinion to analysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
