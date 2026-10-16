## ELI5
A street magician asks you to think of a secret number, tells you to double it, add something, cut it in half — and then names your result. No mind-reading, just algebra wearing a cape: your secret number is a variable, each instruction is an operation, and when the steps are written as one expression and simplified, the variable cancels itself away, leaving a fixed constant no matter what you began with. The trick was designed backwards from that leftover constant.

## DEFINITION
A "Think of a Number" trick is a sequence of arithmetic operations performed on an unknown number (represented by a variable) that always produces a predictable result regardless of the starting number. The algebraic explanation uses a variable (e.g., \(x\)) to represent the unknown number, applies each operation step by step as an algebraic expression, and simplifies to show why the final result is constant or follows a specific pattern.
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can represent a number trick algebraically using a variable, perform the sequence of operations as algebraic manipulations, simplify the expression correctly, and explain why the trick works for any starting number. They can also identify the key step where the variable cancels out or becomes a constant.
## SCOPE_BOUNDARY
This node covers explaining given number tricks using algebra (single variable, linear operations only: addition, subtraction, multiplication, division by constants). It does NOT cover designing new tricks (covered in c8_math_ch13_2), tricks involving powers/roots, or tricks with multiple unknown numbers.
## WALKTHROUGH
Imagine your friend says: "Think of a number. Multiply it by 3. Add 6. Divide by 3. Subtract your original number. Your answer is 2!" You try it with 7 → 21 → 27 → 9 → 2. You try with 15 → 45 → 51 → 17 → 2. It works every time! How? We use algebra: let the unknown number be \(x\). Write each step as an expression: \(3x\), then \(3x + 6\), then \((3x + 6)/3 = x + 2\), then \((x + 2) - x = 2\). The \(x\) cancels out, leaving 2. This connects to Class 7's work on forming and simplifying algebraic expressions (c7_math_ch04_002, c7_math_ch04_006). The key insight: the trick works because the operations are designed to eliminate the variable.

Takeaway: every number trick is an expression in disguise — translate each spoken step into an operation on the variable, simplify in order, and the variable cancels, leaving a constant; that cancellation step is the trick's engine. Exam format: expect 'represent this trick algebraically and explain why it works' — the simplification must be shown line by line, ending at the constant. Verification beat: test the trick on a second starting number; if the result differs, your expression has an error. Why students miss it: they describe the steps in words instead of converting them into algebra — the explanation is the cancelled variable, not the story.

