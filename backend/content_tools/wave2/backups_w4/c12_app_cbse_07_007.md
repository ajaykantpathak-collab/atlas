## ELI5
A cereal box promises 500 grams; thirty weighed boxes average 495. Cheating or chance? The sampling distribution draws the yardstick: if the claim were true, sample means would cluster near 500, and 495 sits somewhere on that curve. Far out in the five-percent tail, the result is significant; comfortably central, it is chance. Significance converts the question "is this difference real?" into the answerable "how improbable is this sample if the claim were true?" — and answers it with a tail probability.

## DEFINITION
**Statistical Significance** is the probability that an observed difference between a sample statistic and a population parameter (or between two sample statistics) is not due to random sampling variability, assessed via a p-value compared to a pre-set significance level (α). **Sampling Distribution** is the theoretical probability distribution of a statistic (e.g., sample mean $\bar{x}$) obtained by considering all possible samples of a fixed size $n$ drawn from a specific population.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can: (1) Distinguish between a population parameter and a sample statistic, and explain why the sampling distribution of the mean is approximately normal for $n \ge 30$ (Central Limit Theorem). (2) Define statistical significance in terms of the p-value and significance level $\alpha$, and correctly interpret "reject $H_0$" vs "fail to reject $H_0$" without claiming the null hypothesis is "proven true."

## SCOPE_BOUNDARY
This node covers: definition and interpretation of sampling distribution, Central Limit Theorem (CLT) conditions and implications, Standard Error of Mean (SEM), concept of statistical significance, p-value, significance level $\alpha$, Type I/II error intuition, and degrees of freedom. It does NOT cover hypothesis testing procedures (t-test steps, critical values, calculations) — those are in nodes `c12_app_cbse_07_008` and `c12_app_cbse_07_009`.

## WALKTHROUGH
Start with a relatable scenario: "A cereal company claims each box contains 500g. You buy 30 boxes, weigh them, and get a mean of 495g. Is the company cheating, or is this just natural variation?" Guide students to see that we need a *benchmark* for "how much variation is normal" — that benchmark is the **sampling distribution of the mean**. Introduce the CLT: if we took thousands of samples of 30 boxes, the means would form a normal curve centered at 500g (if the claim is true) with spread $\sigma/\sqrt{n}$. The observed 495g is a point on that curve. **Statistical significance** asks: "How far out in the tail is 495g?" If it's in the extreme 5% (for $\alpha=0.05$), we say the result is significant — the claim is likely false. End with the key insight: *Sampling distribution converts "is this difference real?" into "how probable is this sample mean if the claim were true?"*

Takeaway: mastery means the yardstick built from all possible samples and the tail position read as a verdict. Exam moves: benchmark questions describe the sampling distribution of the mean and its spread; theorem questions state the central limit theorem's role for samples of thirty or more; significance questions read the p-value against the level and word the decision without proving the null true. Method: imagine the thousands of rerun samples first; the observed mean is one point on their curve. Drill: one cereal claim, one tail, one verdict. The question was never "is 495 low?" but "how strange is 495 if 500 is true?" — significance answers only that.

## DIAGNOSTIC_QUESTION_1
Define "sampling distribution of the sample mean" in your own words. How does it differ from the distribution of the population and the distribution of a single sample?

## DIAGNOSTIC_ANSWER_1
**Correct Answer:** The sampling distribution of the sample mean is the theoretical distribution of means calculated from *all possible samples* of a fixed size $n$ drawn from a population. It differs from the population distribution (distribution of individual values) and a single sample distribution (one set of $n$ values) because its units are *means*, its mean equals the population mean $\mu$, and its standard deviation (Standard Error) is $\sigma/\sqrt{n}$, which is smaller than the population SD $\sigma$.  
**What a wrong answer reveals:** If a student describes the distribution of a *single sample* or the *population*, they confuse the *statistic's variability across samples* with *variability within one sample*. This is the most fundamental error — they cannot grasp Standard Error or hypothesis testing without this distinction.

## DIAGNOSTIC_QUESTION_2
A researcher sets $\alpha = 0.01$ instead of $\alpha = 0.05$. Explain in plain language what this change means for: (a) the chance of a Type I error, (b) the difficulty of rejecting $H_0$, and (c) the required strength of evidence.

