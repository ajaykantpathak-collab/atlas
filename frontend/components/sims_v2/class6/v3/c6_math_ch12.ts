import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch12 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch12: SimDef = {
    id: 'v3_c6_math_ch12',
    title: 'Expressing a pattern algebraically means.',
    subtitle: 'This node covers turning pattern rules into formulas. Recognising number and shape.',
    classLevel: 6, subject: 'mathematics', topic: 'Expressing a pattern algebraically means.',
    chapters: ['c6_math_ch12'],
    nodeIds: ['c6_math_ch12_004', 'c6_math_ch12_121', 'c6_math_ch12_122', 'c6_math_ch12_123'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '1. Take the sequence 3, 6, 9, 12… The rule \'add 3 each time\' works but is slow — to find the 40th term you\'d.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A shopkeeper sells candle packs of 1, 3, 6, 10, 15 — and every pack grows by a bigger jump than the last. How many candles are in the next pack?',
        options: ['21 — the gaps grow as +2, +3, +4, +5, so the next gap is +6', '20 — the pattern adds 5 every time', '16 — just add 1 to the last number', '18 — the gaps repeat +3 forever'],
        answer: '21 — the gaps grow as +2, +3, +4, +5, so the next gap is +6',
        hook: 'Not every pattern adds the same number. Check the gaps between the gaps — 2, 4, 6, 8 adds while 2, 4, 8, 16 multiplies, and triangular numbers grow by bigger and bigger steps.',
    },
    teaching: [
        { title: 'Expressing a pattern algebraically.', text: 'Expressing a pattern algebraically means replacing the repeating rule with a formula using a position variable (n): in the sequence 2, 4, 6, 8…, the nth term is 2n, so the 50th term is found.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch12_004', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Crack the hidden rule in three sequences — one adding, one squaring, one triangle-building — then predict the next three terms of each without guessing.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c6_math_ch12_004', title: 'Expressing a pattern algebraically.',
          caseStudy: { intro: '1. Take the sequence 3, 6, 9, 12… The rule \'add 3 each time\' works but is slow — to find the 40th term you\'d add 3 forty times. 2.',
            decisions: [{ prompt: 'The sequence is 5, 10, 15, 20… — write the rule for the nth term.', options: [
                { text: 'The nth term is 5n', outcome: 'The nth term is 5n — each term is 5 times its position.' },
                { text: 'patterns only extend forward one step', outcome: 'Not quite — Students think patterns only extend forward one step — \'add 3 again\'.', reveals: 'patterns-only-extend-forward-one' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch12_121', title: 'Number Patterns',
          caseStudy: { intro: 'Imagine you are tiling a bathroom floor and placing tiles in a growing square pattern: first 1, then 4, then 9, then 16.',
            decisions: [{ prompt: 'What is the next number in the sequence 2, 5, 8, 11, ...? a) 12 b) 13 c) 14 d) 15', options: [
                { text: 'c) 14', outcome: 'The correct answer is c) 14. A wrong answer suggests the student is either guessing or failing.' },
                { text: 'all patterns are arithmetic (adding the same number)', outcome: 'Not quite — Students often assume all patterns are arithmetic (adding the same number).', reveals: 'all-patterns-are-arithmetic-adding' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch12_122', title: 'Geometric Patterns',
          scaffold: { problem: 'A decorator is making a chain of triangles using matchsticks. 1 triangle needs 3 matchsticks. 2 triangles joined in a row need 5.',
            steps: [
            { text: 'List the sequence: 3, 5, 7, ...' },
            { text: 'Identify the rule: Each new triangle adds 2 matchsticks (one for the side and one for the base).' },
            { text: 'Write out the terms: 1st=3, 2nd=5, 3rd=7, 4th=9, 5th=11, 6th=13.' },
            { text: 'Compute the final number: 13 matchsticks.' },
            { text: 'Verify: 3 + (5 steps × 2) = 13.', faded: true, blankAnswer: '13 matchsticks' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch12_123', title: 'Rapid check',
          drill: { kind: 'linear2', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch12_004', title: 'Use it in the wild',
          caseStudy: { intro: 'A child saves pocket money on a doubling plan: ₹5 on day one, ₹10 on day two, ₹20 on day three. A sibling predicts day five will be ₹25, \'because the numbers are going up by fives.\'',
            decisions: [{ prompt: 'What will day five actually bring, and where did the sibling go wrong?', options: [
                { text: '₹80 — the rule is doubling, not adding five: 5, 10, 20, 40, 80. The sibling saw the first jump (+5) and assumed it repeats, but patterns are found by checking the rule against every step — 5 to 10 is also \'add 5\', yet 10 to 20 breaks it while doubling survives every step.', outcome: 'The lesson of patterns: one jump suggests a rule, but the rule must explain all the steps — \'add 5\' dies at day three, doubling holds to the end.' },
                { text: 'The sibling is right — the pattern adds five each time, so day five gives ₹25.', outcome: 'Adding five fails at the second step already — 10 to 20 is a jump of ten; the rule must fit every transition, not just the first.', reveals: 'first-jump-sets-rule' },
                { text: 'Day five cannot be predicted — three numbers are never enough to continue a pattern.', outcome: 'Three terms are enough when one simple rule explains all of them — doubling accounts for both jumps and cleanly predicts 40 and 80.', reveals: 'patterns-are-unguessable' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch12_123', title: 'You made it',
          caseStudy: { intro: 'Every pattern has a rule doing quiet work between the numbers. Find the rule, and the future of the sequence is yours.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch12_004', difficulty: 'standard',
          question: 'Expressing a pattern algebraically means replacing the repeating rule with.',
          hint: 'Work step by step.',
          misconception: 'Students think patterns only extend forward one step — \'add 3 again\'.',
          parts: [
                { id: 'a', prompt: 'The sequence is 5, 10, 15, 20… — write the rule for the nth term.', answer: 'The nth term is 5n',
                  options: ['The nth term is 5n', 'patterns only extend forward one step'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think patterns only extend forward one step — \'add 3 again\'.' },
                { id: 'b', prompt: 'Using \'nth term = 3n\', what is the 25th term?', answer: '3 × 25 = 75 — one substitution instead of listing 24 terms',
                  options: ['3 × 25 = 75 — one substitution instead of listing 24 terms', 'patterns only extend forward one step'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think patterns only extend forward one step — \'add 3 again\'.' },
                { id: 'c', prompt: 'Why is a formula better than \'keep adding\' for finding the 100th term?', answer: 'The formula computes any term in one step',
                  options: ['The formula computes any term in one step', 'patterns only extend forward one step'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think patterns only extend forward one step — \'add 3 again\'.' },
                { id: 'd', prompt: 'The pattern 7, 14, 21, 28… — what is the nth term?', answer: '7n — each term is 7 times its position number',
                  options: ['7n — each term is 7 times its position number', 'patterns only extend forward one step'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think patterns only extend forward one step — \'add 3 again\'.' }
          ],
            remediations: { 'patterns-only-extend-forward-one': { steps: ['Build the position table: write n (1,2,3,4) over the terms (5,10,15,20), find what n must be multiplied or added.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch12_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think patterns only extend forward one step — \'add 3 again\'.',
          parts: [
                { id: 'a', prompt: 'How do you check your formula is right?', answer: 'Substitute small n',
                  options: ['Substitute small n', 'patterns only extend forward one step'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think patterns only extend forward one step — \'add 3 again\'.' }
          ],
            remediations: { 'patterns-only-extend-forward-one': { steps: ['Build the position table: write n (1,2,3,4) over the terms (5,10,15,20), find what n must be multiplied or added.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch12_121', difficulty: 'standard',
          question: 'A number pattern is a sequence of numbers arranged according to a specific.',
          hint: 'Review basic addition facts and multiplication tables.',
          misconception: 'Students often assume all patterns are arithmetic (adding the same number).',
          parts: [
                { id: 'a', prompt: 'What is the next number in the sequence 2, 5, 8, 11, ...? a) 12 b) 13 c) 14 d) 15', answer: 'c) 14',
                  options: ['c) 14', 'all patterns are arithmetic (adding the same number)'],
                  hint: 'Review basic addition facts and multiplication tables.',
                  misconception: 'Students often assume all patterns are arithmetic (adding the same number).' },
                { id: 'b', prompt: 'If a sequence follows the rule of square numbers (1, 4, 9, 16...), what is the 6th number in the sequence?', answer: 'The answer is 36',
                  options: ['The answer is 36', 'all patterns are arithmetic (adding the same number)'],
                  hint: 'Review basic addition facts and multiplication tables.',
                  misconception: 'Students often assume all patterns are arithmetic (adding the same number).' },
                { id: 'c', prompt: 'A shopkeeper sells decorative candles in packs: 1, 3, 6, 10, 15... If he wants to create the next pack size, how many candles will he need?', answer: 'He will need 21 candles',
                  options: ['He will need 21 candles', 'growing', 'all patterns are arithmetic (adding the same number)'],
                  hint: 'Review basic addition facts and multiplication tables.',
                  misconception: 'Students often assume all patterns are arithmetic (adding the same number).' }
          ],
            remediations: { 'all-patterns-are-arithmetic-adding': { steps: ['If a student misses a pattern, stop and draw the numbers as dots or shapes.', 'Ask: "Can you see the shape growing?" If they still struggle, write the differences between the numbers in a row below.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch12_122', difficulty: 'standard',
          question: 'Geometric patterns are consistent arrangements of shapes that follow a logical.',
          hint: 'Review the properties of polygons (sides and vertices).',
          misconception: 'Students often assume that the number of "parts" (like matchsticks or sides) will always increase by the same total.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Geometric patterns are consistent arrangements of shapes that follow a logical rule, such',
                  options: ['Geometric patterns are consistent arrangements of shapes that follow a logical rule, such', 'Expressing a pattern algebraically means replacing the repeating rule with a formula', 'A number pattern is a sequence of numbers arranged according to a specific, repeatable', 'A pattern is a predictable, repeating, or evolving arrangement of numbers, shapes, or'],
                  hint: 'Review the properties of polygons (sides and vertices).',
                  misconception: 'Students often assume that the number of "parts" (like matchsticks or sides) will always increase by the same total number as the first.' }
          ],
            remediations: { 'the-number-of-parts-like': { steps: ['Ask the student to physically draw the 2 squares on paper.', 'Point to the middle line where the squares meet and ask, "Does this line belong to the first square, the second square.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch12_123', difficulty: 'standard',
          question: 'A pattern is a predictable, repeating, or evolving arrangement of numbers.',
          hint: 'Review simple addition tables and basic shape identification.',
          misconception: 'Students often assume that the difference between numbers in a sequence must be constant (arithmetic progression).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A pattern is a predictable, repeating, or evolving arrangement of numbers, shapes, or',
                  options: ['A pattern is a predictable, repeating, or evolving arrangement of numbers, shapes, or', 'Expressing a pattern algebraically means replacing the repeating rule with a formula', 'A number pattern is a sequence of numbers arranged according to a specific, repeatable', 'Geometric patterns are consistent arrangements of shapes that follow a logical rule, such'],
                  hint: 'Review simple addition tables and basic shape identification.',
                  misconception: 'Students often assume that the difference between numbers in a sequence must be constant (arithmetic progression).' }
          ],
            remediations: { 'the-difference-between-numbers-in': { steps: ['If a student fails, ask them to "draw" the sequence using dots on paper.', 'Tell them: "Don\'t look at the numbers yet.', 'How many new dots did you add to the edges of the previous shape to make the new one?" This physical act of adding rows.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
