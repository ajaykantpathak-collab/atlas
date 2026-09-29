import type { SimDef } from '../../engine/types';
import C9_MathematicsSolvingSimultaneousLinearSim from '../../../simulations/c6_12/C9_MathematicsSolvingSimultaneousLinearSim';

/** v3 wrapped master — C9_MathematicsSolvingSimultaneousLinearSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_mathematicssolvingsimultaneouslinearsim: SimDef = {
    id: 'v3w_c9_mathematicssolvingsimultaneouslinearsim',
    title: 'Pair of Linear Equations: Consistent and Inconsistent Systems',
    subtitle: 'Covers pairs of linear equations in two variables with real coefficients; includes.',
    classLevel: 9, subject: 'mathematics', topic: 'Pair of Linear Equations: Consistent and Inconsistent Systems',
    chapters: [],
    nodeIds: ['c9_math_ch2_9', 'c9_math_ch2_10', 'c9_math_ch2_3', 'c9_math_ch2_5', 'c9_math_ch2_7', 'c9_math_ch2_8', 'c9_math_ch2_1', 'c9_math_ch2_2', 'c9_math_ch2_4', 'c9_math_ch2_6', 'c9_math_ch8_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you and your friend go to a stationery shop. You buy 3 pens and 2 notebooks for ₹110, and your friend.', goal: 'Master Pair of Linear Equations: Consistent and Inconsistent Systems.' },
    discovery: {
        question: 'Determine whether the following pair is consistent or inconsistent.',
        options: ['Write equations in standard form: \\(5x - 3y - 11 = 0\\) and \\(10x - 6y - 22 = 0\\)', 'unique solution', 'inconsistent'],
        answer: 'Write equations in standard form: \\(5x - 3y - 11 = 0\\) and \\(10x - 6y - 22 = 0\\)',
        hook: 'Students often think that if \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\), the system is automatically inconsistent.',
    },
    teaching: [
        { title: 'A pair of linear equations in two variables.', text: 'A pair of linear equations in two variables is **consistent** if there exists at least one ordered pair (x, y) that satisfies both equations simultaneously; it is **inconsistent** if no such ordered.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_math_ch2_9', title: 'A pair of linear equations in two.',
          scaffold: { problem: 'A school canteen sells samosas and sandwiches. On Monday, 5 samosas and 3 sandwiches cost ₹110.',
            steps: [
            { text: 'Let \\(x\\) = cost of one samosa (in ₹), \\(y\\) = cost of one sandwich (in ₹).' },
            { text: 'Convert to standard form: \\(5x + 3y - 110 = 0\\) and \\(10x + 6y - 220 = 0\\).' },
            { text: 'Compute the three ratios: \\(\\frac{a_1}{a_2} = \\frac{5}{10} = \\frac{1}{2}\\); \\(\\frac{b_1}{b_2} = \\frac{3}{6} =.' },
            { text: 'Compare ratios: \\(\\frac{1}{2} = \\frac{1}{2} = \\frac{1}{2}\\). All three are equal → the system is consistent and.' },
            { text: 'Since there are infinitely many solutions, we cannot find unique prices.', faded: true, blankAnswer: 'Consistent with infinitely many solutions; unique costs.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_10', title: 'A word problem using linear equations.',
          scaffold: { problem: 'A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey.',
            steps: [
            { text: 'Let the original speed be x km/h. Time taken at original speed = 360/x hours.' },
            { text: 'New speed = (x+5) km/h. Time taken at new speed = 360/(x+5) hours.' },
            { text: 'According to problem, difference in time is 1 hour: 360/x - 360/(x+5) = 1.' },
            { text: 'Multiply both sides by x(x+5): 360(x+5) - 360x = x(x+5) → 360x+1800-360x = x²+5x → 1800 = x²+5x → x²+5x-1800=0.' },
            { text: 'Solve quadratic: (x+45)(x-40)=0 → x=40 or x=-45. Speed cannot be negative, so x=40 km/h.', faded: true, blankAnswer: 'Original speed = 40 km/h' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_3', title: 'Linear patterns in real-life situations.',
          scaffold: { problem: 'A taxi service charges Rs 25 base fare plus Rs 14 per km. Write the linear equation for the total fare F for x km.',
            steps: [
            { text: 'Identify the rate of change (m) and initial value (c). m = 14 (Rs per km), c = 25 (base fare).' },
            { text: 'Write the equation. F = 14x + 25.' },
            { text: 'Calculate fare for 8 km. F = 14(8) + 25 = 112 + 25 = Rs 137.' },
            { text: 'Find km for Rs 200. Set F = 200: 200 = 14x + 25. Subtract 25: 175 = 14x. Divide: x = 12.5 km.' },
            { text: 'Verify. 14(12.5) + 25 = 175 + 25 = 200. Correct.', faded: true, blankAnswer: 'Equation: F = 14x + 25. Fare for 8 km: F = 14(8) + 25 = Rs.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_5', title: 'A linear equation in two variables,.',
          scaffold: { problem: 'Ravi has ₹500 to spend on pens (₹20 each) and notebooks (₹50 each).',
            steps: [
            { text: 'Identify variables and form equation. Let x = number of pens, y = number of notebooks. Cost equation: 20x + 50y = 500.' },
            { text: 'Find x-intercept (y = 0): 2x + 5(0) = 50 → 2x = 50 → x = 25. Point A: (25, 0). This means 25 pens, 0 notebooks.' },
            { text: 'Find y-intercept (x = 0): 2(0) + 5y = 50 → 5y = 50 → y = 10. Point B: (0, 10). This means 0 pens, 10 notebooks.' },
            { text: 'Find two more points. Choose x = 5: 2(5) + 5y = 50 → 10 + 5y = 50 → 5y = 40 → y = 8. Point C: (5, 8).' },
            { text: 'Plot points A(25,0), B(0,10), C(5,8), D(15,4) on graph paper with suitable scale (1 cm = 2 units on x-axis, 1 cm = 1.', faded: true, blankAnswer: 'Equation: 2x + 5y = 50. Solutions: (25, 0), (0, 10), (5,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_7', title: 'Visualising linear relationships on a.',
          scaffold: { problem: 'A mobile recharge plan costs ₹150 per month plus ₹2 per minute of calls.',
            steps: [
            { text: 'Identify the fixed cost (y-intercept) and variable cost per minute (slope). Fixed = ₹150 → c = 150.' },
            { text: 'Find the y-intercept for plotting: set x = 0 → y = 150. Plot point A(0, 150). This is the cost with zero calls.' },
            { text: 'Use slope m = 2 = 2/1 to find a second point. From A(0, 150), move right 1 (run), up 2 (rise) → B(1, 152).' },
            { text: 'Draw the line through A and C. To find cost for 100 minutes: locate x = 100 on x-axis, go up to line, read y ≈ 350.' },
            { text: 'Verify algebraically. For x = 100: y = 2(100) + 150 = 350 ✓. For y = 400: 400 = 2x + 150 → 2x = 250 → x = 125 ✓.', faded: true, blankAnswer: 'Cost for 100 minutes = ₹350. Minutes for ₹400 budget = 125.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_8', title: 'The substitution method is an algebraic.',
          scaffold: { problem: 'Ravi buys 4 kg of wheat and 3 kg of rice for ₹210. His sister buys 2 kg of wheat and 5 kg of rice for ₹230.',
            steps: [
            { text: 'Let the price of wheat be ₹x per kg and rice be ₹y per kg. From the problem, write the two equations: 4x + 3y = 210.' },
            { text: 'Choose equation (2) because the coefficient of x is smaller (2). Isolate x: 2x = 230 - 5y → x = (230 - 5y)/2.' },
            { text: 'Substitute this expression for x into equation (1): 4((230 - 5y)/2) + 3y = 210.' },
            { text: 'Expand and solve for y: 460 - 10y + 3y = 210 → 460 - 7y = 210 → -7y = 210 - 460 → -7y = -250 → y = 250/7 = 35.71...' },
            { text: 'From (1), isolate x: 3x = 80 - 2y → x = (80 - 2y)/3.' },
            { text: 'Substitute into (2): 2((80 - 2y)/3) + 3y = 75. Multiply both sides by 3 to clear denominator: 2(80 - 2y) + 9y = 225.' },
            { text: 'Expand: 160 - 4y + 9y = 225 → 160 + 5y = 225 → 5y = 65 → y = 13.' },
            { text: 'Substitute y = 13 into x = (80 - 2y)/3: x = (80 - 26)/3 = 54/3 = 18.' },
            { text: 'Verify: 3(18) + 2(13) = 54 + 26 = 80 ✓; 2(18) + 3(13) = 36 + 39 = 75 ✓.', faded: true, blankAnswer: 'Price of one pen = ₹18, price of one notebook = ₹13.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_math_ch2_10', title: 'Identify each idea',
          dissect: { specimen: 'Pair of Linear Equations: Consistent and Inconsistent Systems', spots: [
            { id: 's1', label: 'A pair of linear equations', prompt: 'Which idea is this? — A pair of linear equations in two variables is **consistent** if there exists at least.', answer: 'A pair of linear equations', options: ['A pair of linear equations', 'A word problem using linear', 'Linear patterns in real-life situations', 'A linear equation in two'] },
            { id: 's2', label: 'A word problem using linear', prompt: 'Which idea is this? — A word problem using linear equations is a real-world situation described in words that.', answer: 'A word problem using linear', options: ['A word problem using linear', 'A pair of linear equations', 'Linear patterns in real-life situations', 'A linear equation in two'] },
            { id: 's3', label: 'Linear patterns in real-life situations', prompt: 'Which idea is this? — Linear patterns in real-life situations are relationships where one quantity changes at a.', answer: 'Linear patterns in real-life situations', options: ['Linear patterns in real-life situations', 'A pair of linear equations', 'A word problem using linear', 'A linear equation in two'] },
            { id: 's4', label: 'A linear equation in two', prompt: 'Which idea is this? — A linear equation in two variables, expressed as ax + by + c = 0 where a, b, c are real.', answer: 'A linear equation in two', options: ['A linear equation in two', 'A pair of linear equations', 'A word problem using linear', 'Linear patterns in real-life situations'] },
            { id: 's5', label: 'Visualising linear relationships on a', prompt: 'Which idea is this? — Visualising linear relationships on a graph is the process of representing a linear.', answer: 'Visualising linear relationships on a', options: ['Visualising linear relationships on a', 'A pair of linear equations', 'A word problem using linear', 'Linear patterns in real-life situations'] },
            { id: 's6', label: 'The substitution method is an', prompt: 'Which idea is this? — The substitution method is an algebraic technique for solving a pair of linear equations.', answer: 'The substitution method is an', options: ['The substitution method is an', 'A pair of linear equations', 'A word problem using linear', 'Linear patterns in real-life situations'] }
          ] } }
    ],
    explore: { component: C9_MathematicsSolvingSimultaneousLinearSim, prompt: 'Explore the interactive — Pair of Linear Equations: Consistent and Inconsistent Systems' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch2_9', difficulty: 'standard',
          question: 'A pair of linear equations in two variables is **consistent** if there exists.',
          hint: 'If stuck, revisit c9_math_ch2_5 (graph of linear equation) and c9_math_ch2_6.',
          misconception: 'Students often think that if \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\), the system is automatically inconsistent.',
          parts: [
                { id: 'a', prompt: 'Determine whether the following pair is consistent or inconsistent.', answer: 'Write equations in standard form: \\(5x - 3y - 11 = 0\\) and \\(10x - 6y - 22 = 0\\)',
                  options: ['Write equations in standard form: \\(5x - 3y - 11 = 0\\) and \\(10x - 6y - 22 = 0\\)', 'unique solution', 'inconsistent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\), the system is automatically inconsistent.' }
          ],
            remediations: { 'if-frac-a-1-a': { steps: ['If a student makes this error, guide them through a three-step ratio check every time: (1) Write both equations in.', '(2) Compute all three ratios \\(\\frac{a_1}{a_2}\\), \\(\\frac{b_1}{b_2}\\), \\(\\frac{c_1}{c_2}\\) separately.', '(3) Compare: if all three equal → infinite solutions; if first two equal but third different → no solution; if first.', 'Practice with paired examples where only the constant term changes (e.g., \\(2x+3y=7\\) vs \\(4x+6y=14\\) and \\(4x+6y=15\\)).'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_10', difficulty: 'standard',
          question: 'A word problem using linear equations is a real-world situation described in.',
          hint: 'If stuck, revisit c9_math_ch2_8 (substitution method) and practice forming equations from.',
          misconception: 'Students often write the equation for "total time" in distance-speed-time problems as (distance1 + distance2) / (speed1.',
          parts: [
                { id: 'a', prompt: 'Ravi is 3 times as old as his son. After 10 years, Ravi will be twice as old as his son. Find their present ages.', answer: 'Let son\'s age = x, Ravi\'s age = 3x',
                  options: ['Let son\'s age = x, Ravi\'s age = 3x', 'after 10 years'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the equation for "total time" in distance-speed-time problems as (distance1 + distance2) / (speed1 + speed2) = total.' },
                { id: 'b', prompt: 'A boat travels 30 km upstream and 44 km downstream in 10 hours. It travels 40 km upstream and 55 km downstream in 13 hours.', answer: 'Let boat speed in still water = x km/h, stream speed = y km/h',
                  options: ['Let boat speed in still water = x km/h, stream speed = y km/h', 'speed adds linearly with distance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the equation for "total time" in distance-speed-time problems as (distance1 + distance2) / (speed1 + speed2) = total.' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['If a student makes this error, first ask: "If you drive 60 km at 30 km/h, how long does that take?', 'Add those times." Then show the wrong formula gives 2 hours, but actual is 4 hours.', 'Have them compute time for each segment separately using time = distance/speed, then add.', 'Finally, generalize: total time = Σ (distance_i / speed_i).'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the equation for "total time" in distance-speed-time problems as (distance1 + distance2) / (speed1.',
          parts: [
                { id: 'a', prompt: 'A student solved this problem: "The sum of two numbers is 15. Their difference is 3.', answer: 'Yes, the solution is complete and correct',
                  options: ['Yes, the solution is complete and correct', 'they should have used substitution', 'they didn\'t check'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the equation for "total time" in distance-speed-time problems as (distance1 + distance2) / (speed1 + speed2) = total.' },
                { id: 'b', prompt: 'A boat travels 30 km upstream and 44 km downstream in 10 hours. It travels 40 km upstream and 55 km downstream in 13 hours.', answer: 'Let boat speed in still water = x km/h, stream speed = y km/h',
                  options: ['Let boat speed in still water = x km/h, stream speed = y km/h', 'speed adds linearly with distance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the equation for "total time" in distance-speed-time problems as (distance1 + distance2) / (speed1 + speed2) = total.' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['If a student makes this error, first ask: "If you drive 60 km at 30 km/h, how long does that take?', 'Add those times." Then show the wrong formula gives 2 hours, but actual is 4 hours.', 'Have them compute time for each segment separately using time = distance/speed, then add.', 'Finally, generalize: total time = Σ (distance_i / speed_i).'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_3', difficulty: 'standard',
          question: 'Linear patterns in real-life situations are relationships where one quantity.',
          hint: 'Revisit c9_math_ch2_1 (Linear Polynomials) for the algebraic form and c8_math_ch7_1.',
          misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is.',
          parts: [
                { id: 'a', prompt: 'A water tank fills at 5 liters per minute. It already has 20 liters. Write the linear equation for the total volume V after t minutes.', answer: 'V = 5t + 20',
                  options: ['V = 5t + 20', 'increasing', 'linear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is linear, without.' },
                { id: 'b', prompt: 'A mobile plan charges Rs 200 monthly rental plus Rs 1.50 per minute of calls. Write the equation for the monthly bill B in terms of call minutes n.', answer: 'B = 1.50n + 200',
                  options: ['B = 1.50n + 200', 'increasing', 'linear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is linear, without.' },
                { id: 'c', prompt: 'Determine whether the following pattern is linear or non-linear: 3, 7, 11, 15, 19, 23. Justify your answer.', answer: 'Linear',
                  options: ['Linear', 'linear because the numbers increase', 'increasing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is linear, without.' }
          ],
            remediations: { 'students-confuse-increasing-with-linear': { steps: ['Give the student two sequences: (a) 2, 5, 8, 11, 14 (linear, d=3) and (b) 2, 4, 8, 16, 32 (exponential, d=2,4,8,16).', 'How do you know?" (Check differences: constant = linear, changing = non-linear.) 3.', 'Have them write y = mx + c for the linear sequence (y = 3x + 2).', 'Practice with real-life contexts: taxi fare, phone bill, water tank.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is.',
          parts: [
                { id: 'a', prompt: 'Convert the temperature conversion formula C = (5/9)(F - 32) to the form y = mx + c. Identify m and c.', answer: 'C = (5/9)F - (5/9)(32) = (5/9)F - 160/9',
                  options: ['C = (5/9)F - (5/9)(32) = (5/9)F - 160/9', 'increasing', 'linear', 'the pattern is linear, without checking whether the rate of increase is constant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is linear, without.' },
                { id: 'b', prompt: 'A car rental charges Rs 1500 per day plus Rs 8 per km. A customer is charged Rs 3860 for one day. How many km did they drive?', answer: 'Equation: Total = 8d + 1500, where d = km driven',
                  options: ['Equation: Total = 8d + 1500, where d = km driven', 'increasing', 'linear', 'the pattern is linear, without checking whether the rate of increase is constant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "increasing" with "linear." The exact error: they see a quantity increasing and assume the pattern is linear, without.' }
          ],
            remediations: { 'students-confuse-increasing-with-linear': { steps: ['Give the student two sequences: (a) 2, 5, 8, 11, 14 (linear, d=3) and (b) 2, 4, 8, 16, 32 (exponential, d=2,4,8,16).', 'How do you know?" (Check differences: constant = linear, changing = non-linear.) 3.', 'Have them write y = mx + c for the linear sequence (y = 3x + 2).', 'Practice with real-life contexts: taxi fare, phone bill, water tank.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_5', difficulty: 'standard',
          question: 'A linear equation in two variables, expressed as ax + by + c = 0 where a, b, c.',
          hint: 'If stuck, revisit c7_math_ch15_003 (solving linear equations systematically) and.',
          misconception: 'Students often believe that only integer coordinates can be solutions of a linear equation, so they only plot points.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A linear equation in two variables, expressed as ax + by + c = 0 where a, b, c are real',
                  options: ['A linear equation in two variables, expressed as ax + by + c = 0 where a, b, c are real', 'A pair of linear equations in two variables is **consistent** if there exists at least', 'A word problem using linear equations is a real-world situation described in words that', 'Linear patterns in real-life situations are relationships where one quantity changes at a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that only integer coordinates can be solutions of a linear equation, so they only plot points where both x and y are.' }
          ],
            remediations: { 'only-integer-coordinates-can-be': { steps: ['If a student only plots integer points or makes sign errors: (1) Have them choose x = -1, 0, 1, 2, 3 and compute y for.', '(2) Ask them to verify each computed (x, y) by plugging back into the original equation.', '(3) Show that the points form a straight line when connected, and ask them to predict y for x = 0.5 using the line,.', '(4) Emphasise that the line contains infinitely many points, including decimals and fractions, not just the plotted.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_7', difficulty: 'standard',
          question: 'Visualising linear relationships on a graph is the process of representing a.',
          hint: 'If stuck, revisit c9_math_ch2_6 (Slope-Intercept Form) to practice converting equations.',
          misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without.',
          parts: [
                { id: 'a', prompt: 'What are the coordinates of the y-intercept of the line represented by the equation 3x - 2y = 12?', answer: 'The y-intercept is (0, -6)',
                  options: ['The y-intercept is (0, -6)', 'look like lines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without considering the sign of m.' },
                { id: 'b', prompt: 'Two lines have equations y = 2x + 3 and y = 2x - 4. Without drawing them, explain how you know these lines will never meet, and describe what you would see if.', answer: 'The lines are parallel',
                  options: ['The lines are parallel', 'look like lines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without considering the sign of m.' },
                { id: 'c', prompt: 'The graph of 2x + 3y = 6 and 4x + 6y = 12 are drawn on the same axes.', answer: 'They are the SAME line (coincident)',
                  options: ['They are the SAME line (coincident)', 'look like lines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without considering the sign of m.' }
          ],
            remediations: { 'students-treat-the-slope-in': { steps: ['Make the student say aloud: "Slope m = rise/run. If m is negative, rise is negative — I go DOWN."', 'Have them rewrite y = -2x + 5 as y = (-2/1)x + 5 and explicitly label rise = -2, run = +1.', 'For intercepts, enforce the chant: "x-intercept → set y=0, answer goes on x-axis (x, 0).', 'Give 3 equations with negative slopes (e.g., y = -x + 4, 2x + y = 6, 3x - 4y = 12) and require them to find both.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without.',
          parts: [
                { id: 'a', prompt: 'A student plots the line y = -3x + 6 by marking the y-intercept (0, 6) and then using the slope -3 to go "down 3, right 1" to (1, 3).', answer: 'The x-intercept (2, 0) is CORRECT',
                  options: ['The x-intercept (2, 0) is CORRECT', 'look like lines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without considering the sign of m.' },
                { id: 'b', prompt: 'Create a real-life situation (Indian context) that can be modelled by a linear equation with a NEGATIVE slope and a POSITIVE y-intercept.', answer: 'Example: A water tank has 500 litres and leaks at 20 litres per hour',
                  options: ['Example: A water tank has 500 litres and leaks at 20 litres per hour', 'look like lines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without considering the sign of m.' }
          ],
            remediations: { 'students-treat-the-slope-in': { steps: ['Make the student say aloud: "Slope m = rise/run. If m is negative, rise is negative — I go DOWN."', 'Have them rewrite y = -2x + 5 as y = (-2/1)x + 5 and explicitly label rise = -2, run = +1.', 'For intercepts, enforce the chant: "x-intercept → set y=0, answer goes on x-axis (x, 0).', 'Give 3 equations with negative slopes (e.g., y = -x + 4, 2x + y = 6, 3x - 4y = 12) and require them to find both.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_8', difficulty: 'standard',
          question: 'The substitution method is an algebraic technique for solving a pair of linear.',
          hint: 'Revisit c8_math_ch13_9 (Transposition Method) and practice isolating variables in.',
          misconception: 'Students often substitute the expression into the SAME equation they derived it from, e.g., from 2x + 3y = 12 they.',
          parts: [
                { id: 'a', prompt: 'A student solves 3x + 2y = 12 and x - 4y = 5 by writing x = 4y + 5 from the second equation and substituting into the first: 3(4y + 5) + 2y = 12.', answer: 'Yes, the substitution step is correct',
                  options: ['Yes, the substitution step is correct', 'you should substitute y instead'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often substitute the expression into the SAME equation they derived it from, e.g., from 2x + 3y = 12 they write x = (12 - 3y)/2,.' },
                { id: 'b', prompt: 'Compare the substitution method and the graphical method for solving x + y = 10 and 2x - y = 5.', answer: 'The substitution method is better for fractional solutions',
                  options: ['The substitution method is better for fractional solutions', 'because it\'s easier to see'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often substitute the expression into the SAME equation they derived it from, e.g., from 2x + 3y = 12 they write x = (12 - 3y)/2,.' }
          ],
            remediations: { 'students-often-substitute-the-expression': { steps: ['If a student substitutes into the same equation, stop them and ask: "How many equations did we start with?', 'How many have you used so far?" Have them physically label the equations (1) and (2).', 'Then say: "You got x = ...', 'Which equation have you NOT used yet?'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often substitute the expression into the SAME equation they derived it from, e.g., from 2x + 3y = 12 they.',
          parts: [
                { id: 'a', prompt: 'A student solves the system: 3x + 4y = 24 ...(1) 6x + 8y = 48 ...(2) by substituting x = (24 - 4y)/3 from (1) into (2): 6((24 - 4y)/3) + 8y = 48 → 2(24 - 4y) +.', answer: 'The conclusion is incorrect',
                  options: ['The conclusion is incorrect', 'x = 8, y = 0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often substitute the expression into the SAME equation they derived it from, e.g., from 2x + 3y = 12 they write x = (12 - 3y)/2,.' },
                { id: 'b', prompt: 'Compare the substitution method and the graphical method for solving x + y = 10 and 2x - y = 5.', answer: 'The substitution method is better for fractional solutions',
                  options: ['The substitution method is better for fractional solutions', 'because it\'s easier to see'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often substitute the expression into the SAME equation they derived it from, e.g., from 2x + 3y = 12 they write x = (12 - 3y)/2,.' }
          ],
            remediations: { 'students-often-substitute-the-expression': { steps: ['If a student substitutes into the same equation, stop them and ask: "How many equations did we start with?', 'How many have you used so far?" Have them physically label the equations (1) and (2).', 'Then say: "You got x = ...', 'Which equation have you NOT used yet?'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
