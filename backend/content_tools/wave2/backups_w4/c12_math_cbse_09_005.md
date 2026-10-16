## ELI5
A bacterial culture grows in proportion to its own size - dP by dt equals k P - and such equations, where the variables can be herded to opposite sides, are variable separable. Herd the Ps left and the ts right, integrate both sides independently, and log of P equals k t plus C emerges; exponentiate and the population reads P equals A e to the k t. The separation converts one differential equation into two ordinary integrals, one per variable.

## DEFINITION
A first-order first-degree differential equation is said to be of **variable separable type** if it can be expressed in the form \(\frac{dy}{dx} = g(x) \, h(y)\), where \(g(x)\) is a function of \(x\) only and \(h(y)\) is a function of \(y\) only. Provided \(h(y) \neq 0\), the variables are separated as \(\frac{1}{h(y)}\,dy = g(x)\,dx\), and the general solution is obtained by integrating both sides: \(\int \frac{1}{h(y)}\,dy = \int g(x)\,dx + C\), where \(C\) is an arbitrary constant.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can: (1) Identify whether a given first-order first-degree differential equation is separable. (2) Correctly separate the variables algebraically, including handling constants and implicit forms. (3) Integrate both sides using appropriate integration techniques (substitution, partial fractions, standard integrals). (4) Write the general solution with the arbitrary constant, and find a particular solution when an initial condition is given.

## SCOPE_BOUNDARY
Covers the standard variable-separable method for first-order first-degree ODEs as per NCERT Class 12 Chapter 9.4.1. Includes equations reducible to separable form by simple algebraic manipulation (e.g., \(\frac{dy}{dx} = \frac{x+1}{y-2}\)). Does NOT cover homogeneous equations, linear equations, exact equations, or higher-order/degree equations (these are separate nodes). Does NOT cover singular solutions or envelopes.

## WALKTHROUGH
Imagine you are tracking the growth of a bacterial culture in a lab: the rate of increase of bacteria is proportional to the current population. This gives \(\frac{dP}{dt} = kP\), where \(P\) is population and \(t\) is time. To find the population at any time, we must separate the variables \(P\) and \(t\). First, rewrite the equation as \(\frac{1}{P}\,dP = k\,dt\). This step is valid because we treat \(dP\) and \(dt\) as differentials that can be moved algebraically (Leibniz notation). Next, integrate both sides: \(\int \frac{1}{P}\,dP = \int k\,dt\). The left side gives \(\ln|P|\), the right gives \(kt + C\). Finally, solve for \(P\) to get \(P = Ae^{kt}\). The key insight is that **separating variables converts a differential equation into two independent integration problems**, one in \(x\) and one in \(y\).

Takeaway first: separability is the test - can the equation be written as g of x dx equals h of y dy - and the solution is simply two integrals plus a constant. Exam moves: identification questions testing separability, separation questions herding the variables, integration questions on both sides, and initial-condition questions fixing the constant. Method: rerun the culture - divide by P, multiply by dt, integrate, exponentiate, and let the starting population name A. Check yourself: the separation step treats dy and dx as separable differentials; dividing by h of y additionally requires h never to vanish - say where it does, and note the lost solution. Drill: solve one separable equation end to end and apply one initial condition.

## DIAGNOSTIC_QUESTION_1
**REMEMBER**: Write the general form of a first-order first-degree differential equation that is solvable by the variable separable method. State the condition on \(h(y)\) for separation to be valid.

## DIAGNOSTIC_ANSWER_1
The general form is \(\frac{dy}{dx} = g(x) \, h(y)\). The condition is \(h(y) \neq 0\); otherwise division by \(h(y)\) is not allowed and the separation step \(\frac{1}{h(y)}dy = g(x)dx\) is invalid. If a student writes \(\frac{dy}{dx} = g(x) + h(y)\) or forgets the condition \(h(y) \neq 0\), they confuse separable equations with linear/additive forms and miss the critical domain restriction that could lose constant solutions (e.g., \(y = \text{constant}\) when \(h(y)=0\)).

## DIAGNOSTIC_QUESTION_2
**UNDERSTAND**: Consider the differential equation \(\frac{dy}{dx} = \frac{x^2 + 1}{y^2 + 1}\). A student writes the separated form as \((y^2+1)dy = (x^2+1)dx\) and integrates to get \(\frac{y^3}{3} + y = \frac{x^3}{3} + x + C\). Is this correct? Explain why or why not, and identify the exact step where the error occurs.

