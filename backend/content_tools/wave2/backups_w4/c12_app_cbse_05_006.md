## ELI5
Imagine you have a recipe that says "add salt to taste" – you don't know exactly how much salt, but any amount will make the dish edible. The general solution is like that recipe: it gives you a family of solutions (with unknown constants like 'to taste') that all satisfy the differential equation, but you need extra conditions (like how salty you like it) to pick one specific dish. Students often confuse this with a particular solution, thinking the general solution must give one exact answer, but it actually gives many possible answers until you fix the constants.

## DEFINITION
The general solution of a differential equation is a solution that contains as many arbitrary independent constants as the order of the differential equation and satisfies the equation for all values of those constants.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to verify that a given function with arbitrary constants satisfies a differential equation and identify the number of arbitrary constants equals the order of the equation.

## SCOPE_BOUNDARY
This node covers the concept, verification, and identification of general solutions for first and second order ordinary differential equations. It does not cover methods of solving differential equations (like separation of variables, homogeneous, linear), formation of differential equations, or particular solutions (covered in other nodes).

## WALKTHROUGH
Think about predicting the future position of a moving car: if you only know its current speed (first derivative), you can't know exactly where it will be without knowing where it started. The general solution gives you all possible positions based on different starting points (the arbitrary constant), like a family of curves. To begin, recall that the order of a differential equation tells you how many times you need to integrate (or how many constants appear when solving). The key insight is that the general solution isn't one answer—it's a template that generates all particular solutions when you fix the constants using initial conditions.

Takeaway: mastery means the constant count checked against the order and the family nature of the solution stated. Exam moves: verification questions differentiate a proposed general solution and confirm the equation holds for every constant value; counting questions match the number of arbitrary constants to the equation's order; interpretation questions describe the solution as a family of curves rather than a single curve. Method: the order is the number of integrations, and each integration leaves one free dial — count dials, not answers. Drill: one car, one family of starting points, one dial per integration. The template is the solution; particular journeys are its settings.

## DIAGNOSTIC_QUESTION_1
What is the general solution of the differential equation \( \frac{d^2y}{dx^2} = 0 \)?

## DIAGNOSTIC_ANSWER_1
The general solution is \( y = Cx + D \), where \( C \) and \( D \) are arbitrary constants. A wrong answer like \( y = Cx \) (missing one constant) reveals the student thinks the number of constants is less than the order (here, order 2 requires 2 constants), likely confusing general solution with a particular solution or forgetting that each integration introduces a new constant.

## DIAGNOSTIC_QUESTION_2
Explain why the function \( y = e^x + C \) is not the general solution of \( \frac{dy}{dx} = y \), even though it satisfies the equation for any constant \( C \).

## DIAGNOSTIC_ANSWER_2
It is not the general solution because it does not satisfy the differential equation for any \( C \). Substituting gives \( \frac{dy}{dx} = e^x \) and \( y = e^x + C \), so \( e^x = e^x + C \) implies \( C = 0 \). Only \( C = 0 \) works, so it's actually a particular solution. A wrong answer claiming it is general reveals the student confuses "contains a constant" with "satisfies for all values of the constant," missing that the constant must work universally in the equation.

## DIAGNOSTIC_QUESTION_3
Verify if \( y = A \cos 2x + B \sin 2x \) is the general solution of \( \frac{d^2y}{dx^2} + 4y = 0 \).

## DIAGNOSTIC_ANSWER_3
First, compute \( \frac{dy}{dx} = -2A \sin 2x + 2B \cos 2x \). Then, \( \frac{d^2y}{dx^2} = -4A \cos 2x - 4B \sin 2x \). Substitute into the equation: \( (-4A \cos 2x - 4B \sin 2x) + 4(A \cos 2x + B \sin 2x) = -4A\cos 2x -4B\sin 2x + 4A\cos 2x + 4B\sin 2x = 0 \). Since it satisfies the equation for all \( A \) and \( B \), and the order is 2 (requiring 2 constants), it is the general solution. A wrong answer stopping after one derivative or miscounting constants reveals failure to check full satisfaction or link constant count to order.

## DIAGNOSTIC_QUESTION_4
Consider the differential equation \( x \frac{dy}{dx} - y = 0 \). A student claims \( y = Cx \) is the general solution. Another claims \( y = Cx + D \) is the general solution. Who is correct and why?

## DIAGNOSTIC_ANSWER_4
The first student is correct. For \( y = Cx \), \( \frac{dy}{dx} = C \), so LHS = \( x \cdot C - Cx = 0 \), satisfying the equation for any \( C \). For \( y = Cx + D \), \( \frac{dy}{dx} = C \), so LHS = \( xC - (Cx + D) = -D \), which is zero only if \( D = 0 \). Thus, \( y = Cx + D \) does not satisfy for arbitrary \( D \), so it's not a solution unless \( D=0 \) (making it particular). The order is 1 (highest derivative is first), so general solution must have exactly 1 arbitrary constant. A wrong answer picking the second student reveals confusion between order and constant count, thinking more constants mean more general, without verifying satisfaction.

