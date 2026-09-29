import type { SimDef } from '../../engine/types';
import C12_MathematicsTypesRelationsReflexiveSim from '../../../simulations/c6_12/C12_MathematicsTypesRelationsReflexiveSim';

/** v3 wrapped master — C12_MathematicsTypesRelationsReflexiveSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicstypesrelationsreflexivesim: SimDef = {
    id: 'v3w_c12_mathematicstypesrelationsreflexivesim',
    title: 'Types of Relations: Reflexive, Symmetric, Transitive',
    subtitle: 'This node covers the definitions and verification methods for reflexive, symmetric, and.',
    classLevel: 12, subject: 'mathematics', topic: 'Types of Relations: Reflexive, Symmetric, Transitive',
    chapters: [],
    nodeIds: ['c12_math_cbse_01_001', 'c12_math_cbse_01_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are organising a school sports day and need to group students for relay races.', goal: 'Master Types of Relations: Reflexive, Symmetric, Transitive.' },
    discovery: {
        question: 'State the precise mathematical condition for a relation R on a set A to be reflexive. Use set notation and quantifiers.',
        options: ['A relation R on a set A is reflexive if ∀ a ∈ A, (a, a) ∈ R', 'R contains (1,1), (2,2)', 'reflexivity only requires some diagonal pairs, not all'],
        answer: 'A relation R on a set A is reflexive if ∀ a ∈ A, (a, a) ∈ R',
        hook: '**Misconception: "If a relation has (a,b) and (b,c), it must have (a,c) to be transitive — so I just need to check the.',
    },
    teaching: [
        { title: 'A relation R on a set A is a subset of the.', text: 'A relation R on a set A is a subset of the Cartesian product A × A. It is called **reflexive** if every element is related to itself, i.e., (a, a) ∈ R for all a ∈ A.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_01_001', title: 'A relation R on a set A is a subset of.',
          scaffold: { problem: 'Let A = {1, 2, 3, 4, 5, 6} and define a relation R on A by R = {(x, y) : y = x + 1}.',
            steps: [
            { text: 'Write the set A explicitly: A = {1, 2, 3, 4, 5, 6}. The relation R consists of all ordered pairs (x, y) where y = x + 1.' },
            { text: 'Check reflexivity. For R to be reflexive, we need (a, a) ∈ R for EVERY a ∈ A.' },
            { text: 'Check symmetry. Take an arbitrary pair in R, say (1,2). For symmetry, (2,1) must also be in R.' },
            { text: 'Check transitivity. We need: if (a,b) ∈ R and (b,c) ∈ R, then (a,c) ∈ R. Suppose (a,b) ∈ R ⇒ b = a + 1.' },
            { text: 'Conclusion: R is neither reflexive, nor symmetric, nor transitive.', faded: true, blankAnswer: 'R is not reflexive, not symmetric, not transitive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_01_002', title: 'An equivalence relation on a set A is a.',
          scaffold: { problem: 'Let A be the set of all students in a school. Define a relation R on A by (x, y) ∈ R iff x and y are in the same class (e.g., both in Class.',
            steps: [
            { text: 'Identify the set A (all students) and the relation condition: (x,y) ∈ R ⇔ x and y are in the same class.' },
            { text: 'Check reflexivity: For any student x, x is in the same class as themselves ⇒ (x,x) ∈ R. So R is reflexive.' },
            { text: 'Check symmetry: If (x,y) ∈ R, then x and y are in the same class ⇒ y and x are in the same class ⇒ (y,x) ∈ R.' },
            { text: 'Check transitivity: If (x,y) ∈ R and (y,z) ∈ R, then x and y are in same class, and y and z are in same class ⇒ x and z.' },
            { text: 'Since R is reflexive, symmetric, and transitive, R is an equivalence relation.' },
            { text: 'Equivalence classes are exactly the sets of students in each class: [student in XII-A] = XII-A (40 students), [student.' },
            { text: 'Verify partition: (i) Classes are non-empty. (ii) Disjoint: no student can be in two classes.', faded: true, blankAnswer: 'R is an equivalence relation. Equivalence classes: C₁ =.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'Types of Relations: Reflexive, Symmetric, Transitive', spots: [
            { id: 's1', label: 'A relation R on a', prompt: 'Which idea is this? — A relation R on a set A is a subset of the Cartesian product A × A.', answer: 'A relation R on a', options: ['A relation R on a', 'An equivalence relation on a'] },
            { id: 's2', label: 'An equivalence relation on a', prompt: 'Which idea is this? — An equivalence relation on a set A is a relation R ⊆ A × A that satisfies three.', answer: 'An equivalence relation on a', options: ['An equivalence relation on a', 'A relation R on a'] }
          ] } }
    ],
    explore: { component: C12_MathematicsTypesRelationsReflexiveSim, prompt: 'Explore the interactive — Types of Relations: Reflexive, Symmetric, Transitive' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_01_001', difficulty: 'standard',
          question: 'A relation R on a set A is a subset of the Cartesian product A × A.',
          hint: 'If stuck, revisit c11_math_cbse_02_003 (Relations: Definition and Representation) to.',
          misconception: '**Misconception: "If a relation has (a,b) and (b,c), it must have (a,c) to be transitive — so I just need to check the.',
          parts: [
                { id: 'a', prompt: 'State the precise mathematical condition for a relation R on a set A to be reflexive. Use set notation and quantifiers.', answer: 'A relation R on a set A is reflexive if ∀ a ∈ A, (a, a) ∈ R',
                  options: ['A relation R on a set A is reflexive if ∀ a ∈ A, (a, a) ∈ R', 'R contains (1,1), (2,2)', 'reflexivity only requires some diagonal pairs, not all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception: "If a relation has (a,b) and (b,c), it must have (a,c) to be transitive — so I just need to check the pairs that are.' },
                { id: 'b', prompt: 'A student claims: "The relation R = {(x, y) ∈ Z × Z : x − y is even} is symmetric because if x − y is even, then y − x is also even." Is this reasoning.', answer: 'The reasoning is correct in spirit but incomplete as a proof',
                  options: ['The reasoning is correct in spirit but incomplete as a proof', 'yes it\'s symmetric'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception: "If a relation has (a,b) and (b,c), it must have (a,c) to be transitive — so I just need to check the pairs that are.' },
                { id: 'c', prompt: 'Let A = {1, 2, 3, 4} and R = {(1,1), (2,2), (3,3), (4,4), (1,2), (2,1), (2,3), (3,2)}. Determine whether R is reflexive, symmetric, and transitive.', answer: 'Reflexive: Yes, because (1,1), (2,2), (3,3), (4,4) ∈ R',
                  options: ['Reflexive: Yes, because (1,1), (2,2), (3,3), (4,4) ∈ R', 'most pairs work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception: "If a relation has (a,b) and (b,c), it must have (a,c) to be transitive — so I just need to check the pairs that are.' }
          ],
            remediations: { 'misconception-if-a-relation-has': { steps: ['Write the definition of transitivity on paper: ∀ a,b,c ∈ A, [(a,b) ∈ R ∧ (b,c) ∈ R] ⇒ (a,c) ∈ R.', 'Pick a small set A = {1,2} and a relation R = {(1,2), (2,1)}. List all 2³ = 8 triples (a,b,c).', 'Contrast with R = {(1,1), (2,2), (1,2), (2,1)}. Now the same triples give (1,1) ∈ R and (2,2) ∈ R — so transitive.', 'Revisit c11_math_cbse_02_003 (Relations: Definition and Representation) and c11_math_cbse_01_004 (Subsets) to reinforce.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_01_002', difficulty: 'standard',
          question: 'An equivalence relation on a set A is a relation R ⊆ A × A that satisfies three.',
          hint: 'If stuck, revisit c12_math_cbse_01_001 and practice verifying reflexivity, symmetry, and.',
          misconception: 'Students often believe that if a relation is symmetric and transitive, it must be reflexive.',
          parts: [
                { id: 'a', prompt: 'Consider the relation R on the set of integers Z defined by (a, b) ∈ R iff a − b is a multiple of 3. Is R an equivalence relation?', answer: 'Yes, R is an equivalence relation',
                  options: ['Yes, R is an equivalence relation', 'but cannot show the algebraic step for transitivity (e.g., just says', 'if a relation is symmetric and transitive, it must be reflexive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a relation is symmetric and transitive, it must be reflexive.' },
                { id: 'b', prompt: 'Let A = {1, 2, 3, 4, 5, 6}. Define R = {(a, b) ∈ A × A : |a − b| is even}. Determine whether R is an equivalence relation.', answer: 'R is an equivalence relation',
                  options: ['R is an equivalence relation', 'even difference', 'both even'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a relation is symmetric and transitive, it must be reflexive.' }
          ],
            remediations: { 'if-a-relation-is-symmetric': { steps: ['If a student cannot verify all three properties systematically, have them revisit c12_math_cbse_01_001 (Types of.', 'Then do a re-diagnostic: give them R = {(a,b) ∈ Z×Z : a ≡ b (mod 4)} and ask them to prove it is an equivalence.', 'If they still struggle, use the concrete partition {…,−4,0,4,…}, {…,−3,1,5,…}, {…,−2,2,6,…}, {…,−1,3,7,…} to visualize.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a relation is symmetric and transitive, it must be reflexive.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The relation R = {(1,2), (2,1)} on the set {1,2,3} is symmetric and transitive, so it must be reflexive by the following argument: since.', answer: 'The flaw is that transitivity only gives (1,1) and (2,2)',
                  options: ['The flaw is that transitivity only gives (1,1) and (2,2)', 'if a relation is symmetric and transitive, it must be reflexive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a relation is symmetric and transitive, it must be reflexive.' },
                { id: 'b', prompt: 'Construct an equivalence relation on the set A = {1, 2, 3, 4, 5, 6} that has exactly three equivalence classes, with class sizes 1, 2, and 3.', answer: 'One possible partition: {1}, {2, 3}, {4, 5, 6}',
                  options: ['One possible partition: {1}, {2, 3}, {4, 5, 6}', 'if a relation is symmetric and transitive, it must be reflexive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a relation is symmetric and transitive, it must be reflexive.' }
          ],
            remediations: { 'if-a-relation-is-symmetric': { steps: ['If a student cannot verify all three properties systematically, have them revisit c12_math_cbse_01_001 (Types of.', 'Then do a re-diagnostic: give them R = {(a,b) ∈ Z×Z : a ≡ b (mod 4)} and ask them to prove it is an equivalence.', 'If they still struggle, use the concrete partition {…,−4,0,4,…}, {…,−3,1,5,…}, {…,−2,2,6,…}, {…,−1,3,7,…} to visualize.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
