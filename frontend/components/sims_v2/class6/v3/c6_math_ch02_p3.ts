import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch02_p3 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch02_p3: SimDef = {
    id: 'v3_c6_math_ch02_p3',
    title: 'Integers · Part 3/3',
    subtitle: 'This node covers single-step or simple multi-step integer movements in real-world.',
    classLevel: 6, subject: 'mathematics', topic: 'Integers · Part 3/3',
    chapters: ['c6_math_ch02'],
    nodeIds: ['c6_math_ch02_028'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are in an elevator in a building that has floors below ground level.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two cities report their temperatures: one is -5 degrees, the other -2. A classmate says the -5 city is warmer because 5 is bigger than 2. Where did they slip?',
        options: ['The minus sign flips the rule — -5 is further below zero, so that city is colder', 'Nowhere — 5 really is bigger than 2', 'Both cities are equally cold because both are negative', '-5 is warmer only at night'],
        answer: 'The minus sign flips the rule — -5 is further below zero, so that city is colder',
        hook: 'On the negative side of the number line, bigger digits mean smaller values. -10 is less than -1 because it sits further from zero — the sign changes everything.',
    },
    teaching: [
        { title: 'Problem Solving with Integers', text: 'Problem solving with integers involves using positive and negative numbers to represent real-world changes, such as gains/losses, temperatures above/below zero, or movements in a building or mine.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch02_028', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Ride an elevator that goes below ground — label the basement floors with negative numbers, then decide which of two frosty cities is colder.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch02_028', title: 'Problem Solving with Integers',
          scaffold: { problem: 'A merchant has a bank balance of ₹500. He makes a deposit of ₹200, then pays a bill of ₹800. What is his final balance?',
            steps: [
            { text: 'Identify given values: Start = +500, Deposit = +200, Bill/Debit = -800.' },
            { text: 'Set up the expression: (+500) + (+200) + (-800).' },
            { text: 'Perform first movement: 500 + 200 = 700.' },
            { text: 'Perform second movement: 700 + (-800) = -100.' },
            { text: 'Verify: The balance is -100, meaning he is in debt by ₹100.', faded: true, blankAnswer: '-₹100' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch02_028', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch02_028', title: 'Use it in the wild',
          caseStudy: { intro: 'A cold-storage display shows the temperature falling below zero, and a student compares two accounts: one is ₹200 in debt, the other ₹100 in debt. He claims, \'minus 200 is bigger than minus 100, since 200 beats 100.\'',
            decisions: [{ prompt: 'Is -200 really bigger than -100?', options: [
                { text: 'No — on the number line, more negative means further left, which means smaller: -200 sits far below -100, so -200 is the smaller number and the bigger debt. The sign reverses the comparison: with negatives, the larger-looking number is actually worth less.', outcome: 'Distance from zero still tells size — -200 is 200 below zero while -100 is only 100 below, so the first position is lower on the line.' },
                { text: 'He is right — 200 is bigger than 100, and the minus sign does not change the comparison.', outcome: 'The minus changes everything — it measures debt or depth below zero, so -200 is lower than -100 on the number line, not higher.', reveals: 'minus-doesnt-matter' },
                { text: 'Neither is bigger — negative numbers cannot be compared at all.', outcome: 'They compare perfectly well on the number line — the one further left of zero is smaller, so -200 < -100.', reveals: 'negatives-cant-compare' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch02_028', title: 'You made it',
          caseStudy: { intro: 'Zero is the border, not a team member. Negative numbers are not debts to fear — they are just positions on the other side.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch02_028', difficulty: 'standard',
          question: 'Problem solving with integers involves using positive and negative numbers.',
          hint: 'Review the "Building of Fun" floor numbering system to visualize moving up and down.',
          misconception: 'Students often confuse the "sign of the number" with the "operation to perform." For example, if asked to subtract -5.',
          parts: [
                { id: 'a', prompt: 'If a submarine is at -50 metres and it descends another 20 metres, what is the expression to find its new depth?', answer: 'The expression is (-50) + (-20)',
                  options: ['The expression is (-50) + (-20)', 'descending', 'sign of the number', 'operation to perform'],
                  hint: 'Review the "Building of Fun" floor numbering system to visualize moving up and down.',
                  misconception: 'Students often confuse the "sign of the number" with the "operation to perform." For example, if asked to subtract -5 from 2, they may.' },
                { id: 'b', prompt: 'Explain why -5 degrees is colder than -2 degrees using the idea of a number line or a thermometer.', answer: '-5 is colder because it is further to the left of zero on the number line',
                  options: ['-5 is colder because it is further to the left of zero on the number line', 'bigger', 'sign of the number', 'operation to perform'],
                  hint: 'Review the "Building of Fun" floor numbering system to visualize moving up and down.',
                  misconception: 'Students often confuse the "sign of the number" with the "operation to perform." For example, if asked to subtract -5 from 2, they may.' },
                { id: 'c', prompt: 'A bank account has a balance of ₹100. You make a withdrawal (a debit) of ₹150. What is your new balance, and how do you represent it?', answer: 'The balance is -₹50',
                  options: ['The balance is -₹50', 'sign of the number', 'operation to perform'],
                  hint: 'Review the "Building of Fun" floor numbering system to visualize moving up and down.',
                  misconception: 'Students often confuse the "sign of the number" with the "operation to perform." For example, if asked to subtract -5 from 2, they may.' },
                { id: 'd', prompt: 'If you are at floor -3 and you reach floor +2, what was the movement? Compare your result to the target.', answer: 'The movement was +5 floors',
                  options: ['The movement was +5 floors', 'sign of the number', 'operation to perform'],
                  hint: 'Review the "Building of Fun" floor numbering system to visualize moving up and down.',
                  misconception: 'Students often confuse the "sign of the number" with the "operation to perform." For example, if asked to subtract -5 from 2, they may.' }
          ],
            remediations: { 'students-often-confuse-the-sign': { steps: ['If a student struggles, draw a vertical number line (like a thermometer).', 'Ask them to place a finger on the starting number.', 'Ask: "If you move down/debit, which way does your finger go?" (Down).', '"If you move up/credit, which way?" (Up).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch02_028', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the "sign of the number" with the "operation to perform." For example, if asked to subtract -5.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Subtracting a negative number always makes the result smaller."', answer: 'This is false',
                  options: ['This is false', 'sign of the number', 'operation to perform'],
                  hint: 'Review the "Building of Fun" floor numbering system to visualize moving up and down.',
                  misconception: 'Students often confuse the "sign of the number" with the "operation to perform." For example, if asked to subtract -5 from 2, they may.' }
          ],
            remediations: { 'students-often-confuse-the-sign': { steps: ['If a student struggles, draw a vertical number line (like a thermometer).', 'Ask them to place a finger on the starting number.', 'Ask: "If you move down/debit, which way does your finger go?" (Down).', '"If you move up/credit, which way?" (Up).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
