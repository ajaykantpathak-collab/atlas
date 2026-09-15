import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch19_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch19_p3: SimDef = {
    id: 'v3_c11_eng_w_ch19_p3',
    title: 'Ode to a Nightingale (Poem) · Part 3/3',
    subtitle: 'Follow a mind into the bird\'s timelessness and the violent fall back.',
    classLevel: 11, subject: 'eng_w', topic: 'Ode to a Nightingale (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch19'],
    nodeIds: ['c11_eng_w_cbse_19_013', 'c11_eng_w_cbse_19_014', 'c11_eng_w_cbse_19_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener half-seduced by an immortal song', intro: 'A 24-year-old who has watched his brother die sits in a garden at night — and a bird sings as if hunger had never existed.', goal: 'Distinguish the speaker\'s mortality from the song\'s immortality and evaluate the ambiguous ending.' },
    discovery: {
        question: 'With \'Lethe,\' \'fade away\' and \'rich to die\' everywhere, many read the nightingale as a symbol of death. What does the bird actually carry?',
        options: ['Undying art — the song \'was not born for death,\' heard by emperor and clown across generations while each mortal listener fades', 'Death — the poem\'s whole drift is the wish to die', 'The poet\'s dying brother, straightforwardly', 'A hallucination with no symbolic weight'],
        answer: 'Undying art — the song \'was not born for death,\' heard by emperor and clown across generations while each mortal listener fades',
        hook: 'The death-wish is the speaker\'s, not the bird\'s — the poem\'s engine is the gap between a mortal who aches and a song that outlives him.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text\'s deeper layers—such as thematic tensions, structural choices, and the interplay of literary devices—to form an independent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_19_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Label each of the eight stanzas by mental state — numbness to escape to ecstasy to ejection — then decide whether \'Do I wake or sleep?\' fails or finishes the arc.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are asked: "Why does the speaker\'s mood shift from ecstatic union with the bird to despairing isolation in the final stanza?" Begin by rereading.',
            decisions: [{ prompt: 'What is the classical allusion "Lethe" in stanza 1, and what does it suggest about the speaker\'s initial state of mind?', options: [
                { text: 'Lethe is the river of forgetfulness in Greek mythology', outcome: 'Lethe is the river of forgetfulness in Greek mythology; the speaker compares his numbness to having.' },
                { text: 'a river', outcome: 'Not quite — Students often treat the nightingale as a *personal* symbol of Keats\'s own voice, reading the poem.', reveals: 'students-often-treat-the-nightingale' },
                { text: 'Lethe-wards', outcome: 'Not quite — Students often treat the nightingale as a *personal* symbol of Keats\'s own voice, reading the poem.', reveals: 'students-often-treat-the-nightingale' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you sit in the exam hall and see the question: "How does Keats contrast the immortal bird with mortal man in \'Ode to a Nightingale\'?',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers for CBSE Class 11?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Language', outcome: 'Not quite — Students believe that writing a good literature answer means *retelling the poem\'s story* in their.', reveals: 'writing-a-good-literature-answer' },
                { text: 'Keats feels sad', outcome: 'Not quite — Students believe that writing a good literature answer means *retelling the poem\'s story* in their.', reveals: 'writing-a-good-literature-answer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a literature circle where everyone has read "Ode to a Nightingale" but no one knows how to start a meaningful conversation.',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion point in a classroom setting?', options: [
                { text: 'The primary purpose is to deepen collective understanding of the text by sharing', outcome: 'The primary purpose is to deepen collective understanding of the text by sharing interpretations.' },
                { text: 'to say whether you liked the poem', outcome: 'Not quite — Students often believe a good discussion means speaking frequently and sharing personal feelings.', reveals: 'a-good-discussion-means-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a literature circle, a friend presents \'Ode to a Nightingale\' as \'Keats\'s death poem — the bird is the afterlife calling him, and he wants to die.\' Others nod along. You\'re asked for your reading.',
            decisions: [{ prompt: 'What\'s the nightingale, and what is the poem\'s real arc?', options: [
                { text: 'Separate the speaker\'s longing from the bird\'s meaning: the nightingale is undying art — \'No hungry generations tread thee down\' — a song heard by emperors and Ruth alike. The speaker\'s \'rich to die\' is a death-wish the poem tests and rejects; the real plot is psychological: his mind escapes into the bird\'s world across the stanzas and is violently ejected back by \'forlorn\'.', outcome: 'Context does its work — a 24-year-old nursing a dying brother worshipping beauty as truth — and the ode reads as a journey into imagination and back, not a suicide note.' },
                { text: 'Support the friend\'s reading — \'Lethe\', \'fade away\', and \'rich to die\' all point to death, so the bird is death\'s messenger.', outcome: 'That conflates the speaker\'s mood with the symbol: the bird is precisely what does NOT die — living immortality through song, contrasted with mortal longing.', reveals: 'nightingale-means-death' },
                { text: 'Read it as a nature description — Keats catalogues the forest, wine, flowers, and Ruth as beautiful images.', outcome: 'The stanzas are decisions, not descriptions: \'I cannot see what flowers are at my feet\' is the speaker deliberately constructing a darkness he prefers over painful reality.', reveals: 'ode-is-nature-catalogue' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_015', title: 'You made it',
          caseStudy: { intro: 'The song flees and the ache returns — but the speaker has been somewhere, and the unanswered question is the souvenir.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text\'s deeper.',
          hint: 'Review stanza-by-stanza summary (node 002) and device identification (nodes 008, 009).',
          misconception: 'Students often treat the nightingale as a *personal* symbol of Keats\'s own voice, reading the poem as autobiography.',
          parts: [
                { id: 'a', prompt: 'What is the classical allusion "Lethe" in stanza 1, and what does it suggest about the speaker\'s initial state of mind?', answer: 'Lethe is the river of forgetfulness in Greek mythology',
                  options: ['Lethe is the river of forgetfulness in Greek mythology', 'a river', 'Lethe-wards'],
                  hint: 'Review stanza-by-stanza summary (node 002) and device identification (nodes 008, 009); practice.',
                  misconception: 'Students often treat the nightingale as a *personal* symbol of Keats\'s own voice, reading the poem as autobiography: "Keats wants to die.' },
                { id: 'b', prompt: 'Explain in your own words why the speaker rejects wine in stanza 2 ("Away! away!', answer: 'The speaker rejects wine (Bacchus)',
                  options: ['The speaker rejects wine (Bacchus)', 'he prefers poetry to wine'],
                  hint: 'Review stanza-by-stanza summary (node 002) and device identification (nodes 008, 009); practice.',
                  misconception: 'Students often treat the nightingale as a *personal* symbol of Keats\'s own voice, reading the poem as autobiography: "Keats wants to die.' }
          ],
            remediations: { 'students-often-treat-the-nightingale': { steps: ['Have the student reread stanzas 4 and 7 side-by-side, highlighting every pronoun referring to the bird ("thou," "thee").', 'Ask: "Does the bird die in stanza 7?', 'Guide them to see the bird\'s song *fades* ("buried deep") but the bird itself is unchanged; the speaker remains alive.', 'Assign a quick-write: "Explain why calling the bird \'immortal\' in stanza 4 and \'plaintive\' in stanza 7 is not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter refers to the ability to compose.',
          hint: 'Review c8_engl_ch1_17 (PEEL method) and c7_engl_ch04_015 (embedding quotes) — practice.',
          misconception: 'Students believe that writing a good literature answer means *retelling the poem\'s story* in their own words and adding.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers for CBSE Class 11?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Language', 'Keats feels sad'],
                  hint: 'Review c8_engl_ch1_17 (PEEL method) and c7_engl_ch04_015 (embedding quotes) — practice writing 3.',
                  misconception: 'Students believe that writing a good literature answer means *retelling the poem\'s story* in their own words and adding "Keats feels sad.".' },
                { id: 'b', prompt: 'A student writes: "Keats uses a lot of imagery in the poem to show he is sad." Why is this an inadequate analytical statement for a Class 11 board answer?', answer: 'It is inadequate',
                  options: ['It is inadequate', 'It\'s too short', 'Keats feels sad'],
                  hint: 'Review c8_engl_ch1_17 (PEEL method) and c7_engl_ch04_015 (embedding quotes) — practice writing 3.',
                  misconception: 'Students believe that writing a good literature answer means *retelling the poem\'s story* in their own words and adding "Keats feels sad.".' },
                { id: 'c', prompt: 'Compare these two openings for a 6-mark question on "the tension between escape and reality". Which is better and why?', answer: 'Opening B is superior',
                  options: ['Opening B is superior', 'Keats feels sad'],
                  hint: 'Review c8_engl_ch1_17 (PEEL method) and c7_engl_ch04_015 (embedding quotes) — practice writing 3.',
                  misconception: 'Students believe that writing a good literature answer means *retelling the poem\'s story* in their own words and adding "Keats feels sad.".' }
          ],
            remediations: { 'writing-a-good-literature-answer': { steps: ['**Stop summarising:** Give the student a 3-mark question and ask them to highlight every sentence that is *not*.', 'If >50% is summary, they rewrite using only PEEL.', '**Device-to-Effect Drill:** Provide 5 quotes from the poem (e.g., "leaden-eyed despairs", "beaded bubbles winking").', 'Student must write: "Device: [metaphor/personification].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that writing a good literature answer means *retelling the poem\'s story* in their own words and adding.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s claim: "The poem\'s ending (\'Was it a vision, or a waking dream?\') proves the speaker has successfully escaped reality through.', answer: 'The claim is **invalid**',
                  options: ['The claim is **invalid**', 'sole self', 'Forlorn!', 'Keats feels sad'],
                  hint: 'Review c8_engl_ch1_17 (PEEL method) and c7_engl_ch04_015 (embedding quotes) — practice writing 3.',
                  misconception: 'Students believe that writing a good literature answer means *retelling the poem\'s story* in their own words and adding "Keats feels sad.".' },
                { id: 'b', prompt: 'Write a 2-sentence thesis statement for a comparative essay: "Compare how Keats in \'Ode to a Nightingale\' and Shelley in \'Ode to the West Wind\' use the natural.', answer: '**Model Thesis:** Both Keats and Shelley invoke a natural force',
                  options: ['**Model Thesis:** Both Keats and Shelley invoke a natural force', 'Keats feels sad'],
                  hint: 'Review c8_engl_ch1_17 (PEEL method) and c7_engl_ch04_015 (embedding quotes) — practice writing 3.',
                  misconception: 'Students believe that writing a good literature answer means *retelling the poem\'s story* in their own words and adding "Keats feels sad.".' }
          ],
            remediations: { 'writing-a-good-literature-answer': { steps: ['**Stop summarising:** Give the student a 3-mark question and ask them to highlight every sentence that is *not*.', 'If >50% is summary, they rewrite using only PEEL.', '**Device-to-Effect Drill:** Provide 5 quotes from the poem (e.g., "leaden-eyed despairs", "beaded bubbles winking").', 'Student must write: "Device: [metaphor/personification].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review c11_eng_w_cbse_19_013 (Critical Thinking: Analysis and Interpretation).',
          misconception: 'Students often believe a good discussion means speaking frequently and sharing personal feelings about the poem.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a literary discussion point in a classroom setting?', answer: 'The primary purpose is to deepen collective understanding of the text by sharing',
                  options: ['The primary purpose is to deepen collective understanding of the text by sharing', 'to say whether you liked the poem'],
                  hint: 'If stuck, review c11_eng_w_cbse_19_013 (Critical Thinking: Analysis and Interpretation) for.',
                  misconception: 'Students often believe a good discussion means speaking frequently and sharing personal feelings about the poem.' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['If a student dominates with unsupported opinions: 1) Pause and model an evidence-based contribution: "In stanza 2, the.', '3) Use a talking stick or digital queue to enforce turn-taking.', '4) After discussion, debrief: "Which comments used the text?', 'Which were just reactions?" This makes the invisible criteria visible.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
