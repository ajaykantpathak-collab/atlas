## ELI5
A test is ninety-nine percent accurate, yet the disease affects only one in a thousand: a positive result still leaves the patient probably healthy - and only Bayes' Theorem can say so cleanly. The theorem reverses conditionals: given the causes' prior probabilities and the likelihood of the evidence under each cause, the posterior is the cause's prior times its likelihood, divided by the total probability of the evidence summed over all causes. Priors in, posteriors out.

## DEFINITION
Bayes' Theorem provides a way to update the probability of a hypothesis (cause) given observed evidence (effect). If \(E_1, E_2, \dots, E_n\) form a partition of the sample space \(S\) (pairwise disjoint, exhaustive, and \(P(E_i)>0\)), and \(A\) is any event with \(P(A)>0\), then the posterior probability of \(E_i\) given \(A\) is:
\[
P(E_i|A) = \frac{P(E_i)P(A|E_i)}{\sum_{j=1}^n P(E_j)P(A|E_j)}, \quad i=1,2,\dots,n.
\]

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) state Bayes' Theorem with all conditions (partition, non-zero probabilities), (2) prove the theorem step-by-step using the definition of conditional probability and the Theorem of Total Probability, and (3) correctly identify the prior probabilities, likelihoods, and the evidence in a word problem to compute a posterior probability.

## SCOPE_BOUNDARY
This node covers the statement and proof of Bayes' Theorem, including the necessary concepts of partition of a sample space and the Theorem of Total Probability. It does NOT cover applications of Bayes' Theorem to random variables, binomial distribution, or continuous probability densities (those are in later nodes). It also does not cover Bayesian inference with prior/posterior distributions beyond the discrete finite case.

## WALKTHROUGH
Imagine a medical test for a rare disease: the test is 99% accurate, but the disease affects only 0.1% of the population. If a randomly selected person tests positive, what is the probability they actually have the disease? Intuition often fails here — this is exactly the "reverse probability" problem Bayes' Theorem solves. Begin by recalling conditional probability \(P(E|F)=\frac{P(E\cap F)}{P(F)}\) and the multiplication rule \(P(E\cap F)=P(E)P(F|E)\). Then introduce the idea of a partition: the sample space can be split into mutually exclusive and exhaustive "causes" \(E_1,\dots,E_n\). The Theorem of Total Probability expresses \(P(A)\) as a weighted sum of \(P(A|E_i)\). Finally, substitute this into the conditional probability formula for \(P(E_i|A)\) to obtain Bayes' Theorem. The key insight: the denominator is the total probability of the evidence \(A\), computed by summing over all possible causes.

Takeaway first: Bayes runs the causal arrow backwards - from evidence to most probable cause - and the denominator is the evidence's total probability, summed across the partition. Exam moves: statement questions with the partition conditions, derivation questions from the definition plus total probability, and application questions extracting priors, likelihoods and posteriors from stories. Method: rerun the medical test - rare disease's prior, accurate test's likelihoods, positive result's total probability, the sobering posterior. Check yourself: the reversal is the whole point - P of E given A is not P of A given E, and the theorem is the only honest bridge between them. Drill: compute one rare-disease posterior and explain in one sentence why intuition fails.

## DIAGNOSTIC_QUESTION_1
State Bayes' Theorem for a partition \(E_1,E_2,\dots,E_n\) of the sample space and an event \(A\) with \(P(A)>0\). Write the formula and explicitly list the three conditions that the events \(E_i\) must satisfy to form a partition.

## DIAGNOSTIC_ANSWER_1
Bayes' Theorem: \(P(E_i|A)=\frac{P(E_i)P(A|E_i)}{\sum_{j=1}^n P(E_j)P(A|E_j)}\). The three conditions for a partition are: (i) \(E_i\cap E_j=\emptyset\) for \(i\neq j\) (pairwise disjoint), (ii) \(\bigcup_{i=1}^n E_i = S\) (exhaustive), (iii) \(P(E_i)>0\) for all \(i\). A wrong answer that omits the condition \(P(E_i)>0\) reveals the student does not understand why the conditional probabilities \(P(A|E_i)\) are defined; missing the disjointness condition shows confusion between a partition and a mere covering of the sample space.

