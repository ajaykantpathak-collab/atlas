## ELI5
At the Diwali mela you draw two cards without replacement and win a hundred rupees per ace: the winnings - zero, one or two aces - are a random variable, a rule assigning a number to every outcome of the experiment. Its probability distribution is the table of values with their probabilities, each probability between zero and one, the column summing to exactly one. The variable converts card-shuffling into arithmetic; the distribution is its price list.

## DEFINITION
A random variable is a real-valued function whose domain is the sample space of a random experiment. It assigns a unique real number to each outcome in the sample space. The probability distribution of a discrete random variable X is a list of its possible values \(x_1, x_2, \dots, x_n\) along with their corresponding probabilities \(p_1, p_2, \dots, p_n\) such that \(0 \le p_i \le 1\) for all \(i\) and \(\sum_{i=1}^n p_i = 1\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to define a random variable for a given experiment, list its possible values, construct its probability distribution by computing probabilities for each value, and verify that the distribution satisfies the two conditions (non-negativity and sum to 1). They must also distinguish between the random variable (the function) and its probability distribution (the list of values and probabilities).

## SCOPE_BOUNDARY
This node covers discrete random variables and their probability distributions only. It does NOT cover mean, variance, or standard deviation of a random variable (covered in c12_math_cbse_13_008). It does NOT cover continuous random variables, probability density functions, or cumulative distribution functions (beyond Class 12 NCERT scope). All experiments have finite sample spaces.

## WALKTHROUGH
Imagine you are at a Diwali mela playing a game: you draw two cards without replacement from a well-shuffled deck of 52 cards. You win ₹100 for each ace drawn. How much can you win, and what are the chances of each winning amount? To answer this, first list the sample space of the experiment (all ordered pairs of cards). Then define a variable X = "number of aces drawn" — this is a random variable because it assigns a number (0, 1, or 2) to each outcome. Next, compute the probability of each value of X using the multiplication theorem for dependent events (since cards are drawn without replacement). Finally, present the values and their probabilities in a table. This table is the probability distribution of X. The key insight is that a random variable converts outcomes of a random experiment into numbers, allowing us to use algebraic tools to analyse uncertainty.

Takeaway first: the random variable is the number-assigning function; the distribution is that function's price list, obeying non-negativity and total-one. Exam moves: definition questions on the function, construction questions building distributions via the multiplication theorem, verification questions checking the two conditions, and distinction questions separating the variable from its table. Method: rerun the mela - define X as aces drawn, compute each value's probability from dependent draws, tabulate, sum to confirm one. Check yourself: the variable is the mapping, not the values; 'X is two aces' is loose talk for 'X takes the value two'. Drill: construct one full distribution from a drawing experiment and verify its column sums to one.

## DIAGNOSTIC_QUESTION_1
Define a random variable. What are the two necessary conditions for a function to be a valid probability distribution of a discrete random variable?

## DIAGNOSTIC_ANSWER_1
A random variable is a real-valued function defined on the sample space of a random experiment. The two conditions are: (i) \(0 \le P(X = x_i) \le 1\) for every possible value \(x_i\), and (ii) \(\sum_{i} P(X = x_i) = 1\). A wrong answer (e.g., forgetting the sum condition or allowing negative probabilities) reveals that the student treats the distribution as just a list of numbers without the probabilistic constraints, or confuses the random variable with its values.

## DIAGNOSTIC_QUESTION_2
For the experiment of tossing a fair coin twice, the sample space is \(S = \{HH, HT, TH, TT\}\). Define \(X\) as the number of heads and \(Y\) as the difference (number of heads \(-\) number of tails). Explain why both \(X\) and \(Y\) are random variables on the same sample space, and give their probability distributions.

## DIAGNOSTIC_ANSWER_2
Both \(X\) and \(Y\) assign a real number to each outcome in \(S\): \(X(HH)=2, X(HT)=1, X(TH)=1, X(TT)=0\); \(Y(HH)=2, Y(HT)=0, Y(TH)=0, Y(TT)=-2\). Since each outcome gets exactly one real number, both are valid random variables. Their distributions are: \(X: 0(\frac{1}{4}), 1(\frac{1}{2}), 2(\frac{1}{4})\); \(Y: -2(\frac{1}{4}), 0(\frac{1}{2}), 2(\frac{1}{4})\). A wrong answer (e.g., saying only one random variable can exist per sample space, or giving identical distributions) reveals confusion between the random variable as a function and its probability distribution, or misunderstanding that multiple functions can map the same sample space to different sets of real numbers.

## DIAGNOSTIC_QUESTION_3
A bag contains 5 red and 3 blue balls. Two balls are drawn at random without replacement. Let \(X\) be the number of red balls drawn. Find the probability distribution of \(X\).

## DIAGNOSTIC_ANSWER_3
Possible values: \(X = 0, 1, 2\).  
\(P(X=0) = \frac{3}{8} \times \frac{2}{7} = \frac{6}{56} = \frac{3}{28}\) (both blue).  
\(P(X=2) = \frac{5}{8} \times \frac{4}{7} = \frac{20}{56} = \frac{5}{14}\) (both red).  
\(P(X=1) = 1 - P(X=0) - P(X=2) = 1 - \frac{3}{28} - \frac{10}{28} = \frac{15}{28}\).  
(Alternatively: \(P(X=1) = \frac{5}{8} \times \frac{3}{7} + \frac{3}{8} \times \frac{5}{7} = \frac{15+15}{56} = \frac{30}{56} = \frac{15}{28}\).)  
Distribution: \(X: 0, 1, 2\); \(P(X): \frac{3}{28}, \frac{15}{28}, \frac{10}{28}\). Sum = 1.  
A wrong answer (e.g., using binomial probabilities \(\binom{2}{1}(\frac{5}{8})(\frac{3}{8})\) for \(X=1\)) reveals the student incorrectly assumes draws are independent (with replacement) or forgets that the sample space changes after the first draw.

## DIAGNOSTIC_QUESTION_4
Two fair dice are rolled. Let \(X\) be the sum of the numbers and \(Y\) be the absolute difference of the numbers. Compare the ranges and symmetry of the probability distributions of \(X\) and \(Y\). Which distribution has a larger range? Which one is symmetric about its mean?

## DIAGNOSTIC_ANSWER_4
\(X\) takes values \(2,3,\dots,12\) (range = 11 values). \(Y\) takes values \(0,1,\dots,5\) (range = 6 values). So \(X\) has a larger range. The distribution of \(X\) is symmetric about 7 (e.g., \(P(X=2)=P(X=12)\), \(P(X=3)=P(X=11)\), etc.). The distribution of \(Y\) is not symmetric (e.g., \(P(Y=0)=\frac{6}{36}\), \(P(Y=5)=\frac{2}{36}\)). A wrong answer (e.g., claiming both are symmetric or that \(Y\) has larger range) reveals the student has not actually constructed the distributions or does not understand symmetry in probability distributions.

## DIAGNOSTIC_QUESTION_5
A student writes the following probability distribution for the number of heads \(X\) in 3 tosses of a fair coin:  
\(P(X=0)=\frac{1}{8}, P(X=1)=\frac{3}{8}, P(X=2)=\frac{3}{8}, P(X=3)=\frac{1}{8}\).  
Is this correct? Justify your answer by deriving the distribution from the sample space.

## DIAGNOSTIC_ANSWER_5
Yes, it is correct. The sample space of 3 coin tosses has 8 equally likely outcomes: \(\{HHH, HHT, HTH, THH, HTT, THT, TTH, TTT\}\). Count outcomes for each number of heads: 0 heads: 1 outcome (TTT) → \(\frac{1}{8}\); 1 head: 3 outcomes → \(\frac{3}{8}\); 2 heads: 3 outcomes → \(\frac{3}{8}\); 3 heads: 1 outcome → \(\frac{1}{8}\). Sum = 1. A wrong answer (e.g., saying probabilities are \(\frac{1}{4}\) each) reveals the student assumes all values of \(X\) are equally likely, confusing the equally likely outcomes of the sample space with the values of the random variable.

## DIAGNOSTIC_QUESTION_6
Create a real-life experiment (different from coins, dice, or cards) that yields a discrete random variable with at least 4 possible values. Define the random variable, describe the sample space, and write its probability distribution. Ensure the probabilities sum to 1.

## DIAGNOSTIC_ANSWER_6
Example: A box contains 10 pens: 4 red, 3 blue, 3 green. Two pens are drawn without replacement. Let \(X\) = number of red pens drawn.  
Sample space: all unordered pairs of pens (or ordered, but easier with combinations).  
\(X\) can be 0, 1, 2.  
\(P(X=0) = \frac{\binom{6}{2}}{\binom{10}{2}} = \frac{15}{45} = \frac{1}{3}\).  
\(P(X=2) = \frac{\binom{4}{2}}{\binom{10}{2}} = \frac{6}{45} = \frac{2}{15}\).  
\(P(X=1) = \frac{\binom{4}{1}\binom{6}{1}}{\binom{10}{2}} = \frac{24}{45} = \frac{8}{15}\).  
Sum = \(\frac{15+24+6}{45}=1\).  
A poor answer (e.g., only 3 values, probabilities not summing to 1, or not a well-defined random experiment) reveals the student cannot construct a valid probabilistic model from a real situation or fails to verify the distribution conditions.

## COMMON_MISCONCEPTION
Students often confuse the random variable (the function mapping outcomes to numbers) with its values (the numbers themselves). They also frequently forget to check that the sum of probabilities equals 1, or they incorrectly compute probabilities by assuming equally likely outcomes for the values of \(X\) rather than for the underlying sample space. For example, in drawing balls without replacement, they might use binomial probabilities (with replacement) instead of hypergeometric probabilities, leading to wrong distributions. Another common error is treating the random variable as the event itself (e.g., writing \(P(X) = \dots\) instead of \(P(X=x)\)).

## ON_FAILURE
If the student cannot construct a probability distribution, first revisit the definition of a random variable as a function: explicitly write the sample space and assign a number to each outcome. Then compute the probability of each value by summing the probabilities of the outcomes that map to that value. Verify the two conditions. Practice with c11_math_cbse_07_001 (counting principles) and c12_math_cbse_13_003 (multiplication theorem for sequential draws without replacement). If stuck on the sum condition, check arithmetic and ensure all possible values are included.

## PREREQUISITE_NODE_IDS
c11_math_cbse_07_001, c11_math_cbse_07_003, c11_math_cbse_07_007, c11_math_cbse_07_008, c11_math_cbse_07_010, c9_math_ch7_5, c12_math_cbse_13_001, c12_math_cbse_13_002, c12_math_cbse_13_003, c12_math_cbse_13_004, c12_math_cbse_13_005, c12_math_cbse_13_006, c12_phy_cbse_14_001

## PREREQUISITE_REASONS
c11_math_cbse_07_001: Fundamental Principle of Counting needed to determine the size of sample spaces for multi-step experiments.
c11_math_cbse_07_003: Permutations for ordered outcomes (e.g., drawing cards in sequence).
c11_math_cbse_07_007: Combinations for unordered outcomes (e.g., drawing balls simultaneously).
c11_math_cbse_07_008: Properties of combinations to simplify probability calculations.
c11_math_cbse_07_010: Word problems on combinations to apply in probability contexts.
c9_math_ch7_5: Understanding sample space and listing outcomes is the foundation for defining random variables.
c12_math_cbse_13_001: Conditional probability for dependent events (e.g., without replacement).
c12_math_cbse_13_002: Properties of conditional probability used in multi-step experiments.
c12_math_cbse_13_003: Multiplication theorem for sequential draws (used to compute probabilities of specific sequences).
c12_math_cbse_13_004: Independent events for with-replacement cases.
c12_math_cbse_13_005: Bayes' theorem (part of chapter flow, though not directly used here).
c12_math_cbse_13_006: Total probability theorem (for partitioning sample space, useful in complex distributions).
c12_phy_cbse_14_001: c12_phy_cbse_14_001 | Random variables used in statistical mechanics for energy distribution of particles  

## FORWARD_NODE_IDS
c12_math_cbse_13_008, c12_math_cbse_13_009, c12_math_cbse_13_010

## FORWARD_REASONS
c12_math_cbse_13_008: Mean and variance require the probability distribution of a random variable as input.
c12_math_cbse_13_009: Binomial distribution is a specific probability distribution of a random variable arising from Bernoulli trials.
c12_math_cbse_13_010: Bernoulli trials and binomial distribution build directly on the concept of a random variable and its distribution.

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_01_008, c11_stat_cbse_05_002, c11_stat_cbse_06_006
## CROSS_SUBJECT_REASONS
c11_stat_cbse_01_008: Variables in statistics (discrete/continuous) connect directly to random variables in probability.
c11_stat_cbse_05_002: Arithmetic mean of a frequency distribution is the statistical analogue of the expectation of a random variable.
c11_stat_cbse_06_006: Standard deviation in statistics is the counterpart of the standard deviation of a random variable.

## CHAIN_DESCRIPTION
c11_math_cbse_07_001 -> c12_math_cbse_13_007 -> c12_math_cbse_13_008

## THIS_FORMULA
For a discrete random variable \(X\) taking values \(x_1, x_2, \dots, x_n\) with probabilities \(p_1, p_2, \dots, p_n\):
Probability distribution: \(P(X = x_i) = p_i\), where \(0 \le p_i \le 1\) and \(\sum_{i=1}^n p_i = 1\).

## FORMULA_VARIABLES
\(X\) = random variable; \(x_i\) = possible values of \(X\); \(p_i = P(X = x_i)\) = probability that \(X\) takes the value \(x_i\).

## FORMULA_UNITS
dimensionless (probabilities are unitless; values of \(X\) depend on the context, e.g., number of heads, rupees won, etc.)

## COMPUTATION_TYPE
statistical

## CROSS_SUBJECT
c12_phy_cbse_14_001 | Random variables used in statistical mechanics for energy distribution of particles
 c12_eco_cbse_03_001 | Probability distributions used in econometrics for modeling discrete choices
## PREREQ_CONCEPT
Understanding of sample space, events, and probability of events (including conditional probability and multiplication rule) from earlier nodes in this chapter and Class 11.

## PREREQ_BEFORE
Student must be able to list sample spaces for simple experiments (coins, dice, cards, balls) and compute probabilities of events using counting principles and conditional probability.

## PREREQ_STUCK
If stuck, revisit c9_math_ch7_5 (Sample Space) and c12_math_cbse_13_003 (Multiplication Theorem) to practice computing probabilities of sequential events.

## WORKED_EXAMPLE_1
PROBLEM: A game at a school fair involves drawing two cards successively without replacement from a well-shuffled deck of 52 cards. Let X be the number of aces drawn. Find the probability distribution of X.
STEPS:
- Step 1: Identify the possible values of X. Since two cards are drawn, X can be 0, 1, or 2.
- Step 2: Compute P(X=0) = probability both cards are non-aces. There are 48 non-aces. P = (48/52) * (47/51) = 188/221.
- Step 3: Compute P(X=2) = probability both cards are aces. There are 4 aces. P = (4/52) * (3/51) = 1/221.
- Step 4: Compute P(X=1) = 1 - P(X=0) - P(X=2) = 1 - 188/221 - 1/221 = 32/221. Alternatively, compute directly: (4/52)*(48/51) + (48/52)*(4/51) = 32/221.
- Step 5: Verify sum = 188/221 + 32/221 + 1/221 = 221/221 = 1.
REASONING: We use the multiplication theorem for dependent events (without replacement). The random variable X assigns a number (0,1,2) to each outcome in the sample space. The probability distribution lists these values with their probabilities.
ANSWER: X: 0, 1, 2; P(X): 188/221, 32/221, 1/221.

## WORKED_EXAMPLE_2
PROBLEM: A biased die is such that the probability of getting a number is proportional to the number itself. The die is rolled once. Let X be the number on the die. Find the probability distribution of X.
STEPS:
- Step 1: Let the probability of face i be k*i for i=1,2,3,4,5,6. Since sum of probabilities = 1, k*(1+2+3+4+5+6) = 21k = 1 => k = 1/21.
- Step 2: Then P(X=i) = i/21 for i=1,...,6.
- Step 3: List the distribution: X=1: 1/21, X=2: 2/21, X=3: 3/21, X=4: 4/21, X=5: 5/21, X=6: 6/21.
- Step 4: Verify sum = (1+2+3+4+5+6)/21 = 21/21 = 1.
- Step 5: Note that this is a valid probability distribution (each probability between 0 and 1, sum=1).
REASONING: The condition "probability proportional to the number" gives a linear relationship. We use the normalization condition (sum of probabilities = 1) to find the constant of proportionality.
ANSWER: P(X=i) = i/21 for i=1,2,3,4,5,6.

## WORKED_EXAMPLE_3
PROBLEM: Two numbers are selected at random (without replacement) from the first six positive integers. Let X denote the larger of the two numbers obtained. Find the probability distribution of X.
STEPS:
- Step 1: Sample space: choose 2 numbers from {1,2,3,4,5,6} without replacement. Number of outcomes = 6C2 = 15. All pairs equally likely.
- Step 2: X can be 2,3,4,5,6 (cannot be 1 because larger of two distinct numbers from 1..6 is at least 2).
- Step 3: For X=2: only pair {1,2} => 1 outcome => P=1/15.
- Step 4: For X=3: pairs {1,3}, {2,3} => 2 outcomes => P=2/15.
- Step 5: For X=4: pairs {1,4}, {2,4}, {3,4} => 3 outcomes => P=3/15=1/5.
- Step 6: For X=5: pairs {1,5}, {2,5}, {3,5}, {4,5} => 4 outcomes => P=4/15.
- Step 7: For X=6: pairs {1,6}, {2,6}, {3,6}, {4,6}, {5,6} => 5 outcomes => P=5/15=1/3.
- Step 8: Verify sum = (1+2+3+4+5)/15 = 15/15 = 1.
REASONING: We use combinations to count equally likely outcomes. The random variable X is the maximum of the two numbers. We count favorable pairs for each possible maximum.
ANSWER: X: 2,3,4,5,6; P(X): 1/15, 2/15, 3/15, 4/15, 5/15.

## COMPETENCY_QUESTION_1
QUESTION: A random variable X has the following probability distribution:
X:   0   1   2   3   4
P(X): k  2k  3k  4k  5k
(a) Find the value of k.
(b) Determine P(X ≥ 2).
(c) If this distribution represents the number of defective items in a sample of 4 from a large batch, what assumption about the batch is implied by the distribution not being binomial? Explain.
COMPETENCY: Translating real-world situations to mathematical expressions and comparing distributions.
STEPS:
- Step 1: Use sum of probabilities = 1 to find k.
- Step 2: Compute P(X ≥ 2) = P(2)+P(3)+P(4).
- Step 3: For binomial, probabilities would be C(4,x) p^x (1-p)^{4-x}. Here ratios are 1:2:3:4:5, not matching binomial coefficients 1:4:6:4:1. So the trials are not independent or probability of defect changes (without replacement from small batch).
ANSWER: (a) k = 1/15. (b) P(X≥2) = (3+4+5)/15 = 12/15 = 4/5. (c) The distribution is not binomial because the probabilities are not proportional to binomial coefficients. This implies the draws are without replacement from a finite batch (hypergeometric) or the probability of defect is not constant.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a factory, three machines A, B, C produce 50%, 30%, 20% of the total output. Their defect rates are 2%, 3%, 4% respectively. An item is selected at random and found to be defective. Let X be the number of the machine that produced it (1 for A, 2 for B, 3 for C). Find the probability distribution of X given that the item is defective.
COMPETENCY: Applying Bayes' theorem to construct a conditional probability distribution.
STEPS:
- Step 1: Define events: D = item defective, A, B, C = machine.
- Step 2: Given P(A)=0.5, P(B)=0.3, P(C)=0.2. P(D|A)=0.02, P(D|B)=0.03, P(D|C)=0.04.
- Step 3: Compute P(D) = 0.5*0.02 + 0.3*0.03 + 0.2*0.04 = 0.01 + 0.009 + 0.008 = 0.027.
- Step 4: Use Bayes' theorem: P(A|D) = (0.5*0.02)/0.027 = 0.01/0.027 = 10/27.
  P(B|D) = 0.009/0.027 = 9/27 = 1/3.
  P(C|D) = 0.008/0.027 = 8/27.
- Step 5: The conditional distribution of X given D is: X=1: 10/27, X=2: 9/27, X=3: 8/27. Sum = 27/27=1.
ANSWER: P(X=1|D)=10/27, P(X=2|D)=9/27, P(X=3|D)=8/27.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A random variable is a real-valued function whose domain is the sample space of a random ______.

## DIAGNOSTIC_ANSWER_7
experiment

The experiment is the domain: every outcome of it receives exactly one number from the random variable. **A wrong answer (a variable word) reveals the student has defined the mapping's codomain where the definition specifies its territory.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are at a Diwali mela playing a game: you draw two cards without ______ from a well-shuffled deck of 52 cards.

## DIAGNOSTIC_ANSWER_8
replacement

The replacement clause drives the probabilities: without it, the two draws' chances shift and the multiplication theorem must chain conditionals. **A wrong answer (with) reveals the student has restored the deck and flattened the distribution's middle entries.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are at a Diwali mela playing a game: you draw two cards without replacement from a well-shuffled deck of ______ cards.

## DIAGNOSTIC_ANSWER_9
52

The deck's size is the denominator's source: fifty-two cards for the first draw, fifty-one for the second. **A wrong answer (another figure) reveals the student has shuffled a different deck and re-priced every entry of the table.** The deck size feeds every denominator: fifty-two cards at the start, shrinking by one with each card kept out.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student must be able to define a random variable for a given experiment, list its possible values, construct its probability distribution by computing probabilities for each value, and verify that the distribution satisfies the two conditions (non-negativity and sum to 1).
