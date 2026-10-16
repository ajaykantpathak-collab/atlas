## ELI5
A delivery drone leaves the warehouse at (2, 3). What you know decides the form: know the direction only - point-slope y - y1 = m(x - x1). Know it crosses the highway at 5 and the railway line at 4 - intercept form x/5 + y/4 = 1. Radar tracks it by perpendicular distance and angle from the origin - normal form x cos a + y sin a = p. All forms are algebraically the same line; list the geometric data first, then pick the form that asks for the least algebra.

## DEFINITION
The equation of a straight line is a first-degree algebraic relation in variables $x$ and $y$ satisfied by the coordinates of every point on the line and only those points. It can be expressed in various standard forms—Horizontal/Vertical, Point-Slope, Two-Point, Slope-Intercept, Intercept, and Normal form—each derived from specific geometric conditions (given point, slope, intercepts, or perpendicular distance from origin).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) Identify the correct form of the equation to use based on given geometric data (point, slope, intercepts, perpendicular distance/angle) and derive the equation in 3-4 algebraic steps. (2) Convert any given linear equation $Ax+By+C=0$ into Slope-Intercept, Intercept, and Normal forms, correctly determining the sign of the normal form constant $p$ using the rule $\text{sign}(p) = -\text{sign}(C)$ when $C \neq 0$.

## SCOPE_BOUNDARY
This node covers the derivation, application, and interconversion of the six standard forms of a straight line (Horizontal/Vertical, Point-Slope, Two-Point, Slope-Intercept, Intercept, Normal) and the General Form $Ax+By+C=0$. It includes finding equations from geometric conditions and reducing general equations to standard forms. It does **NOT** cover distance of a point from a line, distance between parallel lines, or family of lines, which are separate applications.

## WALKTHROUGH
Imagine a delivery drone flying from a warehouse at $(2, 3)$ towards a customer location. If you only know the drone's direction (slope $m$), you use **Point-Slope form** $y - y_1 = m(x - x_1)$. If you know it crosses the main highway (x-axis) at km 5 and the railway line (y-axis) at km 4, you use **Intercept form** $\frac{x}{5} + \frac{y}{4} = 1$. If air traffic control tracks it by its perpendicular distance from the radar (origin) and the angle of that perpendicular, you use **Normal form** $x \cos \alpha + y \sin \alpha = p$. To begin any problem, **first list what geometric data is given** (point? slope? intercepts? perpendicular distance/angle?), **then match it to the correct standard form**. The key insight is that all forms are algebraically equivalent; choosing the right one simply minimizes algebraic manipulation.

Takeaway: mastery means inventorying the given data - point, slope, intercepts, distance-plus-angle - and matching it to the standard form that fits. Exam moves: write-the-equation questions and convert-the-form items on the drone scene. Check yourself: conversions never change the line, only its costume - any form can be dressed into any other with algebra. Students miss it because six forms look like six topics, when the drone's three intel types show the design: each standard form is a different filing system for the same straight line, and the professional move is reading the givens before touching a pen - the normal form even demands its positive p by sign convention.

## DIAGNOSTIC_QUESTION_1
Write the equation of the line parallel to the y-axis and passing through the point $(-4, 5)$.

## DIAGNOSTIC_ANSWER_1
The equation is $x = -4$. A line parallel to the y-axis has an undefined slope and constant x-coordinate for all points. Since it passes through $(-4, 5)$, the x-coordinate is always $-4$. A wrong answer like $y = 5$ or $x = 4$ reveals the student confuses "parallel to y-axis" (vertical line, equation $x = \text{constant}$) with "parallel to x-axis" (horizontal line, equation $y = \text{constant}$) or ignores the sign of the coordinate.

## DIAGNOSTIC_QUESTION_2
A student writes the equation of a line with x-intercept $-3$ and y-intercept $4$ as $\frac{x}{3} + \frac{y}{4} = 1$. Explain why this is incorrect and write the correct equation.

## DIAGNOSTIC_ANSWER_2
The correct equation is $\frac{x}{-3} + \frac{y}{4} = 1$ or $4x - 3y = -12$. The intercept form is $\frac{x}{a} + \frac{y}{b} = 1$ where $a$ and $b$ are the **signed** intercepts (coordinates of cutting points $(a,0)$ and $(0,b)$). The student used $a=3$ instead of $a=-3$, confusing the *length* of the intercept (always positive) with the *coordinate* of the intercept (can be negative). This reveals a misunderstanding that intercepts in the formula are directed distances from the origin, not just lengths.

