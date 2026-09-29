import type { SimDef } from '../../engine/types';
import C7_MathematicsRationalNumbersSim from '../../../simulations/c6_12/C7_MathematicsRationalNumbersSim';

/** v3 wrapped master — C7_MathematicsRationalNumbersSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsrationalnumberssim: SimDef = {
    id: 'v3w_c7_mathematicsrationalnumberssim',
    title: 'Subtraction of Integers: Rules and Examples',
    subtitle: 'Covers subtraction of positive and negative integers, including algebraic transformation.',
    classLevel: 7, subject: 'mathematics', topic: 'Subtraction of Integers: Rules and Examples',
    chapters: [],
    nodeIds: ['c7_math_ch10_003', 'c7_math_ch10_008', 'c7_math_ch10_009', 'c7_math_ch08_004', 'c7_math_ch08_009', 'c7_math_ch08_003', 'c7_math_ch08_010', 'c7_math_ch10_001', 'c7_math_ch10_002', 'c7_math_ch10_004', 'c7_math_ch10_005', 'c7_math_ch10_006', 'c7_math_ch08_001', 'c7_math_ch08_002', 'c7_math_ch08_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are checking the weather report in Srinagar, where the morning temperature is $-3^\\circ\\text{C}$.', goal: 'Master Subtraction of Integers: Rules and Examples.' },
    discovery: {
        question: 'At 6:00 PM, the temperature in Shimla was 2 °C. By midnight, the temperature dropped by 5 °C. Which integer represents the temperature at midnight?',
        options: ['The correct answer is -3 °C', 'below sea level', 'temperature drop'],
        answer: 'The correct answer is -3 °C',
        hook: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or.',
    },
    teaching: [
        { title: 'Subtraction of integers involves finding the.', text: 'Subtraction of integers involves finding the difference between two integers by adding the additive inverse of the subtrahend to the minuend, following the algebraic rule $a - b = a + (-b)$ and $a -.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch10_003', title: 'Subtraction of integers involves.',
          scaffold: { problem: 'At 6:00 AM, the temperature in a mountain town in Himachal Pradesh was $-4^\\circ\\text{C}$.',
            steps: [
            { text: 'Identify the given values: 6:00 AM temperature = $-4^\\circ\\text{C}$, 2:00 PM temperature = $7^\\circ\\text{C}$, midnight.' },
            { text: 'Calculate the midnight temperature by subtracting the drop from the 2:00 PM reading: $7 - 11$.' },
            { text: 'Apply integer subtraction rule: $7 - 11 = 7 + (-11) = -4^\\circ\\text{C}$.' },
            { text: 'Calculate the temperature difference between 6:00 AM and midnight: $\\text{Midnight temperature} - \\text{6:00 AM.' },
            { text: 'Apply the double negative rule: $-4 - (-4) = -4 + 4 = 0^\\circ\\text{C}$.', faded: true, blankAnswer: 'Midnight temperature is $-4^\\circ\\text{C}$ and the total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_008', title: 'The division of integers follows.',
          scaffold: { problem: 'A submarine is descending into the Indian Ocean. Over 5 equal time intervals, its total change in depth is −350 metres.',
            steps: [
            { text: 'Identify the total change in depth (dividend) as −350 metres and the number of intervals (divisor) as $+5$.' },
            { text: 'Set up the integer division expression: $(-350) \\div (+5)$.' },
            { text: 'Apply the sign rule for unlike signs (negative divided by positive), which states the quotient will be negative:.' },
            { text: 'Divide the absolute values: $350 \\div 5 = 70$.' },
            { text: 'Combine the sign and absolute value to get the final result with units: $-70$ metres per interval.', faded: true, blankAnswer: '−70 metres per interval' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch10_009', title: 'Word problems with integers involve.',
          scaffold: { problem: 'At 5:00 AM, the temperature in a mountain village was -8 °C. By 2:00 PM, the temperature rose by 12 °C.',
            steps: [
            { text: 'Identify the initial temperature at 5:00 AM as an integer, which is -8 °C.' },
            { text: 'Account for the first change (rise of 12 °C), which is represented by adding +12.' },
            { text: 'Compute the afternoon temperature: -8 + 12 = +4 °C.' },
            { text: 'Account for the second change (drop of 15 °C), which is represented by subtracting 15 or adding -15.' },
            { text: 'Compute the final midnight temperature: +4 - 15 = -11 °C.', faded: true, blankAnswer: '-11 °C' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_004', title: 'The division of fractions using the.',
          scaffold: { problem: 'A tailor has a ribbon of length $5\\frac{1}{4}$ metres. If she cuts it into smaller pieces of length $\\frac{3}{4}$ of a metre each, how many.',
            steps: [
            { text: 'Identify the total length of the ribbon ($5\\frac{1}{4}$ m) and the length of each cut piece ($\\frac{3}{4}$ m).' },
            { text: 'Convert the mixed fraction $5\\frac{1}{4}$ into an improper fraction: $\\frac{(5 \\times 4) + 1}{4} = \\frac{21}{4}$.' },
            { text: 'Apply the reciprocal method by changing the division sign to multiplication and writing the reciprocal of the divisor.' },
            { text: 'Multiply numerators and denominators while cross-simplifying: $\\frac{21 \\times 4}{4 \\times 3} = \\frac{84}{12}$.' },
            { text: 'Divide 84 by 12 to get the final whole number result: $7$ pieces of ribbon.', faded: true, blankAnswer: '7 pieces' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_009', title: 'The relationship between multiplication.',
          scaffold: { problem: 'A recipe for making traditional Mysore Pak requires $\\frac{3}{4}$ kg of sugar for a single batch.',
            steps: [
            { text: 'Identify the given total quantity ($6\\frac{3}{4}$ kg) and the quantity per batch ($\\frac{3}{4}$ kg).' },
            { text: 'Convert the mixed fraction into an improper fraction: $6\\frac{3}{4} = \\frac{(6 \\times 4) + 3}{4} = \\frac{27}{4}$.' },
            { text: 'Apply the relationship between multiplication and division by rewriting the division as multiplication by the.' },
            { text: 'Multiply and simplify algebraically: $\\frac{27 \\times 4}{4 \\times 3} = \\frac{27}{3} = 9$.' },
            { text: 'Verify the answer using multiplication (quotient $\\times$ divisor = dividend): $9 \\times \\frac{3}{4} = \\frac{27}{4} =.', faded: true, blankAnswer: '9 batches' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_003', title: 'Multiplying two fractions involves.',
          scaffold: { problem: 'Riya buys $\\frac{3}{4}$ kg of sweets. Her brother eats $\\frac{2}{3}$ of these sweets.',
            steps: [
            { text: 'Identify the given quantities: Total sweets bought = $\\frac{3}{4}$ kg, fraction eaten by brother = $\\frac{2}{3}$ of the.' },
            { text: 'Determine the operation required: Finding a fraction of a fraction requires multiplication, so we need to compute.' },
            { text: 'Apply the numerator and denominator rule: Multiply numerators together and denominators together: $\\frac{2 \\times 3}{3.' },
            { text: 'Compute the intermediate product: $\\frac{6}{12}$.' },
            { text: 'Simplify the fraction by dividing the numerator and denominator by their greatest common divisor, 6: $\\frac{6 \\div.', faded: true, blankAnswer: '$\\frac{1}{2}$ kg' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch10_008', title: 'Identify each idea',
          dissect: { specimen: 'Subtraction of Integers: Rules and Examples', spots: [
            { id: 's1', label: 'Subtraction of integers involves finding', prompt: 'Which idea is this? — Subtraction of integers involves finding the difference between two integers by adding.', answer: 'Subtraction of integers involves finding', options: ['Subtraction of integers involves finding', 'The division of integers follows', 'Word problems with integers involve', 'The division of fractions using'] },
            { id: 's2', label: 'The division of integers follows', prompt: 'Which idea is this? — The division of integers follows specific sign rules: dividing two integers with like.', answer: 'The division of integers follows', options: ['The division of integers follows', 'Subtraction of integers involves finding', 'Word problems with integers involve', 'The division of fractions using'] },
            { id: 's3', label: 'Word problems with integers involve', prompt: 'Which idea is this? — Word problems with integers involve translating real-world scenarios—such as changing.', answer: 'Word problems with integers involve', options: ['Word problems with integers involve', 'Subtraction of integers involves finding', 'The division of integers follows', 'The division of fractions using'] },
            { id: 's4', label: 'The division of fractions using', prompt: 'Which idea is this? — The division of fractions using the reciprocal method is a rule where dividing any.', answer: 'The division of fractions using', options: ['The division of fractions using', 'Subtraction of integers involves finding', 'The division of integers follows', 'Word problems with integers involve'] },
            { id: 's5', label: 'The relationship between multiplication and', prompt: 'Which idea is this? — The relationship between multiplication and division of fractions states that dividing a.', answer: 'The relationship between multiplication and', options: ['The relationship between multiplication and', 'Subtraction of integers involves finding', 'The division of integers follows', 'Word problems with integers involve'] },
            { id: 's6', label: 'Multiplying two fractions involves multiplying', prompt: 'Which idea is this? — Multiplying two fractions involves multiplying their numerators together to form the new.', answer: 'Multiplying two fractions involves multiplying', options: ['Multiplying two fractions involves multiplying', 'Subtraction of integers involves finding', 'The division of integers follows', 'Word problems with integers involve'] }
          ] } }
    ],
    explore: { component: C7_MathematicsRationalNumbersSim, prompt: 'Explore the interactive — Subtraction of Integers: Rules and Examples' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch10_003', difficulty: 'standard',
          question: 'Subtraction of integers involves finding the difference between two integers by.',
          hint: 'Review c7_math_ch10_001 to reinforce the concept of opposite numbers and additive.',
          misconception: 'Students frequently drop or misapply negative signs when converting subtraction to addition, especially when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Subtraction of integers involves finding the difference between two integers by adding',
                  options: ['Subtraction of integers involves finding the difference between two integers by adding', 'The division of integers follows specific sign rules: dividing two integers with like', 'Word problems with integers involve translating real-world scenarios—such as changing', 'The division of fractions using the reciprocal method is a rule where dividing any'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently drop or misapply negative signs when converting subtraction to addition, especially when encountering consecutive.' }
          ],
            remediations: { 'students-frequently-drop-or-misapply': { steps: ['When a student makes this sign error, pause and ask them to circle the two adjacent signs in the middle of the.', 'Remind them of the rule: "Two negatives side by side combine to make a big positive plus sign." Have them rewrite the.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_008', difficulty: 'standard',
          question: 'The division of integers follows specific sign rules: dividing two integers.',
          hint: 'Review multiplication of integers (c7_math_ch10_004) to remember how signs interact.',
          misconception: 'Students often apply addition rules to division, mistakenly believing that two negative signs combine to make the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The division of integers follows specific sign rules: dividing two integers with like',
                  options: ['The division of integers follows specific sign rules: dividing two integers with like', 'Subtraction of integers involves finding the difference between two integers by adding', 'Word problems with integers involve translating real-world scenarios—such as changing', 'The division of fractions using the reciprocal method is a rule where dividing any'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often apply addition rules to division, mistakenly believing that two negative signs combine to make the result more negative.' }
          ],
            remediations: { 'students-often-apply-addition-rules': { steps: ['Remind the student of the family of facts connecting multiplication and division: if $3 \\times (-4) = -12$, then $(-12).', 'Have them write down the sign rule card: Like signs (+ and +, or − and −) always make a POSITIVE quotient; Unlike signs.', 'Walk through crossing out the negative signs in $(-12) \\div (-4)$ to visually show them canceling out into a positive.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_009', difficulty: 'standard',
          question: 'Word problems with integers involve translating real-world scenarios—such as.',
          hint: 'Review c7_math_ch10_003 to practice basic integer subtraction rules before attempting.',
          misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or.',
          parts: [
                { id: 'a', prompt: 'At 6:00 PM, the temperature in Shimla was 2 °C. By midnight, the temperature dropped by 5 °C. Which integer represents the temperature at midnight?', answer: 'The correct answer is -3 °C',
                  options: ['The correct answer is -3 °C', 'below sea level', 'temperature drop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' },
                { id: 'b', prompt: 'A miner is working in a coal mine at an elevation of -65 metres.', answer: 'The correct answer is -40 metres',
                  options: ['The correct answer is -40 metres', 'below sea level', 'temperature drop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' },
                { id: 'c', prompt: 'Two mountaineers start at different elevations. Mountaineer A is at an elevation of +1,200 metres, and Mountaineer B is at an elevation of -150 metres (in a.', answer: 'The correct answer is 1,350 metres (or -1,350 metres depending on direction of',
                  options: ['The correct answer is 1,350 metres (or -1,350 metres depending on direction of', 'below sea level', 'temperature drop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' }
          ],
            remediations: { 'students-frequently-misinterpret-directional-wor': { steps: ['To fix this, guide the student to create a vertical number line on their page right beside the word problem.', 'Tell them to circle the starting point (e.g., mark -50 for 50 metres below sea level).', 'Ask them explicitly: "Does \'descending\' mean moving UP towards the sky or DOWN towards the earth?" Once they identify.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch10_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or.',
          parts: [
                { id: 'a', prompt: 'A student solves a temperature problem: "The temperature started at -4 °C and rose by 7 °C.', answer: 'The solution is incorrect',
                  options: ['The solution is incorrect', 'below sea level', 'temperature drop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret directional words in word problems, confusing words like "below sea level" or "temperature drop" with.' }
          ],
            remediations: { 'students-frequently-misinterpret-directional-wor': { steps: ['To fix this, guide the student to create a vertical number line on their page right beside the word problem.', 'Tell them to circle the starting point (e.g., mark -50 for 50 metres below sea level).', 'Ask them explicitly: "Does \'descending\' mean moving UP towards the sky or DOWN towards the earth?" Once they identify.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_004', difficulty: 'standard',
          question: 'The division of fractions using the reciprocal method is a rule where dividing.',
          hint: 'Review c7_math_ch08_001 on fraction multiplication and the definition of reciprocals.',
          misconception: 'Students often flip the first fraction (dividend) instead of the second fraction (divisor), or they flip both fractions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The division of fractions using the reciprocal method is a rule where dividing any',
                  options: ['The division of fractions using the reciprocal method is a rule where dividing any', 'Subtraction of integers involves finding the difference between two integers by adding', 'The division of integers follows specific sign rules: dividing two integers with like', 'Word problems with integers involve translating real-world scenarios—such as changing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often flip the first fraction (dividend) instead of the second fraction (divisor), or they flip both fractions simultaneously when.' }
          ],
            remediations: { 'students-often-flip-the-first': { steps: ['Remind the student of the role of each fraction using a simple whole number analogy: in $12 \\div 3$, the 12 stays.', 'Say: "The first number is what you have; the second number tells you how to group it.', 'Therefore, only the second fraction gets turned upside down into its reciprocal!" Have the student physically box the.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_009', difficulty: 'standard',
          question: 'The relationship between multiplication and division of fractions states that.',
          hint: 'Review c7_math_ch08_004 to practice finding reciprocals and converting division signs.',
          misconception: 'Students often invert the *dividend* (the first fraction) instead of the *divisor* (the second fraction) when.',
          parts: [
                { id: 'a', prompt: 'Which fraction operation is mathematically equivalent to dividing any number by a fraction $\\frac{c}{d}$?', answer: 'Multiplying by the reciprocal $\\frac{d}{c}$',
                  options: ['Multiplying by the reciprocal $\\frac{d}{c}$', 'dividing by the reciprocal', 'multiplying by the same fraction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often invert the *dividend* (the first fraction) instead of the *divisor* (the second fraction) when converting a division problem.' }
          ],
            remediations: { 'students-often-invert-the-dividend': { steps: ['Remind the student using the whole number analogy: in $12 \\div 3 = 4$, the number 12 stays untouched, and we multiply.', 'Say to the student: "Keep the first fraction safe and unchanged, flip only the second fraction after the division sign,.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_003', difficulty: 'standard',
          question: 'Multiplying two fractions involves multiplying their numerators together to.',
          hint: 'Review c6_math_ch03_030 for converting mixed fractions and c6_math_ch01_015 for finding.',
          misconception: 'Students frequently multiply the numerators but mistakenly add the denominators together (e.g., calculating.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplying two fractions involves multiplying their numerators together to form the new',
                  options: ['Multiplying two fractions involves multiplying their numerators together to form the new', 'Subtraction of integers involves finding the difference between two integers by adding', 'The division of integers follows specific sign rules: dividing two integers with like', 'Word problems with integers involve translating real-world scenarios—such as changing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently multiply the numerators but mistakenly add the denominators together (e.g., calculating $\\frac{2}{3} \\times.' }
          ],
            remediations: { 'students-frequently-multiply-the-numerators': { steps: ['Remind the student that multiplication is an independent operation that scales quantities without needing common.', 'Show them visually with a grid: shade $\\frac{2}{3}$ vertically and $\\frac{4}{5}$ horizontally to prove that the.', 'Emphasize the verbal rule: "Top times top, bottom times bottom."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