## DIAGNOSTIC_ANSWER_2
The student’s separated form is **incorrect**. The correct separation is \((y^2+1)\,dy = (x^2+1)\,dx\)? Wait, the original equation is \(\frac{dy}{dx} = \frac{x^2+1}{y^2+1}\). Cross-multiplying gives \((y^2+1)\,dy = (x^2+1)\,dx\). That is actually correct. But the student wrote \((y^2+1)dy = (x^2+1)dx\) and integrated to \(\frac{y^3}{3}+y = \frac{x^3}{3}+x+C\). That is correct. However, if the student had written \((y^2+1) = (x^2+1)\frac{dx}{dy}\) or something else, it would be wrong. Let's make a better question. Actually, the student's work is correct. Let's change the question to expose a common error: forgetting to include \(dx\) and \(dy\) properly or misplacing the differentials. Let's use: "A student writes \(\int (y^2+1) = \int (x^2+1) + C\)." That's missing differentials. But the question asks to identify the error in the given steps. Let's re-read: "A student writes the separated form as \((y^2+1)dy = (x^2+1)dx\) and integrates to get \(\frac{y^3}{3} + y = \frac{x^3}{3} + x + C\)." That is correct. I need a question that has an error. Let's make the equation \(\frac{dy}{dx} = \frac{x^2+1}{y^2+1}\) and the student writes \((y^2+1) = (x^2+1)\frac{dx}{dy}\)? No. Let's use a different equation: \(\frac{dy}{dx} = \frac{x}{y}\). Student writes \(y\,dy = x\,dx\)? That's correct. Let's do: \(\frac{dy}{dx} = \frac{x}{y}\). Student writes \(dy = \frac{x}{y}dx\) and then integrates \(\int dy = \int \frac{x}{y} dx\). That's not separated. Better: The student writes \(\int y = \int x dx\). Missing differentials. Let's craft a new question.

**REVISED DIAGNOSTIC_QUESTION_2**:
**UNDERSTAND**: Consider the differential equation \(\frac{dy}{dx} = \frac{x}{y}\). A student writes the separated form as \(y = x\,dx\) and then integrates to get \(\frac{y^2}{2} = \frac{x^2}{2} + C\). Is this correct? Explain why or why not, and identify the exact step where the error occurs.

## DIAGNOSTIC_ANSWER_2
The student’s separated form \(y = x\,dx\) is **incorrect**. The correct separation is \(y\,dy = x\,dx\). The error occurs in the very first algebraic step: the student divided by \(y\) but forgot to multiply by \(dy\), leaving \(y\) without a differential. This leads to an integral \(\int y\) (which is meaningless without \(dy\)) instead of \(\int y\,dy\). The correct integration yields \(\frac{y^2}{2} = \frac{x^2}{2} + C\). If a student writes \(y = x\,dx\), they treat \(dy/dx\) as a fraction but mishandle the differentials, a common sign of not understanding the Leibniz notation manipulation.

## DIAGNOSTIC_QUESTION_3
**APPLY**: Find the general solution of the differential equation \(\frac{dy}{dx} = \frac{2x}{y+1}\), given that \(y \neq -1\). Show all steps of separation and integration.

## DIAGNOSTIC_ANSWER_3
**Step 1**: Separate variables: \((y+1)\,dy = 2x\,dx\).  
**Step 2**: Integrate both sides: \(\int (y+1)\,dy = \int 2x\,dx\).  
**Step 3**: Compute integrals: \(\frac{y^2}{2} + y = x^2 + C\).  
**Step 4**: Multiply by 2 to simplify: \(y^2 + 2y = 2x^2 + 2C\). Let \(2C = C_1\).  
**Step 5**: Complete the square: \((y+1)^2 = 2x^2 + C_1 + 1\). Let \(C_1+1 = C_2\).  
General solution: \((y+1)^2 = 2x^2 + C\) (where \(C\) is an arbitrary constant).  
If a student writes \(\int \frac{1}{y+1}dy = \int 2x dx\), they inverted the fraction incorrectly (thinking \(\frac{dy}{dx} = \frac{2x}{y+1} \Rightarrow \frac{1}{y+1}dy = 2x dx\)). This is the most frequent error: putting the \(y\)-term in the denominator instead of numerator.

