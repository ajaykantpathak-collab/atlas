import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch01_p1: SimDef = {
    id: 'v3_c11_math_ch01_p1',
    title: 'Sets · Part 1/3',
    subtitle: 'Learn why \'well-defined\' is the whole definition — and why {0} is never empty.',
    classLevel: 11, subject: 'mathematics', topic: 'Sets · Part 1/3',
    chapters: ['c11_math_ch01'],
    nodeIds: ['c11_math_cbse_01_001', 'c11_math_cbse_01_002', 'c11_math_cbse_01_003', 'c11_math_cbse_01_004', 'c11_math_cbse_01_005', 'c11_math_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a set-builder separating the countable from the uncountable', intro: '\'Students above 90%\' is a set; \'talented students\' is not — the difference is whether membership can be decided at all.', goal: 'Apply the well-defined criterion, distinct elements, and the empty/finite/infinite classification.' },
    discovery: {
        question: 'Is the collection of \'all tall students\' a set? Think carefully.',
        options: ['No — \'tall\' is not well-defined, so membership is ambiguous', 'Yes — any collection is a set', 'Yes — if the students agree', 'Only if you measure them first'],
        answer: 'No — \'tall\' is not well-defined, so membership is ambiguous',
        hook: 'Sets demand one ruthless rule: you must always be able to say yes or no. Vagueness is not allowed in.',
    },
    teaching: [
        { title: 'Introduction to Sets: Definition and Notation', text: 'A set is a well-defined collection of distinct objects, where "well-defined" means for any given object, we can definitively decide whether it belongs to the collection or not.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_01_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Classify {x² ≤ 4 over ℤ}, {x² = −1 over ℝ} and {multiples of 7} into empty, finite or infinite — then flip between roster and set-builder fluently.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_01_001', title: 'Introduction to Sets: Definition and Notation',
          caseStudy: { intro: 'Imagine you are the class representative tasked with creating a list of students who scored above 90% in the Class 10 board exams.',
            decisions: [{ prompt: 'Which of the following collections are sets? Justify your answer in one sentence each.', options: [
                { text: '(i) Yes — it is well-defined: we can objectively check if a month starts with J (January,', outcome: '(i) Yes — it is well-defined: we can objectively check if a month starts with J (January, June.' },
                { text: 'well-defined', outcome: 'Not quite — Students often write {1, 2, 2, 3} as a set, not realising elements must be distinct — repetition.', reveals: 'students-often-write-1' },
                { text: 'finite', outcome: 'Not quite — Students often write {1, 2, 2, 3} as a set, not realising elements must be distinct — repetition.', reveals: 'students-often-write-1' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_01_002', title: 'Types of Sets: Empty, Singleton, Finite, Infinite',
          caseStudy: { intro: 'Imagine you are asked to form a cricket team from your class: the set of all students who can bowl a perfect yorker might be empty (no one), the set of class.',
            decisions: [{ prompt: 'Write the definition of an empty set and give its two standard notations.', options: [
                { text: 'An empty set is a set that does not contain any element', outcome: 'An empty set is a set that does not contain any element. Its standard notations are φ (phi) and { }.' },
                { text: 'contains the empty set as an element', outcome: 'Not quite — Students often write {0} or {φ} when asked for the empty set, thinking "zero elements" means "the.', reveals: 'students-often-write-0-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_01_003', title: 'Equal and Equivalent Sets',
          caseStudy: { intro: 'Imagine two Class 11 students, Rohan and Priya, comparing their elective subject choices.',
            decisions: [{ prompt: 'State the precise definition of equal sets and equivalent sets for finite sets. Use mathematical notation (∈, n(A), etc.).', options: [
                { text: 'Equal sets: A = B ⇔ (∀x)(x ∈ A ⇔ x ∈ B)', outcome: 'Equal sets: A = B ⇔ (∀x)(x ∈ A ⇔ x ∈ B). Equivalent sets: A ~ B ⇔ n(A) = n(B).' },
                { text: 'equivalent means same elements', outcome: 'Not quite — Students often think "equivalent sets are equal sets" because they equate "same number of elements".', reveals: 'equivalent-sets-are-equal-sets' },
                { text: 'equal means same number of elements', outcome: 'Not quite — Students often think "equivalent sets are equal sets" because they equate "same number of elements".', reveals: 'equivalent-sets-are-equal-sets' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_005', title: 'Intervals as Subsets of Real Numbers',
          scaffold: { problem: 'A company\'s profit (in lakhs of rupees) in a quarter satisfies the inequality -2 ≤ P < 10.',
            steps: [
            { text: 'Identify the inequality: -2 ≤ P < 10. The variable is P (profit in lakhs).' },
            { text: 'Write interval notation: square bracket at -2, parenthesis at 10 → [-2, 10).' },
            { text: 'Write set-builder notation: {P ∈ R : -2 ≤ P < 10}.' },
            { text: 'Compute length: length = right endpoint - left endpoint = 10 - (-2) = 10 + 2 = 12 lakhs.' },
            { text: 'Interpret: The profit varies over an interval of length 12 lakh rupees, from a minimum loss of 2 lakhs (inclusive).', faded: true, blankAnswer: 'Interval: [-2, 10); Set-builder: {P ∈ R : -2 ≤ P < 10}.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_01_006', title: 'Power Set: Definition and Cardinality',
          scaffold: { problem: 'A school offers 3 elective subjects: Music (M), Art (A), Coding (C).',
            steps: [
            { text: 'Identify the set of electives: E = {M, A, C}. n(E) = 3.' },
            { text: 'Recall that each possible choice corresponds to a subset of E. The collection of all choices is P(E).' },
            { text: 'List subsets systematically by size:' },
            { text: 'Count subsets: 1 + 3 + 3 + 1 = 8.' },
            { text: 'Apply formula n(P(E)) = 2^{n(E)} = 2^3 = 8. Matches the count.', faded: true, blankAnswer: 'P(E) = {φ, {M}, {A}, {C}, {M, A}, {M, C}, {A, C}, {M,.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_01_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'As class representative you must compile \'the set of talented students\' for a honours list. A teammate writes {Ravi, Ravi, Meena} arguing order and repetition matter, and for the empty set writes {0} \'since it has zero elements.\'',
            decisions: [{ prompt: 'What does \'set\' demand that this list violates?', options: [
                { text: 'Fix the definition three ways: \'talented\' isn\'t well-defined — a set needs an objective yes/no membership test (e.g., \'scored above 90%\'), not subjective judgement. Repetition and order are noise: {Ravi, Ravi, Meena} = {Ravi, Meena}. And the empty set is φ or { } — {0} is a singleton containing zero, and {φ} is a singleton containing the empty set.', outcome: 'The list becomes a set: a precise defining property, distinct elements, order irrelevant — and \'no members\' written as φ, not {0}.' },
                { text: 'Keep \'talented students\' — everyone knows roughly who\'s talented.', outcome: '\'Roughly\' isn\'t membership: without a definitive yes/no criterion, it\'s a vague collection, not a set — the well-defined test is the entry ticket.', reveals: 'subjective-collections-are-sets' },
                { text: 'Accept {0} as the empty set — it literally contains \'zero\'.', outcome: 'That confuses the symbol with the count: {0} has ONE element (the number 0); the empty set has none, written φ or { }.', reveals: 'set-of-zero-is-empty' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Well-defined, ordered, unioned, intersected — you now speak the language all of modern math is written in.',
            decisions: [{ prompt: 'What comes next? Sets · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sets · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_01_001', difficulty: 'standard',
          question: 'A set is a well-defined collection of distinct objects, where "well-defined".',
          hint: 'If stuck, revisit Class 9 "Real Numbers" (c9_math_ch3_6) to review N, Z, Q, R definitions.',
          misconception: 'Students often write {1, 2, 2, 3} as a set, not realising elements must be distinct — repetition does not change the.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The set of all integers x such that x² = 4 is {2}." Explain why this answer is incomplete and write the correct set in both roster and.', answer: 'The equation x² = 4 has two integer solutions: x = 2 and x = -2',
                  options: ['The equation x² = 4 has two integer solutions: x = 2 and x = -2', 'well-defined'],
                  hint: 'If stuck, revisit Class 9 "Real Numbers" (c9_math_ch3_6) to review N, Z, Q, R definitions and Class.',
                  misconception: 'Students often write {1, 2, 2, 3} as a set, not realising elements must be distinct — repetition does not change the set.' },
                { id: 'b', prompt: 'Consider the sets: X = {x : x ∈ N and 2x - 1 = 0} and Y = {x : x ∈ Z and 2x - 1 = 0}. Are X and Y equal? Explain your reasoning by solving for x in each domain.', answer: 'Solving 2x - 1 = 0 gives x = 1/2',
                  options: ['Solving 2x - 1 = 0 gives x = 1/2', 'they are not equal'],
                  hint: 'If stuck, revisit Class 9 "Real Numbers" (c9_math_ch3_6) to review N, Z, Q, R definitions and Class.',
                  misconception: 'Students often write {1, 2, 2, 3} as a set, not realising elements must be distinct — repetition does not change the set.' }
          ],
            remediations: { 'students-often-write-1': { steps: ['If a student repeats elements or thinks order matters: (1) Show {1, 2, 2, 3} and {1, 2, 3} side by side; ask "Is 2.', 'Are they the same set?" (2) Have them list elements of {letters in "BANANA"} — they will write {B, A, N, A, N, A}, then.', '(3) For dummy variable confusion: write {x : x² = 4} = {2, -2} and ask "Is the letter \'x\' in this set?', 'What are the actual elements?" Emphasise: the variable after the colon is a placeholder, not a member.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_002', difficulty: 'standard',
          question: 'A set is classified by its cardinality (number of elements): an **empty set**.',
          hint: 'Revisit c11_math_cbse_01_001: practice converting between roster and set-builder forms.',
          misconception: 'Students often write {0} or {φ} when asked for the empty set, thinking "zero elements" means "the element 0" or "the.',
          parts: [
                { id: 'a', prompt: 'Write the definition of an empty set and give its two standard notations.', answer: 'An empty set is a set that does not contain any element',
                  options: ['An empty set is a set that does not contain any element', 'contains the empty set as an element'],
                  hint: 'Revisit c11_math_cbse_01_001: practice converting between roster and set-builder forms, and.',
                  misconception: 'Students often write {0} or {φ} when asked for the empty set, thinking "zero elements" means "the element 0" or "the element φ".' },
                { id: 'b', prompt: 'Explain why the set A = {x : x ∈ ℕ, x² = 4, x is odd} is an empty set, while B = {x : x ∈ ℕ, x² = 4} is a singleton set.', answer: 'For A: x² = 4 gives x = 2 or x = -2',
                  options: ['For A: x² = 4 gives x = 2 or x = -2', 'B is empty because -2 is excluded'],
                  hint: 'Revisit c11_math_cbse_01_001: practice converting between roster and set-builder forms, and.',
                  misconception: 'Students often write {0} or {φ} when asked for the empty set, thinking "zero elements" means "the element 0" or "the element φ".' }
          ],
            remediations: { 'students-often-write-0-or': { steps: ['Ask the student to list elements of {0}, {φ}, and φ explicitly: {0} has one element (0), {φ} has one element (the empty.', 'For singleton confusion: give {x : x²=4, x∈ℕ} → {2} (one element) vs {x : x²=4, x∈ℤ} → {2,-2} (two elements).', 'Emphasize: "singleton ⇔ exactly one element satisfies the condition in the given universe." 3.', 'For infinite sets: show that {x : x ∈ ℕ, x > 100} is infinite because for any candidate largest element n, n+1 is also.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_003', difficulty: 'standard',
          question: 'Two sets A and B are **equal** (denoted A = B) if they have exactly the same.',
          hint: 'Revisit c11_math_cbse_01_001 (set representation) and c11_math_cbse_01_002 (finite sets.',
          misconception: 'Students often think "equivalent sets are equal sets" because they equate "same number of elements" with "same.',
          parts: [
                { id: 'a', prompt: 'State the precise definition of equal sets and equivalent sets for finite sets. Use mathematical notation (∈, n(A), etc.).', answer: 'Equal sets: A = B ⇔ (∀x)(x ∈ A ⇔ x ∈ B)',
                  options: ['Equal sets: A = B ⇔ (∀x)(x ∈ A ⇔ x ∈ B)', 'equivalent means same elements', 'equal means same number of elements', 'equivalent sets are equal sets'],
                  hint: 'Revisit c11_math_cbse_01_001 (set representation) and c11_math_cbse_01_002 (finite sets and.',
                  misconception: 'Students often think "equivalent sets are equal sets" because they equate "same number of elements" with "same elements".' },
                { id: 'b', prompt: 'Explain why every pair of equal sets is equivalent, but not every pair of equivalent sets is equal. Give a concrete counterexample for the converse.', answer: 'If A = B, they have identical elements, so n(A) = n(B) ⇒ A ~ B',
                  options: ['If A = B, they have identical elements, so n(A) = n(B) ⇒ A ~ B', 'equivalent sets are equal sets', 'same number of elements', 'same elements'],
                  hint: 'Revisit c11_math_cbse_01_001 (set representation) and c11_math_cbse_01_002 (finite sets and.',
                  misconception: 'Students often think "equivalent sets are equal sets" because they equate "same number of elements" with "same elements".' },
                { id: 'c', prompt: 'Let A = {x : x is a letter in the word "BANANA"} and B = {x : x is a letter in the word "ANANAB"}. Are A and B equal? Are they equivalent? Show your working.', answer: 'A = {B, A, N} (distinct letters), B = {A, N, B} = {A, B, N}',
                  options: ['A = {B, A, N} (distinct letters), B = {A, N, B} = {A, B, N}', 'equivalent sets are equal sets', 'same number of elements', 'same elements'],
                  hint: 'Revisit c11_math_cbse_01_001 (set representation) and c11_math_cbse_01_002 (finite sets and.',
                  misconception: 'Students often think "equivalent sets are equal sets" because they equate "same number of elements" with "same elements".' },
                { id: 'd', prompt: 'Let P = {x ∈ ℕ : x² < 20} and Q = {x ∈ ℕ : x is a prime factor of 30}. Determine whether P and Q are equal, equivalent, both, or neither. Justify.', answer: 'P = {1,2,3,4} (since 4²=16<20, 5²=25>20)',
                  options: ['P = {1,2,3,4} (since 4²=16<20, 5²=25>20)', 'equivalent sets are equal sets', 'same number of elements', 'same elements'],
                  hint: 'Revisit c11_math_cbse_01_001 (set representation) and c11_math_cbse_01_002 (finite sets and.',
                  misconception: 'Students often think "equivalent sets are equal sets" because they equate "same number of elements" with "same elements".' }
          ],
            remediations: { 'equivalent-sets-are-equal-sets': { steps: ['Ask the student to write both sets in standard roster form with distinct elements only, ignoring order.', 'For equality: pick each element of A and physically check if it is in B; then do the reverse.', 'For equivalence: count the distinct elements in each set separately, then compare the two numbers.', 'Emphasise: "Same elements ⇒ same count (always).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "equivalent sets are equal sets" because they equate "same number of elements" with "same.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If n(A) = n(B) = 5, then A = B because both have 5 elements." Evaluate this claim and provide a correct statement with a counterexample.', answer: 'The claim is false',
                  options: ['The claim is false', 'If A = B then n(A) = n(B), but the converse is not true', 'equivalent sets are equal sets', 'same number of elements'],
                  hint: 'Revisit c11_math_cbse_01_001 (set representation) and c11_math_cbse_01_002 (finite sets and.',
                  misconception: 'Students often think "equivalent sets are equal sets" because they equate "same number of elements" with "same elements".' },
                { id: 'b', prompt: 'Construct two sets C and D, each with exactly 4 elements, such that C ~ D but C ≠ D. Use letters from the words "SCHOOL" and "COLLEGE" respectively.', answer: 'C = {S, C, H, O, L} from "SCHOOL" has 5 distinct letters',
                  options: ['C = {S, C, H, O, L} from "SCHOOL" has 5 distinct letters', 'equivalent sets are equal sets', 'same number of elements', 'same elements'],
                  hint: 'Revisit c11_math_cbse_01_001 (set representation) and c11_math_cbse_01_002 (finite sets and.',
                  misconception: 'Students often think "equivalent sets are equal sets" because they equate "same number of elements" with "same elements".' }
          ],
            remediations: { 'equivalent-sets-are-equal-sets': { steps: ['Ask the student to write both sets in standard roster form with distinct elements only, ignoring order.', 'For equality: pick each element of A and physically check if it is in B; then do the reverse.', 'For equivalence: count the distinct elements in each set separately, then compare the two numbers.', 'Emphasise: "Same elements ⇒ same count (always).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_004', difficulty: 'standard',
          question: 'A set A is a subset of set B, denoted A ⊂ B, if and only if every element of.',
          hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation, ∈/∉, roster/set-builder forms) and.',
          misconception: 'Students often confuse "⊂" (subset) with "∈" (element of). For example, given A = {1, {2, 3}}, they write {2, 3} ⊂.',
          parts: [
                { id: 'a', prompt: 'Let A = {1, 2} and B = {1, 2, 3}. Is A ⊂ B? Is B ⊂ A? Is A a proper subset of B? Justify each answer using the definition.', answer: 'A ⊂ B is true because 1 ∈ A ⇒ 1 ∈ B and 2 ∈ A ⇒ 2 ∈ B',
                  options: ['A ⊂ B is true because 1 ∈ A ⇒ 1 ∈ B and 2 ∈ A ⇒ 2 ∈ B', 'B ⊂ A because B has more elements'],
                  hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation, ∈/∉, roster/set-builder forms) and practice.',
                  misconception: 'Students often confuse "⊂" (subset) with "∈" (element of). For example, given A = {1, {2, 3}}, they write {2, 3} ⊂ A because they see 2 and.' },
                { id: 'b', prompt: 'Consider the statement: "For any sets A, B, C, if A ⊂ B and B ⊂ C, then A ⊂ C." Is this always true? Prove your answer or give a counterexample.', answer: 'Yes, always true',
                  options: ['Yes, always true', 'false, counterexample: A={1}, B={1,2}, C={2,3}'],
                  hint: 'If stuck, revisit c11_math_cbse_01_001 (set notation, ∈/∉, roster/set-builder forms) and practice.',
                  misconception: 'Students often confuse "⊂" (subset) with "∈" (element of). For example, given A = {1, {2, 3}}, they write {2, 3} ⊂ A because they see 2 and.' }
          ],
            remediations: { 'students-often-confuse-subset-with': { steps: ['If a student confuses ⊂ and ∈, do this 3-step remediation: (1) Write the definition side-by-side: "x ∈ A means x is one.', 'Is {2, 3} ⊂ A?" Force them to check each element of {2, 3} against A\'s elements.', '(3) Give 5 rapid-fire true/false: {a} ⊂ {a, b}, {a} ∈ {a, b}, φ ⊂ {a}, φ ∈ {a}, {φ} ⊂ {φ, a}.', 'Discuss each until the distinction is automatic.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_005', difficulty: 'standard',
          question: 'An interval is a subset of the real numbers R consisting of all real numbers.',
          hint: 'If stuck, revisit Class 9 Number Line (c9_math_ch1_1) and Class 9 Real Numbers.',
          misconception: 'Students often treat ∞ as a number and write [-∞, 5] or [2, ∞] using square brackets.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An interval is a subset of the real numbers R consisting of all real numbers lying',
                  options: ['An interval is a subset of the real numbers R consisting of all real numbers lying', 'A set is a well-defined collection of distinct objects, where "well-defined" means for', 'A set is classified by its cardinality (number of elements): an **empty set** (denoted φ', 'Two sets A and B are **equal** (denoted A = B) if they have exactly the same elements,'],
                  hint: 'If stuck, revisit Class 9 Number Line (c9_math_ch1_1) and Class 9 Real Numbers (c9_math_ch3_6).',
                  misconception: 'Students often treat ∞ as a number and write [-∞, 5] or [2, ∞] using square brackets.' }
          ],
            remediations: { 'students-often-treat-as-a': { steps: ['If a student writes [-∞, 5], explicitly state: "∞ is not a real number; it is a concept of unboundedness.', 'Parentheses are mandatory at ∞ or -∞ because you cannot include something that is not a number." For length errors.', 'Only works when both endpoints are real numbers.', 'If either is ∞, length is infinite/undefined." Practice: give 5 conversions where they must say "length = b - a".'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_01_006', difficulty: 'standard',
          question: 'The power set of a set A, denoted by P(A), is the set of all subsets of.',
          hint: 'If stuck, revisit "Subsets: Definition and Proper Subsets" (c11_math_cbse_01_004) and.',
          misconception: 'Students often confuse the element-of relation (∈) with the subset-of relation (⊂) when writing power sets.',
          parts: [
                { id: 'a', prompt: 'What is the power set of A = {a, b}? Write it in roster form and state its cardinality.', answer: 'P(A) = {φ, {a}, {b}, {a, b}} and n(P(A)) = 4 = 2^2',
                  options: ['P(A) = {φ, {a}, {b}, {a, b}} and n(P(A)) = 4 = 2^2', 'the empty set is not a subset, or forgets that φ is a subset of every set'],
                  hint: 'If stuck, revisit "Subsets: Definition and Proper Subsets" (c11_math_cbse_01_004) and practice.',
                  misconception: 'Students often confuse the element-of relation (∈) with the subset-of relation (⊂) when writing power sets.' }
          ],
            remediations: { 'students-often-confuse-the-element': { steps: ['If a student makes the ∈ vs ⊂ confusion, do this remediation: 1.', 'Ask: "Is 1 a subset of {1, 2}?" (No, 1 is an element.', 'Show: P(A) is a set of sets.', 'Every member must be written with braces.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
