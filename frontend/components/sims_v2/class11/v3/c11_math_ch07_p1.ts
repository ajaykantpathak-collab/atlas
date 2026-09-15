import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch07_p1: SimDef = {
    id: 'v3_c11_math_ch07_p1',
    title: 'Permutations and Combinations · Part 1/2',
    subtitle: 'Learn when choices multiply — and when they shrink each other.',
    classLevel: 11, subject: 'mathematics', topic: 'Permutations and Combinations · Part 1/2',
    chapters: ['c11_math_ch07'],
    nodeIds: ['c11_math_cbse_07_001', 'c11_math_cbse_07_002', 'c11_math_cbse_07_003', 'c11_math_cbse_07_004', 'c11_math_cbse_07_005', 'c11_math_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a counter who multiplies instead of listing', intro: 'Three shirts, two trousers — six outfits without listing one. Scale it to digits and the independence question bites.', goal: 'Apply the multiplication principle correctly to dependent and independent choices, and manipulate factorials.' },
    discovery: {
        question: 'Three-digit numbers from digits 1–5, no repetition: 5 choices × 5 × 5 = 125?',
        options: ['No — each used digit is gone: 5 × 4 × 3 = 60', 'Yes — three positions, five digits each', 'Yes — repetition doesn\'t change the count', 'No — it\'s 5 + 4 + 3 = 12'],
        answer: 'No — each used digit is gone: 5 × 4 × 3 = 60',
        hook: 'And 10!/8! is not (10/8)! — the factorial is a function, not a factor: it unwraps to 10 × 9 = 90.',
    },
    teaching: [
        { title: 'Fundamental Principle of Counting', text: 'The Fundamental Principle of Counting (Multiplication Principle) states that if an event can occur in \\(m\\) different ways and, following it, another independent event can occur in \\(n\\) different.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_07_001', title: 'Your mission',
          mission: { widget: 'moon', validate: 'moon:phase=80',
            instruction: 'On the lab: sweep to full moon — what does the lit fraction do?.',
        context: 'Count a 4×5×3 complete meal, then verify the constraint-first method: fix the even units digit, then count the rest.',
            observePrompt: 'What did the moon interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_001', title: 'Fundamental Principle of Counting',
          scaffold: { problem: 'A Delhi Metro commuter travels from Rajiv Chowk to HUDA City Centre.',
            steps: [
            { text: 'Identify the three sequential stages: Stage 1 (Rajiv Chowk → New Delhi) has 3 route choices.' },
            { text: 'Verify independence — the choice of route in Stage 1 does not affect the available routes in Stage 2 or Stage 3; the.' },
            { text: 'Apply the Fundamental Principle of Counting (Multiplication Principle) for 3 independent stages: Total ways = (choices.' },
            { text: 'Substitute values: Total = 3 × 4 × 2.' },
            { text: 'Compute stepwise: 3 × 4 = 12; 12 × 2 = 24. The answer is a pure count (dimensionless).', faded: true, blankAnswer: '24 different route combinations.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_002', title: 'Factorial Notation: n!',
          scaffold: { problem: 'A school library has 6 different mathematics books. In how many ways can they be arranged on a shelf if all 6 books are used?',
            steps: [
            { text: 'Identify that we are arranging all 6 distinct books in a line.' },
            { text: 'By the Fundamental Principle of Counting, total arrangements = \\(6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1\\).' },
            { text: 'Recognize this product as the definition of \\(6!\\). So the answer in factorial notation is \\(6!\\).' },
            { text: 'Evaluate \\(6! = 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = 720\\).' },
            { text: 'Interpret: There are 720 different ways to arrange the 6 books.', faded: true, blankAnswer: '\\(6! = 720\\) ways.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_003', title: 'Permutations: Definition and Formula',
          scaffold: { problem: 'A password must be exactly 4 characters long, formed from the digits {1, 2, 3, 4, 5, 6, 7} with no digit repeated.',
            steps: [
            { text: 'Identify n = 7 (digits available), r = 4 (length of password), no repetition allowed, order matters (1234 ≠ 4321).' },
            { text: 'Recognize this as a permutation problem: number of ways = ^7P_4.' },
            { text: 'Apply formula ^7P_4 = 7!/(7-4)! = 7!/3!.' },
            { text: 'Simplify: 7!/3! = (7 × 6 × 5 × 4 × 3 × 2 × 1)/(3 × 2 × 1) = 7 × 6 × 5 × 4 = 840.' },
            { text: 'Interpret: There are 840 distinct 4-digit passwords possible from 7 digits without repetition.', faded: true, blankAnswer: '840 passwords' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_004', title: 'Permutations When All Objects Are Distinct',
          scaffold: { problem: 'A school committee has 8 teachers. In how many ways can the positions of Chairperson, Vice-Chairperson, and Secretary be filled if.',
            steps: [
            { text: 'Identify n = 8 distinct teachers, r = 3 distinct positions. Order matters because positions are different.' },
            { text: 'Recognize this as permutations of 8 distinct objects taken 3 at a time: \\(^8P_3\\).' },
            { text: 'Apply formula: \\(^8P_3 = \\frac{8!}{(8-3)!} = \\frac{8!}{5!}\\).' },
            { text: 'Compute: \\(\\frac{8 \\times 7 \\times 6 \\times 5!}{5!} = 8 \\times 7 \\times 6 = 336\\).' },
            { text: 'Interpret: There are 336 different ways to assign the three distinct posts to 8 teachers.', faded: true, blankAnswer: '336 ways' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_005', title: 'Permutations When Objects Are Not Distinct',
          scaffold: { problem: 'A student wants to arrange the letters of the word "ENGINEERING" in a row. How many distinct arrangements are possible?',
            steps: [
            { text: 'Count the total number of letters in "ENGINEERING". There are 11 letters.' },
            { text: 'Identify the frequency of each distinct letter: E=3, N=3, G=2, I=2, R=1.' },
            { text: 'Write the formula for permutations with non-distinct objects: 11! / (3! × 3! × 2! × 2! × 1!).' },
            { text: 'Compute factorials: 11! = 39916800; 3! = 6; 2! = 2; 1! = 1.' },
            { text: 'Calculate denominator: 6 × 6 × 2 × 2 × 1 = 144.' },
            { text: 'Divide: 39916800 / 144 = 277200.', faded: true, blankAnswer: '277,200 distinct arrangements.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_006', title: 'Permutations with Repetition Allowed',
          scaffold: { problem: 'A school\'s new bicycle lock has 4 dials. Each dial can be set to any digit from 0 to 9. Digits can be repeated (e.g., 1223 is allowed).',
            steps: [
            { text: 'Identify the number of distinct objects (digits) available: \\(n = 10\\) (digits 0,1,2,…,9).' },
            { text: 'Identify the number of positions to fill (dials): \\(r = 4\\).' },
            { text: 'Recognise that repetition is allowed (each dial is independent and can show any digit regardless of other dials).' },
            { text: 'Apply the formula for permutations with repetition allowed: \\(n^r = 10^4\\).' },
            { text: 'Compute \\(10^4 = 10 \\times 10 \\times 10 \\times 10 = 10,000\\).' },
            { text: 'Interpret: There are 10,000 possible combinations for the lock.', faded: true, blankAnswer: '10,000 combinations' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_07_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Counting 3-digit numbers from digits 1–5 without repetition, a teammate writes 5 × 5 × 5 = 125 \'three positions, five choices each.\' Simplifying 5!/3! he writes 5/3, \'cancelling the factorial.\'',
            decisions: [{ prompt: 'Where does his counting logic break?', options: [
                { text: 'Restore the dependency: \'without repetition\' shrinks each later choice set — hundreds has 5, tens has 4, units has 3 → 60, not 125; multiplication counts independent choices, and here they aren\'t. And \'!\' isn\'t a factor to cancel: 5!/3! = (5·4·3!)/3! = 20 — expand to the smaller factorial, then cancel the whole block.', outcome: 'He stops plugging and starts reasoning: the multiplication principle requires independence, and factorial is a product that cancels only whole.' },
                { text: 'Keep 5×5×5 — each position has the same five digits available.', outcome: 'Repetition is forbidden: choosing a digit removes it from later pools — the second factor must drop to 4, then 3.', reveals: 'independent-when-dependent' },
                { text: 'Accept 5/3 — the factorials divide out like matching symbols.', outcome: '\'!\' is a function, not a multiplier: partial cancellation is meaningless — 5!/3! unfolds to 5×4 = 20.', reveals: 'cancel-the-factorial' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Multiply only when choices are independent — when a choice spends a digit, the next multiplication must shrink with it.',
            decisions: [{ prompt: 'What comes next? Permutations and Combinations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Permutations and Combinations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'moon', prompt: 'Explore the moon interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'moon', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_07_001', difficulty: 'standard',
          question: 'The Fundamental Principle of Counting (Multiplication Principle) states that.',
          hint: 'If stuck, revisit Class 7 "Writing Expressions from Word Problems" (c7_math_ch02_007).',
          misconception: 'The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Fundamental Principle of Counting (Multiplication Principle) states that if an event',
                  options: ['The Fundamental Principle of Counting (Multiplication Principle) states that if an event', 'For any non-negative integer \\(n\\), the factorial notation \\(n!\\) (read as "n factorial")', 'A permutation is an arrangement of objects in a specific order where the order of', 'A permutation of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is an ordered'],
                  hint: 'If stuck, revisit Class 7 "Writing Expressions from Word Problems" (c7_math_ch02_007) to practice.',
                  misconception: 'The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without adjusting the second.' }
          ],
            remediations: { 'the-most-pervasive-class-11': { steps: ['Have the student physically model with 3 digit cards (1,2,3) — list all 3-digit numbers without repetition (6 outcomes).', 'Ask: "After you place a card in the hundreds position, how many cards remain for tens?" Guide them to see the choice.', 'Re-derive the rule: "If repetition allowed → choices stay same → multiply same number.', 'Practice 5 similar problems where they must first state "independent?" or "dependent?" before multiplying.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without.',
          parts: [
                { id: 'a', prompt: 'A student solves: "How many 3-digit even numbers can be formed from digits 1, 2, 3, 4, 5 if repetition is allowed?" Their working: "Units digit must be even: 2.', answer: 'The student\'s answer is correct',
                  options: ['The student\'s answer is correct', 'hundreds digit cannot be 0 so only 4 ways', 'no leading zero'],
                  hint: 'If stuck, revisit Class 7 "Writing Expressions from Word Problems" (c7_math_ch02_007) to practice.',
                  misconception: 'The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without adjusting the second.' }
          ],
            remediations: { 'the-most-pervasive-class-11': { steps: ['Have the student physically model with 3 digit cards (1,2,3) — list all 3-digit numbers without repetition (6 outcomes).', 'Ask: "After you place a card in the hundreds position, how many cards remain for tens?" Guide them to see the choice.', 'Re-derive the rule: "If repetition allowed → choices stay same → multiply same number.', 'Practice 5 similar problems where they must first state "independent?" or "dependent?" before multiplying.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_002', difficulty: 'standard',
          question: 'For any non-negative integer \\(n\\), the factorial notation \\(n!\\) (read as "n.',
          hint: 'Revisit the Fundamental Principle of Counting (c11_math_cbse_07_001) and practice.',
          misconception: 'Students treat the factorial symbol "!" as an algebraic factor that can be cancelled partially, e.g., writing.',
          parts: [
                { id: 'a', prompt: 'Write the value of \\(6!\\) and explain in one sentence what the notation means.', answer: '\\(6!',
                  options: ['\\(6!', 'factorial stops at 2 or multiplies only two numbers'],
                  hint: 'Revisit the Fundamental Principle of Counting (c11_math_cbse_07_001) and practice counting.',
                  misconception: 'Students treat the factorial symbol "!" as an algebraic factor that can be cancelled partially, e.g., writing \\(\\frac{(n+1)!}{n!} = n+1\\).' }
          ],
            remediations: { 'students-treat-the-factorial-symbol': { steps: ['Write out the expanded form: \\((n+2)!', '= (n+2)(n+1)n(n-1)\\cdots 1\\) and \\(n!', 'Visually cancel the common tail \\(n(n-1)\\cdots 1\\) leaving \\((n+2)(n+1)\\).', 'Practice with numeric examples: \\(\\frac{7!}{5!} = \\frac{7 \\times 6 \\times 5!}{5!} = 42\\).'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_003', difficulty: 'standard',
          question: 'A permutation is an arrangement of objects in a specific order where the order.',
          hint: 'If stuck, revisit c11_math_cbse_07_001 (Fundamental Principle of Counting) for the logic.',
          misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!',
          parts: [
                { id: 'a', prompt: 'Write the formula for the number of permutations of n distinct objects taken r at a time, and state the condition on r.', answer: 'The formula is ^nP_r = n!/(n-r)!',
                  options: ['The formula is ^nP_r = n!/(n-r)!', 'divide by r!'],
                  hint: 'If stuck, revisit c11_math_cbse_07_001 (Fundamental Principle of Counting) for the logic.',
                  misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!' },
                { id: 'b', prompt: 'Explain why the number of permutations of 5 distinct objects taken 3 at a time is 5 × 4 × 3 = 60, and why it is NOT 5 × 5 × 5 = 125.', answer: 'For the first position we have 5 choices',
                  options: ['For the first position we have 5 choices', 'divide by r!'],
                  hint: 'If stuck, revisit c11_math_cbse_07_001 (Fundamental Principle of Counting) for the logic.',
                  misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!' },
                { id: 'c', prompt: 'Compute ^8P_3 and ^8P_5. Are they equal? Justify your answer using the formula.', answer: '^nP_3 = 8!/(8-3)!',
                  options: ['^nP_3 = 8!/(8-3)!', '8 choose 3 equals 8 choose 5', 'divide by r!'],
                  hint: 'If stuck, revisit c11_math_cbse_07_001 (Fundamental Principle of Counting) for the logic.',
                  misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!' },
                { id: 'd', prompt: 'Given that ^nP_4 = 20 × ^nP_2, find the value of n. Show all algebraic steps.', answer: '^nP_4 = n!/(n-4)!',
                  options: ['^nP_4 = n!/(n-4)!', 'divide by r!'],
                  hint: 'If stuck, revisit c11_math_cbse_07_001 (Fundamental Principle of Counting) for the logic.',
                  misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!' }
          ],
            remediations: { 'students-write-np-r-n': { steps: ['If a student writes ^nP_r = n!/r!, immediately ask: "For ^5P_3, how many factors should we multiply?', 'Write them out: 5 × 4 × 3.', 'Now what is 5!/(5-3)!?" Guide them to see 5!/2!', '= (5×4×3×2×1)/(2×1) = 5×4×3.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_004', difficulty: 'standard',
          question: 'A permutation of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is.',
          hint: 'Revisit c11_math_cbse_07_001 (Fundamental Principle of Counting) and c11_math_cbse_07_002.',
          misconception: 'Students often write \\(^nP_r = \\frac{n!}{r!}\\) instead of \\(\\frac{n!}{(n-r)!}\\), confusing the denominator with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A permutation of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is an ordered',
                  options: ['A permutation of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is an ordered', 'The Fundamental Principle of Counting (Multiplication Principle) states that if an event', 'For any non-negative integer \\(n\\), the factorial notation \\(n!\\) (read as "n factorial")', 'A permutation is an arrangement of objects in a specific order where the order of'],
                  hint: 'Revisit c11_math_cbse_07_001 (Fundamental Principle of Counting) and c11_math_cbse_07_002.',
                  misconception: 'Students often write \\(^nP_r = \\frac{n!}{r!}\\) instead of \\(\\frac{n!}{(n-r)!}\\), confusing the denominator with combinations.' }
          ],
            remediations: { 'students-often-write-np-r': { steps: ['If a student writes \\(\\frac{n!}{r!}\\), ask them to list permutations of 3 distinct letters (A,B,C) taken 2 at a time.', 'They will list 6: AB, AC, BA, BC, CA, CB.', 'Then compute \\(\\frac{3!}{2!}=3\\) (wrong) vs \\(\\frac{3!}{1!}=6\\) (correct).', 'Show that the denominator must be (n-r)!'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_005', difficulty: 'standard',
          question: 'The number of distinct permutations of n objects, where p₁ objects are.',
          hint: 'If stuck, revisit factorial notation (c11_math_cbse_07_002) and permutations of distinct.',
          misconception: 'Students often mistakenly divide by the sum of factorials (e.g., n! / (p! + q!)) or subtract factorials (n! - p! - q!).',
          parts: [
                { id: 'a', prompt: 'Explain why we divide by the factorial of the number of identical objects when counting permutations of non-distinct objects.', answer: 'If we treat the two A\'s as distinct (A₁, A₂), there are 3!',
                  options: ['If we treat the two A\'s as distinct (A₁, A₂), there are 3!', 'we subtract the repeated ones'],
                  hint: 'If stuck, revisit factorial notation (c11_math_cbse_07_002) and permutations of distinct objects.',
                  misconception: 'Students often mistakenly divide by the sum of factorials (e.g., n! / (p! + q!)) or subtract factorials (n! - p! - q!).' },
                { id: 'b', prompt: 'Compare the number of distinct permutations of the letters in "BANANA" and "BANANAS". Which is larger? By what factor?', answer: '"BANANA" has 6 letters: B=1, A=3, N=2 → 6!/(3!×2!) = 60',
                  options: ['"BANANA" has 6 letters: B=1, A=3, N=2 → 6!/(3!×2!) = 60', 'BANANAS has more letters so it\'s larger'],
                  hint: 'If stuck, revisit factorial notation (c11_math_cbse_07_002) and permutations of distinct objects.',
                  misconception: 'Students often mistakenly divide by the sum of factorials (e.g., n! / (p! + q!)) or subtract factorials (n! - p! - q!).' }
          ],
            remediations: { 'students-often-mistakenly-divide-by': { steps: ['If a student makes this error, first have them list all permutations of a small multiset like "AAB" manually (AAB, ABA.', 'Then show that treating A\'s as distinct gives 3!', '= 6 permutations, but the two A\'s can be swapped in 2!', 'ways, so each distinct arrangement corresponds to 2!'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_006', difficulty: 'standard',
          question: 'The number of permutations of \\(n\\) distinct objects taken \\(r\\) at a time.',
          hint: 'Revisit the Fundamental Principle of Counting (c11_math_cbse_07_001) and practice with.',
          misconception: 'Students mechanically apply \\(^nP_r = \\frac{n!}{(n-r)!}\\) whenever they see "permutation" and "r objects from n".',
          parts: [
                { id: 'a', prompt: 'State the formula for the number of permutations of \\(n\\) distinct objects taken \\(r\\) at a time when repetition is allowed.', answer: 'The formula is \\(n^r\\)',
                  options: ['The formula is \\(n^r\\)', 'repetition allowed', 'all objects distinct and no repetition'],
                  hint: 'Revisit the Fundamental Principle of Counting (c11_math_cbse_07_001) and practice with tree.',
                  misconception: 'Students mechanically apply \\(^nP_r = \\frac{n!}{(n-r)!}\\) whenever they see "permutation" and "r objects from n", ignoring the phrase.' }
          ],
            remediations: { 'students-mechanically-apply-np-r': { steps: ['Ask the student to draw a tree diagram for a tiny case: 2 letters {A, B}, length 2 with repetition allowed.', 'Count the branches: first level 2 branches (A,B), second level each splits into 2 again → 4 outcomes (AA, AB, BA, BB).', 'Write the multiplication: \\(2 \\times 2 = 2^2\\).', 'Then ask: "If repetition were NOT allowed, what changes?" (Second level: A branch only goes to B, B branch only goes.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
