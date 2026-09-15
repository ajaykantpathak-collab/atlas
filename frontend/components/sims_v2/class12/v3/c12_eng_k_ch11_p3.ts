import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch11_p3: SimDef = {
    id: 'v3_c12_eng_k_ch11_p3',
    title: 'The Wild Swans at Coole (Poem) · Part 3/3',
    subtitle: 'The swans haven\'t grown old — that\'s the wound',
    classLevel: 12, subject: 'eng_k', topic: 'The Wild Swans at Coole (Poem) · Part 3/3',
    chapters: ['c12_eng_k_ch11'],
    nodeIds: ['c12_eng_k_cbse_11_013', 'c12_eng_k_cbse_11_014', 'c12_eng_k_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist poetry reader', intro: 'Nineteen years of the same lake, the same count, the same wings — and everything around them has changed.', goal: 'Read The Wild Swans at Coole through Yeats\'s 1916 world — Coole, Lady Gregory, the Rising — and its elegy for permanence.' },
    discovery: {
        question: 'Fifty-one, twice rejected, his country in revolt — Yeats counts the swans at Coole for the nineteenth autumn and finds them \'unwearied.\' What are the swans really measuring?',
        options: ['His own losses — their permanent passion throws his sore heart, failed loves and shaken Ireland into painful relief', 'Just the swan population', 'The lake\'s ecology', 'Nothing — it\'s a nature poem'],
        answer: 'His own losses — their permanent passion throws his sore heart, failed loves and shaken Ireland into painful relief',
        hook: '\'Nineteenth autumn\' is arithmetic with memory: 1916 minus nineteen lands on 1897, the year he met Lady Gregory — and in 1916 the Easter Rising and his final rejection arrived together. Without that scaffold the poem is pretty birds; with it, an elegy for a vanishing world.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a poem\'s structure, language, imagery, and themes to interpret deeper meanings, evaluate the poet\'s choices, and synthesize insights about.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Make the count with him: fix the autumn arithmetic, weigh public collapse against private loss, and trace how the swans\' sudden flight \'scattering wheeling\' becomes everything he can no longer hold.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re standing by a lake in autumn, watching birds that seem unchanged year after year while you feel older. That\'s the poet\'s experience.',
            decisions: [{ prompt: 'What is the rhyme scheme of the first stanza of "The Wild Swans at Coole" and how does it contribute to the poem\'s musical quality?', options: [
                { text: 'The first stanza follows an ABCBDD rhyme scheme (beauty/dry, sky/dry, stones/swans,', outcome: 'The first stanza follows an ABCBDD rhyme scheme (beauty/dry, sky/dry, stones/swans, me/count.' },
                { text: 'the poem is simply about beautiful swans and the poet\'s sadness', outcome: 'Not quite — Students often think the poem is simply about beautiful swans and the poet\'s sadness.', reveals: 'the-poem-is-simply-about' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and the question reads: "Write a critical appreciation of \'The Wild Swans at Coole\'." Your mind goes blank.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs about literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe that writing a poetry analysis means summarising the poem stanza by stanza and.', reveals: 'writing-a-poetry-analysis-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a literature circle where each student must share one insight about why the swans remain "unwearied" while the poet\'s heart is "sore." Start.',
            decisions: [{ prompt: 'What is the rhyme scheme of the first stanza of "The Wild Swans at Coole" as given in the NCERT textbook?', options: [
                { text: 'The rhyme scheme of the first stanza is ABCBDD (lines 1-6: beauty/A, dry/B, water/C,', outcome: 'The rhyme scheme of the first stanza is ABCBDD (lines 1-6: beauty/A, dry/B, water/C, sky/B.' },
                { text: 'discussion points', outcome: 'Not quite — Students think "discussion points" means listing NCERT comprehension questions (Q1-Q4) and.', reveals: 'discussion-points-means-listing-ncert' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Back at a childhood lake for the first time in twenty years, a middle-aged alum watches the birds scatter unchanged and says bitterly, \'they\'re the same — only I\'ve aged.\'',
            decisions: [{ prompt: 'How does Yeats frame that bitterness?', options: [
                { text: 'As the real subject — \'The Wild Swans at Coole\' holds both truths at once: the swans\' brilliant continuity and the speaker\'s nineteenth autumn; the pain is the gap, and naming it is the poem\'s consolation.', outcome: 'Continuity in the world plus change in the self is exactly the tension Yeats sits with — the swans aren\'t mocking him; they\'re measuring time.' },
                { text: 'He\'s right to be bitter — unchanging things exist to reproach the aging.', outcome: 'The poem reads permanence as beautiful, not mocking; turning it into an accusation is the bitterness talking.', reveals: 'permanence-as-reproach' },
                { text: 'Cheer up — nothing really changes, including him.', outcome: 'That denies the poem\'s whole grief; Yeats insists the change in the observer is real and counts.', reveals: 'change-blindness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a landscape as a man\'s ledger of losses — modernist poetry where history hides inside private symbols.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a poem\'s structure.',
          hint: 'If stuck, revisit the symbolism node (c12_eng_k_cbse_11_009) and practice mapping one.',
          misconception: 'Students often think the poem is simply about beautiful swans and the poet\'s sadness.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of symbolism: What do the "nine-and-fifty swans" symbolize, and why is the odd number (59) significant?', answer: 'The 59 swans symbolize a natural, wild completeness',
                  options: ['The 59 swans symbolize a natural, wild completeness', 'the poem is simply about beautiful swans and the poet\'s sadness'],
                  hint: 'If stuck, revisit the symbolism node (c12_eng_k_cbse_11_009) and practice mapping one symbol (e.g.',
                  misconception: 'Students often think the poem is simply about beautiful swans and the poet\'s sadness.' },
                { id: 'b', prompt: 'Analyze how the poem\'s structure (three stanzas of six lines each) mirrors the progression of the poet\'s thought.', answer: 'Stanza 1 sets the static autumn scene and the poet\'s routine counting',
                  options: ['Stanza 1 sets the static autumn scene and the poet\'s routine counting', 'the poem is simply about beautiful swans and the poet\'s sadness'],
                  hint: 'If stuck, revisit the symbolism node (c12_eng_k_cbse_11_009) and practice mapping one symbol (e.g.',
                  misconception: 'Students often think the poem is simply about beautiful swans and the poet\'s sadness.' }
          ],
            remediations: { 'the-poem-is-simply-about': { steps: ['If a student conflates description with analysis, guide them to: (1) List every verb associated with the swans (mount.', '(2) List every verb/phrase associated with the poet (made my count, looked, heart is sore, trod, awake, find).', '(3) Compare the two lists: which set suggests agency and endurance?', '(4) Write one sentence explaining what this contrast reveals about the poem\'s theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck, review the PEEL method using a simpler poem (e.g., Class 11 "A Photograph") and.',
          misconception: 'Students believe that writing a poetry analysis means summarising the poem stanza by stanza and listing every literary.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs about literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line'],
                  hint: 'If stuck, review the PEEL method using a simpler poem (e.g., Class 11 "A Photograph") and practice.',
                  misconception: 'Students believe that writing a poetry analysis means summarising the poem stanza by stanza and listing every literary device they can.' }
          ],
            remediations: { 'writing-a-poetry-analysis-means': { steps: ['Give the student a one-paragraph PEEL exercise on a familiar, simple poem (e.g., Class 11\'s "A Photograph" or "The.', 'Together, label each sentence as P, E, E, or L.', 'If a sentence doesn\'t fit, rewrite it.', 'Return to "The Wild Swans at Coole" and have them write a single PEEL paragraph on the swans as symbols of permanence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points for "The Wild Swans at Coole" are.',
          hint: 'If stuck, revisit c12_eng_k_cbse_11_013 (Critical Thinking) and re-do the "Analysis and.',
          misconception: 'Students think "discussion points" means listing NCERT comprehension questions (Q1-Q4) and answering them in turn.',
          parts: [
                { id: 'a', prompt: 'You are leading a discussion on the poem. A peer says, "The swans are just birds; the poem is only about nature." Using evidence from stanza 4, how would you.', answer: 'Response: "The swans function as symbols',
                  options: ['Response: "The swans function as symbols', 'discussion points'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_11_013 (Critical Thinking) and re-do the "Analysis and.',
                  misconception: 'Students think "discussion points" means listing NCERT comprehension questions (Q1-Q4) and answering them in turn.' }
          ],
            remediations: { 'discussion-points-means-listing-ncert': { steps: ['Model a 2-minute fishbowl discussion: Teacher + 2 students demonstrate building on an idea (e.g., Student A: "The swans.', 'Give the stuck student a "Discussion Stem Card" with phrases: "I\'d like to add to X\'s point...", "The text says ___.', 'Re-attempt the same prompt with the card; teacher notes use of stems and textual anchoring.', 'If still stuck, assign a listening log: student records peer\'s points for 5 minutes, then summarizes — builds receptive.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "discussion points" means listing NCERT comprehension questions (Q1-Q4) and answering them in turn.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The poem\'s final question — \'Delight men\'s eyes when I awake some day / To find they have flown away?\' — expresses hope that the swans.', answer: 'It is a partial reading',
                  options: ['It is a partial reading', 'discussion points'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_11_013 (Critical Thinking) and re-do the "Analysis and.',
                  misconception: 'Students think "discussion points" means listing NCERT comprehension questions (Q1-Q4) and answering them in turn.' },
                { id: 'b', prompt: 'Create a 30-second spoken response to this prompt: "If the swans could speak to the poet in stanza 2 (\'I saw, before I had well finished, / All suddenly mount.', answer: 'Sample response: "We would say: \'Poet, your heart is sore',
                  options: ['Sample response: "We would say: \'Poet, your heart is sore', 'discussion points'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_11_013 (Critical Thinking) and re-do the "Analysis and.',
                  misconception: 'Students think "discussion points" means listing NCERT comprehension questions (Q1-Q4) and answering them in turn.' }
          ],
            remediations: { 'discussion-points-means-listing-ncert': { steps: ['Model a 2-minute fishbowl discussion: Teacher + 2 students demonstrate building on an idea (e.g., Student A: "The swans.', 'Give the stuck student a "Discussion Stem Card" with phrases: "I\'d like to add to X\'s point...", "The text says ___.', 'Re-attempt the same prompt with the card; teacher notes use of stems and textual anchoring.', 'If still stuck, assign a listening log: student records peer\'s points for 5 minutes, then summarizes — builds receptive.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
