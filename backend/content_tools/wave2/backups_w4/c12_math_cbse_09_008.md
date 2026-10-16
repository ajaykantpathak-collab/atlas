## ELI5
Some differential equations are secretly shadows of a single function: M dx plus N dy equals zero is exact when a hidden F exists whose partial derivatives are M and N respectively - the equation is just dF equals zero, so the solution is F equals constant. The test is elegant: differentiate M with respect to y and N with respect to x; equality certifies exactness. Rebuild F by integrating M in x, let the leftover be a function of y, and pin that function using N.

## DEFINITION
A first-order first-degree differential equation of the form \(M(x,y)dx + N(x,y)dy = 0\) is called an **exact differential equation** if there exists a differentiable function \(F(x,y)\) such that \(\frac{\partial F}{\partial x} = M\) and \(\frac{\partial F}{\partial y} = N\). The necessary and sufficient condition for exactness is \(\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}\) (provided \(M, N\) and their partial derivatives are continuous in a simply connected region). The general solution is then given implicitly by \(F(x,y) = C\), where \(C\) is an arbitrary constant.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) verify exactness of a given differential equation by checking the partial derivative condition, (2) construct the potential function \(F(x,y)\) by integrating \(M\) with respect to \(x\) or \(N\) with respect to \(y\) and reconciling the arbitrary function, and (3) write the general solution as \(F(x,y)=C\) and find particular solutions using initial conditions.

## SCOPE_BOUNDARY
This node covers exact differential equations of the form \(Mdx+Ndy=0\) with the exactness condition \(\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}\), the method of finding the potential function \(F(x,y)\), and writing the general/particular solution. It does NOT cover integrating factors for non-exact equations, higher-order exact equations, or partial differential equations — those are beyond Class 12 NCERT scope.

## WALKTHROUGH
Imagine you are designing a roller-coaster track where the height \(y\) changes with horizontal distance \(x\). The engineer gives you a condition: \((2xy + 3x^2)dx + (x^2 + 4y)dy = 0\). You need the shape of the track (the relation between \(x\) and \(y\)). Start by checking if this equation is "exact" — i.e., does it come from a total differential of some function \(F(x,y)\)? Write down \(M=2xy+3x^2\) and \(N=x^2+4y\). Compute \(\frac{\partial M}{\partial y}=2x\) and \(\frac{\partial N}{\partial x}=2x\). They match! So the equation is exact. Now find \(F\) by integrating \(M\) w.r.t \(x\): \(F = \int (2xy+3x^2)dx = x^2y + x^3 + g(y)\). Differentiate this w.r.t \(y\) and equate to \(N\): \(\frac{\partial F}{\partial y}=x^2 + g'(y) = x^2+4y \Rightarrow g'(y)=4y \Rightarrow g(y)=2y^2\). Thus \(F(x,y)=x^2y+x^3+2y^2\) and the track follows \(x^2y+x^3+2y^2 = C\). The key insight: exact equations are "perfect differentials" — they directly give a conserved quantity \(F(x,y)\).

Takeaway first: exactness is the cross-partial test, and the solution is a conserved quantity F recovered by integrating one component and reconciling with the other. Exam moves: verification questions computing both partials, construction questions rebuilding F and its arbitrary g of y, and solution questions writing F equals C plus particular cases. Method: rerun the coaster condition - partials matched, integrate M in x, differentiate in y, solve for g-prime, absorb g. Check yourself: the arbitrary g of y appears because integrating in x cannot see functions of y alone; forgetting it is the standard incomplete answer. Drill: verify one exact equation, rebuild F completely, and state its constant solution.

## DIAGNOSTIC_QUESTION_1
State the exactness condition for the differential equation \(M(x,y)dx + N(x,y)dy = 0\). What additional requirement on \(M\) and \(N\) is needed for this condition to be sufficient?

## DIAGNOSTIC_ANSWER_1
The exactness condition is \(\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}\). For this condition to be sufficient, \(M, N, \frac{\partial M}{\partial y}, \frac{\partial N}{\partial x}\) must be continuous in a simply connected region of the \(xy\)-plane. A wrong answer (e.g., only stating the partial derivative equality) reveals the student does not know the continuity/simply-connected hypothesis, which is essential for the existence of the potential function \(F\) — a common trap in JEE Advanced theoretical questions.