## DIAGNOSTIC_QUESTION_4
**ANALYZE**: Compare the differential equations \(\frac{dy}{dx} = \frac{x}{y}\) and \(\frac{dy}{dx} = \frac{y}{x}\). Both are separable. Without solving completely, describe how their solution curves differ geometrically. What does this tell you about the relationship between the algebraic form and the geometry of the family of solutions?

## DIAGNOSTIC_ANSWER_4
For \(\frac{dy}{dx} = \frac{x}{y}\), separation gives \(y\,dy = x\,dx \Rightarrow y^2 - x^2 = C\) (hyperbolas centered at origin with transverse axis along \(y\)-axis if \(C>0\), along \(x\)-axis if \(C<0\)). For \(\frac{dy}{dx} = \frac{y}{x}\), separation gives \(\frac{dy}{y} = \frac{dx}{x} \Rightarrow \ln|y| = \ln|x| + C \Rightarrow y = kx\) (straight lines through origin). The first family consists of hyperbolas (quadratic in \(x,y\)), the second of lines (linear). The difference arises because in the first equation the variables are **multiplicatively inverted** relative to each other, leading to quadratic integrals; in the second they are **directly proportional**, leading to logarithmic integrals and linear solutions. A student who only memorizes “separate and integrate” without recognizing the structural difference will miss this geometric insight, which is crucial for JEE-style questions asking about the nature of solution curves.

## DIAGNOSTIC_QUESTION_5
**EVALUATE**: A student solves \(\frac{dy}{dx} = e^{x-y}\) as follows:
\[
\frac{dy}{dx} = e^x e^{-y} \implies e^y dy = e^x dx \implies \int e^y dy = \int e^x dx \implies e^y = e^x + C \implies y = \ln(e^x + C).
\]
They claim the general solution is \(y = \ln(e^x + C)\). Is this fully correct? If not, what is missing and why does it matter for the domain of the solution?

## DIAGNOSTIC_ANSWER_5
The solution is **incomplete**. The step \(e^y = e^x + C\) implies \(e^x + C > 0\) for the logarithm to be defined. The student did not state the domain restriction: \(e^x + C > 0 \Rightarrow x > \ln(-C)\) if \(C < 0\). Moreover, the constant solution \(y = \text{constant}\) is not captured here because we divided by \(e^y\) (which is never zero, so no loss). However, the arbitrary constant \(C\) can be any real number, but the expression \(y = \ln(e^x + C)\) is only valid when \(e^x + C > 0\). A complete answer must include this condition. In board exams, marks are deducted for ignoring domain restrictions; in JEE, such oversights lead to wrong options in multiple-choice questions where domain determines the number of solutions.

## DIAGNOSTIC_QUESTION_6
**CREATE**: Construct a real-world problem (in an Indian context, e.g., finance, population, physics) that leads to a separable differential equation of the form \(\frac{dy}{dx} = \frac{g(x)}{h(y)}\) where \(g(x)\) is a quadratic polynomial and \(h(y)\) is a linear function. Write the problem statement, derive the differential equation, and find the general solution.

