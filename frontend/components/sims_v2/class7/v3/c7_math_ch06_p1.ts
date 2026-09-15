import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch06_p1: SimDef = {
    id: 'v3_c7_math_ch06_p1',
    title: 'Number Play · Part 1/2',
    subtitle: 'Covers finite and infinite sequences involving integers, fractions, and basic algebraic.',
    classLevel: 7, subject: 'mathematics', topic: 'Number Play · Part 1/2',
    chapters: ['c7_math_ch06'],
    nodeIds: ['c7_math_ch06_001', 'c7_math_ch06_002', 'c7_math_ch06_003', 'c7_math_ch06_004', 'c7_math_ch06_005', 'c7_math_ch06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are standing at a metro station in Delhi and watching the digital board show the arrival times.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The metro board shows arrivals at 5, 10, 15, 20 minutes. How do you already know the next train is at 25 — without waiting to see it?',
        options: ['The sequence follows a rule — +5 each time — so the rule predicts every future term without listing them', 'It is luck — the pattern could break any second', 'The board is programmed to fool passengers', 'You add all the numbers shown to get the next'],
        answer: 'The sequence follows a rule — +5 each time — so the rule predicts every future term without listing them',
        hook: 'Not every sequence adds the same step. Check the gaps: 2, 5, 10, 17, 26 grows by +3, +5, +7, +9 — the differences themselves are growing, so guessing add-3 forever fails.',
    },
    teaching: [
        { title: 'Numbers Tell Us Things: Interpreting Number Sequences', text: 'Interpreting number sequences involves analyzing a ordered list of numbers arranged according to a specific mathematical rule to uncover the underlying pattern, predict future terms, or solve.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch06_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Crack three sequences — one adding a constant, one doubling, one with growing gaps — write the rule of each, then jump straight to the tenth term of the first.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch06_001', title: 'Numbers Tell Us Things: Interpreting Number Sequences',
          scaffold: { problem: 'Riya saves money in her piggy bank every week. Week 1 she saves ₹50, Week 2 she saves ₹75, Week 3 she saves ₹100, and Week 4 she saves.',
            steps: [
            { text: 'List the given sequence of savings: 50, 75, 100, 125. Identify what is asked: the 8th term ($n = 8$).' },
            { text: 'Calculate the difference between consecutive terms to find the rule. $75 - 50 = 25$, $100 - 75 = 25$, $125 - 100 = 25$.' },
            { text: 'Use the arithmetic sequence rule $a_n = a_1 + (n - 1)d$, where $a_1 = 50$, $n = 8$, and $d = 25$.' },
            { text: 'Substitute the values into the formula: $a_8 = 50 + (8 - 1) \\times 25 = 50 + 7 \\times 25 = 50 + 175 = 225$.' },
            { text: 'Interpret the result with proper units: Riya will save ₹225 in Week 8.', faded: true, blankAnswer: '₹225' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch06_002', title: 'Picking Parity: Even and Odd Number Properties',
          scaffold: { problem: 'A school in Jaipur has a total of $x$ students, where $x$ is an odd number.',
            steps: [
            { text: 'Define the given variable. Let the number of students be $x = 2n + 1$, where $n$ is an integer, because $x$ is given.' },
            { text: 'Set up the algebraic expression for the total number of notebooks, which is $3 \\times x$.' },
            { text: 'Substitute the expression for $x$ into the product: $3(2n + 1)$.' },
            { text: 'Expand the brackets using distributive property: $3(2n) + 3(1) = 6n + 3$.' },
            { text: 'Rewrite $6n + 3$ to isolate a factor of $2$ for parity testing: $6n + 2 + 1 = 2(3n + 1) + 1$.', faded: true, blankAnswer: 'The total number of notebooks is odd.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch06_003', title: 'Sum of Even and Odd Numbers: Rules and Patterns',
          scaffold: { problem: 'Priya has a collection of currency notes for a school charity drive.',
            steps: [
            { text: 'Identify the given quantities and their parities: let $A = 345$ (which is an odd quantity, representable as $2n + 1$).' },
            { text: 'Set up the algebraic addition of an odd quantity and an even quantity: $(2n + 1) + 2m$.' },
            { text: 'Rearrange terms using the commutative and associative properties of addition: $2n + 2m + 1$.' },
            { text: 'Factor out 2 from the first two terms to isolate the even structure: $2(n + m) + 1$.' },
            { text: 'Interpret the algebraic result: since $2(n + m)$ is a multiple of 2 (making it even), adding 1 to it makes the total.', faded: true, blankAnswer: 'The total number of notes is odd (565 notes).' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch06_004', title: 'Explorations in Grids: Number Patterns in Arrays',
          scaffold: { problem: 'A school courtyard has paving tiles arranged in a rectangular grid with 7 rows and 12 tiles in each row.',
            steps: [
            { text: 'Identify given values: total rows $r = 7$, columns per row $c = 12$, blue tiles per row $b = 3$.' },
            { text: 'Determine the number of white tiles per row by subtracting blue tiles from total columns: $12 - 3 = 9$ white tiles per.' },
            { text: 'Set up the algebraic expression for the total white tiles: Total White = $r \\times (c - b)$.' },
            { text: 'Substitute the values into the expression: $7 \\times (12 - 3) = 7 \\times 9$.' },
            { text: 'Compute the final product: $7 \\times 9 = 63$ white tiles.', faded: true, blankAnswer: '63 white tiles' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch06_005', title: 'Virahanka-Fibonacci Sequence: Nature\'s Favourite Sequence',
          scaffold: { problem: 'A nursery in Delhi plants saplings in a special layout where the number of saplings in row 1 is $1$, row 2 is $1$, and each subsequent row.',
            steps: [
            { text: 'Identify the starting terms given by the problem: Row 1 = $1$, Row 2 = $1$.' },
            { text: 'Apply the recursive rule to find rows 3 through 6. Row 3 = $1 + 1 = 2$, Row 4 = $1 + 2 = 3$, Row 5 = $2 + 3 = 5$, Row 6.' },
            { text: 'List all 6 terms representing the saplings per row: $1, 1, 2, 3, 5, 8$.' },
            { text: 'Add the values of all terms together to find the total: Total = $1 + 1 + 2 + 3 + 5 + 8 = 20$.' },
            { text: 'Verify the addition steps: $1+1=2$, $2+2=4$, $4+3=7$, $7+5=12$, $12+8=20$ saplings.', faded: true, blankAnswer: '20 saplings' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch06_006', title: 'Digits in Disguise: Number Puzzles and Logic',
          scaffold: { problem: 'Solve the addition puzzle where $A$ and $B$ are distinct single digits:',
            steps: [
            { text: 'Write the addition in place value form: $(10A + B) + (10B + A) = 100 + 10C + 5$.' },
            { text: 'Combine like terms on the left side: $11A + 11B = 100 + 10C + 5$, which simplifies to $11(A + B) = 105 + C$.' },
            { text: 'Analyze the units column from the vertical layout: $B + A = 5$ or $B + A = 15$ (with a carry of 1 to the tens column).' },
            { text: 'Test $A + B = 15$. If $A + B = 15$, then $11(15) = 165$. Thus, $100 + 10C + 5 = 165$, meaning $10C = 60$, so $C = 6$.' },
            { text: 'Verify the digit values: If $A + B = 15$ and $C = 6$, valid single digits for $A$ and $B$ could be $7$ and $8$.', faded: true, blankAnswer: 'A = 7, B = 8, C = 6' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch06_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Vasu tracks a potted plant\'s weekly height: 2 cm, 6 cm, 18 cm, 54 cm. Seeing the first jump of 4, he predicts next week will be 54 + 4 = 58 cm and enters it in the school science log.',
            decisions: [{ prompt: 'What should he check before locking in that prediction?', options: [
                { text: 'Check the other jumps: 6−2=4 but 18−6=12 and 54−18=36 — the differences are not constant. The heights multiply by 3 each week, so the next reading is about 162 cm, not 58.', outcome: 'This tests the rule on every consecutive pair instead of trusting the first one — addition failed, multiplication by 3 fits, which changes the prediction completely.' },
                { text: 'The prediction is fine — the first gap of 4 fixes the rule, and later jumps can be ignored.', outcome: 'A rule must work for every step; the second and third gaps already disprove \'add 4\', so 58 contradicts the given data.', reveals: 'first-gap-is-rule' },
                { text: 'Since the numbers grow fast, the next one should just be the biggest round number he can write, like 100.', outcome: 'Sequences follow a fixed rule, not guesses; testing differences and ratios is what reveals it.', reveals: 'guess-the-next-term' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch06_006', title: 'The bigger picture',
          caseStudy: { intro: 'A sequence is a rule wearing a number costume. Find the rule once, and every future term is already yours.',
            decisions: [{ prompt: 'What comes next? Number Play · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Number Play · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch06_001', difficulty: 'standard',
          question: 'Interpreting number sequences involves analyzing a ordered list of numbers.',
          hint: 'Review c6_math_ch12_121 to practice finding simple addition and multiplication patterns.',
          misconception: 'Students often assume every sequence is an arithmetic progression (grows by addition) and mistakenly apply a constant.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Interpreting number sequences involves analyzing a ordered list of numbers arranged',
                  options: ['Interpreting number sequences involves analyzing a ordered list of numbers arranged', 'Even numbers are integers divisible by $2$ (ending in $0, 2, 4, 6, 8$), while odd numbers', 'The sum and difference rules for even and odd numbers describe predictable patterns in', 'Explorations in grids and arrays involves discovering numerical patterns and algebraic'],
                  hint: 'Review c6_math_ch12_121 to practice finding simple addition and multiplication patterns.',
                  misconception: 'Students often assume every sequence is an arithmetic progression (grows by addition) and mistakenly apply a constant difference when the.' }
          ],
            remediations: { 'every-sequence-is-an-arithmetic': { steps: ['Guide the student to test both addition and multiplication between at least three pairs of adjacent terms.', 'Say: "Do not just look at the first two numbers.', 'Check if the difference between term 2 and term 1 is the same as term 3 and term 2.', 'If it is not, check if one number is a multiple or product of the previous number." Write down both operations.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch06_002', difficulty: 'standard',
          question: 'Even numbers are integers divisible by $2$ (ending in $0, 2, 4, 6, 8$), while.',
          hint: 'Review c6_math_ch01_014 for divisibility rules and c6_math_ch05_052 for variables.',
          misconception: 'Students often assume that rules for adding even and odd numbers apply identically to multiplication, or they confuse.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Even numbers are integers divisible by $2$ (ending in $0, 2, 4, 6, 8$), while odd numbers',
                  options: ['Even numbers are integers divisible by $2$ (ending in $0, 2, 4, 6, 8$), while odd numbers', 'Interpreting number sequences involves analyzing a ordered list of numbers arranged', 'The sum and difference rules for even and odd numbers describe predictable patterns in', 'Explorations in grids and arrays involves discovering numerical patterns and algebraic'],
                  hint: 'Review c6_math_ch01_014 for divisibility rules and c6_math_ch05_052 for variables.',
                  misconception: 'Students often assume that rules for adding even and odd numbers apply identically to multiplication, or they confuse the results.' }
          ],
            remediations: { 'rules-for-adding-even-and': { steps: ['Remind the student to test concrete small numbers first and write out arrays or groupings.', 'Show them that $3 \\times 5$ means three groups of five objects, where each group has an odd number of items, leaving.', 'Then, guide them to write out the algebraic forms: let one number be $2a+1$ and the other be $2b+1$, and multiply them.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch06_003', difficulty: 'standard',
          question: 'The sum and difference rules for even and odd numbers describe predictable.',
          hint: 'Review c7_math_ch06_002 to reinforce how even numbers are multiples of 2 and odd numbers.',
          misconception: 'Students often mistakenly believe that adding *any* collection of odd numbers results in an odd sum, failing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sum and difference rules for even and odd numbers describe predictable patterns in',
                  options: ['The sum and difference rules for even and odd numbers describe predictable patterns in', 'Interpreting number sequences involves analyzing a ordered list of numbers arranged', 'Even numbers are integers divisible by $2$ (ending in $0, 2, 4, 6, 8$), while odd numbers', 'Explorations in grids and arrays involves discovering numerical patterns and algebraic'],
                  hint: 'Review c7_math_ch06_002 to reinforce how even numbers are multiples of 2 and odd numbers leave.',
                  misconception: 'Students often mistakenly believe that adding *any* collection of odd numbers results in an odd sum, failing to recognize that the *count*.' }
          ],
            remediations: { 'students-often-mistakenly-believe-that': { steps: ['When a student struggles with parity sums, guide them back to concrete counters or tally marks grouped in pairs.', 'Say: "Let\'s draw each odd number as a pair of dots plus one extra dot left over.', 'When we add two odd numbers, the two leftover single dots join together to make a new complete pair, turning the total.', 'Now, what happens when you have three leftover single dots?" Have them physically circle pairs of dots to visualize why.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch06_004', difficulty: 'standard',
          question: 'Explorations in grids and arrays involves discovering numerical patterns and.',
          hint: 'Review c6_math_ch12_121 to practice identifying basic row-by-row growth in numerical.',
          misconception: 'Students often confuse perimeter counting with area counting when analyzing dot grids, adding the number of dots on the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Explorations in grids and arrays involves discovering numerical patterns and algebraic',
                  options: ['Explorations in grids and arrays involves discovering numerical patterns and algebraic', 'Interpreting number sequences involves analyzing a ordered list of numbers arranged', 'Even numbers are integers divisible by $2$ (ending in $0, 2, 4, 6, 8$), while odd numbers', 'The sum and difference rules for even and odd numbers describe predictable patterns in'],
                  hint: 'Review c6_math_ch12_121 to practice identifying basic row-by-row growth in numerical tables.',
                  misconception: 'Students often confuse perimeter counting with area counting when analyzing dot grids, adding the number of dots on the outer edges instead.' }
          ],
            remediations: { 'students-often-confuse-perimeter-counting': { steps: ['Guide the student to physically draw or point to every single row and column intersection.', 'Say: "Let\'s count how many complete rows we have, and then count how many items are in just one row.', 'Instead of adding them like a fence, let\'s multiply rows times columns because every row has the exact same number.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch06_005', difficulty: 'standard',
          question: 'The Virahanka-Fibonacci sequence is an ordered list of numbers where each term.',
          hint: 'Review c7_math_ch06_001 to practice finding rules in basic number sequences before.',
          misconception: 'Students often confuse the Virahanka-Fibonacci rule by adding the term number (index) to the value, or by adding the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Virahanka-Fibonacci sequence is an ordered list of numbers where each term after the',
                  options: ['The Virahanka-Fibonacci sequence is an ordered list of numbers where each term after the', 'Interpreting number sequences involves analyzing a ordered list of numbers arranged', 'Even numbers are integers divisible by $2$ (ending in $0, 2, 4, 6, 8$), while odd numbers', 'The sum and difference rules for even and odd numbers describe predictable patterns in'],
                  hint: 'Review c7_math_ch06_001 to practice finding rules in basic number sequences before attempting.',
                  misconception: 'Students often confuse the Virahanka-Fibonacci rule by adding the term number (index) to the value, or by adding the *first* and *current*.' }
          ],
            remediations: { 'students-often-confuse-the-virahanka': { steps: ['Guide the student by physically pointing to the last two numbers written down on the page.', 'Say: "Put your left finger on the very last number, and your right finger on the number just before it.', 'Now, use addition to combine *only* these two finger values to write down the next number." Practice this explicitly.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch06_006', difficulty: 'standard',
          question: 'Digits in Disguise: Number Puzzles and Logic involves solving.',
          hint: 'Review place value and face value concepts from Class 6 to understand how letters.',
          misconception: 'Students often assume that different letters can represent the same digit, or that the same letter can represent.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Digits in Disguise: Number Puzzles and Logic involves solving cryptarithms—cryptic',
                  options: ['Digits in Disguise: Number Puzzles and Logic involves solving cryptarithms—cryptic', 'Interpreting number sequences involves analyzing a ordered list of numbers arranged', 'Even numbers are integers divisible by $2$ (ending in $0, 2, 4, 6, 8$), while odd numbers', 'The sum and difference rules for even and odd numbers describe predictable patterns in'],
                  hint: 'Review place value and face value concepts from Class 6 to understand how letters represent digit.',
                  misconception: 'Students often assume that different letters can represent the same digit, or that the same letter can represent different digits.' }
          ],
            remediations: { 'different-letters-can-represent-the': { steps: ['Remind the student of the golden rule of number puzzles: \'One letter, one unique digit; different letters, different.', 'Show them that if $A = 3$, no other letter in that puzzle can be 3.', 'Have them re-test their assigned values by substituting them back into the original letter equation.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
