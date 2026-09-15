import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch11_p3: SimDef = {
    id: 'v3_c12_eng_f_ch11_p3',
    title: 'Keeping Quiet (Poem) · Part 3/3',
    subtitle: 'Count to twelve — the radical politics of doing nothing',
    classLevel: 12, subject: 'eng_f', topic: 'Keeping Quiet (Poem) · Part 3/3',
    chapters: ['c12_eng_f_ch11'],
    nodeIds: ['c12_eng_f_cbse_11_013', 'c12_eng_f_cbse_11_014', 'c12_eng_f_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poetry analyst', intro: 'One poet asked humanity to stop — no engines, no words, no wars — just long enough to finally meet ourselves.', goal: 'Trace the stanza-wise argument of Keeping Quiet and explain why its stillness is life-affirming, not passive.' },
    discovery: {
        question: 'Neruda asks the whole world to count to twelve and keep still — then insists this is \'not total inactivity.\' Why the urgent clarification?',
        options: ['Without it the call for stillness reads as passivity or death; he means a life-affirming pause — \'Life is what it is about\' — not surrender', 'He was afraid people would nap', 'Stillness and inactivity are the same thing', 'Poets just contradict themselves'],
        answer: 'Without it the call for stillness reads as passivity or death; he means a life-affirming pause — \'Life is what it is about\' — not surrender',
        hook: 'The poem is an argument, not a mood: proposal → consequence → evidence → clarification. Fishermen harming themselves, \'wars with gas, wars with fire,\' a \'victory with no survivors\' — the images are evidence that activity without introspection is the real danger.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in poetry analysis involves systematically examining a poem\'s structural elements, literary devices, and thematic layers to construct an evidence-based interpretation of its.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_11_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hold the world\'s pause button: follow the five-stanza argument from \'count to twelve\' through the fishermen, the salt-gatherer and the war-makers to the Earth that teaches by seeming dead yet living.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re asked: "Why does Keats call beauty \'an endless fountain of immortal drink\' instead of just saying \'beauty lasts forever\'?" Start by reading the.',
            decisions: [{ prompt: 'What is the rhyme scheme of the excerpt from "A Thing of Beauty" provided in the NCERT textbook, and how many rhyming couplets does.', options: [
                { text: 'The rhyme scheme is AABBCCDDEEFF (six rhyming couplets: forever/never, keep/sleep,', outcome: 'The rhyme scheme is AABBCCDDEEFF (six rhyming couplets: forever/never, keep/sleep, earth/mirth.' },
                { text: 'alternate rhyme ABAB', outcome: 'Not quite — Students consistently treat "A Thing of Beauty" as a simple catalogue of pretty nature images (sun.', reveals: 'students-consistently-treat-a-thing' },
                { text: 'Keeping Quiet', outcome: 'Not quite — Students consistently treat "A Thing of Beauty" as a simple catalogue of pretty nature images (sun.', reveals: 'students-consistently-treat-a-thing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall and the question reads: *"How does Neruda use the image of \'counting up to twelve\' to convey the poem\'s central message?"* You.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe that writing a "good answer" means paraphrasing the poem line-by-line or listing.', reveals: 'writing-a-good-answer-means' },
                { text: 'good answer', outcome: 'Not quite — Students believe that writing a "good answer" means paraphrasing the poem line-by-line or listing.', reveals: 'writing-a-good-answer-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a college admission interview or a CUET group discussion where the panel asks: "Keats says beauty never passes into nothingness — do you.',
            decisions: [{ prompt: 'What is the primary purpose of preparing discussion points before a group discussion on a poem like "A Thing of Beauty"?', options: [
                { text: 'The primary purpose is to organize textual evidence (specific lines/images) around key', outcome: 'The primary purpose is to organize textual evidence (specific lines/images) around key themes.' },
                { text: 'to memorize the poem', outcome: 'Not quite — Students think "discussion points" means writing a summary of the poem to read aloud.', reveals: 'discussion-points-means-writing-a' },
                { text: 'discussion points', outcome: 'Not quite — Students think "discussion points" means writing a summary of the poem to read aloud.', reveals: 'discussion-points-means-writing-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A project team fractures in constant quarrels; deadlines force more meetings, more noise. Someone suggests the group stop and sit in silence together once a day.',
            decisions: [{ prompt: 'Is \'keeping quiet\' a real intervention?', options: [
                { text: 'Yes — Neruda\'s stillness is deliberate introspection, \'not total inactivity\': pausing the machinery of conflict lets the team interrupt its own momentum and see itself.', outcome: 'The poem\'s count to twelve is an active interruption of harmful motion — stillness as insight, not idleness.' },
                { text: 'No — silence means doing nothing, and doing nothing ships no work.', outcome: 'Neruda explicitly rules that out; the pause is productive self-examination, not a strike.', reveals: 'stillness-is-inactivity' },
                { text: 'No — the fix is staying even busier so there\'s no time to fight.', outcome: 'Busyness is the engine of the quarrel; the poem\'s point is that ceaseless motion is what hides us from ourselves.', reveals: 'busyness-as-solution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'You can now defend stillness as an act of understanding, not idleness — and trace how a poem builds an argument through images instead of reasons.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_013', difficulty: 'standard',
          question: 'Critical thinking in poetry analysis involves systematically examining a poem\'s.',
          hint: 'If stuck, return to c12_eng_f_cbse_11_008 and re-do the "identify the metaphor and.',
          misconception: 'Students consistently treat "A Thing of Beauty" as a simple catalogue of pretty nature images (sun, moon, flowers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in poetry analysis involves systematically examining a poem\'s',
                  options: ['Critical thinking in poetry analysis involves systematically examining a poem\'s', '"Before You Read: Context and Background" provides the essential biographical,', 'Plot and Narrative Structure in a poem refers to the organization of ideas, images, and', 'In poetry, **setting** refers to the time, place, and social context in'],
                  hint: 'If stuck, return to c12_eng_f_cbse_11_008 and re-do the "identify the metaphor and explain its.',
                  misconception: 'Students consistently treat "A Thing of Beauty" as a simple catalogue of pretty nature images (sun, moon, flowers, streams) and write.' }
          ],
            remediations: { 'students-consistently-treat-a-thing': { steps: ['Have the student reread only lines 5–12 ("Therefore, on every morrow...', 'Ask them to rewrite the "Think it out" Q4 answer using the sentence frame: "Keats says we love life because beauty.', 'Assign a micro-comparison: contrast this poem\'s "beauty as survival mechanism" with the "beauty as momentary joy".', 'Re-diagnose with a fresh "Apply" question: "How would Keats respond to the statement \'Beauty is a luxury for people who.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently treat "A Thing of Beauty" as a simple catalogue of pretty nature images (sun, moon, flowers.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Keats\'s poem offers escapism — it tells us to ignore suffering by focusing on pretty things." Defend your judgment using at least three.', answer: 'The claim is false',
                  options: ['The claim is false', 'beauty', 'prettiness', 'immortal drink'],
                  hint: 'If stuck, return to c12_eng_f_cbse_11_008 and re-do the "identify the metaphor and explain its.',
                  misconception: 'Students consistently treat "A Thing of Beauty" as a simple catalogue of pretty nature images (sun, moon, flowers, streams) and write.' }
          ],
            remediations: { 'students-consistently-treat-a-thing': { steps: ['Have the student reread only lines 5–12 ("Therefore, on every morrow...', 'Ask them to rewrite the "Think it out" Q4 answer using the sentence frame: "Keats says we love life because beauty.', 'Assign a micro-comparison: contrast this poem\'s "beauty as survival mechanism" with the "beauty as momentary joy".', 'Re-diagnose with a fresh "Apply" question: "How would Keats respond to the statement \'Beauty is a luxury for people who.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "Keeping Quiet" refers to the ability.',
          hint: 'If stuck, revisit c12_eng_f_cbse_11_008 (Imagery/Metaphor) and c12_eng_f_cbse_11_006.',
          misconception: 'Students believe that writing a "good answer" means paraphrasing the poem line-by-line or listing all poetic devices.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'good answer'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_11_008 (Imagery/Metaphor) and c12_eng_f_cbse_11_006 (Primary.',
                  misconception: 'Students believe that writing a "good answer" means paraphrasing the poem line-by-line or listing all poetic devices they can spot.' }
          ],
            remediations: { 'writing-a-good-answer-means': { steps: ['If a student submits a narrative summary instead of analysis: (1) Have them highlight every sentence in their answer.', '(2) Identify missing components (usually Explanation and Link).', '(3) Give them a model PEEL paragraph on the same topic; ask them to color-code it.', '(4) Assign a re-write of their original answer using the model\'s structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points for "A Thing of Beauty" refers to the.',
          hint: 'If stuck, revisit c12_eng_f_cbse_11_013 (Critical Thinking) and re-do the "Think it out".',
          misconception: 'Students think "discussion points" means writing a summary of the poem to read aloud.',
          parts: [
                { id: 'a', prompt: 'A student says: "The poem is just about nature being pretty." How does this statement demonstrate a misunderstanding of the poem\'s central argument?', answer: 'The statement reduces the poem\'s philosophical claim',
                  options: ['The statement reduces the poem\'s philosophical claim', 'discussion points', '"discussion points" means writing a summary of the poem to read aloud'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_11_013 (Critical Thinking) and re-do the "Think it out" Q3 and Q4.',
                  misconception: 'Students think "discussion points" means writing a summary of the poem to read aloud.' }
          ],
            remediations: { 'discussion-points-means-writing-a': { steps: ['If a student prepares only a summary: Step 1 — Hand them a two-column template: Column A "Poem Image/Line" (e.g.', 'Step 2 — Ask them to fill 4 rows using the poem.', 'Step 3 — Have them convert each row into a spoken point: "The daffodils aren\'t just flowers; they represent...', 'because the poem says..." Step 4 — Run a 3-minute mock discussion where you play a peer who disagrees, forcing them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
