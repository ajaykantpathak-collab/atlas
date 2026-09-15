import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch01_p2: SimDef = {
    id: 'v3_c12_math_ch01_p2',
    title: 'Relations and Functions · Part 2/2',
    subtitle: 'Birth-month grouping passes all three tests — that\'s equivalence',
    classLevel: 12, subject: 'mathematics', topic: 'Relations and Functions · Part 2/2',
    chapters: ['c12_math_ch01'],
    nodeIds: ['c12_math_cbse_01_007', 'c12_math_cbse_01_008', 'c12_math_cbse_01_009', 'c12_math_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Relation verifier', intro: 'A fair grouping rule turns out to be a precise mathematical object — three properties decide everything.', goal: 'Verify reflexive, symmetric and transitive properties — counterexamples to disprove, universal arguments to prove.' },
    discovery: {
        question: 'Group students by birth month for relay teams — is that a fair mathematical grouping? What three tests does it quietly pass?',
        options: ['Reflexive (everyone groups with self), symmetric (A with B means B with A), transitive (A-B and B-C force A-C) — an equivalence relation', 'Only symmetry matters', 'Just pairing', 'Any grouping works'],
        answer: 'Reflexive (everyone groups with self), symmetric (A with B means B with A), transitive (A-B and B-C force A-C) — an equivalence relation',
        hook: 'One counterexample kills a property — \'most pairs work\' isn\'t a proof; but proving one requires the universal \'for all a\' argument, not spot-checks. And x ≤ y² fails symmetry because squaring isn\'t order-preserving — nonlinearity breaks what intuition assumed.',
    },
    teaching: [
        { title: 'Inverse of a Function: Definition', text: 'A function \\( f: X \\to Y \\) is said to be **invertible** if there exists a function \\( g: Y \\to X \\) such that \\( g \\circ f = I_X \\) and \\( f \\circ g = I_Y \\), where \\( I_X \\) and \\( I_Y \\) are.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_01_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Test relations like a verifier: check reflexive, symmetric, transitive on a pair-set, catch the single counterexample that breaks transitivity, and write the \'for all\' language boards demand.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_01_007', title: 'Inverse of a Function: Definition',
          scaffold: { problem: 'The temperature in a laboratory is recorded in Celsius. The conversion to Fahrenheit is given by the function \\( f: \\mathbb{R} \\to.',
            steps: [
            { text: 'Check if \\( f \\) is invertible. \\( f \\) is linear with slope \\( 9/5 \\neq 0 \\), so it is strictly increasing, hence.' },
            { text: 'Set \\( F = f(C) = \\frac{9}{5}C + 32 \\).' },
            { text: 'Solve for \\( C \\): Subtract 32: \\( F - 32 = \\frac{9}{5}C \\). Multiply by \\( \\frac{5}{9} \\): \\( C = \\frac{5}{9}(F - 32).' },
            { text: 'Write the inverse function: \\( f^{-1}(F) = \\frac{5}{9}(F - 32) \\).' },
            { text: 'Verify: \\( f^{-1}(f(C)) = \\frac{5}{9}\\left(\\frac{9}{5}C + 32 - 32\\right) = \\frac{5}{9} \\cdot \\frac{9}{5}C = C \\).', faded: true, blankAnswer: '\\( f^{-1}(x) = \\frac{5}{9}(x - 32) \\) (or \\( f^{-1}(F).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_01_008', title: 'Binary Operations: Definition and Examples',
          scaffold: { problem: 'Determine whether the rule \\( * \\) defined on the set of natural numbers \\( \\mathbb{N} = \\{1,2,3,\\dots\\} \\) by \\( a * b = a^b \\) (a raised.',
            steps: [
            { text: 'Identify the set \\( S = \\mathbb{N} \\) (natural numbers starting from 1).' },
            { text: 'The rule is \\( a * b = a^b \\) for any \\( a,b \\in \\mathbb{N} \\).' },
            { text: 'Check closure: For any \\( a,b \\in \\mathbb{N} \\), \\( a^b \\) is a positive integer (since a positive integer raised to.' },
            { text: 'Check well‑definedness: For each ordered pair \\( (a,b) \\), the value \\( a^b \\) is uniquely determined (exponentiation.' },
            { text: 'Both conditions hold, so \\( * \\) is a binary operation on \\( \\mathbb{N} \\).', faded: true, blankAnswer: 'Yes, \\( * \\) is a binary operation on \\( \\mathbb{N} \\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_01_009', title: 'Properties of Binary Operations: Commutative, Associative',
          scaffold: { problem: 'Let * be the binary operation on ℚ (the set of rational numbers) defined by a * b = a + b - ab.',
            steps: [
            { text: 'Write down the definition of commutativity for this operation: we need to check if a * b = b * a for all a, b ∈ ℚ.' },
            { text: 'Compute a * b using the given rule: a * b = a + b - ab.' },
            { text: 'Compute b * a using the same rule: b * a = b + a - ba.' },
            { text: 'Since addition and multiplication are commutative in ℚ, a + b = b + a and ab = ba.' },
            { text: 'Now check associativity: we need (a * b) * c = a * (b * c) for all a, b, c ∈ ℚ.' },
            { text: 'Compute (a * b) * c. First, a * b = a + b - ab. Then (a * b) * c = (a + b - ab) * c = (a + b - ab) + c - (a + b - ab)c.' },
            { text: 'Compute a * (b * c). First, b * c = b + c - bc. Then a * (b * c) = a * (b + c - bc) = a + (b + c - bc) - a(b + c - bc).' },
            { text: 'Compare the two expressions: (a * b) * c = a + b + c - ab - ac - bc + abc, and a * (b * c) = a + b + c - ab - ac -.', faded: true, blankAnswer: 'The operation * is both commutative and associative on ℚ.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_01_010', title: 'Identity and Inverse Elements in Binary Operations',
          scaffold: { problem: 'A binary operation \\(*\\) is defined on the set of rational numbers \\(\\mathbb{Q}\\) by \\(a * b = a + b - ab\\).',
            steps: [
            { text: 'Let \\(e\\) be the identity. By definition, \\(a * e = a\\) for all \\(a \\in \\mathbb{Q}\\).' },
            { text: 'Simplify: \\(e - ae = 0 \\Rightarrow e(1 - a) = 0\\). This must hold for **all** \\(a \\in \\mathbb{Q}\\).' },
            { text: 'Verify \\(e * a = a\\): \\(0 * a = 0 + a - 0\\cdot a = a\\). So identity \\(e = 0\\).' },
            { text: 'Find inverse of \\(\\frac{1}{2}\\). Let \\(b\\) be the inverse. Then \\(\\frac{1}{2} * b = 0 \\Rightarrow \\frac{1}{2} +.' },
            { text: 'Solve: \\(\\frac{1}{2} + \\frac{1}{2}b = 0 \\Rightarrow \\frac{1}{2}b = -\\frac{1}{2} \\Rightarrow b = -1\\).' },
            { text: 'Verify \\(b * \\frac{1}{2} = 0\\): \\((-1) * \\frac{1}{2} = -1 + \\frac{1}{2} - (-1)\\cdot\\frac{1}{2} = -\\frac{1}{2}.', faded: true, blankAnswer: 'Identity element \\(e = 0\\); inverse of \\(\\frac{1}{2}\\).' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_01_010', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a hostel tournament, the warden proposes grouping students by \'shares a hobby with\' — anyone linked to anyone in a team joins that team. A teammate warns the grouping might leak: A bonds with B over chess, B with C over cricket, but A and C share nothing.',
            decisions: [{ prompt: 'Is \'shares a hobby with\' an equivalence relation that partitions the hostel cleanly?', options: [
                { text: 'No — it\'s reflexive and symmetric but fails transitivity: A shares with B and B with C doesn\'t force A to share with C, so \'teams\' can overlap and the same student lands in two groups; a clean partition needs all three properties.', outcome: 'The chapter\'s test: only when reflexive + symmetric + transitive all hold does a relation split a set into disjoint classes — \'linked by\' without transitivity gives webs, not teams.' },
                { text: 'Yes — sharing is mutual, and that\'s what equivalence needs.', outcome: 'Symmetry is only one of the three conditions; without transitivity the \'groups\' chain out through middle links until nobody inside a team actually shares anything.', reveals: 'mutual-equals-equivalence' },
                { text: 'Yes — because everyone shares a hobby with themselves, the relation is grounded.', outcome: 'Reflexivity alone never partitions anything; every \'sharing\' relation on people is reflexive and symmetric by default, so the deciding test is the transitive one this grouping fails.', reveals: 'reflexive-is-enough' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'You can now prove or disprove a relation\'s properties — one counterexample to kill, a universal argument to keep.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_01_007', difficulty: 'standard',
          question: 'A function \\( f: X \\to Y \\) is said to be **invertible** if there exists.',
          hint: 'Revisit nodes c12_math_cbse_01_003 (one‑one), c12_math_cbse_01_004 (onto).',
          misconception: 'The most persistent error is confusing the notation \\( f^{-1}(x) \\) with the reciprocal \\( \\frac{1}{f(x)} \\).',
          parts: [
                { id: 'a', prompt: 'Explain why the function \\( f: \\mathbb{R} \\to \\mathbb{R} \\) defined by \\( f(x) = x^2 \\) is NOT invertible, but the function \\( g: [0, \\infty) \\to [0, \\infty).', answer: '\\( f(x) = x^2 \\) on \\( \\mathbb{R} \\) is not one‑one',
                  options: ['\\( f(x) = x^2 \\) on \\( \\mathbb{R} \\) is not one‑one', 'domain change'],
                  hint: 'Revisit nodes c12_math_cbse_01_003 (one‑one), c12_math_cbse_01_004 (onto), c12_math_cbse_01_005.',
                  misconception: 'The most persistent error is confusing the notation \\( f^{-1}(x) \\) with the reciprocal \\( \\frac{1}{f(x)} \\).' },
                { id: 'b', prompt: 'Consider the functions \\( f_1: \\mathbb{R} \\to \\mathbb{R}, f_1(x) = 2x+3 \\) and \\( f_2: \\mathbb{R} \\to \\mathbb{R}, f_2(x) = x^3 - x \\).', answer: '\\( f_1(x) = 2x+3 \\) is a linear function with non‑zero slope (2)',
                  options: ['\\( f_1(x) = 2x+3 \\) is a linear function with non‑zero slope (2)', 'polynomials', 'cubics are always onto'],
                  hint: 'Revisit nodes c12_math_cbse_01_003 (one‑one), c12_math_cbse_01_004 (onto), c12_math_cbse_01_005.',
                  misconception: 'The most persistent error is confusing the notation \\( f^{-1}(x) \\) with the reciprocal \\( \\frac{1}{f(x)} \\).' }
          ],
            remediations: { 'the-most-persistent-error-is': { steps: ['If a student confuses \\( f^{-1} \\) with reciprocal, immediately contrast the two notations: \\( f^{-1}(x) \\) means "the.', 'Use a simple example: \\( f(x) = 2x \\), then \\( f^{-1}(x) = x/2 \\) but \\( 1/f(x) = 1/(2x) \\).', 'Show that \\( f^{-1}(f(3)) = 3 \\) while \\( 1/f(3) = 1/6 \\).', 'For algebraic slips in solving for \\( x \\), enforce a step‑by‑step checklist: (1) write \\( y = f(x) \\), (2) perform the.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_01_008', difficulty: 'standard',
          question: 'A binary operation on a non-empty set \\( S \\) is a function \\( * : S \\times.',
          hint: 'If stuck, revisit the definition of a function (c11_math_cbse_02_005) and practice.',
          misconception: 'Students often think **any** rule involving two numbers is a binary operation, ignoring the closure requirement.',
          parts: [
                { id: 'a', prompt: 'Determine whether the rule \\( * \\) defined on \\( \\mathbb{Z} \\) by \\( a * b = a + b - ab \\) is a binary operation. Show your reasoning step by step.', answer: '**Step 1:** Take arbitrary \\( a,b \\in \\mathbb{Z} \\)',
                  options: ['**Step 1:** Take arbitrary \\( a,b \\in \\mathbb{Z} \\)', 'it\'s not closed because of subtraction'],
                  hint: 'If stuck, revisit the definition of a function (c11_math_cbse_02_005) and practice determining if.',
                  misconception: 'Students often think **any** rule involving two numbers is a binary operation, ignoring the closure requirement.' },
                { id: 'b', prompt: 'Compare the binary operations \\( *_1 \\) and \\( *_2 \\) on \\( \\mathbb{R} \\) defined by \\( a *_1 b = a+b \\) and \\( a *_2 b = a+b+1 \\).', answer: 'They are **different** operations',
                  options: ['They are **different** operations', 'they are the same'],
                  hint: 'If stuck, revisit the definition of a function (c11_math_cbse_02_005) and practice determining if.',
                  misconception: 'Students often think **any** rule involving two numbers is a binary operation, ignoring the closure requirement.' }
          ],
            remediations: { 'any-rule-involving-two-numbers': { steps: ['Revisit the definition: "A binary operation on \\( S \\) is a function \\( * : S \\times S \\to S \\)." 2.', 'Practice the **closure test** on the four standard sets (\\( \\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}, \\mathbb{R} \\)) with the.', 'Make a 4×4 table: for each set and operation, find a counterexample if it fails, or prove closure if it holds.', 'Specifically, test subtraction on \\( \\mathbb{N} \\), division on \\( \\mathbb{Z} \\), and division on \\( \\mathbb{Q} \\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **any** rule involving two numbers is a binary operation, ignoring the closure requirement.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Division is a binary operation on the set of non-zero rational numbers \\( \\mathbb{Q}^* \\)." Is the student correct? Justify.', answer: '**Yes**, the student is correct',
                  options: ['**Yes**, the student is correct', 'division is not a binary operation'],
                  hint: 'If stuck, revisit the definition of a function (c11_math_cbse_02_005) and practice determining if.',
                  misconception: 'Students often think **any** rule involving two numbers is a binary operation, ignoring the closure requirement.' }
          ],
            remediations: { 'any-rule-involving-two-numbers': { steps: ['Revisit the definition: "A binary operation on \\( S \\) is a function \\( * : S \\times S \\to S \\)." 2.', 'Practice the **closure test** on the four standard sets (\\( \\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}, \\mathbb{R} \\)) with the.', 'Make a 4×4 table: for each set and operation, find a counterexample if it fails, or prove closure if it holds.', 'Specifically, test subtraction on \\( \\mathbb{N} \\), division on \\( \\mathbb{Z} \\), and division on \\( \\mathbb{Q} \\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_01_009', difficulty: 'standard',
          question: 'A binary operation * on a set S is **commutative** if a * b = b * a for every.',
          hint: 'If stuck on quantifiers, revisit c11_math_cbse_14_007 (Quantifiers: For All, There.',
          misconception: '**Misconception 1:** "If a * b = b * a for a few pairs, the operation is commutative." Reality: Commutativity requires.',
          parts: [
                { id: 'a', prompt: 'Consider the binary operation * on ℤ defined by a * b = a - b. Is * commutative? Justify your answer with a specific counterexample.', answer: 'No, * is not commutative',
                  options: ['No, * is not commutative', 'it is commutative'],
                  hint: 'If stuck on quantifiers, revisit c11_math_cbse_14_007 (Quantifiers: For All, There Exists) —.',
                  misconception: '**Misconception 1:** "If a * b = b * a for a few pairs, the operation is commutative." Reality: Commutativity requires a * b = b * a for.' },
                { id: 'b', prompt: 'Let * be the binary operation on ℕ defined by a * b = a^b (a raised to power b). Check whether * is associative. Show all steps for a = 2, b = 3, c = 2.', answer: 'Compute (2 * 3) * 2 = (2^3) * 2 = 8 * 2 = 8^2 = 64',
                  options: ['Compute (2 * 3) * 2 = (2^3) * 2 = 8 * 2 = 8^2 = 64', '(a^b)^c = a^(bc) and a^(b^c) = a^(bc), so they are equal'],
                  hint: 'If stuck on quantifiers, revisit c11_math_cbse_14_007 (Quantifiers: For All, There Exists) —.',
                  misconception: '**Misconception 1:** "If a * b = b * a for a few pairs, the operation is commutative." Reality: Commutativity requires a * b = b * a for.' }
          ],
            remediations: { 'misconception-1-if-a-b': { steps: ['If a student cannot distinguish "for all" from "there exists" in the definition: 1.', 'Revisit c7_math_ch02_010 (Properties of Operations: Commutativity and Associativity) — this Class 7 node introduces the.', 'Do a focused exercise: For the operation a * b = a + 2b on ℤ, test commutativity with (1,2), (2,1), (0,5), (5,0).', 'Write each computation explicitly.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_01_010', difficulty: 'standard',
          question: 'For a binary operation \\(*\\) on a set \\(S\\), an element \\(e \\in S\\) is called.',
          hint: 'If stuck, revisit solving equations of the form \\(a * x = c\\) for \\(x\\) where \\(*\\) is.',
          misconception: 'Students often assume the identity element is always \\(0\\) (for addition-like operations) or \\(1\\) (for.',
          parts: [
                { id: 'a', prompt: 'For the binary operation \\(a * b = a + b + ab\\) on the set \\(\\mathbb{Q} \\setminus \\{-1\\}\\), a student claims the identity element is \\(0\\) because \\(a * 0 =.', answer: 'The reasoning is incomplete',
                  options: ['The reasoning is incomplete', 'yes, it\'s complete'],
                  hint: 'If stuck, revisit solving equations of the form \\(a * x = c\\) for \\(x\\) where \\(*\\) is a custom.',
                  misconception: 'Students often assume the identity element is always \\(0\\) (for addition-like operations) or \\(1\\) (for multiplication-like operations).' },
                { id: 'b', prompt: 'Consider the binary operation \\(*\\) on the set \\(S = \\{1, 2, 3, 4\\}\\) given by the following Cayley table: \\[ \\begin{array}{c|cccc} * & 1 & 2 & 3 & 4 \\\\ \\hline.', answer: '**Identity:** Look for a row and column that match the header row/column exactly',
                  options: ['**Identity:** Look for a row and column that match the header row/column exactly', 'gives different inverses (e'],
                  hint: 'If stuck, revisit solving equations of the form \\(a * x = c\\) for \\(x\\) where \\(*\\) is a custom.',
                  misconception: 'Students often assume the identity element is always \\(0\\) (for addition-like operations) or \\(1\\) (for multiplication-like operations).' }
          ],
            remediations: { 'the-identity-element-is-always': { steps: ['Revisit **c12_math_cbse_01_008** (Binary Operations: Definition and Examples) to practice evaluating custom operations.', 'Revisit **c12_math_cbse_01_009** (Properties of Binary Operations) to understand how commutativity simplifies inverse.', 'Do a re-diagnostic: Given \\(a * b = 2a + b\\) on \\(\\mathbb{Z}\\), find identity (if any) and inverse of \\(5\\) (if.', 'If stuck, explicitly write the equations \\(a * e = a\\) and \\(5 * b = e\\) and solve step by step.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
