import type { SimDef } from '../../engine/types';
import C11_MathematicsFundamentalPrincipleCountingSim from '../../../simulations/c6_12/C11_MathematicsFundamentalPrincipleCountingSim';

/** v3 wrapped master — C11_MathematicsFundamentalPrincipleCountingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicsfundamentalprinciplecountingsim: SimDef = {
    id: 'v3w_c11_mathematicsfundamentalprinciplecountingsim',
    title: 'Fundamental Principle Counting',
    subtitle: 'Covers the Multiplication Principle for independent sequential events and its distinction.',
    classLevel: 11, subject: 'mathematics', topic: 'Fundamental Principle of Counting',
    chapters: [],
    nodeIds: ['c11_math_cbse_07_001', 'c11_math_cbse_07_003', 'c11_math_cbse_07_004', 'c11_math_cbse_07_006', 'c11_math_cbse_01_002', 'c11_math_cbse_07_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re packing for a school trip: you have 3 different shirts and 2 different pairs of trousers.', goal: 'Master Fundamental Principle Counting.' },
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_003', title: 'A permutation is an arrangement of.',
          scaffold: { problem: 'A password must be exactly 4 characters long, formed from the digits {1, 2, 3, 4, 5, 6, 7} with no digit repeated.',
            steps: [
            { text: 'Identify n = 7 (digits available), r = 4 (length of password), no repetition allowed, order matters (1234 ≠ 4321).' },
            { text: 'Recognize this as a permutation problem: number of ways = ^7P_4.' },
            { text: 'Apply formula ^7P_4 = 7!/(7-4)! = 7!/3!.' },
            { text: 'Simplify: 7!/3! = (7 × 6 × 5 × 4 × 3 × 2 × 1)/(3 × 2 × 1) = 7 × 6 × 5 × 4 = 840.' },
            { text: 'Interpret: There are 840 distinct 4-digit passwords possible from 7 digits without repetition.', faded: true, blankAnswer: '840 passwords' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_004', title: 'A permutation of n distinct objects.',
          scaffold: { problem: 'A school committee has 8 teachers. In how many ways can the positions of Chairperson, Vice-Chairperson, and Secretary be filled if no.',
            steps: [
            { text: 'Identify n = 8 distinct teachers, r = 3 distinct positions. Order matters because positions are different.' },
            { text: 'Recognize this as permutations of 8 distinct objects taken 3 at a time: \\(^8P_3\\).' },
            { text: 'Apply formula: \\(^8P_3 = \\frac{8!}{(8-3)!} = \\frac{8!}{5!}\\).' },
            { text: 'Compute: \\(\\frac{8 \\times 7 \\times 6 \\times 5!}{5!} = 8 \\times 7 \\times 6 = 336\\).' },
            { text: 'Interpret: There are 336 different ways to assign the three distinct posts to 8 teachers.', faded: true, blankAnswer: '336 ways' }
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_002', title: 'A set is classified by its cardinality.',
          scaffold: { problem: 'A school library has a shelf for "Books written by students of Class XI in 2024". Let S be the set of such books.',
            steps: [
            { text: 'For 2024, the condition "written by a Class XI student in 2024" yields zero books. So S = { } = φ.' },
            { text: 'For 2025, exactly one book satisfies the condition. So S = {book₁}. This is a singleton set (n(S)=1).' },
            { text: 'For 2026, three distinct books satisfy the condition. So S = {book₁, book₂, book₃}. This is a finite set (n(S)=3 ∈ ℕ).' },
            { text: 'Could S ever be infinite? Only if infinitely many Class XI students wrote books in a single year, which is impossible.' },
            { text: 'Conclusion: 2024 → empty; 2025 → singleton; 2026 → finite (with 3 elements).', faded: true, blankAnswer: '2024: empty set; 2025: singleton set; 2026: finite set (3.' }
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
        { type: 'dissect', nodeId: 'c11_math_cbse_07_003', title: 'Identify each idea',
          dissect: { specimen: 'Fundamental Principle Counting', spots: [
            { id: 's1', label: 'The Fundamental Principle of Counting', prompt: 'Which idea is this? — The Fundamental Principle of Counting (Multiplication Principle) states that if an event.', answer: 'The Fundamental Principle of Counting', options: ['The Fundamental Principle of Counting', 'A permutation is an arrangement', 'A permutation of n distinct', 'The number of permutations of'] },
            { id: 's2', label: 'A permutation is an arrangement', prompt: 'Which idea is this? — A permutation is an arrangement of objects in a specific order where the order of.', answer: 'A permutation is an arrangement', options: ['A permutation is an arrangement', 'The Fundamental Principle of Counting', 'A permutation of n distinct', 'The number of permutations of'] },
            { id: 's3', label: 'A permutation of n distinct', prompt: 'Which idea is this? — A permutation of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is an ordered.', answer: 'A permutation of n distinct', options: ['A permutation of n distinct', 'The Fundamental Principle of Counting', 'A permutation is an arrangement', 'The number of permutations of'] },
            { id: 's4', label: 'The number of permutations of', prompt: 'Which idea is this? — The number of permutations of \\(n\\) distinct objects taken \\(r\\) at a time, when.', answer: 'The number of permutations of', options: ['The number of permutations of', 'The Fundamental Principle of Counting', 'A permutation is an arrangement', 'A permutation of n distinct'] },
            { id: 's5', label: 'A set is classified by', prompt: 'Which idea is this? — A set is classified by its cardinality (number of elements): an **empty set** (denoted φ.', answer: 'A set is classified by', options: ['A set is classified by', 'The Fundamental Principle of Counting', 'A permutation is an arrangement', 'A permutation of n distinct'] },
            { id: 's6', label: 'Word problems on applications of', prompt: 'Which idea is this? — Word problems on applications of permutations require translating real-world scenarios.', answer: 'Word problems on applications of', options: ['Word problems on applications of', 'The Fundamental Principle of Counting', 'A permutation is an arrangement', 'A permutation of n distinct'] }
          ] } }
    ],
    explore: { component: C11_MathematicsFundamentalPrincipleCountingSim, prompt: 'Explore the interactive — Fundamental Principle Counting' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_07_001', difficulty: 'standard',
          question: 'The Fundamental Principle of Counting (Multiplication Principle) states that if.',
          hint: 'If stuck, revisit Class 7 "Writing Expressions from Word Problems" (c7_math_ch02_007) to.',
          misconception: 'The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Fundamental Principle of Counting (Multiplication Principle) states that if an event',
                  options: ['The Fundamental Principle of Counting (Multiplication Principle) states that if an event', 'A permutation is an arrangement of objects in a specific order where the order of', 'A permutation of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is an ordered', 'The number of permutations of \\(n\\) distinct objects taken \\(r\\) at a time, when'],
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
        { type: 'subpart', nodeId: 'c11_math_cbse_07_004', difficulty: 'standard',
          question: 'A permutation of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is an.',
          hint: 'Revisit c11_math_cbse_07_001 (Fundamental Principle of Counting) and c11_math_cbse_07_002.',
          misconception: 'Students often write \\(^nP_r = \\frac{n!}{r!}\\) instead of \\(\\frac{n!}{(n-r)!}\\), confusing the denominator with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A permutation of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is an ordered',
                  options: ['A permutation of n distinct objects taken r at a time (where 0 ≤ r ≤ n) is an ordered', 'The Fundamental Principle of Counting (Multiplication Principle) states that if an event', 'A permutation is an arrangement of objects in a specific order where the order of', 'The number of permutations of \\(n\\) distinct objects taken \\(r\\) at a time, when'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(^nP_r = \\frac{n!}{r!}\\) instead of \\(\\frac{n!}{(n-r)!}\\), confusing the denominator with combinations.' }
          ],
            remediations: { 'students-often-write-np-r': { steps: ['If a student writes \\(\\frac{n!}{r!}\\), ask them to list permutations of 3 distinct letters (A,B,C) taken 2 at a time.', 'They will list 6: AB, AC, BA, BC, CA, CB.', 'Then compute \\(\\frac{3!}{2!}=3\\) (wrong) vs \\(\\frac{3!}{1!}=6\\) (correct).', 'Show that the denominator must be (n-r)!'] } } },
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
        { type: 'subpart', nodeId: 'c11_math_cbse_01_002', difficulty: 'standard',
          question: 'A set is classified by its cardinality (number of elements): an **empty set**.',
          hint: 'Revisit c11_math_cbse_01_001: practice converting between roster and set-builder forms,.',
          misconception: 'Students often write {0} or {φ} when asked for the empty set, thinking "zero elements" means "the element 0" or "the.',
          parts: [
                { id: 'a', prompt: 'Write the definition of an empty set and give its two standard notations.', answer: 'An empty set is a set that does not contain any element',
                  options: ['An empty set is a set that does not contain any element', 'contains the empty set as an element'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write {0} or {φ} when asked for the empty set, thinking "zero elements" means "the element 0" or "the element φ".' }
          ],
            remediations: { 'students-often-write-0-or': { steps: ['Ask the student to list elements of {0}, {φ}, and φ explicitly: {0} has one element (0), {φ} has one element (the empty.', 'For singleton confusion: give {x : x²=4, x∈ℕ} → {2} (one element) vs {x : x²=4, x∈ℤ} → {2,-2} (two elements).', 'Emphasize: "singleton ⇔ exactly one element satisfies the condition in the given universe." 3.', 'For infinite sets: show that {x : x ∈ ℕ, x > 100} is infinite because for any candidate largest element n, n+1 is also.'] } } },
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
