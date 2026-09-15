import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch04_p1: SimDef = {
    id: 'v3_c10_math_ch04_p1',
    title: 'Quadratic Equations · Part 1/2',
    subtitle: 'Predict how many answers an equation has before solving it',
    classLevel: 10, subject: 'mathematics', topic: 'Quadratic Equations · Part 1/2',
    chapters: ['c10_math_ch04'],
    nodeIds: ['c10_math_cbse_04_001', 'c10_math_cbse_04_002', 'c10_math_cbse_04_003', 'c10_math_cbse_04_004', 'c10_math_cbse_04_005', 'c10_math_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a problem-solver decoding curved paths', intro: 'Rockets, rain gutters and rectangular fields all ask the same question: given ax² + bx + c = 0, when does it hit zero? Your tools: factoring, completing the square, and one famous formula.', goal: 'Solve quadratic equations by three methods and use the discriminant to predict the nature of roots.' },
    discovery: {
        question: 'A javelin\'s height follows h = −5t² + 20t. Ask \'when does it land?\' and you\'re solving a quadratic — one answer at takeoff (t = 0), one at landing (t = 4). Why does this single question get TWO answers?',
        options: ['Because a quadratic\'s graph is a parabola — a horizontal line can meet it twice, once, or not at all, matching the discriminant\'s verdict', 'Because time flows forwards and backwards simultaneously', 'Because the javelin secretly lands twice in reality', 'Because all equations in physics give double answers'],
        answer: 'Because a quadratic\'s graph is a parabola — a horizontal line can meet it twice, once, or not at all, matching the discriminant\'s verdict',
        hook: 'The discriminant b² − 4ac is a fortune-teller: positive means two landings, zero means a perfect graze, negative means the event never happens. Two answers isn\'t a bug — it\'s parabola geometry.',
    },
    teaching: [
        { title: 'Quadratic Equations: Standard Form and Identification', text: 'A quadratic equation in one variable x is an equation of the form ax² + bx + c = 0, where a, b, c are real numbers and a ≠ 0.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_04_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Solve quadratics three different ways — factorisation, completing the square, and the formula — then let the discriminant predict whether your answers even exist before you compute them.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_001', title: 'Quadratic Equations: Standard Form and Identification',
          scaffold: { problem: 'A rectangular plot has length 3 metres more than its breadth. The area of the plot is 180 m².',
            steps: [
            { text: 'Let the breadth of the rectangular plot be x metres. Then length = (x + 3) metres.' },
            { text: 'Area of rectangle = length × breadth. So x(x + 3) = 180.' },
            { text: 'Expand the left side: x² + 3x = 180.' },
            { text: 'Bring all terms to one side to get standard form: x² + 3x - 180 = 0.' },
            { text: 'Compare with ax² + bx + c = 0. Here a = 1, b = 3, c = -180. Verify a ≠ 0 (true, a = 1).', faded: true, blankAnswer: 'Quadratic equation: x² + 3x - 180 = 0; coefficients: a = 1.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_002', title: 'Forming Quadratic Equations from Real-Life Situations',
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
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_003', title: 'Solution by Factorisation: Splitting the Middle Term',
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
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_004', title: 'Solution by Completing the Square: Method and Steps',
          scaffold: { problem: 'A rectangular plot in a housing society has an area of 300 m². Its length is 10 m more than its breadth.',
            steps: [
            { text: 'Let breadth = \\(x\\) metres. Then length = \\(x + 10\\) metres. Area = length × breadth = \\(x(x+10) = 300\\).' },
            { text: 'Write in standard form: \\(x^2 + 10x - 300 = 0\\). Here \\(a=1, b=10, c=-300\\).' },
            { text: 'Move constant to RHS: \\(x^2 + 10x = 300\\).' },
            { text: 'Half of coefficient of \\(x\\) is \\(10/2 = 5\\). Square it: \\(5^2 = 25\\).' },
            { text: 'LHS is a perfect square: \\((x+5)^2 = 325\\).' },
            { text: 'Take square root: \\(x+5 = \\pm \\sqrt{325} = \\pm \\sqrt{25 \\times 13} = \\pm 5\\sqrt{13}\\).' },
            { text: 'Since breadth cannot be negative, \\(x = -5 + 5\\sqrt{13}\\) (approx \\(5 \\times 3.606 - 5 = 13.03\\) m).', faded: true, blankAnswer: 'Breadth = \\(5(\\sqrt{13} - 1)\\) m ≈ 13.03 m, Length.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_005', title: 'Quadratic Formula: Derivation from Completing the Square',
          scaffold: { problem: 'Derive the quadratic formula from the general quadratic equation \\(ax^2 + bx + c = 0\\) (\\(a \\neq 0\\)) by completing the square.',
            steps: [
            { text: 'Write the standard form and divide every term by \\(a\\) (since \\(a \\neq 0\\)): \\(x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0\\).' },
            { text: 'Transpose the constant term to the RHS: \\(x^2 + \\frac{b}{a}x = -\\frac{c}{a}\\).' },
            { text: 'To complete the square on the LHS, take half the coefficient of \\(x\\) (which is \\(\\frac{b}{2a}\\)) and square.' },
            { text: 'The LHS is now a perfect square: \\(\\left(x + \\frac{b}{2a}\\right)^2\\).' },
            { text: 'Take square root on both sides (remember \\(\\pm\\)): \\(x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}\\).' },
            { text: 'Isolate \\(x\\): \\(x = -\\frac{b}{2a} \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\).', faded: true, blankAnswer: '\\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\) (with condition.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_04_006', title: 'Quadratic Formula: Direct Application to Solve Equations',
          scaffold: { problem: 'A rectangular plot in a housing society in Bengaluru has an area of 300 m². The length is 5 metres more than twice the breadth.',
            steps: [
            { text: 'Let breadth = \\(x\\) metres. Then length = \\(2x + 5\\) metres. Area = length × breadth = \\(x(2x + 5) = 300\\).' },
            { text: 'Form the quadratic equation: \\(2x^2 + 5x - 300 = 0\\). Identify coefficients: \\(a = 2\\), \\(b = 5\\), \\(c = -300\\).' },
            { text: 'Write the quadratic formula: \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\).' },
            { text: 'Compute discriminant: \\(D = 25 - 4(2)(-300) = 25 + 2400 = 2425\\).' },
            { text: '\\(x = \\frac{-5 \\pm 5\\sqrt{97}}{4}\\). Since breadth > 0, take the positive root: \\(x = \\frac{-5 + 5\\sqrt{97}}{4}.' },
            { text: 'Verify: Area ≈ 11.06 × 27.12 ≈ 300 m² (matches). Discard negative root as breadth cannot be negative.', faded: true, blankAnswer: 'Breadth = \\(\\frac{5(\\sqrt{97} - 1)}{4}\\) m (≈ 11.06 m).' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_04_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A family buys a rectangular plot: the length is 3 metres more than the breadth and the area is 180 m². Father guesses \'just divide 180 by 3 to get the length\' and starts measuring 60 metres along the ground.',
            decisions: [{ prompt: 'How should the dimensions actually be found?', options: [
                { text: 'Let the breadth be x, so length is x + 3 and x(x + 3) = 180 gives the quadratic x² + 3x - 180 = 0, which factorises as (x + 15)(x - 12) = 0 — so breadth is 12 m and length 15 m. The \'3 more\' relationship multiplies through the whole equation; it cannot be handled by dividing the area by 3.', outcome: 'Translating \'length is 3 more than breadth\' into x and x + 3, then solving the quadratic, is the correct route — and 12 × 15 = 180 checks.' },
                { text: 'Father\'s shortcut works — 180 divided by 3 gives the 60 m length because the difference between the sides is 3.', outcome: 'The 3 is a difference between the sides, not a divisor of the area; 60 × 57 would give 3420 m², not 180.', reveals: 'divide-area-by-difference' },
                { text: 'The problem is unsolvable as stated — you would need the perimeter as well to find two unknowns.', outcome: 'The area relation x(x+3) = 180 already pins down x — one quadratic equation in one unknown is enough.', reveals: 'quadratic-needs-second-equation' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Projectile paths, profit curves, area puzzles — all parabolas in disguise. Master the discriminant and you can predict the number of answers before doing any solving.',
            decisions: [{ prompt: 'What comes next? Quadratic Equations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Quadratic Equations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_04_001', difficulty: 'standard',
          question: 'A quadratic equation in one variable x is an equation of the form ax² + bx +.',
          hint: 'If stuck, revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions: Splitting the.',
          misconception: 'Students often identify an equation as quadratic simply because they see an x² term in the *original* unsimplified.',
          parts: [
                { id: 'a', prompt: 'Explain why the equation x² + 3x = x² - 5 is NOT a quadratic equation, even though it contains an x² term initially.', answer: 'Subtract x² from both sides: 3x = -5 → 3x + 5 = 0',
                  options: ['Subtract x² from both sides: 3x = -5 → 3x + 5 = 0', 'x² appears in the original equation'],
                  hint: 'If stuck, revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions: Splitting the Middle Term).',
                  misconception: 'Students often identify an equation as quadratic simply because they see an x² term in the *original* unsimplified form, without expanding.' },
                { id: 'b', prompt: 'A student claims: "Any equation with an x² term is a quadratic equation." Give a counterexample and explain why the claim is false.', answer: 'Counterexample: x² + 2x = x² - 3',
                  options: ['Counterexample: x² + 2x = x² - 3', 'contains x²', 'is of degree 2'],
                  hint: 'If stuck, revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions: Splitting the Middle Term).',
                  misconception: 'Students often identify an equation as quadratic simply because they see an x² term in the *original* unsimplified form, without expanding.' }
          ],
            remediations: { 'students-often-identify-an-equation': { steps: ['Give the student three equations — one that simplifies to linear (e.g., x² + 3x = x² - 2), one identity (e.g., (x+2)².', 'Ask them to expand, simplify, and write each in standard form.', 'Have them explicitly state the highest power of x and the coefficient of x² in each simplified form.', 'Guide them to articulate the rule: "After full simplification, if the highest power is exactly 2 and its coefficient.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_002', difficulty: 'standard',
          question: 'Forming a quadratic equation from a real-life situation is the process.',
          hint: 'If stuck, revisit "Setting Up Equations from Word Problems" (c7_math_ch15_007) and.',
          misconception: '**The "Missing Zero" and "Sign Drop" Errors:** 1. **Missing Zero:** Students write \\(x(x+5) = 150\\) and stop, or write.',
          parts: [
                { id: 'a', prompt: 'The product of two consecutive positive integers is 306. Form the quadratic equation in standard form taking the smaller integer as \\(x\\).', answer: '**Step 1:** Let smaller integer = \\(x\\)',
                  options: ['**Step 1:** Let smaller integer = \\(x\\)', 'positive integers'],
                  hint: 'If stuck, revisit "Setting Up Equations from Word Problems" (c7_math_ch15_007) and "Algebraic.',
                  misconception: '**The "Missing Zero" and "Sign Drop" Errors:** 1. **Missing Zero:** Students write \\(x(x+5) = 150\\) and stop, or write \\(x^2 + 5x = 150\\).' }
          ],
            remediations: { 'the-missing-zero-and-sign': { steps: ['Diagnose the specific error.** Ask the student to show the step where they moved the constant term.', 'Re-teach transposition with a mini-example.** \\(x + 5 = 12 \\Rightarrow x = 12 - 5\\).', 'Drill standard form conversion.** Give 5 equations like \\(x(x-3)=40\\), \\(2x^2 = 5x + 12\\), \\((x+2)^2 = 25\\) and ask.', 'For expansion errors, revisit \\((a+b)^2\\) visually.** Draw a square of side \\(x+7\\), partition into \\(x^2\\), \\(7x\\).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_003', difficulty: 'standard',
          question: 'The method of solving a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a,.',
          hint: 'Revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions: Splitting the Middle Term).',
          misconception: 'Students often write the product condition as \\(pq = c\\) instead of \\(pq = ac\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The method of solving a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b, c \\in',
                  options: ['The method of solving a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b, c \\in', 'A quadratic equation in one variable x is an equation of the form ax² + bx + c = 0, where', 'Forming a quadratic equation from a real-life situation is the process of translating a', 'Completing the square is a method to solve a quadratic equation \\(ax^2 + bx + c = 0\\)'],
                  hint: 'Revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions: Splitting the Middle Term) and.',
                  misconception: 'Students often write the product condition as \\(pq = c\\) instead of \\(pq = ac\\).' }
          ],
            remediations: { 'students-often-write-the-product': { steps: ['If a student makes the \\(pq = c\\) error, immediately return to the algebraic derivation: \\((px + r)(qx + s) = pqx^2.', 'Here \\(a = pq\\), \\(b = ps + qr\\), \\(c = rs\\).', 'The product of the "split numbers" \\(ps\\) and \\(qr\\) is \\(ps \\times qr = pq \\times rs = ac\\).', 'Have the student verify with \\(2x^2 + 7x + 3\\): expand \\((2x+1)(x+3) = 2x^2 + 6x + x + 3\\).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_004', difficulty: 'standard',
          question: 'Completing the square is a method to solve a quadratic equation \\(ax^2 + bx +.',
          hint: 'Review the identities \\((a+b)^2\\) and \\((a-b)^2\\) from Class 8 (c8_math_ch6_7.',
          misconception: 'Students often forget to divide the entire equation by the leading coefficient \\(a\\) when \\(a \\neq 1\\).',
          parts: [
                { id: 'a', prompt: 'What is the constant term that must be added to the expression \\(x^2 + 8x\\) to make it a perfect square trinomial?', answer: 'The constant term to add is \\(16\\)',
                  options: ['The constant term to add is \\(16\\)', 'half and square'],
                  hint: 'Review the identities \\((a+b)^2\\) and \\((a-b)^2\\) from Class 8 (c8_math_ch6_7, c8_math_ch6_9) and.',
                  misconception: 'Students often forget to divide the entire equation by the leading coefficient \\(a\\) when \\(a \\neq 1\\).' },
                { id: 'b', prompt: 'Explain why, when solving \\(2x^2 - 7x + 3 = 0\\) by completing the square, the first step must be to divide the entire equation by 2.', answer: 'Dividing by 2 makes the coefficient of \\(x^2\\) equal to 1, which is necessary',
                  options: ['Dividing by 2 makes the coefficient of \\(x^2\\) equal to 1, which is necessary', 'it\'s just a rule', 'to make numbers smaller'],
                  hint: 'Review the identities \\((a+b)^2\\) and \\((a-b)^2\\) from Class 8 (c8_math_ch6_7, c8_math_ch6_9) and.',
                  misconception: 'Students often forget to divide the entire equation by the leading coefficient \\(a\\) when \\(a \\neq 1\\).' }
          ],
            remediations: { 'students-often-forget-to-divide': { steps: ['If the student forgets to divide by \\(a\\): Write the identity \\((x+p)^2 = x^2 + 2px + p^2\\) on the board.', 'Ask: "What is the coefficient of \\(x^2\\) in this identity?" (Answer: 1).', 'Then point to their equation \\(3x^2 - 12x + ...\\) and ask: "Does it match the pattern?" Guide them to divide by 3 first.', 'If they add the square term to only one side: Use the balance scale analogy — "Whatever you do to one side, you must.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_005', difficulty: 'standard',
          question: 'The quadratic formula \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\) is derived.',
          hint: 'If stuck, revisit "Completing the Square: Method and Steps" (c10_math_cbse_04_004) and.',
          misconception: '**Specific Error:** When completing the square for \\(ax^2+bx+c=0\\), students often write the term to add.',
          parts: [
                { id: 'a', prompt: 'In the derivation, after dividing \\(ax^2 + bx + c = 0\\) by \\(a\\), we get \\(x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0\\).', answer: 'We add \\(\\left(\\frac{b}{2a}\\right)^2\\) to complete the square: it turns \\(x^2 +',
                  options: ['We add \\(\\left(\\frac{b}{2a}\\right)^2\\) to complete the square: it turns \\(x^2 +', 'to cancel the \\(x\\) term', 'because the formula has \\(b^2\\)'],
                  hint: 'If stuck, revisit "Completing the Square: Method and Steps" (c10_math_cbse_04_004) and practice the.',
                  misconception: '**Specific Error:** When completing the square for \\(ax^2+bx+c=0\\), students often write the term to add as \\(\\left(\\frac{b}{2}\\right)^2.' }
          ],
            remediations: { 'specific-error-when-completing-the': { steps: ['**Revisit Division Step:** Ask the student to write \\(2x^2+6x+1=0\\) and divide *every term* by 2: \\(x^2+3x+0.5=0\\).', 'Emphasise: "The coefficient of \\(x\\) is now 3, not 6." 2.', '**Half the New Coefficient:** "What is half of 3?', 'It is 1.5 or \\(\\frac{3}{2}\\).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_04_006', difficulty: 'standard',
          question: 'The quadratic formula \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\) provides the.',
          hint: 'If stuck, revisit Class 8 square roots (c8_math_ch1_8) for simplifying \\(\\sqrt{D}\\), and.',
          misconception: '**Sign error in \\(-b\\) and in \\(-4ac\\) when \\(c\\) is negative.** Example: For \\(2x^2 - 7x - 4 = 0\\), a student writes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The quadratic formula \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\) provides the roots of',
                  options: ['The quadratic formula \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\) provides the roots of', 'A quadratic equation in one variable x is an equation of the form ax² + bx + c = 0, where', 'Forming a quadratic equation from a real-life situation is the process of translating a', 'The method of solving a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b, c \\in'],
                  hint: 'If stuck, revisit Class 8 square roots (c8_math_ch1_8) for simplifying \\(\\sqrt{D}\\), and Class 7.',
                  misconception: '**Sign error in \\(-b\\) and in \\(-4ac\\) when \\(c\\) is negative.** Example: For \\(2x^2 - 7x - 4 = 0\\), a student writes \\(b = -7\\) (correct).' }
          ],
            remediations: { 'sign-error-in-b-and': { steps: ['**Colour-code the coefficients**: Write the equation \\(ax^2 + bx + c = 0\\) and circle \\(a, b, c\\) in different colours.', 'Then write the formula with the same colours: \\(x = \\frac{\\textcolor{red}{-b} \\pm \\sqrt{\\textcolor{red}{b}^2.', '**Practice the discriminant separately**: Give 5 equations, ask only to compute \\(D = b^2 - 4ac\\) with explicit sign.', 'Emphasise: "minus 4ac means subtract 4*a*c; if c is negative, subtracting a negative becomes addition." 3.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