## DIAGNOSTIC_QUESTION_2
Explain why the denominator in Bayes' Theorem is exactly \(P(A)\), the total probability of the evidence. Use the Theorem of Total Probability in your explanation.

## DIAGNOSTIC_ANSWER_2
By the Theorem of Total Probability, since \(\{E_i\}\) is a partition, \(P(A)=\sum_{j=1}^n P(E_j)P(A|E_j)\). This is precisely the denominator. The denominator represents the overall probability of observing the evidence \(A\) regardless of which cause \(E_i\) occurred. A wrong answer that treats the denominator as just \(P(A|E_i)\) or ignores the sum indicates the student has not connected the partition property to the law of total probability.

## DIAGNOSTIC_QUESTION_3
A factory has two machines, M1 and M2. M1 produces 60% of the output, M2 produces 40%. M1's defect rate is 2%, M2's defect rate is 5%. An item is chosen at random and found defective. Compute the probability it was produced by M2 using Bayes' Theorem. Show all steps.

## DIAGNOSTIC_ANSWER_3
Let \(E_1\): item from M1, \(E_2\): item from M2, \(A\): item defective.
\(P(E_1)=0.6,\; P(E_2)=0.4\).
\(P(A|E_1)=0.02,\; P(A|E_2)=0.05\).
\(P(A)=P(E_1)P(A|E_1)+P(E_2)P(A|E_2)=0.6\times0.02+0.4\times0.05=0.012+0.02=0.032\).
\(P(E_2|A)=\frac{P(E_2)P(A|E_2)}{P(A)}=\frac{0.4\times0.05}{0.032}=\frac{0.02}{0.032}=0.625\).
A wrong answer that swaps prior and likelihood (e.g., uses \(P(E_1)\) with \(P(A|E_2)\)) or forgets to compute \(P(A)\) as a sum reveals a mechanical plug‑in without understanding the roles of prior and likelihood.

## DIAGNOSTIC_QUESTION_4
Suppose a student attempts to use Bayes' Theorem with events \(E_1,E_2\) that are not mutually exclusive (they overlap). Explain why the formula would give an incorrect result. Illustrate with a simple Venn diagram description.

## DIAGNOSTIC_ANSWER_4
If \(E_1\) and \(E_2\) overlap, then \(E_1\cap E_2\neq\emptyset\). The events \(A\cap E_1\) and \(A\cap E_2\) would also overlap, so \(P(A)\neq P(A\cap E_1)+P(A\cap E_2)\); the sum would double‑count the intersection. The Theorem of Total Probability requires a partition (disjoint events) to write \(P(A)\) as a sum of disjoint probabilities. Using overlapping events makes the denominator larger than the true \(P(A)\), yielding posterior probabilities that sum to more than 1. A wrong answer that claims the formula still works shows the student does not grasp the necessity of disjointness for additivity of probability.

## DIAGNOSTIC_QUESTION_5
A solution to a Bayes' Theorem problem gives posterior probabilities \(P(E_1|A)=0.7\) and \(P(E_2|A)=0.4\). The student claims this is correct because both are less than 1. Evaluate this claim and identify the error.

## DIAGNOSTIC_ANSWER_5
The claim is incorrect. Since \(\{E_1,E_2\}\) is a partition, the posterior probabilities must satisfy \(P(E_1|A)+P(E_2|A)=1\). Here the sum is \(1.1>1\), violating the axioms of probability. The error likely arose from miscalculating the denominator (e.g., forgetting to multiply a prior by its likelihood, or using wrong conditional probabilities). A student who accepts the claim does not understand that posterior probabilities form a probability distribution over the partition.

## DIAGNOSTIC_QUESTION_6
Create a real‑world scenario (different from medical testing or factory defects) that requires Bayes' Theorem. Define the partition, the evidence event, and assign plausible prior and likelihood probabilities. Write the question that asks for a specific posterior probability.

