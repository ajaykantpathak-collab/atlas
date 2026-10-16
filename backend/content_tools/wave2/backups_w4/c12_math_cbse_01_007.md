## ELI5
A thermostat that converts Celsius to Fahrenheit can be run backwards - dial the Fahrenheit reading and recover the Celsius - but only because the mapping never shares outputs and never misses one. A function is invertible exactly when it is bijective: its inverse f-inverse runs the machine in reverse, and the two undo each other - f-inverse of f of x gives x back, and f of f-inverse of y returns y. One shared output or one missed output, and reverse gear simply does not exist.

## DEFINITION
A function \( f: X \to Y \) is said to be **invertible** if there exists a function \( g: Y \to X \) such that \( g \circ f = I_X \) and \( f \circ g = I_Y \), where \( I_X \) and \( I_Y \) are identity functions on \( X \) and \( Y \) respectively. The function \( g \) is called the **inverse** of \( f \) and is denoted by \( f^{-1} \). A function is invertible if and only if it is both one‑one (injective) and onto (surjective), i.e., bijective.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) state the precise definition of an invertible function and its inverse, (2) determine whether a given function is invertible by verifying it is one‑one and onto, (3) algebraically find the inverse of an invertible function by solving \( y = f(x) \) for \( x \), and (4) verify the inverse by checking \( f^{-1}(f(x)) = x \) and \( f(f^{-1}(y)) = y \).

## SCOPE_BOUNDARY
This node covers the definition of invertible functions, the necessary and sufficient condition (bijectivity), algebraic determination of inverses for explicit functions (linear, rational, quadratic with restricted domains), and verification of inverses. It does NOT cover inverse trigonometric functions (Chapter 2), graphical reflection across \( y = x \), or inverse elements in binary operations (later nodes). The scope is limited to Class 12 NCERT Chapter 1, Section 1.4 up to Example 17.

## WALKTHROUGH
Imagine you have a formula that converts Celsius to Fahrenheit: \( F = \frac{9}{5}C + 32 \). If you are given a Fahrenheit temperature and need the Celsius value, you must "reverse" the process. This reversal is exactly what an inverse function does. Start by recalling that a function is a special relation where each input has exactly one output. To reverse it, every output must come from exactly one input — this means the original function must be both one‑one and onto. Write down the condition: \( f \) is invertible \( \iff \) \( f \) is bijective. Then, to find the inverse, set \( y = f(x) \), solve for \( x \) in terms of \( y \), and swap variable names. The key insight is that the inverse function undoes the action of \( f \), so \( f^{-1}(f(x)) = x \) and \( f(f^{-1}(y)) = y \).

Takeaway first: invertibility is bijectivity wearing work clothes - and the practical recipe is set y equal to f(x), solve for x, then swap names. Exam moves: definition questions on the inverse and its two identity compositions, existence questions verifying one-one and onto before inverting, algebra questions finding f-inverse, and verification questions checking both undo-identities. Method: rerun the thermometer - convert, then reverse the arithmetic step by step - and confirm the round trip returns the starting temperature. Check yourself: f-inverse means the inverse function, never one over f; the notation trap is half the marks in this node. Drill: find one inverse algebraically and verify it with both compositions.

## DIAGNOSTIC_QUESTION_1
State the definition of an invertible function and write the condition that a function \( f: X \to Y \) must satisfy to have an inverse.

## DIAGNOSTIC_ANSWER_1
A function \( f: X \to Y \) is invertible if there exists a function \( g: Y \to X \) such that \( g \circ f = I_X \) and \( f \circ g = I_Y \). The function \( g \) is called the inverse of \( f \), denoted \( f^{-1} \). The necessary and sufficient condition is that \( f \) is bijective (both one‑one and onto).  
A wrong answer (e.g., saying only one‑one is enough, or confusing \( f^{-1} \) with \( 1/f \)) reveals that the student has not grasped the two‑way nature of invertibility or the notation.