## DIAGNOSTIC_ANSWER_2
**Correct Answer:** (a) Type I error probability (rejecting a true $H_0$) drops from 5% to 1%. (b) It becomes *harder* to reject $H_0$ because the critical region (rejection zone) shrinks — the test demands more extreme sample evidence. (c) Stronger evidence is needed: the observed sample statistic must be further into the tail of the sampling distribution (smaller p-value) to cross the stricter threshold.  
**What a wrong answer reveals:** If a student says "it makes the test more accurate" or "reduces both errors," they misunderstand the trade-off: lowering $\alpha$ *increases* Type II error (failing to detect a real effect). They are memorizing definitions without grasping the decision-theoretic balance.

## DIAGNOSTIC_QUESTION_3
A population has $\mu = 100$, $\sigma = 15$. You draw a random sample of $n = 36$ and get $\bar{x} = 104$. Calculate the Standard Error of the Mean (SEM). Then compute the z-score of this sample mean *assuming the sampling distribution is normal*. Is this sample mean statistically significant at $\alpha = 0.05$ (two-tailed)? Show work.

## DIAGNOSTIC_ANSWER_3
**Correct Answer:**  
Step 1: $SEM = \sigma/\sqrt{n} = 15/\sqrt{36} = 15/6 = 2.5$  
Step 2: $z = (\bar{x} - \mu) / SEM = (104 - 100) / 2.5 = 1.6$  
Step 3: For two-tailed $\alpha = 0.05$, critical z = $\pm 1.96$. Since $|1.6| < 1.96$, the result is **NOT statistically significant** (p-value $\approx 0.11 > 0.05$).  
**What a wrong answer reveals:** If a student uses $\sigma = 15$ instead of SEM in the denominator, they confuse *individual variability* with *sampling variability* — a classic error. If they compare $z=1.6$ to 1.645 (one-tailed), they miss the two-tailed requirement. Both show procedural mimicry without conceptual grounding.

## DIAGNOSTIC_QUESTION_4
Compare and contrast: "The sampling distribution of the mean approaches normality as $n$ increases" (CLT) vs "The population distribution is normal." Give an example where CLT applies but the population is *not* normal. Why does this matter for hypothesis testing?

## DIAGNOSTIC_ANSWER_4
**Correct Answer:** CLT says the *sampling distribution of $\bar{x}$* becomes approximately normal for large $n$ ($n \ge 30$) *regardless of population shape*. Population normality is a separate assumption about the *raw data*. Example: Income distribution is highly right-skewed (not normal). But for $n=50$, the distribution of sample means is ~normal. This matters because t-tests/z-tests assume the *test statistic* follows a normal/t-distribution; CLT justifies this assumption even for non-normal populations, provided $n$ is large enough.  
**What a wrong answer reveals:** If a student says "CLT makes the population normal" or "we need normal population for CLT," they invert the logic. They will wrongly insist on checking normality of *data* instead of checking sample size, leading to incorrect test choices (e.g., using non-parametric tests unnecessarily).

## DIAGNOSTIC_QUESTION_5
Evaluate this claim: "A p-value of 0.03 means there is a 3% chance the null hypothesis is true." Is this correct? If not, state the correct interpretation and explain why the error is dangerous in scientific reporting.

