import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch05_p1: SimDef = {
    id: 'v3_c8_engl_ch05_p1',
    title: 'Feathered Friend · Part 1/3',
    subtitle: 'A canary in the ultimate coal mine',
    classLevel: 8, subject: 'engl', topic: 'Feathered Friend · Part 1/3',
    chapters: ['c8_engl_ch05'],
    nodeIds: ['c8_engl_ch5_1', 'c8_engl_ch5_10', 'c8_engl_ch5_11', 'c8_engl_ch5_12', 'c8_engl_ch5_13', 'c8_engl_ch5_14'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a crew member aboard the orbital station', intro: 'Welcome to a metal home where floating is normal and fresh air is manufactured. Learn how this fragile artificial world shapes everything — including why someone risked smuggling a bird aboard.', goal: 'Analyze how the space-station setting — zero gravity, artificial air, isolation — drives the plot, the suspense and the theme of \'Feathered Friend\'.' },
    discovery: {
        question: 'On a space station packed with expensive oxygen sensors, what ends up warning the crew that the air is failing? A smuggled canary.',
        options: ['Claribel the canary faints first — a low-tech bird outperforms the high-tech alarms', 'The sensors worked perfectly, so nobody needed warning', 'The crew smelled the oxygen running out', 'The canary was just a cute pet with no role'],
        answer: 'Claribel the canary faints first — a low-tech bird outperforms the high-tech alarms',
        hook: 'The fancier the machines, the scarier their failure. In orbit you can\'t open a window — so when the artificial air thins and the sensors stay silent, survival depends on a little bird doing what birds have done in mines for centuries.',
    },
    teaching: [
        { title: 'Setting: A Space Station in Orbit (Science Fiction)', text: 'In science fiction, the **setting** is the specific time and place (often futuristic or technologically advanced) where the story occurs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch5_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Live inside the orbital station: pour tea that won\'t pour, watch a canary float instead of flap, and feel how a place where every breath is machine-made turns one small pet into a life-or-death alarm.',
        labels: ['Setting: A Space Station', 'Comprehension: How Claribel Survived', 'Critical Thinking: Adapting', 'Writing: Imaginative Writing About', 'Poem: Summary and Central', 'Poem: Rhyme Scheme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch5_1', title: 'Setting: A Space Station in Orbit (Science Fiction)',
          caseStudy: { intro: 'Imagine waking up in a metal room where you cannot open a window to let in a fresh breeze because doing so would instantly pull you into a cold, airless.',
            decisions: [{ prompt: 'What are the two primary physical limitations of the space station setting in "Feathered Friend" that differ from a typical Earth setting?', options: [
                { text: 'The two primary physical limitations are the lack of natural gravity (resulting in a', outcome: 'The two primary physical limitations are the lack of natural gravity (resulting in a low-gravity.' },
                { text: 'high-tech lasers', outcome: 'Not quite — Students often treat a science fiction setting as a "decorative background" or a cool visual stage.', reveals: 'students-often-treat-a-science' },
                { text: 'aliens', outcome: 'Not quite — Students often treat a science fiction setting as a "decorative background" or a cool visual stage.', reveals: 'students-often-treat-a-science' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_10', title: 'Comprehension: How Claribel Survived in Zero Gravity',
          caseStudy: { intro: 'Imagine taking a pet bird from your garden to a space station — what would change?',
            decisions: [{ prompt: 'Why could Claribel not drink water from a normal bowl in zero gravity?', options: [
                { text: 'In zero gravity, water does not stay in a bowl', outcome: 'In zero gravity, water does not stay in a bowl — it forms floating spheres due to surface tension.' },
                { text: 'she wasn\'t thirsty', outcome: 'Not quite — Students read "Claribel survived in space" and conclude that survival was easy or natural.', reveals: 'students-read-claribel-survived-in' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_12', title: 'Writing: Imaginative Writing About Life in a Future Space Station',
          caseStudy: { intro: 'Suppose a student is asked to write about living on a space station and drafts this: *"I woke up on the space station. Space is really big.',
            decisions: [{ prompt: 'What are two essential sensory details required to establish a believable space station setting in creative writing?', options: [
                { text: 'Two essential sensory details are describing microgravity movement (e.g., tethered', outcome: 'Two essential sensory details are describing microgravity movement (e.g., tethered equipment.' },
                { text: 'space is dark and big', outcome: 'Not quite — Students often assume that creative sci-fi writing means inventing wild fantasy events (such.', reveals: 'creative-sci-fi-writing-means' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_13', title: 'Poem: Summary and Central Idea of the Bird Poem',
          caseStudy: { intro: 'Imagine you are telling a friend about a beautiful song you heard on the radio, but you only have 30 seconds before the signal fades — you would share the.',
            decisions: [{ prompt: 'What is the difference between a poem\'s summary and its central idea?', options: [
                { text: 'A summary retells *what happens* in the poem (the sequence of images/events) in order,', outcome: 'A summary retells *what happens* in the poem (the sequence of images/events) in order, while the.' },
                { text: 'They are the same thing', outcome: 'Not quite — Students treat the poem as a mere "verse version" of the prose story *Feathered Friend*, importing.', reveals: 'students-treat-the-poem-as' },
                { text: 'Summary is shorter', outcome: 'Not quite — Students treat the poem as a mere "verse version" of the prose story *Feathered Friend*, importing.', reveals: 'students-treat-the-poem-as' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_14', title: 'Poem: Rhyme Scheme and Musical Quality Analysis',
          caseStudy: { intro: 'Imagine you are sitting in a completely silent, cold room, and suddenly you hear a tiny, rhythmic *chirp-chirp-chirp* outside.',
            decisions: [{ prompt: 'What is the difference between *assonance* and *alliteration*? Provide a brief example of each.', options: [
                { text: 'Alliteration is the repetition of consonant sounds at the *beginning* of closely placed', outcome: 'Alliteration is the repetition of consonant sounds at the *beginning* of closely placed words.' },
                { text: 'alliteration', outcome: 'Not quite — Students often believe that a poem only has "music" if it has perfect, simple end-rhymes (like.', reveals: 'a-poem-only-has-music' },
                { text: 'any sound repetition is called "alliteration', outcome: 'Not quite — Students often believe that a poem only has "music" if it has perfect, simple end-rhymes (like.', reveals: 'a-poem-only-has-music' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A student rewriting \'Feathered Friend\' moves the story to a deep underground bunker on Earth \'because it\'s still isolated and has artificial air — same thing.\' His editor asks if anything essential is lost.',
            decisions: [{ prompt: 'Does the swap preserve what the setting does?', options: [
                { text: 'No — a bunker keeps normal gravity, so the canary\'s effortless slow-motion loops that endear her to the crew vanish; and the station\'s isolation is absolute, thousands of miles from help, which is what makes depending on a bird — after expensive sensors fail — so ironic and so tense.', outcome: 'This evaluates setting element by element: low gravity and unreachable isolation are load-bearing parts of the plot, not interchangeable décor.' },
                { text: 'The swap works — sealed air and isolation are the whole setting, so nothing important changes.', outcome: 'That misses the zero-gravity behaviour that makes the bird special and the spatial isolation that raises the stakes; two of the setting\'s jobs disappear.', reveals: 'bunker-equals-station' },
                { text: 'It actually improves the story — on Earth the crew could just open a window for fresh air whenever oxygen ran low.', outcome: 'Opening a window erases the central survival constraint; the crew\'s total dependence on machines is precisely what the canary\'s warning had to overcome.', reveals: 'open-the-window' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_14', title: 'The bigger picture',
          caseStudy: { intro: 'A sci-fi setting isn\'t decoration — it\'s the rules of survival. No gravity, no air, no escape: the station itself is the antagonist, and a feathered friend is the crew\'s last safety net.',
            decisions: [{ prompt: 'What comes next? Feathered Friend · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Feathered Friend · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch5_1', difficulty: 'standard',
          question: 'In science fiction, the **setting** is the specific time and place (often.',
          hint: 'If stuck, review **c7_engl_ch04_001 (Story Setting: The Jungle, Railway and the Tunnel)**.',
          misconception: 'Students often treat a science fiction setting as a "decorative background" or a cool visual stage that has no real.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In science fiction, the **setting** is the specific time and place (often futuristic or',
                  options: ['In science fiction, the **setting** is the specific time and place (often futuristic or', 'Comprehension of how Claribel the canary survived in zero gravity involves understanding', 'From \'English chapter c8_engl_ch5\': the skill or concept this node teaches, applied to', 'Imaginative writing about life in a future space station is a narrative sci-fi'],
                  hint: 'If stuck, review **c7_engl_ch04_001 (Story Setting: The Jungle, Railway and the Tunnel)**.',
                  misconception: 'Students often treat a science fiction setting as a "decorative background" or a cool visual stage that has no real impact on the.' }
          ],
            remediations: { 'students-often-treat-a-science': { steps: ['If a student struggles to connect the setting to the plot, guide them through a "What-If" contrast exercise: 1.', 'Ask: *"If you get a headache in your classroom right now because the air feels stuffy, what is the easiest thing you.', 'Ask: *"Why can\'t Sven or the narrator do that on the space station?"* (There is a deadly vacuum outside; they would.', 'So, the setting forces them to rely completely on a sealed machine to breathe.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_10', difficulty: 'standard',
          question: 'Comprehension of how Claribel the canary survived in zero gravity involves.',
          hint: 'If students do not understand zero gravity\'s effect on liquids, demonstrate with a water.',
          misconception: 'Students read "Claribel survived in space" and conclude that survival was easy or natural.',
          parts: [
                { id: 'a', prompt: 'Why could Claribel not drink water from a normal bowl in zero gravity?', answer: 'In zero gravity, water does not stay in a bowl',
                  options: ['In zero gravity, water does not stay in a bowl', 'she wasn\'t thirsty'],
                  hint: 'If students do not understand zero gravity\'s effect on liquids, demonstrate with a water droplet.',
                  misconception: 'Students read "Claribel survived in space" and conclude that survival was easy or natural.' },
                { id: 'b', prompt: 'Why was Claribel more vulnerable to air quality problems than the human crew?', answer: 'Birds have a faster metabolism and more efficient respiratory system than humans',
                  options: ['Birds have a faster metabolism and more efficient respiratory system than humans', 'she was smaller'],
                  hint: 'If students do not understand zero gravity\'s effect on liquids, demonstrate with a water droplet.',
                  misconception: 'Students read "Claribel survived in space" and conclude that survival was easy or natural.' },
                { id: 'c', prompt: 'How did the crew\'s solution for feeding Claribel reflect the constraints of space station life?', answer: 'The crew could not use open bowls, loose seeds, or normal water dishes',
                  options: ['The crew could not use open bowls, loose seeds, or normal water dishes', 'they gave her normal bird food', 'normal'],
                  hint: 'If students do not understand zero gravity\'s effect on liquids, demonstrate with a water droplet.',
                  misconception: 'Students read "Claribel survived in space" and conclude that survival was easy or natural.' },
                { id: 'd', prompt: 'What does Claribel\'s survival reveal about the difference between adaptation (something evolving for an environment) and accommodation (something being helped.', answer: 'Claribel is a canary',
                  options: ['Claribel is a canary', 'she adapted to space'],
                  hint: 'If students do not understand zero gravity\'s effect on liquids, demonstrate with a water droplet.',
                  misconception: 'Students read "Claribel survived in space" and conclude that survival was easy or natural.' }
          ],
            remediations: { 'students-read-claribel-survived-in': { steps: ['Have the student list everything Claribel needs to survive (food, water, air, shelter) and ask: "How would each work.', 'Show a diagram of a bird\'s respiratory system (air sacs) vs a human\'s and ask: "Which detects bad air faster?" This.', 'Connect to c8_engl_ch5_5 (science fiction genre): ask how the story uses real science (bird biology, zero gravity).', 'Have the student compare Claribel\'s survival with historical canary use in mines — what is the same?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students read "Claribel survived in space" and conclude that survival was easy or natural.',
          parts: [
                { id: 'a', prompt: 'In the story, Claribel\'s distress alerts the crew to an air problem.', answer: 'It reveals a symbiotic relationship: humans provide food, water, and shelter',
                  options: ['It reveals a symbiotic relationship: humans provide food, water, and shelter', 'she was just a pet'],
                  hint: 'If students do not understand zero gravity\'s effect on liquids, demonstrate with a water droplet.',
                  misconception: 'Students read "Claribel survived in space" and conclude that survival was easy or natural.' }
          ],
            remediations: { 'students-read-claribel-survived-in': { steps: ['Have the student list everything Claribel needs to survive (food, water, air, shelter) and ask: "How would each work.', 'Show a diagram of a bird\'s respiratory system (air sacs) vs a human\'s and ask: "Which detects bad air faster?" This.', 'Connect to c8_engl_ch5_5 (science fiction genre): ask how the story uses real science (bird biology, zero gravity).', 'Have the student compare Claribel\'s survival with historical canary use in mines — what is the same?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_11', difficulty: 'standard',
          question: 'From \'English chapter c8_engl_ch5\': the skill or concept this node teaches.',
          hint: 'If students see only physical challenges, introduce the psychological dimension.',
          misconception: 'Students think space adaptation is purely technological — build better life support, and humans can live in space.',
          parts: [
                { id: 'a', prompt: 'Why does the crew in "Feathered Friend" keep Claribel despite regulations forbidding pets? What does this reveal about the gap between rules and human needs?', answer: 'The crew keeps Claribel',
                  options: ['The crew keeps Claribel', 'they just wanted a pet'],
                  hint: 'If students see only physical challenges, introduce the psychological dimension by asking: "If you.',
                  misconception: 'Students think space adaptation is purely technological — build better life support, and humans can live in space indefinitely.' },
                { id: 'b', prompt: 'Compare technological solutions (exercise machines, air filters) with psychological solutions (pets, communication with Earth) for space adaptation.', answer: 'Neither type alone is sufficient',
                  options: ['Neither type alone is sufficient', 'technology is more important'],
                  hint: 'If students see only physical challenges, introduce the psychological dimension by asking: "If you.',
                  misconception: 'Students think space adaptation is purely technological — build better life support, and humans can live in space indefinitely.' },
                { id: 'c', prompt: 'Real space programs require astronauts to exercise 2 hours daily.', answer: 'Exercise is necessary',
                  options: ['Exercise is necessary', 'exercise keeps them fit'],
                  hint: 'If students see only physical challenges, introduce the psychological dimension by asking: "If you.',
                  misconception: 'Students think space adaptation is purely technological — build better life support, and humans can live in space indefinitely.' }
          ],
            remediations: { 'space-adaptation-is-purely-technological': { steps: ['Have the student list everything a human needs to survive in space, then sort into "physical" and "psychological.".', 'Ask: "If you had perfect technology (infinite air, water, food), would you still need a pet in space?', 'Why?" This forces them to see that psychological needs persist even when physical needs are met.', 'Compare with real space program incidents (astronauts reporting loneliness, conflict) to show the story\'s realism.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_12', difficulty: 'standard',
          question: 'Imaginative writing about life in a future space station is a narrative sci-fi.',
          hint: 'If stuck, review basic sci-fi setting elements from `c8_engl_ch5_1` and practice changing.',
          misconception: 'Students often assume that creative sci-fi writing means inventing wild fantasy events (such as alien attacks.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imaginative writing about life in a future space station is a narrative sci-fi',
                  options: ['Imaginative writing about life in a future space station is a narrative sci-fi', 'In science fiction, the **setting** is the specific time and place (often futuristic or', 'Comprehension of how Claribel the canary survived in zero gravity involves understanding', 'From \'English chapter c8_engl_ch5\': the skill or concept this node teaches, applied to'],
                  hint: 'If stuck, review basic sci-fi setting elements from `c8_engl_ch5_1` and practice changing everyday.',
                  misconception: 'Students often assume that creative sci-fi writing means inventing wild fantasy events (such as alien attacks or magical gravity devices).' }
          ],
            remediations: { 'creative-sci-fi-writing-means': { steps: ['Perform a **"Gravity Audit"** on the student\'s draft: 1.', 'Have the student highlight every verb in their draft (e.g., *walked, dropped, ran, poured*).', 'Ask the key physics question: *"Can this action happen on Earth Earth-style without gravity pulling things down?"* 3.', 'Guide the student to replace terrestrial actions with space-specific mechanics: - *Walked* $\\rightarrow$ *Pushed off.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_13', difficulty: 'standard',
          question: 'A poem\'s summary is a concise restatement of its content, capturing the.',
          hint: 'Review "Stanza-by-Stanza Summary" (c7_engl_ch04_011) using a simple 3-stanza poem.',
          misconception: 'Students treat the poem as a mere "verse version" of the prose story *Feathered Friend*, importing plot details (Sven.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A poem\'s summary is a concise restatement of its content, capturing the sequence of',
                  options: ['A poem\'s summary is a concise restatement of its content, capturing the sequence of', 'In science fiction, the **setting** is the specific time and place (often futuristic or', 'Comprehension of how Claribel the canary survived in zero gravity involves understanding', 'From \'English chapter c8_engl_ch5\': the skill or concept this node teaches, applied to'],
                  hint: 'Review "Stanza-by-Stanza Summary" (c7_engl_ch04_011) using a simple 3-stanza poem; practice the.',
                  misconception: 'Students treat the poem as a mere "verse version" of the prose story *Feathered Friend*, importing plot details (Sven hiding the bird, the.' }
          ],
            remediations: { 'students-treat-the-poem-as': { steps: ['**Isolate the text**: Physically cover the prose story.', 'Give the student *only* the poem on a separate sheet.', '**Force the "Alien Eye"**: Ask: "If you had never read the story, what would you know about the bird *only from these.', '**Stanza Map**: Draw 4 boxes (for 4 stanzas).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_14', difficulty: 'standard',
          question: 'Rhyme scheme is the ordered pattern of rhyming words at the end of the lines.',
          hint: 'If a student is stuck, have them read the final words of each line out loud very slowly.',
          misconception: 'Students often believe that a poem only has "music" if it has perfect, simple end-rhymes (like cat/hat, day/play).',
          parts: [
                { id: 'a', prompt: 'Read these two lines: Line 1: *The heavy door swung shut with a metallic clang.* Line 2: *A silver sliver slips through silent space.* Which line has a higher.', answer: 'Line 2 has a much higher musical quality',
                  options: ['Line 2 has a much higher musical quality', 'exciting words', 'metallic clang'],
                  hint: 'If a student is stuck, have them read the final words of each line out loud very slowly, ignoring.',
                  misconception: 'Students often believe that a poem only has "music" if it has perfect, simple end-rhymes (like cat/hat, day/play).' }
          ],
            remediations: { 'a-poem-only-has-music': { steps: ['**Hear the Rhythm first:** Have the student clap out the syllables of a line without saying the words (e.g., da-DUM.', '**Isolate the Vowels:** Write down three words: *gleam, stream, green*.', 'Ask: "Do they rhyme perfectly?" (No, green ends differently).', '"Do they sound similar?" (Yes, they share the long \'ee\' sound).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
