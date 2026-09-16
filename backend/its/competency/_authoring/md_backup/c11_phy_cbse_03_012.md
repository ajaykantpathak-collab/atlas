## DEFINITION
The equation of trajectory of a projectile is the mathematical relationship between the vertical displacement (y) and horizontal displacement (x) of an object projected with initial velocity \(v_0\) at an angle \(\theta_0\) to the horizontal, under constant gravitational acceleration \(g\) and negligible air resistance. It is given by \(y = x \tan\theta_0 - \frac{g x^2}{2 v_0^2 \cos^2\theta_0}\), which describes a parabolic path in the vertical plane.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the trajectory equation by eliminating time from parametric equations, identify the coefficients of the parabolic equation, and use it to find the height at a given horizontal distance or the horizontal distances at a given height. The student can also explain why the path is parabolic and how the equation changes for horizontal projection.

## SCOPE_BOUNDARY
Covers derivation and application of the trajectory equation for angular projection from ground level (origin) under uniform gravity with no air resistance. Does NOT cover projectile motion from a height, on an inclined plane, with air resistance, or relativistic effects.

## WALKTHROUGH
Watch a cricket ball hit for a six — it follows a curved path. That curve is not circular; it is a parabola. We already know the horizontal motion is uniform (\(x = v_0 \cos\theta_0 \, t\)) and vertical motion is uniformly accelerated (\(y = v_0 \sin\theta_0 \, t - \frac{1}{2}gt^2\)). To find the *shape* of the path, we need a direct relation between \(y\) and \(x\) without time. Solve the first equation for \(t = \frac{x}{v_0 \cos\theta_0}\) and substitute into the second. The result is a quadratic in \(x\), confirming the parabolic trajectory. This equation is the "fingerprint" of the projectile — it tells us the height at any horizontal distance.

## DIAGNOSTIC_QUESTION_1
Write the standard form of the trajectory equation for a projectile launched from the origin with speed \(v_0\) at angle \(\theta_0\). Identify the physical meaning of the coefficient of \(x\) and the coefficient of \(x^2\).

## DIAGNOSTIC_ANSWER_1
The equation is \(y = (\tan\theta_0)x - \left(\frac{g}{2v_0^2\cos^2\theta_0}\right)x^2\). The coefficient of \(x\) is \(\tan\theta_0\), which equals the initial slope of the trajectory (ratio of initial vertical to horizontal velocity). The coefficient of \(x^2\) is \(-\frac{g}{2v_0^2\cos^2\theta_0}\), which is negative, showing the parabola opens downward; its magnitude determines the "tightness" of the curve — larger \(g\) or smaller \(v_0\) makes the path bend more sharply. A wrong answer (e.g., missing the \(\cos^2\theta_0\) in the denominator) reveals the student has memorised the formula without understanding the substitution \(t = x/(v_0\cos\theta_0)\).

## DIAGNOSTIC_QUESTION_2
A student claims: "The trajectory equation \(y = x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta}\) is valid even if the projectile is launched from a cliff of height \(h\) above the ground." Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
Incorrect. The given equation assumes the origin (0,0) is the launch point. If launched from a height \(h\), the vertical displacement from the *ground* is \(y_{\text{ground}} = h + x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta}\). The trajectory *relative to the launch point* is still parabolic with the same shape, but the equation in ground coordinates has an added constant \(h\). A student who says "yes" is confusing the coordinate system — they haven't distinguished between the projectile's intrinsic parabolic path and its equation in a specific reference frame.

## DIAGNOSTIC_QUESTION_3
A stone is projected from ground level with a speed of \(20 \, \text{m/s}\) at an angle of \(30^\circ\) to the horizontal. Using the trajectory equation, find the height of the stone when it has travelled a horizontal distance of \(15 \, \text{m}\). Take \(g = 10 \, \text{m/s}^2\).

