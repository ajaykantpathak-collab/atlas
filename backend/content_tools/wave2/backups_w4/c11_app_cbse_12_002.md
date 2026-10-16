## ELI5
A crosswalk must cut a main road at a perfect right angle. The road follows 3x - 4y + 12 = 0, whose slope rearranges to 3/4. Perpendicularity has one rule: multiply the slopes and you must get -1 - so the crosswalk's slope is the negative reciprocal, -4/3. Steep uphill road, shallow downhill crosswalk: the fraction flips and the sign flips. Feed the pedestrian entry point (2, -1) into point-slope form and the crosswalk's equation stands.

## DEFINITION
Two non-vertical lines $L_1$ and $L_2$ with slopes $m_1$ and $m_2$ are perpendicular if and only if the product of their slopes equals $-1$, i.e., $m_1 m_2 = -1$. Equivalently, the slope of one line is the negative reciprocal of the other: $m_2 = -1/m_1$.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) State the condition $m_1 m_2 = -1$ and derive it from the inclination angle relationship $\theta_2 = 90^\circ + \theta_1$. (2) Correctly compute the slope of a line perpendicular to a given line (expressed in any form: slope-intercept, general form, or two points) and write its equation using point-slope form. (3) Identify the special cases involving horizontal ($m=0$) and vertical (undefined slope) lines without applying the product rule mechanically.

## SCOPE_BOUNDARY
This node covers the derivation of the perpendicular slope condition $m_1 m_2 = -1$ using inclination angles, its application to finding equations of perpendicular lines (including perpendicular bisectors), and handling horizontal/vertical line edge cases. It does **not** cover the general angle formula $\tan \theta = |(m_1 - m_2)/(1 + m_1 m_2)|$ (covered in node `c11_app_cbse_12_003`) or the distance from a point to a line (covered later in the chapter).

## WALKTHROUGH
Imagine you are designing a crosswalk that must cut across a main road at a perfect right angle for safety. The main road follows the line $3x - 4y + 12 = 0$. How do you find the equation of the crosswalk passing through a specific pedestrian entry point, say $(2, -1)$? First, we rearrange the road's equation to $y = \frac{3}{4}x + 3$ to see its slope is $m_1 = 3/4$. Since the crosswalk is perpendicular, its slope must be the negative reciprocal: $m_2 = -4/3$. Now we have a point $(2, -1)$ and slope $-4/3$; using point-slope form $y - y_1 = m(x - x_1)$, we get the crosswalk equation. The key insight is that **perpendicularity flips the fraction and flips the sign** — a steep uphill road requires a shallow downhill crosswalk.

Takeaway: mastery means extracting a slope from any line form, negating and reciprocating it, and writing the perpendicular line through a given point. Exam moves: find-the-perpendicular questions and write-its-equation items on the crosswalk scene. Check yourself: horizontal and vertical lines break the product rule - slope zero pairs with an undefined slope, not with zero again. Students miss it because the rule looks like a random fact, when the 90-degree turn from 3/4 to -4/3 shows the design: one slope's rise becomes the other's run, the inclination angles differ by a right angle, and the general-form shortcut swaps the coefficients and flips one sign.

## DIAGNOSTIC_QUESTION_1
State the necessary and sufficient condition for two non-vertical lines with slopes $m_1$ and $m_2$ to be perpendicular. If line $L_1$ has inclination $\theta_1$, what is the inclination $\theta_2$ of a line $L_2$ perpendicular to $L_1$ (assuming $\theta_1 \neq 90^\circ$)?

## DIAGNOSTIC_ANSWER_1
The condition is $m_1 m_2 = -1$ (or $m_2 = -1/m_1$). The inclination of the perpendicular line is $\theta_2 = 90^\circ + \theta_1$. A wrong answer (e.g., $m_1 = m_2$ or $m_1 m_2 = 1$) reveals the student confuses perpendicularity with parallelism or ignores the negative sign arising from $\tan(90^\circ + \theta) = -\cot \theta$.

## DIAGNOSTIC_QUESTION_2
A student claims: "The line $x = 5$ is perpendicular to the line $y = 3$, so their slopes should satisfy $m_1 m_2 = -1$. The slope of $x=5$ is $\infty$ and slope of $y=3$ is $0$, and $\infty \times 0 = -1$." Explain why this reasoning is mathematically incorrect, and state the correct way to verify perpendicularity for horizontal and vertical lines.

