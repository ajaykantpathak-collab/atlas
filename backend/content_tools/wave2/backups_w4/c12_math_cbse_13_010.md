## ELI5
A true-false test of ten questions answered by pure guessing is Bernoulli territory in its purest form: each question is a trial with exactly two outcomes, a constant half chance of success, independence throughout, and a fixed trial count fixed in advance. The binomial formula counts the routes - ten choose six sequences - each route carrying p to the sixth times q to the fourth. Mean np, variance npq summarise the guesser's fate.

## DEFINITION
A Bernoulli trial is a random experiment with exactly two possible outcomes — "success" (with probability \(p\)) and "failure" (with probability \(q = 1-p\)) — where the probability of success remains constant across trials, trials are independent, and the number of trials \(n\) is fixed in advance. The binomial distribution gives the probability of exactly \(k\) successes in \(n\) Bernoulli trials: \(P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}\) for \(k = 0, 1, \dots, n\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) verify whether a given real-world scenario satisfies the four conditions of Bernoulli trials, (2) compute binomial probabilities using the formula \(P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}\) with correct identification of \(n\), \(p\), and \(k\), and (3) calculate the mean \(np\) and variance \(np(1-p)\) of a binomial distribution and interpret them in context.

## SCOPE_BOUNDARY
This node covers the definition and verification of Bernoulli trials, the derivation of the binomial probability formula from first principles, computation of probabilities for "exactly \(k\)", "at most \(k\)", and "at least \(k\)" successes, and the mean/variance formulas. It does NOT cover Poisson approximation to binomial, normal approximation to binomial, or hypothesis testing using binomial distribution — these are beyond the Class 12 NCERT scope.

## WALKTHROUGH
Imagine a student answering a 10-question true/false test by pure guessing. Each question has two outcomes (correct/incorrect), the probability of a correct guess is fixed at \(1/2\), questions are independent, and there are exactly 10 questions — this is a perfect Bernoulli trial setup. Start by writing down the four conditions: fixed number of trials (\(n\)), two outcomes per trial, constant success probability (\(p\)), and independence. Then identify \(n=10\), \(p=0.5\). To find the probability of exactly 6 correct answers, use \(\binom{10}{6}(0.5)^6(0.5)^4\). The key insight: every sequence with 6 successes and 4 failures has the same probability \(p^6(1-p)^4\), and there are \(\binom{10}{6}\) such sequences — that is where the binomial coefficient comes from.

Takeaway first: Bernoulli trials are the binomial distribution's atoms - two outcomes, constant p, independence, fixed n - and the formula is arrangement-count times arrangement-probability. Exam moves: verification questions against the four conditions, computation questions identifying n, p and k, and summary questions on mean and variance in context. Method: rerun the guessing test - conditions checked in order, the six-successes probability assembled from coefficient and powers. Check yourself: drawing names from a hat without replacement breaks independence trial by trial, and no binomial formula may be applied until the conditions are re-established. Drill: verify one scenario's Bernoulli credentials, compute one exact probability, and state its mean and variance.

## DIAGNOSTIC_QUESTION_1
State the four necessary and sufficient conditions for a random experiment to be modelled as a sequence of Bernoulli trials.

## DIAGNOSTIC_ANSWER_1
The four conditions are: (1) fixed finite number of trials \(n\); (2) each trial has exactly two outcomes (success/failure); (3) probability of success \(p\) is the same for every trial; (4) trials are independent. A wrong answer typically omits condition (3) or (4) — students often forget that \(p\) must not change from trial to trial (e.g., drawing without replacement violates this) or that independence is required (e.g., consecutive coin tosses are independent but drawing cards without replacement is not).

## DIAGNOSTIC_QUESTION_2
A bag contains 5 red and 3 blue balls. Four balls are drawn one by one *with replacement*. Let \(X\) be the number of red balls drawn. Is \(X\) a binomial random variable? Justify your answer by checking each Bernoulli condition.

## DIAGNOSTIC_ANSWER_2
Yes, \(X \sim \text{Binomial}(n=4, p=5/8)\). With replacement ensures: (1) fixed \(n=4\); (2) two outcomes (red = success, blue = failure); (3) \(p = 5/8\) stays constant because the bag composition is restored after each draw; (4) draws are independent because replacement restores the original state. A common wrong answer says "no" because students confuse this with drawing *without* replacement, where \(p\) changes and trials become dependent — that would be a hypergeometric setting, not binomial.

