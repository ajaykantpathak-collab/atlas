import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch02_p1: SimDef = {
    id: 'v3_c8_math_ch02_p1',
    title: 'Power Play · Part 1/2',
    subtitle: 'Why doubling beats adding — every single time',
    classLevel: 8, subject: 'mathematics', topic: 'Power Play · Part 1/2',
    chapters: ['c8_math_ch02'],
    nodeIds: ['c8_math_ch2_1', 'c8_math_ch2_10', 'c8_math_ch2_11', 'c8_math_ch2_12', 'c8_math_ch2_2', 'c8_math_ch2_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a growth-pattern detective', intro: 'One sheet of paper, folded just a handful of times, hides the most explosive idea in mathematics. Fold, count, and watch your intuition lose.', goal: 'Understand multiplicative (exponential) growth through paper folding — each fold doubles the layers (2^n) — and contrast it with additive growth.' },
    discovery: {
        question: 'Fold a paper in half again and again — the layers go 2, 4, 8, 16. What will the 10th fold give: 20 layers or 1,024?',
        options: ['1,024 — each fold doubles the layers, and doubling ten times explodes to 2^10', '20 — each fold just adds 2 more layers', '100 — ten folds times ten', 'Nobody can fold paper that many times so it doesn\'t matter'],
        answer: '1,024 — each fold doubles the layers, and doubling ten times explodes to 2^10',
        hook: 'Your brain defaults to adding (+2, +2, +2), but folding multiplies (×2, ×2, ×2). After 10 steps, adding gives you 20 — doubling gives you 1,024. That\'s why a rumour, a bacterium or a WhatsApp forward can swamp the world overnight.',
    },
    teaching: [
        { title: 'Multiplicative Growth: Doubling Pattern in Paper Folding', text: 'The doubling pattern in paper folding is a multiplicative growth process where each fold doubles the number of layers: after n folds, the number of layers equals 2^n.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch2_1', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Race two patterns head-to-head: \'add 2 each time\' vs \'double each time\'. Track them for 10 rounds, then hunt for the sneaky fact that in doubling, each step\'s increase equals everything that came before.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_1', title: 'Multiplicative Growth: Doubling Pattern in Paper Folding',
          scaffold: { problem: 'An A4 sheet of paper is 0.1 mm thick. If you could fold it in half 10 times (ignoring physical impossibility), how thick would the folded.',
            steps: [
            { text: 'Identify the given information – initial thickness = 0.1 mm, number of folds = 10, each fold doubles the layers (and.' },
            { text: 'Determine the number of layers after 10 folds using the doubling pattern: after n folds, layers = 2^n.' },
            { text: 'Compute 2^10 by repeated multiplication: 2×2=4, ×2=8, ×2=16, ×2=32, ×2=64, ×2=128, ×2=256, ×2=512, ×2=1024.' },
            { text: 'Calculate total thickness in mm: 1024 layers × 0.1 mm/layer = 102.4 mm.' },
            { text: 'Convert mm to cm (divide by 10): 102.4 mm ÷ 10 = 10.24 cm.', faded: true, blankAnswer: '10.24 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_10', title: 'Multiplying Powers with Different Bases: am x bm = (ab)m',
          scaffold: { problem: 'A water tank has a square base of side 6 m and height 6 m. Another tank has a square base of side 4 m and height 4 m.',
            steps: [
            { text: 'Volume of first tank = (side)^2 × height = 6^2 × 6 = 6^3 cubic metres.' },
            { text: 'Product of volumes = 6^3 × 4^3. Identify bases 6 and 4, common exponent 3.' },
            { text: 'Apply the law a^m × b^m = (a×b)^m: 6^3 × 4^3 = (6×4)^3.' },
            { text: 'Multiply bases: 6×4 = 24. Write as single power: 24^3.' },
            { text: 'Verify: 6^3 = 216, 4^3 = 64, product = 13824. 24^3 = 24×24×24 = 13824. Units: cubic metres.', faded: true, blankAnswer: '24^3 cubic metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_11', title: 'Exponents with Negative Bases: Sign Rules',
          scaffold: { problem: 'In a science experiment, a chemical reaction causes the temperature change in a beaker to be modeled by \\((-4)^n\\) degrees Celsius, where.',
            steps: [
            { text: 'Identify the base and exponents. Base = -4, exponents = 3 and 4.' },
            { text: 'Recall the sign rule: negative base raised to an odd exponent gives a negative result; raised to an even exponent gives.' },
            { text: 'Evaluate \\((-4)^3\\). Exponent 3 is odd → result is negative. Compute magnitude: \\(4^3 = 4 \\times 4 \\times 4 = 64\\).' },
            { text: 'Evaluate \\((-4)^4\\). Exponent 4 is even → result is positive. Compute magnitude: \\(4^4 = 4 \\times 4 \\times 4 \\times 4.' },
            { text: 'Interpret: After 3 minutes, the temperature drops by 64°C (negative change).', faded: true, blankAnswer: 'After 3 minutes: \\(-64^\\circ\\text{C}\\) (temperature drops).' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_12', title: 'Zero as an Exponent: a0 = 1',
          scaffold: { problem: 'A scientist starts with 1 gram of a radioactive substance. The amount halves every hour.',
            steps: [
            { text: 'Identify the pattern: after 1 hour, amount \\(= 1 \\times \\left(\\frac{1}{2}\\right)^1\\); after 2 hours, amount \\(= 1.' },
            { text: 'For \\(n=0\\), the expression becomes \\(1 \\times \\left(\\frac{1}{2}\\right)^0\\).' },
            { text: 'Apply zero exponent rule: \\(\\left(\\frac{1}{2}\\right)^0 = 1\\) (since base \\(\\frac{1}{2} \\neq 0\\)).' },
            { text: 'Compute: \\(1 \\times 1 = 1\\) gram.' },
            { text: 'Interpret: At the start (0 hours), the full 1 gram is present, consistent with the rule.', faded: true, blankAnswer: '1 gram' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_2', title: 'Exponential Growth vs Linear Growth: Comparison',
          scaffold: { problem: 'A school offers two scholarship plans for 8 months. Plan X: ₹1000 in Month 1, increasing by ₹500 each month.',
            steps: [
            { text: 'Identify growth types. Plan X adds ₹500 monthly → linear. Plan Y doubles monthly → exponential.' },
            { text: 'Write formulas. Plan X total after n months = sum of arithmetic series: S_X = n/2 × [2×1000 + (n-1)×500].' },
            { text: 'Substitute n=8. S_X = 8/2 × [2000 + 7×500] = 4 × [2000 + 3500] = 4 × 5500 = ₹22,000.' },
            { text: 'S_Y = 200 × (2^8 - 1) = 200 × (256 - 1) = 200 × 255 = ₹51,000.' },
            { text: 'Compare: Plan Y gives ₹51,000 - ₹22,000 = ₹29,000 more.', faded: true, blankAnswer: 'Plan Y gives ₹29,000 more (₹51,000 vs ₹22,000).' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_3', title: 'Exponential Notation: Base and Exponent',
          scaffold: { problem: 'A water lily in a pond doubles its covered area every day. On Day 1 it covers 1 square metre.',
            steps: [
            { text: 'Understand the growth pattern. Day 1: 1 m² = 2⁰ (but we start with 1 as 2⁰, however the problem says Day 1 covers 1 m².' },
            { text: 'Identify the base and exponent. Base = 2 (doubling factor). Exponent = 5 (number of doublings from Day 1 to Day 6).' },
            { text: 'Write the exponential expression: \\(2^5\\).' },
            { text: 'Evaluate \\(2^5\\) by repeated multiplication: \\(2 \\times 2 = 4\\), \\(4 \\times 2 = 8\\), \\(8 \\times 2 = 16\\), \\(16 \\times 2.' },
            { text: 'State the final answer with units: 32 square metres.', faded: true, blankAnswer: 'Exponential expression: \\(2^5\\); Base = 2, Exponent = 5.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch2_3', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'For a paper-art project, Leela folds a sheet in half repeatedly to build thickness. After 2 folds she counts 4 layers and predicts \'10 layers at the 5th fold — two more each time.\'',
            decisions: [{ prompt: 'How many layers will the 5th fold actually give?', options: [
                { text: '32 — every fold doubles all the layers already there: 2, 4, 8, 16, 32. Her rule \'add 2\' only matched the first step by coincidence; the pattern multiplies by 2, it does not add.', outcome: 'This separates multiplicative growth from additive growth — the constant is the factor ×2, not the amount +2.' },
                { text: 'Her prediction stands — the count went 2, 4, so the rule is clearly +2 and the 5th fold gives 10.', outcome: 'The third fold already breaks the rule — it gives 8, not 6; trusting the first two terms misreads doubling as adding.', reveals: 'doubling-is-adding' },
                { text: 'The 5th fold gives 25 layers, because fold number times itself — squaring the count of folds.', outcome: 'Squaring the fold number is a different pattern; layers track the previous layer count, not the fold count — each fold only sees \'how many layers exist now\' and doubles it.', reveals: 'folds-squared' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch2_3', title: 'The bigger picture',
          caseStudy: { intro: 'Multiplicative growth doesn\'t climb — it detonates. The difference between \'add a bit\' and \'multiply a bit\' is the difference between a staircase and a rocket.',
            decisions: [{ prompt: 'What comes next? Power Play · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Power Play · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch2_1', difficulty: 'standard',
          question: 'The doubling pattern in paper folding is a multiplicative growth process where.',
          hint: 'If stuck, revisit Class 6 patterns (c6_math_ch12_121) and Class 7 multiplicative patterns.',
          misconception: 'Students treat the doubling pattern as "add 2 each time" after seeing the first two terms (2, 4).',
          parts: [
                { id: 'a', prompt: 'Compare the doubling pattern from paper folding (2, 4, 8, 16, 32…) with the pattern of adding 2 each time (2, 4, 6, 8, 10…).', answer: 'Doubling pattern after 10 folds: 2^10 = 1024',
                  options: ['Doubling pattern after 10 folds: 2^10 = 1024', 'about 10 times larger', 'only a little larger'],
                  hint: 'If stuck, revisit Class 6 patterns (c6_math_ch12_121) and Class 7 multiplicative patterns.',
                  misconception: 'Students treat the doubling pattern as "add 2 each time" after seeing the first two terms (2, 4).' }
          ],
            remediations: { 'students-treat-the-doubling-pattern': { steps: ['Have the student physically fold a paper (or use a stack of cards to simulate layers) and count aloud after each fold.', 'What operation takes 4 to 8?" Write both operations (+2 and ×2) on the board.', 'Then ask: "If the rule was +2, what would the 4th fold give?', 'If the rule was ×2, what would it give?" Let them check by folding the 4th time (16 layers).'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the doubling pattern as "add 2 each time" after seeing the first two terms (2, 4).',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I fold a paper 7 times, I get 128 layers. If I fold it 8 times, I get 256 layers.', answer: 'The claim is correct and insightful',
                  options: ['The claim is correct and insightful', 'it won\'t continue forever'],
                  hint: 'If stuck, revisit Class 6 patterns (c6_math_ch12_121) and Class 7 multiplicative patterns.',
                  misconception: 'Students treat the doubling pattern as "add 2 each time" after seeing the first two terms (2, 4).' }
          ],
            remediations: { 'students-treat-the-doubling-pattern': { steps: ['Have the student physically fold a paper (or use a stack of cards to simulate layers) and count aloud after each fold.', 'What operation takes 4 to 8?" Write both operations (+2 and ×2) on the board.', 'Then ask: "If the rule was +2, what would the 4th fold give?', 'If the rule was ×2, what would it give?" Let them check by folding the 4th time (16 layers).'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_10', difficulty: 'standard',
          question: 'When two powers have the same exponent but different bases, their product.',
          hint: 'If stuck, revisit expanding powers (c8_math_ch2_3) and integer multiplication sign rules.',
          misconception: 'Students often add the exponents when multiplying powers with different bases, writing a^m × b^m = (ab)^(2m).',
          parts: [
                { id: 'a', prompt: 'Explain why 2^4 × 3^4 = (2×3)^4 is true by writing both sides in expanded form. Why can we not do the same for 2^4 × 3^5?', answer: 'LHS = (2×2×2×2) × (3×3×3×3) = (2×3)×(2×3)×(2×3)×(2×3) = 6^4 = RHS',
                  options: ['LHS = (2×2×2×2) × (3×3×3×3) = (2×3)×(2×3)×(2×3)×(2×3) = 6^4 = RHS', 'we can still combine them'],
                  hint: 'If stuck, revisit expanding powers (c8_math_ch2_3) and integer multiplication sign rules.',
                  misconception: 'Students often add the exponents when multiplying powers with different bases, writing a^m × b^m = (ab)^(2m) or (ab)^(m+m).' }
          ],
            remediations: { 'students-often-add-the-exponents': { steps: ['Ask the student to expand both powers fully: 2^3 × 5^3 = (2×2×2) × (5×5×5).', 'Have them regroup by pairing one 2 with one 5: (2×5)×(2×5)×(2×5).', 'Count the pairs: three pairs of (2×5) = 10^3.', 'Contrast with same-base case: 2^3 × 2^2 = (2×2×2)×(2×2) = five 2\'s = 2^5.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_11', difficulty: 'standard',
          question: 'For a negative base \\(-a\\) (where \\(a > 0\\)) raised to a positive integer.',
          hint: 'Revisit Class 7 Chapter 10 (Integers), specifically the nodes on multiplication sign.',
          misconception: 'Students frequently confuse \\((-a)^n\\) with \\(-a^n\\). For example, they evaluate \\((-3)^2\\) as \\(-9\\) (treating it.',
          parts: [
                { id: 'a', prompt: 'What is the sign of \\((-7)^{12}\\)? Explain your reasoning in one sentence without calculating the actual value.', answer: 'Positive',
                  options: ['Positive', 'negative', 'negative base always gives negative result'],
                  hint: 'Revisit Class 7 Chapter 10 (Integers), specifically the nodes on multiplication sign rules.',
                  misconception: 'Students frequently confuse \\((-a)^n\\) with \\(-a^n\\). For example, they evaluate \\((-3)^2\\) as \\(-9\\) (treating it as \\(-(3^2)\\)) instead.' },
                { id: 'b', prompt: 'Explain the difference between \\((-5)^4\\) and \\(-5^4\\). Evaluate both expressions to demonstrate the difference.', answer: '\\((-5)^4 = (-5) \\times (-5) \\times (-5) \\times (-5) = 625\\) (positive',
                  options: ['\\((-5)^4 = (-5) \\times (-5) \\times (-5) \\times (-5) = 625\\) (positive', 'both are 625 or both are -625'],
                  hint: 'Revisit Class 7 Chapter 10 (Integers), specifically the nodes on multiplication sign rules.',
                  misconception: 'Students frequently confuse \\((-a)^n\\) with \\(-a^n\\). For example, they evaluate \\((-3)^2\\) as \\(-9\\) (treating it as \\(-(3^2)\\)) instead.' }
          ],
            remediations: { 'students-frequently-confuse-a-n': { steps: ['If a student writes \\((-3)^2 = -9\\), immediately ask: "What does the exponent 2 mean?', 'Write it out as multiplication." Guide them to write \\((-3) \\times (-3)\\).', 'Then ask: "What is negative times negative?" (Positive).', '"So what is the answer?" (+9).'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_12', difficulty: 'standard',
          question: 'For any non-zero number \\(a\\) (integer, fraction, decimal, or algebraic.',
          hint: 'Revisit the quotient rule for exponents (c8_math_ch2_8) and practice dividing powers with.',
          misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything.',
          parts: [
                { id: 'a', prompt: 'State the zero exponent rule for any non-zero base \\(a\\).', answer: '\\(a^0 = 1\\) for \\(a \\neq 0\\)',
                  options: ['\\(a^0 = 1\\) for \\(a \\neq 0\\)', 'zero exponent means zero', 'zero times anything is zero', 'the exponent is zero so the answer is zero'],
                  hint: 'Revisit the quotient rule for exponents (c8_math_ch2_8) and practice dividing powers with same base.',
                  misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything is zero".' },
                { id: 'b', prompt: 'Explain why \\(5^0 = 1\\) using the quotient rule for exponents (\\(a^m \\div a^n = a^{m-n}\\)).', answer: '\\(5^0 = 5^{3-3} = 5^3 \\div 5^3 = 125 \\div 125 = 1\\)',
                  options: ['\\(5^0 = 5^{3-3} = 5^3 \\div 5^3 = 125 \\div 125 = 1\\)', 'because any number to the power zero is 1 by definition', 'zero times anything is zero', 'the exponent is zero so the answer is zero'],
                  hint: 'Revisit the quotient rule for exponents (c8_math_ch2_8) and practice dividing powers with same base.',
                  misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything is zero".' },
                { id: 'c', prompt: 'Simplify: \\(\\left(\\frac{3}{4}\\right)^0 + (-7)^0 \\times 2^0\\).', answer: '\\(\\left(\\frac{3}{4}\\right)^0 = 1\\), \\((-7)^0 = 1\\), \\(2^0 = 1\\)',
                  options: ['\\(\\left(\\frac{3}{4}\\right)^0 = 1\\), \\((-7)^0 = 1\\), \\(2^0 = 1\\)', 'zero times anything is zero', 'the exponent is zero so the answer is zero', '\\(a^0 = 0\\) because "zero times anything is zero"'],
                  hint: 'Revisit the quotient rule for exponents (c8_math_ch2_8) and practice dividing powers with same base.',
                  misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything is zero".' },
                { id: 'd', prompt: 'Compare the expressions: \\((x^2)^0\\) and \\(x^{2 \\times 0}\\). Are they equal for all non-zero \\(x\\)? Justify.', answer: '\\((x^2)^0 = 1\\) (since base \\(x^2 \\neq 0\\))',
                  options: ['\\((x^2)^0 = 1\\) (since base \\(x^2 \\neq 0\\))', 'zero times anything is zero', 'the exponent is zero so the answer is zero', '\\(a^0 = 0\\) because "zero times anything is zero"'],
                  hint: 'Revisit the quotient rule for exponents (c8_math_ch2_8) and practice dividing powers with same base.',
                  misconception: 'Students often think \\(0^0 = 1\\) by applying the rule blindly, or they think \\(a^0 = 0\\) because "zero times anything is zero".' }
          ],
            remediations: { '0-0-1-by-applying': { steps: ['Use the descending pattern approach: Write powers of 2 from \\(2^3\\) down to \\(2^0\\): 8, 4, 2, ?.', 'Then generalise: \\(a^3, a^2, a^1, a^0\\).', 'Each step divides by \\(a\\).', 'So \\(a^1 \\div a = a^0 = 1\\).'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_2', difficulty: 'standard',
          question: 'Linear growth increases by a constant **additive** amount each step (e.g.',
          hint: 'Revisit "Identifying Patterns in Number Sequences" (c7_math_ch06_008) — practice finding.',
          misconception: 'Students often compare the **nth term formula** of linear (a + (n-1)d) and exponential (a·r^(n-1)) by plugging.',
          parts: [
                { id: 'a', prompt: 'State the defining characteristic that distinguishes exponential growth from linear growth in a sequence of numbers.', answer: 'Correct: Linear growth has a constant **difference** between consecutive terms',
                  options: ['Correct: Linear growth has a constant **difference** between consecutive terms', 'exponential grows faster'],
                  hint: 'Revisit "Identifying Patterns in Number Sequences" (c7_math_ch06_008) — practice finding constant.',
                  misconception: 'Students often compare the **nth term formula** of linear (a + (n-1)d) and exponential (a·r^(n-1)) by plugging in n=1,2,3 and seeing.' }
          ],
            remediations: { 'students-often-compare-the-nth': { steps: ['Have the student build a **difference table**: write terms of both sequences, then compute the *increase from previous.', 'Ask: "What happens to the linear increases?', 'What happens to the exponential increases?', '(They get bigger each time)." 3.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_3', difficulty: 'standard',
          question: 'Exponential notation is a concise way to represent repeated multiplication.',
          hint: 'If stuck, revisit c7_math_ch10_004 (Multiplication of Integers: Sign Rules) and.',
          misconception: 'Students often treat the exponent as a multiplier: they compute \\(a^n\\) as \\(a \\times n\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Exponential notation is a concise way to represent repeated multiplication of the same',
                  options: ['Exponential notation is a concise way to represent repeated multiplication of the same', 'The doubling pattern in paper folding is a multiplicative growth process where each fold', 'When two powers have the same exponent but different bases, their product equals the', 'For a negative base \\(-a\\) (where \\(a > 0\\)) raised to a positive integer exponent \\(n\\),'],
                  hint: 'If stuck, revisit c7_math_ch10_004 (Multiplication of Integers: Sign Rules) and c7_math_ch01_008.',
                  misconception: 'Students often treat the exponent as a multiplier: they compute \\(a^n\\) as \\(a \\times n\\).' }
          ],
            remediations: { 'students-often-treat-the-exponent': { steps: ['Have the student write out the repeated multiplication explicitly: "What does \\(2^5\\) mean?', 'Count the factors together: "How many 2\'s are there? That\'s the exponent."', 'For negative bases, use parentheses: "Write \\((-3)^2\\) as \\((-3) \\times (-3)\\).', 'Practice with base 10 patterns from Class 7 (c7_math_ch01_008): \\(10^1=10\\), \\(10^2=100\\), \\(10^3=1000\\) to reinforce.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