## DIAGNOSTIC_ANSWER_5
**Correct Answer:** The claim is **incorrect**. A p-value of 0.03 means: *If $H_0$ is true*, the probability of obtaining a test statistic as extreme as (or more extreme than) the observed one is 3%. It is $P(\text{data} \mid H_0)$, not $P(H_0 \mid \text{data})$. The error is dangerous because it overstates evidence against $H_0$; a 3% p-value does *not* mean 97% confidence the alternative is true. It confuses conditional probabilities (prosecutor's fallacy).  
**What a wrong answer reveals:** If a student defends the claim, they commit the *inverse probability fallacy* — the single most pervasive misinterpretation in statistics. They will misread research papers, overstate findings in projects, and lose marks in board exams where precise interpretation is required.

## DIAGNOSTIC_QUESTION_6
Design a mini-simulation (conceptual, not code) to demonstrate the Central Limit Theorem for a highly skewed population (e.g., exponential distribution with mean 10). Specify: (a) population parameters, (b) sample sizes to test, (c) number of samples per size, (d) what you would plot, and (e) what pattern confirms CLT.

## DIAGNOSTIC_ANSWER_6
**Correct Answer:** (a) Population: Exponential($\lambda=0.1$), $\mu=10$, $\sigma=10$, highly right-skewed. (b) Sample sizes: $n = 5, 15, 30, 50$. (c) Draw 1000 samples for each $n$. (d) Plot histograms of the 1000 sample means for each $n$. (e) CLT confirmed if: for $n=5$, histogram is skewed; for $n=15$, less skewed; for $n=30$, approximately bell-shaped; for $n=50$, very close to normal with mean $\approx 10$ and SD $\approx 10/\sqrt{n}$.  
**What a poor answer reveals:** If a student plots *individual sample values* instead of *sample means*, or uses only one sample per size, they confuse the *sampling distribution* (across samples) with a *single sample distribution*. They miss the core idea: CLT is about the *behavior of the statistic across repeated sampling*.

## COMMON_MISCONCEPTION
**Misconception:** "Statistical significance means the result is practically important or large in magnitude."  
**Why it happens:** The word "significant" in everyday English means "important/noteworthy." Students transfer this meaning to the technical term.  
**Concrete error:** A student runs a t-test on a huge sample ($n=10,000$) comparing two teaching methods. Mean scores: Method A = 75.2, Method B = 75.5. p-value = 0.01. The student concludes: "Method B is significantly better, so schools should switch."  
**Why it's wrong:** With huge $n$, even trivial differences (0.3 marks) become "statistically significant" because SEM is tiny. Practical importance requires *effect size* (e.g., Cohen's d) and domain context. Board exams and JEE often test this distinction via case-study questions asking "Is the difference practically meaningful?"

## ON_FAILURE
1. **Revisit node `c12_app_cbse_07_006` (Parameter and Statistics)**: Re-read the table distinguishing parameter (population, Greek letters) vs statistic (sample, English letters). Make flashcards: $\mu$ vs $\bar{x}$, $\sigma$ vs $s$, $\sigma^2$ vs $s^2$.  
2. **Revisit node `c11_app_cbse_09_003` (Event and its probability)**: Review conditional probability $P(A|B)$ vs $P(B|A)$. Write the p-value definition as $P(\text{extreme data} \mid H_0 \text{ true})$ and say it aloud 5 times.  
3. **Re-diagnostic**: Attempt Diagnostic Questions 2 and 5 again. If still wrong, draw the sampling distribution curve, shade the p-value region, and label "Assume $H_0$ true → this tail area = p-value."

## PREREQUISITE_NODE_IDS
c12_app_cbse_07_004, c12_app_cbse_07_005, c12_app_cbse_07_006, c11_app_cbse_09_003, c11_app_cbse_09_004, c11_app_cbse_09_005

## PREREQUISITE_REASONS
c12_app_cbse_07_004: Defines population vs sample — foundation for understanding that statistics vary across samples.
c12_app_cbse_07_005: Introduces statistical inference framework — significance is the core tool of inference.
c12_app_cbse_07_006: Explicitly contrasts parameter (fixed, unknown) vs statistic (variable, known) — essential for sampling distribution logic.
c11_app_cbse_09_003: Probability of an event — p-value is a conditional probability; requires comfort with $P(A|B)$ notation.
c11_app_cbse_09_004: Conditional probability — p-value = $P(\text{data} \mid H_0)$ is a conditional probability; confusion here causes inverse probability fallacy.
c11_app_cbse_09_005: Theorem of Total Probability — underpins the idea of "all possible samples" in sampling distribution construction.

## FORWARD_NODE_IDS
c12_app_cbse_07_008, c12_app_cbse_07_009

## FORWARD_REASONS
c12_app_cbse_07_008: Hypothesis formulation ($H_0$, $H_1$) directly uses the concept of statistical significance; students must understand what "significance" means before learning to set up hypotheses.
c12_app_cbse_07_009: One-sample t-test calculates a t-statistic whose sampling distribution (under $H_0$) is the t-distribution; SEM, degrees of freedom, and p-value interpretation all originate here.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_08_006, c11_app_cbse_08_007, c11_app_cbse_10_001

