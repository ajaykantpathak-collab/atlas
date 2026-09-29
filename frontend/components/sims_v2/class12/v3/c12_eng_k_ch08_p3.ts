import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch08_p3: SimDef = {
    id: 'v3_c12_eng_k_ch08_p3',
    title: 'Poems by Blake (Poem) · Part 3/3',
    subtitle: 'One soul, two songs — and neither is the correction',
    classLevel: 12, subject: 'eng_k', topic: 'Poems by Blake (Poem) · Part 3/3',
    chapters: ['c12_eng_k_ch08'],
    nodeIds: ['c12_eng_k_cbse_08_013', 'c12_eng_k_cbse_08_014', 'c12_eng_k_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Romantic-era critic', intro: 'A poet-engraver who hated the industrial age wrote two books that disagree with each other — on purpose.', goal: 'Read Blake\'s Songs of Innocence and Experience as contrary states, and see how illuminated printing fuses text and image.' },
    discovery: {
        question: 'Blake writes \'The Divine Image\' praising Mercy, Pity, Peace, Love — then \'The Human Abstract\' showing cruelty growing from the same tree. Did the adult outgrow the child\'s innocence?',
        options: ['No — they\'re \'two contrary states of the human soul,\' simultaneous and warring, not a before-and-after correction', 'Yes — Experience replaced Innocence', 'They\'re unrelated poems', 'Innocence is for children only'],
        answer: 'No — they\'re \'two contrary states of the human soul,\' simultaneous and warring, not a before-and-after correction',
        hook: 'Innocence isn\'t naivety and Experience isn\'t just cynicism — both live in one person at once. And Blake etched his poems into copper himself because the image is part of the argument: illuminated printing was rebellion against art made by machine.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Poems by Blake\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_08_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hold both Blakes at once: read The Divine Image\'s prayer beside The Human Abstract\'s trap, then map how the same virtues become \'selfish loves\' when Experience twists them.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Poems by Blake\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Name the two collections from which "The Divine Image" and "The Human Abstract" are taken, and state the philosophical concept Blake uses.', options: [
                { text: '"The Divine Image" is from *Songs of Innocence* and "The Human Abstract" is from *Songs', outcome: '"The Divine Image" is from *Songs of Innocence* and "The Human Abstract" is from *Songs.' },
                { text: 'the two contrary states of the human soul', outcome: 'Not quite — Students frequently treat the two poems as a simple "good vs. evil" or "naive vs.', reveals: 'students-frequently-treat-the-two' },
                { text: 'opposites', outcome: 'Not quite — Students frequently treat the two poems as a simple "good vs. evil" or "naive vs.', reveals: 'students-frequently-treat-the-two' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Poems by Blake\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Layout', outcome: 'Not quite — Students believe that quoting long stanzas (4+ lines) proves they know the poem.', reveals: 'quoting-long-stanzas-4-lines' },
                { text: 'quoting long stanzas (4+ lines) proves they know the poem', outcome: 'Not quite — Students believe that quoting long stanzas (4+ lines) proves they know the poem.', reveals: 'quoting-long-stanzas-4-lines' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Poems by Blake\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the four virtues listed in the first stanza of "The Divine Image" and how does the speaker describe their relationship to God and.', options: [
                { text: 'The four virtues are Mercy, Pity, Peace, and Love', outcome: 'The four virtues are Mercy, Pity, Peace, and Love. The poem states they are "God our father dear".' },
                { text: 'God our father dear', outcome: 'Not quite — Students treat "discussion" as taking turns stating opinions ("I think The Human Abstract.', reveals: 'students-treat-discussion-as-taking' },
                { text: 'Man, his child and care', outcome: 'Not quite — Students treat "discussion" as taking turns stating opinions ("I think The Human Abstract.', reveals: 'students-treat-discussion-as-taking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'An NGO head notices their flagship \'compassion programme\' quietly depends on keeping beneficiaries visibly needy for donors. Nobody wants to say it aloud.',
            decisions: [{ prompt: 'What would Blake\'s paired poems flag here?', options: [
                { text: 'That a \'virtue\' feeding on others\' misery is already corrupt — \'The Human Abstract\' shows pity engineered by those who need poverty to continue; redesign for dignity and self-sufficiency.', outcome: 'Blake\'s contrary states: the same organisation can house innocent intention and experienced cynicism — examine which your structure actually rewards.' },
                { text: 'Nothing — compassion is compassion; don\'t overthink a good deed.', outcome: 'The Divine Image taken alone misses that unexamined virtue can be manufactured by the very suffering it claims to relieve.', reveals: 'virtue-without-examination' },
                { text: 'Shut it down — all organised charity is hidden cynicism.', outcome: 'Blake doesn\'t crown Experience as truth; he shows both states are human and the task is integration, not abandonment.', reveals: 'experience-is-superior' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a poet\'s contradictions as dialectic, not confusion — Blake teaches that the divided soul is the honest one.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_013', difficulty: 'standard',
          question: 'Critical thinking on \'Poems by Blake\' — analysing the text to reach.',
          hint: 'If stuck, return to the two-column virtue mapping exercise (Innocence vs Experience) and.',
          misconception: 'Students frequently treat the two poems as a simple "good vs. evil" or "naive vs. realistic" binary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'Poems by Blake\'',
                  options: ['Critical thinking on \'Poems by Blake\'', '\'Poems by Blake\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Poems by Blake\'', 'The setting of \'Poems by Blake\''],
                  hint: 'If stuck, return to the two-column virtue mapping exercise (Innocence vs Experience) and the.',
                  misconception: 'Students frequently treat the two poems as a simple "good vs. evil" or "naive vs. realistic" binary.' }
          ],
            remediations: { 'students-frequently-treat-the-two': { steps: ['If a student cannot articulate the structural inversion, take these steps: (1) Return to c12_eng_k_cbse_08_006 and.', '(2) Re-read c12_eng_k_cbse_08_009 on symbolism — focus on the Tree as a *system* with roots, shade, fruit, and.', '(3) Use the NCERT "Understanding the Poem" Q3 as a re-diagnostic: "How do Mercy, Pity, Peace and Love get distorted.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_014', difficulty: 'standard',
          question: 'Writing skills from \'Poems by Blake\' — using the text as a model or springboard.',
          hint: 'If stuck, revisit c12_eng_k_cbse_08_006 (primary theme) and c12_eng_k_cbse_08_013.',
          misconception: 'Students believe that quoting long stanzas (4+ lines) proves they know the poem.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Layout', 'quoting long stanzas (4+ lines) proves they know the poem'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_08_006 (primary theme) and c12_eng_k_cbse_08_013 (critical.',
                  misconception: 'Students believe that quoting long stanzas (4+ lines) proves they know the poem.' },
                { id: 'b', prompt: 'Why is it insufficient to write: "In *The Divine Image* Blake says Mercy has a human heart, which shows God is kind"?', answer: 'That sentence states a fact but does not analyse',
                  options: ['That sentence states a fact but does not analyse', 'quoting long stanzas (4+ lines) proves they know the poem'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_08_006 (primary theme) and c12_eng_k_cbse_08_013 (critical.',
                  misconception: 'Students believe that quoting long stanzas (4+ lines) proves they know the poem.' }
          ],
            remediations: { 'quoting-long-stanzas-4-lines': { steps: ['Have the student take a past board question and highlight every quoted phrase in their answer.', 'Count words in each quote; if any exceed 6 words, rewrite the sentence embedding only the key 3–4 words.', 'Re-read the rewritten answer: does it flow grammatically?', 'If not, adjust the student\'s sentence structure around the quote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that quoting long stanzas (4+ lines) proves they know the poem.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "A good comparative answer must spend equal words on both poems." Defend or refute with reference to board marking schemes.', answer: 'Refute',
                  options: ['Refute', 'quoting long stanzas (4+ lines) proves they know the poem'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_08_006 (primary theme) and c12_eng_k_cbse_08_013 (critical.',
                  misconception: 'Students believe that quoting long stanzas (4+ lines) proves they know the poem.' }
          ],
            remediations: { 'quoting-long-stanzas-4-lines': { steps: ['Have the student take a past board question and highlight every quoted phrase in their answer.', 'Count words in each quote; if any exceed 6 words, rewrite the sentence embedding only the key 3–4 words.', 'Re-read the rewritten answer: does it flow grammatically?', 'If not, adjust the student\'s sentence structure around the quote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_015', difficulty: 'standard',
          question: 'Discussion points on \'Poems by Blake\' — speaking and listening around the text.',
          hint: 'If stuck, re-read c12_eng_k_cbse_08_006 and c12_eng_k_cbse_08_007; make a two-column.',
          misconception: 'Students treat "discussion" as taking turns stating opinions ("I think The Human Abstract is darker") rather than.',
          parts: [
                { id: 'a', prompt: 'What are the four virtues listed in the first stanza of "The Divine Image" and how does the speaker describe their relationship to God and Man?', answer: 'The four virtues are Mercy, Pity, Peace, and Love',
                  options: ['The four virtues are Mercy, Pity, Peace, and Love', 'God our father dear', 'Man, his child and care', 'claim-evidence-reasoning'],
                  hint: 'If stuck, re-read c12_eng_k_cbse_08_006 and c12_eng_k_cbse_08_007; make a two-column chart tracking.',
                  misconception: 'Students treat "discussion" as taking turns stating opinions ("I think The Human Abstract is darker") rather than building a collective.' },
                { id: 'b', prompt: 'Explain in your own words how "Pity" and "Mercy" become distorted in "The Human Abstract." Why does Blake say "Pity would be no more / If we did not make.', answer: 'In Experience, Pity requires poverty to exist',
                  options: ['In Experience, Pity requires poverty to exist', 'Pity disappears when we help the poor', 'claim-evidence-reasoning'],
                  hint: 'If stuck, re-read c12_eng_k_cbse_08_006 and c12_eng_k_cbse_08_007; make a two-column chart tracking.',
                  misconception: 'Students treat "discussion" as taking turns stating opinions ("I think The Human Abstract is darker") rather than building a collective.' }
          ],
            remediations: { 'students-treat-discussion-as-taking': { steps: ['Revisit c12_eng_k_cbse_08_006 (Primary Theme) and c12_eng_k_cbse_08_007 (Secondary Themes) to re-map the.', 'Practice the "Quote-Comment-Question" protocol: each speaker must (a) quote a phrase, (b) explain its meaning, (c) ask.', 'Record a 2-minute solo talk analyzing one virtue\'s transformation across both poems; self-assess using the mastery.', 'Re-do Diagnostic Question 4 with a partner, requiring each claim to be anchored in a specific capitalized word.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
