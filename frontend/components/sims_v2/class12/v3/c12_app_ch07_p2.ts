import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch07_p2: SimDef = {
    id: 'v3_c12_app_ch07_p2',
    title: 'Inferential Statistics · Part 2/2',
    subtitle: 'This node covers: definition and interpretation of sampling distribution, Central Limit.',
    classLevel: 12, subject: 'app', topic: 'Inferential Statistics · Part 2/2',
    chapters: ['c12_app_ch07'],
    nodeIds: ['c12_app_cbse_07_007', 'c12_app_cbse_07_008', 'c12_app_cbse_07_009', 'c12_app_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: "A cereal company claims each box contains 500g.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Compare and contrast: "The sampling distribution of the mean approaches normality as $n$ increases" (CLT) vs "The population distribution is normal." Give.',
        options: ['**Correct Answer:** CLT says the *sampling distribution of $\\bar{x}$* becomes', 'CLT makes the population normal', 'we need normal population for CLT'],
        answer: '**Correct Answer:** CLT says the *sampling distribution of $\\bar{x}$* becomes',
        hook: '**Misconception:** "Statistical significance means the result is practically important or large in magnitude." **Why.',
    },
    teaching: [
        { title: 'Statistical Significance and Sampling distribution', text: '**Statistical Significance** is the probability that an observed difference between a sample statistic and a population parameter (or between two sample statistics) is not due to random sampling.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_07_007', title: 'Statistical Significance and Sampling distribution',
          scaffold: { problem: 'A government nutrition survey claims the average daily calorie intake of rural Indian adults is 2100 kcal with a population standard.',
            steps: [
            { text: 'Identify given values: $\\mu = 2100$, $\\sigma = 300$, $n = 64$, $\\bar{x} = 2050$, $\\alpha = 0.05$, one-tailed test.' },
            { text: 'Compute SEM = $\\sigma / \\sqrt{n} = 300 / \\sqrt{64} = 300 / 8 = 37.5$ kcal.' },
            { text: 'Compute z-score = $(\\bar{x} - \\mu) / SEM = (2050 - 2100) / 37.5 = -50 / 37.5 = -1.333$.' },
            { text: 'Find p-value = $P(Z \\le -1.333)$ using standard normal table. $P(Z \\le -1.333) \\approx 0.0912$.' },
            { text: 'Compare p-value (0.0912) with $\\alpha$ (0.05). Since $0.0912 > 0.05$, fail to reject $H_0$.', faded: true, blankAnswer: '(a) SEM = 37.5 kcal. (b) p-value ≈ 0.0912 (9.12%). (c) Not.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_07_008', title: 'Hypothesis',
          caseStudy: { intro: 'Imagine you are a school administrator investigating whether a new after-school tutoring program has changed the average mathematics score of Class 12.',
            decisions: [{ prompt: 'What is the correct symbolic form of the null hypothesis when testing whether the proportion of students who pass the board exam.', options: [
                { text: 'H₀: p = 0.60 A common wrong answer is H₀: p ≠ 0.60', outcome: 'H₀: p = 0.60 A common wrong answer is H₀: p ≠ 0.60, which reveals a misunderstanding that the null.' },
                { text: 'different from', outcome: 'Not quite — Students often believe that the null hypothesis must always be stated as an equality (e.g., H₀: μ.', reveals: 'the-null-hypothesis-must-always' },
                { text: 'the null hypothesis must always be stated as an equality (e', outcome: 'Not quite — Students often believe that the null hypothesis must always be stated as an equality (e.g., H₀: μ.', reveals: 'the-null-hypothesis-must-always' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_07_009', title: 'One sample t- test',
          scaffold: { problem: 'A manufacturer claims their AA batteries last 500 hours on average.',
            steps: [
            { text: 'Identify the parameter and hypotheses. Population mean battery life μ.' },
            { text: 'Compute sample statistics. n = 10. x̄ = (495+502+488+510+492+505+498+501+490+503)/10 = 4984/10 = 498.4 hours.' },
            { text: 'Calculate t-statistic. t = (x̄ - μ₀) / (s/√n) = (498.4 - 500) / (7.07/√10) = -1.6 / 2.23 = -0.717.' },
            { text: 'Find critical value. df = n-1 = 9. α = 0.01 two-tailed → α/2 = 0.005 each tail. From t-table, t₀.₀₀₅,₉ = ±3.250.' },
            { text: 'Decision and conclusion. -0.717 lies between -3.250 and +3.250 → fail to reject H₀.', faded: true, blankAnswer: 'Fail to reject H₀. Insufficient evidence to dispute the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_07_010', title: 'Chapter Summary',
          scaffold: { problem: 'A milk cooperative in Gujarat claims their packet milk contains 3.5% fat on average.',
            steps: [
            { text: 'Identify the parameter of interest (population mean fat content μ) and write hypotheses.' },
            { text: 'Check conditions: n = 20 (< 30), but fat content in milk is approximately normally distributed (biological process).' },
            { text: 'Compute test statistic: t = (x̄ - μ₀) / (s/√n) = (3.32 - 3.5) / (0.21/√20) = -0.18 / 0.04696 = -3.833.' },
            { text: 'Find critical value: For left-tailed test, α = 0.05, df = 19 → t_critical = -1.729 (from t-table).' },
            { text: 'Compare and conclude: -3.833 < -1.729, so reject H₀. There is sufficient evidence at 5% significance level that the.', faded: true, blankAnswer: 'Reject H₀. The sample provides strong evidence (t = -3.83.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'You finished Inferential Statistics — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_07_007', difficulty: 'standard',
          question: '**Statistical Significance** is the probability that an observed difference.',
          hint: 'If stuck on "why does $\\bar{x}$ vary?", review `c12_app_cbse_07_006` Parameter.',
          misconception: '**Misconception:** "Statistical significance means the result is practically important or large in magnitude." **Why.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast: "The sampling distribution of the mean approaches normality as $n$ increases" (CLT) vs "The population distribution is normal." Give.', answer: '**Correct Answer:** CLT says the *sampling distribution of $\\bar{x}$* becomes',
                  options: ['**Correct Answer:** CLT says the *sampling distribution of $\\bar{x}$* becomes', 'CLT makes the population normal', 'we need normal population for CLT'],
                  hint: 'If stuck on "why does $\\bar{x}$ vary?", review `c12_app_cbse_07_006` Parameter vs Statistic table.',
                  misconception: '**Misconception:** "Statistical significance means the result is practically important or large in magnitude." **Why it happens:** The word.' }
          ],
            remediations: { 'misconception-statistical-significance-means-the': { steps: ['**Revisit node `c12_app_cbse_07_006` (Parameter and Statistics)**: Re-read the table distinguishing parameter.', 'Make flashcards: $\\mu$ vs $\\bar{x}$, $\\sigma$ vs $s$, $\\sigma^2$ vs $s^2$.', '**Revisit node `c11_app_cbse_09_003` (Event and its probability)**: Review conditional probability $P(A|B)$ vs $P(B|A)$.', 'Write the p-value definition as $P(\\text{extreme data} \\mid H_0 \\text{ true})$ and say it aloud 5 times.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_07_008', difficulty: 'standard',
          question: 'A hypothesis in inferential statistics is a tentative, declarative statement.',
          hint: 'If stuck, review the distinction between parameters and statistics (Node.',
          misconception: 'Students often believe that the null hypothesis must always be stated as an equality (e.g., H₀: μ = 100) and that the.',
          parts: [
                { id: 'a', prompt: 'What is the correct symbolic form of the null hypothesis when testing whether the proportion of students who pass the board exam is different from 60%?', answer: 'H₀: p = 0.60 A common wrong answer is H₀: p ≠ 0.60',
                  options: ['H₀: p = 0.60 A common wrong answer is H₀: p ≠ 0.60', 'different from', 'the null hypothesis must always be stated as an equality (e'],
                  hint: 'If stuck, review the distinction between parameters and statistics (Node c12_app_cbse_07_005) and.',
                  misconception: 'Students often believe that the null hypothesis must always be stated as an equality (e.g., H₀: μ = 100) and that the alternative.' },
                { id: 'b', prompt: 'In a quality control check, a machine is supposed to fill bottles with exactly 500 mL of juice. A sample is taken to test if the machine is under-filling.', answer: 'H₀: μ = 500 mL, H₁: μ < 500 mL (left-tailed test)',
                  options: ['H₀: μ = 500 mL, H₁: μ < 500 mL (left-tailed test)', 'the hypothesis being tested (under-filling) should be the null', 'the null hypothesis must always be stated as an equality (e'],
                  hint: 'If stuck, review the distinction between parameters and statistics (Node c12_app_cbse_07_005) and.',
                  misconception: 'Students often believe that the null hypothesis must always be stated as an equality (e.g., H₀: μ = 100) and that the alternative.' },
                { id: 'c', prompt: 'Compare and contrast the hypothesis pairs for two scenarios: (A) Testing if a new drug reduces blood pressure (claimed: reduces).', answer: 'For (A): H₀: μ ≥ μ₀ (or μ = μ₀ if equality is assumed), H₁: μ < μ₀ → one-tailed',
                  options: ['For (A): H₀: μ ≥ μ₀ (or μ = μ₀ if equality is assumed), H₁: μ < μ₀ → one-tailed', 'the null hypothesis must always be stated as an equality (e'],
                  hint: 'If stuck, review the distinction between parameters and statistics (Node c12_app_cbse_07_005) and.',
                  misconception: 'Students often believe that the null hypothesis must always be stated as an equality (e.g., H₀: μ = 100) and that the alternative.' }
          ],
            remediations: { 'the-null-hypothesis-must-always': { steps: ['To address this misconception, guide the student through two scenarios: 1.', 'For "Is the mean score less than 75?" → H₀ should be μ ≥ 75 (not μ = 75) because if the mean is actually greater than.', 'For "Is the proportion of defective items different from 2%?" → H₀: p = 0.02, H₁: p ≠ 0.02 (two-tailed).', 'Have the student verbally justify why H₀ must include all values not in H₁.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the null hypothesis must always be stated as an equality (e.g., H₀: μ = 100) and that the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "If we fail to reject the null hypothesis that the mean score of a training program is 70, we have proven that the program.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the null hypothesis must always be stated as an equality (e'],
                  hint: 'If stuck, review the distinction between parameters and statistics (Node c12_app_cbse_07_005) and.',
                  misconception: 'Students often believe that the null hypothesis must always be stated as an equality (e.g., H₀: μ = 100) and that the alternative.' }
          ],
            remediations: { 'the-null-hypothesis-must-always': { steps: ['To address this misconception, guide the student through two scenarios: 1.', 'For "Is the mean score less than 75?" → H₀ should be μ ≥ 75 (not μ = 75) because if the mean is actually greater than.', 'For "Is the proportion of defective items different from 2%?" → H₀: p = 0.02, H₁: p ≠ 0.02 (two-tailed).', 'Have the student verbally justify why H₀ must include all values not in H₁.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_07_009', difficulty: 'standard',
          question: 'The one-sample t-test is a parametric hypothesis test used to determine whether.',
          hint: 'Review hypothesis formulation (c12_app_cbse_07_008) and sampling distribution concepts.',
          misconception: 'Students believe the one-sample t-test requires the **sample data** to be normally distributed.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to test if the average screen time of Class 12 students in Delhi is different from 6 hours/day. She collects data from 16 students.', answer: 'H₀: μ = 6; H₁: μ ≠ 6',
                  options: ['H₀: μ = 6; H₁: μ ≠ 6', 'sampling distribution of x̄', 'distribution of sample data', 'the one-sample t-test requires the **sample data** to be normally distributed'],
                  hint: 'Review hypothesis formulation (c12_app_cbse_07_008) and sampling distribution concepts.',
                  misconception: 'Students believe the one-sample t-test requires the **sample data** to be normally distributed.' },
                { id: 'b', prompt: 'A milk dairy claims their 1L packets contain exactly 1000 mL on average.', answer: 'Step 1: H₀: μ = 1000',
                  options: ['Step 1: H₀: μ = 1000', 'sampling distribution of x̄', 'distribution of sample data', 'the one-sample t-test requires the **sample data** to be normally distributed'],
                  hint: 'Review hypothesis formulation (c12_app_cbse_07_008) and sampling distribution concepts.',
                  misconception: 'Students believe the one-sample t-test requires the **sample data** to be normally distributed.' }
          ],
            remediations: { 'the-one-sample-t-test': { steps: ['If a student makes the above error: (1) Ask them to draw the sampling distribution of x̄ for n=10 from a normal.', '(2) Show that if population is normal, x̄ is exactly normal for any n — no CLT needed.', '(3) Have them re-read NCERT Section 5.3.2: "If the population is roughly normally distributed and the population.', 'Yes/No and why." This targets the exact conceptual gap.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_07_010', difficulty: 'standard',
          question: 'Inferential statistics is the branch of statistics that uses sample data.',
          hint: 'If stuck on t-test calculations, review c12_app_cbse_07_009 (One sample t-test) for the.',
          misconception: 'Students believe "p-value is the probability that the null hypothesis is true." This is FALSE.',
          parts: [
                { id: 'a', prompt: 'Define \'sampling error\' and give its formula. How does it differ from \'non-sampling error\' (like measurement error or non-response bias)?', answer: 'Sampling error = x̄ - μ (sample mean minus population mean)',
                  options: ['Sampling error = x̄ - μ (sample mean minus population mean)', 'sampling error is when you pick a bad sample', 'p-value is the probability that the null hypothesis is true', 'There\'s a 3% chance H₀ is true'],
                  hint: 'If stuck on t-test calculations, review c12_app_cbse_07_009 (One sample t-test) for the 5-step.',
                  misconception: 'Students believe "p-value is the probability that the null hypothesis is true." This is FALSE.' },
                { id: 'b', prompt: 'A researcher wants to test if a new teaching method improves test scores. The current population mean is 75.', answer: 'The colleague is correct',
                  options: ['The colleague is correct', 'p-value is the probability that the null hypothesis is true', 'There\'s a 3% chance H₀ is true', '97% chance H₁ is true'],
                  hint: 'If stuck on t-test calculations, review c12_app_cbse_07_009 (One sample t-test) for the 5-step.',
                  misconception: 'Students believe "p-value is the probability that the null hypothesis is true." This is FALSE.' },
                { id: 'c', prompt: 'A sample of 16 batteries has mean life 480 hours and standard deviation 30 hours. The manufacturer claims the population mean is 500 hours.', answer: 'Step 1: H₀: μ = 500, H₁: μ ≠ 500',
                  options: ['Step 1: H₀: μ = 500, H₁: μ ≠ 500', 'p-value is the probability that the null hypothesis is true', 'There\'s a 3% chance H₀ is true', '97% chance H₁ is true'],
                  hint: 'If stuck on t-test calculations, review c12_app_cbse_07_009 (One sample t-test) for the 5-step.',
                  misconception: 'Students believe "p-value is the probability that the null hypothesis is true." This is FALSE.' },
                { id: 'd', prompt: 'Compare the degrees of freedom formulas for: (a) one-sample t-test, (b) two-sample t-test with equal variances (pooled), (c) two-sample t-test with unequal.', answer: 'one-sample t-test, (',
                  options: ['one-sample t-test, (', 'p-value is the probability that the null hypothesis is true', 'There\'s a 3% chance H₀ is true', '97% chance H₁ is true'],
                  hint: 'If stuck on t-test calculations, review c12_app_cbse_07_009 (One sample t-test) for the 5-step.',
                  misconception: 'Students believe "p-value is the probability that the null hypothesis is true." This is FALSE.' }
          ],
            remediations: { 'p-value-is-the-probability': { steps: ['Revisit c12_app_cbse_07_008 (Hypothesis) and c12_app_cbse_07_009 (One sample t-test) to re-learn the logical structure.', 'Practice writing correct interpretations for 5 different p-values (0.001, 0.02, 0.05, 0.10, 0.50) using the template.', 'Take the diagnostic question 5 again — if you still write "accept H₀" or "proves no difference," go.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
