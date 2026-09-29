import type { SimDef } from '../../engine/types';
import C7_MathematicsFindingTheUnknownSim from '../../../simulations/c6_12/C7_MathematicsFindingTheUnknownSim';

/** v3 wrapped master — C7_MathematicsFindingTheUnknownSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsfindingtheunknownsim: SimDef = {
    id: 'v3w_c7_mathematicsfindingtheunknownsim',
    title: 'Finding the Unknown: Balancing Both Sides',
    subtitle: 'Covers single-variable linear equations requiring addition, subtraction, multiplication,.',
    classLevel: 7, subject: 'mathematics', topic: 'Finding the Unknown: Balancing Both Sides',
    chapters: [],
    nodeIds: ['c7_math_ch15_002', 'c7_math_ch15_004', 'c7_math_ch15_005', 'c7_math_ch15_007', 'c7_math_ch15_010', 'c7_math_ch11_009', 'c7_math_ch05_007', 'c7_math_ch05_009', 'c7_math_ch09_003', 'c7_math_ch09_006', 'c7_math_ch09_009', 'c7_math_ch07_008', 'c7_math_ch15_001', 'c7_math_ch15_008', 'c7_math_ch15_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are at a local vegetable market in India, and a vegetable vendor uses a traditional beam balance.', goal: 'Master Finding the Unknown: Balancing Both Sides.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Finding the unknown by balancing both sides.', text: 'Finding the unknown by balancing both sides is the process of maintaining equality in an equation by performing identical operations on both the left-hand side (LHS) and right-hand side (RHS) until.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch15_002', title: 'Finding the unknown by balancing both.',
          scaffold: { problem: 'Priya went to the market with some money. After spending ₹45 on books, she has ₹120 left.',
            steps: [
            { text: 'Identify what is given and define the unknown. Let $m$ be the initial money in rupees.' },
            { text: 'Identify the operation needed to isolate $m$. Since 45 is subtracted from $m$, the inverse operation is adding 45.' },
            { text: 'Apply the balance principle by adding 45 to both the LHS and RHS: $m - 45 + 45 = 120 + 45$.' },
            { text: 'Compute the arithmetic on both sides: $m = 165$.' },
            { text: 'Verify the result by substituting back: $165 - 45 = 120$, which matches the given remaining amount.', faded: true, blankAnswer: '₹165' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_004', title: 'Solving linear equations using inverse.',
          scaffold: { problem: 'Riya went to the market and bought some identical notebooks. Each notebook costs ₹25, and she also paid a delivery charge of ₹15.',
            steps: [
            { text: 'Translate the word problem into a linear equation: $25n + 15 = 140$.' },
            { text: 'Identify the operations acting on $n$: first multiplied by 25, then 15 is added.' },
            { text: 'Apply the inverse of adding 15 (which is subtracting 15) to both sides: $25n + 15 - 15 = 140 - 15$, which simplifies to.' },
            { text: 'Apply the inverse of multiplying by 25 (which is dividing by 25) to both sides: $\\frac{25n}{25} = \\frac{125}{25}$,.' },
            { text: 'Verify the result by substituting $n = 5$ back into the original expression: $25(5) + 15 = 125 + 15 = 140$, confirming.', faded: true, blankAnswer: '5 notebooks' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_005', title: 'Equations with variables on both sides.',
          scaffold: { problem: 'Riya saves rupees 50 in her piggy bank and adds rupees 20 every week.',
            steps: [
            { text: 'Identify the given values and let $w$ represent the number of weeks. Riya\'s total savings = $50 + 20w$.' },
            { text: 'Set up the equation where both savings are equal: $50 + 20w = 20 + 30w$.' },
            { text: 'Subtract $20w$ from both sides to collect the variable terms on the right side: $50 = 20 + 30w - 20w \\implies 50 = 20 +.' },
            { text: 'Subtract $20$ from both sides to isolate the variable term: $50 - 20 = 10w \\implies 30 = 10w$.' },
            { text: 'Divide both sides by $10$ to solve for $w$: $w = 30 \\div 10 = 3$.', faded: true, blankAnswer: 'After 3 weeks' }
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
        { type: 'scaffold', nodeId: 'c7_math_ch15_010', title: 'Applications of equations in real-life.',
          scaffold: { problem: 'Amit has ₹450 in his piggy bank, consisting of 5-rupee coins and 10-rupee notes.',
            steps: [
            { text: 'Let the number of 10-rupee notes be $x$. Then the number of 5-rupee coins is $3x$.' },
            { text: 'Calculate the total value contributed by 10-rupee notes, which is $10 \\times x = 10x$ rupees.' },
            { text: 'Calculate the total value contributed by 5-rupee coins, which is $5 \\times 3x = 15x$ rupees.' },
            { text: 'Set up the equation representing the total amount: $10x + 15x = 450$.' },
            { text: 'Combine like terms and solve: $25x = 450 \\implies x = \\frac{450}{25} = 18$.', faded: true, blankAnswer: '18 notes' }
            ] } },
        { type: 'case', nodeId: 'c7_math_ch11_009', title: 'The product of the Highest Common.',
          caseStudy: { intro: 'Imagine you are helping at a school stationery shop in Delhi, and you notice a curious pattern when packing notebooks and pens in bundles.',
            decisions: [{ prompt: 'What does the product of the HCF and LCM of two positive integers always equal?', options: [
                { text: 'The product of the HCF and LCM equals the product of the two numbers themselves ($HCF', outcome: 'The product of the HCF and LCM equals the product of the two numbers themselves ($HCF \\times LCM =.' },
                { text: 'the sum of the two numbers', outcome: 'Not quite — Students frequently confuse the operations when using the formula $HCF \\times LCM = a \\times b$.', reveals: 'students-frequently-confuse-the-operations' },
                { text: 'their difference', outcome: 'Not quite — Students frequently confuse the operations when using the formula $HCF \\times LCM = a \\times b$.', reveals: 'students-frequently-confuse-the-operations' }
            ] }] } }
    ],
    explore: { component: C7_MathematicsFindingTheUnknownSim, prompt: 'Explore the interactive — Finding the Unknown: Balancing Both Sides' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch15_002', difficulty: 'standard',
          question: 'Finding the unknown by balancing both sides is the process of maintaining.',
          hint: 'Review the balance model concept from c6_math_ch05_059 and practice single-step addition.',
          misconception: 'Students often perform an operation on only one side of the equation (e.g., adding 5 to the LHS to cancel out $-5$, but.',
          parts: [
                { id: 'a', prompt: 'If an equation is balanced as $x + 5 = 12$, what operation must be performed on both sides to isolate $x$?', answer: 'Subtract 5 from both sides',
                  options: ['Subtract 5 from both sides', 'add 5 to both sides'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often perform an operation on only one side of the equation (e.g., adding 5 to the LHS to cancel out $-5$, but forgetting to add 5.' }
          ],
            remediations: { 'students-often-perform-an-operation': { steps: ['Remind the student to visualize a physical weighing scale with two identical pans.', 'Say: "Whatever weight you remove or add from the left pan, you must do the exact same to the right pan.', 'Look at how the number is attached to the letter: if it is added, subtract it from *both* sides; if it is multiplied,.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_004', difficulty: 'standard',
          question: 'Solving linear equations using inverse operations involves applying opposite.',
          hint: 'Review c7_math_ch15_002 to practice the balance model before moving to algorithmic.',
          misconception: 'Students often apply the wrong inverse operation or forget to change the sign when moving terms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Solving linear equations using inverse operations involves applying opposite arithmetic',
                  options: ['Solving linear equations using inverse operations involves applying opposite arithmetic', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Equations with variables on both sides are algebraic equations that contain the same', 'Setting up equations from word problems is the process of translating a real-world verbal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often apply the wrong inverse operation or forget to change the sign when moving terms.' }
          ],
            remediations: { 'students-often-apply-the-wrong': { steps: ['Guide the student by asking: "What operation was originally done to the variable in this equation?" Have them write.', 'Then ask: "What is the exact opposite (inverse) of that operation?" (e.g., "Subtracted 6").', 'Remind them to apply that inverse operation to both sides simultaneously to keep the equation balanced.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_005', difficulty: 'standard',
          question: 'Equations with variables on both sides are algebraic equations that contain the.',
          hint: 'Review c7_math_ch15_004 on inverse operations and c6_math_ch02_019 on integer addition.',
          misconception: 'Students frequently make a sign error when transposing a term across the equals sign or when moving a variable term.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Equations with variables on both sides are algebraic equations that contain the same',
                  options: ['Equations with variables on both sides are algebraic equations that contain the same', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving linear equations using inverse operations involves applying opposite arithmetic', 'Setting up equations from word problems is the process of translating a real-world verbal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently make a sign error when transposing a term across the equals sign or when moving a variable term with a negative.' }
          ],
            remediations: { 'students-frequently-make-a-sign': { steps: ['If a student struggles with variables on both sides, pause and use the physical balance scale model.', 'Write the equation and physically draw a dividing line at the equals sign.', 'Instruct the student to write down every single operation explicitly (e.g., write "+ 2x" or "- 5" under both sides of.', 'Emphasize the golden rule of algebra: "Whatever you do to one side of the balance to get rid of a term, you must do the.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_007', difficulty: 'standard',
          question: 'Setting up equations from word problems is the process of translating a.',
          hint: 'Review Class 6 algebraic expressions (c6_math_ch05_054) to practice turning phrases into.',
          misconception: 'Students often write subtraction terms in reverse order when translating phrases like "5 subtracted from a number" or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting up equations from word problems is the process of translating a real-world verbal',
                  options: ['Setting up equations from word problems is the process of translating a real-world verbal', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving linear equations using inverse operations involves applying opposite arithmetic', 'Equations with variables on both sides are algebraic equations that contain the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write subtraction terms in reverse order when translating phrases like "5 subtracted from a number" or "less than".' }
          ],
            remediations: { 'students-often-write-subtraction-terms': { steps: ['When a student makes this reversal error, ask them to plug in a test number.', 'Say: "If the number is 10, what is 7 less than 10?', 'So if our unknown number is $x$, we must write $x - 7$, not $7 - x$.', 'Always write the base quantity first and then apply the modification." Have them underline words like "less than" or.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_010', difficulty: 'standard',
          question: 'Applications of equations in real-life situations involve translating everyday.',
          hint: 'Review c7_math_ch15_007 to practice turning sentences into mathematical equations before.',
          misconception: 'Students frequently fail to distribute coefficients correctly across binomial expressions when setting up word problems.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Applications of equations in real-life situations involve translating everyday word',
                  options: ['Applications of equations in real-life situations involve translating everyday word', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving linear equations using inverse operations involves applying opposite arithmetic', 'Equations with variables on both sides are algebraic equations that contain the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently fail to distribute coefficients correctly across binomial expressions when setting up word problems involving geometry.' }
          ],
            remediations: { 'students-frequently-fail-to-distribute': { steps: ['When a student makes a distribution or setup error, guide them back to physical representation.', 'Ask them to draw the shape or line up the items physically on paper.', 'Say: "Let\'s trace the total perimeter step-by-step: we need two lengths and two widths.', 'Write down $(2x + 5) + (2x + 5) + x + x$ first before simplifying to show all four sides clearly."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_009', difficulty: 'standard',
          question: 'The product of the Highest Common Factor (HCF) and the Least Common Multiple.',
          hint: 'Review c7_math_ch11_004 for finding HCF and c7_math_ch11_008 for finding LCM via prime.',
          misconception: 'Students frequently confuse the operations when using the formula $HCF \\times LCM = a \\times b$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The product of the Highest Common Factor (HCF) and the Least Common Multiple (LCM) of any',
                  options: ['The product of the Highest Common Factor (HCF) and the Least Common Multiple (LCM) of any', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving linear equations using inverse operations involves applying opposite arithmetic', 'Equations with variables on both sides are algebraic equations that contain the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse the operations when using the formula $HCF \\times LCM = a \\times b$.' }
          ],
            remediations: { 'students-frequently-confuse-the-operations': { steps: ['When a student makes this error, stop them and have them write out the formula in words first: "(HCF) times (LCM).', 'Ask them: "If we know the total product and one part of the left side, do we multiply or do we use the opposite.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
