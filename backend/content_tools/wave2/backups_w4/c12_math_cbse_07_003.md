## ELI5
A factory's marginal cost is a fraction - three x plus two over x squared plus three x plus two - and total cost wants integrating. The fraction's denominator factors into two linear pieces, and partial fractions splits the big fraction into two simple ones, A over x plus one plus B over x plus two. Equate numerators to solve for A and B, integrate each simple piece with the log formula, and the cost function arrives. Improper fractions bow to long division first.

## DEFINITION
Integration by partial fractions is a technique to integrate a proper rational function \( \frac{P(x)}{Q(x)} \) by decomposing it into a sum of simpler rational functions whose integrals are standard forms. The decomposition follows specific patterns based on the factorization of the denominator \( Q(x) \) into linear and irreducible quadratic factors.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly factor the denominator, set up the appropriate partial fraction form for each factor type (linear, repeated linear, irreducible quadratic), solve for the unknown constants, and integrate each term to obtain the final antiderivative. They can also handle improper rational functions by performing polynomial long division first.

## SCOPE_BOUNDARY
This node covers integration of rational functions where the denominator factors into linear and/or irreducible quadratic factors with real coefficients. It includes proper rational functions and improper ones requiring long division. It does NOT cover integration of rational functions with complex roots, trigonometric substitutions, or integration by parts (those are separate nodes). The scope is limited to the patterns in NCERT Table 7.2.

## WALKTHROUGH
Imagine you are calculating the total cost of producing items where the marginal cost is given as a rational function like \( \frac{3x+2}{x^2+3x+2} \) rupees per item. To find the total cost function, you need to integrate this marginal cost. You notice the denominator factors as \( (x+1)(x+2) \). The first step is to write the integrand as \( \frac{A}{x+1} + \frac{B}{x+2} \), find A and B by equating numerators, then integrate each simple fraction using \( \int \frac{dx}{x+a} = \log|x+a| + C \). This method works because any proper rational function can be broken into such "partial fractions" — a skill built on your Class 9-10 factorisation and polynomial division (c9_math_ch4_8, c10_math_cbse_02_008).

Takeaway first: partial fractions is factorisation harvested - each denominator factor type has its own fraction template, and the unknown constants surrender to numerator-matching. Exam moves: factorisation questions, setup questions choosing the right template per factor type, solving questions for the constants, integration questions on each piece, and preliminary-division questions for improper fractions. Method: rerun the cost curve - factor the denominator, split, equate coefficients or feed clever x values, integrate the two logs. Check yourself: repeated factors demand one fraction per power, not one per factor - the square needs both an A over the linear and a B over its square. Drill: integrate one split fraction end to end and handle one improper case with long division.

## DIAGNOSTIC_QUESTION_1
Write the correct partial fraction decomposition form for \( \frac{5x-3}{(x-2)^2(x+1)} \) without solving for the constants.

## DIAGNOSTIC_ANSWER_1
The correct form is \( \frac{A}{x-2} + \frac{B}{(x-2)^2} + \frac{C}{x+1} \). A wrong answer like \( \frac{A}{x-2} + \frac{B}{x+1} \) reveals the student does not understand that a repeated linear factor \( (x-2)^2 \) requires two terms: one with the factor to the first power and one with the factor squared. Another common error is writing \( \frac{Ax+B}{(x-2)^2} + \frac{C}{x+1} \), which is the form for an irreducible quadratic, not a repeated linear factor.

## DIAGNOSTIC_QUESTION_2
A student integrates \( \int \frac{x^2+1}{x^2-1} \, dx \) by directly writing partial fractions \( \frac{A}{x-1} + \frac{B}{x+1} \). Explain why this approach is incorrect and what step must be done first.

## DIAGNOSTIC_ANSWER_2
The integrand \( \frac{x^2+1}{x^2-1} \) is an improper rational function because the degree of the numerator (2) is not less than the degree of the denominator (2). Partial fractions only apply to proper rational functions. The student must first perform polynomial long division to rewrite it as \( 1 + \frac{2}{x^2-1} \), then decompose \( \frac{2}{x^2-1} \) into partial fractions. Skipping the division step leads to an incorrect decomposition because the identity \( \frac{x^2+1}{x^2-1} = \frac{A}{x-1} + \frac{B}{x+1} \) has no solution for constants A and B.

## DIAGNOSTIC_QUESTION_3
Evaluate \( \int \frac{3x+5}{x^2+4x+3} \, dx \) completely, showing all steps.

