import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch03_p1: SimDef = {
    id: 'v3_c8_math_ch03_p1',
    title: 'A Story of Numbers · Part 1/2',
    subtitle: 'How humans invented \'how many\'',
    classLevel: 8, subject: 'mathematics', topic: 'A Story of Numbers · Part 1/2',
    chapters: ['c8_math_ch03'],
    nodeIds: ['c8_math_ch3_1', 'c8_math_ch3_10', 'c8_math_ch3_11', 'c8_math_ch3_2', 'c8_math_ch3_3', 'c8_math_ch3_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a prehistoric herder keeping count', intro: 'No digits, no words for numbers — just goats wandering off into the dusk. Before you can invent numbers, you have to need them. Today, you will.', goal: 'Understand why counting was invented — one-to-one correspondence, tally sticks and tokens as early counting tools, and the limits of unaided perception that made numbers necessary.' },
    discovery: {
        question: 'A farmer 5,000 years ago has 37 goats and zero number words. At sunset, how does he know 3 goats never came home?',
        options: ['One notch per goat on a tally stick — match each returning goat to a notch and the leftover notches are the missing goats', 'He just remembers each goat\'s face', 'He counts on his fingers three times', 'He weighs the whole herd'],
        answer: 'One notch per goat on a tally stick — match each returning goat to a notch and the leftover notches are the missing goats',
        hook: 'Counting isn\'t built into your brain like walking — humans invented it. Your eyes can only \'see\' about 3–4 things at once, so beyond that you need marks, pebbles or knots: one mark per thing, no subtraction required.',
    },
    teaching: [
        { title: 'Origins of Counting: Need for Numbers in Early Human Societies', text: 'The origin of counting refers to the historical and cognitive process by which early human societies developed the concept of number to quantify, compare, and manage discrete objects (like animals.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch3_1', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Survive a day without numbers: track a herd with pebbles, check a granary with notches, then invent a counting system for tree-dwellers who own only vines and shells. Discover why \'how many?\' demanded a permanent record.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'case', nodeId: 'c8_math_ch3_1', title: 'Origins of Counting: Need for Numbers in Early Human Societies',
          caseStudy: { intro: 'Imagine you are a farmer in ancient Punjab, 5000 years ago, with a herd of goats.',
            decisions: [{ prompt: 'A REMEMBER level question: List three specific daily-life situations in an early farming community where *not* having a way to count would.', options: [
                { text: 'Correct answer: (1) Checking if all sheep/goats returned from grazing', outcome: 'Correct answer: (1) Checking if all sheep/goats returned from grazing.' },
                { text: 'doing math homework', outcome: 'Not quite — Students often think counting is an innate human ability like walking, not a cultural invention.', reveals: 'counting-is-an-innate-human' },
                { text: 'building a pyramid', outcome: 'Not quite — Students often think counting is an innate human ability like walking, not a cultural invention.', reveals: 'counting-is-an-innate-human' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch3_11', title: 'Evolution of Digit Shapes 0-9',
          caseStudy: { intro: 'Have you ever wondered why the digit \'2\' looks like a swan\'s neck or why \'0\' is a perfect circle?',
            decisions: [{ prompt: 'Name the ancient Indian script (3rd century BCE) that provides the earliest known forms of the digits 1-9 (though not zero) found.', options: [
                { text: 'the **Brahmi script**', outcome: 'The correct answer is the **Brahmi script**. A wrong answer such as "Devanagari" or "Arabic".' },
                { text: 'Devanagari', outcome: 'Not quite — Students often think the digit shapes were invented at once by Arabs (hence "Arabic numerals") and.', reveals: 'the-digit-shapes-were-invented' },
                { text: 'Arabic', outcome: 'Not quite — Students often think the digit shapes were invented at once by Arabs (hence "Arabic numerals") and.', reveals: 'the-digit-shapes-were-invented' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch3_2', title: 'One-to-One Mapping: Early Counting Methods',
          caseStudy: { intro: 'Imagine a shepherd in ancient Rajasthan who needs to check if all 25 goats have returned to the pen without knowing number words beyond "many".',
            decisions: [{ prompt: 'A farmer uses 15 stones to track 15 sheep. He places one stone per sheep as they enter the pen. At the end, 2 stones remain in his hand.', options: [
                { text: 'The 2 remaining stones mean 2 sheep are missing', outcome: 'The 2 remaining stones mean 2 sheep are missing; the one-to-one mapping shows the set of stones has.' },
                { text: 'he has extra stones', outcome: 'Not quite — Students think one-to-one mapping only proves *equality* and cannot show *which set is larger*.', reveals: 'one-to-one-mapping-only' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch3_4', title: 'Origins of Indian Number System: Hindu Numerals',
          caseStudy: { intro: 'Imagine you are a merchant in ancient India trying to record a transaction of 1,05,000 (one lakh five thousand) sacks of grain using Roman numerals — you would.',
            decisions: [{ prompt: 'What are the three key mathematical innovations that define the Hindu numeral system and distinguish it from earlier systems like Roman.', options: [
                { text: 'The three key innovations are: (1) a consistent base-10 (decimal) structure, (2)', outcome: 'The three key innovations are: (1) a consistent base-10 (decimal) structure, (2) positional place.' },
                { text: 'symbols 1-9', outcome: 'Not quite — Students often believe zero was invented solely to represent "nothing" (absence of quantity) and.', reveals: 'zero-was-invented-solely-to' },
                { text: 'decimal system', outcome: 'Not quite — Students often believe zero was invented solely to represent "nothing" (absence of quantity) and.', reveals: 'zero-was-invented-solely-to' }
            ] }] } },
        { type: 'drill', nodeId: 'c8_math_ch3_4', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'In a skit about early humans, a student plays a herder with no number words who must check whether all 40 goats returned at dusk. He suggests: \'I\'ll just look at the herd and remember what it looked like.\'',
            decisions: [{ prompt: 'What method would actually work without numbers?', options: [
                { text: 'Pair each goat with one pebble in a bag in the morning, then match returning goats against the pebbles at dusk — leftover pebbles mean missing goats. This one-to-one matching is exactly how pre-numeric peoples counted before number words existed.', outcome: 'This shows counting\'s origin: external one-to-one records solve \'how many\' when memory and eyesight fail at scale.' },
                { text: 'His plan works fine — humans can spot a missing goat by looking, which is why numbers were never really needed.', outcome: 'Instant recognition collapses beyond a handful of items; at 40 goats a missing one is invisible, which is precisely the problem that invented counting.', reveals: 'just-look-and-see' },
                { text: 'He should shout \'forty\' at the sky each morning — even without written symbols, number words work.', outcome: 'The scene has no number words at all; the historical fix was physical matching — tallies, pebbles, knots — with symbols and words arriving only later.', reveals: 'words-before-records' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch3_4', title: 'The bigger picture',
          caseStudy: { intro: 'Numbers began as a memory trick — one pebble per sheep, one notch per goat. When herds outgrew fingers and memory, humans outsourced counting to sticks and stones, and mathematics was born.',
            decisions: [{ prompt: 'What comes next? A Story of Numbers · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Story of Numbers · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch3_1', difficulty: 'standard',
          question: 'The origin of counting refers to the historical and cognitive process by which.',
          hint: 'If stuck, revisit Class 6 "Natural Numbers and Whole Numbers" (c6_math_ch01_002).',
          misconception: 'Students often think counting is an innate human ability like walking, not a cultural invention.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: List three specific daily-life situations in an early farming community where *not* having a way to count would cause a serious.', answer: 'Correct answer: (1) Checking if all sheep/goats returned from grazing',
                  options: ['Correct answer: (1) Checking if all sheep/goats returned from grazing', 'doing math homework', 'building a pyramid', 'counting is an innate human ability like walking, not a cultural invention'],
                  hint: 'If stuck, revisit Class 6 "Natural Numbers and Whole Numbers" (c6_math_ch01_002) — specifically the.',
                  misconception: 'Students often think counting is an innate human ability like walking, not a cultural invention.' },
                { id: 'b', prompt: 'An UNDERSTAND level question: Why could early humans not simply use their fingers to count everything?', answer: 'Correct answer: Fingers are limited to 10 (or 20 with toes)',
                  options: ['Correct answer: Fingers are limited to 10 (or 20 with toes)', 'they could count on fingers many times', 'counting is an innate human ability like walking, not a cultural invention'],
                  hint: 'If stuck, revisit Class 6 "Natural Numbers and Whole Numbers" (c6_math_ch01_002) — specifically the.',
                  misconception: 'Students often think counting is an innate human ability like walking, not a cultural invention.' },
                { id: 'c', prompt: 'An APPLY level question: A Neolithic farmer uses a tally stick with one notch per goat. In the morning he makes 37 notches.', answer: '(1) Morning: each goat → one notch (bijection)',
                  options: ['(1) Morning: each goat → one notch (bijection)', 'he subtracts 34 from 37', 'counting is an innate human ability like walking, not a cultural invention'],
                  hint: 'If stuck, revisit Class 6 "Natural Numbers and Whole Numbers" (c6_math_ch01_002) — specifically the.',
                  misconception: 'Students often think counting is an innate human ability like walking, not a cultural invention.' },
                { id: 'd', prompt: 'An ANALYZE level question: Compare the "pebble-in-a-bag" method (one pebble per sheep) with the "notch-on-a-stick" method.', answer: 'Correct analysis: Pebble bag: portable, reusable, good for mobile herder',
                  options: ['Correct analysis: Pebble bag: portable, reusable, good for mobile herder', 'counting is an innate human ability like walking, not a cultural invention'],
                  hint: 'If stuck, revisit Class 6 "Natural Numbers and Whole Numbers" (c6_math_ch01_002) — specifically the.',
                  misconception: 'Students often think counting is an innate human ability like walking, not a cultural invention.' }
          ],
            remediations: { 'counting-is-an-innate-human': { steps: ['If a student says "They just knew numbers," do this: (1) Ask them to close eyes and imagine 47 distinct objects without.', '(2) Show a photo of a 30,000-year-old wolf bone with 55 notches (Lebombo bone).', '(3) Say: "This human *did not have the word \'fifty-five\'*.', 'They made one mark per thing.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think counting is an innate human ability like walking, not a cultural invention.',
          parts: [
                { id: 'a', prompt: 'An EVALUATE level question: A student claims: "Early humans didn\'t need numbers because they could just look and see if something was missing." Judge this.', answer: 'Correct judgment: The claim is false for all but tiny quantities',
                  options: ['Correct judgment: The claim is false for all but tiny quantities', 'counting is an innate human ability like walking, not a cultural invention'],
                  hint: 'If stuck, revisit Class 6 "Natural Numbers and Whole Numbers" (c6_math_ch01_002) — specifically the.',
                  misconception: 'Students often think counting is an innate human ability like walking, not a cultural invention.' },
                { id: 'b', prompt: 'A CREATE level question: Invent a counting method for a community that lives in tree houses and has no flat surfaces, no stones, and no wood to spare for tally.', answer: 'Good answer example: (1) Tie a knot in the vine for each item (one-to-one)',
                  options: ['Good answer example: (1) Tie a knot in the vine for each item (one-to-one)', 'counting is an innate human ability like walking, not a cultural invention'],
                  hint: 'If stuck, revisit Class 6 "Natural Numbers and Whole Numbers" (c6_math_ch01_002) — specifically the.',
                  misconception: 'Students often think counting is an innate human ability like walking, not a cultural invention.' }
          ],
            remediations: { 'counting-is-an-innate-human': { steps: ['If a student says "They just knew numbers," do this: (1) Ask them to close eyes and imagine 47 distinct objects without.', '(2) Show a photo of a 30,000-year-old wolf bone with 55 notches (Lebombo bone).', '(3) Say: "This human *did not have the word \'fifty-five\'*.', 'They made one mark per thing.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_10', difficulty: 'standard',
          question: 'The Mayan number system is a vigesimal (base-20) positional numeral system that.',
          hint: 'Review c8_math_ch3_5 (Place Value System: Power of 10 Notation) and practice writing.',
          misconception: 'Students often treat the Mayan system as base-10 because they are so familiar with decimal.',
          parts: [
                { id: 'a', prompt: 'A Mayan inscription shows a number with four rows. The bottom three rows are all shells (zero). The top row has two dots. What is the decimal value?', answer: 'Place values: row1 (bottom) = 1, row2 = 20, row3 = 400, row4 = 8000',
                  options: ['Place values: row1 (bottom) = 1, row2 = 20, row3 = 400, row4 = 8000', 'the base is 10 or misidentifies the fourth place value as 1000 instead of 8000'],
                  hint: 'Review c8_math_ch3_5 (Place Value System: Power of 10 Notation) and practice writing numbers.',
                  misconception: 'Students often treat the Mayan system as base-10 because they are so familiar with decimal.' }
          ],
            remediations: { 'students-often-treat-the-mayan': { steps: ['If a student makes this error, have them first write the powers of 20 (1, 20, 400, 8000) in a column.', 'Then take the target number (e.g., 372) and repeatedly divide by 20, recording remainders from bottom up.', 'Emphasise: "Each division by 20 gives the digit for the next higher place." Practise with 20, 400, 8000 as milestones.', '0, remainder 18." This builds the algorithmic habit of base conversion.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_11', difficulty: 'standard',
          question: 'The evolution of digit shapes 0-9 traces the historical transformation.',
          hint: 'Revisit the sibling node c8_math_ch3_4 (Origins of Indian Number System) and.',
          misconception: 'Students often think the digit shapes were invented at once by Arabs (hence "Arabic numerals") and that zero was always.',
          parts: [
                { id: 'a', prompt: 'Name the ancient Indian script (3rd century BCE) that provides the earliest known forms of the digits 1-9 (though not zero) found on Ashoka\'s pillars.', answer: 'the **Brahmi script**',
                  options: ['the **Brahmi script**', 'Devanagari', 'Arabic', 'Arabic numerals'],
                  hint: 'Revisit the sibling node c8_math_ch3_4 (Origins of Indian Number System) and c8_math_ch3_6.',
                  misconception: 'Students often think the digit shapes were invented at once by Arabs (hence "Arabic numerals") and that zero was always a circle.' },
                { id: 'b', prompt: 'Why did the digit \'0\' evolve from a dot (bindu) in early Indian manuscripts to a small circle in later Nagari and Arabic scripts?', answer: 'The dot (bindu) represented zero as a placeholder in place value notation',
                  options: ['The dot (bindu) represented zero as a placeholder in place value notation', 'because circles are pretty', 'Arabic numerals'],
                  hint: 'Revisit the sibling node c8_math_ch3_4 (Origins of Indian Number System) and c8_math_ch3_6.',
                  misconception: 'Students often think the digit shapes were invented at once by Arabs (hence "Arabic numerals") and that zero was always a circle.' },
                { id: 'c', prompt: 'Given the Brahmi numeral for \'3\' (three horizontal lines) and the modern \'3\', describe two intermediate changes that occurred in the Gupta and Nagari scripts.', answer: '**Correct answer with steps:** 1',
                  options: ['**Correct answer with steps:** 1', 'it just changed over time', 'Arabic numerals'],
                  hint: 'Revisit the sibling node c8_math_ch3_4 (Origins of Indian Number System) and c8_math_ch3_6.',
                  misconception: 'Students often think the digit shapes were invented at once by Arabs (hence "Arabic numerals") and that zero was always a circle.' }
          ],
            remediations: { 'the-digit-shapes-were-invented': { steps: ['If a student holds this misconception, show them a side-by-side comparison of Brahmi, Gupta, Nagari, Arabic, and modern.', 'Trace the strokes together: Brahmi \'2\' = two horizontal lines; Gupta = connected at right with vertical; Nagari = top.', 'Emphasize: "The shapes are frozen cursive handwriting from 1500 years ago." Have them practice writing the Brahmi \'2\'.', 'Revisit the Bakhshali manuscript (c8_math_ch3_7) to see the dot for zero.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_2', difficulty: 'standard',
          question: 'One-to-one mapping (bijection) in early counting is the process of pairing each.',
          hint: 'If stuck, revisit the idea of "fair sharing" or "pairing" from early primary activities.',
          misconception: 'Students think one-to-one mapping only proves *equality* and cannot show *which set is larger* or *by how much*.',
          parts: [
                { id: 'a', prompt: 'A farmer uses 15 stones to track 15 sheep. He places one stone per sheep as they enter the pen. At the end, 2 stones remain in his hand.', answer: 'The 2 remaining stones mean 2 sheep are missing',
                  options: ['The 2 remaining stones mean 2 sheep are missing', 'he has extra stones'],
                  hint: 'If stuck, revisit the idea of "fair sharing" or "pairing" from early primary activities (e.g.',
                  misconception: 'Students think one-to-one mapping only proves *equality* and cannot show *which set is larger* or *by how much*.' },
                { id: 'b', prompt: 'Compare these two methods for checking if a bag has exactly 20 marbles: (A) Count the marbles aloud.', answer: 'Method B uses one-to-one mapping (each marble paired with a cap)',
                  options: ['Method B uses one-to-one mapping (each marble paired with a cap)', 'A is better because counting is exact'],
                  hint: 'If stuck, revisit the idea of "fair sharing" or "pairing" from early primary activities (e.g.',
                  misconception: 'Students think one-to-one mapping only proves *equality* and cannot show *which set is larger* or *by how much*.' }
          ],
            remediations: { 'one-to-one-mapping-only': { steps: ['Present two unequal sets (e.g., 6 pens, 4 pencils).', 'Ask student to pair them one-to-one.', 'When they stop at 4 pairs, point to the 2 unpaired pens and ask: "What do these two pens tell us about the two sets?" 4.', 'Guide them to say: "There are 2 more pens than pencils." 5.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_3', difficulty: 'standard',
          question: 'The tally system is a counting method where each item is represented by a mark.',
          hint: 'Review one-to-one mapping (c8_math_ch3_2) and basic counting with natural numbers.',
          misconception: 'Students often incorrectly draw five vertical lines and then add a diagonal line across them, resulting in six strokes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The tally system is a counting method where each item is represented by a mark (typically',
                  options: ['The tally system is a counting method where each item is represented by a mark (typically', 'The origin of counting refers to the historical and cognitive process by', 'The Mayan number system is a vigesimal (base-20) positional numeral system that uses', 'The evolution of digit shapes 0-9 traces the historical transformation of numeral symbols'],
                  hint: 'Review one-to-one mapping (c8_math_ch3_2) and basic counting with natural numbers.',
                  misconception: 'Students often incorrectly draw five vertical lines and then add a diagonal line across them, resulting in six strokes for a group of five.' }
          ],
            remediations: { 'students-often-incorrectly-draw-five': { steps: ['If a student makes this error, have them physically count objects (e.g., pencils) and make a tally mark for each.', 'After every fifth object, instruct them to draw the diagonal across the previous four verticals, emphasizing that the.', 'Then have them count the total strokes in a group: they should count 4 verticals + 1 diagonal = 5 strokes.', 'Practice with multiple groups, counting total strokes and total objects to reinforce the 1:1 correspondence.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch3_4', difficulty: 'standard',
          question: 'The Hindu numeral system is the ancient Indian positional decimal system that.',
          hint: 'Review the concept of place value (c6_math_ch01_003) and the Roman numeral system.',
          misconception: 'Students often believe zero was invented solely to represent "nothing" (absence of quantity) and overlook its critical.',
          parts: [
                { id: 'a', prompt: 'What are the three key mathematical innovations that define the Hindu numeral system and distinguish it from earlier systems like Roman or Egyptian numerals?', answer: 'The three key innovations are: (1) a consistent base-10 (decimal) structure, (2)',
                  options: ['The three key innovations are: (1) a consistent base-10 (decimal) structure, (2)', 'symbols 1-9', 'decimal system', 'nothing'],
                  hint: 'Review the concept of place value (c6_math_ch01_003) and the Roman numeral system.',
                  misconception: 'Students often believe zero was invented solely to represent "nothing" (absence of quantity) and overlook its critical role as.' },
                { id: 'b', prompt: 'Write the number 3,04,005 (three lakh four thousand five) in the Hindu-Arabic numeral system.', answer: 'The number is written as 304005',
                  options: ['The number is written as 304005', 'nothing'],
                  hint: 'Review the concept of place value (c6_math_ch01_003) and the Roman numeral system.',
                  misconception: 'Students often believe zero was invented solely to represent "nothing" (absence of quantity) and overlook its critical role as.' }
          ],
            remediations: { 'zero-was-invented-solely-to': { steps: ['If a student writes 105 as 15 or cannot explain why 1005 ≠ 15: (1) Use a place value chart with columns labelled 1000s.', '(2) Place digit cards: 1 in 100s, 0 in 10s, 5 in 1s → read as 105.', '(3) Remove the 0 card → digits shift left: 1 in 10s, 5 in 1s → now reads 15.', '(4) Ask: "Did the number change?'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
