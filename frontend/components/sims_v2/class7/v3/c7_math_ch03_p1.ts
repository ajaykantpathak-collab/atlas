import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch03_p1: SimDef = {
    id: 'v3_c7_math_ch03_p1',
    title: 'A Peek Beyond the Point · Part 1/2',
    subtitle: 'Covers the conceptual transition from whole number measurement to fractional and decimal.',
    classLevel: 7, subject: 'mathematics', topic: 'A Peek Beyond the Point · Part 1/2',
    chapters: ['c7_math_ch03'],
    nodeIds: ['c7_math_ch03_001', 'c7_math_ch03_002', 'c7_math_ch03_003', 'c7_math_ch03_004', 'c7_math_ch03_005', 'c7_math_ch03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are measuring the length of your science notebook with a standard plastic ruler, and the edge.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Your notebook edge lands somewhere between 14 cm and 15 cm — not quite either. Whole numbers just gave up. What rescues the measurement?',
        options: ['Divide one centimetre into 10 equal smaller parts — tenths fill the gap between the whole numbers', 'Round up to 15 and hope nobody checks', 'Use two rulers side by side', 'Declare the notebook unmeasurable'],
        answer: 'Divide one centimetre into 10 equal smaller parts — tenths fill the gap between the whole numbers',
        hook: 'More divisions mean smaller units — a hundredth is tinier than a tenth, not bigger. And 4.2 rupees is 4 whole rupees plus two-tenths of one rupee — 20 paise — not six whole rupees.',
    },
    teaching: [
        { title: 'Need for Smaller Units: Measuring Beyond Whole Numbers', text: 'The need for smaller units arises when whole numbers and standard large measurement units are insufficient to express fractional amounts or precise quantities between two consecutive whole units.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch03_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Measure a pencil that lands between two marks — split the centimetre into tenths, write the length as a whole plus a fraction, and explain why whole numbers alone could not say it.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c7_math_ch03_001', title: 'Need for Smaller Units: Measuring Beyond Whole Numbers',
          caseStudy: { intro: 'Imagine you are measuring the length of your science notebook with a standard plastic ruler, and the edge lands somewhere between 14 cm and 15 cm.',
            decisions: [{ prompt: 'If a pencil\'s length falls between 7 cm and 8 cm on a ruler, why are natural numbers and whole numbers alone insufficient to state its.', options: [
                { text: 'Whole numbers only represent complete, discrete units (7, 8, etc.) and cannot account for', outcome: 'Whole numbers only represent complete, discrete units (7, 8, etc.) and cannot account for the.' },
                { text: 'whole numbers can be rounded to fit', outcome: 'Not quite — Students often treat the smaller fractional parts (tenths, hundredths) as independent whole numbers.', reveals: 'students-often-treat-the-smaller' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_math_ch03_003', title: 'Hundredth Part: Understanding 1/100 as a Decimal',
          scaffold: { problem: 'Aarav has a ribbon of length 4 metres and 25 centimetres. Express the 25 centimetres part as a fraction of a metre, write it as a decimal.',
            steps: [
            { text: 'Identify the relationship between centimetres and metres. We know that 100 centimetres = 1 metre, so 1 centimetre.' },
            { text: 'Express 25 centimetres as a fraction of a metre: $\\frac{25}{100}$ metre.' },
            { text: 'Convert the fraction $\\frac{25}{100}$ into decimal notation by placing 25 in the hundredths position: $0.25$ metre.' },
            { text: 'Add the whole metres (4) to the decimal part ($0.25$): $4 + 0.25 = 4.25$ metres.' },
            { text: 'Verify the result by checking place values: 4 is in the ones place, 2 is in the tenths place ($\\frac{2}{10}$ or 20 cm).', faded: true, blankAnswer: '$4.25$ metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch03_004', title: 'Decimal Place Value: Tenths, Hundredths, Thousandths',
          scaffold: { problem: 'A science kit contains a tiny copper wire of thickness $0.347\\text{ mm}$.',
            steps: [
            { text: 'Identify the given decimal number and separate its whole number and decimal parts: $0.347 = 0 + 0.3 + 0.04 + 0.007$.' },
            { text: 'Express each decimal place value as a fraction: tenths = $\\frac{3}{10}$, hundredths = $\\frac{4}{100}$, thousandths.' },
            { text: 'Write out the complete expanded form: $0.347 = \\frac{3}{10} + \\frac{4}{100} + \\frac{7}{1000}$ or $0.3 + 0.04 + 0.007$.' },
            { text: 'Locate the digit in the hundredths place by counting two positions to the right of the decimal point: the digit is $4$.' },
            { text: 'State the exact numerical value of that digit based on its position: $4 \\times \\frac{1}{100} = \\frac{4}{100} = 0.04$.', faded: true, blankAnswer: 'Expanded form: $0.3 + 0.04 + 0.007$; Hundredths digit.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch03_005', title: 'Units of Measurement and Decimal Notation',
          scaffold: { problem: 'Priya walks $2\\text{ km } 45\\text{ m}$ to school every day. Express this distance entirely in kilometres using decimal notation, and.',
            steps: [
            { text: 'Identify given values: Distance per day = $2\\text{ km } 45\\text{ m}$.' },
            { text: 'Convert the metres part into kilometres by dividing by $1000$: $45\\text{ m} = \\frac{45}{1000}\\text{ km} = 0.045\\text{.' },
            { text: 'Combine the whole kilometres and decimal kilometres: $2\\text{ km} + 0.045\\text{ km} = 2.045\\text{ km}$ per day.' },
            { text: 'Multiply the daily distance by $5$ for the weekly total: $2.045 \\times 5 = 10.225\\text{ km}$.' },
            { text: 'Verify unit and calculation: $2000 \\times 5 = 10000\\text{ m}$ ($10\\text{ km}$) plus $45 \\times 5 = 225\\text{ m}$.', faded: true, blankAnswer: '$10.225\\text{ km}$' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch03_006', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Measuring a table for a school project, Asha finds the edge lands between 84 cm and 85 cm. Her partner writes \'84 cm\' and says, \'Whole numbers are good enough — just pick the nearer mark.\'',
            decisions: [{ prompt: 'Is whole-number precision acceptable here, and what should they record?', options: [
                { text: 'No — the gap between 84 and 85 cm is real length, so divide that centimetre into 10 equal parts; if the edge sits at the 3rd mark, the true measure is 84 and 3/10 cm (84.3 cm), and the small marks exist exactly for this.', outcome: 'This recognises that measurement is continuous: tenths are smaller units that capture what whole numbers leave out.' },
                { text: 'The partner is right — measurements must always be whole numbers, so rounding to 84 is the only correct answer.', outcome: 'Whole numbers leave gaps between consecutive integers; rounding throws away real information, which is why rulers carry subdivisions.', reveals: 'measure-only-wholes' },
                { text: 'They should write 84.3 as \'84 cm and 3 whole centimetres extra\', since 0.3 means three more full units.', outcome: 'The digit after the decimal is three-tenths of one centimetre, not three whole centimetres — smaller units are parts of a whole, not new wholes.', reveals: 'tenth-is-whole-unit' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch03_006', title: 'The bigger picture',
          caseStudy: { intro: 'The real world lives between the whole numbers. Slice the units finer, and every in-between length finally has a name.',
            decisions: [{ prompt: 'What comes next? A Peek Beyond the Point · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Peek Beyond the Point · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch03_001', difficulty: 'standard',
          question: 'The need for smaller units arises when whole numbers and standard large.',
          hint: 'Review c6_math_ch03_029 (Introduction to Fractions) to reinforce how a single unit can.',
          misconception: 'Students often treat the smaller fractional parts (tenths, hundredths) as independent whole numbers rather than parts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The need for smaller units arises when whole numbers and standard large measurement units',
                  options: ['The need for smaller units arises when whole numbers and standard large measurement units', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'A hundredth part is one of one hundred equal parts of a whole, represented as the', 'Decimal place value extends our base-ten number system to the right of the decimal point,'],
                  hint: 'Review c6_math_ch03_029 (Introduction to Fractions) to reinforce how a single unit can be divided.',
                  misconception: 'Students often treat the smaller fractional parts (tenths, hundredths) as independent whole numbers rather than parts of a whole, leading.' }
          ],
            remediations: { 'students-often-treat-the-smaller': { steps: ['When a student struggles with smaller units, guide them back to physical partitioning: take a paper strip, fold it into.', 'Ask them: \'If I have 3 full strips and 4 tiny segments, can I write this as 34?\' Show them that 34 is a large whole.', 'Reinforce that the denominator tells us how many equal pieces make one whole.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_002', difficulty: 'standard',
          question: 'The tenth part represents one of ten equal parts of a whole unit, expressed.',
          hint: 'Review c6_math_ch03_029 (Introduction to Fractions) and c6_math_ch04_042 (Introduction.',
          misconception: 'Students often write the fraction $\\frac{1}{10}$ as decimal $0.01$ instead of $0.1$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The tenth part represents one of ten equal parts of a whole unit, expressed as the',
                  options: ['The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'The need for smaller units arises when whole numbers and standard large measurement units', 'A hundredth part is one of one hundred equal parts of a whole, represented as the', 'Decimal place value extends our base-ten number system to the right of the decimal point,'],
                  hint: 'Review c6_math_ch03_029 (Introduction to Fractions) and c6_math_ch04_042 (Introduction to Decimals).',
                  misconception: 'Students often write the fraction $\\frac{1}{10}$ as decimal $0.01$ instead of $0.1$.' }
          ],
            remediations: { 'students-often-write-the-fraction': { steps: ['Remind the student to count the number of zeros in the denominator of the fraction $\\frac{1}{10}$.', 'Show them a place value chart where the column immediately to the right of the decimal point is labelled "Tenths" and.', 'Have them practice writing fractions like $\\frac{1}{10}, \\frac{2}{10}, \\frac{9}{10}$ directly as $0.1, 0.2, 0.9$.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_003', difficulty: 'standard',
          question: 'A hundredth part is one of one hundred equal parts of a whole, represented.',
          hint: 'Review c7_math_ch03_002 to reinforce how a single whole is divided into 10 equal parts.',
          misconception: 'Students frequently misinterpret the place value of zeros in decimals, writing $\\frac{6}{100}$ as $0.6$ instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A hundredth part is one of one hundred equal parts of a whole, represented as the',
                  options: ['A hundredth part is one of one hundred equal parts of a whole, represented as the', 'The need for smaller units arises when whole numbers and standard large measurement units', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'Decimal place value extends our base-ten number system to the right of the decimal point,'],
                  hint: 'Review c7_math_ch03_002 to reinforce how a single whole is divided into 10 equal parts before.',
                  misconception: 'Students frequently misinterpret the place value of zeros in decimals, writing $\\frac{6}{100}$ as $0.6$ instead of $0.06$.' }
          ],
            remediations: { 'students-frequently-misinterpret-the-place': { steps: ['If a student writes $\\frac{6}{100}$ as $0.6$, guide them back to the fraction meaning: ask them "What.', 'Then ask "Is $\\frac{6}{100}$ ten times smaller than $\\frac{6}{10}$?" Show them a 10x10 grid where 6 out of 100 squares.', 'Emphasize that because there are no full columns (tenths) shaded, we must write a $0$ in the tenths place to hold the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_004', difficulty: 'standard',
          question: 'Decimal place value extends our base-ten number system to the right of the.',
          hint: 'Review c7_math_ch03_003 to reinforce how hundredths relate to fractions and decimal grids.',
          misconception: 'Students often assume that numbers with more digits after the decimal point are always larger, or they misread place.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Decimal place value extends our base-ten number system to the right of the decimal point,',
                  options: ['Decimal place value extends our base-ten number system to the right of the decimal point,', 'The need for smaller units arises when whole numbers and standard large measurement units', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'A hundredth part is one of one hundred equal parts of a whole, represented as the'],
                  hint: 'Review c7_math_ch03_003 to reinforce how hundredths relate to fractions and decimal grids before.',
                  misconception: 'Students often assume that numbers with more digits after the decimal point are always larger, or they misread place values by counting.' }
          ],
            remediations: { 'numbers-with-more-digits-after': { steps: ['To fix this error, guide the student to pad numbers with trailing zeros so they have an equal number of decimal places.', 'Say: "Let\'s line up our decimal points vertically and match the number of digits.', 'Compare $0.450$ and $0.405$ column by column from left to right: both have $4$ in the tenths place, but $0.450$ has.', 'Since $5$ hundredths is greater than $0$ hundredths, $0.450$ is larger."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_005', difficulty: 'standard',
          question: 'Units of measurement and decimal notation involve expressing fractional parts.',
          hint: 'Review place value for tenths, hundredths, and thousandths, and practice writing.',
          misconception: 'Students frequently misalign place values when converting mixed sub-units directly into a single decimal number.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Units of measurement and decimal notation involve expressing fractional parts of standard',
                  options: ['Units of measurement and decimal notation involve expressing fractional parts of standard', 'The need for smaller units arises when whole numbers and standard large measurement units', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'A hundredth part is one of one hundred equal parts of a whole, represented as the'],
                  hint: 'Review place value for tenths, hundredths, and thousandths, and practice writing fractions with.',
                  misconception: 'Students frequently misalign place values when converting mixed sub-units directly into a single decimal number, writing $5\\text{ kg }.' }
          ],
            remediations: { 'students-frequently-misalign-place-values': { steps: ['Remind the student to always write out the full fractional form first before converting to a decimal.', 'For example, show that $5\\text{ kg } 8\\text{ g} = 5\\text{ kg} + \\frac{8}{1000}\\text{ kg}$.', 'Emphasize that since there are three zeros in $1000$, there must be three decimal places after the point, filling.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_006', difficulty: 'standard',
          question: 'Locating decimals on the number line involves identifying the precise position.',
          hint: 'Review c6_math_ch03_037 to practice dividing number line intervals into fractions before.',
          misconception: 'Students often miscount the tick marks on a number line because they count the *lines* (lines drawn) rather than the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Locating decimals on the number line involves identifying the precise position of a',
                  options: ['Locating decimals on the number line involves identifying the precise position of a', 'The need for smaller units arises when whole numbers and standard large measurement units', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'A hundredth part is one of one hundred equal parts of a whole, represented as the'],
                  hint: 'Review c6_math_ch03_037 to practice dividing number line intervals into fractions before returning.',
                  misconception: 'Students often miscount the tick marks on a number line because they count the *lines* (lines drawn) rather than the *spaces* (intervals.' }
          ],
            remediations: { 'students-often-miscount-the-tick': { steps: ['Remind the student to use a "hop" method instead of counting tick marks directly.', 'Say: "Put your pencil tip on the whole number $1$.', 'Do not count that line as a jump.', 'As you move your pencil to the first small line to the right, say \'one hop, that\'s $1.1$\'.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
