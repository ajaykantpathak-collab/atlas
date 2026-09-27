import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch03_p1: SimDef = {
    id: 'v3_c11_app_ch03_p1',
    title: 'Sets · Part 1/2',
    subtitle: 'This node introduces the foundational concept of a "set" and the critical "well-defined".',
    classLevel: 11, subject: 'app', topic: 'Sets · Part 1/2',
    chapters: ['c11_app_ch03'],
    nodeIds: ['c11_app_cbse_03_001', 'c11_app_cbse_03_002', 'c11_app_cbse_03_003', 'c11_app_cbse_03_004', 'c11_app_cbse_03_005', 'c11_app_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Imagine you are the selector for the Indian cricket team. You have a clear rule: "players who scored 500.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'State the definition of a set as per the NCERT textbook and identify the two key adjectives used to describe the collection.',
        options: ['A set is a well-defined collection of distinct objects', 'a collection of objects', 'the set of all natural numbers'],
        answer: 'A set is a well-defined collection of distinct objects',
        hook: 'Students believe a collection must be **finite** or **listable** to be a set.',
    },
    teaching: [
        { title: 'Introduction', text: 'A set is a well-defined collection of distinct objects where the criterion for membership is precise enough that, for any given object, one can definitively determine whether it belongs to the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_app_cbse_03_001', title: 'Introduction',
          caseStudy: { intro: 'Imagine you are the selector for the Indian cricket team. You have a clear rule: "players who scored 500+ runs in the last Ranji season." This rule lets you.',
            decisions: [{ prompt: 'State the definition of a set as per the NCERT textbook and identify the two key adjectives used to describe the collection.', options: [
                { text: 'A set is a well-defined collection of distinct objects', outcome: 'A set is a well-defined collection of distinct objects. The two key adjectives are **well-defined**.' },
                { text: 'a collection of objects', outcome: 'Not quite — Students believe a collection must be **finite** or **listable** to be a set.', reveals: 'a-collection-must-be-finite' },
                { text: 'the set of all natural numbers', outcome: 'Not quite — Students believe a collection must be **finite** or **listable** to be a set.', reveals: 'a-collection-must-be-finite' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_03_002', title: 'What is a Set?',
          caseStudy: { intro: 'Start by asking: "Your cricket coach wants the list of all players who scored a century in the last tournament. Can you make that list?',
            decisions: [{ prompt: 'Which of the following collections is a set? Justify your answer in one sentence. (i) The collection of all prime numbers less than 20.', options: [
                { text: '(i) is a set because "prime number less than 20" is a precise mathematical property', outcome: '(i) is a set because "prime number less than 20" is a precise mathematical property — we can.' },
                { text: 'well-defined', outcome: 'Not quite — Students believe that **any collection described in words is a set**, especially if the description.', reveals: 'any-collection-described-in-words' },
                { text: 'the collection of all intelligent students', outcome: 'Not quite — Students believe that **any collection described in words is a set**, especially if the description.', reveals: 'any-collection-described-in-words' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_03_003', title: 'Representation of Sets',
          caseStudy: { intro: 'You\'re given a mystery box labeled "Prime numbers less than 20." How would you tell your friend exactly what\'s inside without opening it?',
            decisions: [{ prompt: 'Write the set A = {x : x ∈ ℕ and 2 ≤ x ≤ 7} in roster form.', options: [
                { text: 'A = {2, 3, 4, 5, 6, 7}', outcome: 'A = {2, 3, 4, 5, 6, 7}. A wrong answer like {2, 3, 4, 5, 6} or {1, 2, 3, 4, 5, 6, 7} reveals the.' },
                { text: 'The error: They treat', outcome: 'Not quite — Students believe that **ellipsis (...) in roster form can represent any infinite set**, e.g.', reveals: 'ellipsis' },
                { text: 'as a magical completion symbol', outcome: 'Not quite — Students believe that **ellipsis (...) in roster form can represent any infinite set**, e.g.', reveals: 'ellipsis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_03_005', title: 'Subsets',
          caseStudy: { intro: 'Start by asking: "If I tell you \'All cats are mammals\', which set is the subset — cats or mammals?" Let the student reason that the set of cats is contained.',
            decisions: [{ prompt: 'State the definition of A ⊆ B using the logical implication symbol (⇒). What are the two special subsets that every set has?', options: [
                { text: 'A ⊆ B ⇔ (∀x)(x ∈ A ⇒ x ∈ B)', outcome: 'A ⊆ B ⇔ (∀x)(x ∈ A ⇒ x ∈ B). The two special subsets are the empty set (∅ ⊆ A for every set A) and.' },
                { text: 'A ⊆ B means A is smaller than B', outcome: 'Not quite — Students systematically confuse **elementhood (∈)** with **subset (⊆)** when sets contain other.', reveals: 'students-systematically-confuse-elementhood-with' },
                { text: 'A ⊂ A is true (confusing ⊆ with ⊂)', outcome: 'Not quite — Students systematically confuse **elementhood (∈)** with **subset (⊆)** when sets contain other.', reveals: 'students-systematically-confuse-elementhood-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_03_005', title: 'Subsets',
          caseStudy: { intro: 'Start by asking: "If I tell you \'All cats are mammals\', which set is the subset — cats or mammals?" Let the student reason that the set of cats is contained.',
            decisions: [{ prompt: 'State the definition of A ⊆ B using the logical implication symbol (⇒). What are the two special subsets that every set has?', options: [
                { text: 'A ⊆ B ⇔ (∀x)(x ∈ A ⇒ x ∈ B)', outcome: 'A ⊆ B ⇔ (∀x)(x ∈ A ⇒ x ∈ B). The two special subsets are the empty set (∅ ⊆ A for every set A) and.' },
                { text: 'A ⊆ B means A is smaller than B', outcome: 'Not quite — Students systematically confuse **elementhood (∈)** with **subset (⊆)** when sets contain other.', reveals: 'students-systematically-confuse-elementhood-with' },
                { text: 'A ⊂ A is true (confusing ⊆ with ⊂)', outcome: 'Not quite — Students systematically confuse **elementhood (∈)** with **subset (⊆)** when sets contain other.', reveals: 'students-systematically-confuse-elementhood-with' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_app_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Sets · Part 1/2', spots: [
            { id: 's1', label: 'Introduction', prompt: 'Which idea is this? — A set is a well-defined collection of distinct objects where the criterion for membership.', answer: 'Introduction', options: ['Introduction', 'What is a Set', 'Representation of Sets', 'Types of Sets'] },
            { id: 's2', label: 'What is a Set', prompt: 'Which idea is this? — A set is a well-defined collection of distinct objects where the term "well-defined".', answer: 'What is a Set', options: ['What is a Set', 'Introduction', 'Representation of Sets', 'Types of Sets'] },
            { id: 's3', label: 'Representation of Sets', prompt: 'Which idea is this? — A set can be represented in two standard ways: (1) **Roster (Tabular) Form**, where all.', answer: 'Representation of Sets', options: ['Representation of Sets', 'Introduction', 'What is a Set', 'Types of Sets'] },
            { id: 's4', label: 'Types of Sets', prompt: 'Which idea is this? — A set is classified based on the number of elements it contains: an **empty set**.', answer: 'Types of Sets', options: ['Types of Sets', 'Introduction', 'What is a Set', 'Representation of Sets'] },
            { id: 's5', label: 'Subsets', prompt: 'Which idea is this? — Let A and B be two sets. A is called a subset of B, denoted by A ⊆ B, if every element.', answer: 'Subsets', options: ['Subsets', 'Introduction', 'What is a Set', 'Representation of Sets'] },
            { id: 's6', label: 'Power Set', prompt: 'Which idea is this? — The Power Set of a set A, denoted by P(A), is the set of all possible subsets of.', answer: 'Power Set', options: ['Power Set', 'Introduction', 'What is a Set', 'Representation of Sets'] }
          ] } },
        { type: 'case', nodeId: 'c11_app_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Sets like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Sets · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sets · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_03_001', difficulty: 'standard',
          question: 'A set is a well-defined collection of distinct objects where the criterion for.',
          hint: 'If stuck, review the concept of "well-definedness" by practicing with everyday.',
          misconception: 'Students believe a collection must be **finite** or **listable** to be a set.',
          parts: [
                { id: 'a', prompt: 'State the definition of a set as per the NCERT textbook and identify the two key adjectives used to describe the collection.', answer: 'A set is a well-defined collection of distinct objects',
                  options: ['A set is a well-defined collection of distinct objects', 'a collection of objects', 'the set of all natural numbers', 'we can\'t write them all'],
                  hint: 'If stuck, review the concept of "well-definedness" by practicing with everyday categories: "Is \'the.',
                  misconception: 'Students believe a collection must be **finite** or **listable** to be a set.' },
                { id: 'b', prompt: 'Given the set A = {x : x is a letter in the word "BANANA"}, write A in roster form and state the cardinal number n(A).', answer: 'A = {B, A, N} (distinct letters only)',
                  options: ['A = {B, A, N} (distinct letters only)', 'distinct', 'the set of all natural numbers', 'we can\'t write them all'],
                  hint: 'If stuck, review the concept of "well-definedness" by practicing with everyday categories: "Is \'the.',
                  misconception: 'Students believe a collection must be **finite** or **listable** to be a set.' }
          ],
            remediations: { 'a-collection-must-be-finite': { steps: ['Ask the student: "Can you write a Python function `is_member(x)` that returns True/False for your collection?" If they.', 'Show two collections: (a) {x : x is a prime number} and (b) {x : x is a "large" number}.', 'Have them test 5 numbers for each.', 'They will see (a) always gives a definite answer, (b) does not.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a collection must be **finite** or **listable** to be a set.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The collection of all real numbers between 0 and 1 is not a set because it has infinitely many elements and we cannot list them." Evaluate.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'the set of all natural numbers', 'we can\'t write them all', 'a collection must be **finite** or **listable** to be a set'],
                  hint: 'If stuck, review the concept of "well-definedness" by practicing with everyday categories: "Is \'the.',
                  misconception: 'Students believe a collection must be **finite** or **listable** to be a set.' }
          ],
            remediations: { 'a-collection-must-be-finite': { steps: ['Ask the student: "Can you write a Python function `is_member(x)` that returns True/False for your collection?" If they.', 'Show two collections: (a) {x : x is a prime number} and (b) {x : x is a "large" number}.', 'Have them test 5 numbers for each.', 'They will see (a) always gives a definite answer, (b) does not.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_03_002', difficulty: 'standard',
          question: 'A set is a well-defined collection of distinct objects where the term.',
          hint: 'If stuck, review the concept of a "well-defined rule" from the Introduction node.',
          misconception: 'Students believe that **any collection described in words is a set**, especially if the description sounds specific.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Let S be the set of all integers x such that x² < 10." Another student says: "That\'s not a set because it has infinite elements." Who.', answer: 'The first student is correct',
                  options: ['The first student is correct', 'well-defined', 'finite', 'the collection of all intelligent students'],
                  hint: 'If stuck, review the concept of a "well-defined rule" from the Introduction node.',
                  misconception: 'Students believe that **any collection described in words is a set**, especially if the description sounds specific (e.g., "the collection.' },
                { id: 'b', prompt: 'Let A = {x : x is a letter in the word "MATHEMATICS"}. Write A in roster form. Then state whether \'T\' ∈ A and \'Z\' ∈ A are true or false.', answer: 'A = {M, A, T, H, E, I, C, S}',
                  options: ['A = {M, A, T, H, E, I, C, S}', 'distinct', 'the collection of all intelligent students', 'the collection of all interesting books'],
                  hint: 'If stuck, review the concept of a "well-defined rule" from the Introduction node.',
                  misconception: 'Students believe that **any collection described in words is a set**, especially if the description sounds specific (e.g., "the collection.' },
                { id: 'c', prompt: 'Consider the collections: C₁ = {x : x ∈ ℕ and x is a factor of 12} C₂ = {x : x ∈ ℕ and x is a multiple of 12} C₃ = {x : x is a "large" natural number} Compare.', answer: 'C₁ and C₂ are sets',
                  options: ['C₁ and C₂ are sets', 'well-defined', 'the collection of all intelligent students', 'the collection of all interesting books'],
                  hint: 'If stuck, review the concept of a "well-defined rule" from the Introduction node.',
                  misconception: 'Students believe that **any collection described in words is a set**, especially if the description sounds specific (e.g., "the collection.' }
          ],
            remediations: { 'any-collection-described-in-words': { steps: ['Ask the student to write a precise yes/no question that would decide membership for their example (e.g., "Is the.', 'If they cannot write such a question without using vague words, have them replace the vague word with a measurable.', 'Practice with 5 collections: 3 sets (with clear rules) and 2 non-sets (with vague rules).', 'For each, the student must state the membership test in one sentence and say "set" or "not a set." 4.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_03_003', difficulty: 'standard',
          question: 'A set can be represented in two standard ways: (1) **Roster (Tabular) Form**.',
          hint: 'Review the definition of a set and the symbols ∈ / ∉ from the previous node.',
          misconception: 'Students believe that **ellipsis (...) in roster form can represent any infinite set**, e.g., writing {1, 2, 3, ...}.',
          parts: [
                { id: 'a', prompt: 'Write the set A = {x : x ∈ ℕ and 2 ≤ x ≤ 7} in roster form.', answer: 'A = {2, 3, 4, 5, 6, 7}',
                  options: ['A = {2, 3, 4, 5, 6, 7}', 'The error: They treat', 'as a magical completion symbol', '**ellipsis ('],
                  hint: 'Review the definition of a set and the symbols ∈ / ∉ from the previous node (c11_app_cbse_03_002).',
                  misconception: 'Students believe that **ellipsis (...) in roster form can represent any infinite set**, e.g., writing {1, 2, 3, ...} for ℕ is "fine" but.' },
                { id: 'b', prompt: 'A student writes the set of all even integers as E = {2, 4, 6, 8, ...}.', answer: 'The roster form {2, 4, 6, 8, ...} only shows positive even integers',
                  options: ['The roster form {2, 4, 6, 8, ...} only shows positive even integers', 'The error: They treat', 'as a magical completion symbol', 'accepts the ellipsis reveals the misconception that "'],
                  hint: 'Review the definition of a set and the symbols ∈ / ∉ from the previous node (c11_app_cbse_03_002).',
                  misconception: 'Students believe that **ellipsis (...) in roster form can represent any infinite set**, e.g., writing {1, 2, 3, ...} for ℕ is "fine" but.' },
                { id: 'c', prompt: 'Convert the set B = {1, 1/2, 1/3, 1/4, 1/5} into set-builder form.', answer: 'B = {x : x = 1/n, n ∈ ℕ, 1 ≤ n ≤ 5} or {1/n : n ∈ ℕ, n ≤ 5}',
                  options: ['B = {x : x = 1/n, n ∈ ℕ, 1 ≤ n ≤ 5} or {1/n : n ∈ ℕ, n ≤ 5}', 'The error: They treat', 'as a magical completion symbol', '**ellipsis ('],
                  hint: 'Review the definition of a set and the symbols ∈ / ∉ from the previous node (c11_app_cbse_03_002).',
                  misconception: 'Students believe that **ellipsis (...) in roster form can represent any infinite set**, e.g., writing {1, 2, 3, ...} for ℕ is "fine" but.' },
                { id: 'd', prompt: 'Compare the sets C = {x : x ∈ ℝ, x² = 4} and D = {x : x ∈ ℕ, x² = 4}. Are they equal? Justify.', answer: 'No, they are not equal',
                  options: ['No, they are not equal', 'The error: They treat', 'as a magical completion symbol', '**ellipsis ('],
                  hint: 'Review the definition of a set and the symbols ∈ / ∉ from the previous node (c11_app_cbse_03_002).',
                  misconception: 'Students believe that **ellipsis (...) in roster form can represent any infinite set**, e.g., writing {1, 2, 3, ...} for ℕ is "fine" but.' }
          ],
            remediations: { 'ellipsis': { steps: ['**Confront the ellipsis myth**: Show {1, 4, 9, 16, ...} and ask "Is 25 the next element?', 'How do you *know*?" Demonstrate two different formulas generating the same first 4 terms.', '**Domain drill**: Give 3 sets with identical condition but different domains: {x: x²=4, x∈ℕ}, {x: x²=4, x∈ℤ}, {x: x²=4.', 'Have student write each in roster form.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_03_004', difficulty: 'standard',
          question: 'A set is classified based on the number of elements it contains: an **empty.',
          hint: 'If stuck, review c11_app_cbse_03_003 (Representation of Sets) — practice converting.',
          misconception: '**Misconception: "The empty set ∅ is the same as \'nothing\', so it cannot be an element of another set."** Students.',
          parts: [
                { id: 'a', prompt: 'Explain why the set A = {x : x ∈ N, x < 1} is an empty set, but the set B = {x : x ∈ W, x < 1} is a singleton set.', answer: 'Correct answer: N (natural numbers) = {1, 2, 3, …} has no element < 1, so A = ∅',
                  options: ['Correct answer: N (natural numbers) = {1, 2, 3, …} has no element < 1, so A = ∅', 'empty set', 'singleton set', '"empty set" and "singleton set" are the same'],
                  hint: 'If stuck, review c11_app_cbse_03_003 (Representation of Sets) — practice converting between roster.',
                  misconception: '**Misconception: "The empty set ∅ is the same as \'nothing\', so it cannot be an element of another set."** Students treat ∅ as "absence of.' }
          ],
            remediations: { 'misconception-the-empty-set-is': { steps: ['**Concrete modelling**: Draw two boxes.', 'Ask: "How many boxes are in Box 2?" (One — Box 1).', '"So Box 2 contains an empty box — is Box 2 empty?" (No).', 'Map: Box 1 = ∅, Box 2 = {∅}.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_03_005', difficulty: 'standard',
          question: 'Let A and B be two sets. A is called a subset of B, denoted by A ⊆ B, if every.',
          hint: 'If stuck, review "Representation of Sets" (c11_app_cbse_03_003) to practice converting.',
          misconception: 'Students systematically confuse **elementhood (∈)** with **subset (⊆)** when sets contain other sets.',
          parts: [
                { id: 'a', prompt: 'State the definition of A ⊆ B using the logical implication symbol (⇒). What are the two special subsets that every set has?', answer: 'A ⊆ B ⇔ (∀x)(x ∈ A ⇒ x ∈ B)',
                  options: ['A ⊆ B ⇔ (∀x)(x ∈ A ⇒ x ∈ B)', 'A ⊆ B means A is smaller than B', 'A ⊂ A is true (confusing ⊆ with ⊂)'],
                  hint: 'If stuck, review "Representation of Sets" (c11_app_cbse_03_003) to practice converting between.',
                  misconception: 'Students systematically confuse **elementhood (∈)** with **subset (⊆)** when sets contain other sets.' },
                { id: 'b', prompt: 'Let A = {1, 2, {3, 4}, 5}. Determine whether each statement is true or false and explain why: (i) {3, 4} ⊆ A (ii) {{3, 4}} ⊆ A (iii) {1, {3, 4}} ⊆ A', answer: '(i) False — 3 ∈ {3,4} but 3 ∉ A (only {3,4} is in A)',
                  options: ['(i) False — 3 ∈ {3,4} but 3 ∉ A (only {3,4} is in A)', '(i) is true', 'A ⊂ A is true (confusing ⊆ with ⊂)'],
                  hint: 'If stuck, review "Representation of Sets" (c11_app_cbse_03_003) to practice converting between.',
                  misconception: 'Students systematically confuse **elementhood (∈)** with **subset (⊆)** when sets contain other sets.' },
                { id: 'c', prompt: 'Given sets X = {a, b, c} and Y = {a, b, c, d, e}, list all subsets of X that are also subsets of Y. How many are there?', answer: 'All subsets of X are also subsets of Y',
                  options: ['All subsets of X are also subsets of Y', 'subsets of Y instead, or miscounting', 'A ⊂ A is true (confusing ⊆ with ⊂)'],
                  hint: 'If stuck, review "Representation of Sets" (c11_app_cbse_03_003) to practice converting between.',
                  misconception: 'Students systematically confuse **elementhood (∈)** with **subset (⊆)** when sets contain other sets.' },
                { id: 'd', prompt: 'Let A = {x ∈ ℕ : x² - 5x + 6 = 0} and B = {2, 3, 4}. Is A ⊆ B? Is B ⊆ A? Is A = B? Justify each answer by explicitly listing elements.', answer: 'A = {x ∈ ℕ : x² - 5x + 6 = 0} = {x ∈ ℕ : (x-2)(x-3)=0} = {2, 3}',
                  options: ['A = {x ∈ ℕ : x² - 5x + 6 = 0} = {x ∈ ℕ : (x-2)(x-3)=0} = {2, 3}', 'they share elements', 'overlap', 'A ⊂ A is true (confusing ⊆ with ⊂)'],
                  hint: 'If stuck, review "Representation of Sets" (c11_app_cbse_03_003) to practice converting between.',
                  misconception: 'Students systematically confuse **elementhood (∈)** with **subset (⊆)** when sets contain other sets.' }
          ],
            remediations: { 'students-systematically-confuse-elementhood-with': { steps: ['**Re-teach the definition mechanically**: "To check A ⊆ B, list every element of A.', 'For each, ask: is this in B?', '**Use the "brace-counting" trick**: For {2,3} ⊆ A, the left set has *no outer braces* in the condition — we look.', 'For {{2,3}} ⊆ A, the left set *has outer braces* — we check if that whole thing is in A.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_03_006', difficulty: 'standard',
          question: 'The Power Set of a set A, denoted by P(A), is the set of all possible subsets.',
          hint: 'Review Subsets (c11_app_cbse_03_005) — specifically Illustration 6 in NCERT where A = {1.',
          misconception: 'Students consistently confuse **membership (∈)** with **inclusion (⊆)** when dealing with power sets.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Power Set of a set A, denoted by P(A), is the set of all possible subsets of A,',
                  options: ['The Power Set of a set A, denoted by P(A), is the set of all possible subsets of A,', 'A set is a well-defined collection of distinct objects where the criterion for membership', 'A set is a well-defined collection of distinct objects where the term "well-defined"', 'A set can be represented in two standard ways: (1) **Roster (Tabular) Form**, where all'],
                  hint: 'Review Subsets (c11_app_cbse_03_005) — specifically Illustration 6 in NCERT where A = {1, 2, 3.',
                  misconception: 'Students consistently confuse **membership (∈)** with **inclusion (⊆)** when dealing with power sets.' }
          ],
            remediations: { 'students-consistently-confuse-membership-with': { steps: ['Have the student physically write A = {1, 2} and P(A) = {φ, {1}, {2}, {1, 2}} on paper with **different colored pens**.', 'Ask: "Is {1} inside the blue braces? Yes → {1} ∈ P(A). Is {1} a blue-brace set? No, it\'s red-brace. So {1} ⊈ P(A)."', 'Now ask: "What *is* a subset of P(A)?" Guide them to pick two red-brace sets, e.g., {{1}, {2}}, and put blue braces.', 'Drill with 3 similar examples until they can distinguish ∈ vs ⊆ for P(A) without colors.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
