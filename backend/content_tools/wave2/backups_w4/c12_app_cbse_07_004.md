## ELI5
Twenty lakh voters, two thousand surveyed — the commission's prediction rests on the smaller number. How the two thousand are picked matters more than how many: booth-side only would miss early voters entirely. Lottery-style random selection and every-kth systematic picks both give every voter a known chance; randomness is the only guard against bias, while sample size merely shrinks the error that remains.

## DEFINITION
A **population** is the complete set of all individuals, objects, or measurements sharing a defined characteristic under study, while a **sample** is a subset of the population selected to estimate population characteristics; the process of selecting this subset is called **sampling**, and a sample is **representative** only if the selection mechanism ensures every population element has a known, non-zero probability of inclusion.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) Distinguish population vs. sample in any real-world scenario and identify the population size (N) and sample size (n); (2) Classify a given sampling method as simple random, systematic random, or non-probability, and justify whether it yields a representative (unbiased) sample; (3) Explain why sampling error exists even in random samples and how it relates to sample size.

## SCOPE_BOUNDARY
This node covers: definitions of population/sample/parameter/statistic, simple random sampling (SRS) and systematic random sampling mechanics, representative vs. unrepresentative (biased) samples, types of bias (voluntary response, undercoverage, convenience, response), sampling error formula and its properties. It does NOT cover: parameter vs. statistic notation details (covered in c12_app_cbse_07_005/006), sampling distributions, Central Limit Theorem, confidence intervals, or hypothesis testing (covered in c12_app_cbse_07_007 onwards).

## WALKTHROUGH
Start with this scenario: *"The Election Commission wants to predict the winner in a constituency with 20 lakh voters. They survey 2,000 voters. Is 2,000 enough? How should they pick these 2,000?"* Guide students to see that "how to pick" matters more than "how many" — if they only survey people near a polling booth, they miss early voters and absentees. Introduce **simple random sampling** (lottery method, random number tables) and **systematic random sampling** (pick a random start, then every k-th person). Have them simulate both with a class roll-number list (N=50, n=10). Key insight: **Randomization is the only guard against selection bias**; sample size only controls sampling error magnitude, not bias.

Takeaway: mastery means the population bounded, the sampling method classified, and bias separated from error. Exam moves: identification questions fix population and sample sizes in a scenario; classification questions label simple random, systematic, or non-probability selection; reasoning questions explain why a random small sample beats a biased big one. Method: simulate the pick on a class list — lottery, then every-kth — and watch the mechanism, not the count. Drill: one constituency, two methods, one biased booth. Selection bias survives any sample size; only randomisation evicts it. Run the two simulations on the class roll before arguing the theory — the lottery and the every-kth walk feel different, and the difference is the entire definition of randomness at work.

## DIAGNOSTIC_QUESTION_1
Define "population" and "sample" in the context of a quality-control engineer checking 500 circuit boards produced in a day by testing 50 boards. State the population size (N) and sample size (n).

## DIAGNOSTIC_ANSWER_1
**Correct answer:** Population = all 500 circuit boards produced that day (N = 500). Sample = the 50 boards selected for testing (n = 50).
**Why wrong answers reveal misunderstanding:** If a student says "population = 50 boards tested," they confuse the subset with the whole. If they say "N = 50, n = 500," they invert the notation. This reveals they don't grasp that the population is the *target of inference*, not the data in hand.

## DIAGNOSTIC_QUESTION_2
A researcher wants to study smartphone usage habits of working professionals in Mumbai. They stand outside a premium tech park at 6 PM on a weekday and interview the first 100 people leaving. Is this a representative sample? Explain using the two conditions for representativeness from the textbook.

## DIAGNOSTIC_ANSWER_2
**Correct answer:** No, it is **not representative**. It fails both conditions: (i) **No random selection** — it uses convenience sampling (only those available at that time/place), so not every professional has an equal chance; (ii) **Systematic undercoverage** — misses professionals who leave early, work remotely, work in non-tech-park offices, or don't work weekdays.
**Why wrong answers reveal misunderstanding:** If a student says "yes, 100 is a large sample," they confuse *sample size* with *representativeness*. If they say "it's random because people leave randomly," they mistake haphazard selection for probability sampling. This reveals the core misconception: **"large ≠ representative" and "haphazard ≠ random."**

