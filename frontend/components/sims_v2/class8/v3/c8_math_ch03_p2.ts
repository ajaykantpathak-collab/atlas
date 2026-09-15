import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch03_p2: SimDef = {
    id: 'v3_c8_math_ch03_p2',
    title: 'A Story of Numbers · Part 2/2',
    subtitle: 'How humans invented \'how many\'',
    classLevel: 8, subject: 'mathematics', topic: 'A Story of Numbers · Part 2/2',
    chapters: ['c8_math_ch03'],
    nodeIds: ['c8_math_ch3_5', 'c8_math_ch3_6', 'c8_math_ch3_7', 'c8_math_ch3_8', 'c8_math_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a prehistoric herder keeping count', intro: 'No digits, no words for numbers — just goats wandering off into the dusk. Before you can invent numbers, you have to need them. Today, you will.', goal: 'Understand why counting was invented — one-to-one correspondence, tally sticks and tokens as early counting tools, and the limits of unaided perception that made numbers necessary.' },
    discovery: {
        question: 'A farmer 5,000 years ago has 37 goats and zero number words. At sunset, how does he know 3 goats never came home?',
        options: ['One notch per goat on a tally stick — match each returning goat to a notch and the leftover notches are the missing goats', 'He just remembers each goat\'s face', 'He counts on his fingers three times', 'He weighs the whole herd'],
        answer: 'One notch per goat on a tally stick — match each returning goat to a notch and the leftover notches are the missing goats',
        hook: 'Counting isn\'t built into your brain like walking — humans invented it. Your eyes can only \'see\' about 3–4 things at once, so beyond that you need marks, pebbles or knots: one mark per thing, no subtraction required.',
    },
    teaching: [
        { title: 'Place Value System: Power of 10 Notation', text: 'The place value system in base 10 assigns each digit a value equal to the digit multiplied by a power of 10, where the exponent corresponds to the digit\'s position from the right (starting at 0 for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch3_5', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Survive a day without numbers: track a herd with pebbles, check a granary with notches, then invent a counting system for tree-dwellers who own only vines and shells. Discover why \'how many?\' demanded a permanent record.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch3_5', title: 'Place Value System: Power of 10 Notation',
          scaffold: { problem: 'The distance from Delhi to Mumbai is approximately 1,414 km. Write this distance in metres using power-of-10 expanded form. (1 km = 1000 m)',
            steps: [
            { text: 'Convert km to metres: 1,414 km = 1,414 × 1000 m = 1,414,000 m.' },
            { text: 'Write 1,414,000 in a place value table up to \\(10^6\\): digits are 1 (millions/\\(10^6\\)), 4.' },
            { text: 'Express each non-zero digit as digit × power of 10: \\(1 \\times 10^6 + 4 \\times 10^5 + 1 \\times 10^4 + 4 \\times 10^3\\).' },
            { text: 'Include zero placeholders for completeness (optional but good practice): \\(+ 0 \\times 10^2 + 0 \\times 10^1 + 0 \\times.' },
            { text: 'Verify by evaluating: 1,000,000 + 400,000 + 10,000 + 4,000 = 1,414,000. Correct.', faded: true, blankAnswer: '\\(1 \\times 10^6 + 4 \\times 10^5 + 1 \\times 10^4 + 4 \\times.' }
            ] } },
        { type: 'case', nodeId: 'c8_math_ch3_6', title: 'Transmission of Hindu Numerals to the Arab World and Europe',
          caseStudy: { intro: 'Imagine you\'re a merchant in 12th century Pisa trying to calculate profits from trade with Egypt using Roman numerals — you\'d need an abacus and hours of work.',
            decisions: [{ prompt: 'Name the 9th-century Persian scholar who wrote *Kitab al-Jam\' wa\'l-Tafriq bi Hisab al-Hind* (Book of Addition and Subtraction According.', options: [
                { text: 'Al-Khwarizmi (c', outcome: 'Al-Khwarizmi (c. 780–850 CE). A wrong answer like "Al-Biruni" or "Omar Khayyam" reveals confusion.' },
                { text: 'Al-Biruni', outcome: 'Not quite — Students believe the system is called "Arabic numerals" because Arabs invented it.', reveals: 'the-system-is-called-arabic' },
                { text: 'Omar Khayyam', outcome: 'Not quite — Students believe the system is called "Arabic numerals" because Arabs invented it.', reveals: 'the-system-is-called-arabic' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch3_7', title: 'Bakhshali Manuscript and Aryabhata\'s Contributions',
          caseStudy: { intro: 'Imagine you are an architect in ancient India designing a circular well of diameter 14 m.',
            decisions: [{ prompt: 'What symbol did the Bakhshali Manuscript use to represent zero, and in what two roles does it appear in the manuscript?', options: [
                { text: 'The Bakhshali Manuscript used a dot (·) for zero', outcome: 'The Bakhshali Manuscript used a dot (·) for zero. It appears as a placeholder in place-value.' },
                { text: 'circle', outcome: 'Not quite — Students often think the Bakhshali square-root formula √(A²+b) ≈ A + b/(2A) is exactly the same.', reveals: 'the-bakhshali-square-root-formula' },
                { text: 'no zero', outcome: 'Not quite — Students often think the Bakhshali square-root formula √(A²+b) ≈ A + b/(2A) is exactly the same.', reveals: 'the-bakhshali-square-root-formula' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch3_8', title: 'Roman Numerals: Symbols and Limitations',
          caseStudy: { intro: 'Imagine you\'re watching a Bollywood movie and see the copyright year written as MMXXIV at the end — you recognise it\'s 2024, but could you quickly calculate.',
            decisions: [{ prompt: 'Write the Hindu-Arabic equivalents for these Roman numerals: (a) CDXLIV (b) DCCLXXXIX (c) MCMXCIX', options: [
                { text: '(a) 444 = CD (400) + XL (40) + IV (4) (b) 789 = DCC (700) + LXXX (80) + IX (9) (c) 1999 =', outcome: '(a) 444 = CD (400) + XL (40) + IV (4) (b) 789 = DCC (700) + LXXX (80) + IX (9) (c) 1999 = M (1000).' },
                { text: 'smaller before larger = subtraction', outcome: 'Not quite — Students believe subtractive notation can be applied to any smaller-before-larger pair (e.g.', reveals: 'subtractive-notation-can-be-applied' },
                { text: 'subtractive notation can be applied to any smaller-before-larger pair (e', outcome: 'Not quite — Students believe subtractive notation can be applied to any smaller-before-larger pair (e.g.', reveals: 'subtractive-notation-can-be-applied' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch3_9', title: 'Egyptian Number System: Hieroglyphic Representation',
          caseStudy: { intro: 'Imagine you are an archaeologist in Luxor, Egypt, reading a temple wall that records the Pharaoh\'s grain storage: "100,000 sacks of wheat, 20,000 sacks.',
            decisions: [{ prompt: 'Write the Egyptian hieroglyphic representation for the number 3,204.', options: [
                { text: 'Correct: 3 lotus flowers (1000 each), 2 coils (100 each), 0 hobbles (10), 4 strokes (1)', outcome: 'Correct: 3 lotus flowers (1000 each), 2 coils (100 each), 0 hobbles (10), 4 strokes (1).' },
                { text: '3 lotus, 2 coils, 4 strokes', outcome: 'Not quite — Students treat Egyptian hieroglyphs as a place-value system and try to "align" symbols in columns.', reveals: 'students-treat-egyptian-hieroglyphs-as' },
                { text: 'a placeholder is needed', outcome: 'Not quite — Students treat Egyptian hieroglyphs as a place-value system and try to "align" symbols in columns.', reveals: 'students-treat-egyptian-hieroglyphs-as' }
            ] }] } },
        { type: 'drill', nodeId: 'c8_math_ch3_9', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch3_5', title: 'Use it in the wild',
          caseStudy: { intro: 'In a skit about early humans, a student plays a herder with no number words who must check whether all 40 goats returned at dusk. He suggests: \'I\'ll just look at the herd and remember what it looked like.\'',
            decisions: [{ prompt: 'What method would actually work without numbers?', options: [
                { text: 'Pair each goat with one pebble in a bag in the morning, then match returning goats against the pebbles at dusk — leftover pebbles mean missing goats. This one-to-one matching is exactly how pre-numeric peoples counted before number words existed.', outcome: 'This shows counting\'s origin: external one-to-one records solve \'how many\' when memory and eyesight fail at scale.' },
                { text: 'His plan works fine — humans can spot a missing goat by looking, which is why numbers were never really needed.', outcome: 'Instant recognition collapses beyond a handful of items; at 40 goats a missing one is invisible, which is precisely the problem that invented counting.', reveals: 'just-look-and-see' },
                { text: 'He should shout \'forty\' at the sky each morning — even without written symbols, number words work.', outcome: 'The scene has no number words at all; the historical fix was physical matching — tallies, pebbles, knots — with symbols and words arriving only later.', reveals: 'words-before-records' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch3_9', title: 'You made it',
          caseStudy: { intro: 'Numbers began as a memory trick — one pebble per sheep, one notch per goat. When herds outgrew fingers and memory, humans outsourced counting to sticks and stones, and mathematics was born.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch3_5', difficulty: 'standard',
          question: 'The place value system in base 10 assigns each digit a value equal to the digit.',
          hint: 'Revisit c7_math_ch03_004 (Decimal Place Value: Tenths, Hundredths, Thousandths) and.',
          misconception: 'Students treat the exponent as the *number of zeros* in the place value name (e.g., "thousands has three zeros so it\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The place value system in base 10 assigns each digit a value equal to the digit',
                  options: ['The place value system in base 10 assigns each digit a value equal to the digit', 'The origin of counting refers to the historical and cognitive process by', 'The Mayan number system is a vigesimal (base-20) positional numeral system that uses', 'The evolution of digit shapes 0-9 traces the historical transformation of numeral symbols'],
                  hint: 'Revisit c7_math_ch03_004 (Decimal Place Value: Tenths, Hundredths, Thousandths) and.',
                  misconception: 'Students treat the exponent as the *number of zeros* in the place value name (e.g., "thousands has three zeros so it\'s \\(10^3\\)") rather.' }
          ],
            remediations: { 'students-treat-the-exponent-as': { steps: ['If a student exhibits the "exponent counts zeros" misconception: 1.', 'Draw a place value chart with columns labeled \\(10^4, 10^3, 10^2, 10^1, 10^0, 10^{-1}, 10^{-2}\\) and also write the.', 'Have them place a digit (e.g., 7) in each column one at a time and write the value as \\(7 \\times 10^k\\).', 'Ask: "What is k in this column?" Emphasize that k is the *column number* from the ones column (0), increasing left.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_6', difficulty: 'standard',
          question: 'The transmission of Hindu numerals refers to the historical process by which.',
          hint: 'Revisit c8_math_ch3_5 (Place Value System: Power of 10 Notation) and c6_math_ch01_007.',
          misconception: 'Students believe the system is called "Arabic numerals" because Arabs invented it.',
          parts: [
                { id: 'a', prompt: 'Name the 9th-century Persian scholar who wrote *Kitab al-Jam\' wa\'l-Tafriq bi Hisab al-Hind* (Book of Addition and Subtraction According to the Hindu.', answer: 'Al-Khwarizmi (c',
                  options: ['Al-Khwarizmi (c', 'Al-Biruni', 'Omar Khayyam', 'Arabic numerals'],
                  hint: 'Revisit c8_math_ch3_5 (Place Value System: Power of 10 Notation) and c6_math_ch01_007 (Roman.',
                  misconception: 'Students believe the system is called "Arabic numerals" because Arabs invented it.' },
                { id: 'b', prompt: 'A merchant in 1200 CE Pisa wants to multiply 347 × 268. Using Roman numerals (CCCXLVII × CCLXVIII), explain why this is impractical compared to Hindu-Arabic.', answer: 'Roman numerals lack place value and zero, making written algorithms impossible',
                  options: ['Roman numerals lack place value and zero, making written algorithms impossible', 'Arabic numerals', 'Arabs invented zero and place value', 'the system is called "Arabic numerals"'],
                  hint: 'Revisit c8_math_ch3_5 (Place Value System: Power of 10 Notation) and c6_math_ch01_007 (Roman.',
                  misconception: 'Students believe the system is called "Arabic numerals" because Arabs invented it.' }
          ],
            remediations: { 'the-system-is-called-arabic': { steps: ['Show a timeline map — India (Brahmagupta 628 CE: zero rules) → Baghdad (Al-Khwarizmi 825 CE: explains Hindu system) →.', 'Have student read Al-Khwarizmi\'s own preface: "I have chosen the Hindu method because it is easiest and most perfect."', 'Contrast with Fibonacci\'s preface: "I learned the art of the nine Indian figures from the Arabs."', 'Ask: "If Al-Khwarizmi calls it \'Hindu,\' why do we say \'Arabic\'?" Guide to: Europe learned it *via* Arabs, so named.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the system is called "Arabic numerals" because Arabs invented it.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Europeans adopted Hindu-Arabic numerals immediately after Fibonacci\'s *Liber Abaci* in 1202 because they were clearly better." Evaluate this.', answer: 'The claim is false',
                  options: ['The claim is false', 'great man', 'Arabic numerals', 'Arabs invented zero and place value'],
                  hint: 'Revisit c8_math_ch3_5 (Place Value System: Power of 10 Notation) and c6_math_ch01_007 (Roman.',
                  misconception: 'Students believe the system is called "Arabic numerals" because Arabs invented it.' }
          ],
            remediations: { 'the-system-is-called-arabic': { steps: ['Show a timeline map — India (Brahmagupta 628 CE: zero rules) → Baghdad (Al-Khwarizmi 825 CE: explains Hindu system) →.', 'Have student read Al-Khwarizmi\'s own preface: "I have chosen the Hindu method because it is easiest and most perfect."', 'Contrast with Fibonacci\'s preface: "I learned the art of the nine Indian figures from the Arabs."', 'Ask: "If Al-Khwarizmi calls it \'Hindu,\' why do we say \'Arabic\'?" Guide to: Europe learned it *via* Arabs, so named.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_7', difficulty: 'standard',
          question: 'The Bakhshali Manuscript (3rd–4th century CE) is the oldest extant Indian.',
          hint: 'If stuck, revisit c8_math_ch3_5 (Place Value System: Power of 10 Notation) and.',
          misconception: 'Students often think the Bakhshali square-root formula √(A²+b) ≈ A + b/(2A) is exactly the same as the modern.',
          parts: [
                { id: 'a', prompt: 'What symbol did the Bakhshali Manuscript use to represent zero, and in what two roles does it appear in the manuscript?', answer: 'The Bakhshali Manuscript used a dot (·) for zero',
                  options: ['The Bakhshali Manuscript used a dot (·) for zero', 'circle', 'no zero', 'zero came only from Arabia'],
                  hint: 'If stuck, revisit c8_math_ch3_5 (Place Value System: Power of 10 Notation) and c6_math_ch02_016.',
                  misconception: 'Students often think the Bakhshali square-root formula √(A²+b) ≈ A + b/(2A) is exactly the same as the modern Newton-Raphson first.' },
                { id: 'b', prompt: 'Compare the computational steps needed to multiply 235 × 47 in (a) Roman numerals (CCXXXV × XLVII) and (b) Indian place-value with zero.', answer: 'Roman: Must convert to additive groups (CCXXXV = CC + XXX + V), use repeated',
                  options: ['Roman: Must convert to additive groups (CCXXXV = CC + XXX + V), use repeated', 'Roman is harder'],
                  hint: 'If stuck, revisit c8_math_ch3_5 (Place Value System: Power of 10 Notation) and c6_math_ch02_016.',
                  misconception: 'Students often think the Bakhshali square-root formula √(A²+b) ≈ A + b/(2A) is exactly the same as the modern Newton-Raphson first.' }
          ],
            remediations: { 'the-bakhshali-square-root-formula': { steps: ['Remediation: 1) Show the Bakhshali folio (translated) where the third term is explicitly written: “tad bhāgahṛtaṃ.', '2) Have the student compute √10 with A=3, b=1 both with two terms (3.1666…) and three terms (3.16228…) and compare.', '3) Ask: “Which term made the jump from 0.004 error to 0.000004 error?” 4) Then re-derive the third term from binomial.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_8', difficulty: 'standard',
          question: 'Roman numerals are a non-positional numeral system using seven Latin letters.',
          hint: 'If stuck, revisit Class 6 Roman numerals (c6_math_ch01_007) for symbol rules, and Class 7.',
          misconception: 'Students believe subtractive notation can be applied to any smaller-before-larger pair (e.g., writing 49 as IL, 99.',
          parts: [
                { id: 'a', prompt: 'Write the Hindu-Arabic equivalents for these Roman numerals: (a) CDXLIV (b) DCCLXXXIX (c) MCMXCIX', answer: 'CDXLIV (',
                  options: ['CDXLIV (', 'smaller before larger = subtraction', 'subtractive notation can be applied to any smaller-before-larger pair (e'],
                  hint: 'If stuck, revisit Class 6 Roman numerals (c6_math_ch01_007) for symbol rules, and Class 7 place.',
                  misconception: 'Students believe subtractive notation can be applied to any smaller-before-larger pair (e.g., writing 49 as IL, 99 as IC, 999 as IM).' },
                { id: 'b', prompt: 'Convert the year India gained independence (1947) and the current year (2024) into Roman numerals. Show your grouping by place value.', answer: '1947 = 1000 + 900 + 40 + 7 = M + CM + XL + VII = MCMXLVII',
                  options: ['1947 = 1000 + 900 + 40 + 7 = M + CM + XL + VII = MCMXLVII', 'smaller before larger = subtraction', 'subtractive notation can be applied to any smaller-before-larger pair (e'],
                  hint: 'If stuck, revisit Class 6 Roman numerals (c6_math_ch01_007) for symbol rules, and Class 7 place.',
                  misconception: 'Students believe subtractive notation can be applied to any smaller-before-larger pair (e.g., writing 49 as IL, 99 as IC, 999 as IM).' },
                { id: 'c', prompt: 'Compare adding 48 + 37 in Hindu-Arabic versus Roman numerals (XLVIII + XXXVII). Show both methods and explain why the Roman method is more error-prone.', answer: 'Hindu-Arabic: 48 + 37 = 85 (align place values, add columns, carry 1)',
                  options: ['Hindu-Arabic: 48 + 37 = 85 (align place values, add columns, carry 1)', 'Roman is just as easy', 'smaller before larger = subtraction', 'subtractive notation can be applied to any smaller-before-larger pair (e'],
                  hint: 'If stuck, revisit Class 6 Roman numerals (c6_math_ch01_007) for symbol rules, and Class 7 place.',
                  misconception: 'Students believe subtractive notation can be applied to any smaller-before-larger pair (e.g., writing 49 as IL, 99 as IC, 999 as IM).' }
          ],
            remediations: { 'subtractive-notation-can-be-applied': { steps: ['If a student writes IL for 49: (1) Have them list the seven symbols in value order: I, V, X, L, C, D, M.', '(2) Circle the subtractive pairs allowed: I before V/X only, X before L/C only, C before D/M only.', '(3) Show that I and L have X between them — they are not adjacent.', '(4) Build 49 correctly: 40 = XL (X before L), 9 = IX (I before X) → XLIX.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_9', difficulty: 'standard',
          question: 'The Egyptian hieroglyphic number system is a base-10 additive system that uses.',
          hint: 'Revisit c7_math_ch01_002 (Place Value System: Extending to 6 and 7 Digits) and practice.',
          misconception: 'Students treat Egyptian hieroglyphs as a place-value system and try to "align" symbols in columns (units, tens.',
          parts: [
                { id: 'a', prompt: 'Compare the Egyptian and Roman numeral systems for writing 2,400. Which system uses fewer symbols?', answer: 'Egyptian: two lotus (1000) + four coils (100) = 6 symbols',
                  options: ['Egyptian: two lotus (1000) + four coils (100) = 6 symbols', 'both are additive'],
                  hint: 'Revisit c7_math_ch01_002 (Place Value System: Extending to 6 and 7 Digits) and practice expanding.',
                  misconception: 'Students treat Egyptian hieroglyphs as a place-value system and try to "align" symbols in columns (units, tens, hundreds) or insert.' }
          ],
            remediations: { 'students-treat-egyptian-hieroglyphs-as': { steps: ['If a student inserts placeholders for zero: 1.', 'Ask them to write 5 in Egyptian (five strokes).', 'Then ask: "Where are the tens?', 'The hundreds?" They\'ll say "not there".'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