## DIAGNOSTIC_QUESTION_1
If the trick is "Think of a number. Double it. Add 10. Divide by 2. Subtract the original number," what is the algebraic expression after the "Add 10" step if the original number is \(x\)?
## DIAGNOSTIC_ANSWER_1
The correct expression is \(2x + 10\). A wrong answer like \(2(x + 10)\) or \(2x + 5\) reveals the student does not follow the sequence of operations in order or misapplies the distributive property. They may be combining steps incorrectly instead of building the expression step by step.
## DIAGNOSTIC_QUESTION_2
Explain why the trick "Think of a number. Multiply by 4. Add 8. Divide by 4. Subtract the original number" always gives the answer 2, using algebra.
## DIAGNOSTIC_ANSWER_2
Let the number be \(x\). Steps: \(4x \rightarrow 4x + 8 \rightarrow (4x + 8)/4 = x + 2 \rightarrow (x + 2) - x = 2\). The variable \(x\) cancels in the final subtraction, leaving the constant 2. A wrong explanation that just says "it always gives 2" without showing the algebraic cancellation reveals the student cannot connect the arithmetic steps to algebraic manipulation. They may not see that dividing \(4x + 8\) by 4 gives \(x + 2\) (distributive property).
## DIAGNOSTIC_QUESTION_3
A trick says: "Think of a number. Add 5. Multiply by 3. Subtract 9. Divide by 3. Subtract the original number." If you start with 12, what is the final answer? Show the algebraic working to prove it works for any number.
## DIAGNOSTIC_ANSWER_3
Arithmetic with 12: \(12 + 5 = 17\), \(17 \times 3 = 51\), \(51 - 9 = 42\), \(42 / 3 = 14\), \(14 - 12 = 2\). Algebraic: \(x \rightarrow x + 5 \rightarrow 3(x + 5) = 3x + 15 \rightarrow 3x + 15 - 9 = 3x + 6 \rightarrow (3x + 6)/3 = x + 2 \rightarrow (x + 2) - x = 2\). Final answer is always 2. A wrong answer (e.g., 3 or 5) or incorrect algebra (e.g., \(3x + 5\) instead of \(3(x + 5)\)) reveals the student either miscalculates the arithmetic or fails to apply the distributive property correctly when multiplying the binomial by 3.
## DIAGNOSTIC_QUESTION_4
Compare these two tricks:
Trick A: "Think of a number. Multiply by 2. Add 6. Divide by 2. Subtract the original number."
Trick B: "Think of a number. Add 3. Multiply by 2. Divide by 2. Subtract the original number."
Do they give the same final answer? Explain using algebra.
## DIAGNOSTIC_ANSWER_4
Trick A: \(x \rightarrow 2x \rightarrow 2x + 6 \rightarrow (2x + 6)/2 = x + 3 \rightarrow (x + 3) - x = 3\). Trick B: \(x \rightarrow x + 3 \rightarrow 2(x + 3) = 2x + 6 \rightarrow (2x + 6)/2 = x + 3 \rightarrow (x + 3) - x = 3\). Both give 3. The operations are commutative in effect (multiply then add vs add then multiply) because of the distributive property. A wrong answer saying they are different reveals the student does not recognize that \(2(x + 3) = 2x + 6\) and that the sequence of operations can be rearranged while preserving the result. They may treat the tricks as completely separate without algebraic comparison.
## DIAGNOSTIC_QUESTION_5
A student claims: "In the trick 'Think of a number. Multiply by 5. Add 15. Divide by 5. Subtract the original number,' the answer is always 15 because you added 15." Evaluate this claim and correct the error.
## DIAGNOSTIC_ANSWER_5
The claim is false. Algebraic working: \(x \rightarrow 5x \rightarrow 5x + 15 \rightarrow (5x + 15)/5 = x + 3 \rightarrow (x + 3) - x = 3\). The answer is 3, not 15. The student's error is ignoring the division step: adding 15 then dividing by 5 reduces the added amount to 3. A wrong evaluation that agrees with the student reveals they do not track how each operation transforms the expression, especially how division distributes over addition. They focus on the number "15" added rather than its algebraic effect.
## DIAGNOSTIC_QUESTION_6
Create your own "Think of a Number" trick that always gives the answer 7. Write the trick in words, then prove it works using algebra with variable \(x\).
## DIAGNOSTIC_ANSWER_6
Example trick: "Think of a number. Multiply by 4. Add 28. Divide by 4. Subtract the original number." Algebraic proof: \(x \rightarrow 4x \rightarrow 4x + 28 \rightarrow (4x + 28)/4 = x + 7 \rightarrow (x + 7) - x = 7\). A good answer shows a valid sequence where the constant added is a multiple of the multiplier (here 28 = 4 × 7) so that division yields \(x + 7\). A poor answer might have mismatched operations (e.g., multiply by 3, add 28, divide by 4) that don't simplify to a constant, or the algebra doesn't cancel \(x\), revealing the student doesn't understand the structural requirement for the variable to disappear.
## COMMON_MISCONCEPTION
Students often write the algebraic expression incorrectly when a multiplication step follows an addition step. For example, in "Think of a number. Add 5. Multiply by 3," they write \(x + 5 \times 3\) or \(3x + 5\) instead of \(3(x + 5) = 3x + 15\). They treat the operations as separate on the original \(x\) rather than applying the multiplication to the entire current expression. This stems from not using parentheses to group the expression before multiplying, and from not recognizing that "multiply by 3" applies to the result of the previous step, not just the original number.
## ON_FAILURE
If a student writes \(x + 5 \times 3\) for "Add 5, then multiply by 3", do this: (1) Have them act out the trick with a specific number, say 4: \(4 + 5 = 9\), \(9 \times 3 = 27\). (2) Show that \(x + 5 \times 3\) with \(x = 4\) gives \(4 + 15 = 19\), not 27. (3) Explain: "The multiplication applies to the WHOLE result so far, not just the 5. We need brackets: \(3 \times (x + 5)\)." (4) Practice 3 similar tricks step by step, insisting on writing the expression after each step with brackets where needed, then simplifying.
## PREREQUISITE_NODE_IDS
c6_math_ch05_052, c6_math_ch05_053, c6_math_ch05_054, c6_math_ch05_055, c7_math_ch04_001, c7_math_ch04_002, c7_math_ch04_006
## PREREQUISITE_REASONS
c6_math_ch05_052: Introduces variables as placeholders for unknown numbers, essential for representing "the number you thought of".
c6_math_ch05_053: Teaches terms and coefficients, needed to understand expressions like \(3x + 15\).
c6_math_ch05_054: Covers forming algebraic expressions from word statements, directly used to translate each trick step.
c6_math_ch05_055: Simplifying expressions (combining like terms, distributive property) is required to reduce \(3(x+5)\) to \(3x+15\).
c7_math_ch04_001: Reinforces letter-numbers as variables in algebraic contexts.
c7_math_ch04_002: Deepens understanding of terms, coefficients, constants in algebraic expressions.
c7_math_ch04_006: Provides practice simplifying algebraic expressions by combining like terms, crucial for the final cancellation step.
## FORWARD_NODE_IDS
c8_math_ch13_2, c8_math_ch13_3, c8_math_ch13_4
## FORWARD_REASONS
c8_math_ch13_2: Designing tricks requires understanding how operations affect the algebraic expression, which is learned here by analyzing given tricks.
c8_math_ch13_3: Number pyramids use the same principle of representing unknowns with variables and tracking operations algebraically.
c8_math_ch13_4: Solving pyramids algebraically builds directly on the skill of writing and simplifying expressions for sequential operations.
## CROSS_SUBJECT_PREREQS
c6_math_ch05_056, c6_math_ch05_059, c7_math_ch15_002
## CROSS_SUBJECT_REASONS
c6_math_ch05_056: Linear equations in one variable provide the foundation for solving for unknowns, which underpins the "think of a number" concept.
c6_math_ch05_059: The balance model of equations helps visualize why operations must be applied to both sides/expressions equally.
c7_math_ch15_002: Finding the unknown by balancing both sides is the core algebraic reasoning used to verify the trick's result.
## CHAIN_DESCRIPTION
c6_math_ch05_052 -> c7_math_ch04_006 -> c8_math_ch13_1 -> c8_math_ch13_2 -> c8_math_ch13_4
## THIS_FORMULA
N/A - conceptual (algebraic manipulation sequence: \(x \xrightarrow{\text{ops}} \text{expression} \xrightarrow{\text{simplify}} \text{constant}\))
## FORMULA_VARIABLES
N/A
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT

