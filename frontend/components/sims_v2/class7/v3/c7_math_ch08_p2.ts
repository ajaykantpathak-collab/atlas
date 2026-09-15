import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch08_p2: SimDef = {
    id: 'v3_c7_math_ch08_p2',
    title: 'Working with Fractions · Part 2/2',
    subtitle: 'Covers single and multi-step word problems involving multiplication of proper fractions.',
    classLevel: 7, subject: 'mathematics', topic: 'Working with Fractions · Part 2/2',
    chapters: ['c7_math_ch08'],
    nodeIds: ['c7_math_ch08_007', 'c7_math_ch08_008', 'c7_math_ch08_009', 'c7_math_ch08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you went to the local vegetable market with your mother and bought 4 kilograms of potatoes, but you.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'After the farewell party three-fourths of the cake remains, and you are offered half of the leftover. Do you end up with more or less than 3/4 — and why does multiplying fractions shrink the prize?',
        options: ['Less — half of 3/4 is 3/8, because multiplying means taking a portion of a portion', 'More — multiplication always makes things bigger', 'Exactly 3/4 — halves cancel out', 'The same as half a cake — leftovers do not count'],
        answer: 'Less — half of 3/4 is 3/8, because multiplying means taking a portion of a portion',
        hook: 'Fraction multiplication ignores common denominators — multiply straight across, top with top and bottom with bottom. And a whole number joins in as itself over 1: 2/3 x 4 is 8/3, not 8/12.',
    },
    teaching: [
        { title: 'Word Problems Involving Fraction Multiplication', text: 'Solving word problems involving fraction multiplication requires translating real-world scenarios into mathematical expressions where a fractional part of a quantity, fraction, or mixed number.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch08_007', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Solve a tailor problem — find 2/3 of a 3/4 metre cloth strip — then discover what happens every time a fraction meets its own flipped reciprocal.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_007', title: 'Word Problems Involving Fraction Multiplication',
          scaffold: { problem: 'Rahul has a garden plot of land with an area of $12\\frac{1}{2}$ square metres. He plants vegetables in $\\frac{3}{5}$ of the plot.',
            steps: [
            { text: 'Identify the total quantity and the fractional part given in the word problem.' },
            { text: 'Set up the mathematical expression for finding a fraction of a quantity.' },
            { text: 'Convert the mixed number into an improper fraction. $12\\frac{1}{2} = \\frac{12 \\times 2 + 1}{2} = \\frac{25}{2}$.' },
            { text: 'Substitute the improper fraction into the expression and multiply numerators and denominators: $\\frac{3}{5} \\times.' },
            { text: 'Convert the resulting improper fraction back to a mixed number with units: $\\frac{15}{2} = 7\\frac{1}{2}\\text{ m}^2$.', faded: true, blankAnswer: '7\\frac{1}{2}\\text{ m}^2' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_008', title: 'Word Problems Involving Fraction Division',
          scaffold: { problem: 'A milkman has $12\\frac{1}{2}$ litres of milk. He pours it into small bottles that each hold $\\frac{3}{4}$ of a litre.',
            steps: [
            { text: 'Identify given values. Total milk = $12\\frac{1}{2}$ litres; capacity of one bottle = $\\frac{3}{4}$ litre.' },
            { text: 'Convert the mixed number into an improper fraction: $12\\frac{1}{2} = \\frac{12 \\times 2 + 1}{2} = \\frac{25}{2}$ litres.' },
            { text: 'Set up the division expression to find the number of bottles: $\\frac{25}{2} \\div \\frac{3}{4}$.' },
            { text: 'Apply the reciprocal method by changing division to multiplication and inverting the divisor: $\\frac{25}{2} \\times.' },
            { text: 'Simplify the fraction $\\frac{100}{6}$ by dividing numerator and denominator by $2$: $\\frac{50}{3} = 16\\frac{2}{3}$.', faded: true, blankAnswer: '16 full bottles and $\\frac{1}{2}$ litre of milk left over' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_009', title: 'Relationship Between Multiplication and Division of Fractions',
          scaffold: { problem: 'A recipe for making traditional Mysore Pak requires $\\frac{3}{4}$ kg of sugar for a single batch.',
            steps: [
            { text: 'Identify the given total quantity ($6\\frac{3}{4}$ kg) and the quantity per batch ($\\frac{3}{4}$ kg).' },
            { text: 'Convert the mixed fraction into an improper fraction: $6\\frac{3}{4} = \\frac{(6 \\times 4) + 3}{4} = \\frac{27}{4}$.' },
            { text: 'Apply the relationship between multiplication and division by rewriting the division as multiplication by the.' },
            { text: 'Multiply and simplify algebraically: $\\frac{27 \\times 4}{4 \\times 3} = \\frac{27}{3} = 9$.' },
            { text: 'Verify the answer using multiplication (quotient $\\times$ divisor = dividend): $9 \\times \\frac{3}{4} = \\frac{27}{4}.', faded: true, blankAnswer: '9 batches' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_010', title: 'Simplifying Complex Fraction Expressions',
          scaffold: { problem: 'A confectionery shop in Jaipur is packing dry fruit mixtures. A worker has a complex order ratio represented by $\\frac{\\frac{3}{5}.',
            steps: [
            { text: 'Identify the numerator expression ($\\frac{3}{5} + \\frac{1}{2}$) and denominator expression ($\\frac{3}{4}.' },
            { text: 'Simplify the numerator by finding a common denominator (LCD for 5 and 2 is 10): $\\frac{3 \\times 2}{5 \\times 2}.' },
            { text: 'Simplify the denominator by finding a common denominator (LCD for 4 and 3 is 12): $\\frac{3 \\times 3}{4 \\times 3}.' },
            { text: 'Rewrite the complex fraction as a division problem and apply the reciprocal rule: $\\frac{\\frac{11}{10}}{\\frac{5}{12}}.' },
            { text: 'Multiply numerators and denominators, simplifying by common factors if possible: $\\frac{11 \\times 12}{10 \\times 5}.', faded: true, blankAnswer: '\\frac{66}{25} \\text{ kg (or } 2\\frac{16}{25} \\text{ kg)}' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch08_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After the school fair, 3/4 of a big cake is left. Didi tells Mehul he may take home 1/2 of the leftover. Mehul announces, \'Half is half — I get half the whole cake,\' and reaches for the knife.',
            decisions: [{ prompt: 'How much of the original cake is he actually owed?', options: [
                { text: 'Half of the leftover, not half of the whole: \'of\' means multiply, so 1/2 × 3/4 = 3/8 of the original cake — a piece smaller than either fraction because multiplying proper fractions takes a part of a part.', outcome: 'This multiplies numerators and denominators straight across and reads \'fraction of a fraction\' correctly — the product shrinks, it cannot give him half the original.' },
                { text: 'Mehul is right — multiplying by 1/2 still leaves him half the original cake, since multiplication always makes things bigger or equal.', outcome: 'Multiplication by a fraction under 1 shrinks the amount; \'always bigger\' is a whole-number habit that fails for proper fractions.', reveals: 'multiplying-always-grows' },
                { text: 'He gets 1/2 + 3/4 = 5/4 of the cake, because combining shares means adding the fractions.', outcome: 'He is taking a portion of the leftover, not combining two shares — \'of\' signals multiplication, and 5/4 would exceed the whole cake anyway.', reveals: 'of-means-add' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch08_010', title: 'You made it',
          caseStudy: { intro: 'Multiplying fractions is sharing a share. The product of two proper fractions is always smaller than either — because a piece of a piece is a smaller piece.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch08_007', difficulty: 'standard',
          question: 'Solving word problems involving fraction multiplication requires translating.',
          hint: 'Review c7_math_ch08_003 to practice multiplying numerators and denominators and.',
          misconception: 'Students frequently multiply mixed numbers directly by multiplying the whole numbers together and the fractions.',
          parts: [
                { id: 'a', prompt: 'A recipe calls for $2\\frac{1}{2}$ cups of flour. If Rohan wants to make $\\frac{3}{4}$ of the recipe, what operation should he use to find the amount of flour.', answer: 'Rohan should use multiplication ($\\frac{3}{4} \\times 2\\frac{1}{2}$)',
                  options: ['Rohan should use multiplication ($\\frac{3}{4} \\times 2\\frac{1}{2}$)', '$\\frac{3}{4}$ of the recipe'],
                  hint: 'Review c7_math_ch08_003 to practice multiplying numerators and denominators and cross-cancelling.',
                  misconception: 'Students frequently multiply mixed numbers directly by multiplying the whole numbers together and the fractions together separately (e.g.' }
          ],
            remediations: { 'students-frequently-multiply-mixed-numbers': { steps: ['If a student makes this error, pause and remind them that mixed numbers represent a single combined quantity.', 'Ask them to write the mixed number as an addition sentence first ($2\\frac{1}{3} = 2 + \\frac{1}{3}$) and explain why.', 'Show them side-by-side that the direct product method yields a drastically wrong result compared to the improper.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_008', difficulty: 'standard',
          question: 'Word problems involving fraction division require translating real-world.',
          hint: 'Review c7_math_ch08_004 to practice flipping divisors and converting division.',
          misconception: 'Students often convert mixed numbers to improper fractions correctly but then forget to invert the divisor when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems involving fraction division require translating real-world scenarios of',
                  options: ['Word problems involving fraction division require translating real-world scenarios of', 'Multiplication of fractions is an operation where two or more fractional numbers are', 'Multiplying a fraction by a whole number means finding a repeated sum or a fractional', 'Multiplying two fractions involves multiplying their numerators together to form the new'],
                  hint: 'Review c7_math_ch08_004 to practice flipping divisors and converting division to multiplication.',
                  misconception: 'Students often convert mixed numbers to improper fractions correctly but then forget to invert the divisor when performing division.' }
          ],
            remediations: { 'students-often-convert-mixed-numbers': { steps: ['Remind the student to explicitly circle the word "each" or "per" in the problem to identify the size of the group.', 'Write out the rule: "Keep the first fraction, Change division to multiplication, Flip the second fraction.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_009', difficulty: 'standard',
          question: 'The relationship between multiplication and division of fractions states that.',
          hint: 'Review c7_math_ch08_004 to practice finding reciprocals and converting division signs.',
          misconception: 'Students often invert the *dividend* (the first fraction) instead of the *divisor* (the second fraction) when.',
          parts: [
                { id: 'a', prompt: 'Which fraction operation is mathematically equivalent to dividing any number by a fraction $\\frac{c}{d}$?', answer: 'Multiplying by the reciprocal $\\frac{d}{c}$',
                  options: ['Multiplying by the reciprocal $\\frac{d}{c}$', 'dividing by the reciprocal', 'multiplying by the same fraction'],
                  hint: 'Review c7_math_ch08_004 to practice finding reciprocals and converting division signs into.',
                  misconception: 'Students often invert the *dividend* (the first fraction) instead of the *divisor* (the second fraction) when converting a division problem.' }
          ],
            remediations: { 'students-often-invert-the-dividend': { steps: ['Remind the student using the whole number analogy: in $12 \\div 3 = 4$, the number 12 stays untouched, and we multiply.', 'Say to the student: "Keep the first fraction safe and unchanged, flip only the second fraction after the division sign.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_010', difficulty: 'standard',
          question: 'Simplifying complex fraction expressions involves reducing multi-layered.',
          hint: 'Review c7_math_ch08_004 to practice the reciprocal method for fraction division.',
          misconception: 'Students often cancel terms across addition and subtraction signs in complex fractions—such as cancelling the 3.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Simplifying complex fraction expressions involves reducing multi-layered or compound',
                  options: ['Simplifying complex fraction expressions involves reducing multi-layered or compound', 'Multiplication of fractions is an operation where two or more fractional numbers are', 'Multiplying a fraction by a whole number means finding a repeated sum or a fractional', 'Multiplying two fractions involves multiplying their numerators together to form the new'],
                  hint: 'Review c7_math_ch08_004 to practice the reciprocal method for fraction division.',
                  misconception: 'Students often cancel terms across addition and subtraction signs in complex fractions—such as cancelling the 3 in $\\frac{2 + 3}{3 + 4}$.' }
          ],
            remediations: { 'students-often-cancel-terms-across': { steps: ['Remind the student that a fraction bar acts like a pair of brackets: you must completely simplify the top part into.', 'Show them by covering the bottom with your hand, solving the top addition/subtraction using a common denominator, then.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
