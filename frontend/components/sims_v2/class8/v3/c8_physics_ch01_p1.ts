import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch01_p1: SimDef = {
    id: 'v3_c8_physics_ch01_p1',
    title: 'Exploring the Investigative World of Science · Part 1/2',
    subtitle: 'Turn a vague \'why\' into a testable \'how\'',
    classLevel: 8, subject: 'physics', topic: 'Exploring the Investigative World of Science · Part 1/2',
    chapters: ['c8_physics_ch01'],
    nodeIds: ['c8_physics_ch1_1', 'c8_physics_ch1_10', 'c8_physics_ch1_2', 'c8_physics_ch1_3', 'c8_physics_ch1_4', 'c8_physics_ch1_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior lab investigator', intro: 'The world is full of \'why\' — whistling cookers, sticky balloons, rising dough. Your first job as a scientist: slice each one into a question a lab can actually answer.', goal: 'Transform broad curiosities into focused investigable questions by identifying independent, dependent and controlled variables.' },
    discovery: {
        question: 'Two students watch a balloon stick to a wall after rubbing. P asks \'Why does it stick?\' Q asks \'How does the number of rubs change how long it stays stuck?\' Whose question can a lab actually test?',
        options: ['Q\'s — it names what to change (rubs), what to measure (time), and leaves the rest fixed; P\'s is a \'why\' with no variables', 'P\'s — \'why\' questions are deeper', 'Both — any curious question is testable', 'Neither — balloons aren\'t science'],
        answer: 'Q\'s — it names what to change (rubs), what to measure (time), and leaves the rest fixed; P\'s is a \'why\' with no variables',
        hook: 'Curiosity is the spark, not the experiment. A testable question has a skeleton: one thing you change (independent), one thing you measure (dependent), everything else pinned down (controlled). \'Why does a cooker whistle?\' becomes \'how does heat change the time between whistles?\'',
    },
    teaching: [
        { title: 'Science as Investigation: Asking Focused Questions', text: 'A focused scientific question is a precise, testable inquiry that identifies a specific relationship between variables and can be investigated through controlled observation or experiment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch1_1', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Sharpen three fuzzy wonders into lab-ready questions — dissolving sugar, rolling toy cars, rising dough — naming the independent, dependent and controlled variables for each before anyone touches a beaker.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch1_1', title: 'Science as Investigation: Asking Focused Questions',
          caseStudy: { intro: 'Watch a pressure cooker whistle on a kitchen stove — steam escapes loudly, then the sound changes as pressure builds.',
            decisions: [{ prompt: 'A student wonders, "Why do shadows change during the day?" Which of the following rewrites this as a focused, testable question for a Class.', options: [
                { text: 'Correct answer: B', outcome: 'Correct answer: B. It identifies the independent variable (Sun\'s position / time of day) and.' },
                { text: 'more detailed', outcome: 'Not quite — Students believe a focused question is just a "more detailed" version of a broad question — they.', reveals: 'a-focused-question-is-just' },
                { text: 'How does the *hot* temperature affect...?', outcome: 'Not quite — Students believe a focused question is just a "more detailed" version of a broad question — they.', reveals: 'a-focused-question-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_10', title: 'Overview of Class 8 Science Topics: From Microbes to Planets',
          caseStudy: { intro: 'Imagine a Class 8 student opening their new NCERT Science textbook and seeing chapter titles like "Microorganisms: Friend and Foe," "Force and Pressure,".',
            decisions: [{ prompt: 'Name any five major topics you will study in Class 8 Science this year, as listed in the NCERT textbook.', options: [
                { text: 'Correct answer includes any five from: Microorganisms, Synthetic Fibres and Plastics,', outcome: 'Correct answer includes any five from: Microorganisms, Synthetic Fibres and Plastics, Materials.' },
                { text: 'Acids and Bases', outcome: 'Not quite — Students treat the overview as a mere list of chapter names to memorize, missing that each topic.', reveals: 'students-treat-the-overview-as' },
                { text: 'Class 7 topics like "Heat" or "Acids and Bases', outcome: 'Not quite — Students treat the overview as a mere list of chapter names to memorize, missing that each topic.', reveals: 'students-treat-the-overview-as' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_2', title: 'Observation and Experimentation in Science',
          caseStudy: { intro: 'Watch a ceiling fan: you *see* it rotate (qualitative observation), but to study its motion scientifically you must *measure* how many rotations it makes in 10.',
            decisions: [{ prompt: 'A student writes in her notebook: "The metal spoon feels colder than the wooden spoon." Is this a qualitative or quantitative observation?', options: [
                { text: 'It is a **qualitative observation**', outcome: 'It is a **qualitative observation** because it describes a quality (coldness) using senses without.' },
                { text: 'using a sense', outcome: 'Not quite — Students think "observation" means only looking with eyes, and "experiment" means any hands-on.', reveals: 'observation-means-only-looking-with' },
                { text: 'measuring a quantity', outcome: 'Not quite — Students think "observation" means only looking with eyes, and "experiment" means any hands-on.', reveals: 'observation-means-only-looking-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_3', title: 'Designing Simple Experiments to Answer Questions',
          caseStudy: { intro: 'Observe a ceiling fan running at different speed settings — you notice the blades spin faster at higher settings and wonder: *Does the length of the blades.',
            decisions: [{ prompt: 'A student wants to investigate "Does the thickness of a wire affect the brightness of a bulb in a simple circuit?" What is the.', options: [
                { text: 'The independent variable is the **thickness of the wire** (e.g., measured in mm² or SWG', outcome: 'The independent variable is the **thickness of the wire** (e.g., measured in mm² or SWG gauge).' },
                { text: 'brightness of the bulb', outcome: 'Not quite — Students believe **"fair test" means making everything the same** — including the independent.', reveals: 'fair-test-means-making-everything' },
                { text: 'type of battery', outcome: 'Not quite — Students believe **"fair test" means making everything the same** — including the independent.', reveals: 'fair-test-means-making-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_4', title: 'Hypothesis: Making Testable Predictions',
          caseStudy: { intro: 'Watch a ceiling fan: when you change the regulator knob from 1 to 5, the fan speeds up.',
            decisions: [{ prompt: 'A student observes that a pendulum takes 2 seconds per swing when the string is 1 m long.', options: [
                { text: 'The statement is vague: "differently" is not measurable and does not specify the', outcome: 'The statement is vague: "differently" is not measurable and does not specify the direction.' },
                { text: 'educated guess', outcome: 'Not quite — Students think a hypothesis is just an "educated guess" without requiring a mechanistic "because".', reveals: 'a-hypothesis-is-just-an' },
                { text: 'because', outcome: 'Not quite — Students think a hypothesis is just an "educated guess" without requiring a mechanistic "because".', reveals: 'a-hypothesis-is-just-an' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_5', title: 'Variables in Experiments: Independent, Dependent, Controlled',
          caseStudy: { intro: 'Imagine you are testing which brand of notebook paper absorbs water fastest — you dip sheets of different brands into a bowl and time how long until the water.',
            decisions: [{ prompt: 'In an experiment to find out whether the length of a pendulum affects its time period, a student changes the length of the string and.', options: [
                { text: 'The independent variable is the length of the pendulum string', outcome: 'The independent variable is the length of the pendulum string.' },
                { text: 'time period', outcome: 'Not quite — Students often think "controlled variable" means "the variable you control (i.e., change)" because.', reveals: 'controlled-variable-means-the-variable' },
                { text: 'mass of the bob', outcome: 'Not quite — Students often think "controlled variable" means "the variable you control (i.e., change)" because.', reveals: 'controlled-variable-means-the-variable' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'For the science fair, Javed wants to study \'why pressure cookers whistle.\' His mentor asks him to narrow it to something measurable in the school lab.',
            decisions: [{ prompt: 'Which rewrite turns his curiosity into a focused question?', options: [
                { text: '\'How does the heat level of the stove affect the time between whistles?\' — it names what will be changed (heat, the independent variable), what will be measured (time between whistles, the dependent variable), and implies keeping water amount and cooker size constant.', outcome: 'A focused question pins down the relationship between variables that can be changed and measured — \'why does it whistle\' gives nothing to vary or time.' },
                { text: '\'What makes a pressure cooker whistle?\' — adding the words \'what makes\' already sharpens the question enough.', outcome: 'It still asks for a general explanation with no identified variables; nothing in it can be changed or measured in a fair test.', reveals: 'rewording-is-focusing' },
                { text: '\'Do all pressure cookers whistle?\' — a yes-or-no question is the most focused kind because it has a single answer.', outcome: 'A yes/no classification tests no relationship between variables; focus means isolating one change against one measurement, not shrinking to a single fact.', reveals: 'yes-no-is-focused' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_5', title: 'The bigger picture',
          caseStudy: { intro: 'Science begins when a \'why?\' becomes a \'how does X affect Y while Z stays fixed?\'. The sharper the question, the cleaner the experiment.',
            decisions: [{ prompt: 'What comes next? Exploring the Investigative World of Science · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Exploring the Investigative World of Science · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch1_1', difficulty: 'standard',
          question: 'A focused scientific question is a precise, testable inquiry that identifies.',
          hint: 'Revisit Class 7 "Science as a Process: Asking Questions and Exploring".',
          misconception: 'Students believe a focused question is just a "more detailed" version of a broad question — they add adjectives ("How.',
          parts: [
                { id: 'a', prompt: 'A student wonders, "Why do shadows change during the day?" Which of the following rewrites this as a focused, testable question for a Class 8 investigation?', answer: 'Correct answer: B',
                  options: ['Correct answer: B', 'more detailed', 'How does the *hot* temperature affect...?'],
                  hint: 'Revisit Class 7 "Science as a Process: Asking Questions and Exploring" (c7_physics_ch01_001) and.',
                  misconception: 'Students believe a focused question is just a "more detailed" version of a broad question — they add adjectives ("How does the *hot*.' },
                { id: 'b', prompt: 'A group of students wants to investigate "How does the amount of sugar affect how fast it dissolves in water?" They list these possible independent variables.', answer: 'Correct: (2) sugar mass is the independent variable matching the question',
                  options: ['Correct: (2) sugar mass is the independent variable matching the question', 'more detailed', 'How does the *hot* temperature affect...?'],
                  hint: 'Revisit Class 7 "Science as a Process: Asking Questions and Exploring" (c7_physics_ch01_001) and.',
                  misconception: 'Students believe a focused question is just a "more detailed" version of a broad question — they add adjectives ("How does the *hot*.' },
                { id: 'c', prompt: 'Two students write questions for the same phenomenon — a balloon sticking to a wall after rubbing.', answer: 'Student Q\'s question is investigable',
                  options: ['Student Q\'s question is investigable', 'fair test', 'more detailed', 'How does the *hot* temperature affect...?'],
                  hint: 'Revisit Class 7 "Science as a Process: Asking Questions and Exploring" (c7_physics_ch01_001) and.',
                  misconception: 'Students believe a focused question is just a "more detailed" version of a broad question — they add adjectives ("How does the *hot*.' }
          ],
            remediations: { 'a-focused-question-is-just': { steps: ['Give the student three broad wonders (e.g., "Why do pendulums swing differently?", "Why do some fruits rot faster?".', 'For each, have them fill a 3-column table: What I could CHANGE (list 3+), What I could MEASURE (list 3+), What I must.', 'Have them pick ONE from column 1 and ONE from column 2 to write a "How does [column 1] affect [column 2]?" question.', 'Peer-review: partner checks if all column 3 items are truly held constant in the proposed method.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_10', difficulty: 'standard',
          question: 'An overview of the major themes and topics in Class 8 Science, connecting prior.',
          hint: 'Re-read c8_physics_ch1_9 and create a two-column table: left column = investigative step.',
          misconception: 'Students treat the overview as a mere list of chapter names to memorize, missing that each topic is an invitation.',
          parts: [
                { id: 'a', prompt: 'A student plans to investigate *which household surface produces the most friction* for a toy car.', answer: 'Independent variable: type of surface (carpet, wood, wet marble, sandpaper)',
                  options: ['Independent variable: type of surface (carpet, wood, wet marble, sandpaper)', 'swaps independent/dependent variables or misses controlled variables (e'],
                  hint: 'Re-read c8_physics_ch1_9 and create a two-column table: left column = investigative step, right.',
                  misconception: 'Students treat the overview as a mere list of chapter names to memorize, missing that each topic is an invitation to apply the *same*.' }
          ],
            remediations: { 'students-treat-the-overview-as': { steps: ['Have the student pick one Class 8 topic and explicitly map each of the 9 skills from this chapter (c8_physics_ch1_1.', 'Use a concept map: center = "Investigative Cycle", branches = 8 Class 8 topics, sub-branches = specific investigative.', 'If still stuck, revisit c8_physics_ch1_7 (iterative investigation) and c8_physics_ch1_9 (science in everyday life).'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the overview as a mere list of chapter names to memorize, missing that each topic is an invitation.',
          parts: [
                { id: 'a', prompt: 'A Class 8 group designs an investigation for *Chemical Effects of Electric Current*: "We will pass current through water with different amounts of salt and see.', answer: 'The plan has a flaw: using pencils as electrodes introduces an uncontrolled',
                  options: ['The plan has a flaw: using pencils as electrodes introduces an uncontrolled', 'perfect'],
                  hint: 'Re-read c8_physics_ch1_9 and create a two-column table: left column = investigative step, right.',
                  misconception: 'Students treat the overview as a mere list of chapter names to memorize, missing that each topic is an invitation to apply the *same*.' }
          ],
            remediations: { 'students-treat-the-overview-as': { steps: ['Have the student pick one Class 8 topic and explicitly map each of the 9 skills from this chapter (c8_physics_ch1_1.', 'Use a concept map: center = "Investigative Cycle", branches = 8 Class 8 topics, sub-branches = specific investigative.', 'If still stuck, revisit c8_physics_ch1_7 (iterative investigation) and c8_physics_ch1_9 (science in everyday life).'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_2', difficulty: 'standard',
          question: 'Observation in science is the deliberate, systematic gathering of information.',
          hint: 'Revisit the Class 7 pendulum investigation (c7_physics_ch04_002) and explicitly label the.',
          misconception: 'Students think "observation" means only looking with eyes, and "experiment" means any hands-on activity (e.g., making.',
          parts: [
                { id: 'a', prompt: 'A student writes in her notebook: "The metal spoon feels colder than the wooden spoon." Is this a qualitative or quantitative observation?', answer: 'It is a **qualitative observation**',
                  options: ['It is a **qualitative observation**', 'using a sense', 'measuring a quantity', 'measured with a thermometer)'],
                  hint: 'Revisit the Class 7 pendulum investigation (c7_physics_ch04_002) and explicitly label the.',
                  misconception: 'Students think "observation" means only looking with eyes, and "experiment" means any hands-on activity (e.g., making a volcano with baking.' },
                { id: 'b', prompt: 'Rohan wants to test "Does adding salt make water boil faster?" He boils 200 mL of pure water in a steel pan on a gas stove and times it.', answer: 'Independent variable: amount of salt (0 vs 1 spoon)',
                  options: ['Independent variable: amount of salt (0 vs 1 spoon)', 'observation', 'experiment'],
                  hint: 'Revisit the Class 7 pendulum investigation (c7_physics_ch04_002) and explicitly label the.',
                  misconception: 'Students think "observation" means only looking with eyes, and "experiment" means any hands-on activity (e.g., making a volcano with baking.' },
                { id: 'c', prompt: 'Priya measures the time for a toy car to roll down a 2 m ramp. Her three trials give: 4.2 s, 4.0 s, 3.8 s. Calculate the mean time and the range.', answer: 'Mean = (4.2 + 4.0 + 3.8) / 3 = 12.0 / 3 = **4.0 s**',
                  options: ['Mean = (4.2 + 4.0 + 3.8) / 3 = 12.0 / 3 = **4.0 s**', 'observation', 'experiment'],
                  hint: 'Revisit the Class 7 pendulum investigation (c7_physics_ch04_002) and explicitly label the.',
                  misconception: 'Students think "observation" means only looking with eyes, and "experiment" means any hands-on activity (e.g., making a volcano with baking.' },
                { id: 'd', prompt: 'Two students investigate "How does the angle of a ramp affect the speed of a marble?" Student A changes the ramp angle *and* the marble mass each trial.', answer: '**Student B**’s data can support a cause-effect claim',
                  options: ['**Student B**’s data can support a cause-effect claim', 'observation', 'experiment'],
                  hint: 'Revisit the Class 7 pendulum investigation (c7_physics_ch04_002) and explicitly label the.',
                  misconception: 'Students think "observation" means only looking with eyes, and "experiment" means any hands-on activity (e.g., making a volcano with baking.' }
          ],
            remediations: { 'observation-means-only-looking-with': { steps: ['**Concrete sorting activity**: Give 10 statement cards (e.g., "The leaf is green", "The leaf is 8 cm long", "I think.', 'Ask student to sort into: Qualitative Observation / Quantitative Observation / Prediction / Experiment Description.', '**Variable-matching game**: For each of 3 simple scenarios (ramp angle vs speed, salt vs boiling time, battery brand.', '**Re-do Diagnostic Question 2 & 4** after the activity, requiring explicit variable language.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_3', difficulty: 'standard',
          question: 'Designing a simple experiment is the process of planning a fair test to answer.',
          hint: 'If stuck, revisit **c7_physics_ch01_008 (The Role of Experiments in Understanding.',
          misconception: 'Students believe **"fair test" means making everything the same** — including the independent variable.',
          parts: [
                { id: 'a', prompt: 'Riya sets up an experiment to test how the angle of a ramp affects the speed of a toy car. She uses the same car and ramp surface but changes the ramp angle.', answer: 'Yes, Riya is correct',
                  options: ['Yes, Riya is correct', 'No, she must add weights to keep mass constant', 'fair test', 'Use the same wire length for all trials to keep it fair'],
                  hint: 'If stuck, revisit **c7_physics_ch01_008 (The Role of Experiments in Understanding Nature)**.',
                  misconception: 'Students believe **"fair test" means making everything the same** — including the independent variable.' },
                { id: 'b', prompt: 'Aman designs an experiment: "How does the temperature of water affect the time taken for a sugar cube to dissolve?" He lists these variables: - Independent.', answer: 'The flaw: **Stirring rate is not controlled precisely**',
                  options: ['The flaw: **Stirring rate is not controlled precisely**', 'Volume of water should be 200 mL', 'fair test', 'Use the same wire length for all trials to keep it fair'],
                  hint: 'If stuck, revisit **c7_physics_ch01_008 (The Role of Experiments in Understanding Nature)**.',
                  misconception: 'Students believe **"fair test" means making everything the same** — including the independent variable.' },
                { id: 'c', prompt: 'Two students investigate "Does the number of batteries in series affect the speed of a motor?" - **Student A** uses 1, 2, 3 batteries and measures motor speed.', answer: '**Student A\'s design is reliable',
                  options: ['**Student A\'s design is reliable', 'Both are fine because they test the same question', 'fair test', 'Use the same wire length for all trials to keep it fair'],
                  hint: 'If stuck, revisit **c7_physics_ch01_008 (The Role of Experiments in Understanding Nature)**.',
                  misconception: 'Students believe **"fair test" means making everything the same** — including the independent variable.' }
          ],
            remediations: { 'fair-test-means-making-everything': { steps: ['**Concrete demonstration**: Use a pendulum — keep length, bob mass, and release angle constant; time 10 oscillations.', 'Then change *only* length and repeat.', '**Variable-sorting card activity**: Give cards labeled "wire thickness", "bulb brightness", "battery type", "wire.', 'Student sorts into Independent, Dependent, Controlled.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_4', difficulty: 'standard',
          question: 'A hypothesis is a tentative, testable explanation or prediction that proposes.',
          hint: 'Revisit Class 7 \'Simple Pendulum: Period and Oscillation\' (c7_physics_ch04_002).',
          misconception: 'Students think a hypothesis is just an "educated guess" without requiring a mechanistic "because" clause linked.',
          parts: [
                { id: 'a', prompt: 'A student observes that a pendulum takes 2 seconds per swing when the string is 1 m long.', answer: 'The statement is vague: "differently" is not measurable and does not specify the',
                  options: ['The statement is vague: "differently" is not measurable and does not specify the', 'educated guess', 'because'],
                  hint: 'Revisit Class 7 \'Simple Pendulum: Period and Oscillation\' (c7_physics_ch04_002) to practice.',
                  misconception: 'Students think a hypothesis is just an "educated guess" without requiring a mechanistic "because" clause linked to prior physics concepts.' },
                { id: 'b', prompt: 'Rahul hypothesizes: "If I add more salt to water, the boiling point will increase because salt makes water heavier." Identify the error in his reasoning and.', answer: 'The error: "heavier" confuses mass with colligative properties',
                  options: ['The error: "heavier" confuses mass with colligative properties', 'heavier', 'educated guess', 'because'],
                  hint: 'Revisit Class 7 \'Simple Pendulum: Period and Oscillation\' (c7_physics_ch04_002) to practice.',
                  misconception: 'Students think a hypothesis is just an "educated guess" without requiring a mechanistic "because" clause linked to prior physics concepts.' },
                { id: 'c', prompt: 'Priya wants to test how the thickness of a copper wire affects its electrical resistance.', answer: 'Hypothesis: "If the diameter of copper wire (mm) increases, then its electrical',
                  options: ['Hypothesis: "If the diameter of copper wire (mm) increases, then its electrical', 'educated guess', 'because'],
                  hint: 'Revisit Class 7 \'Simple Pendulum: Period and Oscillation\' (c7_physics_ch04_002) to practice.',
                  misconception: 'Students think a hypothesis is just an "educated guess" without requiring a mechanistic "because" clause linked to prior physics concepts.' },
                { id: 'd', prompt: 'Two students hypothesize about a toy car on a ramp: Student A: "If I raise the ramp height, the car will go faster at the bottom." Student B: "If I raise the.', answer: 'Student B\'s hypothesis is better',
                  options: ['Student B\'s hypothesis is better', 'educated guess', 'because'],
                  hint: 'Revisit Class 7 \'Simple Pendulum: Period and Oscillation\' (c7_physics_ch04_002) to practice.',
                  misconception: 'Students think a hypothesis is just an "educated guess" without requiring a mechanistic "because" clause linked to prior physics concepts.' }
          ],
            remediations: { 'a-hypothesis-is-just-an': { steps: ['Have the student pick a familiar phenomenon (e.g., bicycle brakes stopping the wheel).', 'Ask "What variable will you change?" (brake lever force) and "What will you measure?" (stopping distance in cm).', 'Demand a "because" using a Class 7 concept: "because greater friction force does more work to remove kinetic energy."', 'Practice rewriting three vague guesses into testable hypotheses with units.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_5', difficulty: 'standard',
          question: 'Variables in an experiment are the factors that can change; the independent.',
          hint: 'Revisit c8_physics_ch1_4 (Hypothesis) and practice rewriting hypotheses as "Changing ____.',
          misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control".',
          parts: [
                { id: 'a', prompt: 'In an experiment to find out whether the length of a pendulum affects its time period, a student changes the length of the string and measures the time for 10.', answer: 'The independent variable is the length of the pendulum string',
                  options: ['The independent variable is the length of the pendulum string', 'time period', 'mass of the bob', 'controlled variable'],
                  hint: 'Revisit c8_physics_ch1_4 (Hypothesis) and practice rewriting hypotheses as "Changing ____ will.',
                  misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control" suggests active.' },
                { id: 'b', prompt: 'A student says, "In my experiment on how fertilizer amount affects plant height, the type of soil is my dependent variable because it depends on how much.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'dependent', 'the measured response', 'controlled variable'],
                  hint: 'Revisit c8_physics_ch1_4 (Hypothesis) and practice rewriting hypotheses as "Changing ____ will.',
                  misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control" suggests active.' },
                { id: 'c', prompt: 'Riya wants to test if the temperature of water affects how quickly sugar dissolves.', answer: 'Independent: water temperature (20°C, 40°C, 60°C)',
                  options: ['Independent: water temperature (20°C, 40°C, 60°C)', 'controlled variable', 'the variable you control (i.e., change)', 'control'],
                  hint: 'Revisit c8_physics_ch1_4 (Hypothesis) and practice rewriting hypotheses as "Changing ____ will.',
                  misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control" suggests active.' },
                { id: 'd', prompt: 'Two students design experiments to test "Does the angle of a ramp affect the speed of a toy car at the bottom?" Student A changes the ramp angle but also uses.', answer: 'Student B\'s experiment is valid',
                  options: ['Student B\'s experiment is valid', 'controlled variable', 'the variable you control (i.e., change)', 'control'],
                  hint: 'Revisit c8_physics_ch1_4 (Hypothesis) and practice rewriting hypotheses as "Changing ____ will.',
                  misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control" suggests active.' }
          ],
            remediations: { 'controlled-variable-means-the-variable': { steps: ['Use the phrase "kept the same" instead of "controlled" for two weeks — relabel every variable as "what I change," "what.', 'Do a card-sort activity: write factors from a familiar experiment (e.g., paper towel absorbency) on cards; physically.', 'Practice with three new scenarios, each time saying aloud: "I change ____, I measure ____, I keep ____ the same."', 'Only then reintroduce the formal terms independent, dependent, controlled with the mnemonic "I Change (Independent),.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
