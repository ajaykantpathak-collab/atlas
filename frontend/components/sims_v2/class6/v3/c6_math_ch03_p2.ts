import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch03_p2: SimDef = {
    id: 'v3_c6_math_ch03_p2',
    title: 'Fractions · Part 2/3',
    subtitle: 'This node covers the multiplication of two proper or improper fractions.',
    classLevel: 6, subject: 'mathematics', topic: 'Fractions · Part 2/3',
    chapters: ['c6_math_ch03'],
    nodeIds: ['c6_math_ch03_035', 'c6_math_ch03_036', 'c6_math_ch03_037', 'c6_math_ch03_038', 'c6_math_ch03_039', 'c6_math_ch03_040'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you have half a bar of chikki and you want to give one-third of that half to your friend.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'At a party your friend crows that they scored 1/8 of the cake while you only got 1/4. Should you feel cheated?',
        options: ['No — 1/4 is a bigger piece, because cutting into fewer equal parts makes each part larger', 'Yes — 8 is bigger than 4, so 1/8 must be more cake', 'You got the same — all fractions of a cake are equal', 'Only if the cake was square instead of round'],
        answer: 'No — 1/4 is a bigger piece, because cutting into fewer equal parts makes each part larger',
        hook: 'A bigger denominator means a smaller share, not a bigger one. And if the pieces are not equal in size, it is not a fraction at all — fair sharing is the whole point.',
    },
    teaching: [
        { title: 'Multiplication of Fractions', text: 'Multiplying fractions is the process of finding a part of a part; it involves multiplying the numerators to form the new numerator and multiplying the denominators to form the new denominator.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch03_035', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Split a paratha, a chocolate bar, and a kilo of apples into fair shares — write each share as a fraction and prove the pieces are truly equal.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch03_035', title: 'Multiplication of Fractions',
          scaffold: { problem: 'A container holds 4/5 of a litre of milk. If you use 1/3 of the milk for a recipe, how many litres of milk did you use?',
            steps: [
            { text: 'Identify the given amount (4/5 litre) and the portion being used (1/3).' },
            { text: 'Recognize that "1/3 of 4/5" requires multiplication: 1/3 × 4/5.' },
            { text: 'Multiply the numerators: 1 × 4 = 4.' },
            { text: 'Multiply the denominators: 3 × 5 = 15.' },
            { text: 'Result is 4/15 litre.', faded: true, blankAnswer: '4/15 litre' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch03_037', title: 'Fractions on the Number Line',
          scaffold: { problem: 'A student needs to mark 3/5 of a metre on a number line measuring 1 metre. Show the steps.',
            steps: [
            { text: 'Draw a line segment of 1 metre length, labelling the start 0 and end 1.' },
            { text: 'Divide the 1 metre distance into 5 equal parts using a ruler.' },
            { text: 'Starting from 0, count 3 of these equal parts towards the right.' },
            { text: 'Draw a point at the end of the 3rd part.', faded: true, blankAnswer: 'The point is located at the 3rd tick mark after 0.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch03_038', title: 'Problem Solving with Fractions',
          scaffold: { problem: 'A shopkeeper has 40 kg of sugar. He sells 3/5 of it in the morning. How many kilograms of sugar are left for the afternoon?',
            steps: [
            { text: 'Identify total (40 kg) and fraction sold (3/5).' },
            { text: 'Find the value of one part by dividing 40 by the denominator 5 (40 ÷ 5 = 8 kg).' },
            { text: 'Find the amount sold by multiplying the value of one part by the numerator 3 (8 × 3 = 24 kg).' },
            { text: 'Subtract the amount sold from the total to find the amount left (40 - 24 = 16 kg).' },
            { text: 'Verify: 2/5 of 40 is 16. Since 3/5 were sold, 2/5 remain.', faded: true, blankAnswer: '16 kg' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch03_040', title: 'Fraction as Division',
          caseStudy: { intro: 'If you have 3 rotis and want to share them equally among 4 friends, how much does each person get?',
            decisions: [{ prompt: 'What does the fraction $5/8$ represent in terms of division?', options: [
                { text: 'It represents 5 divided by 8 ($5 \\div 8$)', outcome: 'It represents 5 divided by 8 ($5 \\div 8$). A student who answers "8 divided by 5" is confusing the.' },
                { text: '8 divided by 5', outcome: 'Not quite — Students often believe the larger number must always be the denominator (the bottom number).', reveals: 'the-larger-number-must-always' },
                { text: 'impossible', outcome: 'Not quite — Students often believe the larger number must always be the denominator (the bottom number).', reveals: 'the-larger-number-must-always' }
            ] }] } },
        { type: 'drill', nodeId: 'c6_math_ch03_040', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch03_035', title: 'Use it in the wild',
          caseStudy: { intro: 'Two friends split a chocolate bar. One offers a trade: \'Give me your half — I\'ll give you two of my four pieces. Two is more than one, so you win!\'',
            decisions: [{ prompt: 'Is the trade actually a good deal?', options: [
                { text: 'No — 2/4 and 1/2 are the same amount cut differently: two quarter-pieces exactly equal one half. Counting pieces without looking at piece size is the trap; drawing the bar shows both offers cover the identical area of chocolate.', outcome: 'Equivalent fractions look different but weigh the same — the number of pieces means nothing until you know how big each piece is.' },
                { text: 'Yes — two pieces is always more than one piece, so the trade is a win.', outcome: 'More pieces only means finer cutting — four quarters make one whole just as two halves do, so 2/4 = 1/2 and nobody wins.', reveals: 'more-pieces-more-chocolate' },
                { text: 'No — halves are always bigger than quarters, so 1/2 must be worth more than 2/4.', outcome: 'Halves are bigger pieces but there are only two of them — one half and two quarters cover the same chocolate exactly.', reveals: 'halves-always-beat-quarters' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch03_040', title: 'The bigger picture',
          caseStudy: { intro: 'A fraction is a promise: the bottom number counts the equal pieces, the top counts yours. Break the equality and the promise breaks too.',
            decisions: [{ prompt: 'What comes next? Fractions · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Fractions · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch03_035', difficulty: 'standard',
          question: 'Multiplying fractions is the process of finding a part of a part; it involves.',
          hint: 'Review the concept of "fractional units" in Chapter 3.',
          misconception: 'Students often try to find a common denominator before multiplying, just as they do with addition and subtraction.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplying fractions is the process of finding a part of a part',
                  options: ['Multiplying fractions is the process of finding a part of a part', 'A fraction represents a part of a whole, where a single object or a collection is divided', 'A fraction represents a part of a whole', 'Equivalent fractions are different-looking fractions that represent the same physical'],
                  hint: 'Review the concept of "fractional units" in Chapter 3.',
                  misconception: 'Students often try to find a common denominator before multiplying, just as they do with addition and subtraction.' }
          ],
            remediations: { 'students-often-try-to-find': { steps: ['Explain that multiplication is not about combining shares (which is addition), but about scaling one share by another.', 'Use a paper strip: show 1/2 of the strip, then fold that piece into 3 parts and shade one of them.', 'Ask them to count how many of those small pieces would fit in the original whole (6), leading them to see the.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_036', difficulty: 'standard',
          question: 'Dividing by a fraction is the process of finding how many times one fractional.',
          hint: 'Review "Multiplication of Fractions" and "Converting Mixed Numbers to Improper Fractions."',
          misconception: 'Students often try to divide the numerators and denominators separately (e.g., 4/5 ÷ 2/3 = 2/1.66) or simply multiply.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dividing by a fraction is the process of finding how many times one fractional amount',
                  options: ['Dividing by a fraction is the process of finding how many times one fractional amount', 'A fraction represents a part of a whole, where a single object or a collection is divided', 'A fraction represents a part of a whole', 'Equivalent fractions are different-looking fractions that represent the same physical'],
                  hint: 'Review "Multiplication of Fractions" and "Converting Mixed Numbers to Improper Fractions."',
                  misconception: 'Students often try to divide the numerators and denominators separately (e.g., 4/5 ÷ 2/3 = 2/1.66) or simply multiply across without.' }
          ],
            remediations: { 'students-often-try-to-divide': { steps: ['If a student fails, have them write the divisor fraction on a sticky note and physically turn it upside down before.', 'Remind them: "Division by a fraction is a special request to use the flip-trick; you cannot just multiply straight.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_037', difficulty: 'standard',
          question: 'Fractions on the number line represent a specific length or position between.',
          hint: 'Review the "Fractional Units as Parts of a Whole" section regarding dividing a whole.',
          misconception: 'Students often treat the "marks" on a number line as the numbers themselves rather than the "gaps" between the marks.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fractions on the number line represent a specific length or position between whole',
                  options: ['Fractions on the number line represent a specific length or position between whole', 'A fraction represents a part of a whole, where a single object or a collection is divided', 'A fraction represents a part of a whole', 'Equivalent fractions are different-looking fractions that represent the same physical'],
                  hint: 'Review the "Fractional Units as Parts of a Whole" section regarding dividing a whole strip into.',
                  misconception: 'Students often treat the "marks" on a number line as the numbers themselves rather than the "gaps" between the marks.' }
          ],
            remediations: { 'students-often-treat-the-marks': { steps: ['Ask the student to draw a paper strip representing the unit distance between 0 and 1.', 'Have them fold it into 4 equal sections to create clear physical "gaps." Explain that each fold line is a boundary, and.', 'Tell them to count the "windows" or "gaps" they have created, not the lines they have drawn.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_038', difficulty: 'standard',
          question: 'Problem solving with fractions is the application of fraction operations—like.',
          hint: 'Review c6_math_fractional_units to re-visualize how to divide a quantity into equal.',
          misconception: 'Students often confuse the "share" with the "whole." For example, if asked to find 2/3 of 12, they might answer 2 or 3.',
          parts: [
                { id: 'a', prompt: 'A rope is 15 metres long. If you cut off 1/3 of it, how many metres did you cut off?', answer: 'You cut off 5 metres',
                  options: ['You cut off 5 metres', 'the fraction is a length rather than a relative share'],
                  hint: 'Review c6_math_fractional_units to re-visualize how to divide a quantity into equal segments.',
                  misconception: 'Students often confuse the "share" with the "whole." For example, if asked to find 2/3 of 12, they might answer 2 or 3 because they see.' }
          ],
            remediations: { 'students-often-confuse-the-share': { steps: ['If a student fails, have them draw a rectangle and divide it into the number of parts shown by the denominator.', 'Ask them to shade the number of parts shown by the numerator.', 'Then, ask them to write the total number (e.g., 12) inside the rectangle and ask, "If the whole rectangle is 12, what.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_039', difficulty: 'standard',
          question: 'A fraction represents a part of a whole, where a "whole" is divided into equal.',
          hint: 'Review basic division tables and the concept of "equal shares."',
          misconception: 'Students often compare the sizes of fractions by only looking at the digits.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A fraction represents a part of a whole, where a "whole" is divided into equal segments',
                  options: ['A fraction represents a part of a whole, where a "whole" is divided into equal segments', 'A fraction represents a part of a whole, where a single object or a collection is divided', 'A fraction represents a part of a whole', 'Equivalent fractions are different-looking fractions that represent the same physical'],
                  hint: 'Review basic division tables and the concept of "equal shares."',
                  misconception: 'Students often compare the sizes of fractions by only looking at the digits.' }
          ],
            remediations: { 'students-often-compare-the-sizes': { steps: ['Take a piece of paper (the "whole").', 'Fold it into 2 equal parts and label them 1/2.', 'Then, take another piece of paper of the same size and fold it into 4 equal parts and label them 1/4.', 'Physically place the 1/2 piece over the 1/4 piece to show that the 1/2 is physically larger.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_040', difficulty: 'standard',
          question: 'A fraction represents a division operation where a total quantity is split into.',
          hint: 'Review division as repeated subtraction.',
          misconception: 'Students often believe the larger number must always be the denominator (the bottom number), thinking $3/4$ is correct.',
          parts: [
                { id: 'a', prompt: 'What does the fraction $5/8$ represent in terms of division?', answer: 'It represents 5 divided by 8 ($5 \\div 8$)',
                  options: ['It represents 5 divided by 8 ($5 \\div 8$)', '8 divided by 5', 'impossible', 'parts of a whole'],
                  hint: 'Review division as repeated subtraction.',
                  misconception: 'Students often believe the larger number must always be the denominator (the bottom number), thinking $3/4$ is correct but $4/3$.' },
                { id: 'b', prompt: 'If 7 friends share 2 pizzas equally, can you write this as a division problem and then as a fraction?', answer: 'Division: $2 \\div 7$',
                  options: ['Division: $2 \\div 7$', 'impossible', 'parts of a whole', 'division'],
                  hint: 'Review division as repeated subtraction.',
                  misconception: 'Students often believe the larger number must always be the denominator (the bottom number), thinking $3/4$ is correct but $4/3$.' },
                { id: 'c', prompt: 'Why is $3 \\div 4$ the same as $3/4$? Use the example of sharing 3 rotis among 4 children.', answer: 'When you divide 3 rotis into 4 parts each, you have 12 pieces of size $1/4$',
                  options: ['When you divide 3 rotis into 4 parts each, you have 12 pieces of size $1/4$', 'impossible', 'parts of a whole', 'division'],
                  hint: 'Review division as repeated subtraction.',
                  misconception: 'Students often believe the larger number must always be the denominator (the bottom number), thinking $3/4$ is correct but $4/3$.' }
          ],
            remediations: { 'the-larger-number-must-always': { steps: ['Ask the student to draw 4 rotis and try to give them to 3 people.', 'Physically drawing the division helps them see that each person gets more than 1 whole roti, proving the numerator can.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_040', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the larger number must always be the denominator (the bottom number), thinking $3/4$ is correct.',
          parts: [
                { id: 'a', prompt: 'Is it possible for a fraction $a/b$ to be equal to a whole number? Give an example and explain why.', answer: 'Yes, if $a$ is a multiple of $b$',
                  options: ['Yes, if $a$ is a multiple of $b$', 'suggests the student thinks fractions must always be', 'impossible', 'parts of a whole'],
                  hint: 'Review division as repeated subtraction.',
                  misconception: 'Students often believe the larger number must always be the denominator (the bottom number), thinking $3/4$ is correct but $4/3$.' }
          ],
            remediations: { 'the-larger-number-must-always': { steps: ['Ask the student to draw 4 rotis and try to give them to 3 people.', 'Physically drawing the division helps them see that each person gets more than 1 whole roti, proving the numerator can.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