## DIAGNOSTIC_ANSWER_2
The reasoning is incorrect because $\infty$ is not a real number and the product $\infty \times 0$ is an indeterminate form, not $-1$. The condition $m_1 m_2 = -1$ applies **only to non-vertical lines** (where slopes are defined real numbers). A vertical line ($x = \text{constant}$) is perpendicular to a horizontal line ($y = \text{constant}$) by geometric definition (angle between axes is $90^\circ$). A wrong answer treating $\infty$ as a number reveals a lack of understanding of the domain restrictions of the slope formula.

## DIAGNOSTIC_QUESTION_3
Find the equation of the line passing through the point $P(4, -2)$ and perpendicular to the line joining points $A(1, 3)$ and $B(5, 7)$.

## DIAGNOSTIC_ANSWER_3
**Steps:**
1. Slope of AB: $m_{AB} = \frac{7 - 3}{5 - 1} = \frac{4}{4} = 1$.
2. Slope of required line $m = -1/m_{AB} = -1$.
3. Equation using point-slope form: $y - (-2) = -1(x - 4) \implies y + 2 = -x + 4$.
4. Simplify: $x + y - 2 = 0$.
A wrong answer (e.g., $m=1$ giving $x - y - 6 = 0$) reveals the student forgot the negative sign in the negative reciprocal. A wrong slope calculation (e.g., $\frac{3-7}{1-5}$ sign error) reveals algebraic carelessness.

## DIAGNOSTIC_QUESTION_4
Line $L_1: 2x + 3y - 6 = 0$ and Line $L_2: 3x - 2y + 4 = 0$ intersect at point $Q$. Without finding $Q$, determine if $L_1$ and $L_2$ are perpendicular. Then, find the equation of the line through $Q$ that is perpendicular to $L_1$ (which will be parallel to $L_2$). Explain the relationship between the three lines.

## DIAGNOSTIC_ANSWER_4
**Analysis:**
1. Slope of $L_1$: $m_1 = -A/B = -2/3$.
2. Slope of $L_2$: $m_2 = -3/(-2) = 3/2$.
3. Product: $m_1 m_2 = (-2/3) \times (3/2) = -1$. Hence, $L_1 \perp L_2$.
4. A line through $Q$ perpendicular to $L_1$ must have slope $m = 3/2$ (same as $L_2$). Since it passes through $Q$ (which lies on $L_2$), this line **is exactly $L_2$**.
A wrong answer finding a different equation reveals the student does not grasp that "perpendicular to $L_1$ at intersection point $Q$" uniquely defines $L_2$ when $L_1 \perp L_2$.

## DIAGNOSTIC_QUESTION_5
Critique the following statement: "For any line $Ax + By + C = 0$ with $A, B \neq 0$, a perpendicular line can always be written as $Bx - Ay + k = 0$ for some constant $k$." Is this always true? Justify your answer with a proof or counterexample.

## DIAGNOSTIC_ANSWER_5
**Judgment:** The statement is **TRUE**.
**Justification:**
1. Slope of given line: $m_1 = -A/B$.
2. Slope of proposed line $Bx - Ay + k = 0 \implies y = (B/A)x + k/A$, so $m_2 = B/A$.
3. Product: $m_1 m_2 = (-A/B) \times (B/A) = -1$. Condition satisfied for all $A, B \neq 0$.
4. The constant $k$ shifts the line parallelly without changing slope, covering all perpendicular lines.
A student calling this "false" likely confuses the *form* of the perpendicular line ($Bx - Ay + k = 0$) with the *specific* perpendicular line through a given point (which fixes $k$). They may not distinguish between the family of perpendicular lines and a unique instance.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) where finding a perpendicular line is essential. Define the coordinate system, give the equation of an existing line, a point through which the perpendicular must pass, and ask for the equation. Ensure the problem requires handling a fraction slope and a negative intercept.

## DIAGNOSTIC_ANSWER_6
**Sample Good Problem:** "A metro line runs along $5x - 2y + 10 = 0$. An emergency exit stairway must be built perpendicular to the track at the station located at $(-2, 0)$. Find the equation of the stairway line."
**Expected Solution:**
1. Metro slope $m_1 = 5/2$.
2. Stairway slope $m_2 = -2/5$.
3. Equation: $y - 0 = -\frac{2}{5}(x + 2) \implies 5y = -2x - 4 \implies 2x + 5y + 4 = 0$.
A poor problem uses integer slopes only (e.g., $y=2x$) or avoids negative intercepts, showing the student cannot generalize the negative reciprocal rule to fractions or handle sign errors in point-slope substitution.