## DIAGNOSTIC_ANSWER_3
Given: \(u = 20 \, \text{m/s}\), \(\theta = 30^\circ\), \(x = 15 \, \text{m}\), \(g = 10 \, \text{m/s}^2\).  
\(\tan30^\circ = 1/\sqrt{3} \approx 0.577\), \(\cos30^\circ = \sqrt{3}/2\), \(\cos^2 30^\circ = 3/4\).  
Coefficient of \(x^2\): \(\frac{g}{2u^2\cos^2\theta} = \frac{10}{2 \times 400 \times (3/4)} = \frac{10}{600} = \frac{1}{60} \, \text{m}^{-1}\).  
\(y = (0.577)(15) - \frac{1}{60}(15)^2 = 8.66 - \frac{225}{60} = 8.66 - 3.75 = 4.91 \, \text{m}\).  
A wrong answer (e.g., 8.66 m) suggests the student forgot the \(-x^2\) term or miscalculated the coefficient, indicating they treat the trajectory as a straight line or mishandle the algebra.

## DIAGNOSTIC_QUESTION_4
Two projectiles A and B are launched with the same initial speed \(u\) but at angles \(\theta\) and \(90^\circ-\theta\) respectively. Compare their trajectory equations. At what horizontal distance \(x\) (other than \(x=0\)) do their paths intersect?

## DIAGNOSTIC_ANSWER_4
For A: \(y_A = x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta}\).  
For B: \(y_B = x\tan(90^\circ-\theta) - \frac{gx^2}{2u^2\cos^2(90^\circ-\theta)} = x\cot\theta - \frac{gx^2}{2u^2\sin^2\theta}\).  
Set \(y_A = y_B\): \(x(\tan\theta - \cot\theta) = \frac{gx^2}{2u^2}\left(\frac{1}{\cos^2\theta} - \frac{1}{\sin^2\theta}\right)\).  
Using \(\frac{1}{\cos^2\theta} - \frac{1}{\sin^2\theta} = \frac{\sin^2\theta - \cos^2\theta}{\sin^2\theta\cos^2\theta} = -(\tan\theta - \cot\theta)(\tan\theta + \cot\theta)\).  
Cancel \(x(\tan\theta - \cot\theta)\) (non-zero for \(\theta \neq 45^\circ\)): \(1 = -\frac{gx}{2u^2}(\tan\theta + \cot\theta)\).  
Since \(\tan\theta + \cot\theta = \frac{1}{\sin\theta\cos\theta} = \frac{2}{\sin2\theta}\), we get \(x = \frac{u^2\sin2\theta}{g}\), which is exactly the range \(R\). The paths intersect at the launch point and at the landing point (same range). A student who finds a different \(x\) likely made an algebraic error in handling the trigonometric identities.

## DIAGNOSTIC_QUESTION_5
A projectile's trajectory is given by \(y = 2x - 0.02x^2\) (SI units). A student calculates the maximum height by setting \(dy/dx = 0\) and finds \(x = 50 \, \text{m}\), then \(y = 50 \, \text{m}\). Another student uses the formula \(H = \frac{u^2\sin^2\theta}{2g}\) and gets a different answer. Which method is correct? Explain.

## DIAGNOSTIC_ANSWER_5
Both methods are correct *if* the parameters are extracted correctly. From \(y = 2x - 0.02x^2\), comparing with \(y = x\tan\theta - \frac{g}{2u^2\cos^2\theta}x^2\):  
\(\tan\theta = 2 \Rightarrow \theta \approx 63.4^\circ\).  
\(\frac{g}{2u^2\cos^2\theta} = 0.02\). With \(g = 10\), \(\cos\theta = 1/\sqrt{5}\), \(\cos^2\theta = 1/5\).  
\(\frac{10}{2u^2(1/5)} = 0.02 \Rightarrow \frac{25}{u^2} = 0.02 \Rightarrow u^2 = 1250\).  
Then \(H = \frac{u^2\sin^2\theta}{2g} = \frac{1250 \times (4/5)}{20} = \frac{1000}{20} = 50 \, \text{m}\). Both agree.  
If the second student got a different answer, they likely used \(g=9.8\) inconsistently or misidentified \(\tan\theta\). This tests whether the student can connect the algebraic form of the parabola to the physical parameters.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a smartphone camera and a ball thrown in a darkened room with a strobe light (or video analysis) to verify that the trajectory is parabolic. What measurements would you take, and how would you plot the data to confirm the quadratic relationship?

