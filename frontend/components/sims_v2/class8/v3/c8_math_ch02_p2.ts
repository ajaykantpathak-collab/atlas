import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch02_p2: SimDef = {
    id: 'v3_c8_math_ch02_p2',
    title: 'Power Play · Part 2/2',
    subtitle: 'Why doubling beats adding — every single time',
    classLevel: 8, subject: 'mathematics', topic: 'Power Play · Part 2/2',
    chapters: ['c8_math_ch02'],
    nodeIds: ['c8_math_ch2_4', 'c8_math_ch2_5', 'c8_math_ch2_6', 'c8_math_ch2_7', 'c8_math_ch2_8', 'c8_math_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a growth-pattern detective', intro: 'One sheet of paper, folded just a handful of times, hides the most explosive idea in mathematics. Fold, count, and watch your intuition lose.', goal: 'Understand multiplicative (exponential) growth through paper folding — each fold doubles the layers (2^n) — and contrast it with additive growth.' },
    discovery: {
        question: 'Fold a paper in half again and again — the layers go 2, 4, 8, 16. What will the 10th fold give: 20 layers or 1,024?',
        options: ['1,024 — each fold doubles the layers, and doubling ten times explodes to 2^10', '20 — each fold just adds 2 more layers', '100 — ten folds times ten', 'Nobody can fold paper that many times so it doesn\'t matter'],
        answer: '1,024 — each fold doubles the layers, and doubling ten times explodes to 2^10',
        hook: 'Your brain defaults to adding (+2, +2, +2), but folding multiplies (×2, ×2, ×2). After 10 steps, adding gives you 20 — doubling gives you 1,024. That\'s why a rumour, a bacterium or a WhatsApp forward can swamp the world overnight.',
    },
    teaching: [
        { title: 'Powers of 2 and Their Values', text: 'A power of 2 is an expression of the form 2ⁿ where n is a non-negative integer, representing the product of multiplying 2 by itself n times.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch2_4', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Race two patterns head-to-head: \'add 2 each time\' vs \'double each time\'. Track them for 10 rounds, then hunt for the sneaky fact that in doubling, each step\'s increase equals everything that came before.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_4', title: 'Powers of 2 and Their Values',
          scaffold: { problem: 'A new library book is so popular that each person who reads it recommends it to 2 friends the next day.',
            steps: [
            { text: 'Identify the pattern — each day the number of NEW readers doubles. Monday starts with 1 reader (2⁰ = 1).' },
            { text: 'Tuesday: 2¹ = 2 new readers. Wednesday: 2² = 4 new readers. Thursday: 2³ = 8 new readers. Friday: 2⁴ = 16 new readers.' },
            { text: 'Compute 2⁴ by doubling from 2³: 2³ = 8, so 2⁴ = 8 × 2 = 16. Or expand: 2 × 2 × 2 × 2 = 16.' },
            { text: 'Verify by building the full sequence: 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16. Each step doubles.' },
            { text: 'Answer the question: On Friday, there will be 16 new readers.', faded: true, blankAnswer: '16 new readers on Friday' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_5', title: 'Expressing Numbers in Exponential Form',
          scaffold: { problem: 'The distance from Earth to the Moon is approximately 3,84,000 km. Express this distance in standard form (scientific notation).',
            steps: [
            { text: 'Identify the given number: 3,84,000 km. Write it with an explicit decimal point: 3,84,000.0' },
            { text: 'Move the decimal point to the left until the number is between 1 and 10.' },
            { text: 'The number between 1 and 10 is 3.84. The number of places moved (5) becomes the exponent of 10.' },
            { text: 'Write in standard form: \\( 3.84 \\times 10^5 \\) km.' },
            { text: 'Verify: \\( 3.84 \\times 100,000 = 384,000 \\). Correct.', faded: true, blankAnswer: '\\( 3.84 \\times 10^5 \\) km' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_6', title: 'Prime Factorisation in Exponential Form',
          scaffold: { problem: 'A school has 1,260 students. The principal wants to arrange them in equal rows such that the number of students in each row is a prime.',
            steps: [
            { text: 'Start with 1,260. Divide by the smallest prime 2: 1,260 ÷ 2 = 630. Divide by 2 again: 630 ÷ 2 = 315.' },
            { text: 'Move to next prime 3. 315 ÷ 3 = 105. 105 ÷ 3 = 35. 35 not divisible by 3. So 3 appears twice → 3².' },
            { text: 'Next prime 5. 35 ÷ 5 = 7. 7 not divisible by 5. So 5 appears once → 5¹ (write as 5).' },
            { text: 'Next prime 7. 7 ÷ 7 = 1. So 7 appears once → 7.' },
            { text: 'Combine: 1,260 = 2² × 3² × 5 × 7. The possible prime row sizes are the distinct prime factors: 2, 3, 5, 7.', faded: true, blankAnswer: '1,260 = 2² × 3² × 5 × 7; possible prime row sizes: 2, 3, 5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_7', title: 'Multiplying Powers with the Same Base: am x an = am+n',
          scaffold: { problem: 'A school\'s science club starts with 3 members. Each week, every member recruits 3 new members.',
            steps: [
            { text: 'Identify the two quantities: recruits after 2 weeks = \\(3^2\\), recruits after next 3 weeks = \\(3^3\\).' },
            { text: 'We need total new recruits = \\(3^2 \\times 3^3\\) (since each week\'s recruits multiply the previous total?' },
            { text: 'Apply the rule: same base 3, add exponents: \\(3^{2+3} = 3^5\\).' },
            { text: 'Evaluate \\(3^5 = 3 \\times 3 \\times 3 \\times 3 \\times 3 = 243\\).' },
            { text: 'State answer: Total new recruits = 243, expressed as \\(3^5\\).', faded: true, blankAnswer: '\\(3^5 = 243\\) new recruits.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_8', title: 'Dividing Powers with the Same Base: am / an = am-n',
          scaffold: { problem: 'A bacteria culture starts with \\(3^8\\) cells. After an antibiotic treatment, the number of cells reduces to \\(3^5\\).',
            steps: [
            { text: 'Identify the initial amount = \\(3^8\\) and final amount = \\(3^5\\).' },
            { text: 'Recognise the same base (3) and apply the quotient rule: \\(a^m \\div a^n = a^{m-n}\\).' },
            { text: 'Subtract the exponents: \\(8 - 5 = 3\\).' },
            { text: 'Write the result: \\(3^3\\).' },
            { text: 'Verify by expanding: \\(3^8 = 6561\\), \\(3^5 = 243\\), \\(6561 \\div 243 = 27 = 3^3\\). The factor is \\(3^3\\) (or 27 times).', faded: true, blankAnswer: '\\(3^3\\) (or 27 times)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch2_9', title: 'Power of a Power: (am)n = amn',
          scaffold: { problem: 'A square garden has side length (2^3) metres. Find the area of the garden in exponential form with base 2.',
            steps: [
            { text: 'Identify the formula for area of a square: Area = side × side = (side)^2' },
            { text: 'Substitute the given side length: Area = (2^3)^2' },
            { text: 'Apply the power of a power rule: (a^m)^n = a^(m×n). Here a=2, m=3, n=2' },
            { text: 'Multiply the exponents: 3 × 2 = 6, so Area = 2^6 square metres' },
            { text: 'Verify by expanding: (2^3)^2 = (2×2×2)^2 = (2×2×2)×(2×2×2) = 2^6 ✓', faded: true, blankAnswer: '2^6 m²' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch2_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch2_4', title: 'Use it in the wild',
          caseStudy: { intro: 'For a paper-art project, Leela folds a sheet in half repeatedly to build thickness. After 2 folds she counts 4 layers and predicts \'10 layers at the 5th fold — two more each time.\'',
            decisions: [{ prompt: 'How many layers will the 5th fold actually give?', options: [
                { text: '32 — every fold doubles all the layers already there: 2, 4, 8, 16, 32. Her rule \'add 2\' only matched the first step by coincidence; the pattern multiplies by 2, it does not add.', outcome: 'This separates multiplicative growth from additive growth — the constant is the factor ×2, not the amount +2.' },
                { text: 'Her prediction stands — the count went 2, 4, so the rule is clearly +2 and the 5th fold gives 10.', outcome: 'The third fold already breaks the rule — it gives 8, not 6; trusting the first two terms misreads doubling as adding.', reveals: 'doubling-is-adding' },
                { text: 'The 5th fold gives 25 layers, because fold number times itself — squaring the count of folds.', outcome: 'Squaring the fold number is a different pattern; layers track the previous layer count, not the fold count — each fold only sees \'how many layers exist now\' and doubles it.', reveals: 'folds-squared' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Multiplicative growth doesn\'t climb — it detonates. The difference between \'add a bit\' and \'multiply a bit\' is the difference between a staircase and a rocket.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch2_4', difficulty: 'standard',
          question: 'A power of 2 is an expression of the form 2ⁿ where n is a non-negative integer.',
          hint: 'Review c8_math_ch2_3 (Exponential Notation) to reconnect the symbol 2ⁿ with its meaning.',
          misconception: 'Students treat the exponent as a factor to multiply by the base: they compute 2ⁿ as 2 × n.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A power of 2 is an expression of the form 2ⁿ where n is a non-negative integer,',
                  options: ['A power of 2 is an expression of the form 2ⁿ where n is a non-negative integer,', 'The doubling pattern in paper folding is a multiplicative growth process where each fold', 'When two powers have the same exponent but different bases, their product equals the', 'For a negative base \\(-a\\) (where \\(a > 0\\)) raised to a positive integer exponent \\(n\\),'],
                  hint: 'Review c8_math_ch2_3 (Exponential Notation) to reconnect the symbol 2ⁿ with its meaning as repeated.',
                  misconception: 'Students treat the exponent as a factor to multiply by the base: they compute 2ⁿ as 2 × n.' }
          ],
            remediations: { 'students-treat-the-exponent-as': { steps: ['When a student writes 2⁵ = 10, do not just say "wrong".', 'Instead: (1) Ask "What does the little 5 mean?" to surface their interpretation.', '(2) Write 2⁵ = 2 × 2 × 2 × 2 × 2 on paper and count the 2\'s together.', '(3) Contrast with 2 × 5 = 2 + 2 + 2 + 2 + 2 = 10.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_5', difficulty: 'standard',
          question: 'Expressing a number in exponential form means writing it as a base raised to.',
          hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of base/exponent.',
          misconception: 'Students treat the exponent as a "zero counter" only for base 10.',
          parts: [
                { id: 'a', prompt: 'Write the number 70,000 in standard form (scientific notation).', answer: 'Correct answer: \\( 7 \\times 10^4 \\)',
                  options: ['Correct answer: \\( 7 \\times 10^4 \\)', 'base × exponent', 'base multiplied by itself exponent times'],
                  hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of base/exponent (c8_math_ch2_3).',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' },
                { id: 'b', prompt: 'The number 64 can be written as \\( 2^6 \\), \\( 4^3 \\), and \\( 8^2 \\).', answer: 'Correct explanation: 64 = 2 × 2 × 2 × 2 × 2 × 2 = 2^6',
                  options: ['Correct explanation: 64 = 2 × 2 × 2 × 2 × 2 × 2 = 2^6', 'the exponent tells how many zeros', 'only one form is correct', 'base × exponent'],
                  hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of base/exponent (c8_math_ch2_3).',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' },
                { id: 'c', prompt: 'Express 3,60,00,000 in standard form. Show the steps of moving the decimal point.', answer: 'Steps: 1) Write number with decimal: 3,60,00,000.0',
                  options: ['Steps: 1) Write number with decimal: 3,60,00,000.0', 'base × exponent', 'base multiplied by itself exponent times'],
                  hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of base/exponent (c8_math_ch2_3).',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' },
                { id: 'd', prompt: 'Compare the exponential forms of 1000 and 10000. What pattern do you see in the exponents when the base is 10?', answer: '1000 = 10^3, 10000 = 10^4',
                  options: ['1000 = 10^3, 10000 = 10^4', '10^6 because it\'s one lakh', 'base × exponent', 'base multiplied by itself exponent times'],
                  hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of base/exponent (c8_math_ch2_3).',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' }
          ],
            remediations: { 'students-treat-the-exponent-as': { steps: ['Go back to **c8_math_ch2_3** and use physical counters: show 2^3 as three groups of two counters.', 'For standard form normalization, use a place value chart.', 'Slide a decimal point marker from the rightmost end leftwards, counting aloud each jump over a digit, until the number.', 'The count (3) is the exponent.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the exponent as a "zero counter" only for base 10.',
          parts: [
                { id: 'a', prompt: 'A student writes the standard form of 5,200 as \\( 52 \\times 10^2 \\). Is this correct? If not, identify the error and give the correct standard form.', answer: 'Incorrect',
                  options: ['Incorrect', 'it\'s correct because 52 × 100 = 5200', 'base × exponent', 'base multiplied by itself exponent times'],
                  hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of base/exponent (c8_math_ch2_3).',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' },
                { id: 'b', prompt: 'Create a real-life problem (using Indian context: rupees, population, distance) where expressing a large number in standard form makes the problem easier.', answer: 'Example: "India\'s population is about 1,40,00,00,000',
                  options: ['Example: "India\'s population is about 1,40,00,00,000', 'base × exponent', 'base multiplied by itself exponent times'],
                  hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of base/exponent (c8_math_ch2_3).',
                  misconception: 'Students treat the exponent as a "zero counter" only for base 10.' }
          ],
            remediations: { 'students-treat-the-exponent-as': { steps: ['Go back to **c8_math_ch2_3** and use physical counters: show 2^3 as three groups of two counters.', 'For standard form normalization, use a place value chart.', 'Slide a decimal point marker from the rightmost end leftwards, counting aloud each jump over a digit, until the number.', 'The count (3) is the exponent.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_6', difficulty: 'standard',
          question: 'Prime factorisation in exponential form expresses a composite number as.',
          hint: 'If stuck, revisit divisibility rules (c6_math_ch01_014) for 2, 3, 5 and practice writing.',
          misconception: 'Students often write the exponent as a multiplier instead of a power: for 2³ they compute 2 × 3 = 6 instead of 2 × 2.',
          parts: [
                { id: 'a', prompt: 'Two students factorise 216. Student A writes 216 = 2³ × 3³. Student B writes 216 = 6³. Are both correct? Explain why or why not.', answer: 'Only Student A is correct',
                  options: ['Only Student A is correct', 'both are correct', 'factorisation', 'prime factorisation'],
                  hint: 'If stuck, revisit divisibility rules (c6_math_ch01_014) for 2, 3, 5 and practice writing repeated.',
                  misconception: 'Students often write the exponent as a multiplier instead of a power: for 2³ they compute 2 × 3 = 6 instead of 2 × 2 × 2 = 8.' }
          ],
            remediations: { 'students-often-write-the-exponent': { steps: ['If a student writes 2 × 3 = 6 for 2³, have them expand the exponential form: "Write 2³ as repeated multiplication: 2.', 'That\'s why the exponent is 3." Use colour-coding: write the base in black, exponent in red.', 'Practice with physical counters: group 8 counters into 2s three times.', 'For incomplete factorisation, teach the "prime check" at each step: "Is this factor prime?'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_7', difficulty: 'standard',
          question: 'When multiplying two powers with the same base, we keep the base unchanged and.',
          hint: 'If stuck, revisit c8_math_ch2_3 (Exponential Notation: Base and Exponent) and practice.',
          misconception: 'Students often multiply the bases and add the exponents, writing \\(a^m \\times a^n = (a \\times a)^{m+n} = a^{2(m+n)}\\).',
          parts: [
                { id: 'a', prompt: 'State the rule for multiplying \\(x^5 \\times x^3\\). Write the simplified form.', answer: 'The rule: \\(x^5 \\times x^3 = x^{5+3} = x^8\\)',
                  options: ['The rule: \\(x^5 \\times x^3 = x^{5+3} = x^8\\)', 'the coefficient becomes 2'],
                  hint: 'If stuck, revisit c8_math_ch2_3 (Exponential Notation: Base and Exponent) and practice expanding.',
                  misconception: 'Students often multiply the bases and add the exponents, writing \\(a^m \\times a^n = (a \\times a)^{m+n} = a^{2(m+n)}\\).' },
                { id: 'b', prompt: 'Explain why \\(5^2 \\times 5^4 = 5^6\\) by writing out the repeated multiplication. Why can\'t we use this rule for \\(5^2 \\times 3^4\\)?', answer: '\\(5^2 = 5 \\times 5\\), \\(5^4 = 5 \\times 5 \\times 5 \\times 5\\)',
                  options: ['\\(5^2 = 5 \\times 5\\), \\(5^4 = 5 \\times 5 \\times 5 \\times 5\\)', 'add exponents anyway'],
                  hint: 'If stuck, revisit c8_math_ch2_3 (Exponential Notation: Base and Exponent) and practice expanding.',
                  misconception: 'Students often multiply the bases and add the exponents, writing \\(a^m \\times a^n = (a \\times a)^{m+n} = a^{2(m+n)}\\).' }
          ],
            remediations: { 'students-often-multiply-the-bases': { steps: ['Have the student expand both powers: \\(2^3 = 2 \\times 2 \\times 2\\), \\(2^4 = 2 \\times 2 \\times 2 \\times 2\\).', 'Ask: "How many 2s are there in total?" Count together: 7.', 'Contrast with \\(2^3 \\times 3^4\\): expand to show bases differ, cannot combine.', 'Practice with 5 similar numerical examples, then algebraic, emphasizing "base stays, exponents add".'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_8', difficulty: 'standard',
          question: 'When dividing two powers with the same non-zero base, keep the base and.',
          hint: 'Revisit expanding powers and cancelling common factors in numerical fractions (Class 6.',
          misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.',
          parts: [
                { id: 'a', prompt: 'State the rule for dividing powers with the same base using the formula \\(a^m \\div a^n\\). What condition must be true about the base \\(a\\)?', answer: 'The rule is \\(a^m \\div a^n = a^{m-n}\\) for \\(a \\neq 0\\)',
                  options: ['The rule is \\(a^m \\div a^n = a^{m-n}\\) for \\(a \\neq 0\\)', 'division of powers means divide the exponents', '"division of powers means divide the exponents"'],
                  hint: 'Revisit expanding powers and cancelling common factors in numerical fractions (Class 6 Fractions.',
                  misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.' },
                { id: 'b', prompt: 'Simplify: \\( \\frac{7^{10}}{7^4} \\times 7^2 \\). Show all steps.', answer: 'Step 1: Apply quotient rule: \\(7^{10} \\div 7^4 = 7^{10-4} = 7^6\\)',
                  options: ['Step 1: Apply quotient rule: \\(7^{10} \\div 7^4 = 7^{10-4} = 7^6\\)', 'division of powers means divide the exponents', '"division of powers means divide the exponents"'],
                  hint: 'Revisit expanding powers and cancelling common factors in numerical fractions (Class 6 Fractions.',
                  misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.' },
                { id: 'c', prompt: 'Compare the results of \\( \\frac{2^8}{2^5} \\) and \\( \\frac{2^5}{2^8} \\). What do you notice about the exponents in the answers?', answer: '\\( \\frac{2^8}{2^5} = 2^{3} = 8 \\)',
                  options: ['\\( \\frac{2^8}{2^5} = 2^{3} = 8 \\)', 'undefined', 'division of powers means divide the exponents', '"division of powers means divide the exponents"'],
                  hint: 'Revisit expanding powers and cancelling common factors in numerical fractions (Class 6 Fractions.',
                  misconception: 'Students often divide the exponents instead of subtracting them when applying the quotient rule.' }
          ],
            remediations: { 'students-often-divide-the-exponents': { steps: ['Write the division in expanded form: \\( \\frac{5^8}{5^2} = \\frac{5 \\times 5 \\times 5 \\times 5 \\times 5 \\times 5 \\times 5.', 'Cancel the two 5\'s in the denominator with two 5\'s in the numerator.', 'Count the remaining 5\'s: there are 6.', 'Ask the student: "Did we divide the exponents 8 and 2?'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch2_9', difficulty: 'standard',
          question: 'The power of a power rule states that when a power is raised to another power.',
          hint: 'Revisit c8_math_ch2_7 (Multiplying Powers with Same Base) and practice expanding both.',
          misconception: 'Students add the exponents instead of multiplying them: (a^m)^n = a^(m+n) instead of a^(m×n).',
          parts: [
                { id: 'a', prompt: 'Explain why (3^4)^2 = 3^8 by writing out the repeated multiplication. Do not just state the rule.', answer: 'Correct explanation: (3^4)^2 = (3×3×3×3)^2 = (3×3×3×3) × (3×3×3×3) = 3^8',
                  options: ['Correct explanation: (3^4)^2 = (3×3×3×3)^2 = (3×3×3×3) × (3×3×3×3) = 3^8', 'we multiply exponents'],
                  hint: 'Revisit c8_math_ch2_7 (Multiplying Powers with Same Base) and practice expanding both (a^m)^n and.',
                  misconception: 'Students add the exponents instead of multiplying them: (a^m)^n = a^(m+n) instead of a^(m×n).' },
                { id: 'b', prompt: 'Compare and contrast: (2^3)^4 and 2^3 × 2^4. Are they equal? Explain using the meaning of exponents.', answer: 'Correct answer: Not equal',
                  options: ['Correct answer: Not equal', 'both involve 3 and 4'],
                  hint: 'Revisit c8_math_ch2_7 (Multiplying Powers with Same Base) and practice expanding both (a^m)^n and.',
                  misconception: 'Students add the exponents instead of multiplying them: (a^m)^n = a^(m+n) instead of a^(m×n).' }
          ],
            remediations: { 'students-add-the-exponents-instead': { steps: ['Ask the student to expand both (a^m)^n and a^m × a^n fully using repeated multiplication.', 'Have them count the total factors of a in each expansion.', 'Point out that in (a^m)^n, the group of m factors appears n times → m×n total.', 'Practice 3-4 pairs side-by-side: (x^2)^3 vs x^2 × x^3, (5^4)^2 vs 5^4 × 5^2, until the student can articulate the.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
