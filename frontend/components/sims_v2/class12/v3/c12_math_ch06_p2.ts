import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch06_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch06_p2: SimDef = {
    id: 'v3_c12_math_ch06_p2',
    title: 'Application of Derivatives · Part 2/2',
    subtitle: 'The balloon fills steadily — the radius doesn\'t',
    classLevel: 12, subject: 'mathematics', topic: 'Application of Derivatives · Part 2/2',
    chapters: ['c12_math_ch06'],
    nodeIds: ['c12_math_cbse_06_007', 'c12_math_cbse_06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Rate-of-change solver', intro: 'When two quantities share a clock, their rates are chained — learn to pull one through the other.', goal: 'Apply the chain rule to related rates — geometric, physical and economic.' },
    discovery: {
        question: 'A balloon fills at 900 cm³/s, yet its radius slows as it grows. How do you find how fast the radius rises at r = 15?',
        options: ['Differentiate the relation in time — dV/dt = 4πr²·dr/dt links the known rate to the unknown; the chain rule does the connecting', 'Divide dV/dt by r — the growth rate scales inversely with radius', 'The radius rises constantly — a steady inflow means a steady rise', 'Measure dr/dt directly — rates can only be observed, never derived'],
        answer: 'Differentiate the relation in time — dV/dt = 4πr²·dr/dt links the known rate to the unknown; the chain rule does the connecting',
        hook: 'dy/dx = (dy/dt)/(dx/dt) works only while dx/dt ≠ 0 — derivatives aren\'t fractions to cancel blindly. And in the marginal-cost answer, ₹30.015 is mathematically right but wrong on a bill: currency wants ₹30.02 — context is part of the computation.',
    },
    teaching: [
        { title: 'Word Problems: Maxima and Minima Applications', text: 'Word problems on maxima and minima involve translating a real-world situation into a mathematical function f(x) representing the quantity to be optimized (area, volume, cost, profit, distance, etc.).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_06_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Link two moving quantities: set up related rates for ripples, cubes and conical tanks, keep units honest, and interpret what the rate\'s sign is saying.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_007', title: 'Word Problems: Maxima and Minima Applications',
          scaffold: { problem: 'A square piece of tin of side 18 cm is to be made into a box without a top by cutting a square from each corner and folding up the flaps.',
            steps: [
            { text: 'Let x cm be the side of the square cut from each corner. After cutting and folding, the box has length = (18 - 2x).' },
            { text: 'Volume V(x) = x(18 - 2x)² = x(324 - 72x + 4x²) = 4x³ - 72x² + 324x. Practical domain: 0 < x < 9 (since 2x < 18).' },
            { text: 'Differentiate: V\'(x) = 12x² - 144x + 324 = 12(x² - 12x + 27) = 12(x - 3)(x - 9). Set V\'(x) = 0 → x = 3 or x = 9.' },
            { text: 'Second derivative test: V\'\'(x) = 24x - 144. V\'\'(3) = 72 - 144 = -72 < 0. So x = 3 gives local maximum.' },
            { text: 'Check endpoints for absolute maximum: V(0) = 0, V(3) = 3 × 12² = 432 cm³, V(9) = 0.', faded: true, blankAnswer: 'Cut squares of side 3 cm. Maximum volume = 432 cm³.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_008', title: 'Critical Points and Inflection Points',
          scaffold: { problem: 'A rectangular sheet of tin 45 cm by 24 cm is to be made into an open-top box by cutting equal squares from each corner and folding up the.',
            steps: [
            { text: 'Let \\( x \\) cm be the side of the square cut from each corner.' },
            { text: 'Volume \\( V(x) = x(45 - 2x)(24 - 2x) = x(1080 - 90x - 48x + 4x^2) = 4x^3 - 138x^2 + 1080x \\).' },
            { text: 'Find critical points: \\( V\'(x) = 12x^2 - 276x + 1080 = 12(x^2 - 23x + 90) = 12(x - 5)(x - 18) \\).' },
            { text: 'Use second derivative test: \\( V\'\'(x) = 24x - 276 \\). At \\( x = 5 \\), \\( V\'\'(5) = 120 - 276 = -156 < 0 \\) → local.' },
            { text: 'Check endpoints (though volume → 0 as \\( x \\to 0^+ \\) or \\( x \\to 12^- \\), so local max is absolute max).', faded: true, blankAnswer: 'Side of square to be cut off = 5 cm. Maximum volume = \\.' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_06_008', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior analyst plots weekly app downloads and declares \'growth phase continues — downloads are still above last month\'s level.\' You ask for the week-on-week change instead of the level.',
            decisions: [{ prompt: 'What does the first-derivative test reframe?', options: [
                { text: 'Direction lives in the derivative\'s sign, not the level — f stays strictly increasing only where f′(x) > 0; a high but falling curve is already in the decreasing stretch, so find where the change crosses zero and read the sign chart, not the height.', outcome: 'The chapter\'s rule: \'rising\' is a statement about rate of change — a function can sit at its all-time high and already be strictly decreasing.' },
                { text: 'Agree with the analyst — a higher value than last month is increase by definition.', outcome: 'That compares two isolated points, not an interval trend — monotonicity is about every pair inside the interval, and the derivative\'s sign is the test, not a snapshot comparison.', reveals: 'higher-equals-increasing' },
                { text: 'Wait for downloads to actually drop before calling it a decline — you can\'t call direction early.', outcome: 'The turning happens at the derivative\'s zero, before the level visibly falls — waiting for the drop concedes the entire decreasing interval that the sign chart already flagged.', reveals: 'decline-starts-at-the-drop' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_06_008', title: 'You made it',
          caseStudy: { intro: 'You can now turn \'how fast is it changing\' into an equation — chain rule as the bridge between what you know and what you need.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_06_007', difficulty: 'standard',
          question: 'Word problems on maxima and minima involve translating a real-world situation.',
          hint: 'If stuck on formulating the objective function, revisit Class 10 quadratic word problems.',
          misconception: 'Students often forget to check endpoints when finding absolute maxima/minima on a closed interval.',
          parts: [
                { id: 'a', prompt: 'A student solves the problem: "Find two positive numbers whose sum is 20 and product is maximum." They write: let numbers be x and y, x+y=20, P=xy.', answer: 'No, the solution is incomplete',
                  options: ['No, the solution is incomplete', 'minimum at x=10'],
                  hint: 'If stuck on formulating the objective function, revisit Class 10 quadratic word problems.',
                  misconception: 'Students often forget to check endpoints when finding absolute maxima/minima on a closed interval.' }
          ],
            remediations: { 'students-often-forget-to-check': { steps: ['Take the end points of the interval.', 'Calculate values at all points.', 'Identify max/min." (3) Have them re-solve 3 problems from Exercise 6.3 (Q13, Q17, Q21) writing explicitly: "Critical.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_008', difficulty: 'standard',
          question: 'A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the.',
          hint: 'If stuck, review derivative rules from **c11_math_cbse_13_009** and the first/second.',
          misconception: '**Misconception:** "Every point where \\( f\'\'(x)=0 \\) is an inflection point." **Reality:** \\( f\'\'(x)=0 \\) is only.',
          parts: [
                { id: 'a', prompt: 'Explain why \\( f(x)=x^3 \\) has a critical point at \\( x=0 \\) but it is NOT a local maximum or minimum. What is it instead?', answer: '\\( f\'(x)=3x^2 \\), so \\( f\'(0)=0 \\) → critical point',
                  options: ['\\( f\'(x)=3x^2 \\), so \\( f\'(0)=0 \\) → critical point', 'it\'s a minimum because \\( f\'\'(0)=0 \\) and \\( f\'\'\'(0)>0 \\)'],
                  hint: 'If stuck, review derivative rules from **c11_math_cbse_13_009** and the first/second derivative.',
                  misconception: '**Misconception:** "Every point where \\( f\'\'(x)=0 \\) is an inflection point." **Reality:** \\( f\'\'(x)=0 \\) is only a *candidate*; the.' }
          ],
            remediations: { 'misconception-every-point-where-f': { steps: ['If a student cannot distinguish critical points from inflection points or forgets to test sign change: 1.', 'Revisit **c12_math_cbse_06_003** (First Derivative Test) and **c12_math_cbse_06_004** (Second Derivative Test).', 'Practice the **sign chart method** for \\( f\' \\) and \\( f\'\' \\) on the same number line: draw a line, mark critical.', 'Do a targeted re-diagnostic: "Find inflection points of \\( f(x)=x^4-4x^3 \\) and explain why \\( x=0 \\) is an inflection.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
