import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch01_p2: SimDef = {
    id: 'v3_c7_math_ch01_p2',
    title: 'Large Numbers Around Us · Part 2/2',
    subtitle: 'Covers rounding whole numbers up to 8 digits to the nearest 10, 100, and 1000.',
    classLevel: 7, subject: 'mathematics', topic: 'Large Numbers Around Us · Part 2/2',
    chapters: ['c7_math_ch01'],
    nodeIds: ['c7_math_ch01_007', 'c7_math_ch01_008', 'c7_math_ch01_009', 'c7_math_ch01_010', 'c7_math_ch01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are at a school sports day in Delhi, and the announcer says approximately 4,376 people are.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A bicycle is priced 1,00,000 rupees. One friend calls it ten thousand, another calls it a crore. How does one well-placed comma settle the argument?',
        options: ['In the Indian system the comma after the lakh place shows 1,00,000 — six digits, one hundred thousand', 'Count the zeros — five zeros always means crore', 'Read it digit by digit — each 0 is worth ten', 'The longest number on the tag always wins'],
        answer: 'In the Indian system the comma after the lakh place shows 1,00,000 — six digits, one hundred thousand',
        hook: 'Every step left on the place value chart multiplies by ten: ten ten-thousands make one lakh, and one lakh holds one hundred thousands. In the Indian system, commas come after thousands, then lakhs, then crores.',
    },
    teaching: [
        { title: 'Rounding Numbers to Nearest 10, 100, 1000', text: 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate, cleaner multiple of 10, 100, or 1000 that is closest in value to the original number, using standard.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch01_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Take the number 2,35,460 and hunt down the value of the digit 2 — then prove how many thousands and how many ten-thousands hide inside one lakh.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_007', title: 'Rounding Numbers to Nearest 10, 100, 1000',
          scaffold: { problem: 'A textile mill in Gujarat produced 4,683 metres of cotton cloth in a week.',
            steps: [
            { text: 'Identify the target place value for rounding, which is the hundreds place. In 4,683, the hundreds digit is 6.' },
            { text: 'Identify the test digit in the place immediately to the right of the hundreds place, which is the tens digit (8).' },
            { text: 'Apply the rounding rule to the test digit. Since 8 is greater than or equal to 5, we must round up by adding 1 to the.' },
            { text: 'Replace all digits to the right of the hundreds place with zeros, keeping digits to the left unchanged ($4$ remains.' },
            { text: 'Verify the result. The number 4,683 lies between 4,600 and 4,700, and is closer to 4,700.', faded: true, blankAnswer: '4,700 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_008', title: 'Patterns in Products: Exploring Number Patterns',
          scaffold: { problem: 'A school is ordering notebooks. Pack A costs ₹9 $\\times$ ₹11, Pack B costs ₹99 $\\times$ ₹111, and Pack C costs ₹999 $\\times$ ₹1111.',
            steps: [
            { text: 'Identify the given sequence of product expressions: $9 \\times 11 = 99$, $99 \\times 111 = 10989$, $999 \\times 1111.' },
            { text: 'Rewrite the factors using powers of 10 or algebraic components, noting that $9999 = 10000 - 1$ and $11111 = 11111$.' },
            { text: 'Apply the pattern rule where the product of $n$ nines and $(n+1)$ ones yields a structure of leading ones, a zero.' },
            { text: 'Verify algebraically by substituting $(10000 - 1) \\times 11111 = (10000 \\times 11111) - 11111 = 111110000 - 11111$.' },
            { text: 'Perform the subtraction: $111110000 - 00011111 = 111098889$ (Wait: let\'s recalculate accurately: $111110000 - 11111.', faded: true, blankAnswer: '₹110998889' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_009', title: 'Real-Life Applications of Large Numbers (Population, Distance)',
          scaffold: { problem: 'According to a census report, State A has a population of $3,82,54,120$ and State B has a population of $2,15,48,900$.',
            steps: [
            { text: 'Identify the given values: Population of State A ($P_A$) = $3,82,54,120$; Population of State B ($P_B$) = $2,15,48,900$.' },
            { text: 'For part (a), set up the addition aligning columns from the ones place: $3,82,54,120 + 2,15,48,900$.' },
            { text: 'Compute addition: $0+0=0$, $2+0=2$, $1+9=10$ (write $0$, carry $1$), $4+8+1=13$ (write $3$, carry $1$), $5+4+1=10$.' },
            { text: 'For part (b), set up subtraction for the difference: $3,82,54,120 - 2,15,48,900$.' },
            { text: 'Compute subtraction with borrowing where necessary: Ones: $0-0=0$, Tens: $2-0=2$, Hundreds: $1-9$ (borrow $1$ from.', faded: true, blankAnswer: '(a) Combined population = $5,98,03,020$ persons; (b).' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_010', title: 'Operations with Large Numbers: Addition and Subtraction',
          scaffold: { problem: 'A major infrastructure project in India had a total sanctioned budget of ₹$7,54,32,100$.',
            steps: [
            { text: 'Identify the given values. Total budget (minuend) = ₹$7,54,32,100$; Amount spent (subtrahend) = ₹$2,89,45,650$.' },
            { text: 'Set up the vertical subtraction problem, aligning columns from ones to crores.' },
            { text: 'Perform subtraction column by column from right to left, borrowing where necessary.' },
            { text: 'Continue borrowing across columns: Hundreds ($0-6$ needs borrow, goes to thousands column), proceeding leftward through.' },
            { text: 'Verify the result by adding the remainder to the amount spent: $4,64,86,450 + 2,89,45,650 = 7,54,32,100$.', faded: true, blankAnswer: '₹$4,64,86,450$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_011', title: 'Operations with Large Numbers: Multiplication and Division',
          scaffold: { problem: 'A textile mill in Surat weaves 2,45,810 metres of fabric every month. What is the total length of fabric woven in 2 years and 6 months?',
            steps: [
            { text: 'Convert the total time into months. 2 years = $2 \\times 12 = 24$ months. Total months = $24 + 6 = 30$ months.' },
            { text: 'Set up the multiplication expression: $2,45,810 \\times 30$. We can split this as $2,45,810 \\times 3 \\times 10$.' },
            { text: 'Multiply $2,45,810$ by 3: $0 \\times 3 = 0$, $1 \\times 3 = 3$, $8 \\times 3 = 24$ (write 4, carry 2), $5 \\times 3 = 15.' },
            { text: 'Multiply the result by 10 (accounting for the zero in 30): $7,37,430 \\times 10 = 73,74,300$.' },
            { text: 'Verify with estimation: $2,50,000 \\times 30 = 75,00,000$, which is very close to our calculated exact value.', faded: true, blankAnswer: '73,74,300 metres' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch01_011', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Comparing two phone prices, Chintu announces that ₹3,99,900 must cost more than ₹4,08,200 \'because 9 is a bigger digit than 4, and this number is full of nines.\'',
            decisions: [{ prompt: 'Where does his comparison go wrong?', options: [
                { text: 'Price comparison starts from the leftmost, highest place: 3,99,900 has 3 in the lakh place while 4,08,200 has 4, and 4 lakh beats 3 lakh no matter what digits follow — so ₹4,08,200 is actually larger.', outcome: 'This uses place value correctly: digits are weighed by their column, and the lakh column outranks every smaller column combined.' },
                { text: 'Chintu is right — the number with the largest single digit anywhere is the bigger number.', outcome: 'A 9 in the hundreds place is worth 900 while a 4 in the lakh place is worth 4,00,000; digit size cannot beat place value.', reveals: 'biggest-digit-wins' },
                { text: 'Actually they are equal, because both have six digits and six-digit numbers all count as lakhs.', outcome: 'Same digit count means compare column by column from the left — 4 lakh is one full lakh more than 3 lakh, so they differ by ₹8,300.', reveals: 'same-digits-same-value' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch01_011', title: 'You made it',
          caseStudy: { intro: 'Big numbers stop being scary when the commas do the grouping. One lakh is not a mountain — it is just ten ten-thousands standing in a row.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch01_007', difficulty: 'standard',
          question: 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with.',
          hint: 'Review place value columns (tens, hundreds, thousands) using place-value charts before.',
          misconception: 'Students often look at the final digit or the largest digit of a number rather than the specific test digit immediately.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate,',
                  options: ['Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate,', 'The lakh is a unit in the Indian numbering system equal to one hundred thousand', 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs) numbers in the', 'Reading and writing large numbers in the Indian numbering system involves grouping digits'],
                  hint: 'Review place value columns (tens, hundreds, thousands) using place-value charts before attempting.',
                  misconception: 'Students often look at the final digit or the largest digit of a number rather than the specific test digit immediately to the right of the.' }
          ],
            remediations: { 'students-often-look-at-the': { steps: ['If a student struggles, guide them to underline the target place value first and circle the test digit immediately.', 'Have them physically cover all digits to the left of the target place so they are not distracted.', 'Ask them: \'Is the circled digit 5 or more?', 'If yes, add 1 to the underlined digit.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_008', difficulty: 'standard',
          question: 'Patterns in products involve discovering, analyzing, and generalizing.',
          hint: 'Review none to practice identifying core sequence rules and number relationships.',
          misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros.',
          parts: [
                { id: 'a', prompt: 'What is the product of $111 \\times 111$ based on the pattern where $1 \\times 1 = 1$, $11 \\times 11 = 121$, and $1111 \\times 1111 = 12321$?', answer: '$12321$',
                  options: ['$12321$', 'number patterns in products continue purely by visual guesswork (e'],
                  hint: 'Review none to practice identifying core sequence rules and number relationships.',
                  misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or sticking digits together).' },
                { id: 'b', prompt: 'Explain why the product of $9 \\times 12345679$ gives $111111111$ without actually setting up a standard vertical multiplication grid.', answer: 'that $12345679$ multiplied by $9$ is equivalent to multiplying by $(10 - 1)$',
                  options: ['that $12345679$ multiplied by $9$ is equivalent to multiplying by $(10 - 1)$', 'number patterns in products continue purely by visual guesswork (e'],
                  hint: 'Review none to practice identifying core sequence rules and number relationships.',
                  misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or sticking digits together).' },
                { id: 'c', prompt: 'Calculate the product of $9999 \\times 9999$ by expressing one factor as $(10000 - 1)$ and applying algebraic expansion.', answer: '$99980001$',
                  options: ['$99980001$', 'number patterns in products continue purely by visual guesswork (e'],
                  hint: 'Review none to practice identifying core sequence rules and number relationships.',
                  misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or sticking digits together).' },
                { id: 'd', prompt: 'Analyze the pattern: $1 \\times 9 + 2 = 11$, $12 \\times 9 + 3 = 111$, $123 \\times 9 + 4 = 1111$. Predict the 5th line of this pattern and verify its correctness.', answer: '$12345 \\times 9 + 6 = 111111$',
                  options: ['$12345 \\times 9 + 6 = 111111$', 'number patterns in products continue purely by visual guesswork (e'],
                  hint: 'Review none to practice identifying core sequence rules and number relationships.',
                  misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or sticking digits together).' }
          ],
            remediations: { 'number-patterns-in-products-continue': { steps: ['Stop and have the student write out the multiplication step-by-step using the distributive property, such as breaking.', 'Show them that $99 \\times 99$ means $(100 - 1) \\times 99 = 9900 - 99$, which equals $9801$ (or $99 \\times 99 = 9801$).', 'Emphasize that patterns are shorthand for true arithmetic calculations, not magical tricks.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros.',
          parts: [
                { id: 'a', prompt: 'Evaluate the student claim: "When multiplying any number by 11, you just write the number twice side-by-side, so $45 \\times 11 = 4545$." Is this correct, and.', answer: 'The claim is false',
                  options: ['The claim is false', 'number patterns in products continue purely by visual guesswork (e'],
                  hint: 'Review none to practice identifying core sequence rules and number relationships.',
                  misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or sticking digits together).' }
          ],
            remediations: { 'number-patterns-in-products-continue': { steps: ['Stop and have the student write out the multiplication step-by-step using the distributive property, such as breaking.', 'Show them that $99 \\times 99$ means $(100 - 1) \\times 99 = 9900 - 99$, which equals $9801$ (or $99 \\times 99 = 9801$).', 'Emphasize that patterns are shorthand for true arithmetic calculations, not magical tricks.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_009', difficulty: 'standard',
          question: 'Real-life applications of large numbers involve using numbers in lakhs and.',
          hint: 'Review place value alignment and grouping in c7_math_ch01_003 before attempting.',
          misconception: 'Students often misalign place value columns when setting up vertical addition or subtraction for large numbers (lakhs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Real-life applications of large numbers involve using numbers in lakhs and crores to',
                  options: ['Real-life applications of large numbers involve using numbers in lakhs and crores to', 'The lakh is a unit in the Indian numbering system equal to one hundred thousand', 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs) numbers in the', 'Reading and writing large numbers in the Indian numbering system involves grouping digits'],
                  hint: 'Review place value alignment and grouping in c7_math_ch01_003 before attempting multi-step word.',
                  misconception: 'Students often misalign place value columns when setting up vertical addition or subtraction for large numbers (lakhs and crores) because.' }
          ],
            remediations: { 'students-often-misalign-place-value': { steps: ['To fix misalignment errors, have the student draw vertical grid lines representing the Indian place value chart (Cores.', 'Instruct them to always write the numbers starting from the Ones place (right to left) into the grid before performing.', 'Remind them to fill empty higher-place columns with blank space or zeros, ensuring units match units, tens match tens.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_010', difficulty: 'standard',
          question: 'Operations with large numbers involving addition and subtraction require.',
          hint: 'Review place value columns from ones to crores and practice simple borrowing across zeros.',
          misconception: 'Students frequently mismanage "zero placeholders" during multi-step borrowing in subtraction with large numbers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Operations with large numbers involving addition and subtraction require combining or',
                  options: ['Operations with large numbers involving addition and subtraction require combining or', 'The lakh is a unit in the Indian numbering system equal to one hundred thousand', 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs) numbers in the', 'Reading and writing large numbers in the Indian numbering system involves grouping digits'],
                  hint: 'Review place value columns from ones to crores and practice simple borrowing across zeros with.',
                  misconception: 'Students frequently mismanage "zero placeholders" during multi-step borrowing in subtraction with large numbers.' }
          ],
            remediations: { 'students-frequently-mismanage-zero-placeholders': { steps: ['Guide the student by rewriting the number with zeros explicitly expanded or by using color-coded columns.', 'Tell the student: "Stop and look at the neighbor.', 'If your top digit is smaller than the bottom digit, you must borrow.', 'Cross out the neighbor, reduce it by $1$, and give $10$ to your current column.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_011', difficulty: 'standard',
          question: 'Operations with large numbers: multiplication and division involves finding the.',
          hint: 'Review c6_math_ch01_010 and c6_math_ch01_011 to practice standard multiplication and long.',
          misconception: 'Students frequently drop a place-holder zero in the quotient during long division when a brought-down digit is smaller.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Operations with large numbers: multiplication and division involves finding the product',
                  options: ['Operations with large numbers: multiplication and division involves finding the product', 'The lakh is a unit in the Indian numbering system equal to one hundred thousand', 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs) numbers in the', 'Reading and writing large numbers in the Indian numbering system involves grouping digits'],
                  hint: 'Review c6_math_ch01_010 and c6_math_ch01_011 to practice standard multiplication and long division.',
                  misconception: 'Students frequently drop a place-holder zero in the quotient during long division when a brought-down digit is smaller than the divisor,.' }
          ],
            remediations: { 'students-frequently-drop-a-place': { steps: ['Guide the student by rewriting the division step-by-step using explicit place-value columns.', 'Say: "Let\'s check each digit from left to right.', 'When we bring down a digit and it is less than our divisor, what must we write in the quotient before bringing down the.', 'Always write a 0 to hold that place value, then bring down the next digit." Practice estimating the quotient first.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