## DIAGNOSTIC_QUESTION_3
A school has 1,200 students (roll numbers 1–1200). The principal wants a sample of 60 students using **systematic random sampling**. She randomly picks a starting roll number between 1 and 20, then selects every 20th student thereafter. If the random start is 7, list the first 5 roll numbers in the sample. What is the sampling interval (k)? Why must the start be random?

## DIAGNOSTIC_ANSWER_3
**Correct answer:** Sampling interval k = N/n = 1200/60 = 20. First 5 roll numbers: 7, 27, 47, 67, 87. The start must be random to ensure **every student has an equal probability (1/20) of being selected**; if the start were fixed (e.g., always 1), students with roll numbers 2–20 would have zero chance, introducing bias.
**Why wrong answers reveal misunderstanding:** If a student calculates k = 60/1200 = 0.05, they invert the formula. If they say "start doesn't need to be random, just pick 1," they don't understand that systematic sampling *without random start* is not probability sampling. This reveals confusion between the *mechanics* of systematic sampling and its *probabilistic justification*.

## DIAGNOSTIC_QUESTION_4
Compare **simple random sampling (SRS)** and **systematic random sampling** for a population of 10,000 households listed alphabetically by surname. Which method is more likely to produce a representative sample if household income correlates with surname (e.g., certain surnames cluster in wealthy neighborhoods)? Justify.

## DIAGNOSTIC_ANSWER_4
**Correct answer:** **SRS is more likely to be representative.** Systematic sampling with alphabetical ordering introduces **periodic bias** — if the sampling interval k aligns with the surname-income pattern (e.g., every 50th name is a high-income cluster), the sample will over/under-represent income. SRS has no such structural vulnerability because each of the \( \binom{10000}{n} \) samples is equally likely, breaking any hidden ordering.
**Why wrong answers reveal misunderstanding:** If a student says "systematic is better because it's easier," they prioritize convenience over statistical validity. If they say "both are equally good because both are random," they miss that systematic sampling's randomness is *conditional on the list order* — a subtle but critical distinction for JEE/NEET.

## DIAGNOSTIC_QUESTION_5
A news channel reports: "Our exit poll of 5,000 voters shows Candidate A leading with 52% ± 3% margin of error." A student argues: "Since the sample is large (5,000), the sampling error must be very small, so 52% is almost certainly the true population percentage." Evaluate this claim. Is the student correct? Why or why not?

## DIAGNOSTIC_ANSWER_5
**Correct answer:** The student is **incorrect**. Sampling error = \( \bar{x} - \mu \) has two components: **bias** (systematic deviation due to non-representative sampling) and **random sampling variability** (which decreases with n). A large sample *only* reduces random variability; if the exit poll only surveyed urban voters (bias), the 52% could be far from the true % even with n=5,000. The ±3% margin of error *assumes* a representative (probability) sample.
**Why wrong answers reveal misunderstanding:** If a student agrees, they conflate *precision* (small random error) with *accuracy* (closeness to truth). This is the **"large n fallacy"** — a classic board and JEE trap. They must learn: **Randomization controls bias; sample size controls variance.**

## DIAGNOSTIC_QUESTION_6
Design a sampling plan to estimate the average monthly electricity consumption (in kWh) of all 50,000 households in a mid-sized Indian city. Your plan must: (a) Specify the sampling method (SRS or systematic) and justify your choice; (b) State how you will obtain the sampling frame; (c) Explain how you will handle non-response (households refusing to share bills); (d) Calculate the required sample size if you want a margin of error ≤ 20 kWh at 95% confidence, assuming a pilot study standard deviation of 150 kWh.

