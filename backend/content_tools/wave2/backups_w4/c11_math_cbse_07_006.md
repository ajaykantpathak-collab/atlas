## ELI5
A UPI PIN: 4 digits, each drawn from 0-9, repeats welcome - 1122 is legal. Because every position enjoys the full 10 options independently, the count is 10 × 10 × 10 × 10: permutations of n objects taken r at a time with repetition allowed give nʳ. No shrinking menu, no division - each of the r slots faces the same n choices, and the multiplication principle does the rest.

## DEFINITION
The number of permutations of \(n\) distinct objects taken \(r\) at a time, when repetition of objects is allowed, is \(n^r\). This means each of the \(r\) positions can be filled by any of the \(n\) objects independently, and the same object can be chosen multiple times.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly identify problems where repetition is allowed, apply the formula \(n^r\) to compute the number of arrangements, and distinguish these from permutations without repetition (\(^nP_r\)) and permutations of non-distinct objects. They can also solve multi-step word problems combining this concept with the Fundamental Principle of Counting.

## SCOPE_BOUNDARY
This node covers permutations of \(n\) distinct objects taken \(r\) at a time with unlimited repetition allowed. It does NOT cover permutations with restricted repetition (e.g., each object can appear at most twice), circular permutations with repetition, or combinations with repetition (which is covered in later chapters).

## WALKTHROUGH
Imagine you are setting a 4-digit PIN for your UPI payment app. Each digit can be 0–9, and you can repeat digits (like 1122). How many different PINs are possible? Start by asking: "For the first digit, how many choices?" (10). "Since repetition is allowed, for the second digit, how many choices?" (still 10). Continue for all 4 positions. This is a direct application of the Fundamental Principle of Counting (c11_math_cbse_07_001) where each position is an independent task with \(n\) options. The key insight is that because choices are independent and reusable, the total arrangements multiply to \(n \times n \times \dots \times n = n^r\).

Takeaway: mastery means spotting the repetition licence before choosing a formula - nʳ here, ⁿPᵣ if no repeats. Exam moves: count-the-PINs questions and contrast-without-repetition items showing nʳ against ⁿPᵣ. Check yourself: the moment a digit may reappear, the falling product's decline is cancelled - every slot sees the full menu. Students miss it because they default to ⁿPᵣ, when the definition's nʳ assumes reusability: read the problem's permission slip first, then count.

Permission granted means menu unchanged: repetition keeps every slot at full strength, and the exponent does the counting.

Every digit that may return makes the next choice as wide as the first - that permanence is the whole exponent.

## DIAGNOSTIC_QUESTION_1
State the formula for the number of permutations of \(n\) distinct objects taken \(r\) at a time when repetition is allowed.

## DIAGNOSTIC_ANSWER_1
The formula is \(n^r\). A wrong answer like \(^nP_r = \frac{n!}{(n-r)!}\) or \(n!\) reveals the student is confusing "repetition allowed" with "all objects distinct and no repetition". They have not internalised that the number of choices per position remains constant at \(n\) rather than decreasing.

## DIAGNOSTIC_QUESTION_2
Explain why the number of 3-letter codes formed from the letters A, B, C, D, E with repetition allowed is \(5^3\) and not \(^5P_3 = 60\).

## DIAGNOSTIC_ANSWER_2
With repetition allowed, each of the 3 positions has 5 independent choices (A–E), giving \(5 \times 5 \times 5 = 125\). \(^5P_3 = 60\) assumes once a letter is used it cannot be reused, so choices decrease (5, then 4, then 3). A student who cannot articulate this distinction thinks the formulas are interchangeable and misses the condition "repetition allowed".

## DIAGNOSTIC_QUESTION_3
A 6-digit OTP is generated using digits 0–9. Repetition is allowed. How many different OTPs are possible? If the system blocks an account after 5 failed attempts, what is the probability that a random guess succeeds on the first try?

## DIAGNOSTIC_ANSWER_3
Total OTPs = \(10^6 = 1,000,000\). Probability = \(\frac{1}{1,000,000}\). A wrong answer like \(^{10}P_6 = 151,200\) or \(10!\) shows the student applied the distinct-permutation formula. An answer of \(\frac{5}{10^6}\) for probability indicates they incorrectly used the number of attempts in the numerator without understanding "first try" means exactly 1 favourable outcome.

## DIAGNOSTIC_QUESTION_4
Compare the number of 4-character passwords possible from the set \(\{a,b,c\}\) when (i) repetition is allowed, (ii) repetition is not allowed. What happens to the ratio \(\frac{\text{with repetition}}{\text{without repetition}}\) as the password length increases to 5, 6, …?

