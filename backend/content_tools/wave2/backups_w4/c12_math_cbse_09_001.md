## ELI5
A cup of chai cools in the Delhi winter, and its cooling rate depends on the gap between chai and room - a sentence whose translation is dT by dt equals minus k times the gap. That translation is a differential equation: any equation binding a dependent variable to its derivatives. Its first biography question is its order - the highest derivative appearing - and the chai's equation, carrying only a first derivative, is order one.

## DEFINITION
A differential equation is an equation that involves an independent variable, a dependent variable, and derivatives of the dependent variable with respect to the independent variable. The **order** of a differential equation is the order of the highest derivative of the dependent variable that appears in the equation. For example, in \( \frac{d^2y}{dx^2} + 3\frac{dy}{dx} + 2y = 0 \), the highest derivative is \( \frac{d^2y}{dx^2} \), so the order is 2.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) examine any given equation and correctly decide whether it is a differential equation, (2) identify the dependent and independent variables, (3) state the order by locating the highest derivative, and (4) distinguish between ordinary differential equations (derivatives w.r.t. one independent variable) and partial differential equations (derivatives w.r.t. more than one independent variable) — though the Class 12 scope is limited to ordinary differential equations.

## SCOPE_BOUNDARY
This node covers the definition of a differential equation, the definition of an ordinary differential equation, and the concept of order. It does **not** cover degree of a differential equation (next node), general/particular solutions, formation of differential equations, or any solution methods. Only first-order and higher-order ordinary differential equations as defined in NCERT Class 12 Chapter 9 are included.

## WALKTHROUGH
Imagine you are tracking the cooling of a cup of chai left on a table in a Delhi winter. The rate at which the temperature drops depends on the difference between the chai's temperature and the room temperature. In Class 11 (c11_math_cbse_13_006) you learned that "rate of change" is written as a derivative, e.g., \( \frac{dT}{dt} \). Writing "rate of change of temperature is proportional to temperature difference" gives \( \frac{dT}{dt} = -k(T - T_{\text{room}}) \). This equation contains a derivative — it is a **differential equation**. To analyse it, the first question is always: *what is the highest derivative present?* Here it is \( \frac{dT}{dt} \) (first derivative), so the **order is 1**. In this node you will practice identifying the order in a variety of equations, including those with second derivatives (\( \frac{d^2y}{dx^2} \) or \( y'' \)) and third derivatives (\( y''' \)).

Takeaway first: differential equations are derivative-bearing equations, and order is read off the highest derivative present - nothing else about the equation matters for that count. Exam moves: identification questions deciding what qualifies, variable questions naming dependent and independent, order questions reading the highest derivative, and type questions separating ordinary from partial equations. Method: rerun the chai - translate the cooling sentence into symbols, then count the steepest derivative on the page. Check yourself: powers and products of derivatives do not raise the order; only the tallest derivative present does, whatever its exponent. Drill: identify order and variables across five mixed equations, including one partial.

## DIAGNOSTIC_QUESTION_1
Which of the following equations is a differential equation?  
(A) \( x^2 - 5x + 6 = 0 \)  
(B) \( \sin x + \cos x = 1 \)  
(C) \( \frac{dy}{dx} + 2y = e^x \)  
(D) \( 3x + 4y = 12 \)

## DIAGNOSTIC_ANSWER_1
**Correct answer: (C)**  
Equation (C) contains the derivative \( \frac{dy}{dx} \), making it a differential equation. Equations (A), (B), and (D) involve only variables and constants, not derivatives. A common error is to select (A) or (D) because they are "equations", but they lack any derivative term. If a student chooses (A) or (D), they have not yet internalised that a differential equation **must** contain at least one derivative of the dependent variable.

## DIAGNOSTIC_QUESTION_2
The equation \( \frac{d^3y}{dx^3} + x\left(\frac{dy}{dx}\right)^2 - y = 0 \) is given. A student claims its order is 2 because the term \( \left(\frac{dy}{dx}\right)^2 \) has power 2. Explain why this reasoning is incorrect and state the correct order.

