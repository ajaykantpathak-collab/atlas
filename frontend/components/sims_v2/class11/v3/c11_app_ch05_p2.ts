import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch05_p2: SimDef = {
    id: 'v3_c11_app_ch05_p2',
    title: 'Sequences Series · Part 2/2',
    subtitle: 'This node covers the definition of Arithmetic Mean, insertion of `n` AMs between two.',
    classLevel: 11, subject: 'app', topic: 'Sequences Series · Part 2/2',
    chapters: ['c11_app_ch05'],
    nodeIds: ['c11_app_cbse_05_007', 'c11_app_cbse_05_008', 'c11_app_cbse_05_009', 'c11_app_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with a relatable scenario: "A Delhi Metro train starts at Station A (km 0) and ends at Station B (km.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student claims the sequence defined by $a_n = 3 \\cdot (-2)^{n-1}$ is a GP with first term 3 and common ratio -2.',
        options: ['The first student is correct', 'Zero Ratio', 'a sequence like $5, 0, 0, 0, \\dots$ is a GP with common ratio $r=0$'],
        answer: 'The first student is correct',
        hook: '**The "Zero Ratio" Trap:** Students often believe a sequence like $5, 0, 0, 0, \\dots$ is a GP with common ratio $r=0$.',
    },
    teaching: [
        { title: 'Arithmetic Mean', text: 'If three numbers `a`, `A`, `b` are in Arithmetic Progression (AP), then `A` is called the **Arithmetic Mean (AM)** of `a` and `b`, defined by `A = (a + b)/2`.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_05_007', title: 'Arithmetic Mean',
          scaffold: { problem: '** A construction company builds a flyover. The first pillar is at the start (0m) and the last pillar is at 500m.',
            steps: [
            { text: 'Model the problem. Pillar positions form an AP: `a = 0` (1st pillar), `b = 500` (last pillar, which is the `(n+2)`-th.' },
            { text: 'Use the general term formula for the AP. `a₄ = a + 3d`. Given `a₄ = 100` and `a = 0`, so `3d = 100` → `d = 100/3`.' },
            { text: 'Use the last term formula to find `n`. Last term `l = a + (n+1)d` (since total terms = `n+2`, last term index = `n+1`).' },
            { text: 'Solve for `n`. `500 = 100(n+1)/3` → `1500 = 100n + 100` → `100n = 1400` → `n = 14`.' },
            { text: 'Verify. Total pillars = 16. Gaps = 15. `d = 500/15 = 100/3 ≈ 33.33m`. 4th pillar = `3 * 33.33 = 100m`. Correct.', faded: true, blankAnswer: '** `n = 14` pillars inserted. Distance between pillars `d.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_05_008', title: 'Geometric Progression (GP)',
          scaffold: { problem: 'The value of a residential plot in Gurugram appreciates by 10% every year.',
            steps: [
            { text: 'Identify the sequence type. Value increases by a fixed *percentage* (10%) each year → Multiplicative growth → **GP**.' },
            { text: 'Extract parameters. Current value = Value at beginning of Year 1 = **a = 50,00,000**.' },
            { text: 'Map "beginning of 6th year" to term index n. Year 1 start = Term 1 (a). Year 2 start = Term 2 (ar). ...' },
            { text: 'Apply general term formula. `a₆ = a × r^(6-1) = 50,00,000 × (1.1)^5`.' },
            { text: 'Compute. (1.1)² = 1.21; (1.1)⁴ = 1.4641; (1.1)⁵ = 1.61051. `a₆ = 50,00,000 × 1.61051 = 80,52,550`.', faded: true, blankAnswer: '₹80,52,550 (at the beginning of the 6th year).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_05_009', title: 'Definition',
          scaffold: { problem: 'The value of a rare coin appreciates such that its value at the end of each year is 1.2 times its value at the beginning of that year.',
            steps: [
            { text: 'Identify the sequence terms. Value at end of Year 1 = $5000 \\times 1.2 = 6000$.' },
            { text: 'Recall the definition of GP. Need to check if ratio of consecutive terms is constant and all terms are non-zero.' },
            { text: 'Compute ratios. $\\frac{7200}{6000} = 1.2$. $\\frac{8640}{7200} = 1.2$.' },
            { text: 'Verify non-zero condition. All values are positive currency amounts, hence non-zero.' },
            { text: 'Conclude. Since ratio is constant ($r=1.2$) and terms are non-zero, it is a GP.', faded: true, blankAnswer: 'Yes, it is a GP. $a = 6000$, $r = 1.2$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_05_010', title: 'General Term of a G.P',
          scaffold: { problem: 'A new smartphone app is launched. On Day 1, it gets 500 downloads. The daily downloads triple every day (GP with r=3).',
            steps: [
            { text: 'Identify given: a = 500 (Day 1 downloads), r = 3 (triples daily). Capacity limit = 1,00,000.' },
            { text: 'Write nth term formula: aₙ = arⁿ⁻¹ = 500 × 3ⁿ⁻¹.' },
            { text: 'Set up inequality: 500 × 3ⁿ⁻¹ > 1,00,000 → 3ⁿ⁻¹ > 200.' },
            { text: 'Solve for n: 3⁵ = 243 > 200, 3⁴ = 81 < 200. So n-1 = 5 → n = 6.' },
            { text: 'Verify: Day 5: 500 × 3⁴ = 500 × 81 = 40,500 (safe). Day 6: 500 × 3⁵ = 500 × 243 = 1,21,500 > 1,00,000 (exceeds).', faded: true, blankAnswer: 'Day 6' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_05_010', title: 'General Term of a G.P',
          caseStudy: { intro: 'Start with a relatable scenario: "A video gets 100 views on Day 1. Each day, views triple.',
            decisions: [{ prompt: 'Write the general term formula for a GP with first term 5 and common ratio -2. State the 4th term using this formula.', options: [
                { text: 'The general term is `aₙ = 5 × (-2)ⁿ⁻¹`', outcome: 'The general term is `aₙ = 5 × (-2)ⁿ⁻¹`. For n=4: `a₄ = 5 × (-2)³ = 5 × (-8) = -40`.' },
                { text: 'term number', outcome: 'Not quite — Students treat the GP nth term formula as `aₙ = arⁿ` (exponent `n` instead of `n-1`) because they.', reveals: 'students-treat-the-gp-nth' },
                { text: 'number of steps from an imaginary term 0', outcome: 'Not quite — Students treat the GP nth term formula as `aₙ = arⁿ` (exponent `n` instead of `n-1`) because they.', reveals: 'students-treat-the-gp-nth' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'You finished Sequences Series — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_05_007', difficulty: 'standard',
          question: 'If three numbers `a`, `A`, `b` are in Arithmetic Progression (AP), then `A`.',
          hint: 'Review "General Term of an AP" (node `c11_app_cbse_05_003`) and "Properties of an AP".',
          misconception: '**The "Off-by-One" Interval Error:** Students consistently use `d = (b - a) / n` instead of `d = (b - a) / (n + 1)`.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'If three numbers `a`, `A`, `b` are in Arithmetic Progression (AP), then `A` is called the',
                  options: ['If three numbers `a`, `A`, `b` are in Arithmetic Progression (AP), then `A` is called the', 'A **sequence** is an ordered arrangement of numbers (or objects) according to a definite', 'A **Sequence** is a function whose domain is the set of natural numbers (or a subset', 'An Arithmetic Progression (AP) is a sequence of numbers in'],
                  hint: 'Review "General Term of an AP" (node `c11_app_cbse_05_003`) and "Properties of an AP" (node.',
                  misconception: '**The "Off-by-One" Interval Error:** Students consistently use `d = (b - a) / n` instead of `d = (b - a) / (n + 1)`.' }
          ],
            remediations: { 'the-off-by-one-interval': { steps: ['**Visual Anchor:** Draw a number line.', 'Mark `a` (Start) and `b` (End).', 'Ask: "If I put 1 mean, how many jumps to go from Start to End?" (2 jumps).', '"If I put 2 means?" (3 jumps).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Off-by-One" Interval Error:** Students consistently use `d = (b - a) / n` instead of `d = (b - a) / (n + 1)`.',
          parts: [
                { id: 'a', prompt: '**Statement:** "If the single Arithmetic Mean between `a` and `b` is `A`, and we insert `n` Arithmetic Means between `a` and `b`, the *average* of those `n`.', answer: '**Answer:** **True.** **Justification:** 1',
                  options: ['**Answer:** **True.** **Justification:** 1', 'because'],
                  hint: 'Review "General Term of an AP" (node `c11_app_cbse_05_003`) and "Properties of an AP" (node.',
                  misconception: '**The "Off-by-One" Interval Error:** Students consistently use `d = (b - a) / n` instead of `d = (b - a) / (n + 1)`.' }
          ],
            remediations: { 'the-off-by-one-interval': { steps: ['**Visual Anchor:** Draw a number line.', 'Mark `a` (Start) and `b` (End).', 'Ask: "If I put 1 mean, how many jumps to go from Start to End?" (2 jumps).', '"If I put 2 means?" (3 jumps).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_05_008', difficulty: 'standard',
          question: 'A Geometric Progression (GP) is a sequence of non-zero numbers where the ratio.',
          hint: 'If stuck, review **c11_app_cbse_05_002 (Sequences)** for notation and.',
          misconception: '**Misconception:** "The common ratio \'r\' is found by subtracting the first term from the second term (r = a₂ - a₁).',
          parts: [
                { id: 'a', prompt: 'The sequence 2, 6, 18, 54, ... is a GP. Explain *why* the sequence 2, 6, 18, 53, ... is NOT a GP, even though the first three terms match.', answer: 'In a GP, the ratio `a_(k+1)/a_k` must be constant for **all** k ≥ 1',
                  options: ['In a GP, the ratio `a_(k+1)/a_k` must be constant for **all** k ≥ 1', 'it\'s not a GP because 53 is not 54'],
                  hint: 'If stuck, review **c11_app_cbse_05_002 (Sequences)** for notation and **c11_app_cbse_05_003.',
                  misconception: '**Misconception:** "The common ratio \'r\' is found by subtracting the first term from the second term (r = a₂ - a₁), just like common.' }
          ],
            remediations: { 'misconception-the-common-ratio-r': { steps: ['**Confront the error explicitly:** Write AP (3, 6, 9, 12) and GP (3, 6, 12, 24) side-by-side.', 'Ask: "How do you get 6 from 3 in the first?', 'How do you get 6 from 3 in the second?', '**Define the operation:** "AP = Addition pattern → find \'d\' by **Subtraction** (inverse of addition).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_05_009', difficulty: 'standard',
          question: 'A sequence $a_1, a_2, a_3, \\dots, a_n, \\dots$ is called a **Geometric.',
          hint: 'Review "Sequences" (c11_app_cbse_05_002) — specifically the definition of a sequence.',
          misconception: '**The "Zero Ratio" Trap:** Students often believe a sequence like $5, 0, 0, 0, \\dots$ is a GP with common ratio $r=0$.',
          parts: [
                { id: 'a', prompt: 'A student claims the sequence defined by $a_n = 3 \\cdot (-2)^{n-1}$ is a GP with first term 3 and common ratio -2.', answer: 'The first student is correct',
                  options: ['The first student is correct', 'Zero Ratio', 'a sequence like $5, 0, 0, 0, \\dots$ is a GP with common ratio $r=0$'],
                  hint: 'Review "Sequences" (c11_app_cbse_05_002) — specifically the definition of a sequence, term notation.',
                  misconception: '**The "Zero Ratio" Trap:** Students often believe a sequence like $5, 0, 0, 0, \\dots$ is a GP with common ratio $r=0$.' },
                { id: 'b', prompt: 'Determine if the following sequences are GPs. If yes, state $a$ and $r$. If no, explain why.', answer: '(i) GP: $a=5, r=3$',
                  options: ['(i) GP: $a=5, r=3$', 'Zero Ratio', 'a sequence like $5, 0, 0, 0, \\dots$ is a GP with common ratio $r=0$'],
                  hint: 'Review "Sequences" (c11_app_cbse_05_002) — specifically the definition of a sequence, term notation.',
                  misconception: '**The "Zero Ratio" Trap:** Students often believe a sequence like $5, 0, 0, 0, \\dots$ is a GP with common ratio $r=0$.' },
                { id: 'c', prompt: 'Compare the sequences: Sequence A: $10, 13, 16, 19, \\dots$ Sequence B: $10, 13, 16.9, 21.97, \\dots$ Sequence C: $10, 20, 40, 80, \\dots$ Identify which is.', answer: 'Sequence A is an AP: $d = 13-10 = 3$ (constant addition)',
                  options: ['Sequence A is an AP: $d = 13-10 = 3$ (constant addition)', 'neither', 'Zero Ratio', 'a sequence like $5, 0, 0, 0, \\dots$ is a GP with common ratio $r=0$'],
                  hint: 'Review "Sequences" (c11_app_cbse_05_002) — specifically the definition of a sequence, term notation.',
                  misconception: '**The "Zero Ratio" Trap:** Students often believe a sequence like $5, 0, 0, 0, \\dots$ is a GP with common ratio $r=0$.' }
          ],
            remediations: { 'the-zero-ratio-trap-students': { steps: ['If a student claims $5, 0, 0, \\dots$ is a GP: 1.', 'Ask: "What is $\\frac{a_3}{a_2}$?" They will say $0/0 = 0$ or "undefined." 2.', 'State: "For a GP, the ratio must be the **same constant number** for **every** consecutive pair.', 'Is $0/0$ equal to $0/5$?" 3.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_05_010', difficulty: 'standard',
          question: 'The general term (nth term) of a Geometric Progression with first term `a` (a ≠.',
          hint: 'If stuck, review "c11_app_cbse_05_008: Geometric Progression (GP)" for the definition.',
          misconception: 'Students treat the GP nth term formula as `aₙ = arⁿ` (exponent `n` instead of `n-1`) because they count the first term.',
          parts: [
                { id: 'a', prompt: 'Write the general term formula for a GP with first term 5 and common ratio -2. State the 4th term using this formula.', answer: 'The general term is `aₙ = 5 × (-2)ⁿ⁻¹`',
                  options: ['The general term is `aₙ = 5 × (-2)ⁿ⁻¹`', 'term number', 'number of steps from an imaginary term 0'],
                  hint: 'If stuck, review "c11_app_cbse_05_008: Geometric Progression (GP)" for the definition, pattern.',
                  misconception: 'Students treat the GP nth term formula as `aₙ = arⁿ` (exponent `n` instead of `n-1`) because they count the first term as "1 multiplication.' },
                { id: 'b', prompt: 'Explain in your own words why the exponent in the GP nth term formula is `n-1` and not `n`. Use the sequence 3, 6, 12, 24,... as an example.', answer: 'The first term (n=1) is just `a` with zero multiplications by `r`',
                  options: ['The first term (n=1) is just `a` with zero multiplications by `r`', 'term number', 'number of steps from an imaginary term 0'],
                  hint: 'If stuck, review "c11_app_cbse_05_008: Geometric Progression (GP)" for the definition, pattern.',
                  misconception: 'Students treat the GP nth term formula as `aₙ = arⁿ` (exponent `n` instead of `n-1`) because they count the first term as "1 multiplication.' },
                { id: 'c', prompt: 'The 5th term of a GP is 162 and the 8th term is 4374. Find the first term `a` and common ratio `r`.', answer: 'Given: `a₅ = ar⁴ = 162` and `a₈ = ar⁷ = 4374`',
                  options: ['Given: `a₅ = ar⁴ = 162` and `a₈ = ar⁷ = 4374`', 'term number', 'number of steps from an imaginary term 0'],
                  hint: 'If stuck, review "c11_app_cbse_05_008: Geometric Progression (GP)" for the definition, pattern.',
                  misconception: 'Students treat the GP nth term formula as `aₙ = arⁿ` (exponent `n` instead of `n-1`) because they count the first term as "1 multiplication.' },
                { id: 'd', prompt: 'Compare the growth of the 10th term in two GPs: GP-A: a=2, r=3 and GP-B: a=10, r=1.5. Which is larger? By what factor?', answer: 'GP-A: `a₁₀ = 2 × 3⁹ = 2 × 19683 = 39366`',
                  options: ['GP-A: `a₁₀ = 2 × 3⁹ = 2 × 19683 = 39366`', 'term number', 'number of steps from an imaginary term 0'],
                  hint: 'If stuck, review "c11_app_cbse_05_008: Geometric Progression (GP)" for the definition, pattern.',
                  misconception: 'Students treat the GP nth term formula as `aₙ = arⁿ` (exponent `n` instead of `n-1`) because they count the first term as "1 multiplication.' }
          ],
            remediations: { 'students-treat-the-gp-nth': { steps: ['**Concrete pattern drill**: Write terms explicitly: T₁=a, T₂=ar, T₃=ar², T₄=ar³.', 'Ask: "How many `r`s in T₄?" (3).', 'Connect exponent to `n-1`.', '**Visual mapping**: Draw a tree diagram — root = `a` (level 0), each branch multiplies by `r`.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