## DIAGNOSTIC_ANSWER_3
Step 1: Factor denominator: \( x^2+4x+3 = (x+1)(x+3) \).  
Step 2: Set up partial fractions: \( \frac{3x+5}{(x+1)(x+3)} = \frac{A}{x+1} + \frac{B}{x+3} \).  
Step 3: \( 3x+5 = A(x+3) + B(x+1) = (A+B)x + (3A+B) \).  
Step 4: Equate coefficients: \( A+B=3 \), \( 3A+B=5 \). Solving gives \( A=1, B=2 \).  
Step 5: Integrate: \( \int \left( \frac{1}{x+1} + \frac{2}{x+3} \right) dx = \log|x+1| + 2\log|x+3| + C \).  
A wrong answer like \( \log|x+1| + \log|x+3| + C \) reveals the student solved the system incorrectly (e.g., got A=1, B=1) or forgot to multiply the second term by 2. Another error is omitting absolute values inside the logarithms, which is required because the domain includes intervals where the arguments are negative.

## DIAGNOSTIC_QUESTION_4
Compare the integrals \( I_1 = \int \frac{2x+3}{x^2+4x+5} \, dx \) and \( I_2 = \int \frac{2x+3}{x^2+4x+3} \, dx \). Explain why the method of partial fractions works directly for \( I_2 \) but not for \( I_1 \), and describe the alternative method needed for \( I_1 \).

## DIAGNOSTIC_ANSWER_4
For \( I_2 \), the denominator \( x^2+4x+3 = (x+1)(x+3) \) factors into distinct linear factors, so partial fractions with terms \( \frac{A}{x+1} + \frac{B}{x+3} \) works. For \( I_1 \), the denominator \( x^2+4x+5 \) has discriminant \( 16-20 = -4 < 0 \), so it is an irreducible quadratic over reals; it cannot be factored into linear factors with real coefficients. Therefore, the partial fraction form for a single irreducible quadratic is \( \frac{Ax+B}{x^2+4x+5} \), which is just the original integrand — no simplification occurs. Instead, \( I_1 \) must be solved by completing the square: \( x^2+4x+5 = (x+2)^2+1 \), then splitting the numerator to match the derivative of the denominator: \( 2x+3 = (2x+4) - 1 \), giving \( \int \frac{2x+4}{(x+2)^2+1} dx - \int \frac{1}{(x+2)^2+1} dx = \log(x^2+4x+5) - \tan^{-1}(x+2) + C \). A student who tries to force partial fractions on \( I_1 \) reveals they cannot distinguish between factorable and irreducible quadratics.

## DIAGNOSTIC_QUESTION_5
A student's solution for \( \int \frac{x^3+2x^2+3x+4}{x^2+x+1} \, dx \) begins with partial fractions: \( \frac{Ax+B}{x^2+x+1} \). Identify the error and provide the correct first step.

## DIAGNOSTIC_ANSWER_5
The error is that the rational function is improper (numerator degree 3 > denominator degree 2). Partial fractions cannot be applied directly. The correct first step is polynomial long division: \( \frac{x^3+2x^2+3x+4}{x^2+x+1} = x+1 + \frac{x+3}{x^2+x+1} \). Then integrate \( \int (x+1) dx \) and handle the proper fraction \( \frac{x+3}{x^2+x+1} \) by completing the square or splitting the numerator. A student who skips long division shows they do not recognize the degree condition for partial fractions.

## DIAGNOSTIC_QUESTION_6
Create a rational function that requires all three types of partial fraction terms: a distinct linear factor, a repeated linear factor, and an irreducible quadratic factor. Write its denominator in factored form and the corresponding partial fraction decomposition form (do not solve for constants).

## DIAGNOSTIC_ANSWER_6
Example: Denominator \( (x-1)(x+2)^2(x^2+4) \). The decomposition form is \( \frac{A}{x-1} + \frac{B}{x+2} + \frac{C}{(x+2)^2} + \frac{Dx+E}{x^2+4} \). A poor answer might omit the repeated linear term \( \frac{B}{x+2} \) (only keeping \( \frac{C}{(x+2)^2} \)) or use a constant numerator \( D \) instead of \( Dx+E \) for the irreducible quadratic. This reveals the student has not memorized the exact patterns in Table 7.2 for each factor type.

