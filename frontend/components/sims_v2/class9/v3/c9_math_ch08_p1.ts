import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch08_p1: SimDef = {
    id: 'v3_c9_math_ch08_p1',
    title: 'Sequences and Series · Part 1/2',
    subtitle: 'Every term knows its position',
    classLevel: 9, subject: 'mathematics', topic: 'Sequences and Series · Part 1/2',
    chapters: ['c9_math_ch08'],
    nodeIds: ['c9_math_ch8_1', 'c9_math_ch8_10', 'c9_math_ch8_2', 'c9_math_ch8_3', 'c9_math_ch8_4', 'c9_math_ch8_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a pattern decoder', intro: '₹10 in week 1, ₹20 in week 2, ₹30 in week 3 — your savings are secretly a sequence. Learn to read the rule hiding inside any list of numbers.', goal: 'Understand sequences as ordered, position-indexed lists — writing terms from rules like aₙ = 2n+1, distinguishing finite/infinite, and comparing additive vs multiplicative growth.' },
    discovery: {
        question: 'Two sequences both start 2, 4 — but one goes 8, 16, 32 and the other 6, 8, 10. Same start, wildly different futures. What\'s the invisible difference?',
        options: ['One multiplies by 2 each step (2ⁿ — exponential growth), the other adds 2 each step (2n — linear growth); multiplying explodes past adding', 'Nothing — they\'ll meet again later', 'One is prime numbers, one is even', 'The second sequence made an arithmetic error'],
        answer: 'One multiplies by 2 each step (2ⁿ — exponential growth), the other adds 2 each step (2n — linear growth); multiplying explodes past adding',
        hook: 'A sequence is a function wearing a disguise: each term is pinned to its position number n, and the first term is n=1 — never n=0. For aₙ = n² − 1, the sequence starts at 0 (1² − 1), not −1.',
    },
    teaching: [
        { title: 'Sequences: Definition and Examples', text: 'A sequence is an ordered list of numbers (called terms) that follows a specific rule or pattern, where each term is associated with a unique natural number position (1st, 2nd, 3rd, ...).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch8_1', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Crack position rules: generate terms of aₙ = (2n+1)/n term by term, tell a true sequence from a mere set, and settle why \'1, 3, 5, 7, 9\' is finite even though you could keep adding 2 forever.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch8_1', title: 'Sequences: Definition and Examples',
          scaffold: { problem: 'A construction company builds a staircase where the first step uses 5 bricks, the second step uses 8 bricks, the third uses 11 bricks, and.',
            steps: [
            { text: 'Observe the given terms: 5, 8, 11. Identify the pattern: each term increases by 3.' },
            { text: 'Find the constant \\(c\\) using the first term (\\(n=1\\)): \\(a_1 = 3(1) + c = 5 \\Rightarrow c = 2\\).' },
            { text: 'Verify the rule for given terms: \\(n=2 \\Rightarrow 3(2)+2=8\\) (matches); \\(n=3 \\Rightarrow 3(3)+2=11\\) (matches).' },
            { text: 'Generate the first 6 terms by substituting \\(n=1\\) to \\(6\\): \\(a_1=5, a_2=8, a_3=11, a_4=14, a_5=17, a_6=20\\).' },
            { text: 'Find the 10th step bricks: substitute \\(n=10\\) into rule: \\(a_{10} = 3(10) + 2 = 32\\) bricks.', faded: true, blankAnswer: 'First 6 terms: 5, 8, 11, 14, 17, 20. Bricks in 10th step.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch8_10', title: 'Fractals as Recursive Geometric Sequences',
          scaffold: { problem: 'Construct the Sierpinski triangle through Stage 3. Count the triangles at each stage, write the recursive and explicit rules, and predict.',
            steps: [
            { text: 'Stage 0. Start with 1 equilateral triangle. N_0 = 1.' },
            { text: 'Stage 1. Connect midpoints, remove middle. 3 triangles remain. N_1 = 3.' },
            { text: 'Stage 2. Apply rule to each of 3 triangles. 3 * 3 = 9 triangles. N_2 = 9.' },
            { text: 'Stage 3. Apply rule to each of 9 triangles. 9 * 3 = 27 triangles. N_3 = 27.' },
            { text: 'Recursive rule. N_n = 3 * N_{n-1}, N_0 = 1. Explicit rule: N_n = 3^n.' },
            { text: 'Predict Stage 5. N_5 = 3^5 = 243 triangles.', faded: true, blankAnswer: 'Stage 0: 1, Stage 1: 3, Stage 2: 9, Stage 3: 27. Recursive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch8_2', title: 'Explicit Rule for a Sequence',
          scaffold: { problem: 'A theatre has 12 seats in the first row, 15 in the second, 18 in the third, and so on, increasing by 3 seats each row.',
            steps: [
            { text: 'Identify the sequence type. List terms with positions: n=1 → 12, n=2 → 15, n=3 → 18.' },
            { text: 'Note the first term a = 12 and common difference d = 3.' },
            { text: 'Write the standard explicit rule for arithmetic sequence: aₙ = a + (n-1)d.' },
            { text: 'Substitute a=12, d=3 → aₙ = 12 + (n-1)×3 = 12 + 3n - 3 = 3n + 9.' },
            { text: 'Find 25th row seats: substitute n=25 → a₂₅ = 3(25) + 9 = 75 + 9 = 84 seats.', faded: true, blankAnswer: 'Explicit rule: aₙ = 3n + 9; 25th row has 84 seats.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch8_3', title: 'Recursive Rule for a Sequence',
          scaffold: { problem: 'A sequence is defined by the recursive rule a_n = a_{n-1} - 4, with a_1 = 20. Find a_5 and write the explicit rule.',
            steps: [
            { text: 'Generate terms recursively. a_1 = 20, a_2 = 20 - 4 = 16, a_3 = 16 - 4 = 12, a_4 = 12 - 4 = 8, a_5 = 8 - 4 = 4.' },
            { text: 'Identify the type. Common difference d = -4, so this is arithmetic.' },
            { text: 'Write explicit rule. a_n = a_1 + (n-1)d = 20 + (n-1)(-4) = 20 - 4n + 4 = 24 - 4n.' },
            { text: 'Verify. a_5 = 24 - 4(5) = 24 - 20 = 4. Matches the recursive result.', faded: true, blankAnswer: 'a_5 = 4 (computed recursively: 20, 16, 12, 8, 4). Explicit.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch8_4', title: 'Arithmetic Progression: Definition and Common Difference',
          scaffold: { problem: 'A gardener plants a sapling that is 30 cm tall. It grows by a constant 5 cm each week.',
            steps: [
            { text: 'Identify the initial height (week 0 or week 1?). The problem says "at the end of the first 6 weeks".' },
            { text: 'Write the sequence explicitly: 35, 40, 45, 50, 55, 60.' },
            { text: 'Compute differences between consecutive terms: 40-35=5, 45-40=5, 50-45=5, 55-50=5, 60-55=5.' },
            { text: 'Observe that all differences are equal to 5. By definition, the sequence is an AP with common difference \\(d = 5\\).' },
            { text: 'Interpret: The common difference 5 cm matches the weekly growth rate. The sequence is increasing because \\(d > 0\\).', faded: true, blankAnswer: 'Sequence: 35, 40, 45, 50, 55, 60 (in cm). It is an AP with.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch8_5', title: 'nth Term of an Arithmetic Progression: Formula',
          scaffold: { problem: 'A construction worker stacks bricks in rows. The bottom row has 30 bricks. Each row above has 2 fewer bricks than the row below.',
            steps: [
            { text: 'Identify the sequence. The bottom row is the 1st term, so \\( a = 30 \\).' },
            { text: 'Write the nth term formula for an AP: \\( a_n = a + (n-1)d \\).' },
            { text: 'Substitute the known values: \\( a_{12} = 30 + (12-1) \\times (-2) \\).' },
            { text: 'Simplify step by step: \\( 12-1 = 11 \\), then \\( 11 \\times (-2) = -22 \\), then \\( 30 + (-22) = 8 \\).' },
            { text: 'Interpret: The 12th row has 8 bricks. Check: row 1=30, row 2=28, row 3=26... row 12 should be \\( 30 - 22 = 8 \\).', faded: true, blankAnswer: '8 bricks' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch8_5', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch8_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A puzzle shows the start of two saving plans: Plan A deposits 2, 4, 8, 16 rupees; Plan B deposits 2, 4, 6, 8 rupees. A friend calls them \'the same sequence — both just grow.\'',
            decisions: [{ prompt: 'What distinguishes the two sequences?', options: [
                { text: 'Their rules: Plan A multiplies by 2 each term (a doubling rule: 2,4,8,16,32…) while Plan B adds 2 (2,4,6,8,10…) — identical openings, different generating rules, and by the fifth term A is already more than triple B.', outcome: 'This treats a sequence as a position-indexed rule, not a lookalike list — the rule, not the first two terms, is the identity.' },
                { text: 'The friend is right — matching first terms mean the sequences are the same pattern continuing.', outcome: 'Two different rules can share an opening; the third term (8 vs 6) already proves the generators differ.', reveals: 'same-start-same-rule' },
                { text: 'Neither is a sequence at all — a real sequence must follow an obvious arithmetic step like +2.', outcome: 'A sequence is any ordered list with a rule assigning a term to each position n — doubling qualifies as fully as adding.', reveals: 'sequences-must-add' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch8_5', title: 'The bigger picture',
          caseStudy: { intro: 'A sequence is an ordered list wired to position: term 1, term 2, term n. Find the rule aₙ and the whole infinite pattern is yours — and whether it adds or multiplies decides whether it crawls or explodes.',
            decisions: [{ prompt: 'What comes next? Sequences and Series · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sequences and Series · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch8_1', difficulty: 'standard',
          question: 'A sequence is an ordered list of numbers (called terms) that follows a specific.',
          hint: 'If stuck, revisit "Substituting Values into Algebraic Expressions" (c7_math_ch04_009) and.',
          misconception: 'Students often treat the index \\(n\\) as the term value itself.',
          parts: [
                { id: 'a', prompt: 'The sequence is defined by \\(a_n = n^2 - 1\\). A student writes the first three terms as 0, 3, 8. Is the student correct?', answer: 'Correct answer: Yes, the student is correct',
                  options: ['Correct answer: Yes, the student is correct', '3, 6, 9', 'the 4th term is 4', 'first term is -1'],
                  hint: 'If stuck, revisit "Substituting Values into Algebraic Expressions" (c7_math_ch04_009) and.',
                  misconception: 'Students often treat the index \\(n\\) as the term value itself.' }
          ],
            remediations: { 'students-often-treat-the-index': { steps: ['If a student makes this error, do the following: 1.', 'Draw a two-row table: top row "Position \\(n\\)", bottom row "Term \\(a_n\\)".', 'For \\(a_n = 3n\\), fill \\(n=1,2,3,4\\) in top row.', 'Explicitly compute each bottom cell: "3×1=3", "3×2=6", etc.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the index \\(n\\) as the term value itself.',
          parts: [
                { id: 'a', prompt: 'A student claims the list "1, 3, 5, 7, 9" is an infinite sequence because "you can always add 2 more". Evaluate this claim. Is the list finite or infinite?', answer: 'Correct answer: The list "1, 3, 5, 7, 9" is a finite sequence (5 terms)',
                  options: ['Correct answer: The list "1, 3, 5, 7, 9" is a finite sequence (5 terms)', '3, 6, 9', 'the 4th term is 4'],
                  hint: 'If stuck, revisit "Substituting Values into Algebraic Expressions" (c7_math_ch04_009) and.',
                  misconception: 'Students often treat the index \\(n\\) as the term value itself.' }
          ],
            remediations: { 'students-often-treat-the-index': { steps: ['If a student makes this error, do the following: 1.', 'Draw a two-row table: top row "Position \\(n\\)", bottom row "Term \\(a_n\\)".', 'For \\(a_n = 3n\\), fill \\(n=1,2,3,4\\) in top row.', 'Explicitly compute each bottom cell: "3×1=3", "3×2=6", etc.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_10', difficulty: 'standard',
          question: 'Fractals as recursive geometric sequences are self-similar shapes where each.',
          hint: 'Revisit c9_math_ch8_3 (Recursive Rules) for the construction logic and c9_math_ch8_4.',
          misconception: 'Students think fractals are just "complex or irregular shapes." The exact error: they focus on appearance (complicated.',
          parts: [
                { id: 'a', prompt: 'Define a fractal and explain the concept of self-similarity.', answer: 'A fractal is a shape that exhibits self-similarity',
                  options: ['A fractal is a shape that exhibits self-similarity', 'a fractal is a complicated shape', 'complex or irregular shapes', 'fractals are just "complex or irregular shapes'],
                  hint: 'Revisit c9_math_ch8_3 (Recursive Rules) for the construction logic and c9_math_ch8_4 (Geometric.',
                  misconception: 'Students think fractals are just "complex or irregular shapes." The exact error: they focus on appearance (complicated, jagged) rather than.' },
                { id: 'b', prompt: 'Write the recursive and explicit rules for the number of triangles in the Sierpinski triangle at stage n.', answer: 'Recursive: N_n = 3 * N_{n-1}, with N_0 = 1',
                  options: ['Recursive: N_n = 3 * N_{n-1}, with N_0 = 1', 'complex or irregular shapes', 'fractals are just "complex or irregular shapes'],
                  hint: 'Revisit c9_math_ch8_3 (Recursive Rules) for the construction logic and c9_math_ch8_4 (Geometric.',
                  misconception: 'Students think fractals are just "complex or irregular shapes." The exact error: they focus on appearance (complicated, jagged) rather than.' },
                { id: 'c', prompt: 'Describe the recursive construction rule for the Koch snowflake and explain why its perimeter grows without bound.', answer: 'Koch snowflake rule: Start with an equilateral triangle (Stage 0)',
                  options: ['Koch snowflake rule: Start with an equilateral triangle (Stage 0)', 'the perimeter stays the same', 'complex or irregular shapes', 'fractals are just "complex or irregular shapes'],
                  hint: 'Revisit c9_math_ch8_3 (Recursive Rules) for the construction logic and c9_math_ch8_4 (Geometric.',
                  misconception: 'Students think fractals are just "complex or irregular shapes." The exact error: they focus on appearance (complicated, jagged) rather than.' }
          ],
            remediations: { 'fractals-are-just-complex-or': { steps: ['Show the Sierpinski triangle at Stage 0, 1, 2, 3.', 'Ask: "What is the rule for going from one stage to the next?" (Replace each triangle with 3 smaller ones.) 3.', 'Count triangles: 1, 3, 9, 27 — recognize the geometric sequence (r=3).', 'Zoom in on a small triangle — it looks like the whole.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_2', difficulty: 'standard',
          question: 'An explicit rule for a sequence is a formula that expresses the nth term (aₙ).',
          hint: 'Revisit c8_math_ch5_7 (algebraic explanation of parity patterns) and c7_math_ch04_005.',
          misconception: 'Students often write the explicit rule for an arithmetic sequence as aₙ = a₁ + n×d instead of aₙ = a₁ + (n-1)×d.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An explicit rule for a sequence is a formula that expresses the nth term (aₙ) directly as',
                  options: ['An explicit rule for a sequence is a formula that expresses the nth term (aₙ) directly as', 'A sequence is an ordered list of numbers (called terms) that follows a specific rule or', 'Fractals as recursive geometric sequences are self-similar shapes where each stage of', 'A recursive rule for a sequence is a formula that defines each term as a function of one'],
                  hint: 'Revisit c8_math_ch5_7 (algebraic explanation of parity patterns) and c7_math_ch04_005 (matchstick.',
                  misconception: 'Students often write the explicit rule for an arithmetic sequence as aₙ = a₁ + n×d instead of aₙ = a₁ + (n-1)×d.' }
          ],
            remediations: { 'students-often-write-the-explicit': { steps: ['Have the student create a two-column table: Column 1 = term position n (1,2,3,4), Column 2 = term value.', 'Ask: "What value of n gives the first term?" They answer n=1.', 'Then say: "Substitute n=1 into your formula aₙ = 10 + 5n.', 'What do you get?" They get 15.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_3', difficulty: 'standard',
          question: 'A recursive rule for a sequence is a formula that defines each term as.',
          hint: 'Revisit c9_math_ch8_1 (Introduction to Sequences) for the basic concept and c9_math_ch8_2.',
          misconception: 'Students confuse recursive rules with explicit rules, providing a_n = f(n) when asked for a recursive rule, or a_n.',
          parts: [
                { id: 'a', prompt: 'Define a recursive rule and explain how it differs from an explicit rule.', answer: 'A recursive rule defines each term as a function of one or more preceding terms,',
                  options: ['A recursive rule defines each term as a function of one or more preceding terms,', 'recursive means repeating'],
                  hint: 'Revisit c9_math_ch8_1 (Introduction to Sequences) for the basic concept and c9_math_ch8_2 (Explicit.',
                  misconception: 'Students confuse recursive rules with explicit rules, providing a_n = f(n) when asked for a recursive rule, or a_n = f(a_{n-1}) when asked.' }
          ],
            remediations: { 'students-confuse-recursive-rules-with': { steps: ['Show the sequence 5, 8, 11, 14, 17, ...', 'Ask: "How do you get each term from the previous one?" (Add 3.) 3.', 'Write: a_n = a_{n-1} + 3, a_1 = 5.', 'This is recursive — each term depends on the previous.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_4', difficulty: 'standard',
          question: 'An arithmetic progression (AP) is a sequence of numbers in which the difference.',
          hint: 'If stuck, revisit subtraction of integers and fractions (Class 6-7 integers and.',
          misconception: 'Students often compute the common difference as \\(d = a_n - a_{n+1}\\) (subtracting the later term from the earlier.',
          parts: [
                { id: 'a', prompt: 'Consider the sequence: 3, 7, 11, 15, 19,... Is this an arithmetic progression? Explain why or why not by referencing the definition.', answer: 'Yes, it is an AP',
                  options: ['Yes, it is an AP', 'Yes because it increases by 4', 'No because the numbers are not multiples of 4'],
                  hint: 'If stuck, revisit subtraction of integers and fractions (Class 6-7 integers and fractions) and the.',
                  misconception: 'Students often compute the common difference as \\(d = a_n - a_{n+1}\\) (subtracting the later term from the earlier term) instead of \\(d.' }
          ],
            remediations: { 'students-often-compute-the-common': { steps: ['If a student makes this sign error, first ask them to write the definition: "common difference = next term minus.', 'Then have them physically point to the terms: "Point to the 2nd term, then the 1st term.', 'Subtract the earlier from the later." Practice with a decreasing sequence (e.g., 20, 15, 10) and an increasing one (5.', 'Emphasise that \\(d\\) can be negative, zero, or positive, and the subtraction order is fixed: later minus earlier.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_5', difficulty: 'standard',
          question: 'The nth term of an arithmetic progression (AP) is given by the formula \\( a_n.',
          hint: 'If stuck, revisit c9_math_ch8_4 to practice identifying \\( a \\) and \\( d \\) from various.',
          misconception: 'Students consistently use \\( a_n = a + nd \\) instead of \\( a + (n-1)d \\).',
          parts: [
                { id: 'a', prompt: 'What is the formula for the nth term of an arithmetic progression with first term \\( a \\) and common difference \\( d \\)?', answer: 'The formula is \\( a_n = a + (n-1)d \\)',
                  options: ['The formula is \\( a_n = a + (n-1)d \\)', 'one less than term number'],
                  hint: 'If stuck, revisit c9_math_ch8_4 to practice identifying \\( a \\) and \\( d \\) from various sequences.',
                  misconception: 'Students consistently use \\( a_n = a + nd \\) instead of \\( a + (n-1)d \\).' }
          ],
            remediations: { 'students-consistently-use-a-n': { steps: ['Write the first 5 terms explicitly: \\( a, a+d, a+2d, a+3d, a+4d \\).', 'Circle the coefficient of \\( d \\) in each (0,1,2,3,4) and write the term number below (1,2,3,4,5).', 'Ask "What is the relationship?" until the student says "coefficient = term number - 1".', 'Practice three problems where they must write the expanded form (e.g. \\( a_7 = a + 6d \\)) before using the formula.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
