## ELI5
A student guesses through a ten-question multiple-choice test, each question offering four options: the count of correct answers follows the binomial distribution. Its requirements are strict - a fixed number of independent trials, two outcomes each, one constant success probability - and its formula pairs the ways of arranging the successes with the probability of any one arrangement: n choose r times p to the r times q to the n minus r.

## DEFINITION
A binomial distribution is the probability distribution of the number of successes \(X\) in a fixed number \(n\) of independent Bernoulli trials, where each trial has exactly two outcomes (success/failure), the probability of success \(p\) remains constant across trials, and the probability of failure is \(q = 1-p\). The probability mass function is \(P(X = r) = \binom{n}{r} p^r q^{n-r}\) for \(r = 0, 1, 2, \dots, n\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) verify whether a given random experiment satisfies the four conditions of a binomial experiment, (2) compute \(P(X=r)\), \(P(X \le r)\), \(P(X \ge r)\) using the binomial formula, and (3) state and apply the formulas for mean \(\mu = np\), variance \(\sigma^2 = npq\), and standard deviation \(\sigma = \sqrt{npq}\) in context.

## SCOPE_BOUNDARY
This node covers the definition of binomial distribution, its probability mass function, mean, variance, standard deviation, and basic properties (sum of probabilities = 1, symmetry when \(p=0.5\)). It does NOT cover the derivation of mean/variance, normal/Poisson approximations, or hypothesis testing — those belong to higher-level courses. Bernoulli trials are introduced here only as the foundation; their detailed treatment is in the next node (c12_math_cbse_13_010).

## WALKTHROUGH
Imagine a student taking a 10-question multiple-choice test where each question has 4 options and only one is correct. The student guesses randomly on every question. We want to know the probability of getting exactly 3 questions right. This is a classic binomial situation: fixed number of trials (\(n=10\)), two outcomes per trial (correct/incorrect), constant success probability (\(p=1/4\)), and independent trials. To begin, write down \(n\), \(p\), \(q=1-p\), and the desired number of successes \(r\). Then substitute into \(P(X=r) = \binom{n}{r} p^r q^{n-r}\). The key insight is recognizing that the binomial coefficient \(\binom{n}{r}\) counts the number of ways to arrange \(r\) successes among \(n\) trials — a direct application of combinations from Class 11.

Takeaway first: the binomial distribution prices exactly r successes in n identical independent two-outcome trials - arrangements counted by the binomial coefficient, probability by the powers of p and q. Exam moves: verification questions testing the four conditions, computation questions on exact, at-least and at-most probabilities, and summary questions on mean n p and variance n p q. Method: rerun the guessing test - n, p, q identified, the coefficient counted, the powers multiplied. Check yourself: the conditions are the entrance exam - sampling without replacement, for instance, breaks independence and expels the problem from binomial territory. Drill: compute one exact binomial probability and verify one experiment's binomial credentials.

## DIAGNOSTIC_QUESTION_1
State the four necessary conditions for a random experiment to follow a binomial distribution. Use the standard terminology (fixed number of trials, two outcomes, constant probability, independence).

## DIAGNOSTIC_ANSWER_1
The four conditions are: (1) The experiment consists of a fixed finite number \(n\) of trials. (2) Each trial has exactly two possible outcomes, called "success" and "failure". (3) The probability of success \(p\) is the same for every trial (hence \(q=1-p\) is also constant). (4) The trials are independent — the outcome of one trial does not affect the others. A wrong answer that omits "independence" or "constant \(p\)" reveals the student thinks any experiment with two outcomes is binomial (e.g., drawing cards without replacement).

## DIAGNOSTIC_QUESTION_2
A fair die is rolled 6 times. Let \(X\) be the number of times a "6" appears. Explain why \(X\) follows a binomial distribution and identify \(n\), \(p\), and \(q\). Then write the expression for \(P(X=2)\) without evaluating.

