import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch01_p2: SimDef = {
    id: 'v3_c7_physics_ch01_p2',
    title: 'The Ever-Evolving World of Science · Part 2/2',
    subtitle: 'Covers the historical and logical progression of scientific models from simple.',
    classLevel: 7, subject: 'physics', topic: 'The Ever-Evolving World of Science · Part 2/2',
    chapters: ['c7_physics_ch01'],
    nodeIds: ['c7_physics_ch01_007', 'c7_physics_ch01_008', 'c7_physics_ch01_009', 'c7_physics_ch01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Observe how a simple household torchlight works using a battery and bulb—a concept built upon in earlier.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student predicts a toy car will roll faster on carpet than on marble — then the test proves her wrong. She calls the experiment a total failure. Is she right?',
        options: ['No — a test that disproves a guess is still a success, because it rules out a wrong idea and points to a better question', 'Yes — science only counts when your guess wins', 'Yes — she should have guessed marble first', 'No — but only because the car was faulty'],
        answer: 'No — a test that disproves a guess is still a success, because it rules out a wrong idea and points to a better question',
        hook: 'Science begins with a curious question, not a textbook answer — then a guess, then a fair test with controlled variables, then honest records. Data, not neat notebooks, is the evidence that decides.',
    },
    teaching: [
        { title: 'How Scientific Ideas Build on Each Other', text: 'How scientific ideas build on each other is the cumulative process by which new observations, experiments, and technological tools refine, expand, or revolutionize existing scientific models without.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch01_007', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Design a fair test for a bubbling kitchen question — does sunlight make water evaporate faster — controlling every variable except the one you are testing.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c7_physics_ch01_007', title: 'How Scientific Ideas Build on Each Other',
          caseStudy: { intro: 'Observe how a simple household torchlight works using a battery and bulb—a concept built upon in earlier studies—and consider how engineers eventually replaced.',
            decisions: [{ prompt: 'What term best describes how modern scientific theories develop from older, simpler ideas through continuous testing, observation, and.', options: [
                { text: 'Cumulative building or scientific evolution', outcome: 'Cumulative building or scientific evolution. A student who answers "guessing" or "luck" misses the.' },
                { text: 'guessing', outcome: 'Not quite — Students often think that scientific progress happens overnight through sudden, unrelated.', reveals: 'scientific-progress-happens-overnight-through' },
                { text: 'Eureka moments', outcome: 'Not quite — Students often think that scientific progress happens overnight through sudden, unrelated.', reveals: 'scientific-progress-happens-overnight-through' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch01_008', title: 'The Role of Experiments in Understanding Nature',
          caseStudy: { intro: 'When you watch a ceiling fan spin faster after turning up the regulator, or notice a metal spoon getting hot in a cup of hot chai, you are observing nature.',
            decisions: [{ prompt: 'What is the primary purpose of keeping certain factors constant (controlled variables) during a scientific experiment?', options: [
                { text: 'Controlled variables ensure that any change observed in the dependent variable is caused', outcome: 'Controlled variables ensure that any change observed in the dependent variable is caused *only*.' },
                { text: 'failed', outcome: 'Not quite — Students often think that if an experiment does not turn out the way they expected or hoped, it.', reveals: 'if-an-experiment-does-not' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch01_009', title: 'Environmental Challenges and the Role of Science',
          caseStudy: { intro: 'Observe how a local water body near your school or home changes in color, temperature, or clarity over a week, or notice the heat trapped in concrete urban.',
            decisions: [{ prompt: 'What is the primary goal of applying scientific methods to environmental challenges?', options: [
                { text: 'The primary goal is to systematically observe, measure, and understand ecological issues', outcome: 'The primary goal is to systematically observe, measure, and understand ecological issues so that.' },
                { text: 'turning off a single light switch has no measurable impact', outcome: 'Not quite — Students often think that environmental challenges like global warming or pollution are too large.', reveals: 'environmental-challenges-like-global-warming' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch01_010', title: 'Science as an Ongoing Process of Discovery',
          caseStudy: { intro: 'Observe how a simple household ceiling fan running at high speed creates a blur, making individual blades invisible until you turn it off and inspect its.',
            decisions: [{ prompt: 'What term best describes the scientific habit of questioning established ideas and testing them against new evidence rather than accepting.', options: [
                { text: 'Scientific temper', outcome: 'Scientific temper. A student who answers "memorization" or "assumption" reveals a misunderstanding.' },
                { text: 'memorization', outcome: 'Not quite — Students often think science is a static collection of absolute "facts" memorized from a textbook.', reveals: 'science-is-a-static-collection' },
                { text: 'assumption', outcome: 'Not quite — Students often think science is a static collection of absolute "facts" memorized from a textbook.', reveals: 'science-is-a-static-collection' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a classroom demo, a flat sheet of paper and the same-size sheet crumpled into a ball are dropped together — the ball lands first. Aryan declares, \'Science already told us: heavy things fall faster,\' and closes the question.',
            decisions: [{ prompt: 'What would a scientific next step look like?', options: [
                { text: 'Treat his claim as a hypothesis and test it: the two sheets have identical mass, so mass cannot explain the result — vary the shape while keeping mass fixed (or repeat with different objects) and record fall times to isolate air resistance as the cause.', outcome: 'This is the scientific process: question, identify the real variable, control the others, and let evidence — not a remembered slogan — decide.' },
                { text: 'Aryan is right to stop — once a result matches a familiar rule, no experiment is needed.', outcome: 'The observation actually contradicts the rule: equal masses fell differently, so the slogan fails and a new variable must be tested.', reveals: 'memorised-rule-settles-it' },
                { text: 'The experiment failed because it disproved the guess, so they should drop the whole thing and pick an easier topic.', outcome: 'A result that disproves a hypothesis is still a success — it rules out a wrong explanation and points at the better question to ask.', reveals: 'disproof-is-failure' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch01_010', title: 'You made it',
          caseStudy: { intro: 'In science there are no failed experiments — only answers you did not expect. Every wrong guess eliminated is progress.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch01_007', difficulty: 'standard',
          question: 'How scientific ideas build on each other is the cumulative process by which new.',
          hint: 'Review c6_physics_ch01_002 (The Scientific Method: Observation to Conclusion) to remember.',
          misconception: 'Students often think that scientific progress happens overnight through sudden, unrelated breakthroughs ("Eureka.',
          parts: [
                { id: 'a', prompt: 'What term best describes how modern scientific theories develop from older, simpler ideas through continuous testing, observation, and technological.', answer: 'Cumulative building or scientific evolution',
                  options: ['Cumulative building or scientific evolution', 'guessing', 'Eureka moments'],
                  hint: 'Review c6_physics_ch01_002 (The Scientific Method: Observation to Conclusion) to remember how.',
                  misconception: 'Students often think that scientific progress happens overnight through sudden, unrelated breakthroughs ("Eureka moments") rather than.' }
          ],
            remediations: { 'scientific-progress-happens-overnight-through': { steps: ['To correct this, take a familiar object like a school bicycle and have the student trace every component back to its.', 'Show them that no single person invented the entire bicycle; instead, each inventor added a new piece to an already.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that scientific progress happens overnight through sudden, unrelated breakthroughs ("Eureka.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "If a new experiment gives a result that does not match an older scientific theory, the older theory must have been completely.', answer: 'This judgment is invalid',
                  options: ['This judgment is invalid', 'Eureka moments'],
                  hint: 'Review c6_physics_ch01_002 (The Scientific Method: Observation to Conclusion) to remember how.',
                  misconception: 'Students often think that scientific progress happens overnight through sudden, unrelated breakthroughs ("Eureka moments") rather than.' }
          ],
            remediations: { 'scientific-progress-happens-overnight-through': { steps: ['To correct this, take a familiar object like a school bicycle and have the student trace every component back to its.', 'Show them that no single person invented the entire bicycle; instead, each inventor added a new piece to an already.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_008', difficulty: 'standard',
          question: 'The role of experiments in understanding nature is the systematic process.',
          hint: 'Review c6_physics_ch01_002 to reinforce how hypotheses are tested through step-by-step.',
          misconception: 'Students often think that if an experiment does not turn out the way they expected or hoped, it is a "failed".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The role of experiments in understanding nature is the systematic process of testing',
                  options: ['The role of experiments in understanding nature is the systematic process of testing', 'Science as a process is a systematic method of inquiry used to investigate natural', 'The interconnectedness of science disciplines is the principle that natural phenomena', 'Observation and experimentation form the empirical foundation of science, where'],
                  hint: 'Review c6_physics_ch01_002 to reinforce how hypotheses are tested through step-by-step.',
                  misconception: 'Students often think that if an experiment does not turn out the way they expected or hoped, it is a "failed" experiment and of no value.' }
          ],
            remediations: { 'if-an-experiment-does-not': { steps: ['To fix this misconception, guide the student to reframe unexpected results not as failures, but as new questions.', 'Have them deliberately test how changing a neglected variable (like crumpling the paper or measuring wind in the room).', 'Explain that famous scientific discoveries often arose from unexpected experimental anomalies that forced scientists.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_009', difficulty: 'standard',
          question: 'Environmental challenges and the role of science refer to how scientific.',
          hint: 'Review c7_physics_ch01_005 for the relationship between science and societal.',
          misconception: 'Students often think that environmental challenges like global warming or pollution are too large for scientific.',
          parts: [
                { id: 'a', prompt: 'Why is monitoring energy consumption in households and schools considered a crucial part of addressing global environmental challenges?', answer: 'Most electricity generation relies on burning fossil fuels',
                  options: ['Most electricity generation relies on burning fossil fuels', 'turning off a single light switch has no measurable impact'],
                  hint: 'Review c7_physics_ch01_005 for the relationship between science and societal responsibility, and.',
                  misconception: 'Students often think that environmental challenges like global warming or pollution are too large for scientific principles to address at.' }
          ],
            remediations: { 'environmental-challenges-like-global-warming': { steps: ['To fix this misconception, have the student calculate the total energy saved if every student in their school (say.', 'Guide them through multiplying power by time to show that small actions yield large cumulative watt-hours (and.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_010', difficulty: 'standard',
          question: 'Science is an ongoing, evolving process of discovery where observations.',
          hint: 'Review c6_physics_ch01_002 to reinforce how observations lead to logical conclusions.',
          misconception: 'Students often think science is a static collection of absolute "facts" memorized from a textbook, rather than.',
          parts: [
                { id: 'a', prompt: 'What term best describes the scientific habit of questioning established ideas and testing them against new evidence rather than accepting them blindly?', answer: 'Scientific temper',
                  options: ['Scientific temper', 'memorization', 'assumption'],
                  hint: 'Review c6_physics_ch01_002 to reinforce how observations lead to logical conclusions.',
                  misconception: 'Students often think science is a static collection of absolute "facts" memorized from a textbook, rather than an active, ongoing method.' }
          ],
            remediations: { 'science-is-a-static-collection': { steps: ['To fix this misconception, guide the student to compare how a specific topic (like light or heat) was understood.', 'Have them perform a simple experiment where their first measurement of a moving toy car\'s speed differs slightly from.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
