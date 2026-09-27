import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch07_p1: SimDef = {
    id: 'v3_c12_app_ch07_p1',
    title: 'Inferential Statistics · Part 1/2',
    subtitle: 'This node covers hypothesis testing for population means using one-sample t-tests.',
    classLevel: 12, subject: 'app', topic: 'Inferential Statistics · Part 1/2',
    chapters: ['c12_app_ch07'],
    nodeIds: ['c12_app_cbse_07_001', 'c12_app_cbse_07_002', 'c12_app_cbse_07_003', 'c12_app_cbse_07_004', 'c12_app_cbse_07_005', 'c12_app_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: A school claims its new yoga program reduces average student stress levels.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Explain why we use the t-distribution instead of the normal distribution when conducting a hypothesis test for a population mean with an unknown population.',
        options: ['The t-distribution is used', 'we use t because n<30', 'if the p-value is less than α (e'],
        answer: 'The t-distribution is used',
        hook: 'Students often believe that if the p-value is less than α (e.g., p < 0.05), it proves the alternative hypothesis.',
    },
    teaching: [
        { title: 'Inferential Statistics', text: 'Inferential statistics is the branch of statistics that uses data from a random sample to make inferences, test hypotheses, and estimate population parameters, accounting for sampling variability.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_07_001', title: 'Inferential Statistics',
          scaffold: { problem: 'A wheat farmer claims that the average yield of his new drought-resistant variety is at least 20 quintals per acre.',
            steps: [
            { text: 'State the hypotheses. The farmer claims μ ≥ 20, so the null hypothesis (status quo to challenge) is H₀: μ ≥ 20, and the.' },
            { text: 'Check conditions: Sample size n=25 < 30, population σ unknown (we only have sample data), and yields are approximately.' },
            { text: 'Calculate sample statistics: Sum of yields = 500, so x̄ = 500/25 = 20.0; deviations squared sum to 40, so s².' },
            { text: 'Compute standard error: SE = s / √n = 1.291 / √25 = 1.291 / 5 = 0.2582.' },
            { text: 'Compute t-statistic: t = (x̄ - μ₀) / SE = (20.0 - 20.0) / 0.2582 = 0 / 0.2582 = 0.' },
            { text: 'Determine critical value: For left-tailed test (H₁: μ < 20), α=0.05, df=24 → t-critical = -1.711 (from t-table).' },
            { text: 'Make decision: Since t = 0 > -1.711 (less extreme in left tail), we fail to reject H₀.' },
            { text: 'State conclusion in context: There is not sufficient evidence at the 5% level to conclude that the average yield.', faded: true, blankAnswer: 'Fail to reject H₀; there is not sufficient evidence.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_07_002', title: 'LEARNING OUTCOMES',
          caseStudy: { intro: 'Start with a real question: *"A news channel claims 52% of voters support Party X, with a margin of error of ±3%.',
            decisions: [{ prompt: 'In a study to estimate the average monthly expenditure on online food delivery by college students in Mumbai, a researcher surveys 400.', options: [
                { text: '**Population:** All college students in Mumbai', outcome: '**Population:** All college students in Mumbai. **Sample:** The 400 surveyed students.' },
                { text: 'population', outcome: 'Not quite — **"The sample mean (x̄) equals the population mean (μ) if the sample is random."** Students believe.', reveals: 'the-sample-mean-x-equals' },
                { text: 'The sample mean (x̄) equals the population mean (μ) if the sample is random', outcome: 'Not quite — **"The sample mean (x̄) equals the population mean (μ) if the sample is random."** Students believe.', reveals: 'the-sample-mean-x-equals' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_07_004', title: 'Population and sample',
          scaffold: { problem: 'A pharmaceutical company produces 50,000 vials of a vaccine per batch.',
            steps: [
            { text: 'Identify population = all 50,000 vials in the batch (N = 50,000); sample = 200 vials selected for testing (n = 200).' },
            { text: 'For systematic sampling, sampling interval k = N/n = 50,000/200 = 250.' },
            { text: 'If the machine glitch causes impurity exactly every 250th vial (e.g., positions 250, 500, 750, ...), and if r = 250.' },
            { text: 'This shows systematic sampling fails when population has hidden periodicity matching k.' },
            { text: 'Conclusion: Systematic sampling is efficient but risky if list order correlates with the variable of interest.', faded: true, blankAnswer: '(a) Population: 50,000 vials; Sample: 200 vials; Parameter.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_07_005', title: 'Parameter and Statistics and Statistical Interferences',
          caseStudy: { intro: 'Start with a relatable scenario: "A news channel says \'Candidate A will get 52% votes with a margin of error ±3% at 95% confidence.\' Ask: What does \'52%\'.',
            decisions: [{ prompt: 'In a study to estimate the average monthly electricity consumption (in kWh) of all households in Delhi, a researcher surveys 400 randomly.', options: [
                { text: '**Correct answer:** Parameter = population mean monthly electricity consumption of all', outcome: '**Correct answer:** Parameter = population mean monthly electricity consumption of all Delhi.' },
                { text: 'parameter = 320 kWh', outcome: 'Not quite — **"The sample mean x̄ *is* the population mean µ."** Students see x̄ = 320 kWh in a problem and.', reveals: 'the-sample-mean-x-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_07_006', title: 'Parameter and Statistics',
          scaffold: { problem: 'The Delhi Transport Corporation (DTC) wants to estimate the average daily ridership across all its 3,500 buses.',
            steps: [
            { text: 'Identify the entities. Population = All 3,500 DTC buses. Sample = The 50 randomly selected buses.' },
            { text: 'Compute sample mean x̄. Given Σx = 18,500, n = 50. x̄ = Σx / n = 18,500 / 50 = 370 passengers/bus.' },
            { text: 'Compute sample standard deviation s. Given Σ(x − x̄)² = 45,000.' },
            { text: 'Calculate sampling error. Given μ = 368 (hypothetical true value).' },
            { text: 'Interpret. The sample overestimates the true average by 2 passengers.', faded: true, blankAnswer: '(a) Population: 3,500 DTC buses; Sample: 50 buses.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Inferential Statistics like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Inferential Statistics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Inferential Statistics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_07_001', difficulty: 'standard',
          question: 'Inferential statistics is the branch of statistics that uses data from a random.',
          hint: 'If stuck, review the concept of standard error (s/√n) and how it quantifies the.',
          misconception: 'Students often believe that if the p-value is less than α (e.g., p < 0.05), it proves the alternative hypothesis.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of inferential statistics? A) To calculate the mean and standard deviation of a dataset B) To visualize data using histograms and.', answer: 'C) To make inferences about a population based on sample data',
                  options: ['C) To make inferences about a population based on sample data', 'if the p-value is less than α (e'],
                  hint: 'If stuck, review the concept of standard error (s/√n) and how it quantifies the variability of the.',
                  misconception: 'Students often believe that if the p-value is less than α (e.g., p < 0.05), it proves the alternative hypothesis is true or that there is.' },
                { id: 'b', prompt: 'Explain why we use the t-distribution instead of the normal distribution when conducting a hypothesis test for a population mean with an unknown population.', answer: 'The t-distribution is used',
                  options: ['The t-distribution is used', 'we use t because n<30', 'if the p-value is less than α (e'],
                  hint: 'If stuck, review the concept of standard error (s/√n) and how it quantifies the variability of the.',
                  misconception: 'Students often believe that if the p-value is less than α (e.g., p < 0.05), it proves the alternative hypothesis is true or that there is.' }
          ],
            remediations: { 'if-the-p-value-is': { steps: ['To address this misconception, first ask the student to define p-value in their own words—listen for confusion between.', 'Then, use a concrete analogy: "If a smoke alarm goes off (data), the p-value is like the probability of seeing that.', 'A low p-value means smoke is unlikely without fire, so we suspect fire—but it doesn’t tell us the probability there.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_07_002', difficulty: 'standard',
          question: 'Inferential Statistics is the branch of statistics that uses data from.',
          hint: 'Review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for x̄ and s calculations.',
          misconception: '**"The sample mean (x̄) equals the population mean (μ) if the sample is random."** Students believe randomness.',
          parts: [
                { id: 'a', prompt: 'In a study to estimate the average monthly expenditure on online food delivery by college students in Mumbai, a researcher surveys 400 students.', answer: '**Population:** All college students in Mumbai',
                  options: ['**Population:** All college students in Mumbai', 'population', 'The sample mean (x̄) equals the population mean (μ) if the sample is random', 'x̄ = μ'],
                  hint: 'Review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for x̄ and s calculations, and.',
                  misconception: '**"The sample mean (x̄) equals the population mean (μ) if the sample is random."** Students believe randomness *guarantees* accuracy for.' },
                { id: 'b', prompt: 'Explain in your own words why the Central Limit Theorem (CLT) is the "bridge" that allows us to use a sample statistic to make probabilistic statements about.', answer: 'The CLT states that for sufficiently large sample sizes (n ≥ 30), the **sampling',
                  options: ['The CLT states that for sufficiently large sample sizes (n ≥ 30), the **sampling', 'CLT makes the sample data normal', 'The sample mean (x̄) equals the population mean (μ) if the sample is random', 'x̄ = μ'],
                  hint: 'Review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for x̄ and s calculations, and.',
                  misconception: '**"The sample mean (x̄) equals the population mean (μ) if the sample is random."** Students believe randomness *guarantees* accuracy for.' },
                { id: 'c', prompt: 'A pharmaceutical company claims their new drug reduces systolic blood pressure by at least 10 mmHg on average.', answer: '**H₀: μ ≥ 10** (the claim is true or better) **H₁: μ < 10** (the claim is false;',
                  options: ['**H₀: μ ≥ 10** (the claim is true or better) **H₁: μ < 10** (the claim is false;', 'not equal', 'at least', 'The sample mean (x̄) equals the population mean (μ) if the sample is random'],
                  hint: 'Review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for x̄ and s calculations, and.',
                  misconception: '**"The sample mean (x̄) equals the population mean (μ) if the sample is random."** Students believe randomness *guarantees* accuracy for.' },
                { id: 'd', prompt: 'Two researchers study the same population. Researcher A uses a sample of size 30; Researcher B uses a sample of size 300.', answer: 'Researcher B\'s interval will be **narrower**',
                  options: ['Researcher B\'s interval will be **narrower**', 'wider because more data', 'The sample mean (x̄) equals the population mean (μ) if the sample is random', 'x̄ = μ'],
                  hint: 'Review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for x̄ and s calculations, and.',
                  misconception: '**"The sample mean (x̄) equals the population mean (μ) if the sample is random."** Students believe randomness *guarantees* accuracy for.' }
          ],
            remediations: { 'the-sample-mean-x-equals': { steps: ['If a student holds this misconception: 1.', '**Revisit the definition of Sampling Error** (c12_app_cbse_07_004): Show the formula `Sampling error = x̄ − μ` and.', '**Simulate mentally**: "Imagine 100 random samples of size 30 from the same population.', 'No — they form a distribution *centered* at μ." 3.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"The sample mean (x̄) equals the population mean (μ) if the sample is random."** Students believe randomness.',
          parts: [
                { id: 'a', prompt: 'A student reads: "The 95% confidence interval for the mean height of Indian men is (165 cm, 175 cm)." They conclude: "There is a 95% probability that the true.', answer: '**Incorrect interpretation.** The true population mean (μ) is a **fixed, unknown',
                  options: ['**Incorrect interpretation.** The true population mean (μ) is a **fixed, unknown', 'The sample mean (x̄) equals the population mean (μ) if the sample is random', 'x̄ = μ', 'randomness *guarantees* accuracy for a single sample'],
                  hint: 'Review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for x̄ and s calculations, and.',
                  misconception: '**"The sample mean (x̄) equals the population mean (μ) if the sample is random."** Students believe randomness *guarantees* accuracy for.' },
                { id: 'b', prompt: 'Design a real-world scenario (Indian context) where a **Type I error** would be far more costly than a **Type II error**.', answer: '**Scenario:** A new diabetes drug is tested for approval',
                  options: ['**Scenario:** A new diabetes drug is tested for approval', 'The sample mean (x̄) equals the population mean (μ) if the sample is random', 'x̄ = μ', 'randomness *guarantees* accuracy for a single sample'],
                  hint: 'Review Class 11 Descriptive Statistics (c11_app_cbse_10_001) for x̄ and s calculations, and.',
                  misconception: '**"The sample mean (x̄) equals the population mean (μ) if the sample is random."** Students believe randomness *guarantees* accuracy for.' }
          ],
            remediations: { 'the-sample-mean-x-equals': { steps: ['If a student holds this misconception: 1.', '**Revisit the definition of Sampling Error** (c12_app_cbse_07_004): Show the formula `Sampling error = x̄ − μ` and.', '**Simulate mentally**: "Imagine 100 random samples of size 30 from the same population.', 'No — they form a distribution *centered* at μ." 3.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_07_003', difficulty: 'standard',
          question: 'Inferential Statistics is the branch of statistics that uses data from a random.',
          hint: 'If stuck on "Why does the sampling distribution matter?", revisit **c12_app_cbse_07_007.',
          misconception: '**"P-value is the probability that the Null Hypothesis is true."** This is the single most pervasive error in Class 12.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Inferential Statistics is the branch of statistics that uses data from a random sample to',
                  options: ['Inferential Statistics is the branch of statistics that uses data from a random sample to', 'Inferential Statistics is the branch of statistics that uses data from a **sample** to', 'A **population** is the complete set of all individuals, objects, or measurements sharing', 'A **parameter** is a fixed numerical characteristic of an entire population (e.g.,'],
                  hint: 'If stuck on "Why does the sampling distribution matter?", revisit **c12_app_cbse_07_007 (Sampling.',
                  misconception: '**"P-value is the probability that the Null Hypothesis is true."** This is the single most pervasive error in Class 12 and competitive.' }
          ],
            remediations: { 'p-value-is-the-probability': { steps: ['**Revisit the definition of Probability (c11_app_cbse_09_003)**: Ensure the student understands the difference between.', '**Re-read Sampling Distribution (c12_app_cbse_07_007)**: Explicitly contrast "Distribution of X" (population).', '**Do the "P-value Courtroom Analogy" activity**: H₀ = "Defendant is innocent".', 'p-value = "Probability of seeing this evidence (or worse) *if* defendant is truly innocent." Low p = "Evidence.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_07_004', difficulty: 'standard',
          question: 'A **population** is the complete set of all individuals, objects,.',
          hint: 'If stuck on "why random selection matters," review Class 11 Probability.',
          misconception: '**"A large sample automatically makes the sample representative."** Students repeatedly confuse *sample size* (n) with.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to study smartphone usage habits of working professionals in Mumbai.', answer: '**Correct answer:** No, it is **not representative**',
                  options: ['**Correct answer:** No, it is **not representative**', 'yes, 100 is a large sample', 'A large sample automatically makes the sample representative'],
                  hint: 'If stuck on "why random selection matters," review Class 11 Probability (c11_app_cbse_09_003).',
                  misconception: '**"A large sample automatically makes the sample representative."** Students repeatedly confuse *sample size* (n) with *sampling method*.' },
                { id: 'b', prompt: 'A school has 1,200 students (roll numbers 1–1200). The principal wants a sample of 60 students using **systematic random sampling**.', answer: '**Correct answer:** Sampling interval k = N/n = 1200/60 = 20',
                  options: ['**Correct answer:** Sampling interval k = N/n = 1200/60 = 20', 'A large sample automatically makes the sample representative'],
                  hint: 'If stuck on "why random selection matters," review Class 11 Probability (c11_app_cbse_09_003).',
                  misconception: '**"A large sample automatically makes the sample representative."** Students repeatedly confuse *sample size* (n) with *sampling method*.' }
          ],
            remediations: { 'a-large-sample-automatically-makes': { steps: ['If a student cannot distinguish population vs.', 'sample or thinks large n fixes bias: (1) **Revisit the vaccine example in NCERT (p.', '5.4):** "Researchers select a group from each demographic" — ask: *Why not just pick 10,000 random people from one.', 'Draw "convenience sample" (top 10 cards after a bad shuffle) vs.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_07_005', difficulty: 'standard',
          question: 'A **parameter** is a fixed numerical characteristic of an entire population.',
          hint: 'If unclear on population vs. sample, review c12_app_cbse_07_004 (Population and sample).',
          misconception: '**"The sample mean x̄ *is* the population mean µ."** Students see x̄ = 320 kWh in a problem and write "µ = 320 kWh".',
          parts: [
                { id: 'a', prompt: 'A pharmaceutical company tests a new drug on a random sample of 50 patients and computes a 95% confidence interval for the mean reduction in blood pressure.', answer: '**Correct answer:** The company\'s claim is **incorrect**',
                  options: ['**Correct answer:** The company\'s claim is **incorrect**', '** **Why a wrong answer reveals misunderstanding:** If the student says'],
                  hint: 'If unclear on population vs. sample, review c12_app_cbse_07_004 (Population and sample) — focus.',
                  misconception: '**"The sample mean x̄ *is* the population mean µ."** Students see x̄ = 320 kWh in a problem and write "µ = 320 kWh" in the next line.' },
                { id: 'b', prompt: 'Two researchers estimate the average screen time of teenagers in Mumbai. Researcher A takes a simple random sample of 100 teens.', answer: '**Correct answer:** Researcher A\'s x̄ comes from a **probability sample**',
                  options: ['**Correct answer:** Researcher A\'s x̄ comes from a **probability sample**', 'both are equally good', 'sample size alone guarantees good inference'],
                  hint: 'If unclear on population vs. sample, review c12_app_cbse_07_004 (Population and sample) — focus.',
                  misconception: '**"The sample mean x̄ *is* the population mean µ."** Students see x̄ = 320 kWh in a problem and write "µ = 320 kWh" in the next line.' }
          ],
            remediations: { 'the-sample-mean-x-is': { steps: ['**Revisit the parameter vs.', 'statistic distinction** using c12_app_cbse_07_004 (Population and sample) — physically write 5 real examples (e.g.', '"proportion in exit poll") and label each with µ/p (parameter) and x̄/p̂ (statistic).', '**Simulate sampling distribution mentally**: Imagine taking 100 different samples of n=50 from a skewed population.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_07_006', difficulty: 'standard',
          question: 'A **parameter** is a fixed numerical characteristic of an entire population.',
          hint: 'If stuck, review c12_app_cbse_07_004 (Population and Sample) — practice identifying.',
          misconception: '**The "Sample Statistic = Population Parameter" Fallacy:** Students often treat the sample mean (x̄) or sample.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to know the average screen time of all teenagers in Mumbai.', answer: '**Correct Answer:** Population = All teenagers in Mumbai',
                  options: ['**Correct Answer:** Population = All teenagers in Mumbai', 'parameter'],
                  hint: 'If stuck, review c12_app_cbse_07_004 (Population and Sample) — practice identifying.',
                  misconception: '**The "Sample Statistic = Population Parameter" Fallacy:** Students often treat the sample mean (x̄) or sample proportion (p̂) as *the*.' }
          ],
            remediations: { 'the-sample-statistic-population-parameter': { steps: ['**Revisit Notation Drill:** Make a two-column table: Left = Parameter (Greek: μ, σ, σ², p, ρ); Right = Statistic.', 'Write the *definition* of each pair in your own words.', '**Concrete-Representational-Abstract:** Draw 3 different samples (dots on a number line) from the same population.', '**Re-diagnostic:** Ask the student: "If I take 100 samples of size 30, how many values of μ exist?'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