## DIAGNOSTIC_ANSWER_2
**Correct order: 3**  
The order is determined by the **highest derivative** that appears, not by the power (exponent) of any derivative. Here the derivatives present are \( \frac{d^3y}{dx^3} \) (third order) and \( \frac{dy}{dx} \) (first order). The highest is third order, so the order is 3. The student confused **order** (which derivative) with **degree** (power of the highest derivative, when the equation is polynomial in derivatives). This misconception is extremely common and must be corrected before moving to the degree concept in the next node.

## DIAGNOSTIC_QUESTION_3
Find the order of the differential equation:  
\( \left(\frac{d^2y}{dx^2}\right)^3 + \left(\frac{dy}{dx}\right)^4 + y^5 = 0 \)

## DIAGNOSTIC_ANSWER_3
**Order = 2**  
Step 1: Identify all derivatives: \( \frac{d^2y}{dx^2} \) (second derivative) and \( \frac{dy}{dx} \) (first derivative).  
Step 2: The highest order derivative is \( \frac{d^2y}{dx^2} \).  
Step 3: The powers (3 and 4) do not affect the order.  
Step 4: Therefore, order = 2.  
A wrong answer of 3 or 4 reveals the student is using the exponent of the highest derivative term instead of the derivative's order. A wrong answer of 1 reveals they only saw \( \frac{dy}{dx} \) and missed the second derivative.

## DIAGNOSTIC_QUESTION_4
Consider the two equations:  
(I) \( \frac{d^2y}{dx^2} + 3\frac{dy}{dx} + 2y = \sin x \)  
(II) \( \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0 \)  
Classify each as ordinary or partial differential equation and state the order of each.

## DIAGNOSTIC_ANSWER_4
**Equation (I):** Ordinary differential equation (ODE), order = 2. Only one independent variable \( x \); highest derivative is \( \frac{d^2y}{dx^2} \).  
**Equation (II):** Partial differential equation (PDE), order = 2. Two independent variables \( x \) and \( y \); highest derivatives are second-order partial derivatives.  
If a student labels (II) as an ODE, they have not noticed the partial derivative symbols \( \partial \) and multiple independent variables. NCERT Class 12 focuses only on ODEs, but recognising the distinction is a board-expectation competency.

## DIAGNOSTIC_QUESTION_5
A student writes: "The order of the differential equation \( y''' + 2y'' + y' = 0 \) is 3 because there are three terms." Evaluate this statement and correct it if necessary.

## DIAGNOSTIC_ANSWER_5
**The statement is incorrect.** The order is 3, but the reason is wrong. The order is 3 because the highest derivative present is \( y''' \) (third derivative), not because there are three terms. The number of terms is irrelevant; an equation like \( y''' = 0 \) has one term but order 3. If the student had written "order is 3 because the highest derivative is the third derivative", that would be correct. This diagnostic checks whether the student understands the **definition** versus a superficial pattern.

## DIAGNOSTIC_QUESTION_6
Construct a differential equation of order 2 that models the following situation: "The acceleration of a particle moving along a straight line is proportional to its displacement from the origin, but in the opposite direction." Use \( x \) for displacement and \( t \) for time.

## DIAGNOSTIC_ANSWER_6
**Expected answer:** \( \frac{d^2x}{dt^2} = -k x \) (where \( k > 0 \) is a constant).  
**Reasoning:** Acceleration is the second derivative of displacement with respect to time: \( a = \frac{d^2x}{dt^2} \). "Proportional to displacement" gives \( \frac{d^2x}{dt^2} \propto x \); "opposite direction" gives the negative sign. The highest derivative is second order, so the differential equation is of order 2.  
A poor answer might write \( \frac{dx}{dt} = -k x \) (order 1, confusing velocity with acceleration) or omit the negative sign. This reveals whether the student can translate a physical description into the correct derivative order.

## COMMON_MISCONCEPTION
**Misconception:** "The order of a differential equation is the highest power (exponent) of the derivative that appears."  
**Exact wrong step:** In \( \left(\frac{d^2y}{dx^2}\right)^3 + \frac{dy}{dx} = 0 \), the student sees the exponent 3 on the second derivative and answers "order = 3".  
**Why it is wrong:** Order is defined as the **order of the highest derivative** (i.e., how many times we differentiate), not the power to which that derivative is raised. The equation above contains a second derivative (\( \frac{d^2y}{dx^2} \)) and a first derivative (\( \frac{dy}{dx} \)); the highest derivative order is 2, so the order is 2. The power 3 relates to **degree** (when defined), not order. This confusion costs marks in both board exams (1-mark MCQ) and JEE (where order and degree are tested together).