## DIAGNOSTIC_QUESTION_3
A fair die is rolled 8 times. Find the probability that the face '5' appears exactly 3 times. Show all steps including the binomial coefficient calculation.

## DIAGNOSTIC_ANSWER_3
\(n=8\), \(p=1/6\), \(q=5/6\), \(k=3\).  
\(P(X=3) = \binom{8}{3} \left(\frac{1}{6}\right)^3 \left(\frac{5}{6}\right)^5\)  
\(\binom{8}{3} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56\)  
\(\left(\frac{1}{6}\right)^3 = \frac{1}{216}\), \(\left(\frac{5}{6}\right)^5 = \frac{3125}{7776}\)  
\(P(X=3) = 56 \times \frac{1}{216} \times \frac{3125}{7776} = \frac{56 \times 3125}{216 \times 7776} = \frac{175000}{1679616} = \frac{21875}{209952} \approx 0.1042\)  
A wrong answer often miscalculates \(\binom{8}{3}\) as \(8 \times 7 \times 6 = 336\) (forgetting to divide by \(3!\)) or uses \(p=1/2\) by incorrectly treating "5" vs "not 5" as equally likely.

## DIAGNOSTIC_QUESTION_4
In a binomial distribution with \(n=10\), the probability of exactly 4 successes equals the probability of exactly 6 successes. Find \(p\) and explain why this symmetry occurs.

## DIAGNOSTIC_ANSWER_4
\(P(X=4) = \binom{10}{4} p^4 (1-p)^6\), \(P(X=6) = \binom{10}{6} p^6 (1-p)^4\).  
Since \(\binom{10}{4} = \binom{10}{6}\), equating gives \(p^4(1-p)^6 = p^6(1-p)^4 \Rightarrow (1-p)^2 = p^2 \Rightarrow 1-p = p \Rightarrow p = 1/2\).  
Symmetry occurs because when \(p=1/2\), success and failure are interchangeable — the distribution is symmetric about \(n/2\). A wrong answer sets \(p=0.5\) without derivation or claims symmetry for any \(p\) because \(\binom{n}{k}=\binom{n}{n-k}\), ignoring that \(p^k(1-p)^{n-k}\) must also match.

## DIAGNOSTIC_QUESTION_5
A student claims: "For a binomial distribution with \(n=20\) and \(p=0.3\), the most likely number of successes is 6 because \(np = 6\)." Evaluate this claim. Is it always true that the mode equals \(np\)? Provide a counterexample if false.

## DIAGNOSTIC_ANSWER_5
The claim is **false** in general. For binomial, the mode is \(\lfloor (n+1)p \rfloor\) (or both \(\lfloor (n+1)p \rfloor\) and \(\lfloor (n+1)p \rfloor - 1\) if \((n+1)p\) is an integer). Here \((n+1)p = 21 \times 0.3 = 6.3\), so mode = 6 — it happens to match \(np=6\) but not because \(np\) is the mode. Counterexample: \(n=5, p=0.5 \Rightarrow np=2.5\) but mode = 3 (since \((n+1)p = 3\) is integer, modes are 3 and 2). A wrong answer confuses mean with mode; the mean is \(np\) but the mode is the value maximising \(P(X=k)\), which differs when \(np\) is not an integer or when \((n+1)p\) is integer.

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem from Indian context (e.g., manufacturing, agriculture, examinations) that can be modelled as a binomial experiment with \(n=12\) and \(p=0.25\). State the random variable, write the probability mass function, and formulate a question asking for "at least 3 successes".

## DIAGNOSTIC_ANSWER_6
Example: A fertilizer company produces bags where 25% have a minor packaging defect. A quality inspector randomly selects 12 bags from a large batch. Let \(X\) = number of defective bags in the sample. Then \(X \sim \text{Binomial}(n=12, p=0.25)\). PMF: \(P(X=k) = \binom{12}{k} (0.25)^k (0.75)^{12-k}\) for \(k=0,1,\dots,12\). Question: "Find the probability that at least 3 bags have defects."  
A poor answer uses \(p=0.75\) (confusing success/failure), sets \(n\) incorrectly (e.g., total batch size instead of sample size), or asks for "exactly 3" instead of "at least 3", showing misunderstanding of cumulative probability.