## COMMON_MISCONCEPTION
**The "Reciprocal without Negative" Error:** Students mechanically flip the fraction ($m_2 = 1/m_1$) but forget the negative sign. For example, given line $y = \frac{2}{3}x + 1$, they write perpendicular slope as $\frac{3}{2}$ instead of $-\frac{3}{2}$.
**Why it happens:** The derivation $m_2 = \tan(90^\circ + \theta_1) = -\cot \theta_1 = -1/\tan \theta_1$ involves the tangent addition formula where $\tan(90^\circ + \theta) = -\cot \theta$. Students memorize "flip the fraction" from parallel line patterns ($m_1 = m_2$) or vague memory of "negative reciprocal" but drop the negative because they visualize perpendicular lines as just "crossing" without considering orientation (one goes up, the other must go down). This is reinforced by the fact that for horizontal/vertical lines, the "flip" ($0 \leftrightarrow \infty$) works without an obvious negative sign.

## ON_FAILURE
1. **Visual Anchor:** Draw coordinate axes. Plot line $y = x$ (slope 1, $45^\circ$). Ask: "Draw a line perpendicular to it through origin." Student draws $y = -x$. Ask: "What is its slope?" $-1$. Write $1 \times (-1) = -1$. Repeat with $y = 2x$ (steep up) $\to$ perpendicular must go *down* gently: slope $-1/2$.
2. **Derivation Drill:** Make the student derive $m_1 m_2 = -1$ from $\theta_2 = 90^\circ + \theta_1$ using $\tan(90^\circ + \theta) = -\cot \theta$ **three times** with different $\theta$ values ($30^\circ, 60^\circ, 15^\circ$).
3. **Sign Check Rule:** Teach the "Opposite Signs Rule": If $m_1 > 0$ (uphill), then $m_2 < 0$ (downhill) **always**. If signs match, it's wrong. Practice 5 problems where they *only* state the sign of $m_2$ before calculating value.

## PREREQUISITE_NODE_IDS
c11_app_cbse_12_001

## PREREQUISITE_REASONS
c11_app_cbse_12_001: This node defines slope ($m = \tan \theta$), inclination ($\theta$), and the slope formula for two points $(y_2-y_1)/(x_2-x_1)$. Without understanding that slope represents $\tan$ of inclination, the derivation $m_2 = \tan(90^\circ+\theta_1) = -\cot\theta_1$ is meaningless. Also requires point-slope form $y-y_1=m(x-x_1)$ to write equations of perpendicular lines.

## FORWARD_NODE_IDS
c11_app_cbse_12_003, c11_app_cbse_12_004

## FORWARD_REASONS
c11_app_cbse_12_003: The angle between two lines formula $\tan \theta = |(m_1-m_2)/(1+m_1m_2)|$ generalizes the perpendicular condition (denominator $1+m_1m_2=0 \implies m_1m_2=-1$). Understanding perpendicularity as a special case ($90^\circ$) is essential before learning the general angle formula.
c11_app_cbse_12_004: Various forms of line equations (slope-intercept, intercept, normal) are used to extract slopes quickly for perpendicularity checks. The normal form $x\cos\alpha + y\sin\alpha = p$ directly uses perpendicular distance from origin, linking slope $-\cot\alpha$ to the perpendicular condition.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_12_001 -> c11_app_cbse_12_002 -> c11_app_cbse_12_003

## THIS_FORMULA
$m_1 m_2 = -1$ (for non-vertical lines $L_1, L_2$ with slopes $m_1, m_2$)
Perpendicular slope: $m_{\perp} = -\frac{1}{m}$
General form shortcut: Line $Ax + By + C = 0$ has perpendicular family $Bx - Ay + k = 0$

## FORMULA_VARIABLES
$m_1, m_2$: Slopes of two non-vertical lines (real numbers, dimensionless).
$m$: Slope of a given line.
$m_{\perp}$: Slope of a line perpendicular to the given line.
$A, B, C$: Coefficients of general line equation $Ax+By+C=0$ ($A,B$ not both zero).
$k$: Arbitrary real constant determining the specific perpendicular line's position.

## FORMULA_UNITS
Slopes ($m, m_1, m_2, m_{\perp}$) are dimensionless ratios (rise/run). Coefficients $A, B, C$ have units consistent with coordinate units (e.g., if $x,y$ are in meters, $A,B$ are dimensionless, $C$ is in meters).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_12_001 | Slope definition and point-slope form are prerequisites for computing perpendicular slopes and writing their equations.
c11_app_cbse_12_003 | The perpendicular condition $m_1m_2=-1$ is the special case ($\theta=90^\circ$) of the general angle formula $\tan\theta = |(m_1-m_2)/(1+m_1m_2)|$.

