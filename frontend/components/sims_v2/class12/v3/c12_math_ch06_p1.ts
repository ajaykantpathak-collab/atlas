import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch06_p1: SimDef = {
    id: 'v3_c12_math_ch06_p1',
    title: 'Application of Derivatives · Part 1/2',
    subtitle: 'The balloon fills steadily — the radius doesn\'t',
    classLevel: 12, subject: 'mathematics', topic: 'Application of Derivatives · Part 1/2',
    chapters: ['c12_math_ch06'],
    nodeIds: ['c12_math_cbse_06_001', 'c12_math_cbse_06_002', 'c12_math_cbse_06_003', 'c12_math_cbse_06_004', 'c12_math_cbse_06_005', 'c12_math_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Rate-of-change solver', intro: 'When two quantities share a clock, their rates are chained — learn to pull one through the other.', goal: 'Apply the chain rule to related rates — geometric, physical and economic.' },
    discovery: {
        question: 'A balloon fills at 900 cm³/s, yet its radius slows as it grows. How do you find how fast the radius rises at r = 15?',
        options: ['Differentiate the relation in time — dV/dt = 4πr²·dr/dt links the known rate to the unknown; the chain rule does the connecting', 'Divide 900 by r', 'It grows constantly', 'Measure it'],
        answer: 'Differentiate the relation in time — dV/dt = 4πr²·dr/dt links the known rate to the unknown; the chain rule does the connecting',
        hook: 'dy/dx = (dy/dt)/(dx/dt) works only while dx/dt ≠ 0 — derivatives aren\'t fractions to cancel blindly. And in the marginal-cost answer, ₹30.015 is mathematically right but wrong on a bill: currency wants ₹30.02 — context is part of the computation.',
    },
    teaching: [
        { title: 'Rate of Change of Quantities', text: 'The rate of change of a quantity y with respect to another quantity x is defined as the derivative dy/dx (or f\'(x)) where y = f(x).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_06_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Link two moving quantities: set up related rates for ripples, cubes and conical tanks, keep units honest, and interpret what the rate\'s sign is saying.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_001', title: 'Rate of Change of Quantities',
          scaffold: { problem: 'A spherical balloon is being inflated at 900 cm³/s. Find the rate at which the radius increases when the radius is 15 cm.',
            steps: [
            { text: 'Identify known and unknown. Given: dV/dt = 900 cm³/s (rate of volume increase). Find: dr/dt when r = 15 cm.' },
            { text: 'Write the geometric relation. Volume of sphere: V = (4/3)πr³.' },
            { text: 'Differentiate both sides with respect to time t using chain rule.' },
            { text: 'Substitute known values. 900 = 4π(15)² (dr/dt) = 4π(225) (dr/dt) = 900π (dr/dt).' },
            { text: 'Solve for dr/dt. dr/dt = 900 / (900π) = 1/π cm/s ≈ 0.318 cm/s.', faded: true, blankAnswer: 'dr/dt = 1/π cm/s ≈ 0.318 cm/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_002', title: 'Increasing and Decreasing Functions',
          scaffold: { problem: 'A company\'s profit (in ₹ lakhs) from producing \\( x \\) hundred units of a product is given by \\( P(x) = 2x^3 - 9x^2 + 12x + 1 \\).',
            steps: [
            { text: 'Identify the function and its domain. \\( P(x) = 2x^3 - 9x^2 + 12x + 1 \\), \\( x \\ge 0 \\) (production cannot be negative).' },
            { text: 'Compute the derivative. \\( P\'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x-1)(x-2) \\).' },
            { text: 'Find critical points by solving \\( P\'(x) = 0 \\). \\( 6(x-1)(x-2) = 0 \\implies x = 1, 2 \\).' },
            { text: 'Make a sign chart for \\( P\'(x) \\) on \\( [0, \\infty) \\). Test points: \\( x=0.5 \\in (0,1) \\Rightarrow P\'(0.5).' },
            { text: 'Write intervals with correct brackets (function is continuous).', faded: true, blankAnswer: 'Increasing on \\( [0, 1] \\) and \\( [2, \\infty) \\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_003', title: 'Maxima and Minima: First Derivative Test',
          scaffold: { problem: 'A manufacturer finds that the profit (in rupees) from selling \\(x\\) units of a product is given by \\(P(x) = -2x^3 + 21x^2 - 60x + 100\\).',
            steps: [
            { text: 'Compute the first derivative \\(P\'(x) = \\frac{d}{dx}(-2x^3 + 21x^2 - 60x + 100) = -6x^2 + 42x - 60\\).' },
            { text: 'Find critical points by solving \\(P\'(x) = 0\\): \\(-6x^2 + 42x - 60 = 0 \\Rightarrow x^2 - 7x + 10 = 0 \\Rightarrow.' },
            { text: 'Factor \\(P\'(x)\\) completely: \\(P\'(x) = -6(x-2)(x-5)\\). The leading coefficient \\(-6 < 0\\).' },
            { text: 'Construct sign chart for \\(P\'(x)\\) on intervals \\((-\\infty, 2)\\), \\((2, 5)\\), \\((5, \\infty)\\):' },
            { text: 'Apply First Derivative Test: At \\(x=2\\), \\(P\'(x)\\) changes from \\(-\\) to \\(+\\) ⇒ local minimum.' },
            { text: 'Compute maximum profit: \\(P(5) = -2(125) + 21(25) - 60(5) + 100 = -250 + 525 - 300 + 100 = 75\\) rupees.' },
            { text: 'Interpret: Since \\(x\\) represents units sold, \\(x=5\\) is valid. Maximum profit is ₹75 at 5 units.', faded: true, blankAnswer: 'Maximum profit of ₹75 occurs at 5 units.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_004', title: 'Maxima and Minima: Second Derivative Test',
          scaffold: { problem: 'A manufacturer can sell \\( x \\) items at a price of \\( \\left(5 - \\frac{x}{100}\\right) \\) rupees each.',
            steps: [
            { text: 'Write the selling price function \\( S(x) = x \\left(5 - \\frac{x}{100}\\right) = 5x - \\frac{x^2}{100} \\).' },
            { text: 'Profit \\( P(x) = S(x) - C(x) = 5x - \\frac{x^2}{100} - \\frac{x}{5} - 500 = \\frac{24x}{5} - \\frac{x^2}{100} - 500 \\).' },
            { text: 'Find critical point: \\( P\'(x) = \\frac{24}{5} - \\frac{2x}{100} = \\frac{24}{5} - \\frac{x}{50} \\).' },
            { text: 'Second derivative: \\( P\'\'(x) = -\\frac{1}{50} \\). Since \\( P\'\'(x) \\) is constant negative, \\( P\'\'(240) = -\\frac{1}{50} <.' },
            { text: 'By Second Derivative Test, \\( x=240 \\) gives a local maximum. Since it\'s the only critical point and \\( P(x) \\) is.', faded: true, blankAnswer: 'The manufacturer should sell 240 items to earn a maximum.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_005', title: 'Tangents and Normals to Curves',
          scaffold: { problem: 'A roller coaster track follows the curve y = x³ - 6x² + 9x + 2 (metres).',
            steps: [
            { text: 'Find the point of tangency. Substitute x = 2 into the curve: y = (2)³ - 6(2)² + 9(2) + 2 = 8 - 24 + 18 + 2 = 4.' },
            { text: 'Differentiate the curve to find the slope function. f\'(x) = d/dx(x³ - 6x² + 9x + 2) = 3x² - 12x + 9.' },
            { text: 'Evaluate the derivative at x = 2 to get the tangent slope. f\'(2) = 3(4) - 12(2) + 9 = 12 - 24 + 9 = -3.' },
            { text: 'Write the tangent equation using point-slope form: y - 4 = -3(x - 2). Simplify: y - 4 = -3x + 6 → 3x + y - 10 = 0.' },
            { text: 'Find the normal slope using perpendicular condition: m_normal = -1/m_tangent = -1/(-3) = 1/3.' },
            { text: 'Write the normal equation: y - 4 = (1/3)(x - 2). Simplify: 3y - 12 = x - 2 → x - 3y + 10 = 0.' },
            { text: 'Find the angle with positive x-axis. tan θ = m_tangent = -3. Since slope is negative, θ is in second quadrant: θ = π.', faded: true, blankAnswer: 'Tangent: 3x + y - 10 = 0; Normal: x - 3y + 10 = 0; Angle.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_006', title: 'Approximations Using Differentials',
          scaffold: { problem: 'A spherical soap bubble\'s radius increases from 5 cm to 5.02 cm due to heating.',
            steps: [
            { text: 'Identify the function and known values. Surface area of sphere: S(r) = 4πr². Initial radius r₀ = 5 cm.' },
            { text: 'Compute the derivative S\'(r) = d/dr (4πr²) = 8πr.' },
            { text: 'Evaluate derivative at r₀ = 5: S\'(5) = 8π(5) = 40π cm²/cm.' },
            { text: 'Compute differential dS = S\'(5) Δr = (40π)(0.02) = 0.8π ≈ 2.513 cm². This is the approximate increase in surface area.' },
            { text: 'Compute actual increase for verification: S(5.02) - S(5) = 4π(5.02)² - 4π(5)² = 4π(25.2004 - 25) = 4π(0.2004) = 0.8016π.' },
            { text: 'Compute percentage error in approximation: |Approx - Actual|/|Actual| × 100% = |0.8π - 0.8016π|/(0.8016π) × 100%.', faded: true, blankAnswer: 'Approximate increase ≈ 2.513 cm² (or 0.8π cm²). Actual.' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_06_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior analyst plots weekly app downloads and declares \'growth phase continues — downloads are still above last month\'s level.\' You ask for the week-on-week change instead of the level.',
            decisions: [{ prompt: 'What does the first-derivative test reframe?', options: [
                { text: 'Direction lives in the derivative\'s sign, not the level — f stays strictly increasing only where f′(x) > 0; a high but falling curve is already in the decreasing stretch, so find where the change crosses zero and read the sign chart, not the height.', outcome: 'The chapter\'s rule: \'rising\' is a statement about rate of change — a function can sit at its all-time high and already be strictly decreasing.' },
                { text: 'Agree with the analyst — a higher value than last month is increase by definition.', outcome: 'That compares two isolated points, not an interval trend — monotonicity is about every pair inside the interval, and the derivative\'s sign is the test, not a snapshot comparison.', reveals: 'higher-equals-increasing' },
                { text: 'Wait for downloads to actually drop before calling it a decline — you can\'t call direction early.', outcome: 'The turning happens at the derivative\'s zero, before the level visibly falls — waiting for the drop concedes the entire decreasing interval that the sign chart already flagged.', reveals: 'decline-starts-at-the-drop' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now turn \'how fast is it changing\' into an equation — chain rule as the bridge between what you know and what you need.',
            decisions: [{ prompt: 'What comes next? Application of Derivatives · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Application of Derivatives · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_06_001', difficulty: 'standard',
          question: 'The rate of change of a quantity y with respect to another quantity x.',
          hint: 'If stuck on chain rule, revisit c11_math_cbse_13_009 and practice 10 composite function.',
          misconception: 'Students write dA/dt = 2πr instead of dA/dt = 2πr (dr/dt) when differentiating A = πr² with respect to time.',
          parts: [
                { id: 'a', prompt: 'State the formula for the rate of change of y with respect to x when both x and y are functions of a parameter t.', answer: 'The formula is dy/dx = (dy/dt) / (dx/dt), valid only when dx/dt ≠ 0',
                  options: ['The formula is dy/dx = (dy/dt) / (dx/dt), valid only when dx/dt ≠ 0', 'cancel dt'],
                  hint: 'If stuck on chain rule, revisit c11_math_cbse_13_009 and practice 10 composite function derivatives.',
                  misconception: 'Students write dA/dt = 2πr instead of dA/dt = 2πr (dr/dt) when differentiating A = πr² with respect to time.' },
                { id: 'b', prompt: 'A cube\'s volume V = x³ where x is the edge length. If the volume increases at 9 cm³/s, a student writes dx/dt = 9 / (3x²) and then substitutes x = 10 to get.', answer: 'Yes, the method and answer are correct',
                  options: ['Yes, the method and answer are correct', 'rate of change of volume', 'rate of change of edge'],
                  hint: 'If stuck on chain rule, revisit c11_math_cbse_13_009 and practice 10 composite function derivatives.',
                  misconception: 'Students write dA/dt = 2πr instead of dA/dt = 2πr (dr/dt) when differentiating A = πr² with respect to time.' }
          ],
            remediations: { 'students-write-da-dt-2': { steps: ['Revisit Class 11 node c11_math_cbse_13_009 (Algebra of Derivatives: Chain Rule) — redo the 5 chain rule examples there.', 'Practice 3 problems where you MUST write the chain rule step as d/dt [f(r)] = f\'(r) · dr/dt before substituting numbers.', 'Re-diagnostic: Solve "A square\'s side increases at 2 cm/s.', 'Find dA/dt when s = 5 cm" — if you write dA/dt = 2s instead of 2s · ds/dt, repeat step 1.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_002', difficulty: 'standard',
          question: 'A function \\( f \\) is **strictly increasing** on an interval \\( I \\) if for any.',
          hint: 'If stuck, review derivative rules (product, quotient, chain) from c11_math_cbse_13_009.',
          misconception: '**“If \\( f\'(x) \\ge 0 \\), the function is strictly increasing.”** Many students write \\( f\'(x) \\ge 0 \\) as the condition.',
          parts: [
                { id: 'a', prompt: 'Explain why \\( f\'(x) > 0 \\) on an interval implies the function is strictly increasing there. Use the Mean Value Theorem in your reasoning.', answer: '**Correct explanation:** Take any \\( x_1 < x_2 \\) in the interval',
                  options: ['**Correct explanation:** Take any \\( x_1 < x_2 \\) in the interval', 'positive slope means going up'],
                  hint: 'If stuck, review derivative rules (product, quotient, chain) from c11_math_cbse_13_009 and.',
                  misconception: '**“If \\( f\'(x) \\ge 0 \\), the function is strictly increasing.”** Many students write \\( f\'(x) \\ge 0 \\) as the condition for *strict*.' }
          ],
            remediations: { 'if-f-x-ge-0': { steps: ['**Revisit derivative rules** (sum, product, quotient, chain) using c11_math_cbse_13_007, c11_math_cbse_13_009.', '**Practice sign analysis** of quadratic/cubic polynomials: solve \\( f\'(x)=0 \\), plot roots on a number line, test one.', 'Use c11_math_cbse_06_003 (linear inequalities) and c11_math_cbse_06_008 (quadratic inequalities) for the algebraic.', '**Re‑read the Mean Value Theorem** (NCERT Class 12 Chapter 5) to understand *why* \\( f\'>0 \\) forces \\( f(x_2)>f(x_1) \\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_003', difficulty: 'standard',
          question: 'The First Derivative Test determines the nature of a critical point \\(c\\).',
          hint: 'If stuck, revisit "Increasing and Decreasing Functions" (c12_math_cbse_06_002).',
          misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).',
          parts: [
                { id: 'a', prompt: 'A student claims: "If \\(f\'(c) = 0\\), then \\(c\\) must be either a local maximum or a local minimum." Is this statement true?', answer: '**Answer:** False',
                  options: ['**Answer:** False', 'derivative zero ⇒ extremum', '"derivative zero ⇒ extremum"'],
                  hint: 'If stuck, revisit "Increasing and Decreasing Functions" (c12_math_cbse_06_002) to practice.',
                  misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).' },
                { id: 'b', prompt: 'Compare the First Derivative Test and the Second Derivative Test. When would you prefer the First Derivative Test over the Second Derivative Test?', answer: '**Answer:** The First Derivative Test uses sign change of \\(f\'(x)\\)',
                  options: ['**Answer:** The First Derivative Test uses sign change of \\(f\'(x)\\)', 'Second Derivative Test is always easier'],
                  hint: 'If stuck, revisit "Increasing and Decreasing Functions" (c12_math_cbse_06_002) to practice.',
                  misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).' }
          ],
            remediations: { 'misconception-critical-points-only-occur': { steps: ['If a student dismisses non-differentiable points: 1.', '**Revisit definition:** Show the NCERT note: "A point \\(c\\) in the domain of a function \\(f\\) at which either.', '**Concrete example:** Work \\(f(x)=|x-2|\\) step-by-step: domain \\(\\mathbb{R}\\), \\(f\'(x)=1\\) for \\(x>2\\), \\(f\'(x)=-1\\).', 'Sign chart: \\(-\\) to \\(+\\) at \\(x=2\\) ⇒ local (and absolute) minimum at \\(x=2\\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).',
          parts: [
                { id: 'a', prompt: 'A student solved \\(f(x) = |x^2 - 4|\\) for local extrema and wrote: "\\(f\'(x) = 2x\\) for \\(x>2\\) and \\(x<-2\\), and \\(f\'(x) = -2x\\) for \\(-2<x<2\\).', answer: '**Errors:** 1',
                  options: ['**Errors:** 1', 'non-differentiable ⇒ not extrema', '"non-differentiable ⇒ not extrema"'],
                  hint: 'If stuck, revisit "Increasing and Decreasing Functions" (c12_math_cbse_06_002) to practice.',
                  misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).' }
          ],
            remediations: { 'misconception-critical-points-only-occur': { steps: ['If a student dismisses non-differentiable points: 1.', '**Revisit definition:** Show the NCERT note: "A point \\(c\\) in the domain of a function \\(f\\) at which either.', '**Concrete example:** Work \\(f(x)=|x-2|\\) step-by-step: domain \\(\\mathbb{R}\\), \\(f\'(x)=1\\) for \\(x>2\\), \\(f\'(x)=-1\\).', 'Sign chart: \\(-\\) to \\(+\\) at \\(x=2\\) ⇒ local (and absolute) minimum at \\(x=2\\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_004', difficulty: 'standard',
          question: 'The Second Derivative Test states that for a function \\( f \\) twice.',
          hint: 'If stuck on differentiation or solving \\( f\'(x)=0 \\), revisit c11_math_cbse_13_007.',
          misconception: 'Students often believe the Second Derivative Test *always* works and forget to check the failure condition \\( f\'\'(c)=0.',
          parts: [
                { id: 'a', prompt: 'State the three conditions of the Second Derivative Test for a critical point \\( c \\) where \\( f\'(c)=0 \\).', answer: 'Correct answer: (i) If \\( f\'\'(c) < 0 \\), \\( f \\) has a local maximum at \\( c \\)',
                  options: ['Correct answer: (i) If \\( f\'\'(c) < 0 \\), \\( f \\) has a local maximum at \\( c \\)', 'critical point', 'any point of interest'],
                  hint: 'If stuck on differentiation or solving \\( f\'(x)=0 \\), revisit c11_math_cbse_13_007 (polynomial.',
                  misconception: 'Students often believe the Second Derivative Test *always* works and forget to check the failure condition \\( f\'\'(c)=0 \\).' },
                { id: 'b', prompt: 'Explain why the Second Derivative Test fails for \\( f(x)=x^4 \\) at \\( x=0 \\), and determine the nature of the critical point using the First Derivative Test.', answer: 'Correct answer: \\( f\'(x)=4x^3 \\), so \\( f\'(0)=0 \\)',
                  options: ['Correct answer: \\( f\'(x)=4x^3 \\), so \\( f\'(0)=0 \\)', 'test fails', 'critical point', 'any point of interest'],
                  hint: 'If stuck on differentiation or solving \\( f\'(x)=0 \\), revisit c11_math_cbse_13_007 (polynomial.',
                  misconception: 'Students often believe the Second Derivative Test *always* works and forget to check the failure condition \\( f\'\'(c)=0 \\).' },
                { id: 'c', prompt: 'Find the local maxima and minima of \\( f(x)=2x^3-9x^2+12x+1 \\) using the Second Derivative Test. Show all steps.', answer: 'Correct answer: \\( f\'(x)=6x^2-18x+12=6(x-1)(x-2) \\)',
                  options: ['Correct answer: \\( f\'(x)=6x^2-18x+12=6(x-1)(x-2) \\)', 'critical point', 'any point of interest'],
                  hint: 'If stuck on differentiation or solving \\( f\'(x)=0 \\), revisit c11_math_cbse_13_007 (polynomial.',
                  misconception: 'Students often believe the Second Derivative Test *always* works and forget to check the failure condition \\( f\'\'(c)=0 \\).' },
                { id: 'd', prompt: 'Compare the First and Second Derivative Tests for the function \\( f(x)=x^3-3x+3 \\). Which test is more efficient and why?', answer: 'Correct answer: Both work',
                  options: ['Correct answer: Both work', 'critical point', 'any point of interest'],
                  hint: 'If stuck on differentiation or solving \\( f\'(x)=0 \\), revisit c11_math_cbse_13_007 (polynomial.',
                  misconception: 'Students often believe the Second Derivative Test *always* works and forget to check the failure condition \\( f\'\'(c)=0 \\).' }
          ],
            remediations: { 'the-second-derivative-test-always': { steps: ['If a student makes the above errors, immediately have them: 1.', 'Revisit the definition of a critical point (c12_math_cbse_06_008) — emphasise \\( f\'(c)=0 \\) OR \\( f \\) not.', 'Do a focused drill: given 5 functions, identify critical points, then for each, state whether Second Derivative Test.', 'Include \\( f(x)=|x| \\), \\( f(x)=x^4 \\), \\( f(x)=x^3 \\), \\( f(x)=\\sin x \\), \\( f(x)=e^x \\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_005', difficulty: 'standard',
          question: 'For a curve y = f(x) differentiable at point P(x₀, y₀), the tangent is the.',
          hint: 'If stuck on differentiation, revisit c11_math_cbse_13_009 (Algebra of Derivatives).',
          misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀).',
          parts: [
                { id: 'a', prompt: 'State the equation of the normal to the curve y = f(x) at the point (x₀, y₀) when f\'(x₀) = 2.', answer: 'The normal equation is y - y₀ = -1/2 (x - x₀)',
                  options: ['The normal equation is y - y₀ = -1/2 (x - x₀)', 'negative slope', 'negative reciprocal slope'],
                  hint: 'If stuck on differentiation, revisit c11_math_cbse_13_009 (Algebra of Derivatives).',
                  misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀), confusing "negative.' },
                { id: 'b', prompt: 'A student writes the tangent to y = x² at (2, 4) as y = 4x. Is this correct? Explain why or why not using the point-slope form.', answer: 'No, it\'s incorrect',
                  options: ['No, it\'s incorrect', 'negative slope', 'negative reciprocal slope'],
                  hint: 'If stuck on differentiation, revisit c11_math_cbse_13_009 (Algebra of Derivatives).',
                  misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀), confusing "negative.' },
                { id: 'c', prompt: 'Find the equation of the tangent to the curve y = 3x² - 4x + 5 at the point where x = 2.', answer: 'Step 1: y = 3x² - 4x + 5, so y₀ = 3(4) - 8 + 5 = 9',
                  options: ['Step 1: y = 3x² - 4x + 5, so y₀ = 3(4) - 8 + 5 = 9', 'negative slope', 'negative reciprocal slope'],
                  hint: 'If stuck on differentiation, revisit c11_math_cbse_13_009 (Algebra of Derivatives).',
                  misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀), confusing "negative.' },
                { id: 'd', prompt: 'The curve y = x³ - 3x has two tangents parallel to the line y = 6x - 1. Find their points of contact and compare their y-intercepts.', answer: 'f\'(x) = 3x² - 3',
                  options: ['f\'(x) = 3x² - 3', 'negative slope', 'negative reciprocal slope'],
                  hint: 'If stuck on differentiation, revisit c11_math_cbse_13_009 (Algebra of Derivatives).',
                  misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀), confusing "negative.' }
          ],
            remediations: { 'students-consistently-write-the-normal': { steps: ['Have them plot y = x² and draw tangent at (1, 1) with slope 2.', 'Ask them to draw a perpendicular line and estimate its slope visually (should be -1/2).', 'Review c11_math_cbse_10_007: if m₁m₂ = -1, then m₂ = -1/m₁.', 'Practice 5 problems where f\'(x₀) = 2, 3, -1/2, -4, 1/3, writing both tangent and normal each time.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_006', difficulty: 'standard',
          question: 'The differential of a function y = f(x) is defined as dy = f\'(x) dx, where.',
          hint: 'If stuck on derivative computation, revisit Class 11 differentiation rules.',
          misconception: 'Students treat dy = f\'(x)dx as an exact equality Δy = f\'(x)Δx and use it for large Δx, e.g., approximating √50 using.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The differential of a function y = f(x) is defined as dy = f\'(x) dx, where dx = Δx is a',
                  options: ['The differential of a function y = f(x) is defined as dy = f\'(x) dx, where dx = Δx is a', 'The rate of change of a quantity y with respect to another quantity x is defined as the', 'A function \\( f \\) is **strictly increasing** on an interval \\( I \\) if for any \\( x_1,', 'The First Derivative Test determines the nature of a critical point \\(c\\) (where'],
                  hint: 'If stuck on derivative computation, revisit Class 11 differentiation rules (c11_math_cbse_13_009).',
                  misconception: 'Students treat dy = f\'(x)dx as an exact equality Δy = f\'(x)Δx and use it for large Δx, e.g., approximating √50 using x₀=16 (Δx=34) giving.' }
          ],
            remediations: { 'students-treat-dy-f-x': { steps: ['If a student chooses a base point where |Δx|/x₀ > 10% or gets wrong error propagation: 1.', 'Revisit **c11_math_cbse_13_007** (Derivative of Polynomial Functions) to recompute f\'(x) correctly.', 'Revisit **c11_math_cbse_13_009** (Algebra of Derivatives) for chain rule on composite functions like √(x²+1).', 'Do a re-diagnostic: "Approximate √17 using x₀=16.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