## CROSS_SUBJECT_REASONS
c11_app_cbse_08_006: Limit of a function — CLT is a limit theorem: the sampling distribution *converges* to normal as $n \to \infty$; calculus intuition helps grasp "approaches but never exactly equals."
c11_app_cbse_08_007: Continuity of a function — normal distribution is continuous; sampling distribution of discrete statistics (e.g., proportion) becomes continuous via CLT, enabling area-under-curve probability calculations.
c11_app_cbse_10_001: Descriptive Statistics (mean, SD, variance) — SEM = $\sigma/\sqrt{n}$ directly uses population SD; sample mean $\bar{x}$ and sample SD $s$ are descriptive statistics that become the inputs for inferential formulas.

## CHAIN_DESCRIPTION
c12_app_cbse_07_006 -> c12_app_cbse_07_007 -> c12_app_cbse_07_008

## THIS_FORMULA
Standard Error of Mean (SEM) = $\frac{\sigma}{\sqrt{n}}$ (when $\sigma$ known) or $\frac{s}{\sqrt{n}}$ (when $\sigma$ unknown, estimated by sample SD $s$)

## FORMULA_VARIABLES
$\sigma$: Population standard deviation (parameter, fixed but usually unknown). $s$: Sample standard deviation (statistic, calculated from data). $n$: Sample size (number of observations in the sample). SEM: Standard Error of the Mean — standard deviation of the sampling distribution of $\bar{x}$.

## FORMULA_UNITS
Same units as the original variable (e.g., if height in cm, SEM in cm). $\sigma$ and $s$ in original units. $n$ is unitless (count).

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c12_phy_cbse_02_001 | Error analysis in physics experiments: SEM quantifies uncertainty in the mean of repeated measurements (e.g., time period of pendulum); "statistical significance" determines if two experimental means differ beyond measurement error.
c12_che_cbse_04_001 | Chemical kinetics: Rate constant $k$ estimated from multiple runs; sampling distribution of $k$ allows confidence intervals; significance tests compare catalysts (two-sample t-test analog).
c12_bio_cbse_07_001 | Genetics/ecology: Allele frequency in a sample estimates population frequency; sampling distribution (binomial $\to$ normal via CLT) used for Hardy-Weinberg equilibrium tests; significance determines if evolution occurred.

## PREREQ_CONCEPT
Distinction between a fixed population parameter and a variable sample statistic; probability as long-run relative frequency (frequentist interpretation).

## PREREQ_BEFORE
Student must fluently distinguish $\mu$ (parameter) from $\bar{x}$ (statistic) and understand that $\bar{x}$ changes from sample to sample — this variability *is* the sampling distribution.

## PREREQ_STUCK
If stuck on "why does $\bar{x}$ vary?", review `c12_app_cbse_07_006` Parameter vs Statistic table and `c11_app_cbse_09_003` probability as long-run frequency — simulate drawing samples mentally.

## WORKED_EXAMPLE_1
PROBLEM: A government nutrition survey claims the average daily calorie intake of rural Indian adults is 2100 kcal with a population standard deviation of 300 kcal. A researcher suspects the true average is lower. She collects a random sample of 64 adults and finds a sample mean of 2050 kcal. (a) What is the Standard Error of the Mean? (b) Assuming the claim is true, what is the probability of getting a sample mean of 2050 kcal or lower? (c) Is this statistically significant at $\alpha = 0.05$ (one-tailed)?  
STEPS:
- Step 1: Identify given values: $\mu = 2100$, $\sigma = 300$, $n = 64$, $\bar{x} = 2050$, $\alpha = 0.05$, one-tailed test (lower tail).
- Step 2: Compute SEM = $\sigma / \sqrt{n} = 300 / \sqrt{64} = 300 / 8 = 37.5$ kcal.
- Step 3: Compute z-score = $(\bar{x} - \mu) / SEM = (2050 - 2100) / 37.5 = -50 / 37.5 = -1.333$.
- Step 4: Find p-value = $P(Z \le -1.333)$ using standard normal table. $P(Z \le -1.333) \approx 0.0912$.
- Step 5: Compare p-value (0.0912) with $\alpha$ (0.05). Since $0.0912 > 0.05$, fail to reject $H_0$. Not statistically significant.
REASONING: The sampling distribution of $\bar{x}$ (if $\mu=2100$) is $N(2100, 37.5^2)$ by CLT ($n=64 \ge 30$). The observed $\bar{x}=2050$ is 1.33 SEM below the claimed mean. The tail probability (p-value) is 9.12%, which exceeds the 5% threshold. We lack sufficient evidence to conclude the true mean is lower.
ANSWER: (a) SEM = 37.5 kcal. (b) p-value ≈ 0.0912 (9.12%). (c) Not statistically significant at $\alpha=0.05$; fail to reject $H_0$.

