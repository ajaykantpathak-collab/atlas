## ELI5
Imagine you're watching a sugar cube dissolve in hot tea — the rate at which it disappears depends on how much sugar is left at that moment. A differential equation is simply a mathematical sentence that describes *how fast something changes* in terms of *what its current state is*. The most common mix-up? Students think a differential equation is just "an equation with derivatives" — but it's actually a relationship between a quantity and its rate of change, which lets us predict the future from the present.

## DEFINITION
A differential equation is an equation involving one or more derivatives of a dependent variable with respect to one or more independent variables; when only one independent variable is involved, it is called an ordinary differential equation.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can identify whether a given equation is a differential equation, classify it as ordinary or partial, and explain in their own words what the derivative terms represent in a real-world rate-of-change context.

## SCOPE_BOUNDARY
This node introduces the definition and basic classification of differential equations (ordinary vs. partial) as per NCERT Class 12 Applied Mathematics Chapter 5; it does NOT cover order, degree, solution methods, or modeling applications — those are handled in subsequent nodes.

## WALKTHROUGH
Suppose a car's speedometer reads 60 km/h at a certain instant — that's the *rate of change* of distance with respect to time. Now imagine we write an equation saying "the speed is proportional to the remaining distance to destination" — that's a differential equation because it links the derivative (speed) to the variable itself (distance). To begin, students should recall from Class 11 (c11_app_cbse_08_008) that a derivative represents an instantaneous rate of change. The key insight: a differential equation doesn't just *contain* a derivative — it *expresses a law of change* that governs how a system evolves.

Takeaway: mastery means differential equations identified, classified ordinary or partial, and their derivative terms read as real-world rates. Exam moves: identification questions distinguish equations containing derivatives from algebraic ones; classification questions check the count of independent variables; interpretation questions translate each derivative term into the rate it represents — speed, cooling, dissolution. Method: the equation is a sentence about change; read the derivative as the verb. Drill: one speedometer, one sugar cube, one law of change. Containing a derivative makes the equation; expressing a law of change makes it useful. Collect five everyday rates — speed, cooling, dissolving, growth, draining — and write each as a differential sentence; classification then takes seconds, because the sentence's verb always announces the derivative.

## DIAGNOSTIC_QUESTION_1
Which of the following is a differential equation? (i) \( x^2 + 3x - 5 = 0 \) (ii) \( \frac{dy}{dx} + 2y = \sin x \) (iii) \( y = e^x \) (iv) \( \frac{d^2y}{dx^2} + y\frac{dy}{dx} = 0 \)

## DIAGNOSTIC_ANSWER_1
Correct: (ii) and (iv) are differential equations because they contain derivatives of the dependent variable \( y \) with respect to \( x \). (i) is an algebraic equation; (iii) is a function, not an equation involving derivatives. A wrong answer reveals the student cannot distinguish between an equation that *defines* a function and one that *relates a function to its derivatives* — a fundamental categorical error.

## DIAGNOSTIC_QUESTION_2
A student writes: "\( \frac{dy}{dx} = 3x^2 \) is not a differential equation because it can be solved by direct integration." Explain why this reasoning is incorrect.

## DIAGNOSTIC_ANSWER_2
The equation \( \frac{dy}{dx} = 3x^2 \) **is** a differential equation — it relates the derivative of \( y \) to \( x \). Solvability by integration does not change its classification; many differential equations are solved by integration. A student who says it's not a differential equation confuses *solution method* with *definition*. This reveals a misconception that only "hard" or "unsolvable directly" equations count as differential equations.

## DIAGNOSTIC_QUESTION_3
The temperature \( T \) (in °C) of a cooling cup of chai in a room at 25°C changes at a rate proportional to the difference between \( T \) and 25. Write the differential equation modeling this situation. Use \( k \) as the proportionality constant.

## DIAGNOSTIC_ANSWER_3
\( \frac{dT}{dt} = -k(T - 25) \), where \( k > 0 \). The negative sign indicates cooling (temperature decreases when \( T > 25 \)). A wrong answer (e.g., missing the minus sign, writing \( \frac{dT}{dt} = kT \), or using \( T - 25 \) without proportionality) shows the student cannot translate a verbal rate-of-change statement into a differential equation — the core modeling skill.

