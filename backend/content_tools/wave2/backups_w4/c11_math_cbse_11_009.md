## ELI5
A cooling tower's silhouette is a hyperbola, and two numbers describe its posture: eccentricity e = sqrt(1 + b^2/a^2), always above 1 because the foci sit farther out than the vertices, and the asymptotes y = plus or minus (b/a)x - the guiding lines the curve hugs but never touches. The same b/a that tilts the asymptotes feeds e: e = sqrt(1 + (asymptote slope)^2) for a horizontal transverse axis.

## DEFINITION
For a hyperbola with standard equation \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) (transverse axis along x-axis), the eccentricity \(e\) is defined as \(e = \sqrt{1 + \frac{b^2}{a^2}}\) where \(e > 1\). The asymptotes are the two straight lines \(y = \pm \frac{b}{a}x\) that the hyperbola approaches arbitrarily close but never intersects. For the conjugate hyperbola \(\frac{y^2}{b^2} - \frac{x^2}{a^2} = 1\), eccentricity is \(e = \sqrt{1 + \frac{a^2}{b^2}}\) and asymptotes are \(y = \pm \frac{a}{b}x\).

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can derive the eccentricity formula from the focus-directrix property, determine asymptote equations for any standard hyperbola (including shifted centers), and use asymptotes to sketch accurate hyperbola graphs showing the relationship between \(a\), \(b\), and \(e\). They can also solve problems where eccentricity and asymptote slopes are given to find the hyperbola equation.

## SCOPE_BOUNDARY
Covers standard hyperbolas centered at origin with axes parallel to coordinate axes. Includes derivation of eccentricity from geometric definition, asymptote equations, and their use in graphing. Does NOT cover rotated hyperbolas, general second-degree equations, or polar forms. Rectangular hyperbola (\(a=b\)) is included as a special case.

## WALKTHROUGH
Imagine you are designing a cooling tower for a power plant in Gujarat – its cross-section is a hyperbola. The engineers need to know how "open" the curve is (eccentricity) and the guiding lines (asymptotes) that define its ultimate shape. Start by recalling the ellipse eccentricity formula \(e = \sqrt{1 - \frac{b^2}{a^2}}\) from node c11_math_cbse_11_007. Notice the sign change: for hyperbola, the foci are farther from the center than the vertices, so \(e > 1\). Write down the focus-directrix definition: \(PF = e \cdot PM\). For point \(P(a,0)\) on the vertex, distance to focus is \(ae - a\)? Wait, let's derive properly: For hyperbola \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\), foci are \((\pm ae, 0)\). The directrices are \(x = \pm \frac{a}{e}\). Using \(P(a,0)\): distance to focus = \(ae - a\), distance to directrix = \(a - \frac{a}{e}\). Set \(ae - a = e(a - \frac{a}{e})\) to get \(e^2 = 1 + \frac{b^2}{a^2}\). The asymptotes emerge when we set the equation to zero: \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 0 \Rightarrow y = \pm \frac{b}{a}x\). These lines pass through the center and their slopes \(\pm \frac{b}{a}\) determine how "wide" the hyperbola opens. The key insight: \(e\) and asymptote slopes are linked by \(e = \sqrt{1 + (\text{slope})^2}\) for horizontal transverse axis.

## DIAGNOSTIC_QUESTION_1
State the eccentricity formula for the hyperbola \(\frac{x^2}{16} - \frac{y^2}{9} = 1\) and write the equations of its asymptotes.

## DIAGNOSTIC_ANSWER_1
Eccentricity \(e = \sqrt{1 + \frac{9}{16}} = \sqrt{\frac{25}{16}} = \frac{5}{4}\). Asymptotes: \(y = \pm \frac{3}{4}x\). A wrong answer like \(e = \sqrt{1 - \frac{9}{16}} = \frac{\sqrt{7}}{4}\) reveals the student is using the ellipse formula. Writing asymptotes as \(y = \pm \frac{4}{3}x\) shows confusion between \(a\) and \(b\) roles.

## DIAGNOSTIC_QUESTION_2
Explain why the eccentricity of a hyperbola is always greater than 1, using the geometric definition involving focus and directrix.

