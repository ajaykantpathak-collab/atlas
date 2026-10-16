## ELI5
Thunder in a field: you and a friend stand 200 metres apart, and the clap reaches your friend 0.5 seconds later - at 340 m/s that is a 170-metre difference in distances to the strike. Every point whose distance-difference from you two stays 170 traces a hyperbola branch. Algebraically: the absolute difference |PF1 - PF2| = 2a distills to x^2/a^2 - y^2/b^2 = 1 with c^2 = a^2 + b^2 - the minus sign between the squares is the hyperbola's signature, and e = c/a runs past 1.

## DEFINITION
A hyperbola is the set of all points in a plane such that the absolute difference of the distances from two fixed points (called foci) is a constant. The standard equation of a hyperbola centred at the origin with transverse axis along the x-axis is \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\), where \(a > 0\), \(b > 0\), and the foci are at \((\pm c, 0)\) with \(c^2 = a^2 + b^2\). The vertices are at \((\pm a, 0)\) and the eccentricity is \(e = \frac{c}{a} > 1\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the standard equation of a hyperbola from its geometric definition, identify the centre, vertices, foci, transverse and conjugate axes from the equation, and write the equation given the foci and the constant difference of distances (or given \(a\) and \(b\) or \(a\) and \(e\)).

## SCOPE_BOUNDARY
This node covers the geometric definition of a hyperbola, derivation of its standard equation \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) (transverse axis along x-axis) and \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\) (transverse axis along y-axis), identification of parameters \(a\), \(b\), \(c\), \(e\), and the relationship \(c^2 = a^2 + b^2\). It does NOT cover asymptotes, latus rectum, parametric equations, or shifted hyperbolas (centre not at origin), which are treated in subsequent nodes.

## WALKTHROUGH
Imagine you are standing at a point in a large field and you hear a thunderclap. Your friend, standing 200 metres away from you, hears the same thunderclap 0.5 seconds later. Since sound travels at about 340 m/s, the difference in your distances from the lightning strike is 170 metres. The set of all possible locations of the lightning strike forms one branch of a hyperbola with you and your friend as the foci. To begin solving such problems, we first place the foci symmetrically on the x-axis at \((-c,0)\) and \((c,0)\). Let the constant difference of distances be \(2a\). For any point \(P(x,y)\) on the hyperbola, \(|PF_1 - PF_2| = 2a\). Writing the distance formula and simplifying step by step (isolating radicals, squaring twice) yields the standard equation \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) where \(b^2 = c^2 - a^2\). The key insight is that the minus sign between the squared terms distinguishes the hyperbola from the ellipse, and the constant difference \(2a\) determines the vertices.

Takeaway: mastery means deriving the standard equation from the constant-difference definition, placing foci at (plus or minus c, 0), and building the equation from foci plus the difference. Exam moves: write-the-equation questions and identify-the-curve items. Check yourself: the ellipse adds under the root, the hyperbola adds across the terms - c^2 = a^2 + b^2 versus b^2 = a^2 - c^2. Students miss it because they recycle ellipse formulas, when the definition's absolute difference changes everything: the foci escape beyond the vertices, the eccentricity crosses 1, and the minus sign between the squared terms records it all.

## DIAGNOSTIC_QUESTION_1
State the geometric definition of a hyperbola and write the standard equation of a hyperbola with centre at the origin, transverse axis along the x-axis, and given \(a = 3\), \(c = 5\).

## DIAGNOSTIC_ANSWER_1
A hyperbola is the set of all points in a plane such that the absolute difference of distances from two fixed points (foci) is constant. For \(a=3, c=5\), we have \(b^2 = c^2 - a^2 = 25 - 9 = 16\). The standard equation is \(\frac{x^2}{9} - \frac{y^2}{16} = 1\). A wrong answer (e.g., using \(b^2 = a^2 - c^2\) or writing a plus sign between the terms) reveals confusion between the ellipse and hyperbola relationships or misremembering the definition (sum vs difference of distances).

