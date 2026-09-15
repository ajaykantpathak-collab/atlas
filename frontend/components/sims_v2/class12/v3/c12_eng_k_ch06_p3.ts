import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch06_p3: SimDef = {
    id: 'v3_c12_eng_k_ch06_p3',
    title: 'A Poem for Magic (Poem) · Part 3/3',
    subtitle: 'The lecture where shadows teach love\'s timetable',
    classLevel: 12, subject: 'eng_k', topic: 'A Poem for Magic (Poem) · Part 3/3',
    chapters: ['c12_eng_k_ch06'],
    nodeIds: ['c12_eng_k_cbse_06_013', 'c12_eng_k_cbse_06_014', 'c12_eng_k_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Metaphysical poetry reader', intro: 'A 17th-century poet grabs his beloved\'s hand and gives her a lecture — on shadows. It becomes a theory of love.', goal: 'Follow Donne\'s shadow conceit through love\'s stages and read metaphysical wit as argument.' },
    discovery: {
        question: 'Donne warns his lover that \'his first minute, after noone, is night.\' Every love song says noon is the peak — what does he see that they don\'t?',
        options: ['That love which doesn\'t hold at noon doesn\'t plateau — it decays instantly; the falling shadows then blind the lovers themselves', 'Nothing — noon is always safe', 'The sun sets, so love must end', 'He means literal nightfall'],
        answer: 'That love which doesn\'t hold at noon doesn\'t plateau — it decays instantly; the falling shadows then blind the lovers themselves',
        hook: 'Metaphysical poetry argues through conceits, not pretty comparisons: morning shadows are the disguises lovers \'ourselves produced\'; afternoon shadows fall inward, blinding the deceivers. It\'s called a Lecture — the shadow is the syllabus.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in poetry analysis is the disciplined process of examining a poem\'s structural, linguistic, and thematic elements to construct an evidence-based interpretation that goes beyond.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_06_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take Donne\'s three-hour walk: track the shadows from disguised morning through \'brave clearnesse\' to the afternoon when deceit turns inward — and decide if love can be \'full constant light.\'',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re a detective examining a crime scene — the poem is the scene, and the "shadow" is your key clue.',
            decisions: [{ prompt: 'What is a metaphysical conceit, and how does it differ from a regular metaphor or simile?', options: [
                { text: 'A metaphysical conceit is an extended, intellectually complex comparison between two', outcome: 'A metaphysical conceit is an extended, intellectually complex comparison between two vastly.' },
                { text: 'a conceit is just a fancy metaphor', outcome: 'Not quite — Students treat the shadow imagery as *decoration* — "Donne uses shadows to show love has ups and.', reveals: 'students-treat-the-shadow-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: "How does Donne use the shadow metaphor to trace the stages of love in \'A Lecture Upon the Shadow\'?".',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers for CBSE Class 12?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Evidence, Logic', outcome: 'Not quite — Students believe "embedding quotes" means dropping a full line or stanza into the answer without.', reveals: 'embedding-quotes-means-dropping-a' },
                { text: 'Point, Example, Explain, Leave', outcome: 'Not quite — Students believe "embedding quotes" means dropping a full line or stanza into the answer without.', reveals: 'embedding-quotes-means-dropping-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re sitting in a literature circle with three classmates, each holding a copy of Donne\'s poem.',
            decisions: [{ prompt: 'What is the primary purpose of preparing discussion points before a speaking and listening activity on a poem?', options: [
                { text: 'The primary purpose is to anchor oral contributions in specific textual evidence (lines,', outcome: 'The primary purpose is to anchor oral contributions in specific textual evidence (lines, images.' },
                { text: 'to memorize what to say', outcome: 'Not quite — Students believe a "good discussion" means everyone shares their personal feeling about the poem.', reveals: 'a-good-discussion-means-everyone' },
                { text: 'good discussion', outcome: 'Not quite — Students believe a "good discussion" means everyone shares their personal feeling about the poem.', reveals: 'a-good-discussion-means-everyone' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Two co-founders courted each other with polished masks; now the startup struggles and each privately hides bad metrics \'to keep the other confident\'.',
            decisions: [{ prompt: 'What does Donne\'s shadow-lecture advise?', options: [
                { text: 'Drop the disguises — Donne\'s point is that love (or partnership) only stays at \'noon\' when shadows, the little deceits of courtship and decline, stop growing between the two.', outcome: 'Early \'infant\' disguises and late concealments are the same shadow at different hours; constancy needs daylight honesty.' },
                { text: 'Keep hiding — smooth confidence is what partnerships run on.', outcome: 'The poem argues exactly the reverse: managed appearances are shadows that lengthen until they blot out the thing itself.', reveals: 'disguise-maintains-love' },
                { text: 'Let it fade quietly — once the shadows start, decline is natural.', outcome: 'Donne\'s speaker fights decline with constancy; treating decay as destiny is surrender dressed as wisdom.', reveals: 'decline-is-destiny' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You can now follow a conceit as a logical machine, not decoration — the exact skill metaphysical poetry demands of a reader.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_013', difficulty: 'standard',
          question: 'Critical thinking in poetry analysis is the disciplined process of examining.',
          hint: 'If stuck on the conceit\'s logic, return to c12_eng_k_cbse_06_008 (Imagery and Metaphor).',
          misconception: 'Students treat the shadow imagery as *decoration* — "Donne uses shadows to show love has ups and downs." This misses.',
          parts: [
                { id: 'a', prompt: 'Compare the shadow conceit in this poem with the compass conceit in Donne\'s "A Valediction: Forbidding Mourning." How does each conceit structure its poem\'s.', answer: 'The shadow conceit is **temporal and degenerative**',
                  options: ['The shadow conceit is **temporal and degenerative**', 'both are about love'],
                  hint: 'If stuck on the conceit\'s logic, return to c12_eng_k_cbse_06_008 (Imagery and Metaphor) and re-do.',
                  misconception: 'Students treat the shadow imagery as *decoration* — "Donne uses shadows to show love has ups and downs." This misses the **argumentative.' }
          ],
            remediations: { 'students-treat-the-shadow-imagery': { steps: ['**Re-read the poem aloud** marking every verb tense shift (present → past → future conditional).', '**Map the three time-zones** on a timeline: Morning (stanzas 1-2), Noon (stanza 3), Afternoon (stanzas 4-5).', '**Trace the pronoun shift**: "we" → "our loves" → "thou/me" → "our selves" — who is acting on whom at each stage?', '**Revisit c12_eng_k_cbse_06_008** (Imagery and Metaphor) and **c12_eng_k_cbse_06_009** (Irony and Symbolism) to rebuild.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the shadow imagery as *decoration* — "Donne uses shadows to show love has ups and downs." This misses.',
          parts: [
                { id: 'a', prompt: 'Create a four-line metaphysical conceit poem (or stanza) that uses a scientific or geometric concept (like Donne\'s astronomy/geometry) to argue something about.', answer: '*Example:* Our chat-bubbles orbit, twin satellites in sync',
                  options: ['*Example:* Our chat-bubbles orbit, twin satellites in sync', 'our love is like wifi'],
                  hint: 'If stuck on the conceit\'s logic, return to c12_eng_k_cbse_06_008 (Imagery and Metaphor) and re-do.',
                  misconception: 'Students treat the shadow imagery as *decoration* — "Donne uses shadows to show love has ups and downs." This misses the **argumentative.' }
          ],
            remediations: { 'students-treat-the-shadow-imagery': { steps: ['**Re-read the poem aloud** marking every verb tense shift (present → past → future conditional).', '**Map the three time-zones** on a timeline: Morning (stanzas 1-2), Noon (stanza 3), Afternoon (stanzas 4-5).', '**Trace the pronoun shift**: "we" → "our loves" → "thou/me" → "our selves" — who is acting on whom at each stage?', '**Revisit c12_eng_k_cbse_06_008** (Imagery and Metaphor) and **c12_eng_k_cbse_06_009** (Irony and Symbolism) to rebuild.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_014', difficulty: 'standard',
          question: 'Writing skills based on a poetry chapter involve the ability to compose.',
          hint: 'If stuck on PEEL mechanics, revisit c11_eng_w_cbse_01_014 (Writing Skills: PEEL.',
          misconception: 'Students believe "embedding quotes" means dropping a full line or stanza into the answer without introduction.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers for CBSE Class 12?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Evidence, Logic', 'Point, Example, Explain, Leave', 'embedding quotes'],
                  hint: 'If stuck on PEEL mechanics, revisit c11_eng_w_cbse_01_014 (Writing Skills: PEEL introduction).',
                  misconception: 'Students believe "embedding quotes" means dropping a full line or stanza into the answer without introduction or analysis.' },
                { id: 'b', prompt: 'In "A Lecture Upon the Shadow," the poet distinguishes between "morning shadowes" and shadows "after noone." Explain in your own words what each type of shadow.', answer: 'Morning shadows are short, cast outward, and "disguises" that hide the lovers\'',
                  options: ['Morning shadows are short, cast outward, and "disguises" that hide the lovers\'', 'morning shadows are short, evening shadows are long', 'embedding quotes'],
                  hint: 'If stuck on PEEL mechanics, revisit c11_eng_w_cbse_01_014 (Writing Skills: PEEL introduction).',
                  misconception: 'Students believe "embedding quotes" means dropping a full line or stanza into the answer without introduction or analysis.' }
          ],
            remediations: { 'embedding-quotes-means-dropping-a': { steps: ['If a student cannot produce a PEEL paragraph under timed conditions: (1) Give them a completed PEEL paragraph on.', '(2) Have them orally rehearse the four moves for a new question before writing.', '(3) Assign a "micro-PEEL" drill: write only the Point and Link sentences for three past-paper questions, then build.', '(4) Re-diagnose using DIAGNOSTIC_QUESTION_3 — if the Point sentence is still descriptive not analytical, return.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, revisit c12_eng_k_cbse_06_008 (imagery/metaphor) and c12_eng_k_cbse_06_009.',
          misconception: 'Students believe a "good discussion" means everyone shares their personal feeling about the poem ("I liked the.',
          parts: [
                { id: 'a', prompt: 'You are leading a discussion on the poem\'s final couplet: "Love is a growing, or full constant light; / And his first minute, after noone, is night." A peer.', answer: 'I\'d say: "The couplet presents a paradox',
                  options: ['I\'d say: "The couplet presents a paradox', 'good discussion', 'I liked the imagery', 'It felt sad'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_06_008 (imagery/metaphor) and c12_eng_k_cbse_06_009.',
                  misconception: 'Students believe a "good discussion" means everyone shares their personal feeling about the poem ("I liked the imagery," "It felt sad") and.' },
                { id: 'b', prompt: 'Compare the discussion dynamics when one student dominates by reading pre-written points versus when all participants build on each other\'s textual.', answer: 'The productive discussion requires *responsive listening*',
                  options: ['The productive discussion requires *responsive listening*', 'politeness', 'not interrupting', 'good discussion'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_06_008 (imagery/metaphor) and c12_eng_k_cbse_06_009.',
                  misconception: 'Students believe a "good discussion" means everyone shares their personal feeling about the poem ("I liked the imagery," "It felt sad") and.' }
          ],
            remediations: { 'a-good-discussion-means-everyone': { steps: ['Have the student re-read the poem silently, marking every concrete noun (shadow, sun, hour, light, night) and verb.', 'Ask them to write one sentence per marked word explaining what that word *does* in the poem\'s argument (e.g., "\'tread\'.', 'Pair them with a peer; each reads their sentences aloud while the listener notes which textual details are referenced.', 'Together, they convert three sentences into discussion prompts using the frame: "How does [specific word/line] shift.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