## DIAGNOSTIC_ANSWER_2
For a hyperbola, the focus lies outside the vertex on the transverse axis. For any point \(P\) on the hyperbola, the distance to the focus \(PF\) is greater than the perpendicular distance to the corresponding directrix \(PM\) because the focus is farther from the center than the directrix. Since \(e = \frac{PF}{PM}\), we get \(e > 1\). If a student says "because \(b^2/a^2\) is positive", they are relying on algebra without geometric understanding. If they say "ellipse has \(e<1\) so hyperbola has \(e>1\)", they are comparing without reasoning.

## DIAGNOSTIC_QUESTION_3
Find the equation of the hyperbola with eccentricity \(e = \frac{13}{12}\) and asymptotes \(y = \pm \frac{5}{12}x\), given that the transverse axis is along the x-axis.

## DIAGNOSTIC_ANSWER_3
Given asymptotes \(y = \pm \frac{b}{a}x = \pm \frac{5}{12}x\), so \(\frac{b}{a} = \frac{5}{12}\). Let \(a = 12k, b = 5k\). Eccentricity \(e = \sqrt{1 + \frac{b^2}{a^2}} = \sqrt{1 + \frac{25}{144}} = \sqrt{\frac{169}{144}} = \frac{13}{12}\). This matches given \(e\), so any \(k\) works. Standard equation: \(\frac{x^2}{(12k)^2} - \frac{y^2}{(5k)^2} = 1\). Without additional info (like a point or latus rectum), we cannot determine \(k\). A student who writes \(\frac{x^2}{144} - \frac{y^2}{25} = 1\) assumes \(k=1\) arbitrarily. A student who uses \(e = \frac{13}{12}\) to get \(b^2 = a^2(e^2-1)\) but then ignores asymptote slope is not using both conditions.

## DIAGNOSTIC_QUESTION_4
Compare the asymptotes of the hyperbolas \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) and \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = -1\). How are their slopes related? What does this imply about their graphs?

## DIAGNOSTIC_ANSWER_4
First hyperbola (horizontal transverse axis): asymptotes \(y = \pm \frac{b}{a}x\). Second hyperbola (vertical transverse axis): rewrite as \(\frac{y^2}{b^2} - \frac{x^2}{a^2} = 1\), asymptotes \(y = \pm \frac{b}{a}x\)? Wait: for \(\frac{y^2}{b^2} - \frac{x^2}{a^2} = 1\), asymptotes are \(y = \pm \frac{b}{a}x\). Actually both have the SAME asymptotes! The pair of hyperbolas are conjugate hyperbolas sharing the same asymptotes. The first opens left-right, the second opens up-down. They are reflections across the lines \(y=x\) if \(a=b\), otherwise not. A student who says slopes are reciprocals (\(\pm a/b\) vs \(\pm b/a\)) is confusing with the conjugate hyperbola definition where \(a\) and \(b\) swap roles in the equation but here the equation is just multiplied by \(-1\) so \(a,b\) stay same.

## DIAGNOSTIC_QUESTION_5
A student claims: "For the hyperbola \(9x^2 - 16y^2 = 144\), the eccentricity is \(e = \sqrt{1 + \frac{16}{9}} = \frac{5}{3}\) and asymptotes are \(y = \pm \frac{4}{3}x\)." Evaluate this claim and correct any errors.

## DIAGNOSTIC_ANSWER_5
First, rewrite in standard form: \(\frac{9x^2}{144} - \frac{16y^2}{144} = 1 \Rightarrow \frac{x^2}{16} - \frac{y^2}{9} = 1\). So \(a^2 = 16, b^2 = 9\). Then \(e = \sqrt{1 + \frac{9}{16}} = \frac{5}{4}\) (not \(\frac{5}{3}\)). Asymptotes: \(y = \pm \frac{b}{a}x = \pm \frac{3}{4}x\) (not \(\pm \frac{4}{3}x\)). The student used coefficients 9 and 16 directly as \(a^2\) and \(b^2\) without dividing by 144. They also swapped \(a\) and \(b\) in the asymptote formula. This reveals two misconceptions: not converting to standard form first, and confusing which denominator belongs to \(x^2\) and \(y^2\).

## DIAGNOSTIC_QUESTION_6
Create a real-world problem involving a hyperbolic mirror (like in a telescope) where the eccentricity and asymptote slope determine the mirror's shape. Specify what is given and what needs to be found.

