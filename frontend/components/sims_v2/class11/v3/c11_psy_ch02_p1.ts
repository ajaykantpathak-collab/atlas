import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch02_p1: SimDef = {
    id: 'v3_c11_psy_ch02_p1',
    title: 'Methods of Enquiry in Psychology · Part 1/2',
    subtitle: 'Learn what counts as data when the mind is the subject.',
    classLevel: 11, subject: 'psychology', topic: 'Methods of Enquiry in Psychology · Part 1/2',
    chapters: ['c11_psy_ch02'],
    nodeIds: ['c11_psy_cbse_02_001', 'c11_psy_cbse_02_002', 'c11_psy_cbse_02_003', 'c11_psy_cbse_02_004', 'c11_psy_cbse_02_005', 'c11_psy_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a researcher inventorying every signal a study emits', intro: 'A heartbeat trace, a birthday, a warm room — in a psychological study all of it is data, not just the questionnaire.', goal: 'Identify psychological data broadly and weigh ordinal versus interval measurement.' },
    discovery: {
        question: 'Psychological data means IQ scores and questionnaire answers — everything else is just lab noise?',
        options: ['No — demographics, room temperature, heart rate and EEG all count as psychological data inside a study', 'Yes — only mental measurements qualify', 'Yes — data must be self-reported', 'No — but only the EEG counts'],
        answer: 'No — demographics, room temperature, heart rate and EEG all count as psychological data inside a study',
        hook: 'And description isn\'t the unscientific step — a careful, systematic record of behaviour is where prediction and explanation begin.',
    },
    teaching: [
        { title: 'Goals of Psychological Enquiry: Description, Prediction, Explanation', text: 'The goals of psychological enquiry are the five systematic objectives that guide scientific research in psychology: **description** (accurately recording a behaviour or phenomenon to distinguish.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify a therapist\'s trial — 50 patients, 60% symptom drop — into the goals of psychology, then judge whether rank data is \'more honest\' than scores.',
        labels: ['Goals of Psychological Enquiry', 'Nature and Types', 'Observational Method: Naturalistic', 'Experimental Method: Variables, Control', 'Correlational Research: Nature', 'Survey Research: Questionnaires'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_001', title: 'Goals of Psychological Enquiry: Description, Prediction, Explanation',
          caseStudy: { intro: 'Imagine you notice that some students in your class score very high on exams while others struggle, even though they study for similar hours.',
            decisions: [{ prompt: 'A researcher records the exact frequency, duration, and intensity of aggressive acts displayed by children during free play in a preschool.', options: [
                { text: '**Correct answer:** Description', outcome: '**Correct answer:** Description. The researcher is systematically recording the characteristics.' },
                { text: 'explanation', outcome: 'Not quite — **Misconception:** "Description is just \'listing what you see\' and is the least scientific goal.', reveals: 'misconception-description-is-just-listing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_002', title: 'Nature and Types of Psychological Data',
          caseStudy: { intro: 'Imagine you are a Class 11 student observing your classmates during a surprise test.',
            decisions: [{ prompt: 'A researcher records the number of hours each student in Class XI spends on social media daily.', options: [
                { text: 'This falls under **demographic information** (specifically behavioural demographic data)', outcome: 'This falls under **demographic information** (specifically behavioural demographic data) because.' },
                { text: 'psychological information', outcome: 'Not quite — Students believe **"psychological data" means only test scores or questionnaire responses** (e.g.', reveals: 'psychological-data-means-only-test' },
                { text: 'psychological data', outcome: 'Not quite — Students believe **"psychological data" means only test scores or questionnaire responses** (e.g.', reveals: 'psychological-data-means-only-test' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_003', title: 'Observational Method: Naturalistic and Controlled Observation',
          caseStudy: { intro: 'Imagine you want to understand how Class 11 students actually use their smartphones during a free period—do they study, scroll social media, or chat?',
            decisions: [{ prompt: 'A researcher wants to study bullying behaviour during school recess.', options: [
                { text: 'This is **naturalistic non-participant observation**', outcome: 'This is **naturalistic non-participant observation**. The key scientific characteristic.' },
                { text: 'controlled observation', outcome: 'Not quite — **Misconception:** "Naturalistic observation is \'just watching\' and therefore easier/less rigorous.', reveals: 'misconception-naturalistic-observation-is-just' },
                { text: 'participant observation', outcome: 'Not quite — **Misconception:** "Naturalistic observation is \'just watching\' and therefore easier/less rigorous.', reveals: 'misconception-naturalistic-observation-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_004', title: 'Experimental Method: Variables, Control and Experimental Design',
          caseStudy: { intro: 'Imagine you want to test if drinking tulsi (holy basil) tea before exams reduces anxiety.',
            decisions: [{ prompt: 'Define independent variable and dependent variable. Give one example of each from a memory experiment.', options: [
                { text: 'Independent variable (IV) is the factor manipulated by the researcher (e.g., type of', outcome: 'Independent variable (IV) is the factor manipulated by the researcher (e.g., type of rehearsal.' },
                { text: 'what the researcher changes', outcome: 'Not quite — Students often think "control group" means "a group that receives no treatment at all." In reality.', reveals: 'control-group-means-a-group' },
                { text: 'what is measured', outcome: 'Not quite — Students often think "control group" means "a group that receives no treatment at all." In reality.', reveals: 'control-group-means-a-group' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_005', title: 'Correlational Research: Nature and Interpretation of Correlation',
          caseStudy: { intro: 'Imagine you notice that students who carry umbrellas to school often wear raincoats too. Does carrying an umbrella *cause* wearing a raincoat?',
            decisions: [{ prompt: 'What is the range of the correlation coefficient (r) and what do the extreme values +1.0 and -1.0 indicate?', options: [
                { text: 'The correlation coefficient *r* ranges from -1.0 to +1.0', outcome: 'The correlation coefficient *r* ranges from -1.0 to +1.0. A value of +1.0 indicates a perfect.' },
                { text: '0 to 1', outcome: 'Not quite — Students firmly believe that a high correlation coefficient (e.g., r = +0.90) means Variable.', reveals: 'students-firmly-believe-that-a' },
                { text: 'extremes mean causation', outcome: 'Not quite — Students firmly believe that a high correlation coefficient (e.g., r = +0.90) means Variable.', reveals: 'students-firmly-believe-that-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_006', title: 'Survey Research: Questionnaires and Interviews',
          caseStudy: { intro: 'Imagine you want to know why Class 11 students in your school prefer certain streams (Science, Commerce, Humanities) — you cannot experiment by forcing them.',
            decisions: [{ prompt: 'Define "structured interview" and give one example of a closed-ended question format used in it.', options: [
                { text: 'A structured interview uses a pre-determined interview schedule with fixed wording and', outcome: 'A structured interview uses a pre-determined interview schedule with fixed wording and sequence.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students believe "survey research can establish cause-effect relationships" because they see.', reveals: 'survey-research-can-establish-cause' },
                { text: 'survey research can establish cause-effect relationships', outcome: 'Not quite — Students believe "survey research can establish cause-effect relationships" because they see.', reveals: 'survey-research-can-establish-cause' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Designing a study on \'why toppers score high\', a teammate proposes skipping straight to an experiment: \'Description is just diary-keeping, not science. And our data will be test scores — room noise and heart rate aren\'t psychological data.\'',
            decisions: [{ prompt: 'What do the goals and data of enquiry actually require?', options: [
                { text: 'Correct both premises: description IS scientific — it demands operationalised categories, coding schemes and inter-rater reliability before any experiment can run; the enquiry ladder runs describe → predict → explain → control → apply. And data is defined by the investigation: demographic, physical (noise levels as the IV) and physiological (heart rate) measures are psychological data when gathered in a psychological study.', outcome: 'The design matures: systematic description gives the experiment its variables, and the data net widens beyond test scores to context and physiology.' },
                { text: 'Skip description — real science starts with variables and hypotheses, not observation.', outcome: 'Without systematic description you can\'t operationalise what \'studying differently\' even means — description is where the measurable categories come from.', reveals: 'description-isnt-science' },
                { text: 'Restrict data to scores and questionnaires — psychological data is mental data.', outcome: 'Data are defined by the research context: noise level as an independent variable or heart rate as an indicator are psychological data by role, not by content.', reveals: 'only-mental-data-is-psychological' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Ranks say who\'s ahead but not by how much — an interval gap between 1st and 2nd can hide a canyon or a hair\'s breadth.',
            decisions: [{ prompt: 'What comes next? Methods of Enquiry in Psychology · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Methods of Enquiry in Psychology · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_001', difficulty: 'standard',
          question: 'The goals of psychological enquiry are the five systematic objectives that.',
          hint: 'If stuck, revisit the Class 10 Science lab manual\'s "Scientific Method" section.',
          misconception: '**Misconception:** "Description is just \'listing what you see\' and is the least scientific goal because it doesn\'t.',
          parts: [
                { id: 'a', prompt: 'A researcher records the exact frequency, duration, and intensity of aggressive acts displayed by children during free play in a preschool.', answer: '**Correct answer:** Description',
                  options: ['**Correct answer:** Description', 'explanation'],
                  hint: 'If stuck, revisit the Class 10 Science lab manual\'s "Scientific Method" section (hypothesis →.',
                  misconception: '**Misconception:** "Description is just \'listing what you see\' and is the least scientific goal because it doesn\'t involve numbers.' },
                { id: 'b', prompt: 'A school counsellor observes that students who participate in the morning mindfulness program report lower stress levels during exams.', answer: '**Correct answer:** The two goals are **explanation** and **control**',
                  options: ['**Correct answer:** The two goals are **explanation** and **control**', 'prediction and application'],
                  hint: 'If stuck, revisit the Class 10 Science lab manual\'s "Scientific Method" section (hypothesis →.',
                  misconception: '**Misconception:** "Description is just \'listing what you see\' and is the least scientific goal because it doesn\'t involve numbers.' }
          ],
            remediations: { 'misconception-description-is-just-listing': { steps: ['**Step-by-step remediation:** 1.', '**Show, don\'t tell:** Give the student two observation records of the same classroom: (A) "Kids were noisy and.', 'Coded using Flanders Interaction Analysis Category 8 (student talk).', 'Inter-rater reliability κ = 0.82." 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Description is just \'listing what you see\' and is the least scientific goal because it doesn\'t.',
          parts: [
                { id: 'a', prompt: 'A psychologist develops a new therapy for social anxiety based on the explanation that "avoidance behaviour maintains anxiety by preventing disconfirmation.', answer: '**Correct answer:** Yes, this fulfills the application goal',
                  options: ['**Correct answer:** Yes, this fulfills the application goal', 'No, because it wasn\'t tested on a large enough sample'],
                  hint: 'If stuck, revisit the Class 10 Science lab manual\'s "Scientific Method" section (hypothesis →.',
                  misconception: '**Misconception:** "Description is just \'listing what you see\' and is the least scientific goal because it doesn\'t involve numbers.' },
                { id: 'b', prompt: 'Design a mini research scenario (2-3 sentences) that clearly demonstrates **all five goals** of psychological enquiry in sequence, using the context.', answer: '**Expected answer (example):** 1',
                  options: ['**Expected answer (example):** 1', 'publishing a paper'],
                  hint: 'If stuck, revisit the Class 10 Science lab manual\'s "Scientific Method" section (hypothesis →.',
                  misconception: '**Misconception:** "Description is just \'listing what you see\' and is the least scientific goal because it doesn\'t involve numbers.' }
          ],
            remediations: { 'misconception-description-is-just-listing': { steps: ['**Step-by-step remediation:** 1.', '**Show, don\'t tell:** Give the student two observation records of the same classroom: (A) "Kids were noisy and.', 'Coded using Flanders Interaction Analysis Category 8 (student talk).', 'Inter-rater reliability κ = 0.82." 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_002', difficulty: 'standard',
          question: 'Psychological data refers to the systematically collected information about.',
          hint: 'If stuck, revisit the "Goals of Psychological Enquiry" section (node c11_psy_cbse_02_001).',
          misconception: 'Students believe **"psychological data" means only test scores or questionnaire responses** (e.g., IQ scores.',
          parts: [
                { id: 'a', prompt: 'A study on "effect of classroom lighting on reading speed" collects: (a) lux levels in the room, (b) students\' reading speed in words/minute, (c) students\'.', answer: 'lux levels in the room, (',
                  options: ['lux levels in the room, (', 'physiological', 'psychological', 'psychological data'],
                  hint: 'If stuck, revisit the "Goals of Psychological Enquiry" section (node c11_psy_cbse_02_001) and match.',
                  misconception: 'Students believe **"psychological data" means only test scores or questionnaire responses** (e.g., IQ scores, personality inventory.' },
                { id: 'b', prompt: 'Compare and contrast: "Data are not independent entities; they are located in a context" vs.', answer: 'The first statement addresses **data genesis**: data emerge from a specific',
                  options: ['The first statement addresses **data genesis**: data emerge from a specific', 'context of collection', 'process of inference', 'psychological data'],
                  hint: 'If stuck, revisit the "Goals of Psychological Enquiry" section (node c11_psy_cbse_02_001) and match.',
                  misconception: 'Students believe **"psychological data" means only test scores or questionnaire responses** (e.g., IQ scores, personality inventory.' }
          ],
            remediations: { 'psychological-data-means-only-test': { steps: ['**Re-read the textbook\'s four-category list** (demographic, physical, physiological, psychological) and create a 2×2.', '**Pick any psychology experiment** (e.g., Latane & Darley\'s smoke-filled room from Box 2.1) and identify: which data.', '**Write one sentence** explaining why the *same* heart rate measure is "physiological data" in a biology lab but.', 'The key phrase: "because it serves as an indicator of a psychological construct (arousal) within a psychological.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_003', difficulty: 'standard',
          question: 'The Observational Method is a systematic research technique in psychology where.',
          hint: 'Revisit c11_psy_cbse_02_001: Write one sentence for each goal (description, prediction.',
          misconception: '**Misconception:** "Naturalistic observation is \'just watching\' and therefore easier/less rigorous than experiments.".',
          parts: [
                { id: 'a', prompt: 'A researcher wants to study bullying behaviour during school recess.', answer: 'This is **naturalistic non-participant observation**',
                  options: ['This is **naturalistic non-participant observation**', 'controlled observation', 'participant observation'],
                  hint: 'Revisit c11_psy_cbse_02_001: Write one sentence for each goal (description, prediction.',
                  misconception: '**Misconception:** "Naturalistic observation is \'just watching\' and therefore easier/less rigorous than experiments." **Why students make.' },
                { id: 'b', prompt: 'Compare participant vs. non-participant observation on **three dimensions**: (1) reactivity (Hawthorne effect), (2) depth of insight (emic vs.', answer: '| Dimension | Participant | Non-Participant | Example |',
                  options: ['| Dimension | Participant | Non-Participant | Example |', 'participant = always unethical', 'non-participant = always superficial'],
                  hint: 'Revisit c11_psy_cbse_02_001: Write one sentence for each goal (description, prediction.',
                  misconception: '**Misconception:** "Naturalistic observation is \'just watching\' and therefore easier/less rigorous than experiments." **Why students make.' }
          ],
            remediations: { 'misconception-naturalistic-observation-is-just': { steps: ['**Clarify the "selection" step**: Give the student a 2-minute video of a classroom.', 'Ask: "List exactly 5 behaviours you would code if studying \'engagement\'." Compare their list to a pre-defined coding.', '**Practice inter-observer reliability**: Pair students.', 'Both code the same 5-min clip using a shared scheme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_004', difficulty: 'standard',
          question: 'The experimental method is a systematic research procedure in which.',
          hint: 'Revisit c11_psy_cbse_02_001 (Goals of Enquiry) to recall "explanation" requires.',
          misconception: 'Students often think "control group" means "a group that receives no treatment at all." In reality, a control group.',
          parts: [
                { id: 'a', prompt: 'A researcher tests whether background music improves reading comprehension.', answer: 'The conclusion is flawed',
                  options: ['The conclusion is flawed', 'the sample size is too small', 'music might be distracting', 'control group'],
                  hint: 'Revisit c11_psy_cbse_02_001 (Goals of Enquiry) to recall "explanation" requires cause-effect, and.',
                  misconception: 'Students often think "control group" means "a group that receives no treatment at all." In reality, a control group receives *all* the same.' },
                { id: 'b', prompt: 'Design a simple experiment to test if writing notes by hand leads to better retention than typing.', answer: 'IV and its levels, (',
                  options: ['IV and its levels, (', 'control group', 'a group that receives no treatment at all', 'lets students choose their preferred method introduces selection bias'],
                  hint: 'Revisit c11_psy_cbse_02_001 (Goals of Enquiry) to recall "explanation" requires cause-effect, and.',
                  misconception: 'Students often think "control group" means "a group that receives no treatment at all." In reality, a control group receives *all* the same.' },
                { id: 'c', prompt: 'Compare and contrast laboratory experiments, field experiments, and quasi-experiments on three dimensions: control over extraneous variables, ecological.', answer: 'Laboratory experiments: high control, low ecological validity, strong causation',
                  options: ['Laboratory experiments: high control, low ecological validity, strong causation', 'no control', 'cannot suggest causation', 'control group'],
                  hint: 'Revisit c11_psy_cbse_02_001 (Goals of Enquiry) to recall "explanation" requires cause-effect, and.',
                  misconception: 'Students often think "control group" means "a group that receives no treatment at all." In reality, a control group receives *all* the same.' }
          ],
            remediations: { 'control-group-means-a-group': { steps: ['Ask the student to draw two boxes labeled "Experimental Group" and "Control Group."', 'List every procedure, instruction, and stimulus each group receives.', 'Cross out everything that is identical.', 'The *only* remaining difference must be the IV. If other differences remain (e.g., "experimental group gets 30 min.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_005', difficulty: 'standard',
          question: 'Correlational research is a non-experimental method that quantifies the.',
          hint: 'Revisit c11_psy_cbse_02_004 (Experimental Method) — specifically the IV/DV definitions.',
          misconception: 'Students firmly believe that a high correlation coefficient (e.g., r = +0.90) means Variable X *causes* Variable Y.',
          parts: [
                { id: 'a', prompt: 'What is the range of the correlation coefficient (r) and what do the extreme values +1.0 and -1.0 indicate?', answer: 'The correlation coefficient *r* ranges from -1.0 to +1.0',
                  options: ['The correlation coefficient *r* ranges from -1.0 to +1.0', '0 to 1', 'extremes mean causation'],
                  hint: 'Revisit c11_psy_cbse_02_004 (Experimental Method) — specifically the IV/DV definitions and the.',
                  misconception: 'Students firmly believe that a high correlation coefficient (e.g., r = +0.90) means Variable X *causes* Variable Y.' },
                { id: 'b', prompt: 'A researcher computes r = -0.82 between "daily social media usage (hours)" and "academic percentile" for 200 Class 11 students.', answer: 'Variables: X = daily social media usage (hours), Y = academic percentile',
                  options: ['Variables: X = daily social media usage (hours), Y = academic percentile', 'social media causes low grades', 'says "social media causes low grades" reveals the causation misconception'],
                  hint: 'Revisit c11_psy_cbse_02_004 (Experimental Method) — specifically the IV/DV definitions and the.',
                  misconception: 'Students firmly believe that a high correlation coefficient (e.g., r = +0.90) means Variable X *causes* Variable Y.' },
                { id: 'c', prompt: 'Two studies report: Study A: r = +0.45 between variable P and Q. Study B: r = -0.78 between variable M and N. Which study shows a stronger relationship?', answer: 'Study B shows a stronger relationship',
                  options: ['Study B shows a stronger relationship', 'positive is stronger', '0.78 is negative so weaker'],
                  hint: 'Revisit c11_psy_cbse_02_004 (Experimental Method) — specifically the IV/DV definitions and the.',
                  misconception: 'Students firmly believe that a high correlation coefficient (e.g., r = +0.90) means Variable X *causes* Variable Y.' }
          ],
            remediations: { 'students-firmly-believe-that-a': { steps: ['**Confront with a classic third-variable example**: "Ice cream sales and drowning deaths correlate at r = +0.87.', 'Does banning ice cream prevent drowning?', 'What third variable explains both?" 2.', '**Visualise the logic gap**: Draw three boxes — X, Y, Z.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_006', difficulty: 'standard',
          question: 'Survey research is a method of collecting data from a predefined group.',
          hint: 'Revisit "Goals of Psychological Enquiry" (c11_psy_cbse_02_001) and "Nature.',
          misconception: 'Students believe "survey research can establish cause-effect relationships" because they see correlations reported.',
          parts: [
                { id: 'a', prompt: 'Compare telephone survey and face-to-face interview on: (a) response rate, (b) depth of response, (c) cost per respondent.', answer: 'response rate, (',
                  options: ['response rate, (', 'survey research can establish cause-effect relationships', 'survey shows social media causes anxiety'],
                  hint: 'Revisit "Goals of Psychological Enquiry" (c11_psy_cbse_02_001) and "Nature of Psychological Data".',
                  misconception: 'Students believe "survey research can establish cause-effect relationships" because they see correlations reported in news (e.g., "survey.' }
          ],
            remediations: { 'survey-research-can-establish-cause': { steps: ['Ask the student to draw a diagram — "Show me how the survey manipulates the independent variable." They cannot, because.', 'Contrast with Box 2.1 (Latane & Darley\'s smoke experiment) — identify the IV (presence of others) manipulated.', 'Give a new scenario: "You want to test if caffeine improves memory.', 'Assign a practice question: "Identify whether each study uses survey or experiment: (a) Questionnaire on diet and BMI.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