## DIAGNOSTIC_QUESTION_3
Find the equation of the line passing through the intersection of the lines $2x + y = 5$ and $x - 3y = 4$ and having a slope of $2$.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Find intersection point by solving the system. From $2x+y=5 \Rightarrow y=5-2x$. Substitute in $x-3(5-2x)=4 \Rightarrow x-15+6x=4 \Rightarrow 7x=19 \Rightarrow x=19/7$. Then $y=5-38/7 = -3/7$. Point is $(19/7, -3/7)$. **Step 2:** Use Point-Slope form with $m=2$: $y - (-3/7) = 2(x - 19/7)$. **Step 3:** Simplify: $y + 3/7 = 2x - 38/7 \Rightarrow 7y + 3 = 14x - 38 \Rightarrow 14x - 7y - 41 = 0$. A wrong answer often stems from arithmetic errors in solving the system or forgetting to use the *intersection point* as $(x_1, y_1)$ in the point-slope formula, instead using a random point from one line.

## DIAGNOSTIC_QUESTION_4
The line $3x - 4y + 12 = 0$ is converted to normal form $x \cos \alpha + y \sin \alpha = p$. A student gets $\cos \alpha = 3/5, \sin \alpha = -4/5, p = 12/5$. Is this correct? Justify your answer by analyzing the signs.

## DIAGNOSTIC_ANSWER_4
The student's answer is **incorrect**. **Step 1:** Rewrite equation with constant positive: $3x - 4y + 12 = 0 \Rightarrow -3x + 4y = 12$. **Step 2:** Divide by $\sqrt{(-3)^2 + 4^2} = 5$: $\frac{-3}{5}x + \frac{4}{5}y = \frac{12}{5}$. **Step 3:** Identify $\cos \alpha = -3/5, \sin \alpha = 4/5, p = 12/5$. The student forgot the rule: the constant term on RHS ($p$) must be **positive** (perpendicular distance). To achieve this, if $C > 0$ in $Ax+By+C=0$, we must multiply by $-1$ before normalizing. The student normalized $3x-4y=-12$ directly, yielding $p=-12/5$ (negative), then likely dropped the negative sign on $p$ but kept the signs of $\cos \alpha, \sin \alpha$ from the original coefficients, breaking the identity $\cos^2\alpha + \sin^2\alpha = 1$ with the correct quadrant signs.

## DIAGNOSTIC_QUESTION_5
Evaluate the statement: "The equation $\frac{x}{a} + \frac{y}{b} = 1$ represents a line for all non-zero real values of $a$ and $b$." Is this always true? Provide a counterexample if false, or a proof if true.

## DIAGNOSTIC_ANSWER_5
The statement is **TRUE** for all non-zero real $a, b$. **Justification:** The equation $\frac{x}{a} + \frac{y}{b} = 1 \implies bx + ay = ab \implies bx + ay - ab = 0$. This is of the form $Ax+By+C=0$ with $A=b, B=a, C=-ab$. Since $a \neq 0$ and $b \neq 0$, $A$ and $B$ are not simultaneously zero ($A^2+B^2 = a^2+b^2 > 0$). By the theorem in NCERT (Section 12.4), $Ax+By+C=0$ always represents a line if $A^2+B^2 \neq 0$. A student answering "False" might incorrectly think $a,b$ must be positive (confusing intercepts with lengths) or that the line cannot pass through the origin (it doesn't, since $ab \neq 0$, but that doesn't stop it from being a line).

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) where you would *need* to use the **Normal Form** $x \cos \alpha + y \sin \alpha = p$ to model a situation, rather than Slope-Intercept or Intercept form. Define the variables $p$ and $\alpha$ in your scenario.

