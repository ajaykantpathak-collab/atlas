import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch08_p1: SimDef = {
    id: 'v3_c7_math_ch08_p1',
    title: 'Working with Fractions · Part 1/2',
    subtitle: 'Covers the conceptual meaning of multiplying fractions as "taking a fraction of.',
    classLevel: 7, subject: 'mathematics', topic: 'Working with Fractions · Part 1/2',
    chapters: ['c7_math_ch08'],
    nodeIds: ['c7_math_ch08_001', 'c7_math_ch08_002', 'c7_math_ch08_003', 'c7_math_ch08_004', 'c7_math_ch08_005', 'c7_math_ch08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you bought a large cake for your school farewell party, and after the party, $\\frac{3}{4}$ of the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'After the farewell party three-fourths of the cake remains, and you are offered half of the leftover. Do you end up with more or less than 3/4 — and why does multiplying fractions shrink the prize?',
        options: ['Less — half of 3/4 is 3/8, because multiplying means taking a portion of a portion', 'More — multiplication always makes things bigger', 'Exactly 3/4 — halves cancel out', 'The same as half a cake — leftovers do not count'],
        answer: 'Less — half of 3/4 is 3/8, because multiplying means taking a portion of a portion',
        hook: 'Fraction multiplication ignores common denominators — multiply straight across, top with top and bottom with bottom. And a whole number joins in as itself over 1: 2/3 x 4 is 8/3, not 8/12.',
    },
    teaching: [
        { title: 'Multiplication of Fractions: Concept and Method', text: 'Multiplication of fractions is an operation where two or more fractional numbers are combined by multiplying their numerators together to form the new numerator and their denominators together.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch08_001', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Solve a tailor problem — find 2/3 of a 3/4 metre cloth strip — then discover what happens every time a fraction meets its own flipped reciprocal.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_001', title: 'Multiplication of Fractions: Concept and Method',
          scaffold: { problem: 'Rahul buys $2\\frac{1}{2}$ kg of potatoes from the local vegetable market.',
            steps: [
            { text: 'Identify the given quantities: total potatoes = $2\\frac{1}{2}$ kg, fraction used = $\\frac{3}{5}$.' },
            { text: 'Convert the mixed fraction $2\\frac{1}{2}$ into an improper fraction: $\\frac{(2 \\times 2) + 1}{2} = \\frac{5}{2}$.' },
            { text: 'Set up the multiplication expression: $\\frac{5}{2} \\times \\frac{3}{5}$.' },
            { text: 'Multiply the numerators together and the denominators together: $\\frac{5 \\times 3}{2 \\times 5} = \\frac{15}{10}$.' },
            { text: 'Simplify the fraction by dividing numerator and denominator by their HCF (5), and attach units: $\\frac{15 \\div 5}{10.', faded: true, blankAnswer: '1\\frac{1}{2} kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_002', title: 'Multiplying a Fraction by a Whole Number',
          scaffold: { problem: 'A running track is $\\frac{7}{8}$ km long. Amit runs around the track 4 times. What is the total distance covered by Amit in kilometres?',
            steps: [
            { text: 'Identify the given values: distance of one lap = $\\frac{7}{8}$ km, number of laps = 4.' },
            { text: 'Set up the mathematical expression for total distance: $4 \\times \\frac{7}{8}$.' },
            { text: 'Multiply the whole number by the numerator while keeping the denominator unchanged: $\\frac{4 \\times 7}{8}.' },
            { text: 'Simplify the resulting fraction by finding the HCF of 28 and 8, which is 4, and dividing both numbers: $\\frac{28 \\div.' },
            { text: 'Convert the improper fraction to a mixed number: $\\frac{7}{2} = 3\\frac{1}{2}$ km.', faded: true, blankAnswer: '3\\frac{1}{2} km' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_003', title: 'Multiplying Two Fractions: Numerator and Denominator Rule',
          scaffold: { problem: 'Riya buys $\\frac{3}{4}$ kg of sweets. Her brother eats $\\frac{2}{3}$ of these sweets.',
            steps: [
            { text: 'Identify the given quantities: Total sweets bought = $\\frac{3}{4}$ kg, fraction eaten by brother = $\\frac{2}{3}$ of the.' },
            { text: 'Determine the operation required: Finding a fraction of a fraction requires multiplication, so we need to compute.' },
            { text: 'Apply the numerator and denominator rule: Multiply numerators together and denominators together: $\\frac{2 \\times 3}{3.' },
            { text: 'Compute the intermediate product: $\\frac{6}{12}$.' },
            { text: 'Simplify the fraction by dividing the numerator and denominator by their greatest common divisor, 6: $\\frac{6 \\div.', faded: true, blankAnswer: '$\\frac{1}{2}$ kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_004', title: 'Division of Fractions: Reciprocal Method',
          scaffold: { problem: 'A tailor has a ribbon of length $5\\frac{1}{4}$ metres. If she cuts it into smaller pieces of length $\\frac{3}{4}$ of a metre each, how many.',
            steps: [
            { text: 'Identify the total length of the ribbon ($5\\frac{1}{4}$ m) and the length of each cut piece ($\\frac{3}{4}$ m).' },
            { text: 'Convert the mixed fraction $5\\frac{1}{4}$ into an improper fraction: $\\frac{(5 \\times 4) + 1}{4} = \\frac{21}{4}$.' },
            { text: 'Apply the reciprocal method by changing the division sign to multiplication and writing the reciprocal of the divisor.' },
            { text: 'Multiply numerators and denominators while cross-simplifying: $\\frac{21 \\times 4}{4 \\times 3} = \\frac{84}{12}$.' },
            { text: 'Divide 84 by 12 to get the final whole number result: $7$ pieces of ribbon.', faded: true, blankAnswer: '7 pieces' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_005', title: 'Dividing a Fraction by a Whole Number',
          scaffold: { problem: 'Priya has $\\frac{3}{5}$ of a litre of milk in a container. She pours it equally into 4 small glasses.',
            steps: [
            { text: 'Identify the given quantity of milk ($\\frac{3}{5}$ litre) and the number of equal parts to divide into ($4$ glasses).' },
            { text: 'Convert the whole number divisor $4$ into a fraction with a denominator of $1$, giving $\\frac{4}{1}$.' },
            { text: 'Rewrite the division problem as multiplication by the reciprocal of the divisor: $\\frac{3}{5} \\times \\frac{1}{4}$.' },
            { text: 'Multiply the numerators together ($3 \\times 1 = 3$) and the denominators together ($5 \\times 4 = 20$) to get the.' },
            { text: 'Verify that the fraction is in its lowest terms and state the final answer with units: $\\frac{3}{20}$ of a litre.', faded: true, blankAnswer: '$\\frac{3}{20}$ litres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_006', title: 'Dividing One Fraction by Another',
          scaffold: { problem: 'A tailor has a ribbon of length $\\frac{7}{8}$ metres. If small pieces of length $\\frac{1}{4}$ metre are cut from it, how many full pieces.',
            steps: [
            { text: 'Identify the total length of ribbon ($\\frac{7}{8}$ m) and the length of each cut piece ($\\frac{1}{4}$ m).' },
            { text: 'Apply the reciprocal rule by changing the division sign to multiplication and writing the reciprocal of the divisor.' },
            { text: 'Rewrite the expression as fraction multiplication: $\\frac{7}{8} \\times \\frac{4}{1}$.' },
            { text: 'Multiply numerators and denominators: $\\frac{7 \\times 4}{8 \\times 1} = \\frac{28}{8}$.' },
            { text: 'Simplify the improper fraction $\\frac{28}{8}$ by dividing numerator and denominator by their HCF (4), yielding.', faded: true, blankAnswer: '3 full pieces (with $\\frac{1}{8}$ m of ribbon remaining)' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch08_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After the school fair, 3/4 of a big cake is left. Didi tells Mehul he may take home 1/2 of the leftover. Mehul announces, \'Half is half — I get half the whole cake,\' and reaches for the knife.',
            decisions: [{ prompt: 'How much of the original cake is he actually owed?', options: [
                { text: 'Half of the leftover, not half of the whole: \'of\' means multiply, so 1/2 × 3/4 = 3/8 of the original cake — a piece smaller than either fraction because multiplying proper fractions takes a part of a part.', outcome: 'This multiplies numerators and denominators straight across and reads \'fraction of a fraction\' correctly — the product shrinks, it cannot give him half the original.' },
                { text: 'Mehul is right — multiplying by 1/2 still leaves him half the original cake, since multiplication always makes things bigger or equal.', outcome: 'Multiplication by a fraction under 1 shrinks the amount; \'always bigger\' is a whole-number habit that fails for proper fractions.', reveals: 'multiplying-always-grows' },
                { text: 'He gets 1/2 + 3/4 = 5/4 of the cake, because combining shares means adding the fractions.', outcome: 'He is taking a portion of the leftover, not combining two shares — \'of\' signals multiplication, and 5/4 would exceed the whole cake anyway.', reveals: 'of-means-add' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Multiplying fractions is sharing a share. The product of two proper fractions is always smaller than either — because a piece of a piece is a smaller piece.',
            decisions: [{ prompt: 'What comes next? Working with Fractions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Working with Fractions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch08_001', difficulty: 'standard',
          question: 'Multiplication of fractions is an operation where two or more fractional.',
          hint: 'Review c6_math_ch03_030 to practice converting mixed fractions into improper fractions.',
          misconception: 'Students often mistakenly apply the rules of fraction addition and subtraction to multiplication by finding a common.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplication of fractions is an operation where two or more fractional numbers are',
                  options: ['Multiplication of fractions is an operation where two or more fractional numbers are', 'Multiplying a fraction by a whole number means finding a repeated sum or a fractional', 'Multiplying two fractions involves multiplying their numerators together to form the new', 'The division of fractions using the reciprocal method is a rule where dividing any'],
                  hint: 'Review c6_math_ch03_030 to practice converting mixed fractions into improper fractions before.',
                  misconception: 'Students often mistakenly apply the rules of fraction addition and subtraction to multiplication by finding a common denominator before.' }
          ],
            remediations: { 'students-often-mistakenly-apply-the': { steps: ['Stop the student immediately and draw a visual area model, such as a rectangle divided into grids, to show that.', 'Explicitly review the rule: "Numerators straight across, denominators straight across." Write out the steps clearly.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_002', difficulty: 'standard',
          question: 'Multiplying a fraction by a whole number means finding a repeated sum or.',
          hint: 'Review c6_math_ch03_035 for foundational fraction multiplication and c6_math_ch01_013 for.',
          misconception: 'Students frequently multiply both the numerator AND the denominator of a fraction by the whole number (e.g.',
          parts: [
                { id: 'a', prompt: 'What is the rule for multiplying a whole number by a fraction $\\frac{a}{b}$?', answer: 'The correct rule is to multiply the whole number by the numerator and keep the',
                  options: ['The correct rule is to multiply the whole number by the numerator and keep the', 'scaling applies to both parts equally'],
                  hint: 'Review c6_math_ch03_035 for foundational fraction multiplication and c6_math_ch01_013 for.',
                  misconception: 'Students frequently multiply both the numerator AND the denominator of a fraction by the whole number (e.g., calculating $4 \\times.' },
                { id: 'b', prompt: 'Rahul says that $5 \\times \\frac{2}{3}$ is equal to $\\frac{10}{15}$ because he multiplied both the top and bottom numbers by 5. Is Rahul correct?', answer: 'Rahul is incorrect',
                  options: ['Rahul is incorrect', 'scaling applies to both parts equally'],
                  hint: 'Review c6_math_ch03_035 for foundational fraction multiplication and c6_math_ch01_013 for.',
                  misconception: 'Students frequently multiply both the numerator AND the denominator of a fraction by the whole number (e.g., calculating $4 \\times.' },
                { id: 'c', prompt: 'Calculate the product of 6 and $\\frac{4}{9}$, and express your answer in its simplest form.', answer: '$\\frac{8}{3}$ (or $2\\frac{2}{3}$)',
                  options: ['$\\frac{8}{3}$ (or $2\\frac{2}{3}$)', 'scaling applies to both parts equally'],
                  hint: 'Review c6_math_ch03_035 for foundational fraction multiplication and c6_math_ch01_013 for.',
                  misconception: 'Students frequently multiply both the numerator AND the denominator of a fraction by the whole number (e.g., calculating $4 \\times.' },
                { id: 'd', prompt: 'Compare the product of $4 \\times \\frac{3}{5}$ and the sum of $\\frac{3}{5} + \\frac{3}{5} + \\frac{3}{5} + \\frac{3}{5}$.', answer: 'Both expressions equal $\\frac{12}{5}$',
                  options: ['Both expressions equal $\\frac{12}{5}$', 'scaling applies to both parts equally'],
                  hint: 'Review c6_math_ch03_035 for foundational fraction multiplication and c6_math_ch01_013 for.',
                  misconception: 'Students frequently multiply both the numerator AND the denominator of a fraction by the whole number (e.g., calculating $4 \\times.' }
          ],
            remediations: { 'students-frequently-multiply-both-the': { steps: ['Remind the student that a whole number can be written as a fraction with a denominator of 1 (e.g., $4 = \\frac{4}{1}$).', 'Show them that multiplying fractions involves multiplying numerators together and denominators together: $\\frac{4}{1}.', 'Emphasize that the denominator represents the size of the parts and does not change when counting how many parts you.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently multiply both the numerator AND the denominator of a fraction by the whole number (e.g.',
          parts: [
                { id: 'a', prompt: 'Ananya evaluated $8 \\times \\frac{5}{8}$ and wrote her answer as $\\frac{40}{64}$. Look at her work. What error did she make, and what is the correct answer?', answer: 'Ananya multiplied both the numerator and denominator by the whole number 8',
                  options: ['Ananya multiplied both the numerator and denominator by the whole number 8', 'scaling applies to both parts equally'],
                  hint: 'Review c6_math_ch03_035 for foundational fraction multiplication and c6_math_ch01_013 for.',
                  misconception: 'Students frequently multiply both the numerator AND the denominator of a fraction by the whole number (e.g., calculating $4 \\times.' },
                { id: 'b', prompt: 'Create a real-life word problem involving litres of milk where the solution requires multiplying a proper fraction by a whole number, and provide the solved.', answer: 'A good problem: "A family consumes $\\frac{3}{4}$ litres of milk every day',
                  options: ['A good problem: "A family consumes $\\frac{3}{4}$ litres of milk every day', 'scaling applies to both parts equally'],
                  hint: 'Review c6_math_ch03_035 for foundational fraction multiplication and c6_math_ch01_013 for.',
                  misconception: 'Students frequently multiply both the numerator AND the denominator of a fraction by the whole number (e.g., calculating $4 \\times.' }
          ],
            remediations: { 'students-frequently-multiply-both-the': { steps: ['Remind the student that a whole number can be written as a fraction with a denominator of 1 (e.g., $4 = \\frac{4}{1}$).', 'Show them that multiplying fractions involves multiplying numerators together and denominators together: $\\frac{4}{1}.', 'Emphasize that the denominator represents the size of the parts and does not change when counting how many parts you.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_003', difficulty: 'standard',
          question: 'Multiplying two fractions involves multiplying their numerators together.',
          hint: 'Review c6_math_ch03_030 for converting mixed fractions and c6_math_ch01_015 for finding.',
          misconception: 'Students frequently multiply the numerators but mistakenly add the denominators together (e.g., calculating.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplying two fractions involves multiplying their numerators together to form the new',
                  options: ['Multiplying two fractions involves multiplying their numerators together to form the new', 'Multiplication of fractions is an operation where two or more fractional numbers are', 'Multiplying a fraction by a whole number means finding a repeated sum or a fractional', 'The division of fractions using the reciprocal method is a rule where dividing any'],
                  hint: 'Review c6_math_ch03_030 for converting mixed fractions and c6_math_ch01_015 for finding common.',
                  misconception: 'Students frequently multiply the numerators but mistakenly add the denominators together (e.g., calculating $\\frac{2}{3} \\times.' }
          ],
            remediations: { 'students-frequently-multiply-the-numerators': { steps: ['Remind the student that multiplication is an independent operation that scales quantities without needing common.', 'Show them visually with a grid: shade $\\frac{2}{3}$ vertically and $\\frac{4}{5}$ horizontally to prove that the.', 'Emphasize the verbal rule: "Top times top, bottom times bottom."'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_004', difficulty: 'standard',
          question: 'The division of fractions using the reciprocal method is a rule where dividing.',
          hint: 'Review c7_math_ch08_001 on fraction multiplication and the definition of reciprocals.',
          misconception: 'Students often flip the first fraction (dividend) instead of the second fraction (divisor), or they flip both fractions.',
          parts: [
                { id: 'a', prompt: 'Explain why the operation of dividing by a fraction $\\frac{3}{4}$ is mathematically equivalent to multiplying by its reciprocal $\\frac{4}{3}$.', answer: 'that division asks how many groups of the divisor fit into the dividend',
                  options: ['that division asks how many groups of the divisor fit into the dividend', 'keep-change-flip'],
                  hint: 'Review c7_math_ch08_001 on fraction multiplication and the definition of reciprocals.',
                  misconception: 'Students often flip the first fraction (dividend) instead of the second fraction (divisor), or they flip both fractions simultaneously when.' }
          ],
            remediations: { 'students-often-flip-the-first': { steps: ['Remind the student of the role of each fraction using a simple whole number analogy: in $12 \\div 3$, the 12 stays.', 'Say: "The first number is what you have; the second number tells you how to group it.', 'Therefore, only the second fraction gets turned upside down into its reciprocal!" Have the student physically box the.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_005', difficulty: 'standard',
          question: 'Dividing a fraction by a whole number means partitioning a fractional quantity.',
          hint: 'Review the concept of reciprocals in c7_math_ch08_004 and fraction multiplication.',
          misconception: 'Students often divide the numerator by the whole number while mistakenly leaving the denominator unchanged, or they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dividing a fraction by a whole number means partitioning a fractional quantity into an',
                  options: ['Dividing a fraction by a whole number means partitioning a fractional quantity into an', 'Multiplication of fractions is an operation where two or more fractional numbers are', 'Multiplying a fraction by a whole number means finding a repeated sum or a fractional', 'Multiplying two fractions involves multiplying their numerators together to form the new'],
                  hint: 'Review the concept of reciprocals in c7_math_ch08_004 and fraction multiplication.',
                  misconception: 'Students often divide the numerator by the whole number while mistakenly leaving the denominator unchanged, or they invert the fraction.' }
          ],
            remediations: { 'students-often-divide-the-numerator': { steps: ['Remind the student that a whole number $c$ is always written as $\\frac{c}{1}$.', 'Tell them: "Stop and write out the two steps clearly: Step 1, turn the whole number into a fraction over 1.', 'Step 2, flip that second fraction upside down and change division to multiplication." Practice with a non-divisible.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_006', difficulty: 'standard',
          question: 'Dividing one fraction by another is the mathematical operation of finding how.',
          hint: 'Review c7_math_ch08_004 to practice writing reciprocals and c7_math_ch08_001 to practice.',
          misconception: 'Students often invert the *first* fraction (dividend) instead of the *second* fraction (divisor), or they mistakenly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dividing one fraction by another is the mathematical operation of finding how many times',
                  options: ['Dividing one fraction by another is the mathematical operation of finding how many times', 'Multiplication of fractions is an operation where two or more fractional numbers are', 'Multiplying a fraction by a whole number means finding a repeated sum or a fractional', 'Multiplying two fractions involves multiplying their numerators together to form the new'],
                  hint: 'Review c7_math_ch08_004 to practice writing reciprocals and c7_math_ch08_001 to practice fraction.',
                  misconception: 'Students often invert the *first* fraction (dividend) instead of the *second* fraction (divisor), or they mistakenly multiply all.' }
          ],
            remediations: { 'students-often-invert-the-first': { steps: ['Remind the student of the role of the divisor: "The second fraction is the divisor—it is the one doing the dividing,.', 'Have them physically cover the second fraction with their finger, write its reciprocal next to it, and only then.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