## DIAGNOSTIC_ANSWER_6
Example: A spam filter classifies emails. Partition: \(E_1\) = email is spam (prior 0.3), \(E_2\) = email is not spam (prior 0.7). Evidence \(A\): email contains the word "free". Likelihoods: \(P(A|E_1)=0.8\), \(P(A|E_2)=0.1\). Question: "Given an email contains 'free', what is the probability it is spam?" A poor answer would use events that are not a partition (e.g., overlapping categories) or assign likelihoods that don't reflect the conditional nature (e.g., giving \(P(E_1|A)\) directly). This reveals the student cannot translate a practical situation into the formal structure of Bayes' Theorem.

## COMMON_MISCONCEPTION
Students often confuse the prior \(P(E_i)\) with the posterior \(P(E_i|A)\) and mistakenly believe Bayes' Theorem says \(P(E_i|A)=P(A|E_i)\). They also frequently forget to verify that the events \(E_i\) form a partition (especially the disjointness condition) and incorrectly apply the formula to overlapping events. Another common error is computing the denominator as \(P(A|E_1)+P(A|E_2)\) instead of the weighted sum \(P(E_1)P(A|E_1)+P(E_2)P(A|E_2)\), effectively assuming equal priors.

## ON_FAILURE
If a student exhibits the above misconceptions, take these steps: (1) Revisit the definition of a partition using a Venn diagram: draw overlapping circles and show how double‑counting breaks the sum. (2) Re‑derive the Theorem of Total Probability from \(A = A\cap S = \bigcup (A\cap E_i)\) emphasizing disjointness of \(A\cap E_i\). (3) Work through a simple two‑cause example (e.g., two boxes with different colored balls) where the student manually computes \(P(A)\) by listing all outcomes, then compares with the formula. (4) Practice identifying priors and likelihoods in word problems by labeling each probability as "prior" or "likelihood" before plugging into the formula.

## PREREQUISITE_NODE_IDS
c12_math_cbse_13_001, c12_math_cbse_13_003, c12_math_cbse_13_006, c10_math_cbse_14_003, c9_math_ch7_7, c12_math_cbse_13_002, c12_math_cbse_13_004

## PREREQUISITE_REASONS
c12_math_cbse_13_001: Conditional probability definition \(P(E|F)=\frac{P(E\cap F)}{P(F)}\) is the starting point for Bayes' Theorem.
c12_math_cbse_13_003: Multiplication rule \(P(E\cap F)=P(E)P(F|E)\) is used to rewrite the numerator.
c12_math_cbse_13_006: Theorem of Total Probability provides the denominator \(\sum P(E_j)P(A|E_j)\); without it the proof is incomplete.
c10_math_cbse_14_003: Classical probability formula \(P(E)=\frac{\text{favourable}}{\text{total}}\) builds the intuition for equally likely outcomes used in simple Bayes examples.
c9_math_ch7_7: Basic probability of an event and complementary events from Class 9 are foundational for understanding probabilities of partitions.
c12_math_cbse_13_002: Bayes' theorem is derived from conditional probability and the total probability theorem, both built on these properties.  
c12_math_cbse_13_004: Bayes' theorem requires partitioning the sample space into independent or conditionally independent events; the concept of independence underpins the "prior" and "likelihood" separation.  

## FORWARD_NODE_IDS
c12_math_cbse_13_007, c12_math_cbse_13_008, c12_math_cbse_13_009, c12_math_cbse_13_010, c12_bs_cbse_09_001

## FORWARD_REASONS
c12_math_cbse_13_007: Random variables and their distributions often use Bayes' Theorem to compute conditional probabilities in compound experiments.
c12_math_cbse_13_008: Mean and variance calculations for random variables may involve posterior probabilities derived via Bayes' Theorem.
c12_math_cbse_13_009: Binomial distribution problems sometimes require updating success probability based on observed data (Bayesian perspective).
c12_math_cbse_13_010: Bernoulli trials with unknown parameter can be analyzed using Bayes' Theorem to infer the parameter from outcomes.
c12_bs_cbse_09_001: t. Step 4: Revisit Class 11 Accounting node c11_acc_cbse_08_005 (Net Profit) and Class 12 Math node c12_math_cbse_13_005 (Present Value) to reinforce time value of money. Step 5: Re-attempt Diagnostic Question 2 with this lens.  

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_07_001, c11_stat_cbse_08_001
## CROSS_SUBJECT_REASONS
c11_stat_cbse_07_001: Correlation and regression in statistics use conditional expectations, which rely on the same conditional probability framework as Bayes' Theorem.
c11_stat_cbse_08_001: Index numbers involve updating weights based on new data, analogous to updating prior probabilities with new evidence.

