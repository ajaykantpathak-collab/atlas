import type { SimDef } from '../../engine/types';
import C7_MathematicsExpressionsUsingLetterNumbersSim from '../../../simulations/c6_12/C7_MathematicsExpressionsUsingLetterNumbersSim';

/** v3 wrapped master — C7_MathematicsExpressionsUsingLetterNumbersSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsexpressionsusingletternumberssim: SimDef = {
    id: 'v3w_c7_mathematicsexpressionsusingletternumberssim',
    title: 'Expressions Using Letter Numbers',
    subtitle: 'Covers arithmetic expressions containing numbers, variables, and basic operations (+, -,.',
    classLevel: 7, subject: 'mathematics', topic: 'Revisiting Arithmetic Expressions with Variables',
    chapters: [],
    nodeIds: ['c7_math_ch04_003', 'c7_math_ch04_004', 'c7_math_ch04_009', 'c7_math_ch15_007', 'c7_math_ch04_001', 'c7_math_ch06_006', 'c7_math_ch04_005', 'c7_math_ch04_010', 'c7_math_ch06_001', 'c7_math_ch06_002', 'c7_math_ch04_006', 'c7_math_ch04_007', 'c7_math_ch06_004', 'c7_math_ch06_009', 'c7_math_ch15_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you go to a local stationery shop in your town and buy $x$ notebooks for ₹25 each, plus a single pen.', goal: 'Master Expressions Using Letter Numbers.' },
    discovery: {
        question: 'If Rahul has $x$ marbles and Priya has 5 more marbles than Rahul, write the algebraic expression for Priya\'s number of marbles.',
        options: ['The correct expression is $x + 5$', '5 more than', '5 times'],
        answer: 'The correct expression is $x + 5$',
        hook: 'Students frequently misinterpret verbal phrases involving subtraction and division by reversing the order of terms.',
    },
    teaching: [
        { title: 'Revisiting arithmetic expressions with.', text: 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical expressions and algebraic expressions by showing how known operations (addition, subtraction, multiplication,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch04_004', title: 'Writing algebraic expressions from word.',
          scaffold: { problem: 'A library has $b$ books on a bottom shelf. The middle shelf has 3 times as many books as the bottom shelf minus 12 books.',
            steps: [
            { text: 'Identify the variable for the baseline shelf. Let the number of books on the bottom shelf be $b$.' },
            { text: 'Translate the middle shelf description. "3 times as many books as the bottom shelf minus 12" translates to $3b - 12$.' },
            { text: 'Translate the top shelf description. "15 more books than the middle shelf" means we take the middle shelf expression.' },
            { text: 'Combine all three shelves into a total sum expression: $b + (3b - 12) + (3b - 12 + 15)$.' },
            { text: 'Simplify the expression by grouping like terms. Total = $b + 3b - 12 + 3b - 12 + 15 = (1 + 3 + 3)b + (-12 - 12 + 15) =.', faded: true, blankAnswer: '$7b - 9$ books' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch04_009', title: 'Substituting values into an algebraic.',
          scaffold: { problem: 'A school store sells notebooks for ₹25 each and pens for ₹10 each.',
            steps: [
            { text: 'Identify the given algebraic expression and the assigned values for the variables: Expression is $25n + 10p + 15$, with.' },
            { text: 'Rewrite the expression by replacing each variable with its corresponding numerical value inside parentheses: $25(4) +.' },
            { text: 'Perform the multiplication operations first according to BODMAS: $25 \\times 4 = 100$ and $10 \\times 6 = 60$.' },
            { text: 'Substitute these products back into the expression: $100 + 60 + 15$.' },
            { text: 'Perform the addition and include the correct currency unit: $100 + 60 + 15 = 175$ rupees.', faded: true, blankAnswer: '₹175' }
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
        { type: 'scaffold', nodeId: 'c7_math_ch04_001', title: 'A variable is a letter or symbol used.',
          scaffold: { problem: 'Riya has ₹50 in her piggy bank. Every day, she saves ₹10 from her pocket money.',
            steps: [
            { text: 'Identify the fixed amount already in the piggy bank, which is constant = ₹50.' },
            { text: 'Identify the daily savings rate and the variable representing the number of days, which is ₹10 per day and $d$ days.' },
            { text: 'Express the total saved amount through multiplication and addition: Total Money = (Daily savings $\\times$ number of.' },
            { text: 'Substitute the given value $d = 7$ into the expression: $10(7) + 50$.' },
            { text: 'Compute the arithmetic operations following BODMAS: $70 + 50 = ₹120$.', faded: true, blankAnswer: 'Algebraic expression is $10d + 50$; total amount for 7 days.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch06_006', title: 'Digits in Disguise: Number Puzzles and.',
          scaffold: { problem: 'Solve the addition puzzle where $A$ and $B$ are distinct single digits:',
            steps: [
            { text: 'Write the addition in place value form: $(10A + B) + (10B + A) = 100 + 10C + 5$.' },
            { text: 'Combine like terms on the left side: $11A + 11B = 100 + 10C + 5$, which simplifies to $11(A + B) = 105 + C$.' },
            { text: 'Analyze the units column from the vertical layout: $B + A = 5$ or $B + A = 15$ (with a carry of 1 to the tens column).' },
            { text: 'Test $A + B = 15$. If $A + B = 15$, then $11(15) = 165$. Thus, $100 + 10C + 5 = 165$, meaning $10C = 60$, so $C = 6$.' },
            { text: 'Verify the digit values: If $A + B = 15$ and $C = 6$, valid single digits for $A$ and $B$ could be $7$ and $8$.', faded: true, blankAnswer: 'A = 7, B = 8, C = 6' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch04_004', title: 'Identify each idea',
          dissect: { specimen: 'Expressions Using Letter Numbers', spots: [
            { id: 's1', label: 'Revisiting arithmetic expressions with variables', prompt: 'Which idea is this? — Revisiting arithmetic expressions with variables bridges the gap between purely numerical.', answer: 'Revisiting arithmetic expressions with variables', options: ['Revisiting arithmetic expressions with variables', 'Writing algebraic expressions from word', 'Substituting values into an algebraic', 'Setting up equations from word'] },
            { id: 's2', label: 'Writing algebraic expressions from word', prompt: 'Which idea is this? — Writing algebraic expressions from word problems involves translating verbal statements.', answer: 'Writing algebraic expressions from word', options: ['Writing algebraic expressions from word', 'Revisiting arithmetic expressions with variables', 'Substituting values into an algebraic', 'Setting up equations from word'] },
            { id: 's3', label: 'Substituting values into an algebraic', prompt: 'Which idea is this? — Substituting values into an algebraic expression is the process of replacing the.', answer: 'Substituting values into an algebraic', options: ['Substituting values into an algebraic', 'Revisiting arithmetic expressions with variables', 'Writing algebraic expressions from word', 'Setting up equations from word'] },
            { id: 's4', label: 'Setting up equations from word', prompt: 'Which idea is this? — Setting up equations from word problems is the process of translating a real-world verbal.', answer: 'Setting up equations from word', options: ['Setting up equations from word', 'Revisiting arithmetic expressions with variables', 'Writing algebraic expressions from word', 'Substituting values into an algebraic'] },
            { id: 's5', label: 'A variable is a letter', prompt: 'Which idea is this? — A variable is a letter or symbol used in algebra to represent an unknown or changing.', answer: 'A variable is a letter', options: ['A variable is a letter', 'Revisiting arithmetic expressions with variables', 'Writing algebraic expressions from word', 'Substituting values into an algebraic'] },
            { id: 's6', label: 'Digits in Disguise Number Puzzles', prompt: 'Which idea is this? — Digits in Disguise: Number Puzzles and Logic involves solving cryptarithms—cryptic.', answer: 'Digits in Disguise Number Puzzles', options: ['Digits in Disguise Number Puzzles', 'Revisiting arithmetic expressions with variables', 'Writing algebraic expressions from word', 'Substituting values into an algebraic'] }
          ] } }
    ],
    explore: { component: C7_MathematicsExpressionsUsingLetterNumbersSim, prompt: 'Explore the interactive — Expressions Using Letter Numbers' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch04_003', difficulty: 'standard',
          question: 'Revisiting arithmetic expressions with variables bridges the gap between purely.',
          hint: 'Review integer multiplication rules and basic distributive property from c6_math_ch02_022.',
          misconception: 'Students often distribute a multiplier to only the first term inside parentheses or fail to distribute a negative sign.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical',
                  options: ['Revisiting arithmetic expressions with variables bridges the gap between purely numerical', 'Writing algebraic expressions from word problems involves translating verbal statements', 'Substituting values into an algebraic expression is the process of replacing the', 'Setting up equations from word problems is the process of translating a real-world verbal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often distribute a multiplier to only the first term inside parentheses or fail to distribute a negative sign correctly across all.' }
          ],
            remediations: { 'students-often-distribute-a-multiplier': { steps: ['To fix this error, explicitly guide the student to draw arrows from the outer factor to every single term inside the.', 'Remind them of integer multiplication rules from Class 6: negative times negative is positive.', 'Write out the expansion in two separate mini-multiplications: $(-2) \\times (3x)$ and $(-2) \\times (-4)$, then combine.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_004', difficulty: 'standard',
          question: 'Writing algebraic expressions from word problems involves translating verbal.',
          hint: 'Review c7_math_ch04_001 to practice matching words like "sum", "difference", "product",.',
          misconception: 'Students frequently misinterpret verbal phrases involving subtraction and division by reversing the order of terms.',
          parts: [
                { id: 'a', prompt: 'If Rahul has $x$ marbles and Priya has 5 more marbles than Rahul, write the algebraic expression for Priya\'s number of marbles.', answer: 'The correct expression is $x + 5$',
                  options: ['The correct expression is $x + 5$', '5 more than', '5 times'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret verbal phrases involving subtraction and division by reversing the order of terms.' }
          ],
            remediations: { 'students-frequently-misinterpret-verbal-phrases': { steps: ['When a student makes a reversal error, have them test the expression with a concrete number.', 'Ask: "If you have 20 rupees and decrease it by $x$ rupees, let\'s say $x$ is 5.', 'Does $5 - 20$ give you what you have left, or does $20 - 5$?" Guide them to see that the starting amount must always.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently misinterpret verbal phrases involving subtraction and division by reversing the order of terms.',
          parts: [
                { id: 'a', prompt: 'Ankit evaluates the phrase "subtract $x$ from 15" and writes the expression as $x - 15$. Is Ankit correct? Justify your answer.', answer: 'Ankit is incorrect',
                  options: ['Ankit is incorrect', 'subtract $A$ from $B$'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret verbal phrases involving subtraction and division by reversing the order of terms.' }
          ],
            remediations: { 'students-frequently-misinterpret-verbal-phrases': { steps: ['When a student makes a reversal error, have them test the expression with a concrete number.', 'Ask: "If you have 20 rupees and decrease it by $x$ rupees, let\'s say $x$ is 5.', 'Does $5 - 20$ give you what you have left, or does $20 - 5$?" Guide them to see that the starting amount must always.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_009', difficulty: 'standard',
          question: 'Substituting values into an algebraic expression is the process of replacing.',
          hint: 'Review integer multiplication rules (c6_math_ch02_022) and algebraic terms and.',
          misconception: 'Students frequently omit multiplication signs or parentheses when substituting negative numbers or coefficients.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Substituting values into an algebraic expression is the process of replacing the',
                  options: ['Substituting values into an algebraic expression is the process of replacing the', 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical', 'Writing algebraic expressions from word problems involves translating verbal statements', 'Setting up equations from word problems is the process of translating a real-world verbal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently omit multiplication signs or parentheses when substituting negative numbers or coefficients.' }
          ],
            remediations: { 'students-frequently-omit-multiplication-signs': { steps: ['Remind the student to always put parentheses around substituted numbers, especially negative numbers, fractions, or.', 'Write out the substitution explicitly: replace every instance of the letter with an empty bracket first, like $5 -.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_007', difficulty: 'standard',
          question: 'Setting up equations from word problems is the process of translating a.',
          hint: 'Review Class 6 algebraic expressions (c6_math_ch05_054) to practice turning phrases into.',
          misconception: 'Students often write subtraction terms in reverse order when translating phrases like "5 subtracted from a number" or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting up equations from word problems is the process of translating a real-world verbal',
                  options: ['Setting up equations from word problems is the process of translating a real-world verbal', 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical', 'Writing algebraic expressions from word problems involves translating verbal statements', 'Substituting values into an algebraic expression is the process of replacing the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write subtraction terms in reverse order when translating phrases like "5 subtracted from a number" or "less than".' }
          ],
            remediations: { 'students-often-write-subtraction-terms': { steps: ['When a student makes this reversal error, ask them to plug in a test number.', 'Say: "If the number is 10, what is 7 less than 10?', 'So if our unknown number is $x$, we must write $x - 7$, not $7 - x$.', 'Always write the base quantity first and then apply the modification." Have them underline words like "less than" or.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_001', difficulty: 'standard',
          question: 'A variable is a letter or symbol used in algebra to represent an unknown or.',
          hint: 'Review c6_math_ch05_052 to reinforce the core difference between constants (fixed.',
          misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an.',
          parts: [
                { id: 'a', prompt: 'In the algebraic expression $4x + 7$, what does the letter $x$ represent? Is it a fixed number or a variable?', answer: 'The letter $x$ represents a variable',
                  options: ['The letter $x$ represents a variable', 'x is always 4', 'x is a constant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an object (e.g., thinking.' },
                { id: 'b', prompt: 'A school canteen sells samosas for ₹15 each. Rahul writes the total cost as $15y$, where $y$ is the number of samosas bought.', answer: 'Rahul is correct',
                  options: ['Rahul is correct', 'apples', 'the number of apples'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an object (e.g., thinking.' },
                { id: 'c', prompt: 'Compare the arithmetic statement "$5 + 5 + 5 + 5 = 20$" with the algebraic expression "$4 \\times m = 20$".', answer: 'The arithmetic statement only describes one specific situation involving four 5s',
                  options: ['The arithmetic statement only describes one specific situation involving four 5s', 'apples', 'the number of apples'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an object (e.g., thinking.' }
          ],
            remediations: { 'students-frequently-confuse-variables-with': { steps: ['Remind the student that letters in algebra are numbers in disguise, not physical objects.', 'Ask them: "If $p$ is the number of pencils, is $p$ a number or is it a plastic pencil?" Guide them to substitute a.', 'Reinforce that the letter stands for an unknown count or amount, and operations (+, -, $\\times$, $\\div$) apply to it.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an.',
          parts: [
                { id: 'a', prompt: 'Teacher gives a statement: "The sum of a number $n$ and 8 is 15." Student A writes $n + 8 = 15$. Student B writes $n = 15 + 8$.', answer: 'Student A is correct',
                  options: ['Student A is correct', 'apples', 'the number of apples'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an object (e.g., thinking.' },
                { id: 'b', prompt: 'Create a real-world scenario from your daily life in India (involving auto-rickshaw fares, buying fruits, or school items) that can be represented using a.', answer: 'An acceptable answer should describe a scenario with a fixed rate and a variable',
                  options: ['An acceptable answer should describe a scenario with a fixed rate and a variable', 'apples', 'the number of apples'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an object (e.g., thinking.' }
          ],
            remediations: { 'students-frequently-confuse-variables-with': { steps: ['Remind the student that letters in algebra are numbers in disguise, not physical objects.', 'Ask them: "If $p$ is the number of pencils, is $p$ a number or is it a plastic pencil?" Guide them to substitute a.', 'Reinforce that the letter stands for an unknown count or amount, and operations (+, -, $\\times$, $\\div$) apply to it.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch06_006', difficulty: 'standard',
          question: 'Digits in Disguise: Number Puzzles and Logic involves solving.',
          hint: 'Review place value and face value concepts from Class 6 to understand how letters.',
          misconception: 'Students often assume that different letters can represent the same digit, or that the same letter can represent.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Digits in Disguise: Number Puzzles and Logic involves solving cryptarithms—cryptic',
                  options: ['Digits in Disguise: Number Puzzles and Logic involves solving cryptarithms—cryptic', 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical', 'Writing algebraic expressions from word problems involves translating verbal statements', 'Substituting values into an algebraic expression is the process of replacing the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that different letters can represent the same digit, or that the same letter can represent different digits in.' }
          ],
            remediations: { 'different-letters-can-represent-the': { steps: ['Remind the student of the golden rule of number puzzles: \'One letter, one unique digit; different letters, different.', 'Show them that if $A = 3$, no other letter in that puzzle can be 3.', 'Have them re-test their assigned values by substituting them back into the original letter equation.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
