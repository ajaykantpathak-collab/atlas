import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch06_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch06_p2: SimDef = {
    id: 'v3_c7_math_ch06_p2',
    title: 'Number Play · Part 2/2',
    subtitle: 'Covers parity arguments applied to integer sequences, grid-based movement, and simple.',
    classLevel: 7, subject: 'mathematics', topic: 'Number Play · Part 2/2',
    chapters: ['c7_math_ch06'],
    nodeIds: ['c7_math_ch06_007', 'c7_math_ch06_008', 'c7_math_ch06_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are playing a game with 15 coins placed on a table, all showing heads up.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The metro board shows arrivals at 5, 10, 15, 20 minutes. How do you already know the next train is at 25 — without waiting to see it?',
        options: ['The sequence follows a rule — +5 each time — so the rule predicts every future term without listing them', 'It is luck — the pattern could break any second', 'The board is programmed to fool passengers', 'You add all the numbers shown to get the next'],
        answer: 'The sequence follows a rule — +5 each time — so the rule predicts every future term without listing them',
        hook: 'Not every sequence adds the same step. Check the gaps: 2, 5, 10, 17, 26 grows by +3, +5, +7, +9 — the differences themselves are growing, so guessing add-3 forever fails.',
    },
    teaching: [
        { title: 'Parity Arguments in Problem Solving', text: 'A parity argument is a problem-solving strategy that uses the properties of even and odd numbers to prove whether certain configurations, games, or tasks are possible or impossible.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch06_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Crack three sequences — one adding a constant, one doubling, one with growing gaps — write the rule of each, then jump straight to the tenth term of the first.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch06_008', title: 'Identifying Patterns in Number Sequences',
          scaffold: { problem: 'Riya saves money in her piggy bank for a school trip. On Week 1 she saves ₹50, on Week 2 she saves ₹65, on Week 3 she saves ₹80, and.',
            steps: [
            { text: 'Write down the given sequence of savings: $50, 65, 80, 95, \\dots$ and identify that we need the 10th term ($n = 10$).' },
            { text: 'Find the difference between consecutive terms to check for an arithmetic pattern: $65 - 50 = 15$, $80 - 65 = 15$, $95.' },
            { text: 'Identify the first term ($a_1 = 50$) and use the explicit formula for an arithmetic sequence: $a_n = a_1 + (n - 1)d$.' },
            { text: 'Substitute $n = 10$, $a_1 = 50$, and $d = 15$ into the formula: $a_{10} = 50 + (10 - 1) \\times 15$.' },
            { text: 'Compute step by step: $a_{10} = 50 + (9 \\times 15) = 50 + 135 = 185$ rupees.', faded: true, blankAnswer: '₹185' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch06_009', title: 'Mathematical Reasoning Through Number Games',
          scaffold: { problem: 'Priya plays a number game: "Choose a number, multiply it by 5, add 20, divide the sum by 5, and then subtract 4 from the result." Prove.',
            steps: [
            { text: 'Let the chosen starting number be represented by the variable $x$.' },
            { text: 'Translate each instruction into an algebraic expression:' },
            { text: 'Simplify the algebraic fraction by dividing each term in the numerator by the denominator 5:' },
            { text: 'Combine like terms to find the final simplified expression:' },
            { text: 'Substitute Priya\'s starting number $x = 12$ into the final expression:', faded: true, blankAnswer: 'The final output is always the original number; for $x.' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch06_009', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Vasu tracks a potted plant\'s weekly height: 2 cm, 6 cm, 18 cm, 54 cm. Seeing the first jump of 4, he predicts next week will be 54 + 4 = 58 cm and enters it in the school science log.',
            decisions: [{ prompt: 'What should he check before locking in that prediction?', options: [
                { text: 'Check the other jumps: 6−2=4 but 18−6=12 and 54−18=36 — the differences are not constant. The heights multiply by 3 each week, so the next reading is about 162 cm, not 58.', outcome: 'This tests the rule on every consecutive pair instead of trusting the first one — addition failed, multiplication by 3 fits, which changes the prediction completely.' },
                { text: 'The prediction is fine — the first gap of 4 fixes the rule, and later jumps can be ignored.', outcome: 'A rule must work for every step; the second and third gaps already disprove \'add 4\', so 58 contradicts the given data.', reveals: 'first-gap-is-rule' },
                { text: 'Since the numbers grow fast, the next one should just be the biggest round number he can write, like 100.', outcome: 'Sequences follow a fixed rule, not guesses; testing differences and ratios is what reveals it.', reveals: 'guess-the-next-term' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch06_009', title: 'You made it',
          caseStudy: { intro: 'A sequence is a rule wearing a number costume. Find the rule once, and every future term is already yours.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch06_007', difficulty: 'standard',
          question: 'A parity argument is a problem-solving strategy that uses the properties.',
          hint: 'Review picking parity and sum of even and odd numbers rules from c7_math_ch06_002 and.',
          misconception: 'Students often assume that because a total count is large or a grid is large, any symmetrical or patterned.',
          parts: [
                { id: 'a', prompt: 'Rahul has a row of 7 cups, all initially turned upside down (mouth facing down). In one move, he must turn over exactly 3 cups.', answer: 'No, Rahul cannot reach a state where all 7 cups face upright',
                  options: ['No, Rahul cannot reach a state where all 7 cups face upright', 'impossibility without checking the exact parity invariant of the sum of changes'],
                  hint: 'Review picking parity and sum of even and odd numbers rules from c7_math_ch06_002 and.',
                  misconception: 'Students often assume that because a total count is large or a grid is large, any symmetrical or patterned configuration can be achieved.' }
          ],
            remediations: { 'because-a-total-count-is': { steps: ['When a student gets stuck on parity arguments, do not let them guess by trial and error.', 'Say: "Let\'s assign simple numbers like 0 for even/down and 1 for odd/up.', 'Now, every time you make a move, write down the total sum.', 'Does the sum go up by an even amount or an odd amount?'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch06_008', difficulty: 'standard',
          question: 'Identifying patterns in number sequences involves observing how consecutive.',
          hint: 'Review c6_math_ch12_121 to practice finding basic differences in number patterns.',
          misconception: 'Students often assume every sequence is arithmetic (uses addition/subtraction) and fail to test for geometric.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Identifying patterns in number sequences involves observing how consecutive terms change',
                  options: ['Identifying patterns in number sequences involves observing how consecutive terms change', 'Interpreting number sequences involves analyzing a ordered list of numbers arranged', 'Even numbers are integers divisible by $2$ (ending in $0, 2, 4, 6, 8$), while odd numbers', 'The sum and difference rules for even and odd numbers describe predictable patterns in'],
                  hint: 'Review c6_math_ch12_121 to practice finding basic differences in number patterns.',
                  misconception: 'Students often assume every sequence is arithmetic (uses addition/subtraction) and fail to test for geometric (multiplication/division).' }
          ],
            remediations: { 'every-sequence-is-arithmetic-uses': { steps: ['Guide the student to test both addition and multiplication rules side-by-side.', 'Say: "Let\'s check addition first by finding differences: $6 - 2 = 4$ and $18 - 6 = 12$.', 'Since differences are not constant, let\'s check multiplication or division: $6 \\div 2 = 3$ and $18 \\div 6 = 3$.', 'Since the multiplier is constant, this is a multiplicative pattern!"'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch06_009', difficulty: 'standard',
          question: 'Mathematical reasoning through number games involves analyzing the underlying.',
          hint: 'Review simplifying algebraic expressions and division distribution over addition.',
          misconception: 'When analyzing number tricks with division, students frequently divide only the first term of an algebraic expression.',
          parts: [
                { id: 'a', prompt: 'What term is used in number puzzles to describe a quantity that does not change its value during a sequence of operations or game steps?', answer: 'The correct term is an **invariant**',
                  options: ['The correct term is an **invariant**', 'variable', 'constant'],
                  hint: 'Review simplifying algebraic expressions and division distribution over addition.',
                  misconception: 'When analyzing number tricks with division, students frequently divide only the first term of an algebraic expression by the denominator.' }
          ],
            remediations: { 'when-analyzing-number-tricks-with': { steps: ['Write out the expression as two separate fractions using the distributive property of division over addition: $\\frac{4x.', 'Explicitly ask the student to simplify each fraction separately: $\\frac{4x}{4} = x$ and $\\frac{12}{4} = 3$, giving $x.', 'Remind them that a denominator divides every term in the numerator.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
