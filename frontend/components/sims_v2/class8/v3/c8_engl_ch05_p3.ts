import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch05_p3 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch05_p3: SimDef = {
    id: 'v3_c8_engl_ch05_p3',
    title: 'Feathered Friend · Part 3/3',
    subtitle: 'A canary in the ultimate coal mine',
    classLevel: 8, subject: 'engl', topic: 'Feathered Friend · Part 3/3',
    chapters: ['c8_engl_ch05'],
    nodeIds: ['c8_engl_ch5_5', 'c8_engl_ch5_6', 'c8_engl_ch5_7', 'c8_engl_ch5_8', 'c8_engl_ch5_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a crew member aboard the orbital station', intro: 'Welcome to a metal home where floating is normal and fresh air is manufactured. Learn how this fragile artificial world shapes everything — including why someone risked smuggling a bird aboard.', goal: 'Analyze how the space-station setting — zero gravity, artificial air, isolation — drives the plot, the suspense and the theme of \'Feathered Friend\'.' },
    discovery: {
        question: 'On a space station packed with expensive oxygen sensors, what ends up warning the crew that the air is failing? A smuggled canary.',
        options: ['Claribel the canary faints first — a low-tech bird outperforms the high-tech alarms', 'The sensors worked perfectly, so nobody needed warning', 'The crew smelled the oxygen running out', 'The canary was just a cute pet with no role'],
        answer: 'Claribel the canary faints first — a low-tech bird outperforms the high-tech alarms',
        hook: 'The fancier the machines, the scarier their failure. In orbit you can\'t open a window — so when the artificial air thins and the sensors stay silent, survival depends on a little bird doing what birds have done in mines for centuries.',
    },
    teaching: [
        { title: 'Science Fiction Genre: Life in Zero Gravity', text: 'Science fiction (sci-fi) is a genre of literature that uses plausible scientific principles, technology, and futuristic settings—such as life in zero gravity—to explore human behavior and plot.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch5_5', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Live inside the orbital station: pour tea that won\'t pour, watch a canary float instead of flap, and feel how a place where every breath is machine-made turns one small pet into a life-or-death alarm.',
        labels: ['Science Fiction Genre: Life', 'Theme: Companionship and Joy', 'Theme: Human Need', 'Literary Device: Humour', 'Vocabulary in Context: Regulation,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch5_6', title: 'Theme: Companionship and Joy in Isolated Environments',
          caseStudy: { intro: 'Have you ever felt lonely during a long monsoon weekend when you couldn\'t go out to play, but felt instantly better when a pet dog wagged its tail or a bird.',
            decisions: [{ prompt: 'What is the primary physical environment in *Feathered Friend*, and who is the companion that brings joy to this environment?', options: [
                { text: 'The physical environment is a sterile, artificial space station orbiting Earth, and the', outcome: 'The physical environment is a sterile, artificial space station orbiting Earth, and the companion.' },
                { text: 'early warning system', outcome: 'Not quite — Students often believe that the main value of Claribel to the crew was strictly scientific.', reveals: 'the-main-value-of-claribel' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_7', title: 'Theme: Human Need for Connection Beyond Earth',
          caseStudy: { intro: 'Imagine you are locked inside a high-tech, ultra-clean laboratory for three months.',
            decisions: [{ prompt: 'What does the character Sven Olsen bring to the space station that represents a physical connection to Earthly life?', options: [
                { text: 'Sven Olsen brings a small, yellow canary named Claribel to the space station', outcome: 'Sven Olsen brings a small, yellow canary named Claribel to the space station.' },
                { text: 'high-tech survival gear', outcome: 'Not quite — Students often think "Feathered Friend" is simply a fun adventure story about a clever pet bird.', reveals: 'feathered-friend-is-simply-a' },
                { text: 'a mechanical toy', outcome: 'Not quite — Students often think "Feathered Friend" is simply a fun adventure story about a clever pet bird.', reveals: 'feathered-friend-is-simply-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_9', title: 'Vocabulary in Context: Regulation, Forbid, Fuse, Abruptly, Dietitian',
          caseStudy: { intro: 'Imagine you are packing your school bag, and your teacher suddenly announces, "No plastic bottles are allowed from tomorrow; it is a new school regulation.".',
            decisions: [{ prompt: 'What is the difference in part of speech and basic meaning between the verb "to fuse" and the noun "a fuse"?', options: [
                { text: 'The verb "to fuse" means to join, blend, or melt together into a single entity (e.g., "to', outcome: 'The verb "to fuse" means to join, blend, or melt together into a single entity (e.g., "to fuse.' },
                { text: 'only means', outcome: 'Not quite — Students often think "fuse" only means "to join together" (verb) or confuse the electrical noun.', reveals: 'fuse-only-means-to-join' },
                { text: '(verb) or confuse the electrical noun', outcome: 'Not quite — Students often think "fuse" only means "to join together" (verb) or confuse the electrical noun.', reveals: 'fuse-only-means-to-join' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_5', title: 'Use it in the wild',
          caseStudy: { intro: 'A student rewriting \'Feathered Friend\' moves the story to a deep underground bunker on Earth \'because it\'s still isolated and has artificial air — same thing.\' His editor asks if anything essential is lost.',
            decisions: [{ prompt: 'Does the swap preserve what the setting does?', options: [
                { text: 'No — a bunker keeps normal gravity, so the canary\'s effortless slow-motion loops that endear her to the crew vanish; and the station\'s isolation is absolute, thousands of miles from help, which is what makes depending on a bird — after expensive sensors fail — so ironic and so tense.', outcome: 'This evaluates setting element by element: low gravity and unreachable isolation are load-bearing parts of the plot, not interchangeable décor.' },
                { text: 'The swap works — sealed air and isolation are the whole setting, so nothing important changes.', outcome: 'That misses the zero-gravity behaviour that makes the bird special and the spatial isolation that raises the stakes; two of the setting\'s jobs disappear.', reveals: 'bunker-equals-station' },
                { text: 'It actually improves the story — on Earth the crew could just open a window for fresh air whenever oxygen ran low.', outcome: 'Opening a window erases the central survival constraint; the crew\'s total dependence on machines is precisely what the canary\'s warning had to overcome.', reveals: 'open-the-window' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch5_9', title: 'You made it',
          caseStudy: { intro: 'A sci-fi setting isn\'t decoration — it\'s the rules of survival. No gravity, no air, no escape: the station itself is the antagonist, and a feathered friend is the crew\'s last safety net.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch5_5', difficulty: 'standard',
          question: 'Science fiction (sci-fi) is a genre of literature that uses plausible.',
          hint: 'If stuck, review how setting creates constraints in adventure stories.',
          misconception: 'Students often confuse science fiction with fantasy, assuming any story set in space can include impossible, magical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Science fiction (sci-fi) is a genre of literature that uses plausible scientific',
                  options: ['Science fiction (sci-fi) is a genre of literature that uses plausible scientific', 'In science fiction, the **setting** is the specific time and place (often futuristic or', 'Comprehension of how Claribel the canary survived in zero gravity involves understanding', 'From \'English chapter c8_engl_ch5\': the skill or concept this node teaches, applied to'],
                  hint: 'If stuck, review how setting creates constraints in adventure stories (`c7_engl_ch04_001`) and.',
                  misconception: 'Students often confuse science fiction with fantasy, assuming any story set in space can include impossible, magical occurrences without.' }
          ],
            remediations: { 'students-often-confuse-science-fiction': { steps: ['When a student confuses sci-fi rules with fantasy, guide them through the "Science vs.', 'Ask the student: "Could this event happen according to physical laws, even if we need advanced future technology?" 2.', 'Have the student point out two specific physical details in the text that follow real science (e.g., items floating.', 'Ask them to rewrite a scene replacing a fantasy explanation with a physical sci-fi explanation (e.g., replacing "the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_6', difficulty: 'standard',
          question: 'Companionship and joy in isolated environments is a literary theme exploring.',
          hint: 'If you are struggling, think back to how Dr. Dolittle connected with animals to find.',
          misconception: 'Students often believe that the main value of Claribel to the crew was strictly scientific or utilitarian—that they.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the crew members on the space station did not report Sven Olsen for keeping an illegal pet.', answer: 'The crew members did not report Sven',
                  options: ['The crew members did not report Sven', 'early warning system'],
                  hint: 'If you are struggling, think back to how Dr. Dolittle connected with animals to find purpose and.',
                  misconception: 'Students often believe that the main value of Claribel to the crew was strictly scientific or utilitarian—that they kept her because she.' }
          ],
            remediations: { 'the-main-value-of-claribel': { steps: ['To correct this, ask the student: "Before the oxygen system failed, did the crew know Claribel could save their lives?".', 'Explain that they valued her presence for emotional support, not utility.', 'Have them write down one sentence summarizing how Claribel made them *feel* before the emergency happened.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the main value of Claribel to the crew was strictly scientific or utilitarian—that they.',
          parts: [
                { id: 'a', prompt: 'Is the crew\'s relationship with Claribel based purely on utility (how useful she is to them) or on genuine emotional connection?', answer: 'The relationship is based on genuine emotional connection',
                  options: ['The relationship is based on genuine emotional connection', 'early warning system'],
                  hint: 'If you are struggling, think back to how Dr. Dolittle connected with animals to find purpose and.',
                  misconception: 'Students often believe that the main value of Claribel to the crew was strictly scientific or utilitarian—that they kept her because she.' }
          ],
            remediations: { 'the-main-value-of-claribel': { steps: ['To correct this, ask the student: "Before the oxygen system failed, did the crew know Claribel could save their lives?".', 'Explain that they valued her presence for emotional support, not utility.', 'Have them write down one sentence summarizing how Claribel made them *feel* before the emergency happened.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_7', difficulty: 'standard',
          question: 'The "human need for connection beyond Earth" is a literary theme in science.',
          hint: 'If stuck, review how characters interact with animals in Class 7 literature, specifically.',
          misconception: 'Students often think "Feathered Friend" is simply a fun adventure story about a clever pet bird acting as a biological.',
          parts: [
                { id: 'a', prompt: 'What does the character Sven Olsen bring to the space station that represents a physical connection to Earthly life?', answer: 'Sven Olsen brings a small, yellow canary named Claribel to the space station',
                  options: ['Sven Olsen brings a small, yellow canary named Claribel to the space station', 'high-tech survival gear', 'a mechanical toy', 'Feathered Friend'],
                  hint: 'If stuck, review how characters interact with animals in Class 7 literature, specifically "Dr.',
                  misconception: 'Students often think "Feathered Friend" is simply a fun adventure story about a clever pet bird acting as a biological safety alarm (like.' },
                { id: 'b', prompt: 'Why do the crew members choose to keep Claribel\'s presence a secret from the authorities, even though pets are strictly forbidden on the space station?', answer: 'The crew members keep Claribel a secret',
                  options: ['The crew members keep Claribel a secret', 'to break the rules', 'to play a prank on the captain', 'Feathered Friend'],
                  hint: 'If stuck, review how characters interact with animals in Class 7 literature, specifically "Dr.',
                  misconception: 'Students often think "Feathered Friend" is simply a fun adventure story about a clever pet bird acting as a biological safety alarm (like.' }
          ],
            remediations: { 'feathered-friend-is-simply-a': { steps: ['If a student is struggling to see this theme, use this guided intervention: 1.', 'Ask: "If Sven had brought a highly advanced, robotic toy bird that sang perfectly and never needed food or oxygen.', 'Wait for their response, then explain: "No, because a robot is just more metal and programming—the very things they are.', 'They loved Claribel because she was *alive*, unpredictable, and fragile." 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_8', difficulty: 'standard',
          question: 'Humour in descriptions of space station life is a literary device where.',
          hint: 'If you are stuck, think about how funny it would be if you tried to play a game.',
          misconception: 'Students often think that "humor" in a story must mean slapstick comedy, jokes, or characters laughing out loud.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "high-tech vs. low-tech contrast" to explain why Sven Olsen chose to keep a tiny canary as a pet on a space station instead of a high-tech.', answer: '**Step 1:** Identify the contrast (High-Tech Space Station vs',
                  options: ['**Step 1:** Identify the contrast (High-Tech Space Station vs', 'Sven kept it because robots are too expensive'],
                  hint: 'If you are stuck, think about how funny it would be if you tried to play a game of cricket inside.',
                  misconception: 'Students often think that "humor" in a story must mean slapstick comedy, jokes, or characters laughing out loud.' }
          ],
            remediations: { 'humor-in-a-story-must': { steps: ['If a student fails to see the humor, do not just tell them "it is funny." Instead, use the **Expectation vs.', 'Reality T-Chart** method: 1.', 'Draw two columns on a board/paper.', 'Label Column A: "What we expect on a scientific space station" and Column B: "What actually happens in this scene." 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch5_9', difficulty: 'standard',
          question: 'From \'English chapter c8_engl_ch5\': the skill or concept this node teaches.',
          hint: 'If stuck, review the concept of Context Clues from Class 7 (`c7_engl_ch05_007`).',
          misconception: 'Students often think "fuse" only means "to join together" (verb) or confuse the electrical noun "fuse" with the fuse.',
          parts: [
                { id: 'a', prompt: 'In a space station manual, you read: "The command center decided to *forbid* the use of personal heaters to prevent a critical power overload." Based on this.', answer: '"Forbid" means to officially ban or not allow something',
                  options: ['"Forbid" means to officially ban or not allow something', 'to suggest', 'to encourage', 'prevent a critical power overload'],
                  hint: 'If stuck, review the concept of Context Clues from Class 7 (`c7_engl_ch05_007`) to practice looking.',
                  misconception: 'Students often think "fuse" only means "to join together" (verb) or confuse the electrical noun "fuse" with the fuse of a bomb/firecracker.' },
                { id: 'b', prompt: 'Read this sentence: "When the cabin pressure dropped, the alarms rang *abruptly*, causing the crew to drop their tools." Rewrite this sentence replacing.', answer: '**Steps to solve:** 1',
                  options: ['**Steps to solve:** 1', 'gradually', 'loudly', 'abruptly'],
                  hint: 'If stuck, review the concept of Context Clues from Class 7 (`c7_engl_ch05_007`) to practice looking.',
                  misconception: 'Students often think "fuse" only means "to join together" (verb) or confuse the electrical noun "fuse" with the fuse of a bomb/firecracker.' },
                { id: 'c', prompt: 'Read the following paragraph: "The space station’s *dietitian* carefully weighed every gram of dehydrated food.', answer: 'The *dietitian* manages weight limits by weighing food down to the gram',
                  options: ['The *dietitian* manages weight limits by weighing food down to the gram', 'only means', '(verb) or confuse the electrical noun'],
                  hint: 'If stuck, review the concept of Context Clues from Class 7 (`c7_engl_ch05_007`) to practice looking.',
                  misconception: 'Students often think "fuse" only means "to join together" (verb) or confuse the electrical noun "fuse" with the fuse of a bomb/firecracker.' }
          ],
            remediations: { 'fuse-only-means-to-join': { steps: ['Show the student a physical or visual representation of an electrical fuse (a small tube with a thin wire inside).', 'Explain that it acts like a safety gatekeeper for electricity.', 'Contrast this with the action of "fusing" two metal pieces together using heat.', 'Give them two sentences: "We need to fuse these wires together" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