## DIAGNOSTIC_ANSWER_6
Record a video of a ball thrown at an angle (e.g., 30°) against a grid background. Use video analysis software (like Tracker) to mark the ball's position \((x, y)\) in each frame. Plot \(y\) vs \(x\). Fit a quadratic curve \(y = ax + bx^2\). The coefficient \(b\) should be negative. Calculate theoretical \(b_{\text{theory}} = -\frac{g}{2u^2\cos^2\theta}\) using measured \(u\) and \(\theta\). Compare \(b_{\text{exp}}\) and \(b_{\text{theory}}\). A good answer includes: controlling for camera angle (perpendicular to plane of motion), calibrating pixels to meters using the grid, and acknowledging air resistance causes slight deviation at high speeds. A poor answer suggests plotting \(y\) vs \(t\) (which is also quadratic but doesn't test the *trajectory* equation) or ignores calibration.

## COMMON_MISCONCEPTION
Students often believe the trajectory equation \(y = x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta}\) gives the *entire* flight path including after the projectile hits the ground. They plug in \(x > R\) (range) and get negative \(y\), interpreting it as the projectile going underground. The equation is only valid for \(0 \leq x \leq R\) and \(y \geq 0\). The parabolic *mathematical* curve extends beyond the physical domain, but the *physical* trajectory stops at \(y=0\). Another error: using this equation for horizontal projection (\(\theta=0\)) by setting \(\tan\theta=0\) but forgetting \(\cos\theta=1\), leading to \(y = -\frac{gx^2}{2u^2}\) — which is correct, but students often mistakenly think the formula "breaks" at \(\theta=0\).

## ON_FAILURE
Step 1: Re-derive the equation from \(x = u\cos\theta \, t\) and \(y = u\sin\theta \, t - \frac{1}{2}gt^2\) on paper, explicitly writing \(t = x/(u\cos\theta)\) and substituting. Step 2: Identify the domain: \(t \geq 0 \Rightarrow x \geq 0\); flight ends when \(y=0 \Rightarrow x = R\). Step 3: Test the horizontal projection case (\(\theta=0\)): \(y = -\frac{gx^2}{2u^2}\) — verify it matches the known result for a projectile thrown horizontally from a cliff (with origin at launch point). Step 4: Solve a problem where you are given \(x > R\) and asked for \(y\) — explicitly state "the projectile has already landed, so the equation does not apply."

## PREREQUISITE_NODE_IDS
c11_phy_cbse_03_011, c11_phy_cbse_03_009, c11_phy_cbse_03_005, c11_phy_cbse_03_004, c9_math_ch2_5, c9_math_ch4_8, c11_phy_cbse_03_010

## PREREQUISITE_REASONS
c11_phy_cbse_03_011: Angular projection provides the parametric equations \(x(t)\) and \(y(t)\) from which the trajectory equation is derived by eliminating \(t\).
c11_phy_cbse_03_009: Position and displacement vectors establish the coordinate system and the meaning of \(x\) and \(y\) components.
c11_phy_cbse_03_005: Vector addition using components is used to resolve initial velocity into \(u_x\) and \(u_y\).
c11_phy_cbse_03_004: Resolution of vectors is the prerequisite skill for splitting velocity into horizontal and vertical components.
c9_math_ch2_5: Graph of a linear equation in two variables — understanding that \(y = ax + bx^2\) is a parabola, not a line.
c9_math_ch4_8: Factorisation of quadratic expressions — needed to find roots (range) and vertex (maximum height) from the trajectory equation.
c11_phy_cbse_03_010: The trajectory equation y = -(g/2v₀²)x² derived here is a specific instance of the general trajectory equation.  

