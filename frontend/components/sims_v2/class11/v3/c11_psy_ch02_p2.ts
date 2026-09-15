import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch02_p2: SimDef = {
    id: 'v3_c11_psy_ch02_p2',
    title: 'Methods of Enquiry in Psychology · Part 2/2',
    subtitle: 'Learn what counts as data when the mind is the subject.',
    classLevel: 11, subject: 'psychology', topic: 'Methods of Enquiry in Psychology · Part 2/2',
    chapters: ['c11_psy_ch02'],
    nodeIds: ['c11_psy_cbse_02_007', 'c11_psy_cbse_02_008', 'c11_psy_cbse_02_009', 'c11_psy_cbse_02_010', 'c11_psy_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a researcher inventorying every signal a study emits', intro: 'A heartbeat trace, a birthday, a warm room — in a psychological study all of it is data, not just the questionnaire.', goal: 'Identify psychological data broadly and weigh ordinal versus interval measurement.' },
    discovery: {
        question: 'Psychological data means IQ scores and questionnaire answers — everything else is just lab noise?',
        options: ['No — demographics, room temperature, heart rate and EEG all count as psychological data inside a study', 'Yes — only mental measurements qualify', 'Yes — data must be self-reported', 'No — but only the EEG counts'],
        answer: 'No — demographics, room temperature, heart rate and EEG all count as psychological data inside a study',
        hook: 'And description isn\'t the unscientific step — a careful, systematic record of behaviour is where prediction and explanation begin.',
    },
    teaching: [
        { title: 'Psychological Tests: Characteristics of a Good Test', text: 'A psychological test is a standardised and objective instrument used to measure an individual\'s standing relative to others on a specific mental or behavioural characteristic (e.g., intelligence.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify a therapist\'s trial — 50 patients, 60% symptom drop — into the goals of psychology, then judge whether rank data is \'more honest\' than scores.',
        labels: ['Psychological Tests: Characteristics', 'Case Study Method: Strengths', 'Analysis of Data: Descriptive', 'Analysis of Data: Inferential', 'Ethical Issues in Psychological'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_007', title: 'Psychological Tests: Characteristics of a Good Test',
          caseStudy: { intro: 'Imagine you are a school counsellor needing to assess whether a Class 11 student\'s anxiety is clinical or situational — you cannot rely on casual observation.',
            decisions: [{ prompt: 'Define "standardisation" in the context of psychological testing and state the two distinct components it comprises according to NCERT.', options: [
                { text: 'Standardisation means the test has (1) uniform procedures for administration, scoring,', outcome: 'Standardisation means the test has (1) uniform procedures for administration, scoring, and.' },
                { text: 'same instructions for everyone', outcome: 'Not quite — Students conflate **reliability** and **validity**, believing "a reliable test is a valid test.".', reveals: 'students-conflate-reliability-and-validity' },
                { text: 'only mentions "norms" misses the procedural uniformity', outcome: 'Not quite — Students conflate **reliability** and **validity**, believing "a reliable test is a valid test.".', reveals: 'students-conflate-reliability-and-validity' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_008', title: 'Case Study Method: Strengths and Limitations',
          caseStudy: { intro: 'Imagine you are a school counsellor trying to understand why a Class 11 student suddenly stopped attending classes, withdrew from friends, and shows signs.',
            decisions: [{ prompt: 'Define the case study method in psychology and name two types of "cases" that can be studied using this method, as per NCERT Class 11.', options: [
                { text: 'The case study method is an in-depth investigation of a single case (individual, small', outcome: 'The case study method is an in-depth investigation of a single case (individual, small group.' },
                { text: 'studying one person', outcome: 'Not quite — Students often believe "case study = just writing a detailed biography of one person." They miss.', reveals: 'case-study-just-writing-a' },
                { text: 'case study = just writing a detailed biography of one person', outcome: 'Not quite — Students often believe "case study = just writing a detailed biography of one person." They miss.', reveals: 'case-study-just-writing-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_02_009', title: 'Analysis of Data: Descriptive Statistics',
          scaffold: { problem: 'A school psychologist records "number of disciplinary referrals per month" for 10 students: 0, 1, 1, 2, 2, 2, 3, 3, 4, 7.',
            steps: [
            { text: 'Organize data — already ordered. n=10 (even).' },
            { text: 'Calculate mean = ΣX/n = (0+1+1+2+2+2+3+3+4+7)/10 = 25/10 = 2.5 referrals.' },
            { text: 'Calculate median = average of 5th and 6th values = (2+2)/2 = 2 referrals.' },
            { text: 'Identify mode = most frequent value = 2 (appears 3 times).' },
            { text: 'Compare: Mean (2.5) > Median (2) = Mode (2) → positive skew due to outlier (7).', faded: true, blankAnswer: 'Mean=2.5, Median=2, Mode=2. Best measure: Median (resistant.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_02_010', title: 'Analysis of Data: Inferential Statistics and Hypothesis Testing',
          scaffold: { problem: 'A researcher tests if mindfulness meditation (Group A, n=20) reduces exam anxiety compared to control (Group B, n=20).',
            steps: [
            { text: 'State hypotheses. H₀: μ_A = μ_B (no difference in population means). H₁: μ_A ≠ μ_B (difference exists).' },
            { text: 'Identify test. Independent samples t-test — two independent groups, interval DV (anxiety score), comparing means.' },
            { text: 'Compute standard error of difference. SE = √[(SD_A²/n_A) + (SD_B²/n_B)] = √[(8²/20) + (10²/20)] = √[64/20 + 100/20].' },
            { text: 'Compute t-statistic. t = (M_A - M_B) / SE = (42 - 48) / 2.86 = -6 / 2.86 ≈ -2.10.' },
            { text: 'Decision. |t| = 2.10 > critical t = 2.02. Reject H₀ at α=0.05. p < 0.05 (exact p ≈ 0.042).' },
            { text: 'Interpretation. Mindfulness group had significantly lower anxiety (M=42) than control (M=48), t(38)=-2.10, p<0.05.', faded: true, blankAnswer: 't(38) = -2.10, p < 0.05. Reject H₀. Mindfulness meditation.' }
            ] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_011', title: 'Ethical Issues in Psychological Research',
          caseStudy: { intro: 'Imagine you\'re asked to join a "memory study" where you\'ll receive mild electric shocks for wrong answers — would you want to know this *before* agreeing?',
            decisions: [{ prompt: 'List the five ethical principles in psychological research as specified in the NCERT Class 11 textbook.', options: [
                { text: 'The five principles are: (1) Voluntary Participation, (2) Informed Consent, (3)', outcome: 'The five principles are: (1) Voluntary Participation, (2) Informed Consent, (3) Debriefing, (4).' },
                { text: 'honesty', outcome: 'Not quite — Students believe "ethical research = getting a signed consent form." They treat informed consent.', reveals: 'ethical-research-getting-a-signed' },
                { text: 'objectivity', outcome: 'Not quite — Students believe "ethical research = getting a signed consent form." They treat informed consent.', reveals: 'ethical-research-getting-a-signed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Designing a study on \'why toppers score high\', a teammate proposes skipping straight to an experiment: \'Description is just diary-keeping, not science. And our data will be test scores — room noise and heart rate aren\'t psychological data.\'',
            decisions: [{ prompt: 'What do the goals and data of enquiry actually require?', options: [
                { text: 'Correct both premises: description IS scientific — it demands operationalised categories, coding schemes and inter-rater reliability before any experiment can run; the enquiry ladder runs describe → predict → explain → control → apply. And data is defined by the investigation: demographic, physical (noise levels as the IV) and physiological (heart rate) measures are psychological data when gathered in a psychological study.', outcome: 'The design matures: systematic description gives the experiment its variables, and the data net widens beyond test scores to context and physiology.' },
                { text: 'Skip description — real science starts with variables and hypotheses, not observation.', outcome: 'Without systematic description you can\'t operationalise what \'studying differently\' even means — description is where the measurable categories come from.', reveals: 'description-isnt-science' },
                { text: 'Restrict data to scores and questionnaires — psychological data is mental data.', outcome: 'Data are defined by the research context: noise level as an independent variable or heart rate as an indicator are psychological data by role, not by content.', reveals: 'only-mental-data-is-psychological' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_02_011', title: 'You made it',
          caseStudy: { intro: 'Ranks say who\'s ahead but not by how much — an interval gap between 1st and 2nd can hide a canyon or a hair\'s breadth.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_007', difficulty: 'standard',
          question: 'A psychological test is a standardised and objective instrument used to measure.',
          hint: 'Revisit c11_psy_cbse_02_005 (Correlational Research) — focus on the meaning.',
          misconception: 'Students conflate **reliability** and **validity**, believing "a reliable test is a valid test." They reason: "If the.',
          parts: [
                { id: 'a', prompt: 'A school uses a group-administered, verbal intelligence test (time limit: 30 minutes) to identify gifted students for an enrichment programme.', answer: 'Three validity threats: (1) **Language bias**',
                  options: ['Three validity threats: (1) **Language bias**', 'unfairness', 'translate the test'],
                  hint: 'Revisit c11_psy_cbse_02_005 (Correlational Research) — focus on the meaning of correlation.',
                  misconception: 'Students conflate **reliability** and **validity**, believing "a reliable test is a valid test." They reason: "If the test gives consistent.' },
                { id: 'b', prompt: 'Compare and contrast test-retest reliability and split-half reliability in terms of: (a) what source of error each addresses, (b) the practical constraints.', answer: 'what source of error each addresses, (',
                  options: ['what source of error each addresses, (', 'both measure the same thing'],
                  hint: 'Revisit c11_psy_cbse_02_005 (Correlational Research) — focus on the meaning of correlation.',
                  misconception: 'Students conflate **reliability** and **validity**, believing "a reliable test is a valid test." They reason: "If the test gives consistent.' }
          ],
            remediations: { 'students-conflate-reliability-and-validity': { steps: ['Use the **elastic ruler analogy** — demonstrate physically or visually: measure a book with a stretched tape measure.', 'Present a **2×2 matrix** on board: High Reliability/High Valid (good test), High Reliability/Low Valid (measures wrong.', 'Give a **mini-case**: "Test A correlates 0.85 with itself over time but 0.10 with teacher creativity ratings.', 'Assign a **retrieval practice** — "Write the definition of validity in your own words without using the word.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_008', difficulty: 'standard',
          question: 'The case study method is an in-depth, qualitative research approach that.',
          hint: 'Revisit c11_psy_cbse_02_001 (Goals of Psychological Enquiry) and create a 2x4 table.',
          misconception: 'Students often believe "case study = just writing a detailed biography of one person." They miss that (1) a case can.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Case studies are useless because you cannot generalize from one person to the whole population." Explain why this statement is.', answer: 'The statement oversimplifies',
                  options: ['The statement oversimplifies', 'case study = just writing a detailed biography of one person', '"case study = just writing a detailed biography of one person'],
                  hint: 'Revisit c11_psy_cbse_02_001 (Goals of Psychological Enquiry) and create a 2x4 table: Methods (rows).',
                  misconception: 'Students often believe "case study = just writing a detailed biography of one person." They miss that (1) a case can be a *group.' },
                { id: 'b', prompt: 'A researcher wants to study the long-term psychological impact of the 2013 Uttarakhand floods on children who lost their families.', answer: 'triangulation, (',
                  options: ['triangulation, (', 'case study = just writing a detailed biography of one person', '"case study = just writing a detailed biography of one person'],
                  hint: 'Revisit c11_psy_cbse_02_001 (Goals of Psychological Enquiry) and create a 2x4 table: Methods (rows).',
                  misconception: 'Students often believe "case study = just writing a detailed biography of one person." They miss that (1) a case can be a *group.' },
                { id: 'c', prompt: 'Compare the case study method and the experimental method on three dimensions: (i) control over extraneous variables, (ii) ability to establish cause-effect.', answer: '(i) Control: Experimental method high (random assignment, lab control)',
                  options: ['(i) Control: Experimental method high (random assignment, lab control)', 'case studies have no control', 'case study = just writing a detailed biography of one person', '"case study = just writing a detailed biography of one person'],
                  hint: 'Revisit c11_psy_cbse_02_001 (Goals of Psychological Enquiry) and create a 2x4 table: Methods (rows).',
                  misconception: 'Students often believe "case study = just writing a detailed biography of one person." They miss that (1) a case can be a *group.' }
          ],
            remediations: { 'case-study-just-writing-a': { steps: ['If a student conflates case study with biography: (1) Show the NCERT examples — Freud (clinical theory building).', 'What *multiple sources* did they use?" (2) Give a 5-minute exercise: "Convert this biography into a case study: \'Rahul.', 'He says he hates math.\' Add: two more data sources, one theoretical question, one triangulation step." (3) Require the.', 'silent learning experiment) and then redesign it as a case study of *one* child\'s learning process — this contrast.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "case study = just writing a detailed biography of one person." They miss that (1) a case can.',
          parts: [
                { id: 'a', prompt: 'Critique this research claim: "A case study of a 16-year-old prodigy who practices piano 6 hours daily proves that deliberate practice alone causes exceptional.', answer: 'Two limitations: (1) *No control over extraneous variables*',
                  options: ['Two limitations: (1) *No control over extraneous variables*', 'case studies can\'t prove causation', 'no causality', 'case study = just writing a detailed biography of one person'],
                  hint: 'Revisit c11_psy_cbse_02_001 (Goals of Psychological Enquiry) and create a 2x4 table: Methods (rows).',
                  misconception: 'Students often believe "case study = just writing a detailed biography of one person." They miss that (1) a case can be a *group.' }
          ],
            remediations: { 'case-study-just-writing-a': { steps: ['If a student conflates case study with biography: (1) Show the NCERT examples — Freud (clinical theory building).', 'What *multiple sources* did they use?" (2) Give a 5-minute exercise: "Convert this biography into a case study: \'Rahul.', 'He says he hates math.\' Add: two more data sources, one theoretical question, one triangulation step." (3) Require the.', 'silent learning experiment) and then redesign it as a case study of *one* child\'s learning process — this contrast.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_009', difficulty: 'standard',
          question: 'Descriptive statistics in psychology refers to the quantitative methods used.',
          hint: 'If stuck, revisit c11_psy_cbse_02_002 (Nature and Types of Psychological Data) to review.',
          misconception: 'Students believe "standard deviation is just the average distance from the mean" and calculate it as Σ|X-M|/n (mean.',
          parts: [
                { id: 'a', prompt: 'In a study on "exam anxiety scores" (measured on a 0-100 scale), the distribution is positively skewed (long tail towards higher anxiety).', answer: 'The median (62) best represents the typical score',
                  options: ['The median (62) best represents the typical score', 'standard deviation is just the average distance from the mean'],
                  hint: 'If stuck, revisit c11_psy_cbse_02_002 (Nature and Types of Psychological Data) to review.',
                  misconception: 'Students believe "standard deviation is just the average distance from the mean" and calculate it as Σ|X-M|/n (mean absolute deviation).' },
                { id: 'b', prompt: 'Two groups of students (Group A: n=15, Group B: n=15) take a creativity test. Group A: Mean=72, SD=8. Group B: Mean=72, SD=18.', answer: 'The conclusion is incorrect',
                  options: ['The conclusion is incorrect', 'standard deviation is just the average distance from the mean'],
                  hint: 'If stuck, revisit c11_psy_cbse_02_002 (Nature and Types of Psychological Data) to review.',
                  misconception: 'Students believe "standard deviation is just the average distance from the mean" and calculate it as Σ|X-M|/n (mean absolute deviation).' },
                { id: 'c', prompt: 'A researcher computes standard deviation for "reaction time in milliseconds" data and gets SD = -4.2 ms.', answer: 'Standard deviation cannot be negative',
                  options: ['Standard deviation cannot be negative', 'SD can be negative if data is below mean', 'standard deviation is just the average distance from the mean'],
                  hint: 'If stuck, revisit c11_psy_cbse_02_002 (Nature and Types of Psychological Data) to review.',
                  misconception: 'Students believe "standard deviation is just the average distance from the mean" and calculate it as Σ|X-M|/n (mean absolute deviation).' }
          ],
            remediations: { 'standard-deviation-is-just-the': { steps: ['If a student computes MAD instead of SD: (1) Have them compute both for a dataset with an outlier (e.g.', '(2) Show SD=5.1 vs MAD=3.0 — SD captures the outlier\'s influence.', '(3) Explain: squaring deviations amplifies large distances, which is desirable because in psychology, extreme scores.', '(4) Practice: "Calculate SD for this anxiety dataset; if you get MAD, you forgot to square deviations."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_010', difficulty: 'standard',
          question: 'Inferential statistics involves using sample data to make generalizations about.',
          hint: 'If stuck, review "Analysis of Data: Descriptive Statistics" (c11_psy_cbse_02_009).',
          misconception: 'Students believe "statistical significance (p < 0.05) means the effect is large, important, or clinically meaningful.".',
          parts: [
                { id: 'a', prompt: 'In a study on gender (Male/Female) and preference for online vs offline therapy (Prefer Online/Prefer Offline), the chi-square test yields χ²(1) = 4.2,.', answer: 'The claim overinterprets correlation as causation',
                  options: ['The claim overinterprets correlation as causation', '"statistical significance (p < 0'],
                  hint: 'If stuck, review "Analysis of Data: Descriptive Statistics" (c11_psy_cbse_02_009) focusing.',
                  misconception: 'Students believe "statistical significance (p < 0.05) means the effect is large, important, or clinically meaningful." They equate p-value.' }
          ],
            remediations: { 'statistical-significance-p-0': { steps: ['Revisit descriptive statistics (c11_psy_cbse_02_009): Compute Cohen\'s d = (M₁-M₂)/SD_pooled for the same data.', 'Show how same p-value can correspond to small/large d.', 'Use online simulator: Fix effect size, vary n — watch p-value change.', 'Fix n, vary effect size — watch p-value change.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_02_011', difficulty: 'standard',
          question: 'Ethical issues in psychological research refer to the moral principles and.',
          hint: 'Review the experimental method (c11_psy_cbse_02_004) for deception/control group ethics.',
          misconception: 'Students believe "ethical research = getting a signed consent form." They treat informed consent as a *one-time event*.',
          parts: [
                { id: 'a', prompt: 'List the five ethical principles in psychological research as specified in the NCERT Class 11 textbook.', answer: 'The five principles are: (1) Voluntary Participation, (2) Informed Consent, (3)',
                  options: ['The five principles are: (1) Voluntary Participation, (2) Informed Consent, (3)', 'honesty', 'objectivity', 'ethical research = getting a signed consent form'],
                  hint: 'Review the experimental method (c11_psy_cbse_02_004) for deception/control group ethics, survey.',
                  misconception: 'Students believe "ethical research = getting a signed consent form." They treat informed consent as a *one-time event* (signing paper).' },
                { id: 'b', prompt: 'A researcher tells participants: "Sign this form agreeing to participate in a study on memory." The form doesn\'t mention that participants will receive false.', answer: 'Informed Consent is violated',
                  options: ['Informed Consent is violated', 'consent was given', 'ethical research = getting a signed consent form', '"ethical research = getting a signed consent form'],
                  hint: 'Review the experimental method (c11_psy_cbse_02_004) for deception/control group ethics, survey.',
                  misconception: 'Students believe "ethical research = getting a signed consent form." They treat informed consent as a *one-time event* (signing paper).' },
                { id: 'c', prompt: 'Dr. Rao wants to study cheating behaviour. She tells Class 11 students it\'s a "problem-solving ability test," leaves the room, and secretly records whether.', answer: 'Violations: (1) Informed Consent',
                  options: ['Violations: (1) Informed Consent', 'ethical research = getting a signed consent form', '"ethical research = getting a signed consent form'],
                  hint: 'Review the experimental method (c11_psy_cbse_02_004) for deception/control group ethics, survey.',
                  misconception: 'Students believe "ethical research = getting a signed consent form." They treat informed consent as a *one-time event* (signing paper).' },
                { id: 'd', prompt: 'Compare the ethical challenges in Milgram\'s (1963) obedience study (deception, psychological stress, no withdrawal) versus a modern online survey on adolescent.', answer: 'Milgram violated all five: deception (fake shocks/learners), no true voluntary',
                  options: ['Milgram violated all five: deception (fake shocks/learners), no true voluntary', 'both violate consent equally', 'ethical research = getting a signed consent form', '"ethical research = getting a signed consent form'],
                  hint: 'Review the experimental method (c11_psy_cbse_02_004) for deception/control group ethics, survey.',
                  misconception: 'Students believe "ethical research = getting a signed consent form." They treat informed consent as a *one-time event* (signing paper).' }
          ],
            remediations: { 'ethical-research-getting-a-signed': { steps: ['Ask the student to define "informed" and "consent" separately in their own words.', 'Present a 2-sentence scenario: "A teacher asks students to participate in her PhD research.', 'Have them rewrite the teacher\'s script to make it ethical.', 'Give 3 mini-scenarios (deception study, survey with identifiable data, case study with sensitive info) — ask them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
