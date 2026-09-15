import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch03_p3: SimDef = {
    id: 'v3_c12_hin_a_ch03_p3',
    title: 'osQnkjukFk ¯lg · Part 3/3',
    subtitle: 'The poet who went to jail wrote about a little bird',
    classLevel: 12, subject: 'hin_a', topic: 'osQnkjukFk ¯lg · Part 3/3',
    chapters: ['c12_hin_a_ch03'],
    nodeIds: ['c12_hin_a_cbse_03_013', 'c12_hin_a_cbse_03_014', 'c12_hin_a_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modern Hindi poetry reader', intro: 'A freedom fighter turned editor turned poet — each life sharpened the next. Two poems show the whole arc.', goal: 'Read Vajra\'s two poems through his biography — activism, editorial craft, and the shift from exhortation to observation.' },
    discovery: {
        question: 'A poet jailed in 1942 writes of a small, dear bird begging to be let into a heart — \'इसे भी दिल को दे दो.\' What makes the plea more than birdwatching?',
        options: ['Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness', 'He loved birds', 'It\'s a children\'s poem', 'Sentimentality'],
        answer: 'Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness',
        hook: 'Vajra\'s two poems mark an evolution: the early one exhorts the collective \'you\' to accept the fragile; the later one whispers \'I saw\' — private epiphany replacing public call. Radio editing and Sanskrit-English schooling sharpened the ear that compresses so much into so few words.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of examining a text beyond its literal meaning to uncover deeper layers of significance — evaluating how language, structure, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_03_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track a poet across two registers: weigh the jailed activist\'s communal plea against the solitary observer\'s small epiphany, and hear the refrain built for a listening audience.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re reading "nhi vosQyk" for the first time — the poem repeats "nhi vosQyk" like a chant, but you\'re not sure why the poet insists the nose.',
            decisions: [{ prompt: 'What is the primary difference between a summary of "nhi vosQyk" and a critical analysis of the same poem?', options: [
                { text: 'A summary retells what the poem says (e.g., "The poet describes a small nose and asks for', outcome: 'A summary retells what the poem says (e.g., "The poet describes a small nose and asks for.' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means listing poetic devices (metaphor, alliteration, refrain).', reveals: 'critical-analysis-means-listing-poetic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you open your board exam paper and see: "How does the poet use the image of a small plant to convey resilience?',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for poetry?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe "writing a good answer" means "writing everything I know about the poem." They.', reveals: 'writing-a-good-answer-means' },
                { text: 'writing a good answer', outcome: 'Not quite — Students believe "writing a good answer" means "writing everything I know about the poem." They.', reveals: 'writing-a-good-answer-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a college seminar where the professor asks: "What does this poem *do* to you — and *how* does it do it?" You can\'t just say "it\'s nice".',
            decisions: [{ prompt: 'What is the primary function of the refrain "ij bldks Hkh iafDr dks ns nks" in the poem "nhi vosQyk"?', options: [
                { text: 'The refrain acts as a structural anchor that transforms the poem from a description of a', outcome: 'The refrain acts as a structural anchor that transforms the poem from a description of.' },
                { text: 'it repeats the main idea', outcome: 'Not quite — Students treat "discussion" as *turn-taking monologues*: each person shares a pre-memorized summary.', reveals: 'students-treat-discussion-as-turn' },
                { text: 'I think the poem is about', outcome: 'Not quite — Students treat "discussion" as *turn-taking monologues*: each person shares a pre-memorized summary.', reveals: 'students-treat-discussion-as-turn' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a personality-development workshop, the facilitator insists each student define themselves in one word for the badge. A friend who\'s a painter-cricketer-caregiver freezes: \'None of these fit. Something\'s wrong with me.\'',
            decisions: [{ prompt: 'What do Dangwal\'s poems in this chapter tell her?', options: [
                { text: 'Nothing\'s wrong — \'नहीं वोश्यक\' spends four stanzas piling metaphor on metaphor precisely because identity won\'t sit in one word; each new facet re-reads all the others, and the refrain keeps inviting the search rather than closing it.', outcome: 'The refrain-catalogue structure enacts the refusal to be pinned down — the badge exercise mistakes a list for a person, while the poem shows elusiveness is the truth of a self.' },
                { text: 'Pick the dominant word — everyone has one core trait, and finding it is the point of the exercise.', outcome: 'That\'s the single-label fallacy the poem resists: every metaphor presented as \'the answer\' is immediately reframed by the next, proving the \'one word\' can\'t hold the subject.', reveals: 'one-word-captures-self' },
                { text: 'Skip the badge — since identity can\'t be fixed, the exercise is pointless.', outcome: 'The poem doesn\'t abandon the search — the refrain is an invitation to keep looking, not a verdict that looking is futile; the point is the seeking, not the surrender.', reveals: 'unfixable-means-pointless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You can now read biography as a poetic instrument — and trace one poet\'s arc from barricades to the small bird at the window.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of examining.',
          hint: 'If stuck, return to c12_hin_a_cbse_03_012 (comprehension) and re-do the inferential.',
          misconception: 'Students believe "critical analysis" means listing poetic devices (metaphor, alliteration, refrain) and defining them.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "refrain evolution" to analyze how the repeated line "ij bldks Hkh iafDr dks ns nks" changes in force across the five stanzas of "nhi.', answer: 'Step 1: Identify the refrain in each stanza (appears as last line in all five)',
                  options: ['Step 1: Identify the refrain in each stanza (appears as last line in all five)', 'critical analysis'],
                  hint: 'If stuck, return to c12_hin_a_cbse_03_012 (comprehension) and re-do the inferential questions; then.',
                  misconception: 'Students believe "critical analysis" means listing poetic devices (metaphor, alliteration, refrain) and defining them.' }
          ],
            remediations: { 'critical-analysis-means-listing-poetic': { steps: ['If a student cannot move beyond device identification: 1) Have them re-read the poem with one question: "What is the.', '3) Practice the "So what?" drill: for each device, write one sentence starting "This device shows that..." 4).', 'Revisit node c12_hin_a_cbse_03_008 (imagery) and c12_hin_a_cbse_03_009 (symbolism) to strengthen device-to-meaning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means listing poetic devices (metaphor, alliteration, refrain) and defining them.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The poem \'nhi vosQyk\' is ultimately a failure because it argues for dignity based on utility (the nose as writer, moral agent) rather.', answer: 'Refute',
                  options: ['Refute', 'critical analysis'],
                  hint: 'If stuck, return to c12_hin_a_cbse_03_012 (comprehension) and re-do the inferential questions; then.',
                  misconception: 'Students believe "critical analysis" means listing poetic devices (metaphor, alliteration, refrain) and defining them.' }
          ],
            remediations: { 'critical-analysis-means-listing-poetic': { steps: ['If a student cannot move beyond device identification: 1) Have them re-read the poem with one question: "What is the.', '3) Practice the "So what?" drill: for each device, write one sentence starting "This device shows that..." 4).', 'Revisit node c12_hin_a_cbse_03_008 (imagery) and c12_hin_a_cbse_03_009 (symbolism) to strengthen device-to-meaning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter refers to the ability to compose.',
          hint: 'If stuck on "Explanation" step: revisit c12_hin_a_cbse_03_008 (Imagery/Metaphor) and.',
          misconception: 'Students believe "writing a good answer" means "writing everything I know about the poem." They dump plot summary, poet.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for poetry?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'writing a good answer', 'writing everything I know about the poem'],
                  hint: 'If stuck on "Explanation" step: revisit c12_hin_a_cbse_03_008 (Imagery/Metaphor) and.',
                  misconception: 'Students believe "writing a good answer" means "writing everything I know about the poem." They dump plot summary, poet biography, and.' },
                { id: 'b', prompt: 'A student writes: "In \'nhi vosQyk\', the poet says small things are important because they make life complete." Identify why this answer would score low on.', answer: 'The answer is a mere paraphrase',
                  options: ['The answer is a mere paraphrase', 'writing a good answer', 'writing everything I know about the poem', '"writing a good answer" means "writing everything I know about the poem'],
                  hint: 'If stuck on "Explanation" step: revisit c12_hin_a_cbse_03_008 (Imagery/Metaphor) and.',
                  misconception: 'Students believe "writing a good answer" means "writing everything I know about the poem." They dump plot summary, poet biography, and.' },
                { id: 'c', prompt: 'Compare how the two poems in this chapter treat the concept of "smallness" (nhi / cw¡n). What is the key difference in their thematic focus?', answer: '"nhi vosQyk" treats smallness as *inherent value*',
                  options: ['"nhi vosQyk" treats smallness as *inherent value*', 'both talk about small things', 'writing a good answer', 'writing everything I know about the poem'],
                  hint: 'If stuck on "Explanation" step: revisit c12_hin_a_cbse_03_008 (Imagery/Metaphor) and.',
                  misconception: 'Students believe "writing a good answer" means "writing everything I know about the poem." They dump plot summary, poet biography, and.' }
          ],
            remediations: { 'writing-a-good-answer-means': { steps: ['If a student produces a "knowledge dump" answer: (1) Have them highlight every sentence that directly answers the.', '(2) Give them a 3-sentence template: "The poet uses [device] to show [theme].', 'This works because [analysis]." (3) Practice with one stanza of "nhi vosQyk": question = "How does stanza 2 differ from.', '(4) Re-diagnose with a new question: "Analyze the word \'fo\'okl\' in stanza 3." Check for PEEL compliance.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, return to c12_hin_a_cbse_03_008 (Imagery/Metaphor) and re-do the "device →.',
          misconception: 'Students treat "discussion" as *turn-taking monologues*: each person shares a pre-memorized summary or favourite line.',
          parts: [
                { id: 'a', prompt: 'During a discussion, a peer says: "Both poems are just about sad children." Using evidence from *both* poems, formulate a 45-second spoken rebuttal that.', answer: 'Step 1: Acknowledge the surface similarity',
                  options: ['Step 1: Acknowledge the surface similarity', 'I think the poem is about', 'In stanza 3, the image of X suggests Y because', 'the poem is about'],
                  hint: 'If stuck, return to c12_hin_a_cbse_03_008 (Imagery/Metaphor) and re-do the "device → effect →.',
                  misconception: 'Students treat "discussion" as *turn-taking monologues*: each person shares a pre-memorized summary or favourite line, with no listening.' }
          ],
            remediations: { 'students-treat-discussion-as-turn': { steps: ['**Revisit c12_hin_a_cbse_03_008 (Imagery/Metaphor) and c12_hin_a_cbse_03_009 (Irony/Symbolism)** — re-learn how.', '**Practice the "Evidence Sandwich" drill**: Pick one line → State claim → Quote phrase → Explain link → Connect.', 'Do this for 5 lines from each poem.', '**Record a 2-min solo discussion** on your phone; replay and check: Did I cite text?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
