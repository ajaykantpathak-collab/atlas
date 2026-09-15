import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch02_p1: SimDef = {
    id: 'v3_c11_math_ch02_p1',
    title: 'Relations and Functions · Part 1/2',
    subtitle: 'Pair sets carefully — order inside the brackets is the whole meaning.',
    classLevel: 11, subject: 'mathematics', topic: 'Relations and Functions · Part 1/2',
    chapters: ['c11_math_ch02'],
    nodeIds: ['c11_math_cbse_02_001', 'c11_math_cbse_02_002', 'c11_math_cbse_02_003', 'c11_math_cbse_02_004', 'c11_math_cbse_02_005', 'c11_math_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a timetable designer pairing subjects with slots', intro: 'Three subjects, two teachers — how many assignments? The Cartesian product is the systematic way to count and name them all.', goal: 'Compute Cartesian products, respect ordered pairs, and use the cardinality and distributive rules.' },
    discovery: {
        question: 'A = {1, 2}, B = {3, 4}. Both A × B and B × A have four pairs — so they\'re equal?',
        options: ['No — pairs are ordered; (1, 3) and (3, 1) are different objects, so the products differ', 'Yes — sets don\'t care about order', 'Yes — cardinality equality is set equality', 'No — because 1 isn\'t in B'],
        answer: 'No — pairs are ordered; (1, 3) and (3, 1) are different objects, so the products differ',
        hook: 'The outer set is unordered, but each pair inside has a fixed first and second seat — (subject, teacher) is not (teacher, subject).',
    },
    teaching: [
        { title: 'Cartesian Product of Sets: Definition', text: 'The Cartesian product of two non-empty sets A and B, denoted by A × B, is the set of all ordered pairs (a, b) where a ∈ A and b ∈ B. Formally, A × B = {(a, b) : a ∈ A, b ∈ B}.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_02_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'List P × Q for small sets, recover A and B from a given product, and verify the distributive law A × (B ∪ C) by hand.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_001', title: 'Cartesian Product of Sets: Definition',
          scaffold: { problem: 'A school cafeteria offers 3 types of sandwiches {Veg, Chicken, Paneer} and 2 types of drinks {Juice, Soda}.',
            steps: [
            { text: 'Identify the two sets. Let S = {Veg, Chicken, Paneer} (sandwiches) and D = {Juice, Soda} (drinks).' },
            { text: 'Write the Cartesian product S × D systematically: fix first element, pair with all second elements.' },
            { text: 'Count the pairs: n(S) = 3, n(D) = 2, so n(S × D) = 3 × 2 = 6 combos.' },
            { text: 'New drink set D\' = {Juice, Soda, Water} with n(D\') = 3. New combos = n(S × D\') = 3 × 3 = 9.' },
            { text: 'Verify by listing: S × D\' has 9 pairs, the 3 new ones all have Water as drink.', faded: true, blankAnswer: 'S × D = {(Veg, Juice), (Veg, Soda), (Chicken, Juice).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_002', title: 'Cartesian Product: Properties and Examples',
          scaffold: { problem: 'A school offers 4 science subjects (Physics, Chemistry, Biology, Computer Science) and 3 time slots (Morning, Afternoon, Evening).',
            steps: [
            { text: 'Identify the sets: S = {P, C, B, CS} (4 subjects), T = {M, A, E} (3 time slots).' },
            { text: 'Identify the forbidden pairs: Biology in Evening means the pair (B, E) is not allowed.' },
            { text: 'Compute the allowed pairs as S × T minus the forbidden pairs: (S × T) \\ ({B} × {E}).' },
            { text: 'Use the property A × (B \\ C) = (A × B) \\ (A × C) with A = {B}, B = T, C = {E}.' },
            { text: 'Total allowed pairs = (total pairs) - (forbidden pairs) = 12 - 1 = 11.', faded: true, blankAnswer: '11 valid subject-time slot pairs.' }
            ] } },
        { type: 'case', nodeId: 'c11_math_cbse_02_005', title: 'Functions: Definition and Types',
          caseStudy: { intro: 'Imagine a school cafeteria where every student (set \\(A\\)) must be assigned exactly one lunch menu (set \\(B\\)) for the day—no student gets zero menus, and.',
            decisions: [{ prompt: 'State the precise condition that distinguishes a function from a general relation between two non-empty sets \\(A\\) and \\(B\\).', options: [
                { text: 'A relation \\(f \\subseteq A \\times B\\) is a function iff (i) \\(\\text{dom}(f) = A\\) (every', outcome: 'A relation \\(f \\subseteq A \\times B\\) is a function iff (i) \\(\\text{dom}(f) = A\\) (every element.' },
                { text: 'each element of \\(A\\) has an image', outcome: 'Not quite — Students often cancel common factors in a rational expression and declare the simplified expression.', reveals: 'students-often-cancel-common-factors' },
                { text: 'relation', outcome: 'Not quite — Students often cancel common factors in a rational expression and declare the simplified expression.', reveals: 'students-often-cancel-common-factors' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_006', title: 'Real-Valued Functions: Identity and Constant',
          scaffold: { problem: 'A taxi service in Delhi charges a flat booking fee of ₹50 plus ₹12 per kilometre. Write the total fare as a function of distance travelled.',
            steps: [
            { text: 'Identify the components: flat fee = ₹50 (does not depend on distance) → constant function C(d) = 50.' },
            { text: 'Write the total fare function F(d) = C(d) + V(d) = 50 + 12d, where d ≥ 0 (distance in km).' },
            { text: 'For d = 15 km, compute F(15) = 50 + 12(15) = 50 + 180 = ₹230.' },
            { text: 'For fare = ₹290, solve 50 + 12d = 290 → 12d = 240 → d = 20 km.' },
            { text: 'Verify: F(20) = 50 + 12(20) = 50 + 240 = 290 ✓. Interpret: constant part is fixed cost, identity part (scaled).', faded: true, blankAnswer: 'Fare function F(d) = 50 + 12d; for 15 km fare = ₹230; for.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_02_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a timetable pairing subjects with teachers, a teammate claims: \'A × B and B × A are the same since sets ignore order — (Math, Sharma) equals (Sharma, Math). And both have the same count anyway.\'',
            decisions: [{ prompt: 'Where does his reasoning fail?', options: [
                { text: 'Distinguish the pair from the product: each ordered pair has fixed positions — first from A, second from B — so (Math, Sharma) ≠ (Sharma, Math) as pairs, and A × B ≠ B × A unless A = B. Equal cardinality (n(A)·n(B) both ways) doesn\'t make the sets equal — the members differ. The unordered outer set isn\'t the ordered inner pairs.', outcome: 'He stops double-booking logic: order inside the pair encodes which slot is subject and which is teacher — commutativity fails even when counts match.' },
                { text: 'Accept the equality — both products have pq elements, so they\'re the same set.', outcome: 'Same size, different members: {(1,3),(2,4)} and {(3,1),(4,2)} share no pair — cardinality equality never implies set equality.', reveals: 'same-count-same-product' },
                { text: 'Write the pairs as {a, b} sets instead — braces are the standard set notation.', outcome: 'Braces declare order irrelevance — which is exactly what an ordered pair forbids; (a,b) and (b,a) collapse into one {a,b}.', reveals: 'ordered-pair-as-set' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'n(A × B) = n(A) × n(B) — multiplication, not addition; the product is a grid of pairs, not a merger of sets.',
            decisions: [{ prompt: 'What comes next? Relations and Functions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Relations and Functions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_02_001', difficulty: 'standard',
          question: 'The Cartesian product of two non-empty sets A and B, denoted by A × B, is the.',
          hint: 'If stuck, revisit Class 11 Chapter 1 (Sets) — specifically roster form, set-builder.',
          misconception: 'Students treat ordered pairs as unordered sets, writing {a, b} instead of (a, b), and consequently believe A × B =.',
          parts: [
                { id: 'a', prompt: 'If A = {a, b} and A × B = {(a, 1), (a, 2), (b, 1), (b, 2)}, find the set B. Explain how you determined B from the given Cartesian product.', answer: 'B = {1, 2}',
                  options: ['B = {1, 2}', 'sets don\'t care about order'],
                  hint: 'If stuck, revisit Class 11 Chapter 1 (Sets) — specifically roster form, set-builder notation, and.',
                  misconception: 'Students treat ordered pairs as unordered sets, writing {a, b} instead of (a, b), and consequently believe A × B = B × A always.' },
                { id: 'b', prompt: 'Let P = {2, 4, 6} and Q = {1, 3}. Find n(P × Q) and list all elements of P × Q. Then, if R = {2, 4, 6, 8}, find n(P × R) without listing all elements.', answer: 'P × Q = {(2, 1), (2, 3), (4, 1), (4, 3), (6, 1), (6, 3)}',
                  options: ['P × Q = {(2, 1), (2, 3), (4, 1), (4, 3), (6, 1), (6, 3)}', 'sets don\'t care about order'],
                  hint: 'If stuck, revisit Class 11 Chapter 1 (Sets) — specifically roster form, set-builder notation, and.',
                  misconception: 'Students treat ordered pairs as unordered sets, writing {a, b} instead of (a, b), and consequently believe A × B = B × A always.' },
                { id: 'c', prompt: 'Consider the statement: "For any two sets A and B, A × B = B × A." Is this statement true or false?', answer: 'The statement is false',
                  options: ['The statement is false', 'sets don\'t care about order'],
                  hint: 'If stuck, revisit Class 11 Chapter 1 (Sets) — specifically roster form, set-builder notation, and.',
                  misconception: 'Students treat ordered pairs as unordered sets, writing {a, b} instead of (a, b), and consequently believe A × B = B × A always.' }
          ],
            remediations: { 'students-treat-ordered-pairs-as': { steps: ['Have the student physically write ordered pairs as (first, second) with parentheses, not braces.', 'Use a concrete analogy: "Your address is (House Number, Street Name).', 'Make them list A × B and B × A side by side for A = {1}, B = {2} and circle the first elements: all first elements of.', 'Drill the definition: "In A × B, the first coordinate is ALWAYS from A, the second ALWAYS from B.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat ordered pairs as unordered sets, writing {a, b} instead of (a, b), and consequently believe A × B =.',
          parts: [
                { id: 'a', prompt: 'A student writes: "If A × B = {(1, 2), (1, 3), (2, 2), (2, 3)}, then A = {1, 2, 3} and B = {1, 2, 3}." Evaluate this claim.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'sets don\'t care about order'],
                  hint: 'If stuck, revisit Class 11 Chapter 1 (Sets) — specifically roster form, set-builder notation, and.',
                  misconception: 'Students treat ordered pairs as unordered sets, writing {a, b} instead of (a, b), and consequently believe A × B = B × A always.' },
                { id: 'b', prompt: 'Create a real-world scenario involving two finite sets (e.g., menu items and sizes, shirt colors and sizes) where the Cartesian product naturally models the.', answer: 'Example: A = {Small, Medium, Large} (sizes), B = {Red, Blue} (colors)',
                  options: ['Example: A = {Small, Medium, Large} (sizes), B = {Red, Blue} (colors)', 'sets don\'t care about order'],
                  hint: 'If stuck, revisit Class 11 Chapter 1 (Sets) — specifically roster form, set-builder notation, and.',
                  misconception: 'Students treat ordered pairs as unordered sets, writing {a, b} instead of (a, b), and consequently believe A × B = B × A always.' }
          ],
            remediations: { 'students-treat-ordered-pairs-as': { steps: ['Have the student physically write ordered pairs as (first, second) with parentheses, not braces.', 'Use a concrete analogy: "Your address is (House Number, Street Name).', 'Make them list A × B and B × A side by side for A = {1}, B = {2} and circle the first elements: all first elements of.', 'Drill the definition: "In A × B, the first coordinate is ALWAYS from A, the second ALWAYS from B.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_002', difficulty: 'standard',
          question: 'The Cartesian product of two non-empty sets A and B, denoted A × B, is the set.',
          hint: 'Review c11_math_cbse_02_001 for Cartesian product definition and c9_math_ch1_2 for.',
          misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).',
          parts: [
                { id: 'a', prompt: 'State the cardinality formula for the Cartesian product of two finite sets A and B. If n(A) = 5 and n(B) = 3, what is n(A × B)?', answer: 'The formula is n(A × B) = n(A) × n(B)',
                  options: ['The formula is n(A × B) = n(A) × n(B)', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Review c11_math_cbse_02_001 for Cartesian product definition and c9_math_ch1_2 for plotting ordered.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' },
                { id: 'b', prompt: 'Explain why A × B ≠ B × A in general, using the sets A = {1, 2} and B = {3, 4} as an illustration. Under what condition would A × B = B × A hold?', answer: 'A × B = {(1,3), (1,4), (2,3), (2,4)} while B × A = {(3,1), (3,2), (4,1), (4,2)}',
                  options: ['A × B = {(1,3), (1,4), (2,3), (2,4)} while B × A = {(3,1), (3,2), (4,1), (4,2)}', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Review c11_math_cbse_02_001 for Cartesian product definition and c9_math_ch1_2 for plotting ordered.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' },
                { id: 'c', prompt: 'Let A = {1, 2}, B = {2, 3}, C = {3, 4}. Compute A × (B ∪ C) and (A × B) ∪ (A × C) and verify they are equal.', answer: 'B ∪ C = {2, 3, 4}',
                  options: ['B ∪ C = {2, 3, 4}', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Review c11_math_cbse_02_001 for Cartesian product definition and c9_math_ch1_2 for plotting ordered.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' },
                { id: 'd', prompt: 'Given A × B = {(x, 1), (x, 2), (y, 1), (y, 2)}, find sets A and B. Now, if instead A × B = {(1, x), (1, y), (2, x), (2, y)}, what are A and B?', answer: 'First case: A = {x, y} (first elements), B = {1, 2} (second elements)',
                  options: ['First case: A = {x, y} (first elements), B = {1, 2} (second elements)', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Review c11_math_cbse_02_001 for Cartesian product definition and c9_math_ch1_2 for plotting ordered.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' }
          ],
            remediations: { 'cartesian-product-is-commutative-because': { steps: ['If a student asserts A × B = B × A, have them explicitly list both sets for A = {a, b}, B = {1, 2}.', 'Ask: "Is (a,1) the same ordered pair as (1,a)?', 'What does the definition of equality of ordered pairs require?" Guide them to see that (a,1) ∈ A×B but (a,1) ∉ B×A.', 'For distributive law errors, use Venn diagrams for sets and grid diagrams for Cartesian products: draw A on x-axis, B∪C.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_003', difficulty: 'standard',
          question: 'A relation R from a non-empty set A to a non-empty set B is a subset of the.',
          hint: 'If stuck, revisit c11_math_cbse_02_001 (Cartesian Product of Sets: Definition) and.',
          misconception: 'Students often confuse the codomain with the range, writing codomain = range even when some elements of B have.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian',
                  options: ['A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian', 'The Cartesian product of two non-empty sets A and B, denoted by A × B, is the set of all', 'The Cartesian product of two non-empty sets A and B, denoted A × B, is the set of all', 'For a relation R from a non-empty set A to a non-empty set B (i.e., R ⊆ A × B), the'],
                  hint: 'If stuck, revisit c11_math_cbse_02_001 (Cartesian Product of Sets: Definition) and practice listing.',
                  misconception: 'Students often confuse the codomain with the range, writing codomain = range even when some elements of B have no pre-image.' }
          ],
            remediations: { 'students-often-confuse-the-codomain': { steps: ['If a student confuses codomain and range: (1) Ask them to list all second elements of the ordered pairs in R – that.', '(2) Ask them to look at the original set B given in the problem – that is the codomain.', '(3) Have them check if every element of B appears as a second element; if not, range ⊂ codomain.', 'If they think every element of A must appear: (1) Remind them a relation is ANY subset of A × B, including the empty.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_004', difficulty: 'standard',
          question: 'For a relation R from a non-empty set A to a non-empty set B (i.e., R ⊆ A × B).',
          hint: 'If stuck, revisit c11_math_cbse_02_003 (Relations: Definition and Representation) and.',
          misconception: 'Students often think the domain of a relation R from A to B is always the whole set A, and the range is always the.',
          parts: [
                { id: 'a', prompt: 'Let A = {1,2,3}, B = {4,5,6,7}. Define R = {(1,4), (2,5), (3,4)}. A student claims the codomain of R is {4,5}. Why is this incorrect?', answer: 'The codomain is the entire set B = {4,5,6,7}, not just the elements that appear',
                  options: ['The codomain is the entire set B = {4,5,6,7}, not just the elements that appear', 'what appears', 'target set'],
                  hint: 'If stuck, revisit c11_math_cbse_02_003 (Relations: Definition and Representation) and practice.',
                  misconception: 'Students often think the domain of a relation R from A to B is always the whole set A, and the range is always the whole set B.' }
          ],
            remediations: { 'the-domain-of-a-relation': { steps: ['If a student makes this error, do the following: (1) Write the relation as a set of ordered pairs explicitly.', '(2) Circle all first elements — that set is the domain.', '(3) Circle all second elements — that set is the range.', '(4) Point to the original set B in the problem statement — that is the codomain.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_005', difficulty: 'standard',
          question: 'A function \\(f\\) from a non-empty set \\(A\\) to a non-empty set \\(B\\) is.',
          hint: 'If stuck, revisit c11_math_cbse_02_003 (Relations: Definition) and c11_math_cbse_02_004.',
          misconception: 'Students often cancel common factors in a rational expression and declare the simplified expression as the function.',
          parts: [
                { id: 'a', prompt: 'The relation \\(R = \\{(1,2), (2,3), (3,4), (2,5)\\}\\) is defined from \\(A = \\{1,2,3\\}\\) to \\(B = \\{2,3,4,5\\}\\).', answer: '\\(R\\) is not a function',
                  options: ['\\(R\\) is not a function', '2 has two images'],
                  hint: 'If stuck, revisit c11_math_cbse_02_003 (Relations: Definition) and c11_math_cbse_02_004 (Domain.',
                  misconception: 'Students often cancel common factors in a rational expression and declare the simplified expression as the function, forgetting to exclude.' },
                { id: 'b', prompt: 'Compare the functions \\(f(x) = |x|\\) and \\(g(x) = \\sqrt{x^2}\\) for \\(x \\in \\mathbb{R}\\). Are they the same function?', answer: 'Yes, they are the same function',
                  options: ['Yes, they are the same function', 'they are different'],
                  hint: 'If stuck, revisit c11_math_cbse_02_003 (Relations: Definition) and c11_math_cbse_02_004 (Domain.',
                  misconception: 'Students often cancel common factors in a rational expression and declare the simplified expression as the function, forgetting to exclude.' }
          ],
            remediations: { 'students-often-cancel-common-factors': { steps: ['Write the original function rule and explicitly find the values that make the denominator zero.', 'State the domain as \\(\\mathbb{R} \\setminus \\{\\text{those values}\\}\\).', 'Perform algebraic simplification only on the restricted domain.', 'Write the final answer as: "\\(f(x) = \\text{simplified expression}, \\text{ for } x \\in \\text{domain}\\)".'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_006', difficulty: 'standard',
          question: 'A real-valued function is a relation f from a non-empty set A ⊆ ℝ to a set B ⊆.',
          hint: 'If stuck, revisit c11_math_cbse_02_005 (function definition, domain, range) and.',
          misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.',
          parts: [
                { id: 'a', prompt: 'State the domain and range of the identity function f: ℝ → ℝ defined by f(x) = x and the constant function g: ℝ → ℝ defined by g(x) = 7.', answer: 'Domain of f = ℝ, Range of f = ℝ',
                  options: ['Domain of f = ℝ, Range of f = ℝ', 'a constant function can take multiple values'],
                  hint: 'If stuck, revisit c11_math_cbse_02_005 (function definition, domain, range) and c9_math_ch2_5.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' },
                { id: 'b', prompt: 'Let f(x) = x (identity) and g(x) = 3 (constant). Compute (f+g)(x), (f−g)(x), (f·g)(x), and (f/g)(x). State the domain of each resulting function.', answer: '(f+g)(x) = x+3, domain ℝ',
                  options: ['(f+g)(x) = x+3, domain ℝ', 'denominator ≠ 0'],
                  hint: 'If stuck, revisit c11_math_cbse_02_005 (function definition, domain, range) and c9_math_ch2_5.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' },
                { id: 'c', prompt: 'Consider the function h: ℝ → ℝ defined by h(x) = f(x) + g(x) where f is the identity function and g is the constant function 5. Is h one-one? Is h onto?', answer: 'h(x) = x+5',
                  options: ['h(x) = x+5', 'it\'s shifted up', 'it\'s not the identity'],
                  hint: 'If stuck, revisit c11_math_cbse_02_005 (function definition, domain, range) and c9_math_ch2_5.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' }
          ],
            remediations: { 'if-a-function-satisfies-f': { steps: ['If a student exhibits the fixed-point misconception: (1) Write the definition of identity function: f: ℝ→ℝ, f(x)=x.', 'Ask: "Is f(2)=2?" Compute f(2)=4.', '"Since 4≠2, f is not the identity function." (3) Explain: fixed points are where graph y=f(x) meets y=x; identity.', '(4) Practice: give 3 functions (x², x³, |x|, 2x) and ask which are identity.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
