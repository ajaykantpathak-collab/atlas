import type { SimDef } from '../../engine/types';
import C7_MathematicsFindingCommonGroundSim from '../../../simulations/c6_12/C7_MathematicsFindingCommonGroundSim';

/** v3 wrapped master — C7_MathematicsFindingCommonGroundSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsfindingcommongroundsim: SimDef = {
    id: 'v3w_c7_mathematicsfindingcommongroundsim',
    title: 'Finding Common Ground',
    subtitle: 'Covers the definition of HCF, common factors, and finding the HCF of two or three.',
    classLevel: 7, subject: 'mathematics', topic: 'Highest Common Factor (HCF): Definition and Methods',
    chapters: [],
    nodeIds: ['c7_math_ch11_002', 'c7_math_ch11_003', 'c7_math_ch11_004', 'c7_math_ch11_005', 'c7_math_ch11_006', 'c7_math_ch11_007', 'c7_math_ch11_008', 'c7_math_ch11_009', 'c7_math_ch11_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are organizing a school cultural fest in Delhi and have 24 red ribbons and 36 blue ribbons.', goal: 'Master Finding Common Ground.' },
    discovery: {
        question: 'What is the mathematical term for the number that is left over when you divide one integer by another during the Euclidean division process?',
        options: ['The correct answer is the "remainder"', 'quotient', 'factor'],
        answer: 'The correct answer is the "remainder"',
        hook: 'Students frequently mistake the final quotient for the HCF instead of taking the final non-zero remainder.',
    },
    teaching: [
        { title: 'The Highest Common Factor (HCF) of two or.', text: 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer that divides each of those numbers completely without leaving any remainder.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch11_002', title: 'The Highest Common Factor (HCF) of two.',
          scaffold: { problem: 'A florist in Lucknow has 42 yellow roses and 56 red roses. She wants to make identical flower bouquets using both types of roses such that.',
            steps: [
            { text: 'Identify the quantities given: 42 yellow roses and 56 red roses, which need to be split evenly into maximum identical.' },
            { text: 'List all factors of 42 by finding multiplication pairs: $1 \\times 42$, $2 \\times 21$, $3 \\times 14$, $6 \\times 7$.' },
            { text: 'List all factors of 56 by finding multiplication pairs: $1 \\times 56$, $2 \\times 28$, $4 \\times 14$, $7 \\times 8$.' },
            { text: 'Identify the common factors present in both lists: $1, 2, 7, 14$.' },
            { text: 'Select the highest number from the common factors. The greatest number is 14.', faded: true, blankAnswer: '14 bouquets' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_003', title: 'Finding the Highest Common Factor (HCF).',
          scaffold: { problem: 'A teacher in Jaipur has 36 notebooks and 48 pens to distribute equally among a group of struggling students such that no notebooks or pens.',
            steps: [
            { text: 'Identify the numbers to analyze: 36 (notebooks) and 48 (pens).' },
            { text: 'List all factors of 36 by checking pairs: $1 \\times 36$, $2 \\times 18$, $3 \\times 12$, $4 \\times 9$, $6 \\times 6$.' },
            { text: 'List all factors of 48 by checking pairs: $1 \\times 48$, $2 \\times 24$, $3 \\times 16$, $4 \\times 12$, $6 \\times 8$.' },
            { text: 'Identify the common factors shared by both lists: $1, 2, 3, 4, 6, 12$.' },
            { text: 'Select the highest number from the common factors list, which is 12, representing the maximum number of students.', faded: true, blankAnswer: '12 students' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_005', title: 'The Euclidean Division Method for.',
          scaffold: { problem: 'Find the HCF of 306 and 657 using the Euclidean Division Method.',
            steps: [
            { text: 'Identify the larger number as dividend ($a = 657$) and the smaller number as divisor ($b = 306$).' },
            { text: 'Apply division: $657 \\div 306$. Quotient is 2, because $306 \\times 2 = 612$.' },
            { text: 'Calculate the remainder: $657 - 612 = 45$. Write equation: $657 = 306 \\times 2 + 45$.' },
            { text: 'Take the previous divisor (306) as the new dividend and the remainder (45) as the new divisor. Divide $306 \\div 45$.' },
            { text: 'Calculate the new remainder: $306 - 270 = 36$. Write equation: $306 = 45 \\times 6 + 36$.' },
            { text: 'Repeat the shift: take 45 as dividend and 36 as divisor. Divide $45 \\div 36$.' },
            { text: 'Repeat the shift: take 36 as dividend and 9 as divisor. Divide $36 \\div 9$.', faded: true, blankAnswer: 'HCF = 9' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_006', title: 'The Least Common Multiple (LCM) of two.',
          scaffold: { problem: 'Three temple bells in a town in Odisha ring at intervals of 12 minutes, 15 minutes, and 20 minutes respectively.',
            steps: [
            { text: 'Identify that the problem asks for the first time future event where three separate time cycles align, which is the.' },
            { text: 'Find the prime factorisation of each number:' },
            { text: 'Identify all prime bases involved (2, 3, and 5) and select the highest power for each base:' },
            { text: 'Compute the LCM by multiplying these highest powers together:' },
            { text: 'Convert 60 minutes into hours and add to the start time: $60 \\text{ minutes} = 1 \\text{ hour}$.', faded: true, blankAnswer: '60 minutes (or 1 hour), which means they will ring together.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_007', title: 'Finding the Least Common Multiple (LCM).',
          scaffold: { problem: 'Two traffic lights at a busy crossing in Delhi flash their yellow warning lights.',
            steps: [
            { text: 'Identify the given intervals for each traffic light, which are 4 minutes and 6 minutes.' },
            { text: 'List the non-zero multiples of the first number (4): $4 \\times 1 = 4$, $4 \\times 2 = 8$, $4 \\times 3 = 12$, $4 \\times 4.' },
            { text: 'List the non-zero multiples of the second number (6): $6 \\times 1 = 6$, $6 \\times 2 = 12$, $6 \\times 3 = 18$, $6 \\times.' },
            { text: 'Compare both lists to find the smallest number that appears in both: Multiples of 4 include 12, and multiples of 6.' },
            { text: 'State the final result with proper units: The LCM of 4 and 6 is 12, so the lights will flash together again after 12.', faded: true, blankAnswer: '12 minutes' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch11_003', title: 'Identify each idea',
          dissect: { specimen: 'Finding Common Ground', spots: [
            { id: 's1', label: 'The Highest Common Factor HCF', prompt: 'Which idea is this? — The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer.', answer: 'The Highest Common Factor HCF', options: ['The Highest Common Factor HCF', 'Finding the Highest Common Factor', 'The Prime Factorisation Method for', 'The Euclidean Division Method for'] },
            { id: 's2', label: 'Finding the Highest Common Factor', prompt: 'Which idea is this? — Finding the Highest Common Factor (HCF) by the listing factors method involves writing.', answer: 'Finding the Highest Common Factor', options: ['Finding the Highest Common Factor', 'The Highest Common Factor HCF', 'The Prime Factorisation Method for', 'The Euclidean Division Method for'] },
            { id: 's3', label: 'The Prime Factorisation Method for', prompt: 'Which idea is this? — The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves.', answer: 'The Prime Factorisation Method for', options: ['The Prime Factorisation Method for', 'The Highest Common Factor HCF', 'Finding the Highest Common Factor', 'The Euclidean Division Method for'] },
            { id: 's4', label: 'The Euclidean Division Method for', prompt: 'Which idea is this? — The Euclidean Division Method for finding the Highest Common Factor (HCF) is an efficient.', answer: 'The Euclidean Division Method for', options: ['The Euclidean Division Method for', 'The Highest Common Factor HCF', 'Finding the Highest Common Factor', 'The Prime Factorisation Method for'] },
            { id: 's5', label: 'The Least Common Multiple LCM', prompt: 'Which idea is this? — The Least Common Multiple (LCM) of two or more non-zero whole numbers is the smallest.', answer: 'The Least Common Multiple LCM', options: ['The Least Common Multiple LCM', 'The Highest Common Factor HCF', 'Finding the Highest Common Factor', 'The Prime Factorisation Method for'] },
            { id: 's6', label: 'Finding the Least Common Multiple', prompt: 'Which idea is this? — Finding the Least Common Multiple (LCM) by the listing multiples method involves writing.', answer: 'Finding the Least Common Multiple', options: ['Finding the Least Common Multiple', 'The Highest Common Factor HCF', 'Finding the Highest Common Factor', 'The Prime Factorisation Method for'] }
          ] } }
    ],
    explore: { component: C7_MathematicsFindingCommonGroundSim, prompt: 'Explore the interactive — Finding Common Ground' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch11_002', difficulty: 'standard',
          question: 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive.',
          hint: 'Review factor pairs and multiplication tables up to 10x10, specifically revisiting.',
          misconception: 'Students frequently confuse HCF (Highest Common Factor) with LCM (Lowest Common Multiple), resulting in students.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer',
                  options: ['The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer', 'Finding the Highest Common Factor (HCF) by the listing factors method involves writing', 'The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves', 'The Euclidean Division Method for finding the Highest Common Factor (HCF) is an efficient'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse HCF (Highest Common Factor) with LCM (Lowest Common Multiple), resulting in students multiplying the numbers or.' }
          ],
            remediations: { 'students-frequently-confuse-hcf-highest': { steps: ['Remind the student to check the direction of division: "Factors fit INSIDE the number (divisors), while multiples.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_003', difficulty: 'standard',
          question: 'Finding the Highest Common Factor (HCF) by the listing factors method involves.',
          hint: 'Review c6_math_ch01_013 to practice finding all factors of individual numbers using.',
          misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g.,.',
          parts: [
                { id: 'a', prompt: 'If two numbers are prime numbers, such as 7 and 11, what will always be their HCF when found by listing factors, and why?', answer: 'Their HCF will always be 1',
                  options: ['Their HCF will always be 1', 'prime numbers can share other common factors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g., listing $12, 24, 36$ as.' }
          ],
            remediations: { 'students-frequently-confuse-factors-with': { steps: ['Remind the student that factors are building blocks that go *into* a number (so they are smaller than or equal to the.', 'Guide them to write factor pairs multiplication-style ($1 \\times n, 2 \\times \\text{something} = n$) in ascending order.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g.,.',
          parts: [
                { id: 'a', prompt: 'If two numbers are prime numbers, such as 7 and 11, what will always be their HCF when found by listing factors, and why?', answer: 'Their HCF will always be 1',
                  options: ['Their HCF will always be 1', 'prime numbers can share other common factors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g., listing $12, 24, 36$ as.' }
          ],
            remediations: { 'students-frequently-confuse-factors-with': { steps: ['Remind the student that factors are building blocks that go *into* a number (so they are smaller than or equal to the.', 'Guide them to write factor pairs multiplication-style ($1 \\times n, 2 \\times \\text{something} = n$) in ascending order.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_004', difficulty: 'standard',
          question: 'The Prime Factorisation Method for finding the Highest Common Factor (HCF).',
          hint: 'Review prime factorisation using division bars from c6_math_ch01_015 before attempting.',
          misconception: 'Students frequently confuse the rules of HCF and LCM when selecting powers from prime factorisation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves',
                  options: ['The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves', 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer', 'Finding the Highest Common Factor (HCF) by the listing factors method involves writing', 'The Euclidean Division Method for finding the Highest Common Factor (HCF) is an efficient'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse the rules of HCF and LCM when selecting powers from prime factorisation.' }
          ],
            remediations: { 'students-frequently-confuse-the-rules': { steps: ['Remind the student that HCF stands for Highest *Common* Factor—it must be a *factor* (a number that divides evenly into.', 'Ask the student: "Can a divisor be larger than the number it divides?" Guide them to look at the prime factorisation.', 'Write out the rule: "For HCF, pick COMMON bases with the LOWEST powers."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_005', difficulty: 'standard',
          question: 'The Euclidean Division Method for finding the Highest Common Factor (HCF) is an.',
          hint: 'Review basic division with remainders from large numbers operations.',
          misconception: 'Students frequently mistake the final quotient for the HCF instead of taking the final non-zero remainder.',
          parts: [
                { id: 'a', prompt: 'What is the mathematical term for the number that is left over when you divide one integer by another during the Euclidean division process?', answer: 'The correct answer is the "remainder"',
                  options: ['The correct answer is the "remainder"', 'quotient', 'factor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently mistake the final quotient for the HCF instead of taking the final non-zero remainder.' }
          ],
            remediations: { 'students-frequently-mistake-the-final': { steps: ['Remind the student to trace back through their division steps and explicitly circle the last non-zero remainder, not.', 'Say: "Look at the equation where the remainder becomes zero.', 'The number you divided by—the divisor—just before getting zero is your HCF.', 'Point to it with your pencil." Have them write down: "HCF is always a divisor, never the quotient."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_006', difficulty: 'standard',
          question: 'The Least Common Multiple (LCM) of two or more non-zero whole numbers is the.',
          hint: 'Review prime factorisation rules and how to write numbers in exponential notation (e.g.,.',
          misconception: 'Students frequently confuse the rule for finding LCM via prime factorisation with the rule for HCF.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Least Common Multiple (LCM) of two or more non-zero whole numbers is the smallest',
                  options: ['The Least Common Multiple (LCM) of two or more non-zero whole numbers is the smallest', 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer', 'Finding the Highest Common Factor (HCF) by the listing factors method involves writing', 'The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse the rule for finding LCM via prime factorisation with the rule for HCF.' }
          ],
            remediations: { 'students-frequently-confuse-the-rule': { steps: ['If a student calculates the LCM and gets a number smaller than one of the original numbers, stop immediately and ask:.', 'Write out the prime factorisation of both numbers side-by-side using exponents.', 'Explicitly state the rule: "For LCM, L stands for Least, but we take the GREATEST power of every prime factor that.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_007', difficulty: 'standard',
          question: 'Finding the Least Common Multiple (LCM) by the listing multiples method.',
          hint: 'Review basic multiplication tables and how to generate multiples by multiplying by 1, 2,.',
          misconception: 'Students often confuse the listing of multiples with finding factors, or they stop listing too early before the first.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Finding the Least Common Multiple (LCM) by the listing multiples method involves writing',
                  options: ['Finding the Least Common Multiple (LCM) by the listing multiples method involves writing', 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer', 'Finding the Highest Common Factor (HCF) by the listing factors method involves writing', 'The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the listing of multiples with finding factors, or they stop listing too early before the first common multiple.' }
          ],
            remediations: { 'students-often-confuse-the-listing': { steps: ['Remind the student of the difference between factors (numbers that divide evenly *into* a number) and multiples.', 'Have them draw two separate number rows or multiplication tables starting with $1 \\times n$, $2 \\times n$, $3 \\times.', 'Explicitly ask: "Are we looking for what goes *into* this number, or what this number grows *into*?"'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
