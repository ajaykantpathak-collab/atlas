import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch04 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch04: SimDef = {
    id: 'v3_c11_app_ch04',
    title: 'Relations',
    subtitle: 'This node covers the fundamental definition of a relation as a subset of a Cartesian.',
    classLevel: 11, subject: 'app', topic: 'Relations',
    chapters: ['c11_app_ch04'],
    nodeIds: ['c11_app_cbse_04_001', 'c11_app_cbse_04_002', 'c11_app_cbse_04_003', 'c11_app_cbse_04_004', 'c11_app_cbse_04_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with a familiar scenario: "Your class teacher asks you to pair each student with their favorite subject.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A textbook states: "Every relation from set A to set B is a function if each element of A appears exactly once as the first element." Evaluate this statement.',
        options: ['The statement is **incomplete and misleading as written**', 'partial function', 'function'],
        answer: 'The statement is **incomplete and misleading as written**',
        hook: '**Misconception:** "A relation is just a smaller Cartesian product — so if A has 3 elements and B has 2, a relation.',
    },
    teaching: [
        { title: 'Introduction', text: 'A **Relation** from a non-empty set A to a non-empty set B is a subset of the Cartesian product A × B.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_app_cbse_04_001', title: 'Introduction',
          caseStudy: { intro: 'Start with a familiar scenario: "Your class teacher asks you to pair each student with their favorite subject from a given list.',
            decisions: [{ prompt: 'Define a relation from set A to set B. If A = {1, 2} and B = {x, y}, write the Cartesian product A × B and give one example of a relation.', options: [
                { text: 'A relation from A to B is a subset of A × B', outcome: 'A relation from A to B is a subset of A × B. A × B = {(1, x), (1, y), (2, x), (2, y)}.' },
                { text: 'not a function', outcome: 'Not quite — **Misconception:** "A relation is just a smaller Cartesian product — so if A has 3 elements and.', reveals: 'misconception-a-relation-is-just' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_04_002', title: 'Ordered Pair',
          scaffold: { problem: 'A school library assigns each book a unique code `(Subject Code, Shelf Number)`.',
            steps: [
            { text: 'Identify the correct structure: The library defines the code as an ordered pair where the **first component** is the.' },
            { text: 'Analyze the intern\'s version: The intern wrote `(3, PHY)`. Here the first component is `3` (integer) and the second.' },
            { text: 'Apply equality definition: For the Physics book, correct code = `(PHY, 3)`. Intern\'s code = `(3, PHY)`.' },
            { text: 'Check rule violation: The rule requires first component ∈ `{PHY, CHEM, BIO, MATH}`.' },
            { text: 'Conclude: The intern\'s codes are mathematically different ordered pairs and also invalid per library rules because the.', faded: true, blankAnswer: 'The intern\'s codes are incorrect because `(PHY, 3) ≠ (3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_04_003', title: 'Cartesian Product of Two Sets',
          scaffold: { problem: 'A school has 4 sections in Class 11: {A, B, C, D} and 3 streams: {Science, Commerce, Humanities}.',
            steps: [
            { text: 'Identify the two sets. Set A (sections) = {A, B, C, D}, Set B (streams) = {Science, Commerce, Humanities}.' },
            { text: 'Recall definition: A × B = {(a, b) : a ∈ A, b ∈ B}. The order is (section, stream) because the problem asks for.' },
            { text: 'Systematically form pairs. Fix first element as \'A\', pair with all in B: (A, Science), (A, Commerce), (A, Humanities).' },
            { text: 'Write the full roster form: A × B = {(A, Science), (A, Commerce), (A, Humanities), (B, Science), (B, Commerce), (B.' },
            { text: 'Compute cardinality. n(A) = 4, n(B) = 3. n(A × B) = 4 × 3 = 12. Verify by counting pairs in roster form (12 pairs).', faded: true, blankAnswer: 'A × B = {(A, Science), (A, Commerce), (A, Humanities), (B.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_04_004', title: 'Relations',
          scaffold: { problem: 'A school has 4 clubs: Science (S), Arts (A), Sports (P), Coding (C).',
            steps: [
            { text: 'Identify sets: \\( A = \\{S, A, P, C\\} \\) (clubs), \\( B = \\{Diwali, Holi, Eid, Christmas\\} \\) (festivals).' },
            { text: 'Translate each "Club → Festival" into an ordered pair: (S, Diwali), (A, Holi), (P, Diwali), (C, Eid).' },
            { text: 'Write \\( R \\) in roster form: \\( R = \\{(S, Diwali), (A, Holi), (P, Diwali), (C, Eid)\\} \\).' },
            { text: 'Domain = set of first elements = \\( \\{S, A, P, C\\} \\). Range = set of second elements = \\( \\{Diwali, Holi, Eid\\} \\).' },
            { text: 'Note that Christmas is in co-domain but not in range — no club chose it. This illustrates Range ⊆ Co-domain.', faded: true, blankAnswer: '\\( R = \\{(S, Diwali), (A, Holi), (P, Diwali), (C, Eid)\\}.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_04_005', title: 'Types of Relations',
          caseStudy: { intro: 'Think about WhatsApp groups: you are either in a group with yourself (reflexive), if you can message someone they can message you back (symmetric), and.',
            decisions: [{ prompt: 'State the precise condition for a relation R on a set A to be transitive. Use quantifiers and logical implication.', options: [
                { text: '**Correct answer:** A relation R on set A is transitive if for all a, b, c ∈ A, whenever', outcome: '**Correct answer:** A relation R on set A is transitive if for all a, b, c ∈ A, whenever (a, b) ∈.' },
                { text: 'if (a,b) and (b,c) are in R then (a,c) is in R', outcome: 'Not quite — **The Vacuous Truth Trap:** Students believe a relation on a non-empty set cannot be both symmetric.', reveals: 'the-vacuous-truth-trap-students' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_04_005', title: 'You made it',
          caseStudy: { intro: 'You finished Relations — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_04_001', difficulty: 'standard',
          question: 'A **Relation** from a non-empty set A to a non-empty set B is a subset of the.',
          hint: 'Review c11_app_cbse_04_003: Cartesian Product of Two Sets — specifically, practice.',
          misconception: '**Misconception:** "A relation is just a smaller Cartesian product — so if A has 3 elements and B has 2, a relation.',
          parts: [
                { id: 'a', prompt: 'Define a relation from set A to set B. If A = {1, 2} and B = {x, y}, write the Cartesian product A × B and give one example of a relation from A to B that.', answer: 'A relation from A to B is a subset of A × B',
                  options: ['A relation from A to B is a subset of A × B', 'not a function'],
                  hint: 'Review c11_app_cbse_04_003: Cartesian Product of Two Sets — specifically, practice writing A × B.',
                  misconception: '**Misconception:** "A relation is just a smaller Cartesian product — so if A has 3 elements and B has 2, a relation must have 6, 5, 4...' },
                { id: 'b', prompt: 'A student writes: "The relation R = {(1, 2), (2, 3), (3, 4)} has domain {1, 2, 3} and co-domain {2, 3, 4}." Is this correct?', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'co-domain = set of all outputs'],
                  hint: 'Review c11_app_cbse_04_003: Cartesian Product of Two Sets — specifically, practice writing A × B.',
                  misconception: '**Misconception:** "A relation is just a smaller Cartesian product — so if A has 3 elements and B has 2, a relation must have 6, 5, 4...' },
                { id: 'c', prompt: 'Two relations are defined on the set A = {1, 2, 3}: R₁ = {(1, 1), (2, 2), (3, 3)} R₂ = {(1, 2), (2, 3), (1, 3)} Compare R₁ and R₂ in terms of: (a) whether they.', answer: 'whether they are subsets of A × A, (',
                  options: ['whether they are subsets of A × A, (', 'a relation must include all elements of A in the domain'],
                  hint: 'Review c11_app_cbse_04_003: Cartesian Product of Two Sets — specifically, practice writing A × B.',
                  misconception: '**Misconception:** "A relation is just a smaller Cartesian product — so if A has 3 elements and B has 2, a relation must have 6, 5, 4...' }
          ],
            remediations: { 'misconception-a-relation-is-just': { steps: ['** Ask the student to write A × B for A = {1,2}, B = {a,b}. Confirm they get 4 pairs. **', '** Ask: "How many subsets does this set have?" Guide to 2⁴ = 16.', '** Point to each: "Is this a relation? Yes — by definition, *every* subset is a relation." **', '** Now ask: "Which of these are functions?" Only {(1,a),(2,b)} and {(1,b),(2,a)} — because domain must be {1,2} AND.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "A relation is just a smaller Cartesian product — so if A has 3 elements and B has 2, a relation.',
          parts: [
                { id: 'a', prompt: 'A textbook states: "Every relation from set A to set B is a function if each element of A appears exactly once as the first element." Evaluate this statement.', answer: 'The statement is **incomplete and misleading as written**',
                  options: ['The statement is **incomplete and misleading as written**', 'partial function', 'function'],
                  hint: 'Review c11_app_cbse_04_003: Cartesian Product of Two Sets — specifically, practice writing A × B.',
                  misconception: '**Misconception:** "A relation is just a smaller Cartesian product — so if A has 3 elements and B has 2, a relation must have 6, 5, 4...' }
          ],
            remediations: { 'misconception-a-relation-is-just': { steps: ['** Ask the student to write A × B for A = {1,2}, B = {a,b}. Confirm they get 4 pairs. **', '** Ask: "How many subsets does this set have?" Guide to 2⁴ = 16.', '** Point to each: "Is this a relation? Yes — by definition, *every* subset is a relation." **', '** Now ask: "Which of these are functions?" Only {(1,a),(2,b)} and {(1,b),(2,a)} — because domain must be {1,2} AND.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_04_002', difficulty: 'standard',
          question: 'An ordered pair is a pair of elements `(a, b)` listed in a specific, fixed.',
          hint: 'If stuck on algebraic solving, review quadratic factorization and the zero-product.',
          misconception: 'Students often treat the notation `(a, b)` as ambiguous: they confuse it with the **set `{a, b}`** (where order.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An ordered pair is a pair of elements `(a, b)` listed in a specific, fixed sequence where',
                  options: ['An ordered pair is a pair of elements `(a, b)` listed in a specific, fixed sequence where', 'A **Relation** from a non-empty set A to a non-empty set B is a subset of the Cartesian', 'The Cartesian product of two non-empty sets A and B, denoted by A × B, is the set of all', 'A relation \\( R \\) from a non-empty set \\( A \\) to a non-empty set \\( B \\) is a subset of'],
                  hint: 'If stuck on algebraic solving, review quadratic factorization and the zero-product property from.',
                  misconception: 'Students often treat the notation `(a, b)` as ambiguous: they confuse it with the **set `{a, b}`** (where order is irrelevant and.' }
          ],
            remediations: { 'students-often-treat-the-notation': { steps: ['**Notation Drill:** Write three columns on paper: "Ordered Pair", "Set", "Interval".', 'Give 5 examples like `(5, 5)`, `(0, 1)`, `(apple, mango)`, `(-2, 3)`, `(x, x²)`.', 'Ask student to classify each *only in the context of this chapter* and explain what the object *is* (e.g., "(5,5) is.', '**Equality Decomposition:** For any equation `(expr1, expr2) = (val1, val2)`, force the student to *physically write.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_04_003', difficulty: 'standard',
          question: 'The Cartesian product of two non-empty sets A and B, denoted by A × B, is the.',
          hint: 'Review the definition of ordered pair and equality of ordered pairs.',
          misconception: 'Students often treat Cartesian product like a "matching" or "function" where each element of the first set pairs with.',
          parts: [
                { id: 'a', prompt: 'If A = {1, 2} and B = {x, y}, write down the set A × B in roster form.', answer: 'A × B = {(1, x), (1, y), (2, x), (2, y)}',
                  options: ['A × B = {(1, x), (1, y), (2, x), (2, y)}', 'all ordered pairs'],
                  hint: 'Review the definition of ordered pair and equality of ordered pairs (c11_app_cbse_04_002).',
                  misconception: 'Students often treat Cartesian product like a "matching" or "function" where each element of the first set pairs with *exactly one* element.' },
                { id: 'b', prompt: 'Explain in your own words why A × B is generally not equal to B × A, using a concrete example with sets of your choice.', answer: 'Because ordered pairs (a, b) and (b, a) are different unless a = b',
                  options: ['Because ordered pairs (a, b) and (b, a) are different unless a = b', 'both have 2 elements'],
                  hint: 'Review the definition of ordered pair and equality of ordered pairs (c11_app_cbse_04_002).',
                  misconception: 'Students often treat Cartesian product like a "matching" or "function" where each element of the first set pairs with *exactly one* element.' }
          ],
            remediations: { 'students-often-treat-cartesian-product': { steps: ['**Concrete Modeling**: Give the student 3 red counters (Set A) and 2 blue counters (Set B).', 'Physically make pairs by placing one red + one blue on the table.', 'Ask: "Are the pairs the same?" 2.', '**Systematic Listing Drill**: Use a 2×3 grid.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_04_004', difficulty: 'standard',
          question: 'A relation \\( R \\) from a non-empty set \\( A \\) to a non-empty set \\( B \\) is.',
          hint: 'Review Cartesian product (c11_app_cbse_04_003): practice listing \\( A \\times B \\) and.',
          misconception: '**Misconception**: "The domain of a relation from \\( A \\) to \\( B \\) is always \\( A \\), and the co-domain is always the.',
          parts: [
                { id: 'a', prompt: 'A student writes: "For the relation \\( R = \\{(x, y) : y = x^2, x \\in \\{-2, -1, 0, 1, 2\\}, y \\in \\mathbb{N}\\} \\), the co-domain is \\( \\{0, 1, 4\\} \\)." Is this.', answer: 'No, it is incorrect',
                  options: ['No, it is incorrect', 'target set', 'actual outputs'],
                  hint: 'Review Cartesian product (c11_app_cbse_04_003): practice listing \\( A \\times B \\) and checking.',
                  misconception: '**Misconception**: "The domain of a relation from \\( A \\) to \\( B \\) is always \\( A \\), and the co-domain is always the range." **Why.' },
                { id: 'b', prompt: 'Let \\( A = \\{a, b, c\\} \\) and \\( B = \\{1, 2\\} \\). Define a relation \\( R \\) from \\( A \\) to \\( B \\) by \\( R = \\{(x, y) : x \\text{ is a vowel}, y = 1\\} \\).', answer: 'Step 1: Identify vowels in \\( A \\): only \\( a \\) (assuming English vowels)',
                  options: ['Step 1: Identify vowels in \\( A \\): only \\( a \\) (assuming English vowels)', '\\( x \\) is a vowel'],
                  hint: 'Review Cartesian product (c11_app_cbse_04_003): practice listing \\( A \\times B \\) and checking.',
                  misconception: '**Misconception**: "The domain of a relation from \\( A \\) to \\( B \\) is always \\( A \\), and the co-domain is always the range." **Why.' },
                { id: 'c', prompt: 'Two relations are defined on \\( A = \\{1, 2, 3\\} \\): \\( R_1 = \\{(1,1), (2,2), (3,3)\\} \\) and \\( R_2 = \\{(1,2), (2,3), (1,3)\\} \\).', answer: '\\( R_1 \\): Domain = Range = \\( \\{1,2,3\\} \\)',
                  options: ['\\( R_1 \\): Domain = Range = \\( \\{1,2,3\\} \\)', 'Both have domain \\( \\{1,2,3\\} \\)'],
                  hint: 'Review Cartesian product (c11_app_cbse_04_003): practice listing \\( A \\times B \\) and checking.',
                  misconception: '**Misconception**: "The domain of a relation from \\( A \\) to \\( B \\) is always \\( A \\), and the co-domain is always the range." **Why.' }
          ],
            remediations: { 'misconception-the-domain-of-a': { steps: ['**Re-anchor definitions**: Have the student write the three definitions side-by-side: Domain = {first elements of pairs.', '**Contrast with function**: Show a function \\( f: A \\to B \\) (every \\( a \\in A \\) has exactly one image) and a relation.', 'Ask: "What is the domain of each?" 3.', '**Drill with empty domain**: Give \\( R = \\varnothing \\) from \\( A = \\{1,2\\} \\) to \\( B = \\{3\\} \\).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_04_005', difficulty: 'standard',
          question: 'A relation R on a set A is a subset of the Cartesian product A × A.',
          hint: 'Review c11_app_cbse_04_004 (Relations) — specifically, how to write a relation in roster.',
          misconception: '**The Vacuous Truth Trap:** Students believe a relation on a non-empty set cannot be both symmetric and transitive.',
          parts: [
                { id: 'a', prompt: 'Consider the relation R = {(1,1), (2,2), (3,3), (1,2), (2,1)} on set A = {1,2,3}. Is R symmetric? Justify your answer by explicitly checking the condition.', answer: '**Correct answer:** Yes, R is symmetric',
                  options: ['**Correct answer:** Yes, R is symmetric', 'No, because (1,3) is not in R', 'for all pairs', 'for all pairs that are in the relation'],
                  hint: 'Review c11_app_cbse_04_004 (Relations) — specifically, how to write a relation in roster form from.',
                  misconception: '**The Vacuous Truth Trap:** Students believe a relation on a non-empty set cannot be both symmetric and transitive without being reflexive.' }
          ],
            remediations: { 'the-vacuous-truth-trap-students': { steps: ['**Isolate the quantifiers:** Write each property with explicit ∀ and ⇒.', 'For reflexivity: ∀a∈A, (a,a)∈R.', 'For symmetry: ∀a,b∈A, (a,b)∈R ⇒ (b,a)∈R.', 'For transitivity: ∀a,b,c∈A, [(a,b)∈R ∧ (b,c)∈R] ⇒ (a,c)∈R.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
