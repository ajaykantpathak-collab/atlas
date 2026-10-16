## ELI5
A friend insists that rolling a six makes heads more likely on a simultaneous coin flip: independence is the mathematical rebuttal. Two events are independent when the probability of their joint occurrence factors into the product of their individual probabilities - equivalently, the conditional equals the unconditional: hearing of one tells you nothing about the other. Die and coin pass the test perfectly; the product rule is independence's signature, and dependence its absence.

## DEFINITION
Two events E and F associated with the same random experiment are said to be **independent** if and only if the probability of their simultaneous occurrence equals the product of their individual probabilities, i.e., \( P(E \cap F) = P(E) \cdot P(F) \). Equivalently, when \( P(F) \neq 0 \) and \( P(E) \neq 0 \), independence means \( P(E|F) = P(E) \) and \( P(F|E) = P(F) \) — the occurrence of one event does not alter the probability of the other.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) verify independence of two events using both the product rule \( P(E \cap F) = P(E)P(F) \) and the conditional probability definition, (2) distinguish independent events from mutually exclusive events with a concrete counterexample, (3) prove that if E and F are independent then E and \( F' \) are also independent, and (4) solve multi-step problems involving three or more events where pairwise independence does not imply mutual independence.

## SCOPE_BOUNDARY
This node covers the definition of independent events for two events, the equivalence of the product rule and conditional probability definitions, properties of independence (complements remain independent), and the distinction between pairwise independence and mutual independence for three events. It does NOT cover Bayes' theorem, total probability theorem, random variables, or binomial distribution — those are subsequent nodes. It also does not cover independent trials/experiments (Bernoulli trials) which is node c12_math_cbse_13_010.

## WALKTHROUGH
Imagine you are playing a board game where you roll a fair die and flip a fair coin simultaneously. Your friend claims that getting a 6 on the die makes it more likely to get heads on the coin. You know this sounds wrong — but how do you prove it mathematically? Start by writing the sample space: 12 equally likely outcomes like (1,H), (1,T), … (6,H), (6,T). Let E = {6 on die} and F = {head on coin}. Compute P(E) = 1/6, P(F) = 1/2, and P(E ∩ F) = 1/12. Notice that 1/12 = (1/6) × (1/2). This product rule is the hallmark of independence — the outcome of one experiment gives zero information about the other. Now connect this to the conditional probability formula from node c12_math_cbse_13_001: \( P(E|F) = \frac{P(E \cap F)}{P(F)} \). Substitute the product rule and see that \( P(E|F) = P(E) \). The key insight: **independence means the conditional probability equals the unconditional probability** — knowledge of F does not update your belief about E.

Takeaway first: independence is a product-rule fact, not a feeling - joint equals product, or conditionals equal conditionals - and it must be checked, never assumed. Exam moves: verification questions by both criteria, distinction questions separating independence from mutual exclusivity, complement-preservation questions, and multi-event questions where pairwise independence fails to deliver the whole. Method: rerun the board game - twelve outcomes, the product rule verified, the conditional collapsed onto the unconditional. Check yourself: mutually exclusive events with positive probabilities are maximally dependent - one occurring forbids the other - which is the exact opposite of independence and the classic exam trap. Drill: verify one pair's independence, exhibit an exclusive-but-dependent pair, and prove the complement property.

## DIAGNOSTIC_QUESTION_1
State the precise mathematical condition for two events E and F (with non-zero probabilities) to be independent, using conditional probability notation. Then write the equivalent condition using the intersection probability.

## DIAGNOSTIC_ANSWER_1
**Correct answer:** E and F are independent iff \( P(E|F) = P(E) \) (provided \( P(F) \neq 0 \)) and \( P(F|E) = P(F) \) (provided \( P(E) \neq 0 \)). The equivalent intersection condition is \( P(E \cap F) = P(E) \cdot P(F) \).  
**What a wrong answer reveals:** If a student writes \( P(E|F) = P(F|E) \) or \( P(E \cup F) = P(E) + P(F) \), they are confusing independence with symmetry of conditional probability or with mutual exclusivity. If they omit the non-zero probability condition, they miss a critical domain restriction — the conditional definition fails when the conditioning event has zero probability, while the product rule remains valid.

## DIAGNOSTIC_QUESTION_2
A student argues: "If two events are independent, they cannot happen together, so \( P(E \cap F) = 0 \)." Is this correct? Explain why or why not using a concrete example with a die roll.

## DIAGNOSTIC_ANSWER_2
**Correct answer:** The student is incorrect. Independent events **can** happen together — in fact, if both have non-zero probability, they **must** have a non-zero intersection because \( P(E \cap F) = P(E)P(F) > 0 \). The student is confusing independence with **mutual exclusivity**. Example: Roll a fair die. Let E = {even number} = {2,4,6}, F = {number > 3} = {4,5,6}. P(E) = 1/2, P(F) = 1/2, P(E ∩ F) = P({4,6}) = 1/3. Here \( P(E)P(F) = 1/4 \neq 1/3 \), so they are dependent. But if we take E = {2,4,6} and F = {1,2,3} (first three vs last three), then P(E) = 1/2, P(F) = 1/2, P(E ∩ F) = P({2}) = 1/6 ≠ 1/4 — still dependent. A true independent pair: E = {even} = {2,4,6}, F = {multiple of 3} = {3,6}. P(E) = 1/2, P(F) = 1/3, P(E ∩ F) = P({6}) = 1/6 = (1/2)(1/3). They share outcome 6 — they **do** occur together.  
**What a wrong answer reveals:** If the student agrees with the statement, they fundamentally conflate "independent" (probabilistic independence) with "mutually exclusive" (set-theoretic disjointness). This is the single most common and costly error in board and JEE exams.

## DIAGNOSTIC_QUESTION_3
Two cards are drawn successively **with replacement** from a well-shuffled deck of 52 cards. Let A be the event "first card is a king" and B be the event "second card is a queen". Compute P(A), P(B), P(A ∩ B), and verify whether A and B are independent.

## DIAGNOSTIC_ANSWER_3
**Correct answer with steps:**  
Step 1: Since draws are with replacement, the deck is reset for the second draw. P(A) = 4/52 = 1/13. P(B) = 4/52 = 1/13.  
Step 2: Sample space has 52 × 52 = 2704 equally likely ordered pairs. Favorable for A ∩ B: 4 choices for king × 4 choices for queen = 16. So P(A ∩ B) = 16/2704 = 1/169.  
Step 3: Compute product: P(A) × P(B) = (1/13) × (1/13) = 1/169.  
Step 4: Since P(A ∩ B) = P(A)P(B) = 1/169, events A and B are independent.  
**What a wrong answer reveals:** If a student computes P(A ∩ B) as 4/52 × 3/51 = 1/221 (without replacement logic), they ignored the "with replacement" condition. If they claim dependence because "both are face cards", they are using semantic reasoning instead of the mathematical definition. If they forget to square the denominator for the joint probability, they are not visualizing the product sample space.

## DIAGNOSTIC_QUESTION_4
Consider three events A, B, C from a random experiment. Suppose P(A) = 0.4, P(B) = 0.5, P(C) = 0.6, and P(A ∩ B) = 0.2, P(A ∩ C) = 0.24, P(B ∩ C) = 0.3, P(A ∩ B ∩ C) = 0.12. Are A, B, C mutually independent? Justify by checking all required conditions.

## DIAGNOSTIC_ANSWER_4
**Correct answer:** For mutual independence of three events, **four** conditions must hold:  
1. P(A ∩ B) = P(A)P(B) → 0.2 = (0.4)(0.5) = 0.2 ✓  
2. P(A ∩ C) = P(A)P(C) → 0.24 = (0.4)(0.6) = 0.24 ✓  
3. P(B ∩ C) = P(B)P(C) → 0.3 = (0.5)(0.6) = 0.3 ✓  
4. P(A ∩ B ∩ C) = P(A)P(B)P(C) → 0.12 = (0.4)(0.5)(0.6) = 0.12 ✓  
All four conditions hold, so A, B, C are **mutually independent**.  
**What a wrong answer reveals:** If a student checks only the three pairwise conditions and declares mutual independence, they miss the critical fourth condition. This is a classic JEE trap — pairwise independence does **not** imply mutual independence. A counterexample: toss two fair coins; let A = {first head}, B = {second head}, C = {both same}. Each pair is independent but P(A ∩ B ∩ C) = P({HH}) = 1/4 while P(A)P(B)P(C) = 1/8. If the student doesn't know this counterexample, they haven't grasped the nuance.

## DIAGNOSTIC_QUESTION_5
A solution claims: "Events E and F are independent because P(E) = 0.3, P(F) = 0.4, and P(E ∪ F) = 0.58. Since P(E) + P(F) = 0.7 ≠ 0.58, they are not mutually exclusive, therefore they must be independent." Evaluate this reasoning. Is the conclusion necessarily true? If not, give a counterexample with the same probabilities.

## DIAGNOSTIC_ANSWER_5
**Correct answer:** The reasoning is **invalid**. Non-mutual-exclusivity does **not** imply independence. The given data: P(E) = 0.3, P(F) = 0.4, P(E ∪ F) = 0.58. Using addition rule: P(E ∩ F) = P(E) + P(F) - P(E ∪ F) = 0.3 + 0.4 - 0.58 = 0.12. Now check product: P(E)P(F) = 0.3 × 0.4 = 0.12. In this specific case, P(E ∩ F) = P(E)P(F), so they **happen to be** independent — but the student's logic was wrong. Counterexample with same P(E), P(F) but different P(E ∪ F): Suppose P(E ∪ F) = 0.6. Then P(E ∩ F) = 0.1. But P(E)P(F) = 0.12 ≠ 0.1, so they are **dependent** yet still not mutually exclusive (since intersection ≠ 0).  
**What a wrong answer reveals:** If the student says "yes, the conclusion is correct", they believe independence is the default state when events aren't mutually exclusive. This reveals a binary misconception: events are either mutually exclusive or independent, with no third option. In reality, most event pairs are **neither**.

## DIAGNOSTIC_QUESTION_6
Construct a real-world scenario involving two stages (e.g., manufacturing, testing, weather) where the events are **clearly independent** by physical reasoning, not just calculation. Define events E and F, state their probabilities, and explain why the product rule must hold without computing numbers.

## DIAGNOSTIC_ANSWER_6
**Expected answer criteria:** A good answer describes a scenario with **physically separate mechanisms** where the outcome of one cannot influence the other. Example: "A factory has two independent assembly lines. Line 1 produces widgets with defect rate 2% (E = widget from line 1 is defective). Line 2 produces gadgets with defect rate 5% (F = gadget from line 2 is defective). Since the lines operate in separate buildings with different machines and workers, a defect in one line gives zero information about the other. The joint probability of both being defective must be (0.02)(0.05) = 0.001 by physical independence."  
**What a poor answer reveals:** If the student gives a scenario like "rain today and rain tomorrow" or "stock market up today and up tomorrow" without acknowledging temporal dependence, they don't understand that real-world independence requires **causal separation**, not just distinct events. If they define E and F from the same experiment (e.g., "first card is heart, second card is spade without replacement"), they haven't grasped that independence is a property of the **experimental setup**, not just the events.

## COMMON_MISCONCEPTION
**The "Mutually Exclusive = Independent" confusion:** Students repeatedly write: "Since A and B are independent, P(A ∩ B) = 0" or "Since A and B are mutually exclusive, P(A ∩ B) = P(A)P(B)". The exact wrong step: They treat the set-theoretic disjointness (A ∩ B = ∅) as equivalent to the probabilistic factorization P(A ∩ B) = P(A)P(B). Concrete example of the error: In a die roll, let A = {1,2}, B = {3,4}. A student claims: "A and B are mutually exclusive, so they are independent. P(A) = 1/3, P(B) = 1/3, so P(A ∩ B) = (1/3)(1/3) = 1/9." But actually A ∩ B = ∅, so P(A ∩ B) = 0 ≠ 1/9. The student has applied the product rule to mutually exclusive events with non-zero probabilities — which is **impossible** because if P(A) > 0 and P(B) > 0 and A ∩ B = ∅, then P(A ∩ B) = 0 < P(A)P(B). This error costs 2-3 marks in board exams and appears as a distractor in JEE MCQs.

## ON_FAILURE
If a student makes the mutually-exclusive-equals-independent error:  
Step 1: Have them draw a Venn diagram of two mutually exclusive events with non-zero probability — two non-overlapping circles inside a rectangle. Ask: "What is the area of the overlap?" (Zero). "What is the product of the areas?" (Positive). "Can zero equal positive?" (No).  
Step 2: Write the theorem: **If A and B are mutually exclusive and P(A) > 0, P(B) > 0, then they are DEPENDENT.** Prove it: P(A ∩ B) = 0 ≠ P(A)P(B) > 0.  
Step 3: Give the "litmus test" phrase to memorize: **"Mutually exclusive means they CAN'T happen together. Independent means one happening doesn't change the chance of the other."**  
Step 4: Re-attempt Diagnostic Question 2. If they still err, revisit c12_math_cbse_13_001 (conditional probability definition) and c10_math_cbse_14_005 (complementary events) to rebuild the probability algebra foundation.

## PREREQUISITE_NODE_IDS
c12_math_cbse_13_001, c12_math_cbse_13_002, c12_math_cbse_13_003, c11_math_cbse_07_007, c10_math_cbse_14_003, c10_math_cbse_14_005, c12_phy_cbse_13_002

## PREREQUISITE_REASONS
c12_math_cbse_13_001: Conditional probability definition \( P(E|F) = \frac{P(E \cap F)}{P(F)} \) is the basis for the equivalent definition of independence \( P(E|F) = P(E) \).
c12_math_cbse_13_002: Properties of conditional probability (especially \( P(E'|F) = 1 - P(E|F) \)) are used to prove that complements of independent events are independent.
c12_math_cbse_13_003: Multiplication theorem \( P(E \cap F) = P(E)P(F|E) \) directly yields the product rule \( P(E \cap F) = P(E)P(F) \) when independence is substituted.
c11_math_cbse_07_007: Combinations (nCr) are needed to compute probabilities in finite sample spaces (e.g., card draws, committee selections) where independence is tested.
c10_math_cbse_14_003: Classical probability formula \( P(E) = \frac{\text{favourable}}{\text{total}} \) is the computational engine for all concrete examples in this node.
c10_math_cbse_14_005: Complementary events \( P(E') = 1 - P(E) \) is used in proving \( P(E' \cap F') = P(E')P(F') \) and in solving "at least one" problems.
c12_phy_cbse_13_002: c12_phy_cbse_13_002 | Radioactive decay: each nucleus decays independently of others; the probability of decay in a time interval is constant and independent of past history — direct application of independent events in nuclear physics.  

## FORWARD_NODE_IDS
c12_math_cbse_13_005, c12_math_cbse_13_006, c12_math_cbse_13_009, c12_math_cbse_13_010, c12_math_cbse_13_007

## FORWARD_REASONS
c12_math_cbse_13_005: Bayes' theorem requires partitioning the sample space into independent or conditionally independent events; the concept of independence underpins the "prior" and "likelihood" separation.
c12_math_cbse_13_006: Total probability theorem uses a partition of the sample space; independence simplifies the computation of \( P(A|E_i) \) when the conditioning events are independent of A.
c12_math_cbse_13_009: Binomial distribution models n independent Bernoulli trials — the independence of trials is the core assumption that allows the probability mass function \( \binom{n}{k}p^k(1-p)^{n-k} \).
c12_math_cbse_13_010: Bernoulli trials are defined as a sequence of independent experiments with two outcomes; this node directly applies the definition of independent events to repeated trials.
c12_math_cbse_13_007: Independent events for with-replacement cases.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_14_004, c11_stat_cbse_07_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_14_004: Mathematical logic (implications, contrapositive) is used to prove "if E and F independent then E and F' independent" — the proof uses set identities and logical equivalence.
c11_stat_cbse_07_001: Correlation in statistics measures linear dependence between variables; zero correlation is a necessary (but not sufficient) condition for independence of random variables, connecting probabilistic independence to statistical association.

## CHAIN_DESCRIPTION
c12_math_cbse_13_001 -> c12_math_cbse_13_004 -> c12_math_cbse_13_005

## THIS_FORMULA
\( P(E \cap F) = P(E) \cdot P(F) \)  (Definition of independence for two events E, F with \( P(E) \neq 0, P(F) \neq 0 \))

## FORMULA_VARIABLES
E, F = events in the same sample space; P(E) = probability of event E; P(F) = probability of event F; P(E ∩ F) = probability of both E and F occurring; P(E|F) = conditional probability of E given F.

## FORMULA_UNITS
dimensionless (probabilities are pure numbers between 0 and 1)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_13_002 | Radioactive decay: each nucleus decays independently of others; the probability of decay in a time interval is constant and independent of past history — direct application of independent events in nuclear physics.
 c12_eco_cbse_04_003 | Consumer choice theory: independence of preferences across goods (additive separability of utility) assumes marginal utility of one good does not depend on quantity of another — probabilistic independence analogy in microeconomics.
 c12_cs_cbse_05_007 | Hashing algorithms: uniform hashing assumes each key maps independently to any slot; collision probability calculations use independence of hash values for distinct keys.
## PREREQ_CONCEPT
Conditional probability and multiplication rule of probability (nodes c12_math_cbse_13_001 and c12_math_cbse_13_003) — independence is defined by substituting \( P(F|E) = P(F) \) into \( P(E \cap F) = P(E)P(F|E) \).

## PREREQ_BEFORE
The student must be able to compute \( P(E|F) \) from given \( P(E \cap F) \) and \( P(F) \), and apply the multiplication rule \( P(E \cap F) = P(E)P(F|E) \) in multi-step problems (e.g., drawing cards without replacement).

## PREREQ_STUCK
If stuck, revisit c12_math_cbse_13_003 (Multiplication Theorem) and practice 5 problems computing \( P(E \cap F) \) using \( P(E)P(F|E) \) — then replace \( P(F|E) \) with \( P(F) \) to see the independence condition emerge.

## WORKED_EXAMPLE_1
PROBLEM: A company has two factories, Factory X and Factory Y, producing light bulbs. Factory X produces 60% of total output with a 2% defect rate. Factory Y produces 40% of total output with a 5% defect rate. A bulb is selected at random from the combined output. Let D be the event "bulb is defective" and X be the event "bulb is from Factory X". Are D and X independent? Justify with calculations.

STEPS:
- Step 1: Identify given probabilities: P(X) = 0.60, P(Y) = 0.40, P(D|X) = 0.02, P(D|Y) = 0.05.
- Step 2: Compute total probability of defect using law of total probability (from upcoming node c12_math_cbse_13_006): P(D) = P(X)P(D|X) + P(Y)P(D|Y) = (0.60)(0.02) + (0.40)(0.05) = 0.012 + 0.020 = 0.032.
- Step 3: Compute joint probability P(D ∩ X) using multiplication rule: P(D ∩ X) = P(X)P(D|X) = (0.60)(0.02) = 0.012.
- Step 4: Compute product of marginals: P(D) × P(X) = (0.032)(0.60) = 0.0192.
- Step 5: Compare: P(D ∩ X) = 0.012 ≠ 0.0192 = P(D)P(X). Therefore D and X are NOT independent.
- Step 6: Interpret: Knowing the bulb is from Factory X changes the probability of defect from 0.032 to 0.02 — so the events are dependent.

REASONING: This example shows that in real-world scenarios, events from the same system (factory source and defect status) are typically dependent because they share a causal mechanism. The calculation uses the multiplication theorem (prerequisite node) to find the joint probability, then tests the product rule. The law of total probability is used to find the marginal P(D) — this foreshadows the next node.

ANSWER: D and X are dependent events. P(D ∩ X) = 0.012, P(D)P(X) = 0.0192. Since 0.012 ≠ 0.0192, the product rule fails.

## WORKED_EXAMPLE_2
PROBLEM: An unbiased die is rolled twice. Let A be the event "first roll shows an even number", B be the event "second roll shows a number greater than 4", and C be the event "sum of the two rolls is 7". Check whether (i) A and B are independent, (ii) A and C are independent, (iii) B and C are independent.

STEPS:
- Step 1: Define sample space: 36 equally likely ordered pairs (i,j) where i,j ∈ {1,2,3,4,5,6}.
- Step 2: Compute marginal probabilities: P(A) = 18/36 = 1/2 (even on first: 2,4,6). P(B) = 12/36 = 1/3 (second > 4: 5,6). P(C) = 6/36 = 1/6 (sum=7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)).
- Step 3: Check A and B: A ∩ B = {(even, 5 or 6)} = 3 × 2 = 6 outcomes. P(A ∩ B) = 6/36 = 1/6. Product P(A)P(B) = (1/2)(1/3) = 1/6. Equal → A and B independent.
- Step 4: Check A and C: A ∩ C = {(even, odd) with sum 7} = {(2,5), (4,3), (6,1)} = 3 outcomes. P(A ∩ C) = 3/36 = 1/12. Product P(A)P(C) = (1/2)(1/6) = 1/12. Equal → A and C independent.
- Step 5: Check B and C: B ∩ C = {(any, 5 or 6) with sum 7} = {(2,5), (1,6)} = 2 outcomes. P(B ∩ C) = 2/36 = 1/18. Product P(B)P(C) = (1/3)(1/6) = 1/18. Equal → B and C independent.
- Step 6: All three pairs are independent. But are they mutually independent? Check triple intersection: A ∩ B ∩ C = outcomes in all three = {(2,5)} only? Wait: (2,5) has first even (2), second >4 (5), sum 7. (4,3) has second=3 not >4. (6,1) has second=1 not >4. So only (2,5). P(A ∩ B ∩ C) = 1/36. Product P(A)P(B)P(C) = (1/2)(1/3)(1/6) = 1/36. All four conditions hold → mutually independent.

REASONING: This problem demonstrates pairwise independence AND mutual independence for three events derived from two independent die rolls. The key is that A depends only on first roll, B only on second roll — so A and B are independent by physical separation. C depends on both rolls, yet still turns out independent of each individually. The step-by-step verification of all four conditions for mutual independence is exactly what JEE advanced questions test.

ANSWER: (i) A and B independent, (ii) A and C independent, (iii) B and C independent. All three pairs independent AND P(A ∩ B ∩ C) = P(A)P(B)P(C) = 1/36, so A, B, C are mutually independent.

## WORKED_EXAMPLE_3
PROBLEM: A bag contains 5 red and 3 blue balls. Two balls are drawn **without replacement**. Let R1 be "first ball is red", R2 be "second ball is red". Are R1 and R2 independent? If not, compute P(R2 | R1) and P(R2 | R1') and explain the dependence intuitively.

STEPS:
- Step 1: Compute P(R1) = 5/8 (5 red out of 8 total).
- Step 2: Compute P(R2) using law of total probability (or symmetry): P(R2) = P(R1)P(R2|R1) + P(R1')P(R2|R1') = (5/8)(4/7) + (3/8)(5/7) = 20/56 + 15/56 = 35/56 = 5/8. So P(R2) = 5/8 = P(R1).
- Step 3: Compute P(R1 ∩ R2) = P(R1)P(R2|R1) = (5/8)(4/7) = 20/56 = 5/14.
- Step 4: Compute product P(R1)P(R2) = (5/8)(5/8) = 25/64.
- Step 5: Compare: 5/14 = 20/56 = 0.357..., 25/64 = 0.3906... Not equal → R1 and R2 are DEPENDENT.
- Step 6: Compute conditional probabilities: P(R2|R1) = 4/7 ≈ 0.571. P(R2|R1') = 5/7 ≈ 0.714. Since P(R2|R1) ≠ P(R2), knowing the first ball is red reduces the chance the second is red (from 5/8 to 4/7). Knowing the first is blue increases the chance the second is red (from 5/8 to 5/7).
- Step 7: Intuitive explanation: Without replacement, the first draw changes the composition of the bag for the second draw — this is physical dependence. With replacement, the composition resets and independence would hold.

REASONING: This is the classic "without replacement destroys independence" example. It connects directly to the multiplication theorem (node c12_math_cbse_13_003) and foreshadows the distinction between Bernoulli trials (with replacement, independent) and hypergeometric sampling (without replacement, dependent) which appears in competitive exams. The step-by-step computation of P(R2) via total probability shows the power of the law of total probability even before it's formally introduced.

ANSWER: R1 and R2 are dependent. P(R1 ∩ R2) = 5/14 ≠ 25/64 = P(R1)P(R2). P(R2|R1) = 4/7, P(R2|R1') = 5/7. The first draw changes the bag composition, creating dependence.

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "If P(A) = 0.5 and P(B) = 0.5, then A and B must be independent because P(A ∩ B) could be 0.25." 
(a) Is the student's reasoning correct? Explain.
(b) Construct a specific sample space with equally likely outcomes and events A, B such that P(A) = 0.5, P(B) = 0.5, but A and B are NOT independent.
(c) For your example, compute P(A|B) and P(B|A) to verify dependence.

COMPETENCY: Translating real-world situations to mathematical expressions / Constructing counterexamples

STEPS:
- Step 1: Analyze the claim — the student thinks equal probabilities imply independence.
- Step 2: Recall independence requires P(A ∩ B) = P(A)P(B) = 0.25, but this is a condition on the intersection, not automatic.
- Step 3: Design a sample space: e.g., S = {1,2,3,4} equally likely. Let A = {1,2}, B = {2,3}. Then P(A) = 2/4 = 0.5, P(B) = 2/4 = 0.5.
- Step 4: Compute intersection: A ∩ B = {2}, P(A ∩ B) = 1/4 = 0.25. Wait, this gives independence! Need dependent example: Let A = {1,2}, B = {1,3}. Then A ∩ B = {1}, P = 1/4 = 0.25 — still independent. Try A = {1,2}, B = {1,2}. Then P(A ∩ B) = 1/2 ≠ 0.25 — dependent! But they are the same event. Need distinct events: S = {1,2,3,4,5,6,7,8} (8 outcomes). A = {1,2,3,4}, B = {1,2,5,6}. P(A)=4/8=0.5, P(B)=4/8=0.5. A ∩ B = {1,2}, P=2/8=0.25 — still independent! 
- Step 5: Realize: with equal probabilities 0.5, need P(A ∩ B) ≠ 0.25. Try S = {1,2,3,4}, A={1,2}, B={1,2,3}? P(B)=3/4≠0.5. Try S={1,2,3,4,5,6}, A={1,2,3}, B={1,4,5}. P(A)=3/6=0.5, P(B)=3/6=0.5. A∩B={1}, P=1/6≈0.167≠0.25. DEPENDENT.
- Step 6: Compute P(A|B) = (1/6)/(3/6) = 1/3 ≠ 0.5 = P(A). P(B|A) = 1/3 ≠ 0.5 = P(B). Verified.

ANSWER: (a) The reasoning is incorrect. Equal marginal probabilities do not guarantee independence; the joint probability must equal the product. (b) Sample space S = {1,2,3,4,5,6} equally likely. A = {1,2,3}, B = {1,4,5}. P(A)=1/2, P(B)=1/2, P(A∩B)=1/6 ≠ 1/4. (c) P(A|B) = (1/6)/(1/2) = 1/3 ≠ P(A); P(B|A) = 1/3 ≠ P(B). Events are dependent.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a certain city, 30% of households subscribe to Newspaper A, 40% subscribe to Newspaper B, and 50% subscribe to at least one of the two. A household is selected at random.
(a) Are the events "subscribes to A" and "subscribes to B" independent? Show your work.
(b) If the city has 20,000 households, how many subscribe to both newspapers?
(c) The city council claims: "Since 30% + 40% = 70% > 50%, the events must be dependent." Evaluate this claim.
(d) Suppose a marketing survey reveals that among households subscribing to A, 25% also subscribe to B. Is this consistent with your answer in (a)?

COMPETENCY: Error identification and correction / Multi-step analytical reasoning

STEPS:
- Step 1: Define events: A = subscribes to Newspaper A, B = subscribes to Newspaper B. Given: P(A) = 0.3, P(B) = 0.4, P(A ∪ B) = 0.5.
- Step 2: Use addition rule: P(A ∩ B) = P(A) + P(B) - P(A ∪ B) = 0.3 + 0.4 - 0.5 = 0.2.
- Step 3: Check independence: P(A)P(B) = (0.3)(0.4) = 0.12. Since P(A ∩ B) = 0.2 ≠ 0.12, events are NOT independent.
- Step 4: (b) Number subscribing to both = P(A ∩ B) × 20,000 = 0.2 × 20,000 = 4,000 households.
- Step 5: (c) The council's claim uses faulty logic: P(A) + P(B) > P(A ∪ B) is ALWAYS true when P(A ∩ B) > 0 (by addition rule). It indicates overlap, not dependence. Dependence is P(A ∩ B) ≠ P(A)P(B). Here 0.2 ≠ 0.12, so they ARE dependent, but for the wrong reason.
- Step 6: (d) Given: P(B|A) = 0.25. Compute from data: P(B|A) = P(A ∩ B)/P(A) = 0.2/0.3 = 2/3 ≈ 0.667. The survey's 0.25 contradicts the given 50% union figure. Inconsistent.

ANSWER: (a) Not independent. P(A ∩ B) = 0.2, P(A)P(B) = 0.12. (b) 4,000 households. (c) Claim is flawed: P(A)+P(B) > P(A∪B) only implies non-zero intersection, not dependence. However, the events happen to be dependent anyway (0.2 ≠ 0.12). (d) Inconsistent: actual P(B|A) = 2/3 ≈ 0.667, not 0.25.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Your friend ______ that getting a 6 on the die makes it more likely to get heads on the coin.

## DIAGNOSTIC_ANSWER_7
claims

The claiming verb is the challenge's spark: the friend's assertion is what the product rule will test, not what it will trust. **A wrong answer (proves) reveals the student has handed the conclusion to the claimant before the arithmetic convened.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Your friend claims that getting a ______ on the die makes it more likely to get heads on the coin.

## DIAGNOSTIC_ANSWER_8
6

The six is the die's chosen face: one specific outcome whose probability the independence check will weigh against the coin's. **A wrong answer (any other face) reveals the student has rolled a different test case while the sample space's structure stays identical.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Your friend claims that ______ a 6 on the die makes it more likely to get heads on the coin.

## DIAGNOSTIC_ANSWER_9
getting

The getting verb names the event: rolling the six is E, and its one-in-six probability is the first factor of the product. **A wrong answer (a throwing verb) reveals the student has dramatised the roll where the definition needs the event named.**