## DIAGNOSTIC_ANSWER_2
\(n=6\) (fixed trials), each roll gives "6" (success) or "not 6" (failure), \(p=1/6\) and \(q=5/6\) are constant, and rolls are independent. Hence \(X \sim B(6, 1/6)\). \(P(X=2) = \binom{6}{2} (1/6)^2 (5/6)^4\). A wrong answer that uses \(p=1/2\) or forgets the binomial coefficient shows confusion between "two outcomes" and "equal probability" or misses the combinatorial factor.

## DIAGNOSTIC_QUESTION_3
In a factory, 5% of items produced are defective. A quality control inspector selects 20 items at random. Compute the probability that exactly 2 items are defective. Show all steps including the binomial coefficient calculation.

## DIAGNOSTIC_ANSWER_3
\(n=20\), \(p=0.05\), \(q=0.95\), \(r=2\).  
\(\binom{20}{2} = \frac{20 \times 19}{2} = 190\).  
\(P(X=2) = 190 \times (0.05)^2 \times (0.95)^{18}\).  
\((0.05)^2 = 0.0025\).  
\((0.95)^{18} \approx 0.3972\) (using calculator).  
\(190 \times 0.0025 \times 0.3972 \approx 0.1887\).  
A wrong answer that computes \(\binom{20}{2}=380\) (forgetting to divide by 2) or uses \(p=0.95\) reveals a basic combinatorial error or confusion between success/failure labels.

## DIAGNOSTIC_QUESTION_4
For a binomial distribution \(B(n,p)\), the mean is 8 and the variance is 4.8. Find \(n\) and \(p\). Then determine whether the distribution is symmetric, positively skewed, or negatively skewed. Justify your answer.

## DIAGNOSTIC_ANSWER_4
Given \(\mu = np = 8\) and \(\sigma^2 = npq = 4.8\).  
Divide: \(\frac{npq}{np} = q = \frac{4.8}{8} = 0.6 \Rightarrow p = 0.4\).  
Then \(n = \frac{8}{0.4} = 20\).  
Since \(p=0.4 < 0.5\), the distribution is positively skewed (tail to the right).  
A wrong answer that sets \(q = 4.8/8 = 0.6\) but then says \(p=0.6\) (mixing \(p\) and \(q\)) or claims symmetry because \(np\) and \(npq\) are "nice numbers" shows lack of understanding of the skewness condition \(p \lessgtr 0.5\).

## DIAGNOSTIC_QUESTION_5
A student claims: "For a binomial distribution with \(n=10\) and \(p=0.3\), the probability of at most 3 successes is \(P(X \le 3) = P(X=0)+P(X=1)+P(X=2)+P(X=3)\). To save time, I can just compute \(1 - P(X=4)\) because the total probability is 1." Evaluate this claim and correct the error.

## DIAGNOSTIC_ANSWER_5
The claim is false. \(1 - P(X=4) = P(X=0)+P(X=1)+P(X=2)+P(X=3)+P(X=5)+\dots+P(X=10)\), which includes probabilities for 5 through 10 successes. The correct complement for "at most 3" is "4 or more", i.e., \(1 - P(X \ge 4) = 1 - [P(X=4)+P(X=5)+\dots+P(X=10)]\). The student incorrectly assumes only one term is excluded. This reveals a misunderstanding of the complement rule for cumulative probabilities.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (different from coins, dice, or multiple-choice tests) that can be modeled by a binomial distribution with \(n=15\) and \(p=0.2\). Clearly state the random variable \(X\) and verify all four binomial conditions for your scenario.