## DIAGNOSTIC_ANSWER_6
**Problem**: A spherical balloon is being inflated such that the rate of increase of its volume \(V\) (in cm³) with respect to time \(t\) (in seconds) is proportional to the square of the radius \(r\). Given \(V = \frac{4}{3}\pi r^3\), derive the differential equation for \(r(t)\) and solve it.
**Derivation**: \(\frac{dV}{dt} = k r^2\). But \(\frac{dV}{dt} = \frac{dV}{dr}\frac{dr}{dt} = 4\pi r^2 \frac{dr}{dt}\). So \(4\pi r^2 \frac{dr}{dt} = k r^2 \Rightarrow \frac{dr}{dt} = \frac{k}{4\pi}\) (constant). That gives linear \(r\), not quadratic/linear separable. Let's make a better one.
**Better Problem**: The rate of cooling of a hot object (Newton's Law of Cooling) is proportional to the temperature difference between the object and the surroundings. If surroundings are at 25°C and the object's temperature is \(T\), then \(\frac{dT}{dt} = -k(T-25)\). That's linear/linear. Need quadratic/linear.
**Created Problem**: A chemical reaction rate is given by \(\frac{dx}{dt} = k(a-x)^2\) where \(x\) is amount reacted, \(a\) is initial concentration. That's separable with \(g(x) = k(a-x)^2\) and \(h(y)=1\). Not quadratic in \(t\).
**Final Created Problem**: The marginal cost \(C'(x)\) of producing \(x\) units of a product is given by \(C'(x) = \frac{3x^2 + 2x}{C(x) + 10}\), where \(C(x)\) is the total cost in rupees. Find the general cost function.
**DE**: \(\frac{dC}{dx} = \frac{3x^2+2x}{C+10} \Rightarrow (C+10)dC = (3x^2+2x)dx\).
**Solution**: \(\int (C+10)dC = \int (3x^2+2x)dx \Rightarrow \frac{C^2}{2} + 10C = x^3 + x^2 + K\).
This is a valid example. A good student answer will show correct separation, integration, and interpretation of the constant. A poor answer will either mis-separate (e.g., put \(C+10\) in denominator) or forget the constant of integration.

## COMMON_MISCONCEPTION
**Misconception**: “When separating variables, I can always cross-multiply \(dy\) and \(dx\) as if they are numbers, so \(\frac{dy}{dx} = \frac{x}{y}\) becomes \(dy = \frac{x}{y} dx\) or even \(y = x \frac{dx}{dy}\).”  
**Why it’s wrong**: \(dy/dx\) is a **single symbol** for the derivative, not a fraction. The separation step \(\frac{1}{h(y)}dy = g(x)dx\) is a **formal mnemonic** justified by the chain rule: \(\int \frac{1}{h(y)} \frac{dy}{dx} dx = \int g(x) dx\). Students who treat \(dy\) and \(dx\) as independent numbers often drop differentials (writing \(\int y = \int x dx\)) or incorrectly invert fractions (writing \(\frac{dx}{dy} = \frac{y}{x}\) and then \(dx = \frac{y}{x} dy\)). The correct algebraic step is to multiply both sides by \(dx\) and divide by \(h(y)\): \(\frac{1}{h(y)} \frac{dy}{dx} dx = g(x) dx \Rightarrow \frac{1}{h(y)} dy = g(x) dx\). Every term must have a differential (\(dy\) or \(dx\)) attached to the variable being integrated.

## ON_FAILURE
If a student consistently mis-separates variables (e.g., puts \(y\)-terms in the wrong side, drops \(dy/dx\), or forgets the constant of integration), follow this remediation:
1. **Revisit the chain rule justification**: Show that \(\int \frac{1}{h(y)} \frac{dy}{dx} dx = \int \frac{1}{h(y)} dy\) by substitution \(u = y(x)\). Use a simple example: \(\frac{dy}{dx} = 2x y\). Write \(\frac{1}{y} \frac{dy}{dx} = 2x\), then integrate both sides w.r.t \(x\): \(\int \frac{1}{y} \frac{dy}{dx} dx = \int 2x dx\). Substitute \(u=y, du = \frac{dy}{dx}dx\) to get \(\int \frac{1}{u} du = x^2 + C\). This proves the mnemonic works.
2. **Drill differential placement**: Give 5 equations and ask the student to **only** write the separated form with differentials (no integration). Check that every term has \(dy\) or \(dx\).
3. **Re-diagnostic**: Ask the student to solve \(\frac{dy}{dx} = \frac{3x^2}{2y+1}\) and identify the domain restriction. If they correctly write \((2y+1)dy = 3x^2 dx\) and integrate to \(y^2+y = x^3 + C\), they have mastered the step.

## PREREQUISITE_NODE_IDS
c12_math_cbse_09_001, c12_math_cbse_09_002, c12_math_cbse_09_003, c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009, c11_math_cbse_13_010, c11_math_cbse_02_005, c11_math_cbse_02_006, c11_math_cbse_02_007, c12_math_cbse_09_004

## PREREQUISITE_REASONS
c12_math_cbse_09_001: Need to recognize first-order first-degree DEs and their order/degree before applying solution methods.
c12_math_cbse_09_002: Degree must be defined (polynomial in derivatives) for standard solution methods to apply.
c12_math_cbse_09_003: Understanding general vs particular solutions is essential to interpret the arbitrary constant after integration.
c11_math_cbse_13_007: Derivative of polynomial functions used in verifying solutions and in applications (e.g., rate of change problems).
c11_math_cbse_13_008: First principle of derivatives underpins the meaning of \(dy/dx\) and the separation mnemonic.
c11_math_cbse_13_009: Algebra of derivatives (sum, product, chain rule) is used when differentiating implicit solutions to verify.
c11_math_cbse_13_010: Derivatives of trigonometric functions appear in integrals when solving separable DEs involving trig functions (e.g., \(\int \sec^2 x dx\)).
c11_math_cbse_02_005: Functions (domain, range, types) needed to understand the functions \(g(x)\) and \(h(y)\) and the condition \(h(y) \neq 0\).
c11_math_cbse_02_006: Identity and constant functions appear as simple \(g(x)\) or \(h(y)\) in separable equations.
c11_math_cbse_02_007: Polynomial functions are the most common \(g(x)\) and \(h(y)\) in textbook exercises.
c12_math_cbse_09_004: Variable separable method solves first-order DEs often formed from one-constant families.  

## FORWARD_NODE_IDS
c12_math_cbse_09_006, c12_math_cbse_09_007, c12_math_cbse_09_008
## FORWARD_REASONS
c12_math_cbse_09_006: Homogeneous equations are solved by substituting \(y=vx\) which **reduces them to variable separable form**; mastery of this node is prerequisite.
c12_math_cbse_09_007: Linear equations use an integrating factor; the final step \(\int Q \cdot I.F. dx\) often requires integration techniques practiced here.
c12_math_cbse_09_008: Exact equations are identified by checking \(\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}\); solving them involves integrating \(M dx\) or \(N dy\), directly using separation/integration skills.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_stat_cbse_05_002, c11_stat_cbse_07_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Intuitive idea of derivatives as rates of change connects to physics (velocity, acceleration) and chemistry (reaction rates) where separable DEs model real phenomena.
c11_stat_cbse_05_002: Arithmetic mean and averages in statistics involve summation/integration concepts analogous to finding average values from differential equations.
c11_stat_cbse_07_001: Correlation and regression use derivatives for optimization (least squares), which involves solving differential equations; separable DEs appear in growth/decay models used in econometrics.

