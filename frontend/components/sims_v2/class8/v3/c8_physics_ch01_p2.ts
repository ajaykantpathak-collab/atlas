import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch01_p2: SimDef = {
    id: 'v3_c8_physics_ch01_p2',
    title: 'Exploring the Investigative World of Science · Part 2/2',
    subtitle: 'Turn a vague \'why\' into a testable \'how\'',
    classLevel: 8, subject: 'physics', topic: 'Exploring the Investigative World of Science · Part 2/2',
    chapters: ['c8_physics_ch01'],
    nodeIds: ['c8_physics_ch1_6', 'c8_physics_ch1_7', 'c8_physics_ch1_8', 'c8_physics_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior lab investigator', intro: 'The world is full of \'why\' — whistling cookers, sticky balloons, rising dough. Your first job as a scientist: slice each one into a question a lab can actually answer.', goal: 'Transform broad curiosities into focused investigable questions by identifying independent, dependent and controlled variables.' },
    discovery: {
        question: 'Two students watch a balloon stick to a wall after rubbing. P asks \'Why does it stick?\' Q asks \'How does the number of rubs change how long it stays stuck?\' Whose question can a lab actually test?',
        options: ['Q\'s — it names what to change (rubs), what to measure (time), and leaves the rest fixed; P\'s is a \'why\' with no variables', 'P\'s — \'why\' questions are deeper', 'Both — any curious question is testable', 'Neither — balloons aren\'t science'],
        answer: 'Q\'s — it names what to change (rubs), what to measure (time), and leaves the rest fixed; P\'s is a \'why\' with no variables',
        hook: 'Curiosity is the spark, not the experiment. A testable question has a skeleton: one thing you change (independent), one thing you measure (dependent), everything else pinned down (controlled). \'Why does a cooker whistle?\' becomes \'how does heat change the time between whistles?\'',
    },
    teaching: [
        { title: 'Recording and Interpreting Observations', text: 'Recording and interpreting observations is the systematic process of documenting qualitative and quantitative data during an investigation, organizing it into tables or graphs, identifying patterns.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch1_6', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Sharpen three fuzzy wonders into lab-ready questions — dissolving sugar, rolling toy cars, rising dough — naming the independent, dependent and controlled variables for each before anyone touches a beaker.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch1_6', title: 'Recording and Interpreting Observations',
          caseStudy: { intro: 'Imagine you are testing how the length of a pendulum affects its time period in your school lab.',
            decisions: [{ prompt: 'What are the three essential components of a well-structured observation table for a controlled experiment?', options: [
                { text: 'A well-structured observation table must have: (1) columns for the independent variable', outcome: 'A well-structured observation table must have: (1) columns for the independent variable with units.' },
                { text: 'just writing down what you see', outcome: 'Not quite — Students believe that "recording observations" means writing a diary-style paragraph of what they.', reveals: 'recording-observations-means-writing-a' },
                { text: 'recording observations', outcome: 'Not quite — Students believe that "recording observations" means writing a diary-style paragraph of what they.', reveals: 'recording-observations-means-writing-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_7', title: 'Improving Understanding Through Iterative Investigation',
          caseStudy: { intro: 'Watch a ceiling fan wobble at different speeds — sometimes it runs smoothly, sometimes it shakes.',
            decisions: [{ prompt: 'A student investigates how the angle of a ramp affects the speed of a toy car.', options: [
                { text: 'No', outcome: 'No. Iterative investigation requires modifying something (hypothesis, method, or variable control).' },
                { text: 'repetition for reliability', outcome: 'Not quite — Students believe iterative investigation means "do the experiment again until you get the answer.', reveals: 'iterative-investigation-means-do-the' },
                { text: 'iteration for improvement', outcome: 'Not quite — Students believe iterative investigation means "do the experiment again until you get the answer.', reveals: 'iterative-investigation-means-do-the' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_8', title: 'Balancing Careful Observation with Creative Thinking',
          caseStudy: { intro: 'Watch a pressure cooker on a stove: steam escapes rhythmically from the whistle, the lid rattles, and water droplets form on the underside of the lid.',
            decisions: [{ prompt: 'A student watches a candle burn and writes: "The wax disappears because fire eats it." Is this careful observation, creative thinking,.', options: [
                { text: 'This is neither careful observation nor creative thinking', outcome: 'This is neither careful observation nor creative thinking — it is an untested inference.' },
                { text: 'creatively', outcome: 'Not quite — Students believe careful observation and creative thinking are separate phases — first observe.', reveals: 'careful-observation-and-creative-thinking' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_9', title: 'Science in Everyday Life: From Dough Rising to Climate Change',
          caseStudy: { intro: 'Watch a family member knead dough and leave it to rise in a warm kitchen – notice how it doubles in size.',
            decisions: [{ prompt: 'What gas is produced by yeast during fermentation that causes dough to rise?', options: [
                { text: 'Carbon dioxide (CO₂) is produced', outcome: 'Carbon dioxide (CO₂) is produced. A wrong answer like "oxygen" reveals the student confuses.' },
                { text: 'oxygen', outcome: 'Not quite — Students often think dough rises because yeast "breathes out" oxygen like humans, or that the.', reveals: 'dough-rises-because-yeast-breathes' },
                { text: 'breathes out', outcome: 'Not quite — Students often think dough rises because yeast "breathes out" oxygen like humans, or that the.', reveals: 'dough-rises-because-yeast-breathes' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_6', title: 'Use it in the wild',
          caseStudy: { intro: 'For the science fair, Javed wants to study \'why pressure cookers whistle.\' His mentor asks him to narrow it to something measurable in the school lab.',
            decisions: [{ prompt: 'Which rewrite turns his curiosity into a focused question?', options: [
                { text: '\'How does the heat level of the stove affect the time between whistles?\' — it names what will be changed (heat, the independent variable), what will be measured (time between whistles, the dependent variable), and implies keeping water amount and cooker size constant.', outcome: 'A focused question pins down the relationship between variables that can be changed and measured — \'why does it whistle\' gives nothing to vary or time.' },
                { text: '\'What makes a pressure cooker whistle?\' — adding the words \'what makes\' already sharpens the question enough.', outcome: 'It still asks for a general explanation with no identified variables; nothing in it can be changed or measured in a fair test.', reveals: 'rewording-is-focusing' },
                { text: '\'Do all pressure cookers whistle?\' — a yes-or-no question is the most focused kind because it has a single answer.', outcome: 'A yes/no classification tests no relationship between variables; focus means isolating one change against one measurement, not shrinking to a single fact.', reveals: 'yes-no-is-focused' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Science begins when a \'why?\' becomes a \'how does X affect Y while Z stays fixed?\'. The sharper the question, the cleaner the experiment.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch1_6', difficulty: 'standard',
          question: 'Recording and interpreting observations is the systematic process.',
          hint: 'Revisit c8_physics_ch1_5 (Variables in Experiments) and practice making tables for 3.',
          misconception: 'Students believe that "recording observations" means writing a diary-style paragraph of what they saw (e.g., "The car.',
          parts: [
                { id: 'a', prompt: 'A student investigates how the angle of a ramp affects the speed of a toy car.', answer: 'Outlier: 5.8 s (likely a timing error)',
                  options: ['Outlier: 5.8 s (likely a timing error)', 'recording observations', 'The car moved fast then slow', 'includes 5'],
                  hint: 'Revisit c8_physics_ch1_5 (Variables in Experiments) and practice making tables for 3 different.',
                  misconception: 'Students believe that "recording observations" means writing a diary-style paragraph of what they saw (e.g., "The car moved fast then.' }
          ],
            remediations: { 'recording-observations-means-writing-a': { steps: ['Show the student two records of the same pendulum experiment: one a paragraph, one a table with trials.', 'Ask: "Which lets you calculate an average?', 'Which lets you spot a mistake?" 2.', 'Have them re-do a past lab by creating a blank table *first*, then filling it as they watch a video of the experiment.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "recording observations" means writing a diary-style paragraph of what they saw (e.g., "The car.',
          parts: [
                { id: 'a', prompt: 'A student concludes: "The graph shows that as the mass of the bob increases, the time period of the pendulum increases." Their data table shows time periods.', answer: 'The conclusion is not supported by the data',
                  options: ['The conclusion is not supported by the data', 'Time period remains nearly constant regardless of mass', 'recording observations', 'The car moved fast then slow'],
                  hint: 'Revisit c8_physics_ch1_5 (Variables in Experiments) and practice making tables for 3 different.',
                  misconception: 'Students believe that "recording observations" means writing a diary-style paragraph of what they saw (e.g., "The car moved fast then.' }
          ],
            remediations: { 'recording-observations-means-writing-a': { steps: ['Show the student two records of the same pendulum experiment: one a paragraph, one a table with trials.', 'Ask: "Which lets you calculate an average?', 'Which lets you spot a mistake?" 2.', 'Have them re-do a past lab by creating a blank table *first*, then filling it as they watch a video of the experiment.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_7', difficulty: 'standard',
          question: 'Iterative investigation is the scientific process of repeatedly refining.',
          hint: 'Revisit c8_physics_ch1_5 (Variables in Experiments) and practice designing a fair test.',
          misconception: 'Students believe iterative investigation means "do the experiment again until you get the answer you expect" or "keep.',
          parts: [
                { id: 'a', prompt: 'A Class 8 student investigates the time period of a simple pendulum.', answer: 'Cycle 1 average = (1.8 + 2.1 + 1.9)/3 = 1.93 s',
                  options: ['Cycle 1 average = (1.8 + 2.1 + 1.9)/3 = 1.93 s', 'neater', 'do the experiment again until you get the answer you expect', 'keep changing things randomly until it works'],
                  hint: 'Revisit c8_physics_ch1_5 (Variables in Experiments) and practice designing a fair test where only.',
                  misconception: 'Students believe iterative investigation means "do the experiment again until you get the answer you expect" or "keep changing things.' },
                { id: 'b', prompt: 'Two students investigate how the surface area of a parachute affects its fall time.', answer: 'Neither is yet iterative',
                  options: ['Neither is yet iterative', 'changing the independent variable', 'do the experiment again until you get the answer you expect', 'keep changing things randomly until it works'],
                  hint: 'Revisit c8_physics_ch1_5 (Variables in Experiments) and practice designing a fair test where only.',
                  misconception: 'Students believe iterative investigation means "do the experiment again until you get the answer you expect" or "keep changing things.' }
          ],
            remediations: { 'iterative-investigation-means-do-the': { steps: ['If a student shows this misconception, guide them through a 15-minute "Paper Tower" activity: give 5 sheets.', 'Cycle 1: Build tallest tower in 3 min.', 'Identify *one* reason it fell (e.g., "base too narrow").', 'Cycle 2: Change *only* that one thing (e.g., widen base).'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_8', difficulty: 'standard',
          question: 'Balancing careful observation with creative thinking is the scientific practice.',
          hint: 'Revisit c8_physics_ch1_2 (Observation and Experimentation) and c8_physics_ch1_4.',
          misconception: 'Students believe careful observation and creative thinking are separate phases — first observe, then think creatively.',
          parts: [
                { id: 'a', prompt: 'A student watches a candle burn and writes: "The wax disappears because fire eats it." Is this careful observation, creative thinking, or neither?', answer: 'This is neither careful observation nor creative thinking',
                  options: ['This is neither careful observation nor creative thinking', 'creatively'],
                  hint: 'Revisit c8_physics_ch1_2 (Observation and Experimentation) and c8_physics_ch1_4 (Hypothesis).',
                  misconception: 'Students believe careful observation and creative thinking are separate phases — first observe, then think creatively.' },
                { id: 'b', prompt: 'Why is it insufficient to only have careful observation without creative thinking in a scientific investigation?', answer: 'Careful observation alone produces data but no explanation',
                  options: ['Careful observation alone produces data but no explanation', 'creatively'],
                  hint: 'Revisit c8_physics_ch1_2 (Observation and Experimentation) and c8_physics_ch1_4 (Hypothesis).',
                  misconception: 'Students believe careful observation and creative thinking are separate phases — first observe, then think creatively.' },
                { id: 'c', prompt: 'Design a 3-step observation protocol for investigating how the angle of a ramp affects the speed of a toy car rolling down.', answer: 'what to measure, (',
                  options: ['what to measure, (', 'creatively'],
                  hint: 'Revisit c8_physics_ch1_2 (Observation and Experimentation) and c8_physics_ch1_4 (Hypothesis).',
                  misconception: 'Students believe careful observation and creative thinking are separate phases — first observe, then think creatively.' },
                { id: 'd', prompt: 'Two students investigate why a balloon sticks to a wall after rubbing it on hair. Student A carefully observes: "It sticks for 45 seconds, then falls.', answer: 'Student A demonstrates careful observation (systematic, measurable, comparative)',
                  options: ['Student A demonstrates careful observation (systematic, measurable, comparative)', 'observation', 'creative', 'creatively'],
                  hint: 'Revisit c8_physics_ch1_2 (Observation and Experimentation) and c8_physics_ch1_4 (Hypothesis).',
                  misconception: 'Students believe careful observation and creative thinking are separate phases — first observe, then think creatively.' }
          ],
            remediations: { 'careful-observation-and-creative-thinking': { steps: ['If a student separates the two, run this 15-minute remediation: (1) Give them a burning candle and ask for 10.', '(2) Ask: "What would a scientist *wonder* about each observation?" — this forces creative links.', '(3) Have them pick one wonder (e.g., "Why does the flame flicker?") and design a 3-step test.', '(4) Debrief: "Your wonder came *from* observation; your test design is creative; doing the test needs careful.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch1_9', difficulty: 'standard',
          question: 'Science in Everyday Life is the practice of using scientific principles and.',
          hint: 'Review c8_physics_ch1_4 (Hypothesis) and c8_physics_ch1_5 (Variables) to practice.',
          misconception: 'Students often think dough rises because yeast "breathes out" oxygen like humans, or that the greenhouse effect.',
          parts: [
                { id: 'a', prompt: 'What gas is produced by yeast during fermentation that causes dough to rise?', answer: 'Carbon dioxide (CO₂) is produced',
                  options: ['Carbon dioxide (CO₂) is produced', 'oxygen', 'breathes out'],
                  hint: 'Review c8_physics_ch1_4 (Hypothesis) and c8_physics_ch1_5 (Variables) to practice designing fair.',
                  misconception: 'Students often think dough rises because yeast "breathes out" oxygen like humans, or that the greenhouse effect is caused by the ozone.' },
                { id: 'b', prompt: 'A student wants to test whether adding sugar affects the speed of dough rising.', answer: 'Independent: amount of sugar added',
                  options: ['Independent: amount of sugar added', 'breathes out'],
                  hint: 'Review c8_physics_ch1_4 (Hypothesis) and c8_physics_ch1_5 (Variables) to practice designing fair.',
                  misconception: 'Students often think dough rises because yeast "breathes out" oxygen like humans, or that the greenhouse effect is caused by the ozone.' }
          ],
            remediations: { 'dough-rises-because-yeast-breathes': { steps: ['Conduct a yeast-sugar-water balloon experiment: Mix 1 tsp yeast, 1 tsp sugar, 50 mL warm water in a bottle; stretch.', 'Observe balloon inflate (CO₂).', 'Test the gas with limewater – it turns milky, confirming CO₂.', 'Then discuss: no oxygen was added, so yeast must work anaerobically.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
