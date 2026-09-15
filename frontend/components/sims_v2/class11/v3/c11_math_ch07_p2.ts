import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch07_p2: SimDef = {
    id: 'v3_c11_math_ch07_p2',
    title: 'Permutations and Combinations · Part 2/2',
    subtitle: 'Learn when choices multiply — and when they shrink each other.',
    classLevel: 11, subject: 'mathematics', topic: 'Permutations and Combinations · Part 2/2',
    chapters: ['c11_math_ch07'],
    nodeIds: ['c11_math_cbse_07_007', 'c11_math_cbse_07_008', 'c11_math_cbse_07_009', 'c11_math_cbse_07_010', 'c11_math_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a counter who multiplies instead of listing', intro: 'Three shirts, two trousers — six outfits without listing one. Scale it to digits and the independence question bites.', goal: 'Apply the multiplication principle correctly to dependent and independent choices, and manipulate factorials.' },
    discovery: {
        question: 'Three-digit numbers from digits 1–5, no repetition: 5 choices × 5 × 5 = 125?',
        options: ['No — each used digit is gone: 5 × 4 × 3 = 60', 'Yes — three positions, five digits each', 'Yes — repetition doesn\'t change the count', 'No — it\'s 5 + 4 + 3 = 12'],
        answer: 'No — each used digit is gone: 5 × 4 × 3 = 60',
        hook: 'And 10!/8! is not (10/8)! — the factorial is a function, not a factor: it unwraps to 10 × 9 = 90.',
    },
    teaching: [
        { title: 'Combinations: Definition and Formula', text: 'A combination is a selection of \\(r\\) objects from a set of \\(n\\) distinct objects where the order of selection does not matter.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_07_007', title: 'Your mission',
          mission: { widget: 'moon', validate: 'moon:phase=80',
            instruction: 'On the lab: sweep to full moon — what does the lit fraction do?.',
        context: 'Count a 4×5×3 complete meal, then verify the constraint-first method: fix the even units digit, then count the rest.',
            observePrompt: 'What did the moon interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_007', title: 'Combinations: Definition and Formula',
          scaffold: { problem: 'A student has 6 different textbooks but can only carry 4 in his backpack. How many different sets of 4 textbooks can he choose?',
            steps: [
            { text: 'Identify that the order of textbooks in the backpack does not matter; this is a combination problem.' },
            { text: 'Write down n = 6 (total textbooks), r = 4 (textbooks to select).' },
            { text: 'Apply the combination formula: \\(^6C_4 = \\frac{6!}{4!(6-4)!} = \\frac{6!}{4!2!}\\).' },
            { text: 'Compute factorials: \\(6! = 720\\), \\(4! = 24\\), \\(2! = 2\\). So \\(^6C_4 = \\frac{720}{24 \\times 2} = \\frac{720}{48} = 15\\).' },
            { text: 'Interpret: There are 15 different sets of 4 textbooks he can carry.', faded: true, blankAnswer: '15 sets' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_008', title: 'Properties of Combinations: nCr Relationships',
          scaffold: { problem: 'A student council of 6 members is to be formed from 10 candidates.',
            steps: [
            { text: 'Total ways without restriction = 10C6. Using symmetry: 10C6 = 10C4 = (10×9×8×7)/(4×3×2×1) = 210.' },
            { text: 'Ways where both Amit and Priya serve together: Fix both, choose remaining 4 from 8 others = 8C4 = 8C4.' },
            { text: 'Ways where they don\'t serve together = Total − Both together = 210 − 70 = 140.' },
            { text: 'Alternative check using cases: (i) Neither serves: 8C6 = 8C2 = 28. (ii) Only Amit serves: 8C5 = 8C3 = 56.' },
            { text: 'Interpret: 140 different councils can be formed respecting the constraint.', faded: true, blankAnswer: '140 councils' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_009', title: 'Word Problems: Applications of Permutations',
          scaffold: { problem: 'A school library has 5 different Mathematics books, 4 different Physics books, and 3 different Chemistry books.',
            steps: [
            { text: 'Identify the groups: 3 subjects (Math, Physics, Chemistry) → treat each subject as a single block initially.' },
            { text: 'Arrange the 3 blocks: \\(3! = 6\\) ways.' },
            { text: 'Within each block, arrange the books: Math: \\(5! = 120\\), Physics: \\(4! = 24\\), Chemistry: \\(3! = 6\\).' },
            { text: 'Apply multiplication principle: Total = \\(3! \\times 5! \\times 4! \\times 3! = 6 \\times 120 \\times 24 \\times 6\\).' },
            { text: 'Compute: \\(6 \\times 120 = 720\\); \\(720 \\times 24 = 17,280\\); \\(17,280 \\times 6 = 103,680\\) ways.', faded: true, blankAnswer: '103,680 ways' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_010', title: 'Word Problems: Applications of Combinations',
          scaffold: { problem: 'A school library has 8 different Mathematics books and 6 different Physics books.',
            steps: [
            { text: 'Identify the two categories — Mathematics (8 books) and Physics (6 books). Total books = 14.' },
            { text: '"At least 2 Mathematics books" means the number of Mathematics books can be 2, 3, 4, or 5.' },
            { text: 'For each case, compute combinations using \\( ^nC_r \\). Case 1: \\( ^8C_2 \\times ^6C_3 = \\frac{8!}{2!6!} \\times.' },
            { text: 'Add the mutually exclusive cases: Total = 560 + 840 + 420 + 56 = 1876.' },
            { text: 'Verify using complement method: Total unrestricted selections = \\( ^{14}C_5 = 2002 \\).', faded: true, blankAnswer: '1876 ways' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_07_011', title: 'Mixed Problems: Permutations and Combinations Together',
          scaffold: { problem: 'A committee of 5 is to be formed from 7 men and 6 women. The committee must have a President, a Vice-President, and 3 ordinary members.',
            steps: [
            { text: 'Identify the two phases — first SELECT the 5 people (combination), then ASSIGN President and VP roles among the 5.' },
            { text: 'Handle "at least 3 women" by case analysis on the selection phase: Case A = exactly 3 women, Case B = exactly 4 women.' },
            { text: 'Compute each case:' },
            { text: 'For EACH 5-person group formed, assign President and VP: ordered selection of 2 from 5 = P(5,2) = 5 × 4 = 20 ways.' },
            { text: 'Total ways = (420 + 105 + 6) × 20 = 531 × 20 = 10,620.', faded: true, blankAnswer: '10,620 ways' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_07_011', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Counting 3-digit numbers from digits 1–5 without repetition, a teammate writes 5 × 5 × 5 = 125 \'three positions, five choices each.\' Simplifying 5!/3! he writes 5/3, \'cancelling the factorial.\'',
            decisions: [{ prompt: 'Where does his counting logic break?', options: [
                { text: 'Restore the dependency: \'without repetition\' shrinks each later choice set — hundreds has 5, tens has 4, units has 3 → 60, not 125; multiplication counts independent choices, and here they aren\'t. And \'!\' isn\'t a factor to cancel: 5!/3! = (5·4·3!)/3! = 20 — expand to the smaller factorial, then cancel the whole block.', outcome: 'He stops plugging and starts reasoning: the multiplication principle requires independence, and factorial is a product that cancels only whole.' },
                { text: 'Keep 5×5×5 — each position has the same five digits available.', outcome: 'Repetition is forbidden: choosing a digit removes it from later pools — the second factor must drop to 4, then 3.', reveals: 'independent-when-dependent' },
                { text: 'Accept 5/3 — the factorials divide out like matching symbols.', outcome: '\'!\' is a function, not a multiplier: partial cancellation is meaningless — 5!/3! unfolds to 5×4 = 20.', reveals: 'cancel-the-factorial' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_07_011', title: 'You made it',
          caseStudy: { intro: 'Multiply only when choices are independent — when a choice spends a digit, the next multiplication must shrink with it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'moon', prompt: 'Explore the moon interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'moon', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_07_007', difficulty: 'standard',
          question: 'A combination is a selection of \\(r\\) objects from a set of \\(n\\) distinct.',
          hint: 'If stuck, revisit factorial notation (c11_math_cbse_07_002) and the fundamental principle.',
          misconception: 'Students often mistakenly use the permutation formula \\(^nP_r\\) when the problem asks for combinations, because they.',
          parts: [
                { id: 'a', prompt: 'Compare the values of \\(^{10}C_3\\) and \\(^{10}C_7\\). Without calculating the exact numbers, explain why they are equal. Then compute both to verify.', answer: 'By the symmetry property \\(^nC_r = ^nC_{n-r}\\), \\(^{10}C_3 = ^{10}C_7\\)',
                  options: ['By the symmetry property \\(^nC_r = ^nC_{n-r}\\), \\(^{10}C_3 = ^{10}C_7\\)', 'they are different'],
                  hint: 'If stuck, revisit factorial notation (c11_math_cbse_07_002) and the fundamental principle.',
                  misconception: 'Students often mistakenly use the permutation formula \\(^nP_r\\) when the problem asks for combinations, because they think "arranging" and.' }
          ],
            remediations: { 'students-often-mistakenly-use-the': { steps: ['If a student uses permutations instead of combinations, ask: "Does the order of selection change the outcome?', 'If I pick book A then B then C, is that different from picking C then B then A for the trip?" Guide them to see that.', 'Then show the relationship: \\(^nC_r = \\frac{^nP_r}{r!}\\) and have them recompute.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often mistakenly use the permutation formula \\(^nP_r\\) when the problem asks for combinations, because they.',
          parts: [
                { id: 'a', prompt: 'A student claims that \\(^nC_r = \\frac{^nP_r}{r!}\\) is always true. Is this correct? If yes, prove it using the formulas. If not, give a counterexample.', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'it\'s false because of some condition'],
                  hint: 'If stuck, revisit factorial notation (c11_math_cbse_07_002) and the fundamental principle.',
                  misconception: 'Students often mistakenly use the permutation formula \\(^nP_r\\) when the problem asks for combinations, because they think "arranging" and.' }
          ],
            remediations: { 'students-often-mistakenly-use-the': { steps: ['If a student uses permutations instead of combinations, ask: "Does the order of selection change the outcome?', 'If I pick book A then B then C, is that different from picking C then B then A for the trip?" Guide them to see that.', 'Then show the relationship: \\(^nC_r = \\frac{^nP_r}{r!}\\) and have them recompute.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_008', difficulty: 'standard',
          question: 'The properties of combinations (nCr relationships) are fundamental identities.',
          hint: 'If stuck, revisit c11_math_cbse_07_002 (factorial simplification) and.',
          misconception: 'Students incorrectly apply symmetry property as nCr = nC(r−1) or nCr = (n−1)Cr, confusing it with Pascal\'s identity.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The properties of combinations (nCr relationships) are fundamental identities that relate',
                  options: ['The properties of combinations (nCr relationships) are fundamental identities that relate', 'The Fundamental Principle of Counting (Multiplication Principle) states that if an event', 'For any non-negative integer \\(n\\), the factorial notation \\(n!\\) (read as "n factorial")', 'A permutation is an arrangement of objects in a specific order where the order of'],
                  hint: 'If stuck, revisit c11_math_cbse_07_002 (factorial simplification) and c11_math_cbse_07_007.',
                  misconception: 'Students incorrectly apply symmetry property as nCr = nC(r−1) or nCr = (n−1)Cr, confusing it with Pascal\'s identity or the multiplicative.' }
          ],
            remediations: { 'students-incorrectly-apply-symmetry-property': { steps: ['First, have the student write the factorial form: nCr = n!/(r!(n−r)!) and nC(n−r) = n!/((n−r)!r!).', 'Ask them to compare denominators — they\'re identical.', 'Then give concrete numbers: 8C3 and 8C5.', 'Make them list actual combinations: {A,B,C} from {A,B,C,D,E,F,G,H} vs the complement {D,E,F,G,H}.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_009', difficulty: 'standard',
          question: 'Word problems on applications of permutations require translating real-world.',
          hint: 'If stuck, revisit c11_math_cbse_07_004 (distinct permutations) and c11_math_cbse_07_005.',
          misconception: 'Students treat "arrange in a circle" and "arrange in a row" identically, using \\(n!\\) for both.',
          parts: [
                { id: 'a', prompt: 'A problem states: "Find the number of ways to arrange the letters of the word \'SUCCESS\'." A student writes: \\(^7P_7 = 5040\\). Is this correct?', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'clockwise/anticlockwise different'],
                  hint: 'If stuck, revisit c11_math_cbse_07_004 (distinct permutations) and c11_math_cbse_07_005.',
                  misconception: 'Students treat "arrange in a circle" and "arrange in a row" identically, using \\(n!\\) for both.' },
                { id: 'b', prompt: 'In how many ways can 5 boys and 3 girls be seated in a row so that no two girls sit together? Show complete working.', answer: 'Step 1: Arrange the 5 boys first: \\(5!',
                  options: ['Step 1: Arrange the 5 boys first: \\(5!', 'no two together', 'clockwise/anticlockwise different'],
                  hint: 'If stuck, revisit c11_math_cbse_07_004 (distinct permutations) and c11_math_cbse_07_005.',
                  misconception: 'Students treat "arrange in a circle" and "arrange in a row" identically, using \\(n!\\) for both.' },
                { id: 'c', prompt: 'Compare these two problems: (A) "Arrange 4 different books on a shelf." (B) "Arrange 4 different books on a circular shelf." Explain why the answers differ and.', answer: '(A) Linear: \\(4!',
                  options: ['(A) Linear: \\(4!', 'clockwise/anticlockwise different'],
                  hint: 'If stuck, revisit c11_math_cbse_07_004 (distinct permutations) and c11_math_cbse_07_005.',
                  misconception: 'Students treat "arrange in a circle" and "arrange in a row" identically, using \\(n!\\) for both.' }
          ],
            remediations: { 'students-treat-arrange-in-a': { steps: ['If a student uses \\(n!\\) for circular arrangements: 1.', 'Draw 4 chairs in a circle labeled A,B,C,D.', 'Ask: "If everyone moves one seat clockwise, is it a new arrangement?" (No, relative order unchanged).', 'Show that fixing person A at "north" position leaves 3!'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_010', difficulty: 'standard',
          question: 'Word problems on applications of combinations require identifying selection.',
          hint: 'If stuck, revisit c11_math_cbse_07_007 (Combinations: Definition and Formula) to practice.',
          misconception: 'Students treat "at least one" constraints by adding cases but forget that the cases must be mutually exclusive and.',
          parts: [
                { id: 'a', prompt: 'In a word problem, the phrase "a committee of 4 is to be formed from 10 people" appears.', answer: 'It is a combination',
                  options: ['It is a combination', 'committees have order'],
                  hint: 'If stuck, revisit c11_math_cbse_07_007 (Combinations: Definition and Formula) to practice factorial.',
                  misconception: 'Students treat "at least one" constraints by adding cases but forget that the cases must be mutually exclusive and collectively exhaustive.' }
          ],
            remediations: { 'students-treat-at-least-one': { steps: ['If a student adds overlapping cases: Ask them to list all possible teams for a tiny version (e.g., 3 girls, 2 boys.', 'Have them manually count and see that each team appears exactly once in their case breakdown.', 'If they use \\( ^nP_r \\): Give a concrete 3-person committee {A, B, C} and ask "Is committee {A, B, C} different from.', 'For diagonals: Draw a pentagon, count all line segments between vertices (10), then count sides (5), ask "Which are.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_07_011', difficulty: 'standard',
          question: 'Mixed problems in permutations and combinations require identifying whether.',
          hint: 'If stuck, revisit c11_math_cbse_07_009 and c11_math_cbse_07_010 to practice identifying.',
          misconception: '**"Pre-selection overcounting" in "at least" problems:** When a problem says "at least 2 girls in a committee of 5 from.',
          parts: [
                { id: 'a', prompt: 'Compare the number of ways to form a 4-digit PIN code from digits {1,2,3,4,5,6} with no repetition, versus the number of ways to choose a 4-member subcommittee.', answer: '**Correct answer:** No, they are not equal',
                  options: ['**Correct answer:** No, they are not equal', 'both are choosing 4 from 6 so they are the same'],
                  hint: 'If stuck, revisit c11_math_cbse_07_009 and c11_math_cbse_07_010 to practice identifying P vs C.',
                  misconception: '**"Pre-selection overcounting" in "at least" problems:** When a problem says "at least 2 girls in a committee of 5 from 4 girls and 6.' }
          ],
            remediations: { 'pre-selection-overcounting-in-at': { steps: ['**Confront the overcount:** Ask the student to list all 5-person committees from {G1,G2,G3,G4, B1..B6} with at least 2.', 'Show that C(3,1)×C(4,2) counts {G1,G2,B1} twice (once with G1 as "chosen first", once with G2).', '**Enforce case partition:** Teach the mantra: "At least → split into exact cases." Write the cases as disjoint rows.', '**Practice with complementary counting:** For "at least 2", also show total − (0 girls + 1 girl) = C(10,5).'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