## DIAGNOSTIC_ANSWER_6
**Scenario:** A Coast Guard radar station at the origin $(0,0)$ detects a ship. The radar shows the ship is on a straight course such that the **shortest distance** from the radar to the ship's path is $10$ km, and the **direction of this shortest perpendicular line** makes an angle of $30^\circ$ with the positive x-axis (East). **Model:** The ship's path is the line. $p = 10$ km (perpendicular distance from origin to line). $\alpha = 30^\circ$ (angle of perpendicular from positive x-axis). Equation: $x \cos 30^\circ + y \sin 30^\circ = 10 \implies \frac{\sqrt{3}}{2}x + \frac{1}{2}y = 10 \implies \sqrt{3}x + y = 20$. **Why Normal Form?** Radar naturally measures range (distance $p$) and bearing (angle $\alpha$). Slope-intercept requires calculating slope ($-\cot \alpha$) and intercept ($p \csc \alpha$), adding unnecessary computation. A poor answer uses a scenario better suited for intercepts (e.g., "a wire tied between two poles") or fails to define $\alpha$ as the angle of the *perpendicular from origin*, not the line itself.

## COMMON_MISCONCEPTION
**Misconception:** "In the Normal Form $x \cos \alpha + y \sin \alpha = p$, the angle $\alpha$ is the inclination of the line (angle the line makes with the positive x-axis)."
**Why it happens:** Students confuse the geometric definition of Normal Form. In Slope-Intercept form $y = mx+c$, $m = \tan \theta$ where $\theta$ is the line's inclination. In Normal Form, the line is *perpendicular* to the ray from origin making angle $\alpha$. Therefore, the line's inclination $\theta = \alpha + 90^\circ$ (or $\alpha - 90^\circ$), so $m = \tan(\alpha \pm 90^\circ) = -\cot \alpha$. Students blindly equate $\alpha$ with $\theta$ because both are "angles associated with the line."
**Concrete Example:** For line $x + y = \sqrt{2}$, normal form is $x \cos 45^\circ + y \sin 45^\circ = 1$. Here $\alpha = 45^\circ$, $p=1$. The line's inclination is $135^\circ$ (slope $=-1$), NOT $45^\circ$. A student thinking $\alpha=45^\circ$ is the line's angle would calculate slope $=1$, writing $y=x+\sqrt{2}$, which is perpendicular to the actual line.

## ON_FAILURE
**Step 1: Visual Proof.** Draw coordinate axes. Plot a line $L$. Drop perpendicular $ON$ from origin to $L$ meeting at $N$. Mark angle $\alpha = \angle XON$. Mark line's inclination $\theta = \angle XOL$ (where $L$ is intersection of line with x-axis direction). Show clearly $\theta = \alpha + 90^\circ$ (if $\alpha$ acute). **Step 2: Slope Derivation.** Derive slope from Normal Form: $x \cos \alpha + y \sin \alpha = p \Rightarrow y \sin \alpha = -x \cos \alpha + p \Rightarrow y = (-\cot \alpha)x + p \csc \alpha$. Point out $m = -\cot \alpha = \tan(\alpha + 90^\circ)$. **Step 3: Drill.** Give 5 lines in Normal Form (e.g., $x \cos 60^\circ + y \sin 60^\circ = 2$, $x \cos 120^\circ + y \sin 120^\circ = 3$). Ask student to state $\alpha$, $p$, and the **line's actual slope/inclination $\theta$** for each. Force them to write $\theta = \alpha + 90^\circ$ explicitly every time until automatic.

## PREREQUISITE_NODE_IDS
c11_app_cbse_12_001, c11_app_cbse_12_002, c11_app_cbse_12_003

## PREREQUISITE_REASONS
c11_app_cbse_12_001: Defines the straight line, its general equation $Ax+By+C=0$, and the concept of slope as $\tan \theta$. This is the foundational object being expressed in various forms.
c11_app_cbse_12_002: Establishes the condition for perpendicular slopes ($m_1 m_2 = -1$). This is essential for deriving the Normal Form (where slope of line $= -\cot \alpha = -1/\tan \alpha$, perpendicular to radius vector with slope $\tan \alpha$) and for solving problems involving perpendicular bisectors or lines perpendicular to given lines.
c11_app_cbse_12_003: Provides the formula for angle between lines $\tan \theta = |\frac{m_1-m_2}{1+m_1m_2}|$. Used in problems asking for lines making a given angle with a given line (using Point-Slope form) and in verifying the angle $\alpha$ in Normal Form relates to line's inclination by $90^\circ$.

## FORWARD_NODE_IDS
c11_app_cbse_12_005, c11_app_cbse_12_006, c11_app_cbse_12_007, c11_app_cbse_12_008