## COMMON_MISCONCEPTION
Students incorrectly apply the binomial formula to sampling **without replacement** from a finite population. For example: "A box has 20 bulbs, 4 defective. 5 bulbs are drawn without replacement. Find probability of exactly 2 defectives." They compute \(\binom{5}{2}(0.2)^2(0.8)^3\) using \(p=4/20=0.2\). This is wrong because after each draw, the proportion of defectives changes (trials are not independent, \(p\) is not constant). The correct model is hypergeometric: \(\frac{\binom{4}{2}\binom{16}{3}}{\binom{20}{5}}\). The error stems from ignoring the "constant \(p\)" and "independence" conditions — replacement is essential for binomial.

## ON_FAILURE
If a student uses binomial for without-replacement problems:  
1. Ask them to list the four Bernoulli conditions and check each for the problem.  
2. Explicitly track how the composition changes: after drawing 1 defective, the box has 3 defectives out of 19, so \(p\) becomes \(3/19 \neq 4/20\).  
3. Show the tree diagram for the first two draws to visualize dependence.  
4. Introduce the hypergeometric formula as the correct tool, then give a similar problem *with* replacement to contrast.  
5. Re-diagnostic: "A lot of 100 pens has 10 defectives. 5 pens are drawn *with* replacement. Find probability of exactly 2 defectives." Verify they now use binomial correctly.

## PREREQUISITE_NODE_IDS
c12_math_cbse_13_007, c12_math_cbse_13_008, c12_math_cbse_13_009, c11_math_cbse_07_007, c11_math_cbse_08_002, c12_math_cbse_13_004, c12_math_cbse_13_005

## PREREQUISITE_REASONS
c12_math_cbse_13_007: Random variables and probability distributions provide the framework for defining \(X\) as a binomial random variable.  
c12_math_cbse_13_008: Mean and variance formulas \(np\) and \(np(1-p)\) are derived using properties of expectation and variance from this node.  
c12_math_cbse_13_009: Binomial distribution definition and properties node establishes the PMF; this node deepens into Bernoulli trial verification and derivation.  
c11_math_cbse_07_007: Combinations formula \(\binom{n}{k}\) is essential for counting sequences of successes/failures.  
c11_math_cbse_08_002: General term in binomial expansion \(\binom{n}{k} a^k b^{n-k}\) directly parallels the binomial probability formula with \(a=p, b=1-p\).
c12_math_cbse_13_004: Bernoulli trials are defined as a sequence of independent experiments with two outcomes; this node directly applies the definition of independent events to repeated trials.  
c12_math_cbse_13_005: Bernoulli trials with unknown parameter can be analyzed using Bayes' Theorem to infer the parameter from outcomes.  

## FORWARD_NODE_IDS


## FORWARD_REASONS
This is the terminal node in Chapter 13 (Probability). No subsequent nodes in this chapter build on it.

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_05_002, c11_stat_cbse_06_006
## CROSS_SUBJECT_REASONS
c11_stat_cbse_05_002: Arithmetic mean calculation for discrete data parallels the derivation of binomial mean \(E(X)=np\).  
c11_stat_cbse_06_006: Standard deviation and variance concepts for frequency distributions connect to binomial variance \(np(1-p)\) and its interpretation as spread.

## CHAIN_DESCRIPTION
c11_math_cbse_07_007 -> c12_math_cbse_13_007 -> c12_math_cbse_13_009 -> c12_math_cbse_13_010 -> N/A

## THIS_FORMULA
\(P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}\) for \(k = 0, 1, \dots, n\); Mean \(\mu = np\); Variance \(\sigma^2 = np(1-p)\)

## FORMULA_VARIABLES
\(n\) = fixed number of Bernoulli trials; \(p\) = probability of success in a single trial (\(0 < p < 1\)); \(k\) = number of successes (integer, \(0 \le k \le n\)); \(\binom{n}{k} = \frac{n!}{k!(n-k)!}\) = number of ways to choose \(k\) successes out of \(n\) trials; \(X\) = binomial random variable counting successes.