## DIAGNOSTIC_ANSWER_6
**Expected criteria for a good answer:**
(a) **Stratified SRS** (by locality/income zone) — better than pure SRS or systematic because electricity use varies sharply by area; stratification ensures all zones are represented. (If only SRS/systematic allowed: choose **SRS** — systematic risks periodicity if bills are sorted by locality.)
(b) **Sampling frame:** Latest municipal property tax database or electricity board consumer list (must cover all 50,000 households).
(c) **Non-response:** (i) 3 callback attempts at different times/days; (ii) Offer small incentive (e.g., ₹50 mobile recharge); (iii) Compare respondents vs. non-respondents on observable traits (locality, housing type) to assess bias; (iv) If bias suspected, use weighting or imputation.
(d) **Sample size:** \( n = \left( \frac{z \cdot \sigma}{E} \right)^2 = \left( \frac{1.96 \times 150}{20} \right)^2 = (14.7)^2 = 216.09 \approx 217 \). Round up to 220 for non-response buffer.
**Why poor answers reveal misunderstanding:** If they ignore stratification, they miss real-world heterogeneity. If they use systematic without checking list order, they risk bias. If they calculate n = (1.96*150/20) but forget to square, they make a basic algebra error. If they say "just increase sample size to fix non-response," they don't understand non-response bias ≠ sampling error.

## COMMON_MISCONCEPTION
**"A large sample automatically makes the sample representative."** Students repeatedly confuse *sample size* (n) with *sampling method*. They think: "If I survey 10,000 people instead of 100, my results must be accurate." **Why this is wrong:** Representativeness depends *only* on the **selection mechanism** (probability sampling), not n. A voluntary online survey with 1 lakh respondents is *less* representative than an SRS of 500 because the former has **self-selection bias** (only motivated/opinionated people respond). The textbook explicitly states: *"The sample size must be large enough to give us a good picture of the variability of the population"* — but **only after** condition (i) *"The sampling process must have a component of random selection"* is met. This error costs marks in board case-study questions and JEE "assertion-reason" questions where they claim "large sample ⇒ unbiased."