## CHAIN_DESCRIPTION
c12_math_cbse_09_001 -> c12_math_cbse_09_005 -> c12_math_cbse_09_006

## THIS_FORMULA
\(\frac{dy}{dx} = g(x) h(y) \implies \frac{1}{h(y)} dy = g(x) dx \implies \int \frac{1}{h(y)} dy = \int g(x) dx + C\)

## FORMULA_VARIABLES
\(x\) = independent variable; \(y\) = dependent variable; \(g(x)\) = function of \(x\) only; \(h(y)\) = function of \(y\) only; \(C\) = arbitrary constant of integration.

## FORMULA_UNITS
Dimensionless (pure mathematical relationship). In applications, units depend on context: e.g., if \(x\) is time (seconds) and \(y\) is distance (metres), then \(dy/dx\) has units m/s.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_03_001 | Motion in a straight line: velocity \(v = dx/dt\) and acceleration \(a = dv/dt\) lead to separable DEs when \(a = f(v)\) or \(a = f(x)\).
 c12_chem_cbse_04_001 | Chemical kinetics: rate law \(dx/dt = k(a-x)^n\) is separable; integration gives integrated rate equations for zero, first, second order reactions.
 c12_bio_cbse_13_001 | Population ecology: exponential growth \(dN/dt = rN\) and logistic growth \(dN/dt = rN(1-N/K)\) are separable DEs solved by this method.
## PREREQ_CONCEPT
Integration techniques (substitution, partial fractions, standard integrals) and algebraic manipulation of differentials.

## PREREQ_BEFORE
Student must be able to integrate functions like \(\int \frac{1}{y} dy\), \(\int y^n dy\), \(\int e^{ax} dx\), \(\int \sec^2 x dx\), and perform algebraic rearrangements to isolate \(dy/dx\).

## PREREQ_STUCK
If stuck, revisit Class 12 Indefinite Integrals (integration by substitution, partial fractions) and Class 11 Derivatives (chain rule, implicit differentiation) to rebuild the integration and differential manipulation skills.

## WORKED_EXAMPLE_1
**PROBLEM**: The rate of increase of the radius \(r\) (in cm) of a circular oil spill is inversely proportional to the square of the radius. When \(r = 2\) cm, the radius is increasing at \(0.5\) cm/min. Find the time \(t\) (in minutes) when the radius reaches \(4\) cm, given that \(t=0\) when \(r=1\) cm.