## DIAGNOSTIC_QUESTION_2
Explain why the equation \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) represents a hyperbola with transverse axis along the x-axis, and why the vertices are at \((\pm a, 0)\) but the foci are at \((\pm c, 0)\) with \(c > a\).

## DIAGNOSTIC_ANSWER_2
Setting \(y=0\) gives \(x = \pm a\), so the curve intersects the x-axis at \((\pm a, 0)\); these are the vertices. The foci lie on the same axis (x-axis) because the definition requires the constant difference of distances to the foci, and the centre is the midpoint of the foci. Since \(c^2 = a^2 + b^2\), \(c > a\), so the foci are farther from the centre than the vertices. A wrong answer (e.g., saying vertices are at \((\pm c, 0)\) or that the transverse axis is along the y-axis) shows misunderstanding of the roles of \(a\) and \(c\) and the orientation determined by the positive term.

## DIAGNOSTIC_QUESTION_3
Find the standard equation of the hyperbola with foci at \((\pm 10, 0)\) and constant difference of distances equal to 12.

## DIAGNOSTIC_ANSWER_3
Given foci \((\pm 10, 0)\), so \(c = 10\). Constant difference \(2a = 12 \Rightarrow a = 6\). Then \(b^2 = c^2 - a^2 = 100 - 36 = 64\). The standard equation is \(\frac{x^2}{36} - \frac{y^2}{64} = 1\). A wrong answer (e.g., \(a=12\) or \(b^2 = a^2 - c^2\)) reveals errors in interpreting the constant difference as \(a\) instead of \(2a\), or mixing up the ellipse/hyperbola relationship.

## DIAGNOSTIC_QUESTION_4
Compare the standard equations of an ellipse \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) and a hyperbola \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) (both with transverse/major axis along x-axis). Identify which parameter (\(a\) or \(b\)) corresponds to the semi-major/transverse axis in each case, and explain how the relationship between \(a\), \(b\), and \(c\) differs.

## DIAGNOSTIC_ANSWER_4
In both equations, \(a\) is the distance from centre to vertex along the x-axis (semi-major axis for ellipse, semi-transverse axis for hyperbola). For ellipse, \(c^2 = a^2 - b^2\) (so \(a > c\)), and for hyperbola, \(c^2 = a^2 + b^2\) (so \(c > a\)). The plus sign in the ellipse means both variables are bounded; the minus sign in the hyperbola means \(x\) can grow arbitrarily large while \(y\) adjusts. A wrong answer (e.g., swapping \(a\) and \(b\) roles or stating the same \(c\) relationship) indicates failure to distinguish the geometric meanings of the parameters.

## DIAGNOSTIC_QUESTION_5
A student writes the equation of a hyperbola with foci at \((0, \pm 5)\) and vertices at \((0, \pm 3)\) as \(\frac{x^2}{9} - \frac{y^2}{16} = 1\). Identify the errors and write the correct equation.

## DIAGNOSTIC_ANSWER_5
The foci and vertices are on the y-axis, so the transverse axis is vertical. The standard form must be \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\). Here \(a = 3\), \(c = 5\), so \(b^2 = c^2 - a^2 = 25 - 9 = 16\). The correct equation is \(\frac{y^2}{9} - \frac{x^2}{16} = 1\). The student's errors: (1) used the horizontal transverse axis form, (2) placed the positive term with \(x^2\). This reveals confusion about how the orientation of the axes determines which variable has the positive term.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) that can be modeled by a hyperbola. Define the foci, the constant difference, and write the resulting standard equation. Explain why the situation leads to a hyperbola and not an ellipse.

## DIAGNOSTIC_ANSWER_6
Example: Two radio towers in Delhi and Gurugram are 40 km apart. A ship at sea receives signals from both towers; the time difference of arrival is 0.0001 seconds. Radio waves travel at \(3 \times 10^5\) km/s, so the difference in distances is 30 km. The ship's location lies on a hyperbola with foci at the towers, \(c = 20\) km, \(2a = 30\) km \(\Rightarrow a = 15\) km, \(b^2 = 400 - 225 = 175\). Equation: \(\frac{x^2}{225} - \frac{y^2}{175} = 1\) (towers on x-axis). It is a hyperbola because the difference of distances is constant, not the sum. A poor answer would use sum of distances or misplace the foci, showing lack of understanding of the defining property.