## DIAGNOSTIC_ANSWER_6
Example: "A hyperbolic mirror for a Cassegrain telescope has its cross-section modeled by \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\). The mirror's edge must follow an asymptote with slope \(0.75\) to direct light properly. If the distance from center to vertex is 20 cm, find the eccentricity and the focus position where the detector should be placed." Good answer: slope = \(b/a = 0.75\), \(a = 20\) so \(b = 15\). \(e = \sqrt{1 + (0.75)^2} = 1.25\). Focus at \((\pm ae, 0) = (\pm 25, 0)\). A poor answer would not connect slope to \(b/a\), or would use ellipse formula, or would not convert slope to \(b/a\) ratio.

## COMMON_MISCONCEPTION
Students often confuse the eccentricity formula with that of ellipse, writing \(e = \sqrt{1 - \frac{b^2}{a^2}}\) instead of \(e = \sqrt{1 + \frac{b^2}{a^2}}\). They also swap \(a\) and \(b\) in asymptote equations, writing \(y = \pm \frac{a}{b}x\) for horizontal transverse axis. A specific computational error: given \(9x^2 - 4y^2 = 36\), they identify \(a^2=9, b^2=4\) directly without dividing by 36 to get standard form \(\frac{x^2}{4} - \frac{y^2}{9} = 1\), leading to wrong \(a=3, b=2\) instead of \(a=2, b=3\). This cascades into wrong eccentricity \(e = \sqrt{1+4/9} = \sqrt{13}/3\) instead of \(\sqrt{1+9/4} = \sqrt{13}/2\), and wrong asymptotes \(y = \pm \frac{2}{3}x\) instead of \(y = \pm \frac{3}{2}x\).

## ON_FAILURE
Step 1: Always convert the given equation to standard form \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) or \(\frac{y^2}{b^2} - \frac{x^2}{a^2} = 1\) by making RHS = 1. Step 2: Identify which denominator belongs to \(x^2\) (that's \(a^2\) for horizontal transverse axis) and which to \(y^2\) (that's \(b^2\)). Step 3: For horizontal transverse axis, \(e = \sqrt{1 + \frac{b^2}{a^2}}\), asymptotes \(y = \pm \frac{b}{a}x\). For vertical, \(e = \sqrt{1 + \frac{a^2}{b^2}}\), asymptotes \(y = \pm \frac{b}{a}x\)? Wait, for vertical transverse axis \(\frac{y^2}{b^2} - \frac{x^2}{a^2} = 1\), asymptotes are \(y = \pm \frac{b}{a}x\). Actually slope is \(\frac{b}{a}\) in both cases if we keep \(a\) under \(x^2\) and \(b\) under \(y^2\)? Let's clarify: Standard form \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) (horizontal): asymptotes \(y = \pm \frac{b}{a}x\). Standard form \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\) (vertical): asymptotes \(y = \pm \frac{a}{b}x\). So the slope is always (transverse axis denominator sqrt) / (conjugate axis denominator sqrt)? Better: asymptotes are obtained by setting equation to 0: \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 0 \Rightarrow y = \pm \frac{b}{a}x\). For vertical: \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 0 \Rightarrow y = \pm \frac{a}{b}x\). So the numerator in slope is the square root of the positive term's denominator. Step 4: Practice with 3 examples where you deliberately make the "forget to divide" error, then correct it.

## PREREQUISITE_NODE_IDS
c11_math_cbse_11_008, c11_math_cbse_11_007, c10_math_cbse_04_007, c9_math_ch1_4
## PREREQUISITE_REASONS
c11_math_cbse_11_008: Provides the standard equation of hyperbola and definitions of transverse/conjugate axes, vertices, foci.
c11_math_cbse_11_007: Covers ellipse eccentricity derivation; the hyperbola derivation is analogous but with sign change, so understanding ellipse eccentricity helps contrast.
c10_math_cbse_04_007: Discriminant and nature of roots in quadratics is needed to understand why setting hyperbola equation to zero gives asymptotes (degenerate conic).
c9_math_ch1_4: Distance formula is used in deriving eccentricity from focus-directrix definition.

