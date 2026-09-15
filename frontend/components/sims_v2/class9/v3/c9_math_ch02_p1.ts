import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch02_p1: SimDef = {
    id: 'v3_c9_math_ch02_p1',
    title: 'Linear Equations and Linear Patterns · Part 1/2',
    subtitle: 'The ₹15-per-km shape of equations',
    classLevel: 9, subject: 'mathematics', topic: 'Linear Equations and Linear Patterns · Part 1/2',
    chapters: ['c9_math_ch02'],
    nodeIds: ['c9_math_ch2_1', 'c9_math_ch2_10', 'c9_math_ch2_2', 'c9_math_ch2_3', 'c9_math_ch2_4', 'c9_math_ch2_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a rate-and-fee modeller', intro: 'Taxi fares, delivery fees, weekly wages — tons of real bills have the same skeleton: rate × amount + fixed charge. Learn to recognise it as ax + b, and to catch the imposters.', goal: 'Identify linear polynomials in one variable — form ax + b with a ≠ 0 — and distinguish them from expressions with x², 1/x, √x or a vanishing x-term.' },
    discovery: {
        question: 'A taxi charges ₹15 per km plus a flat ₹50 booking fee — so the bill is 15x + 50. Now: is 0x + 4 also a linear polynomial?',
        options: ['No — the x-coefficient must be non-zero; 0x + 4 collapses to a plain constant, no variable left', 'Yes — it has an x written in it', 'Yes — anything with two terms counts', 'No — because 4 isn\'t a coefficient'],
        answer: 'No — the x-coefficient must be non-zero; 0x + 4 collapses to a plain constant, no variable left',
        hook: 'Spotting an \'x\' isn\'t enough. In 1/x + 2, √x + 5 or x² + 3x the variable hides in a denominator, a root or a second power — none are linear. Only the honest form ax + b, a ≠ 0, qualifies.',
    },
    teaching: [
        { title: 'Linear Polynomial: Definition and Standard Form', text: 'A linear polynomial in one variable is an algebraic expression of the form \\(ax + b\\), where \\(a\\) and \\(b\\) are real numbers, \\(a \\neq 0\\), and \\(x\\) is the variable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch2_1', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Run the three-condition checklist — one variable, power exactly 1, coefficient not zero — over a lineup of expressions, then model real life: write 25x + 10 for notebooks-plus-delivery and explain what each number means.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_1', title: 'Linear Polynomial: Definition and Standard Form',
          scaffold: { problem: 'A mobile phone recharge plan charges ₹8 per minute of talk time plus a fixed monthly rental of ₹150.',
            steps: [
            { text: 'Identify the variable quantity — the number of minutes used, denoted by \\(x\\).' },
            { text: 'Identify the rate that multiplies the variable — ₹8 per minute, so the variable term is \\(8x\\).' },
            { text: 'Identify the fixed amount that does not depend on \\(x\\) — ₹150 monthly rental, so the constant term is \\(150\\).' },
            { text: 'Write the expression with the variable term first (descending powers of \\(x\\)): \\(8x + 150\\).' },
            { text: 'Interpret: \\(a = 8\\) means the cost increases by ₹8 for each additional minute; \\(b = 150\\) means even with 0 minutes.', faded: true, blankAnswer: '\\(8x + 150\\); coefficient \\(a = 8\\) (rate per minute).' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_10', title: 'Word Problems Using Linear Equations',
          scaffold: { problem: 'A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey.',
            steps: [
            { text: 'Let the original speed be x km/h. Time taken at original speed = 360/x hours.' },
            { text: 'New speed = (x+5) km/h. Time taken at new speed = 360/(x+5) hours.' },
            { text: 'According to problem, difference in time is 1 hour: 360/x - 360/(x+5) = 1.' },
            { text: 'Multiply both sides by x(x+5): 360(x+5) - 360x = x(x+5) → 360x+1800-360x = x²+5x → 1800 = x²+5x → x²+5x-1800=0.' },
            { text: 'Solve quadratic: (x+45)(x-40)=0 → x=40 or x=-45. Speed cannot be negative, so x=40 km/h.', faded: true, blankAnswer: 'Original speed = 40 km/h' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_2', title: 'Degree and Coefficients of a Linear Polynomial',
          scaffold: { problem: 'A plumber charges ₹300 for a home visit plus ₹150 per hour of work. Write the polynomial for total charge \\(C\\) for \\(h\\) hours.',
            steps: [
            { text: 'Identify the variable and constants from the word problem. Variable = \\(h\\) (hours worked).' },
            { text: 'Write the polynomial in standard form \\(ah + b\\). Here \\(a = 150\\), \\(b = 300\\), so \\(C(h) = 150h + 300\\).' },
            { text: 'Identify degree, leading coefficient, constant term. The term with \\(h\\) is \\(150h = 150h^1\\), so degree = 1.' },
            { text: 'Evaluate at \\(h = 3.5\\). Substitute: \\(C(3.5) = 150 \\times 3.5 + 300\\).' },
            { text: 'State answer with units. Total charge = ₹825 for 3.5 hours.', faded: true, blankAnswer: 'Polynomial: \\(C(h) = 150h + 300\\). Degree = 1, Leading.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_3', title: 'Linear Patterns in Real-Life Situations',
          scaffold: { problem: 'A taxi service charges Rs 25 base fare plus Rs 14 per km. Write the linear equation for the total fare F for x km.',
            steps: [
            { text: 'Identify the rate of change (m) and initial value (c). m = 14 (Rs per km), c = 25 (base fare).' },
            { text: 'Write the equation. F = 14x + 25.' },
            { text: 'Calculate fare for 8 km. F = 14(8) + 25 = 112 + 25 = Rs 137.' },
            { text: 'Find km for Rs 200. Set F = 200: 200 = 14x + 25. Subtract 25: 175 = 14x. Divide: x = 12.5 km.' },
            { text: 'Verify. 14(12.5) + 25 = 175 + 25 = 200. Correct.', faded: true, blankAnswer: 'Equation: F = 14x + 25. Fare for 8 km: F = 14(8) + 25 =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_4', title: 'Growth and Decay as Linear Relationships',
          scaffold: { problem: 'A village pond initially has 10,000 litres of water. During a dry season, water evaporates at a constant rate of 250 litres per day.',
            steps: [
            { text: 'Identify the initial volume (when d=0): V = 10,000 litres.' },
            { text: 'Identify the rate of change: water decreases by 250 litres per day, so rate = -250 litres/day.' },
            { text: 'Write the linear equation: V = 10000 - 250d.' },
            { text: 'Substitute d = 12: V = 10000 - 250×12 = 10000 - 3000 = 7000 litres.' },
            { text: 'Find when V = 0: 0 = 10000 - 250d => 250d = 10000 => d = 40 days.', faded: true, blankAnswer: 'Volume after 12 days = 7000 litres; pond dries after 40.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_5', title: 'Graph of a Linear Equation in Two Variables',
          scaffold: { problem: 'Ravi has ₹500 to spend on pens (₹20 each) and notebooks (₹50 each).',
            steps: [
            { text: 'Identify variables and form equation. Let x = number of pens, y = number of notebooks. Cost equation: 20x + 50y = 500.' },
            { text: 'Find x-intercept (y = 0): 2x + 5(0) = 50 → 2x = 50 → x = 25. Point A: (25, 0). This means 25 pens, 0 notebooks.' },
            { text: 'Find y-intercept (x = 0): 2(0) + 5y = 50 → 5y = 50 → y = 10. Point B: (0, 10). This means 0 pens, 10 notebooks.' },
            { text: 'Find two more points. Choose x = 5: 2(5) + 5y = 50 → 10 + 5y = 50 → 5y = 40 → y = 8. Point C: (5, 8).' },
            { text: 'Plot points A(25,0), B(0,10), C(5,8), D(15,4) on graph paper with suitable scale (1 cm = 2 units on x-axis, 1 cm = 1.', faded: true, blankAnswer: 'Equation: 2x + 5y = 50. Solutions: (25, 0), (0, 10), (5.' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch2_5', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting expressions on a worksheet, Priya circles 1/x + 2, x² + 3x, and 0x + 4 as \'all linear polynomials — I can see an x in each one.\'',
            decisions: [{ prompt: 'Which of her picks actually qualify?', options: [
                { text: 'None of them. A linear polynomial is ax + b with a ≠ 0 and x only to the first power: 1/x puts x in a denominator, x² raises it to power 2, and 0x + 4 collapses to the constant 4. Seeing an x is not the test — the power and the coefficient are.', outcome: 'This applies the real criteria — degree 1 and non-zero coefficient — instead of scanning for the letter x.' },
                { text: 'All three qualify — any expression containing x is a linear polynomial by definition.', outcome: 'That test would make √x and 1/x \'linear\'; the definition restricts x to power 1 with a non-zero coefficient.', reveals: 'x-present-is-linear' },
                { text: 'Only 0x + 4 counts, because it already looks like ax + b written out.', outcome: 'It only looks the part — with a = 0 the variable vanishes and what remains is a constant, not a linear expression.', reveals: 'zero-coefficient-linear' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch2_5', title: 'The bigger picture',
          caseStudy: { intro: 'A linear polynomial is one variable\'s story told at power 1: a changing part (ax) plus a fixed part (b). If the x-term\'s coefficient hits zero, the story loses its variable entirely.',
            decisions: [{ prompt: 'What comes next? Linear Equations and Linear Patterns · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Linear Equations and Linear Patterns · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch2_1', difficulty: 'standard',
          question: 'A linear polynomial in one variable is an algebraic expression of the form \\(ax.',
          hint: 'If stuck, revisit Class 8 algebraic expressions (c8_math_ch13_5 and c8_math_ch13_6).',
          misconception: 'Students often think that any expression with \\(x\\) in it is a linear polynomial.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a linear polynomial in standard form? (A) \\(5 + 3x\\) (B) \\(3x + 5\\) (C) \\(x^2 + 2x + 1\\) (D) \\(7\\)', answer: '\\(3x + 5\\) (',
                  options: ['\\(3x + 5\\) (', 'being a linear polynomial', 'being in standard form', 'any expression with \\(x\\) in it is a linear polynomial'],
                  hint: 'If stuck, revisit Class 8 algebraic expressions (c8_math_ch13_5 and c8_math_ch13_6) to practice.',
                  misconception: 'Students often think that any expression with \\(x\\) in it is a linear polynomial.' },
                { id: 'b', prompt: 'Explain why the expression \\(0x + 4\\) is NOT considered a linear polynomial, even though it can be written in the form \\(ax + b\\).', answer: 'The expression \\(0x + 4\\) simplifies to \\(4\\)',
                  options: ['The expression \\(0x + 4\\) simplifies to \\(4\\)', 'it is linear because it looks like \\(ax + b\\)', 'any expression with \\(x\\) in it is a linear polynomial'],
                  hint: 'If stuck, revisit Class 8 algebraic expressions (c8_math_ch13_5 and c8_math_ch13_6) to practice.',
                  misconception: 'Students often think that any expression with \\(x\\) in it is a linear polynomial.' },
                { id: 'c', prompt: 'Write the following expressions in standard form \\(ax + b\\) and state the values of \\(a\\) and \\(b\\): (i) \\(7 - 2x\\) (ii) \\(x\\) (iii) \\(5x - \\frac{3}{2}\\)', answer: '(i) \\(7 - 2x = -2x + 7\\), so \\(a = -2\\), \\(b = 7\\)',
                  options: ['(i) \\(7 - 2x = -2x + 7\\), so \\(a = -2\\), \\(b = 7\\)', 'any expression with \\(x\\) in it is a linear polynomial'],
                  hint: 'If stuck, revisit Class 8 algebraic expressions (c8_math_ch13_5 and c8_math_ch13_6) to practice.',
                  misconception: 'Students often think that any expression with \\(x\\) in it is a linear polynomial.' },
                { id: 'd', prompt: 'Consider the expressions \\(P(x) = 3x + 2\\) and \\(Q(x) = 2x + 3\\). Is the sum \\(P(x) + Q(x)\\) a linear polynomial?', answer: 'Sum: \\(P(x) + Q(x) = (3x + 2) + (2x + 3) = 5x + 5\\)',
                  options: ['Sum: \\(P(x) + Q(x) = (3x + 2) + (2x + 3) = 5x + 5\\)', 'both are linear', 'any expression with \\(x\\) in it is a linear polynomial'],
                  hint: 'If stuck, revisit Class 8 algebraic expressions (c8_math_ch13_5 and c8_math_ch13_6) to practice.',
                  misconception: 'Students often think that any expression with \\(x\\) in it is a linear polynomial.' }
          ],
            remediations: { 'any-expression-with-x-in': { steps: ['Ask the student to write the definition of a linear polynomial from memory, highlighting the three conditions: (i) only.', 'Give a set of 5 expressions — some linear polynomials, some not — and have the student test each against the three.', 'For each non-linear expression, ask the student to identify exactly which condition fails (e.g., "In \\(x^2 + 3\\), the.', 'Emphasise that the form \\(ax + b\\) is a RESULT of the definition, not the definition itself — the definition is about.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any expression with \\(x\\) in it is a linear polynomial.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The expression \\(\\frac{2x + 4}{2}\\) is not a linear polynomial because it has a fraction." Evaluate this claim and correct the student\'s.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'rational expression', 'polynomial', 'any expression with \\(x\\) in it is a linear polynomial'],
                  hint: 'If stuck, revisit Class 8 algebraic expressions (c8_math_ch13_5 and c8_math_ch13_6) to practice.',
                  misconception: 'Students often think that any expression with \\(x\\) in it is a linear polynomial.' }
          ],
            remediations: { 'any-expression-with-x-in': { steps: ['Ask the student to write the definition of a linear polynomial from memory, highlighting the three conditions: (i) only.', 'Give a set of 5 expressions — some linear polynomials, some not — and have the student test each against the three.', 'For each non-linear expression, ask the student to identify exactly which condition fails (e.g., "In \\(x^2 + 3\\), the.', 'Emphasise that the form \\(ax + b\\) is a RESULT of the definition, not the definition itself — the definition is about.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_10', difficulty: 'standard',
          question: 'A word problem using linear equations is a real-world situation described.',
          hint: 'If stuck, revisit c9_math_ch2_8 (substitution method) and practice forming equations from.',
          misconception: 'Students often write the equation for "total time" in distance-speed-time problems as (distance1 + distance2) / (speed1.',
          parts: [
                { id: 'a', prompt: 'Ravi is 3 times as old as his son. After 10 years, Ravi will be twice as old as his son. Find their present ages.', answer: 'Let son\'s age = x, Ravi\'s age = 3x',
                  options: ['Let son\'s age = x, Ravi\'s age = 3x', 'after 10 years'],
                  hint: 'If stuck, revisit c9_math_ch2_8 (substitution method) and practice forming equations from simple.',
                  misconception: 'Students often write the equation for "total time" in distance-speed-time problems as (distance1 + distance2) / (speed1 + speed2) = total.' },
                { id: 'b', prompt: 'A boat travels 30 km upstream and 44 km downstream in 10 hours. It travels 40 km upstream and 55 km downstream in 13 hours.', answer: 'Let boat speed in still water = x km/h, stream speed = y km/h',
                  options: ['Let boat speed in still water = x km/h, stream speed = y km/h', 'speed adds linearly with distance'],
                  hint: 'If stuck, revisit c9_math_ch2_8 (substitution method) and practice forming equations from simple.',
                  misconception: 'Students often write the equation for "total time" in distance-speed-time problems as (distance1 + distance2) / (speed1 + speed2) = total.' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['If a student makes this error, first ask: "If you drive 60 km at 30 km/h, how long does that take?', 'Add those times." Then show the wrong formula gives 2 hours, but actual is 4 hours.', 'Have them compute time for each segment separately using time = distance/speed, then add.', 'Finally, generalize: total time = Σ (distance_i / speed_i).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_2', difficulty: 'standard',
          question: 'A linear polynomial in one variable is an expression of the form \\(ax + b\\).',
          hint: 'Revisit c6_math_ch05_053 (terms and coefficients) and c7_math_ch04_002 (algebraic.',
          misconception: 'Students incorrectly identify the leading coefficient as the first-written term\'s coefficient rather than the.',
          parts: [
                { id: 'a', prompt: 'What is the degree of the polynomial \\(7x - 3\\)? State the leading coefficient and the constant term.', answer: 'The degree is 1, the leading coefficient is 7, and the constant term is -3',
                  options: ['The degree is 1, the leading coefficient is 7, and the constant term is -3', 'leading', 'leading term', 'the degree is the number of terms rather than the highest power of the variable'],
                  hint: 'Revisit c6_math_ch05_053 (terms and coefficients) and c7_math_ch04_002 (algebraic expressions with.',
                  misconception: 'Students incorrectly identify the leading coefficient as the first-written term\'s coefficient rather than the coefficient of the.' },
                { id: 'b', prompt: 'Consider the polynomials \\(P(x) = 2x + 5\\) and \\(Q(x) = 5x + 2\\). Compare their degrees, leading coefficients, and constant terms.', answer: 'Both have degree 1',
                  options: ['Both have degree 1', 'leading', 'leading term'],
                  hint: 'Revisit c6_math_ch05_053 (terms and coefficients) and c7_math_ch04_002 (algebraic expressions with.',
                  misconception: 'Students incorrectly identify the leading coefficient as the first-written term\'s coefficient rather than the coefficient of the.' }
          ],
            remediations: { 'students-incorrectly-identify-the-leading': { steps: ['If a student makes this error, write two polynomials side by side: \\(2x + 5\\) and \\(5 + 2x\\).', 'Ask: "Are these the same polynomial?" (Yes).', '"What is the degree of each?" (1).', '"Which term has the highest power?" (The \\(x\\) term in both).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_3', difficulty: 'standard',
          question: 'Linear patterns in real-life situations are relationships where one quantity.',
          hint: 'Revisit c9_math_ch2_1 (Linear Polynomials) for the algebraic form and c8_math_ch7_1.',
          misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern.',
          parts: [
                { id: 'a', prompt: 'A water tank fills at 5 liters per minute. It already has 20 liters. Write the linear equation for the total volume V after t minutes.', answer: 'V = 5t + 20',
                  options: ['V = 5t + 20', 'increasing', 'linear', 'the pattern is linear, without checking whether the rate of increase is constant'],
                  hint: 'Revisit c9_math_ch2_1 (Linear Polynomials) for the algebraic form and c8_math_ch7_1 (Class 8 Linear.',
                  misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is linear, without.' },
                { id: 'b', prompt: 'A mobile plan charges Rs 200 monthly rental plus Rs 1.50 per minute of calls. Write the equation for the monthly bill B in terms of call minutes n.', answer: 'B = 1.50n + 200',
                  options: ['B = 1.50n + 200', 'increasing', 'linear', 'the pattern is linear, without checking whether the rate of increase is constant'],
                  hint: 'Revisit c9_math_ch2_1 (Linear Polynomials) for the algebraic form and c8_math_ch7_1 (Class 8 Linear.',
                  misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is linear, without.' },
                { id: 'c', prompt: 'Determine whether the following pattern is linear or non-linear: 3, 7, 11, 15, 19, 23. Justify your answer.', answer: 'Linear',
                  options: ['Linear', 'linear because the numbers increase', 'increasing'],
                  hint: 'Revisit c9_math_ch2_1 (Linear Polynomials) for the algebraic form and c8_math_ch7_1 (Class 8 Linear.',
                  misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is linear, without.' },
                { id: 'd', prompt: 'A student claims: "If a quantity increases, it must follow a linear pattern." Give a counterexample and explain why it is non-linear.', answer: 'Counterexample: Compound interest',
                  options: ['Counterexample: Compound interest', 'increasing', 'linear', 'the pattern is linear, without checking whether the rate of increase is constant'],
                  hint: 'Revisit c9_math_ch2_1 (Linear Polynomials) for the algebraic form and c8_math_ch7_1 (Class 8 Linear.',
                  misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is linear, without.' }
          ],
            remediations: { 'students-confuse-increasing-with-linear': { steps: ['Give the student two sequences: (a) 2, 5, 8, 11, 14 (linear, d=3) and (b) 2, 4, 8, 16, 32 (exponential, d=2,4,8,16).', 'How do you know?" (Check differences: constant = linear, changing = non-linear.) 3.', 'Have them write y = mx + c for the linear sequence (y = 3x + 2).', 'Practice with real-life contexts: taxi fare, phone bill, water tank.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_4', difficulty: 'standard',
          question: 'A linear growth or decay relationship occurs when a quantity changes by.',
          hint: 'Review c9_math_ch2_3 (Linear Patterns in Real-Life Situations) and c8_math_ch2_2.',
          misconception: 'Students often confuse linear decay with exponential decay: they think "decay" always means multiplying by a factor.',
          parts: [
                { id: 'a', prompt: 'A water tank initially contains 500 litres. Water leaks out at a constant rate of 12 litres per hour.', answer: 'Equation: \\(V = 500 - 12t\\)',
                  options: ['Equation: \\(V = 500 - 12t\\)', '"decay" always means multiplying by a factor (like 0'],
                  hint: 'Review c9_math_ch2_3 (Linear Patterns in Real-Life Situations) and c8_math_ch2_2 (Exponential.',
                  misconception: 'Students often confuse linear decay with exponential decay: they think "decay" always means multiplying by a factor (like 0.9 each year).' },
                { id: 'b', prompt: 'Two plants grow linearly. Plant A: height = \\(10 + 2t\\) cm. Plant B: height = \\(5 + 3t\\) cm (\\(t\\) in weeks).', answer: 'Set \\(10 + 2t = 5 + 3t \\Rightarrow t = 5\\) weeks',
                  options: ['Set \\(10 + 2t = 5 + 3t \\Rightarrow t = 5\\) weeks', '"decay" always means multiplying by a factor (like 0'],
                  hint: 'Review c9_math_ch2_3 (Linear Patterns in Real-Life Situations) and c8_math_ch2_2 (Exponential.',
                  misconception: 'Students often confuse linear decay with exponential decay: they think "decay" always means multiplying by a factor (like 0.9 each year).' }
          ],
            remediations: { 'students-often-confuse-linear-decay': { steps: ['Have the student make a table of values for the car\'s value year by year using constant subtraction (500000, 480000.', 'Plot these points to see they lie on a straight line.', 'Contrast with a table for 10% depreciation (multiply by 0.9 each year) and plot to see the curve.', 'Emphasize: "constant amount subtracted" → linear; "constant percentage multiplied" → exponential.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_5', difficulty: 'standard',
          question: 'A linear equation in two variables, expressed as ax + by + c = 0 where a, b,.',
          hint: 'If stuck, revisit c7_math_ch15_003 (solving linear equations systematically) and.',
          misconception: 'Students often believe that only integer coordinates can be solutions of a linear equation, so they only plot points.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A linear equation in two variables, expressed as ax + by + c = 0 where a, b, c are real',
                  options: ['A linear equation in two variables, expressed as ax + by + c = 0 where a, b, c are real', 'A linear polynomial in one variable is an algebraic expression of the form \\(ax + b\\),', 'A word problem using linear equations is a real-world situation described in words that', 'A linear polynomial in one variable is an expression of the form \\(ax + b\\) where \\(a\\)'],
                  hint: 'If stuck, revisit c7_math_ch15_003 (solving linear equations systematically) and c6_math_ch07_070.',
                  misconception: 'Students often believe that only integer coordinates can be solutions of a linear equation, so they only plot points where both x and y are.' }
          ],
            remediations: { 'only-integer-coordinates-can-be': { steps: ['If a student only plots integer points or makes sign errors: (1) Have them choose x = -1, 0, 1, 2, 3 and compute y for.', '(2) Ask them to verify each computed (x, y) by plugging back into the original equation.', '(3) Show that the points form a straight line when connected, and ask them to predict y for x = 0.5 using the line.', '(4) Emphasise that the line contains infinitely many points, including decimals and fractions, not just the plotted.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
