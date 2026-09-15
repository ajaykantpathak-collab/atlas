import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch11_p1: SimDef = {
    id: 'v3_c7_math_ch11_p1',
    title: 'Finding Common Ground · Part 1/2',
    subtitle: 'Covers listing and identifying common factors for pairs of positive integers up to 100.',
    classLevel: 7, subject: 'mathematics', topic: 'Finding Common Ground · Part 1/2',
    chapters: ['c7_math_ch11'],
    nodeIds: ['c7_math_ch11_001', 'c7_math_ch11_002', 'c7_math_ch11_003', 'c7_math_ch11_004', 'c7_math_ch11_005', 'c7_math_ch11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are organizing a school sports event and have 12 red flags and 18 blue flags.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You have 12 red flags and 18 blue flags and must arrange both colours into identical equal rows with none left over. Which row sizes actually work?',
        options: ['1, 2, 3, or 6 flags per row — the common factors that divide both 12 and 18 exactly', 'Any size — just make the rows roughly even', 'Only 12 — the bigger number decides', '4 or 9 — they feel like nice divisors'],
        answer: '1, 2, 3, or 6 flags per row — the common factors that divide both 12 and 18 exactly',
        hook: 'Common factors live where two factor lists overlap — and a factor can never exceed the number it divides. And 1 always makes the list, since it divides every whole number.',
    },
    teaching: [
        { title: 'Common Factors of Two Numbers: Definition and Examples', text: 'Common factors of two numbers are the whole numbers that divide both given numbers exactly without leaving any remainder. In other words, they are the intersection of the factor sets of both numbers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch11_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'List every factor of 24 and every factor of 36, circle where the lists overlap, and then check whether 3 really deserves a place among the common factors of 15 and 25.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_001', title: 'Common Factors of Two Numbers: Definition and Examples',
          scaffold: { problem: 'Priya has two ribbon pieces measuring 18 cm and 24 cm. She wants to cut both into smaller pieces of equal length with no ribbon left over.',
            steps: [
            { text: 'Identify the task, which is to find all numbers that divide both 18 and 24 completely (the common factors).' },
            { text: 'List all individual factors of 18 by finding multiplication pairs: $1 \\times 18$, $2 \\times 9$, $3 \\times 6$.' },
            { text: 'List all individual factors of 24 by finding multiplication pairs: $1 \\times 24$, $2 \\times 12$, $3 \\times 8$, $4.' },
            { text: 'Compare both lists to find matching values: {1, 2, 3, 6, 9, 18} and {1, 2, 3, 4, 6, 8, 12, 24}.' },
            { text: 'Verify each common factor by dividing both 18 and 24: $18 \\div 6 = 3$ and $24 \\div 6 = 4$, both with zero remainder.', faded: true, blankAnswer: '1 cm, 2 cm, 3 cm, and 6 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_002', title: 'Highest Common Factor (HCF): Definition and Methods',
          scaffold: { problem: 'A florist in Lucknow has 42 yellow roses and 56 red roses. She wants to make identical flower bouquets using both types of roses such that.',
            steps: [
            { text: 'Identify the quantities given: 42 yellow roses and 56 red roses, which need to be split evenly into maximum identical.' },
            { text: 'List all factors of 42 by finding multiplication pairs: $1 \\times 42$, $2 \\times 21$, $3 \\times 14$, $6 \\times 7$.' },
            { text: 'List all factors of 56 by finding multiplication pairs: $1 \\times 56$, $2 \\times 28$, $4 \\times 14$, $7 \\times 8$.' },
            { text: 'Identify the common factors present in both lists: $1, 2, 7, 14$.' },
            { text: 'Select the highest number from the common factors. The greatest number is 14.', faded: true, blankAnswer: '14 bouquets' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_003', title: 'Finding HCF by Listing Factors Method',
          scaffold: { problem: 'A teacher in Jaipur has 36 notebooks and 48 pens to distribute equally among a group of struggling students such that no notebooks or pens.',
            steps: [
            { text: 'Identify the numbers to analyze: 36 (notebooks) and 48 (pens).' },
            { text: 'List all factors of 36 by checking pairs: $1 \\times 36$, $2 \\times 18$, $3 \\times 12$, $4 \\times 9$, $6 \\times 6$.' },
            { text: 'List all factors of 48 by checking pairs: $1 \\times 48$, $2 \\times 24$, $3 \\times 16$, $4 \\times 12$, $6 \\times 8$.' },
            { text: 'Identify the common factors shared by both lists: $1, 2, 3, 4, 6, 12$.' },
            { text: 'Select the highest number from the common factors list, which is 12, representing the maximum number of students.', faded: true, blankAnswer: '12 students' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_005', title: 'Euclidean Division Method for HCF',
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
        { type: 'scaffold', nodeId: 'c7_math_ch11_006', title: 'Least Common Multiple (LCM): Definition and Methods',
          scaffold: { problem: 'Three temple bells in a town in Odisha ring at intervals of 12 minutes, 15 minutes, and 20 minutes respectively.',
            steps: [
            { text: 'Identify that the problem asks for the first time future event where three separate time cycles align, which is the.' },
            { text: 'Find the prime factorisation of each number:' },
            { text: 'Identify all prime bases involved (2, 3, and 5) and select the highest power for each base:' },
            { text: 'Compute the LCM by multiplying these highest powers together:' },
            { text: 'Convert 60 minutes into hours and add to the start time: $60 \\text{ minutes} = 1 \\text{ hour}$.', faded: true, blankAnswer: '60 minutes (or 1 hour), which means they will ring together.' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch11_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school stall, Neha must pack 42 cookies and 70 chocolates into identical gift boxes with nothing left over. Her teammate suggests making 36 boxes \'because 36 is a nice common number for both.\'',
            decisions: [{ prompt: 'What actually decides the possible number of boxes?', options: [
                { text: 'The box count must divide both 42 and 70 exactly — a common factor. The common factors of 42 and 70 are 1, 2, 7 and 14, so she can make 2, 7 or 14 boxes (more than one), but never 36.', outcome: 'This turns equal distribution into a common-factor problem and verifies each candidate by division — 36 cannot divide 42 at all.' },
                { text: 'The teammate is right — any number that feels like it belongs to both lists works, and 36 is close to both numbers.', outcome: 'Feelings aside, a factor must divide with zero remainder: 42 ÷ 36 does not come out even, so 36 fails outright.', reveals: 'common-means-nearby' },
                { text: 'She should use a multiple like 210 boxes, since multiples are the numbers both 42 and 70 share.', outcome: 'That reverses factors and multiples: 210 is a common multiple (both numbers divide into it), but you cannot make more boxes than items.', reveals: 'factors-are-multiples' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch11_006', title: 'The bigger picture',
          caseStudy: { intro: 'Finding common factors is a matching game — list both sides, keep the overlap, and never let a number divide what it cannot.',
            decisions: [{ prompt: 'What comes next? Finding Common Ground · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Finding Common Ground · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch11_001', difficulty: 'standard',
          question: 'Common factors of two numbers are the whole numbers that divide both given.',
          hint: 'Review c6_math_ch01_013 on Factors and Multiples to practice finding all divisors of.',
          misconception: 'Students often confuse common factors with common multiples, listing numbers that are larger than the given numbers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Common factors of two numbers are the whole numbers that divide both given numbers',
                  options: ['Common factors of two numbers are the whole numbers that divide both given numbers', 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer', 'Finding the Highest Common Factor (HCF) by the listing factors method involves writing', 'The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves'],
                  hint: 'Review c6_math_ch01_013 on Factors and Multiples to practice finding all divisors of a single.',
                  misconception: 'Students often confuse common factors with common multiples, listing numbers that are larger than the given numbers instead of smaller.' }
          ],
            remediations: { 'students-often-confuse-common-factors': { steps: ['Remind the student that factors always divide *into* a number, so they must be smaller than or equal to the number.', 'Ask them to test division: "Can 12 fit inside 4?" If not, it\'s a multiple, not a factor.', 'Guide them to write down division sentences like $4 \\div 2 = 2$ to prove 2 is a factor.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_002', difficulty: 'standard',
          question: 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive.',
          hint: 'Review factor pairs and multiplication tables up to 10x10, specifically revisiting.',
          misconception: 'Students frequently confuse HCF (Highest Common Factor) with LCM (Lowest Common Multiple), resulting in students.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer',
                  options: ['The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer', 'Common factors of two numbers are the whole numbers that divide both given numbers', 'Finding the Highest Common Factor (HCF) by the listing factors method involves writing', 'The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves'],
                  hint: 'Review factor pairs and multiplication tables up to 10x10, specifically revisiting c6_math_ch01_013.',
                  misconception: 'Students frequently confuse HCF (Highest Common Factor) with LCM (Lowest Common Multiple), resulting in students multiplying the numbers.' }
          ],
            remediations: { 'students-frequently-confuse-hcf-highest': { steps: ['Remind the student to check the direction of division: "Factors fit INSIDE the number (divisors), while multiples.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_003', difficulty: 'standard',
          question: 'Finding the Highest Common Factor (HCF) by the listing factors method involves.',
          hint: 'Review c6_math_ch01_013 to practice finding all factors of individual numbers using.',
          misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g.',
          parts: [
                { id: 'a', prompt: 'When listing factors of 18, a student writes: $1, 2, 3, 6, 9, 18$. Are all these numbers factors, and how do we know we haven\'t missed any?', answer: 'Yes, these are all the correct factors',
                  options: ['Yes, these are all the correct factors', '$12, 24, 36$ as factors of 12 instead of $1, 2, 3, 4, 6, 12$'],
                  hint: 'Review c6_math_ch01_013 to practice finding all factors of individual numbers using multiplication.',
                  misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g., listing $12, 24, 36$.' },
                { id: 'b', prompt: 'Find the HCF of 24 and 30 by listing all their factors. Show the common factors and state the highest one.', answer: 'First, list the factors of 24: $1, 2, 3, 4, 6, 8, 12, 24$',
                  options: ['First, list the factors of 24: $1, 2, 3, 4, 6, 8, 12, 24$', '$12, 24, 36$ as factors of 12 instead of $1, 2, 3, 4, 6, 12$'],
                  hint: 'Review c6_math_ch01_013 to practice finding all factors of individual numbers using multiplication.',
                  misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g., listing $12, 24, 36$.' },
                { id: 'c', prompt: 'If two numbers are prime numbers, such as 7 and 11, what will always be their HCF when found by listing factors, and why?', answer: 'Their HCF will always be 1',
                  options: ['Their HCF will always be 1', '$12, 24, 36$ as factors of 12 instead of $1, 2, 3, 4, 6, 12$', 'prime numbers can share other common factors'],
                  hint: 'Review c6_math_ch01_013 to practice finding all factors of individual numbers using multiplication.',
                  misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g., listing $12, 24, 36$.' }
          ],
            remediations: { 'students-frequently-confuse-factors-with': { steps: ['Remind the student that factors are building blocks that go *into* a number (so they are smaller than or equal to the.', 'Guide them to write factor pairs multiplication-style ($1 \\times n, 2 \\times \\text{something} = n$) in ascending order.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g.',
          parts: [
                { id: 'a', prompt: 'A student claims that the HCF of 12 and 36 is 36 because 36 appears in the factor list of both numbers. Evaluate this claim and correct the error.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', '$12, 24, 36$ as factors of 12 instead of $1, 2, 3, 4, 6, 12$'],
                  hint: 'Review c6_math_ch01_013 to practice finding all factors of individual numbers using multiplication.',
                  misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g., listing $12, 24, 36$.' },
                { id: 'b', prompt: 'Create a pair of composite numbers less than 50 whose HCF by listing factors is exactly 12. Show your factor lists to prove it.', answer: 'An example pair is 36 and 48',
                  options: ['An example pair is 36 and 48', '$12, 24, 36$ as factors of 12 instead of $1, 2, 3, 4, 6, 12$'],
                  hint: 'Review c6_math_ch01_013 to practice finding all factors of individual numbers using multiplication.',
                  misconception: 'Students frequently confuse factors with multiples, listing numbers that are larger than the given number (e.g., listing $12, 24, 36$.' }
          ],
            remediations: { 'students-frequently-confuse-factors-with': { steps: ['Remind the student that factors are building blocks that go *into* a number (so they are smaller than or equal to the.', 'Guide them to write factor pairs multiplication-style ($1 \\times n, 2 \\times \\text{something} = n$) in ascending order.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_004', difficulty: 'standard',
          question: 'The Prime Factorisation Method for finding the Highest Common Factor (HCF).',
          hint: 'Review prime factorisation using division bars from c6_math_ch01_015 before attempting.',
          misconception: 'Students frequently confuse the rules of HCF and LCM when selecting powers from prime factorisation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves',
                  options: ['The Prime Factorisation Method for finding the Highest Common Factor (HCF) involves', 'Common factors of two numbers are the whole numbers that divide both given numbers', 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer', 'Finding the Highest Common Factor (HCF) by the listing factors method involves writing'],
                  hint: 'Review prime factorisation using division bars from c6_math_ch01_015 before attempting multi-number.',
                  misconception: 'Students frequently confuse the rules of HCF and LCM when selecting powers from prime factorisation.' }
          ],
            remediations: { 'students-frequently-confuse-the-rules': { steps: ['Remind the student that HCF stands for Highest *Common* Factor—it must be a *factor* (a number that divides evenly into.', 'Ask the student: "Can a divisor be larger than the number it divides?" Guide them to look at the prime factorisation.', 'Write out the rule: "For HCF, pick COMMON bases with the LOWEST powers."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_005', difficulty: 'standard',
          question: 'The Euclidean Division Method for finding the Highest Common Factor (HCF) is.',
          hint: 'Review basic division with remainders from large numbers operations.',
          misconception: 'Students frequently mistake the final quotient for the HCF instead of taking the final non-zero remainder.',
          parts: [
                { id: 'a', prompt: 'What is the mathematical term for the number that is left over when you divide one integer by another during the Euclidean division process?', answer: 'the "remainder"',
                  options: ['the "remainder"', 'quotient', 'factor'],
                  hint: 'Review basic division with remainders from large numbers operations.',
                  misconception: 'Students frequently mistake the final quotient for the HCF instead of taking the final non-zero remainder.' }
          ],
            remediations: { 'students-frequently-mistake-the-final': { steps: ['Remind the student to trace back through their division steps and explicitly circle the last non-zero remainder, not.', 'Say: "Look at the equation where the remainder becomes zero.', 'The number you divided by—the divisor—just before getting zero is your HCF.', 'Point to it with your pencil." Have them write down: "HCF is always a divisor, never the quotient."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_006', difficulty: 'standard',
          question: 'The Least Common Multiple (LCM) of two or more non-zero whole numbers is the.',
          hint: 'Review prime factorisation rules and how to write numbers in exponential notation (e.g.',
          misconception: 'Students frequently confuse the rule for finding LCM via prime factorisation with the rule for HCF.',
          parts: [
                { id: 'a', prompt: 'What is the definition of the Least Common Multiple (LCM) of two numbers?', answer: 'the smallest positive integer that is a multiple of both given numbers',
                  options: ['the smallest positive integer that is a multiple of both given numbers', 'the largest number that divides both'],
                  hint: 'Review prime factorisation rules and how to write numbers in exponential notation (e.g., $2 \\times.',
                  misconception: 'Students frequently confuse the rule for finding LCM via prime factorisation with the rule for HCF.' }
          ],
            remediations: { 'students-frequently-confuse-the-rule': { steps: ['If a student calculates the LCM and gets a number smaller than one of the original numbers, stop immediately and ask.', 'Write out the prime factorisation of both numbers side-by-side using exponents.', 'Explicitly state the rule: "For LCM, L stands for Least, but we take the GREATEST power of every prime factor that.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