## PREREQ_CONCEPT
Forming and simplifying algebraic expressions using variables, particularly the distributive property \(a(b + c) = ab + ac\) and combining like terms.
## PREREQ_BEFORE
The student must be able to write an algebraic expression for a sequence of arithmetic operations (e.g., "add 5, multiply by 3" → \(3(x + 5)\)) and simplify it correctly using the distributive property.
## PREREQ_STUCK
Review c7_math_ch04_006 (Simplification of Algebraic Expressions: Like Terms) and c6_math_ch05_055 (Simplifying Algebraic Expressions) with focus on the distributive property and order of operations in expressions.
## WORKED_EXAMPLE_1
PROBLEM: A magician says: "Think of a number. Multiply it by 6. Add 24. Divide by 6. Subtract your original number. Tell me your final answer." Prove algebraically that the answer is always 4, no matter what number is chosen.

STEPS:
- Step 1: Let the unknown number be \(x\). Write down the starting expression: \(x\).
- Step 2: Apply "Multiply by 6" → \(6x\). Apply "Add 24" → \(6x + 24\).
- Step 3: Apply "Divide by 6" → \((6x + 24) / 6\). Use distributive property: \(6x/6 + 24/6 = x + 4\).
- Step 4: Apply "Subtract the original number" → \((x + 4) - x\). Combine like terms: \(x - x + 4 = 4\).
- Step 5: The final expression is 4, a constant with no \(x\). This proves the trick always gives 4.

REASONING: Each step transforms the algebraic expression. The key is dividing the entire expression \(6x + 24\) by 6, which distributes to both terms. The subtraction step cancels the variable \(x\) because we subtract the original \(x\) from the current expression \(x + 4\). This cancellation is why the result is independent of the starting number.

ANSWER: The final answer is always 4.
## WORKED_EXAMPLE_2
PROBLEM: Verify if this trick always gives the same answer: "Think of a number. Add 7. Multiply by 2. Subtract 14. Divide by 2. Subtract the original number." If yes, what is the constant answer?

STEPS:
- Step 1: Let the number be \(x\). Start with \(x\).
- Step 2: "Add 7" → \(x + 7\). "Multiply by 2" → \(2(x + 7)\). Simplify using distributive property: \(2x + 14\).
- Step 3: "Subtract 14" → \(2x + 14 - 14 = 2x\). "Divide by 2" → \(2x / 2 = x\).
- Step 4: "Subtract the original number" → \(x - x = 0\).
- Step 5: The final result is 0, a constant. The trick always gives 0.