## FORMULA_UNITS
dimensionless (probability is a pure number between 0 and 1; mean and variance are in "number of successes" and "number of successes squared" respectively)

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c11_stat_cbse_05_002 | The arithmetic mean of a discrete frequency distribution \(\bar{x} = \frac{\sum f_i x_i}{\sum f_i}\) is the foundation for the expectation \(E(X) = \sum x_i P(X=x_i)\) used to derive binomial mean \(np\).  
c11_stat_cbse_06_006 | Variance \(\sigma^2 = \frac{\sum f_i (x_i - \bar{x})^2}{\sum f_i}\) for data generalises to \(\text{Var}(X) = E(X^2) - [E(X)]^2\), which yields \(np(1-p)\) for binomial.
## PREREQ_CONCEPT
Combinations (\(\binom{n}{k}\)) and the concept of independent events with constant probability.

## PREREQ_BEFORE
The student must be able to compute \(\binom{n}{k}\) fluently and state the multiplication rule for independent events \(P(A \cap B) = P(A)P(B)\).

## PREREQ_STUCK
If stuck, revisit Class 11 Permutations and Combinations (c11_math_cbse_07_007) for \(\binom{n}{k}\) and Class 12 Independent Events (c12_math_cbse_13_004) for \(P(A \cap B) = P(A)P(B)\).

## WORKED_EXAMPLE_1
PROBLEM: In a multiple-choice test with 20 questions, each question has 4 options with exactly one correct answer. A student guesses all answers randomly. Find the probability that the student gets exactly 5 questions correct. Also find the expected number of correct answers and the standard deviation.

STEPS:
- Step 1: Verify Bernoulli conditions: fixed \(n=20\) trials (questions); two outcomes per trial (correct/incorrect); constant success probability \(p = 1/4 = 0.25\) (one correct out of four options); trials are independent (guessing one question does not affect another).
- Step 2: Identify parameters: \(n = 20\), \(p = 0.25\), \(q = 1-p = 0.75\), \(k = 5\).
- Step 3: Write binomial PMF: \(P(X=5) = \binom{20}{5} (0.25)^5 (0.75)^{15}\).
- Step 4: Compute \(\binom{20}{5} = \frac{20 \times 19 \times 18 \times 17 \times 16}{5 \times 4 \times 3 \times 2 \times 1} = 15504\). Compute \((0.25)^5 = \frac{1}{1024} \approx 0.00097656\). Compute \((0.75)^{15} \approx 0.013363\). Multiply: \(15504 \times 0.00097656 \times 0.013363 \approx 0.2023\).
- Step 5: Mean \(\mu = np = 20 \times 0.25 = 5\). Variance \(\sigma^2 = npq = 20 \times 0.25 \times 0.75 = 3.75\). Standard deviation \(\sigma = \sqrt{3.75} \approx 1.936\).

REASONING: The binomial model applies because random guessing on each question is an independent trial with fixed success probability. The PMF accounts for all sequences of 5 correct and 15 incorrect answers — each sequence has probability \(p^5 q^{15}\), and there are \(\binom{20}{5}\) such sequences. The mean \(np\) represents the long-run average correct answers if the test were taken many times; the standard deviation measures typical deviation from this average.

ANSWER: \(P(X=5) \approx 0.2023\); Expected correct answers = 5; Standard deviation \(\approx 1.936\).

## WORKED_EXAMPLE_2
PROBLEM: A machine produces bolts with a 2% defect rate. A quality control engineer selects a random sample of 50 bolts. Find the probability that the sample contains at most 2 defective bolts. (Use binomial distribution; do not use Poisson approximation.)

STEPS:
- Step 1: Confirm Bernoulli setup: \(n=50\) fixed (sample size); two outcomes (defective/non-defective); \(p=0.02\) constant (large production implies sampling without replacement still approximates constant \(p\), but strictly we assume with replacement or infinite population); independence holds for practical purposes.
- Step 2: "At most 2 defective" means \(P(X \le 2) = P(X=0) + P(X=1) + P(X=2)\).
- Step 3: Compute each term using \(P(X=k) = \binom{50}{k} (0.02)^k (0.98)^{50-k}\).
- Step 4: \(P(X=0) = (0.98)^{50} \approx 0.36417\). \(P(X=1) = 50 \times 0.02 \times (0.98)^{49} = 1 \times (0.98)^{49} \approx 0.37160\). \(P(X=2) = \binom{50}{2} (0.02)^2 (0.98)^{48} = 1225 \times 0.0004 \times (0.98)^{48} \approx 0.18581\).
- Step 5: Sum: \(0.36417 + 0.37160 + 0.18581 = 0.92158\). Interpret: there is about 92.16% chance the sample has 2 or fewer defectives.

