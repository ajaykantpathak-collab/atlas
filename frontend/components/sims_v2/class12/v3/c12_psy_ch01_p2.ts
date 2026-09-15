import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch01_p2: SimDef = {
    id: 'v3_c12_psy_ch01_p2',
    title: 'Variations in Psychological Attributes · Part 2/2',
    subtitle: 'Same Rohan, different room — trait or situation?',
    classLevel: 12, subject: 'psychology', topic: 'Variations in Psychological Attributes · Part 2/2',
    chapters: ['c12_psy_ch01'],
    nodeIds: ['c12_psy_cbse_01_007', 'c12_psy_cbse_01_008', 'c12_psy_cbse_01_009', 'c12_psy_cbse_01_010', 'c12_psy_cbse_01_011', 'c12_psy_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Behaviour analyst', intro: 'Why does one friend race through the test while another barely finishes? The answer is older than the classroom.', goal: 'Explain individual differences through the trait-situation debate and nature-nurture interaction.' },
    discovery: {
        question: 'Rohan is loud and funny with friends, quiet and respectful at the school assembly. Did his personality change — or did something else move?',
        options: ['The situation — situationism says context can override traits; the aggressive go submissive before a boss, the talkative go quiet in assembly', 'His traits reset', 'He\'s faking', 'Two personalities'],
        answer: 'The situation — situationism says context can override traits; the aggressive go submissive before a boss, the talkative go quiet in assembly',
        hook: 'Nature versus nurture isn\'t a contest — heredity sets a reaction range, environment picks where inside it you land. Modern psychology is interactionist: the honest answer to \'trait or situation?\' is both, dynamically.',
    },
    teaching: [
        { title: 'PASS Model: Planning, Attention-Arousal and Simultaneous-Successive Processing', text: 'The PASS (Planning, Attention-Arousal, Simultaneous-Successive) Model is an information-processing theory of intelligence that describes cognitive functioning through three interdependent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Analyse why classmates differ: run the trait-versus-situation debate on real behaviour, place heredity and environment in the same frame, and resist the urge to crown either one.',
        labels: ['PASS Model: Planning, Attention-Arousal', 'IQ Assessment: Mental Age,', 'Intellectual Disability and Giftedness', 'Types of Intelligence Tests', 'Culture and Intelligence: Technological', 'Emotional Intelligence, Aptitude'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_007', title: 'PASS Model: Planning, Attention-Arousal and Simultaneous-Successive Processing',
          caseStudy: { intro: 'Imagine you sit down to solve a jigsaw puzzle: first you feel alert and focus on the picture (Arousal/Attention), then you either group pieces by color/shape.',
            decisions: [{ prompt: 'Name the three functional units of the brain in the PASS model and state the primary role of each.', options: [
                { text: 'The three functional units are: (1) Arousal/Attention', outcome: 'The three functional units are: (1) Arousal/Attention — maintains optimal alertness and focuses.' },
                { text: 'processing', outcome: 'Not quite — Students often treat the four PASS components as *sequential stages* (first Attention, then.', reveals: 'students-often-treat-the-four' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_01_008', title: 'IQ Assessment: Mental Age, IQ Formula and the Normal Distribution',
          scaffold: { problem: 'Riya is 9 years old. On a standardized intelligence test, she performs at the level of an average 11-year-old.',
            steps: [
            { text: 'Identify given values: Chronological Age (CA) = 9 years; Mental Age (MA) = 11 years (since she performs like an average.' },
            { text: 'Recall the ratio IQ formula: IQ = (MA / CA) × 100.' },
            { text: 'Substitute the values: IQ = (11 / 9) × 100.' },
            { text: 'Compute: 11/9 = 1.222...; 1.222... × 100 = 122.22 ≈ 122 (IQ scores are reported as whole numbers).' },
            { text: 'Interpret using Table 1.1: IQ 122 falls in the range 120–130, labelled "Superior" (6.7% of population).', faded: true, blankAnswer: 'IQ = 122; Classification: Superior' }
            ] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_009', title: 'Intellectual Disability and Giftedness: Levels, Characteristics and Identification',
          caseStudy: { intro: 'Imagine a 10-year-old child who cannot tie shoelaces, struggles to follow two-step instructions, but smiles warmly when praised — a teacher wonders: "Is this.',
            decisions: [{ prompt: 'A 12-year-old child has a mental age of 7 years. Calculate their IQ and state the correct classification label from Table 1.1 of NCERT.', options: [
                { text: 'IQ = (7/12) × 100 = 58.33 ≈ 58', outcome: 'IQ = (7/12) × 100 = 58.33 ≈ 58. This falls in the range 55–70, classified as **Mild Intellectual.' },
                { text: 'Borderline', outcome: 'Not quite — **Misconception:** "Intellectual disability is diagnosed solely by IQ score below 70." **Why.', reveals: 'misconception-intellectual-disability-is-diagnos' },
                { text: 'Moderate', outcome: 'Not quite — **Misconception:** "Intellectual disability is diagnosed solely by IQ score below 70." **Why.', reveals: 'misconception-intellectual-disability-is-diagnos' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_010', title: 'Types of Intelligence Tests: Individual vs Group, Verbal vs Performance, Culture-Fair',
          caseStudy: { intro: 'Imagine a school counsellor needs to assess a 14-year-old student who recently migrated from a rural village, speaks only Marathi, and has had irregular.',
            decisions: [{ prompt: 'A researcher wants to screen 200 Class 9 students for a giftedness program in a single morning session.', options: [
                { text: 'Group test administration is most appropriate', outcome: 'Group test administration is most appropriate because it allows simultaneous testing of large.' },
                { text: 'non-verbal test = culture-fair test', outcome: 'Not quite — Students believe "non-verbal test = culture-fair test" and "individual test = better test." They.', reveals: 'non-verbal-test-culture-fair' },
                { text: 'individual test = better test', outcome: 'Not quite — Students believe "non-verbal test = culture-fair test" and "individual test = better test." They.', reveals: 'non-verbal-test-culture-fair' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_011', title: 'Culture and Intelligence: Technological Intelligence vs Indian Concept of Buddhi',
          caseStudy: { intro: 'Imagine a student from a rural Indian village who excels at mediating family disputes, managing agricultural cycles, and recalling oral traditions but scores.',
            decisions: [{ prompt: 'Define technological intelligence and list three specific skills it emphasises according to the NCERT textbook.', options: [
                { text: 'Technological intelligence is the form of intelligence promoted in technologically', outcome: 'Technological intelligence is the form of intelligence promoted in technologically advanced.' },
                { text: 'problem-solving', outcome: 'Not quite — Students often equate "cultural differences in intelligence" with "some cultures are smarter than.', reveals: 'students-often-equate-cultural-differences' },
                { text: 'logical thinking', outcome: 'Not quite — Students often equate "cultural differences in intelligence" with "some cultures are smarter than.', reveals: 'students-often-equate-cultural-differences' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A school counsellor must advise a student torn between \'I love sketching, so design\' and her strong mechanical-aptitude score — her parents push \'just follow the marks card.\'',
            decisions: [{ prompt: 'What does psychological assessment say the decision actually needs?', options: [
                { text: 'Both domains, separately — interest says what she\'d choose, aptitude says what she could train into skill; loving a field without the aptitude breeds frustration, aptitude without interest breeds disengagement, and a marks card answers neither.', outcome: 'The chapter\'s split: domains are different constructs needing different methods — assessment is purpose-driven, and stream choice needs the interest-aptitude pairing, not a single score.' },
                { text: 'Follow the marks — performance is the best single predictor of success.', outcome: 'Marks conflate ability, coaching and effort into one number and say nothing about preference or potential; the chapter treats attributes as multi-dimensional precisely because one index can\'t carry a career decision.', reveals: 'marks-are-enough' },
                { text: 'Follow her interest — passion overrides aptitude every time.', outcome: 'Interest without aptitude is the textbook mismatch — she may love the activity and still stall on the skill; the pairing exists to catch exactly this lopsided case.', reveals: 'passion-overrides-aptitude' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'You can now read individual differences as an interaction — traits meeting situations, nature setting the range nurture navigates.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_007', difficulty: 'standard',
          question: 'The PASS (Planning, Attention-Arousal, Simultaneous-Successive) Model is.',
          hint: 'If stuck, revisit c12_psy_cbse_01_006 (Sternberg\'s triarchic theory) to see how.',
          misconception: 'Students often treat the four PASS components as *sequential stages* (first Attention, then Processing, then Planning).',
          parts: [
                { id: 'a', prompt: 'Name the three functional units of the brain in the PASS model and state the primary role of each.', answer: 'The three functional units are: (1) Arousal/Attention',
                  options: ['The three functional units are: (1) Arousal/Attention', 'processing'],
                  hint: 'If stuck, revisit c12_psy_cbse_01_006 (Sternberg\'s triarchic theory) to see how metacomponents.',
                  misconception: 'Students often treat the four PASS components as *sequential stages* (first Attention, then Processing, then Planning) because the NCERT.' }
          ],
            remediations: { 'students-often-treat-the-four': { steps: ['Re-read the NCERT paragraph: "These PASS processes operate on a knowledge base...', 'These processes are interactive and dynamic in nature; yet each has its own distinctive functions." 2.', 'Draw a triangle with vertices labelled Attention, Processing (Simultaneous/Successive), Planning.', 'Draw bidirectional arrows between all three.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_008', difficulty: 'standard',
          question: 'Intelligence Quotient (IQ) is a standardized score derived from the ratio.',
          hint: 'If stuck on calculations, revisit Class 11 Psychology node c11_psy_cbse_02_009.',
          misconception: 'Students often believe that Mental Age is a fixed biological trait like height, and that the ratio IQ formula.',
          parts: [
                { id: 'a', prompt: 'A 10-year-old child has a Mental Age of 13. What is the child\'s IQ? Show the calculation.', answer: 'IQ = (MA/CA) × 100 = (13/10) × 100 = 130',
                  options: ['IQ = (MA/CA) × 100 = (13/10) × 100 = 130', 'above 130 is 5%', 'above 130 is 5%" instead of 2.2%'],
                  hint: 'If stuck on calculations, revisit Class 11 Psychology node c11_psy_cbse_02_009 (Descriptive.',
                  misconception: 'Students often believe that Mental Age is a fixed biological trait like height, and that the ratio IQ formula (MA/CA×100) is the standard.' },
                { id: 'b', prompt: 'Explain in your own words what a Mental Age of 8 means for a 6-year-old child, and why the IQ would be above 100.', answer: 'Mental Age 8 means the child performs at the average level of an 8-year-old',
                  options: ['Mental Age 8 means the child performs at the average level of an 8-year-old', 'above 130 is 5%', 'above 130 is 5%" instead of 2.2%'],
                  hint: 'If stuck on calculations, revisit Class 11 Psychology node c11_psy_cbse_02_009 (Descriptive.',
                  misconception: 'Students often believe that Mental Age is a fixed biological trait like height, and that the ratio IQ formula (MA/CA×100) is the standard.' },
                { id: 'c', prompt: 'A 14-year-old has an IQ of 120. What is her Mental Age? If she were tested again at age 16 and her Mental Age remained 16.8, what would her new IQ be?', answer: 'Step 1: IQ = (MA/CA)×100 → 120 = (MA/14)×100 → MA = (120×14)/100 = 16.8 years',
                  options: ['Step 1: IQ = (MA/CA)×100 → 120 = (MA/14)×100 → MA = (120×14)/100 = 16.8 years', 'above 130 is 5%', 'above 130 is 5%" instead of 2.2%'],
                  hint: 'If stuck on calculations, revisit Class 11 Psychology node c11_psy_cbse_02_009 (Descriptive.',
                  misconception: 'Students often believe that Mental Age is a fixed biological trait like height, and that the ratio IQ formula (MA/CA×100) is the standard.' },
                { id: 'd', prompt: 'The normal distribution of IQ scores has a mean of 100 and SD of 15.', answer: '70 to 130 is μ ± 2σ → 95% of population',
                  options: ['70 to 130 is μ ± 2σ → 95% of population', 'above 130 is 5%', 'above 130 is 5%" instead of 2.2%'],
                  hint: 'If stuck on calculations, revisit Class 11 Psychology node c11_psy_cbse_02_009 (Descriptive.',
                  misconception: 'Students often believe that Mental Age is a fixed biological trait like height, and that the ratio IQ formula (MA/CA×100) is the standard.' }
          ],
            remediations: { 'mental-age-is-a-fixed': { steps: ['If the student cannot compute IQ/MA correctly or misinterprets the normal curve: 1.', 'Revisit the ratio formula: write IQ = (MA/CA)×100, label each variable, and practice 5 numerical problems (vary which.', 'Draw the normal curve on paper: mark mean=100, SD=15, shade μ±1σ (68%), μ±2σ (95%), μ±3σ (99.7%).', 'Label the IQ ranges (85–115, 70–130, 55–145).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that Mental Age is a fixed biological trait like height, and that the ratio IQ formula.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "A person with IQ 110 is more intelligent than a person with IQ 109." Use the concepts of measurement error, standard error.', answer: 'The statement is not statistically defensible',
                  options: ['The statement is not statistically defensible', 'yes because 110 > 109', 'above 130 is 5%', 'above 130 is 5%" instead of 2.2%'],
                  hint: 'If stuck on calculations, revisit Class 11 Psychology node c11_psy_cbse_02_009 (Descriptive.',
                  misconception: 'Students often believe that Mental Age is a fixed biological trait like height, and that the ratio IQ formula (MA/CA×100) is the standard.' },
                { id: 'b', prompt: 'Design a short scenario (2-3 sentences) where a teacher uses the ratio IQ formula incorrectly for a 16-year-old student, and explain why deviation IQ would.', answer: 'Scenario: "A 16-year-old scores MA=18 on an intelligence test',
                  options: ['Scenario: "A 16-year-old scores MA=18 on an intelligence test', 'above 130 is 5%', 'above 130 is 5%" instead of 2.2%'],
                  hint: 'If stuck on calculations, revisit Class 11 Psychology node c11_psy_cbse_02_009 (Descriptive.',
                  misconception: 'Students often believe that Mental Age is a fixed biological trait like height, and that the ratio IQ formula (MA/CA×100) is the standard.' }
          ],
            remediations: { 'mental-age-is-a-fixed': { steps: ['If the student cannot compute IQ/MA correctly or misinterprets the normal curve: 1.', 'Revisit the ratio formula: write IQ = (MA/CA)×100, label each variable, and practice 5 numerical problems (vary which.', 'Draw the normal curve on paper: mark mean=100, SD=15, shade μ±1σ (68%), μ±2σ (95%), μ±3σ (99.7%).', 'Label the IQ ranges (85–115, 70–130, 55–145).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_009', difficulty: 'standard',
          question: 'Intellectual disability is a condition characterised by significantly.',
          hint: 'If stuck on IQ calculation or classification, revisit node c12_psy_cbse_01_008 — practice.',
          misconception: '**Misconception:** "Intellectual disability is diagnosed solely by IQ score below 70." **Why students make this.',
          parts: [
                { id: 'a', prompt: 'A 12-year-old child has a mental age of 7 years. Calculate their IQ and state the correct classification label from Table 1.1 of NCERT.', answer: 'IQ = (7/12) × 100 = 58.33 ≈ 58',
                  options: ['IQ = (7/12) × 100 = 58.33 ≈ 58', 'Borderline', 'Moderate', 'Persons having IQs below 70 are judged to have sub-average intelligence'],
                  hint: 'If stuck on IQ calculation or classification, revisit node c12_psy_cbse_01_008 — practice 5.',
                  misconception: '**Misconception:** "Intellectual disability is diagnosed solely by IQ score below 70." **Why students make this error:** The.' },
                { id: 'b', prompt: 'A 9-year-old scores 135 on an individual IQ test. Teachers describe her as "always asking unusual questions, preferring to work alone on complex puzzles for.', answer: 'Yes, she fits the profile',
                  options: ['Yes, she fits the profile', 'she\'s just intelligent, not gifted', '— students stop reading after', 'and miss'],
                  hint: 'If stuck on IQ calculation or classification, revisit node c12_psy_cbse_01_008 — practice 5.',
                  misconception: '**Misconception:** "Intellectual disability is diagnosed solely by IQ score below 70." **Why students make this error:** The.' }
          ],
            remediations: { 'misconception-intellectual-disability-is-diagnos': { steps: ['**Re-read the AAMD definition** in NCERT (page 12): underline the three clauses — (i) significantly sub-average.', '**Create a 3-column table**: Column A = IQ ranges (mild/moderate/severe/profound), Column B = Adaptive behaviour.', '**Practice 3 case vignettes**: (a) IQ 60 + good adaptive skills → No ID; (b) IQ 50 + cannot manage self-care → Moderate.', '**Self-test**: Write the definition from memory including all three criteria.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_010', difficulty: 'standard',
          question: 'Intelligence tests are standardized instruments designed to measure cognitive.',
          hint: 'Revisit c11_psy_cbse_02_007 — focus on the distinction between objective/standardized.',
          misconception: 'Students believe "non-verbal test = culture-fair test" and "individual test = better test." They write in exams: "RPM.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to screen 200 Class 9 students for a giftedness program in a single morning session.', answer: 'Group test administration is most appropriate',
                  options: ['Group test administration is most appropriate', 'non-verbal test = culture-fair test', 'individual test = better test', 'RPM is culture-fair'],
                  hint: 'Revisit c11_psy_cbse_02_007 — focus on the distinction between objective/standardized tests and.',
                  misconception: 'Students believe "non-verbal test = culture-fair test" and "individual test = better test." They write in exams: "RPM is culture-fair.' },
                { id: 'b', prompt: 'Explain why Raven\'s Progressive Matrices (RPM) is classified as a non-verbal test but NOT automatically a culture-fair test.', answer: 'RPM is non-verbal',
                  options: ['RPM is non-verbal', 'non-verbal', 'culture-fair', 'non-verbal test = culture-fair test'],
                  hint: 'Revisit c11_psy_cbse_02_007 — focus on the distinction between objective/standardized tests and.',
                  misconception: 'Students believe "non-verbal test = culture-fair test" and "individual test = better test." They write in exams: "RPM is culture-fair.' },
                { id: 'c', prompt: 'A psychologist must assess the intelligence of a 10-year-old child with hearing impairment who uses sign language.', answer: 'Optimal combination: Individual administration × Performance/Non-verbal format ×',
                  options: ['Optimal combination: Individual administration × Performance/Non-verbal format ×', 'non-verbal test = culture-fair test', 'individual test = better test', 'RPM is culture-fair'],
                  hint: 'Revisit c11_psy_cbse_02_007 — focus on the distinction between objective/standardized tests and.',
                  misconception: 'Students believe "non-verbal test = culture-fair test" and "individual test = better test." They write in exams: "RPM is culture-fair.' },
                { id: 'd', prompt: 'Compare Bhatia\'s Battery of Performance Tests and CIE Verbal Group Test of Intelligence across all three classification dimensions.', answer: '| Dimension | Bhatia\'s Battery | CIE Verbal Group Test |',
                  options: ['| Dimension | Bhatia\'s Battery | CIE Verbal Group Test |', 'verbal', 'individual', 'non-verbal test = culture-fair test'],
                  hint: 'Revisit c11_psy_cbse_02_007 — focus on the distinction between objective/standardized tests and.',
                  misconception: 'Students believe "non-verbal test = culture-fair test" and "individual test = better test." They write in exams: "RPM is culture-fair.' }
          ],
            remediations: { 'non-verbal-test-culture-fair': { steps: ['Have student create a 2×2×2 matrix (Administration × Format × Culture) with 8 cells.', 'Place each Indian test from Table 1.2 (NCERT) into the correct cell.', 'For each cell, write ONE examinee profile that would need that cell\'s test type.', 'Re-attempt Diagnostic Questions 2, 4, 5. If still stuck, revisit c11_psy_cbse_02_007 (Characteristics of a Good Test).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_011', difficulty: 'standard',
          question: 'Culture and intelligence refers to the dynamic interplay where cultural context.',
          hint: 'Revisit c12_psy_cbse_01_003 (definitions) and c12_psy_cbse_01_006 (Sternberg’s contextual.',
          misconception: 'Students often equate "cultural differences in intelligence" with "some cultures are smarter than others".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Culture and intelligence refers to the dynamic interplay where cultural context shapes',
                  options: ['Culture and intelligence refers to the dynamic interplay where cultural context shapes', 'Individual differences refer to the distinctiveness and variability among people in their', 'Assessment of psychological attributes is the systematic, standardized process of', 'Intelligence is a psychological construct defined by Alfred Binet as the ability to judge'],
                  hint: 'Revisit c12_psy_cbse_01_003 (definitions) and c12_psy_cbse_01_006 (Sternberg’s contextual.',
                  misconception: 'Students often equate "cultural differences in intelligence" with "some cultures are smarter than others".' }
          ],
            remediations: { 'students-often-equate-cultural-differences': { steps: ['If a student expresses the above misconception: (1) Ask them to list the four *buddhi* competencies and identify which.', '(2) Have them re-read the NCERT paragraph: "Unlike the western views, which primarily focus on cognitive parameters.', 'Who is more intelligent?" Guide them to see that the question itself is flawed because it imposes one culture’s metric.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_3 to check if they now distinguish test bias from ability difference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_012', difficulty: 'standard',
          question: 'Emotional Intelligence (EI) is the ability to perceive, understand, manage, and.',
          hint: 'Revisit c12_psy_cbse_01_003 (intelligence definitions), c12_psy_cbse_01_005/006.',
          misconception: 'Students equate "Emotional Intelligence" with "being nice/empathetic" or "suppressing emotions".',
          parts: [
                { id: 'a', prompt: 'A student scores 130 on IQ test but produces only conventional solutions on Torrance Tests of Creative Thinking.', answer: 'Threshold hypothesis: IQ and creativity correlate positively up to ~IQ 120',
                  options: ['Threshold hypothesis: IQ and creativity correlate positively up to ~IQ 120', 'high IQ always means high creativity'],
                  hint: 'Revisit c12_psy_cbse_01_003 (intelligence definitions), c12_psy_cbse_01_005/006.',
                  misconception: 'Students equate "Emotional Intelligence" with "being nice/empathetic" or "suppressing emotions".' },
                { id: 'b', prompt: 'Compare the *nature* of items in Intelligence Tests vs Creativity Tests.', answer: 'Intelligence tests: convergent thinking',
                  options: ['Intelligence tests: convergent thinking', 'difficulty level'],
                  hint: 'Revisit c12_psy_cbse_01_003 (intelligence definitions), c12_psy_cbse_01_005/006.',
                  misconception: 'Students equate "Emotional Intelligence" with "being nice/empathetic" or "suppressing emotions".' }
          ],
            remediations: { 'students-equate-emotional-intelligence-with': { steps: ['Re-read NCERT Box 1.2 — highlight each verb: *Perceive, Relate, Understand, Control/Regulate*.', 'Watch 5-min video "Gross Emotion Regulation Model" (reappraisal vs suppression).', 'Write two scenarios: (a) Suppression: "I\'m fine" while trembling; (b) Reappraisal: "This criticism helps me improve."', 'Map to Salovey-Mayer branches: Perceiving (notice tremor), Understanding (criticism → threat to self-esteem), Managing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