## ON_FAILURE
If a student confuses order with degree/exponent:  
1. Revisit **c11_math_cbse_13_006** (Derivatives: Intuitive Idea) and **c11_math_cbse_13_007** (Derivative of Polynomial Functions) to reinforce that \( \frac{d^2y}{dx^2} \) means "differentiate twice", while \( \left(\frac{d^2y}{dx^2}\right)^3 \) means "differentiate twice, then cube the result".  
2. Practice with a table: list each derivative in the equation, write its order (1, 2, 3...), then pick the maximum. Do this for 5–10 equations until the distinction is automatic.  
3. Re-attempt Diagnostic Questions 2 and 3, explaining aloud why the exponent does not determine order.

## PREREQUISITE_NODE_IDS
c11_math_cbse_13_006, c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009, c11_math_cbse_13_010, c11_math_cbse_02_005
## PREREQUISITE_REASONS
c11_math_cbse_13_006: Provides the intuitive idea of a derivative as a rate of change, which is the foundation for forming differential equations.  
c11_math_cbse_13_007: Gives computational fluency with derivatives of polynomial functions, needed to recognise derivative terms in an equation.  
c11_math_cbse_13_008: First-principle understanding ensures the student knows what a derivative represents, not just how to compute it.  
c11_math_cbse_13_009: Algebra of derivatives (sum, product rules) is used when verifying solutions in later nodes.  
c11_math_cbse_13_010: Derivatives of trigonometric functions appear in many differential equations in this chapter.  
c11_math_cbse_02_005: Concept of a function (dependent/independent variable) is essential to identify which variable is differentiated with respect to which.

## FORWARD_NODE_IDS
c12_math_cbse_09_002, c12_math_cbse_09_003, c12_math_cbse_09_004, c12_math_cbse_09_005, c12_math_cbse_09_006, c12_math_cbse_09_007, c12_math_cbse_09_008
## FORWARD_REASONS
c12_math_cbse_09_002: Degree of a differential equation builds directly on the concept of order; you must know the highest derivative before checking its power.  
c12_math_cbse_09_003: General and particular solutions require knowing the order to predict the number of arbitrary constants in the general solution.  
c12_math_cbse_09_004: Formation of a differential equation from a general solution involves differentiating the given relation as many times as the order.  
c12_math_cbse_09_005: Variable separable method applies to first-order equations; identifying order tells you if this method is applicable.  
c12_math_cbse_09_006: Homogeneous differential equations are a class of first-order equations; order identification is the first step.  
c12_math_cbse_09_007: Linear differential equations \( \frac{dy}{dx} + Py = Q \) are first-order; order tells you the integrating factor method applies.  
c12_math_cbse_09_008: Exact differential equations are also first-order; order classification is the entry point.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_007
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivatives represent instantaneous rate of change; this concept is used in physics (velocity = dx/dt, acceleration = dv/dt), chemistry (rate of reaction = d[conc]/dt), and biology (population growth rate = dP/dt). Differential equations model these rates.  
c11_math_cbse_13_007: Polynomial derivatives appear in mathematical models across sciences; e.g., in physics, motion with constant jerk leads to third-order polynomial position functions, whose derivatives form differential equations.

## CHAIN_DESCRIPTION
c11_math_cbse_13_006 -> c12_math_cbse_09_001 -> c12_math_cbse_09_002

## THIS_FORMULA
N/A - conceptual

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_math_cbse_13_006 | Derivatives (rate of change) form the basis of differential equations used in physics for motion, in chemistry for reaction rates, and in biology for population dynamics.  
c11_math_cbse_13_007 | Derivative of polynomial functions is used to model polynomial growth/decay in differential equations across sciences.
## PREREQ_CONCEPT
Derivative notation and the meaning of first, second, and higher-order derivatives (Class 11 Limits and Derivatives).