## DIAGNOSTIC_QUESTION_4
Compare the two equations: \( \frac{dy}{dx} = x + y \) and \( \frac{\partial u}{\partial x} + \frac{\partial u}{\partial y} = 0 \). What is the fundamental difference in what they describe? Give a real-world example for each.

## DIAGNOSTIC_ANSWER_4
The first is an **ordinary differential equation (ODE)** — one independent variable (\( x \)), describing how \( y \) changes along a single dimension (e.g., population growth over time). The second is a **partial differential equation (PDE)** — two independent variables (\( x, y \)), describing how \( u \) changes across a surface (e.g., steady-state temperature distribution on a metal plate). A student who cannot distinguish ODE vs PDE misses the dimensionality of the system being modeled.

## DIAGNOSTIC_QUESTION_5
A Class 12 student claims: "Every equation containing \( \frac{dy}{dx} \) is an ordinary differential equation." Evaluate this statement. Is it always true? Provide a counterexample if false.

## DIAGNOSTIC_ANSWER_5
The statement is **false**. An equation containing \( \frac{dy}{dx} \) could be a PDE if other partial derivatives are also present, e.g., \( \frac{\partial u}{\partial t} = \frac{\partial^2 u}{\partial x^2} \) (heat equation) contains \( \frac{\partial u}{\partial t} \) but is a PDE because \( u = u(x,t) \) has two independent variables. The claim oversimplifies by ignoring the number of independent variables. A student who agrees reveals a rote-memory definition without conceptual understanding of "ordinary" vs "partial".

## DIAGNOSTIC_QUESTION_6
Create your own real-world scenario (Indian context) that can be modeled by a first-order ordinary differential equation. Define the variables clearly and write the differential equation. Explain why it is ordinary and first-order.

## DIAGNOSTIC_ANSWER_6
Example: "The amount of money \( A \) (in ₹) in a savings account grows at a rate proportional to the current balance, with an annual interest rate of 5% compounded continuously." Let \( t \) = time in years. Then \( \frac{dA}{dt} = 0.05A \). It is **ordinary** because only one independent variable (\( t \)); **first-order** because the highest derivative is \( \frac{dA}{dt} \). A poor answer uses multiple independent variables, higher derivatives without justification, or fails to define variables — showing inability to construct a valid model.

## COMMON_MISCONCEPTION
Students often believe that a differential equation must contain *both* the function and its derivative (e.g., \( \frac{dy}{dx} + y = x \)), so they incorrectly classify \( \frac{dy}{dx} = x^2 \) as "not a differential equation" because \( y \) doesn't appear explicitly. This stems from seeing only standard linear forms in examples. In reality, \( \frac{dy}{dx} = f(x) \) is a perfectly valid ODE — it just happens to be directly integrable. The error persists because textbooks often jump to "standard forms" without emphasizing the broad definition.

## ON_FAILURE
If a student cannot distinguish differential equations from algebraic/functional equations: (1) Revisit Class 11 derivative concept (c11_app_cbse_08_008) — ensure they can explain \( \frac{dy}{dx} \) as "rate of change of y wrt x". (2) Give 5 mixed equations (algebraic, functional, ODE, PDE) and have them sort into categories with justification. (3) Re-test with DIAGNOSTIC_QUESTION_1. If still stuck, use physical analogies: "speed = derivative of distance" → "equation linking speed and distance" = differential equation.

## PREREQUISITE_NODE_IDS
c11_app_cbse_08_008, c11_app_cbse_08_003, c11_app_cbse_08_004

## PREREQUISITE_REASONS
c11_app_cbse_08_008: Instantaneous rate of change and derivative — essential to understand what a derivative represents in a differential equation.
c11_app_cbse_08_003: Graphical representation of functions — needed to visualize dependent/independent variable relationships.
c11_app_cbse_08_004: Domain and range of a function — required to understand the sets over which the differential equation is defined.

## FORWARD_NODE_IDS
c12_app_cbse_05_003, c12_app_cbse_05_004, c12_app_cbse_05_005

## FORWARD_REASONS
c12_app_cbse_05_003: Order of a Differential Equation — builds directly on recognizing what a differential equation is, then identifies the highest derivative.
c12_app_cbse_05_004: Degree of a Differential Equation — requires the equation to be a polynomial in derivatives, which assumes recognition of derivative terms.
c12_app_cbse_05_005: General and particular solutions — solving a differential equation presupposes knowing what one is.