## COMMON_MISCONCEPTION
Students often write the partial fraction form for a repeated linear factor \( (x-a)^2 \) as \( \frac{A}{(x-a)^2} \) only, omitting the \( \frac{B}{x-a} \) term. For example, for \( \frac{3x+1}{(x-2)^2} \), they set \( \frac{3x+1}{(x-2)^2} = \frac{A}{(x-2)^2} \), leading to \( 3x+1 = A \), which is impossible. The correct form is \( \frac{A}{x-2} + \frac{B}{(x-2)^2} \). Another frequent error is using a constant numerator for an irreducible quadratic factor, e.g., writing \( \frac{A}{x^2+1} \) instead of \( \frac{Ax+B}{x^2+1} \). This happens because they confuse the form for a linear factor with that for a quadratic factor.

## ON_FAILURE
If a student makes the repeated linear factor error, have them revisit the derivation of partial fractions: write \( \frac{A}{x-2} + \frac{B}{(x-2)^2} = \frac{A(x-2)+B}{(x-2)^2} = \frac{Ax + (B-2A)}{(x-2)^2} \). Show that with only one constant, the numerator would be a constant, but the original numerator is linear. Then give a drill: "Write the correct partial fraction form for these denominators: (i) \( (x+1)^3 \), (ii) \( (x-3)(x+4)^2 \), (iii) \( (x^2+2x+5)^2 \)." For the irreducible quadratic error, have them complete the square for \( x^2+bx+c \) and show that its derivative is linear, so the numerator in the integral \( \int \frac{Ax+B}{x^2+bx+c} dx \) must be linear to allow substitution \( u = x^2+bx+c \). Remediation nodes: c9_math_ch4_8 (factorisation of quadratics) and c10_math_cbse_02_008 (polynomial division).

## PREREQUISITE_NODE_IDS
c12_math_cbse_07_001, c12_math_cbse_07_002, c9_math_ch4_5, c9_math_ch4_6, c9_math_ch4_7, c9_math_ch4_8, c10_math_cbse_02_007, c10_math_cbse_02_008, c11_math_cbse_02_007, c11_math_cbse_02_008, c10_math_cbse_03_005, c10_math_cbse_03_006

## PREREQUISITE_REASONS
c12_math_cbse_07_001: Understanding indefinite integration as anti-differentiation is the foundation for all integration methods.
c12_math_cbse_07_002: Substitution method is often used after partial fractions to integrate terms like \( \frac{1}{x^2+a^2} \) or \( \frac{x}{x^2+a^2} \).
c9_math_ch4_5: Common factor method is needed to factor denominators before decomposition.
c9_math_ch4_6: Factorisation by grouping helps factor cubic or higher degree polynomials.
c9_math_ch4_7: Algebraic identities (e.g., \( a^2-b^2 \)) are used to factor denominators like \( x^2-9 \).
c9_math_ch4_8: Splitting the middle term is the primary technique for factorising quadratic denominators.
c10_math_cbse_02_007: Division algorithm for polynomials provides the theory behind long division of improper rational functions.
c10_math_cbse_02_008: Step-by-step polynomial long division is required when numerator degree ≥ denominator degree.
c11_math_cbse_02_007: Understanding polynomial functions helps identify degrees and factorability.
c11_math_cbse_02_008: Rational functions are the integrands; knowing their properties (domain, asymptotes) aids in setting up partial fractions.
c10_math_cbse_03_005: If stuck, revisit factorisation of quadratics (c9_math_ch4_8) and solving linear equations by substitution/elimination (c10_math_cbse_03_005, c10_math_cbse_03_006).  
c10_math_cbse_03_006: If stuck, revisit factorisation of quadratics (c9_math_ch4_8) and solving linear equations by substitution/elimination (c10_math_cbse_03_005, c10_math_cbse_03_006).  

## FORWARD_NODE_IDS
c12_math_cbse_07_007, c12_math_cbse_07_008, c12_math_cbse_07_009, c12_math_cbse_07_010, c12_math_cbse_07_011

## FORWARD_REASONS
c12_math_cbse_07_007: Definite integrals as limit of a sum may require evaluating rational function integrals.
c12_math_cbse_07_008: Fundamental Theorem of Calculus Part 1 uses anti-derivatives found by partial fractions.
c12_math_cbse_07_009: Fundamental Theorem of Calculus Part 2 evaluates definite integrals using anti-derivatives from partial fractions.
c12_math_cbse_07_010: Properties of definite integrals (symmetry, etc.) are applied to integrals of rational functions.
c12_math_cbse_07_011: Substitution in definite integrals often transforms integrands into rational functions requiring partial fractions.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_007
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivatives give rates of change (e.g., velocity from position); integration by partial fractions reverses this for rational acceleration functions in physics kinematics.
c11_math_cbse_13_007: Derivative of polynomial functions is used in economics for marginal cost/revenue; integrating rational marginal functions via partial fractions recovers total cost/revenue.