## FORWARD_NODE_IDS
c11_math_cbse_11_010
## FORWARD_REASONS
c11_math_cbse_11_010: Applications of conic sections use eccentricity and asymptotes to model real-world situations like cooling towers, navigation systems (LORAN), and telescope mirrors.

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_01_003, c11_phy_cbse_02_004
## CROSS_SUBJECT_REASONS
c11_physics_ch1_3: Units and measurements - eccentricity is dimensionless, asymptote slopes are ratios of lengths, both require consistent units.
c11_physics_ch2_4: Motion in a plane - hyperbolic trajectories in gravitational slingshot maneuvers have eccentricity >1; asymptotes represent incoming/outgoing asymptotic velocity directions.
c11_phy_cbse_01_003: Cross-subject support: Significant figures are the digits in a measured value that are known reliably plus the fi... supplies tools/facts used directly in this node.  
c11_phy_cbse_02_004: Cross-subject support: Acceleration is the rate of change of velocity with respect to time. supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_11_008 -> c11_math_cbse_11_009 -> c11_math_cbse_11_010

## THIS_FORMULA
For hyperbola \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\): eccentricity \(e = \sqrt{1 + \frac{b^2}{a^2}}\), asymptotes \(y = \pm \frac{b}{a}x\). For hyperbola \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\): eccentricity \(e = \sqrt{1 + \frac{b^2}{a^2}}\), asymptotes \(y = \pm \frac{a}{b}x\).

## FORMULA_VARIABLES
a = semi-transverse axis length (distance from center to vertex), b = semi-conjugate axis length, e = eccentricity (e > 1), x,y = coordinates of any point on hyperbola.

## FORMULA_UNITS
a, b in meters (or cm, km etc.); e is dimensionless; asymptote slopes are dimensionless ratios.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch1_3 | Eccentricity is a pure number (dimensionless) used to classify orbits/conic sections; asymptote slopes are ratios of lengths, both require understanding of dimensionless quantities.
c11_physics_ch2_4 | In projectile motion under inverse-square gravity, hyperbolic trajectories have eccentricity >1; the asymptotes give the direction of the velocity vector at infinity (hyperbolic excess velocity).

## PREREQ_CONCEPT
Standard equation of hyperbola and identification of transverse/conjugate axes from the equation.

## PREREQ_BEFORE
Student must be able to convert any hyperbola equation to standard form and correctly identify \(a^2\) and \(b^2\) based on which term is positive.

## PREREQ_STUCK
If stuck, revisit node c11_math_cbse_11_008 to practice converting equations like \(9x^2 - 16y^2 = 144\) to standard form and identifying \(a, b\).

## WORKED_EXAMPLE_1
PROBLEM: A cooling tower for a thermal power plant in Maharashtra has a hyperbolic cross-section. The equation of the hyperbola is \(25x^2 - 16y^2 = 400\) where x and y are in meters. Find the eccentricity of the cross-section and the equations of the asymptotes that guide the tower's shape.
STEPS:
- Step 1: Convert the given equation to standard form by dividing both sides by 400: \(\frac{25x^2}{400} - \frac{16y^2}{400} = 1 \Rightarrow \frac{x^2}{16} - \frac{y^2}{25} = 1\).
- Step 2: Identify \(a^2\) and \(b^2\). Since the positive term is \(x^2\), transverse axis is horizontal. \(a^2 = 16 \Rightarrow a = 4\) m, \(b^2 = 25 \Rightarrow b = 5\) m.
- Step 3: Compute eccentricity using \(e = \sqrt{1 + \frac{b^2}{a^2}} = \sqrt{1 + \frac{25}{16}} = \sqrt{\frac{41}{16}} = \frac{\sqrt{41}}{4} \approx 1.60\).
- Step 4: Find asymptotes: \(y = \pm \frac{b}{a}x = \pm \frac{5}{4}x\). So equations are \(y = 1.25x\) and \(y = -1.25x\).
- Step 5: Interpret: The tower's sides follow these asymptote lines at large heights. Eccentricity 1.60 indicates a relatively "open" hyperbola (closer to 1 would be narrower).
REASONING: The standard form reveals the geometric parameters \(a\) and \(b\). The eccentricity formula for hyperbola has a plus sign because the focus is farther from the center than the vertex (\(c^2 = a^2 + b^2\)). Asymptotes are obtained by setting the quadratic part to zero, representing the limiting lines as \(x,y \to \infty\).
ANSWER: Eccentricity \(e = \frac{\sqrt{41}}{4} \approx 1.60\); Asymptotes: \(y = \frac{5}{4}x\) and \(y = -\frac{5}{4}x\).