## CROSS_SUBJECT_PREREQS
c12_app_cbse_05_001, c11_app_cbse_08_008

## CROSS_SUBJECT_REASONS
c12_app_cbse_05_001: Learning Outcomes — sets the overall goals for the chapter, framing why we study differential equations.
c11_app_cbse_08_008: Instantaneous rate of change and derivative — the conceptual bridge from calculus (rate of change) to differential equations (equations governing change).

## CHAIN_DESCRIPTION
c11_app_cbse_08_008 -> c12_app_cbse_05_002 -> c12_app_cbse_05_003

## THIS_FORMULA
N/A - conceptual

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_app_cbse_08_008 | The derivative as instantaneous rate of change is the building block of every differential equation; without this concept from Class 11 Calculus, the definition of a differential equation has no meaning.
c12_app_cbse_05_001 | The Learning Outcomes node frames the entire chapter's purpose — defining differential equations is the first step toward achieving those outcomes (order, degree, solutions, modeling).

## PREREQ_CONCEPT
The derivative as an instantaneous rate of change of a dependent variable with respect to an independent variable.

## PREREQ_BEFORE
The student must be able to interpret \( \frac{dy}{dx} \) as "the rate at which y changes with x" and recognize it in equations.

## PREREQ_STUCK
Review Class 11 Applied Mathematics node c11_app_cbse_08_008 (Instantaneous rate of change and derivative) — focus on the physical meaning, not just computation.

## WORKED_EXAMPLE_1
PROBLEM: A bacterial culture grows at a rate proportional to the number of bacteria present at any time \( t \). If the initial population is 500 and the proportionality constant is 0.03 per hour, write the differential equation governing the population \( P(t) \). Identify the dependent and independent variables, and state whether it is an ODE or PDE.
STEPS:
- Step 1: Identify the changing quantity — population \( P \) depends on time \( t \), so \( P \) is dependent, \( t \) is independent.
- Step 2: Translate "rate proportional to number present" — rate of change of \( P \) wrt \( t \) is \( \frac{dP}{dt} \); proportional means \( \frac{dP}{dt} = kP \).
- Step 3: Substitute given constant \( k = 0.03 \) → \( \frac{dP}{dt} = 0.03P \).
- Step 4: Classify — only one independent variable (\( t \)), so it is an ordinary differential equation (ODE).
- Step 5: Verify — the equation relates derivative of \( P \) to \( P \) itself, no partial derivatives, so ODE confirmed.
REASONING: The problem describes a rate-of-change law in a single-variable system (time only), which by definition yields an ODE. The derivative \( \frac{dP}{dt} \) captures the instantaneous growth rate.
ANSWER: Differential equation: \( \frac{dP}{dt} = 0.03P \); dependent variable: \( P \); independent variable: \( t \); type: ODE (ordinary, first-order).

## WORKED_EXAMPLE_2
PROBLEM: The temperature \( u(x,t) \) along a metal rod of length 1 meter satisfies \( \frac{\partial u}{\partial t} = 0.1 \frac{\partial^2 u}{\partial x^2} \), where \( x \) is position (0 to 1) and \( t \) is time. Explain why this is a partial differential equation, not an ordinary one. What physical phenomenon does it model?
STEPS:
- Step 1: Identify the dependent variable \( u \) and independent variables \( x \) (position) and \( t \) (time) — two independent variables.
- Step 2: Observe the derivatives — \( \frac{\partial u}{\partial t} \) and \( \frac{\partial^2 u}{\partial x^2} \) are partial derivatives because \( u \) depends on multiple variables.
- Step 3: Recall definition — an equation with partial derivatives of a function of two or more independent variables is a PDE.
- Step 4: Conclude — since \( u = u(x,t) \) and partial derivatives appear, it is a PDE.
- Step 5: Interpret physically — this is the one-dimensional heat equation, modeling heat diffusion along the rod.
REASONING: The presence of two independent variables (space and time) and partial derivatives distinguishes PDEs from ODEs. The heat equation is the canonical example of a PDE in physics.
ANSWER: It is a PDE because \( u \) depends on two independent variables (\( x \) and \( t \)) and the equation contains partial derivatives. It models heat conduction (diffusion) in a rod.