## CHAIN_DESCRIPTION
c9_math_ch4_8 -> c10_math_cbse_02_008 -> c12_math_cbse_07_003 -> c12_math_cbse_07_009

## THIS_FORMULA
For a proper rational function \( \frac{P(x)}{Q(x)} \) with \( \deg P < \deg Q \), the partial fraction decomposition depends on factors of \( Q(x) \):
1. Distinct linear factors: \( \frac{px+q}{(x-a)(x-b)} = \frac{A}{x-a} + \frac{B}{x-b} \)
2. Repeated linear factor: \( \frac{px+q}{(x-a)^2} = \frac{A}{x-a} + \frac{B}{(x-a)^2} \)
3. Distinct linear factors (three): \( \frac{px^2+qx+r}{(x-a)(x-b)(x-c)} = \frac{A}{x-a} + \frac{B}{x-b} + \frac{C}{x-c} \)
4. Repeated linear factor (quadratic denominator): \( \frac{px^2+qx+r}{(x-a)(x-b)^2} = \frac{A}{x-a} + \frac{B}{x-b} + \frac{C}{(x-b)^2} \)
5. Irreducible quadratic factor: \( \frac{px^2+qx+r}{(x-a)(x^2+bx+c)} = \frac{A}{x-a} + \frac{Bx+C}{x^2+bx+c} \) where \( x^2+bx+c \) has no real roots.

## FORMULA_VARIABLES
P(x), Q(x) = polynomials in x; a, b, c = real constants (roots of denominator); A, B, C = constants to be determined; p, q, r = coefficients of numerator; x = variable of integration.

## FORMULA_UNITS
dimensionless (pure mathematical expressions)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_003 | Integration by partial fractions solves differential equations in RC/RL circuits where the current/voltage involves rational functions of time.
 c12_eco_cbse_04_002 | Marginal cost functions that are rational are integrated via partial fractions to obtain total cost functions for production optimization.
## PREREQ_CONCEPT
Factorisation of polynomials and solving systems of linear equations.

## PREREQ_BEFORE
The student must be able to factor quadratic and cubic polynomials completely and solve a system of 2-3 linear equations in 2-3 unknowns.

## PREREQ_STUCK
If stuck, revisit factorisation of quadratics (c9_math_ch4_8) and solving linear equations by substitution/elimination (c10_math_cbse_03_005, c10_math_cbse_03_006).

## WORKED_EXAMPLE_1
PROBLEM: A factory's marginal cost function is \( MC(x) = \frac{4x+5}{x^2+3x+2} \) rupees per unit, where x is the number of units produced (in hundreds). Find the total cost function \( C(x) \) given that the fixed cost is ₹10,000.

STEPS:
- Step 1: Recognize that total cost is the integral of marginal cost: \( C(x) = \int MC(x) \, dx = \int \frac{4x+5}{x^2+3x+2} \, dx \).
- Step 2: Factor the denominator: \( x^2+3x+2 = (x+1)(x+2) \). The integrand is proper (degree 1 < degree 2).
- Step 3: Set up partial fractions: \( \frac{4x+5}{(x+1)(x+2)} = \frac{A}{x+1} + \frac{B}{x+2} \).
- Step 4: Equate numerators: \( 4x+5 = A(x+2) + B(x+1) = (A+B)x + (2A+B) \). Solve: \( A+B=4 \), \( 2A+B=5 \) → \( A=1, B=3 \).
- Step 5: Integrate: \( \int \left( \frac{1}{x+1} + \frac{3}{x+2} \right) dx = \log|x+1| + 3\log|x+2| + K \).
- Step 6: Apply fixed cost: When \( x=0 \), \( C(0) = 10000 \). So \( 10000 = \log|1| + 3\log|2| + K = 3\log 2 + K \) → \( K = 10000 - 3\log 2 \).
- Step 7: Total cost function: \( C(x) = \log|x+1| + 3\log|x+2| + 10000 - 3\log 2 \) rupees.