## DIAGNOSTIC_ANSWER_4
For length 4: with repetition = \(3^4 = 81\); without repetition = \(^3P_4 = 0\) (impossible, since \(r > n\)). For length \(r \le 3\): without repetition = \(^3P_r\). The ratio \(\frac{3^r}{^3P_r}\) grows rapidly because the numerator multiplies by 3 each step while the denominator multiplies by a decreasing number. A student who only computes \(3^4=81\) and says "without repetition is 0" without explaining why \(r>n\) fails for distinct permutations misses the structural difference: repetition allowed has no upper bound on \(r\), while distinct permutations require \(r \le n\).

## DIAGNOSTIC_QUESTION_5
A student solves: "How many 5-letter words can be formed from the letters of 'DELHI' if repetition is allowed?" Their working: \(^5P_5 = 5! = 120\). Identify the error and give the correct answer.

## DIAGNOSTIC_ANSWER_5
The student used the permutation formula for distinct objects without repetition (\(^nP_r\) with \(n=r=5\)). The phrase "repetition is allowed" means each of the 5 positions has 5 choices, so the correct answer is \(5^5 = 3125\). The error reveals the student overlooks the condition "repetition allowed" and defaults to the familiar distinct-permutation formula.

## DIAGNOSTIC_QUESTION_6
Create a real-life problem (Indian context) that requires permutations with repetition allowed, where \(n=4\) and \(r=3\). Write the problem statement and solve it.

## DIAGNOSTIC_ANSWER_6
Example problem: "A food delivery app offers 4 cuisine types: North Indian, South Indian, Chinese, Continental. A user orders dinner for 3 consecutive nights. Each night they can choose any cuisine, including the same one multiple times. How many different cuisine sequences are possible over the 3 nights?" Solution: \(n=4, r=3 \Rightarrow 4^3 = 64\) sequences. A poor answer would use \(^4P_3 = 24\) or \(4! = 24\), showing the student cannot construct a scenario where independent repetition is natural.

## COMMON_MISCONCEPTION
Students mechanically apply \(^nP_r = \frac{n!}{(n-r)!}\) whenever they see "permutation" and "r objects from n", ignoring the phrase "repetition allowed". They treat the \(r\) positions as dependent choices (decreasing options) rather than independent choices (constant \(n\) options). For example, for "3-digit numbers from digits 1–5 with repetition allowed", they compute \(^5P_3 = 60\) instead of \(5^3 = 125\). The error stems from not visualising the filling process: each position is a fresh choice from the full set.

## ON_FAILURE
Ask the student to draw a tree diagram for a tiny case: 2 letters {A, B}, length 2 with repetition allowed. Count the branches: first level 2 branches (A,B), second level each splits into 2 again → 4 outcomes (AA, AB, BA, BB). Write the multiplication: \(2 \times 2 = 2^2\). Then ask: "If repetition were NOT allowed, what changes?" (Second level: A branch only goes to B, B branch only goes to A → 2 outcomes). This concrete visualisation forces them to see the constant vs. decreasing choices.

## PREREQUISITE_NODE_IDS
c11_math_cbse_07_001, c11_math_cbse_07_003, c11_math_cbse_07_004, c9_math_ch7_5, c8_math_ch2_3, c11_math_cbse_07_005

## PREREQUISITE_REASONS
c11_math_cbse_07_001: Fundamental Principle of Counting is the direct basis for deriving \(n^r\) as repeated multiplication.
c11_math_cbse_07_003: Permutations definition provides the context of arranging \(r\) objects from \(n\).
c11_math_cbse_07_004: Permutations of distinct objects (no repetition) is the contrasting case students must distinguish from.
c9_math_ch7_5: Sample space listing in probability (Class 9) often uses repetition allowed (e.g., coin tosses, dice rolls) – builds intuition.
c8_math_ch2_3: Exponential notation \(n^r\) (Class 8) is the computational tool; students must be comfortable with powers.
c11_math_cbse_07_005: Permutations with repetition allowed is a different concept but builds on understanding of identical objects.  

## FORWARD_NODE_IDS
c11_math_cbse_07_007, c11_math_cbse_07_009, c11_math_cbse_07_011
## FORWARD_REASONS
c11_math_cbse_07_007: Combinations introduce selection where order doesn't matter; understanding permutations with repetition helps later when combinations with repetition are introduced (though not in Class 11 NCERT, it appears in higher studies).
c11_math_cbse_07_009: Word problems on permutations often mix "repetition allowed" and "repetition not allowed" scenarios; this node provides one of the core cases.
c11_math_cbse_07_011: Mixed problems require choosing the correct permutation/combination model; this node is a key model.

