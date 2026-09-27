import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch06_p1: SimDef = {
    id: 'v3_c11_app_ch06_p1',
    title: 'Permutations Combinations · Part 1/2',
    subtitle: 'This node introduces the chapter\'s scope: the two Fundamental Principles of Counting.',
    classLevel: 11, subject: 'app', topic: 'Permutations Combinations · Part 1/2',
    chapters: ['c11_app_ch06'],
    nodeIds: ['c11_app_cbse_06_001', 'c11_app_cbse_06_002', 'c11_app_cbse_06_003', 'c11_app_cbse_06_004', 'c11_app_cbse_06_005', 'c11_app_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with this relatable scenario: "You\'re ordering a custom dosa at a Bengaluru cafe.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student claims: "The number of ways to arrange 7 different books on a shelf such that 3 particular books are never together is $7! - 5!',
        options: ['The claim is **incorrect**', 'all three together', 'any two together'],
        answer: 'The claim is **incorrect**',
        hook: 'Students often treat "vowels never come together" as "all vowels are not in a single block." For example, in the word.',
    },
    teaching: [
        { title: 'Introduction', text: 'Permutations and Combinations is the branch of mathematics concerned with counting the number of ways objects can be selected (combinations) or arranged (permutations) from a given set, governed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_06_002', title: 'Factorial',
          scaffold: { problem: 'A digital locker uses a 6-digit code where each digit is from 0–9 and no digit repeats. How many such codes are possible?',
            steps: [
            { text: 'Identify that we are arranging 6 distinct digits chosen from 10 (0–9) without repetition — order matters.' },
            { text: 'The number of ways = 10 × 9 × 8 × 7 × 6 × 5 (first digit: 10 choices, second: 9, etc.).' },
            { text: 'Recognize this product as 10! / 4! because 10! = 10×9×8×7×6×5×4! and the 4! cancels.' },
            { text: 'Compute 10! / 4! = (3628800) / 24 = 151200, or directly: 10×9×8×7×6×5 = 151200.' },
            { text: 'Verify: 10P6 = 10!/(10−6)! = 10!/4! = 151200. The factorial notation compresses the calculation.', faded: true, blankAnswer: '10!/4! = 151,200 possible codes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_06_003', title: 'Fundamental Principles of Counting',
          scaffold: { problem: 'A student ID card at a university consists of 2 capital letters followed by 3 digits. The letters must be distinct vowels (A, E, I, O, U).',
            steps: [
            { text: 'Identify the stages in order: Letter 1, Letter 2, Digit 1, Digit 2, Digit 3.' },
            { text: 'Letter 1: must be a vowel → 5 options (A,E,I,O,U). Letter 2: must be a *different* vowel → 4 remaining options.' },
            { text: 'Digit 1 (hundreds place of the 3-digit part): cannot be 0 → 9 options (1–9).' },
            { text: 'Apply Rule of Product: Total = 5 × 4 × 9 × 10 × 10 = 18,000.' },
            { text: 'Verify: No stage\'s count depends on the specific choice of a prior stage (only that a choice was made).', faded: true, blankAnswer: '18,000 possible ID cards.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_06_004', title: 'Permutations',
          scaffold: { problem: 'How many 5-digit numbers can be formed using the digits {1, 2, 3, 4, 5, 6, 7} if no digit is repeated and the number must be **odd**?',
            steps: [
            { text: 'Identify the constraint — the number must be odd, so the units digit must be odd.' },
            { text: 'After fixing the units digit, 6 digits remain. The ten-thousands place (first digit) cannot be 0 (not in set anyway).' },
            { text: 'The remaining 3 places (thousands, hundreds, tens) are filled from the remaining 5 digits without repetition: $^5P_3.' },
            { text: 'Apply Fundamental Principle of Multiplication: Total = (choices for units) × (choices for ten-thousands).' },
            { text: 'Verify: Total 5-digit numbers without repetition from 7 digits = $^7P_5 = 2520$.', faded: true, blankAnswer: '1440' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_06_005', title: 'Circular Permutation',
          scaffold: { problem: 'In how many ways can 6 boys and 6 girls be seated at a round table if no two girls sit together?',
            steps: [
            { text: 'Identify the constraint — girls must be separated by at least one boy. This forces an alternating pattern B-G-B-G...' },
            { text: 'Seat the 6 boys first around the circle. Since only rotations are identical (people cannot flip), use (6-1)! = 5!' },
            { text: 'The seated boys create exactly 6 gaps between them (one gap between each adjacent pair).' },
            { text: 'Arrange the 6 girls in these 6 distinct gaps. Since gaps are fixed positions relative to the boys, this is a linear.' },
            { text: 'By Fundamental Principle of Multiplication, total arrangements = (ways to seat boys) × (ways to seat girls in gaps).', faded: true, blankAnswer: '86,400 ways.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_06_006', title: 'Permutations with Restrictions',
          scaffold: { problem: 'A university department has 10 professors: 4 from Computer Science (CS), 3 from Mathematics (Math), and 3 from Physics (Phy).',
            steps: [
            { text: 'Identify constraints. Total $n=10$. Committee size $r=5$. Restriction A (Inclusion): HOD (1 specific person) MUST be.' },
            { text: 'Handle Selection (Committee Formation) first. Since HOD is fixed, we need to choose 4 more members from the remaining 9.' },
            { text: 'For *each* selected group of 5 people, count valid seatings (Permutations with Restriction B).' },
            { text: 'Case Analysis for Seating Arrangements of a specific 5-person group:' },
            { text: 'Count how many groups fall into each case.' },
            { text: 'Total Arrangements = $(35 \\times 120) + (70 \\times 120) + (21 \\times 72) = 4200 + 8400 + 1512 = 14,112$.', faded: true, blankAnswer: '14,112 seating arrangements.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_06_006', title: 'Permutations with Restrictions',
          caseStudy: { intro: 'Suppose your school is electing a 3-member Student Council (President, Vice-President, Secretary) from 8 candidates.',
            decisions: [{ prompt: 'State the formula for the number of permutations of $n$ different things taken $r$ at a time in which $m$ particular things **never**.', options: [
                { text: 'The formula is $^{n-m}P_r$, valid only when $n - m \\ge r$', outcome: 'The formula is $^{n-m}P_r$, valid only when $n - m \\ge r$. A wrong answer (e.g., writing $^nP_r.' },
                { text: 'total minus forbidden', outcome: 'Not quite — Students treat "A and B never together" as "Total arrangements $-$ Arrangements with A and.', reveals: 'students-treat-a-and-b' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Permutations Combinations like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Permutations Combinations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Permutations Combinations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_06_001', difficulty: 'standard',
          question: 'Permutations and Combinations is the branch of mathematics concerned with.',
          hint: 'Review logical connectives (AND/OR) in mathematical statements and practice listing all.',
          misconception: 'Students mechanically apply "AND → multiply, OR → add" without verifying *mutual exclusivity* for Addition.',
          parts: [
                { id: 'a', prompt: 'A student claims: "5! = 5 × 4! is true, so 0! = 0 × (-1)! must also be true." Explain why this reasoning is flawed, using the definition of factorial.', answer: 'Correct answer: "Factorial is defined only for non-negative integers',
                  options: ['Correct answer: "Factorial is defined only for non-negative integers', 'A wrong answer (e.g'],
                  hint: 'Review logical connectives (AND/OR) in mathematical statements and practice listing all outcomes.',
                  misconception: 'Students mechanically apply "AND → multiply, OR → add" without verifying *mutual exclusivity* for Addition or *sequential dependence* for.' }
          ],
            remediations: { 'students-mechanically-apply-and-multiply': { steps: ['Have the student physically act out a tiny case: 2 shirts (S1,S2), 2 pants (P1,P2).', 'List all shirt-pant pairs (4).', 'Then ask: "If you wear a shirt, does it change how many pants you can choose?" (No → independent → multiply).', 'For Addition: 2 hats, 3 scarves.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_06_002', difficulty: 'standard',
          question: 'The factorial of a non-negative integer n, denoted by n!, is the product of all.',
          hint: 'If stuck, review the recursive pattern: 3! = 3×2!, 4! = 4×3!, 5! = 5×4!',
          misconception: 'Students often believe (n−1)! = n! − 1, e.g., 4! = 5! − 1 = 119.',
          parts: [
                { id: 'a', prompt: 'Simplify the expression (n+3)! / (n+1)! without expanding fully. Explain each step in your own words.', answer: '(n+3)!',
                  options: ['(n+3)!', '(n−1)!'],
                  hint: 'If stuck, review the recursive pattern: 3! = 3×2!, 4! = 4×3!, 5! = 5×4!',
                  misconception: 'Students often believe (n−1)! = n! − 1, e.g., 4! = 5! − 1 = 119. This arises from misreading the recursive definition n! = n × (n−1)!' },
                { id: 'b', prompt: 'If 1/9! + 1/10! = x/11!, find the value of x.', answer: 'x = 121',
                  options: ['x = 121', '(n−1)!'],
                  hint: 'If stuck, review the recursive pattern: 3! = 3×2!, 4! = 4×3!, 5! = 5×4!',
                  misconception: 'Students often believe (n−1)! = n! − 1, e.g., 4! = 5! − 1 = 119. This arises from misreading the recursive definition n! = n × (n−1)!' }
          ],
            remediations: { 'n-1-n-1': { steps: ['Write out the definition: n!', 'Have the student compute 3!, 4!, 5!, 6!', 'side-by-side and verify 5!', 'means "factorial of the number one less than n", not "n!'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe (n−1)! = n! − 1, e.g., 4! = 5! − 1 = 119.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since 5! = 120 and 6! = 720, the average of 5! and 6! is (120+720)/2 = 420, so 5.5! should be 420." Evaluate this reasoning.', answer: 'The reasoning is invalid',
                  options: ['The reasoning is invalid', '(n−1)!'],
                  hint: 'If stuck, review the recursive pattern: 3! = 3×2!, 4! = 4×3!, 5! = 5×4!',
                  misconception: 'Students often believe (n−1)! = n! − 1, e.g., 4! = 5! − 1 = 119. This arises from misreading the recursive definition n! = n × (n−1)!' },
                { id: 'b', prompt: 'Create a real-world scenario (Indian context) where you need to compute a factorial ratio like 15!/12! to answer a question.', answer: 'Example: A school has 15 students',
                  options: ['Example: A school has 15 students', '(n−1)!'],
                  hint: 'If stuck, review the recursive pattern: 3! = 3×2!, 4! = 4×3!, 5! = 5×4!',
                  misconception: 'Students often believe (n−1)! = n! − 1, e.g., 4! = 5! − 1 = 119. This arises from misreading the recursive definition n! = n × (n−1)!' }
          ],
            remediations: { 'n-1-n-1': { steps: ['Write out the definition: n!', 'Have the student compute 3!, 4!, 5!, 6!', 'side-by-side and verify 5!', 'means "factorial of the number one less than n", not "n!'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_06_003', difficulty: 'standard',
          question: 'The **Fundamental Principles of Counting** consist of two rules: (1) **Rule.',
          hint: 'If stuck, review the difference between mutually exclusive alternatives (Rule of Sum) and.',
          misconception: 'Students mechanically apply "AND means multiply, OR means add" without checking **stage dependency**.',
          parts: [
                { id: 'a', prompt: 'A student must choose **one** elective from **either** 4 Science electives **or** 5 Humanities electives.', answer: '**Correct Answer:** The first student uses the **Rule of Sum**',
                  options: ['**Correct Answer:** The first student uses the **Rule of Sum**', '(mutually exclusive alternatives) from'],
                  hint: 'If stuck, review the difference between mutually exclusive alternatives (Rule of Sum) and.',
                  misconception: 'Students mechanically apply "AND means multiply, OR means add" without checking **stage dependency**.' }
          ],
            remediations: { 'students-mechanically-apply-and-means': { steps: ['**Isolate the stages**: Ask the student to list every decision point in order (e.g., "First choose units digit, then.', '**Check dependency**: For each stage, ask: "Does the *set* of available options change based on what was chosen before?', 'Or only the *count*?" If the set changes (e.g., digit 2 is used up), the count may still be constant (e.g., always 4.', 'But if the count changes (e.g., choosing 0 for units leaves 4 options for hundreds; choosing 2 leaves only 3), **split.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_06_004', difficulty: 'standard',
          question: 'A permutation is an arrangement of objects in a definite order taken some.',
          hint: 'Review factorial simplification (node `c11_app_cbse_06_002`, Examples 1–6) and the "slot.',
          misconception: 'Students often treat "vowels never come together" as "all vowels are not in a single block." For example, in the word.',
          parts: [
                { id: 'a', prompt: 'In how many ways can 5 students stand in a line for a photograph if two particular students, A and B, must always stand together? A student answers $5! - 4!$.', answer: 'The student subtracted arrangements where A and B are *not* together from total',
                  options: ['The student subtracted arrangements where A and B are *not* together from total', 'together'],
                  hint: 'Review factorial simplification (node `c11_app_cbse_06_002`, Examples 1–6) and the "slot method".',
                  misconception: 'Students often treat "vowels never come together" as "all vowels are not in a single block." For example, in the word "FRAGILE" (vowels:.' },
                { id: 'b', prompt: 'A password must be exactly 6 characters long, formed from the letters {A, B, C, D, E} and digits {1, 2, 3}. Repetition is **not** allowed.', answer: 'Step 1: First character (vowel)',
                  options: ['Step 1: First character (vowel)', 'repetition is allowed'],
                  hint: 'Review factorial simplification (node `c11_app_cbse_06_002`, Examples 1–6) and the "slot method".',
                  misconception: 'Students often treat "vowels never come together" as "all vowels are not in a single block." For example, in the word "FRAGILE" (vowels:.' },
                { id: 'c', prompt: 'Compare the number of 4-letter "words" (arrangements) formed from the letters of the word "LOGIC" when: (i) Repetition is NOT allowed.', answer: '(i) $^5P_4 = 120$',
                  options: ['(i) $^5P_4 = 120$', 'ratio is 5'],
                  hint: 'Review factorial simplification (node `c11_app_cbse_06_002`, Examples 1–6) and the "slot method".',
                  misconception: 'Students often treat "vowels never come together" as "all vowels are not in a single block." For example, in the word "FRAGILE" (vowels:.' }
          ],
            remediations: { 'students-often-treat-vowels-never': { steps: ['**Concrete Modeling**: Give the student 3 vowel cards (A, I, E) and 4 consonant cards (F, R, G, L).', 'Ask them to physically create arrangements where "vowels never come together." Have them list 5 valid and 5 invalid.', '**Gap Method Drill**: Draw 4 consonants as `_ C _ C _ C _ C _` (5 gaps).', 'Ask: "In how many gaps can we place 3 vowels so no two share a gap?" Answer: Choose 3 gaps out of 5 ($^5C_3$), then.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_06_005', difficulty: 'standard',
          question: 'Circular permutation is the number of distinct arrangements of n distinct.',
          hint: 'Review c11_app_cbse_06_004 (Permutations) — specifically Theorem 1 (nPr formula) and.',
          misconception: 'Students mechanically apply (n-1)! to *every* circular problem, ignoring whether the circle can be flipped.',
          parts: [
                { id: 'a', prompt: 'Compare the number of arrangements for: (i) 8 distinct beads on a necklace, (ii) 8 distinct flowers in a garland, (iii) 8 students around a circular table.', answer: '(i) and (ii) are equal: both allow flipping, so (8-1)!/2 = 7!/2 = 2520',
                  options: ['(i) and (ii) are equal: both allow flipping, so (8-1)!/2 = 7!/2 = 2520', 'circular', 'dihedral'],
                  hint: 'Review c11_app_cbse_06_004 (Permutations) — specifically Theorem 1 (nPr formula) and Example 22.',
                  misconception: 'Students mechanically apply (n-1)! to *every* circular problem, ignoring whether the circle can be flipped.' }
          ],
            remediations: { 'students-mechanically-apply-n-1': { steps: ['**Physical demonstration:** Use 4 distinct coins on a round paper.', 'Rotate the paper — ask "same arrangement?" Yes.', 'Flip the paper over — ask "same?" For coins (necklace), yes; for people drawn on paper (seating), no, because.', '**Explicit classification drill:** Give 5 scenarios (e.g., "keys on a keyring", "trees around a circular pond".'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_06_006', difficulty: 'standard',
          question: 'Permutations with Restrictions refer to the number of arrangements of *n*.',
          hint: 'Review **c11_app_cbse_06_004 (Permutations)** Examples 17-24, specifically the algebraic.',
          misconception: 'Students treat "A and B never together" as "Total arrangements $-$ Arrangements with A and B together" but calculate.',
          parts: [
                { id: 'a', prompt: 'State the formula for the number of permutations of $n$ different things taken $r$ at a time in which $m$ particular things **never** occur.', answer: 'The formula is $^{n-m}P_r$, valid only when $n - m \\ge r$',
                  options: ['The formula is $^{n-m}P_r$, valid only when $n - m \\ge r$', 'total minus forbidden'],
                  hint: 'Review **c11_app_cbse_06_004 (Permutations)** Examples 17-24, specifically the algebraic.',
                  misconception: 'Students treat "A and B never together" as "Total arrangements $-$ Arrangements with A and B together" but calculate the "together" case.' },
                { id: 'b', prompt: 'A 5-digit code is formed using digits 1–9 without repetition. The code must contain the digit \'5\' but must not contain the digit \'2\'.', answer: 'Total digits available initially: 9',
                  options: ['Total digits available initially: 9', 'must include 5'],
                  hint: 'Review **c11_app_cbse_06_004 (Permutations)** Examples 17-24, specifically the algebraic.',
                  misconception: 'Students treat "A and B never together" as "Total arrangements $-$ Arrangements with A and B together" but calculate the "together" case.' }
          ],
            remediations: { 'students-treat-a-and-b': { steps: ['Ask the student to draw the physical positions (slots) for a small case ($n=5, r=3$).', 'For "Never Together": Force them to place the "separators" (unrestricted items) first on paper, physically draw the.', 'Say: *"Gaps are born from separators.', 'No separators = no gaps."* 3.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
