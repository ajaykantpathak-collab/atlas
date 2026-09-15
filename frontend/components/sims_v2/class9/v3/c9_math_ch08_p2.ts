import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch08_p2: SimDef = {
    id: 'v3_c9_math_ch08_p2',
    title: 'Sequences and Series · Part 2/2',
    subtitle: 'Every term knows its position',
    classLevel: 9, subject: 'mathematics', topic: 'Sequences and Series · Part 2/2',
    chapters: ['c9_math_ch08'],
    nodeIds: ['c9_math_ch8_6', 'c9_math_ch8_7', 'c9_math_ch8_8', 'c9_math_ch8_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a pattern decoder', intro: '₹10 in week 1, ₹20 in week 2, ₹30 in week 3 — your savings are secretly a sequence. Learn to read the rule hiding inside any list of numbers.', goal: 'Understand sequences as ordered, position-indexed lists — writing terms from rules like aₙ = 2n+1, distinguishing finite/infinite, and comparing additive vs multiplicative growth.' },
    discovery: {
        question: 'Two sequences both start 2, 4 — but one goes 8, 16, 32 and the other 6, 8, 10. Same start, wildly different futures. What\'s the invisible difference?',
        options: ['One multiplies by 2 each step (2ⁿ — exponential growth), the other adds 2 each step (2n — linear growth); multiplying explodes past adding', 'Nothing — they\'ll meet again later', 'One is prime numbers, one is even', 'The second sequence made an arithmetic error'],
        answer: 'One multiplies by 2 each step (2ⁿ — exponential growth), the other adds 2 each step (2n — linear growth); multiplying explodes past adding',
        hook: 'A sequence is a function wearing a disguise: each term is pinned to its position number n, and the first term is n=1 — never n=0. For aₙ = n² − 1, the sequence starts at 0 (1² − 1), not −1.',
    },
    teaching: [
        { title: 'Sum of First n Terms of an Arithmetic Progression', text: 'The sum of the first n terms of an arithmetic progression (AP) is the total obtained by adding the first n terms of the sequence, where the terms increase or decrease by a constant common difference.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch8_6', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Crack position rules: generate terms of aₙ = (2n+1)/n term by term, tell a true sequence from a mere set, and settle why \'1, 3, 5, 7, 9\' is finite even though you could keep adding 2 forever.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch8_6', title: 'Sum of First n Terms of an Arithmetic Progression',
          scaffold: { problem: 'A construction company penalizes a delay of ₹2000 for the first day, ₹2500 for the second day, ₹3000 for the third day, and so on.',
            steps: [
            { text: 'Identify the AP: first term a = 2000, common difference d = 500, number of terms n = 30.' },
            { text: 'Write the sum formula: S_n = n/2 [2a + (n-1)d].' },
            { text: 'Substitute the values: S_30 = 30/2 [2(2000) + (30-1)(500)].' },
            { text: 'Simplify inside brackets: 2(2000) = 4000; (29)(500) = 14500; sum = 4000 + 14500 = 18500.' },
            { text: 'Compute S_30 = 15 × 18500 = 277500.', faded: true, blankAnswer: '₹277,500' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch8_7', title: 'Arithmetic Progression: Word Problems and Applications',
          scaffold: { problem: 'A school auditorium has 12 rows of seats. The first row has 18 seats, and each subsequent row has 4 more seats than the previous row.',
            steps: [
            { text: 'Identify the AP parameters from the problem. First row seats = 18 → a = 18. Increase per row = 4 → d = 4.' },
            { text: 'Determine what is asked. "Total seating capacity" means sum of seats in all 12 rows → need S_12.' },
            { text: 'Write the sum formula: S_n = n/2 [2a + (n-1)d]. Substitute n=12, a=18, d=4: S_12 = 12/2 [2(18) + (12-1)4].' },
            { text: 'Compute stepwise: S_12 = 6 [36 + 11×4] = 6 [36 + 44] = 6 × 80 = 480.' },
            { text: 'Interpret: The auditorium can seat 480 people. Verify: last row seats = 18 + 11×4 = 62; average per row = (18+62)/2.', faded: true, blankAnswer: '480 seats' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch8_8', title: 'Geometric Progression: Definition and Common Ratio',
          scaffold: { problem: 'A farmer plants a special type of bamboo that grows by multiplying its height by 1.5 every week.',
            steps: [
            { text: 'Identify the initial height as the first term: \\( a = 10 \\) cm.' },
            { text: 'Identify the growth factor as the common ratio: "multiplies by 1.5" means \\( r = 1.5 \\).' },
            { text: 'Write the terms using the GP pattern: Week 1 (start): \\( a = 10 \\). Week 2 (start): \\( ar = 10 \\times 1.5 \\).' },
            { text: 'Compute each term: Week 1: 10 cm. Week 2: \\( 10 \\times 1.5 = 15 \\) cm. Week 3: \\( 15 \\times 1.5 = 22.5 \\) cm.' },
            { text: 'Verify the ratio is constant: \\( 15/10 = 1.5 \\), \\( 22.5/15 = 1.5 \\), \\( 33.75/22.5 = 1.5 \\).', faded: true, blankAnswer: 'Heights: 10 cm, 15 cm, 22.5 cm, 33.75 cm. \\( a = 10 \\), \\.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch8_9', title: 'Geometric Progression: nth Term Formula',
          scaffold: { problem: 'A ball is dropped from a height of 10 metres. After each bounce, it rises to 60% of its previous height.',
            steps: [
            { text: 'Identify the sequence. Initial height = 10 m. After 1st bounce: 10 * 0.6 = 6 m. After 2nd bounce: 6 * 0.6 = 3.6 m.' },
            { text: 'Confirm GP parameters. a = 6 m (height after first bounce), r = 0.6 (60% = 3/5).' },
            { text: 'Apply nth term formula: a_n = a * r^(n-1). Substitute: a_5 = 6 * (0.6)^(5-1) = 6 * (0.6)^4.' },
            { text: 'Compute (0.6)^4 = (6/10)^4 = 1296/10000 = 0.1296. Then a_5 = 6 * 0.1296 = 0.7776 m.' },
            { text: 'Interpret: After the 5th bounce, the ball rises to 0.7776 metres (or 77.76 cm).', faded: true, blankAnswer: '0.7776 metres (or 77.76 cm)' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch8_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch8_6', title: 'Use it in the wild',
          caseStudy: { intro: 'A puzzle shows the start of two saving plans: Plan A deposits 2, 4, 8, 16 rupees; Plan B deposits 2, 4, 6, 8 rupees. A friend calls them \'the same sequence — both just grow.\'',
            decisions: [{ prompt: 'What distinguishes the two sequences?', options: [
                { text: 'Their rules: Plan A multiplies by 2 each term (a doubling rule: 2,4,8,16,32…) while Plan B adds 2 (2,4,6,8,10…) — identical openings, different generating rules, and by the fifth term A is already more than triple B.', outcome: 'This treats a sequence as a position-indexed rule, not a lookalike list — the rule, not the first two terms, is the identity.' },
                { text: 'The friend is right — matching first terms mean the sequences are the same pattern continuing.', outcome: 'Two different rules can share an opening; the third term (8 vs 6) already proves the generators differ.', reveals: 'same-start-same-rule' },
                { text: 'Neither is a sequence at all — a real sequence must follow an obvious arithmetic step like +2.', outcome: 'A sequence is any ordered list with a rule assigning a term to each position n — doubling qualifies as fully as adding.', reveals: 'sequences-must-add' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch8_9', title: 'You made it',
          caseStudy: { intro: 'A sequence is an ordered list wired to position: term 1, term 2, term n. Find the rule aₙ and the whole infinite pattern is yours — and whether it adds or multiplies decides whether it crawls or explodes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch8_6', difficulty: 'standard',
          question: 'The sum of the first n terms of an arithmetic progression (AP) is the total.',
          hint: 'If stuck, revisit c9_math_ch8_5 (nth term formula) and c6_math_ch05_056 (solving linear.',
          misconception: 'Students often use n instead of (n-1) in the formula S_n = n/2 [2a + (n-1)d], writing S_n = n/2 [2a + nd].',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sum of the first n terms of an arithmetic progression (AP) is the total obtained by',
                  options: ['The sum of the first n terms of an arithmetic progression (AP) is the total obtained by', 'A sequence is an ordered list of numbers (called terms) that follows a specific rule or', 'Fractals as recursive geometric sequences are self-similar shapes where each stage of', 'An explicit rule for a sequence is a formula that expresses the nth term (aₙ) directly as'],
                  hint: 'If stuck, revisit c9_math_ch8_5 (nth term formula) and c6_math_ch05_056 (solving linear equations).',
                  misconception: 'Students often use n instead of (n-1) in the formula S_n = n/2 [2a + (n-1)d], writing S_n = n/2 [2a + nd].' }
          ],
            remediations: { 'students-often-use-n-instead': { steps: ['If a student makes this error, first ask them to list the terms explicitly: for n=4, terms are a, a+d, a+2d, a+3d.', 'Then count the number of d\'s added to the first term to get the last term (3 times, not 4).', 'Write the sum as S_4 = a + (a+d) + (a+2d) + (a+3d) = 4a + (0+1+2+3)d = 4a + 6d.', 'Compare with formula: 4/2 [2a + 3d] = 2[2a+3d] = 4a+6d.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_7', difficulty: 'standard',
          question: 'An arithmetic progression (AP) word problem is a real-world scenario where.',
          hint: 'If stuck, revisit c9_math_ch8_4 (AP definition) to practice identifying a and d from.',
          misconception: 'Students often confuse "increases by ₹50 each day" with the common difference d = 50, but then write the nth term as.',
          parts: [
                { id: 'a', prompt: 'A gardener plants a sapling that is 10 cm tall. It grows 3 cm every week. Which formula gives the height after n weeks?', answer: 'Correct answer: B) 10 + 3(n-1)',
                  options: ['Correct answer: B) 10 + 3(n-1)', 'increases by ₹50 each day'],
                  hint: 'If stuck, revisit c9_math_ch8_4 (AP definition) to practice identifying a and d from lists, then.',
                  misconception: 'Students often confuse "increases by ₹50 each day" with the common difference d = 50, but then write the nth term as a + n×d instead of.' },
                { id: 'b', prompt: 'A contractor penalizes ₹200 for the first day of delay, and the penalty increases by ₹50 each subsequent day.', answer: 'Given: a = 200, d = 50, S_n = 9750',
                  options: ['Given: a = 200, d = 50, S_n = 9750', 'increases by ₹50 each day'],
                  hint: 'If stuck, revisit c9_math_ch8_4 (AP definition) to practice identifying a and d from lists, then.',
                  misconception: 'Students often confuse "increases by ₹50 each day" with the common difference d = 50, but then write the nth term as a + n×d instead of.' }
          ],
            remediations: { 'students-often-confuse-increases-by': { steps: ['Ask the student to list the first 4 terms explicitly from the word problem (e.g., Day 1: 200, Day 2: 250, Day 3: 300.', 'Have them write the term number and value as a table: (1,200), (2,250), (3,300), (4,350).', 'Show that the pattern is value = 200 + (term number - 1)×50.', 'Generalize: T_n = first term + (n-1)×d.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "increases by ₹50 each day" with the common difference d = 50, but then write the nth term as.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Find the 20th term of the AP: 5, 11, 17, 23, ..." and writes: a=5, d=6, T_20 = 5 + 20×6 = 125.', answer: 'Error: The student used n instead of (n-1) in the nth term formula',
                  options: ['Error: The student used n instead of (n-1) in the nth term formula', 'increases by ₹50 each day'],
                  hint: 'If stuck, revisit c9_math_ch8_4 (AP definition) to practice identifying a and d from lists, then.',
                  misconception: 'Students often confuse "increases by ₹50 each day" with the common difference d = 50, but then write the nth term as a + n×d instead of.' },
                { id: 'b', prompt: 'Create a word problem (in Indian context) that requires finding the number of terms n in an AP, given the first term, common difference, and the sum.', answer: 'Example problem: "Rohan saves ₹50 in the first week of the year',
                  options: ['Example problem: "Rohan saves ₹50 in the first week of the year', 'increases by ₹50 each day'],
                  hint: 'If stuck, revisit c9_math_ch8_4 (AP definition) to practice identifying a and d from lists, then.',
                  misconception: 'Students often confuse "increases by ₹50 each day" with the common difference d = 50, but then write the nth term as a + n×d instead of.' }
          ],
            remediations: { 'students-often-confuse-increases-by': { steps: ['Ask the student to list the first 4 terms explicitly from the word problem (e.g., Day 1: 200, Day 2: 250, Day 3: 300.', 'Have them write the term number and value as a table: (1,200), (2,250), (3,300), (4,350).', 'Show that the pattern is value = 200 + (term number - 1)×50.', 'Generalize: T_n = first term + (n-1)×d.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_8', difficulty: 'standard',
          question: 'A geometric progression (GP) is a sequence of numbers where each term after the.',
          hint: 'If stuck, revisit Class 8 exponential notation (c8_math_ch2_3) and the paper folding.',
          misconception: 'Students often compute the common ratio by subtracting consecutive terms (like in AP) instead of dividing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A geometric progression (GP) is a sequence of numbers where each term after the first is',
                  options: ['A geometric progression (GP) is a sequence of numbers where each term after the first is', 'A sequence is an ordered list of numbers (called terms) that follows a specific rule or', 'Fractals as recursive geometric sequences are self-similar shapes where each stage of', 'An explicit rule for a sequence is a formula that expresses the nth term (aₙ) directly as'],
                  hint: 'If stuck, revisit Class 8 exponential notation (c8_math_ch2_3) and the paper folding doubling.',
                  misconception: 'Students often compute the common ratio by subtracting consecutive terms (like in AP) instead of dividing.' }
          ],
            remediations: { 'students-often-compute-the-common': { steps: ['If a student subtracts terms to find the pattern, immediately contrast with AP: "In AP we add the same number; in GP.', 'What operation connects 3 to 6?', 'Write the operation as a fraction: 6/3 = 2, 12/6 = 2.', 'That fraction is the common ratio." Have them practice with a table: Term 1 | Term 2 | Operation (÷) | Ratio.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch8_9', difficulty: 'standard',
          question: 'A geometric progression (GP) is a sequence where each term after the first.',
          hint: 'If stuck, revisit c8_math_ch2_3 (exponential notation), c8_math_ch2_7-9 (exponent laws).',
          misconception: 'Students consistently make the off-by-one exponent error: writing a_n = a * r^n instead of a * r^(n-1).',
          parts: [
                { id: 'a', prompt: 'Explain why the exponent in the nth term formula is (n-1) and not n. Use the GP 5, 15, 45, 135, ... to illustrate your reasoning.', answer: 'The first term (n=1) is a * r^0 = a * 1 = a',
                  options: ['The first term (n=1) is a * r^0 = a * 1 = a', 'exponent equals term number'],
                  hint: 'If stuck, revisit c8_math_ch2_3 (exponential notation), c8_math_ch2_7-9 (exponent laws), and.',
                  misconception: 'Students consistently make the off-by-one exponent error: writing a_n = a * r^n instead of a * r^(n-1). For example, in GP 2, 6, 18, 54...' },
                { id: 'b', prompt: 'Compare the growth of the 10th term in these two sequences: AP with a=2, d=3 and GP with a=2, r=3. Which grows faster and why?', answer: 'AP 10th term: a_10 = 2 + 9*3 = 29',
                  options: ['AP 10th term: a_10 = 2 + 9*3 = 29', 'GP always larger'],
                  hint: 'If stuck, revisit c8_math_ch2_3 (exponential notation), c8_math_ch2_7-9 (exponent laws), and.',
                  misconception: 'Students consistently make the off-by-one exponent error: writing a_n = a * r^n instead of a * r^(n-1). For example, in GP 2, 6, 18, 54...' }
          ],
            remediations: { 'students-consistently-make-the-off': { steps: ['Have the student write the first 4 terms explicitly as products: a, a*r, a*r*r, a*r*r*r.', 'Ask "How many r\'s are multiplied in term 1? Term 2? Term 3?" Guide them to see term n has (n-1) factors of r.', 'Use color coding: write term number n in red, exponent in blue, show n=1→0, n=2→1, n=3→2.', 'Practice with r=1 (trivial case) to show formula gives a * 1^(n-1) = a for all terms.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
