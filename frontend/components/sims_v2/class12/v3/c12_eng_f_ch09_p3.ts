import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch09_p3: SimDef = {
    id: 'v3_c12_eng_f_ch09_p3',
    title: 'My Mother at Sixty-six (Poem) · Part 3/3',
    subtitle: 'A mother dozes, the trees sprint — and the daughter looks away',
    classLevel: 12, subject: 'eng_f', topic: 'My Mother at Sixty-six (Poem) · Part 3/3',
    chapters: ['c12_eng_f_ch09'],
    nodeIds: ['c12_eng_f_cbse_09_013', 'c12_eng_f_cbse_09_014', 'c12_eng_f_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poetry reader', intro: 'One airport drive holds every goodbye you\'ve ever feared. Kamala Das wrote it down so we could recognise it.', goal: 'Read My Mother at Sixty-six as confessional poetry where suppressed fear of loss erupts through imagery and irony.' },
    discovery: {
        question: 'Outside the car window: sprinting trees, spilling children. Beside the poet: a mother \'ashen like a corpse.\' Why does Kamala Das put motion next to stillness?',
        options: ['Life racing past a parent drifting toward death — the world\'s vitality throws her mother\'s fading into unbearable relief', 'Just scenery — poems need images', 'The children are her siblings', 'Traffic was simply heavy that day'],
        answer: 'Life racing past a parent drifting toward death — the world\'s vitality throws her mother\'s fading into unbearable relief',
        hook: 'The poem\'s engine isn\'t the airport drive — it\'s the thought she \'put away.\' Confessional poetry runs on suppression and eruption: the old familiar ache, the smile that says \'see you soon\' while fearing otherwise. Kerala\'s matrilineal bond is the cultural weight under every line.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its literal meaning to evaluate the author\'s choices, interpret the significance of literary devices, and synthesize how form.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_09_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Ride that Friday-morning drive inside the poem: track the ashen face, the sprinting trees, the put-away thought, and the final smiling goodbye that costs the daughter everything.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are at an airport saying goodbye to a parent you suddenly realize has become frail.',
            decisions: [{ prompt: 'What is the sentence structure of the poem "My Mother at Sixty-six," and what does the NCERT textbook note about its significance?', options: [
                { text: 'The poem is written as a single sentence punctuated by commas', outcome: 'The poem is written as a single sentence punctuated by commas.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often treat the poem as a simple narrative: "The poet drives to the airport, sees her.', reveals: 'students-often-treat-the-poem' },
                { text: 'It is a sonnet', outcome: 'Not quite — Students often treat the poem as a simple narrative: "The poet drives to the airport, sees her.', reveals: 'students-often-treat-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you open your CBSE English paper and see: "The poet\'s smile at the end is a mask. Do you agree?',
            decisions: [{ prompt: 'What does PEEL stand for in the context of writing literature answers for CBSE Class 12?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing skills based on the chapter" means memorising a few sample answers for.', reveals: 'writing-skills-based-on-the' },
                { text: 'Point, Example, Evaluation, Link', outcome: 'Not quite — Students believe "writing skills based on the chapter" means memorising a few sample answers for.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are at a family gathering and notice your grandmother struggling to read a menu; the moment mirrors the poet\'s sudden realization of her mother\'s.',
            decisions: [{ prompt: 'What is the primary purpose of a "discussion point" in a literature classroom speaking-listening activity?', options: [
                { text: 'A discussion point is a specific, open-ended prompt derived from the text that invites', outcome: 'A discussion point is a specific, open-ended prompt derived from the text that invites varied.' },
                { text: 'to test if students remember the plot', outcome: 'Not quite — Students often treat speaking-listening discussion as "sharing feelings" without textual anchoring.', reveals: 'students-often-treat-speaking-listening' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Driving to the airport for your first hostel term, you notice how old your mother suddenly looks, and a childhood fear of losing her rises in your throat.',
            decisions: [{ prompt: 'What does Kamala Das\'s poem counsel?', options: [
                { text: 'Acknowledge the ache but answer with love and forward motion — the poem ends \'see you soon, Amma\': stay deliberately connected, keep living, don\'t pretend you felt nothing.', outcome: 'The poet puts the thought away only to return to it honestly; love expressed beats fear suppressed.' },
                { text: 'Suppress it — busy yourself with the new term and never look back.', outcome: 'The \'old familiar ache\' returns precisely because it was suppressed; denial postpones the feeling, it doesn\'t resolve it.', reveals: 'suppressing-grief' },
                { text: 'Cancel the plan — staying home forever is the only way to never lose her.', outcome: 'The poem accepts separation as part of life; surrendering your own future is guilt, not love.', reveals: 'guilt-cancels-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a twelve-line drive as a lifetime of love and dread — and see how poets say the unsayable by looking out the window.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'If stuck, review the imagery node (c12_eng_f_cbse_09_008) for the two similes, the.',
          misconception: 'Students often treat the poem as a simple narrative: "The poet drives to the airport, sees her mother looking old.',
          parts: [
                { id: 'a', prompt: 'What is the sentence structure of the poem "My Mother at Sixty-six," and what does the NCERT textbook note about its significance?', answer: 'The poem is written as a single sentence punctuated by commas',
                  options: ['The poem is written as a single sentence punctuated by commas', 'A wrong answer (e.g', 'It is a sonnet'],
                  hint: 'If stuck, review the imagery node (c12_eng_f_cbse_09_008) for the two similes, the symbolism node.',
                  misconception: 'Students often treat the poem as a simple narrative: "The poet drives to the airport, sees her mother looking old, looks at trees and.' },
                { id: 'b', prompt: 'How does the single-sentence structure contribute to the poem\'s portrayal of the poet\'s psychological state during the car ride and at the airport?', answer: 'The single sentence mimics the uninterrupted flow of the car journey, the poet\'s',
                  options: ['The single sentence mimics the uninterrupted flow of the car journey, the poet\'s', 'it makes the poem flow'],
                  hint: 'If stuck, review the imagery node (c12_eng_f_cbse_09_008) for the two similes, the symbolism node.',
                  misconception: 'Students often treat the poem as a simple narrative: "The poet drives to the airport, sees her mother looking old, looks at trees and.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Re-read the poem **aloud**, pausing only at commas.', 'Feel how the sentence refuses to stop.', 'Revisit **c12_eng_f_cbse_09_008** (Imagery and Metaphor) to re-analyze the two similes for the mother and the verbs for.', 'Revisit **c12_eng_f_cbse_09_009** (Irony and Symbolism) to re-examine the "late winter\'s moon" and the smile as ironic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "My Mother at Sixty-six" refer to the.',
          hint: 'If stuck, review the "Think it out" questions in the NCERT (especially Q1, Q2, Q4, Q5).',
          misconception: 'Students believe "writing skills based on the chapter" means memorising a few sample answers for predicted questions.',
          parts: [
                { id: 'a', prompt: 'What does PEEL stand for in the context of writing literature answers for CBSE Class 12?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'Point, Example, Evaluation, Link', 'coherence'],
                  hint: 'If stuck, review the "Think it out" questions in the NCERT (especially Q1, Q2, Q4, Q5) and re-do.',
                  misconception: 'Students believe "writing skills based on the chapter" means memorising a few sample answers for predicted questions.' },
                { id: 'b', prompt: 'A student writes: "The poet sees her mother looking old and pale like a corpse. She feels pain. Then she looks outside at young trees and children.', answer: 'The answer is a mere plot summary',
                  options: ['The answer is a mere plot summary', 'good because it covers the story', 'writing skills based on the chapter'],
                  hint: 'If stuck, review the "Think it out" questions in the NCERT (especially Q1, Q2, Q4, Q5) and re-do.',
                  misconception: 'Students believe "writing skills based on the chapter" means memorising a few sample answers for predicted questions.' },
                { id: 'c', prompt: 'Analyze the following two opening sentences for a 6-mark article on "Caring for Ageing Parents" based on the poem. Which is stronger for a board exam and why?', answer: 'Opening B is stronger',
                  options: ['Opening B is stronger', 'writing skills based on the chapter'],
                  hint: 'If stuck, review the "Think it out" questions in the NCERT (especially Q1, Q2, Q4, Q5) and re-do.',
                  misconception: 'Students believe "writing skills based on the chapter" means memorising a few sample answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student cannot produce a PEEL paragraph after the walkthrough: 1.', '**Revisit Node c12_eng_f_cbse_09_008 (Imagery/Metaphor) and 009 (Irony/Symbolism)** — they must be able to *name* the.', '**Do a "Device Hunt" drill:** Give the student the poem text (or key lines) and ask them to highlight and label 5.', 'No writing, just identification.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means memorising a few sample answers for predicted questions.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s diary entry written from the poet\'s perspective: "Friday. I drove to Cochin airport with Amma. She dozed off and looked like a corpse.', answer: '**Weakness 1 (Format/Voice):** It reads like a factual log, not a diary',
                  options: ['**Weakness 1 (Format/Voice):** It reads like a factual log, not a diary', 'writing skills based on the chapter'],
                  hint: 'If stuck, review the "Think it out" questions in the NCERT (especially Q1, Q2, Q4, Q5) and re-do.',
                  misconception: 'Students believe "writing skills based on the chapter" means memorising a few sample answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student cannot produce a PEEL paragraph after the walkthrough: 1.', '**Revisit Node c12_eng_f_cbse_09_008 (Imagery/Metaphor) and 009 (Irony/Symbolism)** — they must be able to *name* the.', '**Do a "Device Hunt" drill:** Give the student the poem text (or key lines) and ask them to highlight and label 5.', 'No writing, just identification.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points for "My Mother at Sixty-six" refers.',
          hint: 'If stuck, return to c12_eng_f_cbse_09_008 and re-annotate the poem for images; then.',
          misconception: 'Students often treat speaking-listening discussion as "sharing feelings" without textual anchoring, believing personal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points for "My Mother at Sixty-six" refers to',
                  options: ['Speaking and Listening: Discussion Points for "My Mother at Sixty-six" refers to', '"Before You Read: Context and Background" is a pre-reading strategy that prepares', 'Plot and narrative structure in poetry refers to the sequence of events and the', 'Setting in poetry refers to the time, place, and physical environment where the poem'],
                  hint: 'If stuck, return to c12_eng_f_cbse_09_008 and re-annotate the poem for images; then practice.',
                  misconception: 'Students often treat speaking-listening discussion as "sharing feelings" without textual anchoring, believing personal anecdotes alone.' }
          ],
            remediations: { 'students-often-treat-speaking-listening': { steps: ['Revisit c12_eng_f_cbse_09_008 (Imagery and Metaphor) and c12_eng_f_cbse_09_009 (Irony and Symbolism) to rebuild.', 'Practice the "Quote-Comment-Question" routine: pick one line, state its effect in one sentence, pose one open question.', 'Record a 2-minute solo response to a discussion prompt; replay and self-assess: "Did I cite the text?', 'Did I analyze, not just narrate?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