## FORWARD_NODE_IDS
c11_phy_cbse_03_013, c11_phy_cbse_03_014
## FORWARD_REASONS
c11_phy_cbse_03_013: Maximum height and range are directly obtained from the trajectory equation (vertex and positive root of the parabola).
c11_phy_cbse_03_014: Uniform circular motion uses similar parametric-to-Cartesian elimination techniques (though for a circle, not a parabola), reinforcing the mathematical method.

## CROSS_SUBJECT_PREREQS
c10_math_cbse_04_005, c10_math_cbse_04_007, c10_math_cbse_07_001
## CROSS_SUBJECT_REASONS
c10_math_cbse_04_005: Quadratic formula derivation from completing the square — the trajectory equation is a quadratic in \(x\); finding range requires solving \(y=0\), i.e., finding roots.
c10_math_cbse_04_007: Nature of roots via discriminant — the condition for a projectile to clear a wall of height \(h\) at distance \(x\) leads to a quadratic inequality; discriminant determines if it's possible.
c10_math_cbse_07_001: Distance formula using Pythagoras — the initial speed \(u\) is the magnitude of the velocity vector, related to components by \(u^2 = u_x^2 + u_y^2\), which appears in the trajectory coefficient.

## CHAIN_DESCRIPTION
c11_phy_cbse_03_011 -> c11_phy_cbse_03_012 -> c11_phy_cbse_03_013

## THIS_FORMULA
\(y = x \tan\theta_0 - \frac{g x^2}{2 v_0^2 \cos^2\theta_0}\) (SI units: \(x, y\) in m, \(v_0\) in m/s, \(g\) in m/s², \(\theta_0\) in rad or deg)

## FORMULA_VARIABLES
\(y\) = vertical displacement from launch point (m), \(x\) = horizontal displacement from launch point (m), \(v_0\) = initial speed (m/s), \(\theta_0\) = projection angle with horizontal (rad or deg), \(g\) = acceleration due to gravity (m/s²)

## FORMULA_UNITS
m, m/s, m/s², rad (or deg)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_04_005 | The trajectory equation is a quadratic in x; finding the range requires solving for roots using the quadratic formula derived by completing the square.
c10_math_cbse_04_007 | The discriminant of the quadratic determines whether a projectile can reach a given height at a given horizontal distance (e.g., clearing a wall).
c10_math_cbse_07_001 | The initial velocity components satisfy \(u_x^2 + u_y^2 = u^2\) by Pythagoras, which is used to simplify the coefficient \(\frac{g}{2u^2\cos^2\theta}\).

## PREREQ_CONCEPT
Resolution of initial velocity into horizontal and vertical components, and the parametric equations of motion for constant acceleration in each direction.

## PREREQ_BEFORE
The student must be able to write \(x(t)\) and \(y(t)\) for angular projection and solve for \(t\) from the horizontal equation.

## PREREQ_STUCK
Revisit "Projectile Motion: Angular Projection" (c11_phy_cbse_03_011) and practice eliminating the parameter \(t\) from two parametric equations (math: coordinate geometry).

