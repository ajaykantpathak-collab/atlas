## ELI5
Imagine you have a master key (general solution) that can open many different locks — each lock needs a specific cut of the key (particular values for the arbitrary constants). The particular solution is that one uniquely cut key that opens only the specific lock (initial condition) you're trying to unlock. Students often mix up "particular solution" with "any specific solution" — but it must come from the general solution by assigning specific values to ALL arbitrary constants, not just picking any function that happens to satisfy the differential equation.

## DEFINITION
A particular solution of a differential equation is a solution obtained from the general solution by assigning specific numerical values to all arbitrary constants, resulting in a solution that contains no arbitrary constants and satisfies a given initial or boundary condition.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) Take a general solution with n arbitrary constants and n initial/boundary conditions, substitute the conditions to form a system of equations, solve for all constants, and write the particular solution. (2) Verify that the resulting particular solution satisfies both the differential equation and the given conditions.

## SCOPE_BOUNDARY
This node covers finding particular solutions from given general solutions using initial/boundary conditions for first and second order ODEs. It does NOT cover solving differential equations from scratch (covered in c12_app_cbse_05_009) or forming differential equations from families of curves (c12_app_cbse_05_008).

## WALKTHROUGH
You're designing a roller coaster and the track's shape follows the differential equation \( \frac{d^2y}{dx^2} = 6x \). The general solution is \( y = x^3 + C_1x + C_2 \). But your coaster must start at ground level (0,0) and have a slope of 2 at the start — these are your initial conditions. To find the exact track shape (particular solution), you substitute x=0, y=0 to get one equation, and x=0, y'=2 to get another. Solve for C₁ and C₂, and you have your unique coaster design. The key insight: every initial condition eliminates one degree of freedom (one arbitrary constant) until the solution is completely determined.

Takeaway: mastery means each condition used to eliminate one constant until none remain, and the result verified twice. Exam moves: substitution questions convert initial and slope conditions into equations for the constants; solving questions evaluate both constants from the pair; verification questions confirm the particular solution against the differential equation and both conditions. Method: each condition is one degree of freedom leaving the solution — count conditions against constants and never leave a stray dial. Drill: one coaster, one ground-level start, one starting slope, one unique track. The family funnels to a single ride exactly as fast as conditions arrive.

## DIAGNOSTIC_QUESTION_1
What is the defining characteristic that distinguishes a particular solution from a general solution of a differential equation?

## DIAGNOSTIC_ANSWER_1
A particular solution contains no arbitrary constants, while a general solution contains as many arbitrary constants as the order of the differential equation. A wrong answer (e.g., "a particular solution is any solution that works") reveals the student confuses "particular solution" with "any specific solution" — they miss that it must be derived from the general solution by assigning specific values to ALL arbitrary constants.

## DIAGNOSTIC_QUESTION_2
The general solution of a differential equation is \( y = C_1 e^{2x} + C_2 e^{-3x} \). A student claims that \( y = 5e^{2x} \) is a particular solution because it has no arbitrary constants. Is the student correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
The student is incorrect. \( y = 5e^{2x} \) cannot be obtained from the general solution by assigning specific values to both \( C_1 \) and \( C_2 \) — it would require \( C_1 = 5 \) and \( C_2 = 0 \), but setting \( C_2 = 0 \) is an assignment, so technically it IS obtainable. However, a true particular solution must satisfy given initial/boundary conditions. Without conditions, \( y = 5e^{2x} \) is just a specific member of the family, not a "particular solution" in the context of an IVP. The error reveals the student thinks "no arbitrary constants = particular solution" without understanding the role of initial conditions in selecting the specific member.

## DIAGNOSTIC_QUESTION_3
Find the particular solution of the differential equation \( \frac{dy}{dx} = 3x^2 \) given that \( y = 4 \) when \( x = 1 \).

## DIAGNOSTIC_ANSWER_3
Step 1: Integrate to get general solution: \( y = \int 3x^2 \, dx = x^3 + C \). Step 2: Apply initial condition: \( 4 = (1)^3 + C \Rightarrow C = 3 \). Step 3: Particular solution: \( y = x^3 + 3 \). A wrong answer (e.g., \( y = x^3 + 4 \)) reveals the student substituted incorrectly or forgot to evaluate \( x^3 \) at \( x=1 \) before solving for C.