## DIAGNOSTIC_QUESTION_5
Critique the statement: "The general solution of a differential equation always contains exponential functions."

## DIAGNOSTIC_ANSWER_5
This statement is false. For example, the general solution of \( \frac{d^2y}{dx^2} = 0 \) is \( y = Cx + D \), which contains no exponentials. Another example: \( \frac{dy}{dx} = 2 \) has general solution \( y = 2x + C \), a linear function. Exponentials appear only in specific equations like \( \frac{dy}{dx} = ky \). A wrong answer agreeing with the statement reveals overgeneralization from common examples (like growth/decay models) without recognizing that solution form depends entirely on the differential equation's structure.

## DIAGNOSTIC_QUESTION_6
Create a first-order differential equation whose general solution is \( y = Cx^3 \).

## DIAGNOSTIC_ANSWER_6
Given \( y = Cx^3 \), differentiate: \( \frac{dy}{dx} = 3Cx^2 \). Eliminate \( C \) by solving \( C = \frac{y}{x^3} \) from the original, then substitute: \( \frac{dy}{dx} = 3 \left( \frac{y}{x^3} \right) x^2 = \frac{3y}{x} \). Rearranging gives \( x \frac{dy}{dx} - 3y = 0 \) or \( \frac{dy}{dx} = \frac{3y}{x} \). A poor answer that stops at \( \frac{dy}{dx} = 3Cx^2 \) or fails to eliminate \( C \) reveals misunderstanding that the general solution must be used to *form* the differential equation by removing constants, not just differentiating.

## COMMON_MISCONCEPTION
Students often believe that if a function satisfies a differential equation and contains arbitrary constants, it is automatically the general solution, regardless of how many constants it has. For example, for \( \frac{d^2y}{dx^2} + y = 0 \) (order 2), they might accept \( y = C \sin x \) as general because it has a constant and works, but it only has one constant while order requires two. This error arises from focusing only on satisfaction and presence of constants, ignoring that the *number* of independent constants must exactly match the order—too few means it's not general (it's a subset of solutions), and too many usually means it doesn't satisfy for all values (as seen in Diagnostic 2).

## ON_FAILURE
To fix this, have the student: (1) explicitly state the order of the given differential equation by identifying the highest derivative; (2) count the number of arbitrary constants in the candidate function; (3) verify the function satisfies the equation by substitution (showing all steps); (4) conclude it is general solution only if constant count equals order AND satisfaction holds for all constant values. Practice with pairs like \( y = C \sin x \) and \( y = C \sin x + D \cos x \) for \( y'' + y = 0 \) to contrast insufficient vs. correct constant count.

## PREREQUISITE_NODE_IDS
c12_app_cbse_05_002, c12_app_cbse_05_003, c12_app_cbse_05_005

## PREREQUISITE_REASONS
c12_app_cbse_05_002: Students must first understand what a differential equation is (involving derivatives) to recognize what it means for a function to satisfy it.
c12_app_cbse_05_003: Knowing how to determine the order (highest derivative) is essential because the number of arbitrary constants in the general solution must equal this order.
c12_app_cbse_05_005: Understanding the distinction between general and particular solutions is necessary to appreciate that the general solution contains arbitrary constants while a particular solution does not.

## FORWARD_NODE_IDS
c12_app_cbse_05_007, c12_app_cbse_05_009

## FORWARD_REASONS
c12_app_cbse_05_007: The concept of general solution is directly used to find particular solutions by assigning specific values to the arbitrary constants based on initial/boundary conditions.
c12_app_cbse_05_009: Solving simple differential equations (like separable or directly integrable forms) relies on recognizing that the result of integration yields the general solution, which must then be interpreted correctly.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_08_008, c11_app_cbse_08_009

## CROSS_SUBJECT_REASONS
c11_app_cbse_08_008: The concept of instantaneous rate of change (derivative) is foundational, as differential equations are built from derivatives representing rates of change.
c11_app_cbse_08_009: The chain rule is often needed when differentiating composite functions during verification of solutions (e.g., differentiating \( \sin(2x) \) or \( e^{3x} \)).

## CHAIN_DESCRIPTION
c12_app_cbse_05_005 -> c12_app_cbse_05_006 -> c12_app_cbse_05_007

## THIS_FORMULA
N/A - conceptual

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_app_cbse_08_008: Derivatives represent rates of change, so verifying a solution requires computing these rates (derivatives) from the candidate function.
c11_app_cbse_08_009: The chain rule is essential when differentiating functions like \( e^{kx} \) or \( \sin(\omega x) \) that frequently appear in solutions to differential equations.

