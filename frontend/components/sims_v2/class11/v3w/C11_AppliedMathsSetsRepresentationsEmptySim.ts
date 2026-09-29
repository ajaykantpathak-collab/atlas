import type { SimDef } from '../../engine/types';
import C11_AppliedMathsSetsRepresentationsEmptySim from '../../../simulations/c6_12/C11_AppliedMathsSetsRepresentationsEmptySim';

/** v3 wrapped master — C11_AppliedMathsSetsRepresentationsEmptySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_appliedmathssetsrepresentationsemptysim: SimDef = {
    id: 'v3w_c11_appliedmathssetsrepresentationsemptysim',
    title: 'Introduction to Sets: Definition and Notation',
    subtitle: 'This node covers: definition of a set (well-defined collection), element notation (∈, ∉),.',
    classLevel: 11, subject: 'science', topic: 'Introduction to Sets: Definition and Notation',
    chapters: [],
    nodeIds: ['c11_math_cbse_01_001', 'c11_math_cbse_01_010', 'c11_math_cbse_02_002', 'c11_math_cbse_02_003', 'c11_math_cbse_06_005', 'c11_math_cbse_01_002', 'c11_math_cbse_01_004', 'c11_math_cbse_01_006', 'c11_math_cbse_01_007', 'c11_math_cbse_01_008', 'c11_math_cbse_01_009', 'c11_math_cbse_01_011', 'c11_math_cbse_02_001', 'c11_math_cbse_02_004', 'c11_math_cbse_01_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are the class representative tasked with creating a list of students who scored above 90% in the.', goal: 'Master Introduction to Sets: Definition and Notation.' },
    discovery: {
        question: 'State the definition of intersection of two sets A and B using set-builder notation and the symbol ∈.',
        options: ['A ∩ B = {x : x ∈ A and x ∈ B}', 'disjoint', 'different descriptions'],
        answer: 'A ∩ B = {x : x ∈ A and x ∈ B}',
        hook: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must.',
    },
    teaching: [
        { title: 'A set is a well-defined collection of.', text: 'A set is a well-defined collection of distinct objects, where "well-defined" means for any given object, we can definitively decide whether it belongs to the collection or not.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_001', title: 'A set is a well-defined collection of.',
          scaffold: { problem: 'A school library has books classified by subject codes: M (Mathematics), P (Physics), C (Chemistry), B (Biology), E (English), H (History).',
            steps: [
            { text: 'Identify the universal collection — the six subject codes: {M, P, C, B, E, H}.' },
            { text: 'Determine the defining property — "starts with a consonant". In English, consonants are all letters except A, E, I, O,.' },
            { text: 'Check each code: M (consonant) ✓, P (consonant) ✓, C (consonant) ✓, B (consonant) ✓, E (vowel) ✗, H (consonant) ✓.' },
            { text: 'List the qualifying elements in roster form (order irrelevant, no repetition): {M, P, C, B, H} or {B, C, H, M, P}.' },
            { text: 'Write set-builder form using a variable, say x: {x : x is a subject code from {M,P,C,B,E,H} and x is a consonant} or.' },
            { text: 'Answer membership questions: M is in the roster list, so M ∈ set → True.', faded: true, blankAnswer: 'Roster form: {M, P, C, B, H} (any order). Set-builder form:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_010', title: 'The intersection of two sets A and B,.',
          scaffold: { problem: 'In a Class 11 survey of 50 students, 30 students like Mathematics (set M), 25 like Physics (set P), and 15 like both subjects.',
            steps: [
            { text: 'Identify given data: n(U) = 50, n(M) = 30, n(P) = 25, n(M ∩ P) = 15. We need n(M - P) = n(M) - n(M ∩ P).' },
            { text: 'Compute n(M - P) = 30 - 15 = 15 students like Mathematics but not Physics.' },
            { text: 'Find n(M ∪ P) using the addition principle: n(M ∪ P) = n(M) + n(P) - n(M ∩ P) = 30 + 25 - 15 = 40.' },
            { text: 'Verify n(M ∩ P) using the formula rearranged: n(M ∩ P) = n(M) + n(P) - n(M ∪ P) = 30 + 25 - 40 = 15 ✓' },
            { text: 'Interpret: 15 students like both, 15 like only Math, 10 like only Physics (25-15), and 10 like neither (50-40).', faded: true, blankAnswer: '15 students like Mathematics but not Physics. Verification:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_002', title: 'The Cartesian product of two non-empty.',
          scaffold: { problem: 'A school offers 4 science subjects (Physics, Chemistry, Biology, Computer Science) and 3 time slots (Morning, Afternoon, Evening).',
            steps: [
            { text: 'Identify the sets: S = {P, C, B, CS} (4 subjects), T = {M, A, E} (3 time slots).' },
            { text: 'Identify the forbidden pairs: Biology in Evening means the pair (B, E) is not allowed.' },
            { text: 'Compute the allowed pairs as S × T minus the forbidden pairs: (S × T) \\ ({B} × {E}).' },
            { text: 'Use the property A × (B \\ C) = (A × B) \\ (A × C) with A = {B}, B = T, C = {E}.' },
            { text: 'Total allowed pairs = (total pairs) - (forbidden pairs) = 12 - 1 = 11.', faded: true, blankAnswer: '11 valid subject-time slot pairs.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_003', title: 'A relation R from a non-empty set A to.',
          scaffold: { problem: 'A school has three clubs: Science (S), Arts (A), Sports (P). Four students: Rahul (R), Meena (M), Karthik (K), Anjali (An).',
            steps: [
            { text: 'Identify the two sets. Set A (students) = {Rahul, Meena, Karthik, Anjali}. Set B (clubs) = {Science, Arts, Sports}.' },
            { text: 'Form the Cartesian product A × B. There are 4 × 3 = 12 possible ordered pairs.' },
            { text: 'Apply the rule "first letter of student name = club initial". Check each student: Rahul (R) matches no club (no club.' },
            { text: 'Write the relation in roster form: R = {(Anjali, Arts)}. In set-builder form: R = {(s, c) : s ∈ A, c ∈ B, first letter.' },
            { text: 'Domain = {Anjali} (only first elements appearing). Range = {Arts} (only second elements appearing).', faded: true, blankAnswer: 'Roster: {(Anjali, Arts)}; Set-builder: {(s, c) : s ∈ A, c ∈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_06_005', title: 'A system of linear inequalities in one.',
          scaffold: { problem: 'A factory produces widgets. The daily cost is C(x) = 50x + 2000 rupees for x widgets. The selling price is ₹80 per widget.',
            steps: [
            { text: 'Identify the variable and constraints. Let x = number of widgets produced daily.' },
            { text: 'Write profit inequality. Profit = Revenue - Cost = 80x - (50x + 2000) = 30x - 2000. So 30x - 2000 ≥ 1000.' },
            { text: 'Solve each inequality separately. (1) 30x - 2000 ≥ 1000 → 30x ≥ 3000 → x ≥ 100. (2) x ≤ 200. (3) x ≥ 60.' },
            { text: 'Find intersection of solution sets. x ≥ 100 AND x ≤ 200 AND x ≥ 60. The most restrictive lower bound is x ≥ 100.' },
            { text: 'Verify endpoints. At x=100: profit = 30(100)-2000=1000 ✓. At x=200: profit = 4000 ✓, within capacity.' },
            { text: 'Express answer. Feasible production range: 100 ≤ x ≤ 200 widgets, or [100, 200] in interval notation.', faded: true, blankAnswer: '[100, 200] widgets (100 to 200 inclusive)' }
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
        { type: 'dissect', nodeId: 'c11_math_cbse_01_010', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Sets: Definition and Notation', spots: [
            { id: 's1', label: 'A set is a well-defined', prompt: 'Which idea is this? — A set is a well-defined collection of distinct objects, where "well-defined" means for.', answer: 'A set is a well-defined', options: ['A set is a well-defined', 'The intersection of two sets', 'The Cartesian product of two', 'A relation R from a'] },
            { id: 's2', label: 'The intersection of two sets', prompt: 'Which idea is this? — The intersection of two sets A and B, denoted by A ∩ B, is the set of all elements that.', answer: 'The intersection of two sets', options: ['The intersection of two sets', 'A set is a well-defined', 'The Cartesian product of two', 'A relation R from a'] },
            { id: 's3', label: 'The Cartesian product of two', prompt: 'Which idea is this? — The Cartesian product of two non-empty sets A and B, denoted A × B, is the set of all.', answer: 'The Cartesian product of two', options: ['The Cartesian product of two', 'A set is a well-defined', 'The intersection of two sets', 'A relation R from a'] },
            { id: 's4', label: 'A relation R from a', prompt: 'Which idea is this? — A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian.', answer: 'A relation R from a', options: ['A relation R from a', 'A set is a well-defined', 'The intersection of two sets', 'The Cartesian product of two'] },
            { id: 's5', label: 'A system of linear inequalities', prompt: 'Which idea is this? — A system of linear inequalities in one variable consists of two or more linear.', answer: 'A system of linear inequalities', options: ['A system of linear inequalities', 'A set is a well-defined', 'The intersection of two sets', 'The Cartesian product of two'] },
            { id: 's6', label: 'A set is classified by', prompt: 'Which idea is this? — A set is classified by its cardinality (number of elements): an **empty set** (denoted φ.', answer: 'A set is classified by', options: ['A set is classified by', 'A set is a well-defined', 'The intersection of two sets', 'The Cartesian product of two'] }
          ] } }
    ],
    explore: { component: C11_AppliedMathsSetsRepresentationsEmptySim, prompt: 'Explore the interactive — Introduction to Sets: Definition and Notation' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_01_001', difficulty: 'standard',
          question: 'A set is a well-defined collection of distinct objects, where "well-defined".',
          hint: 'If stuck, revisit Class 9 "Real Numbers" (c9_math_ch3_6) to review N, Z, Q, R definitions.',
          misconception: 'Students often write {1, 2, 2, 3} as a set, not realising elements must be distinct — repetition does not change the.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The set of all integers x such that x² = 4 is {2}." Explain why this answer is incomplete and write the correct set in both roster and.', answer: 'The equation x² = 4 has two integer solutions: x = 2 and x = -2',
                  options: ['The equation x² = 4 has two integer solutions: x = 2 and x = -2', 'well-defined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write {1, 2, 2, 3} as a set, not realising elements must be distinct — repetition does not change the set.' }
          ],
            remediations: { 'students-often-write-1': { steps: ['If a student repeats elements or thinks order matters: (1) Show {1, 2, 2, 3} and {1, 2, 3} side by side; ask "Is 2 in.', 'Are they the same set?" (2) Have them list elements of {letters in "BANANA"} — they will write {B, A, N, A, N, A}, then.', '(3) For dummy variable confusion: write {x : x² = 4} = {2, -2} and ask "Is the letter \'x\' in this set?', 'What are the actual elements?" Emphasise: the variable after the colon is a placeholder, not a member.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_010', difficulty: 'standard',
          question: 'The intersection of two sets A and B, denoted by A ∩ B, is the set of all.',
          hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation and membership) and.',
          misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must.',
          parts: [
                { id: 'a', prompt: 'State the definition of intersection of two sets A and B using set-builder notation and the symbol ∈.', answer: 'A ∩ B = {x : x ∈ A and x ∈ B}',
                  options: ['A ∩ B = {x : x ∈ A and x ∈ B}', 'disjoint', 'different descriptions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must distribute over BOTH B and.' },
                { id: 'b', prompt: 'If A = {x : x is a prime number less than 10} and B = {x : x is an odd number less than 10}, find A ∩ B.', answer: 'A = {2, 3, 5, 7}, B = {1, 3, 5, 7, 9}, so A ∩ B = {3, 5, 7}',
                  options: ['A = {2, 3, 5, 7}, B = {1, 3, 5, 7, 9}, so A ∩ B = {3, 5, 7}', 'overrides', 'condition strictly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must distribute over BOTH B and.' },
                { id: 'c', prompt: 'Let U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, A = {2, 4, 6, 8, 10}, B = {3, 6, 9}. Find (A ∩ B) ∪ (A ∩ B\') where B\' is the complement of B in U.', answer: 'Step 1: A ∩ B = {6} (only common element)',
                  options: ['Step 1: A ∩ B = {6} (only common element)', 'disjoint', 'different descriptions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must distribute over BOTH B and.' }
          ],
            remediations: { 'students-incorrectly-apply-the-distributive': { steps: ['If a student makes the distributive law error, have them verify with a concrete example: choose small finite sets.', 'Compute LHS step-by-step: B∪C={2,3,4}, then A∩(B∪C)={2}.', 'Compute RHS both ways: (A∩B)∪C={2}∪{3,4}={2,3,4} (wrong) vs (A∩B)∪(A∩C)={2}∪φ={2} (correct).', 'For the disjoint misconception, explicitly list elements of both sets and check each one: "Is 2 in A?'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must.',
          parts: [
                { id: 'a', prompt: 'A student writes: "For any sets A, B, C: A ∩ (B ∪ C) = (A ∩ B) ∪ C". Identify the error and provide a counterexample with specific sets.', answer: 'The error is missing parentheses on the right side',
                  options: ['The error is missing parentheses on the right side', 'disjoint', 'different descriptions', 'prime numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must distribute over BOTH B and.' },
                { id: 'b', prompt: 'Create a real-world scenario involving three sets where finding the intersection of all three is meaningful.', answer: 'Example: U = all Class 11 students in a school',
                  options: ['Example: U = all Class 11 students in a school', 'disjoint', 'different descriptions', 'prime numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the distributive law as A ∩ (B ∪ C) = (A ∩ B) ∪ C, forgetting that intersection must distribute over BOTH B and.' }
          ],
            remediations: { 'students-incorrectly-apply-the-distributive': { steps: ['If a student makes the distributive law error, have them verify with a concrete example: choose small finite sets.', 'Compute LHS step-by-step: B∪C={2,3,4}, then A∩(B∪C)={2}.', 'Compute RHS both ways: (A∩B)∪C={2}∪{3,4}={2,3,4} (wrong) vs (A∩B)∪(A∩C)={2}∪φ={2} (correct).', 'For the disjoint misconception, explicitly list elements of both sets and check each one: "Is 2 in A?'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_002', difficulty: 'standard',
          question: 'The Cartesian product of two non-empty sets A and B, denoted A × B, is the set.',
          hint: 'Review c11_math_cbse_02_001 for Cartesian product definition and c9_math_ch1_2 for.',
          misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).',
          parts: [
                { id: 'a', prompt: 'State the cardinality formula for the Cartesian product of two finite sets A and B. If n(A) = 5 and n(B) = 3, what is n(A × B)?', answer: 'The formula is n(A × B) = n(A) × n(B)',
                  options: ['The formula is n(A × B) = n(A) × n(B)', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' },
                { id: 'b', prompt: 'Explain why A × B ≠ B × A in general, using the sets A = {1, 2} and B = {3, 4} as an illustration. Under what condition would A × B = B × A hold?', answer: 'A × B = {(1,3), (1,4), (2,3), (2,4)} while B × A = {(3,1), (3,2), (4,1), (4,2)}',
                  options: ['A × B = {(1,3), (1,4), (2,3), (2,4)} while B × A = {(3,1), (3,2), (4,1), (4,2)}', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' },
                { id: 'c', prompt: 'Let A = {1, 2}, B = {2, 3}, C = {3, 4}. Compute A × (B ∪ C) and (A × B) ∪ (A × C) and verify they are equal.', answer: 'B ∪ C = {2, 3, 4}',
                  options: ['B ∪ C = {2, 3, 4}', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' }
          ],
            remediations: { 'cartesian-product-is-commutative-because': { steps: ['If a student asserts A × B = B × A, have them explicitly list both sets for A = {a, b}, B = {1, 2}.', 'Ask: "Is (a,1) the same ordered pair as (1,a)?', 'What does the definition of equality of ordered pairs require?" Guide them to see that (a,1) ∈ A×B but (a,1) ∉ B×A.', 'For distributive law errors, use Venn diagrams for sets and grid diagrams for Cartesian products: draw A on x-axis, B∪C.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since A × (B ∩ C) = (A × B) ∩ (A × C), it follows that (A × B) ∩ (A × C) = A × (B ∩ C) is always true, so the intersection of two Cartesian.', answer: 'The claim is false',
                  options: ['The claim is false', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' },
                { id: 'b', prompt: 'Construct an example of three sets A, B, C such that A × (B \\ C) ≠ (A × B) \\ (A × C), where \\ denotes set difference.', answer: 'Let A = {1}, B = {1, 2}, C = {2}',
                  options: ['Let A = {1}, B = {1, 2}, C = {2}', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' }
          ],
            remediations: { 'cartesian-product-is-commutative-because': { steps: ['If a student asserts A × B = B × A, have them explicitly list both sets for A = {a, b}, B = {1, 2}.', 'Ask: "Is (a,1) the same ordered pair as (1,a)?', 'What does the definition of equality of ordered pairs require?" Guide them to see that (a,1) ∈ A×B but (a,1) ∉ B×A.', 'For distributive law errors, use Venn diagrams for sets and grid diagrams for Cartesian products: draw A on x-axis, B∪C.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_003', difficulty: 'standard',
          question: 'A relation R from a non-empty set A to a non-empty set B is a subset of the.',
          hint: 'If stuck, revisit c11_math_cbse_02_001 (Cartesian Product of Sets: Definition) and.',
          misconception: 'Students often confuse the codomain with the range, writing codomain = range even when some elements of B have no.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian',
                  options: ['A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian', 'A set is a well-defined collection of distinct objects, where "well-defined" means for', 'The intersection of two sets A and B, denoted by A ∩ B, is the set of all elements that', 'The Cartesian product of two non-empty sets A and B, denoted A × B, is the set of all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the codomain with the range, writing codomain = range even when some elements of B have no pre-image.' }
          ],
            remediations: { 'students-often-confuse-the-codomain': { steps: ['If a student confuses codomain and range: (1) Ask them to list all second elements of the ordered pairs in R – that is.', '(2) Ask them to look at the original set B given in the problem – that is the codomain.', '(3) Have them check if every element of B appears as a second element; if not, range ⊂ codomain.', 'If they think every element of A must appear: (1) Remind them a relation is ANY subset of A × B, including the empty.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_005', difficulty: 'standard',
          question: 'A system of linear inequalities in one variable consists of two or more linear.',
          hint: 'If stuck, revisit c11_math_cbse_06_003 (Solving Linear Inequalities in One Variable) and.',
          misconception: 'Students incorrectly apply the "flip the inequality sign" rule when dividing by a negative number in ONE inequality of.',
          parts: [
                { id: 'a', prompt: 'Explain why the system 3x + 2 < 11 AND 5x - 7 > 18 has no solution, and describe what the number line graph would look like.', answer: 'Correct explanation: 3x + 2 < 11 → 3x < 9 → x < 3',
                  options: ['Correct explanation: 3x + 2 < 11 → 3x < 9 → x < 3', ') reveals the student treats the system as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the "flip the inequality sign" rule when dividing by a negative number in ONE inequality of the system but.' },
                { id: 'b', prompt: 'Solve the system and graph the solution on a number line: (x - 2)/3 ≥ 1 AND 2x + 5 < 15.', answer: 'Step 1: (x - 2)/3 ≥ 1 → multiply by 3: x - 2 ≥ 3 → x ≥ 5',
                  options: ['Step 1: (x - 2)/3 ≥ 1 → multiply by 3: x - 2 ≥ 3 → x ≥ 5', 'x = 5 satisfies the second inequality (it doesn\'t'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the "flip the inequality sign" rule when dividing by a negative number in ONE inequality of the system but.' }
          ],
            remediations: { 'students-incorrectly-apply-the-flip': { steps: ['Isolate the variable in each inequality ONE AT A TIME, circling any division by negative numbers.', 'For each circled step, explicitly write "FLIP SIGN" next to it.', 'Write the simplified inequality with correct direction.', 'Draw a number line for each inequality separately.', 'Overlay them to find the intersection visually before writing interval notation.'] } } },
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
            remediations: { 'students-often-write-0-or': { steps: ['Ask the student to list elements of {0}, {φ}, and φ explicitly: {0} has one element (0), {φ} has one element (the empty.', 'For singleton confusion: give {x : x²=4, x∈ℕ} → {2} (one element) vs {x : x²=4, x∈ℤ} → {2,-2} (two elements).', 'Emphasize: "singleton ⇔ exactly one element satisfies the condition in the given universe." 3.', 'For infinite sets: show that {x : x ∈ ℕ, x > 100} is infinite because for any candidate largest element n, n+1 is also.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