## CROSS_SUBJECT_PREREQS
c9_math_ch7_5, c10_math_cbse_14_002, c8_math_ch2_3
## CROSS_SUBJECT_REASONS
c9_math_ch7_5: Probability sample spaces for independent trials (tossing a coin 3 times, rolling a die twice) are exactly permutations with repetition allowed.
c10_math_cbse_14_002: Class 10 probability explicitly uses "equally likely outcomes" from such sample spaces (e.g., two dice throws → \(6^2\) outcomes).
c8_math_ch2_3: Exponential notation \(a^m\) is the algebraic representation of repeated multiplication, directly used in \(n^r\).

## CHAIN_DESCRIPTION
c11_math_cbse_07_001 -> c11_math_cbse_07_006 -> c11_math_cbse_07_009

## THIS_FORMULA
\(n^r\)

## FORMULA_VARIABLES
\(n\) = number of distinct objects available; \(r\) = number of positions to fill (or number of objects to be arranged in sequence)

## FORMULA_UNITS
dimensionless (a pure count)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch7_5 | Probability sample spaces for repeated independent trials (e.g., tossing a coin 4 times) are counted using \(n^r\) where \(n\) is outcomes per trial, \(r\) is number of trials.
c8_math_ch2_3 | Exponential notation \(n^r\) is the mathematical shorthand for the repeated multiplication arising from the Fundamental Principle of Counting.
c10_math_cbse_14_002 | In Class 10 probability, experiments like throwing two dice or drawing cards with replacement use \(n^r\) to determine total equally likely outcomes.

## PREREQ_CONCEPT
Fundamental Principle of Counting (Multiplication Principle): if one task can be done in \(m\) ways and a second independent task in \(n\) ways, the two tasks together can be done in \(m \times n\) ways.

## PREREQ_BEFORE
The student must be able to break a counting problem into a sequence of independent choices and multiply the number of options at each step.

## PREREQ_STUCK
Revisit the Fundamental Principle of Counting (c11_math_cbse_07_001) and practice with tree diagrams for 2–3 step processes where choices are independent.

## WORKED_EXAMPLE_1
PROBLEM: A school's new bicycle lock has 4 dials. Each dial can be set to any digit from 0 to 9. Digits can be repeated (e.g., 1223 is allowed). How many different lock combinations are possible?
STEPS:
- Step 1: Identify the number of distinct objects (digits) available: \(n = 10\) (digits 0,1,2,…,9).
- Step 2: Identify the number of positions to fill (dials): \(r = 4\).
- Step 3: Recognise that repetition is allowed (each dial is independent and can show any digit regardless of other dials).
- Step 4: Apply the formula for permutations with repetition allowed: \(n^r = 10^4\).
- Step 5: Compute \(10^4 = 10 \times 10 \times 10 \times 10 = 10,000\).
- Step 6: Interpret: There are 10,000 possible combinations for the lock.
REASONING: Each dial represents an independent choice with 10 options. By the Fundamental Principle of Counting, the total number of 4-dial settings is the product of the number of choices for each dial. Since the number of choices does not decrease (repetition allowed), we multiply 10 by itself 4 times, i.e., \(10^4\).
ANSWER: 10,000 combinations

## WORKED_EXAMPLE_2
PROBLEM: In a multiple-choice test, there are 5 questions. Each question has 4 options (A, B, C, D). A student answers all questions by randomly guessing. How many different answer patterns (sequences of A/B/C/D) can the student produce?
STEPS:
- Step 1: Identify \(n = 4\) (options per question) and \(r = 5\) (questions).
- Step 2: Confirm repetition is allowed: the student can choose option A for multiple questions; choices for one question do not affect others.
- Step 3: Apply formula \(n^r = 4^5\).
- Step 4: Compute \(4^5 = 4 \times 4 \times 4 \times 4 \times 4 = 1024\).
- Step 5: (Optional) If asked for probability of getting all correct by guessing: favourable = 1 (the exact correct pattern), total = 1024, so probability = \(\frac{1}{1024}\).
REASONING: Each question is an independent trial with 4 outcomes. The sequence of 5 answers is an ordered arrangement of length 5 from 4 symbols with repetition allowed. The multiplication principle gives \(4 \times 4 \times 4 \times 4 \times 4 = 4^5\).
ANSWER: 1,024 different answer patterns