## WORKED_EXAMPLE_2
PROBLEM: A manufacturer claims their LED bulbs last 25,000 hours on average. A consumer forum tests 25 bulbs and gets a sample mean of 24,200 hours with a sample standard deviation of 1,800 hours. The population SD is unknown. (a) Calculate the Standard Error of the Mean using the sample SD. (b) Explain why we use the t-distribution instead of the normal distribution here. (c) If the t-statistic is -2.22, and the critical t-value for $\alpha=0.05$ (two-tailed, df=24) is $\pm 2.064$, what is the conclusion?  
STEPS:
- Step 1: Given: $\mu_0 = 25000$, $\bar{x} = 24200$, $s = 1800$, $n = 25$, $\sigma$ unknown.
- Step 2: SEM = $s / \sqrt{n} = 1800 / \sqrt{25} = 1800 / 5 = 360$ hours.
- Step 3: Since $\sigma$ is unknown and estimated by $s$, the sampling distribution of the standardized mean follows a t-distribution with $df = n-1 = 24$, not standard normal. The t-distribution has heavier tails, accounting for extra uncertainty from estimating $\sigma$.
- Step 4: Given calculated $t = -2.22$. For two-tailed $\alpha=0.05$, critical values are $\pm 2.064$. Since $-2.22 < -2.064$, the test statistic falls in the rejection region.
- Step 5: Reject $H_0$. There is statistically significant evidence at 5% level that the true mean life differs from 25,000 hours.
REASONING: The t-test is designed for unknown $\sigma$. SEM uses $s$ as a plug-in estimate. The t-distribution corrects for the variability of $s$ itself. The calculated t (-2.22) is more extreme than the critical value (-2.064), so the sample provides sufficient evidence against the claim.
ANSWER: (a) SEM = 360 hours. (b) $\sigma$ unknown → use $s$ → t-distribution with $df=24$. (c) Reject $H_0$; statistically significant difference.

## WORKED_EXAMPLE_3
PROBLEM: (Case-based, combining CLT, SEM, and significance) A pharmaceutical company tests a new drug to reduce systolic blood pressure. The known population mean (placebo) is 140 mmHg with $\sigma = 15$ mmHg. They run a trial with $n = 100$ patients on the drug and observe $\bar{x} = 137$ mmHg. (a) Describe the sampling distribution of $\bar{x}$ if the drug has *no effect* (i.e., $\mu = 140$). (b) Calculate the z-statistic and p-value (two-tailed). (c) The company claims "The drug reduces BP by 3 mmHg — a statistically significant result!" Critique this statement considering both statistical and practical significance. (d) If they repeated the trial with $n = 400$ and got the same $\bar{x} = 137$, how would the p-value change? Explain without calculation.  
STEPS:
- Step 1: Under $H_0$ (no effect), $\mu = 140$. By CLT ($n=100 \ge 30$), sampling distribution of $\bar{x}$ is approximately $N(\mu=140, \sigma_{\bar{x}} = 15/\sqrt{100} = 1.5)$.
- Step 2: $z = (137 - 140) / 1.5 = -3 / 1.5 = -2.0$. Two-tailed p-value = $2 \times P(Z \le -2.0) = 2 \times 0.0228 = 0.0456$.
- Step 3: Statistically significant at $\alpha=0.05$ (p=0.0456 < 0.05). BUT practical significance: 3 mmHg reduction is clinically trivial (guidelines require $\ge 5-10$ mmHg for treatment change). The statement conflates statistical with practical significance.
- Step 4: For $n=400$, SEM = $15/\sqrt{400} = 0.75$ (half of before). Same numerator (3), so $z = -4.0$. p-value becomes tiny ($\approx 0.00006$). Larger $n$ → smaller SEM → larger $|z|$ → smaller p-value. Significance becomes "easier" to achieve, but effect size unchanged.
REASONING: This integrates CLT (justifies normal sampling distribution), SEM calculation, p-value interpretation, and the critical distinction between statistical significance (driven by $n$) and practical importance (driven by effect size). The $n=400$ scenario shows how large samples can make trivial effects "significant."
ANSWER: (a) $N(140, 1.5^2)$. (b) $z = -2.0$, p-value = 0.0456. (c) Statistically significant but practically trivial — misleading claim. (d) p-value decreases dramatically (to ~0.00006) because SEM halves, doubling the z-statistic.