## FORWARD_REASONS
c11_app_cbse_12_005: Circle equations (standard, central, general) are derived using distance formula, but tangents, normals, and chords of circles are straight lines requiring the various forms (especially Point-Slope and Normal form for tangent $x \cos \alpha + y \sin \alpha = r$).
c11_app_cbse_12_006: Properties of circles (tangents, chords, radical axis) are all straight line equations. Finding the equation of a tangent at a point on the circle uses Point-Slope form; the chord of contact uses $T=0$ (a linear form).
c11_app_cbse_12_007: Parabola tangents and normals are straight lines. The standard tangent $y = mx + a/m$ is Slope-Intercept form; the normal $y = mx - 2am - am^3$ uses Point-Slope form at the point of contact.
c11_app_cbse_12_008: Latus Rectum is a chord (line segment) perpendicular to the axis. Its equation ($x = a$ for $y^2=4ax$) is a vertical line form. Finding endpoints requires solving line-parabola intersection.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_12_001 -> c11_app_cbse_12_004 -> c11_app_cbse_12_005 (Straight Line basics -> Various Forms -> Circle Tangents/Normals)

## THIS_FORMULA
**Key Forms of a Straight Line:**
1. **Horizontal/Vertical:** $y = c$ (parallel to x-axis), $x = c$ (parallel to y-axis)
2. **Point-Slope:** $y - y_1 = m(x - x_1)$
3. **Two-Point:** $y - y_1 = \frac{y_2 - y_1}{x_2 - x_1}(x - x_1)$
4. **Slope-Intercept:** $y = mx + c$
5. **Intercept:** $\frac{x}{a} + \frac{y}{b} = 1$ ($a, b \neq 0$)
6. **Normal:** $x \cos \alpha + y \sin \alpha = p$ ($p \ge 0$)
7. **General:** $Ax + By + C = 0$ ($A^2 + B^2 \neq 0$)

## FORMULA_VARIABLES
- $m$: Slope of the line ($\tan \theta$, $\theta$ = inclination)
- $(x_1, y_1), (x_2, y_2)$: Coordinates of given points on the line
- $c$: y-intercept (ordinate of point where line crosses y-axis)
- $a$: x-intercept (abscissa of point where line crosses x-axis, signed)
- $b$: y-intercept (ordinate of point where line crosses y-axis, signed)
- $p$: Length of perpendicular from origin to line ($p \ge 0$)
- $\alpha$: Angle made by the perpendicular from origin to the line with the positive x-axis ($0 \le \alpha < 2\pi$)
- $A, B, C$: Real constants, $A$ and $B$ not both zero

## FORMULA_UNITS
- $x, y, x_1, y_1, x_2, y_2, a, b, c, p$: Length units (metres, cm, km, or dimensionless coordinate units)
- $m, \tan \theta, \cot \alpha$: Dimensionless (ratio)
- $\alpha, \theta$: Degrees ($^\circ$) or Radians
- $A, B, C$: Same units as $x, y$ (or dimensionless if coordinates are pure numbers)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_07_001 | In Economics (Demand/Supply curves), the Slope-Intercept form $q = mp + c$ models linear demand where $m$ is marginal rate of substitution (slope) and $c$ is autonomous demand (intercept). The equilibrium calculation in NCERT Example 1 & 2 (Chapter 12) is solving two linear equations (Intersection of lines).
c11_app_cbse_08_001 | In Physics (Motion in a Straight Line), the velocity-time graph for uniform acceleration is a straight line $v = u + at$. This is Slope-Intercept form with $m=a$ (acceleration), $c=u$ (initial velocity), $x=t$, $y=v$. The area under the line (distance) uses coordinate geometry.

## PREREQ_CONCEPT
The student must understand that the slope $m = \tan \theta$ completely determines the direction (inclination) of a non-vertical line, and that a unique line requires either a point and a direction (slope) or two points.

## PREREQ_BEFORE
The student must be able to calculate slope given two points ($m = \frac{y_2-y_1}{x_2-x_1}$), identify slope and intercepts from the general equation $Ax+By+C=0$ ($m = -A/B, c = -C/B$), and state the condition for perpendicular lines ($m_1 m_2 = -1$).

## PREREQ_STUCK
If stuck, review **c11_app_cbse_12_001** (Slope definition and calculation from two points) and **c11_app_cbse_12_002** (Perpendicular slope condition $m_1 m_2 = -1$), specifically practicing converting $Ax+By+C=0$ to $y = mx+c$ to find $m$.

