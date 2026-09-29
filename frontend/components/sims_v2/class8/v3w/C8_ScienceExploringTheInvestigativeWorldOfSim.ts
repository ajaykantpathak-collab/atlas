import type { SimDef } from '../../engine/types';
import C8_ScienceExploringTheInvestigativeWorldOfSim from '../../../simulations/c6_12/C8_ScienceExploringTheInvestigativeWorldOfSim';

/** v3 wrapped master — C8_ScienceExploringTheInvestigativeWorldOfSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_scienceexploringtheinvestigativeworldofsim: SimDef = {
    id: 'v3w_c8_scienceexploringtheinvestigativeworldofsim',
    title: 'Overview of Class 8 Science Topics: From Microbes to Planets',
    subtitle: 'Covers the broad thematic map of the NCERT Class 8 Science textbook (18 chapters) and the.',
    classLevel: 8, subject: 'science', topic: 'Overview of Class 8 Science Topics: From Microbes to Planets',
    chapters: [],
    nodeIds: ['c8_physics_ch1_10', 'c8_physics_ch1_1', 'c8_physics_ch1_3', 'c8_physics_ch1_5', 'c8_physics_ch1_6', 'c8_physics_ch1_7', 'c8_physics_ch1_8', 'c8_physics_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine a Class 8 student opening their new NCERT Science textbook and seeing chapter titles like.', goal: 'Master Overview of Class 8 Science Topics: From Microbes to Planets.' },
    discovery: {
        question: 'A student wonders, "Why do shadows change during the day?" Which of the following rewrites this as a focused, testable question for a Class 8 investigation?',
        options: ['B', 'more detailed', 'How does the *hot* temperature affect...?'],
        answer: 'B',
        hook: 'Students believe a focused question is just a "more detailed" version of a broad question — they add adjectives ("How.',
    },
    teaching: [
        { title: 'An overview of the major themes and topics.', text: 'An overview of the major themes and topics in Class 8 Science, connecting prior knowledge from Classes 6–7 to new concepts in physics (force, friction, sound, light, chemical effects of current),.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_physics_ch1_10', title: 'An overview of the major themes and.',
          scaffold: { problem: 'A student investigates *Friction* (Class 8 physics) by pulling a 200 g wooden block across four surfaces using a spring balance.',
            steps: [
            { text: 'Identify given data – three force readings per surface in newtons (N).' },
            { text: 'Recall formula for mean: Mean = (Sum of readings) / (Number of readings). Unit remains newton (N).' },
            { text: 'Compute sums: Carpet = 1.2+1.3+1.1 = 3.6 N; Wood = 0.6+0.5+0.7 = 1.8 N; Marble = 0.3+0.4+0.2 = 0.9 N; Sandpaper =.' },
            { text: 'Divide each sum by 3 (three trials): Carpet mean = 3.6/3 = 1.2 N; Wood mean = 1.8/3 = 0.6 N; Marble mean = 0.9/3 = 0.3.' },
            { text: 'Rank: Sandpaper (1.8 N) > Carpet (1.2 N) > Wood (0.6 N) > Wet marble (0.3 N).', faded: true, blankAnswer: 'Mean friction forces: Sandpaper = 1.8 N, Carpet = 1.2 N,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch1_1', title: 'A focused scientific question is a.',
          scaffold: { problem: 'A Class 8 student observes that her mother\'s chapatis are softer when the dough rests for 30 minutes before rolling, compared to rolling.',
            steps: [
            { text: 'Identify the core phenomenon — dough resting time affects chapati softness.' },
            { text: 'Choose ONE factor to change (independent variable): resting time of dough before rolling.' },
            { text: 'Choose ONE measurable outcome (dependent variable): softness. Define it operationally as "force required to compress.' },
            { text: 'List controlled variables with fixed values: (a) flour mass = 200 g (atta, same brand), (b) water volume = 120 mL (room.' },
            { text: 'Write the focused question: "How does the resting time of chapati dough (0–60 minutes) affect the height recovery (in.', faded: true, blankAnswer: 'Focused question: "How does the resting time of chapati.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch1_3', title: 'Designing a simple experiment is the.',
          scaffold: { problem: 'A Class 8 student wants to investigate: "How does the length of a pendulum string affect its time period (time for one complete swing)?".',
            steps: [
            { text: 'Identify the aim and variables. Aim: Determine the effect of string length on pendulum time period.' },
            { text: 'List materials with quantities. String (1.5 m), 4 identical metal washers (use 1), retort stand with clamp, stopwatch.' },
            { text: 'Write procedure. (1) Set up retort stand. (2) Attach string to clamp, fix washer at 20 cm mark (measure from pivot to.' },
            { text: 'Plan data table. Columns: Length (cm), Trial 1 Time for 10 swings (s), Trial 2, Trial 3, Average Time (s), Time Period.' },
            { text: 'Ensure fairness checks. Verify same bob used throughout; angle checked before each release; string length measured from.', faded: true, blankAnswer: 'Experiment designed with aim, variables (independent:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch1_5', title: 'Variables in an experiment are the.',
          scaffold: { problem: 'A student wants to investigate: "Does the thickness of a wire affect the brightness of a bulb in a simple circuit?" She has a battery, a.',
            steps: [
            { text: 'Identify the independent variable — the factor deliberately changed: wire thickness (0.5 mm, 1 mm, 1.5 mm diameter).' },
            { text: 'Identify the dependent variable — the factor measured in response: bulb brightness in lux (measured with lux meter).' },
            { text: 'List at least four controlled variables — factors kept constant: same battery (voltage), same bulb, same wire length.' },
            { text: 'Write procedure: (a) Set up circuit with 0.5 mm wire, 30 cm long.' },
            { text: 'Verify fairness — only wire thickness changes; all other factors are identical across trials, so any brightness.', faded: true, blankAnswer: 'Independent: wire thickness (mm). Dependent: brightness.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch1_6', title: 'Recording and interpreting observations.',
          scaffold: { problem: 'A student investigates how the surface area of a parachute affects the time it takes to fall 2 meters.',
            steps: [
            { text: 'Identify variables: independent = surface area (cm²), dependent = fall time (s).' },
            { text: 'Construct table with headers and units. Fill in given data. Calculate averages: 100→1.2, 200→1.8, 300→2.4, 400→3.0 (all.' },
            { text: 'Draw graph axes: x-axis "Surface Area (cm²)" from 0 to 450, y-axis "Average Fall Time (s)" from 0 to 3.5.' },
            { text: 'Observe points lie approximately on a straight line through origin.' },
            { text: 'Verify reasonableness: larger parachute → more air resistance → slower fall. Data shows consistent increase.', faded: true, blankAnswer: 'Table with averages 1.2 s, 1.8 s, 2.4 s, 3.0 s. Graph shows.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch1_7', title: 'Iterative investigation is the.',
          scaffold: { problem: 'A student investigates how the length of a pendulum affects its time period.',
            steps: [
            { text: 'Identify given quantities: Cycle 1 times for 1 oscillation = 1.4 s, 1.6 s, 1.3 s.' },
            { text: 'Compute Cycle 1 average time period = (1.4 + 1.6 + 1.3) / 3 = 1.43 s. Range = 1.6 - 1.3 = 0.3 s.' },
            { text: 'Compute Cycle 2 average time for 10 oscillations = (14.2 + 14.0 + 14.3) / 3 = 14.17 s.' },
            { text: 'Calculate percentage reduction in range = ((0.3 - 0.03) / 0.3) × 100% = 90%.' },
            { text: 'Verify: The average time periods are close (1.43 s vs 1.417 s), but Cycle 2 range is 10× smaller, confirming the.', faded: true, blankAnswer: 'Cycle 1 average = 1.43 s, range = 0.3 s. Cycle 2 average =.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_physics_ch1_1', title: 'Identify each idea',
          dissect: { specimen: 'Overview of Class 8 Science Topics: From Microbes to Planets', spots: [
            { id: 's1', label: 'An overview of the major', prompt: 'Which idea is this? — An overview of the major themes and topics in Class 8 Science, connecting prior knowledge.', answer: 'An overview of the major', options: ['An overview of the major', 'A focused scientific question is', 'Designing a simple experiment is', 'Variables in an experiment are'] },
            { id: 's2', label: 'A focused scientific question is', prompt: 'Which idea is this? — A focused scientific question is a precise, testable inquiry that identifies a specific.', answer: 'A focused scientific question is', options: ['A focused scientific question is', 'An overview of the major', 'Designing a simple experiment is', 'Variables in an experiment are'] },
            { id: 's3', label: 'Designing a simple experiment is', prompt: 'Which idea is this? — Designing a simple experiment is the process of planning a fair test to answer a specific.', answer: 'Designing a simple experiment is', options: ['Designing a simple experiment is', 'An overview of the major', 'A focused scientific question is', 'Variables in an experiment are'] },
            { id: 's4', label: 'Variables in an experiment are', prompt: 'Which idea is this? — Variables in an experiment are the factors that can change; the independent variable is.', answer: 'Variables in an experiment are', options: ['Variables in an experiment are', 'An overview of the major', 'A focused scientific question is', 'Designing a simple experiment is'] },
            { id: 's5', label: 'Recording and interpreting observations is', prompt: 'Which idea is this? — Recording and interpreting observations is the systematic process of documenting.', answer: 'Recording and interpreting observations is', options: ['Recording and interpreting observations is', 'An overview of the major', 'A focused scientific question is', 'Designing a simple experiment is'] },
            { id: 's6', label: 'Iterative investigation is the scientific', prompt: 'Which idea is this? — Iterative investigation is the scientific process of repeatedly refining an experiment.', answer: 'Iterative investigation is the scientific', options: ['Iterative investigation is the scientific', 'An overview of the major', 'A focused scientific question is', 'Designing a simple experiment is'] }
          ] } }
    ],
    explore: { component: C8_ScienceExploringTheInvestigativeWorldOfSim, prompt: 'Explore the interactive — Overview of Class 8 Science Topics: From Microbes to Planets' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch1_10', difficulty: 'standard',
          question: 'An overview of the major themes and topics in Class 8 Science, connecting prior.',
          hint: 'Re-read c8_physics_ch1_9 and create a two-column table: left column = investigative step,.',
          misconception: 'Students treat the overview as a mere list of chapter names to memorize, missing that each topic is an invitation to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An overview of the major themes and topics in Class 8 Science, connecting prior knowledge',
                  options: ['An overview of the major themes and topics in Class 8 Science, connecting prior knowledge', 'A focused scientific question is a precise, testable inquiry that identifies a specific', 'Designing a simple experiment is the process of planning a fair test to answer a specific', 'Variables in an experiment are the factors that can change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the overview as a mere list of chapter names to memorize, missing that each topic is an invitation to apply the *same*.' }
          ],
            remediations: { 'students-treat-the-overview-as': { steps: ['Have the student pick one Class 8 topic and explicitly map each of the 9 skills from this chapter (c8_physics_ch1_1 to.', 'Use a concept map: center = "Investigative Cycle", branches = 8 Class 8 topics, sub-branches = specific investigative.', 'If still stuck, revisit c8_physics_ch1_7 (iterative investigation) and c8_physics_ch1_9 (science in everyday life) to.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the overview as a mere list of chapter names to memorize, missing that each topic is an invitation to.',
          parts: [
                { id: 'a', prompt: 'A Class 8 group designs an investigation for *Chemical Effects of Electric Current*: "We will pass current through water with different amounts of salt and see.', answer: 'The plan has a flaw: using pencils as electrodes introduces an uncontrolled',
                  options: ['The plan has a flaw: using pencils as electrodes introduces an uncontrolled', 'perfect'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the overview as a mere list of chapter names to memorize, missing that each topic is an invitation to apply the *same*.' }
          ],
            remediations: { 'students-treat-the-overview-as': { steps: ['Have the student pick one Class 8 topic and explicitly map each of the 9 skills from this chapter (c8_physics_ch1_1 to.', 'Use a concept map: center = "Investigative Cycle", branches = 8 Class 8 topics, sub-branches = specific investigative.', 'If still stuck, revisit c8_physics_ch1_7 (iterative investigation) and c8_physics_ch1_9 (science in everyday life) to.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_1', difficulty: 'standard',
          question: 'A focused scientific question is a precise, testable inquiry that identifies a.',
          hint: 'Revisit Class 7 "Science as a Process: Asking Questions and Exploring".',
          misconception: 'Students believe a focused question is just a "more detailed" version of a broad question — they add adjectives ("How.',
          parts: [
                { id: 'a', prompt: 'A student wonders, "Why do shadows change during the day?" Which of the following rewrites this as a focused, testable question for a Class 8 investigation?', answer: 'B',
                  options: ['Correct answer: B', 'more detailed', 'How does the *hot* temperature affect...?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a focused question is just a "more detailed" version of a broad question — they add adjectives ("How does the *hot*.' },
                { id: 'b', prompt: 'A group of students wants to investigate "How does the amount of sugar affect how fast it dissolves in water?" They list these possible independent variables:.', answer: 'Correct: (2) sugar mass is the independent variable matching the question',
                  options: ['Correct: (2) sugar mass is the independent variable matching the question', 'more detailed', 'How does the *hot* temperature affect...?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a focused question is just a "more detailed" version of a broad question — they add adjectives ("How does the *hot*.' },
                { id: 'c', prompt: 'Two students write questions for the same phenomenon — a balloon sticking to a wall after rubbing.', answer: 'Student Q\'s question is investigable',
                  options: ['Student Q\'s question is investigable', 'fair test', 'more detailed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a focused question is just a "more detailed" version of a broad question — they add adjectives ("How does the *hot*.' }
          ],
            remediations: { 'a-focused-question-is-just': { steps: ['Give the student three broad wonders (e.g., "Why do pendulums swing differently?", "Why do some fruits rot faster?",.', 'For each, have them fill a 3-column table: What I could CHANGE (list 3+), What I could MEASURE (list 3+), What I must.', 'Have them pick ONE from column 1 and ONE from column 2 to write a "How does [column 1] affect [column 2]?" question.', 'Peer-review: partner checks if all column 3 items are truly held constant in the proposed method.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_3', difficulty: 'standard',
          question: 'Designing a simple experiment is the process of planning a fair test to answer.',
          hint: 'If stuck, revisit **c7_physics_ch01_008 (The Role of Experiments in Understanding.',
          misconception: 'Students believe **"fair test" means making everything the same** — including the independent variable.',
          parts: [
                { id: 'a', prompt: 'Riya sets up an experiment to test how the angle of a ramp affects the speed of a toy car. She uses the same car and ramp surface but changes the ramp angle.', answer: 'Yes, Riya is correct',
                  options: ['Yes, Riya is correct', 'No, she must add weights to keep mass constant', 'fair test'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"fair test" means making everything the same** — including the independent variable.' },
                { id: 'b', prompt: 'Aman designs an experiment: "How does the temperature of water affect the time taken for a sugar cube to dissolve?" He lists these variables: - Independent:.', answer: 'The flaw: **Stirring rate is not controlled precisely**',
                  options: ['The flaw: **Stirring rate is not controlled precisely**', 'Volume of water should be 200 mL', 'fair test'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"fair test" means making everything the same** — including the independent variable.' },
                { id: 'c', prompt: 'Two students investigate "Does the number of batteries in series affect the speed of a motor?" - **Student A** uses 1, 2, 3 batteries and measures motor speed.', answer: '**Student A\'s design is reliable',
                  options: ['**Student A\'s design is reliable', 'Both are fine because they test the same question', 'fair test'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"fair test" means making everything the same** — including the independent variable.' }
          ],
            remediations: { 'fair-test-means-making-everything': { steps: ['**Concrete demonstration**: Use a pendulum — keep length, bob mass, and release angle constant; time 10 oscillations.', 'Then change *only* length and repeat.', '**Variable-sorting card activity**: Give cards labeled "wire thickness", "bulb brightness", "battery type", "wire.', 'Student sorts into Independent, Dependent, Controlled.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"fair test" means making everything the same** — including the independent variable.',
          parts: [
                { id: 'a', prompt: 'Priya conducts the ramp-angle experiment (Diagnostic Question 2) and gets the following data: | Ramp Angle | Trial 1 Time (s) | Trial 2 Time (s) | Trial 3 Time.', answer: 'Her conclusion is **partially supported but incomplete**',
                  options: ['Her conclusion is **partially supported but incomplete**', 'The conclusion is perfect', 'fair test', 'Use the same wire length for all trials to keep it fair'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"fair test" means making everything the same** — including the independent variable.' }
          ],
            remediations: { 'fair-test-means-making-everything': { steps: ['**Concrete demonstration**: Use a pendulum — keep length, bob mass, and release angle constant; time 10 oscillations.', 'Then change *only* length and repeat.', '**Variable-sorting card activity**: Give cards labeled "wire thickness", "bulb brightness", "battery type", "wire.', 'Student sorts into Independent, Dependent, Controlled.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_5', difficulty: 'standard',
          question: 'Variables in an experiment are the factors that can change; the independent.',
          hint: 'Revisit c8_physics_ch1_4 (Hypothesis) and practice rewriting hypotheses as "Changing ____.',
          misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control".',
          parts: [
                { id: 'a', prompt: 'In an experiment to find out whether the length of a pendulum affects its time period, a student changes the length of the string and measures the time for 10.', answer: 'The independent variable is the length of the pendulum string',
                  options: ['The independent variable is the length of the pendulum string', 'time period', 'mass of the bob'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control" suggests active.' },
                { id: 'b', prompt: 'A student says, "In my experiment on how fertilizer amount affects plant height, the type of soil is my dependent variable because it depends on how much.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'dependent', 'the measured response'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control" suggests active.' },
                { id: 'c', prompt: 'Riya wants to test if the temperature of water affects how quickly sugar dissolves.', answer: 'Independent: water temperature (20°C, 40°C, 60°C)',
                  options: ['Independent: water temperature (20°C, 40°C, 60°C)', 'controlled variable', 'the variable you control (i.e., change)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control" suggests active.' }
          ],
            remediations: { 'controlled-variable-means-the-variable': { steps: ['Use the phrase "kept the same" instead of "controlled" for two weeks — relabel every variable as "what I change," "what.', 'Do a card-sort activity: write factors from a familiar experiment (e.g., paper towel absorbency) on cards; physically.', 'Practice with three new scenarios, each time saying aloud: "I change ____, I measure ____, I keep ____ the same."', 'Only then reintroduce the formal terms independent, dependent, controlled with the mnemonic "I Change (Independent), I.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control".',
          parts: [
                { id: 'a', prompt: 'A classmate claims: "In my experiment on how light intensity affects photosynthesis rate in hydrilla, I kept the lamp distance same but changed the bulb.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'controlled variable', 'the variable you control (i.e., change)', 'control'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control" suggests active.' },
                { id: 'b', prompt: 'Design a simple experiment to investigate "Does the amount of salt affect the boiling point of water?" Specify the independent variable, dependent variable,.', answer: 'Independent: mass of salt added (e.g., 0 g, 5 g, 10 g, 15 g per 100 mL water)',
                  options: ['Independent: mass of salt added (e.g., 0 g, 5 g, 10 g, 15 g per 100 mL water)', 'controlled variable', 'the variable you control (i.e., change)', 'control'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "controlled variable" means "the variable you control (i.e., change)" because the word "control" suggests active.' }
          ],
            remediations: { 'controlled-variable-means-the-variable': { steps: ['Use the phrase "kept the same" instead of "controlled" for two weeks — relabel every variable as "what I change," "what.', 'Do a card-sort activity: write factors from a familiar experiment (e.g., paper towel absorbency) on cards; physically.', 'Practice with three new scenarios, each time saying aloud: "I change ____, I measure ____, I keep ____ the same."', 'Only then reintroduce the formal terms independent, dependent, controlled with the mnemonic "I Change (Independent), I.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_6', difficulty: 'standard',
          question: 'Recording and interpreting observations is the systematic process of.',
          hint: 'Revisit c8_physics_ch1_5 (Variables in Experiments) and practice making tables for 3.',
          misconception: 'Students believe that "recording observations" means writing a diary-style paragraph of what they saw (e.g., "The car.',
          parts: [
                { id: 'a', prompt: 'A student investigates how the angle of a ramp affects the speed of a toy car.', answer: 'Outlier: 5.8 s (likely a timing error)',
                  options: ['Outlier: 5.8 s (likely a timing error)', 'recording observations', 'The car moved fast then slow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "recording observations" means writing a diary-style paragraph of what they saw (e.g., "The car moved fast then.' }
          ],
            remediations: { 'recording-observations-means-writing-a': { steps: ['Show the student two records of the same pendulum experiment: one a paragraph, one a table with trials.', 'Ask: "Which lets you calculate an average?', 'Which lets you spot a mistake?" 2.', 'Have them re-do a past lab by creating a blank table *first*, then filling it as they watch a video of the experiment.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "recording observations" means writing a diary-style paragraph of what they saw (e.g., "The car.',
          parts: [
                { id: 'a', prompt: 'A student concludes: "The graph shows that as the mass of the bob increases, the time period of the pendulum increases." Their data table shows time periods of.', answer: 'The conclusion is not supported by the data',
                  options: ['The conclusion is not supported by the data', 'Time period remains nearly constant regardless of mass', 'recording observations', 'The car moved fast then slow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "recording observations" means writing a diary-style paragraph of what they saw (e.g., "The car moved fast then.' }
          ],
            remediations: { 'recording-observations-means-writing-a': { steps: ['Show the student two records of the same pendulum experiment: one a paragraph, one a table with trials.', 'Ask: "Which lets you calculate an average?', 'Which lets you spot a mistake?" 2.', 'Have them re-do a past lab by creating a blank table *first*, then filling it as they watch a video of the experiment.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_7', difficulty: 'standard',
          question: 'Iterative investigation is the scientific process of repeatedly refining an.',
          hint: 'Revisit c8_physics_ch1_5 (Variables in Experiments) and practice designing a fair test.',
          misconception: 'Students believe iterative investigation means "do the experiment again until you get the answer you expect" or "keep.',
          parts: [
                { id: 'a', prompt: 'A Class 8 student investigates the time period of a simple pendulum.', answer: 'Cycle 1 average = (1.8 + 2.1 + 1.9)/3 = 1.93 s',
                  options: ['Cycle 1 average = (1.8 + 2.1 + 1.9)/3 = 1.93 s', 'neater', 'do the experiment again until you get the answer you expect'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe iterative investigation means "do the experiment again until you get the answer you expect" or "keep changing things.' },
                { id: 'b', prompt: 'Two students investigate how the surface area of a parachute affects its fall time.', answer: 'Neither is yet iterative',
                  options: ['Neither is yet iterative', 'changing the independent variable', 'do the experiment again until you get the answer you expect'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe iterative investigation means "do the experiment again until you get the answer you expect" or "keep changing things.' }
          ],
            remediations: { 'iterative-investigation-means-do-the': { steps: ['If a student shows this misconception, guide them through a 15-minute "Paper Tower" activity: give 5 sheets of.', 'Cycle 1: Build tallest tower in 3 min.', 'Identify *one* reason it fell (e.g., "base too narrow").', 'Cycle 2: Change *only* that one thing (e.g., widen base).'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe iterative investigation means "do the experiment again until you get the answer you expect" or "keep.',
          parts: [
                { id: 'a', prompt: 'A teacher gives this feedback on a student\'s investigation report: "Your Cycle 2 data is more consistent, but you didn\'t explain *why* you changed the.', answer: 'The feedback is fair',
                  options: ['The feedback is fair', 'do the experiment again until you get the answer you expect', 'keep changing things randomly until it works', 'which paper towel absorbs most water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe iterative investigation means "do the experiment again until you get the answer you expect" or "keep changing things.' },
                { id: 'b', prompt: 'Design a 3-cycle iterative investigation to answer: "Does the temperature of water affect how fast a sugar cube dissolves?" For each cycle, state: (a) the.', answer: 'Cycle 1: (a) Does hot vs',
                  options: ['Cycle 1: (a) Does hot vs', 'do the experiment again until you get the answer you expect', 'keep changing things randomly until it works', 'which paper towel absorbs most water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe iterative investigation means "do the experiment again until you get the answer you expect" or "keep changing things.' },
                { id: 'c', prompt: 'Two students investigate how the surface area of a parachute affects its fall time.', answer: 'Neither is yet iterative',
                  options: ['Neither is yet iterative', 'changing the independent variable', 'do the experiment again until you get the answer you expect', 'keep changing things randomly until it works'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe iterative investigation means "do the experiment again until you get the answer you expect" or "keep changing things.' }
          ],
            remediations: { 'iterative-investigation-means-do-the': { steps: ['If a student shows this misconception, guide them through a 15-minute "Paper Tower" activity: give 5 sheets of.', 'Cycle 1: Build tallest tower in 3 min.', 'Identify *one* reason it fell (e.g., "base too narrow").', 'Cycle 2: Change *only* that one thing (e.g., widen base).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