**STEPS**:
- Step 1: Translate the statement into a differential equation. “Rate of increase of radius is inversely proportional to square of radius” \(\Rightarrow \frac{dr}{dt} = \frac{k}{r^2}\), where \(k\) is a positive constant.
- Step 2: Use the given condition \(\frac{dr}{dt} = 0.5\) when \(r=2\) to find \(k\): \(0.5 = \frac{k}{4} \Rightarrow k = 2\). So the DE is \(\frac{dr}{dt} = \frac{2}{r^2}\).
- Step 3: Separate variables: \(r^2 dr = 2 dt\).
- Step 4: Integrate both sides: \(\int r^2 dr = \int 2 dt \Rightarrow \frac{r^3}{3} = 2t + C\).
- Step 5: Apply initial condition \(t=0, r=1\): \(\frac{1}{3} = 0 + C \Rightarrow C = \frac{1}{3}\).
- Step 6: Particular solution: \(\frac{r^3}{3} = 2t + \frac{1}{3} \Rightarrow r^3 = 6t + 1\).
- Step 7: Find \(t\) when \(r=4\): \(64 = 6t + 1 \Rightarrow 6t = 63 \Rightarrow t = 10.5\) minutes.

**REASONING**: The problem is a classic related-rates scenario modeled by a separable DE. The key is recognizing “inversely proportional to the square” gives \(k/r^2\). Separation is straightforward because the right side is a product of a function of \(r\) and a constant (function of \(t\)). The initial condition fixes the arbitrary constant, yielding a particular solution that answers the specific question.

**ANSWER**: \(t = 10.5\) minutes (or \(10\) minutes \(30\) seconds).

## WORKED_EXAMPLE_2
**PROBLEM**: Solve the differential equation \(\frac{dy}{dx} = \frac{x(1+y^2)}{1+x^2}\) and find the particular solution given \(y=1\) when \(x=0\).

**STEPS**:
- Step 1: Identify \(g(x) = \frac{x}{1+x^2}\) and \(h(y) = 1+y^2\). The equation is separable.
- Step 2: Separate variables: \(\frac{1}{1+y^2} dy = \frac{x}{1+x^2} dx\).
- Step 3: Integrate both sides: \(\int \frac{1}{1+y^2} dy = \int \frac{x}{1+x^2} dx\).
- Step 4: Left integral is \(\tan^{-1} y\). Right integral: substitute \(u = 1+x^2, du = 2x dx \Rightarrow x dx = du/2\), so \(\int \frac{x}{1+x^2} dx = \frac{1}{2} \int \frac{du}{u} = \frac{1}{2} \ln|u| = \frac{1}{2} \ln(1+x^2)\).
- Step 5: General solution: \(\tan^{-1} y = \frac{1}{2} \ln(1+x^2) + C\).
- Step 6: Apply initial condition \(x=0, y=1\): \(\tan^{-1}(1) = \frac{1}{2} \ln(1) + C \Rightarrow \frac{\pi}{4} = 0 + C \Rightarrow C = \frac{\pi}{4}\).
- Step 7: Particular solution: \(\tan^{-1} y = \frac{1}{2} \ln(1+x^2) + \frac{\pi}{4}\) or \(y = \tan\left(\frac{1}{2} \ln(1+x^2) + \frac{\pi}{4}\right)\).

**REASONING**: This example tests integration of rational and inverse trigonometric functions. The separation step requires dividing by \(1+y^2\) (which is never zero, so no singular solutions lost). The right side uses a simple \(u\)-substitution. The initial condition determines the constant in the inverse trigonometric form, which is acceptable as an implicit solution.

**ANSWER**: Particular solution: \(\tan^{-1} y = \frac{1}{2} \ln(1+x^2) + \frac{\pi}{4}\) or explicitly \(y = \tan\left(\frac{1}{2} \ln(1+x^2) + \frac{\pi}{4}\right)\).

## WORKED_EXAMPLE_3
**PROBLEM**: A bank offers continuous compounding at an annual interest rate of \(8\%\). A customer deposits ₹10,000 and simultaneously withdraws money continuously at a rate of ₹500 per year. Let \(P(t)\) be the amount (in ₹) in the account after \(t\) years. Set up and solve the differential equation for \(P(t)\). How long will it take for the account to be depleted? (Use \(\ln 2 \approx 0.693\)).

