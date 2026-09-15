import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch03_p2: SimDef = {
    id: 'v3_c10_math_ch03_p2',
    title: 'Pair of Linear Equations in Two Variables · Part 2/2',
    subtitle: 'Find the exact point where two conditions agree',
    classLevel: 10, subject: 'mathematics', topic: 'Pair of Linear Equations in Two Variables · Part 2/2',
    chapters: ['c10_math_ch03'],
    nodeIds: ['c10_math_cbse_03_007', 'c10_math_cbse_03_008', 'c10_math_cbse_03_009', 'c10_math_cbse_03_010', 'c10_math_cbse_03_011', 'c10_math_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a comparison shopper decoding rival offers', intro: 'Two phone plans, two taxi fares, two age puzzles — life keeps handing you pairs of conditions at once. Each pair is two straight lines, and the answer lives where they meet — or explains why they never do.', goal: 'Solve pairs of linear equations graphically and algebraically, and classify them as consistent, inconsistent or dependent.' },
    discovery: {
        question: 'Two lines can meet once, never, or everywhere — and each case has a real-world meaning. Which is which?',
        options: ['Unique / no / infinite solutions — consistent, inconsistent, dependent', 'All three mean no solution', 'Lines always meet exactly once', 'Parallel lines meet at infinity only in theory'],
        answer: 'Unique / no / infinite solutions — consistent, inconsistent, dependent',
        hook: 'Every pair of equations is a question with three possible answers — this chapter teaches you to tell them apart instantly.',
    },
    teaching: [
        { title: 'Cross-Multiplication Method for Solving Linear Equations', text: 'The cross-multiplication method is an algebraic technique to solve a pair of linear equations in two variables of the form \\(a_1x + b_1y + c_1 = 0\\) and \\(a_2x + b_2y + c_2 = 0\\) by using the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_03_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Solve real dilemmas with two variables at once: plot both equations, read their crossing, then verify with substitution and elimination — and spot the sneaky cases with no solution or infinitely many.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_007', title: 'Cross-Multiplication Method for Solving Linear Equations',
          scaffold: { problem: 'Ravi buys 3 pens and 4 notebooks for ₹110. His friend buys 2 pens and 5 notebooks for ₹100.',
            steps: [
            { text: 'Let cost of one pen = ₹\\(x\\), cost of one notebook = ₹\\(y\\). Form equations: \\(3x + 4y = 110\\) and \\(2x + 5y = 100\\).' },
            { text: 'Rewrite in standard form \\(a_1x + b_1y + c_1 = 0\\): \\(3x + 4y - 110 = 0\\) and \\(2x + 5y - 100 = 0\\).' },
            { text: 'Write the cross-multiplication formula: \\(\\frac{x}{b_1c_2 - b_2c_1} = \\frac{y}{c_1a_2 - c_2a_1} = \\frac{1}{a_1b_2.' },
            { text: 'Compute each denominator:' },
            { text: 'Equate each to \\(\\frac{1}{7}\\): \\(x = \\frac{150}{7} = 21.43\\), \\(y = \\frac{80}{7} = 11.43\\).', faded: true, blankAnswer: 'Cost of one pen = ₹\\(\\frac{150}{7}\\) ≈ ₹21.43, cost of one.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_008', title: 'Equations Reducible to Pair of Linear Equations (Substitution)',
          scaffold: { problem: 'A motorboat goes 30 km upstream and 28 km downstream in 7 hours. It can go 21 km upstream and return in 5 hours.',
            steps: [
            { text: 'Identify variables. Let speed of boat in still water = x km/h, speed of stream = y km/h.' },
            { text: 'Form equations using Time = Distance/Speed. 30/(x - y) + 28/(x + y) = 7 ...(i); 21/(x - y) + 21/(x + y) = 5 ...(ii).' },
            { text: 'Substitute u = 1/(x - y), v = 1/(x + y). Equations become: 30u + 28v = 7 ...(iii); 21u + 21v = 5 ...(iv).' },
            { text: 'Solve by substitution. From (iv): 21u = 5 - 21v → u = (5 - 21v)/21.' },
            { text: 'u = (5 - 21(1/14))/21 = (5 - 3/2)/21 = (7/2)/21 = 1/6.' },
            { text: 'Back-substitute: 1/(x - y) = 1/6 → x - y = 6; 1/(x + y) = 1/14 → x + y = 14.' },
            { text: 'Add: 2x = 20 → x = 10. Subtract: 2y = 8 → y = 4.' },
            { text: 'Verify: x > y > 0 satisfied. Upstream time = 30/6 = 5h, downstream = 28/14 = 2h, total 7h ✓.', faded: true, blankAnswer: 'Speed of boat in still water = 10 km/h, Speed of stream = 4.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_009', title: 'Word Problems: Age and Number Problems',
          scaffold: { problem: 'Five years ago, a mother was 7 times as old as her daughter. Five years hence, she will be 3 times as old as her daughter.',
            steps: [
            { text: 'Define variables. Let present age of mother = x years, present age of daughter = y years.' },
            { text: 'Translate first condition (5 years ago). Mother\'s age = x-5, Daughter\'s age = y-5.' },
            { text: 'Translate second condition (5 years hence). Mother\'s age = x+5, Daughter\'s age = y+5.' },
            { text: 'Solve the pair. Subtract Equation 2 from Equation 1: (x - 7y) - (x - 3y) = -30 - 10 → -4y = -40 → y = 10.' },
            { text: 'Verify. Present ages: Mother 40, Daughter 10. Five years ago: 35 and 5 → 35 = 7×5 ✓.', faded: true, blankAnswer: 'Mother\'s present age = 40 years, Daughter\'s present age.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_010', title: 'Word Problems: Speed, Distance and Time (Upstream/Downstream)',
          scaffold: { problem: 'A boat goes 30 km upstream and 44 km downstream in 10 hours. In 13 hours, it can go 40 km upstream and 55 km downstream.',
            steps: [
            { text: 'Define variables. Let speed of boat in still water = x km/h, speed of stream = y km/h.' },
            { text: 'Write time for each trip using Time = Distance/Speed. Trip 1: Time_upstream = 30/(x-y), Time_downstream = 44/(x+y).' },
            { text: 'Trip 2: Time_upstream = 40/(x-y), Time_downstream = 55/(x+y). Total time = 13 hours.' },
            { text: 'Substitute u = 1/(x-y), v = 1/(x+y). Equations become: 30u + 44v = 10 ...(i) and 40u + 55v = 13 ...(ii).' },
            { text: 'Back-substitute: u = 1/(x-y) = 1/5 → x - y = 5. v = 1/(x+y) = 1/11 → x + y = 11. Add: 2x = 16 → x = 8 km/h.' },
            { text: 'Verify: Upstream speed = 5 km/h, Downstream speed = 11 km/h. Trip 1: 30/5 + 44/11 = 6 + 4 = 10 hours ✓.', faded: true, blankAnswer: 'Speed of boat in still water = 8 km/h, Speed of stream = 3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_011', title: 'Word Problems: Fractions and Two-Digit Numbers',
          scaffold: { problem: 'The sum of the numerator and denominator of a fraction is 18. If the denominator is increased by 2, the fraction reduces to 1/3.',
            steps: [
            { text: 'Identify unknowns. Let numerator = \\(x\\), denominator = \\(y\\) (with \\(y \\neq 0\\)). The fraction is \\(\\frac{x}{y}\\).' },
            { text: 'Translate first condition: "Sum of numerator and denominator is 18" → \\(x + y = 18\\). (Equation 1)' },
            { text: 'Translate second condition: "Denominator increased by 2, fraction becomes 1/3" → \\(\\frac{x}{y+2} = \\frac{1}{3}\\).' },
            { text: 'Solve the pair using elimination. Add Equation 1 and Equation 2: \\((x + y) + (3x - y) = 18 + 2\\) → \\(4x = 20\\) → \\(x.' },
            { text: 'Substitute \\(x = 5\\) in Equation 1: \\(5 + y = 18\\) → \\(y = 13\\).' },
            { text: 'Verify: Fraction = \\(5/13\\). Sum = 18 ✓. Denominator + 2 = 15, \\(5/15 = 1/3\\) ✓. Denominator ≠ 0 ✓.', faded: true, blankAnswer: 'The fraction is \\(\\frac{5}{13}\\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_012', title: 'Word Problems: Fixed Charge Plus Variable Charge',
          scaffold: { problem: 'A taxi service charges a fixed fare for the first kilometre and a constant rate per kilometre thereafter.',
            steps: [
            { text: 'Define variables. Let fixed charge for the first km = ₹x, charge per subsequent km = ₹y.' },
            { text: 'For 12 km journey: first km is covered by fixed charge, remaining 11 km are charged at ₹y per km.' },
            { text: 'For 18 km journey: first km fixed, remaining 17 km at ₹y per km. Equation: x + 17y = 240.' },
            { text: 'Subtract the first equation from the second to eliminate x: (x + 17y) - (x + 11y) = 240 - 180 → 6y = 60 → y = 10.' },
            { text: 'Substitute y = 10 into the first equation: x + 11(10) = 180 → x + 110 = 180 → x = 70.' },
            { text: 'Verify with both scenarios: 12 km → 70 + 11×10 = 180 ✓; 18 km → 70 + 17×10 = 240 ✓.', faded: true, blankAnswer: 'Fixed charge for the first kilometre = ₹70; Rate per.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_03_012', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Two siblings compare receipts from the same shop: one paid ₹65 for 5 pens and 3 pencils, the other paid ₹50 for 2 pens and 4 pencils. A cousin claims each item\'s price is \'obviously\' the total divided by the count — about ₹8 each.',
            decisions: [{ prompt: 'How do you actually recover the two prices?', options: [
                { text: 'Set up two equations — 5p + 3q = 65 and 2p + 4q = 50 — and solve them together: elimination gives p = 10 and q = 5, so a pen costs ₹10 and a pencil ₹5. Graphically, the two lines intersect at that single point, which is the only price pair satisfying both bills.', outcome: 'Two unknowns need two independent equations — the pair of receipts supplies exactly that, and the solution is the point both conditions share.' },
                { text: 'The cousin\'s method works — dividing each total by the number of items gives the price of each thing.', outcome: 'Dividing the total by item count mixes two different prices into one average; ₹8 each predicts a bill of ₹64 for 8 items yet the receipts disagree, showing the two prices differ.', reveals: 'divide-total-by-count' },
                { text: 'The prices cannot be found — one shop visit\'s totals are not enough information to separate two items.', outcome: 'Two different purchases give two equations in the same two unknowns, which is exactly enough to pin down both prices.', reveals: 'two-unknowns-unsolvable' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_03_012', title: 'You made it',
          caseStudy: { intro: 'Graphical, substitution, elimination — three ways to solve the same pair. You now pick the fastest one.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_03_007', difficulty: 'standard',
          question: 'The cross-multiplication method is an algebraic technique to solve a pair.',
          hint: 'If stuck, revisit c9_math_ch2_8 (substitution method) and c8_math_ch10_7 (proportion.',
          misconception: 'Students often write the \\(y\\) denominator as \\(c_2a_1 - c_1a_2\\) instead of the correct \\(c_1a_2 - c_2a_1\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The cross-multiplication method is an algebraic technique to solve a pair of linear',
                  options: ['The cross-multiplication method is an algebraic technique to solve a pair of linear', 'A pair of linear equations in two variables is represented graphically by two straight', 'A system of two linear equations in two variables is consistent if it has at least one', 'A pair of linear equations in two variables is called an **inconsistent system** if the'],
                  hint: 'If stuck, revisit c9_math_ch2_8 (substitution method) and c8_math_ch10_7 (proportion.',
                  misconception: 'Students often write the \\(y\\) denominator as \\(c_2a_1 - c_1a_2\\) instead of the correct \\(c_1a_2 - c_2a_1\\).' }
          ],
            remediations: { 'students-often-write-the-y': { steps: ['Ask the student to write the standard form \\(a_1x + b_1y + c_1 = 0\\) for both equations and circle \\(a_1, b_1, c_1.', 'Have them write the cross-multiplication template \\(\\frac{x}{b_1c_2 - b_2c_1} = \\frac{y}{c_1a_2 - c_2a_1}.', 'Practice the cyclic pattern: for \\(x\\) denominator, cover the \\(x\\)-column coefficients and cross-multiply the.', 'Drill 5 problems where they only identify coefficients and write the three denominators without solving, until the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_008', difficulty: 'standard',
          question: 'Equations reducible to a pair of linear equations in two variables are.',
          hint: 'If stuck, revisit c10_math_cbse_03_005 (Substitution Method) and practice 5 problems with.',
          misconception: 'Students often substitute u = 1/x, v = 1/y correctly and solve the linear system, but then write the final answer.',
          parts: [
                { id: 'a', prompt: 'If the equations are 2/x + 3/y = 13 and 5/x - 4/y = -2, what substitution will reduce them to a pair of linear equations in two variables?', answer: 'Let u = 1/x and v = 1/y',
                  options: ['Let u = 1/x and v = 1/y', 'let u = x, v = y'],
                  hint: 'If stuck, revisit c10_math_cbse_03_005 (Substitution Method) and practice 5 problems with.',
                  misconception: 'Students often substitute u = 1/x, v = 1/y correctly and solve the linear system, but then write the final answer as (u, v) instead of (x.' }
          ],
            remediations: { 'students-often-substitute-u-1': { steps: ['If a student writes the final answer as u, v values: Ask them to re-read the question — "What are we asked to find?', 'The values of x and y, or u and v?" Then guide: "You found u = 1/x = 2.', 'Do the reverse: x = 1/u." Make them write the back-substitution step explicitly: "Since u = 1/x, therefore x = 1/u.', 'Then x = 1/0 which is undefined.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_009', difficulty: 'standard',
          question: 'Word problems on age and number involve translating real-life situations about.',
          hint: 'If stuck, revisit c10_math_cbse_03_005 (substitution), c10_math_cbse_03_006.',
          misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.',
          parts: [
                { id: 'a', prompt: 'In an age problem, if the present age of A is x years and present age of B is y years, how do you express "A\'s age 5 years ago" and "B\'s age 3 years hence".', answer: 'A\'s age 5 years ago = x - 5',
                  options: ['A\'s age 5 years ago = x - 5', 'number is 3 times sum of digits'],
                  hint: 'If stuck, revisit c10_math_cbse_03_005 (substitution), c10_math_cbse_03_006 (elimination).',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' },
                { id: 'b', prompt: 'A student writes the two-digit number with tens digit x and units digit y as x + y. Why is this incorrect? What is the correct algebraic representation?', answer: 'x + y gives the sum of digits, not the number',
                  options: ['x + y gives the sum of digits, not the number', 'number is 3 times sum of digits'],
                  hint: 'If stuck, revisit c10_math_cbse_03_005 (substitution), c10_math_cbse_03_006 (elimination).',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' },
                { id: 'c', prompt: 'The sum of the digits of a two-digit number is 11. If the number obtained by reversing the digits is 27 less than the original number, find the original.', answer: 'Let tens digit = x, units digit = y',
                  options: ['Let tens digit = x, units digit = y', 'number is 3 times sum of digits'],
                  hint: 'If stuck, revisit c10_math_cbse_03_005 (substitution), c10_math_cbse_03_006 (elimination).',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' },
                { id: 'd', prompt: 'Compare the two problems: (A) "Father is 3 times as old as son. In 10 years, he will be twice as old." (B) "Father is 3 times as old as son.', answer: 'Let father = x, son = y',
                  options: ['Let father = x, son = y', 'number is 3 times sum of digits'],
                  hint: 'If stuck, revisit c10_math_cbse_03_005 (substitution), c10_math_cbse_03_006 (elimination).',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['When a student writes 2F = S for "father is twice as old as son", ask: "If son is 10, how old is father?" (20).', '"Which equation gives 20 when you plug in 10?', 'F = 2×10 = 20, or 2F = 10 → F=5?" Show that F = 2S works.', 'Then have them practice 5 simple "A is k times B" translations with numbers first, then variables.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.',
          parts: [
                { id: 'a', prompt: 'A student solves an age problem and gets x = 12, y = 40 (son 12, father 40). The problem states: "Father is 4 times as old as son.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'number is 3 times sum of digits'],
                  hint: 'If stuck, revisit c10_math_cbse_03_005 (substitution), c10_math_cbse_03_006 (elimination).',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' },
                { id: 'b', prompt: 'Create an age word problem that leads to the equations: x + y = 50 and x - y = 10. State the problem clearly and identify what x and y represent.', answer: 'Example: "The sum of the ages of a father and son is 50 years',
                  options: ['Example: "The sum of the ages of a father and son is 50 years', 'number is 3 times sum of digits'],
                  hint: 'If stuck, revisit c10_math_cbse_03_005 (substitution), c10_math_cbse_03_006 (elimination).',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['When a student writes 2F = S for "father is twice as old as son", ask: "If son is 10, how old is father?" (20).', '"Which equation gives 20 when you plug in 10?', 'F = 2×10 = 20, or 2F = 10 → F=5?" Show that F = 2S works.', 'Then have them practice 5 simple "A is k times B" translations with numbers first, then variables.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_010', difficulty: 'standard',
          question: 'Upstream/downstream problems involve a boat or swimmer moving in a river with.',
          hint: 'If stuck, review c10_math_cbse_03_005/006/007 for solving methods and c6_math_ch06_065.',
          misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the.',
          parts: [
                { id: 'a', prompt: 'What are the expressions for downstream speed and upstream speed if the speed of a boat in still water is x km/h and the speed of the stream is y km/h?', answer: 'Downstream speed = (x + y) km/h, Upstream speed = (x - y) km/h',
                  options: ['Downstream speed = (x + y) km/h, Upstream speed = (x - y) km/h', 'upstream means going up, so add the stream speed', '"upstream means going up, so add the stream speed" or confuse'],
                  hint: 'If stuck, review c10_math_cbse_03_005/006/007 for solving methods and c6_math_ch06_065 for.',
                  misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the speed expressions.' },
                { id: 'b', prompt: 'A boat travels 30 km downstream in 2 hours and 30 km upstream in 3 hours. A student writes the equations: 30 = (x+y)×2 and 30 = (x-y)×3. Is this correct?', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'downstream = faster = less time for same distance', 'upstream means going up, so add the stream speed', '"upstream means going up, so add the stream speed" or confuse'],
                  hint: 'If stuck, review c10_math_cbse_03_005/006/007 for solving methods and c6_math_ch06_065 for.',
                  misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the speed expressions.' },
                { id: 'c', prompt: 'A boat goes 16 km upstream and 24 km downstream in 6 hours. It goes 12 km upstream and 36 km downstream in the same time.', answer: 'Let boat speed = x km/h, stream speed = y km/h',
                  options: ['Let boat speed = x km/h, stream speed = y km/h', 'upstream means going up, so add the stream speed', '"upstream means going up, so add the stream speed" or confuse'],
                  hint: 'If stuck, review c10_math_cbse_03_005/006/007 for solving methods and c6_math_ch06_065 for.',
                  misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the speed expressions.' },
                { id: 'd', prompt: 'Two students solve the same upstream/downstream problem. Student A uses substitution method after setting u=1/(x-y), v=1/(x+y).', answer: 'Student A\'s substitution (u,v) method is less error-prone',
                  options: ['Student A\'s substitution (u,v) method is less error-prone', 'upstream means going up, so add the stream speed', '"upstream means going up, so add the stream speed" or confuse'],
                  hint: 'If stuck, review c10_math_cbse_03_005/006/007 for solving methods and c6_math_ch06_065 for.',
                  misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the speed expressions.' }
          ],
            remediations: { 'students-write-the-equations-as': { steps: ['Draw a diagram — boat with arrow downstream (label x+y) and upstream (label x-y).', 'Write the rule: "Downstream = add, Upstream = subtract" on a sticky note.', 'For each trip, write: Time_upstream = Distance_upstream / (x-y); Time_downstream = Distance_downstream / (x+y).', 'If total time given, sum the two times.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_011', difficulty: 'standard',
          question: 'Word problems on fractions and two-digit numbers are real-life situations that.',
          hint: 'If stuck, revisit c8_math_ch5_10 (two-digit number reversal) for digit representation and.',
          misconception: 'Students consistently write the two-digit number as \\(x + y\\) instead of \\(10x + y\\), treating digits as addends rather.',
          parts: [
                { id: 'a', prompt: 'A student writes the two equations for a fraction problem as: \\(\\frac{x+2}{y} = 3\\) and \\(\\frac{x}{y+2} = \\frac{1}{3}\\).', answer: 'Yes, the translation is correct',
                  options: ['Yes, the translation is correct', 'both numerator and denominator change simultaneously'],
                  hint: 'If stuck, revisit c8_math_ch5_10 (two-digit number reversal) for digit representation and.',
                  misconception: 'Students consistently write the two-digit number as \\(x + y\\) instead of \\(10x + y\\), treating digits as addends rather than place-value.' }
          ],
            remediations: { 'students-consistently-write-the-two': { steps: ['Use physical place-value cards (or draw blocks) to show that a number with tens digit 4 and units digit 2 is 40 + 2.', 'Give 5 simple statements like "The number is 3 times the units digit" and have the student write the equation in both.', 'For fractions, practice cross-multiplication drills: \\(\\frac{x}{y} = \\frac{2}{3} \\Rightarrow 3x = 2y\\).', 'Do a "condition parsing" exercise: read one condition aloud, student writes ONLY that equation.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_012', difficulty: 'standard',
          question: 'A fixed charge plus variable charge problem is a real-world situation where the.',
          hint: 'Review the elimination method (c10_math_cbse_03_006) and practice forming equations from.',
          misconception: 'Students often write the equations as: fixed charge × units + variable charge = total cost.',
          parts: [
                { id: 'a', prompt: 'Compare the elimination method and substitution method for solving the equations from the telephone bill problem. Which is more efficient and why?', answer: 'Elimination is more efficient',
                  options: ['Elimination is more efficient', 'substitution is better'],
                  hint: 'Review the elimination method (c10_math_cbse_03_006) and practice forming equations from word.',
                  misconception: 'Students often write the equations as: fixed charge × units + variable charge = total cost.' }
          ],
            remediations: { 'students-often-write-the-equations': { steps: ['Remediation: Use a concrete example with tiny numbers.', 'Ask: "If the fixed charge for the first 2 km is ₹20 and the per km charge after that is ₹5, what is the fare for 4 km?".', 'Then ask: "Which number did you multiply by 2?', 'Which number did you just add?" Guide them to see the fixed charge (₹20) was added once, while the per km charge (₹5).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