REASONING: This trick is designed so that the added 7 gets multiplied by 2 to become 14, which is then subtracted, leaving just \(2x\). Dividing by 2 returns \(x\), and subtracting the original \(x\) yields 0. Notice how the constants (7, 14) are chosen to cancel out perfectly. The algebraic working shows the constant terms eliminate each other before the variable cancels.

ANSWER: The trick always gives 0.
## WORKED_EXAMPLE_3
PROBLEM: A trick claims: "Think of a number. Multiply by 3. Add 12. Divide by 3. Add 5. Subtract the original number." The magician says the answer will be 9. Is the magician correct? If not, what is the actual constant answer? Show full algebraic working.

STEPS:
- Step 1: Let the number be \(x\). Initial expression: \(x\).
- Step 2: "Multiply by 3" → \(3x\). "Add 12" → \(3x + 12\).
- Step 3: "Divide by 3" → \((3x + 12) / 3 = 3x/3 + 12/3 = x + 4\).
- Step 4: "Add 5" → \(x + 4 + 5 = x + 9\).
- Step 5: "Subtract the original number" → \((x + 9) - x = 9\).
- Step 6: The final expression simplifies to 9. The magician is correct.

REASONING: This trick combines two constant additions: +12 before division (which becomes +4 after dividing by 3) and +5 after division. The total constant added to \(x\) before the final subtraction is \(4 + 5 = 9\). The variable \(x\) survives until the last step where it cancels. This shows how multiple constant operations accumulate and how division distributes over addition.

ANSWER: The magician is correct; the answer is always 9.
## COMPETENCY_QUESTION_1
QUESTION: Your friend shows you this trick: "Think of a number. Double it. Add 8. Divide by 2. Add 3. Subtract the original number." She says the answer is always 7. Without doing the trick with a specific number, use algebra to check if she is right. Explain each step of your reasoning.

COMPETENCY: Translating real-world situations to mathematical expressions and justifying conclusions

STEPS:
- Step 1: Represent the unknown number as \(x\).
- Step 2: Write the algebraic expression after each instruction: double → \(2x\); add 8 → \(2x + 8\); divide by 2 → \((2x + 8)/2 = x + 4\); add 3 → \(x + 4 + 3 = x + 7\); subtract original → \((x + 7) - x\).
- Step 3: Simplify the final expression: \(x + 7 - x = 7\).
- Step 4: Conclude that the constant is 7, so your friend is correct.

ANSWER: Yes, your friend is correct. The algebraic simplification shows the final expression is always 7, independent of \(x\). The operations "double then add 8 then divide by 2" are equivalent to "add 4" (since \(8/2 = 4\)), and adding 3 more gives 7 before subtracting the original number.

DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two students, Rahul and Priya, analyze the trick: "Think of a number. Multiply by 5. Add 20. Divide by 5. Subtract the original number."
Rahul says: "The answer is 20 because you added 20."
Priya says: "The answer is 4 because 20 divided by 5 is 4."
Who is correct? Use algebra to prove your answer and explain the error in the other student's reasoning.

COMPETENCY: Error identification and correction; comparing and justifying mathematical arguments

STEPS:
- Step 1: Let the number be \(x\). Build the expression stepwise: \(5x \rightarrow 5x + 20 \rightarrow (5x + 20)/5 \rightarrow (5x + 20)/5 - x\).
- Step 2: Simplify the division: \((5x + 20)/5 = x + 4\).
- Step 3: Subtract \(x\): \((x + 4) - x = 4\).
- Step 4: Priya is correct (answer is 4). Rahul's error: he ignored the division step. Adding 20 then dividing by 5 means the effective addition is \(20/5 = 4\), not 20.
- Step 5: Explain that every operation affects the entire current expression, not just the last number added.

ANSWER: Priya is correct. The algebraic working proves the final result is 4. Rahul mistakenly thought the added 20 remains unchanged, but the division by 5 distributes over the sum \(5x + 20\), reducing the constant term from 20 to 4 before the variable cancels.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A "Think of a Number" trick is a sequence of arithmetic operations performed on an unknown number (______ by a variable) that always produces a predictable result regardless of the starting number.

## DIAGNOSTIC_ANSWER_7
represented

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Your ______ is 2!" You try it with 7 → 21 → 27 → 9 → 2.

## DIAGNOSTIC_ANSWER_8
answer

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can represent a number trick algebraically using a variable, perform the sequence of operations as algebraic manipulations, simplify the expression correctly, and explain why the trick works for any starting number.