## PREREQ_CONCEPT
Slope as tangent of inclination angle ($m = \tan \theta$) and point-slope form of a line ($y - y_1 = m(x - x_1)$).

## PREREQ_BEFORE
Student must be able to find slope from two points, from equation $Ax+By+C=0$, and write line equation given slope and a point.

## PREREQ_STUCK
Review "Slope of a Line" (inclination, $\tan \theta$, two-point formula) and "Point-Slope Form" in node `c11_app_cbse_12_001`.

## WORKED_EXAMPLE_1
PROBLEM: A railway track runs along the line $4x - 3y + 12 = 0$. A service road must be constructed perpendicular to the track at the point where the track crosses the y-axis. Find the equation of the service road.
STEPS:
- Step 1: Find the y-intercept of the railway track (where it crosses y-axis). Set $x=0$ in $4x - 3y + 12 = 0 \implies -3y + 12 = 0 \implies y = 4$. The crossing point is $P(0, 4)$.
- Step 2: Find the slope of the railway track. Rewrite as $3y = 4x + 12 \implies y = \frac{4}{3}x + 4$. Slope $m_1 = \frac{4}{3}$.
- Step 3: Compute the slope of the perpendicular service road. $m_2 = -\frac{1}{m_1} = -\frac{1}{4/3} = -\frac{3}{4}$.
- Step 4: Use point-slope form with point $P(0, 4)$ and slope $m_2 = -3/4$: $y - 4 = -\frac{3}{4}(x - 0)$.
- Step 5: Simplify to general form: $4(y - 4) = -3x \implies 4y - 16 = -3x \implies 3x + 4y - 16 = 0$.
REASONING: The problem combines finding a specific point on a line (intercept) with the perpendicular slope condition. The general form shortcut $Bx - Ay + k = 0$ (here $3x + 4y + k = 0$) could verify the slope, but point-slope is needed to fix $k$ using the given point.
ANSWER: The equation of the service road is $3x + 4y - 16 = 0$.

## WORKED_EXAMPLE_2
PROBLEM: Find the equation of the perpendicular bisector of the line segment joining $A(-2, 5)$ and $B(4, -3)$.
STEPS:
- Step 1: Find the midpoint $M$ of $AB$. $M = \left(\frac{-2+4}{2}, \frac{5+(-3)}{2}\right) = (1, 1)$.
- Step 2: Find the slope of $AB$. $m_{AB} = \frac{-3 - 5}{4 - (-2)} = \frac{-8}{6} = -\frac{4}{3}$.
- Step 3: The perpendicular bisector is perpendicular to $AB$ and passes through $M$. Its slope $m = -\frac{1}{m_{AB}} = -\frac{1}{-4/3} = \frac{3}{4}$.
- Step 4: Write equation using point-slope form with $M(1, 1)$ and $m = 3/4$: $y - 1 = \frac{3}{4}(x - 1)$.
- Step 5: Convert to general form: $4(y - 1) = 3(x - 1) \implies 4y - 4 = 3x - 3 \implies 3x - 4y + 1 = 0$.
REASONING: A perpendicular bisector requires two conditions: (1) perpendicular to the segment (slope = negative reciprocal), (2) passes through the midpoint. This combines coordinate geometry (midpoint formula) with the perpendicular slope rule.
ANSWER: The equation of the perpendicular bisector is $3x - 4y + 1 = 0$.