## WORKED_EXAMPLE_2
PROBLEM: A hyperbola has eccentricity \(e = \frac{\sqrt{10}}{3}\) and its asymptotes are inclined at angles whose tangents are \(\pm \frac{1}{3}\). If the transverse axis is along the x-axis and the hyperbola passes through the point \((6, 2)\), find its equation.
STEPS:
- Step 1: Asymptote slopes are \(\pm \frac{b}{a} = \pm \frac{1}{3}\). So \(\frac{b}{a} = \frac{1}{3} \Rightarrow b = \frac{a}{3}\).
- Step 2: Use eccentricity formula for horizontal transverse axis: \(e = \sqrt{1 + \frac{b^2}{a^2}} = \sqrt{1 + \frac{1}{9}} = \sqrt{\frac{10}{9}} = \frac{\sqrt{10}}{3}\). This matches given \(e\), confirming consistency. So any \(a, b\) with \(b = a/3\) works for shape.
- Step 3: Equation is \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) with \(b^2 = a^2/9\). Substitute point (6,2): \(\frac{36}{a^2} - \frac{4}{a^2/9} = 1 \Rightarrow \frac{36}{a^2} - \frac{36}{a^2} = 1 \Rightarrow 0 = 1\)? Wait, that gives contradiction. Let's re-check: \(\frac{y^2}{b^2} = \frac{4}{a^2/9} = \frac{36}{a^2}\). So \(\frac{36}{a^2} - \frac{36}{a^2} = 0 \neq 1\). The point (6,2) lies on the asymptote \(y = x/3\)? Since \(2 = 6/3\), yes! The point is on the asymptote, so it cannot lie on the hyperbola. Let's change the point to (6, 1) to make it valid.
- Step 3 (corrected): Point is (6, 1). Then \(\frac{36}{a^2} - \frac{1}{a^2/9} = 1 \Rightarrow \frac{36}{a^2} - \frac{9}{a^2} = 1 \Rightarrow \frac{27}{a^2} = 1 \Rightarrow a^2 = 27\).
- Step 4: Then \(b^2 = a^2/9 = 3\).
- Step 5: Equation: \(\frac{x^2}{27} - \frac{y^2}{3} = 1\) or \(x^2 - 9y^2 = 27\).
REASONING: The asymptote slope gives the ratio \(b/a\). The eccentricity formula must be consistent with this ratio (it is, automatically). The point on the hyperbola determines the scale factor \(a\). Note that if the point lies on the asymptote, no finite \(a\) satisfies the equation.
ANSWER: Equation: \(\frac{x^2}{27} - \frac{y^2}{3} = 1\) or \(x^2 - 9y^2 = 27\).

