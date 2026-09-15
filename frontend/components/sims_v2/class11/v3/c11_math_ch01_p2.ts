import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch01_p2: SimDef = {
    id: 'v3_c11_math_ch01_p2',
    title: 'Sets · Part 2/3',
    subtitle: 'Learn why \'well-defined\' is the whole definition — and why {0} is never empty.',
    classLevel: 11, subject: 'mathematics', topic: 'Sets · Part 2/3',
    chapters: ['c11_math_ch01'],
    nodeIds: ['c11_math_cbse_01_007', 'c11_math_cbse_01_008', 'c11_math_cbse_01_009', 'c11_math_cbse_01_010', 'c11_math_cbse_01_011', 'c11_math_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a set-builder separating the countable from the uncountable', intro: '\'Students above 90%\' is a set; \'talented students\' is not — the difference is whether membership can be decided at all.', goal: 'Apply the well-defined criterion, distinct elements, and the empty/finite/infinite classification.' },
    discovery: {
        question: 'Is the collection of \'all tall students\' a set? Think carefully.',
        options: ['No — \'tall\' is not well-defined, so membership is ambiguous', 'Yes — any collection is a set', 'Yes — if the students agree', 'Only if you measure them first'],
        answer: 'No — \'tall\' is not well-defined, so membership is ambiguous',
        hook: 'Sets demand one ruthless rule: you must always be able to say yes or no. Vagueness is not allowed in.',
    },
    teaching: [
        { title: 'Universal Set: Definition and Representation', text: 'A universal set, denoted by U, is the set that contains all elements under consideration in a given context or problem. Every other set defined in that context is a subset of U.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_01_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Classify {x² ≤ 4 over ℤ}, {x² = −1 over ℝ} and {multiples of 7} into empty, finite or infinite — then flip between roster and set-builder fluently.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_01_007', title: 'Universal Set: Definition and Representation',
          caseStudy: { intro: 'Imagine you are the principal of a school planning the annual sports day. You need to track which students participate in cricket, football, and badminton.',
            decisions: [{ prompt: 'State the definition of a universal set in your own words. Give two different examples of the same subset (e.g., set of even numbers) with.', options: [
                { text: 'A universal set U is the set containing all elements relevant to a particular discussion', outcome: 'A universal set U is the set containing all elements relevant to a particular discussion; all other.' },
                { text: 'U is always the set of real numbers', outcome: 'Not quite — Students believe the universal set is always the set of real numbers R or natural numbers N,.', reveals: 'the-universal-set-is-always' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_008', title: 'Venn Diagrams: Representation of Sets',
          scaffold: { problem: 'In a survey of 50 Class 11 students, 30 study Mathematics, 25 study Physics, 20 study Chemistry.',
            steps: [
            { text: 'Identify the universal set U = all 50 surveyed students. Define sets: M = Mathematics, P = Physics, C = Chemistry.' },
            { text: 'Start from the innermost region: M∩P∩C = 5 students (given). Place 5 in the central region where all three circles.' },
            { text: 'Fill pairwise intersections: M∩P total = 12, but 5 already in triple intersection → M∩P∩C\' = 12-5 = 7.' },
            { text: 'Fill single-subject regions: M total = 30. Already accounted: 5 (all three) + 7 (M∩P only) + 3 (M∩C only) = 15.' },
            { text: 'Find (a) only Mathematics = 15. (b) Exactly two subjects = 7+5+3 = 15. (c) None = 50 - (15+8+7+7+5+3+5) = 50 - 50 = 0.', faded: true, blankAnswer: '(a) 15 students study only Mathematics. (b) 15 students.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_010', title: 'Intersection of Sets: Definition and Properties',
          scaffold: { problem: 'In a Class 11 survey of 50 students, 30 students like Mathematics (set M), 25 like Physics (set P), and 15 like both subjects.',
            steps: [
            { text: 'Identify given data: n(U) = 50, n(M) = 30, n(P) = 25, n(M ∩ P) = 15. We need n(M - P) = n(M) - n(M ∩ P).' },
            { text: 'Compute n(M - P) = 30 - 15 = 15 students like Mathematics but not Physics.' },
            { text: 'Find n(M ∪ P) using the addition principle: n(M ∪ P) = n(M) + n(P) - n(M ∩ P) = 30 + 25 - 15 = 40.' },
            { text: 'Verify n(M ∩ P) using the formula rearranged: n(M ∩ P) = n(M) + n(P) - n(M ∪ P) = 30 + 25 - 40 = 15 ✓' },
            { text: 'Interpret: 15 students like both, 15 like only Math, 10 like only Physics (25-15), and 10 like neither (50-40).', faded: true, blankAnswer: '15 students like Mathematics but not Physics. Verification.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_011', title: 'Difference of Sets: Definition',
          scaffold: { problem: 'In a Class 11 section, 40 students opted for Mathematics (set M), 35 opted for Biology (set B), and 20 opted for both.',
            steps: [
            { text: 'Identify the sets and given data. M = set of Math students, |M| = 40. B = set of Biology students, |B| = 35.' },
            { text: 'Determine the required set. "Mathematics but NOT Biology" means students in M who are not in B.' },
            { text: 'Use the formula for cardinality of difference: |M − B| = |M| − |M ∩ B| because M − B and M ∩ B partition M.' },
            { text: 'Substitute values: |M − B| = 40 − 20 = 20.' },
            { text: 'Interpret the result. 20 students took Mathematics only (not Biology).', faded: true, blankAnswer: '20 students; the set is M − B.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_01_012', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'As class representative you must compile \'the set of talented students\' for a honours list. A teammate writes {Ravi, Ravi, Meena} arguing order and repetition matter, and for the empty set writes {0} \'since it has zero elements.\'',
            decisions: [{ prompt: 'What does \'set\' demand that this list violates?', options: [
                { text: 'Fix the definition three ways: \'talented\' isn\'t well-defined — a set needs an objective yes/no membership test (e.g., \'scored above 90%\'), not subjective judgement. Repetition and order are noise: {Ravi, Ravi, Meena} = {Ravi, Meena}. And the empty set is φ or { } — {0} is a singleton containing zero, and {φ} is a singleton containing the empty set.', outcome: 'The list becomes a set: a precise defining property, distinct elements, order irrelevant — and \'no members\' written as φ, not {0}.' },
                { text: 'Keep \'talented students\' — everyone knows roughly who\'s talented.', outcome: '\'Roughly\' isn\'t membership: without a definitive yes/no criterion, it\'s a vague collection, not a set — the well-defined test is the entry ticket.', reveals: 'subjective-collections-are-sets' },
                { text: 'Accept {0} as the empty set — it literally contains \'zero\'.', outcome: 'That confuses the symbol with the count: {0} has ONE element (the number 0); the empty set has none, written φ or { }.', reveals: 'set-of-zero-is-empty' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'Well-defined, ordered, unioned, intersected — you now speak the language all of modern math is written in.',
            decisions: [{ prompt: 'What comes next? Sets · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sets · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_01_007', difficulty: 'standard',
          question: 'A universal set, denoted by U, is the set that contains all elements under.',
          hint: 'If stuck, revisit c11_math_cbse_01_004 (Subsets) and c11_math_cbse_01_011 (Difference.',
          misconception: 'Students believe the universal set is always the set of real numbers R or natural numbers N, or that it is the union.',
          parts: [
                { id: 'a', prompt: 'In a survey of 100 students, 60 like Mathematics, 50 like Physics, and 30 like both.', answer: 'No, this is not a valid universal set',
                  options: ['No, this is not a valid universal set', 'How many students like neither?', 'union of given sets', 'universal set containing all possible elements'],
                  hint: 'If stuck, revisit c11_math_cbse_01_004 (Subsets) and c11_math_cbse_01_011 (Difference of Sets).',
                  misconception: 'Students believe the universal set is always the set of real numbers R or natural numbers N, or that it is the union of all sets mentioned.' }
          ],
            remediations: { 'the-universal-set-is-always': { steps: ['Read the problem and write \'Let U = {all elements under consideration}.\'', 'List U explicitly.', 'Only then define subsets A, B, etc.', 'Complement A\' = U - A." Practice with 3 problems where U is NOT the union of given sets.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the universal set is always the set of real numbers R or natural numbers N, or that it is the union.',
          parts: [
                { id: 'a', prompt: 'A Class 11 student solves this problem: "In a class of 40 students, 25 play cricket, 20 play football, 10 play both.', answer: 'The final answer (5) is numerically correct, but the method is WRONG',
                  options: ['The final answer (5) is numerically correct, but the method is WRONG', 'universal set', 'union of all given subsets'],
                  hint: 'If stuck, revisit c11_math_cbse_01_004 (Subsets) and c11_math_cbse_01_011 (Difference of Sets).',
                  misconception: 'Students believe the universal set is always the set of real numbers R or natural numbers N, or that it is the union of all sets mentioned.' }
          ],
            remediations: { 'the-universal-set-is-always': { steps: ['Read the problem and write \'Let U = {all elements under consideration}.\'', 'List U explicitly.', 'Only then define subsets A, B, etc.', 'Complement A\' = U - A." Practice with 3 problems where U is NOT the union of given sets.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_008', difficulty: 'standard',
          question: 'A Venn diagram is a graphical representation of sets using closed curves.',
          hint: 'Revisit c11_math_cbse_01_001 (set notation and membership) and c11_math_cbse_01_004.',
          misconception: 'Students treat Venn diagram circles as mere labels and place elements in circles based on set membership without.',
          parts: [
                { id: 'a', prompt: 'Three sets A, B, C are represented in a Venn diagram. The region representing A ∩ (B ∪ C) is shaded.', answer: 'B ∪ C covers all regions inside circle B or circle C (including their overlap)',
                  options: ['B ∪ C covers all regions inside circle B or circle C (including their overlap)', 'A and anything', 'A and (B or C)', 'intersection with union means "A and anything" rather than "A and (B or C)"'],
                  hint: 'Revisit c11_math_cbse_01_001 (set notation and membership) and c11_math_cbse_01_004 (subset.',
                  misconception: 'Students treat Venn diagram circles as mere labels and place elements in circles based on set membership without respecting region.' }
          ],
            remediations: { 'students-treat-venn-diagram-circles': { steps: ['Have the student list all 2ⁿ possible membership combinations for n sets (e.g., for 2 sets: in A only, in B only,.', 'Draw the Venn diagram and label each region with its combination (e.g., "A∩B\'", "A\'∩B", "A∩B", "A\'∩B\'").', 'For each element, determine its membership combination and place it in the correspondingly labeled region.', 'Practice with "impossible" combinations (e.g., if A⊂B, the region A∩B\' is empty - shade it with diagonal lines to mark.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_009', difficulty: 'standard',
          question: 'The union of two sets A and B, denoted by A ∪ B, is the set of all elements.',
          hint: 'If stuck, revisit node c11_math_cbse_01_001 (Introduction to Sets) to practice element.',
          misconception: 'Students often write the union by simply concatenating the two lists, duplicating common elements.',
          parts: [
                { id: 'a', prompt: 'If A and B are sets such that A ∪ B = A, what relationship must exist between A and B? Prove your claim using the definition of subset.', answer: 'The condition A ∪ B = A implies B ⊂ A',
                  options: ['The condition A ∪ B = A implies B ⊂ A', 'A is bigger than B'],
                  hint: 'If stuck, revisit node c11_math_cbse_01_001 (Introduction to Sets) to practice element membership.',
                  misconception: 'Students often write the union by simply concatenating the two lists, duplicating common elements.' }
          ],
            remediations: { 'students-often-write-the-union': { steps: ['Ask the student to list elements of A and B on separate sticky notes.', 'Physically combine the notes into one pile, removing duplicate notes.', 'Count the unique notes and compare with n(A) + n(B).', 'Write the definition A ∪ B = {x : x ∈ A or x ∈ B} and highlight the word "or".'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_010', difficulty: 'standard',
          question: 'The intersection of two sets A and B, denoted by A ∩ B, is the set of all.',
          hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation and membership) and.',
          misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must.',
          parts: [
                { id: 'a', prompt: 'State the definition of intersection of two sets A and B using set-builder notation and the symbol ∈.', answer: 'A ∩ B = {x : x ∈ A and x ∈ B}',
                  options: ['A ∩ B = {x : x ∈ A and x ∈ B}', 'disjoint', 'different descriptions', 'prime numbers'],
                  hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation and membership) and c11_math_cbse_01_004.',
                  misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must distribute over BOTH B and.' },
                { id: 'b', prompt: 'If A = {x : x is a prime number less than 10} and B = {x : x is an odd number less than 10}, find A ∩ B.', answer: 'A = {2, 3, 5, 7}, B = {1, 3, 5, 7, 9}, so A ∩ B = {3, 5, 7}',
                  options: ['A = {2, 3, 5, 7}, B = {1, 3, 5, 7, 9}, so A ∩ B = {3, 5, 7}', 'overrides', 'condition strictly', 'prime numbers'],
                  hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation and membership) and c11_math_cbse_01_004.',
                  misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must distribute over BOTH B and.' },
                { id: 'c', prompt: 'Let U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, A = {2, 4, 6, 8, 10}, B = {3, 6, 9}. Find (A ∩ B) ∪ (A ∩ B\') where B\' is the complement of B in U.', answer: 'Step 1: A ∩ B = {6} (only common element)',
                  options: ['Step 1: A ∩ B = {6} (only common element)', 'disjoint', 'different descriptions', 'prime numbers'],
                  hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation and membership) and c11_math_cbse_01_004.',
                  misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must distribute over BOTH B and.' },
                { id: 'd', prompt: 'Given A = {x : x ∈ N, x² < 20} and B = {x : x ∈ N, x is a multiple of 3}, determine whether A and B are disjoint sets. Justify your answer.', answer: 'A = {1, 2, 3, 4} (since 1²=1, 2²=4, 3²=9, 4²=16 < 20, but 5²=25 > 20)',
                  options: ['A = {1, 2, 3, 4} (since 1²=1, 2²=4, 3²=9, 4²=16 < 20, but 5²=25 > 20)', 'disjoint', 'different descriptions', 'prime numbers'],
                  hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation and membership) and c11_math_cbse_01_004.',
                  misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must distribute over BOTH B and.' }
          ],
            remediations: { 'students-incorrectly-apply-the-distributive': { steps: ['If a student makes the distributive law error, have them verify with a concrete example: choose small finite sets.', 'Compute LHS step-by-step: B∪C={2,3,4}, then A∩(B∪C)={2}.', 'Compute RHS both ways: (A∩B)∪C={2}∪{3,4}={2,3,4} (wrong) vs (A∩B)∪(A∩C)={2}∪φ={2} (correct).', 'For the disjoint misconception, explicitly list elements of both sets and check each one: "Is 2 in A?'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_011', difficulty: 'standard',
          question: 'The difference of two sets A and B, denoted by A − B, is the set of all.',
          hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation and membership) and practice writing.',
          misconception: 'Students treat set difference as commutative, writing A − B = B − A, because they analogise it to arithmetic.',
          parts: [
                { id: 'a', prompt: 'State the formal definition of A − B using set-builder notation and the logical condition that defines membership.', answer: 'A − B = {x : x ∈ A and x ∉ B}',
                  options: ['A − B = {x : x ∈ A and x ∉ B}', 'not in B', 'rather than an additional requirement', '"not in B" is an alternative to "in A" rather than an additional requirement'],
                  hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation and membership) and practice writing.',
                  misconception: 'Students treat set difference as commutative, writing A − B = B − A, because they analogise it to arithmetic subtraction where a − b ≠.' },
                { id: 'b', prompt: 'Given A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, a student writes A − B = {5, 6}. Explain why this is incorrect and what the student actually computed.', answer: 'The student computed B − A instead of A − B',
                  options: ['The student computed B − A instead of A − B', 'elements not common to both', 'elements in first but not second'],
                  hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation and membership) and practice writing.',
                  misconception: 'Students treat set difference as commutative, writing A − B = B − A, because they analogise it to arithmetic subtraction where a − b ≠.' },
                { id: 'c', prompt: 'Let A = {x ∈ ℤ : −2 ≤ x ≤ 3} and B = {x ∈ ℤ : 0 ≤ x ≤ 5}. Compute A − B and B − A explicitly in roster form.', answer: 'A = {−2, −1, 0, 1, 2, 3}, B = {0, 1, 2, 3, 4, 5}',
                  options: ['A = {−2, −1, 0, 1, 2, 3}, B = {0, 1, 2, 3, 4, 5}', 'elements not common to both', 'elements in first but not second'],
                  hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation and membership) and practice writing.',
                  misconception: 'Students treat set difference as commutative, writing A − B = B − A, because they analogise it to arithmetic subtraction where a − b ≠.' }
          ],
            remediations: { 'students-treat-set-difference-as': { steps: ['Make the student write the definition aloud: "A − B means elements in A AND not in B."', 'Give a tiny concrete example: A = {a, b}, B = {b, c}. Ask: "Is a in A − B? Is c in A − B?"', 'Force them to check each element of A against B one by one: "Take a: is a in A? Yes. Is a in B? No. So a ∈ A − B.', 'Repeat for B − A to show the different result.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_012', difficulty: 'standard',
          question: 'The complement of a set \\(A\\) with respect to a universal set \\(U\\) is the set.',
          hint: 'Revisit universal set (c11_math_cbse_01_007) and difference of sets.',
          misconception: 'Students often treat the complement as an absolute concept, writing \\(A\' = \\{x \\mid x \\notin A\\}\\) without referencing.',
          parts: [
                { id: 'a', prompt: 'Explain why \\((A\')\' = A\\) for any subset \\(A\\) of a universal set \\(U\\). Use the definition of complement in your reasoning.', answer: 'By definition, \\(A\' = \\{x \\in U \\mid x \\notin A\\}\\)',
                  options: ['By definition, \\(A\' = \\{x \\in U \\mid x \\notin A\\}\\)', 'it\'s obvious'],
                  hint: 'Revisit universal set (c11_math_cbse_01_007) and difference of sets (c11_math_cbse_01_011) with.',
                  misconception: 'Students often treat the complement as an absolute concept, writing \\(A\' = \\{x \\mid x \\notin A\\}\\) without referencing the universal set.' }
          ],
            remediations: { 'students-often-treat-the-complement': { steps: ['If a student writes \\(A\' = \\{x \\mid x \\notin A\\}\\), ask: "If \\(U = \\{1,2,3\\}\\) and \\(A = \\{1\\}\\), what is \\(A\'\\)?', 'Now if \\(U = \\{1,2,3,4,5\\}\\) and \\(A = \\{1\\}\\), is \\(A\'\\) the same?', 'Why does the universal set matter?" Guide them to rewrite the definition as \\(A\' = U - A\\) and practise with two.', 'For De Morgan confusion, have them test both versions with a concrete small example (e.g., \\(U=\\{1,2,3,4\\}\\).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