## CHAIN_DESCRIPTION
c12_math_cbse_13_001 -> c12_math_cbse_13_003 -> c12_math_cbse_13_006 -> c12_math_cbse_13_005 -> c12_math_cbse_13_007

## THIS_FORMULA
P(E_i|A) = \frac{P(E_i)P(A|E_i)}{\sum_{j=1}^n P(E_j)P(A|E_j)}

## FORMULA_VARIABLES
E_i = i-th hypothesis (cause) forming a partition of sample space S; A = observed evidence (event with P(A)>0); P(E_i) = prior probability of hypothesis E_i; P(A|E_i) = likelihood of evidence A given hypothesis E_i; P(E_i|A) = posterior probability of hypothesis E_i given evidence A.

## FORMULA_UNITS
dimensionless (probabilities are pure numbers between 0 and 1)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_stat_cbse_07_001 | Conditional probability and Bayes' Theorem underlie the computation of conditional expectations in regression analysis.
c11_stat_cbse_08_001 | Updating index weights with new price data mirrors Bayesian updating of priors with new evidence.
## PREREQ_CONCEPT
Conditional probability and the multiplication rule of probability.

## PREREQ_BEFORE
The student must be able to compute conditional probabilities, apply the multiplication rule, and understand what a partition of a sample space means (disjoint, exhaustive, non-zero probability).

## PREREQ_STUCK
If stuck, review the definition of conditional probability (c12_math_cbse_13_001) and the Theorem of Total Probability (c12_math_cbse_13_006), focusing on how a partition allows us to write P(A) as a sum of P(E_i)P(A|E_i).

## WORKED_EXAMPLE_1
PROBLEM: A bag contains 4 red and 6 black balls. Another bag contains 3 red and 7 black balls. One of the two bags is selected at random and a ball is drawn from it. The ball drawn is red. Find the probability that it was drawn from the first bag.

STEPS:
- Step 1: Define events. Let \(E_1\) = first bag chosen, \(E_2\) = second bag chosen. These form a partition: \(P(E_1)=P(E_2)=\frac{1}{2}\). Let \(A\) = ball drawn is red.
- Step 2: Determine likelihoods. \(P(A|E_1)=\frac{4}{10}=0.4\) (4 red out of 10 in bag 1). \(P(A|E_2)=\frac{3}{10}=0.3\) (3 red out of 10 in bag 2).
- Step 3: Compute total probability of red using Theorem of Total Probability: \(P(A)=P(E_1)P(A|E_1)+P(E_2)P(A|E_2)=\frac{1}{2}\times0.4+\frac{1}{2}\times0.3=0.2+0.15=0.35\).
- Step 4: Apply Bayes' Theorem for \(E_1\): \(P(E_1|A)=\frac{P(E_1)P(A|E_1)}{P(A)}=\frac{0.2}{0.35}=\frac{4}{7}\).
- Step 5: Interpret: Given a red ball was drawn, the probability it came from the first bag is \(\frac{4}{7}\approx 0.571\).

REASONING: The prior probabilities reflect the random choice of bag. The likelihoods reflect the composition of each bag. The denominator is the overall chance of drawing a red ball from a randomly chosen bag. Bayes' Theorem updates the prior based on the observed evidence (red ball).

ANSWER: \(\frac{4}{7}\) or approximately 0.571.

## WORKED_EXAMPLE_2
PROBLEM: In a certain city, 30% of the population are smokers. The probability of a smoker developing lung cancer is 0.15, while for a non-smoker it is 0.01. A person is diagnosed with lung cancer. What is the probability that the person is a smoker?