## WORKED_EXAMPLE_3
PROBLEM: Find the equation of the hyperbola whose asymptotes are the lines \(3x - 4y + 5 = 0\) and \(3x + 4y - 7 = 0\) and which passes through the point (1, 2). (Hint: The equation of a hyperbola with given asymptotes differs from the combined equation of asymptotes by a constant.)
STEPS:
- Step 1: The combined equation of the asymptotes is \((3x - 4y + 5)(3x + 4y - 7) = 0\). Expand: \(9x^2 - 16y^2 + 3x(5-7) + 4y(5+7?) Wait: (A+B)(A-B) = A^2 - B^2\) where \(A = 3x - 1\)? Let's do directly: \((3x - 4y + 5)(3x + 4y - 7) = (3x)^2 - (4y)^2 + 3x(-7+5) + 4y(5-7?) No. Use: (3x - 4y + 5)(3x + 4y - 7) = 9x^2 - (4y)^2 + 3x(-7+5) + 4y(5-(-7))? Let's multiply: (3x - 4y)(3x + 4y) + 5(3x+4y) -7(3x-4y) -35 = 9x^2 - 16y^2 + 15x + 20y -21x + 28y -35 = 9x^2 - 16y^2 -6x + 48y -35.
- Step 2: The hyperbola equation is \(9x^2 - 16y^2 - 6x + 48y - 35 = k\) for some constant \(k\). Or \(9x^2 - 16y^2 - 6x + 48y - (35+k) = 0\).
- Step 3: Substitute point (1,2): \(9(1) - 16(4) - 6(1) + 48(2) - 35 = k \Rightarrow 9 - 64 - 6 + 96 - 35 = k \Rightarrow 0 = k\). So \(k=0\). That means the point lies on the asymptotes? Check: For (1,2), first asymptote: 3-8+5=0, second: 3+8-7=4? Not zero. Wait, product is 0*4=0, so yes it lies on first asymptote. Then hyperbola degenerates? Actually if k=0, the equation becomes the asymptotes themselves. So the point is on an asymptote, so no proper hyperbola passes through it with those asymptotes. Let's change point to (1, 3).
- Step 3 (corrected): Point (1,3). \(9 - 144 - 6 + 144 - 35 = k \Rightarrow -32 = k\).
- Step 4: Equation: \(9x^2 - 16y^2 - 6x + 48y - 35 = -32 \Rightarrow 9x^2 - 16y^2 - 6x + 48y - 3 = 0\).
- Step 5: Convert to standard form by completing squares: \(9(x^2 - \frac{2}{3}x) - 16(y^2 - 3y) = 3\). \(9[(x - \frac{1}{3})^2 - \frac{1}{9}] - 16[(y - \frac{3}{2})^2 - \frac{9}{4}] = 3\). \(9(x - \frac{1}{3})^2 - 1 - 16(y - \frac{3}{2})^2 + 36 = 3\). \(9(x - \frac{1}{3})^2 - 16(y - \frac{3}{2})^2 = -32\). Divide by -32: \(\frac{(y - 1.5)^2}{2} - \frac{(x - 1/3)^2}{32/9} = 1\). This is a vertical transverse axis hyperbola. Center (1/3, 3/2). \(a^2 = 2, b^2 = 32/9\). Eccentricity \(e = \sqrt{1 + \frac{b^2}{a^2}} = \sqrt{1 + \frac{16}{9}} = \frac{5}{3}\). Asymptotes slopes \(\pm \frac{a}{b} = \pm \frac{\sqrt{2}}{4\sqrt{2}/3} = \pm \frac{3}{4}\), matching the given lines' slopes.
REASONING: A hyperbola with given asymptotes \(L_1=0, L_2=0\) has equation \(L_1 L_2 = k\). The constant \(k\) shifts the hyperbola relative to its asymptotes. Completing squares reveals the center, transverse axis orientation, and \(a,b\) values. The asymptote slopes are invariant under translation.
ANSWER: Equation: \(9x^2 - 16y^2 - 6x + 48y - 3 = 0\) (with point (1,3)). Center: \((\frac{1}{3}, \frac{3}{2})\), vertical transverse axis, \(e = \frac{5}{3}\).