## PREREQ_BEFORE
The student must be able to read and write derivative notation (\( y', y'', \frac{dy}{dx}, \frac{d^2y}{dx^2} \)) and identify the dependent and independent variables in a given relation.

## PREREQ_STUCK
If stuck, revisit Class 11 Limits and Derivatives (nodes c11_math_cbse_13_006 through c11_math_cbse_13_010) and practice identifying the order of derivatives in mixed expressions.

## WORKED_EXAMPLE_1
PROBLEM: The population \( P \) (in thousands) of a city grows at a rate proportional to the current population. Write the differential equation describing this growth and state its order.  
STEPS:
- Step 1: Identify the variables. Population \( P \) depends on time \( t \). So \( P \) is the dependent variable, \( t \) is the independent variable.
- Step 2: Translate "rate of growth" into derivative notation. Rate of growth of population with respect to time is \( \frac{dP}{dt} \).
- Step 3: Translate "proportional to the current population". This means \( \frac{dP}{dt} = kP \), where \( k \) is a constant of proportionality ( \( k > 0 \) for growth).
- Step 4: Check for derivatives. The equation contains \( \frac{dP}{dt} \), which is a first derivative. No higher derivatives appear.
- Step 5: State the order. The highest derivative is first order, so the order of the differential equation is 1.
REASONING: The problem describes a rate of change, which is exactly what a derivative captures. Writing the verbal statement in mathematical symbols yields a differential equation. The order is simply the highest derivative present.
ANSWER: Differential equation: \( \frac{dP}{dt} = kP \); Order = 1.

## WORKED_EXAMPLE_2
PROBLEM: Determine the order of the differential equation: \( x\frac{d^3y}{dx^3} + \left(\frac{d^2y}{dx^2}\right)^2 + y = \sin x \).  
STEPS:
- Step 1: List every derivative term that appears: \( \frac{d^3y}{dx^3} \) (third derivative), \( \frac{d^2y}{dx^2} \) (second derivative).
- Step 2: Note the powers: the third derivative appears to the power 1; the second derivative is squared (power 2).
- Step 3: Recall the definition: order = order of the highest derivative, regardless of its power or coefficient.
- Step 4: The highest derivative is \( \frac{d^3y}{dx^3} \), which is of order 3.
- Step 5: Conclude the order is 3. (The power 2 on the second derivative does not make the order 2 or 4.)
REASONING: Students often mistakenly use the exponent of a derivative term. The definition explicitly says "order of the highest order derivative", not "highest power". Here the highest derivative is the third derivative, so order = 3.
ANSWER: Order = 3.

## WORKED_EXAMPLE_3
PROBLEM: A particle moves along the x-axis. Its acceleration \( a \) is given by \( a = -4x \), where \( x \) is the displacement from the origin. Write the differential equation for the motion and find its order. Then, if the velocity \( v = \frac{dx}{dt} \), rewrite the equation in terms of \( v \) and \( x \) and state the order of the new equation.  
STEPS:
- Step 1: Recall acceleration is the second derivative of displacement with respect to time: \( a = \frac{d^2x}{dt^2} \).
- Step 2: Substitute into the given relation: \( \frac{d^2x}{dt^2} = -4x \). This is the differential equation in terms of \( x \) and \( t \).
- Step 3: Identify the highest derivative: \( \frac{d^2x}{dt^2} \) is a second derivative. So order = 2.
- Step 4: To rewrite in terms of \( v \) and \( x \), use the chain rule: \( a = \frac{dv}{dt} = \frac{dv}{dx} \cdot \frac{dx}{dt} = v \frac{dv}{dx} \).
- Step 5: Substitute: \( v \frac{dv}{dx} = -4x \). This is a differential equation in variables \( v \) and \( x \).
- Step 6: The highest derivative here is \( \frac{dv}{dx} \) (first derivative of \( v \) with respect to \( x \)). So the order of this transformed equation is 1.
REASONING: The same physical situation can be described by differential equations of different orders depending on the choice of variables. The original equation is second-order in \( x(t) \); using \( v = dx/dt \) and the chain rule reduces it to a first-order equation in \( v(x) \). This illustrates why identifying the dependent and independent variables is crucial for stating the order correctly.
ANSWER: Original equation: \( \frac{d^2x}{dt^2} = -4x \), order = 2. Transformed equation: \( v \frac{dv}{dx} = -4x \), order = 1.

## COMPETENCY_QUESTION_1
QUESTION: A cup of coffee at 90°C is placed in a room at 20°C. The rate of cooling of the coffee is proportional to the difference between its temperature and the room temperature.  
(a) Let \( T \) be the temperature of the coffee at time \( t \). Write the differential equation for this situation.  
(b) What is the order of this differential equation?  
(c) If the coffee cools to 85°C in 2 minutes, explain why this information alone is not enough to find the particular solution.  
COMPETENCY: Translating real-world situations to mathematical expressions  
STEPS:
- Step 1: Identify variables: \( T \) (temperature) depends on \( t \) (time).
- Step 2: "Rate of cooling" = \( \frac{dT}{dt} \). Since temperature decreases, the rate is negative.
- Step 3: "Proportional to the difference between its temperature and room temperature" → \( \frac{dT}{dt} = -k(T - 20) \), \( k > 0 \).
- Step 4: The highest derivative is \( \frac{dT}{dt} \) (first order), so order = 1.
- Step 5: A particular solution requires an initial condition (e.g., \( T(0) = 90 \)). The information "cools to 85°C in 2 minutes" gives \( T(2) = 85 \), which is a condition at \( t=2 \), not the initial condition at \( t=0 \). Without \( T(0) \), the arbitrary constant cannot be determined uniquely.
ANSWER: (a) \( \frac{dT}{dt} = -k(T - 20) \) (b) Order = 1 (c) The condition \( T(2)=85 \) is not an initial condition at \( t=0 \); the general solution contains one arbitrary constant which requires the value at \( t=0 \) (or any single point) to be fixed. \( T(2)=85 \) alone leaves a family of solutions.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the differential equation \( \frac{d^2y}{dx^2} + 5\frac{dy}{dx} + 6y = 0 \).  
(a) State its order.  
(b) How many arbitrary constants will its general solution contain? Justify.  
(c) A student claims that \( y = e^{-2x} \) is the general solution. Evaluate this claim and correct it if necessary.  
COMPETENCY: Comparing and justifying  
STEPS:
- Step 1: Identify the highest derivative: \( \frac{d^2y}{dx^2} \) → order = 2.
- Step 2: For an ordinary differential equation, the general solution contains as many arbitrary constants as the order. Hence, the general solution will have 2 arbitrary constants.
- Step 3: Check the student's claim: \( y = e^{-2x} \) has no arbitrary constants; it is a particular solution (it satisfies the DE, as can be verified by substitution). The general solution must be of the form \( y = C_1 e^{-2x} + C_2 e^{-3x} \) (two arbitrary constants \( C_1, C_2 \)).
- Step 4: Conclude the claim is incorrect; the given function is a particular solution, not the general solution.
ANSWER: (a) Order = 2. (b) The general solution contains 2 arbitrary constants because the order is 2. (c) The claim is false. \( y = e^{-2x} \) is a particular solution (obtained by choosing \( C_1=1, C_2=0 \)). The general solution is \( y = C_1 e^{-2x} + C_2 e^{-3x} \).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A ______ equation is an equation that involves an independent variable, a dependent variable, and derivatives of the dependent variable with respect to the independent variable.

## DIAGNOSTIC_ANSWER_7
differential

Differential is the equation's family name: the defining trait is the derivative's presence among the terms. **A wrong answer (an algebraic word) reveals the student has admitted derivative-free equations into a family defined by them.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are tracking the ______ of a cup of chai left on a table in a Delhi winter.

## DIAGNOSTIC_ANSWER_8
cooling

The cooling is the tracked process: temperature over time is the dependent variable whose derivatives the equation will carry. **A wrong answer (the winter) reveals the student has tracked the weather when the chai is the subject.** The cooling is the tracked process: temperature versus time is the relationship whose derivative the equation will carry.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can (1) examine any given equation and correctly decide whether it is a differential equation, (2) identify the dependent and independent variables, (3) state the order by locating the highest derivative, and (4) distinguish between ordinary differential equations (derivatives w.r.t. one independent variable) and partial.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are ______ the cooling of a cup of chai left on a table in a Delhi winter.

## DIAGNOSTIC_ANSWER_10
tracking

The tracking verb is the observer's role: the chai's temperature is watched, and its rate of change written down. **A wrong answer (a drinking verb) reveals the student has ended the experiment before the differential equation could be written.**
