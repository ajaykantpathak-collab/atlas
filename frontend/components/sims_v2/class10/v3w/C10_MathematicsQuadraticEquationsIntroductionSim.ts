import type { SimDef } from '../../engine/types';
import C10_MathematicsQuadraticEquationsIntroductionSim from '../../../simulations/c6_12/C10_MathematicsQuadraticEquationsIntroductionSim';

/** v3 wrapped master — C10_MathematicsQuadraticEquationsIntroductionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicsquadraticequationsintroductionsim: SimDef = {
    id: 'v3w_c10_mathematicsquadraticequationsintroductionsim',
    title: 'Equations Reducible to Pair of Linear Equations (Substitution)',
    subtitle: 'This node covers equations reducible to linear form via reciprocal substitution (1/x,.',
    classLevel: 10, subject: 'mathematics', topic: 'Equations Reducible to Pair of Linear Equations (Substitution)',
    chapters: [],
    nodeIds: ['c10_math_cbse_03_008', 'c10_math_cbse_03_009', 'c10_math_cbse_03_010', 'c10_math_cbse_04_001', 'c10_math_cbse_04_002', 'c10_math_cbse_04_003', 'c10_math_cbse_04_004', 'c10_math_cbse_04_005', 'c10_math_cbse_04_006', 'c10_math_cbse_04_007', 'c10_math_cbse_04_008', 'c10_math_cbse_04_009', 'c10_math_cbse_04_010', 'c10_math_cbse_04_011', 'c10_math_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine a carpenter charges ₹500 for making 2 tables and 3 chairs, but ₹700 for 3 tables and 2 chairs — this.', goal: 'Master Equations Reducible to Pair of Linear Equations (Substitution).' },
    discovery: {
        question: 'What are the expressions for downstream speed and upstream speed if the speed of a boat in still water is x km/h and the speed of the stream is y km/h?',
        options: ['Downstream speed = (x + y) km/h, Upstream speed = (x - y) km/h', 'upstream means going up, so add the stream speed', '"upstream means going up, so add the stream speed" or confuse'],
        answer: 'Downstream speed = (x + y) km/h, Upstream speed = (x - y) km/h',
        hook: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the.',
    },
    teaching: [
        { title: 'Equations reducible to a pair of linear.', text: 'Equations reducible to a pair of linear equations in two variables are non-linear equations (typically involving reciprocals of variables like 1/x, 1/y, or expressions like x+y, x-y in denominators).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_008', title: 'Equations reducible to a pair of linear.',
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
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_009', title: 'Word problems on age and number involve.',
          scaffold: { problem: 'Five years ago, a mother was 7 times as old as her daughter. Five years hence, she will be 3 times as old as her daughter.',
            steps: [
            { text: 'Define variables. Let present age of mother = x years, present age of daughter = y years.' },
            { text: 'Translate first condition (5 years ago). Mother\'s age = x-5, Daughter\'s age = y-5.' },
            { text: 'Translate second condition (5 years hence). Mother\'s age = x+5, Daughter\'s age = y+5.' },
            { text: 'Solve the pair. Subtract Equation 2 from Equation 1: (x - 7y) - (x - 3y) = -30 - 10 → -4y = -40 → y = 10.' },
            { text: 'Verify. Present ages: Mother 40, Daughter 10. Five years ago: 35 and 5 → 35 = 7×5 ✓.', faded: true, blankAnswer: 'Mother\'s present age = 40 years, Daughter\'s present age =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_010', title: 'Upstream/downstream problems involve a.',
          scaffold: { problem: 'A boat goes 30 km upstream and 44 km downstream in 10 hours. In 13 hours, it can go 40 km upstream and 55 km downstream.',
            steps: [
            { text: 'Define variables. Let speed of boat in still water = x km/h, speed of stream = y km/h.' },
            { text: 'Write time for each trip using Time = Distance/Speed. Trip 1: Time_upstream = 30/(x-y), Time_downstream = 44/(x+y).' },
            { text: 'Trip 2: Time_upstream = 40/(x-y), Time_downstream = 55/(x+y). Total time = 13 hours.' },
            { text: 'Substitute u = 1/(x-y), v = 1/(x+y). Equations become: 30u + 44v = 10 ...(i) and 40u + 55v = 13 ...(ii).' },
            { text: 'Back-substitute: u = 1/(x-y) = 1/5 → x - y = 5. v = 1/(x+y) = 1/11 → x + y = 11. Add: 2x = 16 → x = 8 km/h.' },
            { text: 'Verify: Upstream speed = 5 km/h, Downstream speed = 11 km/h. Trip 1: 30/5 + 44/11 = 6 + 4 = 10 hours ✓.', faded: true, blankAnswer: 'Speed of boat in still water = 8 km/h, Speed of stream = 3.' }
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
        { type: 'dissect', nodeId: 'c10_math_cbse_03_009', title: 'Identify each idea',
          dissect: { specimen: 'Equations Reducible to Pair of Linear Equations (Substitution)', spots: [
            { id: 's1', label: 'Equations reducible to a pair', prompt: 'Which idea is this? — Equations reducible to a pair of linear equations in two variables are non-linear.', answer: 'Equations reducible to a pair', options: ['Equations reducible to a pair', 'Word problems on age and', 'Upstreamdownstream problems involve a boat', 'A quadratic equation in one'] },
            { id: 's2', label: 'Word problems on age and', prompt: 'Which idea is this? — Word problems on age and number involve translating real-life situations about people\'s.', answer: 'Word problems on age and', options: ['Word problems on age and', 'Equations reducible to a pair', 'Upstreamdownstream problems involve a boat', 'A quadratic equation in one'] },
            { id: 's3', label: 'Upstreamdownstream problems involve a boat', prompt: 'Which idea is this? — Upstream/downstream problems involve a boat or swimmer moving in a river with a constant.', answer: 'Upstreamdownstream problems involve a boat', options: ['Upstreamdownstream problems involve a boat', 'Equations reducible to a pair', 'Word problems on age and', 'A quadratic equation in one'] },
            { id: 's4', label: 'A quadratic equation in one', prompt: 'Which idea is this? — A quadratic equation in one variable x is an equation of the form ax² + bx + c = 0, where.', answer: 'A quadratic equation in one', options: ['A quadratic equation in one', 'Equations reducible to a pair', 'Word problems on age and', 'Upstreamdownstream problems involve a boat'] },
            { id: 's5', label: 'Forming a quadratic equation from', prompt: 'Which idea is this? — Forming a quadratic equation from a real-life situation is the process of translating a.', answer: 'Forming a quadratic equation from', options: ['Forming a quadratic equation from', 'Equations reducible to a pair', 'Word problems on age and', 'Upstreamdownstream problems involve a boat'] },
            { id: 's6', label: 'The method of solving a', prompt: 'Which idea is this? — The method of solving a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b, c \\in.', answer: 'The method of solving a', options: ['The method of solving a', 'Equations reducible to a pair', 'Word problems on age and', 'Upstreamdownstream problems involve a boat'] }
          ] } }
    ],
    explore: { component: C10_MathematicsQuadraticEquationsIntroductionSim, prompt: 'Explore the interactive — Equations Reducible to Pair of Linear Equations (Substitution)' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_03_008', difficulty: 'standard',
          question: 'Equations reducible to a pair of linear equations in two variables are.',
          hint: 'If stuck, revisit c10_math_cbse_03_005 (Substitution Method) and practice 5 problems with.',
          misconception: 'Students often substitute u = 1/x, v = 1/y correctly and solve the linear system, but then write the final answer as.',
          parts: [
                { id: 'a', prompt: 'If the equations are 2/x + 3/y = 13 and 5/x - 4/y = -2, what substitution will reduce them to a pair of linear equations in two variables?', answer: 'Let u = 1/x and v = 1/y',
                  options: ['Let u = 1/x and v = 1/y', 'let u = x, v = y'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often substitute u = 1/x, v = 1/y correctly and solve the linear system, but then write the final answer as (u, v) instead of (x,.' }
          ],
            remediations: { 'students-often-substitute-u-1': { steps: ['If a student writes the final answer as u, v values: Ask them to re-read the question — "What are we asked to find?', 'The values of x and y, or u and v?" Then guide: "You found u = 1/x = 2.', 'Do the reverse: x = 1/u." Make them write the back-substitution step explicitly: "Since u = 1/x, therefore x = 1/u =.', 'Then x = 1/0 which is undefined.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_009', difficulty: 'standard',
          question: 'Word problems on age and number involve translating real-life situations about.',
          hint: 'If stuck, revisit c10_math_cbse_03_005 (substitution), c10_math_cbse_03_006.',
          misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.',
          parts: [
                { id: 'a', prompt: 'In an age problem, if the present age of A is x years and present age of B is y years, how do you express "A\'s age 5 years ago" and "B\'s age 3 years hence" in.', answer: 'A\'s age 5 years ago = x - 5',
                  options: ['A\'s age 5 years ago = x - 5', 'number is 3 times sum of digits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' },
                { id: 'b', prompt: 'A student writes the two-digit number with tens digit x and units digit y as x + y. Why is this incorrect? What is the correct algebraic representation?', answer: 'x + y gives the sum of digits, not the number',
                  options: ['x + y gives the sum of digits, not the number', 'number is 3 times sum of digits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' },
                { id: 'c', prompt: 'The sum of the digits of a two-digit number is 11. If the number obtained by reversing the digits is 27 less than the original number, find the original.', answer: 'Let tens digit = x, units digit = y',
                  options: ['Let tens digit = x, units digit = y', 'number is 3 times sum of digits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['When a student writes 2F = S for "father is twice as old as son", ask: "If son is 10, how old is father?" (20).', '"Which equation gives 20 when you plug in 10?', 'F = 2×10 = 20, or 2F = 10 → F=5?" Show that F = 2S works.', 'Then have them practice 5 simple "A is k times B" translations with numbers first, then variables.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.',
          parts: [
                { id: 'a', prompt: 'A student solves an age problem and gets x = 12, y = 40 (son 12, father 40). The problem states: "Father is 4 times as old as son.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'number is 3 times sum of digits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' },
                { id: 'b', prompt: 'Create an age word problem that leads to the equations: x + y = 50 and x - y = 10. State the problem clearly and identify what x and y represent.', answer: 'Example: "The sum of the ages of a father and son is 50 years',
                  options: ['Example: "The sum of the ages of a father and son is 50 years', 'number is 3 times sum of digits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the equation for "A is twice as old as B" as 2A = B instead of A = 2B.' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['When a student writes 2F = S for "father is twice as old as son", ask: "If son is 10, how old is father?" (20).', '"Which equation gives 20 when you plug in 10?', 'F = 2×10 = 20, or 2F = 10 → F=5?" Show that F = 2S works.', 'Then have them practice 5 simple "A is k times B" translations with numbers first, then variables.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_010', difficulty: 'standard',
          question: 'Upstream/downstream problems involve a boat or swimmer moving in a river with a.',
          hint: 'If stuck, review c10_math_cbse_03_005/006/007 for solving methods and c6_math_ch06_065.',
          misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the.',
          parts: [
                { id: 'a', prompt: 'What are the expressions for downstream speed and upstream speed if the speed of a boat in still water is x km/h and the speed of the stream is y km/h?', answer: 'Downstream speed = (x + y) km/h, Upstream speed = (x - y) km/h',
                  options: ['Downstream speed = (x + y) km/h, Upstream speed = (x - y) km/h', 'upstream means going up, so add the stream speed', '"upstream means going up, so add the stream speed" or confuse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the speed expressions.' },
                { id: 'b', prompt: 'A boat travels 30 km downstream in 2 hours and 30 km upstream in 3 hours. A student writes the equations: 30 = (x+y)×2 and 30 = (x-y)×3. Is this correct?', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'downstream = faster = less time for same distance', 'upstream means going up, so add the stream speed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the speed expressions.' },
                { id: 'c', prompt: 'A boat goes 16 km upstream and 24 km downstream in 6 hours. It goes 12 km upstream and 36 km downstream in the same time.', answer: 'Let boat speed = x km/h, stream speed = y km/h',
                  options: ['Let boat speed = x km/h, stream speed = y km/h', 'upstream means going up, so add the stream speed', '"upstream means going up, so add the stream speed" or confuse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the speed expressions.' }
          ],
            remediations: { 'students-write-the-equations-as': { steps: ['Draw a diagram — boat with arrow downstream (label x+y) and upstream (label x-y).', 'Write the rule: "Downstream = add, Upstream = subtract" on a sticky note.', 'For each trip, write: Time_upstream = Distance_upstream / (x-y); Time_downstream = Distance_downstream / (x+y).', 'If total time given, sum the two times.', 'Substitute u=1/(x-y), v=1/(x+y) to get linear equations.', 'Solve for u,v.', 'Take reciprocals: x-y = 1/u, x+y = 1/v.', 'Solve for x,y.', 'Check x > y > 0. Practice this 7-step scaffold with 3 problems before removing supports.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the.',
          parts: [
                { id: 'a', prompt: 'A student solves a problem and gets boat speed = 10 km/h, stream speed = 12 km/h. The problem states the boat goes upstream. Is this solution valid?', answer: 'No, the solution is invalid',
                  options: ['No, the solution is invalid', 'upstream means going up, so add the stream speed', '"upstream means going up, so add the stream speed" or confuse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the equations as: Distance = (x+y) × time_upstream and Distance = (x-y) × time_downstream, swapping the speed expressions.' }
          ],
            remediations: { 'students-write-the-equations-as': { steps: ['Draw a diagram — boat with arrow downstream (label x+y) and upstream (label x-y).', 'Write the rule: "Downstream = add, Upstream = subtract" on a sticky note.', 'For each trip, write: Time_upstream = Distance_upstream / (x-y); Time_downstream = Distance_downstream / (x+y).', 'If total time given, sum the two times.', 'Substitute u=1/(x-y), v=1/(x+y) to get linear equations.', 'Solve for u,v.', 'Take reciprocals: x-y = 1/u, x+y = 1/v.', 'Solve for x,y.', 'Check x > y > 0. Practice this 7-step scaffold with 3 problems before removing supports.'] } } },
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
                  options: ['The method of solving a quadratic equation \\(ax^2 + bx + c = 0\\) (where \\(a, b, c \\in', 'Equations reducible to a pair of linear equations in two variables are non-linear', 'Word problems on age and number involve translating real-life situations about people\'s', 'Upstream/downstream problems involve a boat or swimmer moving in a river with a constant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the product condition as \\(pq = c\\) instead of \\(pq = ac\\).' }
          ],
            remediations: { 'students-often-write-the-product': { steps: ['If a student makes the \\(pq = c\\) error, immediately return to the algebraic derivation: \\((px + r)(qx + s) = pqx^2 +.', 'Here \\(a = pq\\), \\(b = ps + qr\\), \\(c = rs\\).', 'The product of the "split numbers" \\(ps\\) and \\(qr\\) is \\(ps \\times qr = pq \\times rs = ac\\).', 'Have the student verify with \\(2x^2 + 7x + 3\\): expand \\((2x+1)(x+3) = 2x^2 + 6x + x + 3\\).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
