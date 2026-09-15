import type { SimDef } from '../../engine/types';
import C11_MathematicsProbabilitySim from '../../../simulations/c6_12/C11_MathematicsProbabilitySim';

/** v3 wrapped master — C11_MathematicsProbabilitySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicsprobabilitysim: SimDef = {
    id: 'v3w_c11_mathematicsprobabilitysim',
    title: 'Probability',
    subtitle: 'This node covers construction and interpretation of Venn diagrams for two and three sets.',
    classLevel: 11, subject: 'mathematics', topic: 'Venn Diagrams: Representation of Sets',
    chapters: [],
    nodeIds: ['c11_math_cbse_01_008', 'c11_math_cbse_01_010', 'c11_math_cbse_01_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are the class representative organizing the annual fest.', goal: 'Master Probability.' },
    discovery: {
        question: 'Three sets A, B, C are represented in a Venn diagram. The region representing A ∩ (B ∪ C) is shaded.',
        options: ['B ∪ C covers all regions inside circle B or circle C (including their overlap)', 'A and anything', 'A and (B or C)'],
        answer: 'B ∪ C covers all regions inside circle B or circle C (including their overlap)',
        hook: 'Students treat Venn diagram circles as mere labels and place elements in circles based on set membership without.',
    },
    teaching: [
        { title: 'A Venn diagram is a graphical representation.', text: 'A Venn diagram is a graphical representation of sets using closed curves (usually circles) within a rectangle, where the rectangle represents the universal set U and each closed curve represents a.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_008', title: 'A Venn diagram is a graphical.',
          scaffold: { problem: 'In a survey of 50 Class 11 students, 30 study Mathematics, 25 study Physics, 20 study Chemistry.',
            steps: [
            { text: 'Identify the universal set U = all 50 surveyed students. Define sets: M = Mathematics, P = Physics, C = Chemistry.' },
            { text: 'Start from the innermost region: M∩P∩C = 5 students (given). Place 5 in the central region where all three circles.' },
            { text: 'Fill pairwise intersections: M∩P total = 12, but 5 already in triple intersection → M∩P∩C\' = 12-5 = 7.' },
            { text: 'Fill single-subject regions: M total = 30. Already accounted: 5 (all three) + 7 (M∩P only) + 3 (M∩C only) = 15.' },
            { text: 'Find (a) only Mathematics = 15. (b) Exactly two subjects = 7+5+3 = 15. (c) None = 50 - (15+8+7+7+5+3+5) = 50 - 50 = 0.', faded: true, blankAnswer: '(a) 15 students study only Mathematics. (b) 15 students.' }
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_014', title: 'Word problems on set operations involve.',
          scaffold: { problem: 'In a survey of 500 families in a Mumbai apartment complex, 220 read The Times of India, 180 read The Hindu, 150 read Hindustan Times.',
            steps: [
            { text: 'Identify the universal set U = all 500 families. Define sets: T = Times of India readers, H = Hindu readers, S =.' },
            { text: 'Draw a three-circle Venn diagram. Fill the centre region (all three) with 30.' },
            { text: 'Compute pairwise-only regions: T∩H only = 80-30=50; H∩S only = 60-30=30; T∩S only = 50-30=20.' },
            { text: 'Compute single-only regions: Only T = 220 - (50+20+30) = 120; Only H = 180 - (50+30+30) = 70; Only S = 150 - (30+20+30).' },
            { text: '(i) At least one = sum of all 7 regions = 120+70+70+50+30+20+30 = 390.' },
            { text: '(ii) Exactly one = only T + only H + only S = 120+70+70 = 260.' },
            { text: '(iii) None = n(U) - n(T∪H∪S) = 500 - 390 = 110.' },
            { text: 'Verify: Sum of all 8 regions (7 inside + none) = 390 + 110 = 500 = n(U). Consistent.', faded: true, blankAnswer: '(i) 390 families, (ii) 260 families, (iii) 110 families.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_01_010', title: 'Identify each idea',
          dissect: { specimen: 'Probability', spots: [
            { id: 's1', label: 'A Venn diagram is a', prompt: 'Which idea is this? — A Venn diagram is a graphical representation of sets using closed curves (usually.', answer: 'A Venn diagram is a', options: ['A Venn diagram is a', 'The intersection of two sets', 'Word problems on set operations'] },
            { id: 's2', label: 'The intersection of two sets', prompt: 'Which idea is this? — The intersection of two sets A and B, denoted by A ∩ B, is the set of all elements that.', answer: 'The intersection of two sets', options: ['The intersection of two sets', 'A Venn diagram is a', 'Word problems on set operations'] },
            { id: 's3', label: 'Word problems on set operations', prompt: 'Which idea is this? — Word problems on set operations involve translating real-world scenarios involving.', answer: 'Word problems on set operations', options: ['Word problems on set operations', 'A Venn diagram is a', 'The intersection of two sets'] }
          ] } }
    ],
    explore: { component: C11_MathematicsProbabilitySim, prompt: 'Explore the interactive — Probability' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_01_008', difficulty: 'standard',
          question: 'A Venn diagram is a graphical representation of sets using closed curves.',
          hint: 'Revisit c11_math_cbse_01_001 (set notation and membership) and c11_math_cbse_01_004.',
          misconception: 'Students treat Venn diagram circles as mere labels and place elements in circles based on set membership without.',
          parts: [
                { id: 'a', prompt: 'Three sets A, B, C are represented in a Venn diagram. The region representing A ∩ (B ∪ C) is shaded.', answer: 'B ∪ C covers all regions inside circle B or circle C (including their overlap)',
                  options: ['B ∪ C covers all regions inside circle B or circle C (including their overlap)', 'A and anything', 'A and (B or C)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat Venn diagram circles as mere labels and place elements in circles based on set membership without respecting region.' }
          ],
            remediations: { 'students-treat-venn-diagram-circles': { steps: ['Have the student list all 2ⁿ possible membership combinations for n sets (e.g., for 2 sets: in A only, in B only, in.', 'Draw the Venn diagram and label each region with its combination (e.g., "A∩B\'", "A\'∩B", "A∩B", "A\'∩B\'").', 'For each element, determine its membership combination and place it in the correspondingly labeled region.', 'Practice with "impossible" combinations (e.g., if A⊂B, the region A∩B\' is empty - shade it with diagonal lines to mark.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat Venn diagram circles as mere labels and place elements in circles based on set membership without.',
          parts: [
                { id: 'a', prompt: 'A student draws a Venn diagram for sets A, B, C where A ⊂ B and B ⊂ C. They draw three separate non-overlapping circles labeled A, B, C.', answer: 'The error: subset relationship requires containment, not separation',
                  options: ['The error: subset relationship requires containment, not separation', 'different sets', 'separate circles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat Venn diagram circles as mere labels and place elements in circles based on set membership without respecting region.' },
                { id: 'b', prompt: 'Three sets A, B, C are represented in a Venn diagram. The region representing A ∩ (B ∪ C) is shaded.', answer: 'B ∪ C covers all regions inside circle B or circle C (including their overlap)',
                  options: ['B ∪ C covers all regions inside circle B or circle C (including their overlap)', 'A and anything', 'A and (B or C)', 'intersection with union means "A and anything" rather than "A and (B or C)"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat Venn diagram circles as mere labels and place elements in circles based on set membership without respecting region.' }
          ],
            remediations: { 'students-treat-venn-diagram-circles': { steps: ['Have the student list all 2ⁿ possible membership combinations for n sets (e.g., for 2 sets: in A only, in B only, in.', 'Draw the Venn diagram and label each region with its combination (e.g., "A∩B\'", "A\'∩B", "A∩B", "A\'∩B\'").', 'For each element, determine its membership combination and place it in the correspondingly labeled region.', 'Practice with "impossible" combinations (e.g., if A⊂B, the region A∩B\' is empty - shade it with diagonal lines to mark.'] } } },
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
        { type: 'subpart', nodeId: 'c11_math_cbse_01_014', difficulty: 'standard',
          question: 'Word problems on set operations involve translating real-world scenarios.',
          hint: 'Review the Venn diagram region-filling technique from c11_math_cbse_01_008 and the.',
          misconception: 'Students often treat "A or B" in word problems as exclusive or (either A or B but not both) instead of inclusive or (A.',
          parts: [
                { id: 'a', prompt: 'A class has 50 students. 30 play Cricket, 25 play Football, 15 play Hockey.', answer: 'Step 1: Draw Venn diagram, fill centre = 3',
                  options: ['Step 1: Draw Venn diagram, fill centre = 3', 'exactly two'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "A or B" in word problems as exclusive or (either A or B but not both) instead of inclusive or (A ∪ B).' },
                { id: 'b', prompt: 'Compare the two statements: (i) "Students who study Math or Physics" and (ii) "Students who study Math or Physics but not both".', answer: '(i) \\(M \\cup P\\), cardinality \\(n(M) + n(P) - n(M \\cap P)\\)',
                  options: ['(i) \\(M \\cup P\\), cardinality \\(n(M) + n(P) - n(M \\cap P)\\)', '(union) with exclusive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "A or B" in word problems as exclusive or (either A or B but not both) instead of inclusive or (A ∪ B).' }
          ],
            remediations: { 'students-often-treat-a-or': { steps: ['If a student makes the exclusive-or error: 1) Ask them to list the elements of {1,2,3} ∪ {3,4,5} and confirm 3 is.', '2) Show that "or" in mathematics means "at least one of".', '3) Have them re-read the problem and identify if "but not both" is stated; if not, use inclusive union.', 'For the triple-intersection error: 1) Draw a 3-circle Venn diagram and label the centre region as \\(x = n(A \\cap B \\cap.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "A or B" in word problems as exclusive or (either A or B but not both) instead of inclusive or (A.',
          parts: [
                { id: 'a', prompt: 'Compare the two statements: (i) "Students who study Math or Physics" and (ii) "Students who study Math or Physics but not both".', answer: '(i) \\(M \\cup P\\), cardinality \\(n(M) + n(P) - n(M \\cap P)\\)',
                  options: ['(i) \\(M \\cup P\\), cardinality \\(n(M) + n(P) - n(M \\cap P)\\)', '(union) with exclusive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "A or B" in word problems as exclusive or (either A or B but not both) instead of inclusive or (A ∪ B).' }
          ],
            remediations: { 'students-often-treat-a-or': { steps: ['If a student makes the exclusive-or error: 1) Ask them to list the elements of {1,2,3} ∪ {3,4,5} and confirm 3 is.', '2) Show that "or" in mathematics means "at least one of".', '3) Have them re-read the problem and identify if "but not both" is stated; if not, use inclusive union.', 'For the triple-intersection error: 1) Draw a 3-circle Venn diagram and label the centre region as \\(x = n(A \\cap B \\cap.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