## DIAGNOSTIC_QUESTION_2
Explain why the function \( f: \mathbb{R} \to \mathbb{R} \) defined by \( f(x) = x^2 \) is NOT invertible, but the function \( g: [0, \infty) \to [0, \infty) \) defined by \( g(x) = x^2 \) IS invertible. What property does the domain restriction change?

## DIAGNOSTIC_ANSWER_2
\( f(x) = x^2 \) on \( \mathbb{R} \) is not one‑one because \( f(-1) = f(1) = 1 \); distinct inputs give the same output, so it cannot have an inverse. Restricting the domain to \( [0, \infty) \) makes \( g \) one‑one (since \( x \ge 0 \) implies \( x^2 = y^2 \Rightarrow x = y \)) and onto \( [0, \infty) \) (every non‑negative real has a square root). The restriction removes the symmetry that caused many‑one behaviour.  
A wrong answer that only mentions "domain change" without linking to one‑one/onto shows the student does not connect domain restriction to bijectivity.

## DIAGNOSTIC_QUESTION_3
Find the inverse of the function \( f: \mathbb{R} \setminus \{2\} \to \mathbb{R} \setminus \{1\} \) defined by \( f(x) = \frac{x+1}{x-2} \). Show all steps.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Check bijectivity. For one‑one: assume \( f(x_1) = f(x_2) \Rightarrow \frac{x_1+1}{x_1-2} = \frac{x_2+1}{x_2-2} \). Cross‑multiply: \( (x_1+1)(x_2-2) = (x_2+1)(x_1-2) \Rightarrow x_1x_2 - 2x_1 + x_2 - 2 = x_1x_2 - 2x_2 + x_1 - 2 \Rightarrow -2x_1 + x_2 = -2x_2 + x_1 \Rightarrow 3x_2 = 3x_1 \Rightarrow x_1 = x_2 \). For onto: let \( y \in \mathbb{R} \setminus \{1\} \). Solve \( y = \frac{x+1}{x-2} \) for \( x \): \( y(x-2) = x+1 \Rightarrow yx - 2y = x+1 \Rightarrow yx - x = 2y+1 \Rightarrow x(y-1) = 2y+1 \Rightarrow x = \frac{2y+1}{y-1} \). Since \( y \neq 1 \), \( x \) is defined and \( x \neq 2 \) (check: \( \frac{2y+1}{y-1} = 2 \Rightarrow 2y+1 = 2y-2 \Rightarrow 1 = -2 \), impossible). Hence \( f \) is bijective.  
**Step 2:** From the onto proof, we already have \( x = \frac{2y+1}{y-1} \).  
**Step 3:** Write inverse: \( f^{-1}(y) = \frac{2y+1}{y-1} \), or with variable \( x \), \( f^{-1}(x) = \frac{2x+1}{x-1} \).  
**Step 4:** Verify: \( f^{-1}(f(x)) = f^{-1}\left(\frac{x+1}{x-2}\right) = \frac{2\left(\frac{x+1}{x-2}\right)+1}{\left(\frac{x+1}{x-2}\right)-1} = \frac{2(x+1)+(x-2)}{(x+1)-(x-2)} = \frac{3x}{3} = x \). Similarly \( f(f^{-1}(y)) = y \).  
A wrong answer often makes an algebraic slip when cross‑multiplying or forgets to exclude the points \( x=2, y=1 \) from domain/codomain, showing incomplete understanding of domain restrictions.

## DIAGNOSTIC_QUESTION_4
Consider the functions \( f_1: \mathbb{R} \to \mathbb{R}, f_1(x) = 2x+3 \) and \( f_2: \mathbb{R} \to \mathbb{R}, f_2(x) = x^3 - x \). Without finding explicit formulas, determine which of these functions are invertible. Justify your answer using properties of derivatives or algebraic reasoning.