## WORKED_EXAMPLE_3
PROBLEM: A line $L$ passes through $(3, -2)$ and is perpendicular to the line joining $(1, 2)$ and $(-3, 4)$. Find the x-intercept and y-intercept of $L$, and the area of the triangle formed by $L$ and the coordinate axes.
STEPS:
- Step 1: Slope of line through $(1, 2)$ and $(-3, 4)$: $m_1 = \frac{4-2}{-3-1} = \frac{2}{-4} = -\frac{1}{2}$.
- Step 2: Slope of required line $L$ (perpendicular): $m_2 = -\frac{1}{m_1} = -\frac{1}{-1/2} = 2$.
- Step 3: Equation of $L$ through $(3, -2)$ with slope $2$: $y - (-2) = 2(x - 3) \implies y + 2 = 2x - 6 \implies 2x - y - 8 = 0$.
- Step 4: Find intercepts. x-intercept: set $y=0 \implies 2x = 8 \implies x = 4$. y-intercept: set $x=0 \implies -y = 8 \implies y = -8$.
- Step 5: Triangle vertices: $(0,0), (4,0), (0,-8)$. It's a right triangle with legs $4$ and $8$. Area $= \frac{1}{2} \times 4 \times 8 = 16$ sq. units.
REASONING: This multi-step problem tests the full chain: slope from two points $\to$ negative reciprocal $\to$ point-slope equation $\to$ intercept form $\to$ geometric area calculation. The negative slope of the original line ($-1/2$) leads to a positive perpendicular slope ($2$), and the point $(3, -2)$ yields a negative y-intercept, testing sign management.
ANSWER: x-intercept = 4, y-intercept = -8, Area = 16 sq. units.

## COMPETENCY_QUESTION_1
QUESTION: The line $L_1: 3x + 4y - 7 = 0$ is rotated by $90^\circ$ anticlockwise about its point of intersection with the line $L_2: x - y + 1 = 0$ to obtain line $L_3$. Find the equation of $L_3$.
COMPETENCY: Problem Solving & Geometric Reasoning (combining intersection, rotation/perpendicularity, and equation writing)
STEPS:
- Step 1: Find intersection point $P$ of $L_1$ and $L_2$. Solve $3x+4y=7$ and $x-y=-1$. From $L_2$, $x = y-1$. Substitute: $3(y-1)+4y=7 \implies 7y=10 \implies y=10/7$. Then $x = 3/7$. $P(3/7, 10/7)$.
- Step 2: Rotating $L_1$ by $90^\circ$ about $P$ makes $L_3$ perpendicular to $L_1$ at $P$. Slope of $L_1$: $m_1 = -3/4$. Slope of $L_3$: $m_3 = 4/3$.
- Step 3: Equation of $L_3$ through $P(3/7, 10/7)$ with slope $4/3$: $y - 10/7 = \frac{4}{3}(x - 3/7)$.
- Step 4: Simplify: $3(7y - 10) = 4(7x - 3) \implies 21y - 30 = 28x - 12 \implies 28x - 21y + 18 = 0$.
ANSWER: $28x - 21y + 18 = 0$ (or simplified $4x - 3y + 18/7 = 0$, but integer coefficients preferred: $28x - 21y + 18 = 0$).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A variable line $L$ passes through the fixed point $(2, 3)$ and intersects the coordinate axes at $A(a, 0)$ and $B(0, b)$. Find the locus of the foot of the perpendicular drawn from the origin to the line $L$.
COMPETENCY: Analytical Reasoning & Locus Concept (combining perpendicular from origin, intercept form, and elimination of parameter)
STEPS:
- Step 1: Equation of $L$ in intercept form: $\frac{x}{a} + \frac{y}{b} = 1$. Since it passes through $(2, 3)$: $\frac{2}{a} + \frac{3}{b} = 1$. (Eq 1)
- Step 2: Slope of $L$ is $m_L = -b/a$. Slope of perpendicular from origin $OP$ is $m_{OP} = a/b$ (negative reciprocal).
- Step 3: Let foot of perpendicular be $P(h, k)$. $P$ lies on $L$: $\frac{h}{a} + \frac{k}{b} = 1$. (Eq 2)
- Step 4: $P$ lies on line through origin with slope $a/b$: $k = \frac{a}{b}h \implies \frac{a}{b} = \frac{k}{h}$. (Eq 3)
- Step 5: From Eq 3, let $a = \lambda k, b = \lambda h$. Substitute in Eq 2: $\frac{h}{\lambda k} + \frac{k}{\lambda h} = 1 \implies \lambda = \frac{h^2 + k^2}{hk}$.
- Step 6: Substitute $a, b$ in Eq 1: $\frac{2}{\lambda k} + \frac{3}{\lambda h} = 1 \implies \frac{2h + 3k}{\lambda hk} = 1$. Substitute $\lambda$: $\frac{2h+3k}{(h^2+k^2)} = 1 \implies h^2 + k^2 - 2h - 3k = 0$.
- Step 7: Replace $(h,k)$ with $(x,y)$: Locus is $x^2 + y^2 - 2x - 3y = 0$ (a circle).
ANSWER: $x^2 + y^2 - 2x - 3y = 0$ (Circle with centre $(1, 1.5)$ and radius $\sqrt{13}/2$).
DIFFICULTY: hard