**STEPS**:
- Step 1: Model the situation. Rate of change of principal = interest earned − withdrawal rate. \(\frac{dP}{dt} = 0.08 P - 500\).
- Step 2: Recognize this as separable: \(\frac{dP}{dt} = 0.08(P - 6250)\). So \(\frac{dP}{P - 6250} = 0.08 dt\).
- Step 3: Integrate: \(\int \frac{dP}{P - 6250} = \int 0.08 dt \Rightarrow \ln|P - 6250| = 0.08 t + C\).
- Step 4: Exponentiate: \(|P - 6250| = e^C e^{0.08t}\). Let \(A = \pm e^C\), so \(P - 6250 = A e^{0.08t}\).
- Step 5: Apply initial condition \(P(0) = 10000\): \(10000 - 6250 = A \Rightarrow A = 3750\).
- Step 6: Particular solution: \(P(t) = 6250 + 3750 e^{0.08t}\).
- Step 7: Find when account is depleted: \(P(t) = 0 \Rightarrow 6250 + 3750 e^{0.08t} = 0 \Rightarrow e^{0.08t} = -\frac{6250}{3750} = -\frac{5}{3}\). Since \(e^{0.08t} > 0\) for all real \(t\), there is **no real solution**. The account never depletes; it approaches ₹6250 asymptotically from above.
- Step 8: Interpret: The equilibrium amount is ₹6250 (where interest = withdrawal). Since initial deposit is above equilibrium, the account grows, not depletes. If initial deposit were below ₹6250, it would deplete.

**REASONING**: This combines finance (continuous compounding) with a constant withdrawal, leading to a linear separable DE. The critical step is factoring the constant 0.08 to separate as \(\frac{dP}{P-6250}\). The absolute value in the logarithm is handled by allowing the constant \(A\) to be positive or negative. The final interpretation requires understanding the long-term behavior of the exponential solution.

**ANSWER**: \(P(t) = 6250 + 3750 e^{0.08t}\); the account is **never depleted** (it grows indefinitely). Equilibrium amount = ₹6250.

## COMPETENCY_QUESTION_1
**QUESTION**: A cylindrical water tank of radius 1 m has a small hole at the bottom. According to Torricelli’s law, the rate of decrease of the water height \(h\) (in metres) is proportional to the square root of the height: \(\frac{dh}{dt} = -k\sqrt{h}\), where \(k>0\) is a constant. Initially the tank is full with \(h=4\) m. After 10 minutes, the height drops to 1 m.  
(a) Find the particular solution \(h(t)\).  
(b) Determine the time when the tank becomes completely empty.  
(c) Explain why the differential equation \(\frac{dh}{dt} = -k\sqrt{h}\) is not defined for \(h<0\) and what this means physically.

**COMPETENCY**: Translating real-world situations to mathematical expressions; solving separable DEs with initial conditions; interpreting domain restrictions physically.

**STEPS**:
- Step 1: Separate variables: \(\frac{dh}{\sqrt{h}} = -k dt \Rightarrow h^{-1/2} dh = -k dt\).
- Step 2: Integrate: \(\int h^{-1/2} dh = -k \int dt \Rightarrow 2\sqrt{h} = -kt + C\).
- Step 3: Use \(h(0)=4\): \(2\sqrt{4} = C \Rightarrow C = 4\). So \(2\sqrt{h} = -kt + 4\).
- Step 4: Use \(h(10)=1\): \(2\sqrt{1} = -10k + 4 \Rightarrow 2 = -10k + 4 \Rightarrow k = 0.2\).
- Step 5: Particular solution: \(2\sqrt{h} = -0.2t + 4 \Rightarrow \sqrt{h} = 2 - 0.1t \Rightarrow h(t) = (2 - 0.1t)^2\).
- Step 6: Tank empty when \(h=0\): \(2 - 0.1t = 0 \Rightarrow t = 20\) minutes.
- Step 7: The DE has \(\sqrt{h}\), which requires \(h \geq 0\). For \(h<0\), the square root is not real, so the DE is not defined. Physically, height cannot be negative; the model ceases to apply when the tank is empty (\(h=0\)).