## DIAGNOSTIC_QUESTION_2
A student claims that the differential equation \((y^2)dx + (2xy)dy = 0\) is exact because \(\frac{\partial}{\partial y}(y^2) = 2y\) and \(\frac{\partial}{\partial x}(2xy) = 2y\). Is the student correct? Explain why or why not, and write the general solution if it is exact.

## DIAGNOSTIC_ANSWER_2
Yes, the student is correct. \(M=y^2, N=2xy\). \(\frac{\partial M}{\partial y}=2y, \frac{\partial N}{\partial x}=2y\). They are equal and continuous everywhere, so the equation is exact. To solve: integrate \(M\) w.r.t \(x\): \(F = \int y^2 dx = xy^2 + g(y)\). Then \(\frac{\partial F}{\partial y} = 2xy + g'(y) = N = 2xy \Rightarrow g'(y)=0 \Rightarrow g(y)=C_1\). General solution: \(xy^2 = C\). A wrong answer (e.g., forgetting the arbitrary function \(g(y)\) or mis-integrating) reveals the student treats the integration as single-variable, ignoring that the "constant" of integration can depend on the other variable.

## DIAGNOSTIC_QUESTION_3
Solve the exact differential equation: \((3x^2y + 2xy^2)dx + (x^3 + 2x^2y)dy = 0\). Find the particular solution satisfying \(y(1)=2\).

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify \(M=3x^2y+2xy^2\), \(N=x^3+2x^2y\).  
**Step 2:** Check exactness: \(\frac{\partial M}{\partial y}=3x^2+4xy\), \(\frac{\partial N}{\partial x}=3x^2+4xy\). Equal ⇒ exact.  
**Step 3:** Integrate \(M\) w.r.t \(x\): \(F = \int (3x^2y+2xy^2)dx = x^3y + x^2y^2 + g(y)\).  
**Step 4:** Differentiate w.r.t \(y\): \(\frac{\partial F}{\partial y}=x^3+2x^2y+g'(y)\). Set equal to \(N\): \(x^3+2x^2y+g'(y)=x^3+2x^2y \Rightarrow g'(y)=0 \Rightarrow g(y)=C_1\).  
**Step 5:** General solution: \(x^3y + x^2y^2 = C\).  
**Step 6:** Apply \(y(1)=2\): \(1^3\cdot2 + 1^2\cdot2^2 = 2+4=6 = C\).  
**Particular solution:** \(x^3y + x^2y^2 = 6\) or \(x^2y(x+y)=6\).  
A wrong answer (e.g., \(C=2\) from mis-substituting) reveals arithmetic errors or confusion between general and particular constants.

## DIAGNOSTIC_QUESTION_4
Compare the exact equation method with the variable separable method. Give an example of a differential equation that is both exact and variable separable, and explain how the two solution procedures converge to the same result.

## DIAGNOSTIC_ANSWER_4
Consider \(y dx + x dy = 0\). It is exact: \(M=y, N=x\), \(\frac{\partial M}{\partial y}=1=\frac{\partial N}{\partial x}\). Exact method: \(F=\int y dx = xy + g(y)\), \(\frac{\partial F}{\partial y}=x+g'(y)=x \Rightarrow g'(y)=0\), solution \(xy=C\). Variable separable: rewrite as \(\frac{dx}{x} + \frac{dy}{y}=0\) (for \(xy\neq0\)), integrate: \(\ln|x|+\ln|y|=\ln|C| \Rightarrow xy=C\). Both give the same implicit solution. The exact method directly finds the potential function \(F=xy\); the separable method integrates after algebraic manipulation. A wrong answer (e.g., claiming they are different methods for different equations) reveals the student does not see that exactness is a structural property while separability is a manipulative technique — an equation can be both.

## DIAGNOSTIC_QUESTION_5
A student solves \((2x+y)dx + (x-2y)dy = 0\) as follows:  
\(M=2x+y, N=x-2y\) → \(\frac{\partial M}{\partial y}=1, \frac{\partial N}{\partial x}=1\) → exact.  
\(F = \int (2x+y)dx = x^2 + xy + g(y)\).  
\(\frac{\partial F}{\partial y} = x + g'(y) = x-2y\) → \(g'(y) = -2y\) → \(g(y) = -y^2\).  
Solution: \(x^2 + xy - y^2 = C\).  
Is this fully correct? If not, identify the error and correct it.

## DIAGNOSTIC_ANSWER_5
The solution is **correct**. All steps are valid: exactness holds, integration of \(M\) w.r.t \(x\) is correct, determination of \(g(y)\) by comparing with \(N\) is correct, and the final implicit solution \(x^2+xy-y^2=C\) is the general solution. A student who claims an error might mistakenly think \(g(y)\) should include an \(x\)-dependent term, or might mis-differentiate \(xy\) as \(y\) only (forgetting the product rule). This diagnostic tests whether the student can validate a complete worked solution — a key skill for board exam "verify" questions and JEE "assertion-reason" items.

## DIAGNOSTIC_QUESTION_6
Construct a first-order differential equation that is **not** exact but becomes exact after multiplying by an integrating factor \(\mu(x)=x\). Write the original non-exact equation, the integrating factor, the resulting exact equation, and its general solution.

## DIAGNOSTIC_ANSWER_6
Start with a known exact equation, e.g., \(y dx + x dy = 0\) (exact). Divide by the integrating factor \(x\) (assuming \(x\neq0\)): \(\frac{y}{x} dx + dy = 0\). This is the **non-exact** equation: \(M=\frac{y}{x}, N=1\). Check: \(\frac{\partial M}{\partial y}=\frac{1}{x}, \frac{\partial N}{\partial x}=0\) → not equal. Multiply by \(\mu(x)=x\): \(y dx + x dy = 0\) (exact). General solution: \(xy = C\).  
A good answer shows the reverse-engineering process. A poor answer (e.g., giving an arbitrary non-exact equation without verifying the integrating factor works) reveals the student does not understand the relationship between exactness and integrating factors — a concept that appears in JEE Main as "find the integrating factor" problems.

## COMMON_MISCONCEPTION
**Misconception:** "When integrating \(M\) with respect to \(x\) to find \(F\), the 'constant' of integration is just a number \(C\), not a function of \(y\)."  
**Why it's wrong:** Because \(F(x,y)\) is a function of two variables. When we integrate \(\frac{\partial F}{\partial x}=M\) partially with respect to \(x\), any function of \(y\) alone disappears (its partial derivative w.r.t \(x\) is zero). So the "constant" is actually an arbitrary function \(g(y)\).  
**Concrete example:** For \((2xy)dx + (x^2)dy = 0\), integrating \(M=2xy\) w.r.t \(x\) gives \(x^2y + C\). If the student writes \(C\) as a number, they miss the possibility \(g(y)\) and later cannot match \(N=x^2\) unless \(g'(y)=0\). In equations where \(g'(y)\neq0\) (e.g., \(M=2xy+3, N=x^2+4y\)), omitting \(g(y)\) leads to an incorrect solution. This error costs 2-3 marks in board exams (step for \(g(y)\) is explicitly marked) and causes wrong answers in JEE.

## ON_FAILURE
If the student makes the above error:  
1. **Revisit partial differentiation**: Review Class 11 limits/derivatives (c11_math_cbse_13_007, c11_math_cbse_13_008) — specifically that \(\frac{\partial}{\partial x}(g(y))=0\).  
2. **Do a guided example**: Take \((3x^2+2y)dx + (2x+4y^3)dy=0\). Ask: "Integrate \(M\) w.r.t \(x\). What happens to a term like \(y^2\)?" → It vanishes. "So what must we add?" → \(g(y)\).  
3. **Re-diagnostic**: Give \((2x+3y)dx + (3x+4y)dy=0\) and ask the student to find \(F\) step by step, explicitly writing \(g(y)\) and solving for it. Check that they differentiate \(F\) w.r.t \(y\) and equate to \(N\).

## PREREQUISITE_NODE_IDS
c12_math_cbse_09_001, c12_math_cbse_09_002, c12_math_cbse_09_003, c12_math_cbse_09_005, c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009, c12_math_cbse_09_004, c12_math_cbse_09_006, c12_math_cbse_09_007

## PREREQUISITE_REASONS
c12_math_cbse_09_001: Need to know what a differential equation is and its order/degree before classifying as exact.  
c12_math_cbse_09_002: Degree concept helps identify first-degree equations where exactness applies.  
c12_math_cbse_09_003: Understanding general vs particular solutions is required to write the final answer \(F(x,y)=C\) and apply initial conditions.  
c12_math_cbse_09_005: Variable separable method is the first method taught; exact equations are another method — students must distinguish when to use which.  
c11_math_cbse_13_007: Derivative of polynomial functions — needed to compute partial derivatives \(\frac{\partial M}{\partial y}, \frac{\partial N}{\partial x}\).  
c11_math_cbse_13_008: Derivative using first principles — conceptual basis for partial derivatives.  
c11_math_cbse_13_009: Algebra of derivatives (sum, product rules) — essential for differentiating terms like \(xy^2\) when checking exactness and finding \(g(y)\).
c12_math_cbse_09_004: Exact DEs \(M dx + N dy = 0\) come from families with potential functions; formation connects to exactness.  
c12_math_cbse_09_006: Exact differential equations extend the idea of finding integrating factors; homogeneous equations sometimes can be solved by recognizing them as exact after multiplication by an integrating factor, linking the two methods.  
c12_math_cbse_09_007: Exact differential equations generalise the idea of an integrating factor; the linear DE method is a special case where the integrating factor depends only on one variable.  

## FORWARD_NODE_IDS


## FORWARD_REASONS
This is the last node in Chapter 9 (Differential Equations) as per the provided sibling list. No forward nodes within this chapter.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_007: Partial derivatives \(\frac{\partial M}{\partial y}, \frac{\partial N}{\partial x}\) are computed using the same derivative rules (polynomial, product, chain) learned here.  
c11_math_cbse_13_008: The concept of a derivative as a limit underpins the definition of partial derivatives used in the exactness condition.  
c11_math_cbse_13_009: Product rule and sum rule are directly used when differentiating \(M\) and \(N\) (e.g., \(\frac{\partial}{\partial y}(x^2y)=x^2\), \(\frac{\partial}{\partial x}(xy^2)=y^2\)).

## CHAIN_DESCRIPTION
c11_math_cbse_13_007 -> c12_math_cbse_09_008 -> N/A

## THIS_FORMULA
Exactness condition: \(\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}\).  
Solution: \(F(x,y) = \int M(x,y) dx + g(y) = C\) where \(g(y)\) is determined from \(\frac{\partial F}{\partial y} = N\). Alternatively, \(F(x,y) = \int N(x,y) dy + h(x) = C\).