## PREREQ_CONCEPT
Understanding that the order of a differential equation dictates the number of arbitrary constants in its general solution.

## PREREQ_BEFORE
The student must be able to compute first and second derivatives of basic functions (polynomials, trigonometric, exponential) and identify the order of a differential equation by locating the highest derivative.

## PREREQ_STUCK
Review how to determine the order of a differential equation (node c12_app_cbse_05_003) and practice verifying solutions by substitution (nodes c12_app_cbse_05_004 and c12_app_cbse_05_005).

## WORKED_EXAMPLE_1
PROBLEM: Verify that \( y = Ax^2 + Bx + C \) is the general solution of the differential equation \( \frac{d^3y}{dx^3} = 0 \).
STEPS:
- Step 1: Identify the order of the differential equation. The highest derivative is \( \frac{d^3y}{dx^3} \), so order = 3.
- Step 2: Compute the first derivative of the candidate function: \( \frac{dy}{dx} = \frac{d}{dx}(Ax^2 + Bx + C) = 2Ax + B \).
- Step 3: Compute the second derivative: \( \frac{d^2y}{dx^2} = \frac{d}{dx}(2Ax + B) = 2A \).
- Step 4: Compute the third derivative: \( \frac{d^3y}{dx^3} = \frac{d}{dx}(2A) = 0 \).
- Step 5: Substitute into the differential equation: LHS = \( \frac{d^3y}{dx^3} = 0 \), RHS = 0. Since LHS = RHS for all values of A, B, and C, and the number of arbitrary constants (3) equals the order (3), it is the general solution.
REASONING: Each step builds toward verification: order sets the expected constant count, successive derivatives confirm the equation is satisfied identically (yielding zero regardless of constants), and the constant count matching order ensures it's the most general form possible—not a particular solution missing constants.
ANSWER: Yes, \( y = Ax^2 + Bx + C \) is the general solution of \( \frac{d^3y}{dx^3} = 0 \) because it satisfies the equation for all A, B, C and contains exactly three arbitrary constants matching the third-order derivative.

## WORKED_EXAMPLE_2
PROBLEM: A particle moves such that its acceleration is constant and equal to 4 m/s². If the general solution for its position is given as \( y = At^2 + Bt + C \), explain why C represents the initial position and B represents the initial velocity.
STEPS:
- Step 1: Recall that velocity is the first derivative of position: \( v = \frac{dy}{dt} \), and acceleration is the second derivative: \( a = \frac{d^2y}{dt^2} \).
- Step 2: Differentiate the position function once: \( \frac{dy}{dt} = \frac{d}{dt}(At^2 + Bt + C) = 2At + B \). This is the velocity function.
- Step 3: Differentiate again to get acceleration: \( \frac{d^2y}{dt^2} = \frac{d}{dt}(2At + B) = 2A \).
- Step 4: Set acceleration equal to the given constant: \( 2A = 4 \), so \( A = 2 \). Thus, position becomes \( y = 2t^2 + Bt + C \).
- Step 5: Evaluate at time t = 0: initial position \( y(0) = 2(0)^2 + B(0) + C = C \), and initial velocity \( v(0) = 2A(0) + B = B \). Hence, C is initial position and B is initial velocity.
REASONING: This connects the abstract constants in the general solution to physical meaning through differentiation (linking to kinematics) and initial conditions (t=0), showing why the general solution contains exactly two constants for a second-order equation (from acceleration) and how they map to measurable quantities.
ANSWER: C represents the initial position because it is the value of position at t=0, and B represents the initial velocity because it is the value of velocity at t=0, as derived from the first and second derivatives of the position function.

## WORKED_EXAMPLE_3
PROBLEM: The differential equation \( \frac{d^2y}{dx^2} - 5\frac{dy}{dx} + 6y = 0 \) models the decay of a radioactive substance in a chemical reaction. Verify that \( y = Ae^{2x} + Be^{3x} \) is its general solution and explain why two exponentials are needed.
STEPS:
- Step 1: Identify the order: highest derivative is \( \frac{d^2y}{dx^2} \), so order = 2.
- Step 2: Compute first derivative: \( \frac{dy}{dx} = \frac{d}{dx}(Ae^{2x} + Be^{3x}) = 2Ae^{2x} + 3Be^{3x} \).
- Step 3: Compute second derivative: \( \frac{d^2y}{dx^2} = \frac{d}{dx}(2Ae^{2x} + 3Be^{3x}) = 4Ae^{2x} + 9Be^{3x} \).
- Step 4: Substitute into the differential equation:
  LHS = \( (4Ae^{2x} + 9Be^{3x}) - 5(2Ae^{2x} + 3Be^{3x}) + 6(Ae^{2x} + Be^{3x}) \)
  = \( 4Ae^{2x} + 9Be^{3x} - 10Ae^{2x} - 15Be^{3x} + 6Ae^{2x} + 6Be^{3x} \)
  = \( (4A - 10A + 6A)e^{2x} + (9B - 15B + 6B)e^{3x} \)
  = \( 0 \cdot e^{2x} + 0 \cdot e^{3x} = 0 \).