## WORKED_EXAMPLE_1
**PROBLEM:** A straight road passes through a village at coordinates $(4, -2)$ and makes an angle of $135^\circ$ with the positive direction of the x-axis. Find the equation of the road in (i) Point-Slope form, (ii) Slope-Intercept form, (iii) Intercept form, and (iv) Normal form.

**STEPS:**
- **Step 1: Identify given data and calculate slope.** Point $(x_1, y_1) = (4, -2)$. Inclination $\theta = 135^\circ$. Slope $m = \tan 135^\circ = \tan(180^\circ - 45^\circ) = -\tan 45^\circ = -1$.
- **Step 2: Write Point-Slope form.** Formula: $y - y_1 = m(x - x_1)$. Substitute: $y - (-2) = -1(x - 4) \implies y + 2 = -x + 4 \implies x + y - 2 = 0$.
- **Step 3: Convert to Slope-Intercept form ($y = mx + c$).** From $x + y - 2 = 0 \implies y = -x + 2$. Here $m = -1, c = 2$.
- **Step 4: Convert to Intercept form ($\frac{x}{a} + \frac{y}{b} = 1$).** From $x + y = 2$, divide by 2: $\frac{x}{2} + \frac{y}{2} = 1$. x-intercept $a=2$, y-intercept $b=2$. (Verify: line cuts axes at $(2,0)$ and $(0,2)$).
- **Step 5: Convert to Normal form ($x \cos \alpha + y \sin \alpha = p$).** General form: $x + y - 2 = 0$. Constant $C = -2 < 0$. Normalizing factor $\sqrt{1^2+1^2} = \sqrt{2}$. Since $C < 0$, divide by $+\sqrt{2}$: $\frac{1}{\sqrt{2}}x + \frac{1}{\sqrt{2}}y = \frac{2}{\sqrt{2}} = \sqrt{2}$. Thus $\cos \alpha = 1/\sqrt{2}, \sin \alpha = 1/\sqrt{2} \implies \alpha = 45^\circ$, $p = \sqrt{2}$.

**REASONING:** We started with the most natural form for the given data (Point + Angle $\rightarrow$ Slope $\rightarrow$ Point-Slope). All other forms are algebraic rearrangements of the same linear equation $x+y-2=0$. The Normal form requires careful sign handling: $p$ must be positive, so we divide by $\sqrt{A^2+B^2}$ with a sign opposite to $C$ (here $C=-2$, so divide by $+\sqrt{2}$).

**ANSWER:** (i) $y + 2 = -(x - 4)$ or $x + y - 2 = 0$; (ii) $y = -x + 2$; (iii) $\frac{x}{2} + \frac{y}{2} = 1$; (iv) $\frac{x}{\sqrt{2}} + \frac{y}{\sqrt{2}} = \sqrt{2}$ (or $x \cos 45^\circ + y \sin 45^\circ = \sqrt{2}$).

## WORKED_EXAMPLE_2
**PROBLEM:** Find the equation of the line which is the perpendicular bisector of the line segment joining the points $A(1, 2)$ and $B(5, -6)$. Express the answer in General Form $Ax+By+C=0$ with integer coefficients.

**STEPS:**
- **Step 1: Find the midpoint $M$ of $AB$ (point on the bisector).** Midpoint formula: $M = (\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}) = (\frac{1+5}{2}, \frac{2+(-6)}{2}) = (3, -2)$.
- **Step 2: Find the slope of $AB$.** $m_{AB} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{-6 - 2}{5 - 1} = \frac{-8}{4} = -2$.
- **Step 3: Find the slope of the perpendicular bisector ($m$).** Perpendicular condition: $m \times m_{AB} = -1 \implies m \times (-2) = -1 \implies m = \frac{1}{2}$.
- **Step 4: Use Point-Slope form with point $M(3, -2)$ and slope $m = 1/2$.** $y - (-2) = \frac{1}{2}(x - 3) \implies y + 2 = \frac{1}{2}x - \frac{3}{2}$.
- **Step 5: Convert to General Form with integer coefficients.** Multiply by 2: $2y + 4 = x - 3 \implies x - 2y - 7 = 0$.

**REASONING:** A perpendicular bisector has two defining geometric properties: (1) It passes through the midpoint of the segment (giving us the point), (2) It is perpendicular to the segment (giving us the slope via $m_1 m_2 = -1$). This maps perfectly to the Point-Slope form $y - y_1 = m(x - x_1)$. The final conversion to General Form $Ax+By+C=0$ with integer $A,B,C$ is standard board exam requirement.