## DIAGNOSTIC_ANSWER_6
Example: A call centre receives 15 calls in an hour. Historically, 20% of calls result in a sale. Let \(X\) = number of sales in that hour.  
Conditions: (1) Fixed \(n=15\) calls. (2) Each call: sale (success) or no sale (failure). (3) \(p=0.2\) constant for each call (assumes same customer base, no fatigue). (4) Calls are independent (one caller's decision doesn't affect another).  
A poor answer uses a scenario without fixed \(n\) (e.g., "number of sales until 3 successes" — that's negative binomial) or assumes \(p\) changes (e.g., "probability increases with each call").

## COMMON_MISCONCEPTION
Students often confuse the binomial coefficient \(\binom{n}{r}\) with \(n^r\) or \(n \times r\), especially when \(r\) is small. For example, for \(n=10, r=2\), they write \(\binom{10}{2} = 10 \times 2 = 20\) instead of \(\frac{10 \times 9}{2} = 45\). This error propagates into every probability calculation. Another frequent error: using \(p\) for success but then raising \(q\) to the power \(r\) and \(p\) to \(n-r\), i.e., swapping the exponents. Both mistakes stem from memorizing the formula as a pattern of symbols without attaching meaning to "r successes" and "n-r failures".

## ON_FAILURE
If a student makes the combinatorial error, immediately revisit c11_math_cbse_07_007 (Combinations: Definition and Formula) and practice \(\binom{n}{r}\) calculations for \(n=5,6,7\) with all \(r\). Use the visual "choose positions for successes" argument: "Out of 10 trials, choose which 2 are successes — that's \(\binom{10}{2}\)." For exponent-swapping, have the student write the formula in words: "p^r means probability of success multiplied r times; q^{n-r} means probability of failure multiplied (n-r) times." Then test with a tiny case \(n=3, r=1\) by listing all outcomes (SFF, FSF, FFS) and verifying the exponents.

## PREREQUISITE_NODE_IDS
c12_math_cbse_13_007, c12_math_cbse_13_008, c11_math_cbse_07_007, c11_math_cbse_08_001, c10_math_cbse_14_003, c9_math_ch7_4, c12_math_cbse_13_004, c12_math_cbse_13_005

## PREREQUISITE_REASONS
c12_math_cbse_13_007: Random variables and probability distributions provide the framework for defining \(X\) and its PMF.  
c12_math_cbse_13_008: Mean and variance formulas for a random variable are directly applied to derive \(np\) and \(npq\).  
c11_math_cbse_07_007: The binomial coefficient \(\binom{n}{r}\) comes from combinations; essential for counting arrangements of successes.  
c11_math_cbse_08_001: Binomial theorem expansion \((p+q)^n = \sum \binom{n}{r}p^r q^{n-r}\) proves the probabilities sum to 1.  
c10_math_cbse_14_003: Classical probability \(P(E) = \frac{\text{favourable}}{\text{total}}\) underpins the \(p\) and \(q\) definitions.  
c9_math_ch7_4: Theoretical probability foundation for equally likely outcomes in a single trial.
c12_math_cbse_13_004: Binomial distribution models n independent Bernoulli trials — the independence of trials is the core assumption that allows the probability mass function \( \binom{n}{k}p^k(1-p)^{n-k} \).  
c12_math_cbse_13_005: Binomial distribution problems sometimes require updating success probability based on observed data (Bayesian perspective).  

## FORWARD_NODE_IDS
c12_math_cbse_13_010

## FORWARD_REASONS
c12_math_cbse_13_010: Bernoulli Trials and Binomial Distribution will deepen the connection between individual Bernoulli trials and the binomial distribution, including proofs of mean/variance and more complex applications.

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_05_002, c11_stat_cbse_06_006
## CROSS_SUBJECT_REASONS
c11_stat_cbse_05_002: Arithmetic mean calculation for discrete data parallels the expectation \(E(X) = \sum x_i P(x_i)\) used to derive \(np\).  
c11_stat_cbse_06_006: Standard deviation concept for data sets directly relates to \(\sqrt{npq}\) as a measure of spread in binomial distribution.

## CHAIN_DESCRIPTION
c11_math_cbse_07_007 -> c12_math_cbse_13_007 -> c12_math_cbse_13_008 -> c12_math_cbse_13_009 -> c12_math_cbse_13_010

## THIS_FORMULA
\(P(X = r) = \binom{n}{r} p^r q^{n-r}\), where \(q = 1-p\), \(r = 0,1,\dots,n\). Mean \(\mu = np\), Variance \(\sigma^2 = npq\), Standard deviation \(\sigma = \sqrt{npq}\).

## FORMULA_VARIABLES
\(n\) = number of independent trials (fixed positive integer), \(p\) = probability of success in a single trial (\(0 \le p \le 1\)), \(q = 1-p\) = probability of failure, \(r\) = number of successes (integer from 0 to n), \(\binom{n}{r} = \frac{n!}{r!(n-r)!}\) = number of ways to choose \(r\) successes out of \(n\) trials.

## FORMULA_UNITS
All quantities are dimensionless probabilities or counts; mean and variance are in "number of successes" and "number of successes squared" respectively.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_14_003 | Radioactive decay: number of atoms decaying in a fixed time interval follows binomial (approx Poisson) with large n, small p.  
 c12_eco_cbse_03_005 | Bernoulli trials in econometrics: binary choice models (logit/probit) build on binomial probability structure.
## PREREQ_CONCEPT
Combinations (\(\binom{n}{r}\)) and the concept of a discrete random variable with its probability distribution.

## PREREQ_BEFORE
The student must be able to compute \(\binom{n}{r}\) for given \(n,r\) and understand that a random variable assigns a number to each outcome of a random experiment.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_07_007 for combinations and c12_math_cbse_13_007 for random variables and probability distributions.

## WORKED_EXAMPLE_1
PROBLEM: A bag contains 5 red and 7 blue balls. Four balls are drawn one by one with replacement. Find the probability that exactly 2 balls are red. Also find the mean and variance of the number of red balls drawn.

STEPS:
- Step 1: Identify the experiment: drawing a ball 4 times with replacement. Each draw is independent, two outcomes (red = success, blue = failure), fixed \(n=4\), constant \(p = \frac{5}{12}\), \(q = \frac{7}{12}\).
- Step 2: Define random variable \(X\) = number of red balls in 4 draws. \(X \sim B(4, 5/12)\).
- Step 3: Write the binomial formula for \(r=2\): \(P(X=2) = \binom{4}{2} (5/12)^2 (7/12)^2\).
- Step 4: Compute \(\binom{4}{2} = \frac{4 \times 3}{2} = 6\). \((5/12)^2 = 25/144\), \((7/12)^2 = 49/144\). Multiply: \(6 \times \frac{25}{144} \times \frac{49}{144} = \frac{6 \times 25 \times 49}{144 \times 144} = \frac{7350}{20736} = \frac{1225}{3456} \approx 0.3544\).
- Step 5: Mean \(\mu = np = 4 \times \frac{5}{12} = \frac{5}{3} \approx 1.667\). Variance \(\sigma^2 = npq = 4 \times \frac{5}{12} \times \frac{7}{12} = \frac{140}{144} = \frac{35}{36} \approx 0.972\). Standard deviation \(\sigma = \sqrt{35/36} \approx 0.986\).

REASONING: The "with replacement" condition guarantees independence and constant \(p\). The binomial coefficient counts the sequences (e.g., R R B B, R B R B, etc.) that yield exactly 2 reds. Mean and variance formulas are direct applications of \(np\) and \(npq\).

ANSWER: \(P(\text{exactly 2 red}) = \frac{1225}{3456} \approx 0.3544\); Mean \(= \frac{5}{3}\); Variance \(= \frac{35}{36}\).

## WORKED_EXAMPLE_2
PROBLEM: The probability that a certain component survives a shock test is 0.8. If 6 components are tested independently, find the probability that (i) exactly 4 survive, (ii) at least 5 survive, (iii) at most 3 survive.

STEPS:
- Step 1: Recognise binomial setting: \(n=6\) independent trials, success = "survives", \(p=0.8\), \(q=0.2\). \(X \sim B(6, 0.8)\).
- Step 2: (i) \(P(X=4) = \binom{6}{4} (0.8)^4 (0.2)^2\). \(\binom{6}{4} = \binom{6}{2} = 15\). \((0.8)^4 = 0.4096\), \((0.2)^2 = 0.04\). \(P = 15 \times 0.4096 \times 0.04 = 15 \times 0.016384 = 0.24576\).
- Step 3: (ii) \(P(X \ge 5) = P(X=5) + P(X=6)\). \(P(X=5) = \binom{6}{5} (0.8)^5 (0.2)^1 = 6 \times 0.32768 \times 0.2 = 6 \times 0.065536 = 0.393216\). \(P(X=6) = \binom{6}{6} (0.8)^6 (0.2)^0 = 1 \times 0.262144 \times 1 = 0.262144\). Sum = 0.65536.
- Step 4: (iii) \(P(X \le 3) = 1 - P(X \ge 4) = 1 - [P(X=4)+P(X=5)+P(X=6)]\). We have \(P(X=4)=0.24576\), \(P(X=5)=0.393216\), \(P(X=6)=0.262144\). Sum = 0.90112. \(P(X \le 3) = 1 - 0.90112 = 0.09888\).
- Step 5: Verify total probability: \(P(X=0)+P(X=1)+P(X=2)+P(X=3)+P(X=4)+P(X=5)+P(X=6)\) should be 1. (Optional check using complement or calculator).

REASONING: For "at least" and "at most" probabilities, we either sum individual terms or use the complement rule. Here \(P(X \ge 5)\) has only two terms, so direct sum is easier. \(P(X \le 3)\) has four terms, so complement \(1 - P(X \ge 4)\) is faster.

ANSWER: (i) 0.24576 (ii) 0.65536 (iii) 0.09888

## WORKED_EXAMPLE_3
PROBLEM: A multiple-choice test has 20 questions. Each question has 5 options, only one correct. A student guesses all answers. (a) What is the probability the student gets exactly 6 questions correct? (b) The passing mark is 8 correct answers. Find the probability the student passes. (c) Find the expected number of correct answers and the standard deviation.

STEPS:
- Step 1: Set up binomial: \(n=20\), success = correct guess, \(p=1/5=0.2\), \(q=0.8\). \(X \sim B(20, 0.2)\).
- Step 2: (a) \(P(X=6) = \binom{20}{6} (0.2)^6 (0.8)^{14}\). \(\binom{20}{6} = \frac{20 \times 19 \times 18 \times 17 \times 16 \times 15}{6 \times 5 \times 4 \times 3 \times 2 \times 1} = 38760\). \((0.2)^6 = 0.000064\). \((0.8)^{14} \approx 0.04398\) (using calculator). Product: \(38760 \times 0.000064 \times 0.04398 \approx 38760 \times 0.0000028147 \approx 0.1091\).
- Step 3: (b) \(P(X \ge 8) = 1 - P(X \le 7)\). Need cumulative probability \(P(X \le 7) = \sum_{r=0}^{7} \binom{20}{r} (0.2)^r (0.8)^{20-r}\). Compute each term or use binomial tables/calculator. Using calculator: \(P(X \le 7) \approx 0.9679\). So \(P(X \ge 8) \approx 1 - 0.9679 = 0.0321\).
- Step 4: (c) Mean \(\mu = np = 20 \times 0.2 = 4\). Variance \(\sigma^2 = npq = 20 \times 0.2 \times 0.8 = 3.2\). Standard deviation \(\sigma = \sqrt{3.2} \approx 1.789\).
- Step 5: Interpret: The student is expected to get 4 correct by guessing; passing (8 or more) has only about 3.2% chance. The standard deviation shows typical deviation from 4 is about 1.8 questions.

REASONING: This example combines direct probability, cumulative probability (using complement for efficiency), and summary statistics. The large \(n\) makes manual summation tedious, highlighting the need for technology or tables in exams — but the setup and formula substitution must be shown for board marks.

ANSWER: (a) \(\approx 0.1091\) (b) \(\approx 0.0321\) (c) Mean = 4, Standard deviation \(\approx 1.789\)

## COMPETENCY_QUESTION_1
QUESTION: A manufacturer knows that 3% of his products are defective. He packs 50 items in a box. A retailer buys 10 boxes and checks one box at random. If the box contains more than 2 defectives, the retailer returns the whole batch. (i) What is the probability that a randomly selected box is returned? (ii) The manufacturer wants to reduce the return probability to below 5% by improving the process (reducing \(p\)). What is the maximum defect rate \(p\) he can tolerate? (Use normal approximation with continuity correction: \(P(X > 2) = P(X \ge 3) \approx P(Z > \frac{2.5 - 50p}{\sqrt{50p(1-p)}})\).)

COMPETENCY: Translating real-world situations to mathematical expressions and using approximations appropriately.

STEPS:
- Step 1: Model the number of defectives in a box as \(X \sim B(50, p)\). For current \(p=0.03\), compute \(P(X \ge 3)\) exactly or via approximation.
- Step 2: Exact calculation: \(P(X \ge 3) = 1 - P(X=0) - P(X=1) - P(X=2)\). Compute each using binomial formula.
- Step 3: For part (ii), set up inequality using normal approximation: \(P(X \ge 3) < 0.05\). With continuity correction, \(P(X \ge 3) \approx P(Z \ge \frac{2.5 - 50p}{\sqrt{50p(1-p)}})\). Find \(p\) such that this probability < 0.05.
- Step 4: Solve \(\frac{2.5 - 50p}{\sqrt{50p(1-p)}} > z_{0.05} = 1.645\) (since we want right-tail < 0.05). Square and solve quadratic for \(p\).
- Step 5: Interpret the result in context: the manufacturer must reduce defect rate to below the found \(p\).

ANSWER: (i) Using \(p=0.03\), \(np=1.5\). \(P(X=0) = (0.97)^{50} \approx 0.218\), \(P(X=1) = 50 \times 0.03 \times (0.97)^{49} \approx 0.337\), \(P(X=2) = \binom{50}{2} (0.03)^2 (0.97)^{48} \approx 0.254\). \(P(X \ge 3) \approx 1 - 0.809 = 0.191\). So about 19.1% chance of return. (ii) Solving \(\frac{2.5 - 50p}{\sqrt{50p(1-p)}} > 1.645\) gives \(p < 0.018\) approximately. The defect rate must be below 1.8%.

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: In a certain town, 60% of households have a broadband connection. A surveyor randomly selects 10 households. (a) Find the probability that exactly 7 have broadband. (b) The surveyor continues selecting households until he finds 3 with broadband. Explain why the number of households he needs to visit does NOT follow a binomial distribution. Name the correct distribution.

COMPETENCY: Comparing and justifying distributional assumptions; identifying when binomial does NOT apply.

STEPS:
- Step 1: For (a), identify \(n=10\), \(p=0.6\), \(r=7\). Compute \(P(X=7) = \binom{10}{7} (0.6)^7 (0.4)^3\).
- Step 2: For (b), note that the experiment stops at the 3rd success. The number of trials \(n\) is NOT fixed in advance; it is a random variable. The binomial distribution requires fixed \(n\).
- Step 3: The correct distribution is the negative binomial (or Pascal) distribution, which models the number of trials needed to get a fixed number of successes.
- Step 4: Compute (a) numerically: \(\binom{10}{7}=120\), \((0.6)^7 \approx 0.02799\), \((0.4)^3 = 0.064\). Product \(\approx 120 \times 0.001791 \approx 0.215\).
- Step 5: Conclude: (a) ≈ 0.215, (b) Not binomial because \(n\) is not fixed; it is negative binomial.

ANSWER: (a) 0.215 (approx). (b) The number of trials is not fixed; the experiment stops at the 3rd success. This is a negative binomial distribution.

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a student taking a 10-question ______-choice test where each question has 4 options and only one is correct.

## DIAGNOSTIC_ANSWER_7
multiple

The multiple-choice format fixes the success probability: four options, one correct, every question identically armed. **A wrong answer (an open-ended format) reveals the student has varied the trial's outcomes and broken the two-outcome condition.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: We want to know the probability of getting exactly ______ questions right.

## DIAGNOSTIC_ANSWER_8
3

The three is the r of the question: exactly that many successes, no more, priced by the binomial formula. **A wrong answer (another count) reveals the student has re-aimed the formula at a different success count.** The three is the question's r: exactly that many successes, no other count, priced by the binomial formula.