**ANSWER**: (a) \(h(t) = (2 - 0.1t)^2\) for \(0 \leq t \leq 20\). (b) \(t = 20\) minutes. (c) The square root requires \(h \geq 0\); negative height is physically meaningless, so the model is valid only until the tank empties.

**DIFFICULTY**: medium

## COMPETENCY_QUESTION_2
**QUESTION**: The slope of the tangent to a curve at any point \((x,y)\) is given by \(\frac{x^2 + y^2}{2xy}\). The curve passes through the point \((1,2)\).  
(a) Show that the differential equation is homogeneous and can be solved by the substitution \(y = vx\).  
(b) Solve the differential equation to find the equation of the curve.  
(c) Verify that your solution satisfies the original differential equation and the initial condition.

**COMPETENCY**: Connecting concepts (homogeneous DE → variable separable); multi-step algebraic manipulation; verification of solution.

**STEPS**:
- Step 1: Write DE: \(\frac{dy}{dx} = \frac{x^2+y^2}{2xy} = \frac{1+(y/x)^2}{2(y/x)}\). This is a function of \(y/x\) only, so homogeneous of degree 0.
- Step 2: Substitute \(y = vx \Rightarrow \frac{dy}{dx} = v + x\frac{dv}{dx}\).
- Step 3: Substitute: \(v + x\frac{dv}{dx} = \frac{1+v^2}{2v}\).
- Step 4: Separate: \(x\frac{dv}{dx} = \frac{1+v^2}{2v} - v = \frac{1+v^2-2v^2}{2v} = \frac{1-v^2}{2v}\).
- Step 5: \(\frac{2v}{1-v^2} dv = \frac{dx}{x}\).
- Step 6: Integrate: \(\int \frac{2v}{1-v^2} dv = \int \frac{dx}{x}\). Let \(u=1-v^2, du=-2v dv \Rightarrow -\int \frac{du}{u} = \ln|x| + C \Rightarrow -\ln|1-v^2| = \ln|x| + C\).
- Step 7: \(\ln|1-v^2| + \ln|x| = -C \Rightarrow \ln|x(1-v^2)| = \ln K \Rightarrow x(1-v^2) = K\).
- Step 8: Replace \(v = y/x\): \(x\left(1 - \frac{y^2}{x^2}\right) = K \Rightarrow x - \frac{y^2}{x} = K \Rightarrow x^2 - y^2 = Kx\).
- Step 9: Use \((1,2)\): \(1 - 4 = K \cdot 1 \Rightarrow K = -3\). Equation: \(x^2 - y^2 = -3x \Rightarrow y^2 = x^2 + 3x\).
- Step 10: Verify: Differentiate implicitly: \(2y y' = 2x + 3 \Rightarrow y' = \frac{2x+3}{2y}\). From solution \(y^2 = x^2+3x\), we have \(x^2+y^2 = 2x^2+3x\) and \(2xy = 2x\sqrt{x^2+3x}\). Check if \(\frac{2x+3}{2y} = \frac{x^2+y^2}{2xy}\). LHS = \(\frac{2x+3}{2\sqrt{x^2+3x}}\). RHS = \(\frac{x^2+x^2+3x}{2x\sqrt{x^2+3x}} = \frac{2x^2+3x}{2x\sqrt{x^2+3x}} = \frac{2x+3}{2\sqrt{x^2+3x}}\). Matches. Initial condition: \(1^2 - 2^2 = -3 = -3(1)\). Satisfied.

**ANSWER**: (a) DE is homogeneous because RHS is function of \(y/x\). (b) Equation of curve: \(y^2 = x^2 + 3x\) or \(x^2 - y^2 + 3x = 0\). (c) Verified by implicit differentiation and substitution.

**DIFFICULTY**: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are tracking the growth of a bacterial culture in a lab: the rate of increase of bacteria is ______ to the current population.

## DIAGNOSTIC_ANSWER_7
proportional

Proportional is the growth law's shape: rate scales with population, which is what makes the equation separable in the first place. **A wrong answer (equal) reveals the student has removed the constant of proportionality and flattened the family of growth curves into one.**

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can: (1) Identify whether a given first-order first-degree differential equation is separable.

Mastery is the whole pipeline: identify separability, separate cleanly, integrate both sides, and spend the constant on any given condition. **A wrong answer (separating without integrating) reveals the student has herded the variables and stopped short of the solution the topic demands.**