REASONING: The marginal cost is a rational function. Since the denominator factors into distinct linear factors, partial fractions decompose it into simple logarithmic integrals. The constant of integration is determined by the fixed cost (cost at zero production).

ANSWER: \( C(x) = \log|x+1| + 3\log|x+2| + 10000 - 3\log 2 \) rupees.

## WORKED_EXAMPLE_2
PROBLEM: Evaluate \( \int \frac{x^2+2x+3}{x^3+3x^2+2x} \, dx \).

STEPS:
- Step 1: Factor the denominator: \( x^3+3x^2+2x = x(x^2+3x+2) = x(x+1)(x+2) \). Three distinct linear factors.
- Step 2: Set up partial fractions: \( \frac{x^2+2x+3}{x(x+1)(x+2)} = \frac{A}{x} + \frac{B}{x+1} + \frac{C}{x+2} \).
- Step 3: Equate numerators: \( x^2+2x+3 = A(x+1)(x+2) + B x(x+2) + C x(x+1) \).
- Step 4: Use convenient values: Put \( x=0 \): \( 3 = A(1)(2) \) → \( A = \frac{3}{2} \). Put \( x=-1 \): \( 1-2+3 = 2 = B(-1)(1) \) → \( B = -2 \). Put \( x=-2 \): \( 4-4+3 = 3 = C(-2)(-1) = 2C \) → \( C = \frac{3}{2} \).
- Step 5: Integrate: \( \int \left( \frac{3/2}{x} - \frac{2}{x+1} + \frac{3/2}{x+2} \right) dx = \frac{3}{2}\log|x| - 2\log|x+1| + \frac{3}{2}\log|x+2| + K \).
- Step 6: Simplify (optional): \( \frac{1}{2}\log|x^3| - 2\log|x+1| + \frac{1}{2}\log|(x+2)^3| + K \).

REASONING: With three distinct linear factors, we use three terms. The "cover-up" method (substituting roots) is faster than equating coefficients for finding constants. Each term integrates to a logarithm.

ANSWER: \( \frac{3}{2}\log|x| - 2\log|x+1| + \frac{3}{2}\log|x+2| + K \).

## WORKED_EXAMPLE_3
PROBLEM: Evaluate \( \int \frac{3x^2+5x+2}{x^3+2x^2+x} \, dx \).

STEPS:
- Step 1: Factor denominator: \( x^3+2x^2+x = x(x^2+2x+1) = x(x+1)^2 \). Contains a distinct linear factor \( x \) and a repeated linear factor \( (x+1)^2 \).
- Step 2: Set up partial fractions: \( \frac{3x^2+5x+2}{x(x+1)^2} = \frac{A}{x} + \frac{B}{x+1} + \frac{C}{(x+1)^2} \).
- Step 3: Equate numerators: \( 3x^2+5x+2 = A(x+1)^2 + B x(x+1) + C x \).
- Step 4: Find constants: Put \( x=0 \): \( 2 = A(1)^2 \) → \( A=2 \). Put \( x=-1 \): \( 3-5+2=0 = C(-1) \) → \( C=0 \). Equate \( x^2 \) coefficients: \( 3 = A + B = 2 + B \) → \( B=1 \). (Check x coefficient: \( 5 = 2A + B + C = 4+1+0=5 \) ✓).
- Step 5: Integrate: \( \int \left( \frac{2}{x} + \frac{1}{x+1} + \frac{0}{(x+1)^2} \right) dx = 2\log|x| + \log|x+1| + K \).
- Step 6: Note that the \( \frac{C}{(x+1)^2} \) term vanished. If C were non-zero, its integral would be \( -\frac{C}{x+1} \).

REASONING: The repeated factor \( (x+1)^2 \) requires two terms: \( \frac{B}{x+1} \) and \( \frac{C}{(x+1)^2} \). The cover-up method works for A and C (using roots of the distinct factors), while B is found by coefficient comparison or substituting another value.

ANSWER: \( 2\log|x| + \log|x+1| + K \).

## COMPETENCY_QUESTION_1
QUESTION: A student claims that \( \int \frac{2x+1}{x^2+x+1} \, dx = \log|x^2+x+1| + C \) because the numerator is the derivative of the denominator. Is this claim correct? If yes, explain why partial fractions are not needed. If no, correct the error and evaluate the integral properly.

COMPETENCY: Translating real-world situations to mathematical expressions, Comparing and justifying

