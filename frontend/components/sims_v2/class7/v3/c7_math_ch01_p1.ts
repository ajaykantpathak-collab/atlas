import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch01_p1: SimDef = {
    id: 'v3_c7_math_ch01_p1',
    title: 'Large Numbers Around Us · Part 1/2',
    subtitle: 'Covers the concept, place value representation, and magnitude of 1 lakh and 6-digit.',
    classLevel: 7, subject: 'mathematics', topic: 'Large Numbers Around Us · Part 1/2',
    chapters: ['c7_math_ch01'],
    nodeIds: ['c7_math_ch01_001', 'c7_math_ch01_002', 'c7_math_ch01_003', 'c7_math_ch01_004', 'c7_math_ch01_005', 'c7_math_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine saving money in your piggy bank to buy a bicycle that costs ₹1,00,000.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A bicycle is priced 1,00,000 rupees. One friend calls it ten thousand, another calls it a crore. How does one well-placed comma settle the argument?',
        options: ['In the Indian system the comma after the lakh place shows 1,00,000 — six digits, one hundred thousand', 'Count the zeros — five zeros always means crore', 'Read it digit by digit — each 0 is worth ten', 'The longest number on the tag always wins'],
        answer: 'In the Indian system the comma after the lakh place shows 1,00,000 — six digits, one hundred thousand',
        hook: 'Every step left on the place value chart multiplies by ten: ten ten-thousands make one lakh, and one lakh holds one hundred thousands. In the Indian system, commas come after thousands, then lakhs, then crores.',
    },
    teaching: [
        { title: 'Introduction to Large Numbers: Lakh and Its Magnitude', text: 'The lakh is a unit in the Indian numbering system equal to one hundred thousand ($1,00,000$ or $10^5$), representing the threshold where 5-digit numbers transition to 6-digit numbers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch01_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Take the number 2,35,460 and hunt down the value of the digit 2 — then prove how many thousands and how many ten-thousands hide inside one lakh.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_001', title: 'Introduction to Large Numbers: Lakh and Its Magnitude',
          scaffold: { problem: 'A real estate developer in Jaipur sold plots of land worth a total of ₹ $4,50,000$.',
            steps: [
            { text: 'Identify the given number and separate it into periods according to the Indian system: $4,50,000$.' },
            { text: 'Determine the value of the digits in each place: The digit 4 is in the lakh place ($4 \\times 1,00,000$), and the digit.' },
            { text: 'Write the number in words by reading the periods: Four lakh fifty thousand.' },
            { text: 'Write the expanded form by summing the product of each digit and its place value: $(4 \\times 1,00,000) + (5 \\times.' },
            { text: 'Verify the total magnitude: $4,00,000 + 50,000 = 4,50,000$ rupees.', faded: true, blankAnswer: 'Four lakh fifty thousand; Expanded form: $4,00,000 + 50,000$' }
            ] } },
        { type: 'case', nodeId: 'c7_math_ch01_003', title: 'Reading and Writing Large Numbers in Indian System',
          caseStudy: { intro: 'Imagine you hear on the news that the total annual budget for constructing rural roads in your state is `45678910` rupees.',
            decisions: [{ prompt: 'What are the four main periods in the Indian numeration system, starting from the rightmost group?', options: [
                { text: 'The four main periods are Ones, Thousands, Lakhs, and Crores', outcome: 'The four main periods are Ones, Thousands, Lakhs, and Crores. A student who answers with "Units.' },
                { text: 'Units, Tens, Hundreds, Thousands', outcome: 'Not quite — Students often misplace commas or misread numbers by treating all periods as groups of three digits.', reveals: 'students-often-misplace-commas-or' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch01_004', title: 'Crore: Understanding 8-Digit Numbers',
          caseStudy: { intro: 'Imagine the government of India announces a massive budget of nearly ten crore rupees to build new schools across every district, how would you write that.',
            decisions: [{ prompt: 'What is the place value of the digit 7 in the number $4,73,52,100$ according to the Indian numbering system?', options: [
                { text: 'The place value of 7 is $70,00,000$ (Seventy Lakhs)', outcome: 'The place value of 7 is $70,00,000$ (Seventy Lakhs). A student who answers $7,00,000$ has.' },
                { text: 'Three crore four lakh', outcome: 'Not quite — Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.', reveals: 'students-often-write-8-digit' },
                { text: 'four lakh', outcome: 'Not quite — Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.', reveals: 'students-often-write-8-digit' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_006', title: 'Estimation and Approximation of Large Numbers',
          scaffold: { problem: 'A textile mill in Gujarat produced 47,82,345 metres of fabric this year.',
            steps: [
            { text: 'Identify the target place value for rounding, which is the \'lakhs\' place.' },
            { text: 'Look at the digit immediately to the right of the lakhs place (the ten-thousands place).' },
            { text: 'Apply the rounding rule. Since 8 is greater than or equal to 5, we round up the lakhs digit by adding 1 (7 + 1 = 8).' },
            { text: 'Replace all digits to the right of the lakhs place with zeros, keeping the digits to the left unchanged.' },
            { text: 'Verify the result: 47,82,345 is clearly between 47,00,000 and 48,00,000, and since 82,345 is greater than 50,000, it.', faded: true, blankAnswer: '48,00,000 metres' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch01_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Comparing two phone prices, Chintu announces that ₹3,99,900 must cost more than ₹4,08,200 \'because 9 is a bigger digit than 4, and this number is full of nines.\'',
            decisions: [{ prompt: 'Where does his comparison go wrong?', options: [
                { text: 'Price comparison starts from the leftmost, highest place: 3,99,900 has 3 in the lakh place while 4,08,200 has 4, and 4 lakh beats 3 lakh no matter what digits follow — so ₹4,08,200 is actually larger.', outcome: 'This uses place value correctly: digits are weighed by their column, and the lakh column outranks every smaller column combined.' },
                { text: 'Chintu is right — the number with the largest single digit anywhere is the bigger number.', outcome: 'A 9 in the hundreds place is worth 900 while a 4 in the lakh place is worth 4,00,000; digit size cannot beat place value.', reveals: 'biggest-digit-wins' },
                { text: 'Actually they are equal, because both have six digits and six-digit numbers all count as lakhs.', outcome: 'Same digit count means compare column by column from the left — 4 lakh is one full lakh more than 3 lakh, so they differ by ₹8,300.', reveals: 'same-digits-same-value' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Big numbers stop being scary when the commas do the grouping. One lakh is not a mountain — it is just ten ten-thousands standing in a row.',
            decisions: [{ prompt: 'What comes next? Large Numbers Around Us · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Large Numbers Around Us · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch01_001', difficulty: 'standard',
          question: 'The lakh is a unit in the Indian numbering system equal to one hundred thousand.',
          hint: 'Review place value columns from ones to ten-thousands using base-10 blocks or expanded.',
          misconception: 'Students frequently misplace commas or miscount zeros when writing and reading numbers involving lakhs, writing numbers.',
          parts: [
                { id: 'a', prompt: 'Explain why the number $1,00,000$ is called "one hundred thousand" in terms of smaller place values. How many ten-thousand notes make one lakh?', answer: 'One lakh is equal to 10 ten-thousands',
                  options: ['One lakh is equal to 10 ten-thousands', '100 ten-thousands'],
                  hint: 'Review place value columns from ones to ten-thousands using base-10 blocks or expanded notation.',
                  misconception: 'Students frequently misplace commas or miscount zeros when writing and reading numbers involving lakhs, writing numbers like $10,0,000$.' }
          ],
            remediations: { 'students-frequently-misplace-commas-or': { steps: ['Direct the student to draw the Indian Place Value Chart with columns: Lakhs, Ten Thousands, Thousands, Hundreds, Tens.', 'Have them write $1$ under the Lakhs column and fill all remaining columns to the right with zeros, explicitly counting.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_002', difficulty: 'standard',
          question: 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs).',
          hint: 'Review place value columns (Ones, Tens, Hundreds, Thousands, Ten Thousands) from.',
          misconception: 'Students frequently misplace commas or misread 6 and 7-digit numbers by treating them like the International system.',
          parts: [
                { id: 'a', prompt: 'Explain why the digit \'5\' has a different value in the number 5,23,456 depending on which position it occupies.', answer: 'The first \'5\' is in the Lakhs place, meaning it represents $5 \\times 1,00,000 =',
                  options: ['The first \'5\' is in the Lakhs place, meaning it represents $5 \\times 1,00,000 =', 'face value', 'place value'],
                  hint: 'Review place value columns (Ones, Tens, Hundreds, Thousands, Ten Thousands) from c6_math_ch01_003.',
                  misconception: 'Students frequently misplace commas or misread 6 and 7-digit numbers by treating them like the International system (grouping by threes.' }
          ],
            remediations: { 'students-frequently-misplace-commas-or': { steps: ['When a student struggles with place values or misplaces commas in 6- and 7-digit numbers, guide them back to the basic.', 'Have them physically place digits from right to left, noting that the comma separates the periods (the first comma.', 'If they drop zeros in expanded form, have them write out all place values vertically, including those multiplied.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_003', difficulty: 'standard',
          question: 'Reading and writing large numbers in the Indian numbering system involves.',
          hint: 'Review place value columns from right to left (Ones, Tens, Hundreds, Thousands.',
          misconception: 'Students often misplace commas or misread numbers by treating all periods as groups of three digits (like the.',
          parts: [
                { id: 'a', prompt: 'What are the four main periods in the Indian numeration system, starting from the rightmost group?', answer: 'The four main periods are Ones, Thousands, Lakhs, and Crores',
                  options: ['The four main periods are Ones, Thousands, Lakhs, and Crores', 'Units, Tens, Hundreds, Thousands'],
                  hint: 'Review place value columns from right to left (Ones, Tens, Hundreds, Thousands, Ten-Thousand, Lakh.',
                  misconception: 'Students often misplace commas or misread numbers by treating all periods as groups of three digits (like the International system) or.' }
          ],
            remediations: { 'students-often-misplace-commas-or': { steps: ['If a student struggles with placeholder zeros, have them draw a blank place value chart with columns for Crores (Ten.', 'Guide them to write the given word digits under the correct column heading first, and explicitly instruct them to write.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_004', difficulty: 'standard',
          question: 'A crore is an 8-digit number in the Indian numbering system equal to 100 lakhs.',
          hint: 'Review place value columns from ones to ten lakhs using c7_math_ch01_002 before tackling.',
          misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.',
          parts: [
                { id: 'a', prompt: 'What is the place value of the digit 7 in the number $4,73,52,100$ according to the Indian numbering system?', answer: 'The place value of 7 is $70,00,000$ (Seventy Lakhs)',
                  options: ['The place value of 7 is $70,00,000$ (Seventy Lakhs)', 'Three crore four lakh', 'four lakh', 'forty lakh'],
                  hint: 'Review place value columns from ones to ten lakhs using c7_math_ch01_002 before tackling 8-digit.',
                  misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.' },
                { id: 'b', prompt: 'Compare the numbers $8,12,04,500$ and $8,02,99,999$ and explain which one is larger without looking at the last four digits.', answer: '$8,12,04,500$ is larger',
                  options: ['$8,12,04,500$ is larger', 'Three crore four lakh', 'four lakh', 'forty lakh'],
                  hint: 'Review place value columns from ones to ten lakhs using c7_math_ch01_002 before tackling 8-digit.',
                  misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.' }
          ],
            remediations: { 'students-often-write-8-digit': { steps: ['Guide the student to draw the Indian Place Value chart with columns: TC (Ten Crores - leave blank for 8 digits),.', 'Ask them to map each spoken word ("three crore" -> 3 under C; "four lakh" -> 4 under L, leaving TL as 0).', 'Explicitly point out that every period except the hundreds/ones must hold two digits, so single-digit values like 4.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.',
          parts: [
                { id: 'a', prompt: 'A student writes the number "Four crore twenty lakh five thousand six" as $4,20,50,006$. Evaluate whether this is correct and justify your reasoning.', answer: 'This is incorrect',
                  options: ['This is incorrect', 'Three crore four lakh', 'four lakh', 'forty lakh'],
                  hint: 'Review place value columns from ones to ten lakhs using c7_math_ch01_002 before tackling 8-digit.',
                  misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.' },
                { id: 'b', prompt: 'Create an 8-digit number where the digit in the ten-crores place is impossible in the standard Indian system, explain why, and then write a valid 8-digit.', answer: 'An 8-digit number cannot have a digit in the "ten-crores" place',
                  options: ['An 8-digit number cannot have a digit in the "ten-crores" place', 'Three crore four lakh', 'four lakh', 'forty lakh'],
                  hint: 'Review place value columns from ones to ten lakhs using c7_math_ch01_002 before tackling 8-digit.',
                  misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.' }
          ],
            remediations: { 'students-often-write-8-digit': { steps: ['Guide the student to draw the Indian Place Value chart with columns: TC (Ten Crores - leave blank for 8 digits),.', 'Ask them to map each spoken word ("three crore" -> 3 under C; "four lakh" -> 4 under L, leaving TL as 0).', 'Explicitly point out that every period except the hundreds/ones must hold two digits, so single-digit values like 4.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_005', difficulty: 'standard',
          question: 'Comparing and ordering large numbers involves determining whether a large.',
          hint: 'Review place value columns and digit-by-digit comparison from c6_math_ch01_004 (Comparing.',
          misconception: 'Students often compare large numbers by looking at the total number of digits ignoring place value alignment, or they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing and ordering large numbers involves determining whether a large number is',
                  options: ['Comparing and ordering large numbers involves determining whether a large number is', 'The lakh is a unit in the Indian numbering system equal to one hundred thousand', 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs) numbers in the', 'Reading and writing large numbers in the Indian numbering system involves grouping digits'],
                  hint: 'Review place value columns and digit-by-digit comparison from c6_math_ch01_004 (Comparing and.',
                  misconception: 'Students often compare large numbers by looking at the total number of digits ignoring place value alignment, or they look at the last few.' }
          ],
            remediations: { 'students-often-compare-large-numbers': { steps: ['Guide the student by writing both numbers vertically, aligned perfectly by place value columns from left to right.', 'Say: "Cover all digits with your hand except the leftmost column.', 'Compare those two digits first.', 'Only if they are equal do you uncover the next column to the right." Have them practice this column-by-column masking.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_006', difficulty: 'standard',
          question: 'Estimation and approximation of large numbers involves replacing an exact large.',
          hint: 'Review place value columns and basic rounding rules from c6_math_ch01_006 before tackling.',
          misconception: 'Students frequently look at the wrong digit when deciding whether to round up or down—for instance, looking at the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Estimation and approximation of large numbers involves replacing an exact large number',
                  options: ['Estimation and approximation of large numbers involves replacing an exact large number', 'The lakh is a unit in the Indian numbering system equal to one hundred thousand', 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs) numbers in the', 'Reading and writing large numbers in the Indian numbering system involves grouping digits'],
                  hint: 'Review place value columns and basic rounding rules from c6_math_ch01_006 before tackling.',
                  misconception: 'Students frequently look at the wrong digit when deciding whether to round up or down—for instance, looking at the digit in the units.' }
          ],
            remediations: { 'students-frequently-look-at-the': { steps: ['When a student makes a rounding error, guide them using a visual arrow technique: "Put your finger on the target place.', 'Now, draw an arrow to the immediate right neighbor.', 'Ask: Is this circled digit 5 or more?', 'If yes, add 1 to your target digit and change all digits to the right of the target to zeros.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