STEPS:
- Step 1: Identify partition: \(E_1\) = person is a smoker, \(E_2\) = person is a non-smoker. \(P(E_1)=0.3\), \(P(E_2)=0.7\).
- Step 2: Identify evidence \(A\) = person has lung cancer. Likelihoods: \(P(A|E_1)=0.15\), \(P(A|E_2)=0.01\).
- Step 3: Compute \(P(A)\) using total probability: \(P(A)=0.3\times0.15+0.7\times0.01=0.045+0.007=0.052\).
- Step 4: Apply Bayes' Theorem for \(E_1\): \(P(E_1|A)=\frac{0.3\times0.15}{0.052}=\frac{0.045}{0.052}=\frac{45}{52}\approx0.865\).
- Step 5: Verify: The posterior is much higher than the prior (0.3) because lung cancer is strongly associated with smoking.

REASONING: Even though only 30% of the population smokes, the high relative risk (15% vs 1%) makes a cancer patient very likely to be a smoker. Bayes' Theorem quantifies this update.

ANSWER: \(\frac{45}{52}\) or approximately 0.865.

## WORKED_EXAMPLE_3
PROBLEM: A company has three factories F1, F2, F3 producing 25%, 35%, 40% of its total output respectively. The defect rates are 5%, 4%, 2% respectively. An item is selected at random from the total output and found defective. Find the probability it was produced by factory F2. Also, if the item is found non-defective, find the probability it came from F3.

