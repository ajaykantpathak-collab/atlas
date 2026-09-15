import type { SimDef } from '../../engine/types';
import C10_MathematicsRealNumbersSim from '../../../simulations/c6_12/C10_MathematicsRealNumbersSim';

/** v3 wrapped master — C10_MathematicsRealNumbersSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicsrealnumberssim: SimDef = {
    id: 'v3w_c10_mathematicsrealnumberssim',
    title: 'Real Numbers',
    subtitle: 'Covers word problems on HCF and LCM for two or three positive integers using the prime.',
    classLevel: 10, subject: 'mathematics', topic: 'Finding HCF and LCM from Word Problems',
    chapters: [],
    nodeIds: ['c10_math_cbse_01_012', 'c10_math_cbse_04_001', 'c10_math_cbse_04_002', 'c10_math_cbse_04_003', 'c10_math_cbse_04_010', 'c10_math_cbse_04_011', 'c10_math_cbse_05_003', 'c10_math_cbse_05_005', 'c10_math_cbse_05_007', 'c10_math_cbse_05_011', 'c10_math_cbse_05_012', 'c10_math_cbse_02_001', 'c10_math_cbse_02_003', 'c10_math_cbse_02_004', 'c10_math_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are organising a school event: you have 144 chocolate bars and 192 juice boxes, and you want to.', goal: 'Master Real Numbers.' },
    discovery: {
        question: 'An APPLY level question: Three traffic lights change after 48 seconds, 72 seconds, and 108 seconds respectively.',
        options: ['Step 1: Identify numbers: 48, 72, 108', 'simultaneous repetition', 'maximum grouping'],
        answer: 'Step 1: Identify numbers: 48, 72, 108',
        hook: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM,.',
    },
    teaching: [
        { title: 'Finding HCF and LCM from word problems.', text: 'Finding HCF and LCM from word problems involves translating a real-life situation into a mathematical problem that requires computing the Highest Common Factor (HCF) or the Least Common Multiple.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_012', title: 'Finding HCF and LCM from word problems.',
          scaffold: { problem: 'A school has 144 chocolate bars and 192 juice boxes for a picnic. They want to make identical gift packs using all items with no leftovers.',
            steps: [
            { text: 'Identify the given numbers: 144 chocolates, 192 juice boxes. The phrase "identical packs with no leftovers" means we.' },
            { text: 'Write prime factorisation of each number. 144 = 2 × 2 × 2 × 2 × 3 × 3 = 2⁴ × 3².' },
            { text: 'For HCF, take each common prime factor with the smallest exponent. Common primes: 2 and 3.' },
            { text: 'Maximum number of packs = HCF = 48. Chocolates per pack = 144 ÷ 48 = 3. Juice boxes per pack = 192 ÷ 48 = 4.' },
            { text: 'Verify: 48 packs × 3 chocolates = 144; 48 packs × 4 juice boxes = 192. No leftovers. Answer with units.', faded: true, blankAnswer: 'Maximum number of packs = 48. Each pack contains 3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_001', title: 'A quadratic equation in one variable x.',
          scaffold: { problem: 'A rectangular plot has length 3 metres more than its breadth. The area of the plot is 180 m².',
            steps: [
            { text: 'Let the breadth of the rectangular plot be x metres. Then length = (x + 3) metres.' },
            { text: 'Area of rectangle = length × breadth. So x(x + 3) = 180.' },
            { text: 'Expand the left side: x² + 3x = 180.' },
            { text: 'Bring all terms to one side to get standard form: x² + 3x - 180 = 0.' },
            { text: 'Compare with ax² + bx + c = 0. Here a = 1, b = 3, c = -180. Verify a ≠ 0 (true, a = 1).', faded: true, blankAnswer: 'Quadratic equation: x² + 3x - 180 = 0; coefficients: a = 1,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_002', title: 'Forming a quadratic equation from a.',
          scaffold: { problem: 'A rectangular park has length 10 metres more than its breadth. A 2-metre wide path runs around the inside of the park.',
            steps: [
            { text: 'Identify the unknown. Let breadth of the park = \\(x\\) metres. Then length = \\(x + 10\\) metres.' },
            { text: 'Determine dimensions of inner rectangle (park minus path). Path is 2 m wide on all sides, so inner breadth = \\(x - 4\\).' },
            { text: 'Write area expressions. Area of whole park = \\(x(x + 10) = x^2 + 10x\\).' },
            { text: 'Use given condition: Area of path = Area of park - Area of inner rectangle = 196 m².' },
            { text: 'Form equation: \\((x^2 + 10x) - (x^2 + 2x - 24) = 196\\).' },
            { text: 'Simplify carefully: \\(x^2 + 10x - x^2 - 2x + 24 = 196\\) → \\(8x + 24 = 196\\).' },
            { text: 'Wait! This is linear (\\(8x = 172\\)), not quadratic. Re-read problem: "path runs around the inside" — correct.', faded: true, blankAnswer: '\\(x^2 + 10x - 600 = 0\\) where \\(x\\) is breadth in metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_003', title: 'The method of solving a quadratic.',
          scaffold: { problem: 'A rectangular plot in a housing society has an area of 300 square metres. Its length is 5 metres more than twice its breadth.',
            steps: [
            { text: 'Let breadth = \\(x\\) metres. Then length = \\(2x + 5\\) metres. Area = length × breadth = \\(x(2x + 5) = 300\\).' },
            { text: 'Form quadratic equation: \\(2x^2 + 5x = 300 \\Rightarrow 2x^2 + 5x - 300 = 0\\). Identify \\(a = 2, b = 5, c = -300\\).' },
            { text: 'Find two numbers with sum \\(5\\) and product \\(2 \\times (-300) = -600\\).' },
            { text: 'Let breadth = \\(x\\) metres. Then length = \\(x + 10\\) metres. Area = length × breadth = \\(x(x + 10) = 200\\).' },
            { text: 'Form quadratic equation: \\(x^2 + 10x = 200 \\Rightarrow x^2 + 10x - 200 = 0\\). Identify \\(a = 1, b = 10, c = -200\\).' },
            { text: 'Find two numbers with sum \\(10\\) and product \\(1 \\times (-200) = -200\\).' },
            { text: 'Split middle term: \\(x^2 + 20x - 10x - 200 = 0\\). Group: \\(x(x + 20) - 10(x + 20) = 0\\).' },
            { text: 'Apply zero-product property: \\(x + 20 = 0 \\Rightarrow x = -20\\) (reject, breadth cannot be negative) or \\(x - 10 = 0.', faded: true, blankAnswer: 'Breadth = 10 metres, Length = 20 metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_010', title: 'For a quadratic equation \\(ax^2 + bx +.',
          scaffold: { problem: 'A rectangular plot in a housing society has a perimeter of 60 metres. The residents want the area to be at least 250 m². Is it possible?',
            steps: [
            { text: 'Let the length be \\(x\\) metres. Then breadth = \\(\\frac{60}{2} - x = 30 - x\\) metres.' },
            { text: 'Area = \\(x(30 - x) = 30x - x^2\\). We want area \\(\\ge 250\\) → \\(-x^2 + 30x - 250 \\ge 0\\) → \\(x^2 - 30x + 250 \\le 0\\).' },
            { text: 'Consider the related equation \\(x^2 - 30x + 250 = 0\\). Identify coefficients: \\(a = 1\\), \\(b = -30\\), \\(c = 250\\).' },
            { text: 'Compute discriminant: \\(D = (-30)^2 - 4(1)(250) = 900 - 1000 = -100\\).' },
            { text: 'Since \\(D < 0\\), the quadratic \\(x^2 - 30x + 250\\) has no real roots.' },
            { text: 'Conclusion: It is **not possible** to have a rectangle with perimeter 60 m and area ≥ 250 m².', faded: true, blankAnswer: 'No, it is not possible. The discriminant is \\(-100 < 0\\),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_011', title: 'Word problems involving quadratic.',
          scaffold: { problem: 'A rectangular park in a housing society has an area of 500 m². Its length is 5 m more than twice its breadth.',
            steps: [
            { text: 'Identify the unknown. Let the breadth of the park be \\(x\\) metres. Then length = \\(2x + 5\\) metres.' },
            { text: 'Use the area formula for a rectangle: Area = length × breadth. Substitute: \\(x(2x + 5) = 500\\).' },
            { text: 'Simplify to standard quadratic form: \\(2x^2 + 5x - 500 = 0\\).' },
            { text: 'Solve by factorisation. Split middle term: \\(2x^2 + 35x - 20x - 500 = 0\\) → \\(x(2x + 35) - 10(2x + 35) = 0\\) → \\((x -.' },
            { text: 'Interpret roots. Breadth cannot be negative, so reject \\(x = -17.5\\). Breadth = 10 m. Length = \\(2(10) + 5 = 25\\) m.' },
            { text: 'Let breadth = \\(x\\) m. Then length = \\(x + 5\\) m.' },
            { text: 'Area = length × breadth = \\(x(x+5) = 300\\).' },
            { text: 'Standard form: \\(x^2 + 5x - 300 = 0\\).' },
            { text: 'Factorise: \\(x^2 + 20x - 15x - 300 = 0\\) → \\(x(x+20) - 15(x+20) = 0\\) → \\((x-15)(x+20)=0\\).' },
            { text: 'Reject negative root. Breadth = 15 m, Length = 20 m.', faded: true, blankAnswer: 'Breadth = 15 m, Length = 20 m.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_04_001', title: 'Identify each idea',
          dissect: { specimen: 'Real Numbers', spots: [
            { id: 's1', label: 'Finding HCF and LCM from', prompt: 'Which idea is this? — Finding HCF and LCM from word problems involves translating a real-life situation into a.', answer: 'Finding HCF and LCM from', options: ['Finding HCF and LCM from', 'A quadratic equation in one', 'Forming a quadratic equation from', 'The method of solving a'] },
            { id: 's2', label: 'A quadratic equation in one', prompt: 'Which idea is this? — A quadratic equation in one variable x is an equation of the form ax² + bx + c = 0, where.', answer: 'A quadratic equation in one', options: ['A quadratic equation in one', 'Finding HCF and LCM from', 'Forming a quadratic equation from', 'The method of solving a'] },
            { id: 's3', label: 'Forming a quadratic equation from', prompt: 'Which idea is this? — Forming a quadratic equation from a real-life situation is the process of translating a.', answer: 'Forming a quadratic equation from', options: ['Forming a quadratic equation from', 'Finding HCF and LCM from', 'A quadratic equation in one', 'The method of solving a'] },
            { id: 's4', label: 'The method of solving a', prompt: 'Which idea is this? — The method of solving a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b, c \\in.', answer: 'The method of solving a', options: ['The method of solving a', 'Finding HCF and LCM from', 'A quadratic equation in one', 'Forming a quadratic equation from'] },
            { id: 's5', label: 'For a quadratic equation ax2', prompt: 'Which idea is this? — For a quadratic equation \\(ax^2 + bx + c = 0\\) with real coefficients \\(a, b, c\\) and \\(a.', answer: 'For a quadratic equation ax2', options: ['For a quadratic equation ax2', 'Finding HCF and LCM from', 'A quadratic equation in one', 'Forming a quadratic equation from'] },
            { id: 's6', label: 'Word problems involving quadratic equations', prompt: 'Which idea is this? — Word problems involving quadratic equations require translating a real-life situation.', answer: 'Word problems involving quadratic equations', options: ['Word problems involving quadratic equations', 'Finding HCF and LCM from', 'A quadratic equation in one', 'Forming a quadratic equation from'] }
          ] } }
    ],
    explore: { component: C10_MathematicsRealNumbersSim, prompt: 'Explore the interactive — Real Numbers' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_01_012', difficulty: 'standard',
          question: 'Finding HCF and LCM from word problems involves translating a real-life.',
          hint: 'If stuck, revisit c10_math_cbse_01_002 (HCF and LCM by Prime Factorisation Method) and.',
          misconception: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM,.',
          parts: [
                { id: 'a', prompt: 'An APPLY level question: Three traffic lights change after 48 seconds, 72 seconds, and 108 seconds respectively.', answer: 'Step 1: Identify numbers: 48, 72, 108',
                  options: ['Step 1: Identify numbers: 48, 72, 108', 'simultaneous repetition', 'maximum grouping'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM, without reading the.' }
          ],
            remediations: { 'students-often-see-the-phrase': { steps: ['Ask the student to circle the keywords: "divisible by", "leaves remainder", "identical groups", "simultaneously",.', 'Make a decision table: "Divisible by / multiple of / together again" → LCM; "Divides / groups / packs / greatest number.', 'Practice 5 problems where the only task is to write "HCF" or "LCM" and explain why, without computing.', 'Re-attempt the failed problem using the table.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM,.',
          parts: [
                { id: 'a', prompt: 'An EVALUATE level question: A student solved: "Find the greatest number of 4 digits exactly divisible by 12, 18, and 24." Their working: LCM of 12, 18, 24 =.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'greatest number', 'divisible by 12, 18, 24'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM, without reading the.' }
          ],
            remediations: { 'students-often-see-the-phrase': { steps: ['Ask the student to circle the keywords: "divisible by", "leaves remainder", "identical groups", "simultaneously",.', 'Make a decision table: "Divisible by / multiple of / together again" → LCM; "Divides / groups / packs / greatest number.', 'Practice 5 problems where the only task is to write "HCF" or "LCM" and explain why, without computing.', 'Re-attempt the failed problem using the table.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_001', difficulty: 'standard',
          question: 'A quadratic equation in one variable x is an equation of the form ax² + bx + c.',
          hint: 'If stuck, revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions: Splitting the.',
          misconception: 'Students often identify an equation as quadratic simply because they see an x² term in the *original* unsimplified.',
          parts: [
                { id: 'a', prompt: 'Explain why the equation x² + 3x = x² - 5 is NOT a quadratic equation, even though it contains an x² term initially.', answer: 'Subtract x² from both sides: 3x = -5 → 3x + 5 = 0',
                  options: ['Subtract x² from both sides: 3x = -5 → 3x + 5 = 0', 'x² appears in the original equation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often identify an equation as quadratic simply because they see an x² term in the *original* unsimplified form, without expanding.' },
                { id: 'b', prompt: 'A student claims: "Any equation with an x² term is a quadratic equation." Give a counterexample and explain why the claim is false.', answer: 'Counterexample: x² + 2x = x² - 3',
                  options: ['Counterexample: x² + 2x = x² - 3', 'contains x²', 'is of degree 2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often identify an equation as quadratic simply because they see an x² term in the *original* unsimplified form, without expanding.' }
          ],
            remediations: { 'students-often-identify-an-equation': { steps: ['Give the student three equations — one that simplifies to linear (e.g., x² + 3x = x² - 2), one identity (e.g., (x+2)² =.', 'Ask them to expand, simplify, and write each in standard form.', 'Have them explicitly state the highest power of x and the coefficient of x² in each simplified form.', 'Guide them to articulate the rule: "After full simplification, if the highest power is exactly 2 and its coefficient is.', 'Practice with 5 mixed examples until they consistently simplify first, then classify.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often identify an equation as quadratic simply because they see an x² term in the *original* unsimplified.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Any equation with an x² term is a quadratic equation." Give a counterexample and explain why the claim is false.', answer: 'Counterexample: x² + 2x = x² - 3',
                  options: ['Counterexample: x² + 2x = x² - 3', 'contains x²', 'is of degree 2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often identify an equation as quadratic simply because they see an x² term in the *original* unsimplified form, without expanding.' }
          ],
            remediations: { 'students-often-identify-an-equation': { steps: ['Give the student three equations — one that simplifies to linear (e.g., x² + 3x = x² - 2), one identity (e.g., (x+2)² =.', 'Ask them to expand, simplify, and write each in standard form.', 'Have them explicitly state the highest power of x and the coefficient of x² in each simplified form.', 'Guide them to articulate the rule: "After full simplification, if the highest power is exactly 2 and its coefficient is.', 'Practice with 5 mixed examples until they consistently simplify first, then classify.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_002', difficulty: 'standard',
          question: 'Forming a quadratic equation from a real-life situation is the process of.',
          hint: 'If stuck, revisit "Setting Up Equations from Word Problems" (c7_math_ch15_007) and.',
          misconception: '**The "Missing Zero" and "Sign Drop" Errors:** 1. **Missing Zero:** Students write \\(x(x+5) = 150\\) and stop, or write.',
          parts: [
                { id: 'a', prompt: 'The product of two consecutive positive integers is 306. Form the quadratic equation in standard form taking the smaller integer as \\(x\\).', answer: '**Step 1:** Let smaller integer = \\(x\\)',
                  options: ['**Step 1:** Let smaller integer = \\(x\\)', 'positive integers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Missing Zero" and "Sign Drop" Errors:** 1. **Missing Zero:** Students write \\(x(x+5) = 150\\) and stop, or write \\(x^2 + 5x = 150\\),.' }
          ],
            remediations: { 'the-missing-zero-and-sign': { steps: ['Diagnose the specific error.** Ask the student to show the step where they moved the constant term.', 'Re-teach transposition with a mini-example.** \\(x + 5 = 12 \\Rightarrow x = 12 - 5\\).', 'Drill standard form conversion.** Give 5 equations like \\(x(x-3)=40\\), \\(2x^2 = 5x + 12\\), \\((x+2)^2 = 25\\) and ask to.', 'For expansion errors, revisit \\((a+b)^2\\) visually.** Draw a square of side \\(x+7\\), partition into \\(x^2\\), \\(7x\\),.', 'Enforce "Reject and Reason" habit.** For every solved equation, require a one-line rejection statement for extraneous.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_003', difficulty: 'standard',
          question: 'The method of solving a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b,.',
          hint: 'Revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions: Splitting the Middle Term).',
          misconception: 'Students often write the product condition as \\(pq = c\\) instead of \\(pq = ac\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The method of solving a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b, c \\in',
                  options: ['The method of solving a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b, c \\in', 'Finding HCF and LCM from word problems involves translating a real-life situation into a', 'A quadratic equation in one variable x is an equation of the form ax² + bx + c = 0, where', 'Forming a quadratic equation from a real-life situation is the process of translating a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the product condition as \\(pq = c\\) instead of \\(pq = ac\\).' }
          ],
            remediations: { 'students-often-write-the-product': { steps: ['If a student makes the \\(pq = c\\) error, immediately return to the algebraic derivation: \\((px + r)(qx + s) = pqx^2 +.', 'Here \\(a = pq\\), \\(b = ps + qr\\), \\(c = rs\\).', 'The product of the "split numbers" \\(ps\\) and \\(qr\\) is \\(ps \\times qr = pq \\times rs = ac\\).', 'Have the student verify with \\(2x^2 + 7x + 3\\): expand \\((2x+1)(x+3) = 2x^2 + 6x + x + 3\\).'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_010', difficulty: 'standard',
          question: 'For a quadratic equation \\(ax^2 + bx + c = 0\\) with real coefficients \\(a, b,.',
          hint: 'Revisit node c10_math_cbse_04_007 (Nature of Roots: The Discriminant) and practice.',
          misconception: '**Misconception:** "If the discriminant is negative, the quadratic equation has **no solution**." **Exact wrong step:**.',
          parts: [
                { id: 'a', prompt: 'Consider the quadratic equation \\(px^2 - 2\\sqrt{5}px + 15 = 0\\) where \\(p\\) is a non-zero real constant. It is given that the equation has **no real roots**.', answer: '**Step 1:** Coefficients: \\(a = p\\), \\(b = -2\\sqrt{5}p\\), \\(c = 15\\)',
                  options: ['**Step 1:** Coefficients: \\(a = p\\), \\(b = -2\\sqrt{5}p\\), \\(c = 15\\)', 'p can be negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "If the discriminant is negative, the quadratic equation has **no solution**." **Exact wrong step:** Students write "No.' }
          ],
            remediations: { 'misconception-if-the-discriminant-is': { steps: ['** Ask the student to complete the square for \\(x^2 - 4x + 5\\) and observe it becomes \\((x-2)^2 + 1\\).', '** Show the graph of \\(y = x^2 - 4x + 5\\) — it\'s a parabola opening upward with vertex at (2,1), entirely above the.', '** For inequality errors, make them solve \\(k^2 < 24\\) on a number line: plot \\(\\pm\\sqrt{24}\\), test a point (e.g.,.', '** Practice writing the exact phrase: **"The equation has no real roots because \\(D < 0\\)."** Insist on "real" every.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "If the discriminant is negative, the quadratic equation has **no solution**." **Exact wrong step:**.',
          parts: [
                { id: 'a', prompt: 'Consider the quadratic equation \\(px^2 - 2\\sqrt{5}px + 15 = 0\\) where \\(p\\) is a non-zero real constant. It is given that the equation has **no real roots**.', answer: '**Step 1:** Coefficients: \\(a = p\\), \\(b = -2\\sqrt{5}p\\), \\(c = 15\\)',
                  options: ['**Step 1:** Coefficients: \\(a = p\\), \\(b = -2\\sqrt{5}p\\), \\(c = 15\\)', 'p can be negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "If the discriminant is negative, the quadratic equation has **no solution**." **Exact wrong step:** Students write "No.' }
          ],
            remediations: { 'misconception-if-the-discriminant-is': { steps: ['** Ask the student to complete the square for \\(x^2 - 4x + 5\\) and observe it becomes \\((x-2)^2 + 1\\).', '** Show the graph of \\(y = x^2 - 4x + 5\\) — it\'s a parabola opening upward with vertex at (2,1), entirely above the.', '** For inequality errors, make them solve \\(k^2 < 24\\) on a number line: plot \\(\\pm\\sqrt{24}\\), test a point (e.g.,.', '** Practice writing the exact phrase: **"The equation has no real roots because \\(D < 0\\)."** Insist on "real" every.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_011', difficulty: 'standard',
          question: 'Word problems involving quadratic equations require translating a real-life.',
          hint: 'If stuck, revisit c10_math_cbse_04_002 (Forming Quadratic Equations) and.',
          misconception: 'Students often solve the quadratic equation correctly but forget to reject the extraneous root (e.g., negative time,.',
          parts: [
                { id: 'a', prompt: 'A student forms the equation \\(x^2 - 5x + 6 = 0\\) from a problem about two consecutive positive integers whose product is 6.', answer: 'The answer is incomplete',
                  options: ['The answer is incomplete', 'yes, roots are the answer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often solve the quadratic equation correctly but forget to reject the extraneous root (e.g., negative time, negative length, or a.' }
          ],
            remediations: { 'students-often-solve-the-quadratic': { steps: ['If a student includes extraneous roots, follow these steps: (1) Ask them to read the problem statement again and.', '(2) Have them write the constraint as an inequality (e.g., \\(x > 0\\)).', '(3) Check each root against the inequality.', '(4) Practice 5 problems where they must write a "Rejection Statement" for each invalid root before writing the final.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