## DIAGNOSTIC_ANSWER_4
\( f_1(x) = 2x+3 \) is a linear function with non‑zero slope (2). It is strictly increasing, hence one‑one. As a linear function with non‑zero slope, its range is all of \( \mathbb{R} \), so it is onto. Therefore \( f_1 \) is bijective and invertible.  
\( f_2(x) = x^3 - x \). Its derivative is \( f_2'(x) = 3x^2 - 1 \), which changes sign (e.g., \( f_2'(0) = -1 < 0 \), \( f_2'(1) = 2 > 0 \)), so \( f_2 \) is not monotonic. Hence it is not one‑one (e.g., \( f_2(0) = 0 \), \( f_2(1) = 0 \)). Although its range is \( \mathbb{R} \) (since it is a cubic with positive leading coefficient), it fails one‑one, so it is NOT invertible on \( \mathbb{R} \).  
A wrong answer that claims both are invertible because they are "polynomials" or "cubics are always onto" shows the student confuses onto with one‑one and does not check monotonicity.

## DIAGNOSTIC_QUESTION_5
A student claims that the inverse of \( f(x) = \frac{3x-2}{5} \) is \( f^{-1}(x) = \frac{5x+2}{3} \). Evaluate this claim. If it is incorrect, identify the exact error and give the correct inverse.

## DIAGNOSTIC_ANSWER_5
The student's claim is **incorrect**.  
**Correct steps:** Set \( y = \frac{3x-2}{5} \). Multiply by 5: \( 5y = 3x - 2 \). Add 2: \( 5y + 2 = 3x \). Divide by 3: \( x = \frac{5y+2}{3} \). Thus \( f^{-1}(y) = \frac{5y+2}{3} \), i.e., \( f^{-1}(x) = \frac{5x+2}{3} \).  
Wait — the student wrote exactly that! Let's re‑check: \( f(x) = \frac{3x-2}{5} \). The student's \( f^{-1}(x) = \frac{5x+2}{3} \). That is actually **correct**. The student's claim is right. (If the student had written \( \frac{5x-2}{3} \) or \( \frac{3x+2}{5} \), those would be wrong.)  
A wrong evaluation (saying it's incorrect when it's correct) reveals the student cannot verify inverses by composition. The verification step \( f^{-1}(f(x)) = \frac{5\left(\frac{3x-2}{5}\right)+2}{3} = \frac{3x-2+2}{3} = x \) confirms correctness.

## DIAGNOSTIC_QUESTION_6
Construct a function \( f: A \to A \) where \( A = \{1, 2, 3, 4\} \) that is invertible but NOT the identity function. Write \( f \) as a set of ordered pairs, then write its inverse \( f^{-1} \) as a set of ordered pairs. Explain why your \( f \) is invertible.

## DIAGNOSTIC_ANSWER_6
One example: \( f = \{(1,2), (2,3), (3,4), (4,1)\} \). This is a permutation (cyclic shift). It is one‑one because all outputs are distinct; it is onto because every element of \( A \) appears as an output. Hence it is bijective and invertible. Its inverse is \( f^{-1} = \{(2,1), (3,2), (4,3), (1,4)\} \) (reverse each ordered pair).  
A poor answer might give a non‑bijective mapping (e.g., \( \{(1,2), (2,2), (3,4), (4,1)\} \)) or fail to reverse the pairs correctly, showing the student does not understand that invertibility on finite sets is equivalent to being a permutation.

## COMMON_MISCONCEPTION
The most persistent error is confusing the notation \( f^{-1}(x) \) with the reciprocal \( \frac{1}{f(x)} \). For example, given \( f(x) = 2x+3 \), a student writes \( f^{-1}(x) = \frac{1}{2x+3} \). This is wrong because \( f^{-1} \) denotes the inverse function, not the multiplicative inverse. Another frequent mistake: when solving \( y = \frac{ax+b}{cx+d} \) for \( x \), students incorrectly cross‑multiply as \( y(cx+d) = ax+b \) but then write \( ycx + yd = ax+b \) and fail to collect \( x \) terms properly, leading to \( x = \frac{b-yd}{yc-a} \) instead of \( x = \frac{b-yd}{yc-a} \) (sign errors). Also, many forget to check that the domain/codomain restrictions (like \( x \neq 2 \) in the rational example) are preserved in the inverse.

## ON_FAILURE
If a student confuses \( f^{-1} \) with reciprocal, immediately contrast the two notations: \( f^{-1}(x) \) means "the function that undoes \( f \)", while \( [f(x)]^{-1} = \frac{1}{f(x)} \) means the reciprocal. Use a simple example: \( f(x) = 2x \), then \( f^{-1}(x) = x/2 \) but \( 1/f(x) = 1/(2x) \). Show that \( f^{-1}(f(3)) = 3 \) while \( 1/f(3) = 1/6 \). For algebraic slips in solving for \( x \), enforce a step‑by‑step checklist: (1) write \( y = f(x) \), (2) perform the same operation on both sides, (3) collect all \( x \) terms on one side, (4) factor out \( x \), (5) divide by the coefficient of \( x \), (6) state the inverse with the correct domain. Re‑visit the prerequisite nodes on solving linear and rational equations (Class 11 algebra) and the bijectivity checks (nodes c12_math_cbse_01_003, c12_math_cbse_01_004, c12_math_cbse_01_005).

## PREREQUISITE_NODE_IDS
c12_math_cbse_01_003, c12_math_cbse_01_004, c12_math_cbse_01_005, c12_math_cbse_01_006, c11_math_cbse_02_005, c11_math_cbse_02_011
## PREREQUISITE_REASONS
c12_math_cbse_01_003: One‑one (injective) definition is needed to check the first condition for invertibility.  
c12_math_cbse_01_004: Onto (surjective) definition is needed for the second condition.  
c12_math_cbse_01_005: Bijective functions combine both properties; the theorem "invertible iff bijective" is central.  
c12_math_cbse_01_006: Composition of functions is used to define \( g \circ f = I_X \) and \( f \circ g = I_Y \).  
c11_math_cbse_02_005: Basic definition of a function, domain, codomain, range.  
c11_math_cbse_02_011: Graphs of functions help visualise one‑one/onto (horizontal line test) and the reflection property of inverses.

## FORWARD_NODE_IDS
c12_math_cbse_01_010
## FORWARD_REASONS
c12_math_cbse_01_010: Identity and inverse elements in binary operations generalise the concept of inverse functions to abstract algebraic structures; the idea of an inverse element mirrors \( f^{-1} \).

## CROSS_SUBJECT_PREREQS
c11_math_cbse_02_005, c11_math_cbse_13_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_02_005: Functions are the fundamental language of physics (e.g., position as a function of time); invertibility corresponds to being able to uniquely determine time from position.  
c11_math_cbse_13_006: The derivative of an inverse function \( (f^{-1})'(y) = 1/f'(x) \) is a key calculus tool used in physics (e.g., inverse kinematics) and economics (marginal analysis).

## CHAIN_DESCRIPTION
c12_math_cbse_01_005 -> c12_math_cbse_01_007 -> c12_math_cbse_01_010

## THIS_FORMULA
\( f: X \to Y \) is invertible \( \iff \) \( f \) is bijective. The inverse \( f^{-1}: Y \to X \) satisfies \( f^{-1}(f(x)) = x \, \forall x \in X \) and \( f(f^{-1}(y)) = y \, \forall y \in Y \).

## FORMULA_VARIABLES
\( x \) = element of domain \( X \); \( y \) = element of codomain \( Y \); \( f \) = original function; \( f^{-1} \) = inverse function.

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_02_005 | Functions model physical relationships (e.g., velocity as a function of time); invertibility means we can recover time from velocity.
c11_math_cbse_13_006 | The inverse function theorem in calculus uses the derivative of the inverse, which is the reciprocal of the derivative of the original function.
## PREREQ_CONCEPT
Bijective functions (one‑one and onto) and composition of functions.

## PREREQ_BEFORE
Student must be able to prove a function is one‑one and onto, and compute compositions \( g \circ f \) and \( f \circ g \).

## PREREQ_STUCK
Revisit nodes c12_math_cbse_01_003 (one‑one), c12_math_cbse_01_004 (onto), c12_math_cbse_01_005 (bijective), and c12_math_cbse_01_006 (composition).

## WORKED_EXAMPLE_1
PROBLEM: The temperature in a laboratory is recorded in Celsius. The conversion to Fahrenheit is given by the function \( f: \mathbb{R} \to \mathbb{R} \), \( f(C) = \frac{9}{5}C + 32 \). Find the inverse function that converts Fahrenheit back to Celsius, and verify it.

STEPS:
- Step 1: Check if \( f \) is invertible. \( f \) is linear with slope \( 9/5 \neq 0 \), so it is strictly increasing, hence one‑one. For any \( F \in \mathbb{R} \), we can solve \( F = \frac{9}{5}C + 32 \) for \( C \), giving \( C = \frac{5}{9}(F - 32) \), so \( f \) is onto \( \mathbb{R} \). Thus \( f \) is bijective and invertible.
- Step 2: Set \( F = f(C) = \frac{9}{5}C + 32 \).
- Step 3: Solve for \( C \): Subtract 32: \( F - 32 = \frac{9}{5}C \). Multiply by \( \frac{5}{9} \): \( C = \frac{5}{9}(F - 32) \).
- Step 4: Write the inverse function: \( f^{-1}(F) = \frac{5}{9}(F - 32) \). Using variable \( x \), \( f^{-1}(x) = \frac{5}{9}(x - 32) \).
- Step 5: Verify: \( f^{-1}(f(C)) = \frac{5}{9}\left(\frac{9}{5}C + 32 - 32\right) = \frac{5}{9} \cdot \frac{9}{5}C = C \). And \( f(f^{-1}(F)) = \frac{9}{5}\left(\frac{5}{9}(F - 32)\right) + 32 = F - 32 + 32 = F \).

REASONING: The steps follow the standard algebraic method: because \( f \) is bijective, we can uniquely solve \( y = f(x) \) for \( x \). The verification confirms the two defining properties of an inverse function.

ANSWER: \( f^{-1}(x) = \frac{5}{9}(x - 32) \) (or \( f^{-1}(F) = \frac{5}{9}(F - 32) \)).

## WORKED_EXAMPLE_2
PROBLEM: Let \( f: \mathbb{R} \setminus \{3\} \to \mathbb{R} \setminus \{2\} \) be defined by \( f(x) = \frac{2x-1}{x-3} \). Prove \( f \) is invertible and find \( f^{-1} \).

STEPS:
- Step 1: Show \( f \) is one‑one. Assume \( f(x_1) = f(x_2) \): \( \frac{2x_1-1}{x_1-3} = \frac{2x_2-1}{x_2-3} \). Cross‑multiply: \( (2x_1-1)(x_2-3) = (2x_2-1)(x_1-3) \). Expand: \( 2x_1x_2 - 6x_1 - x_2 + 3 = 2x_1x_2 - 6x_2 - x_1 + 3 \). Cancel \( 2x_1x_2 \) and 3: \( -6x_1 - x_2 = -6x_2 - x_1 \Rightarrow -5x_1 = -5x_2 \Rightarrow x_1 = x_2 \). So \( f \) is one‑one.
- Step 2: Show \( f \) is onto. Let \( y \in \mathbb{R} \setminus \{2\} \). Solve \( y = \frac{2x-1}{x-3} \) for \( x \): \( y(x-3) = 2x-1 \Rightarrow yx - 3y = 2x - 1 \Rightarrow yx - 2x = 3y - 1 \Rightarrow x(y-2) = 3y - 1 \Rightarrow x = \frac{3y-1}{y-2} \). Since \( y \neq 2 \), \( x \) is defined. Check \( x \neq 3 \): \( \frac{3y-1}{y-2} = 3 \Rightarrow 3y-1 = 3y-6 \Rightarrow -1 = -6 \), impossible. Hence every \( y \) has a pre‑image, so \( f \) is onto.
- Step 3: From the onto proof, \( x = \frac{3y-1}{y-2} \). Thus \( f^{-1}(y) = \frac{3y-1}{y-2} \), i.e., \( f^{-1}(x) = \frac{3x-1}{x-2} \), with domain \( \mathbb{R} \setminus \{2\} \) and codomain \( \mathbb{R} \setminus \{3\} \).
- Step 4: Verify: \( f^{-1}(f(x)) = f^{-1}\left(\frac{2x-1}{x-3}\right) = \frac{3\left(\frac{2x-1}{x-3}\right)-1}{\left(\frac{2x-1}{x-3}\right)-2} = \frac{3(2x-1)-(x-3)}{(2x-1)-2(x-3)} = \frac{6x-3-x+3}{2x-1-2x+6} = \frac{5x}{5} = x \). Similarly \( f(f^{-1}(y)) = y \).

REASONING: The function is a linear fractional transformation. The domain/codomain exclusions are exactly the values that make the denominator zero in \( f \) and \( f^{-1} \). The algebraic manipulation is straightforward but requires careful handling of the excluded points.

ANSWER: \( f^{-1}(x) = \frac{3x-1}{x-2} \), with domain \( \mathbb{R} \setminus \{2\} \) and codomain \( \mathbb{R} \setminus \{3\} \).

## WORKED_EXAMPLE_3
PROBLEM: The function \( f: [-1, \infty) \to [-1, \infty) \) is defined by \( f(x) = x^2 + 2x \). Find its inverse. (Hint: complete the square.)

STEPS:
- Step 1: Check bijectivity on the given domain and codomain. Rewrite \( f(x) = x^2 + 2x = (x+1)^2 - 1 \). On \( [-1, \infty) \), \( x+1 \ge 0 \), so \( f \) is strictly increasing (derivative \( 2x+2 \ge 0 \)), hence one‑one. The minimum value is \( f(-1) = -1 \), and as \( x \to \infty \), \( f(x) \to \infty \), so the range is exactly \( [-1, \infty) \), matching the codomain. Thus \( f \) is onto. Therefore \( f \) is bijective.
- Step 2: Set \( y = (x+1)^2 - 1 \).
- Step 3: Solve for \( x \): \( y + 1 = (x+1)^2 \). Since \( x \ge -1 \), \( x+1 \ge 0 \), take the non‑negative square root: \( x+1 = \sqrt{y+1} \). So \( x = \sqrt{y+1} - 1 \).
- Step 4: Write inverse: \( f^{-1}(y) = \sqrt{y+1} - 1 \), i.e., \( f^{-1}(x) = \sqrt{x+1} - 1 \), with domain \( [-1, \infty) \) and codomain \( [-1, \infty) \).
- Step 5: Verify: \( f^{-1}(f(x)) = \sqrt{(x^2+2x)+1} - 1 = \sqrt{x^2+2x+1} - 1 = \sqrt{(x+1)^2} - 1 \). Because \( x \ge -1 \), \( \sqrt{(x+1)^2} = x+1 \), so result is \( x \). And \( f(f^{-1}(x)) = (\sqrt{x+1} - 1)^2 + 2(\sqrt{x+1} - 1) = (x+1) - 2\sqrt{x+1} + 1 + 2\sqrt{x+1} - 2 = x \).
- Step 6: Note that the domain restriction \( x \ge -1 \) was essential; without it, \( f \) would not be one‑one and the square root step would require a \( \pm \) sign.

REASONING: Quadratic functions are not one‑one on \( \mathbb{R} \), but restricting the domain to one side of the vertex makes them strictly monotonic and hence invertible. Completing the square reveals the vertex and simplifies solving for \( x \).

ANSWER: \( f^{-1}(x) = \sqrt{x+1} - 1 \), for \( x \in [-1, \infty) \).

## COMPETENCY_QUESTION_1
QUESTION: A school uses a function \( f: \{1,2,3,4,5\} \to \{1,2,3,4,5\} \) to encode student roll numbers for a secret survey. The encoding is given by \( f(1)=3, f(2)=5, f(3)=1, f(4)=4, f(5)=2 \). (a) Show that \( f \) is invertible. (b) Write the inverse function \( f^{-1} \) as a set of ordered pairs. (c) If a survey response carries the encoded number 4, what was the original roll number?

COMPETENCY: Translating real-world situations to mathematical expressions and applying the definition of inverse on finite sets.

STEPS:
- Step 1: List the ordered pairs of \( f \): \( \{(1,3), (2,5), (3,1), (4,4), (5,2)\} \).
- Step 2: Check one‑one: all outputs (3,5,1,4,2) are distinct. Check onto: the set of outputs is exactly \( \{1,2,3,4,5\} \). Hence \( f \) is bijective and invertible.
- Step 3: The inverse \( f^{-1} \) is obtained by swapping each ordered pair: \( \{(3,1), (5,2), (1,3), (4,4), (2,5)\} \). In mapping notation: \( f^{-1}(1)=3, f^{-1}(2)=5, f^{-1}(3)=1, f^{-1}(4)=4, f^{-1}(5)=2 \).
- Step 4: For encoded number 4, the original roll number is \( f^{-1}(4) = 4 \).

ANSWER: (a) \( f \) is bijective because it is a permutation of the 5 elements. (b) \( f^{-1} = \{(1,3), (2,5), (3,1), (4,4), (5,2)\} \) (or equivalently the mapping above). (c) The original roll number is 4.

DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: The function \( f: \mathbb{R} \to \mathbb{R} \) is defined by \( f(x) = x^3 + 3x + 1 \). (a) Prove that \( f \) is invertible without finding its inverse explicitly. (b) Find \( f^{-1}(5) \) without determining the full formula for \( f^{-1} \). (c) Explain why the method used in (b) works for any invertible function.

COMPETENCY: Analyzing and reasoning about function properties; using the definition of inverse to find specific values without explicit formula.

STEPS:
- Step 1 (a): Show \( f \) is one‑one. Compute derivative: \( f'(x) = 3x^2 + 3 = 3(x^2+1) > 0 \) for all \( x \in \mathbb{R} \). Hence \( f \) is strictly increasing, so one‑one.
- Step 2 (a): Show \( f \) is onto. \( f \) is a continuous polynomial of odd degree with positive leading coefficient, so \( \lim_{x\to-\infty} f(x) = -\infty \) and \( \lim_{x\to\infty} f(x) = \infty \). By Intermediate Value Theorem, range is \( \mathbb{R} \). Thus \( f \) is bijective and invertible.
- Step 3 (b): To find \( f^{-1}(5) \), we need \( x \) such that \( f(x) = 5 \). Solve \( x^3 + 3x + 1 = 5 \Rightarrow x^3 + 3x - 4 = 0 \). By inspection, \( x = 1 \) is a root: \( 1 + 3 - 4 = 0 \). Factor: \( (x-1)(x^2+x+4) = 0 \). The quadratic has discriminant \( 1 - 16 = -15 < 0 \), so no other real roots. Hence \( x = 1 \) is the unique solution. Therefore \( f^{-1}(5) = 1 \).
- Step 4 (c): By definition, \( f^{-1}(y) = x \iff f(x) = y \). So to find \( f^{-1}(y_0) \), we simply solve \( f(x) = y_0 \) for \( x \). This works for any invertible function because the inverse function's value at \( y_0 \) is exactly the unique \( x \) that maps to \( y_0 \).

ANSWER: (a) \( f \) is strictly increasing (derivative positive) and its range is all real numbers, hence bijective and invertible. (b) \( f^{-1}(5) = 1 \). (c) Because \( f^{-1}(y) \) is defined as the unique \( x \) satisfying \( f(x) = y \).

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A function is ______ if and only if it is both one‑one (injective) and onto (surjective), i.e., bijective.

## DIAGNOSTIC_ANSWER_7
invertible

Invertible is the licence being defined: the blank holds the property that bijectivity earns, and nothing weaker qualifies. **A wrong answer (a weaker property) reveals the student has granted reverse gear to a function that still shares or skips outputs.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: If you are given a Fahrenheit ______ and need the Celsius value, you must "reverse" the process.

## DIAGNOSTIC_ANSWER_8
temperature

The Fahrenheit reading is the return trip's ticket: reversing the conversion needs the output in hand, exactly the situation inverses are built for. **A wrong answer (a Celsius word) reveals the student has started the return journey from the departure lounge.**