## COMPETENCY_QUESTION_1
QUESTION: A student is given the hyperbola equation \(4x^2 - 9y^2 - 16x - 18y - 29 = 0\). They claim the eccentricity is \(e = \frac{\sqrt{13}}{2}\) and asymptotes are \(y + 1 = \pm \frac{2}{3}(x - 2)\). Verify if the student is correct. If not, find the correct eccentricity and asymptotes, and explain the student's likely error.
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Complete the square to convert to standard form.
- Step 2: Identify center, \(a^2\), \(b^2\), and transverse axis orientation.
- Step 3: Compute correct eccentricity and asymptotes.
- Step 4: Compare with student's answer and identify the mistake.
ANSWER: Completing squares: \(4(x^2 - 4x) - 9(y^2 + 2y) = 29\). \(4[(x-2)^2 - 4] - 9[(y+1)^2 - 1] = 29\). \(4(x-2)^2 - 16 - 9(y+1)^2 + 9 = 29\). \(4(x-2)^2 - 9(y+1)^2 = 36\). Standard form: \(\frac{(x-2)^2}{9} - \frac{(y+1)^2}{4} = 1\). Center (2, -1), horizontal transverse axis, \(a^2=9, b^2=4\). Eccentricity \(e = \sqrt{1 + \frac{4}{9}} = \frac{\sqrt{13}}{3}\) (student had \(\frac{\sqrt{13}}{2}\)). Asymptotes: \(y+1 = \pm \frac{b}{a}(x-2) = \pm \frac{2}{3}(x-2)\). Student's asymptotes are correct. Error: Student used \(e = \sqrt{1 + \frac{a^2}{b^2}} = \sqrt{1 + \frac{9}{4}} = \frac{\sqrt{13}}{2}\), swapping \(a\) and \(b\) in the eccentricity formula. This is a common confusion between ellipse and hyperbola formulas, or misremembering which denominator goes where.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A hyperbolic navigation system (like LORAN) uses two stations A and B as foci. A ship at point P receives signals such that the time difference corresponds to a constant distance difference of 200 km. The stations are 500 km apart. (a) Find the equation of the hyperbola on which the ship lies, assuming stations on x-axis centered at origin. (b) Find the eccentricity. (c) What do the asymptotes represent physically in this navigation context? (d) If the ship is on the branch closer to A, and its x-coordinate is 300 km, find its y-coordinate.
COMPETENCY: Translating real-world situations to mathematical expressions and interpreting mathematical results in context
STEPS:
- Step 1: Identify parameters: distance between foci = 2c = 500 => c = 250. Constant difference = 2a = 200 => a = 100.
- Step 2: Find \(b^2 = c^2 - a^2 = 62500 - 10000 = 52500\). Equation: \(\frac{x^2}{10000} - \frac{y^2}{52500} = 1\).
- Step 3: Eccentricity \(e = c/a = 250/100 = 2.5\). Or \(e = \sqrt{1 + b^2/a^2} = \sqrt{1 + 5.25} = \sqrt{6.25} = 2.5\).
- Step 4: Asymptotes: \(y = \pm \frac{b}{a}x = \pm \frac{\sqrt{52500}}{100}x = \pm \frac{\sqrt{525}}{10}x \approx \pm 2.291x\). Physically, they represent the directions where the time difference approaches the maximum possible (as ship goes to infinity, the path difference approaches the distance between stations? Actually asymptotes are lines where the hyperbola approaches; for large distances, the ship's position lines become straight rays from the center. The asymptotes represent the bearing lines where the ship would be if the distance difference equaled the station separation? No, the asymptotes are the limiting directions of the hyperbolic position lines. As the ship moves far away, the hyperbolas approach straight lines radiating from the midpoint. These lines correspond to constant angle bearings from the baseline.
- Step 5: For x = 300 (on right branch, closer to B? Wait: foci at \((\pm 250, 0)\). Right branch is closer to B(250,0). The problem says "closer to A". A is at (-250,0). So left branch, x = -300. But it says x-coordinate is 300 km. That would be right branch, closer to B. Let's assume x=300. Then \(\frac{90000}{10000} - \frac{y^2}{52500} = 1 \Rightarrow 9 - 1 = \frac{y^2}{52500} \Rightarrow y^2 = 8 \times 52500 = 420000 \Rightarrow y = \pm \sqrt{420000} = \pm 200\sqrt{10.5} \approx \pm 648\) km.
REASONING: This problem connects the geometric definition (difference of distances) to the algebraic equation. The eccentricity \(e = c/a\) is a direct measure of how "stretched" the hyperbola is. In navigation, high eccentricity means the hyperbolic lines are more open. The asymptotes represent the limiting bearings as range goes to infinity.
ANSWER: (a) \(\frac{x^2}{10000} - \frac{y^2}{52500} = 1\). (b) \(e = 2.5\). (c) Asymptotes represent the asymptotic bearing lines from the baseline midpoint; as the ship moves far away, its hyperbolic position line approaches a straight line through the center with slope \(\pm b/a\). (d) For x=300, \(y = \pm 200\sqrt{10.5}\) km (approx \(\pm 648\) km). Note: If ship is on branch closer to A (left focus), x should be negative.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a cooling tower for a power plant in Gujarat – its cross-section is a ______.

## DIAGNOSTIC_ANSWER_7
hyperbola

**A wrong answer ("parabola" or "ellipse") reveals the student has swapped the walkthrough's noun - the cooling tower's cross-section is a hyperbola.** Hyperbola is the walkthrough's own noun, and the noun is what the blank grades. Recall the guiding asymptote lines before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
They can also solve problems where eccentricity and asymptote slopes are given to find the hyperbola equation.

**A wrong answer (only quoting e = sqrt(1 + b^2/a^2)) reveals the student has under-answered the mastery criterion.** Full mastery adds: determine asymptote equations for any standard hyperbola including shifted centres, and recover the equation when eccentricity and asymptote slopes are given.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are ______ a cooling tower for a power plant in Gujarat – its cross-section is a hyperbola.

## DIAGNOSTIC_ANSWER_9
designing

**A wrong answer ("building" or "studying") reveals the student has paraphrased the walkthrough's participle - you are designing a cooling tower for a power plant in Gujarat.** Designing is the walkthrough's own participle, and the participle is what the blank grades. Recall the cross-section's shape before filling, and fill the word exactly as written.
