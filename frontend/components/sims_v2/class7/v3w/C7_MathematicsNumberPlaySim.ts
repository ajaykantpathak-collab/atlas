import type { SimDef } from '../../engine/types';
import C7_MathematicsNumberPlaySim from '../../../simulations/c6_12/C7_MathematicsNumberPlaySim';

/** v3 wrapped master — C7_MathematicsNumberPlaySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsnumberplaysim: SimDef = {
    id: 'v3w_c7_mathematicsnumberplaysim',
    title: 'Number Play',
    subtitle: 'Covers parity arguments applied to integer sequences, grid-based movement, and simple.',
    classLevel: 7, subject: 'mathematics', topic: 'Parity Arguments in Problem Solving',
    chapters: [],
    nodeIds: ['c7_math_ch06_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are playing a game with 15 coins placed on a table, all showing heads up.', goal: 'Master Number Play.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'A parity argument is a problem-solving.', text: 'A parity argument is a problem-solving strategy that uses the properties of even and odd numbers to prove whether certain configurations, games, or tasks are possible or impossible.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch06_007', title: 'A parity argument is a problem-solving.',
          scaffold: { problem: 'Maya has 12 coins placed in a straight line, all showing Tails (T).',
            steps: [
            { text: 'Assign numerical values to the states: let Tails = 0 and Heads = 1.' },
            { text: 'Identify the target state: 11 Heads and 1 Tail. The target sum is $(11 \\times 1) + (1 \\times 0) = 11$ (an odd number).' },
            { text: 'Analyze the effect of a single move: Flipping 3 coins means changing 3 items from 0 to 1 or 1 to 0.' },
            { text: 'Evaluate the parity of the change: Since $x + y = 3$ (odd), one of $x$ or $y$ is even and the other is odd.' },
            { text: 'Test parity conservation: Starting from an even sum (0), 1 move gives an odd sum, 2 moves give an even sum, 3 moves.', faded: true, blankAnswer: 'Yes, the state can be reached in an odd number of moves.' }
            ] } }
    ],
    explore: { component: C7_MathematicsNumberPlaySim, prompt: 'Explore the interactive — Number Play' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch06_007', difficulty: 'standard',
          question: 'A parity argument is a problem-solving strategy that uses the properties of.',
          hint: 'Review picking parity and sum of even and odd numbers rules from c7_math_ch06_002 and.',
          misconception: 'Students often assume that because a total count is large or a grid is large, any symmetrical or patterned.',
          parts: [
                { id: 'a', prompt: 'Rahul has a row of 7 cups, all initially turned upside down (mouth facing down). In one move, he must turn over exactly 3 cups.', answer: 'No, Rahul cannot reach a state where all 7 cups face upright',
                  options: ['No, Rahul cannot reach a state where all 7 cups face upright', 'impossibility without checking the exact parity invariant of the sum of changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that because a total count is large or a grid is large, any symmetrical or patterned configuration can be achieved,.' }
          ],
            remediations: { 'because-a-total-count-is': { steps: ['When a student gets stuck on parity arguments, do not let them guess by trial and error.', 'Say: "Let\'s assign simple numbers like 0 for even/down and 1 for odd/up.', 'Now, every time you make a move, write down the total sum.', 'Does the sum go up by an even amount or an odd amount?'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
