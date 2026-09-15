import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch03_p1: SimDef = {
    id: 'v3_c6_math_ch03_p1',
    title: 'Fractions · Part 1/3',
    subtitle: 'This node covers the definition of fractions, identifying parts of a whole, and.',
    classLevel: 6, subject: 'mathematics', topic: 'Fractions · Part 1/3',
    chapters: ['c6_math_ch03'],
    nodeIds: ['c6_math_ch03_029', 'c6_math_ch03_030', 'c6_math_ch03_031', 'c6_math_ch03_032', 'c6_math_ch03_033', 'c6_math_ch03_034'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you have one delicious paratha and you want to share it equally with your best friend.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'At a party your friend crows that they scored 1/8 of the cake while you only got 1/4. Should you feel cheated?',
        options: ['No — 1/4 is a bigger piece, because cutting into fewer equal parts makes each part larger', 'Yes — 8 is bigger than 4, so 1/8 must be more cake', 'You got the same — all fractions of a cake are equal', 'Only if the cake was square instead of round'],
        answer: 'No — 1/4 is a bigger piece, because cutting into fewer equal parts makes each part larger',
        hook: 'A bigger denominator means a smaller share, not a bigger one. And if the pieces are not equal in size, it is not a fraction at all — fair sharing is the whole point.',
    },
    teaching: [
        { title: 'Introduction to Fractions', text: 'A fraction represents a part of a whole, where a single object or a collection is divided into equal shares.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch03_029', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Split a paratha, a chocolate bar, and a kilo of apples into fair shares — write each share as a fraction and prove the pieces are truly equal.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'case', nodeId: 'c6_math_ch03_029', title: 'Introduction to Fractions',
          caseStudy: { intro: 'Imagine you have one delicious paratha and you want to share it equally with your best friend.',
            decisions: [{ prompt: 'In the fraction 3/4, what do the numbers 3 and 4 represent?', options: [
                { text: '3 is the numerator (parts we have) and 4 is the denominator (total equal parts)', outcome: '3 is the numerator (parts we have) and 4 is the denominator (total equal parts).' },
                { text: '1/8 is bigger than 1/4', outcome: 'Not quite — Students often think a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger.', reveals: 'a-larger-denominator-means-a' },
                { text: 'a larger denominator means a larger fraction (e', outcome: 'Not quite — Students often think a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger.', reveals: 'a-larger-denominator-means-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch03_030', title: 'Types of Fractions: Proper, Improper, Mixed',
          scaffold: { problem: 'Meena has 11/2 litres of milk. How much is this as a mixed number?',
            steps: [
            { text: 'Identify the numerator (11) and denominator (2).' },
            { text: 'Divide 11 by 2.' },
            { text: '11 ÷ 2 = 5 with a remainder of 1.' },
            { text: 'Place the quotient (5) as the whole number, and the remainder (1) over the divisor (2).' },
            { text: 'Result is 5 1/2 litres.', faded: true, blankAnswer: '5 1/2 litres' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch03_031', title: 'Equivalent Fractions',
          scaffold: { problem: 'Meena has 2/3 of a litre of milk. She wants to write this in terms of "sixths" so she can add it to another measurement.',
            steps: [
            { text: 'Identify current fraction (2/3) and target denominator (6).' },
            { text: 'Find the multiplier: 3 times what equals 6? (It is 2).' },
            { text: 'Apply the rule: multiply both numerator and denominator by 2.' },
            { text: 'Calculate: (2x2) / (3x2) = 4/6.', faded: true, blankAnswer: '4/6 litre' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch03_032', title: 'Comparing Fractions',
          scaffold: { problem: 'Meena has 3/4 kg of sugar and Rohan has 5/6 kg of sugar. Who has more sugar?',
            steps: [
            { text: 'Identify denominators (4 and 6).' },
            { text: 'Find a common denominator (the smallest multiple of 4 and 6 is 12).' },
            { text: 'Convert 3/4: (3 × 3) / (4 × 3) = 9/12.' },
            { text: 'Convert 5/6: (5 × 2) / (6 × 2) = 10/12.' },
            { text: 'Compare 9/12 and 10/12.', faded: true, blankAnswer: 'Rohan has more sugar (10/12 > 9/12).' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch03_033', title: 'Addition of Fractions',
          caseStudy: { intro: 'If your friend gives you 1/4 of a roti and your sibling gives you 1/2 of a roti, how much do you have in total?',
            decisions: [{ prompt: 'What is the golden rule for adding two fractions like 1/3 and 1/5? [1-2 sentences]', options: [
                { text: 'The golden rule is that the denominators must be the same (a common fractional unit)', outcome: 'The golden rule is that the denominators must be the same (a common fractional unit) before adding.' },
                { text: 'add the numerators and add the denominators', outcome: 'Not quite — The most common error is "denominator addition," where students add numerators and add denominators.', reveals: 'the-most-common-error-is' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch03_034', title: 'Subtraction of Fractions',
          caseStudy: { intro: 'Imagine you have 3/4 of a litre of milk and you use 1/3 of a litre for your tea; how much is left?',
            decisions: [{ prompt: 'What is the first step you must take when subtracting two fractions that have different denominators?', options: [
                { text: 'The first step is to find a common denominator by converting the fractions into', outcome: 'The first step is to find a common denominator by converting the fractions into equivalent.' },
                { text: 'subtract the smaller denominator from the larger', outcome: 'Not quite — Students often subtract the numerators and the denominators separately (e.g., 3/4 - 1/2 = 2/2).', reveals: 'students-often-subtract-the-numerators' }
            ] }] } },
        { type: 'drill', nodeId: 'c6_math_ch03_034', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch03_029', title: 'Use it in the wild',
          caseStudy: { intro: 'Two friends split a chocolate bar. One offers a trade: \'Give me your half — I\'ll give you two of my four pieces. Two is more than one, so you win!\'',
            decisions: [{ prompt: 'Is the trade actually a good deal?', options: [
                { text: 'No — 2/4 and 1/2 are the same amount cut differently: two quarter-pieces exactly equal one half. Counting pieces without looking at piece size is the trap; drawing the bar shows both offers cover the identical area of chocolate.', outcome: 'Equivalent fractions look different but weigh the same — the number of pieces means nothing until you know how big each piece is.' },
                { text: 'Yes — two pieces is always more than one piece, so the trade is a win.', outcome: 'More pieces only means finer cutting — four quarters make one whole just as two halves do, so 2/4 = 1/2 and nobody wins.', reveals: 'more-pieces-more-chocolate' },
                { text: 'No — halves are always bigger than quarters, so 1/2 must be worth more than 2/4.', outcome: 'Halves are bigger pieces but there are only two of them — one half and two quarters cover the same chocolate exactly.', reveals: 'halves-always-beat-quarters' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch03_034', title: 'The bigger picture',
          caseStudy: { intro: 'A fraction is a promise: the bottom number counts the equal pieces, the top counts yours. Break the equality and the promise breaks too.',
            decisions: [{ prompt: 'What comes next? Fractions · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Fractions · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch03_029', difficulty: 'standard',
          question: 'A fraction represents a part of a whole, where a single object or a collection.',
          hint: 'Review basic division tables and the concept of equal distribution.',
          misconception: 'Students often think a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger than 1/4 because 8.',
          parts: [
                { id: 'a', prompt: 'In the fraction 3/4, what do the numbers 3 and 4 represent?', answer: '3 is the numerator (parts we have) and 4 is the denominator (total equal parts)',
                  options: ['3 is the numerator (parts we have) and 4 is the denominator (total equal parts)', '1/8 is bigger than 1/4', 'a larger denominator means a larger fraction (e'],
                  hint: 'Review basic division tables and the concept of equal distribution.',
                  misconception: 'Students often think a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger than 1/4 because 8 is bigger than 4).' },
                { id: 'b', prompt: 'If you divide a chocolate bar into 5 parts, but they are all different sizes, can you say one piece is 1/5 of the bar? Why or why not?', answer: 'No, because fractions require equal parts',
                  options: ['No, because fractions require equal parts', '1/8 is bigger than 1/4', 'a larger denominator means a larger fraction (e'],
                  hint: 'Review basic division tables and the concept of equal distribution.',
                  misconception: 'Students often think a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger than 1/4 because 8 is bigger than 4).' },
                { id: 'c', prompt: 'You have 1 kg of apples and divide them into 4 equal bags. What fraction of the total weight is in one bag?', answer: 'The fraction is 1/4',
                  options: ['The fraction is 1/4', '1/8 is bigger than 1/4', 'a larger denominator means a larger fraction (e'],
                  hint: 'Review basic division tables and the concept of equal distribution.',
                  misconception: 'Students often think a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger than 1/4 because 8 is bigger than 4).' },
                { id: 'd', prompt: 'If you have 1/6 of a cake and your friend has 1/3 of the same cake, who has a larger piece? Explain why.', answer: 'The friend with 1/3 has a larger piece',
                  options: ['The friend with 1/3 has a larger piece', '1/8 is bigger than 1/4', 'a larger denominator means a larger fraction (e'],
                  hint: 'Review basic division tables and the concept of equal distribution.',
                  misconception: 'Students often think a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger than 1/4 because 8 is bigger than 4).' }
          ],
            remediations: { 'a-larger-denominator-means-a': { steps: ['Ask the student to draw two identical circles.', 'Tell them to cut one into 4 slices and the other into 8 slices.', 'Ask them to hold one slice from each circle.', 'Physically seeing that the 1/8 slice is much smaller than the 1/4 slice helps them realize that more pieces mean.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_029', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger than 1/4 because 8.',
          parts: [
                { id: 'a', prompt: 'Is it possible to have a fraction like 5/0? Why or why not?', answer: 'No, the denominator cannot be zero',
                  options: ['No, the denominator cannot be zero', '1/8 is bigger than 1/4', 'a larger denominator means a larger fraction (e'],
                  hint: 'Review basic division tables and the concept of equal distribution.',
                  misconception: 'Students often think a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger than 1/4 because 8 is bigger than 4).' },
                { id: 'b', prompt: 'Draw a square. Show how you would shade 3/4 of it. If you had to create a different shape representing 3/4, how would you change your approach?', answer: 'The student should divide the square into 4 equal parts and shade 3',
                  options: ['The student should divide the square into 4 equal parts and shade 3', '1/8 is bigger than 1/4', 'a larger denominator means a larger fraction (e'],
                  hint: 'Review basic division tables and the concept of equal distribution.',
                  misconception: 'Students often think a larger denominator means a larger fraction (e.g., thinking 1/8 is bigger than 1/4 because 8 is bigger than 4).' }
          ],
            remediations: { 'a-larger-denominator-means-a': { steps: ['Ask the student to draw two identical circles.', 'Tell them to cut one into 4 slices and the other into 8 slices.', 'Ask them to hold one slice from each circle.', 'Physically seeing that the 1/8 slice is much smaller than the 1/4 slice helps them realize that more pieces mean.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_030', difficulty: 'standard',
          question: 'A fraction represents a part of a whole. A **Proper fraction** has a numerator.',
          hint: 'Review division (e.g., 7 ÷ 3 is 2 with remainder 1).',
          misconception: 'Students often try to convert improper fractions to mixed numbers by simply placing the smaller number over the larger.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A fraction represents a part of a whole',
                  options: ['A fraction represents a part of a whole', 'A fraction represents a part of a whole, where a single object or a collection is divided', 'Equivalent fractions are different-looking fractions that represent the same physical', 'Comparing fractions is the process of determining'],
                  hint: 'Review division (e.g., 7 ÷ 3 is 2 with remainder 1).',
                  misconception: 'Students often try to convert improper fractions to mixed numbers by simply placing the smaller number over the larger number regardless.' }
          ],
            remediations: { 'students-often-try-to-convert': { steps: ['If a student gets a conversion wrong, ask them to "draw it out." Have them draw circles to represent the denominator.', 'They will visually see 2 full circles and 2/3 of a third circle, which reinforces the division method (8 ÷ 3 = 2.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_031', difficulty: 'standard',
          question: 'Equivalent fractions are different-looking fractions that represent the same.',
          hint: 'Review basic multiplication tables for numbers 1 through 10.',
          misconception: 'Students often try to find equivalent fractions by adding the same number to both the numerator and denominator (e.g.',
          parts: [
                { id: 'a', prompt: 'If you have 1/3 of a pizza and your friend has 2/6 of a pizza, who has more? Explain why.', answer: 'They have the same amount',
                  options: ['They have the same amount', '2/6 is more because the numbers are bigger'],
                  hint: 'Review basic multiplication tables for numbers 1 through 10.',
                  misconception: 'Students often try to find equivalent fractions by adding the same number to both the numerator and denominator (e.g., changing 1/2.' }
          ],
            remediations: { 'students-often-try-to-find': { steps: ['If a student adds instead of multiplies, show them a visual model.', 'Draw a square divided into 2 parts (1/2 shaded).', 'Then, draw the same square divided into 4 parts.', 'Show that to shade the same area, you must shade 2 of the 4 parts.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_032', difficulty: 'standard',
          question: 'Comparing fractions is the process of determining which of two or more.',
          hint: 'Review the "Equivalent Fractions" section of the chapter to ensure you can scale.',
          misconception: 'Students often believe that the fraction with the larger denominator is always the larger fraction (e.g., thinking 1/9.',
          parts: [
                { id: 'a', prompt: 'If two fractions have the same denominator, which one is larger: the one with the larger numerator or the smaller numerator?', answer: 'The one with the larger numerator is larger',
                  options: ['The one with the larger numerator is larger', '1/9 > 1/5 because 9 > 5', 'the fraction with the larger denominator is always the larger fraction (e'],
                  hint: 'Review the "Equivalent Fractions" section of the chapter to ensure you can scale a fraction up.',
                  misconception: 'Students often believe that the fraction with the larger denominator is always the larger fraction (e.g., thinking 1/9 > 1/5 because 9 >.' },
                { id: 'b', prompt: 'Compare 2/3 and 3/4. Which is greater? Show your steps.', answer: '3/4 is greater',
                  options: ['3/4 is greater', '1/9 > 1/5 because 9 > 5', 'the fraction with the larger denominator is always the larger fraction (e'],
                  hint: 'Review the "Equivalent Fractions" section of the chapter to ensure you can scale a fraction up.',
                  misconception: 'Students often believe that the fraction with the larger denominator is always the larger fraction (e.g., thinking 1/9 > 1/5 because 9 >.' },
                { id: 'c', prompt: 'If you have 5/7 and 5/9, which is larger? Explain your reasoning without calculating a common denominator.', answer: '5/7 is larger because both have 5 pieces, but in 5/7, each piece is a \'seventh\'',
                  options: ['5/7 is larger because both have 5 pieces, but in 5/7, each piece is a \'seventh\'', '1/9 > 1/5 because 9 > 5', 'the fraction with the larger denominator is always the larger fraction (e'],
                  hint: 'Review the "Equivalent Fractions" section of the chapter to ensure you can scale a fraction up.',
                  misconception: 'Students often believe that the fraction with the larger denominator is always the larger fraction (e.g., thinking 1/9 > 1/5 because 9 >.' }
          ],
            remediations: { 'the-fraction-with-the-larger': { steps: ['Ask the student to draw two identical rectangles on paper.', 'Have them divide one into 5 equal strips and the other into 9 equal strips.', 'Ask them to point to one strip from each rectangle and physically compare the size of the pieces.', 'Explain that the denominator is the "divider"—the bigger the number of divisions, the smaller the result.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_033', difficulty: 'standard',
          question: 'Addition of fractions is the process of combining two or more fractional parts.',
          hint: 'Review the section on equivalent fractions and finding the LCM.',
          misconception: 'The most common error is "denominator addition," where students add numerators and add denominators (e.g., 1/2 + 1/3.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Addition of fractions is the process of combining two or more fractional parts of the',
                  options: ['Addition of fractions is the process of combining two or more fractional parts of the', 'A fraction represents a part of a whole, where a single object or a collection is divided', 'A fraction represents a part of a whole', 'Equivalent fractions are different-looking fractions that represent the same physical'],
                  hint: 'Review the section on equivalent fractions and finding the LCM.',
                  misconception: 'The most common error is "denominator addition," where students add numerators and add denominators (e.g., 1/2 + 1/3 = 2/5).' }
          ],
            remediations: { 'the-most-common-error-is': { steps: ['If a student adds denominators, stop them and draw two rectangles of the same size.', 'Shade 1/2 of one and 1/3 of the other, then ask them to visualize those pieces inside a third, identical rectangle.', 'Show them that 1/2 is 3 pieces of 1/6 and 1/3 is 2 pieces of 1/6, meaning they have 5 pieces of 1/6 total.', 'Reinforce that we only add "labels" (denominators) when the labels are identical.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch03_034', difficulty: 'standard',
          question: 'Subtraction of fractions is the process of finding the difference between two.',
          hint: 'Review how to find equivalent fractions by multiplying the numerator and denominator.',
          misconception: 'Students often subtract the numerators and the denominators separately (e.g., 3/4 - 1/2 = 2/2).',
          parts: [
                { id: 'a', prompt: 'What is the first step you must take when subtracting two fractions that have different denominators?', answer: 'The first step is to find a common denominator by converting the fractions into',
                  options: ['The first step is to find a common denominator by converting the fractions into', 'subtract the smaller denominator from the larger'],
                  hint: 'Review how to find equivalent fractions by multiplying the numerator and denominator by the same.',
                  misconception: 'Students often subtract the numerators and the denominators separately (e.g., 3/4 - 1/2 = 2/2).' }
          ],
            remediations: { 'students-often-subtract-the-numerators': { steps: ['If a student subtracts denominators, provide a paper strip.', 'Ask them to fold it into 4 and shade 3 parts, then ask them to show where "subtracting 2 from 4" parts would leave them.', 'Show that 3/4 is 6/8 and 1/2 is 4/8, so 6/8 - 4/8 leaves 2/8.', 'Use the visual to explain that the denominator defines the size of the piece, not a number to be subtracted.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
