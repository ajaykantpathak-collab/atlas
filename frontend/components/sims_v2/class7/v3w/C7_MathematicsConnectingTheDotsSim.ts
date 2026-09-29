import type { SimDef } from '../../engine/types';
import C7_MathematicsConnectingTheDotsSim from '../../../simulations/c6_12/C7_MathematicsConnectingTheDotsSim';

/** v3 wrapped master — C7_MathematicsConnectingTheDotsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsconnectingthedotssim: SimDef = {
    id: 'v3w_c7_mathematicsconnectingthedotssim',
    title: 'Explorations in Grids: Number Patterns in Arrays',
    subtitle: 'Covers rectangular, square, and triangular arrangements of numbers in grid layouts up to.',
    classLevel: 7, subject: 'mathematics', topic: 'Explorations in Grids: Number Patterns in Arrays',
    chapters: [],
    nodeIds: ['c7_math_ch06_004', 'c7_math_ch15_001', 'c7_math_ch15_007', 'c7_math_ch10_010', 'c7_math_ch11_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are arranging chairs in the school assembly hall for the annual sports day, placing them in rows.', goal: 'Master Explorations in Grids: Number Patterns in Arrays.' },
    discovery: {
        question: 'Find the first three common multiples of 6 and 8.',
        options: ['Step 1: List the multiples of 6: 6, 12, 18, 24, 30, 36, 42, 48, 54, 72', 'common multiples', 'common factors'],
        answer: 'Step 1: List the multiples of 6: 6, 12, 18, 24, 30, 36, 42, 48, 54, 72',
        hook: 'Students often confuse "common multiples" with "common factors" or assume that common multiples can be found by simply.',
    },
    teaching: [
        { title: 'Explorations in grids and arrays involves.', text: 'Explorations in grids and arrays involves discovering numerical patterns and algebraic relationships by arranging numbers, dots, or objects in rows and columns.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch06_004', title: 'Explorations in grids and arrays.',
          scaffold: { problem: 'A school courtyard has paving tiles arranged in a rectangular grid with 7 rows and 12 tiles in each row.',
            steps: [
            { text: 'Identify given values: total rows $r = 7$, columns per row $c = 12$, blue tiles per row $b = 3$.' },
            { text: 'Determine the number of white tiles per row by subtracting blue tiles from total columns: $12 - 3 = 9$ white tiles per.' },
            { text: 'Set up the algebraic expression for the total white tiles: Total White = $r \\times (c - b)$.' },
            { text: 'Substitute the values into the expression: $7 \\times (12 - 3) = 7 \\times 9$.' },
            { text: 'Compute the final product: $7 \\times 9 = 63$ white tiles.', faded: true, blankAnswer: '63 white tiles' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_001', title: 'An equation is a mathematical statement.',
          scaffold: { problem: 'Priya has a piggy bank. She adds 5 ₹10 coins to her savings box.',
            steps: [
            { text: 'Identify the unknown variable. Let Priya\'s previous money be $x$ rupees.' },
            { text: 'Form the expression for the addition of money. Adding 5 coins of ₹10 means adding $5 \\times 10 = 50$ rupees, so the LHS.' },
            { text: 'Set up the equation by equating the LHS expression to the given total RHS value of 95. The equation is $x + 50 = 95$.' },
            { text: 'Verify the solution by substituting $x = 45$ into the LHS: $\\text{LHS} = 45 + 50 = 95$.' },
            { text: 'Compare LHS and RHS. Since $\\text{LHS} = 95$ and $\\text{RHS} = 95$, both sides balance, confirming $x = 45$ is the.', faded: true, blankAnswer: 'Equation is $x + 50 = 95$; $x = 45$ is verified as the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_007', title: 'Setting up equations from word problems.',
          scaffold: { problem: 'Sunita has 15 more marbles than twice the number of marbles Ravi has. If Sunita has 53 marbles, how many marbles does Ravi have?',
            steps: [
            { text: 'Identify the unknown and assign a variable. Let Ravi\'s marbles be $x$.' },
            { text: 'Translate Sunita\'s marbles into an algebraic expression based on Ravi\'s: Sunita has $2x + 15$.' },
            { text: 'Set the expression equal to Sunita\'s total known marbles to form the equation: $2x + 15 = 53$.' },
            { text: 'Solve the equation using inverse operations. Subtract 15 from both sides: $2x = 53 - 15 \\implies 2x = 38$.' },
            { text: 'Divide both sides by 2: $x = 19$. Verify: Twice of 19 is 38, and $38 + 15 = 53$, which matches.', faded: true, blankAnswer: '19 marbles' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_010', title: 'Patterns in integer operations involve.',
          scaffold: { problem: 'A submarine in the Indian Ocean descends at a steady rate of 25 metres per minute.',
            steps: [
            { text: 'Write the given rate and initial known calculations for positive time: $(-25) \\times 3 = -75$, $(-25) \\times 2 = -50$,.' },
            { text: 'Identify the pattern rule in the products: as the time multiplier decreases by 1 unit, the product increases by 25.' },
            { text: 'Extend the pattern downward to 0 and negative time multipliers: $(-25) \\times 0 = 0$, $(-25) \\times (-1) = +25$, $(-25).' },
            { text: 'Continue the pattern for the final required step: $(-25) \\times (-3) = +50 + 25 = +75$.' },
            { text: 'Interpret the result in context: mathematically, the pattern reveals $+75$ metres, indicating position relative to a.', faded: true, blankAnswer: '+75 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_011', title: 'Common multiples are numbers that are.',
          scaffold: { problem: 'Traffic lights at three different road crossings change after every 15 seconds, 20 seconds, and 30 seconds respectively.',
            steps: [
            { text: 'Identify the given intervals for the traffic lights: 15 seconds, 20 seconds, and 30 seconds.' },
            { text: 'List the multiples for each interval to find the common multiples. Multiples of 15: 15, 30, 45, 60, 75, 90, 105, 120...' },
            { text: 'Identify the first common multiple (LCM), which is 60 seconds (1 minute).' },
            { text: 'Use the property that all common multiples are multiples of the LCM.' },
            { text: 'Convert the seconds into minutes and add to 7:00 AM. 60 seconds = 1 minute (7:01 AM); 120 seconds = 2 minutes (7:02.', faded: true, blankAnswer: '7:01 AM, 7:02 AM, and 7:03 AM' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch15_001', title: 'Identify each idea',
          dissect: { specimen: 'Explorations in Grids: Number Patterns in Arrays', spots: [
            { id: 's1', label: 'Explorations in grids and arrays', prompt: 'Which idea is this? — Explorations in grids and arrays involves discovering numerical patterns and algebraic.', answer: 'Explorations in grids and arrays', options: ['Explorations in grids and arrays', 'An equation is a mathematical', 'Setting up equations from word', 'Patterns in integer operations involve'] },
            { id: 's2', label: 'An equation is a mathematical', prompt: 'Which idea is this? — An equation is a mathematical statement that shows two algebraic expressions are equal,.', answer: 'An equation is a mathematical', options: ['An equation is a mathematical', 'Explorations in grids and arrays', 'Setting up equations from word', 'Patterns in integer operations involve'] },
            { id: 's3', label: 'Setting up equations from word', prompt: 'Which idea is this? — Setting up equations from word problems is the process of translating a real-world verbal.', answer: 'Setting up equations from word', options: ['Setting up equations from word', 'Explorations in grids and arrays', 'An equation is a mathematical', 'Patterns in integer operations involve'] },
            { id: 's4', label: 'Patterns in integer operations involve', prompt: 'Which idea is this? — Patterns in integer operations involve observing, analyzing, and generalizing.', answer: 'Patterns in integer operations involve', options: ['Patterns in integer operations involve', 'Explorations in grids and arrays', 'An equation is a mathematical', 'Setting up equations from word'] },
            { id: 's5', label: 'Common multiples are numbers that', prompt: 'Which idea is this? — Common multiples are numbers that are exact multiples of two or more given numbers,.', answer: 'Common multiples are numbers that', options: ['Common multiples are numbers that', 'Explorations in grids and arrays', 'An equation is a mathematical', 'Setting up equations from word'] }
          ] } }
    ],
    explore: { component: C7_MathematicsConnectingTheDotsSim, prompt: 'Explore the interactive — Explorations in Grids: Number Patterns in Arrays' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch06_004', difficulty: 'standard',
          question: 'Explorations in grids and arrays involves discovering numerical patterns and.',
          hint: 'Review c6_math_ch12_121 to practice identifying basic row-by-row growth in numerical.',
          misconception: 'Students often confuse perimeter counting with area counting when analyzing dot grids, adding the number of dots on the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Explorations in grids and arrays involves discovering numerical patterns and algebraic',
                  options: ['Explorations in grids and arrays involves discovering numerical patterns and algebraic', 'An equation is a mathematical statement that shows two algebraic expressions are equal,', 'Setting up equations from word problems is the process of translating a real-world verbal', 'Patterns in integer operations involve observing, analyzing, and generalizing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse perimeter counting with area counting when analyzing dot grids, adding the number of dots on the outer edges instead.' }
          ],
            remediations: { 'students-often-confuse-perimeter-counting': { steps: ['Guide the student to physically draw or point to every single row and column intersection.', 'Say: "Let\'s count how many complete rows we have, and then count how many items are in just one row.', 'Instead of adding them like a fence, let\'s multiply rows times columns because every row has the exact same number of.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_001', difficulty: 'standard',
          question: 'An equation is a mathematical statement that shows two algebraic expressions.',
          hint: 'Review c6_math_ch05_053 to practice identifying terms and expressions before moving to.',
          misconception: 'Students often confuse an algebraic expression with an equation.',
          parts: [
                { id: 'a', prompt: 'Analyze the two statements: Statement 1: $4x + 7$ and Statement 2: $4x + 7 = 23$.', answer: 'Statement 1 is an expression',
                  options: ['Statement 1 is an expression', 'solved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse an algebraic expression with an equation.' }
          ],
            remediations: { 'students-often-confuse-an-algebraic': { steps: ['Remind the student to look closely for the equals sign ($=$).', 'Cover up the right side of an equation and show that it consists of two distinct mathematical expressions separated by.', 'Emphasize: "Expressions are phrases we simplify; equations are complete sentences with an equals sign that we solve."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse an algebraic expression with an equation.',
          parts: [
                { id: 'a', prompt: 'Analyze the two statements: Statement 1: $4x + 7$ and Statement 2: $4x + 7 = 23$.', answer: 'Statement 1 is an expression',
                  options: ['Statement 1 is an expression', 'solved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse an algebraic expression with an equation.' }
          ],
            remediations: { 'students-often-confuse-an-algebraic': { steps: ['Remind the student to look closely for the equals sign ($=$).', 'Cover up the right side of an equation and show that it consists of two distinct mathematical expressions separated by.', 'Emphasize: "Expressions are phrases we simplify; equations are complete sentences with an equals sign that we solve."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_007', difficulty: 'standard',
          question: 'Setting up equations from word problems is the process of translating a.',
          hint: 'Review Class 6 algebraic expressions (c6_math_ch05_054) to practice turning phrases into.',
          misconception: 'Students often write subtraction terms in reverse order when translating phrases like "5 subtracted from a number" or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting up equations from word problems is the process of translating a real-world verbal',
                  options: ['Setting up equations from word problems is the process of translating a real-world verbal', 'Explorations in grids and arrays involves discovering numerical patterns and algebraic', 'An equation is a mathematical statement that shows two algebraic expressions are equal,', 'Patterns in integer operations involve observing, analyzing, and generalizing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write subtraction terms in reverse order when translating phrases like "5 subtracted from a number" or "less than".' }
          ],
            remediations: { 'students-often-write-subtraction-terms': { steps: ['When a student makes this reversal error, ask them to plug in a test number.', 'Say: "If the number is 10, what is 7 less than 10?', 'So if our unknown number is $x$, we must write $x - 7$, not $7 - x$.', 'Always write the base quantity first and then apply the modification." Have them underline words like "less than" or.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_010', difficulty: 'standard',
          question: 'Patterns in integer operations involve observing, analyzing, and generalizing.',
          hint: 'Review c7_math_ch10_005 to reinforce why multiplying two negative integers yields a.',
          misconception: 'Students often assume that operations involving negative numbers always result in negative answers because "negatives.',
          parts: [
                { id: 'a', prompt: 'Study the pattern: $(-3) \\times 4 = -12$, $(-3) \\times 3 = -9$, $(-3) \\times 2 = -6$, $(-3) \\times 1 = -3$, $(-3) \\times 0 = 0$.', answer: 'The next calculation is $(-3) \\times (-1) = +3$',
                  options: ['The next calculation is $(-3) \\times (-1) = +3$', 'negatives make things smaller or worse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that operations involving negative numbers always result in negative answers because "negatives make things smaller.' }
          ],
            remediations: { 'operations-involving-negative-numbers-always': { steps: ['When a student makes this error, guide them to write out the full sequence of numbers on a vertical table.', 'Point to the multiplier column and ask: "As the multiplier goes down from 1 to 0, and then to $-1$, what is happening.', 'Emphasize that the rule of the pattern dictates the next number, overriding intuition about the word "negative."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that operations involving negative numbers always result in negative answers because "negatives.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following student claim: "Since $5 + (-5) = 0$ and $4 + (-4) = 0$, if I follow the pattern for addition of opposites, $(-5) + 5$ must equal $-0$.".', answer: 'The claim is invalid',
                  options: ['The claim is invalid', 'negatives make things smaller or worse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that operations involving negative numbers always result in negative answers because "negatives make things smaller.' }
          ],
            remediations: { 'operations-involving-negative-numbers-always': { steps: ['When a student makes this error, guide them to write out the full sequence of numbers on a vertical table.', 'Point to the multiplier column and ask: "As the multiplier goes down from 1 to 0, and then to $-1$, what is happening.', 'Emphasize that the rule of the pattern dictates the next number, overriding intuition about the word "negative."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_011', difficulty: 'standard',
          question: 'Common multiples are numbers that are exact multiples of two or more given.',
          hint: 'Review c7_math_ch11_007 (Finding LCM by Listing Multiples Method) to reinforce how.',
          misconception: 'Students often confuse "common multiples" with "common factors" or assume that common multiples can be found by simply.',
          parts: [
                { id: 'a', prompt: 'Find the first three common multiples of 6 and 8.', answer: 'Step 1: List the multiples of 6: 6, 12, 18, 24, 30, 36, 42, 48, 54, 72',
                  options: ['Step 1: List the multiples of 6: 6, 12, 18, 24, 30, 36, 42, 48, 54, 72', 'common multiples', 'common factors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "common multiples" with "common factors" or assume that common multiples can be found by simply adding the two.' },
                { id: 'b', prompt: 'If the Least Common Multiple (LCM) of two numbers $x$ and $y$ is 15, what can you deduce about their 4th common multiple?', answer: 'The 4th common multiple is $4 \\times \\text{LCM} = 4 \\times 15 = 60$',
                  options: ['The 4th common multiple is $4 \\times \\text{LCM} = 4 \\times 15 = 60$', 'common multiples', 'common factors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "common multiples" with "common factors" or assume that common multiples can be found by simply adding the two.' }
          ],
            remediations: { 'students-often-confuse-common-multiples': { steps: ['Pause and have the student write out the multiplication tables side by side: for 3 (3, 6, 9, 12, 15...) and for 5 (5,.', 'Remind them that a "multiple" is the result of multiplying a whole number by 1, 2, 3, etc., and a *common* multiple.', 'Show them how circling matching numbers reveals the shared values.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "common multiples" with "common factors" or assume that common multiples can be found by simply.',
          parts: [
                { id: 'a', prompt: 'A student claims that the number 50 is a common multiple of 4 and 5 because it is a multiple of 5. Evaluate this claim and correct any error.', answer: 'The claim is false',
                  options: ['The claim is false', 'common multiples', 'common factors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "common multiples" with "common factors" or assume that common multiples can be found by simply adding the two.' },
                { id: 'b', prompt: 'If the Least Common Multiple (LCM) of two numbers $x$ and $y$ is 15, what can you deduce about their 4th common multiple?', answer: 'The 4th common multiple is $4 \\times \\text{LCM} = 4 \\times 15 = 60$',
                  options: ['The 4th common multiple is $4 \\times \\text{LCM} = 4 \\times 15 = 60$', 'common multiples', 'common factors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "common multiples" with "common factors" or assume that common multiples can be found by simply adding the two.' }
          ],
            remediations: { 'students-often-confuse-common-multiples': { steps: ['Pause and have the student write out the multiplication tables side by side: for 3 (3, 6, 9, 12, 15...) and for 5 (5,.', 'Remind them that a "multiple" is the result of multiplying a whole number by 1, 2, 3, etc., and a *common* multiple.', 'Show them how circling matching numbers reveals the shared values.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