REASONING: Cumulative binomial probabilities require summing individual PMF values. The calculation shows how even with a small defect rate, the probability of seeing more than 2 defectives in 50 bolts is low (about 7.8%), which helps the engineer set acceptance criteria.

ANSWER: \(P(X \le 2) \approx 0.9216\).

## WORKED_EXAMPLE_3
PROBLEM: In a certain village, 30% of households use solar water heaters. A surveyor randomly visits 10 households. (a) Find the probability that exactly 4 households use solar heaters. (b) Find the probability that at least 7 households use solar heaters. (c) If the surveyor visits 100 such villages (each with 10 households surveyed), in how many villages would you expect exactly 4 solar households? (d) The surveyor claims "Since \(np=3\), the most likely number is 3." Is this correct? Justify.

STEPS:
- Step 1: Parameters: \(n=10\), \(p=0.3\), \(q=0.7\).
- Step 2: (a) \(P(X=4) = \binom{10}{4} (0.3)^4 (0.7)^6 = 210 \times 0.0081 \times 0.117649 \approx 0.2001\).
- Step 3: (b) \(P(X \ge 7) = P(7)+P(8)+P(9)+P(10)\). Compute each: \(P(7)=\binom{10}{7}(0.3)^7(0.7)^3 \approx 0.0090\); \(P(8) \approx 0.0014\); \(P(9) \approx 0.00014\); \(P(10) \approx 0.000006\). Sum \(\approx 0.0105\).
- Step 4: (c) Expected number of villages with exactly 4 solar households = \(100 \times P(X=4) \approx 100 \times 0.2001 = 20.01 \approx 20\) villages.
- Step 5: (d) Mean \(np = 3\). Mode = \(\lfloor (n+1)p \rfloor = \lfloor 11 \times 0.3 \rfloor = \lfloor 3.3 \rfloor = 3\). Here mean = mode = 3, but the reasoning "mode = np" is flawed — it is coincidental because \((n+1)p = 3.3\) is not an integer. If \(p=0.5\), mean=5 but modes are 5 and 4 (since \((n+1)p=5.5\) gives floor 5, but check: \((n+1)p=5.5\), floor=5, so mode=5? Wait: for \(n=10, p=0.5\), \((n+1)p=5.5\), floor=5, so mode=5. Actually for \(n=10, p=0.5\), \(P(5)=P(4)\)? Let's check: \(\binom{10}{5}0.5^{10} = 252/1024\), \(\binom{10}{4}0.5^{10} = 210/1024\), not equal. So mode=5. Better counterexample: \(n=3, p=0.5\), mean=1.5, \((n+1)p=2\), modes are 1 and 2. So the claim is not universally true.)

REASONING: This example combines point probability, cumulative probability, expected frequency over repeated experiments, and the mean-mode distinction. Part (d) tests deep understanding that the mode is \(\lfloor (n+1)p \rfloor\) (or two adjacent values if \((n+1)p\) is integer), not simply \(np\).

ANSWER: (a) \(\approx 0.2001\); (b) \(\approx 0.0105\); (c) \(\approx 20\) villages; (d) The claim is false in general — mode is \(\lfloor (n+1)p \rfloor\), which equals 3 here but not because \(np=3\).

## COMPETENCY_QUESTION_1
QUESTION: A basketball player has a free-throw success rate of 70%. In a practice session, she takes 15 free throws.  
(i) What is the probability she makes exactly 10 free throws?  
(ii) The coach says: "Since her average is 10.5, she will most likely make 10 or 11 shots." Evaluate this statement using the concept of mode of a binomial distribution.  
(iii) If she practices this 15-throw routine 100 times, approximately how many sessions would you expect to have exactly 10 successful throws?

COMPETENCY: Translating real-world situations to mathematical expressions and interpreting statistical measures in context.

STEPS:
- Step 1: Identify \(n=15\), \(p=0.7\), \(q=0.3\). Verify Bernoulli conditions (fixed attempts, two outcomes, constant skill, independent shots).
- Step 2: (i) Compute \(P(X=10) = \binom{15}{10}(0.7)^{10}(0.3)^5\).
- Step 3: (ii) Mean \(= np = 10.5\). Mode \(= \lfloor (n+1)p \rfloor = \lfloor 16 \times 0.7 \rfloor = \lfloor 11.2 \rfloor = 11\). The coach's statement is partially correct (11 is a mode) but 10 is not a mode — the distribution is not symmetric because \(p \neq 0.5\).
- Step 4: (iii) Expected sessions with exactly 10 successes = \(100 \times P(X=10)\).

ANSWER: (i) \(\binom{15}{10}(0.7)^{10}(0.3)^5 = 3003 \times 0.0282475 \times 0.00243 \approx 0.2061\). (ii) Mean = 10.5, mode = 11 (only). The statement is incorrect about 10 being a mode. (iii) \(\approx 20.6 \approx 21\) sessions.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A pharmaceutical company tests a new drug on 12 patients. The probability of a positive response for any patient is 0.6, independently. The drug is considered "effective" if at least 9 patients respond positively.  
(i) Find the probability the drug is deemed effective.  
(ii) The company wants to be at least 95% confident of declaring effectiveness if the true response rate is 0.6. What is the minimum number of patients \(n\) they should test (keeping the threshold at "at least 75% of \(n\) respond positively")?  
(iii) Explain why the binomial model might be inappropriate if the patients are from the same family.

COMPETENCY: Comparing and justifying statistical models; error identification and correction.

STEPS:
- Step 1: (i) \(n=12\), \(p=0.6\). Effective if \(X \ge 9\). Compute \(P(X \ge 9) = \sum_{k=9}^{12} \binom{12}{k}(0.6)^k(0.4)^{12-k}\).
- Step 2: (ii) For general \(n\), threshold = \(0.75n\) (must be integer). Need smallest \(n\) such that \(P(X \ge 0.75n) \ge 0.95\) with \(p=0.6\). This requires trial/error or normal approximation (but normal approx not in scope). Use binomial tables or computational reasoning: as \(n\) increases, the distribution concentrates around \(np=0.6n\), which is below \(0.75n\), so probability decreases. Actually, for fixed \(p=0.6\), \(P(X \ge 0.75n)\) decreases with \(n\) (law of large numbers). So the maximum probability is at smallest \(n\). Check \(n=4\) (threshold 3): \(P(X\ge3) = \binom{4}{3}0.6^3 0.4 + 0.6^4 = 4 \times 0.216 \times 0.4 + 0.1296 = 0.3456 + 0.1296 = 0.4752 < 0.95\). No \(n\) satisfies this — the requirement is impossible because true rate 0.6 < threshold 0.75. The company's criterion is flawed.
- Step 3: (iii) Family members share genetics/environment, violating independence. Responses would be correlated (positive correlation likely), making variance larger than \(np(1-p)\) — binomial underestimates variability.

ANSWER: (i) \(P(X\ge9) \approx 0.0574 + 0.0174 + 0.0035 + 0.0002 = 0.0785\). (ii) No such \(n\) exists because true response rate (0.6) is below the effectiveness threshold (0.75); increasing \(n\) makes the probability of meeting threshold approach 0, not 1. (iii) Independence assumption fails due to shared genetics/environment; binomial model would be invalid.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a student answering a 10-question true/false test by pure ______.

## DIAGNOSTIC_ANSWER_7
guessing

The guessing is the trial's engine: constant probability comes precisely because the answers are chosen blind. **A wrong answer (a studying verb) reveals the student has let knowledge in, and with it a success probability that drifts from question to question.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a student answering a ______-question true/false test by pure guessing.

## DIAGNOSTIC_ANSWER_8
10

The ten is the fixed trial count: n is settled before the first answer, which is one of the four Bernoulli credentials. **A wrong answer (another count) reveals the student has extended the test and broken the fixed-n condition.** The ten is the fixed n: the trial count is settled before the first answer, one of the four Bernoulli credentials.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine a student ______ a 10-question true/false test by pure guessing.

## DIAGNOSTIC_ANSWER_9
answering

The answering verb is the trial's act: each answer is one Bernoulli trial, independent of its neighbours. **A wrong answer (a grading verb) reveals the student has moved to the marking desk where the trials are already over.** The answering verb is the trial itself: each response is one independent Bernoulli experiment with two outcomes.
