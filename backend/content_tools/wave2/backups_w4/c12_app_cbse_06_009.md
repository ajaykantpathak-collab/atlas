## ELI5
A mela game charges 50 to roll a die, paying 300 on a six. Price each outcome by its probability, add the products, and the expectation appears: zero — a fair game. Trim the prize to 200 and the expectation turns negative: sixteen-odd rupees lost per play, on average, forever. Expectation is the long-run invoice, not one night's luck — stall owners live on it.

## DEFINITION
For a discrete random variable X taking values $x_1, x_2, ..., x_n$ with corresponding probabilities $p_1, p_2, ..., p_n$ (where $\sum p_i = 1$), the **mathematical expectation** (or expected value) is the weighted average $E(X) = \sum_{i=1}^n x_i p_i$. It represents the long-run average value of repetitions of the experiment it represents.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can: (1) Construct a probability distribution table from a word problem and verify $\sum p_i = 1$, then compute $E(X)$ correctly with all algebraic steps shown; (2) Interpret $E(X)$ as a long-run average/parameter (not a sample statistic) and explain why it may not be a possible outcome of X.

## SCOPE_BOUNDARY
This node covers: definition of $E(X)$ for discrete random variables, computation from probability distribution tables, interpretation as theoretical mean/parameter, linearity property $E(aX+b)=aE(X)+b$, and applications to games of chance and real-world scenarios. It does NOT cover variance (next node), continuous random variables, or moment generating functions.

## WALKTHROUGH
Start with a relatable scenario: "You're at a Diwali mela. A game stall offers: pay ₹50 to roll a fair die. If you get a 6, you win ₹300; otherwise you win nothing. Should you play?" Guide students to define X = net gain, list outcomes (-50, 250) with probabilities (5/6, 1/6), compute $E(X) = -50(5/6) + 250(1/6) = -250/6 + 250/6 = 0$. The game is "fair" — but wait, the stall owner needs profit! Change winning to ₹200, recalculate: $E(X) = -50(5/6) + 150(1/6) = -100/6 ≈ -16.67$. Key insight: $E(X)$ tells you the average loss per game if you play many times — it's a decision-making tool, not a prediction for one game.

Takeaway: mastery means the distribution tabled, the weighted sum computed, and the long-run meaning stated. Exam moves: construction questions build the table and verify the probabilities sum to one; computation questions price each outcome and total the products; interpretation questions explain why the expectation may be a value the variable never takes. Method: ask the stall-owner question — what does one more play cost me on average? — and let the sign answer whether to play. Drill: one die, one trimmed prize, one long-run invoice. Luck governs a night; the expectation governs the year.

## DIAGNOSTIC_QUESTION_1
State the formula for the mathematical expectation $E(X)$ of a discrete random variable X taking values $x_1, x_2, ..., x_n$ with probabilities $p_1, p_2, ..., p_n$. What condition must the probabilities satisfy?

## DIAGNOSTIC_ANSWER_1
$E(X) = \sum_{i=1}^n x_i p_i$ with the condition $\sum_{i=1}^n p_i = 1$. A wrong answer (e.g., $E(X) = \frac{\sum x_i}{n}$ or forgetting the summation condition) reveals the student is confusing the expected value of a probability distribution with the arithmetic mean of a data set — they haven't internalized that probabilities act as weights, not just equal $1/n$.

## DIAGNOSTIC_QUESTION_2
A random variable X has the following probability distribution:
| X | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| P(X) | 0.2 | k | 0.3 | 0.1 |
Find the value of k and then compute E(X). A student computes $E(X) = 0(0.2) + 1(k) + 2(0.3) + 3(0.1)$ but forgets to find k first. What is wrong with this approach?

## DIAGNOSTIC_ANSWER_2
The probabilities must sum to 1: $0.2 + k + 0.3 + 0.1 = 1 \Rightarrow k = 0.4$. Then $E(X) = 0(0.2) + 1(0.4) + 2(0.3) + 3(0.1) = 0 + 0.4 + 0.6 + 0.3 = 1.3$. The student's error reveals they treat the distribution as complete without verifying the fundamental axiom $\sum p_i = 1$ — a critical step that ensures the model is valid. In board exams, missing this step loses the "verification" mark even if arithmetic is correct.

## DIAGNOSTIC_QUESTION_3
In a game, you toss two fair coins. You win ₹10 for each head. Let X be your total winnings. Construct the probability distribution of X and find E(X). If you pay ₹12 to play this game, what is your expected net gain/loss per game?