## WORKED_EXAMPLE_1
PROBLEM: A football is kicked from ground level with a speed of \(25 \, \text{m/s}\) at an angle of \(37^\circ\) to the horizontal. Take \(g = 10 \, \text{m/s}^2\), \(\sin37^\circ = 0.6\), \(\cos37^\circ = 0.8\). Find (a) the equation of the trajectory, (b) the height of the ball when it has travelled \(20 \, \text{m}\) horizontally, and (c) the horizontal distance(s) at which the ball is at a height of \(10 \, \text{m}\).
STEPS:
- Step 1: Identify given quantities: \(u = 25 \, \text{m/s}\), \(\theta = 37^\circ\), \(g = 10 \, \text{m/s}^2\). Compute \(\tan\theta = \sin\theta/\cos\theta = 0.6/0.8 = 0.75\). Compute \(\cos^2\theta = (0.8)^2 = 0.64\).
- Step 2: Write the general trajectory equation: \(y = x\tan\theta - \frac{g}{2u^2\cos^2\theta}x^2\). Substitute the coefficient: \(\frac{g}{2u^2\cos^2\theta} = \frac{10}{2 \times 625 \times 0.64} = \frac{10}{800} = 0.0125 \, \text{m}^{-1}\).
- Step 3: Equation is \(y = 0.75x - 0.0125x^2\). (Check units: \(0.75\) dimensionless, \(0.0125 \, \text{m}^{-1} \times x^2 \, \text{m}^2 = \text{m}\) ✓)
- Step 4: For (b), put \(x = 20 \, \text{m}\): \(y = 0.75(20) - 0.0125(400) = 15 - 5 = 10 \, \text{m}\).
- Step 5: For (c), set \(y = 10\): \(10 = 0.75x - 0.0125x^2 \Rightarrow 0.0125x^2 - 0.75x + 10 = 0\). Multiply by 80: \(x^2 - 60x + 800 = 0 \Rightarrow (x-20)(x-40)=0\). So \(x = 20 \, \text{m}\) (ascending) and \(x = 40 \, \text{m}\) (descending).
REASONING: The trajectory equation directly gives \(y(x)\). The quadratic in \(x\) for a given \(y\) yields two roots because the projectile reaches the same height twice — once going up, once coming down (except at max height). The coefficients come from substituting \(t = x/(u\cos\theta)\) into \(y(t)\).
ANSWER: (a) \(y = 0.75x - 0.0125x^2\) (b) \(10 \, \text{m}\) (c) \(20 \, \text{m}\) and \(40 \, \text{m}\)