## DIAGNOSTIC_QUESTION_4
The general solution of a second-order differential equation is \( y = C_1 \cos(2x) + C_2 \sin(2x) \). Two initial conditions are given: \( y(0) = 3 \) and \( y'(0) = -4 \). Explain why both conditions are necessary and what would happen if only one condition were given.

## DIAGNOSTIC_ANSWER_4
A second-order ODE has two arbitrary constants in its general solution, so two independent conditions are needed to uniquely determine both constants. With only one condition (e.g., \( y(0)=3 \)), we get \( 3 = C_1 \), but \( C_2 \) remains free — infinitely many solutions satisfy that single condition. The error of thinking one condition suffices reveals the student doesn't connect the order of the ODE to the number of arbitrary constants and required conditions.

## DIAGNOSTIC_QUESTION_5
A student solves \( \frac{d^2y}{dx^2} = 6x \) with \( y(0)=1, y'(0)=2 \) and gets \( y = x^3 + 2x + 1 \). They claim this is the particular solution. Without re-solving, how would you verify their answer is correct? What specific checks must pass?

## DIAGNOSTIC_ANSWER_5
Three checks must pass: (1) The solution must satisfy the differential equation: \( y'' = 6x \) (here \( y' = 3x^2+2, y''=6x \) ✓). (2) It must satisfy \( y(0)=1 \): \( 0+0+1=1 \) ✓. (3) It must satisfy \( y'(0)=2 \): \( 0+2=2 \) ✓. A student who only checks the initial conditions but not the DE, or vice versa, reveals they don't understand that a particular solution must satisfy BOTH the DE and the conditions simultaneously.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) that leads to a first-order differential equation where the general solution has one arbitrary constant, and specify an initial condition that would yield a meaningful particular solution. Write the differential equation, general solution, and particular solution.

## DIAGNOSTIC_ANSWER_6
Scenario: A bacteria culture in a lab in Pune grows at a rate proportional to its current population. DE: \( \frac{dP}{dt} = kP \). General solution: \( P(t) = P_0 e^{kt} \) (where \( P_0 \) is the arbitrary constant). Initial condition: At \( t=0 \), population is 5000. Particular solution: \( P(t) = 5000 e^{kt} \). A poor answer uses a scenario not matching exponential growth (e.g., linear growth) or gives an initial condition that doesn't fix the constant (e.g., "population is 5000 at some time t"), revealing confusion about what constitutes a well-posed initial value problem.

## COMMON_MISCONCEPTION
Students believe that ANY solution without arbitrary constants is a particular solution. For example, given \( \frac{dy}{dx} = 2x \) with general solution \( y = x^2 + C \), they think \( y = x^2 + 5 \) is "a particular solution" even without an initial condition. This is wrong because "particular solution" is a relational concept — it is particular *relative to a given initial/boundary condition*. Without a condition, \( y = x^2 + 5 \) is just one member of the family of solutions, not THE particular solution to an IVP. This error costs marks in board exams when students write "particular solution: \( y = x^2 + 5 \)" without deriving C from a stated condition.

## ON_FAILURE
If a student cannot distinguish particular from general solution: (1) Have them write the general solution of \( \frac{dy}{dx} = 3x^2 \) and circle the arbitrary constant. (2) Give them \( y(1)=4 \) and ask: "Which value of C makes this true?" — guide them to substitute x=1, y=4. (3) Have them write the final answer as "Particular solution: \( y = x^3 + 3 \)" and verify it satisfies both the DE and condition. (4) Re-diagnose with: "If the condition were \( y(2)=10 \), what would the particular solution be?"

## PREREQUISITE_NODE_IDS
c12_app_cbse_05_005, c12_app_cbse_05_006, c11_app_cbse_08_008, c11_app_cbse_08_009

## PREREQUISITE_REASONS
c12_app_cbse_05_005: Defines general and particular solutions and their relationship — foundational distinction.
c12_app_cbse_05_006: Explains general solution structure with arbitrary constants — needed to understand what gets eliminated.
c11_app_cbse_08_008: Covers instantaneous rate of change and derivative — prerequisite for understanding differential equations.
c11_app_cbse_08_009: Covers chain rule and derivatives of algebraic functions — needed for differentiating general solutions to apply initial conditions involving derivatives.

## FORWARD_NODE_IDS
c12_app_cbse_05_009, c12_app_cbse_05_010

## FORWARD_REASONS
c12_app_cbse_05_009: Solving simple differential equations produces general solutions; this node's skill (finding particular solutions) is the immediate next step after solving.
c12_app_cbse_05_010: Mathematical modeling requires translating real problems into IVPs; finding particular solutions is essential for answering the modeling question.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_08_006, c11_app_cbse_08_007, c11_app_cbse_12_001

## CROSS_SUBJECT_REASONS
c11_app_cbse_08_006: Limits of functions — needed to understand behavior of solutions as x approaches boundaries, relevant for boundary value problems.
c11_app_cbse_08_007: Continuity of functions — particular solutions must be continuous (and differentiable) on their domain; this concept underpins why we can substitute initial conditions.
c11_app_cbse_12_001: Straight line equations — initial conditions often give points (x,y) or slopes (y') that geometrically correspond to points and tangents on the solution curve.

## CHAIN_DESCRIPTION
c12_app_cbse_05_005 -> c12_app_cbse_05_007 -> c12_app_cbse_05_009 (General/particular distinction -> Finding particular solutions -> Solving DEs to get general solutions first)

## THIS_FORMULA
N/A - conceptual (process: substitute initial/boundary conditions into general solution to solve for arbitrary constants)

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_04_001 | Physics: Motion under gravity gives second-order ODE \( \frac{d^2y}{dt^2} = -g \); initial position and velocity yield particular solution for trajectory.
c12_che_cbse_04_001 | Chemistry: First-order reaction kinetics \( \frac{d[A]}{dt} = -k[A] \); initial concentration \( [A]_0 \) gives particular solution \( [A] = [A]_0 e^{-kt} \).

## PREREQ_CONCEPT
General solution of a differential equation contains arbitrary constants equal to the order of the equation; particular solution is obtained by using initial/boundary conditions to fix these constants.

## PREREQ_BEFORE
Student must be able to: (1) Identify the general solution and its arbitrary constants. (2) Differentiate the general solution if initial conditions involve derivatives. (3) Solve a system of linear equations for the constants.

## PREREQ_STUCK
Review c12_app_cbse_05_006 (General Solution) to understand the structure of solutions with arbitrary constants, and c11_app_cbse_08_009 (Chain Rule) for differentiating general solutions when applying derivative conditions.

## WORKED_EXAMPLE_1
PROBLEM: A savings account in a bank in Mumbai earns interest compounded continuously at 6% per annum. The differential equation for the amount A(t) after t years is \( \frac{dA}{dt} = 0.06A \). The general solution is \( A(t) = Ce^{0.06t} \). If the initial deposit is ₹50,000, find the particular solution and the amount after 10 years.
STEPS:
- Step 1: Identify the general solution \( A(t) = Ce^{0.06t} \) and the initial condition: at \( t = 0 \), \( A = 50000 \).
- Step 2: Substitute the initial condition into the general solution: \( 50000 = Ce^{0.06 \times 0} = Ce^0 = C \).
- Step 3: Determine the constant: \( C = 50000 \).
- Step 4: Write the particular solution: \( A(t) = 50000e^{0.06t} \).
- Step 5: Find the amount after 10 years: \( A(10) = 50000e^{0.6} \approx 50000 \times 1.8221 = ₹91,105 \).
REASONING: The initial condition fixes the arbitrary constant C, transforming the family of exponential curves into the single curve representing this specific account. The particular solution satisfies both the differential equation (by construction from the general solution) and the initial condition (by substitution).
ANSWER: Particular solution: \( A(t) = 50000e^{0.06t} \); Amount after 10 years: ₹91,105 (approx).

## WORKED_EXAMPLE_2
PROBLEM: The general solution of a differential equation describing the displacement of a spring-mass system is \( x(t) = C_1 \cos(4t) + C_2 \sin(4t) \). At time \( t = 0 \), the mass is displaced 3 cm from equilibrium and released from rest. Find the particular solution.
STEPS:
- Step 1: Write the general solution: \( x(t) = C_1 \cos(4t) + C_2 \sin(4t) \). Note two arbitrary constants \( C_1, C_2 \) — need two conditions.
- Step 2: Translate physical conditions into mathematical conditions: "Displaced 3 cm at t=0" means \( x(0) = 3 \). "Released from rest" means initial velocity \( v(0) = x'(0) = 0 \).
- Step 3: Apply first condition: \( x(0) = C_1 \cos(0) + C_2 \sin(0) = C_1 = 3 \). So \( C_1 = 3 \).
- Step 4: Differentiate to find velocity: \( x'(t) = -4C_1 \sin(4t) + 4C_2 \cos(4t) \). Apply second condition: \( x'(0) = -4C_1 \sin(0) + 4C_2 \cos(0) = 4C_2 = 0 \). So \( C_2 = 0 \).
- Step 5: Write particular solution: \( x(t) = 3\cos(4t) \).
REASONING: The two initial conditions (position and velocity) uniquely determine the two arbitrary constants. The resulting particular solution describes simple harmonic motion with amplitude 3 cm and angular frequency 4 rad/s.
ANSWER: Particular solution: \( x(t) = 3\cos(4t) \).

## WORKED_EXAMPLE_3
PROBLEM: The general solution of a differential equation modeling the cooling of a cup of chai in a Delhi winter is \( T(t) = 15 + Ce^{-0.1t} \), where T is temperature in °C and t is time in minutes. The chai is initially at 90°C. After how many minutes will it reach 40°C?
STEPS:
- Step 1: Identify general solution \( T(t) = 15 + Ce^{-0.1t} \) and initial condition: \( T(0) = 90 \).
- Step 2: Substitute initial condition: \( 90 = 15 + Ce^{0} \Rightarrow 90 = 15 + C \Rightarrow C = 75 \).
- Step 3: Write particular solution: \( T(t) = 15 + 75e^{-0.1t} \).
- Step 4: Set \( T(t) = 40 \) and solve for t: \( 40 = 15 + 75e^{-0.1t} \Rightarrow 25 = 75e^{-0.1t} \Rightarrow e^{-0.1t} = \frac{1}{3} \).
- Step 5: Take natural log: \( -0.1t = \ln(1/3) = -\ln 3 \Rightarrow t = \frac{\ln 3}{0.1} = 10\ln 3 \approx 10 \times 1.0986 = 10.986 \) minutes.
- Step 6: Interpret: The chai cools to 40°C in about 11 minutes.
REASONING: The ambient temperature (15°C) appears as the horizontal asymptote. The initial condition fixes C, and the particular solution allows us to answer "when" questions by solving for t.
ANSWER: Particular solution: \( T(t) = 15 + 75e^{-0.1t} \); Time to reach 40°C: \( 10\ln 3 \) minutes ≈ 11 minutes.

## COMPETENCY_QUESTION_1
QUESTION: A population of bacteria in a culture follows the differential equation \( \frac{dP}{dt} = kP \). The general solution is \( P(t) = P_0 e^{kt} \). At \( t = 0 \), the population is 2000. At \( t = 2 \) hours, the population is 8000. Find the particular solution and the population at \( t = 5 \) hours.
COMPETENCY: Problem solving and mathematical modeling — using two data points to determine both constants in an exponential growth model.
STEPS:
- Step 1: Use \( P(0) = 2000 \) in \( P(t) = P_0 e^{kt} \) to get \( P_0 = 2000 \).
- Step 2: Use \( P(2) = 8000 \): \( 8000 = 2000 e^{2k} \Rightarrow e^{2k} = 4 \Rightarrow 2k = \ln 4 = 2\ln 2 \Rightarrow k = \ln 2 \).
- Step 3: Particular solution: \( P(t) = 2000 e^{(\ln 2)t} = 2000 \cdot 2^t \).
- Step 4: Find \( P(5) = 2000 \cdot 2^5 = 2000 \times 32 = 64,000 \).
ANSWER: Particular solution: \( P(t) = 2000 \cdot 2^t \); Population at 5 hours: 64,000 bacteria.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The general solution of a differential equation is \( y = C_1 e^{x} + C_2 e^{2x} \). A student claims that the function \( y = 3e^{x} - 2e^{2x} \) is a particular solution corresponding to the initial conditions \( y(0) = 1 \) and \( y'(0) = -1 \). Verify the student's claim by checking all necessary conditions. If incorrect, find the correct particular solution for these initial conditions.
COMPETENCY: Critical evaluation and verification — checking a proposed solution against both the differential equation (implicitly via the general solution structure) and initial conditions.
STEPS:
- Step 1: Check if \( y = 3e^{x} - 2e^{2x} \) matches the general solution form: Yes, with \( C_1 = 3, C_2 = -2 \).
- Step 2: Check initial condition \( y(0) = 1 \): \( y(0) = 3e^0 - 2e^0 = 3 - 2 = 1 \) ✓
- Step 3: Compute \( y' = 3e^{x} - 4e^{2x} \). Check \( y'(0) = -1 \): \( y'(0) = 3 - 4 = -1 \) ✓
- Step 4: Both conditions satisfied. The student's claim is correct.
- Step 5: (If incorrect, would solve: \( y(0)=C_1+C_2=1 \), \( y'(0)=C_1+2C_2=-1 \Rightarrow C_1=3, C_2=-2 \))
ANSWER: The student's claim is correct. \( y = 3e^{x} - 2e^{2x} \) satisfies both initial conditions and is of the general solution form, so it is the particular solution.
DIFFICULTY: hard