## COMMON_MISCONCEPTION
Students often confuse the relationship \(c^2 = a^2 + b^2\) for hyperbolas with \(c^2 = a^2 - b^2\) for ellipses. They also mistakenly believe the transverse axis is always along the x-axis, writing \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) even when foci are on the y-axis. A concrete error: given foci \((0, \pm 13)\) and vertices \((0, \pm 5)\), a student writes \(\frac{x^2}{25} - \frac{y^2}{144} = 1\) instead of \(\frac{y^2}{25} - \frac{x^2}{144} = 1\), because they automatically put the positive term with \(x^2\) and use \(b^2 = c^2 - a^2\) correctly but ignore the axis orientation.

## ON_FAILURE
1. Ask the student to plot the given foci and vertices on graph paper. 2. Have them identify which axis contains the vertices – that is the transverse axis. 3. Remind them: "The positive term in the standard equation corresponds to the variable of the transverse axis." 4. Practice with three examples: (a) foci \((\pm c, 0)\) → \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\); (b) foci \((0, \pm c)\) → \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\); (c) given \(a, c\) compute \(b^2 = c^2 - a^2\) (emphasize plus sign because \(c > a\)). 5. Use a mnemonic: "Hyperbola has a plus in the \(c^2\) relation (c is larger), ellipse has a minus (c is smaller)."

## PREREQUISITE_NODE_IDS
c11_math_cbse_11_001, c11_math_cbse_11_004, c11_math_cbse_11_006, c9_math_ch1_4, c10_math_cbse_07_001, c11_math_cbse_11_007, c8_math_ch6_7, c8_math_ch6_8

## PREREQUISITE_REASONS
c11_math_cbse_11_001: Introduces conic sections as sections of a double cone, providing the geometric origin of hyperbola.
c11_math_cbse_11_004: Covers parabola definition and standard equation; students learn the focus-directrix property and derivation method which is analogous for hyperbola.
c11_math_cbse_11_006: Covers ellipse definition and standard equation; the derivation technique (distance formula, squaring) is similar, and comparing ellipse vs hyperbola relationships (\(c^2 = a^2 \pm b^2\)) is crucial.
c9_math_ch1_4: Distance formula derivation using Pythagoras theorem; essential for writing \(PF_1\) and \(PF_2\) in the derivation.
c10_math_cbse_07_001: Distance formula applications in coordinate geometry; reinforces algebraic manipulation of square roots.
c11_math_cbse_11_007: Hyperbola uses analogous concepts (eccentricity, foci, directrices) but with \(c^2 = a^2 + b^2\); understanding ellipse first builds contrast.  
c8_math_ch6_7: If stuck, revisit the distance formula (c9_math_ch1_4) and practice isolating a square root and squaring both sides (c8_math_ch6_7, c8_math_ch6_8 identities help with expansion).  
c8_math_ch6_8: If stuck, revisit the distance formula (c9_math_ch1_4) and practice isolating a square root and squaring both sides (c8_math_ch6_7, c8_math_ch6_8 identities help with expansion).  

## FORWARD_NODE_IDS
c11_math_cbse_11_009, c11_math_cbse_11_010
## FORWARD_REASONS
c11_math_cbse_11_009: This node establishes the standard equation and parameters \(a, b, c, e\); the next node uses these to define eccentricity and derive asymptotes equations \(y = \pm \frac{b}{a}x\).
c11_math_cbse_11_010: Applications of conic sections (e.g., cooling towers, navigation) require the standard equation and geometric properties learned here.

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_04_003, c11_phy_cbse_08_005
## CROSS_SUBJECT_REASONS
c11_physics_ch4_3: Projectile motion under gravity follows a parabolic path, but hyperbolic trajectories appear in gravitational scattering (e.g., alpha particle scattering, comet orbits) – the hyperbola equation models unbound orbits.
c11_physics_ch8_5: In gravitation, the path of a body with positive total energy (unbound) is a hyperbola; the standard equation and eccentricity \(e > 1\) directly describe such orbits.
c11_phy_cbse_04_003: Cross-subject support: Newton's Second Law states that the rate of change of linear momentum of a body is directl... supplies tools/facts used directly in this node.  
c11_phy_cbse_08_005: Cross-subject support: Young's modulus (Y) is the ratio of longitudinal stress (tensile or compressive) to the co... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_11_006 -> c11_math_cbse_11_008 -> c11_math_cbse_11_009

