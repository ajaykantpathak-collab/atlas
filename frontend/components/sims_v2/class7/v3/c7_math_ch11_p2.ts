import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch11_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch11_p2: SimDef = {
    id: 'v3_c7_math_ch11_p2',
    title: 'Finding Common Ground · Part 2/2',
    subtitle: 'Covers finding the LCM of two or three positive integers by explicitly listing multiples.',
    classLevel: 7, subject: 'mathematics', topic: 'Finding Common Ground · Part 2/2',
    chapters: ['c7_math_ch11'],
    nodeIds: ['c7_math_ch11_007', 'c7_math_ch11_008', 'c7_math_ch11_009', 'c7_math_ch11_010', 'c7_math_ch11_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine two school bell rings: one bell rings every 6 minutes and another bell rings every 8 minutes.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You have 12 red flags and 18 blue flags and must arrange both colours into identical equal rows with none left over. Which row sizes actually work?',
        options: ['1, 2, 3, or 6 flags per row — the common factors that divide both 12 and 18 exactly', 'Any size — just make the rows roughly even', 'Only 12 — the bigger number decides', '4 or 9 — they feel like nice divisors'],
        answer: '1, 2, 3, or 6 flags per row — the common factors that divide both 12 and 18 exactly',
        hook: 'Common factors live where two factor lists overlap — and a factor can never exceed the number it divides. And 1 always makes the list, since it divides every whole number.',
    },
    teaching: [
        { title: 'Finding LCM by Listing Multiples Method', text: 'Finding the Least Common Multiple (LCM) by the listing multiples method involves writing out the non-zero multiples of each given number in increasing order, identifying the common multiples they.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch11_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'List every factor of 24 and every factor of 36, circle where the lists overlap, and then check whether 3 really deserves a place among the common factors of 15 and 25.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_007', title: 'Finding LCM by Listing Multiples Method',
          scaffold: { problem: 'Two traffic lights at a busy crossing in Delhi flash their yellow warning lights.',
            steps: [
            { text: 'Identify the given intervals for each traffic light, which are 4 minutes and 6 minutes.' },
            { text: 'List the non-zero multiples of the first number (4): $4 \\times 1 = 4$, $4 \\times 2 = 8$, $4 \\times 3 = 12$, $4 \\times 4.' },
            { text: 'List the non-zero multiples of the second number (6): $6 \\times 1 = 6$, $6 \\times 2 = 12$, $6 \\times 3 = 18$, $6 \\times.' },
            { text: 'Compare both lists to find the smallest number that appears in both: Multiples of 4 include 12, and multiples of 6.' },
            { text: 'State the final result with proper units: The LCM of 4 and 6 is 12, so the lights will flash together again after 12.', faded: true, blankAnswer: '12 minutes' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_008', title: 'Finding LCM by Prime Factorisation',
          scaffold: { problem: 'Two runner athletes are training on a circular running track at a local sports stadium in Delhi.',
            steps: [
            { text: 'Identify the numbers to find the LCM for, which are 40 and 60 seconds.' },
            { text: 'Find the prime factorisation of 40 by dividing by prime numbers: $40 \\div 2 = 20$, $20 \\div 2 = 10$, $10 \\div 2 = 5$.' },
            { text: 'Find the prime factorisation of 60 by dividing by prime numbers: $60 \\div 2 = 30$, $30 \\div 2 = 15$, $15 \\div 3 = 5$.' },
            { text: 'List all unique prime factors (2, 3, and 5) and select the highest power for each: for 2 it is $2^3$, for 3 it.' },
            { text: 'Multiply these highest powers together: $LCM = 2^3 \\times 3^1 \\times 5^1 = 8 \\times 3 \\times 5 = 24 \\times 5 = 120$.', faded: true, blankAnswer: '120 seconds' }
            ] } },
        { type: 'case', nodeId: 'c7_math_ch11_009', title: 'Relationship Between HCF and LCM of Two Numbers',
          caseStudy: { intro: 'Imagine you are helping at a school stationery shop in Delhi, and you notice a curious pattern when packing notebooks and pens in bundles.',
            decisions: [{ prompt: 'What does the product of the HCF and LCM of two positive integers always equal?', options: [
                { text: 'The product of the HCF and LCM equals the product of the two numbers themselves ($HCF', outcome: 'The product of the HCF and LCM equals the product of the two numbers themselves ($HCF \\times LCM.' },
                { text: 'the sum of the two numbers', outcome: 'Not quite — Students frequently confuse the operations when using the formula $HCF \\times LCM = a \\times b$.', reveals: 'students-frequently-confuse-the-operations' },
                { text: 'their difference', outcome: 'Not quite — Students frequently confuse the operations when using the formula $HCF \\times LCM = a \\times b$.', reveals: 'students-frequently-confuse-the-operations' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_010', title: 'Applications of HCF and LCM in Real-Life Problems',
          scaffold: { problem: 'Three tankers contain 403 litres, 434 litres, and 465 litres of diesel respectively.',
            steps: [
            { text: 'Identify what is given and what is asked. We have three quantities (403 L, 434 L, 465 L) and need to find a single.' },
            { text: 'Find the prime factorisation of each number. For 403: since it\'s not divisible by 2, 3, or 5, checking primes gives 13.' },
            { text: 'Find prime factorisation of 434: 434 ÷ 2 = 217; 217 ÷ 7 = 31; so 434 = 2 × 7 × 31.' },
            { text: 'Find prime factorisation of 465: 465 ÷ 3 = 155; 155 ÷ 5 = 31; so 465 = 3 × 5 × 31.' },
            { text: 'Identify the common prime factors. The prime factor 31 appears in all three factorisations (403 = 13 × 31, 434 = 2 × 7.', faded: true, blankAnswer: '31 litres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_011', title: 'Common Multiples and Their Properties',
          scaffold: { problem: 'Traffic lights at three different road crossings change after every 15 seconds, 20 seconds, and 30 seconds respectively.',
            steps: [
            { text: 'Identify the given intervals for the traffic lights: 15 seconds, 20 seconds, and 30 seconds.' },
            { text: 'List the multiples for each interval to find the common multiples. Multiples of 15: 15, 30, 45, 60, 75, 90, 105, 120...' },
            { text: 'Identify the first common multiple (LCM), which is 60 seconds (1 minute).' },
            { text: 'Use the property that all common multiples are multiples of the LCM.' },
            { text: 'Convert the seconds into minutes and add to 7:00 AM. 60 seconds = 1 minute (7:01 AM); 120 seconds = 2 minutes (7:02.', faded: true, blankAnswer: '7:01 AM, 7:02 AM, and 7:03 AM' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch11_011', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school stall, Neha must pack 42 cookies and 70 chocolates into identical gift boxes with nothing left over. Her teammate suggests making 36 boxes \'because 36 is a nice common number for both.\'',
            decisions: [{ prompt: 'What actually decides the possible number of boxes?', options: [
                { text: 'The box count must divide both 42 and 70 exactly — a common factor. The common factors of 42 and 70 are 1, 2, 7 and 14, so she can make 2, 7 or 14 boxes (more than one), but never 36.', outcome: 'This turns equal distribution into a common-factor problem and verifies each candidate by division — 36 cannot divide 42 at all.' },
                { text: 'The teammate is right — any number that feels like it belongs to both lists works, and 36 is close to both numbers.', outcome: 'Feelings aside, a factor must divide with zero remainder: 42 ÷ 36 does not come out even, so 36 fails outright.', reveals: 'common-means-nearby' },
                { text: 'She should use a multiple like 210 boxes, since multiples are the numbers both 42 and 70 share.', outcome: 'That reverses factors and multiples: 210 is a common multiple (both numbers divide into it), but you cannot make more boxes than items.', reveals: 'factors-are-multiples' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch11_011', title: 'You made it',
          caseStudy: { intro: 'Finding common factors is a matching game — list both sides, keep the overlap, and never let a number divide what it cannot.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch11_007', difficulty: 'standard',
          question: 'Finding the Least Common Multiple (LCM) by the listing multiples method.',
          hint: 'Review basic multiplication tables and how to generate multiples by multiplying by 1, 2.',
          misconception: 'Students often confuse the listing of multiples with finding factors, or they stop listing too early before the first.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Finding the Least Common Multiple (LCM) by the listing multiples method involves writing',
                  options: ['Finding the Least Common Multiple (LCM) by the listing multiples method involves writing', 'Common factors of two numbers are the whole numbers that divide both given numbers', 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer', 'Finding the Highest Common Factor (HCF) by the listing factors method involves writing'],
                  hint: 'Review basic multiplication tables and how to generate multiples by multiplying by 1, 2, 3, 4, etc.',
                  misconception: 'Students often confuse the listing of multiples with finding factors, or they stop listing too early before the first common multiple.' }
          ],
            remediations: { 'students-often-confuse-the-listing': { steps: ['Remind the student of the difference between factors (numbers that divide evenly *into* a number) and multiples.', 'Have them draw two separate number rows or multiplication tables starting with $1 \\times n$, $2 \\times n$, $3 \\times.', 'Explicitly ask: "Are we looking for what goes *into* this number, or what this number grows *into*?"'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_008', difficulty: 'standard',
          question: 'Finding the Least Common Multiple (LCM) by prime factorisation involves.',
          hint: 'Review c6_math_ch01_015 to practice breaking numbers down into prime factors using.',
          misconception: 'Students often confuse the rules for LCM and HCF when looking at prime factorisation forms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Finding the Least Common Multiple (LCM) by prime factorisation involves expressing each',
                  options: ['Finding the Least Common Multiple (LCM) by prime factorisation involves expressing each', 'Common factors of two numbers are the whole numbers that divide both given numbers', 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer', 'Finding the Highest Common Factor (HCF) by the listing factors method involves writing'],
                  hint: 'Review c6_math_ch01_015 to practice breaking numbers down into prime factors using repeated.',
                  misconception: 'Students often confuse the rules for LCM and HCF when looking at prime factorisation forms.' }
          ],
            remediations: { 'students-often-confuse-the-rules': { steps: ['Remind the student of what a "multiple" means: it must be a number that is *larger* than or equal to the given numbers.', 'Tell them: "For LCM, think \'L\' for \'Largest power\' of every prime factor." Have them write out both prime.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_009', difficulty: 'standard',
          question: 'The product of the Highest Common Factor (HCF) and the Least Common Multiple.',
          hint: 'Review c7_math_ch11_004 for finding HCF and c7_math_ch11_008 for finding LCM via prime.',
          misconception: 'Students frequently confuse the operations when using the formula $HCF \\times LCM = a \\times b$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The product of the Highest Common Factor (HCF) and the Least Common Multiple (LCM) of any',
                  options: ['The product of the Highest Common Factor (HCF) and the Least Common Multiple (LCM) of any', 'Common factors of two numbers are the whole numbers that divide both given numbers', 'The Highest Common Factor (HCF) of two or more numbers is the greatest positive integer', 'Finding the Highest Common Factor (HCF) by the listing factors method involves writing'],
                  hint: 'Review c7_math_ch11_004 for finding HCF and c7_math_ch11_008 for finding LCM via prime.',
                  misconception: 'Students frequently confuse the operations when using the formula $HCF \\times LCM = a \\times b$.' }
          ],
            remediations: { 'students-frequently-confuse-the-operations': { steps: ['When a student makes this error, stop them and have them write out the formula in words first: "(HCF) times (LCM).', 'Ask them: "If we know the total product and one part of the left side, do we multiply or do we use the opposite.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_010', difficulty: 'standard',
          question: 'Applications of HCF and LCM in Real-Life Problems involve translating everyday.',
          hint: 'Review c7_math_ch11_002 and c7_math_ch11_006 to reinforce what HCF and LCM actually.',
          misconception: 'Students frequently confuse when to use HCF versus LCM in word problems because they memorize keywords like "maximum".',
          parts: [
                { id: 'a', prompt: 'A school bell rings every 30 minutes and a bus leaves the gate every 45 minutes. Both just rang and left together right now.', answer: 'The correct concept is Least Common Multiple (LCM)',
                  options: ['The correct concept is Least Common Multiple (LCM)', 'maximum', 'minimum'],
                  hint: 'Review c7_math_ch11_002 and c7_math_ch11_006 to reinforce what HCF and LCM actually represent.',
                  misconception: 'Students frequently confuse when to use HCF versus LCM in word problems because they memorize keywords like "maximum" or "minimum" without.' },
                { id: 'b', prompt: 'Three alarm clocks ring at intervals of 10, 15, and 20 minutes respectively. If they all ring together at 8:00 AM, at what time will they next ring together?', answer: 'To find when they ring together, we calculate the LCM of 10, 15, and 20',
                  options: ['To find when they ring together, we calculate the LCM of 10, 15, and 20', 'maximum', 'minimum'],
                  hint: 'Review c7_math_ch11_002 and c7_math_ch11_006 to reinforce what HCF and LCM actually represent.',
                  misconception: 'Students frequently confuse when to use HCF versus LCM in word problems because they memorize keywords like "maximum" or "minimum" without.' }
          ],
            remediations: { 'students-frequently-confuse-when-to': { steps: ['When a student misidentifies HCF as LCM due to a word like "minimum," have them physically draw out the situation.', 'Say: "Let\'s test if a smaller number can measure a bigger number.', 'Can a 12 cm piece measure a 60 cm cloth?', 'No." Remind them that if we are building *up* to a shared total length or time, we need a larger number, which is.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse when to use HCF versus LCM in word problems because they memorize keywords like "maximum".',
          parts: [
                { id: 'a', prompt: 'Rohan says that to find the longest tape that can measure 36 cm, 54 cm, and 90 cm exact lengths, he needs to find the LCM of these three numbers.', answer: 'Rohan is incorrect',
                  options: ['Rohan is incorrect', 'maximum', 'minimum'],
                  hint: 'Review c7_math_ch11_002 and c7_math_ch11_006 to reinforce what HCF and LCM actually represent.',
                  misconception: 'Students frequently confuse when to use HCF versus LCM in word problems because they memorize keywords like "maximum" or "minimum" without.' },
                { id: 'b', prompt: 'Create a short real-world word problem where the solution requires finding the LCM of 12 and 18, and state the final answer.', answer: 'Example answer: Two runners run around a circular track',
                  options: ['Example answer: Two runners run around a circular track', 'maximum', 'minimum'],
                  hint: 'Review c7_math_ch11_002 and c7_math_ch11_006 to reinforce what HCF and LCM actually represent.',
                  misconception: 'Students frequently confuse when to use HCF versus LCM in word problems because they memorize keywords like "maximum" or "minimum" without.' }
          ],
            remediations: { 'students-frequently-confuse-when-to': { steps: ['When a student misidentifies HCF as LCM due to a word like "minimum," have them physically draw out the situation.', 'Say: "Let\'s test if a smaller number can measure a bigger number.', 'Can a 12 cm piece measure a 60 cm cloth?', 'No." Remind them that if we are building *up* to a shared total length or time, we need a larger number, which is.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_011', difficulty: 'standard',
          question: 'Common multiples are numbers that are exact multiples of two or more given.',
          hint: 'Review c7_math_ch11_007 (Finding LCM by Listing Multiples Method) to reinforce how.',
          misconception: 'Students often confuse "common multiples" with "common factors" or assume that common multiples can be found by simply.',
          parts: [
                { id: 'a', prompt: 'Find the first three common multiples of 6 and 8.', answer: 'Step 1: List the multiples of 6: 6, 12, 18, 24, 30, 36, 42, 48, 54, 72',
                  options: ['Step 1: List the multiples of 6: 6, 12, 18, 24, 30, 36, 42, 48, 54, 72', 'common multiples', 'common factors'],
                  hint: 'Review c7_math_ch11_007 (Finding LCM by Listing Multiples Method) to reinforce how numbers.',
                  misconception: 'Students often confuse "common multiples" with "common factors" or assume that common multiples can be found by simply adding the two.' },
                { id: 'b', prompt: 'If the Least Common Multiple (LCM) of two numbers $x$ and $y$ is 15, what can you deduce about their 4th common multiple?', answer: 'The 4th common multiple is $4 \\times \\text{LCM} = 4 \\times 15 = 60$',
                  options: ['The 4th common multiple is $4 \\times \\text{LCM} = 4 \\times 15 = 60$', 'common multiples', 'common factors'],
                  hint: 'Review c7_math_ch11_007 (Finding LCM by Listing Multiples Method) to reinforce how numbers.',
                  misconception: 'Students often confuse "common multiples" with "common factors" or assume that common multiples can be found by simply adding the two.' }
          ],
            remediations: { 'students-often-confuse-common-multiples': { steps: ['Pause and have the student write out the multiplication tables side by side: for 3 (3, 6, 9, 12, 15...) and for 5 (5.', 'Remind them that a "multiple" is the result of multiplying a whole number by 1, 2, 3, etc., and a *common* multiple.', 'Show them how circling matching numbers reveals the shared values.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