## COMPETENCY_QUESTION_1
QUESTION: A news channel reports: "Exit poll of 2,500 voters shows Candidate A at 52%, Candidate B at 48%. The difference is statistically significant (p < 0.01), so Candidate A will win." As a statistics student, write a 4-point critique of this statement covering: (i) what "statistically significant" actually means here, (ii) why the sample size matters for the p-value, (iii) the difference between statistical and practical significance in elections, and (iv) one non-statistical reason the prediction could still be wrong.  
COMPETENCY: Critical evaluation of statistical claims in media (interpretation, communication, real-world context)  
STEPS:
- Step 1: Define statistical significance in this context: p < 0.01 means if true support were 50-50, probability of seeing a 4% gap or larger by chance is <1%.
- Step 2: Explain large $n=2500$ makes SEM tiny ($ \sqrt{0.5 \times 0.5 / 2500} = 0.01$), so even small observed differences yield small p-values.
- Step 3: Practical significance: 4% gap (52% vs 48%) may not be "decisive" — many elections swing >4% in final days; margin of error $\approx \pm 2\%$ (95% CI).
- Step 4: Non-statistical error: Exit polls suffer from non-response bias (supporters of one candidate may refuse to answer), sampling frame bias (only voters at polled booths), or social desirability bias.
ANSWER: (i) p<0.01 means such a gap is unlikely (<1% chance) if true support were equal — it does NOT mean "Candidate A will win with 99% probability." (ii) Large $n$ shrinks SEM, inflating significance for trivial gaps. (iii) 4% lead is within typical polling error; not practically decisive. (iv) Selection bias (non-random sample of voters) can invalidate inference regardless of p-value.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: (JEE-style application) A quality control engineer monitors the diameter of ball bearings (target $\mu = 10$ mm). The process SD is $\sigma = 0.02$ mm. She takes a sample of $n=16$ bearings every hour and computes $\bar{x}$. If $\bar{x}$ falls outside $\mu \pm 2.5 \times SEM$, she stops the machine. (a) What is the SEM? (b) What are the control limits? (c) If the true mean shifts to 10.03 mm, what is the probability the next sample triggers an alarm? (d) This is a Type I/Type II error trade-off — explain which error the "2.5 SEM" rule controls and which it increases.  
COMPETENCY: Application of sampling distribution to statistical process control (SPC); error trade-off analysis  
STEPS:
- Step 1: SEM = $\sigma/\sqrt{n} = 0.02 / \sqrt{16} = 0.02 / 4 = 0.005$ mm.
- Step 2: Control limits: $10 \pm 2.5 \times 0.005 = 10 \pm 0.0125$ → Lower = 9.9875 mm, Upper = 10.0125 mm.
- Step 3: Under shift $\mu = 10.03$, sampling distribution of $\bar{x} \sim N(10.03, 0.005^2)$. Alarm if $\bar{x} < 9.9875$ or $\bar{x} > 10.0125$. Compute $z_1 = (9.9875 - 10.03)/0.005 = -8.5$, $z_2 = (10.0125 - 10.03)/0.005 = -3.5$. Probability = $P(Z < -8.5) + P(Z > -3.5) \approx 0 + 0.9998 = 0.9998$. (Almost certain to detect).
- Step 4: The "2.5 SEM" rule sets the Type I error rate (false alarm when $\mu=10$): $\alpha = P(|Z| > 2.5) = 2 \times 0.0062 = 0.0124$ (1.24%). It increases Type II error (missing a real shift) if the shift is small — but here the shift (0.03 mm = 6 SEM) is huge, so Type II is near zero.
ANSWER: (a) SEM = 0.005 mm. (b) Control limits: 9.9875 mm to 10.0125 mm. (c) Probability of alarm ≈ 0.9998 (99.98%). (d) Controls Type I error (false alarm) at ~1.24%; increases Type II error for small shifts, but the 0.03 mm shift is easily detected.
DIFFICULTY: hard