## WORKED_EXAMPLE_3
PROBLEM: A website requires a 6-character password. Each character can be a lowercase letter (a–z) or a digit (0–9). Characters can be repeated. How many passwords are possible? If the system locks after 10 failed attempts, what is the probability that a hacker guessing randomly unlocks it within those 10 attempts?
STEPS:
- Step 1: Determine \(n\): 26 lowercase letters + 10 digits = 36 distinct characters.
- Step 2: Determine \(r = 6\) (password length).
- Step 3: Verify repetition allowed: yes, characters can repeat.
- Step 4: Total passwords = \(n^r = 36^6\).
- Step 5: Compute \(36^6 = (6^2)^6 = 6^{12} = 2,176,782,336\) (or \(36^3 = 46,656\); \(46,656^2 = 2,176,782,336\)).
- Step 6: Probability of success within 10 attempts = \(\frac{10}{36^6} = \frac{10}{2,176,782,336} \approx 4.59 \times 10^{-9}\).
REASONING: This combines permutations with repetition allowed (\(36^6\)) with basic probability (favourable/total). The hacker has 10 distinct guesses (assuming no repeated guesses), so favourable outcomes = 10. The denominator is the total number of possible passwords, which is an arrangement of 6 characters from 36 with repetition.
ANSWER: 2,176,782,336 possible passwords; probability ≈ \(4.59 \times 10^{-9}\)

## COMPETENCY_QUESTION_1
QUESTION: A 4-digit PIN for a bank ATM is created using digits 0–9. The bank's security policy requires that the PIN must not have all four digits identical (e.g., 1111, 2222 are forbidden). Repetition is otherwise allowed. How many valid PINs are possible? Explain your reasoning.
COMPETENCY: Translating real-world constraints to mathematical expressions and applying the inclusion-exclusion principle.
STEPS:
- Step 1: Calculate total 4-digit PINs with repetition allowed: \(10^4 = 10,000\).
- Step 2: Identify forbidden PINs: all four digits identical. There are 10 such PINs (0000, 1111, …, 9999).
- Step 3: Subtract forbidden from total: \(10,000 - 10 = 9,990\).
- Step 4: Verify no other restrictions apply.
ANSWER: 9,990 valid PINs.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A signal tower uses 3 different coloured flags (Red, Green, Blue) to send messages. A message consists of a sequence of 5 flags hoisted vertically. Repetition of colours is allowed. (a) How many different messages can be sent? (b) If the tower decides to add a new rule: "No two adjacent flags can be of the same colour", how many messages are possible now? Justify your method for part (b).
COMPETENCY: Comparing and justifying methods; adapting the counting principle to a new constraint.
STEPS:
- Step 1 (part a): \(n=3, r=5\) → \(3^5 = 243\) messages.
- Step 2 (part b): First flag: 3 choices. For each subsequent flag (positions 2–5): cannot be same as previous flag → 2 choices each.
- Step 3: Apply multiplication principle: \(3 \times 2 \times 2 \times 2 \times 2 = 3 \times 2^4 = 48\).
- Step 4: Compare: restriction reduces count from 243 to 48.
- Step 5: Justify: The constraint makes choices dependent (conditional on previous choice), so we cannot use \(n^r\); we use sequential conditional counting.
ANSWER: (a) 243 messages; (b) 48 messages.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are ______ a 4-digit PIN for your UPI payment app.

## DIAGNOSTIC_ANSWER_7
setting

**A wrong answer ("creating" or "choosing") reveals the student has paraphrased the walkthrough's participle - a 4-digit PIN is being set for the UPI payment app, repeats allowed.** Setting is the walkthrough's own participle, and the participle is what the blank grades. Recall the 10-options-per-digit count before filling, and fill the word exactly as written.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are setting a ______-digit PIN for your UPI payment app.

## DIAGNOSTIC_ANSWER_8
4

**A wrong answer (any other digit count) reveals the student has drifted from the walkthrough - the UPI PIN runs 4 digits long, each slot drawing from 0-9 with repeats welcome.** The length is the walkthrough's own figure, and the number is what the blank holds. Recall the 10 × 10 × 10 × 10 product before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
They can also solve multi-step word problems combining this concept with the Fundamental Principle of Counting.

**A wrong answer (naming only the formula) reveals the student has under-answered the mastery criterion.** Full mastery adds: identify when repetition is allowed, apply nʳ correctly, and distinguish these counts from ⁿPᵣ and from permutations of non-distinct objects - plus multi-step word problems combined with the counting principle.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: ______ you are setting a 4-digit PIN for your UPI payment app.

## DIAGNOSTIC_ANSWER_10
Imagine

**A wrong answer ("Suppose" or "Picture") reveals the student has paraphrased the walkthrough's opening word - the scene starts "Imagine you are setting a 4-digit PIN."** Scenario blanks repeat the walkthrough verbatim, and first words are exam currency in these blanks. Fill the exact opener, not a synonym, and let the PIN scene stand as written.
