import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch03_p3 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch03_p3: SimDef = {
    id: 'v3_c6_math_ch03_p3',
    title: 'Fractions · Part 3/3',
    subtitle: 'This node covers multi-step arithmetic operations with positive fractions.',
    classLevel: 6, subject: 'mathematics', topic: 'Fractions · Part 3/3',
    chapters: ['c6_math_ch03'],
    nodeIds: ['c6_math_ch03_029'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine your school is organizing a snack event where you have 1/2 a packet of biscuits, and you need to add.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'At a party your friend crows that they scored 1/8 of the cake while you only got 1/4. Should you feel cheated?',
        options: ['No — 1/4 is a bigger piece, because cutting into fewer equal parts makes each part larger', 'Yes — 8 is bigger than 4, so 1/8 must be more cake', 'You got the same — all fractions of a cake are equal', 'Only if the cake was square instead of round'],
        answer: 'No — 1/4 is a bigger piece, because cutting into fewer equal parts makes each part larger',
        hook: 'A bigger denominator means a smaller share, not a bigger one. And if the pieces are not equal in size, it is not a fraction at all — fair sharing is the whole point.',
    },
    teaching: [
        { title: 'Simplifying Complex Fraction Problems', text: 'Simplifying complex fraction problems is the process of solving expressions containing multiple operations (like addition, subtraction, and multiplication) by following the standard Order.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch03_041', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Split a paratha, a chocolate bar, and a kilo of apples into fair shares — write each share as a fraction and prove the pieces are truly equal.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'drill', nodeId: 'c6_math_ch03_041', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch03_041', title: 'Use it in the wild',
          caseStudy: { intro: 'Two friends split a chocolate bar. One offers a trade: \'Give me your half — I\'ll give you two of my four pieces. Two is more than one, so you win!\'',
            decisions: [{ prompt: 'Is the trade actually a good deal?', options: [
                { text: 'No — 2/4 and 1/2 are the same amount cut differently: two quarter-pieces exactly equal one half. Counting pieces without looking at piece size is the trap; drawing the bar shows both offers cover the identical area of chocolate.', outcome: 'Equivalent fractions look different but weigh the same — the number of pieces means nothing until you know how big each piece is.' },
                { text: 'Yes — two pieces is always more than one piece, so the trade is a win.', outcome: 'More pieces only means finer cutting — four quarters make one whole just as two halves do, so 2/4 = 1/2 and nobody wins.', reveals: 'more-pieces-more-chocolate' },
                { text: 'No — halves are always bigger than quarters, so 1/2 must be worth more than 2/4.', outcome: 'Halves are bigger pieces but there are only two of them — one half and two quarters cover the same chocolate exactly.', reveals: 'halves-always-beat-quarters' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch03_041', title: 'You made it',
          caseStudy: { intro: 'A fraction is a promise: the bottom number counts the equal pieces, the top counts yours. Break the equality and the promise breaks too.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch03_041', difficulty: 'standard',
          question: 'Simplifying complex fraction problems is the process of solving expressions.',
          hint: 'Review finding the Least Common Multiple (LCM) of two or more numbers.',
          misconception: 'Students often add or subtract numerators and denominators separately (e.g., 1/2 + 1/3 = 2/5).',
          parts: [
                { id: 'a', prompt: 'Why do we find a common denominator before adding or subtracting fractions like 1/3 and 1/4?', answer: 'We need a common denominator',
                  options: ['We need a common denominator', 'fractions are just numbers to be added like whole numbers (e'],
                  hint: 'Review finding the Least Common Multiple (LCM) of two or more numbers.',
                  misconception: 'Students often add or subtract numerators and denominators separately (e.g., 1/2 + 1/3 = 2/5).' }
          ],
            remediations: { 'students-often-add-or-subtract': { steps: ['If a student adds numerators and denominators, take two paper strips of equal length.', 'Fold one into halves and one into thirds.', 'Show them that 1/2 + 1/3 is physically larger than 2/5.', 'Then, guide them to fold both into 6ths to show that 1/2 = 3/6 and 1/3 = 2/6, leading to 5/6, not 2/5.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