## ON_FAILURE
If a student cannot distinguish population vs. sample or thinks large n fixes bias: (1) **Revisit the vaccine example in NCERT (p. 5.4):** "Researchers select a group from each demographic" — ask: *Why not just pick 10,000 random people from one city?* (Answer: demographics = strata; without stratification, the sample won't represent the country.) (2) **Do a physical simulation:** Use a deck of cards (population = 52 cards, parameter = proportion of red cards = 0.5). Draw "convenience sample" (top 10 cards after a bad shuffle) vs. "SRS" (shuffle well, draw 10). Repeat 20 times. Plot sample proportions. Student will see convenience samples cluster away from 0.5 (bias), while SRS samples vary around 0.5 (unbiased but variable). (3) **Re-diagnostic:** Ask Diagnostic Question 2 again with a new scenario (e.g., "Survey diet habits by interviewing people at a gym"). If they still say "representative because n=100," repeat step 2 with a biased deck (remove all hearts first).

## PREREQUISITE_NODE_IDS
c11_app_cbse_09_002, c11_app_cbse_09_003, c11_app_cbse_06_003, c11_app_cbse_06_007, c12_app_cbse_07_001, c12_app_cbse_07_002, c12_app_cbse_07_003

## PREREQUISITE_REASONS
c11_app_cbse_09_002: Understanding "sample space" and "random experiment" is essential to grasp "random selection" in sampling.
c11_app_cbse_09_003: Basic probability (event, P(E)) underpins the "equal chance" requirement in SRS.
c11_app_cbse_06_003: Fundamental counting principle is needed to understand \( \binom{N}{n} \) possible samples in SRS.
c11_app_cbse_06_007: Combinations (\( \binom{N}{n} \)) directly define the number of possible SRS samples.
c12_app_cbse_07_001: Chapter introduction sets the context of inferential statistics — why we need sampling at all.
c12_app_cbse_07_002: Learning outcomes define the exact competencies this node must build.
c12_app_cbse_07_003: "Applied Mathematics" concept map shows how this topic connects to the chapter's big picture.

## FORWARD_NODE_IDS
c12_app_cbse_07_005, c12_app_cbse_07_006, c12_app_cbse_07_007, c12_app_cbse_07_008

## FORWARD_REASONS
c12_app_cbse_07_005: Parameter vs. statistic notation (μ vs. x̄, σ vs. s) requires a clear population/sample distinction from this node.
c12_app_cbse_07_006: Deep dive into parameter/statistic properties builds on the definitions established here.
c12_app_cbse_07_007: Sampling distribution and CLT *assume* the sampling method (SRS) defined here; bias here propagates to invalid sampling distributions.
c12_app_cbse_07_008: Hypothesis testing (H₀: μ = μ₀) uses sample statistics to test population parameters — the population/sample framework is the foundation.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_09_002, c11_app_cbse_09_003, c11_app_cbse_06_003, c11_app_cbse_06_007

## CROSS_SUBJECT_REASONS
c11_app_cbse_09_002: Sample space and random experiment concepts from Class 11 Probability are the mathematical foundation of "random selection" in sampling.
c11_app_cbse_09_003: Probability of an event (P(E)) quantifies the "equal chance" condition in SRS (each sample has probability 1/\( \binom{N}{n} \)).
c11_app_cbse_06_003: Fundamental counting principle explains how we count total possible samples (N × (N-1) × ... for ordered, or \( \binom{N}{n} \) for unordered).
c11_app_cbse_06_007: Combinations formula \( \binom{N}{n} \) is explicitly used in the NCERT definition of SRS: "each of the \( \binom{N}{n} \) samples has an equal chance."

## CHAIN_DESCRIPTION
c11_app_cbse_09_003 -> c12_app_cbse_07_004 -> c12_app_cbse_07_005

## THIS_FORMULA
Sampling Error = \( \bar{x} - \mu \) where \( \bar{x} = \frac{\sum x_i}{n} \) (sample mean), \( \mu = \frac{\sum X_i}{N} \) (population mean)

## FORMULA_VARIABLES
\( \bar{x} \): Sample mean (statistic, computed from sample data); \( \mu \): Population mean (parameter, fixed but usually unknown); \( n \): Sample size; \( N \): Population size; \( x_i \): Individual sample observations; \( X_i \): Individual population observations.

## FORMULA_UNITS
Same units as the variable being measured (e.g., if measuring height in cm, sampling error is in cm; if measuring income in ₹, sampling error is in ₹).

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c12_phy_cbse_02_001 | In Physics (Electrostatics), estimating the average electric field over a volume by sampling at discrete points mirrors statistical sampling — systematic vs. random grid placement affects bias.
c12_chem_cbse_04_001 | In Chemical Kinetics, measuring reaction rate by sampling concentration at time intervals is systematic sampling; if the interval aligns with a periodic side reaction, it introduces bias analogous to periodic bias in systematic sampling.
c12_bio_cbse_06_001 | In Ecology (Class 12 Biology), quadrat sampling for population density uses systematic or random placement — representative sampling is critical for valid biodiversity estimates.

## PREREQ_CONCEPT
Random selection (probability sampling) is the *only* way to guarantee a sample is representative; sample size only controls random error, not bias.

## PREREQ_BEFORE
Student must know: (1) Difference between a set (population) and subset (sample); (2) Basic probability — "equal chance" means P(selected) = 1/N for each unit in SRS; (3) Combination formula \( \binom{N}{n} \) to understand "all possible samples."

## PREREQ_STUCK
If stuck on "why random selection matters," review Class 11 Probability (c11_app_cbse_09_003) — specifically, how P(E) = favorable/total only works if outcomes are equally likely, which *requires* randomization.

## WORKED_EXAMPLE_1
PROBLEM: A pharmaceutical company produces 50,000 vials of a vaccine per batch. They need to estimate the proportion of vials with a specific impurity. They decide to test 200 vials. (a) Identify the population, sample, parameter of interest, and statistic. (b) They have a conveyor belt that outputs vials sequentially. Describe how to implement systematic random sampling to select the 200 vials. (c) What hidden risk exists if the impurity occurs in "clusters" (e.g., every 250th vial due to a machine glitch) and they use systematic sampling with interval k = 250?

STEPS:
- Step 1: Identify population = all 50,000 vials in the batch (N = 50,000); sample = 200 vials selected for testing (n = 200); parameter = true proportion of impure vials in the batch (p); statistic = proportion of impure vials in the 200 tested (p̂).
- Step 2: For systematic sampling, sampling interval k = N/n = 50,000/200 = 250. Randomly select a starting integer r between 1 and 250 (inclusive). Then select vials at positions r, r+250, r+500, ..., r+249×250 on the conveyor belt.
- Step 3: If the machine glitch causes impurity exactly every 250th vial (e.g., positions 250, 500, 750, ...), and if r = 250 (probability 1/250), the sample will include *only* impure vials → p̂ = 1 (massive overestimate). If r ≠ 250, the sample includes *zero* impure vials → p̂ = 0 (massive underestimate). Either way, the sample is **not representative** due to periodic bias.
- Step 4: This shows systematic sampling fails when population has hidden periodicity matching k. SRS would not have this problem because each vial has independent 1/250 chance.
- Step 5: Conclusion: Systematic sampling is efficient but risky if list order correlates with the variable of interest. Always check for patterns or use SRS/stratified sampling when in doubt.

REASONING: This example connects the mechanical steps of systematic sampling (k = N/n, random start) to the core statistical concept of representativeness. The "clustered impurity" scenario is a classic textbook case of periodic bias (NCERT mentions "arranged alphabetically, numerically" — any ordering can hide patterns).

ANSWER: (a) Population: 50,000 vials; Sample: 200 vials; Parameter: p (true impurity proportion); Statistic: p̂ (sample impurity proportion). (b) k = 250; random start r ∈ {1,...,250}; select r, r+250, ..., r+49,750. (c) If impurity occurs exactly every 250th vial, systematic sampling with k=250 will either catch all impurities (p̂=1) or none (p̂=0), giving a catastrophically biased estimate. Probability of this alignment = 1/250.

## WORKED_EXAMPLE_2
PROBLEM: A researcher wants to estimate the average daily screen time (in hours) of Class 12 students in a city with 40,000 students. They propose two plans:
Plan A: Post an online survey link on a popular student forum; first 500 respondents form the sample.
Plan B: Obtain the list of all 40,000 students from the education board, assign each a unique ID 1–40,000, use a random number generator to pick 500 distinct IDs, and survey those students (with 3 follow-ups for non-response).
Compare Plan A and Plan B on: (i) Sampling method type; (ii) Representativeness; (iii) Expected bias; (iv) Sampling error magnitude.

STEPS:
- Step 1: Classify Plan A: **Non-probability sampling (voluntary response / convenience sampling)**. Plan B: **Simple random sampling (SRS)** — probability sampling.
- Step 2: Representativeness: Plan A fails both textbook conditions — no random selection (self-selection), and respondents likely differ systematically (e.g., students with high screen time may be more active on forums). Plan B satisfies both — random selection via RNG, and n=500 is large enough for variability (CLT applies later).
- Step 3: Bias: Plan A has **voluntary response bias** (only motivated students respond) and **undercoverage bias** (students without internet/forum access excluded). Plan B is **unbiased** — every student has P(selected) = 500/40,000 = 1/80. Non-response in Plan B is handled by follow-ups; residual non-response bias is usually small if follow-ups succeed.
- Step 4: Sampling error magnitude: Both have n=500, so *random* sampling error (standard error) is similar: SE ≈ σ/√500. But Plan A has **additional bias error** (systematic deviation) that does not shrink with n. Plan B's total error ≈ random error only.
- Step 5: Verdict: Plan B is scientifically valid; Plan A is anecdotal. Even if Plan A got 5,000 responses, it would still be biased.

REASONING: This contrasts the two fundamental sampling paradigms: probability vs. non-probability. The NCERT explicitly labels voluntary response as biased (p. 5.6). Students must learn that **method > size** — a point emphasized in board case studies and JEE assertion-reason questions.

ANSWER: (i) Plan A: Voluntary response (non-probability); Plan B: SRS (probability). (ii) Plan A: Unrepresentative; Plan B: Representative. (iii) Plan A: High bias (voluntary response + undercoverage); Plan B: Negligible bias (unbiased design). (iv) Random sampling error similar for both (same n), but Plan A has large *systematic* error (bias) that dominates total error.

## WORKED_EXAMPLE_3
PROBLEM: The NCERT defines sampling error as \( \bar{x} - \mu \). A student argues: "If I take a Simple Random Sample, the sampling error will be zero because the sample is representative." Another student says: "Even with SRS, sampling error is rarely zero, but it's unbiased — meaning the *average* sampling error over all possible samples is zero." Who is correct? Explain using the concept of **sampling distribution of the mean** (preview of next node). Then calculate the expected value of sampling error for SRS: E[\( \bar{x} - \mu \)] = ?

STEPS:
- Step 1: Clarify definitions: "Representative" (in NCERT) means the sampling *process* is unbiased, not that a *particular* sample perfectly matches the population. A single SRS will almost always have \( \bar{x} \neq \mu \) → sampling error ≠ 0.
- Step 2: The second student is correct. SRS ensures **unbiasedness**: the expected value of the sample mean equals the population mean, i.e., E[\( \bar{x} \)] = \( \mu \).
- Step 3: Derive E[\( \bar{x} - \mu \)] = E[\( \bar{x} \)] - \( \mu \) (linearity of expectation) = \( \mu - \mu \) = 0.
- Step 4: However, for any *single* sample, \( \bar{x} - \mu \) is a random variable with variance \( \sigma^2/n \) (standard error). The sampling distribution of \( \bar{x} \) is centered at \( \mu \) but has spread — this is why we need confidence intervals later.
- Step 5: Connect to NCERT: "Even randomly selected sample also contains sampling errors because random samples are not identical to the population in terms of numerical measures like means and standard deviations." (p. 5.6)

REASONING: This bridges the current node (sampling error definition) to the next node (sampling distribution, CLT). It corrects the misconception that "unbiased = error-free for every sample." The derivation E[\( \bar{x} \)] = \( \mu \) is the mathematical definition of an unbiased estimator — a concept that reappears in parameter estimation (c12_app_cbse_07_005/006).

ANSWER: The second student is correct. For SRS, E[\( \bar{x} - \mu \)] = 0 (unbiased), but for any single sample, \( \bar{x} - \mu \neq 0 \) typically. Sampling error is a random variable with mean 0 and variance \( \sigma^2/n \). The NCERT explicitly states random samples "are not identical to the population" — sampling error is inevitable; randomization only ensures it averages to zero over repeated sampling.

## COMPETENCY_QUESTION_1
QUESTION: A government agency wants to estimate the unemployment rate in a state with 2 crore working-age adults. They consider three designs:
Design X: Call 10,000 random landline numbers from the telephone directory during weekday mornings.
Design Y: Send surveyors to 100 randomly selected villages/wards; in each, randomly select 100 households and interview all working-age adults.
Design Z: Post a survey on a government website; analyze responses from the first 10,000 visitors.
(a) Classify each design as probability or non-probability sampling. Name the specific method.
(b) Which design is most likely to produce a representative sample? Justify using the two NCERT conditions.
(c) Design X has a larger sample size than Design Y (10,000 vs. 10,000 — same n, but Design Y is clustered). Why might Design Y still be better? (Hint: Think about coverage bias in Design X.)

COMPETENCY: Critical thinking & application of sampling principles to real-world survey design (CBSE Case-Based / JEE Assertion-Reason style)

STEPS:
- Step 1: (a) Design X: Non-probability (systematic exclusion of no-landline/unlisted/unavailable households) — actually **systematic sampling from a flawed frame** (telephone directory), so it's probability sampling *from the frame* but the frame has **undercoverage bias**. Design Y: **Two-stage cluster sampling** (probability) — villages are clusters, then households within clusters. Design Z: **Voluntary response sampling** (non-probability).
- Step 2: (b) Design Y is best. It satisfies: (i) Random selection at both stages (villages, then households); (ii) Large enough n (10,000) and cluster design captures geographic diversity. Design X fails (i) because selection is not from the full population (no landline = zero chance). Design Z fails (i) completely (self-selection).
- Step 3: (c) Design X misses: (1) Households without landlines (growing in India); (2) Households with unlisted numbers; (3) People not home weekday mornings (e.g., employed people!). This is **undercoverage bias** + **non-response bias**. Design Y's cluster approach reaches all household types in selected areas, including those without phones. Even with clustering, Design Y's frame (all households in selected villages) is far more inclusive than Design X's frame (landline directory).

ANSWER: (a) X: Systematic from flawed frame (undercoverage); Y: Two-stage cluster (probability); Z: Voluntary response (non-probability). (b) Design Y — only one with random selection from a comprehensive frame. (c) Design X's sampling frame (telephone directory) systematically excludes segments of the population (no landline, unlisted, daytime workers), causing **coverage bias** that no sample size can fix. Design Y's frame (all households in selected clusters) is inclusive; clustering increases variance slightly but eliminates coverage bias.

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: In a manufacturing plant, 10,000 widgets are produced daily. The quality team uses systematic random sampling to inspect 200 widgets: they randomly pick a start between 1 and 50, then inspect every 50th widget. The production line has a known cyclic defect pattern: a specific machine calibration drift causes defects to spike every 100 widgets (i.e., widgets 100, 200, 300, ... have higher defect probability).
(a) What is the sampling interval k? What are the possible random starts?
(b) If the random start is 50, which widgets are inspected? Will the sample capture the defect spikes?
(c) If the random start is 1, which widgets are inspected? Will the sample capture the defect spikes?
(d) What is the probability that the systematic sample **completely misses** the defect spikes? What is the probability it **over-represents** them (inspects only spike widgets)?
(e) Propose a better sampling design that avoids this periodic bias while keeping n=200.

COMPETENCY: Analytical reasoning — detecting and quantifying periodic bias in systematic sampling (JEE Advanced / Board HOTS style)

STEPS:
- Step 1: (a) k = N/n = 10,000/200 = 50. Random start r ∈ {1, 2, ..., 50} (50 equally likely values).
- Step 2: (b) If r = 50: inspected widgets = 50, 100, 150, 200, ..., 9950. Defect spikes at 100, 200, 300, ... → **every inspected widget from the 2nd onward is a spike widget** (100, 200, 300, ...). The sample massively over-represents defects (p̂ ≈ 1 for spikes).
- Step 3: (c) If r = 1: inspected widgets = 1, 51, 101, 151, ..., 9951. Defect spikes at 100, 200, ... → **no inspected widget is a spike widget** (closest: 101, 201, ...). The sample completely misses defects (p̂ = 0 for spikes).
- Step 4: (d) Defect spikes occur at multiples of 100. Systematic sample with k=50 hits spikes iff r is a multiple of 50 (i.e., r = 50). Since r ∈ {1..50} uniformly: P(over-represent) = P(r=50) = 1/50. P(completely miss) = P(r ≠ 50 and r not such that r + 50m = 100k). Actually, spikes are at 100k. Sample points are r + 50m. For sample to hit a spike: r + 50m = 100k ⇒ r = 100k - 50m = 50(2k - m). So r must be a multiple of 50. Only r=50 in {1..50}. Thus: P(hit spikes) = 1/50 (over-represent); P(miss spikes) = 49/50.
- Step 5: (e) Better design: **Stratified random sampling** — divide 10,000 widgets into 100 strata of 100 consecutive widgets each (each stratum contains exactly one spike position). Randomly select 2 widgets from each stratum (total n=200). This guarantees exactly 2 spike widgets are inspected (representative of the 1% spike rate) and breaks the periodicity. Alternatively: **SRS of 200** — no periodic bias possible.

ANSWER: (a) k=50, r∈{1..50}. (b) r=50 → inspects 50,100,150,... → captures all spikes (over-represents). (c) r=1 → inspects 1,51,101,... → misses all spikes. (d) P(miss spikes)=49/50, P(over-represent)=1/50. (e) Stratified sampling (2 per 100-widget block) or SRS — both eliminate periodic bias.

DIFFICULTY: hard