## THIS_FORMULA
\(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) (transverse axis along x-axis) or \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\) (transverse axis along y-axis), with \(c^2 = a^2 + b^2\), \(e = \frac{c}{a} > 1\).

## FORMULA_VARIABLES
\(a\) = semi-transverse axis (distance from centre to vertex), \(b\) = semi-conjugate axis (related to conjugate axis length \(2b\)), \(c\) = distance from centre to focus, \(e\) = eccentricity, \(x, y\) = coordinates of any point on the hyperbola.

## FORMULA_UNITS
All lengths (\(a, b, c, x, y\)) are in the same linear units (metres, cm, km, etc.). Eccentricity \(e\) is dimensionless.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch4_3 | Hyperbolic trajectories in Rutherford scattering and unbound orbits use the same geometric definition (difference of distances to foci constant) and standard equation.
c11_physics_ch8_5 | In gravitation, hyperbolic orbits have eccentricity \(e > 1\); the equation \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\) with \(c^2 = a^2 + b^2\) describes the path of a comet or spacecraft with excess energy.

## PREREQ_CONCEPT
Distance formula and algebraic manipulation of radical equations (isolating and squaring).

## PREREQ_BEFORE
The student must be able to write the distance between two points \((x_1, y_1)\) and \((x_2, y_2)\) and simplify expressions like \(\sqrt{(x+c)^2 + y^2} - \sqrt{(x-c)^2 + y^2} = 2a\) by squaring twice.

## PREREQ_STUCK
If stuck, revisit the distance formula (c9_math_ch1_4) and practice isolating a square root and squaring both sides (c8_math_ch6_7, c8_math_ch6_8 identities help with expansion).

## WORKED_EXAMPLE_1
PROBLEM: A hyperbola has its centre at the origin and foci at \((\pm 5, 0)\). The difference of distances from any point on the hyperbola to the foci is 6. Find its standard equation, the coordinates of its vertices, and the length of its conjugate axis.
STEPS:
- Step 1: Identify given data. Foci at \((\pm 5, 0)\) means \(c = 5\). The constant difference is \(2a = 6\), so \(a = 3\).
- Step 2: Determine orientation. Since foci are on the x-axis, the transverse axis is along the x-axis. The standard form is \(\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1\).
- Step 3: Compute \(b^2\) using the hyperbola relationship \(c^2 = a^2 + b^2\). \(b^2 = c^2 - a^2 = 25 - 9 = 16\).
- Step 4: Write the standard equation: \(\frac{x^2}{9} - \frac{y^2}{16} = 1\).
- Step 5: State vertices: \((\pm a, 0) = (\pm 3, 0)\). Length of conjugate axis = \(2b = 2 \times 4 = 8\).
REASONING: The definition directly gives \(c\) and \(2a\). The relationship \(c^2 = a^2 + b^2\) (not \(a^2 - b^2\)) is used because for hyperbolas the foci are farther from the centre than the vertices. The positive term is with \(x^2\) because the transverse axis is horizontal.
ANSWER: Equation: \(\frac{x^2}{9} - \frac{y^2}{16} = 1\); Vertices: \((3, 0)\) and \((-3, 0)\); Conjugate axis length: 8 units.

