import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch05_p2: SimDef = {
    id: 'v3_c8_engl_ch05_p2',
    title: 'Feathered Friend · Part 2/3',
    subtitle: 'A canary in the ultimate coal mine',
    classLevel: 8, subject: 'engl', topic: 'Feathered Friend · Part 2/3',
    chapters: ['c8_engl_ch05'],
    nodeIds: ['c8_engl_ch5_15', 'c8_engl_ch5_16', 'c8_engl_ch5_17', 'c8_engl_ch5_2', 'c8_engl_ch5_3', 'c8_engl_ch5_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a crew member aboard the orbital station', intro: 'Welcome to a metal home where floating is normal and fresh air is manufactured. Learn how this fragile artificial world shapes everything — including why someone risked smuggling a bird aboard.', goal: 'Analyze how the space-station setting — zero gravity, artificial air, isolation — drives the plot, the suspense and the theme of \'Feathered Friend\'.' },
    discovery: {
        question: 'On a space station packed with expensive oxygen sensors, what ends up warning the crew that the air is failing? A smuggled canary.',
        options: ['Claribel the canary faints first — a low-tech bird outperforms the high-tech alarms', 'The sensors worked perfectly, so nobody needed warning', 'The crew smelled the oxygen running out', 'The canary was just a cute pet with no role'],
        answer: 'Claribel the canary faints first — a low-tech bird outperforms the high-tech alarms',
        hook: 'The fancier the machines, the scarier their failure. In orbit you can\'t open a window — so when the artificial air thins and the sensors stay silent, survival depends on a little bird doing what birds have done in mines for centuries.',
    },
    teaching: [
        { title: 'Poetic Devices: Simile and Metaphor in the Bird Poem', text: 'A **simile** is a figure of speech that directly compares two different things using explicit comparative words such as "like" or "as".', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch5_15', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Live inside the orbital station: pour tea that won\'t pour, watch a canary float instead of flap, and feel how a place where every breath is machine-made turns one small pet into a life-or-death alarm.',
        labels: ['Poetic Devices: Simile', 'Poem: Tone of Freedom', 'Writing: Structuring a Comparative', 'Character Analysis: Sven Olsen', 'Character Analysis: Claribel', 'Plot: Keeping a Pet'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch5_15', title: 'Poetic Devices: Simile and Metaphor in the Bird Poem',
          caseStudy: { intro: 'Imagine you are sitting on your balcony in Delhi on a quiet morning, watching a small sparrow hop around.',
            decisions: [{ prompt: 'What is the structural difference between a simile and a metaphor? Provide one short example of each describing a bird.', options: [
                { text: 'A simile compares two things using "like" or "as" (e.g., "The eagle swooped like a', outcome: 'A simile compares two things using "like" or "as" (e.g., "The eagle swooped like a thunderbolt").' },
                { text: 'in poetic lines', outcome: 'Not quite — Students often assume that any sentence containing the word "like" is automatically a simile.', reveals: 'any-sentence-containing-the-word' },
                { text: 'any sentence containing the word "like" is automatically a simile', outcome: 'Not quite — Students often assume that any sentence containing the word "like" is automatically a simile.', reveals: 'any-sentence-containing-the-word' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_16', title: 'Poem: Tone of Freedom and Joy in the Bird Poem',
          caseStudy: { intro: 'Have you ever watched a sparrow break away from a perch on a sunny morning, burst into song, and dart across the open sky?',
            decisions: [{ prompt: 'Define poetic \'tone\' in your own words, and list two specific word choices (diction) that indicate a joyful tone in bird poetry.', options: [
                { text: 'Poetic tone is the author\'s or speaker\'s attitude toward the subject matter, conveyed', outcome: 'Poetic tone is the author\'s or speaker\'s attitude toward the subject matter, conveyed through word.' },
                { text: 'what the poem is about', outcome: 'Not quite — Students frequently confuse the **subject matter** of a poem with its **tone**, assuming that any.', reveals: 'students-frequently-confuse-the-subject' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_3', title: 'Character Analysis: Claribel the Canary as the \'Feathered Friend\'',
          caseStudy: { intro: 'Imagine you\'re astronaut training for months in a tiny simulator—what small piece of home would keep you from feeling utterly alone?',
            decisions: [{ prompt: 'What is the primary purpose of analyzing a character like Claribel in a story?', options: [
                { text: 'B) To explain how she helps develop the story\'s theme', outcome: 'B) To explain how she helps develop the story\'s theme. A wrong answer choosing A or C shows the.' },
                { text: 'happiness', outcome: 'Not quite — Students think Claribel\'s role is solely to provide "happiness" through generic cuteness (e.g.', reveals: 'claribel-s-role-is-solely' },
                { text: 'She\'s cute so Sven smiles', outcome: 'Not quite — Students think Claribel\'s role is solely to provide "happiness" through generic cuteness (e.g.', reveals: 'claribel-s-role-is-solely' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_15', title: 'Use it in the wild',
          caseStudy: { intro: 'A student rewriting \'Feathered Friend\' moves the story to a deep underground bunker on Earth \'because it\'s still isolated and has artificial air — same thing.\' His editor asks if anything essential is lost.',
            decisions: [{ prompt: 'Does the swap preserve what the setting does?', options: [
                { text: 'No — a bunker keeps normal gravity, so the canary\'s effortless slow-motion loops that endear her to the crew vanish; and the station\'s isolation is absolute, thousands of miles from help, which is what makes depending on a bird — after expensive sensors fail — so ironic and so tense.', outcome: 'This evaluates setting element by element: low gravity and unreachable isolation are load-bearing parts of the plot, not interchangeable décor.' },
                { text: 'The swap works — sealed air and isolation are the whole setting, so nothing important changes.', outcome: 'That misses the zero-gravity behaviour that makes the bird special and the spatial isolation that raises the stakes; two of the setting\'s jobs disappear.', reveals: 'bunker-equals-station' },
                { text: 'It actually improves the story — on Earth the crew could just open a window for fresh air whenever oxygen ran low.', outcome: 'Opening a window erases the central survival constraint; the crew\'s total dependence on machines is precisely what the canary\'s warning had to overcome.', reveals: 'open-the-window' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_4', title: 'The bigger picture',
          caseStudy: { intro: 'A sci-fi setting isn\'t decoration — it\'s the rules of survival. No gravity, no air, no escape: the station itself is the antagonist, and a feathered friend is the crew\'s last safety net.',
            decisions: [{ prompt: 'What comes next? Feathered Friend · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Feathered Friend · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch5_15', difficulty: 'standard',
          question: 'A **simile** is a figure of speech that directly compares two different things.',
          hint: 'If stuck, review how adjectives describe nouns. A simile or metaphor is simply a dramatic.',
          misconception: 'Students often assume that any sentence containing the word "like" is automatically a simile.',
          parts: [
                { id: 'a', prompt: 'Read this line: "The parrot’s beak was a curved cherry, bright and sharp." Is this a simile or a metaphor? Explain how you know.', answer: 'This is a metaphor',
                  options: ['This is a metaphor', 'any sentence containing the word "like" is automatically a simile'],
                  hint: 'If stuck, review how adjectives describe nouns. A simile or metaphor is simply a dramatic way.',
                  misconception: 'Students often assume that any sentence containing the word "like" is automatically a simile.' },
                { id: 'b', prompt: 'Read these two descriptions of a bird\'s song: - **Line A:** "Her voice was like a silver bell ringing in the quiet night." - **Line B:** "Her voice was a sharp.', answer: 'Line A creates a calm, beautiful, and comforting mood',
                  options: ['Line A creates a calm, beautiful, and comforting mood', 'vehicle', 'any sentence containing the word "like" is automatically a simile'],
                  hint: 'If stuck, review how adjectives describe nouns. A simile or metaphor is simply a dramatic way.',
                  misconception: 'Students often assume that any sentence containing the word "like" is automatically a simile.' }
          ],
            remediations: { 'any-sentence-containing-the-word': { steps: ['If a student makes this mistake, use the **"Two-Category Test"**: 1.', 'Draw two boxes on a piece of paper.', 'Put the first item in Box A and the second in Box B.', 'Ask the student: *"Are these two completely different types of things in the real world?"* (e.g., Sparrow and Airplane.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_15', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that any sentence containing the word "like" is automatically a simile.',
          parts: [
                { id: 'a', prompt: 'A classmate says: "Metaphors are always better than similes because they sound more poetic." Evaluate this statement. Do you agree or disagree?', answer: 'I disagree with this statement',
                  options: ['I disagree with this statement', 'ranking', 'any sentence containing the word "like" is automatically a simile'],
                  hint: 'If stuck, review how adjectives describe nouns. A simile or metaphor is simply a dramatic way.',
                  misconception: 'Students often assume that any sentence containing the word "like" is automatically a simile.' }
          ],
            remediations: { 'any-sentence-containing-the-word': { steps: ['If a student makes this mistake, use the **"Two-Category Test"**: 1.', 'Draw two boxes on a piece of paper.', 'Put the first item in Box A and the second in Box B.', 'Ask the student: *"Are these two completely different types of things in the real world?"* (e.g., Sparrow and Airplane.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_16', difficulty: 'standard',
          question: 'Tone in poetry refers to the poet\'s or speaker\'s attitude toward the subject.',
          hint: 'If stuck, review `c8_engl_ch5_13` to revisit the central theme of the bird poem before.',
          misconception: 'Students frequently confuse the **subject matter** of a poem with its **tone**, assuming that any poem featuring a bird.',
          parts: [
                { id: 'a', prompt: 'Read this excerpt description: *The bird beat its wings against the narrow iron wires, its cry sharp and shrill.* Does this line convey a tone of freedom and.', answer: 'No, the original line conveys a constrained, distressed tone',
                  options: ['No, the original line conveys a constrained, distressed tone', 'narrow iron wires', 'endless blue sky', 'cry sharp and shrill'],
                  hint: 'If stuck, review `c8_engl_ch5_13` to revisit the central theme of the bird poem before isolating.',
                  misconception: 'Students frequently confuse the **subject matter** of a poem with its **tone**, assuming that any poem featuring a bird must automatically.' }
          ],
            remediations: { 'students-frequently-confuse-the-subject': { steps: ['Create a two-column chart labeled "Heavy / Trapped Words" vs.', 'Give the student a list of words from various bird poems: *boundless, iron, soaring, shadow, trilling, narrow, radiant.', 'Guide the student to categorize each word based on how it feels in their mouth and mind.', 'Have them re-read the poem passage, highlighting only the words that appear in the "Light / Free Words" column.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_17', difficulty: 'standard',
          question: 'A comparative literature answer is a structured response that analyzes the.',
          hint: 'If stuck, review how to identify a poem\'s central idea in `c8_engl_ch5_13` and how.',
          misconception: '',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A comparative literature answer is a structured response that analyzes the thematic,',
                  options: ['A comparative literature answer is a structured response that analyzes the thematic,', 'In science fiction, the **setting** is the specific time and place (often futuristic or', 'Comprehension of how Claribel the canary survived in zero gravity involves understanding', 'Critical thinking about adapting to life in space involves evaluating the challenges'],
                  hint: 'If stuck, review how to identify a poem\'s central idea in `c8_engl_ch5_13` and how to trace prose.',
                  misconception: '' }
          ],
            remediations: { 'wrong-idea': { steps: ['If a student falls into the "Double-Summary" trap, follow this step-by-step remediation: 1.', '**Draw a Comparative T-Chart:** Draw a T-Chart on a page.', 'Label the left side "Prose: Feathered Friend" and the right side "The Bird Poem".', '**Align the Points:** Force the student to write matching elements directly opposite each other.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_2', difficulty: 'standard',
          question: 'Character analysis of Sven Olsen involves examining how Arthur C.',
          hint: 'If stuck, review how character actions (like building a tiny cage in secret) reveal.',
          misconception: 'Students often assume that because Sven Olsen is introduced as a construction worker (girder-man), he must be.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of Sven Olsen involves examining how Arthur C',
                  options: ['Character analysis of Sven Olsen involves examining how Arthur C', 'In science fiction, the **setting** is the specific time and place (often futuristic or', 'Comprehension of how Claribel the canary survived in zero gravity involves understanding', 'Critical thinking about adapting to life in space involves evaluating the challenges'],
                  hint: 'If stuck, review how character actions (like building a tiny cage in secret) reveal internal.',
                  misconception: 'Students often assume that because Sven Olsen is introduced as a construction worker (girder-man), he must be an uneducated, uncreative.' }
          ],
            remediations: { 'because-sven-olsen-is-introduced': { steps: ['Direct the student to re-read the passages where Sven\'s physical work and his interactions with Claribel are described.', 'Use a Venn Diagram exercise: Label Circle A as "Construction Worker Skills" (precision, structural knowledge, handling.', 'Show the student that the overlapping center represents Sven Olsen\'s full character personality.', 'Have the student rewrite their character description using the PEEL structure (Point, Evidence, Explanation, Link).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_3', difficulty: 'standard',
          question: 'Character analysis of Claribel the Canary involves examining her specific.',
          hint: 'Review how Polynesia the Parrot\'s *ability to speak* created a practical communication.',
          misconception: 'Students think Claribel\'s role is solely to provide "happiness" through generic cuteness (e.g., "She\'s cute so Sven.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of analyzing a character like Claribel in a story?', answer: 'B) To explain how she helps develop the story\'s theme',
                  options: ['B) To explain how she helps develop the story\'s theme', 'happiness', 'She\'s cute so Sven smiles', 'Claribel\'s role is solely to provide "happiness" through generic cuteness (e'],
                  hint: 'Review how Polynesia the Parrot\'s *ability to speak* created a practical communication bridge for.',
                  misconception: 'Students think Claribel\'s role is solely to provide "happiness" through generic cuteness (e.g., "She\'s cute so Sven smiles"), missing how.' }
          ],
            remediations: { 'claribel-s-role-is-solely': { steps: ['To fix this, first have the student list 3 things Claribel *does* that a rock or robot couldn\'t do (e.g., sing.', 'Then, for each, ask: "How would Sven feel if this *stopped* happening?" Guide them to see that her *needs* (food.', 'Finally, have them rewrite a "cute pet" sentence using one specific behavior: Instead of "Claribel made Sven happy,".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_4', difficulty: 'standard',
          question: 'Plot is the ordered sequence of events in a story—exposition, rising action.',
          hint: 'If stuck, review “Setting: A Space Station in Orbit” (c8_engl_ch5_1) and “Character.',
          misconception: 'Students often think plot is just a list of what happens in order, ignoring cause‑and‑effect and the role of setting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot is the ordered sequence of events in a story—exposition, rising action, climax,',
                  options: ['Plot is the ordered sequence of events in a story—exposition, rising action, climax,', 'In science fiction, the **setting** is the specific time and place (often futuristic or', 'Comprehension of how Claribel the canary survived in zero gravity involves understanding', 'Critical thinking about adapting to life in space involves evaluating the challenges'],
                  hint: 'If stuck, review “Setting: A Space Station in Orbit” (c8_engl_ch5_1) and “Character Analysis: Sven.',
                  misconception: 'Students often think plot is just a list of what happens in order, ignoring cause‑and‑effect and the role of setting.' }
          ],
            remediations: { 'plot-is-just-a-list': { steps: ['Teach the student to ask three questions for each event: (1) What problem does this create or reveal?', '(2) How does this make the next event more likely or necessary?', '(3) Does this event increase tension, decrease it, or solve the conflict?', 'Use a simple flowchart: write each event in a box, then draw arrows labelled with the answer to question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