- Step 5: Since LHS = 0 = RHS for all A and B, and the solution contains two arbitrary constants matching the order (2), it is the general solution. Two exponentials are needed because the characteristic equation \( r^2 - 5r + 6 = 0 \) has two distinct real roots (r=2, r=3), each contributing an independent exponential term; fewer terms would not span the solution space.
REASONING: Verification requires careful algebraic combination of like terms after substitution, demonstrating that the coefficients of each exponential independently sum to zero. The need for two terms arises from the second-order nature requiring two independent solutions, which the distinct real roots provide—this reflects the principle that the general solution must contain as many independent parts as the order.
ANSWER: Yes, \( y = Ae^{2x} + Be^{3x} \) is the general solution because it satisfies the differential equation for all A, B and contains exactly two arbitrary constants. Two exponentials are needed as they correspond to the two independent solutions derived from the roots of the characteristic equation, which is necessary and sufficient for a second-order linear homogeneous differential equation with distinct real roots.

## COMPETENCY_QUESTION_1
QUESTION: The displacement y (in metres) of a vibrating string satisfies \( \frac{d^2y}{dt^2} + 9y = 0 \). A student proposes \( y = C \sin 3t \) as the general solution. Is this correct? Justify your answer by verifying the solution and discussing the role of arbitrary constants.
COMPETENCY: Solution verification and understanding the necessity of correct arbitrary constant count for general solutions.
STEPS:
- Step 1: Compute the first derivative: \( \frac{dy}{dt} = \frac{d}{dt}(C \sin 3t) = 3C \cos 3t \).
- Step 2: Compute the second derivative: \( \frac{d^2y}{dt^2} = \frac{d}{dt}(3C \cos 3t) = -9C \sin 3t \).
- Step 3: Substitute into the differential equation: LHS = \( (-9C \sin 3t) + 9(C \sin 3t) = -9C \sin 3t + 9C \sin 3t = 0 \), which equals RHS.
- Step 4: Although the equation is satisfied, the candidate solution has only one arbitrary constant (C), while the differential equation is second order (highest derivative \( \frac{d^2y}{dt^2} \)), requiring two arbitrary constants in the general solution. The correct general solution is \( y = A \cos 3t + B \sin 3t \).
ANSWER: No, \( y = C \sin 3t \) is not the general solution. While it satisfies the differential equation, it contains only one arbitrary constant, but a second-order differential equation requires exactly two arbitrary constants in its general solution. It represents only a subset of possible solutions (those with zero initial velocity), not the full family.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a circuit, the charge q on a capacitor satisfies \( L \frac{d^2q}{dt^2} + R \frac{dq}{dt} + \frac{q}{C} = 0 \). For the special case L=1 H, R=0 Ω, C=1/4 F, this becomes \( \frac{d^2q}{dt^2} + 4q = 0 \). The general solution is \( q = A \cos 2t + B \sin 2t \). If the initial charge is q(0) = 3 C and the initial current is i(0) = dq/dt|_{t=0} = 4 A, find the particular solution and explain how the arbitrary constants are determined.
COMPETENCY: Applying initial conditions to determine arbitrary constants in the general solution to obtain a particular solution.
STEPS:
- Step 1: Write the general solution: \( q = A \cos 2t + B \sin 2t \).
- Step 2: Apply initial charge condition: q(0) = 3. Substitute t=0: \( q(0) = A \cos 0 + B \sin 0 = A \cdot 1 + B \cdot 0 = A \). So, A = 3.
- Step 3: Find the expression for current: \( i = \frac{dq}{dt} = \frac{d}{dt}(A \cos 2t + B \sin 2t) = -2A \sin 2t + 2B \cos 2t \).
- Step 4: Apply initial current condition: i(0) = 4. Substitute t=0: \( i(0) = -2A \sin 0 + 2B \cos 0 = -2A \cdot 0 + 2B \cdot 1 = 2B \). So, 2B = 4, thus B = 2.
- Step 5: Write the particular solution: \( q = 3 \cos 2t + 2 \sin 2t \).
ANSWER: The particular solution is \( q = 3 \cos 2t + 2 \sin 2t \). The arbitrary constants A and B are determined uniquely by substituting the initial conditions into the general solution and its derivative, reducing the family of solutions to the single one matching the physical initial state.
DIFFICULTY: hard

--- 

[End of reasoning]