## WORKED_EXAMPLE_2
PROBLEM: A water hose held at a height of \(1.5 \, \text{m}\) above the ground shoots water at \(15 \, \text{m/s}\) at an angle of \(45^\circ\). The nozzle is at \(x=0\). Find the horizontal distance from the nozzle where the water hits the ground. Take \(g = 10 \, \text{m/s}^2\).
STEPS:
- Step 1: This is projection from a height \(h = 1.5 \, \text{m}\), not from ground. The trajectory equation relative to the *nozzle* is \(y' = x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta}\), where \(y'\) is vertical displacement from nozzle. Ground is at \(y' = -1.5 \, \text{m}\).
- Step 2: Given \(u = 15 \, \text{m/s}\), \(\theta = 45^\circ\), \(\tan45^\circ = 1\), \(\cos45^\circ = 1/\sqrt{2}\), \(\cos^2 45^\circ = 0.5\). Coefficient: \(\frac{g}{2u^2\cos^2\theta} = \frac{10}{2 \times 225 \times 0.5} = \frac{10}{225} = \frac{2}{45} \, \text{m}^{-1}\).
- Step 3: Equation: \(y' = x - \frac{2}{45}x^2\). Set \(y' = -1.5\): \(-1.5 = x - \frac{2}{45}x^2\).
- Step 4: Multiply by 45: \(-67.5 = 45x - 2x^2 \Rightarrow 2x^2 - 45x - 67.5 = 0\). Multiply by 2: \(4x^2 - 90x - 135 = 0\). Use quadratic formula: \(x = \frac{90 \pm \sqrt{8100 + 2160}}{8} = \frac{90 \pm \sqrt{10260}}{8}\).
- Step 5: \(\sqrt{10260} \approx 101.3\). Positive root: \(x = \frac{90 + 101.3}{8} = \frac{191.3}{8} \approx 23.9 \, \text{m}\). (Negative root discarded).
REASONING: When launch point is not at ground level, the trajectory equation still describes the path relative to the launch point. The ground corresponds to a negative \(y'\). The quadratic gives two roots; the positive one is the physical range.
ANSWER: The water hits the ground approximately \(23.9 \, \text{m}\) from the nozzle.

## WORKED_EXAMPLE_3
PROBLEM: A projectile is fired from the origin with velocity \(\vec{v} = (12\hat{i} + 16\hat{j}) \, \text{m/s}\). Take \(g = 10 \, \text{m/s}^2\). (a) Find the trajectory equation in the form \(y = ax - bx^2\). (b) A vertical wall is located at \(x = 10 \, \text{m}\). Will the projectile clear the wall if the wall height is \(8 \, \text{m}\)? (c) Find the maximum height and the range.
STEPS:
- Step 1: Extract components: \(u_x = 12 \, \text{m/s}\), \(u_y = 16 \, \text{m/s}\). Speed \(u = \sqrt{12^2 + 16^2} = 20 \, \text{m/s}\). \(\tan\theta = u_y/u_x = 16/12 = 4/3\). \(\cos\theta = u_x/u = 12/20 = 0.6\), \(\cos^2\theta = 0.36\).
- Step 2: Coefficient \(b = \frac{g}{2u^2\cos^2\theta} = \frac{10}{2 \times 400 \times 0.36} = \frac{10}{288} = \frac{5}{144} \approx 0.0347 \, \text{m}^{-1}\). Equation: \(y = \frac{4}{3}x - \frac{5}{144}x^2\).
- Step 3: For (b), at \(x = 10 \, \text{m}\): \(y = \frac{4}{3}(10) - \frac{5}{144}(100) = 13.33 - 3.47 = 9.86 \, \text{m}\). Since \(9.86 > 8\), the projectile clears the wall.
- Step 4: For (c), max height: vertex of parabola at \(x = \frac{a}{2b} = \frac{4/3}{2 \times 5/144} = \frac{4/3}{10/144} = \frac{4}{3} \times \frac{144}{10} = 19.2 \, \text{m}\). \(y_{\text{max}} = \frac{4}{3}(19.2) - \frac{5}{144}(19.2)^2 = 25.6 - 12.8 = 12.8 \, \text{m}\). (Check: \(H = \frac{u_y^2}{2g} = \frac{256}{20} = 12.8 \, \text{m}\) ✓)
- Step 5: Range: set \(y=0\): \(x(\frac{4}{3} - \frac{5}{144}x) = 0 \Rightarrow x = 0\) or \(x = \frac{4}{3} \times \frac{144}{5} = 38.4 \, \text{m}\). (Check: \(R = \frac{2u_x u_y}{g} = \frac{2 \times 12 \times 16}{10} = 38.4 \, \text{m}\) ✓)
REASONING: The vector form of initial velocity directly gives components. The trajectory equation coefficients are derived from these. The vertex of the parabola \(y = ax - bx^2\) is at \(x = a/(2b)\), which corresponds to the maximum height. The positive root gives the range. Cross-checking with standard formulas verifies consistency.
ANSWER: (a) \(y = \frac{4}{3}x - \frac{5}{144}x^2\) (b) Yes, height at wall is \(9.86 \, \text{m} > 8 \, \text{m}\) (c) Max height = \(12.8 \, \text{m}\), Range = \(38.4 \, \text{m}\)

## COMPETENCY_QUESTION_1
QUESTION: A projectile's trajectory is given by \(y = 3x - 0.03x^2\) (SI units). Without calculating the initial speed or angle, determine: (i) the maximum height reached, (ii) the horizontal range, and (iii) the initial projection angle. Explain how you extracted each from the equation's coefficients.
COMPETENCY: Interpreting physical parameters from the algebraic form of the trajectory equation
STEPS:
- Step 1: Recognise the standard form \(y = (\tan\theta)x - \frac{g}{2u^2\cos^2\theta}x^2\). Identify \(a = \tan\theta = 3\) and \(b = \frac{g}{2u^2\cos^2\theta} = 0.03\).
- Step 2: (iii) \(\tan\theta = 3 \Rightarrow \theta = \tan^{-1}(3) \approx 71.6^\circ\).
- Step 3: (ii) Range \(R\) is the non-zero root of \(y=0\): \(x(a - bx) = 0 \Rightarrow R = a/b = 3/0.03 = 100 \, \text{m}\).
- Step 4: (i) Max height \(H\) at vertex \(x = a/(2b) = 3/(0.06) = 50 \, \text{m}\). \(H = a^2/(4b) = 9/(0.12) = 75 \, \text{m}\). (Alternatively, \(H = \frac{u^2\sin^2\theta}{2g}\); using \(b = \frac{g}{2u^2\cos^2\theta}\) and \(\tan\theta = a\), one can show \(H = \frac{a^2}{4b}\)).
ANSWER: (i) Maximum height = \(75 \, \text{m}\) (ii) Range = \(100 \, \text{m}\) (iii) Projection angle \(\theta = \tan^{-1}(3) \approx 71.6^\circ\)
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two particles are projected simultaneously from the same point on level ground. Particle A has speed \(u\) at angle \(\alpha\). Particle B has speed \(v\) at angle \(\beta\). Their trajectory equations are \(y = x\tan\alpha - k_1 x^2\) and \(y = x\tan\beta - k_2 x^2\) where \(k_1 = \frac{g}{2u^2\cos^2\alpha}\), \(k_2 = \frac{g}{2v^2\cos^2\beta}\). Derive the condition for the two particles to collide in mid-air (other than at the origin). If \(u = 20 \, \text{m/s}\), \(\alpha = 60^\circ\), \(v = 20 \, \text{m/s}\), \(\beta = 30^\circ\), and \(g = 10 \, \text{m/s}^2\), do they collide? If yes, find the collision coordinates.
COMPETENCY: Applying the trajectory equation to multi-body problems and solving for intersection in space and time
STEPS:
- Step 1: For collision, they must have same \((x,y)\) at same time \(t\). Equate trajectory equations: \(x\tan\alpha - k_1 x^2 = x\tan\beta - k_2 x^2\). For \(x \neq 0\): \(\tan\alpha - \tan\beta = (k_1 - k_2)x \Rightarrow x = \frac{\tan\alpha - \tan\beta}{k_1 - k_2}\).
- Step 2: But they must also reach this \(x\) at the same \(t\). Time for A: \(t_A = \frac{x}{u\cos\alpha}\). Time for B: \(t_B = \frac{x}{v\cos\beta}\). Collision requires \(t_A = t_B \Rightarrow \frac{x}{u\cos\alpha} = \frac{x}{v\cos\beta} \Rightarrow u\cos\alpha = v\cos\beta\).
- Step 3: Check given values: \(u\cos\alpha = 20 \times 0.5 = 10\). \(v\cos\beta = 20 \times \frac{\sqrt{3}}{2} \approx 17.32\). Not equal. So they do NOT collide — they have different horizontal speeds, so they reach any given \(x\) at different times.
- Step 4: If horizontal speeds were equal (e.g., both \(10 \, \text{m/s}\)), then \(x = \frac{\tan60 - \tan30}{k_1 - k_2}\). Compute \(k_1 = \frac{10}{2 \times 400 \times 0.25} = 0.05\), \(k_2 = \frac{10}{2 \times 400 \times 0.75} \approx 0.0167\). \(x = \frac{\sqrt{3} - 1/\sqrt{3}}{0.05 - 0.0167} = \frac{2/\sqrt{3}}{0.0333} \approx 34.6 \, \text{m}\). Then \(y = 34.6 \times \sqrt{3} - 0.05 \times 34.6^2 \approx 59.9 - 59.9 = 0\). They would collide at ground level (same range).
ANSWER: Condition for mid-air collision: \(u\cos\alpha = v\cos\beta\) (equal horizontal velocities) AND \(x = \frac{\tan\alpha - \tan\beta}{k_1 - k_2}\) lies within both ranges. For given values, horizontal speeds are unequal (\(10 \neq 17.32\)), so they do NOT collide in mid-air.
DIFFICULTY: hard