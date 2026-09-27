import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch06_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch06_p2: SimDef = {
    id: 'v3_c11_app_ch06_p2',
    title: 'Permutations Combinations · Part 2/2',
    subtitle: 'This node covers combinations of distinct objects without repetition: definition, formula.',
    classLevel: 11, subject: 'app', topic: 'Permutations Combinations · Part 2/2',
    chapters: ['c11_app_ch06'],
    nodeIds: ['c11_app_cbse_06_007', 'c11_app_cbse_06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'You\'re at a cafeteria with 5 different snacks and you can choose any 3 for your tiffin.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student claims: "Since \\( ^8C_3 = 56 \\) and \\( ^8C_5 = 56 \\), the formula \\( ^nC_r = ^nC_{n-r} \\) means r and n-r give the same value, so \\( ^8C_2 \\) must.',
        options: ['The student is **incorrect**', 'Choosing then arranging', 'select 3 students from 10 to be President, Vice-President, Secretary'],
        answer: 'The student is **incorrect**',
        hook: '**"Choosing then arranging" confusion**: Students see "select 3 students from 10 to be President, Vice-President.',
    },
    teaching: [
        { title: 'Combination', text: 'A combination is a selection of r objects from a set of n distinct objects where the order of selection does not matter.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_06_007', title: 'Combination',
          scaffold: { problem: 'A school library has 10 different Mathematics books and 8 different Physics books.',
            steps: [
            { text: 'Identify constraints — total 6 books, at least 2 Math (M), at least 1 Physics (P).' },
            { text: 'For each valid split, compute combinations using multiplication principle (independent choices from Math and Physics.' },
            { text: 'Case (2M, 4P): \\( ^{10}C_2 \\times ^8C_4 = 45 \\times 70 = 3150 \\).' },
            { text: 'Case (3M, 3P): \\( ^{10}C_3 \\times ^8C_3 = 120 \\times 56 = 6720 \\).' },
            { text: 'Case (4M, 2P): \\( ^{10}C_4 \\times ^8C_2 = 210 \\times 28 = 5880 \\).' },
            { text: 'Case (5M, 1P): \\( ^{10}C_5 \\times ^8C_1 = 252 \\times 8 = 2016 \\).' },
            { text: 'Sum all cases: 3150 + 6720 + 5880 + 2016 = 17766.', faded: true, blankAnswer: '17,766 different selections.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_06_008', title: 'Combination with Repetition',
          scaffold: { problem: 'A college canteen offers 4 types of snacks: Samosa, Bread Pakora, Chole Bhature, and Poha. A group of 6 friends visits the canteen.',
            steps: [
            { text: 'Identify the problem type. We are selecting $r=6$ items (snacks ordered) from $n=4$ types (snack varieties).' },
            { text: 'Recall the formula: Number of ways = ${}^{n+r-1}C_r$.' },
            { text: 'Substitute values: $n=4$, $r=6$. Upper index = $n+r-1 = 4+6-1 = 9$. Lower index = $r = 6$ (or $n-1 = 3$).' },
            { text: 'Compute ${}^{9}C_6 = {}^{9}C_3 = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1} = 3 \\times 4 \\times 7 = 84$.' },
            { text: 'Verify with Stars-and-Bars logic. 6 Stars (snacks), 3 Bars (dividers for 4 types). Total 9 symbols.', faded: true, blankAnswer: '84 different group orders are possible.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_06_008', title: 'Combination with Repetition',
          caseStudy: { intro: 'Imagine you are ordering 6 donuts from a shop offering 5 varieties, and you can pick any number of each variety (including zero).',
            decisions: [{ prompt: 'State the formula for the number of combinations of $r$ objects from $n$ distinct types when repetition is allowed, and explain what the.', options: [
                { text: 'The formula is ${}^{n+r-1}C_r$ (or ${}^{n+r-1}C_{n-1}$)', outcome: 'The formula is ${}^{n+r-1}C_r$ (or ${}^{n+r-1}C_{n-1}$). Here, $n$ is the number of distinct.' },
                { text: 'items cannot be repeated (each type chosen at most once)', outcome: 'Not quite — **The "Distinct Items" Trap:** Students treat the $r$ selected items as *distinct* objects (e.g.', reveals: 'the-distinct-items-trap-students' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_06_008', title: 'You made it',
          caseStudy: { intro: 'You finished Permutations Combinations — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_06_007', difficulty: 'standard',
          question: 'A combination is a selection of r objects from a set of n distinct objects.',
          hint: 'Review the permutation-to-combination derivation: write all permutations of 3 letters.',
          misconception: '**"Choosing then arranging" confusion**: Students see "select 3 students from 10 to be President, Vice-President.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since \\( ^8C_3 = 56 \\) and \\( ^8C_5 = 56 \\), the formula \\( ^nC_r = ^nC_{n-r} \\) means r and n-r give the same value, so \\( ^8C_2 \\) must.', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'Choosing then arranging', 'select 3 students from 10 to be President, Vice-President, Secretary'],
                  hint: 'Review the permutation-to-combination derivation: write all permutations of 3 letters from.',
                  misconception: '**"Choosing then arranging" confusion**: Students see "select 3 students from 10 to be President, Vice-President, Secretary" and compute \\.' },
                { id: 'b', prompt: 'From a class of 12 students (7 boys, 5 girls), a committee of 4 must be formed with **at least 2 girls**. How many different committees are possible?', answer: 'Cases: (2 girls, 2 boys) + (3 girls, 1 boy) + (4 girls, 0 boys)',
                  options: ['Cases: (2 girls, 2 boys) + (3 girls, 1 boy) + (4 girls, 0 boys)', 'overcounting', 'Choosing then arranging', 'select 3 students from 10 to be President, Vice-President, Secretary'],
                  hint: 'Review the permutation-to-combination derivation: write all permutations of 3 letters from.',
                  misconception: '**"Choosing then arranging" confusion**: Students see "select 3 students from 10 to be President, Vice-President, Secretary" and compute \\.' },
                { id: 'c', prompt: 'Prove that \\( ^nC_r + ^nC_{r-1} = ^{n+1}C_r \\) using the factorial definition.', answer: '**Algebraic proof:** \\( ^nC_r + ^nC_{r-1} = \\frac{n!}{r!(n-r)!} +',
                  options: ['**Algebraic proof:** \\( ^nC_r + ^nC_{r-1} = \\frac{n!}{r!(n-r)!} +', 'Choosing then arranging', 'select 3 students from 10 to be President, Vice-President, Secretary'],
                  hint: 'Review the permutation-to-combination derivation: write all permutations of 3 letters from.',
                  misconception: '**"Choosing then arranging" confusion**: Students see "select 3 students from 10 to be President, Vice-President, Secretary" and compute \\.' }
          ],
            remediations: { 'choosing-then-arranging-confusion-students': { steps: ['**Ask the swap question**: "You chose A, B, C.', 'If I reorder them as B, A, C, is it a *different* outcome in this problem?" If yes → permutation; if no → combination.', '**Role-play with small numbers**: Use 4 students {A,B,C,D}, choose 2.', 'List all permutations (AB, BA, AC, CA, AD, DA, BC, CB, BD, DB, CD, DC = 12).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Choosing then arranging" confusion**: Students see "select 3 students from 10 to be President, Vice-President.',
          parts: [
                { id: 'a', prompt: 'A test has 10 questions. A student must answer 7 questions, but **must answer at least 3 of the first 5 questions**.', answer: 'The proposed solution is **incorrect**',
                  options: ['The proposed solution is **incorrect**', 'Choosing then arranging', 'select 3 students from 10 to be President, Vice-President, Secretary'],
                  hint: 'Review the permutation-to-combination derivation: write all permutations of 3 letters from.',
                  misconception: '**"Choosing then arranging" confusion**: Students see "select 3 students from 10 to be President, Vice-President, Secretary" and compute \\.' },
                { id: 'b', prompt: 'Create a real-world scenario (Indian context) where you need to select a group from a larger set, and the answer is \\( ^{12}C_5 \\).', answer: '**Scenario:** A school has 12 teachers (5 Math, 4 Science, 3 Language)',
                  options: ['**Scenario:** A school has 12 teachers (5 Math, 4 Science, 3 Language)', 'at least 2 seniors', 'captain and vice-captain', 'Choosing then arranging'],
                  hint: 'Review the permutation-to-combination derivation: write all permutations of 3 letters from.',
                  misconception: '**"Choosing then arranging" confusion**: Students see "select 3 students from 10 to be President, Vice-President, Secretary" and compute \\.' }
          ],
            remediations: { 'choosing-then-arranging-confusion-students': { steps: ['**Ask the swap question**: "You chose A, B, C.', 'If I reorder them as B, A, C, is it a *different* outcome in this problem?" If yes → permutation; if no → combination.', '**Role-play with small numbers**: Use 4 students {A,B,C,D}, choose 2.', 'List all permutations (AB, BA, AC, CA, AD, DA, BC, CB, BD, DB, CD, DC = 12).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_06_008', difficulty: 'standard',
          question: 'The number of combinations of $r$ objects chosen from a set of $n$ distinct.',
          hint: 'Review **c11_app_cbse_06_007 (Combination)** specifically the derivation of ${}^nC_r.',
          misconception: '**The "Distinct Items" Trap:** Students treat the $r$ selected items as *distinct* objects (e.g., thinking "Samosa 1".',
          parts: [
                { id: 'a', prompt: 'State the formula for the number of combinations of $r$ objects from $n$ distinct types when repetition is allowed, and explain what the variables $n$ and $r$.', answer: 'The formula is ${}^{n+r-1}C_r$ (or ${}^{n+r-1}C_{n-1}$)',
                  options: ['The formula is ${}^{n+r-1}C_r$ (or ${}^{n+r-1}C_{n-1}$)', 'items cannot be repeated (each type chosen at most once)'],
                  hint: 'Review **c11_app_cbse_06_007 (Combination)** specifically the derivation of ${}^nC_r.',
                  misconception: '**The "Distinct Items" Trap:** Students treat the $r$ selected items as *distinct* objects (e.g., thinking "Samosa 1" and "Samosa 2" are.' },
                { id: 'b', prompt: 'A student claims: "Selecting 4 candies from 3 flavors (with unlimited stock) is the same as arranging 4 identical balls into 3 distinct boxes." Is this.', answer: 'Yes, the statement is correct',
                  options: ['Yes, the statement is correct', 'incorrect', 'unlimited stock', 'distinct flavors'],
                  hint: 'Review **c11_app_cbse_06_007 (Combination)** specifically the derivation of ${}^nC_r.',
                  misconception: '**The "Distinct Items" Trap:** Students treat the $r$ selected items as *distinct* objects (e.g., thinking "Samosa 1" and "Samosa 2" are.' },
                { id: 'c', prompt: 'In how many ways can a person buy 10 pastries from a bakery selling 4 types (pineapple, chocolate, black forest, butterscotch) if they must buy **at least.', answer: 'First, give 1 pastry of each type to satisfy the "at least one" condition',
                  options: ['First, give 1 pastry of each type to satisfy the "at least one" condition', 'at least one'],
                  hint: 'Review **c11_app_cbse_06_007 (Combination)** specifically the derivation of ${}^nC_r.',
                  misconception: '**The "Distinct Items" Trap:** Students treat the $r$ selected items as *distinct* objects (e.g., thinking "Samosa 1" and "Samosa 2" are.' }
          ],
            remediations: { 'the-distinct-items-trap-students': { steps: ['**Concrete Modeling:** Give the student 5 identical buttons (stars) and 2 pencils (bars).', 'Ask them to physically arrange them in a line to represent buying 5 items from 3 shops.', 'Count the arrangements manually.', '**Visual Mapping:** Draw the stars-and-bars diagram for a specific selection (e.g., 2, 0, 3).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