## DIAGNOSTIC_ANSWER_3
Sample space: {HH, HT, TH, TT}. X values: 20 (HH), 10 (HT, TH), 0 (TT). Probabilities: P(X=20)=1/4, P(X=10)=1/2, P(X=0)=1/4. $E(X) = 20(1/4) + 10(1/2) + 0(1/4) = 5 + 5 + 0 = 10$. Net gain Y = X - 12. $E(Y) = E(X) - 12 = 10 - 12 = -2$. Expected loss of ₹2 per game. A wrong answer (e.g., $E(X)=15$ by averaging 0,10,20 equally) shows the student assumes equally likely X-values instead of weighting by actual probabilities — confusing outcomes of the experiment with values of the random variable.

## DIAGNOSTIC_QUESTION_4
Two different random variables X and Y have the following distributions:
X: values 1,2,3,4 with probabilities 1/7, 3/7, 2/7, 1/7
Y: values -1,0,4,5 with probabilities 1/7, 2/7, 3/7, 1/7
Compute E(X) and E(Y). They are equal. Does this mean X and Y have the same distribution? Explain why or why not.

## DIAGNOSTIC_ANSWER_4
$E(X) = 1(1/7)+2(3/7)+3(2/7)+4(1/7) = 17/7$. $E(Y) = -1(1/7)+0(2/7)+4(3/7)+5(1/7) = 17/7$. Equal means, but distributions are completely different (different supports, different spreads). This tests understanding that expectation is a *single-number summary* (location) — it discards all information about shape, spread, skewness. A student who says "yes, same distribution" confuses equality of a summary statistic with equality of the full distribution — a classic error in competitive exams where they assume $E(X)=E(Y) \Rightarrow X \stackrel{d}{=} Y$.

## DIAGNOSTIC_QUESTION_5
A student argues: "Since E(X) for a fair die roll is 3.5, and 3.5 is not a possible outcome, the concept of expectation is useless for predicting a single roll." Evaluate this argument. Is expectation useless for single trials? When is it useful?