**ANSWER:** $x - 2y - 7 = 0$.

## WORKED_EXAMPLE_3
**PROBLEM:** A manufacturer finds that the total cost $C$ (in Rs.) of producing $q$ units of a product is linearly related to $q$. Producing 100 units costs Rs. 15,000 and producing 150 units costs Rs. 20,000. (i) Find the cost equation in Slope-Intercept form ($C = mq + c$). (ii) Interpret the slope and intercept economically. (iii) Reduce the equation to Normal Form $q \cos \alpha + C \sin \alpha = p$ (treating $q$ as x-axis, $C$ as y-axis) and find $p$. (Note: This is a mathematical exercise; Normal form is not standard in economics).

**STEPS:**
- **Step 1: Identify variables and points.** Independent variable $q$ (x-axis), Dependent variable $C$ (y-axis). Points: $(q_1, C_1) = (100, 15000)$, $(q_2, C_2) = (150, 20000)$.
- **Step 2: Calculate slope $m$ (Marginal Cost).** $m = \frac{C_2 - C_1}{q_2 - q_1} = \frac{20000 - 15000}{150 - 100} = \frac{5000}{50} = 100$. Slope $m = 100$ Rs./unit.
- **Step 3: Find equation using Point-Slope form.** $C - 15000 = 100(q - 100) \implies C - 15000 = 100q - 10000 \implies C = 100q + 5000$. This is Slope-Intercept form: $C = 100q + 5000$.
- **Step 4: Economic Interpretation.** Slope $m=100$ = **Marginal Cost** (cost to produce one extra unit). Intercept $c=5000$ = **Fixed Cost** (cost incurred even at zero production, e.g., rent, salaries).
- **Step 5: Convert to General Form for Normal Form.** $100q - C + 5000 = 0$. Here $A=100, B=-1, C=5000$.
- **Step 6: Convert to Normal Form ($x \cos \alpha + y \sin \alpha = p$).** Normalizing factor $\sqrt{A^2+B^2} = \sqrt{100^2 + (-1)^2} = \sqrt{10001}$. Constant term $C=5000 > 0$. To make $p > 0$, divide by $-\sqrt{10001}$: $\frac{-100}{\sqrt{10001}}q + \frac{1}{\sqrt{10001}}C = \frac{-5000}{\sqrt{10001}}$. Wait, RHS is negative. **Correction:** Standard form is $Ax+By+C=0$. Here $100q - C + 5000 = 0 \implies -100q + C = 5000$. Divide by $\sqrt{(-100)^2+1^2} = \sqrt{10001}$. $\frac{-100}{\sqrt{10001}}q + \frac{1}{\sqrt{10001}}C = \frac{5000}{\sqrt{10001}}$. So $\cos \alpha = \frac{-100}{\sqrt{10001}}, \sin \alpha = \frac{1}{\sqrt{10001}}, p = \frac{5000}{\sqrt{10001}} \approx 49.9975$.

**REASONING:** This combines coordinate geometry with applied mathematics (Economics). The Two-Point form (via slope calculation) gives the cost function. The Normal Form conversion tests the algorithmic rule: write as $Ax+By = -C$ (or $Ax+By = D$ with $D>0$), then divide by $\sqrt{A^2+B^2}$. The economic interpretation connects the mathematical parameters ($m, c$) to real-world concepts (Marginal Cost, Fixed Cost), a key competency in Applied Mathematics.

**ANSWER:** (i) $C = 100q + 5000$; (ii) Slope = Marginal Cost = Rs. 100/unit; Intercept = Fixed Cost = Rs. 5000; (iii) Normal Form: $\frac{-100}{\sqrt{10001}}q + \frac{1}{\sqrt{10001}}C = \frac{5000}{\sqrt{10001}}$, so $p = \frac{5000}{\sqrt{10001}}$ units.

## COMPETENCY_QUESTION_1
**QUESTION:** A line $L$ passes through the point $P(3, 4)$ and its intercepts on the coordinate axes are equal in magnitude but opposite in sign. Find the equation of $L$ in Intercept Form and Slope-Intercept Form. Hence, find the area of the triangle formed by $L$ and the coordinate axes.

**COMPETENCY:** Conceptual Understanding & Application (Interpreting geometric conditions "equal magnitude, opposite sign" to determine intercept signs, applying Intercept Form, converting forms, and applying coordinate geometry area formula).