## WORKED_EXAMPLE_3
PROBLEM: A student writes the following as a differential equation for "the rate of change of volume \( V \) of a spherical balloon with respect to its radius \( r \) is proportional to the surface area": \( \frac{dV}{dr} = k \cdot 4\pi r^2 \). Is this correct? If yes, identify the order and explain why it's an ODE. If no, correct it.
STEPS:
- Step 1: Recall surface area of sphere = \( 4\pi r^2 \).
- Step 2: "Rate of change of \( V \) wrt \( r \)" = \( \frac{dV}{dr} \).
- Step 3: "Proportional to surface area" → \( \frac{dV}{dr} = k \cdot 4\pi r^2 \).
- Step 4: Check — the student's equation matches exactly. It contains only ordinary derivative \( \frac{dV}{dr} \) (one independent variable \( r \)), so it is an ODE.
- Step 5: Order — highest derivative is first derivative, so first-order ODE.
- Step 6: Bonus insight — this is actually the derivative of the volume formula \( V = \frac{4}{3}\pi r^3 \), so \( k = 1 \) in reality, but as a differential equation, \( k \) is an arbitrary constant of proportionality.
REASONING: The problem tests whether the student can verify a modeling translation and classify the resulting equation. The equation is correctly formulated and is a first-order ODE.
ANSWER: Yes, the equation is correct. It is a first-order ordinary differential equation because it involves only the first derivative of \( V \) with respect to a single independent variable \( r \).

## COMPETENCY_QUESTION_1
QUESTION: A car starts from rest and accelerates such that its acceleration \( a \) (in m/s²) at any time \( t \) (in seconds) is given by \( a = 6 - 0.5v \), where \( v \) is the velocity in m/s. Write the differential equation for \( v(t) \). Is it an ODE or PDE? What is its order? Without solving, describe the long-term behavior of \( v(t) \).
COMPETENCY: Mathematical modeling and qualitative analysis
STEPS:
- Step 1: Recognize acceleration \( a = \frac{dv}{dt} \).
- Step 2: Substitute into given relation: \( \frac{dv}{dt} = 6 - 0.5v \).
- Step 3: Identify — one independent variable \( t \), so ODE; highest derivative is first order.
- Step 4: Analyze long-term behavior — as \( v \) increases, \( 6 - 0.5v \) decreases; when \( v = 12 \), \( \frac{dv}{dt} = 0 \), so velocity approaches 12 m/s asymptotically (terminal velocity).
ANSWER: Differential equation: \( \frac{dv}{dt} = 6 - 0.5v \); ODE, first-order. Long-term: \( v(t) \to 12 \) m/s as \( t \to \infty \).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The concentration \( C(x,t) \) of a pollutant in a river (where \( x \) is distance downstream in km, \( t \) is time in days) satisfies \( \frac{\partial C}{\partial t} + u \frac{\partial C}{\partial x} = D \frac{\partial^2 C}{\partial x^2} \), with \( u = 2 \) km/day (flow speed) and \( D = 0.5 \) km²/day (diffusion coefficient). Classify this equation. Explain the physical meaning of each term. Why can this NOT be an ordinary differential equation?
COMPETENCY: Interdisciplinary application (environmental science) and PDE vs ODE distinction
STEPS:
- Step 1: Identify dependent variable \( C \) and independent variables \( x, t \) — two independent variables.
- Step 2: Note partial derivatives \( \frac{\partial C}{\partial t}, \frac{\partial C}{\partial x}, \frac{\partial^2 C}{\partial x^2} \) — confirms PDE.
- Step 3: Interpret terms: \( \frac{\partial C}{\partial t} \) = local rate of change; \( u \frac{\partial C}{\partial x} \) = advection (transport by flow); \( D \frac{\partial^2 C}{\partial x^2} \) = diffusion (spreading).
- Step 4: Explain why not ODE — an ODE would require only one independent variable, but here concentration varies in both space and time simultaneously; reducing to ODE would lose spatial distribution information.
ANSWER: It is a second-order linear partial differential equation (advection-diffusion equation). Terms represent temporal change, advective transport, and diffusive spreading. It cannot be an ODE because the system inherently depends on two independent variables (space and time).
DIFFICULTY: hard