STEPS:
- Step 1: Partition: \(E_1,F_1\); \(E_2,F_2\); \(E_3,F_3\). Priors: \(P(E_1)=0.25\), \(P(E_2)=0.35\), \(P(E_3)=0.40\).
- Step 2: Evidence \(A\) = defective. Likelihoods: \(P(A|E_1)=0.05\), \(P(A|E_2)=0.04\), \(P(A|E_3)=0.02\).
- Step 3: \(P(A)=0.25\times0.05+0.35\times0.04+0.40\times0.02=0.0125+0.014+0.008=0.0345\).
- Step 4: Posterior for F2: \(P(E_2|A)=\frac{0.35\times0.04}{0.0345}=\frac{0.014}{0.0345}=\frac{28}{69}\approx0.406\).
- Step 5: For non-defective, evidence \(A'\) = non-defective. Likelihoods: \(P(A'|E_1)=0.95\), \(P(A'|E_2)=0.96\), \(P(A'|E_3)=0.98\).
- Step 6: \(P(A')=0.25\times0.95+0.35\times0.96+0.40\times0.98=0.2375+0.336+0.392=0.9655\).
- Step 7: \(P(E_3|A')=\frac{0.40\times0.98}{0.9655}=\frac{0.392}{0.9655}\approx0.406\).
- Step 8: Note that the posterior for F3 given non-defective is also about 0.406, close to its prior 0.40 because defect rates are low.

REASONING: This example shows Bayes' Theorem applied to both an event and its complement. The denominator changes because the total probability of non-defective is different. The calculations reinforce the use of the partition and the law of total probability for any evidence event.

ANSWER: Probability from F2 given defective = \(\frac{28}{69}\approx0.406\); Probability from F3 given non-defective \(\approx0.406\).

## COMPETENCY_QUESTION_1
QUESTION: A diagnostic test for a disease has sensitivity 95% (probability of positive test given disease) and specificity 90% (probability of negative test given no disease). The disease prevalence is 2%. A person tests positive. (a) Compute the probability the person actually has the disease. (b) The test is repeated independently and again returns positive. Assuming conditional independence of tests given disease status, compute the updated probability of disease after two positive tests. (c) Explain why the probability increases even though the test characteristics haven't changed.

COMPETENCY: Translating real-world situations to mathematical expressions and applying Bayes' Theorem sequentially.

STEPS:
- Step 1: Define events: \(D\) = has disease, \(D'\) = no disease. \(P(D)=0.02\), \(P(D')=0.98\). \(T_1\) = first test positive. Sensitivity \(P(T_1|D)=0.95\), specificity \(P(T_1'|D')=0.90\) so \(P(T_1|D')=0.10\).
- Step 2: (a) Compute \(P(T_1)=0.02\times0.95+0.98\times0.10=0.019+0.098=0.117\). \(P(D|T_1)=\frac{0.019}{0.117}\approx0.162\).
- Step 3: (b) For two independent positive tests \(T_1,T_2\), likelihoods multiply: \(P(T_1,T_2|D)=0.95^2=0.9025\), \(P(T_1,T_2|D')=0.10^2=0.01\). New denominator: \(0.02\times0.9025+0.98\times0.01=0.01805+0.0098=0.02785\). Posterior: \(\frac{0.01805}{0.02785}\approx0.648\).
- Step 4: (c) The probability increases because the second positive test provides additional evidence that updates the prior (which is now the posterior from the first test). The combined likelihood ratio becomes more extreme in favor of disease.

ANSWER: (a) \(\approx 0.162\) (16.2%). (b) \(\approx 0.648\) (64.8%). (c) Each positive test multiplies the likelihood ratio; the posterior after the first test becomes the prior for the second, so evidence accumulates.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a multiple-choice question with 4 options, a student either knows the answer (probability 0.6) or guesses (probability 0.4). If the student knows the answer, they answer correctly with probability 1. If they guess, they choose uniformly among the 4 options. The student answers correctly. (a) Find the probability the student knew the answer. (b) Now suppose the test has 5 such independent questions, and the student answers all 5 correctly. Find the probability the student knew the answer to all 5 questions, assuming the "knowing" events are independent across questions with the same prior 0.6.

COMPETENCY: Combining Bayes' Theorem with independent events and extending to multiple independent trials.

STEPS:
- Step 1: Single question: \(K\) = knows answer, \(G\) = guesses. \(P(K)=0.6\), \(P(G)=0.4\). \(C\) = correct answer. \(P(C|K)=1\), \(P(C|G)=1/4=0.25\).
- Step 2: (a) \(P(C)=0.6\times1+0.4\times0.25=0.6+0.1=0.7\). \(P(K|C)=\frac{0.6}{0.7}=\frac{6}{7}\approx0.857\).
- Step 3: (b) For 5 independent questions, the event "knows all 5" is \(K_1\cap\dots\cap K_5\) with prior \(0.6^5=0.07776\). The event "guesses all 5" is \(G_1\cap\dots\cap G_5\) with prior \(0.4^5=0.01024\). But there are mixed cases (knows some, guesses others). However, given the student answered all 5 correctly, the likelihood for a pattern with \(k\) known and \(5-k\) guessed is \(1^k\times(0.25)^{5-k}\). The total probability of all correct is \(\sum_{k=0}^5 \binom{5}{k}(0.6)^k(0.4)^{5-k}(0.25)^{5-k}\). This equals \((0.6\times1+0.4\times0.25)^5=0.7^5=0.16807\).
- Step 4: The probability of knowing all 5 given all correct is \(\frac{0.6^5\times1^5}{0.7^5}=(\frac{0.6}{0.7})^5=(\frac{6}{7})^5\approx0.462\).
- Step 5: Alternatively, by independence, \(P(\text{all } K_i | \text{all } C_i) = \prod P(K_i|C_i) = (6/7)^5\).

ANSWER: (a) \(\frac{6}{7}\approx0.857\). (b) \((\frac{6}{7})^5\approx0.462\).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Bayes' Theorem provides a way to update the ______ of a hypothesis (cause) given observed evidence (effect).

## DIAGNOSTIC_ANSWER_7
probability

The probability is what the evidence updates: priors enter, likelihoods weigh them, posteriors leave. **A wrong answer (a cause) reveals the student has updated the hypothesis itself when the theorem updates only our credence in it.** The probability is what the theorem revises: the evidence's arrival turns each cause's prior into its posterior.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a medical test for a rare disease: the test is 99% accurate, but the disease affects only 0.1% of the ______.

## DIAGNOSTIC_ANSWER_8
population

The population completes the base rate's stage: the rarity is measured against everyone, which is what makes the posterior counter-intuitive. **A wrong answer (a hospital) reveals the student has sampled from the already-sick and destroyed the base-rate contrast.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can (1) state Bayes' Theorem with all conditions (partition, non-zero probabilities), (2) prove the theorem step-by-step using the definition of conditional probability and the Theorem of Total Probability, and (3) correctly identify the prior probabilities, likelihoods, and the evidence in a word problem to compute a.