**STEPS:**
- **Step 1: Interpret "intercepts equal in magnitude but opposite in sign".** Let x-intercept $= a$, y-intercept $= b$. Given $|a| = |b|$ and signs opposite $\implies b = -a$.
- **Step 2: Use Intercept Form with point $P(3,4)$.** Equation: $\frac{x}{a} + \frac{y}{b} = 1$. Substitute $b = -a$: $\frac{x}{a} + \frac{y}{-a} = 1 \implies \frac{x - y}{a} = 1 \implies x - y = a$.
- **Step 3: Find $a$ using point $P(3,4)$.** $3 - 4 = a \implies a = -1$. Then $b = -(-1) = 1$.
- **Step 4: Write Intercept Form.** $\frac{x}{-1} + \frac{y}{1} = 1 \implies -x + y = 1$.
- **Step 5: Write Slope-Intercept Form.** $y = x + 1$. (Slope $m=1$, y-intercept $c=1$).
- **Step 6: Find Area of Triangle with Axes.** Vertices: Origin $(0,0)$, x-intercept $(-1, 0)$, y-intercept $(0, 1)$. Area $= \frac{1}{2} \times |x\text{-intercept}| \times |y\text{-intercept}| = \frac{1}{2} \times |-1| \times |1| = 0.5$ sq. units.

**ANSWER:** Intercept Form: $\frac{x}{-1} + \frac{y}{1} = 1$ (or $-x + y = 1$). Slope-Intercept Form: $y = x + 1$. Area = $0.5$ sq. units.

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** The equation of a line in Normal Form is given as $x \cos 150^\circ + y \sin 150^\circ = 2$.
(a) Find the inclination $\theta$ of the line and its slope $m$.
(b) Find the x-intercept and y-intercept of the line.
(c) Determine the equation of the line perpendicular to this line passing through the point where the given line cuts the y-axis. Express the final answer in General Form $Ax+By+C=0$.

**COMPETENCY:** Multi-step Analytical Reasoning (Connecting Normal Form parameters $\alpha, p$ to line geometry $\theta, m$, intercepts, and perpendicular line construction; requires trigonometric evaluation of $\cos 150^\circ, \sin 150^\circ$).

**STEPS:**
- **Step 1: Evaluate Normal Form parameters.** $\alpha = 150^\circ$, $p = 2$. $\cos 150^\circ = -\cos 30^\circ = -\frac{\sqrt{3}}{2}$. $\sin 150^\circ = \sin 30^\circ = \frac{1}{2}$. Equation: $-\frac{\sqrt{3}}{2}x + \frac{1}{2}y = 2 \implies -\sqrt{3}x + y = 4 \implies y = \sqrt{3}x + 4$.
- **Step 2: Find Inclination $\theta$ and Slope $m$.** From $y = \sqrt{3}x + 4$, Slope $m = \sqrt{3}$. $\tan \theta = \sqrt{3} \implies \theta = 60^\circ$. (Check: $\theta = \alpha - 90^\circ = 150^\circ - 90^\circ = 60^\circ$. Correct.)
- **Step 3: Find Intercepts.** y-intercept: $x=0 \implies y=4 \implies (0, 4)$. x-intercept: $y=0 \implies 0 = \sqrt{3}x + 4 \implies x = -\frac{4}{\sqrt{3}} \implies (-\frac{4}{\sqrt{3}}, 0)$.
- **Step 4: Find Perpendicular Line through y-intercept $(0, 4)$.** Slope of given line $m_1 = \sqrt{3}$. Slope of perpendicular $m_2 = -\frac{1}{m_1} = -\frac{1}{\sqrt{3}}$. Point $(0, 4)$.
- **Step 5: Equation of Perpendicular Line.** Point-Slope: $y - 4 = -\frac{1}{\sqrt{3}}(x - 0) \implies \sqrt{3}y - 4\sqrt{3} = -x \implies x + \sqrt{3}y - 4\sqrt{3} = 0$.

**ANSWER:** (a) Inclination $\theta = 60^\circ$, Slope $m = \sqrt{3}$. (b) x-intercept $= -\frac{4}{\sqrt{3}}$, y-intercept $= 4$. (c) $x + \sqrt{3}y - 4\sqrt{3} = 0$.

**DIFFICULTY:** hard