STEPS:
- Step 1: Check if numerator is exactly the derivative of the denominator: derivative of \( x^2+x+1 \) is \( 2x+1 \). Yes, it matches exactly.
- Step 2: Recognize the integral is of the form \( \int \frac{f'(x)}{f(x)} dx = \log|f(x)| + C \). No partial fractions needed.
- Step 3: The claim is correct. The integral is \( \log|x^2+x+1| + C \). Since \( x^2+x+1 = (x+\frac{1}{2})^2 + \frac{3}{4} > 0 \) for all real x, absolute value can be dropped: \( \log(x^2+x+1) + C \).
- Step 4: Partial fractions would be unnecessary and impossible because the denominator is irreducible (discriminant \( 1-4 = -3 < 0 \)).

ANSWER: The claim is correct. The integral equals \( \log(x^2+x+1) + C \). Partial fractions are not applicable because the denominator does not factor over the reals; the integral is a direct application of the \( \int \frac{f'(x)}{f(x)} dx \) pattern.

DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: Evaluate \( \int \frac{x^3+2x^2+3x+4}{(x^2+1)(x^2+2)} \, dx \). (Hint: The denominator has two distinct irreducible quadratic factors.)

COMPETENCY: Error identification and correction, Multi-step analytical reasoning

STEPS:
- Step 1: The integrand is proper (degree 3 < degree 4). Denominator has two distinct irreducible quadratics: \( x^2+1 \) and \( x^2+2 \).
- Step 2: Set up partial fractions: \( \frac{x^3+2x^2+3x+4}{(x^2+1)(x^2+2)} = \frac{Ax+B}{x^2+1} + \frac{Cx+D}{x^2+2} \).
- Step 3: Equate numerators: \( x^3+2x^2+3x+4 = (Ax+B)(x^2+2) + (Cx+D)(x^2+1) \).
- Step 4: Expand and collect: \( = (A+C)x^3 + (B+D)x^2 + (2A+C)x + (2B+D) \).
- Step 5: Equate coefficients: 
  \( A+C = 1 \) (coeff of \( x^3 \))
  \( B+D = 2 \) (coeff of \( x^2 \))
  \( 2A+C = 3 \) (coeff of \( x \))
  \( 2B+D = 4 \) (constant)
- Step 6: Solve: From first two: subtract \( (2A+C) - (A+C) = 3-1 \) → \( A=2 \), then \( C = -1 \). From last two: \( (2B+D) - (B+D) = 4-2 \) → \( B=2 \), then \( D=0 \).
- Step 7: Integrand becomes \( \frac{2x+2}{x^2+1} + \frac{-x}{x^2+2} = \frac{2x}{x^2+1} + \frac{2}{x^2+1} - \frac{x}{x^2+2} \).
- Step 8: Integrate term by term:
  \( \int \frac{2x}{x^2+1} dx = \log(x^2+1) \)
  \( \int \frac{2}{x^2+1} dx = 2\tan^{-1}x \)
  \( \int \frac{-x}{x^2+2} dx = -\frac{1}{2}\log(x^2+2) \)
- Step 9: Combine: \( \log(x^2+1) + 2\tan^{-1}x - \frac{1}{2}\log(x^2+2) + K \).

REASONING: This problem combines partial fractions with irreducible quadratics and requires splitting numerators to match derivatives of denominators for logarithmic integrals and standard arctan forms. It tests the ability to handle the most general case in Table 7.2 (type 5 with two quadratics).

ANSWER: \( \log(x^2+1) + 2\tan^{-1}x - \frac{1}{2}\log(x^2+2) + K \).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: To find the total cost function, you need to ______ this marginal cost.

## DIAGNOSTIC_ANSWER_7
integrate

Integrate is the mission: the marginal cost is a rate, and only integration totals it into the cost function. **A wrong answer (differentiate) reveals the student has run the factory's arithmetic backwards and produced more rates instead of totals.**

## DIAGNOSTIC_QUESTION_8
What common mix-up does this lesson flag about Integration by partial fractions?

## DIAGNOSTIC_ANSWER_8
This happens because they confuse the form for a linear factor with that for a quadratic factor.

The flagged error is template confusion: a repeated linear factor needs fractions for every power up to the repeat, and an irreducible quadratic needs a linear numerator over it. **A wrong answer using the simple linear template on a repeated factor reveals the student has met the denominator's family and used the wrong relative's form.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly factor the denominator, set up the appropriate partial fraction form for each factor type (linear, repeated linear, irreducible quadratic), solve for the unknown constants, and integrate each term to obtain the final antiderivative.
