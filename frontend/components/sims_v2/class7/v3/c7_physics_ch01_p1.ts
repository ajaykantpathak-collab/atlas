import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch01_p1: SimDef = {
    id: 'v3_c7_physics_ch01_p1',
    title: 'The Ever-Evolving World of Science · Part 1/2',
    subtitle: 'Covers the foundational process of formulating questions, designing qualitative and.',
    classLevel: 7, subject: 'physics', topic: 'The Ever-Evolving World of Science · Part 1/2',
    chapters: ['c7_physics_ch01'],
    nodeIds: ['c7_physics_ch01_001', 'c7_physics_ch01_002', 'c7_physics_ch01_003', 'c7_physics_ch01_004', 'c7_physics_ch01_005', 'c7_physics_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Observe water boiling in a kitchen vessel on a stove: bubbles rise, steam escapes, and the water level.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student predicts a toy car will roll faster on carpet than on marble — then the test proves her wrong. She calls the experiment a total failure. Is she right?',
        options: ['No — a test that disproves a guess is still a success, because it rules out a wrong idea and points to a better question', 'Yes — science only counts when your guess wins', 'Yes — she should have guessed marble first', 'No — but only because the car was faulty'],
        answer: 'No — a test that disproves a guess is still a success, because it rules out a wrong idea and points to a better question',
        hook: 'Science begins with a curious question, not a textbook answer — then a guess, then a fair test with controlled variables, then honest records. Data, not neat notebooks, is the evidence that decides.',
    },
    teaching: [
        { title: 'Science as a Process: Asking Questions and Exploring', text: 'Science as a process is a systematic method of inquiry used to investigate natural phenomena, starting from asking curious questions and exploring through observations, experiments, and logical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch01_001', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Design a fair test for a bubbling kitchen question — does sunlight make water evaporate faster — controlling every variable except the one you are testing.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c7_physics_ch01_001', title: 'Science as a Process: Asking Questions and Exploring',
          caseStudy: { intro: 'Observe water boiling in a kitchen vessel on a stove: bubbles rise, steam escapes, and the water level gradually drops.',
            decisions: [{ prompt: 'What is the very first step in the scientific process when encountering an unfamiliar natural phenomenon?', options: [
                { text: 'Asking a curious question based on observation', outcome: 'Asking a curious question based on observation. A wrong answer like "memorizing a textbook.' },
                { text: 'memorizing a textbook definition', outcome: 'Not quite — Students often think that science is just a collection of memorized facts found in textbooks rather.', reveals: 'science-is-just-a-collection' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch01_002', title: 'Interconnectedness of Science Disciplines',
          caseStudy: { intro: 'Observe how a bicycle moves when you pedal down a street in your neighborhood.',
            decisions: [{ prompt: 'Which branch of science primarily deals with forces, motion, energy, and heat transfer as studied in our everyday observations?', options: [
                { text: 'Physics is the branch that primarily deals with forces, motion, energy, and heat transfer', outcome: 'Physics is the branch that primarily deals with forces, motion, energy, and heat transfer.' },
                { text: 'Biology', outcome: 'Not quite — Students often think that school subjects like physics, chemistry, and biology exist as completely.', reveals: 'school-subjects-like-physics' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch01_004', title: 'From Curiosity to Discovery: The Scientific Method',
          caseStudy: { intro: 'Imagine noticing that your bicycle tyres lose air faster during the hot summer months in Delhi compared to the winter season.',
            decisions: [{ prompt: 'What is the very first step a scientist typically takes when beginning an investigation using the scientific method?', options: [
                { text: 'The first step is making an observation and asking a question about a natural phenomenon', outcome: 'The first step is making an observation and asking a question about a natural phenomenon or.' },
                { text: 'writing the final conclusion', outcome: 'Not quite — Students often confuse a hypothesis with a random wild guess or an uneducated opinion, thinking.', reveals: 'students-often-confuse-a-hypothesis' },
                { text: 'building a complex machine', outcome: 'Not quite — Students often confuse a hypothesis with a random wild guess or an uneducated opinion, thinking.', reveals: 'students-often-confuse-a-hypothesis' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch01_005', title: 'Science and Society: Responsibility and Sustainability',
          scaffold: { problem: 'A school in Delhi has 20 classrooms, and each classroom has four 40-watt fluorescent tube lights left burning unnecessarily for 3 hours.',
            steps: [
            { text: 'Identify given values and what to find. Number of classrooms = 20; tubes per room = 4; power of each tube = 40 W; daily.' },
            { text: 'Calculate total power consumed by all wasted lights simultaneously.' },
            { text: 'Convert power from Watts (W) to kilowatts (kW) by dividing by 1000. $P(\\text{kW}) = 3200 / 1000 = 3.2\\text{ kW}$.' },
            { text: 'Calculate total daily energy wasted and then multiply by annual days.' },
            { text: 'Verify that the answer is physically reasonable. Consuming 1920 kWh annually for empty rooms highlights a massive.', faded: true, blankAnswer: '1920 kWh' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch01_006', title: 'Branches of Science: Physics, Chemistry, Biology, Earth Science',
          caseStudy: { intro: 'When you look at a ceiling fan spinning in your classroom or a bicycle moving down an Indian street, you are observing physical phenomena involving motion.',
            decisions: [{ prompt: 'Which branch of science primarily investigates forces, motion, heat, light, and electricity?', options: [
                { text: 'Physics is the branch that studies forces, motion, heat, light, and electricity', outcome: 'Physics is the branch that studies forces, motion, heat, light, and electricity.' },
                { text: 'Biology', outcome: 'Not quite — Students often think that the branches of science (Physics, Chemistry, Biology, Earth Science) are.', reveals: 'the-branches-of-science-physics' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a classroom demo, a flat sheet of paper and the same-size sheet crumpled into a ball are dropped together — the ball lands first. Aryan declares, \'Science already told us: heavy things fall faster,\' and closes the question.',
            decisions: [{ prompt: 'What would a scientific next step look like?', options: [
                { text: 'Treat his claim as a hypothesis and test it: the two sheets have identical mass, so mass cannot explain the result — vary the shape while keeping mass fixed (or repeat with different objects) and record fall times to isolate air resistance as the cause.', outcome: 'This is the scientific process: question, identify the real variable, control the others, and let evidence — not a remembered slogan — decide.' },
                { text: 'Aryan is right to stop — once a result matches a familiar rule, no experiment is needed.', outcome: 'The observation actually contradicts the rule: equal masses fell differently, so the slogan fails and a new variable must be tested.', reveals: 'memorised-rule-settles-it' },
                { text: 'The experiment failed because it disproved the guess, so they should drop the whole thing and pick an easier topic.', outcome: 'A result that disproves a hypothesis is still a success — it rules out a wrong explanation and points at the better question to ask.', reveals: 'disproof-is-failure' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'In science there are no failed experiments — only answers you did not expect. Every wrong guess eliminated is progress.',
            decisions: [{ prompt: 'What comes next? The Ever-Evolving World of Science · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Ever-Evolving World of Science · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch01_001', difficulty: 'standard',
          question: 'Science as a process is a systematic method of inquiry used to investigate.',
          hint: 'Review c6_physics_ch01_002 to re-familiarize with how observations lead to logical.',
          misconception: 'Students often think that science is just a collection of memorized facts found in textbooks rather than an ongoing.',
          parts: [
                { id: 'a', prompt: 'What is the very first step in the scientific process when encountering an unfamiliar natural phenomenon?', answer: 'Asking a curious question based on observation',
                  options: ['Asking a curious question based on observation', 'memorizing a textbook definition'],
                  hint: 'Review c6_physics_ch01_002 to re-familiarize with how observations lead to logical conclusions.',
                  misconception: 'Students often think that science is just a collection of memorized facts found in textbooks rather than an ongoing, active process.' }
          ],
            remediations: { 'science-is-just-a-collection': { steps: ['To fix this, guide the student to perform a hands-on activity where they observe a moving object or changing shadow.', 'Ask them: "What do you see happening right now?" and "What question can you ask about why it changes?" Help them write.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_002', difficulty: 'standard',
          question: 'The interconnectedness of science disciplines is the principle that natural.',
          hint: 'Review Class 6 topics on branches of science to reinforce what physics, chemistry, and.',
          misconception: 'Students often think that school subjects like physics, chemistry, and biology exist as completely separate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The interconnectedness of science disciplines is the principle that natural phenomena',
                  options: ['The interconnectedness of science disciplines is the principle that natural phenomena', 'Science as a process is a systematic method of inquiry used to investigate natural', 'Observation and experimentation form the empirical foundation of science, where', 'The Scientific Method is a systematic, step-by-step logical process used by scientists to'],
                  hint: 'Review Class 6 topics on branches of science to reinforce what physics, chemistry, and biology.',
                  misconception: 'Students often think that school subjects like physics, chemistry, and biology exist as completely separate compartments in the real world.' }
          ],
            remediations: { 'school-subjects-like-physics': { steps: ['To fix this misconception, take a common object like a flashlight and trace all sciences involved: the electric circuit.', 'Guide the student to list observations and consciously tag each one with at least two scientific disciplines to break.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_003', difficulty: 'standard',
          question: 'Observation and experimentation form the empirical foundation of science, where.',
          hint: 'Review c6_physics_ch02_010 to practice basic data documentation before attempting.',
          misconception: 'Students often believe that an experiment is successful only when it proves their initial guess (hypothesis) correct.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Observation and experimentation form the empirical foundation of science, where',
                  options: ['Observation and experimentation form the empirical foundation of science, where', 'Science as a process is a systematic method of inquiry used to investigate natural', 'The interconnectedness of science disciplines is the principle that natural phenomena', 'The Scientific Method is a systematic, step-by-step logical process used by scientists to'],
                  hint: 'Review c6_physics_ch02_010 to practice basic data documentation before attempting multi-variable.',
                  misconception: 'Students often believe that an experiment is successful only when it proves their initial guess (hypothesis) correct, and that getting.' }
          ],
            remediations: { 'an-experiment-is-successful-only': { steps: ['To fix this, guide the student through a contrasting observation: have them mix baking soda and vinegar and observe.', 'Explain that science progresses by asking *why* unexpected things happen, and data that contradicts a hypothesis.', 'Emphasize recording exact measurements regardless of whether they match the original guess.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_004', difficulty: 'standard',
          question: 'The Scientific Method is a systematic, step-by-step logical process used.',
          hint: 'Review c6_physics_ch01_002 to reinforce how simple everyday observations transition into.',
          misconception: 'Students often confuse a hypothesis with a random wild guess or an uneducated opinion, thinking that any statement made.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Scientific Method is a systematic, step-by-step logical process used by scientists to',
                  options: ['The Scientific Method is a systematic, step-by-step logical process used by scientists to', 'Science as a process is a systematic method of inquiry used to investigate natural', 'The interconnectedness of science disciplines is the principle that natural phenomena', 'Observation and experimentation form the empirical foundation of science, where'],
                  hint: 'Review c6_physics_ch01_002 to reinforce how simple everyday observations transition into structured.',
                  misconception: 'Students often confuse a hypothesis with a random wild guess or an uneducated opinion, thinking that any statement made before.' }
          ],
            remediations: { 'students-often-confuse-a-hypothesis': { steps: ['To fix this misconception, guide the student through a structural template for forming hypotheses.', 'Ask them to write every hypothesis using an "If...', 'because..." format connected to a known physical principle from prior classes (such as heat transfer or electrical.', 'Have them test their statement by asking: "Can I measure this with numbers, and is there a way this statement could.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_005', difficulty: 'standard',
          question: 'Science and Society: Responsibility and Sustainability refers to the ethical.',
          hint: 'Review c6_physics_ch01_004 to reconnect everyday observations with scientific tracking.',
          misconception: 'Students often believe that "technology always solves environmental problems," assuming that whatever negative.',
          parts: [
                { id: 'a', prompt: 'A small village uses diesel generators that consume 5 liters of diesel per hour to pump groundwater for irrigation.', answer: 'Identify given values: Fuel consumption rate = 5 liters/hour',
                  options: ['Identify given values: Fuel consumption rate = 5 liters/hour', 'technology always solves environmental problems'],
                  hint: 'Review c6_physics_ch01_004 to reconnect everyday observations with scientific tracking of resources.',
                  misconception: 'Students often believe that "technology always solves environmental problems," assuming that whatever negative ecological impact.' }
          ],
            remediations: { 'technology-always-solves-environmental-problems': { steps: ['To fix this misconception, have the student conduct a mini-audit of household waste for one day, collecting all plastic.', 'Ask them to trace where each item came from (raw materials) and where it goes after being thrown in the dustbin.', 'Discuss how designing products to last longer or using renewable materials prevents waste before it is even created.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "technology always solves environmental problems," assuming that whatever negative.',
          parts: [
                { id: 'a', prompt: 'A factory claims to be "eco-friendly" because it filters the smoke coming out of its chimneys, but it continues to dump untreated chemical waste directly into.', answer: 'No, this practice is not sustainable',
                  options: ['No, this practice is not sustainable', 'technology always solves environmental problems'],
                  hint: 'Review c6_physics_ch01_004 to reconnect everyday observations with scientific tracking of resources.',
                  misconception: 'Students often believe that "technology always solves environmental problems," assuming that whatever negative ecological impact.' }
          ],
            remediations: { 'technology-always-solves-environmental-problems': { steps: ['To fix this misconception, have the student conduct a mini-audit of household waste for one day, collecting all plastic.', 'Ask them to trace where each item came from (raw materials) and where it goes after being thrown in the dustbin.', 'Discuss how designing products to last longer or using renewable materials prevents waste before it is even created.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_006', difficulty: 'standard',
          question: 'Physics is the branch of science that studies matter, energy, motion, force.',
          hint: 'Review c6_physics_ch01_003 to refresh how science is divided into broad observational.',
          misconception: 'Students often think that the branches of science (Physics, Chemistry, Biology, Earth Science) are completely separate.',
          parts: [
                { id: 'a', prompt: 'Which branch of science primarily investigates forces, motion, heat, light, and electricity?', answer: 'Physics is the branch that studies forces, motion, heat, light, and electricity',
                  options: ['Physics is the branch that studies forces, motion, heat, light, and electricity', 'Biology'],
                  hint: 'Review c6_physics_ch01_003 to refresh how science is divided into broad observational categories.',
                  misconception: 'Students often think that the branches of science (Physics, Chemistry, Biology, Earth Science) are completely separate boxes that never.' }
          ],
            remediations: { 'the-branches-of-science-physics': { steps: ['Remediate this by taking a common everyday object, such as a smartphone or a bicycle, and mapping out all four.', 'Show the student that nature does not divide itself into subjects; humans do it to understand different aspects of the.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