## WORKED_EXAMPLE_2
PROBLEM: Find the standard equation of the hyperbola with vertices at \((0, \pm 4)\) and foci at \((0, \pm 6)\).
STEPS:
- Step 1: Identify given data. Vertices at \((0, \pm 4)\) means the transverse axis is along the y-axis, and \(a = 4\). Foci at \((0, \pm 6)\) means \(c = 6\).
- Step 2: Choose the correct standard form. For transverse axis along y-axis, the equation is \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\).
- Step 3: Compute \(b^2 = c^2 - a^2 = 36 - 16 = 20\).
- Step 4: Substitute \(a^2 = 16\) and \(b^2 = 20\) into the standard form: \(\frac{y^2}{16} - \frac{x^2}{20} = 1\).
- Step 5: Verify: The centre is \((0,0)\), vertices \((0, \pm 4)\) match, foci \((0, \pm \sqrt{16+20}) = (0, \pm 6)\) match.
REASONING: The location of vertices and foci on the y-axis dictates that the positive term must be with \(y^2\). The same relationship \(c^2 = a^2 + b^2\) holds because \(c > a\) for hyperbolas. A common mistake is to write the x-term positive; checking the vertices' coordinates prevents this.
ANSWER: \(\frac{y^2}{16} - \frac{x^2}{20} = 1\)

## WORKED_EXAMPLE_3
PROBLEM: A cooling tower of a power plant in Maharashtra is shaped like a hyperboloid. Its cross-section through the axis is a hyperbola. The tower is 150 m tall, the narrowest diameter is 60 m (at a height of 75 m from the base), and the base diameter is 120 m. Taking the narrowest cross-section as the centre of the hyperbola (origin), find the equation of the generating hyperbola (transverse axis vertical).
STEPS:
- Step 1: Set up coordinates. Let the narrowest cross-section (waist) be at the origin \((0,0)\) with the vertical axis as the y-axis (transverse axis). The hyperbola equation is \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\).
- Step 2: The narrowest diameter is 60 m, so at \(y = 0\), the half-width is 30 m. But wait: for a hyperbola \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\), at \(y=0\) we get \(-\frac{x^2}{b^2}=1\) which has no real solution. This means the hyperbola does not intersect the x-axis; the "waist" is actually the vertices! So the vertices are at \((0, \pm a)\) and the distance between vertices is the narrowest diameter? No, the narrowest diameter is the distance between the two branches at the waist. For a hyperbola with vertical transverse axis, the vertices are the closest points on the two branches. So the distance between vertices is \(2a = 60\) m → \(a = 30\) m.
- Step 3: The base is 150 m tall from the waist? The problem says tower is 150 m tall, waist at 75 m from base. So base is 75 m below waist (y = -75). At base, diameter = 120 m → half-width = 60 m. So the point \((60, -75)\) lies on the hyperbola.
- Step 4: Substitute \((60, -75)\) into \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\) with \(a=30\): \(\frac{5625}{900} - \frac{3600}{b^2} = 1\) → \(6.25 - \frac{3600}{b^2} = 1\) → \(\frac{3600}{b^2} = 5.25\) → \(b^2 = \frac{3600}{5.25} = \frac{360000}{525} = \frac{14400}{21} = \frac{4800}{7} \approx 685.71\).
- Step 5: Equation: \(\frac{y^2}{900} - \frac{x^2}{4800/7} = 1\) or \(\frac{y^2}{900} - \frac{7x^2}{4800} = 1\).
REASONING: The physical description matches a hyperbola with vertical transverse axis where the vertices represent the narrowest part. The coordinate system must be placed with origin at the centre (waist). The given diameters give the x-coordinate at a specific y-level.
ANSWER: \(\frac{y^2}{900} - \frac{7x^2}{4800} = 1\) (or \(\frac{y^2}{30^2} - \frac{x^2}{(4800/7)} = 1\))

