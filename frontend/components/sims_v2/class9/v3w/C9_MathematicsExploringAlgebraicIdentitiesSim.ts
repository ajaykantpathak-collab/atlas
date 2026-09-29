import type { SimDef } from '../../engine/types';
import C9_MathematicsExploringAlgebraicIdentitiesSim from '../../../simulations/c6_12/C9_MathematicsExploringAlgebraicIdentitiesSim';

/** v3 wrapped master — C9_MathematicsExploringAlgebraicIdentitiesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_mathematicsexploringalgebraicidentitiessim: SimDef = {
    id: 'v3w_c9_mathematicsexploringalgebraicidentitiessim',
    title: 'Algebraic Identities: (a+b)^2 and (a-b)^2',
    subtitle: 'This node covers the derivation, application, and verification of \\((a+b)^2\\) and.',
    classLevel: 9, subject: 'mathematics', topic: 'Algebraic Identities: (a+b)^2 and (a-b)^2',
    chapters: [],
    nodeIds: ['c9_math_ch4_1', 'c9_math_ch4_2', 'c9_math_ch4_3', 'c9_math_ch4_4', 'c9_math_ch4_5', 'c9_math_ch4_6', 'c9_math_ch4_7', 'c9_math_ch4_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are at a stationery shop buying notebooks: each notebook costs ₹\\(x\\) and you buy \\(x+5\\).', goal: 'Master Algebraic Identities: (a+b)^2 and (a-b)^2.' },
    discovery: {
        question: 'What is the greatest common factor (GCF) of the terms \\(12x^3y^2\\) and \\(18x^2y^4\\)?',
        options: ['The GCF is \\(6x^2y^2\\)', 'greatest common factor', 'largest term'],
        answer: 'The GCF is \\(6x^2y^2\\)',
        hook: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 +.',
    },
    teaching: [
        { title: 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\).', text: 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are algebraic statements that hold true for all real values of \\(a\\) and \\(b\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_math_ch4_1', title: 'The identities \\((a+b)^2 = a^2 + 2ab +.',
          scaffold: { problem: 'A square plot of land has side length \\((3x - 4)\\) metres. Find the area of the plot in terms of \\(x\\).',
            steps: [
            { text: 'Recognise that area of a square = side × side. Here side = \\((3x - 4)\\) m, so Area = \\((3x - 4)^2\\).' },
            { text: 'Identify the identity for square of a difference: \\((a-b)^2 = a^2 - 2ab + b^2\\). Here \\(a = 3x\\), \\(b = 4\\).' },
            { text: 'Substitute into the identity: \\((3x)^2 - 2(3x)(4) + (4)^2\\).' },
            { text: 'Compute each term: \\((3x)^2 = 9x^2\\), \\(-2(3x)(4) = -24x\\), \\((4)^2 = 16\\). So Area = \\(9x^2 - 24x + 16\\) sq. m.' },
            { text: 'Substitute \\(x = 5\\): \\(9(5)^2 - 24(5) + 16 = 9(25) - 120 + 16 = 225 - 120 + 16 = 121\\) sq. m.', faded: true, blankAnswer: 'Area = \\(9x^2 - 24x + 16\\) sq. m; for \\(x=5\\), Area = 121.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_2', title: 'The algebraic identity a² - b² =.',
          scaffold: { problem: 'Compute 95² - 5² using the identity. Show the steps and verify by direct calculation.',
            steps: [
            { text: 'Identify a and b. a = 95, b = 5.' },
            { text: 'Apply identity. 95² - 5² = (95+5)(95-5) = (100)(90) = 9000.' },
            { text: 'Verify by direct calculation. 95² = 9025, 5² = 25, difference = 9025 - 25 = 9000. Confirmed.', faded: true, blankAnswer: '95² - 5² = (95+5)(95-5) = (100)(90) = 9000. Verified: 9025.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_3', title: 'The algebraic identity \\((a + b +.',
          scaffold: { problem: 'A square plot of land has side length \\((2x + 3y + 4)\\) metres. Find the area of the plot in expanded form.',
            steps: [
            { text: 'Identify that area of a square = (side)^2. Here side = \\(2x + 3y + 4\\). So we need to expand \\((2x + 3y + 4)^2\\).' },
            { text: 'Apply the identity \\((a+b+c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca\\) with \\(a = 2x\\), \\(b = 3y\\), \\(c = 4\\).' },
            { text: 'Compute each of the six terms: \\(a^2 = (2x)^2 = 4x^2\\); \\(b^2 = (3y)^2 = 9y^2\\); \\(c^2 = 4^2 = 16\\); \\(2ab = 2(2x)(3y).' },
            { text: 'Write the expanded algebraic expression: Area = \\(4x^2 + 9y^2 + 16 + 12xy + 24y + 16x\\) (arranged in descending powers.' },
            { text: 'Substitute \\(x = 10\\), \\(y = 5\\): \\(4(100) + 9(25) + 16 + 12(10)(5) + 24(5) + 16(10) = 400 + 225 + 16 + 600 + 120 + 160.', faded: true, blankAnswer: 'Algebraic area = \\(4x^2 + 9y^2 + 12xy + 16x + 24y + 16\\) sq.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_4', title: 'Geometrical visualisation of algebraic.',
          scaffold: { problem: 'A square park has side length (2x + 5) metres. It is divided into four rectangular zones by two straight paths of width 1 metre running.',
            steps: [
            { text: 'Identify the total side length of the square park as (2x + 5) m. Recognise that (2x+5) can be written as (x + (x+5)).' },
            { text: 'Draw a square of side (a+b). Partition it by drawing a vertical line at distance a = x from the left edge, and a.' },
            { text: 'Label the areas of the four sub-regions using the geometric model of (a+b)² = a² + 2ab + b²: bottom-left square: a² =.' },
            { text: 'Compute each area algebraically: x², x(x+5) = x²+5x, (x+5)x = x²+5x, (x+5)² = x²+10x+25.' },
            { text: 'Verify by directly expanding the total area: (2x+5)² = (2x)² + 2(2x)(5) + 5² = 4x² + 20x + 25.', faded: true, blankAnswer: 'The four zones have areas: x² m², (x²+5x) m², (x²+5x) m²,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_5', title: 'Factorisation by the common factor.',
          scaffold: { problem: 'A school library has \\(18x^2y\\) Hindi books, \\(27xy^2\\) English books, and \\(9xy\\) Sanskrit books.',
            steps: [
            { text: 'Identify the algebraic expressions for each type: \\(18x^2y\\), \\(27xy^2\\), \\(9xy\\).' },
            { text: 'Find the GCF of the numerical coefficients: 18, 27, 9. Prime factorisation: \\(18=2\\times3^2\\), \\(27=3^3\\), \\(9=3^2\\).' },
            { text: 'Find the GCF of the variable parts: For \\(x\\): powers are \\(x^2, x^1, x^1\\) → lowest power is \\(x^1\\).' },
            { text: 'Combine: GCF = \\(9xy\\). This is the maximum number of shelves.' },
            { text: 'Divide each term by \\(9xy\\) to get books per shelf: \\(18x^2y ÷ 9xy = 2x\\); \\(27xy^2 ÷ 9xy = 3y\\); \\(9xy ÷ 9xy = 1\\).' },
            { text: 'Verify: \\(9xy(2x + 3y + 1) = 18x^2y + 27xy^2 + 9xy\\). Correct.', faded: true, blankAnswer: 'Maximum shelves = \\(9xy\\). Books per shelf: \\(2x\\) Hindi,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch4_6', title: 'Factorisation by grouping terms is a.',
          scaffold: { problem: 'The area of a rectangular plot is given by the expression `12x² + 16x + 9x + 12` square metres.',
            steps: [
            { text: 'Identify that the expression has 4 terms with no single common factor across all terms.' },
            { text: 'Factor out the greatest common factor from the first group: `4x(3x + 4)`.' },
            { text: 'Rewrite the expression using these factorised groups: `4x(3x + 4) + 3(3x + 4)`.' },
            { text: 'Observe that both terms now have a common binomial factor `(3x + 4)`. Factor this out: `(3x + 4)(4x + 3)`.' },
            { text: 'Verify by expanding: `(3x + 4)(4x + 3) = 12x² + 9x + 16x + 12 = 12x² + 25x + 12`.', faded: true, blankAnswer: 'Length = `(3x + 4)` metres, Breadth = `(4x + 3)` metres (or.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_math_ch4_2', title: 'Identify each idea',
          dissect: { specimen: 'Algebraic Identities: (a+b)^2 and (a-b)^2', spots: [
            { id: 's1', label: 'The identities ab2 a2', prompt: 'Which idea is this? — The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are.', answer: 'The identities ab2 a2', options: ['The identities ab2 a2', 'The algebraic identity a -', 'The algebraic identity a', 'Geometrical visualisation of algebraic identities'] },
            { id: 's2', label: 'The algebraic identity a -', prompt: 'Which idea is this? — The algebraic identity a² - b² = (a+b)(a-b) states that the difference of two squares.', answer: 'The algebraic identity a -', options: ['The algebraic identity a -', 'The identities ab2 a2', 'The algebraic identity a', 'Geometrical visualisation of algebraic identities'] },
            { id: 's3', label: 'The algebraic identity a', prompt: 'Which idea is this? — The algebraic identity \\((a + b + c)^2\\) expands to the sum of squares of each term plus.', answer: 'The algebraic identity a', options: ['The algebraic identity a', 'The identities ab2 a2', 'The algebraic identity a -', 'Geometrical visualisation of algebraic identities'] },
            { id: 's4', label: 'Geometrical visualisation of algebraic identities', prompt: 'Which idea is this? — Geometrical visualisation of algebraic identities represents algebraic expressions as.', answer: 'Geometrical visualisation of algebraic identities', options: ['Geometrical visualisation of algebraic identities', 'The identities ab2 a2', 'The algebraic identity a -', 'The algebraic identity a'] },
            { id: 's5', label: 'Factorisation by the common factor', prompt: 'Which idea is this? — Factorisation by the common factor method is the process of writing an algebraic.', answer: 'Factorisation by the common factor', options: ['Factorisation by the common factor', 'The identities ab2 a2', 'The algebraic identity a -', 'The algebraic identity a'] },
            { id: 's6', label: 'Factorisation by grouping terms is', prompt: 'Which idea is this? — Factorisation by grouping terms is a method used to factorise algebraic expressions with.', answer: 'Factorisation by grouping terms is', options: ['Factorisation by grouping terms is', 'The identities ab2 a2', 'The algebraic identity a -', 'The algebraic identity a'] }
          ] } }
    ],
    explore: { component: C9_MathematicsExploringAlgebraicIdentitiesSim, prompt: 'Explore the interactive — Algebraic Identities: (a+b)^2 and (a-b)^2' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch4_1', difficulty: 'standard',
          question: 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\).',
          hint: 'Revisit the distributive property with algebraic terms (c8_math_ch6_1) and practice.',
          misconception: 'Students often write \\((a+b)^2 = a^2 + b^2\\) (missing the middle term \\(2ab\\)) or \\((a-b)^2 = a^2 - b^2\\) (missing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are',
                  options: ['The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are', 'The algebraic identity a² - b² = (a+b)(a-b) states that the difference of two squares', 'The algebraic identity \\((a + b + c)^2\\) expands to the sum of squares of each term plus', 'Geometrical visualisation of algebraic identities represents algebraic expressions as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\((a+b)^2 = a^2 + b^2\\) (missing the middle term \\(2ab\\)) or \\((a-b)^2 = a^2 - b^2\\) (missing \\(-2ab\\)).' }
          ],
            remediations: { 'students-often-write-a-b': { steps: ['Ask the student to compute \\((2+3)^2\\) and \\(2^2+3^2\\) numerically to see they are not equal.', 'Use the area model: draw a square of side \\((a+b)\\), divide into two rectangles and two smaller squares.', 'For \\((a-b)^2\\), draw a square of side \\(a\\), remove a strip of width \\(b\\) from two sides, and add back the.', 'Practice 5 expansions with simple numbers first, then algebraic terms, insisting on writing the middle term explicitly.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_2', difficulty: 'standard',
          question: 'The algebraic identity a² - b² = (a+b)(a-b) states that the difference of two.',
          hint: 'Revisit c9_math_ch4_1 ((a+b)² and (a-b)² identities) to distinguish a² - b² from (a-b)².',
          misconception: 'Students confuse a² - b² (difference of squares) with (a-b)² (square of difference).',
          parts: [
                { id: 'a', prompt: 'State the identity a² - b² = (a+b)(a-b) and prove it by expanding the right side.', answer: 'Identity: a² - b² = (a+b)(a-b)',
                  options: ['Identity: a² - b² = (a+b)(a-b)', 'a² - b² = a² - b², so it\'s true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse a² - b² (difference of squares) with (a-b)² (square of difference).' }
          ],
            remediations: { 'students-confuse-a-b-difference': { steps: ['Write a² - b² and (a-b)² side by side.', 'Expand both: a² - b² = a² - b² (already simplified).', 'Point out the difference: (a-b)² has a -2ab term that a² - b² does not.', 'Give numerical examples: 5² - 3² = 16, (5-3)² = 4.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse a² - b² (difference of squares) with (a-b)² (square of difference).',
          parts: [
                { id: 'a', prompt: 'Simplify: (x² - 9) / (x + 3).', answer: '(x² - 9) / (x + 3) = (x+3)(x-3) / (x+3) = x - 3 (for x ≠ -3)',
                  options: ['(x² - 9) / (x + 3) = (x+3)(x-3) / (x+3) = x - 3 (for x ≠ -3)', 'cannot be simplified'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse a² - b² (difference of squares) with (a-b)² (square of difference).' }
          ],
            remediations: { 'students-confuse-a-b-difference': { steps: ['Write a² - b² and (a-b)² side by side.', 'Expand both: a² - b² = a² - b² (already simplified).', 'Point out the difference: (a-b)² has a -2ab term that a² - b² does not.', 'Give numerical examples: 5² - 3² = 16, (5-3)² = 4.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_3', difficulty: 'standard',
          question: 'The algebraic identity \\((a + b + c)^2\\) expands to the sum of squares of each.',
          hint: 'If stuck, revisit the expansion of \\((a+b)^2\\) using the area model (c8_math_ch6_10) and.',
          misconception: 'Students often write the cross terms as \\(ab + bc + ca\\) (missing the factor of 2) because they think "each pair.',
          parts: [
                { id: 'a', prompt: 'Write the expansion of \\((x + 2y + 3z)^2\\) using the identity. Do not multiply term-by-term; state the six terms directly from the formula.', answer: '\\(x^2 + 4y^2 + 9z^2 + 4xy + 12yz + 6zx\\)',
                  options: ['\\(x^2 + 4y^2 + 9z^2 + 4xy + 12yz + 6zx\\)', 'twice the product'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the cross terms as \\(ab + bc + ca\\) (missing the factor of 2) because they think "each pair multiplies once" and.' }
          ],
            remediations: { 'students-often-write-the-cross': { steps: ['If a student misses the factor of 2 in cross terms, have them write \\((a+b+c)(a+b+c)\\) and multiply systematically.', 'They will see \\(ab\\) and \\(ba\\) as two separate boxes that sum to \\(2ab\\).', 'For coefficient errors, isolate the term: "What is \\((2x)^2\\)?', 'Write it as \\((2x)(2x)\\) and compute." For sign errors on squares, remind them: "What is \\((-3)^2\\)?'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_4', difficulty: 'standard',
          question: 'Geometrical visualisation of algebraic identities represents algebraic.',
          hint: 'If stuck, revisit the distributive property using area models from c8_math_ch6_10 and.',
          misconception: 'Students often draw the partition lines for (a+b)² at arbitrary positions instead of exactly at distance a from one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Geometrical visualisation of algebraic identities represents algebraic expressions as',
                  options: ['Geometrical visualisation of algebraic identities represents algebraic expressions as', 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are', 'The algebraic identity a² - b² = (a+b)(a-b) states that the difference of two squares', 'The algebraic identity \\((a + b + c)^2\\) expands to the sum of squares of each term plus'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often draw the partition lines for (a+b)² at arbitrary positions instead of exactly at distance a from one side, leading to.' }
          ],
            remediations: { 'students-often-draw-the-partition': { steps: ['If a student draws incorrect partitions: 1) Have them physically cut out a square of side (a+b) from graph paper (e.g.,.', '2) Ask them to cut along lines at distance a=4cm from left and bottom.', '3) Let them measure the four pieces: a 4×4 square, a 3×3 square, and two 4×3 rectangles.', '4) Have them compute areas and sum to verify (4+3)² = 49.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often draw the partition lines for (a+b)² at arbitrary positions instead of exactly at distance a from one.',
          parts: [
                { id: 'a', prompt: 'A student claims that the identity a² - b² = (a+b)(a-b) can be visualised by drawing a rectangle of sides (a+b) and (a-b) directly.', answer: 'The claim is correct',
                  options: ['The claim is correct', 'no, you cannot multiply (a+b) and (a-b) directly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often draw the partition lines for (a+b)² at arbitrary positions instead of exactly at distance a from one side, leading to.' }
          ],
            remediations: { 'students-often-draw-the-partition': { steps: ['If a student draws incorrect partitions: 1) Have them physically cut out a square of side (a+b) from graph paper (e.g.,.', '2) Ask them to cut along lines at distance a=4cm from left and bottom.', '3) Let them measure the four pieces: a 4×4 square, a 3×3 square, and two 4×3 rectangles.', '4) Have them compute areas and sum to verify (4+3)² = 49.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_5', difficulty: 'standard',
          question: 'Factorisation by the common factor method is the process of writing an.',
          hint: 'If stuck, revisit c8_math_ch6_1 (distributive property) and c6_math_ch01_015 (prime.',
          misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 +.',
          parts: [
                { id: 'a', prompt: 'What is the greatest common factor (GCF) of the terms \\(12x^3y^2\\) and \\(18x^2y^4\\)?', answer: 'The GCF is \\(6x^2y^2\\)',
                  options: ['The GCF is \\(6x^2y^2\\)', 'greatest common factor', 'largest term'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 + x^2\\), they write.' },
                { id: 'b', prompt: 'Explain why \\(3x(x+2)\\) is the fully factorised form of \\(3x^2 + 6x\\), but \\(x(3x+6)\\) is not considered fully factorised.', answer: '\\(3x(x+2)\\) is fully factorised',
                  options: ['\\(3x(x+2)\\) is fully factorised', 'both are correct', 'factorise completely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 + x^2\\), they write.' },
                { id: 'c', prompt: 'Factorise completely: \\(14a^2b - 21ab^2 + 7ab\\).', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'greatest common factor', 'largest term'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 + x^2\\), they write.' }
          ],
            remediations: { 'students-often-take-the-common': { steps: ['Go back to numbers: Find HCF of 12, 18, 24 by prime factorisation (c6_math_ch01_015).', 'Show that HCF uses the LOWEST power of each prime.', 'Use algebra tiles or area model: Draw a rectangle of area \\(x^2 + x\\).', 'Show that the side length common to both \\(x^2\\) and \\(x\\) is \\(x\\) (not \\(x^2\\)).'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 +.',
          parts: [
                { id: 'a', prompt: 'Create a polynomial of three terms in variables \\(x\\) and \\(y\\) whose GCF is \\(5x^2y\\) and whose factorised form is \\(5x^2y(3x - 2y + 4)\\).', answer: 'Expanded form: \\(15x^3y - 10x^2y^2 + 20x^2y\\)',
                  options: ['Expanded form: \\(15x^3y - 10x^2y^2 + 20x^2y\\)', 'greatest common factor', 'largest term'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often take the common factor as the product of common variables with the HIGHEST power (e.g., for \\(x^3 + x^2\\), they write.' }
          ],
            remediations: { 'students-often-take-the-common': { steps: ['Go back to numbers: Find HCF of 12, 18, 24 by prime factorisation (c6_math_ch01_015).', 'Show that HCF uses the LOWEST power of each prime.', 'Use algebra tiles or area model: Draw a rectangle of area \\(x^2 + x\\).', 'Show that the side length common to both \\(x^2\\) and \\(x\\) is \\(x\\) (not \\(x^2\\)).'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch4_6', difficulty: 'standard',
          question: 'Factorisation by grouping terms is a method used to factorise algebraic.',
          hint: 'Review c9_math_ch4_5 (Common Factor Method) and c8_math_ch6_1 (Distributive Property).',
          misconception: 'Students often incorrectly factor out a negative sign from the second group.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Factorisation by grouping terms is a method used to factorise algebraic expressions with',
                  options: ['Factorisation by grouping terms is a method used to factorise algebraic expressions with', 'The identities \\((a+b)^2 = a^2 + 2ab + b^2\\) and \\((a-b)^2 = a^2 - 2ab + b^2\\) are', 'The algebraic identity a² - b² = (a+b)(a-b) states that the difference of two squares', 'The algebraic identity \\((a + b + c)^2\\) expands to the sum of squares of each term plus'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often incorrectly factor out a negative sign from the second group.' }
          ],
            remediations: { 'students-often-incorrectly-factor-out': { steps: ['If a student makes this sign error, have them rewrite the expression with explicit plus signs: `6x² + (-9x) + (-4x) +.', 'Then group as `[6x² + (-9x)] + [(-4x) + 6]`.', 'Factor each bracket: `3x(2x - 3) + (-2)(2x - 3)`.', 'Emphasise that the second group\'s common factor is `-2`, not `2`, and the binomial inside must match the first group.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
