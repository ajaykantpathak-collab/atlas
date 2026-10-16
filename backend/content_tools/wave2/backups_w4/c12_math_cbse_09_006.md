## ELI5
A coaster's slope depends only on the direction from the origin, never the distance - dy by dx equals x squared plus y squared over x y - and such equations are homogeneous. The cure is the substitution y equals v x: the v absorbs the ratio, dy by dx becomes v plus x dv by dx, the x's cancel, and a separable equation in v and x remains. Integrate that, replace v by y over x, and the general solution is dressed back in original clothes.

## DEFINITION
A first-order, first-degree differential equation of the form \(\frac{dy}{dx} = F(x, y)\) is called **homogeneous** if \(F(x, y)\) is a homogeneous function of degree zero, i.e., \(F(\lambda x, \lambda y) = \lambda^0 F(x, y) = F(x, y)\) for any non-zero constant \(\lambda\). Equivalently, \(F(x, y)\) can be expressed as a function of the single variable \(\frac{y}{x}\) (or \(\frac{x}{y}\)). The standard solution method uses the substitution \(y = vx\) (or \(x = vy\)), which transforms the equation into a variable-separable form in \(v\) and \(x\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can: (1) Identify whether a given differential equation is homogeneous by checking if \(F(x,y)\) satisfies \(F(\lambda x, \lambda y) = F(x,y)\) or can be written as \(g(y/x)\); (2) Correctly choose the substitution \(y = vx\) (or \(x = vy\)) and derive the separable equation in \(v\) and \(x\); (3) Integrate the separated equation, substitute back \(v = y/x\), and simplify to obtain the general solution; (4) Apply initial conditions to find particular solutions.

## SCOPE_BOUNDARY
This node covers **only** first-order, first-degree homogeneous differential equations as defined in NCERT Class 12 Chapter 9 (Section 9.4.2). It includes: identification of homogeneous functions of degree zero, the substitution \(y = vx\) (and \(x = vy\) when the equation is given as \(dx/dy = F(x,y)\)), separation of variables, integration, and back-substitution. It does **NOT** cover: higher-order homogeneous linear differential equations with constant coefficients (that is a different topic in higher mathematics), non-homogeneous equations, or equations reducible to homogeneous form by shifting the origin (e.g., \(\frac{dy}{dx} = \frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\)).

## WALKTHROUGH
Imagine you are designing a roller coaster track where the slope at any point \((x, y)\) depends only on the *ratio* \(y/x\) — for example, \(\frac{dy}{dx} = \frac{x^2 + y^2}{xy}\). This is a homogeneous differential equation because the right-hand side is a function of \(y/x\) alone. To solve it, you cannot separate \(x\) and \(y\) directly. Instead, you **introduce a new variable \(v = y/x\)**, so \(y = vx\). Differentiating gives \(\frac{dy}{dx} = v + x\frac{dv}{dx}\). Substitute this and \(y = vx\) into the original equation. The \(x\)'s will cancel, leaving an equation in \(v\) and \(x\) where variables are separable. Integrate, then replace \(v\) with \(y/x\) to get the solution. This method works because homogeneity means the slope depends only on the *direction* from the origin, not the distance.

Takeaway first: homogeneity means the right side survives scaling both variables - equivalently it depends on y over x alone - and the v substitution converts that ratio-dependence into separability. Exam moves: identification questions via the scaling test, substitution questions deriving the v equation, integration and back-substitution questions, and initial-condition questions. Method: rerun the track - verify the right side ignores scale, set y equal v x, differentiate, substitute, separate, integrate, undress. Check yourself: after substituting, every x must pair with a v for the cancellation to work; leftover x's mean the equation was never homogeneous. Drill: solve one homogeneous equation end to end and verify the solution by substitution.

## DIAGNOSTIC_QUESTION_1
**REMEMBER:** Write the definition of a homogeneous function of degree \(n\). Then state the condition for a differential equation \(\frac{dy}{dx} = F(x, y)\) to be homogeneous.

## DIAGNOSTIC_ANSWER_1
A function \(F(x, y)\) is homogeneous of degree \(n\) if \(F(\lambda x, \lambda y) = \lambda^n F(x, y)\) for any non-zero constant \(\lambda\). The differential equation \(\frac{dy}{dx} = F(x, y)\) is homogeneous if \(F(x, y)\) is a homogeneous function of degree zero, i.e., \(F(\lambda x, \lambda y) = F(x, y)\).  
**Wrong answer reveals:** If a student writes "degree 1" or "\(F(\lambda x, \lambda y) = \lambda F(x, y)\)", they confuse the degree of the function with the degree of the differential equation. The DE is homogeneous only when the function is degree **zero**. If they say "variables can be separated directly", they confuse homogeneous with variable-separable method.

## DIAGNOSTIC_QUESTION_2
**UNDERSTAND:** The differential equation \(\frac{dy}{dx} = \frac{x^2 + y^2}{xy}\) is homogeneous. Explain **why** the substitution \(y = vx\) works, and show the algebraic step that eliminates \(x\) from the right-hand side after substitution.

## DIAGNOSTIC_ANSWER_2
Because \(F(x, y) = \frac{x^2 + y^2}{xy}\) satisfies \(F(\lambda x, \lambda y) = \frac{\lambda^2 x^2 + \lambda^2 y^2}{\lambda x \cdot \lambda y} = \frac{x^2 + y^2}{xy} = F(x, y)\), it is homogeneous of degree zero. Substituting \(y = vx\) gives \(\frac{dy}{dx} = v + x\frac{dv}{dx}\). The RHS becomes \(\frac{x^2 + v^2 x^2}{x \cdot vx} = \frac{1+v^2}{v}\). The \(x\) cancels completely, leaving \(v + x\frac{dv}{dx} = \frac{1+v^2}{v}\), which is separable in \(v\) and \(x\).  
**Wrong answer reveals:** If a student says "we substitute to make it linear" or "we substitute to remove \(y\)", they miss the key point: the substitution works **because** \(F\) is a function of \(y/x\) alone, so replacing \(y/x\) by \(v\) turns the RHS into a function of \(v\) only. If they cannot show the cancellation of \(x\), they likely do not grasp the algebraic structure of homogeneous functions.

## DIAGNOSTIC_QUESTION_3
**APPLY:** Solve the homogeneous differential equation: \(\frac{dy}{dx} = \frac{y}{x} + \tan\left(\frac{y}{x}\right)\), given that \(y = \frac{\pi}{4}\) when \(x = 1\). Show all steps including the substitution, separation, integration, and back-substitution.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify \(F(x,y) = \frac{y}{x} + \tan(y/x)\). Clearly \(F(\lambda x, \lambda y) = \frac{\lambda y}{\lambda x} + \tan(\lambda y/\lambda x) = F(x,y)\) → homogeneous degree 0.  
**Step 2:** Substitute \(y = vx\) → \(\frac{dy}{dx} = v + x\frac{dv}{dx}\).  
**Step 3:** Equation becomes \(v + x\frac{dv}{dx} = v + \tan v\) → \(x\frac{dv}{dx} = \tan v\).  
**Step 4:** Separate: \(\cot v \, dv = \frac{dx}{x}\).  
**Step 5:** Integrate: \(\int \cot v \, dv = \int \frac{dx}{x}\) → \(\ln|\sin v| = \ln|x| + \ln C\) → \(\sin v = Cx\).  
**Step 6:** Back-substitute \(v = y/x\): \(\sin(y/x) = Cx\).  
**Step 7:** Use initial condition: \(x=1, y=\pi/4\) → \(\sin(\pi/4) = C \cdot 1\) → \(C = 1/\sqrt{2}\).  
**Particular solution:** \(\sin(y/x) = x/\sqrt{2}\) or \(\sqrt{2}\sin(y/x) = x\).  
**Wrong answer reveals:** If a student forgets the chain rule when differentiating \(y = vx\) (writes \(dy/dx = v\) only), they miss the \(x dv/dx\) term. If they integrate \(\cot v\) as \(\ln|\cos v|\) instead of \(\ln|\sin v|\), they have a sign error. If they write \(\sin(y/x) = C\) (missing the \(x\)), they forgot that the constant of integration becomes multiplicative after exponentiation.

## DIAGNOSTIC_QUESTION_4
**ANALYZE:** Compare the two substitutions \(y = vx\) and \(x = vy\). For the differential equation \((x^2 - y^2)dx + 2xy\,dy = 0\), which substitution leads to a simpler separated equation? Justify your choice by writing the separated form for both substitutions.

## DIAGNOSTIC_ANSWER_4
Rewrite as \(\frac{dy}{dx} = \frac{y^2 - x^2}{2xy}\) (or \(\frac{dx}{dy} = \frac{2xy}{x^2 - y^2}\)).  
**Using \(y = vx\):** \(\frac{dy}{dx} = v + x\frac{dv}{dx}\). RHS = \(\frac{v^2x^2 - x^2}{2vx^2} = \frac{v^2-1}{2v}\).  
Equation: \(v + x\frac{dv}{dx} = \frac{v^2-1}{2v}\) → \(x\frac{dv}{dx} = \frac{v^2-1}{2v} - v = \frac{v^2-1-2v^2}{2v} = -\frac{v^2+1}{2v}\).  
Separated: \(\frac{2v}{v^2+1}\,dv = -\frac{dx}{x}\). (Easy to integrate: numerator is derivative of denominator.)  
**Using \(x = vy\):** \(\frac{dx}{dy} = v + y\frac{dv}{dy}\). RHS = \(\frac{2vy^2}{v^2y^2 - y^2} = \frac{2v}{v^2-1}\).  
Equation: \(v + y\frac{dv}{dy} = \frac{2v}{v^2-1}\) → \(y\frac{dv}{dy} = \frac{2v}{v^2-1} - v = \frac{2v - v^3 + v}{v^2-1} = \frac{3v - v^3}{v^2-1}\).  
Separated: \(\frac{v^2-1}{v(3-v^2)}\,dv = \frac{dy}{y}\). (Requires partial fractions — more complicated.)  
**Conclusion:** \(y = vx\) is simpler because the separated integrand \(\frac{2v}{v^2+1}\) is a direct logarithmic derivative.  
**Wrong answer reveals:** If a student arbitrarily picks one without comparing the algebraic complexity, they lack the analytical skill to choose efficient methods. If they claim both are equally simple, they did not actually attempt the separation.

## DIAGNOSTIC_QUESTION_5
**EVALUATE:** A student solves \(\frac{dy}{dx} = \frac{x+y}{x-y}\) and obtains the general solution \(\ln(x^2+y^2) = 2\tan^{-1}(y/x) + C\). Check if this solution is correct by differentiating it implicitly and verifying it satisfies the original differential equation. If incorrect, identify the error.

## DIAGNOSTIC_ANSWER_5
Differentiate the student's solution implicitly w.r.t \(x\):  
\(\frac{1}{x^2+y^2}(2x + 2y y') = \frac{2}{1+(y/x)^2} \cdot \frac{x y' - y}{x^2}\).  
Simplify RHS: \(\frac{2}{1+y^2/x^2} \cdot \frac{x y' - y}{x^2} = \frac{2x^2}{x^2+y^2} \cdot \frac{x y' - y}{x^2} = \frac{2(x y' - y)}{x^2+y^2}\).  
Equate: \(\frac{2x + 2y y'}{x^2+y^2} = \frac{2x y' - 2y}{x^2+y^2}\) → \(2x + 2y y' = 2x y' - 2y\) → \(2x + 2y = 2y'(x - y)\) → \(y' = \frac{x+y}{x-y}\).  
**The solution is CORRECT.**  
**Wrong answer reveals:** If a student says it's incorrect because "the constant should be \(\ln C\)" or "the coefficient of \(\tan^{-1}\) should be 1", they are confusing the form of the constant or misremembering the standard integral. The solution is valid as written; the constant \(C\) absorbs any multiplicative factors. If they claim the derivative of \(\tan^{-1}(y/x)\) is \(\frac{1}{1+(y/x)^2} \cdot \frac{y'}{x}\) (missing the quotient rule), they made a differentiation error.

## DIAGNOSTIC_QUESTION_6
**CREATE:** Construct a homogeneous differential equation (first order, first degree) whose general solution is the family of curves \(x^2 + y^2 = 2Cx\) (where \(C\) is an arbitrary constant). Show the steps to derive the differential equation from the given solution.

## DIAGNOSTIC_ANSWER_6
**Given:** \(x^2 + y^2 = 2Cx\).  
**Step 1:** Differentiate implicitly w.r.t \(x\): \(2x + 2y y' = 2C\).  
**Step 2:** Eliminate \(C\). From original: \(C = \frac{x^2+y^2}{2x}\). Substitute into derivative: \(2x + 2y y' = \frac{x^2+y^2}{x}\).  
**Step 3:** Solve for \(y'\): \(2y y' = \frac{x^2+y^2}{x} - 2x = \frac{x^2+y^2 - 2x^2}{x} = \frac{y^2 - x^2}{x}\).  
**Step 4:** \(y' = \frac{y^2 - x^2}{2xy}\).  
**Step 5:** Check homogeneity: \(F(x,y) = \frac{y^2 - x^2}{2xy}\). \(F(\lambda x, \lambda y) = \frac{\lambda^2(y^2-x^2)}{2\lambda^2 xy} = F(x,y)\) → homogeneous degree 0.  
**Required DE:** \(\frac{dy}{dx} = \frac{y^2 - x^2}{2xy}\) or \((x^2 - y^2)dx + 2xy\,dy = 0\).  
**Wrong answer reveals:** If a student gives \(y' = \frac{y^2 - x^2}{2xy}\) but forgets to verify homogeneity, they may not understand the definition. If they incorrectly eliminate \(C\) (e.g., write \(C = x^2+y^2\) without dividing by \(2x\)), the resulting DE will not match the family. If they produce a non-homogeneous DE, they missed the requirement.

## COMMON_MISCONCEPTION
**Misconception:** "After substituting \(y = vx\), the derivative is \(\frac{dy}{dx} = v\) (forgetting the product rule term \(x\frac{dv}{dx}\))."  
**Why it's wrong:** \(y = vx\) is a product of two functions of \(x\): \(v(x)\) and \(x\). By the product rule, \(\frac{dy}{dx} = v \cdot \frac{dx}{dx} + x \cdot \frac{dv}{dx} = v + x\frac{dv}{dx}\). Omitting \(x\frac{dv}{dx}\) treats \(v\) as a constant, which it is not — \(v\) varies with \(x\). This error turns a separable equation into an incorrect algebraic equation, leading to a completely wrong solution. For example, in \(\frac{dy}{dx} = \frac{y}{x} + \tan(y/x)\), forgetting \(x\frac{dv}{dx}\) gives \(v = v + \tan v\) → \(\tan v = 0\) → \(v = 0\) → \(y = 0\), missing the entire family of solutions \(\sin(y/x) = Cx\).

## ON_FAILURE
**Remediation Path:**  
1. **Revisit product rule differentiation:** Go to **c11_math_cbse_13_009** (Algebra of Derivatives: Sum, Difference, Product Rules) and practice differentiating products like \(y = x \cdot v(x)\) until the step \(\frac{d}{dx}[x \cdot v(x)] = v + x v'\) is automatic.  
2. **Re-do the substitution step slowly:** For a simple homogeneous DE (e.g., \(\frac{dy}{dx} = \frac{y}{x}\)), write \(y = vx\), then explicitly write \(\frac{dy}{dx} = \frac{d}{dx}(vx) = v \cdot 1 + x \cdot \frac{dv}{dx}\). Say aloud: "\(v\) is a function of \(x\), so I must use the product rule."  
3. **Re-diagnostic:** Solve \(\frac{dy}{dx} = \frac{x+y}{x-y}\) from scratch, showing the product rule step. Check that the final solution satisfies the original DE by implicit differentiation (as in Diagnostic 5).

## PREREQUISITE_NODE_IDS
c12_math_cbse_09_005, c11_math_cbse_13_009, c11_math_cbse_13_007, c11_math_cbse_02_005, c11_math_cbse_09_005, c12_math_cbse_09_001, c12_math_cbse_09_002, c12_math_cbse_09_003, c12_math_cbse_09_004

## PREREQUISITE_REASONS
c12_math_cbse_09_005: Variable separable method is the core integration technique used after the substitution \(y = vx\) reduces the homogeneous DE to separable form.
c11_math_cbse_13_009: Product rule for differentiation is essential to correctly compute \(dy/dx = v + x dv/dx\) when substituting \(y = vx\).
c11_math_cbse_13_007: Basic differentiation of polynomial functions is needed to handle integrals like \(\int \frac{2v}{v^2+1} dv\) that arise after separation.
c11_math_cbse_02_005: Understanding functions (domain, range, composition) is required to grasp the substitution \(v = y/x\) as a change of variable.
c11_math_cbse_09_005: Geometric progression concepts help in recognizing patterns in integrals involving powers, though not directly used, the algebraic manipulation of ratios is foundational.
c12_math_cbse_09_001: Homogeneous differential equations are a class of first-order equations; order identification is the first step.  
c12_math_cbse_09_002: Homogeneous DEs are first order first degree — degree must be 1 and polynomial.  
c12_math_cbse_09_003: Homogeneous DEs also produce general solutions with arbitrary constants; same verification and particular-solution process applies.  
c12_math_cbse_09_004: Homogeneous DEs arise from families where substitution \(y=vx\) works; formation shows their origin.  

## FORWARD_NODE_IDS
c12_math_cbse_09_007, c12_math_cbse_09_008
## FORWARD_REASONS
c12_math_cbse_09_007: Linear differential equations \(\frac{dy}{dx} + Py = Q\) are the next standard solution method; many problems require identifying whether a DE is homogeneous or linear (or both) to choose the appropriate technique.
c12_math_cbse_09_008: Exact differential equations extend the idea of finding integrating factors; homogeneous equations sometimes can be solved by recognizing them as exact after multiplication by an integrating factor, linking the two methods.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_010, c11_math_cbse_10_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_010: Derivatives of trigonometric functions are frequently needed when integrating separated equations involving \(\tan v\), \(\cot v\), \(\sec v\), etc., which appear in homogeneous DE solutions (e.g., \(\int \tan v \, dv = -\ln|\cos v|\)).
c11_math_cbse_10_006: Slope of a line (\(dy/dx\)) is the geometric interpretation of the differential equation; homogeneous DEs describe curves where the slope depends only on the direction from the origin, a concept used in physics for central force motion.

## CHAIN_DESCRIPTION
c12_math_cbse_09_005 (Variable Separable) → c12_math_cbse_09_006 (Homogeneous DE) → c12_math_cbse_09_007 (Linear DE)

## THIS_FORMULA
If \(\frac{dy}{dx} = F(x,y)\) with \(F(\lambda x, \lambda y) = F(x,y)\) (homogeneous degree 0), substitute \(y = vx\) ⇒ \(\frac{dy}{dx} = v + x\frac{dv}{dx}\). Then \(v + x\frac{dv}{dx} = F(1, v)\) ⇒ \(\frac{dv}{F(1,v) - v} = \frac{dx}{x}\). Integrate: \(\int \frac{dv}{F(1,v) - v} = \ln|x| + C\). Replace \(v = y/x\).

## FORMULA_VARIABLES
\(x\) = independent variable; \(y\) = dependent variable; \(v = y/x\) = new variable (ratio); \(F(x,y)\) = homogeneous function of degree zero; \(C\) = arbitrary constant of integration.

## FORMULA_UNITS
dimensionless (pure mathematical relationship; units depend on the physical context if applied)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_010 | Derivatives of trigonometric functions are used to integrate expressions like \(\int \tan v \, dv\) and \(\int \cot v \, dv\) that commonly appear after separating variables in homogeneous DEs.
c11_math_cbse_10_006 | The concept of slope \(dy/dx\) as the tangent of the angle of inclination connects homogeneous DEs to geometry: curves with slope depending only on \(y/x\) have radial symmetry.
## PREREQ_CONCEPT
Product rule of differentiation (\(d(uv)/dx = u dv/dx + v du/dx\)) applied to \(y = v \cdot x\).

## PREREQ_BEFORE
The student must be able to differentiate \(y = v(x) \cdot x\) correctly as \(v + x dv/dx\) without hesitation, and must be comfortable with the variable separable method (integration of rational/trigonometric functions in \(v\)).

## PREREQ_STUCK
If stuck on the substitution step, immediately review **c11_math_cbse_13_009** (Product Rule) and practice differentiating \(x \cdot f(x)\) for various \(f(x)\) until the pattern \(f(x) + x f'(x)\) is automatic.

## WORKED_EXAMPLE_1
**PROBLEM:** A curve passes through the point \((1, 2)\). At any point \((x, y)\) on the curve, the slope of the tangent is given by \(\frac{x^2 + y^2}{2xy}\). Find the equation of the curve.

**STEPS:**
- Step 1: Write the differential equation: \(\frac{dy}{dx} = \frac{x^2 + y^2}{2xy}\). Check homogeneity: \(F(\lambda x, \lambda y) = \frac{\lambda^2 x^2 + \lambda^2 y^2}{2 \lambda x \lambda y} = \frac{x^2 + y^2}{2xy} = F(x,y)\). It is homogeneous of degree 0.
- Step 2: Substitute \(y = vx\) ⇒ \(\frac{dy}{dx} = v + x\frac{dv}{dx}\). The RHS becomes \(\frac{x^2 + v^2 x^2}{2x \cdot vx} = \frac{1+v^2}{2v}\).
- Step 3: Equate: \(v + x\frac{dv}{dx} = \frac{1+v^2}{2v}\). Subtract \(v\): \(x\frac{dv}{dx} = \frac{1+v^2}{2v} - v = \frac{1+v^2 - 2v^2}{2v} = \frac{1 - v^2}{2v}\).
- Step 4: Separate variables: \(\frac{2v}{1 - v^2} dv = \frac{dx}{x}\).
- Step 5: Integrate both sides: \(\int \frac{2v}{1 - v^2} dv = \int \frac{dx}{x}\). Let \(u = 1 - v^2\), \(du = -2v dv\) ⇒ LHS = \(-\int \frac{du}{u} = -\ln|1 - v^2|\). RHS = \(\ln|x| + \ln C\). So \(-\ln|1 - v^2| = \ln|x| + \ln C\) ⇒ \(\ln|1 - v^2| + \ln|x| = -\ln C\) ⇒ \(\ln|x(1 - v^2)| = \ln(1/C)\) ⇒ \(x(1 - v^2) = C_1\) (where \(C_1 = \pm 1/C\)).
- Step 6: Substitute back \(v = y/x\): \(x\left(1 - \frac{y^2}{x^2}\right) = C_1\) ⇒ \(x \cdot \frac{x^2 - y^2}{x^2} = C_1\) ⇒ \(\frac{x^2 - y^2}{x} = C_1\) ⇒ \(x^2 - y^2 = C_1 x\).
- Step 7: Use initial condition \((1, 2)\): \(1^2 - 2^2 = C_1 \cdot 1\) ⇒ \(1 - 4 = C_1\) ⇒ \(C_1 = -3\).
- Step 8: Particular solution: \(x^2 - y^2 = -3x\) or \(x^2 + 3x - y^2 = 0\).

**REASONING:** The substitution \(y = vx\) exploits the homogeneity (the RHS depends only on \(y/x\)). The product rule gives the extra term \(x dv/dx\) which is crucial. Separation of variables then isolates \(v\) and \(x\). The constant of integration is handled carefully: combining logs into a single constant \(C_1\) simplifies the final algebra. The initial condition picks the specific curve from the family.

**ANSWER:** \(x^2 + 3x - y^2 = 0\) (or \(y^2 = x^2 + 3x\))

## WORKED_EXAMPLE_2
**PROBLEM:** Solve the homogeneous differential equation: \(x \cos(y/x) \frac{dy}{dx} = y \cos(y/x) + x\). Find the general solution.

**STEPS:**
- Step 1: Rewrite as \(\frac{dy}{dx} = \frac{y \cos(y/x) + x}{x \cos(y/x)} = \frac{y}{x} + \frac{1}{\cos(y/x)} = \frac{y}{x} + \sec(y/x)\). The RHS is a function of \(y/x\) only ⇒ homogeneous degree 0.
- Step 2: Substitute \(y = vx\) ⇒ \(\frac{dy}{dx} = v + x\frac{dv}{dx}\). RHS = \(v + \sec v\).
- Step 3: Equation: \(v + x\frac{dv}{dx} = v + \sec v\) ⇒ \(x\frac{dv}{dx} = \sec v\).
- Step 4: Separate: \(\cos v \, dv = \frac{dx}{x}\).
- Step 5: Integrate: \(\int \cos v \, dv = \int \frac{dx}{x}\) ⇒ \(\sin v = \ln|x| + C\).
- Step 6: Back-substitute \(v = y/x\): \(\sin(y/x) = \ln|x| + C\). This is the general solution (implicit form).

**REASONING:** The equation is already arranged with \(\frac{dy}{dx}\) isolated. The substitution \(y = vx\) immediately cancels the \(v\) terms on both sides, leaving a clean separable equation \(x dv/dx = \sec v\). The integral of \(\cos v\) is \(\sin v\), and the integral of \(dx/x\) is \(\ln|x|\). The constant \(C\) absorbs any additive constants from both sides. The solution is left in implicit form because solving explicitly for \(y\) would require \(y = x \sin^{-1}(\ln|x| + C)\), which introduces domain restrictions and is not necessary.

**ANSWER:** \(\sin(y/x) = \ln|x| + C\)

## WORKED_EXAMPLE_3
**PROBLEM:** Find the particular solution of the differential equation \((x^2 - y^2) dx + 2xy dy = 0\) given that \(y = 1\) when \(x = 1\).

**STEPS:**
- Step 1: Rewrite in standard form: \(2xy dy = (y^2 - x^2) dx\) ⇒ \(\frac{dy}{dx} = \frac{y^2 - x^2}{2xy}\). Check homogeneity: degree 0 (each term degree 2 in numerator and denominator).
- Step 2: Use substitution \(y = vx\) ⇒ \(\frac{dy}{dx} = v + x\frac{dv}{dx}\). RHS = \(\frac{v^2 x^2 - x^2}{2x \cdot vx} = \frac{v^2 - 1}{2v}\).
- Step 3: \(v + x\frac{dv}{dx} = \frac{v^2 - 1}{2v}\) ⇒ \(x\frac{dv}{dx} = \frac{v^2 - 1}{2v} - v = \frac{v^2 - 1 - 2v^2}{2v} = -\frac{v^2 + 1}{2v}\).
- Step 4: Separate: \(\frac{2v}{v^2 + 1} dv = -\frac{dx}{x}\).
- Step 5: Integrate: \(\int \frac{2v}{v^2 + 1} dv = -\int \frac{dx}{x}\). Note numerator is derivative of denominator: \(\ln(v^2 + 1) = -\ln|x| + \ln C\) (since \(v^2+1 > 0\), absolute value not needed).
- Step 6: Combine logs: \(\ln(v^2 + 1) + \ln|x| = \ln C\) ⇒ \(\ln|x(v^2 + 1)| = \ln C\) ⇒ \(x(v^2 + 1) = C\).
- Step 7: Substitute \(v = y/x\): \(x\left(\frac{y^2}{x^2} + 1\right) = C\) ⇒ \(x \cdot \frac{y^2 + x^2}{x^2} = C\) ⇒ \(\frac{x^2 + y^2}{x} = C\) ⇒ \(x^2 + y^2 = Cx\).
- Step 8: Apply initial condition \(x=1, y=1\): \(1^2 + 1^2 = C \cdot 1\) ⇒ \(C = 2\).
- Step 9: Particular solution: \(x^2 + y^2 = 2x\) or \((x-1)^2 + y^2 = 1\) (a circle centered at (1,0) with radius 1).

**REASONING:** This example combines the standard homogeneous method with a geometric interpretation. The integral \(\int \frac{2v}{v^2+1} dv\) is a standard logarithmic derivative. The constant \(C\) is determined by the initial condition. The final solution represents a family of circles passing through the origin (since \(x^2 + y^2 = Cx\) ⇒ \((x - C/2)^2 + y^2 = (C/2)^2\)). The particular solution is the circle through (1,1) with center on the x-axis.

**ANSWER:** \(x^2 + y^2 = 2x\) (or \((x-1)^2 + y^2 = 1\))

## COMPETENCY_QUESTION_1
**QUESTION:** A student claims that the differential equation \(\frac{dy}{dx} = \frac{x^2 + y^2 + 1}{xy}\) is homogeneous because "both numerator and denominator are of degree 2." Is the student correct? Justify your answer. If not, explain why the method of homogeneous equations fails for this DE, and suggest what method might work instead.

**COMPETENCY:** Error identification and correction; distinguishing between homogeneous and non-homogeneous equations.

**STEPS:**
- Step 1: Recall the definition: \(F(x,y)\) must satisfy \(F(\lambda x, \lambda y) = F(x,y)\) for all \(\lambda \neq 0\).
- Step 2: Test the given \(F(x,y) = \frac{x^2 + y^2 + 1}{xy}\). Compute \(F(\lambda x, \lambda y) = \frac{\lambda^2 x^2 + \lambda^2 y^2 + 1}{\lambda^2 xy} = \frac{x^2 + y^2}{xy} + \frac{1}{\lambda^2 xy}\).
- Step 3: Observe that \(F(\lambda x, \lambda y) \neq F(x,y)\) because of the constant term 1 in the numerator. The extra term \(1/(\lambda^2 xy)\) depends on \(\lambda\).
- Step 4: Conclude the DE is NOT homogeneous. The student incorrectly assumed that "degree of numerator = degree of denominator" is sufficient, ignoring the constant term which is degree 0.
- Step 5: Suggest alternative: This is a non-homogeneous equation. It might be solvable by substitution \(y = vx\) anyway? Let's check: \(y = vx\) gives \(v + x v' = v + 1/v + 1/(v x^2)\). The term \(1/(v x^2)\) still has \(x\), so variables do not separate. It is not linear either. It might be an exact equation or require an integrating factor (topics in later nodes).

**ANSWER:** The student is **incorrect**. The presence of the constant term \(+1\) in the numerator makes \(F(x,y)\) not homogeneous of degree zero because \(F(\lambda x, \lambda y) = \frac{x^2+y^2}{xy} + \frac{1}{\lambda^2 xy} \neq F(x,y)\). The method of homogeneous equations fails because after substitution \(y = vx\), the \(x\) does not cancel completely (a term \(1/(\lambda^2 xy)\) remains). This DE is not homogeneous, not linear, and not variable-separable; it may be solved using exact differential equations or integrating factor methods (covered in later sections).

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** The differential equation of a family of curves is given by \(\frac{dy}{dx} = \frac{y}{x} + \frac{x}{y} \cos^2(y/x)\). (a) Show that this is a homogeneous differential equation. (b) Find the general solution. (c) If the curve passes through the point \((1, \pi/4)\), find the particular solution and describe the curve.

**COMPETENCY:** Translating real-world situations to mathematical expressions; solving multi-step problems and interpreting the geometric nature of the solution.

**STEPS:**
- Step 1 (a): Write \(F(x,y) = \frac{y}{x} + \frac{x}{y} \cos^2(y/x)\). Check \(F(\lambda x, \lambda y) = \frac{\lambda y}{\lambda x} + \frac{\lambda x}{\lambda y} \cos^2(\lambda y/\lambda x) = \frac{y}{x} + \frac{x}{y} \cos^2(y/x) = F(x,y)\). Hence homogeneous degree 0.
- Step 2 (b): Substitute \(y = vx\) ⇒ \(dy/dx = v + x dv/dx\). RHS = \(v + \frac{1}{v} \cos^2 v\).
- Step 3: Equation: \(v + x \frac{dv}{dx} = v + \frac{\cos^2 v}{v}\) ⇒ \(x \frac{dv}{dx} = \frac{\cos^2 v}{v}\).
- Step 4: Separate: \(\frac{v}{\cos^2 v} dv = \frac{dx}{x}\) ⇒ \(v \sec^2 v \, dv = \frac{dx}{x}\).
- Step 5: Integrate LHS by parts: \(\int v \sec^2 v \, dv\). Let \(u = v\), \(dw = \sec^2 v dv\) ⇒ \(du = dv\), \(w = \tan v\). Then \(\int v \sec^2 v dv = v \tan v - \int \tan v dv = v \tan v - (-\ln|\cos v|) = v \tan v + \ln|\cos v|\).
- Step 6: RHS: \(\int dx/x = \ln|x| + \ln C\). So \(v \tan v + \ln|\cos v| = \ln|x| + \ln C\).
- Step 7: Combine logs: \(v \tan v + \ln|\cos v| - \ln|x| = \ln C\) ⇒ \(v \tan v + \ln|\frac{\cos v}{x}| = \ln C\). But \(v = y/x\), so \(\frac{\cos v}{x} = \frac{\cos(y/x)}{x}\). This is messy. Better: \(v \tan v + \ln|\cos v| = \ln|x| + \ln C\) ⇒ \(v \tan v = \ln|x| - \ln|\cos v| + \ln C = \ln|\frac{x}{\cos v}| + \ln C\). Or exponentiate: \(e^{v \tan v} \cdot \cos v = C x\).
- Step 8: Substitute \(v = y/x\): \(e^{(y/x) \tan(y/x)} \cos(y/x) = C x\). General solution.
- Step 9 (c): Use \(x=1, y=\pi/4\): \(e^{(\pi/4) \tan(\pi/4)} \cos(\pi/4) = C \cdot 1\) ⇒ \(e^{\pi/4} \cdot \frac{1}{\sqrt{2}} = C\).
- Step 10: Particular solution: \(e^{(y/x) \tan(y/x)} \cos(y/x) = \frac{e^{\pi/4}}{\sqrt{2}} x\). This is an implicit transcendental curve.

**ANSWER:** (a) Verified homogeneous. (b) General solution: \(e^{(y/x) \tan(y/x)} \cos(y/x) = C x\). (c) Particular solution: \(e^{(y/x) \tan(y/x)} \cos(y/x) = \frac{e^{\pi/4}}{\sqrt{2}} x\). The curve is a transcendental spiral-like curve passing through \((1, \pi/4)\).

**DIFFICULTY:** hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This method works because ______ means the slope depends only on the *direction* from the origin, not the distance.

## DIAGNOSTIC_ANSWER_7
homogeneity

Homogeneity is the property being exploited: slope as a function of direction alone is precisely what the v substitution converts into separable form. **A wrong answer (linearity) reveals the student has confused the ratio-independence that defines the family with straightness, which it never implies.**