## COMPETENCY_QUESTION_1
QUESTION: A hyperbola has the equation \(9x^2 - 16y^2 = 144\). (a) Rewrite it in standard form and identify the transverse axis. (b) Find the coordinates of the vertices and foci. (c) Find the eccentricity. (d) A student claims that the conjugate axis length is 6. Is the student correct? Justify your answer.
COMPETENCY: Interpreting and transforming equations to standard form; extracting geometric parameters; verifying statements.
STEPS:
- Step 1: Divide the equation by 144 to get standard form: \(\frac{x^2}{16} - \frac{y^2}{9} = 1\).
- Step 2: Identify \(a^2 = 16 \Rightarrow a = 4\), \(b^2 = 9 \Rightarrow b = 3\). Positive term is \(x^2\), so transverse axis is horizontal (x-axis).
- Step 3: Vertices: \((\pm a, 0) = (\pm 4, 0)\). Compute \(c^2 = a^2 + b^2 = 16 + 9 = 25 \Rightarrow c = 5\). Foci: \((\pm 5, 0)\).
- Step 4: Eccentricity \(e = c/a = 5/4 = 1.25\).
- Step 5: Conjugate axis length = \(2b = 6\). The student is correct.
ANSWER: (a) \(\frac{x^2}{16} - \frac{y^2}{9} = 1\), transverse axis along x-axis. (b) Vertices: \((4,0), (-4,0)\); Foci: \((5,0), (-5,0)\). (c) \(e = 1.25\). (d) Yes, conjugate axis length = \(2b = 2 \times 3 = 6\).
DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: Two sound detectors are placed at points \(F_1(-500, 0)\) and \(F_2(500, 0)\) (coordinates in metres). A gunshot is heard at \(F_1\) exactly 0.5 seconds before it is heard at \(F_2\). Assuming sound travels at 340 m/s, find the equation of the hyperbola on which the gunshot must lie. If the gunshot is known to have occurred in the first quadrant and its x-coordinate is 400 m, find its y-coordinate.
COMPETENCY: Translating a real-world scenario into a mathematical model (hyperbola definition); solving for specific coordinates; multi-step reasoning.
STEPS:
- Step 1: The time difference 0.5 s corresponds to a distance difference of \(340 \times 0.5 = 170\) m. This is the constant difference \(2a = 170\) → \(a = 85\).
- Step 2: The detectors are the foci: \(F_1(-500,0), F_2(500,0)\) → \(c = 500\).
- Step 3: Compute \(b^2 = c^2 - a^2 = 250000 - 7225 = 242775\).
- Step 4: The hyperbola has transverse axis along x-axis (foci on x-axis). Equation: \(\frac{x^2}{85^2} - \frac{y^2}{242775} = 1\) or \(\frac{x^2}{7225} - \frac{y^2}{242775} = 1\).
- Step 5: Given x = 400 (first quadrant, so y > 0). Substitute: \(\frac{160000}{7225} - \frac{y^2}{242775} = 1\).
- Step 6: \(\frac{160000}{7225} \approx 22.145\). So \(22.145 - 1 = \frac{y^2}{242775}\) → \(y^2 = 21.145 \times 242775 \approx 5,133,000\) → \(y \approx 2265.6\) m.
REASONING: The problem uses the definition of hyperbola (difference of distances to foci is constant). The constant difference comes from the time delay and speed of sound. The equation is derived from \(a\) and \(c\). Substituting the given x yields the y-coordinate on the relevant branch.
ANSWER: Equation: \(\frac{x^2}{7225} - \frac{y^2}{242775} = 1\). For \(x = 400\), \(y \approx 2265.6\) m (first quadrant).
DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A hyperbola is the set of all points in a plane such that the absolute ______ of the distances from two fixed points (called foci) is a constant.

## DIAGNOSTIC_ANSWER_7
difference

**A wrong answer ("sum" or "product") reveals the student has swapped the definition's noun - a hyperbola keeps the absolute difference of distances from two foci constant.** Difference is the definition's own noun, and the noun is what the blank grades. Recall the thunderclap timing before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are standing at a point in a large field and you hear a ______.

## DIAGNOSTIC_ANSWER_8
thunderclap

**A wrong answer ("explosion" or "siren") reveals the student has swapped the walkthrough's noun - you hear a thunderclap in the large field.** Thunderclap is the walkthrough's own noun, and the noun is what the blank grades. Recall the 0.5 second delay before filling, and give the noun exactly.
