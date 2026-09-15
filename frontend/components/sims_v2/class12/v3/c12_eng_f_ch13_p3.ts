import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch13_p3: SimDef = {
    id: 'v3_c12_eng_f_ch13_p3',
    title: 'A Roadside Stand (Poem) · Part 3/3',
    subtitle: 'A thousand cars an hour — and not one stops',
    classLevel: 12, subject: 'eng_f', topic: 'A Roadside Stand (Poem) · Part 3/3',
    chapters: ['c12_eng_f_ch13'],
    nodeIds: ['c12_eng_f_cbse_13_013', 'c12_eng_f_cbse_13_014', 'c12_eng_f_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poetry and society analyst', intro: 'Every highway has them — stalls nobody stops at. Frost turned one into an accusation aimed at every passing car.', goal: 'Read A Roadside Stand as a Depression-era critique of rural marginalisation and the false charity of top-down rescue.' },
    discovery: {
        question: 'On a Depression-era highway, \'polished traffic\' streaks past a fruit stand without braking. Why does Frost call the government\'s plan to \'gather\' these villagers into towns predatory — not helpful?',
        options: ['Because \'greedy good-doers\' strip rural people of agency — relocation destroys the self-reliance it claims to save', 'Because villages are cheaper', 'Because traffic needs slowing', 'No reason — Frost is just being dramatic'],
        answer: 'Because \'greedy good-doers\' strip rural people of agency — relocation destroys the self-reliance it claims to save',
        hook: 'This isn\'t a quaint farm scene — it\'s economics in verse. The stand owners need city money that never stops; the city needs nothing from them. Frost even confesses the urge to end their pain \'at one stroke\' — then catches himself, because pity without dignity is its own violence.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its literal meaning to uncover underlying themes, evaluate the author\'s choices, interpret symbols, and assess the text\'s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_13_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Decelerate at a roadside stand: read the squeal of brakes, the \'artless paint\' and the waiting sellers as a critique of a cash economy that drives past — then test the poem against India\'s own highway vendors.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re asked: "How does the poet use contrast to highlight Aunt Jennifer\'s plight?" A weak answer might say: "The tigers are free but Aunt Jennifer.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literary analysis answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students think writing a good answer means summarizing the poem line by line or listing all.', reveals: 'writing-a-good-answer-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a literature circle where three classmates just said: "The tigers represent freedom," "No, they represent Aunt Jennifer\'s repressed anger,".',
            decisions: [{ prompt: 'What is the primary purpose of using textual evidence during a literary discussion about a poem?', options: [
                { text: 'The primary purpose is to ground interpretive claims in the poem\'s actual language so', outcome: 'The primary purpose is to ground interpretive claims in the poem\'s actual language so that.' },
                { text: 'to prove you read the poem', outcome: 'Not quite — Students believe "good discussion participation" means speaking frequently, offering many different.', reveals: 'good-discussion-participation-means-speaking' },
                { text: 'good discussion participation', outcome: 'Not quite — Students believe "good discussion participation" means speaking frequently, offering many different.', reveals: 'good-discussion-participation-means-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A new highway bypass leaves a village\'s fruit stalls watching traffic roar past. The council proposes fresh paint and prettier signboards to \'attract the city money\'.',
            decisions: [{ prompt: 'Will a facelift fix it?', options: [
                { text: 'No — Frost\'s roadside stand is about structural exclusion: rural sellers are shut out of the cash flow entirely; the answer is real access — viable locations, linkages to buyers — not cosmetics.', outcome: 'The poem\'s vendors wanted \'city money\', not city approval; paint doesn\'t move money off the highway.' },
                { text: 'Yes — a polished look is what draws passing customers.', outcome: 'The poem\'s drivers speed past indifferent to the stand itself; the failure is economic exclusion, not aesthetics.', reveals: 'cosmetics-over-structure' },
                { text: 'Neither — the sensible thing is for them to abandon the village for the city.', outcome: 'Frost treats their rootedness as legitimate; telling them to migrate just accepts the neglect the poem indicts.', reveals: 'displacement-as-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a fruit stall as a structural argument about who development forgets. The stand is small; the question it asks is enormous.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'If stuck, revisit the symbolism of the wedding band and the tigers in nodes.',
          misconception: 'Students often think the poem is only about a sad old woman and her hobby, missing that Adrienne Rich uses Aunt.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis involves examining a text beyond its literal',
                  options: ['Critical thinking in literary analysis involves examining a text beyond its literal', 'Before You Read: Context and Background is a pre-reading pedagogical activity that', 'Plot and narrative structure in a poem refers to the sequence of events, images, or', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, revisit the symbolism of the wedding band and the tigers in nodes c12_eng_f_cbse_13_008.',
                  misconception: 'Students often think the poem is only about a sad old woman and her hobby, missing that Adrienne Rich uses Aunt Jennifer as.' }
          ],
            remediations: { 'the-poem-is-only-about': { steps: ['If a student cannot articulate the feminist critique, guide them through: (1) Re-read the poem marking every word.', '(2) List the two columns side by side.', '(3) Ask: Who imposes the weight?', '(4) Connect to Rich\'s biography: she was a feminist poet who wrote about women\'s constraints.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refers to the ability to compose.',
          hint: 'If stuck, review the PEEL method from Class 11 writing skills nodes.',
          misconception: 'Students think writing a good answer means summarizing the poem line by line or listing all literary devices they can.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literary analysis answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line'],
                  hint: 'If stuck, review the PEEL method from Class 11 writing skills nodes (c11_eng_h_cbse_01_014.',
                  misconception: 'Students think writing a good answer means summarizing the poem line by line or listing all literary devices they can spot.' }
          ],
            remediations: { 'writing-a-good-answer-means': { steps: ['If a student cannot write a PEEL paragraph, have them: 1) Revisit c12_eng_f_cbse_13_012 (Comprehension) to practice.', '2) Revisit c12_eng_f_cbse_13_008 and 009 (Literary Devices) to recall device names and examples.', '3) Practice with a scaffolded template: "The poet uses [device] in [line/stanza] to show [point].', 'This is seen in \'[quote]\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'Revisit c12_eng_f_cbse_13_013 (Critical Thinking) and practice the.',
          misconception: 'Students believe "good discussion participation" means speaking frequently, offering many different ideas, or "winning".',
          parts: [
                { id: 'a', prompt: 'During a discussion on stanza 2, you want to introduce the idea that the "ivory needle" symbolizes the inaccessibility of artistic creation for Aunt Jennifer.', answer: 'Use the "bridge-and-extend" frame: "Connecting to Priya\'s observation about the',
                  options: ['Use the "bridge-and-extend" frame: "Connecting to Priya\'s observation about the', 'bridge-and-extend', 'A wrong answer that ignores the prior comment (', 'good discussion participation'],
                  hint: 'Revisit c12_eng_f_cbse_13_013 (Critical Thinking) and practice the "Quote-Explain-Connect" drill.',
                  misconception: 'Students believe "good discussion participation" means speaking frequently, offering many different ideas, or "winning" the argument.' },
                { id: 'b', prompt: 'Compare these two discussion contributions about the final stanza: Speaker A: "The tigers will keep prancing after Aunt Jennifer dies — art is immortal.".', answer: 'Speaker B demonstrates higher-order analysis',
                  options: ['Speaker B demonstrates higher-order analysis', 'good discussion participation', 'winning'],
                  hint: 'Revisit c12_eng_f_cbse_13_013 (Critical Thinking) and practice the "Quote-Explain-Connect" drill.',
                  misconception: 'Students believe "good discussion participation" means speaking frequently, offering many different ideas, or "winning" the argument.' }
          ],
            remediations: { 'good-discussion-participation-means-speaking': { steps: ['**Diagnose the specific gap**: Record a 3-minute discussion snippet; replay and tag each utterance as [EVIDENCE].', '**Targeted drill**: Practice the "Evidence-First" protocol — before speaking, write down the exact line number you\'ll.', '**Scaffolded re-attempt**: Run a 5-minute fishbowl discussion on stanza 1 only, with observer checklist: "Did each.', 'Did each speaker acknowledge the prior speaker?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "good discussion participation" means speaking frequently, offering many different ideas, or "winning".',
          parts: [
                { id: 'a', prompt: 'Evaluate this discussion prompt for a group analyzing "Aunt Jennifer\'s Tigers": "Do you think Aunt Jennifer is a victim?', answer: 'Flaws: (1) *Binary framing*',
                  options: ['Flaws: (1) *Binary framing*', 'A wrong evaluation that calls the prompt', 'good discussion participation', 'winning'],
                  hint: 'Revisit c12_eng_f_cbse_13_013 (Critical Thinking) and practice the "Quote-Explain-Connect" drill.',
                  misconception: 'Students believe "good discussion participation" means speaking frequently, offering many different ideas, or "winning" the argument.' }
          ],
            remediations: { 'good-discussion-participation-means-speaking': { steps: ['**Diagnose the specific gap**: Record a 3-minute discussion snippet; replay and tag each utterance as [EVIDENCE].', '**Targeted drill**: Practice the "Evidence-First" protocol — before speaking, write down the exact line number you\'ll.', '**Scaffolded re-attempt**: Run a 5-minute fishbowl discussion on stanza 1 only, with observer checklist: "Did each.', 'Did each speaker acknowledge the prior speaker?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
