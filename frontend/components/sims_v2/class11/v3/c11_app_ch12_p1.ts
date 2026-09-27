import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch12_p1: SimDef = {
    id: 'v3_c11_app_ch12_p1',
    title: 'Coordinate Geometry · Part 1/2',
    subtitle: 'This node covers the definition of a straight line, its inclination and slope, conditions.',
    classLevel: 11, subject: 'app', topic: 'Coordinate Geometry · Part 1/2',
    chapters: ['c11_app_ch12'],
    nodeIds: ['c11_app_cbse_12_001', 'c11_app_cbse_12_002', 'c11_app_cbse_12_003', 'c11_app_cbse_12_004', 'c11_app_cbse_12_005', 'c11_app_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re designing a ramp for a skateboard park — you need the ramp to go through two specific points.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student claims: "The line x = 5 has slope 0 because it\'s straight and flat." Explain why this is incorrect using the definition of slope and inclination.',
        options: ['The line x = 5 is vertical (parallel to the y-axis)', 'straight and flat', '"straight and flat" implies horizontal'],
        answer: 'The line x = 5 is vertical (parallel to the y-axis)',
        hook: 'Students often believe that the general form Ax + By + C = 0 always represents a line with slope -A/B and y-intercept.',
    },
    teaching: [
        { title: 'Straight Line', text: 'A straight line is a curve such that every point on the line segment joining any two points on it lies on it.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_12_001', title: 'Straight Line',
          scaffold: { problem: 'A railway track is to be laid straight between two stations A(3, 7) and B(9, -5).',
            steps: [
            { text: 'Identify the two given points A(3, 7) and B(9, -5). We need the equation of the line through them.' },
            { text: 'Calculate the slope m using the formula m = (y₂ - y₁)/(x₂ - x₁) = (-5 - 7)/(9 - 3) = -12/6 = -2.' },
            { text: 'Use point-slope form with point A(3, 7): y - 7 = -2(x - 3).' },
            { text: 'Simplify to slope-intercept form y = mx + c: y - 7 = -2x + 6 → y = -2x + 13.' },
            { text: 'The y-intercept is c = 13, meaning the track crosses the y-axis at (0, 13).', faded: true, blankAnswer: 'Equation: y = -2x + 13; y-intercept = 13 (track crosses.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_12_002', title: 'Slopes of Perpendicular Lines',
          scaffold: { problem: 'A railway track runs along the line $4x - 3y + 12 = 0$. A service road must be constructed perpendicular to the track at the point where.',
            steps: [
            { text: 'Find the y-intercept of the railway track (where it crosses y-axis).' },
            { text: 'Find the slope of the railway track. Rewrite as $3y = 4x + 12 \\implies y = \\frac{4}{3}x + 4$. Slope $m_1 = \\frac{4}{3}$.' },
            { text: 'Compute the slope of the perpendicular service road. $m_2 = -\\frac{1}{m_1} = -\\frac{1}{4/3} = -\\frac{3}{4}$.' },
            { text: 'Use point-slope form with point $P(0, 4)$ and slope $m_2 = -3/4$: $y - 4 = -\\frac{3}{4}(x - 0)$.' },
            { text: 'Simplify to general form: $4(y - 4) = -3x \\implies 4y - 16 = -3x \\implies 3x + 4y - 16 = 0$.', faded: true, blankAnswer: 'The equation of the service road is $3x + 4y - 16 = 0$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_12_003', title: 'Angle between two Lines',
          scaffold: { problem: 'A flyover ramp in Mumbai connects a service road (slope = 1/10) to a highway (slope = 3/4).',
            steps: [
            { text: 'Identify slopes: m₁ = 1/10 (service road), m₂ = 3/4 (highway). Both non-vertical, non-perpendicular (m₁m₂ = 3/40 ≠ -1).' },
            { text: 'Apply formula for acute angle: tan θ = |(m₁ - m₂)/(1 + m₁m₂)| = |(1/10 - 3/4)/(1 + (1/10)(3/4))|.' },
            { text: 'Compute numerator: 1/10 - 3/4 = 2/20 - 15/20 = -13/20. Absolute value: 13/20.' },
            { text: 'Compute denominator: 1 + 3/40 = 43/40.' },
            { text: 'tan θ = (13/20) / (43/40) = (13/20) × (40/43) = 26/43 ≈ 0.6047.' },
            { text: 'θ = arctan(26/43) ≈ 31.1°. Since 31.1° > 30°, the design is NOT compliant.', faded: true, blankAnswer: 'The acute angle is arctan(26/43) ≈ 31.1°, which exceeds the.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_12_004', title: 'Various Forms of the Equation of a Line',
          caseStudy: { intro: 'Imagine a delivery drone flying from a warehouse at $(2, 3)$ towards a customer location.',
            decisions: [{ prompt: 'Write the equation of the line parallel to the y-axis and passing through the point $(-4, 5)$.', options: [
                { text: 'The equation is $x = -4$', outcome: 'The equation is $x = -4$. A line parallel to the y-axis has an undefined slope and constant.' },
                { text: 'parallel to y-axis', outcome: 'Not quite — **Misconception:** "In the Normal Form $x \\cos \\alpha + y \\sin \\alpha = p$, the angle $\\alpha$.', reveals: 'misconception-in-the-normal-form' },
                { text: 'parallel to x-axis', outcome: 'Not quite — **Misconception:** "In the Normal Form $x \\cos \\alpha + y \\sin \\alpha = p$, the angle $\\alpha$.', reveals: 'misconception-in-the-normal-form' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_12_005', title: 'Circle',
          scaffold: { problem: 'A circular garden in a housing society in Bengaluru has its centre at (2, -3).',
            steps: [
            { text: 'Identify given data — centre C(2, -3) and a point P(5, 1) on the circle.' },
            { text: 'Compute radius r = distance CP = √[(5-2)² + (1-(-3))²] = √[3² + 4²] = √25 = 5.' },
            { text: 'Write central form using (x - h)² + (y - k)² = r² with h=2, k=-3, r=5 → (x - 2)² + (y + 3)² = 25.' },
            { text: 'Expand to general form: x² - 4x + 4 + y² + 6y + 9 = 25 → x² + y² - 4x + 6y - 12 = 0.' },
            { text: 'Verify: g = -2, f = 3, c = -12 → g² + f² - c = 4 + 9 + 12 = 25 = r² > 0 ✓.', faded: true, blankAnswer: '(a) (x - 2)² + (y + 3)² = 25; (b) x² + y² - 4x + 6y - 12.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_12_006', title: 'Properties of Circles',
          scaffold: { problem: 'A circular garden is to be fenced in a rectangular plot. The endpoints of a diameter of the garden are marked by two trees at coordinates.',
            steps: [
            { text: 'Identify that the endpoints of the diameter are given, so the diameter form of the circle equation is the most direct.' },
            { text: 'Substitute $A(2, -1)$ and $B(4, 3)$: $(x-2)(x-4) + (y+1)(y-3) = 0$.' },
            { text: 'Expand and simplify: $(x^2 - 6x + 8) + (y^2 - 2y - 3) = 0 \\Rightarrow x^2 + y^2 - 6x - 2y + 5 = 0$.' },
            { text: 'Find center and radius by comparing with $x^2+y^2+2gx+2fy+c=0$.' },
            { text: 'Verify center is midpoint of AB: $\\left(\\frac{2+4}{2}, \\frac{-1+3}{2}\\right) = (3, 1)$. Matches.', faded: true, blankAnswer: 'Equation: $x^2 + y^2 - 6x - 2y + 5 = 0$; Center: $(3, 1)$.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Coordinate Geometry like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Coordinate Geometry · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Coordinate Geometry · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_12_001', difficulty: 'standard',
          question: 'A straight line is a curve such that every point on the line segment joining.',
          hint: 'Review Class 10 Coordinate Geometry: distance formula, section formula, and plotting.',
          misconception: 'Students often believe that the general form Ax + By + C = 0 always represents a line with slope -A/B and y-intercept.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The line x = 5 has slope 0 because it\'s straight and flat." Explain why this is incorrect using the definition of slope and inclination.', answer: 'The line x = 5 is vertical (parallel to the y-axis)',
                  options: ['The line x = 5 is vertical (parallel to the y-axis)', 'straight and flat', '"straight and flat" implies horizontal'],
                  hint: 'Review Class 10 Coordinate Geometry: distance formula, section formula, and plotting points.',
                  misconception: 'Students often believe that the general form Ax + By + C = 0 always represents a line with slope -A/B and y-intercept -C/B, even when.' }
          ],
            remediations: { 'the-general-form-ax-by': { steps: ['If a student makes this error: (1) Ask them to plot x = 3 on graph paper and observe it is vertical.', '(2) Ask "What is tan 90°?" to recall it is undefined.', '(3) Show the NCERT proof: when B = 0, Ax + C = 0 → x = -C/A, a vertical line.', '(4) Have them practice 5 examples: identify A, B, C, check if B = 0 or A = 0, then state slope correctly (0, undefined.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_12_002', difficulty: 'standard',
          question: 'Two non-vertical lines $L_1$ and $L_2$ with slopes $m_1$ and $m_2$ are.',
          hint: 'Review "Slope of a Line" (inclination, $\\tan \\theta$, two-point formula) and "Point-Slope.',
          misconception: '**The "Reciprocal without Negative" Error:** Students mechanically flip the fraction ($m_2 = 1/m_1$) but forget the.',
          parts: [
                { id: 'a', prompt: 'Line $L_1: 2x + 3y - 6 = 0$ and Line $L_2: 3x - 2y + 4 = 0$ intersect at point $Q$. Without finding $Q$, determine if $L_1$ and $L_2$ are perpendicular.', answer: '**Analysis:** 1',
                  options: ['**Analysis:** 1', 'perpendicular to $L_1$ at intersection point $Q$'],
                  hint: 'Review "Slope of a Line" (inclination, $\\tan \\theta$, two-point formula) and "Point-Slope Form".',
                  misconception: '**The "Reciprocal without Negative" Error:** Students mechanically flip the fraction ($m_2 = 1/m_1$) but forget the negative sign.' }
          ],
            remediations: { 'the-reciprocal-without-negative-error': { steps: ['**Visual Anchor:** Draw coordinate axes.', 'Plot line $y = x$ (slope 1, $45^\\circ$).', 'Ask: "Draw a line perpendicular to it through origin." Student draws $y = -x$.', 'Ask: "What is its slope?" $-1$.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_12_003', difficulty: 'standard',
          question: 'The acute angle θ between two non-vertical, non-perpendicular lines with slopes.',
          hint: 'If stuck, review c11_app_cbse_12_001 (slope calculation from points/equations) and.',
          misconception: 'Students often forget the absolute value in the formula and compute tan θ = (m₁ - m₂)/(1 + m₁m₂), getting a negative.',
          parts: [
                { id: 'a', prompt: 'Two lines have slopes m₁ = 2 and m₂ = -1/2. A student computes tan θ = (2 - (-1/2))/(1 + 2(-1/2)) = (2.5)/(0) → "undefined, so angle is 90°".', answer: 'Yes, the reasoning is correct',
                  options: ['Yes, the reasoning is correct', 'the formula fails'],
                  hint: 'If stuck, review c11_app_cbse_12_001 (slope calculation from points/equations) and.',
                  misconception: 'Students often forget the absolute value in the formula and compute tan θ = (m₁ - m₂)/(1 + m₁m₂), getting a negative value.' },
                { id: 'b', prompt: 'Line L₁ passes through (1, 2) and (4, 6). Line L₂ has equation 2x - y + 3 = 0.', answer: 'Step 1: Slope of L₁ = (6-2)/(4-1) = 4/3',
                  options: ['Step 1: Slope of L₁ = (6-2)/(4-1) = 4/3', 'angle between lines'],
                  hint: 'If stuck, review c11_app_cbse_12_001 (slope calculation from points/equations) and.',
                  misconception: 'Students often forget the absolute value in the formula and compute tan θ = (m₁ - m₂)/(1 + m₁m₂), getting a negative value.' }
          ],
            remediations: { 'students-often-forget-the-absolute': { steps: ['Re-derive the formula with the student: θ = α₂ - α₁ → tan θ = tan(α₂ - α₁) = (tan α₂ - tan α₁)/(1 + tan α₁ tan α₂).', 'Draw two intersecting lines and label both acute and obtuse angles.', 'Ask: "Which angle does \'angle between lines\' mean?" (Acute, by convention).', 'Show that (m₂ - m₁)/(1 + m₁m₂) can be negative, but tan(acute angle) > 0.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_12_004', difficulty: 'standard',
          question: 'The equation of a straight line is a first-degree algebraic relation.',
          hint: 'If stuck, review **c11_app_cbse_12_001** (Slope definition and calculation from two.',
          misconception: '**Misconception:** "In the Normal Form $x \\cos \\alpha + y \\sin \\alpha = p$, the angle $\\alpha$ is the inclination.',
          parts: [
                { id: 'a', prompt: 'Write the equation of the line parallel to the y-axis and passing through the point $(-4, 5)$.', answer: 'The equation is $x = -4$',
                  options: ['The equation is $x = -4$', 'parallel to y-axis', 'parallel to x-axis'],
                  hint: 'If stuck, review **c11_app_cbse_12_001** (Slope definition and calculation from two points) and.',
                  misconception: '**Misconception:** "In the Normal Form $x \\cos \\alpha + y \\sin \\alpha = p$, the angle $\\alpha$ is the inclination of the line (angle the.' }
          ],
            remediations: { 'misconception-in-the-normal-form': { steps: ['Visual Proof.** Draw coordinate axes. Plot a line $L$. Drop perpendicular $ON$ from origin to $L$ meeting at $N$.', 'Slope Derivation.** Derive slope from Normal Form: $x \\cos \\alpha + y \\sin \\alpha = p \\Rightarrow y \\sin \\alpha = -x.', 'Drill.** Give 5 lines in Normal Form (e.g., $x \\cos 60^\\circ + y \\sin 60^\\circ = 2$, $x \\cos 120^\\circ + y \\sin.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_12_005', difficulty: 'standard',
          question: 'A circle is the locus of all points in a plane that are at a fixed positive.',
          hint: 'Review the distance formula and slope of perpendicular lines from the Straight Line node.',
          misconception: 'Students consistently write the centre of x² + y² + 2gx + 2fy + c = 0 as (g, f) instead of (-g, -f), and the radius.',
          parts: [
                { id: 'a', prompt: 'Determine whether the equation 2x² + 2y² - 8x + 12y + 26 = 0 represents a real circle, a point circle, or no real locus. Justify your answer.', answer: 'Divide by 2: x² + y² - 4x + 6y + 13 = 0',
                  options: ['Divide by 2: x² + y² - 4x + 6y + 13 = 0', 'no real circle', 'radius = 0 so not a circle'],
                  hint: 'Review the distance formula and slope of perpendicular lines from the Straight Line node.',
                  misconception: 'Students consistently write the centre of x² + y² + 2gx + 2fy + c = 0 as (g, f) instead of (-g, -f), and the radius as √c instead of √(g².' }
          ],
            remediations: { 'students-consistently-write-the-centre': { steps: ['Have the student expand (x - h)² + (y - k)² = r² to get x² + y² - 2hx - 2ky + (h² + k² - r²) = 0.', 'Compare term-by-term with x² + y² + 2gx + 2fy + c = 0 to see that 2g = -2h ⇒ g = -h, so h = -g; similarly k = -f.', 'Show that c = h² + k² - r² = g² + f² - r² ⇒ r² = g² + f² - c.', 'Practice 5 conversions from central to general and back, explicitly writing "h = -g, k = -f, r² = g² + f² - c" each.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_12_006', difficulty: 'standard',
          question: 'The properties of circles define the algebraic conditions that determine the.',
          hint: 'Review "Completing the Square" for expressions like $x^2 + 2gx$ and $y^2 + 2fy$.',
          misconception: 'Students consistently write the center of the circle $x^2 + y^2 + 2gx + 2fy + c = 0$ as $(g, f)$ instead of $(-g, -f)$.',
          parts: [
                { id: 'a', prompt: 'Explain why the equation $x^2 + y^2 - 4x + 6y + 13 = 0$ represents a point circle.', answer: 'For $x^2 + y^2 - 4x + 6y + 13 = 0$, we have $g=-2, f=3, c=13$',
                  options: ['For $x^2 + y^2 - 4x + 6y + 13 = 0$, we have $g=-2, f=3, c=13$', 'point circle', 'no real locus'],
                  hint: 'Review "Completing the Square" for expressions like $x^2 + 2gx$ and $y^2 + 2fy$ to convert between.',
                  misconception: 'Students consistently write the center of the circle $x^2 + y^2 + 2gx + 2fy + c = 0$ as $(g, f)$ instead of $(-g, -f)$.' },
                { id: 'b', prompt: 'A circle has the equation $x^2 + y^2 + 2gx + 2fy + c = 0$. It cuts the x-axis at points A and B such that AB = 10 units, and cuts the y-axis at points C and.', answer: 'Passes through origin $\\Rightarrow c = 0$',
                  options: ['Passes through origin $\\Rightarrow c = 0$', 'passes through origin'],
                  hint: 'Review "Completing the Square" for expressions like $x^2 + 2gx$ and $y^2 + 2fy$ to convert between.',
                  misconception: 'Students consistently write the center of the circle $x^2 + y^2 + 2gx + 2fy + c = 0$ as $(g, f)$ instead of $(-g, -f)$.' }
          ],
            remediations: { 'students-consistently-write-the-center': { steps: ['Write the general equation $x^2+y^2+2gx+2fy+c=0$ on paper.', 'Physically complete the square for x and y terms separately: $(x^2+2gx+g^2) + (y^2+2fy+f^2) = g^2+f^2-c$.', 'Factor: $(x+g)^2 + (y+f)^2 = g^2+f^2-c$.', 'Point to the binomials $(x+g)$ and $(y+f)$ and say: "The center is where these are zero: $x=-g, y=-f$."'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