## DIAGNOSTIC_ANSWER_5
The argument is flawed. Expectation is not designed to predict a single outcome — it's the long-run average over infinitely many trials. For a single roll, it's useless as a point prediction (you'll never roll 3.5). But it's crucial for: (1) Decision-making under uncertainty (e.g., insurance premiums, game theory); (2) Theoretical properties (linearity, law of large numbers); (3) Comparing strategies (e.g., which investment has higher expected return). A student who agrees with the argument misunderstands the *purpose* of expectation — they expect it to be a crystal ball, not a planning tool.

## DIAGNOSTIC_QUESTION_6
Create your own real-world scenario (Indian context) involving a discrete random variable with at least 4 outcomes. Define the random variable, give a plausible probability distribution (probabilities sum to 1), compute E(X), and interpret it in one sentence for a decision-maker.

## DIAGNOSTIC_ANSWER_6
Example: Auto-rickshaw driver's daily trips X: 8 trips (prob 0.2), 10 trips (0.3), 12 trips (0.4), 14 trips (0.1). E(X) = 8(0.2)+10(0.3)+12(0.4)+14(0.1) = 1.6+3+4.8+1.4 = 10.8 trips/day. Interpretation: "Over many days, the driver averages 10.8 trips — use this to estimate monthly fuel costs." A poor answer has probabilities not summing to 1, or fewer than 4 outcomes, or interpretation like "he will do 10.8 trips tomorrow" (confusing expectation with prediction). This reveals inability to construct valid models or interpret correctly.

## COMMON_MISCONCEPTION
**Misconception:** "E(X) is the most likely value of X" or "E(X) must be one of the possible values of X."
**Why it happens:** Students confuse *expected value* (weighted average) with *mode* (most probable value) or *median*. In symmetric distributions like a fair die, E(X)=3.5 coincides with the midpoint but isn't a possible outcome. In skewed distributions (e.g., lottery: win ₹1 crore with prob 10⁻⁷, lose ₹100 with prob 1-10⁻⁷), E(X) ≈ -₹99.99 — a value that never occurs and isn't near any outcome.
**Concrete error:** In NCERT Example 3 (two coin tosses, X = number of heads), students often say E(X)=1 means "we expect exactly 1 head" — but P(X=1)=0.5, P(X≠1)=0.5. They write "expected value = most likely value" in board exams and lose marks.

## ON_FAILURE
1. **Revisit c12_app_cbse_06_008** (Probability Distribution of Discrete Random Variable): Reconstruct 3 distributions from word problems, verify $\sum p_i = 1$ each time. 
2. **Do this diagnostic**: "X takes values 2, 5, 8 with probs 0.3, 0.5, 0.2. Is E(X) a possible value? Compute and explain." 
3. **If stuck on interpretation**: Watch a 5-min video on "Law of Large Numbers simulation" (coin tosses converging to 0.5) to visualize long-run average vs single trial. 
4. **Re-attempt**: Create your own 4-outcome distribution where E(X) is not a possible value and explain why it's still meaningful.

## PREREQUISITE_NODE_IDS
c12_app_cbse_06_008, c11_app_cbse_09_003, c11_app_cbse_05_006

## PREREQUISITE_REASONS
c12_app_cbse_06_008: Provides the foundation of constructing probability distribution tables for discrete random variables — essential prerequisite for computing E(X) from a table.
c11_app_cbse_09_003: Covers basic probability of events (P(head)=1/2, etc.) needed to calculate probabilities in distribution tables.
c11_app_cbse_05_006: Sum of arithmetic series used in verifying $\sum p_i = 1$ and in linearity derivations.

## FORWARD_NODE_IDS
c12_app_cbse_06_010

## FORWARD_REASONS
c12_app_cbse_06_010: Variance Var(X) = E(X²) - [E(X)]² directly uses E(X) and requires computing E(X²) — same summation skill extended to squared values.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_11_001, c11_app_cbse_10_001

## CROSS_SUBJECT_REASONS
c11_app_cbse_11_001: Financial Mathematics — expected value is the core of actuarial science, insurance premiums, and investment decision-making (e.g., expected return on a portfolio).
c11_app_cbse_10_001: Descriptive Statistics — E(X) is the theoretical analogue of sample mean $\bar{x}$; connects parameter vs statistic distinction.

## CHAIN_DESCRIPTION
c12_app_cbse_06_008 -> c12_app_cbse_06_009 -> c12_app_cbse_06_010

## THIS_FORMULA
$E(X) = \sum_{i=1}^n x_i p_i$ where $x_i$ are values of discrete random variable X, $p_i = P(X=x_i)$, and $\sum_{i=1}^n p_i = 1$. Also linearity: $E(aX + b) = aE(X) + b$ for constants a,b.

## FORMULA_VARIABLES
- $x_i$: possible values of the discrete random variable X (i = 1 to n)
- $p_i$: probability $P(X = x_i)$, with $p_i \ge 0$ and $\sum p_i = 1$
- $E(X)$: mathematical expectation (expected value), a real number
- $a, b$: real constants for linear transformation

## FORMULA_UNITS
If X is measured in rupees (₹), E(X) is in ₹. If X is in "number of defects", E(X) is in "number of defects" (dimensionless count). Units of E(X) = units of X.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_app_cbse_11_001 | Expected value is the foundation of financial decision-making: insurance premiums = expected payout + loading; investment choices compare E(return); option pricing uses risk-neutral expectation.
c12_app_cbse_10_001 | In descriptive statistics, sample mean $\bar{x}$ estimates population mean $\mu = E(X)$; the distinction between parameter (E(X)) and statistic ($\bar{x}$) is central to inferential statistics.

## PREREQ_CONCEPT
Constructing a valid probability distribution table (values + probabilities summing to 1) from a random experiment description.

## PREREQ_BEFORE
Student must be able to: (1) List all outcomes of a random experiment; (2) Assign correct probabilities to each outcome; (3) Define a random variable X on the outcomes; (4) Build the probability distribution table of X.

## PREREQ_STUCK
If stuck, review "Probability Distribution of Discrete Random Variable" (c12_app_cbse_06_008) — focus on Examples 2 and 4 where distributions are built from coin tosses and dice sums.

## WORKED_EXAMPLE_1
PROBLEM: A bag contains 4 red and 6 blue marbles. Two marbles are drawn at random *without replacement*. Let X be the number of red marbles drawn. Construct the probability distribution of X and find E(X). Interpret the result.

STEPS:
- Step 1: Identify possible values of X. Since we draw 2 marbles without replacement, X can be 0, 1, or 2 red marbles.
- Step 2: Compute probabilities using combinations (hypergeometric). Total ways = $^{10}C_2 = 45$.
  - P(X=0) = both blue = $^6C_2 / ^{10}C_2 = 15/45 = 1/3$
  - P(X=1) = one red, one blue = $(^4C_1 \times ^6C_1) / 45 = 24/45 = 8/15$
  - P(X=2) = both red = $^4C_2 / 45 = 6/45 = 2/15$
- Step 3: Verify $\sum p_i = 1/3 + 8/15 + 2/15 = 5/15 + 8/15 + 2/15 = 15/15 = 1$. ✓
- Step 4: Build distribution table and compute E(X).
  | X | 0 | 1 | 2 |
  |---|---|---|---|
  | P(X) | 1/3 | 8/15 | 2/15 |
  | X·P(X) | 0 | 8/15 | 4/15 |
  $E(X) = 0 + 8/15 + 4/15 = 12/15 = 4/5 = 0.8$
- Step 5: Interpret: "If we repeat this two-draw experiment many times, the average number of red marbles per experiment will approach 0.8. Note that 0.8 is not a possible outcome (X ∈ {0,1,2}) — it's a long-run average."

REASONING: Without replacement makes trials dependent, so we use combinations (hypergeometric), not binomial. The expectation formula still applies because it only requires the probability distribution, not independence. The interpretation emphasizes the parameter vs. single-trial distinction.

ANSWER: E(X) = 0.8 red marbles per two-draw experiment (long-run average).

## WORKED_EXAMPLE_2
PROBLEM: In a board game, you roll a fair die. If you get 1 or 2, you lose ₹20. If you get 3, 4, or 5, you win ₹10. If you get 6, you win ₹50 and get an *extra roll* (with same rules). Let X be your total net winnings from one turn (including extra roll if triggered). Find E(X).

STEPS:
- Step 1: Define the process. First roll: outcomes 1,2 (lose 20), 3,4,5 (win 10), 6 (win 50 + extra roll). Extra roll is identical to first roll.
- Step 2: Let E = E(X). Condition on first roll:
  - Roll 1 or 2 (prob 2/6 = 1/3): X = -20, stop.
  - Roll 3,4,5 (prob 3/6 = 1/2): X = +10, stop.
  - Roll 6 (prob 1/6): X = 50 + Y, where Y is winnings from extra roll. Y has same distribution as X, so E(Y) = E.
- Step 3: Use law of total expectation: E = E(X) = Σ E(X | first roll) · P(first roll)
  $E = (-20)(1/3) + (10)(1/2) + (50 + E)(1/6)$
- Step 4: Solve for E.
  $E = -20/3 + 10/2 + 50/6 + E/6$
  $E - E/6 = -40/6 + 30/6 + 50/6$
  $(5/6)E = 40/6$
  $E = 8$
- Step 5: Verify: E = ₹8 > 0, so game favors player. Check: without extra roll, E = -20/3 + 10/2 + 50/6 = (-40+30+50)/6 = 40/6 ≈ 6.67. Extra roll adds value.

REASONING: This uses the recursive property of expectation (conditioning on first step), a powerful technique for sequential games. It extends the basic formula to stochastic processes — a JEE-advanced favorite. The linearity of expectation allows us to write E(50+Y) = 50 + E(Y).

ANSWER: E(X) = ₹8 per turn.

## WORKED_EXAMPLE_3
PROBLEM: A startup founder pitches to investors. The profit (in ₹ lakhs) after one year is a random variable X with distribution:
| X | -10 | 0 | 50 | 200 |
|---|---|---|---|---|
| P(X) | 0.3 | 0.4 | 0.2 | 0.1 |
An investor offers a deal: they pay ₹5 lakh upfront, and in return get 20% of the profit (if positive; 0 if profit ≤ 0). Let Y be the founder's net profit after this deal. Find E(Y) and compare with E(X). Should the founder accept?

STEPS:
- Step 1: Compute E(X) = (-10)(0.3) + (0)(0.4) + (50)(0.2) + (200)(0.1) = -3 + 0 + 10 + 20 = 27 lakh.
- Step 2: Define Y based on deal terms.
  - If X = -10: founder gets -10 - 5 = -15 (pays 5, no share since profit ≤ 0)
  - If X = 0: founder gets 0 - 5 = -5
  - If X = 50: founder gets 50 - 5 - 0.2(50) = 50 - 5 - 10 = 35
  - If X = 200: founder gets 200 - 5 - 0.2(200) = 200 - 5 - 40 = 155
- Step 3: Build distribution of Y (same probabilities):
  | Y | -15 | -5 | 35 | 155 |
  |---|---|---|---|---|
  | P | 0.3 | 0.4 | 0.2 | 0.1 |
- Step 4: Compute E(Y) = (-15)(0.3) + (-5)(0.4) + (35)(0.2) + (155)(0.1) = -4.5 - 2 + 7 + 15.5 = 16 lakh.
- Step 5: Alternative using linearity: Y = X - 5 - 0.2·max(X,0). But max(X,0) is not linear, so compute directly.
  Compare: E(X) = 27, E(Y) = 16. Founder gives up ₹11 lakh in expectation for ₹5 lakh upfront cash.
- Step 6: Decision: Depends on founder's risk preference. If cash-constrained, may accept despite lower E(Y). Pure expectation maximizer would reject.

REASONING: This combines expectation with real-world financial decision-making (equity financing). The non-linear term (20% of positive profit only) prevents using simple linearity — must compute distribution of Y explicitly. Tests ability to model contractual payoffs.

ANSWER: E(X) = ₹27 lakh, E(Y) = ₹16 lakh. Founder sacrifices ₹11 lakh expected value for immediate liquidity.

## COMPETENCY_QUESTION_1
QUESTION: A company manufactures LED bulbs. The number of defective bulbs in a box of 10 follows a distribution: P(0 defectives) = 0.6, P(1) = 0.3, P(2) = 0.08, P(3) = 0.02. The company sells each box for ₹200. It costs ₹15 per bulb to make, plus ₹20 fixed packaging cost per box. If a box has any defectives, the company gives a ₹50 discount. Let X be the profit per box. Find E(X). The company wants E(X) ≥ ₹30. Should they change the discount policy?

COMPETENCY: Mathematical modeling and financial decision-making using expectation

STEPS:
- Step 1: Define profit for each case. Cost per box = 10×15 + 20 = ₹170. Revenue = 200 if 0 defectives, 150 if ≥1 defective.
  - 0 defectives: Profit = 200 - 170 = ₹30
  - 1 defective: Profit = 150 - 170 = -₹20
  - 2 defectives: Profit = 150 - 170 = -₹20
  - 3 defectives: Profit = 150 - 170 = -₹20
- Step 2: Build distribution of X:
  | X | 30 | -20 | -20 | -20 |
  |---|---|---|---|---|
  | P | 0.6 | 0.3 | 0.08 | 0.02 |
- Step 3: Compute E(X) = 30(0.6) + (-20)(0.3+0.08+0.02) = 18 + (-20)(0.4) = 18 - 8 = ₹10.
- Step 4: E(X) = ₹10 < ₹30 target. Discount policy reduces expected profit. To meet target, reduce discount or improve quality.

ANSWER: E(X) = ₹10 per box. Current policy fails the ₹30 target; company should reduce discount or lower defect rate.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a competitive exam, each correct answer gives +4 marks, each wrong answer gives -1 mark, and unanswered gives 0. A student knows the answer to 60% of questions, can eliminate one wrong option for 30% (guessing among 3 remaining), and blindly guesses for 10% (among 4 options). There are 100 questions. The student attempts all. Let X be the total score. Find E(X). If the cutoff is 120 marks, should the student be confident?

COMPETENCY: Applying expectation to strategic decision-making under uncertainty (exam strategy)

STEPS:
- Step 1: Break down by question type. Total 100 questions.
  - Type A (knows): 60 questions. P(correct)=1, P(wrong)=0. Score per question = +4. Total from A = 60×4 = 240.
  - Type B (eliminate 1): 30 questions. Options left: 3. P(correct)=1/3, P(wrong)=2/3. E(score per B) = 4(1/3) + (-1)(2/3) = 4/3 - 2/3 = 2/3. Total from B = 30×(2/3) = 20.
  - Type C (blind guess): 10 questions. P(correct)=1/4, P(wrong)=3/4. E(score per C) = 4(1/4) + (-1)(3/4) = 1 - 3/4 = 1/4. Total from C = 10×(1/4) = 2.5.
- Step 2: By linearity of expectation, E(X) = E(A) + E(B) + E(C) = 240 + 20 + 2.5 = 262.5.
- Step 3: But wait — this assumes attempting all. What if student skips Type C? If skip: score = 0 for those 10. E(skip C) = 240 + 20 + 0 = 260. Attempting blind guess adds only 2.5 expected marks but increases variance.
- Step 4: Cutoff is 120. E(X)=262.5 >> 120. But expectation alone doesn't guarantee passing — need to consider variance (next chapter). However, with such high expectation, probability of scoring <120 is extremely low (by Chebyshev/Central Limit Theorem intuition).

ANSWER: E(X) = 262.5 marks. Student should be confident about clearing cutoff, but expectation alone doesn't guarantee it — variance matters for risk assessment.

DIFFICULTY: hard