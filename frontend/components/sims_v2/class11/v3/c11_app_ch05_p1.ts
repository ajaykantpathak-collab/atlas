import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch05_p1: SimDef = {
    id: 'v3_c11_app_ch05_p1',
    title: 'Sequences Series · Part 1/2',
    subtitle: 'This node covers the fundamental definitions of sequence, finite/infinite sequence.',
    classLevel: 11, subject: 'app', topic: 'Sequences Series · Part 1/2',
    chapters: ['c11_app_ch05'],
    nodeIds: ['c11_app_cbse_05_001', 'c11_app_cbse_05_002', 'c11_app_cbse_05_003', 'c11_app_cbse_05_004', 'c11_app_cbse_05_005', 'c11_app_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: "If I deposit ₹1000 today, ₹1100 next month, ₹1210 the month after... is this a sequence?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: '**APPLY:** A bacteria culture doubles every hour. If initial count is 500, write the sequence for the first 5 hours.',
        options: ['Sequence: $500, 1000, 2000, 4000, 8000$', 'doubling', 'increasing by 500'],
        answer: 'Sequence: $500, 1000, 2000, 4000, 8000$',
        hook: '**Misconception:** "Every sequence has a general term formula like $an+b$ or $ar^{n-1}$." **Why it happens:** Class 10.',
    },
    teaching: [
        { title: 'Introduction', text: 'A **sequence** is an ordered arrangement of numbers (or objects) according to a definite rule, where each element has a specific position (first, second, third...).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_app_cbse_05_001', title: 'Introduction',
          caseStudy: { intro: 'Start by asking: "If I deposit ₹1000 today, ₹1100 next month, ₹1210 the month after... is this a sequence? Yes — it\'s an ordered list of balances.',
            decisions: [{ prompt: '**REMEMBER:** Define a finite sequence and give an example different from the textbook. How does it differ from an infinite sequence?', options: [
                { text: 'A finite sequence has a countable number of terms (e.g., marks of 5 students: 85, 90, 78,', outcome: 'A finite sequence has a countable number of terms (e.g., marks of 5 students: 85, 90, 78, 92, 88).' },
                { text: 'finite sequence stops at 100', outcome: 'Not quite — **Misconception:** "Every sequence has a general term formula like $an+b$ or $ar^{n-1}$." **Why.', reveals: 'misconception-every-sequence-has-a' },
                { text: 'the sequence ends', outcome: 'Not quite — **Misconception:** "Every sequence has a general term formula like $an+b$ or $ar^{n-1}$." **Why.', reveals: 'misconception-every-sequence-has-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_05_002', title: 'Sequences',
          scaffold: { problem: 'A digital marketing agency tracks the reach of a viral campaign. On Day 1, the post reaches 500 people.',
            steps: [
            { text: 'Identify the pattern. Day 1: 500. Day 2: $500 \\times 3$. Day 3: $500 \\times 3^2$. This is geometric growth.' },
            { text: 'Formulate the general term (explicit formula). Since Day 1 corresponds to $n=1$, the exponent is $n-1$.' },
            { text: 'Find Day 5 reach ($a_5$). Substitute $n=5$: $a_5 = 500 \\times 3^{4} = 500 \\times 81 = 40,500$ people.' },
            { text: 'Write the Series (Total Cumulative Reach) in Sigma Notation. Sum from Day 1 ($n=1$) to Day 7 ($n=7$): $S_7.' },
            { text: 'Calculate the Sum $S_7$. Use GP Sum formula (preview of next nodes): $S_n = a \\frac{r^n - 1}{r - 1}$.', faded: true, blankAnswer: '(a) $a_n = 500(3)^{n-1}$ (b) 40,500 people (c) $S_7.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_05_003', title: 'Arithmetic Progression',
          scaffold: { problem: 'A Delhi Metro train starts from the depot with 40 passengers. At each of the first 15 stations, exactly 25 passengers board and 5 alight.',
            steps: [
            { text: 'Identify the net change per station. Boarding = 25, alighting = 5 → net increase = 20 passengers per station.' },
            { text: 'Determine the first term $a$. The train *starts* with 40 passengers (before station 1).' },
            { text: 'Common difference $d = 20$ (net increase per station).' },
            { text: 'Apply general term formula for 15th station: $a_{15} = a + (15-1)d = 60 + 14 \\times 20 = 60 + 280 = 340$.' },
            { text: 'General formula: $a_n = 60 + (n-1)20 = 20n + 40$. Verify: $n=1 \\rightarrow 60$, $n=15 \\rightarrow 340$. Consistent.', faded: true, blankAnswer: '340 passengers after the 15th station. General term: $a_n.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_05_004', title: 'Properties of an A.P',
          caseStudy: { intro: 'Start with a real-world question: "A metro train increases its speed by 5 km/h every minute.',
            decisions: [{ prompt: 'State Property (iii) of an A.P. precisely: If each term of an A.P.', options: [
                { text: '**Correct Answer:** The resulting sequence is also an A.P', outcome: '**Correct Answer:** The resulting sequence is also an A.P. with common difference k·d.' },
                { text: 'common difference remains d', outcome: 'Not quite — **Misconception:** "If three numbers a, b, c are in A.P., then b = (a + c)/2 always means they are.', reveals: 'misconception-if-three-numbers-a' },
                { text: 'common difference becomes d/k', outcome: 'Not quite — **Misconception:** "If three numbers a, b, c are in A.P., then b = (a + c)/2 always means they are.', reveals: 'misconception-if-three-numbers-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_05_005', title: 'Selection of Terms of an A.P',
          scaffold: { problem: 'The sum of three numbers in A.P. is 27 and their product is 504. Find the numbers. (Classic board exam problem)',
            steps: [
            { text: 'Identify that we need 3 numbers in A.P. → use symmetric form for odd count: let the numbers be a-d, a, a+d (common.' },
            { text: 'Use the sum condition: (a-d) + a + (a+d) = 3a = 27 → a = 9. (Notice d cancels out — this is why symmetric form.' },
            { text: 'Use the product condition: (a-d)·a·(a+d) = a(a²-d²) = 504. Substitute a=9: 9(81-d²) = 504 → 81-d² = 56 → d² = 25 →.' },
            { text: 'Write the numbers for both d values: d=5 → 4, 9, 14; d=-5 → 14, 9, 4.' },
            { text: 'Verify: Sum = 4+9+14=27 ✓; Product = 4×9×14=504 ✓. The numbers are 4, 9, 14.', faded: true, blankAnswer: 'The three numbers are 4, 9, and 14.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_05_006', title: 'Sum of First \'n\' Terms of an A.P',
          scaffold: { problem: 'A contractor estimates that the cost of drilling a borewell is ₹500 for the first meter and increases by ₹50 for each subsequent meter.',
            steps: [
            { text: 'Identify the sequence. Cost per meter forms an A.P.: 1st meter = ₹500, 2nd = ₹550, 3rd = ₹600...' },
            { text: 'Find the cost of the 50th meter (last term l = a₅₀) using nth term formula: a₅₀ = a + (n-1)d = 500 + 49×50 = 500 + 2450.' },
            { text: 'Compute total cost S₅₀ using Sₙ = n/2(a + l) since we now know both a and l: S₅₀ = 50/2 (500 + 2950) = 25 × 3450.' },
            { text: 'Verify using the other formula Sₙ = n/2[2a+(n-1)d]: S₅₀ = 25[1000 + 49×50] = 25[1000+2450] = 25×3450 = ₹86,250. Matches.' },
            { text: 'Interpret: Total drilling cost = ₹86,250; Cost of last meter = ₹2,950.', faded: true, blankAnswer: 'Total cost = ₹86,250; Cost of 50th meter = ₹2,950.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Sequences Series like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Sequences Series · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sequences Series · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_05_001', difficulty: 'standard',
          question: 'A **sequence** is an ordered arrangement of numbers (or objects) according to.',
          hint: 'If stuck, review **Class 10 Chapter 5 (Arithmetic Progressions)** — specifically the.',
          misconception: '**Misconception:** "Every sequence has a general term formula like $an+b$ or $ar^{n-1}$." **Why it happens:** Class 10.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** The $n^{th}$ term of a sequence is given by $a_n = n^2 - 1$. Write the first 4 terms and the associated series up to 4 terms.', answer: 'Terms: $a_1=0, a_2=3, a_3=8, a_4=15$',
                  options: ['Terms: $a_1=0, a_2=3, a_3=8, a_4=15$', 'it is AP because formula has $n^2$'],
                  hint: 'If stuck, review **Class 10 Chapter 5 (Arithmetic Progressions)** — specifically the definition.',
                  misconception: '**Misconception:** "Every sequence has a general term formula like $an+b$ or $ar^{n-1}$." **Why it happens:** Class 10 focuses heavily.' },
                { id: 'b', prompt: '**APPLY:** A bacteria culture doubles every hour. If initial count is 500, write the sequence for the first 5 hours.', answer: 'Sequence: $500, 1000, 2000, 4000, 8000$',
                  options: ['Sequence: $500, 1000, 2000, 4000, 8000$', 'doubling', 'increasing by 500'],
                  hint: 'If stuck, review **Class 10 Chapter 5 (Arithmetic Progressions)** — specifically the definition.',
                  misconception: '**Misconception:** "Every sequence has a general term formula like $an+b$ or $ar^{n-1}$." **Why it happens:** Class 10 focuses heavily.' },
                { id: 'c', prompt: '**ANALYZE:** Compare the sequences: (i) $2, 4, 6, 8, ...$ (ii) $2, 4, 8, 16, ...$ (iii) $1, -1, 1, -1, ...$.', answer: '(i) AP only ($d=2, r \\neq \\text{const}$)',
                  options: ['(i) AP only ($d=2, r \\neq \\text{const}$)', 'alternating is both'],
                  hint: 'If stuck, review **Class 10 Chapter 5 (Arithmetic Progressions)** — specifically the definition.',
                  misconception: '**Misconception:** "Every sequence has a general term formula like $an+b$ or $ar^{n-1}$." **Why it happens:** Class 10 focuses heavily.' }
          ],
            remediations: { 'misconception-every-sequence-has-a': { steps: ['**Show counter-examples:** List sequences with no algebraic rule: "Digits of π: 3, 1, 4, 1, 5, 9..." or "Number.', '**Re-define sequence:** "A sequence is a *function* $f: \\mathbb{N} \\to \\mathbb{R}$.', 'The \'rule\' can be a table, a graph, or an algorithm — not just a formula." 3.', '**Practice:** Give 5 sequences (2 AP, 1 GP, 1 quadratic, 1 random) and ask: "Which are progressions?'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Every sequence has a general term formula like $an+b$ or $ar^{n-1}$." **Why it happens:** Class 10.',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** A student claims: "The series $1 + 2 + 4 + 8 + ...$ to infinity has a finite sum because terms grow slowly." Critique this statement using the.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'sum is -1 using formula $\\frac{a}{1-r}$'],
                  hint: 'If stuck, review **Class 10 Chapter 5 (Arithmetic Progressions)** — specifically the definition.',
                  misconception: '**Misconception:** "Every sequence has a general term formula like $an+b$ or $ar^{n-1}$." **Why it happens:** Class 10 focuses heavily.' }
          ],
            remediations: { 'misconception-every-sequence-has-a': { steps: ['**Show counter-examples:** List sequences with no algebraic rule: "Digits of π: 3, 1, 4, 1, 5, 9..." or "Number.', '**Re-define sequence:** "A sequence is a *function* $f: \\mathbb{N} \\to \\mathbb{R}$.', 'The \'rule\' can be a table, a graph, or an algorithm — not just a formula." 3.', '**Practice:** Give 5 sequences (2 AP, 1 GP, 1 quadratic, 1 random) and ask: "Which are progressions?'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_05_002', difficulty: 'standard',
          question: 'A **Sequence** is a function whose domain is the set of natural numbers (or.',
          hint: 'Review "Relations and Functions" (Class 11 Maths Ch 2) focusing on domain restricted.',
          misconception: '**Misconception:** "The $n^{th}$ term of a sequence ($a_n$) and the Sum of the first $n$ terms ($S_n$) are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A **Sequence** is a function whose domain is the set of natural numbers (or a subset',
                  options: ['A **Sequence** is a function whose domain is the set of natural numbers (or a subset', 'A **sequence** is an ordered arrangement of numbers (or objects) according to a definite', 'An Arithmetic Progression (AP) is a sequence of numbers in', 'Properties of an Arithmetic Progression (A.P.) describe how the structure of an A.P'],
                  hint: 'Review "Relations and Functions" (Class 11 Maths Ch 2) focusing on domain restricted to Natural.',
                  misconception: '**Misconception:** "The $n^{th}$ term of a sequence ($a_n$) and the Sum of the first $n$ terms ($S_n$) are interchangeable notations for.' }
          ],
            remediations: { 'misconception-the-n-th-term': { steps: ['**Visual Distinction:** Draw a number line.', 'Mark points $a_1, a_2, a_3, a_4$ as "Sequence terms" (dots).', 'Draw brackets grouping them: $[a_1]$, $[a_1+a_2]$, $[a_1+a_2+a_3]$ and label these $S_1, S_2, S_3$ (Series terms).', '**Notation Drill:** Force the student to write the definition: "$a_n$ = value of the $n^{th}$ object.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_05_003', difficulty: 'standard',
          question: 'An Arithmetic Progression (AP) is a sequence of numbers in which the difference.',
          hint: 'Review "Sequences" (c11_app_cbse_05_002) for notation $a_n$ and "Introduction".',
          misconception: 'Students treat the general term formula $a_n = a + (n-1)d$ as a rigid template and mechanically substitute $n$ without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An Arithmetic Progression (AP) is a sequence of numbers in',
                  options: ['An Arithmetic Progression (AP) is a sequence of numbers in', 'A **sequence** is an ordered arrangement of numbers (or objects) according to a definite', 'A **Sequence** is a function whose domain is the set of natural numbers (or a subset', 'Properties of an Arithmetic Progression (A.P.) describe how the structure of an A.P'],
                  hint: 'Review "Sequences" (c11_app_cbse_05_002) for notation $a_n$ and "Introduction".',
                  misconception: 'Students treat the general term formula $a_n = a + (n-1)d$ as a rigid template and mechanically substitute $n$ without checking if the.' }
          ],
            remediations: { 'students-treat-the-general-term': { steps: ['Ask the student to write the definition of AP in their own words: "Difference between *any* two consecutive terms.', 'Give them $a_n = n^2 + 1$ and ask: "Calculate $a_4 - a_3$ and $a_3 - a_2$.', 'Show the algebraic proof: $a_{n+1} - a_n = [2(n+1)^2+3] - [2n^2+3] = 4n+2$, which depends on $n$, so not constant.', 'Contrast with $a_n = 5n+2$: $a_{n+1} - a_n = 5(n+1)+2 - (5n+2) = 5$, constant.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_05_004', difficulty: 'standard',
          question: 'Properties of an Arithmetic Progression (A.P.) describe how the structure of.',
          hint: 'Review the derivation of aₙ = a + (n-1)d from the definition aₙ₊₁ = aₙ +.',
          misconception: '**Misconception:** "If three numbers a, b, c are in A.P., then b = (a + c)/2 always means they are equally spaced.',
          parts: [
                { id: 'a', prompt: 'State Property (iii) of an A.P. precisely: If each term of an A.P. is multiplied by a non-zero constant k, what happens to the common difference?', answer: '**Correct Answer:** The resulting sequence is also an A.P',
                  options: ['**Correct Answer:** The resulting sequence is also an A.P', 'common difference remains d', 'common difference becomes d/k', 'not equally spaced'],
                  hint: 'Review the derivation of aₙ = a + (n-1)d from the definition aₙ₊₁ = aₙ + d (c11_app_cbse_05_003).',
                  misconception: '**Misconception:** "If three numbers a, b, c are in A.P., then b = (a + c)/2 always means they are equally spaced on the number line.".' },
                { id: 'b', prompt: 'The nth term of a sequence is given by aₙ = 3n² + 2n - 1. A student claims it is an A.P. because "it has a formula in n".', answer: '**Correct Answer:** Property (v) states a sequence is an A.P',
                  options: ['**Correct Answer:** Property (v) states a sequence is an A.P', 'it\'s an A.P', '— they confuse *direction* with *spacing*', 'a₂, a₅ positive → contradiction unless d<0'],
                  hint: 'Review the derivation of aₙ = a + (n-1)d from the definition aₙ₊₁ = aₙ + d (c11_app_cbse_05_003).',
                  misconception: '**Misconception:** "If three numbers a, b, c are in A.P., then b = (a + c)/2 always means they are equally spaced on the number line.".' },
                { id: 'c', prompt: 'In a finite A.P. with 15 terms, the 4th term is 14 and the 12th term is 38.', answer: '**Correct Answer:** Sum = 52',
                  options: ['**Correct Answer:** Sum = 52', 'not equally spaced', 'a₂, a₅ positive → contradiction unless d<0'],
                  hint: 'Review the derivation of aₙ = a + (n-1)d from the definition aₙ₊₁ = aₙ + d (c11_app_cbse_05_003).',
                  misconception: '**Misconception:** "If three numbers a, b, c are in A.P., then b = (a + c)/2 always means they are equally spaced on the number line.".' },
                { id: 'd', prompt: 'Two A.P.s have the same first term a. The first has common difference d₁, the second d₂.', answer: '**Correct Answer:** Yes, it is an A.P',
                  options: ['**Correct Answer:** Yes, it is an A.P', 'common difference is d₁·d₂', 'not an A.P', ', they confuse'],
                  hint: 'Review the derivation of aₙ = a + (n-1)d from the definition aₙ₊₁ = aₙ + d (c11_app_cbse_05_003).',
                  misconception: '**Misconception:** "If three numbers a, b, c are in A.P., then b = (a + c)/2 always means they are equally spaced on the number line.".' }
          ],
            remediations: { 'misconception-if-three-numbers-a': { steps: ['**Targeted remediation (3 steps):** 1.', '**Re-anchor to definition:** "An A.P.', 'is defined by aₙ₊₁ - aₙ = d (constant) for ALL n ∈ ℕ.', 'd can be ANY real number — positive, negative, or zero.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_05_005', difficulty: 'standard',
          question: 'Selection of terms in an A.P. is a strategic method to assume a specific number.',
          hint: 'If stuck, review the definition of A.P. (c11_app_cbse_05_003) and Property (vi) of A.P.',
          misconception: 'Students mechanically memorize the four rows of Table 5.3.1 as rigid templates ("3 terms → a-d, a, a+d; 4 terms → a-3d.',
          parts: [
                { id: 'a', prompt: 'Three numbers in A.P. have a sum of 21 and product of 231. Find the numbers using the symmetric selection method.', answer: 'Let terms be a-d, a, a+d',
                  options: ['Let terms be a-d, a, a+d', 'a=7, d=4, terms 7, 11, 15'],
                  hint: 'If stuck, review the definition of A.P. (c11_app_cbse_05_003) and Property (vi) of A.P.',
                  misconception: 'Students mechanically memorize the four rows of Table 5.3.1 as rigid templates ("3 terms → a-d, a, a+d; 4 terms → a-3d, a-d, a+d, a+3d").' }
          ],
            remediations: { 'students-mechanically-memorize-the-four': { steps: ['Draw a number line. Mark a point \'a\'. For 3 terms, place dots at a-d, a, a+d — see the equal gaps of d.', 'Derive the 5-term and 6-term patterns from scratch using this "center on \'a\'" logic, not from memory.', 'Take a solved example (e.g., Illustration 10: sum 24, product 440 for 3 terms) and re-solve it using the sequential.', 'Practice 3 problems where you deliberately choose the wrong pattern first, see it fail, then switch to the correct.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_05_006', difficulty: 'standard',
          question: 'The sum of the first n terms of an Arithmetic Progression (A.P.), denoted.',
          hint: 'If stuck, review c11_app_cbse_05_003 (nth term formula and finding a, d) and.',
          misconception: '**Misconception:** "Sₙ = n/2(a + l) is a *different* formula from Sₙ = n/2[2a + (n-1)d], and I must memorize both.',
          parts: [
                { id: 'a', prompt: 'State the formula for the sum of first n terms of an A.P. with first term \'a\' and common difference \'d\'.', answer: 'Correct answer: Sₙ = n/2[2a + (n-1)d]',
                  options: ['Correct answer: Sₙ = n/2[2a + (n-1)d]', 'term with just'],
                  hint: 'If stuck, review c11_app_cbse_05_003 (nth term formula and finding a, d) and c11_app_cbse_05_004.',
                  misconception: '**Misconception:** "Sₙ = n/2(a + l) is a *different* formula from Sₙ = n/2[2a + (n-1)d], and I must memorize both separately." **Why.' }
          ],
            remediations: { 'misconception-s-n-2-a': { steps: ['**Derive the equivalence:** Write Sₙ = n/2(a + l) on the board.', 'Below it, write l = a + (n-1)d.', 'Substitute: Sₙ = n/2[a + a + (n-1)d] = n/2[2a + (n-1)d].', 'Say: "They are the *same* formula; the second just replaces l with its definition." 2.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