## FORMULA_VARIABLES
\(M(x,y)\) = coefficient of \(dx\), \(N(x,y)\) = coefficient of \(dy\), \(F(x,y)\) = potential function, \(g(y)\) = arbitrary function of \(y\) arising from integration w.r.t \(x\), \(h(x)\) = arbitrary function of \(x\) arising from integration w.r.t \(y\), \(C\) = arbitrary constant.

## FORMULA_UNITS
dimensionless (pure mathematical relation; units depend on the physical context if applied)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_007 | Partial derivatives of polynomial functions are computed using the same derivative rules (power rule, sum rule) taught in Class 11 Limits and Derivatives.  
c11_math_cbse_13_009 | Product rule \(\frac{d}{dx}(uv)=u'v+uv'\) is used when differentiating terms like \(x^2y\) or \(xy^2\) during exactness check and while finding \(g'(y)\).
## PREREQ_CONCEPT
Partial differentiation (treating one variable constant while differentiating w.r.t the other) and the concept of a total differential \(dF = \frac{\partial F}{\partial x}dx + \frac{\partial F}{\partial y}dy\).

## PREREQ_BEFORE
The student must be able to compute partial derivatives of polynomial/rational functions of two variables and understand that integration w.r.t one variable introduces an arbitrary function of the other variable.

## PREREQ_STUCK
Revisit Class 11 Limits and Derivatives (c11_math_cbse_13_007, c11_math_cbse_13_009) and practice partial derivatives: e.g., find \(\frac{\partial}{\partial x}(x^2y^3 + \sin(xy))\) and \(\frac{\partial}{\partial y}\) of the same.

## WORKED_EXAMPLE_1
PROBLEM: A thermodynamics experiment gives the differential relation \((2xy^3 + 3x^2)dx + (3x^2y^2 + 4y^3)dy = 0\) for a certain process. Verify that this is an exact differential equation and find the general solution. If the process starts at \((x,y)=(1,1)\), find the particular solution.

STEPS:
- Step 1: Identify \(M = 2xy^3 + 3x^2\) and \(N = 3x^2y^2 + 4y^3\).
- Step 2: Check exactness: \(\frac{\partial M}{\partial y} = 6xy^2\), \(\frac{\partial N}{\partial x} = 6xy^2\). Since they are equal and continuous for all \((x,y)\), the equation is exact.
- Step 3: Integrate \(M\) with respect to \(x\): \(F(x,y) = \int (2xy^3 + 3x^2) dx = x^2y^3 + x^3 + g(y)\).
- Step 4: Differentiate \(F\) with respect to \(y\): \(\frac{\partial F}{\partial y} = 3x^2y^2 + g'(y)\). Set equal to \(N\): \(3x^2y^2 + g'(y) = 3x^2y^2 + 4y^3 \Rightarrow g'(y) = 4y^3\).
- Step 5: Integrate \(g'(y)\): \(g(y) = \int 4y^3 dy = y^4 + C_1\). So \(F(x,y) = x^2y^3 + x^3 + y^4\).
- Step 6: General solution: \(x^2y^3 + x^3 + y^4 = C\).
- Step 7: Apply initial condition \((1,1)\): \(1^2\cdot1^3 + 1^3 + 1^4 = 1+1+1=3 = C\).
- Step 8: Particular solution: \(x^2y^3 + x^3 + y^4 = 3\).

REASONING: The exactness condition ensures the differential form is a total differential of some function \(F\). Integrating \(M\) w.r.t \(x\) recovers \(F\) up to a function of \(y\); matching with \(N\) determines that function. The initial condition fixes the constant \(C\).

ANSWER: General solution: \(x^2y^3 + x^3 + y^4 = C\). Particular solution: \(x^2y^3 + x^3 + y^4 = 3\).

## WORKED_EXAMPLE_2
PROBLEM: Solve the differential equation \((y\cos x + \sin y)dx + (\sin x + x\cos y)dy = 0\). Is it exact? If yes, find the general solution.

STEPS:
- Step 1: Identify \(M = y\cos x + \sin y\), \(N = \sin x + x\cos y\).
- Step 2: Check exactness: \(\frac{\partial M}{\partial y} = \cos x + \cos y\), \(\frac{\partial N}{\partial x} = \cos x + \cos y\). Equal ⇒ exact.
- Step 3: Choose to integrate \(N\) w.r.t \(y\) (easier here): \(F = \int (\sin x + x\cos y) dy = y\sin x + x\sin y + h(x)\).
- Step 4: Differentiate \(F\) w.r.t \(x\): \(\frac{\partial F}{\partial x} = y\cos x + \sin y + h'(x)\). Set equal to \(M\): \(y\cos x + \sin y + h'(x) = y\cos x + \sin y \Rightarrow h'(x)=0 \Rightarrow h(x)=C_1\).
- Step 5: General solution: \(y\sin x + x\sin y = C\).

REASONING: Either integration path (w.r.t \(x\) or \(y\)) works. Here integrating \(N\) w.r.t \(y\) avoids dealing with \(\int \sin y dx\) which would be more complicated. The arbitrary function \(h(x)\) turns out to be constant because \(M\) has no pure \(x\)-terms beyond what came from \(N\).

ANSWER: \(y\sin x + x\sin y = C\).

## WORKED_EXAMPLE_3
PROBLEM: Find the value of \(k\) for which the differential equation \((kxy^2 + 3x^2)dx + (2x^2y + 4y^3)dy = 0\) is exact. For that \(k\), find the general solution and the particular solution passing through \((2, -1)\).

STEPS:
- Step 1: \(M = kxy^2 + 3x^2\), \(N = 2x^2y + 4y^3\).
- Step 2: Exactness condition: \(\frac{\partial M}{\partial y} = 2kxy\), \(\frac{\partial N}{\partial x} = 4xy\). Set equal: \(2kxy = 4xy \Rightarrow 2k = 4 \Rightarrow k = 2\).
- Step 3: With \(k=2\), \(M = 2xy^2 + 3x^2\). Integrate w.r.t \(x\): \(F = \int (2xy^2 + 3x^2) dx = x^2y^2 + x^3 + g(y)\).
- Step 4: \(\frac{\partial F}{\partial y} = 2x^2y + g'(y) = N = 2x^2y + 4y^3 \Rightarrow g'(y) = 4y^3 \Rightarrow g(y) = y^4 + C_1\).
- Step 5: General solution: \(x^2y^2 + x^3 + y^4 = C\).
- Step 6: Particular solution through \((2,-1)\): \((2)^2(-1)^2 + (2)^3 + (-1)^4 = 4\cdot1 + 8 + 1 = 13 = C\).
- Step 7: Particular solution: \(x^2y^2 + x^3 + y^4 = 13\).

REASONING: The parameter \(k\) is determined by the exactness condition — this is a typical board exam "find the value of \(k\)" question. Once \(k\) is found, the solution proceeds exactly as before. The initial condition is applied to the implicit solution.

ANSWER: \(k=2\). General solution: \(x^2y^2 + x^3 + y^4 = C\). Particular solution: \(x^2y^2 + x^3 + y^4 = 13\).

## COMPETENCY_QUESTION_1
QUESTION: A curve passes through the point \((1, 2)\) and satisfies the differential equation \((3x^2y + 2y)dx + (x^3 + 2x)dy = 0\).  
(a) Show that the differential equation is exact.  
(b) Find the equation of the curve.  
(c) The slope of the tangent to the curve at \((1,2)\) is \(m\). Find \(m\) without explicitly solving for \(y\) as a function of \(x\).  
(d) Is the curve symmetric about the origin? Justify.

COMPETENCY: Translating real-world situations to mathematical expressions; using implicit differentiation and symmetry analysis.

STEPS:
- Step 1: Identify \(M=3x^2y+2y, N=x^3+2x\). Compute \(\frac{\partial M}{\partial y}=3x^2+2, \frac{\partial N}{\partial x}=3x^2+2\). Equal ⇒ exact.
- Step 2: Integrate \(M\) w.r.t \(x\): \(F = x^3y + 2xy + g(y)\). \(\frac{\partial F}{\partial y}=x^3+2x+g'(y)=N \Rightarrow g'(y)=0\). General solution: \(x^3y+2xy=C\).
- Step 3: Use \((1,2)\): \(1^3\cdot2 + 2\cdot1\cdot2 = 2+4=6=C\). Equation: \(x^3y+2xy=6\) or \(xy(x^2+2)=6\).
- Step 4: For slope at \((1,2)\), use the original DE: \(\frac{dy}{dx} = -\frac{M}{N} = -\frac{3x^2y+2y}{x^3+2x}\). At \((1,2)\): \(m = -\frac{3\cdot1\cdot2+2\cdot2}{1+2} = -\frac{6+4}{3} = -\frac{10}{3}\).
- Step 5: Symmetry: Replace \((x,y)\) by \((-x,-y)\) in the equation: \((-x)^3(-y)+2(-x)(-y) = x^3y+2xy = 6\). The equation is unchanged, so the curve is symmetric about the origin.

ANSWER: (a) Exact because \(\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}=3x^2+2\). (b) \(x^3y+2xy=6\). (c) \(m=-\frac{10}{3}\). (d) Yes, symmetric about origin because replacing \(x\to -x, y\to -y\) leaves the equation unchanged.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the family of curves given by \(x^2y + y^3 = C\).  
(a) Find the differential equation satisfied by this family.  
(b) Show that this differential equation is exact.  
(c) A student claims that the differential equation can also be solved by the variable separable method. Is the student correct? Explain.  
(d) If the differential equation is written as \(\frac{dy}{dx} = f(x,y)\), find \(f(x,y)\) and determine whether it is homogeneous.

COMPETENCY: Forming differential equations from general solutions; comparing solution methods; identifying homogeneous equations.

STEPS:
- Step 1: Differentiate \(x^2y + y^3 = C\) implicitly w.r.t \(x\): \(2xy + x^2y' + 3y^2y' = 0\). Rearrange: \((x^2+3y^2)dy + (2xy)dx = 0\) or \((2xy)dx + (x^2+3y^2)dy = 0\).
- Step 2: Check exactness: \(M=2xy, N=x^2+3y^2\). \(\frac{\partial M}{\partial y}=2x, \frac{\partial N}{\partial x}=2x\). Equal ⇒ exact.
- Step 3: Variable separable? Try to write as \(g(x)dx = h(y)dy\). \((2xy)dx = -(x^2+3y^2)dy \Rightarrow \frac{2x}{x^2+3y^2}dx = -dy\). The left side depends on both \(x\) and \(y\), so variables cannot be separated. Student is incorrect.
- Step 4: Write as \(\frac{dy}{dx} = -\frac{2xy}{x^2+3y^2}\). Check homogeneity: \(f(tx,ty) = -\frac{2(tx)(ty)}{(tx)^2+3(ty)^2} = -\frac{2t^2xy}{t^2(x^2+3y^2)} = f(x,y)\). It is homogeneous of degree 0. So it can be solved by homogeneous method (substitution \(y=vx\)), not by variable separable.

ANSWER: (a) \((2xy)dx + (x^2+3y^2)dy = 0\). (b) Exact because \(\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}=2x\). (c) No, variables cannot be separated because the equation does not reduce to \(g(x)dx = h(y)dy\). (d) \(f(x,y)=-\frac{2xy}{x^2+3y^2}\); it is homogeneous of degree 0.

DIFFICULTY: hard