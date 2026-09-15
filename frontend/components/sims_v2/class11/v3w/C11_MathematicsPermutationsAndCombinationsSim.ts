import type { SimDef } from '../../engine/types';
import C11_MathematicsPermutationsAndCombinationsSim from '../../../simulations/c6_12/C11_MathematicsPermutationsAndCombinationsSim';

/** v3 wrapped master — C11_MathematicsPermutationsAndCombinationsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicspermutationsandcombinationssim: SimDef = {
    id: 'v3w_c11_mathematicspermutationsandcombinationssim',
    title: 'Permutations And Combinations',
    subtitle: 'Covers the Multiplication Principle for independent sequential events and its distinction.',
    classLevel: 11, subject: 'mathematics', topic: 'Fundamental Principle of Counting',
    chapters: [],
    nodeIds: ['c11_math_cbse_07_001', 'c11_math_cbse_07_002', 'c11_math_cbse_07_003', 'c11_math_cbse_07_006', 'c11_math_cbse_07_007', 'c11_math_cbse_07_009', 'c11_math_cbse_07_010', 'c11_math_cbse_07_011', 'c11_math_cbse_07_004', 'c11_math_cbse_07_005', 'c11_math_cbse_07_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re packing for a school trip: you have 3 different shirts and 2 different pairs of trousers.', goal: 'Master Permutations And Combinations.' },
    discovery: {
        question: 'A student solves: "How many 3-digit even numbers can be formed from digits 1, 2, 3, 4, 5 if repetition is allowed?" Their working: "Units digit must be even: 2.',
        options: ['The student\'s answer is correct', 'hundreds digit cannot be 0 so only 4 ways', 'no leading zero'],
        answer: 'The student\'s answer is correct',
        hook: 'The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without.',
    },
    teaching: [
        { title: 'The Fundamental Principle of Counting.', text: 'The Fundamental Principle of Counting (Multiplication Principle) states that if an event can occur in \\(m\\) different ways and, following it, another independent event can occur in \\(n\\) different.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_001', title: 'The Fundamental Principle of Counting.',
          scaffold: { problem: 'A Delhi Metro commuter travels from Rajiv Chowk to HUDA City Centre.',
            steps: [
            { text: 'Identify the three sequential stages: Stage 1 (Rajiv Chowk → New Delhi) has 3 route choices.' },
            { text: 'Verify independence — the choice of route in Stage 1 does not affect the available routes in Stage 2 or Stage 3; the.' },
            { text: 'Apply the Fundamental Principle of Counting (Multiplication Principle) for 3 independent stages: Total ways = (choices.' },
            { text: 'Substitute values: Total = 3 × 4 × 2.' },
            { text: 'Compute stepwise: 3 × 4 = 12; 12 × 2 = 24. The answer is a pure count (dimensionless).', faded: true, blankAnswer: '24 different route combinations.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_002', title: 'For any non-negative integer \\(n\\), the.',
          scaffold: { problem: 'A school library has 6 different mathematics books. In how many ways can they be arranged on a shelf if all 6 books are used?',
            steps: [
            { text: 'Identify that we are arranging all 6 distinct books in a line.' },
            { text: 'By the Fundamental Principle of Counting, total arrangements = \\(6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1\\).' },
            { text: 'Recognize this product as the definition of \\(6!\\). So the answer in factorial notation is \\(6!\\).' },
            { text: 'Evaluate \\(6! = 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = 720\\).' },
            { text: 'Interpret: There are 720 different ways to arrange the 6 books.', faded: true, blankAnswer: '\\(6! = 720\\) ways.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_003', title: 'A permutation is an arrangement of.',
          scaffold: { problem: 'A password must be exactly 4 characters long, formed from the digits {1, 2, 3, 4, 5, 6, 7} with no digit repeated.',
            steps: [
            { text: 'Identify n = 7 (digits available), r = 4 (length of password), no repetition allowed, order matters (1234 ≠ 4321).' },
            { text: 'Recognize this as a permutation problem: number of ways = ^7P_4.' },
            { text: 'Apply formula ^7P_4 = 7!/(7-4)! = 7!/3!.' },
            { text: 'Simplify: 7!/3! = (7 × 6 × 5 × 4 × 3 × 2 × 1)/(3 × 2 × 1) = 7 × 6 × 5 × 4 = 840.' },
            { text: 'Interpret: There are 840 distinct 4-digit passwords possible from 7 digits without repetition.', faded: true, blankAnswer: '840 passwords' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_006', title: 'The number of permutations of \\(n\\).',
          scaffold: { problem: 'A school\'s new bicycle lock has 4 dials. Each dial can be set to any digit from 0 to 9. Digits can be repeated (e.g., 1223 is allowed).',
            steps: [
            { text: 'Identify the number of distinct objects (digits) available: \\(n = 10\\) (digits 0,1,2,…,9).' },
            { text: 'Identify the number of positions to fill (dials): \\(r = 4\\).' },
            { text: 'Recognise that repetition is allowed (each dial is independent and can show any digit regardless of other dials).' },
            { text: 'Apply the formula for permutations with repetition allowed: \\(n^r = 10^4\\).' },
            { text: 'Compute \\(10^4 = 10 \\times 10 \\times 10 \\times 10 = 10,000\\).' },
            { text: 'Interpret: There are 10,000 possible combinations for the lock.', faded: true, blankAnswer: '10,000 combinations' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_007', title: 'A combination is a selection of \\(r\\).',
          scaffold: { problem: 'A student has 6 different textbooks but can only carry 4 in his backpack. How many different sets of 4 textbooks can he choose?',
            steps: [
            { text: 'Identify that the order of textbooks in the backpack does not matter; this is a combination problem.' },
            { text: 'Write down n = 6 (total textbooks), r = 4 (textbooks to select).' },
            { text: 'Apply the combination formula: \\(^6C_4 = \\frac{6!}{4!(6-4)!} = \\frac{6!}{4!2!}\\).' },
            { text: 'Compute factorials: \\(6! = 720\\), \\(4! = 24\\), \\(2! = 2\\). So \\(^6C_4 = \\frac{720}{24 \\times 2} = \\frac{720}{48} = 15\\).' },
            { text: 'Interpret: There are 15 different sets of 4 textbooks he can carry.', faded: true, blankAnswer: '15 sets' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_009', title: 'Word problems on applications of.',
          scaffold: { problem: 'A school library has 5 different Mathematics books, 4 different Physics books, and 3 different Chemistry books.',
            steps: [
            { text: 'Identify the groups: 3 subjects (Math, Physics, Chemistry) → treat each subject as a single block initially.' },
            { text: 'Arrange the 3 blocks: \\(3! = 6\\) ways.' },
            { text: 'Within each block, arrange the books: Math: \\(5! = 120\\), Physics: \\(4! = 24\\), Chemistry: \\(3! = 6\\).' },
            { text: 'Apply multiplication principle: Total = \\(3! \\times 5! \\times 4! \\times 3! = 6 \\times 120 \\times 24 \\times 6\\).' },
            { text: 'Compute: \\(6 \\times 120 = 720\\); \\(720 \\times 24 = 17,280\\); \\(17,280 \\times 6 = 103,680\\) ways.', faded: true, blankAnswer: '103,680 ways' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Permutations And Combinations', spots: [
            { id: 's1', label: 'The Fundamental Principle of Counting', prompt: 'Which idea is this? — The Fundamental Principle of Counting (Multiplication Principle) states that if an event.', answer: 'The Fundamental Principle of Counting', options: ['The Fundamental Principle of Counting', 'For any non-negative integer n', 'A permutation is an arrangement', 'The number of permutations of'] },
            { id: 's2', label: 'For any non-negative integer n', prompt: 'Which idea is this? — For any non-negative integer \\(n\\), the factorial notation \\(n!\\) (read as "n factorial").', answer: 'For any non-negative integer n', options: ['For any non-negative integer n', 'The Fundamental Principle of Counting', 'A permutation is an arrangement', 'The number of permutations of'] },
            { id: 's3', label: 'A permutation is an arrangement', prompt: 'Which idea is this? — A permutation is an arrangement of objects in a specific order where the order of.', answer: 'A permutation is an arrangement', options: ['A permutation is an arrangement', 'The Fundamental Principle of Counting', 'For any non-negative integer n', 'The number of permutations of'] },
            { id: 's4', label: 'The number of permutations of', prompt: 'Which idea is this? — The number of permutations of \\(n\\) distinct objects taken \\(r\\) at a time, when.', answer: 'The number of permutations of', options: ['The number of permutations of', 'The Fundamental Principle of Counting', 'For any non-negative integer n', 'A permutation is an arrangement'] },
            { id: 's5', label: 'A combination is a selection', prompt: 'Which idea is this? — A combination is a selection of \\(r\\) objects from a set of \\(n\\) distinct objects where.', answer: 'A combination is a selection', options: ['A combination is a selection', 'The Fundamental Principle of Counting', 'For any non-negative integer n', 'A permutation is an arrangement'] },
            { id: 's6', label: 'Word problems on applications of', prompt: 'Which idea is this? — Word problems on applications of permutations require translating real-world scenarios.', answer: 'Word problems on applications of', options: ['Word problems on applications of', 'The Fundamental Principle of Counting', 'For any non-negative integer n', 'A permutation is an arrangement'] }
          ] } }
    ],
    explore: { component: C11_MathematicsPermutationsAndCombinationsSim, prompt: 'Explore the interactive — Permutations And Combinations' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_07_001', difficulty: 'standard',
          question: 'The Fundamental Principle of Counting (Multiplication Principle) states that if.',
          hint: 'If stuck, revisit Class 7 "Writing Expressions from Word Problems" (c7_math_ch02_007) to.',
          misconception: 'The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Fundamental Principle of Counting (Multiplication Principle) states that if an event',
                  options: ['The Fundamental Principle of Counting (Multiplication Principle) states that if an event', 'For any non-negative integer \\(n\\), the factorial notation \\(n!\\) (read as "n factorial")', 'A permutation is an arrangement of objects in a specific order where the order of', 'The number of permutations of \\(n\\) distinct objects taken \\(r\\) at a time, when'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without adjusting the second.' }
          ],
            remediations: { 'the-most-pervasive-class-11': { steps: ['Have the student physically model with 3 digit cards (1,2,3) — list all 3-digit numbers without repetition (6 outcomes).', 'Ask: "After you place a card in the hundreds position, how many cards remain for tens?" Guide them to see the choice.', 'Re-derive the rule: "If repetition allowed → choices stay same → multiply same number.', 'Practice 5 similar problems where they must first state "independent?" or "dependent?" before multiplying.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without.',
          parts: [
                { id: 'a', prompt: 'A student solves: "How many 3-digit even numbers can be formed from digits 1, 2, 3, 4, 5 if repetition is allowed?" Their working: "Units digit must be even: 2.', answer: 'The student\'s answer is correct',
                  options: ['The student\'s answer is correct', 'hundreds digit cannot be 0 so only 4 ways', 'no leading zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without adjusting the second.' }
          ],
            remediations: { 'the-most-pervasive-class-11': { steps: ['Have the student physically model with 3 digit cards (1,2,3) — list all 3-digit numbers without repetition (6 outcomes).', 'Ask: "After you place a card in the hundreds position, how many cards remain for tens?" Guide them to see the choice.', 'Re-derive the rule: "If repetition allowed → choices stay same → multiply same number.', 'Practice 5 similar problems where they must first state "independent?" or "dependent?" before multiplying.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_002', difficulty: 'standard',
          question: 'For any non-negative integer \\(n\\), the factorial notation \\(n!\\) (read as "n.',
          hint: 'Revisit the Fundamental Principle of Counting (c11_math_cbse_07_001) and practice.',
          misconception: 'Students treat the factorial symbol "!" as an algebraic factor that can be cancelled partially, e.g., writing.',
          parts: [
                { id: 'a', prompt: 'Write the value of \\(6!\\) and explain in one sentence what the notation means.', answer: '\\(6!',
                  options: ['\\(6!', 'factorial stops at 2 or multiplies only two numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the factorial symbol "!" as an algebraic factor that can be cancelled partially, e.g., writing \\(\\frac{(n+1)!}{n!} = n+1\\).' }
          ],
            remediations: { 'students-treat-the-factorial-symbol': { steps: ['Write out the expanded form: \\((n+2)!', '= (n+2)(n+1)n(n-1)\\cdots 1\\) and \\(n!', 'Visually cancel the common tail \\(n(n-1)\\cdots 1\\) leaving \\((n+2)(n+1)\\).', 'Practice with numeric examples: \\(\\frac{7!}{5!} = \\frac{7 \\times 6 \\times 5!}{5!} = 42\\).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_003', difficulty: 'standard',
          question: 'A permutation is an arrangement of objects in a specific order where the order.',
          hint: 'If stuck, revisit c11_math_cbse_07_001 (Fundamental Principle of Counting) for the logic.',
          misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!',
          parts: [
                { id: 'a', prompt: 'Write the formula for the number of permutations of n distinct objects taken r at a time, and state the condition on r.', answer: 'The formula is ^nP_r = n!/(n-r)!',
                  options: ['The formula is ^nP_r = n!/(n-r)!', 'divide by r!'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!' },
                { id: 'b', prompt: 'Explain why the number of permutations of 5 distinct objects taken 3 at a time is 5 × 4 × 3 = 60, and why it is NOT 5 × 5 × 5 = 125.', answer: 'For the first position we have 5 choices',
                  options: ['For the first position we have 5 choices', 'divide by r!'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!' },
                { id: 'c', prompt: 'Compute ^8P_3 and ^8P_5. Are they equal? Justify your answer using the formula.', answer: '^nP_3 = 8!/(8-3)!',
                  options: ['^nP_3 = 8!/(8-3)!', '8 choose 3 equals 8 choose 5', 'divide by r!'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!' }
          ],
            remediations: { 'students-write-np-r-n': { steps: ['If a student writes ^nP_r = n!/r!, immediately ask: "For ^5P_3, how many factors should we multiply?', 'Write them out: 5 × 4 × 3.', 'Now what is 5!/(5-3)!?" Guide them to see 5!/2!', '= (5×4×3×2×1)/(2×1) = 5×4×3.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!',
          parts: [
                { id: 'a', prompt: 'A student solves: "How many 3-letter words can be formed from the letters of the word \'DELHI\'?" Their working: ^5P_3 = 5!/3! = 120/6 = 20.', answer: 'The error is in the denominator: ^5P_3 = 5!/(5-3)!',
                  options: ['The error is in the denominator: ^5P_3 = 5!/(5-3)!', 'divide by r!'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write ^nP_r = n!/r! instead of n!/(n-r)!. For example, to compute ^6P_2, they calculate 6!/2!' }
          ],
            remediations: { 'students-write-np-r-n': { steps: ['If a student writes ^nP_r = n!/r!, immediately ask: "For ^5P_3, how many factors should we multiply?', 'Write them out: 5 × 4 × 3.', 'Now what is 5!/(5-3)!?" Guide them to see 5!/2!', '= (5×4×3×2×1)/(2×1) = 5×4×3.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_006', difficulty: 'standard',
          question: 'The number of permutations of \\(n\\) distinct objects taken \\(r\\) at a time,.',
          hint: 'Revisit the Fundamental Principle of Counting (c11_math_cbse_07_001) and practice with.',
          misconception: 'Students mechanically apply \\(^nP_r = \\frac{n!}{(n-r)!}\\) whenever they see "permutation" and "r objects from n",.',
          parts: [
                { id: 'a', prompt: 'State the formula for the number of permutations of \\(n\\) distinct objects taken \\(r\\) at a time when repetition is allowed.', answer: 'The formula is \\(n^r\\)',
                  options: ['The formula is \\(n^r\\)', 'repetition allowed', 'all objects distinct and no repetition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically apply \\(^nP_r = \\frac{n!}{(n-r)!}\\) whenever they see "permutation" and "r objects from n", ignoring the phrase.' }
          ],
            remediations: { 'students-mechanically-apply-np-r': { steps: ['Ask the student to draw a tree diagram for a tiny case: 2 letters {A, B}, length 2 with repetition allowed.', 'Count the branches: first level 2 branches (A,B), second level each splits into 2 again → 4 outcomes (AA, AB, BA, BB).', 'Write the multiplication: \\(2 \\times 2 = 2^2\\).', 'Then ask: "If repetition were NOT allowed, what changes?" (Second level: A branch only goes to B, B branch only goes to.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_007', difficulty: 'standard',
          question: 'A combination is a selection of \\(r\\) objects from a set of \\(n\\) distinct.',
          hint: 'If stuck, revisit factorial notation (c11_math_cbse_07_002) and the fundamental principle.',
          misconception: 'Students often mistakenly use the permutation formula \\(^nP_r\\) when the problem asks for combinations, because they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A combination is a selection of \\(r\\) objects from a set of \\(n\\) distinct objects where',
                  options: ['A combination is a selection of \\(r\\) objects from a set of \\(n\\) distinct objects where', 'The Fundamental Principle of Counting (Multiplication Principle) states that if an event', 'For any non-negative integer \\(n\\), the factorial notation \\(n!\\) (read as "n factorial")', 'A permutation is an arrangement of objects in a specific order where the order of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often mistakenly use the permutation formula \\(^nP_r\\) when the problem asks for combinations, because they think "arranging" and.' }
          ],
            remediations: { 'students-often-mistakenly-use-the': { steps: ['If a student uses permutations instead of combinations, ask: "Does the order of selection change the outcome?', 'If I pick book A then B then C, is that different from picking C then B then A for the trip?" Guide them to see that.', 'Then show the relationship: \\(^nC_r = \\frac{^nP_r}{r!}\\) and have them recompute.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_009', difficulty: 'standard',
          question: 'Word problems on applications of permutations require translating real-world.',
          hint: 'If stuck, revisit c11_math_cbse_07_004 (distinct permutations) and c11_math_cbse_07_005.',
          misconception: 'Students treat "arrange in a circle" and "arrange in a row" identically, using \\(n!\\) for both.',
          parts: [
                { id: 'a', prompt: 'A problem states: "Find the number of ways to arrange the letters of the word \'SUCCESS\'." A student writes: \\(^7P_7 = 5040\\). Is this correct?', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'clockwise/anticlockwise different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "arrange in a circle" and "arrange in a row" identically, using \\(n!\\) for both.' },
                { id: 'b', prompt: 'In how many ways can 5 boys and 3 girls be seated in a row so that no two girls sit together? Show complete working.', answer: 'Step 1: Arrange the 5 boys first: \\(5!',
                  options: ['Step 1: Arrange the 5 boys first: \\(5!', 'no two together', 'clockwise/anticlockwise different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "arrange in a circle" and "arrange in a row" identically, using \\(n!\\) for both.' },
                { id: 'c', prompt: 'Compare these two problems: (A) "Arrange 4 different books on a shelf." (B) "Arrange 4 different books on a circular shelf." Explain why the answers differ and.', answer: '(A) Linear: \\(4!',
                  options: ['(A) Linear: \\(4!', 'clockwise/anticlockwise different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "arrange in a circle" and "arrange in a row" identically, using \\(n!\\) for both.' }
          ],
            remediations: { 'students-treat-arrange-in-a': { steps: ['If a student uses \\(n!\\) for circular arrangements: 1.', 'Draw 4 chairs in a circle labeled A,B,C,D.', 'Ask: "If everyone moves one seat clockwise, is it a new arrangement?" (No, relative order unchanged).', 'Show that fixing person A at "north" position leaves 3!'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "arrange in a circle" and "arrange in a row" identically, using \\(n!\\) for both.',
          parts: [
                { id: 'a', prompt: 'A student solves: "How many 4-digit numbers > 3000 can be formed from digits {1,2,3,4,5} without repetition?" Their working: Total 4-digit numbers = \\(^5P_4 =.', answer: 'The student\'s method is correct and answer 72 is correct',
                  options: ['The student\'s method is correct and answer 72 is correct', 'clockwise/anticlockwise different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "arrange in a circle" and "arrange in a row" identically, using \\(n!\\) for both.' }
          ],
            remediations: { 'students-treat-arrange-in-a': { steps: ['If a student uses \\(n!\\) for circular arrangements: 1.', 'Draw 4 chairs in a circle labeled A,B,C,D.', 'Ask: "If everyone moves one seat clockwise, is it a new arrangement?" (No, relative order unchanged).', 'Show that fixing person A at "north" position leaves 3!'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
