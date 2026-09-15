import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch09_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch09_p3',
    title: 'mek\'kadj tks\'kh · Part 3/3',
    subtitle: 'Hear a 15th-century weaver dismantle both temple and mosque in one couplet.',
    classLevel: 11, subject: 'hin_ar', topic: 'mek\'kadj tks\'kh · Part 3/3',
    chapters: ['c11_hin_ar_ch09'],
    nodeIds: ['c11_hin_ar_cbse_09_013', 'c11_hin_ar_cbse_09_014', 'c11_hin_ar_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a disciple watching the loom instead of the scripture', intro: 'A Muslim-weaver saint in Kashi, persecuted by priests of both religions — and his whole theology woven into cloth metaphors.', goal: 'Situate Kabir in the Nirguna Bhakti tradition and read his weaver identity as the engine of his imagery.' },
    discovery: {
        question: 'A student writes \'Kabir rejected all religion.\' Accurate?',
        options: ['No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality', 'Yes — he mocked both temple and mosque, so he rejected both faiths', 'Yes — a weaver couldn\'t be religious', 'No — he actually founded a new organised religion'],
        answer: 'No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality',
        hook: '\'Kabir was a weaver\' is not trivia — every metaphor in his verse is a loom: warp, weft, thread, dye, knot. His caste is his poetics.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the systematic process of examining a literary text\'s layers—language, structure, context, and subtext—to uncover implicit meanings, evaluate the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_09_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Watch Kabir teach disciples by silently weaving an odd pattern, then map why the lesson lands through action instead of explanation.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are in the Class 11 board exam and the question reads: "How does Dinkar use the metaphor of \'fire\' to depict the poet\'s role in society?',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "Writing Skills" means memorizing model answers for predicted questions.', reveals: 'writing-skills-means-memorizing-model' },
                { text: 'Writing Skills', outcome: 'Not quite — Students believe "Writing Skills" means memorizing model answers for predicted questions.', reveals: 'writing-skills-means-memorizing-model' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a class discussion about caste discrimination today.',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a literature class?', options: [
                { text: 'A discussion point is a specific, text-based observation or question that', outcome: 'A discussion point is a specific, text-based observation or question that a student raises.' },
                { text: 'to share my personal feelings about the poem', outcome: 'Not quite — Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic.', reveals: 'a-good-discussion-point-is' },
                { text: 'I think caste is wrong', outcome: 'Not quite — Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic.', reveals: 'a-good-discussion-point-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is designing a Kabir exhibit. A teammate\'s panel reads: \'Kabir: 15th-century weaver from Kashi. Born c.1398, died 1518.\' He argues the weaver detail is just a biographical fact — \'the poetry is about God, not looms.\'',
            decisions: [{ prompt: 'Why is the weaver identity the key, not trivia?', options: [
                { text: 'Show the generative matrix: nearly every metaphor in Kabir — warp and weft, thread, dye, knot, unravelling — comes from the loom; \'untying the knot\' (granthi) is weaver\'s knowledge turned theology. Add the rest of the context: a low-caste julaha in Sadhukkadi speech challenging Brahmin and Qazi orthodoxy alike — the poetry\'s radicalism is inseparable from who spoke and in whose language.', outcome: 'The panel is rewritten: context stops being a fact-file and becomes the engine — weaving isn\'t Kabir\'s day job, it\'s his entire metaphor bank.' },
                { text: 'Keep the panel — dates and profession are background; the spiritual message stands alone.', outcome: 'Stripping the weaver identity leaves the images unexplained: the loom metaphors become decoration instead of embodied argument.', reveals: 'weaver-is-trivia' },
                { text: 'Reframe him as a social reformer first — the caste angle matters, the spiritual content is secondary.', outcome: 'That inverts without understanding: Kabir\'s social challenge works THROUGH spiritual metaphor — the poetry fuses the two, so splitting them flattens both.', reveals: 'kabir-is-only-reformer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'Neither Brahmin nor Qazi could claim him — the weaver\'s loom measured orthodoxy and found it hollow.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the systematic process.',
          hint: 'If stuck, return to node 008 (Imagery and Metaphor) and node 012 (Inferential.',
          misconception: 'Students equate \'critical analysis\' with \'finding hidden meanings the author intended.\' They hunt for a single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical Thinking: Analysis and Interpretation is the systematic process of examining a',
                  options: ['Critical Thinking: Analysis and Interpretation is the systematic process of examining a', 'Context and Background refers to the historical, social, cultural, and biographical', 'Plot and narrative structure refers to the organization of events in a prose text,', 'Setting in poetry refers to the spatial, temporal, and cultural backdrop against'],
                  hint: 'If stuck, return to node 008 (Imagery and Metaphor) and node 012 (Inferential.',
                  misconception: 'Students equate \'critical analysis\' with \'finding hidden meanings the author intended.\' They hunt for a single \'correct\' interpretation.' }
          ],
            remediations: { 'students-equate-critical-analysis-with': { steps: ['Give the student two *contradictory* but equally text-supported readings of stanza 2 (e.g., "It\'s about caste" vs.', 'Ask them to list the *exact words* each reading relies on—showing both use the same words differently.', 'Introduce the concept of \'interpretive warrant\': a claim is valid if it cites textual evidence *and* explains the.', 'Have them write a 50-word defense of the reading they *disagree* with—building the muscle of seeing textual plurality.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_014', difficulty: 'standard',
          question: 'Writing Skills: Based on the Chapter refers to the ability to compose.',
          hint: 'Review c11_hin_ar_cbse_09_008 (Literary Devices) and c11_hin_ar_cbse_09_012.',
          misconception: 'Students believe "Writing Skills" means memorizing model answers for predicted questions.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'Writing Skills', '"Writing Skills" means memorizing model answers for predicted questions'],
                  hint: 'Review c11_hin_ar_cbse_09_008 (Literary Devices) and c11_hin_ar_cbse_09_012 (Comprehension).',
                  misconception: 'Students believe "Writing Skills" means memorizing model answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-means-memorizing-model': { steps: ['**Deconstruct the Prompt:** Give the student 3 past board questions.', 'Have them highlight *command words* (analyze, discuss, justify) and *content words* (irony, Dinkar, nationalism) in two.', '**Evidence Hunt:** For one question, set a 5-minute timer to find 3 exact textual references (line numbers/paraphrases).', '**Oral PEEL:** Student explains the answer *orally* using PEEL steps while you scribe.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'Review the \'Literary Devices: Imagery and Metaphor\' (c11_hin_ar_cbse_09_008) and \'Theme.',
          misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a \'discussion point\' in a literature class?', answer: 'A discussion point is a specific, text-based observation or question that',
                  options: ['A discussion point is a specific, text-based observation or question that', 'to share my personal feelings about the poem', 'I think caste is wrong', 'caste is wrong")'],
                  hint: 'Review the \'Literary Devices: Imagery and Metaphor\' (c11_hin_ar_cbse_09_008) and \'Theme: Primary.',
                  misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think caste is wrong").' },
                { id: 'b', prompt: 'You are preparing a discussion point on the metaphor of the \'burden\' (टोकरी) in the poem.', answer: 'Steps: 1) Locate the exact lines with the metaphor',
                  options: ['Steps: 1) Locate the exact lines with the metaphor', 'I think caste is wrong', 'caste is wrong")'],
                  hint: 'Review the \'Literary Devices: Imagery and Metaphor\' (c11_hin_ar_cbse_09_008) and \'Theme: Primary.',
                  misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think caste is wrong").' },
                { id: 'c', prompt: 'Compare two discussion points: A) "The poem is against caste." B) "In stanza 2, the poet equates the burden with birth-based identity, using the word \'जाति\'.', answer: 'Point B is more valuable',
                  options: ['Point B is more valuable', 'I think caste is wrong', 'caste is wrong")'],
                  hint: 'Review the \'Literary Devices: Imagery and Metaphor\' (c11_hin_ar_cbse_09_008) and \'Theme: Primary.',
                  misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think caste is wrong").' }
          ],
            remediations: { 'a-good-discussion-point-is': { steps: ['Give the student a printed copy of the poem with three key metaphors highlighted.', 'Ask them to write one sentence for each metaphor following the template: "In line X, the poet uses [metaphor].', 'Have them read each sentence aloud and ask: "Which word in the line proves your claim?" 4.', 'Finally, ask them to turn one sentence into a question for the group.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think.',
          parts: [
                { id: 'a', prompt: 'Create a discussion question for your group that connects Dharmraj\'s metaphor of the \'clean/dirty\' distinction to a current social issue, without mentioning.', answer: 'Example: "The poem contrasts \'clean\' and \'dirty\' work assigned by birth',
                  options: ['Example: "The poem contrasts \'clean\' and \'dirty\' work assigned by birth', 'I think caste is wrong', 'caste is wrong")'],
                  hint: 'Review the \'Literary Devices: Imagery and Metaphor\' (c11_hin_ar_cbse_09_008) and \'Theme: Primary.',
                  misconception: 'Students believe a good discussion point is just sharing their personal opinion on the poem\'s topic (e.g., "I think caste is wrong").' }
          ],
            remediations: { 'a-good-discussion-point-is': { steps: ['Give the student a printed copy of the poem with three key metaphors highlighted.', 'Ask them to write one sentence for each metaphor following the template: "In line X, the poet uses [metaphor].', 'Have them read each sentence aloud and ask: "Which word in the line proves your claim?" 4.', 'Finally, ask them to turn one sentence into a question for the group.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
