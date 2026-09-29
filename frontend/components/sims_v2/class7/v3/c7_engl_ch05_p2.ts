import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch05_p2: SimDef = {
    id: 'v3_c7_engl_ch05_p2',
    title: 'Bravehearts: A Homage to Our Brave Soldiers · Part 2/3',
    subtitle: 'This node covers the specific vocabulary words (*homage*, *territorial integrity*.',
    classLevel: 7, subject: 'engl', topic: 'Bravehearts: A Homage to Our Brave Soldiers · Part 2/3',
    chapters: ['c7_engl_ch05'],
    nodeIds: ['c7_engl_ch05_007', 'c7_engl_ch05_008', 'c7_engl_ch05_009', 'c7_engl_ch05_010', 'c7_engl_ch05_011', 'c7_engl_ch05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are visiting a grand monument in New Delhi dedicated to soldiers who fought for India, and you.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A soldier at a far border post could send a quick digital message — but instead writes a letter beginning with three words that change everything: a greeting so warm the family reads it twice. Why does the handwritten letter matter more?',
        options: ['It carries physical intimacy — handwriting, ink, and a moment frozen in paper that digital messages cannot hold', 'It is faster than any phone', 'It costs nothing at all to send', 'It is required by military law'],
        answer: 'It carries physical intimacy — handwriting, ink, and a moment frozen in paper that digital messages cannot hold',
        hook: 'Letter format is only the envelope — the heart of a letter is the emotion inside. An affectionate opening sets an intimate tone, and literature loves letters because they reveal inner thoughts with no narrator filtering them.',
    },
    teaching: [
        { title: 'Vocabulary in Context: homage, territorial integrity, envisioned, tribute', text: 'Vocabulary in context refers to determining the precise meaning of advanced thematic words—such as *homage*, *territorial integrity*, *envisioned*, and *tribute*—by examining how they function within.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Write the opening paragraph of a letter from a soldier to a younger sibling — balance warmth with duty — then mark the salutation, the reassurance, and the feeling hiding between the lines.',
        labels: ['Vocabulary in Context: homage,', 'Literary Devices: Epistolary Form', 'Comprehension: Wars Fought by', 'Critical Thinking: The Cost', 'Poem: Pushp ki Abhilasha', 'Poem: Metaphor of Flowers'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch05_007', title: 'Vocabulary in Context: homage, territorial integrity, envisioned, tribute',
          caseStudy: { intro: 'Imagine you are visiting a grand monument in New Delhi dedicated to soldiers who fought for India, and you read a plaque that says, "This memorial stands as.',
            decisions: [{ prompt: 'What does the word "homage" mean when used in a sentence about honouring fallen soldiers?', options: [
                { text: '"Homage" means special public honour or respect shown or expressed toward someone', outcome: '"Homage" means special public honour or respect shown or expressed toward someone deserving of high.' },
                { text: 'paying homage', outcome: 'Not quite — Students often confuse the abstract noun *homage* with physical objects like *monuments*.', reveals: 'students-often-confuse-the-abstract' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_008', title: 'Literary Devices: Epistolary Form (Letter Writing)',
          caseStudy: { intro: 'Imagine you open an old wooden box and find a yellowed handwritten letter sent by a soldier from a snowy mountain bunker to his younger sister back in a quiet.',
            decisions: [{ prompt: 'What are the primary structural components that define an epistolary text in literature?', options: [
                { text: 'The primary structural components include a dateline (indicating when and where it was', outcome: 'The primary structural components include a dateline (indicating when and where it was written),.' },
                { text: 'that epistolary writing requires chapter numbers and plot summaries', outcome: 'Not quite — Students often confuse epistolary writing with regular formal letter-writing (like writing.', reveals: 'students-often-confuse-epistolary-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_011', title: 'Poem: Pushp ki Abhilasha - Summary and Context',
          caseStudy: { intro: 'Imagine you are walking past a war memorial and you see a simple marigold flower lying on the steps where brave soldiers are honoured—have you ever wondered.',
            decisions: [{ prompt: 'Who wrote the famous patriotic poem "Pushp ki Abhilasha", and what is the primary speaker in the poem?', options: [
                { text: 'The poem was written by the renowned poet Makhanlal Chaturvedi, and the primary speaker', outcome: 'The poem was written by the renowned poet Makhanlal Chaturvedi, and the primary speaker is a humble.' },
                { text: 'Pushp ki Abhilasha', outcome: 'Not quite — Students often think "Pushp ki Abhilasha" is a nature poem about gardening or flower arrangements.', reveals: 'pushp-ki-abhilasha-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_012', title: 'Poem: Metaphor of Flowers as Symbols of Courage',
          caseStudy: { intro: 'Imagine walking through a quiet garden where every bright blossom reminds you of someone who stood brave and tall against a harsh storm.',
            decisions: [{ prompt: 'What literary device compares the selfless bravery of a soldier directly to the quiet offering of a flower without using the words \'like\'.', options: [
                { text: 'a metaphor', outcome: 'The correct answer is a metaphor. A wrong answer like "simile" shows confusion between direct.' },
                { text: 'simile', outcome: 'Not quite — Students often think that comparing a soldier to a flower means the poet is calling the soldier.', reveals: 'comparing-a-soldier-to-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student wants to answer a soldier\'s published letter that ends: \'Do not worry about the cold nights here; the warmth of serving our nation keeps every soldier going.\' Her first draft begins by listing facts about the glacier\'s weather.',
            decisions: [{ prompt: 'What is the soldier doing in that line — and how should her reply meet it?', options: [
                { text: 'He is using contrast to manage his family\'s worry — \'cold nights\' named honestly, then answered by \'the warmth of serving,\' turning hardship into reassurance rather than hiding it. Her reply should meet that tone: acknowledge the sacrifice, return warmth for warmth — a respectful, personal letter, not a weather report, because the letter form exists to carry feeling across the distance.', outcome: 'The line works because the letter lets him balance truth and comfort — and a reply that honours the theme of sacrifice in the same personal register completes the exchange.' },
                { text: 'He is simply reporting conditions — so her factual reply about the glacier\'s weather is the right register.', outcome: 'The line is emotional craft, not a weather report — it sets hardship against purpose to reassure readers, and a facts-only reply would miss the letter entirely.', reveals: 'letters-are-reports' },
                { text: 'He is complaining indirectly — \'cold nights\' is a coded plea for help that should be answered with alarm.', outcome: 'The contrast does the opposite — he names the cold only to dissolve the worry in the warmth of duty; reading it as complaint inverts the reassurance.', reveals: 'reassurance-is-complaint' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_012', title: 'The bigger picture',
          caseStudy: { intro: 'A letter is a conversation across distance that you can hold in your hands. Long after the ink dries, the feeling stays.',
            decisions: [{ prompt: 'What comes next? Bravehearts: A Homage to Our Brave Soldiers · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Bravehearts: A Homage to Our Brave Soldiers · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch05_007', difficulty: 'standard',
          question: 'Vocabulary in context refers to determining the precise meaning of advanced.',
          hint: 'Review Class 6 vocabulary strategies where students look at punctuation marks and.',
          misconception: 'Students often confuse the abstract noun *homage* with physical objects like *monuments* or *medals*, believing that.',
          parts: [
                { id: 'a', prompt: 'In the sentence, "The architect envisioned a grand circular wall resembling the ancient Chakravyuh formation," use contextual clues to define the word.', answer: '(1) Identify the subject (the architect) and the object (a grand circular wall)',
                  options: ['(1) Identify the subject (the architect) and the object (a grand circular wall)', 'envisioned', 'paying homage'],
                  hint: 'Review Class 6 vocabulary strategies where students look at punctuation marks and conjunctions.',
                  misconception: 'Students often confuse the abstract noun *homage* with physical objects like *monuments* or *medals*, believing that "paying homage" means.' }
          ],
            remediations: { 'students-often-confuse-the-abstract': { steps: ['To fix this, guide the student back to the verb roots and actions.', 'Ask: "Can you touch or wear respect?" Explain that *homage* is what is *in your heart and actions*, while a *medal*.', 'Have them replace *homage* with *reverence* or *deep respect* in three practice sentences to cement the abstract nature.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the abstract noun *homage* with physical objects like *monuments* or *medals*, believing that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following sentence: "The citizens paid their homage by violating the territorial integrity of the camp." Is this sentence semantically correct?', answer: 'The sentence is semantically incorrect and contradictory',
                  options: ['The sentence is semantically incorrect and contradictory', 'paying homage'],
                  hint: 'Review Class 6 vocabulary strategies where students look at punctuation marks and conjunctions.',
                  misconception: 'Students often confuse the abstract noun *homage* with physical objects like *monuments* or *medals*, believing that "paying homage" means.' }
          ],
            remediations: { 'students-often-confuse-the-abstract': { steps: ['To fix this, guide the student back to the verb roots and actions.', 'Ask: "Can you touch or wear respect?" Explain that *homage* is what is *in your heart and actions*, while a *medal*.', 'Have them replace *homage* with *reverence* or *deep respect* in three practice sentences to cement the abstract nature.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_008', difficulty: 'standard',
          question: 'The epistolary form is a literary device in which a story or text is told.',
          hint: 'Review basic letter parts (salutation, body, sign-off) and practice rewriting.',
          misconception: 'Students often confuse epistolary writing with regular formal letter-writing (like writing a complaint to a municipal.',
          parts: [
                { id: 'a', prompt: 'Analyze the opening lines of a fictional soldier\'s letter: "Siachen Glacier, 14th November.', answer: '(1) Locate the dateline ("Siachen Glacier, 14th November") to establish exact',
                  options: ['(1) Locate the dateline ("Siachen Glacier, 14th November") to establish exact', 'the dateline is just a title'],
                  hint: 'Review basic letter parts (salutation, body, sign-off) and practice rewriting a third-person.',
                  misconception: 'Students often confuse epistolary writing with regular formal letter-writing (like writing a complaint to a municipal corporation or.' }
          ],
            remediations: { 'students-often-confuse-epistolary-writing': { steps: ['If a student treats a literary letter like a formal complaint, guide them by pointing out the pronoun use ("I", "you").', 'Ask them: "Are these letters meant to convince an official to fix a streetlight, or are they meant to share a soldier\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_009', difficulty: 'standard',
          question: 'Analyzing and comprehending texts detailing India\'s post-independence wars.',
          hint: 'Review the historical overview of India\'s borders and practice reading letters from.',
          misconception: 'Students often confuse the *factual chronology* of post-independence wars (dates and treaty names) with the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Analyzing and comprehending texts detailing India\'s post-independence wars, focusing on',
                  options: ['Analyzing and comprehending texts detailing India\'s post-independence wars, focusing on', 'Letters as a form of communication serve as a personal, tangible bridge between', 'This topic explores the historical context of India\'s post-independence wars, examining', 'The National War Memorial is a monumental tribute built to honour and remember soldiers'],
                  hint: 'Review the historical overview of India\'s borders and practice reading letters from soldiers.',
                  misconception: 'Students often confuse the *factual chronology* of post-independence wars (dates and treaty names) with the *comprehension.' }
          ],
            remediations: { 'students-often-confuse-the-factual': { steps: ['To fix this, guide the student back to the text with specific prompts.', 'Say: "Look at the adjectives the author uses to describe the soldier\'s hands, not just the name of the battle.', 'Are they talking about guns, or are they talking about courage and fear?', 'In English comprehension, we look at *how* words make us feel about history, not just the calendar dates." Have them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_010', difficulty: 'standard',
          question: 'From \'English chapter c7_engl_ch05\': the skill or concept this node teaches.',
          hint: 'Review c7_engl_ch05_004 to reconnect with the core emotion of gratitude before attempting.',
          misconception: 'Students often think "peace" is the natural, default state of human society and that soldiers only fight when someone.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'English chapter c7_engl_ch05\': the skill or concept this node teaches, applied to',
                  options: ['From \'English chapter c7_engl_ch05\': the skill or concept this node teaches, applied to', 'Letters as a form of communication serve as a personal, tangible bridge between', 'This topic explores the historical context of India\'s post-independence wars, examining', 'The National War Memorial is a monumental tribute built to honour and remember soldiers'],
                  hint: 'Review c7_engl_ch05_004 to reconnect with the core emotion of gratitude before attempting critical.',
                  misconception: 'Students often think "peace" is the natural, default state of human society and that soldiers only fight when someone deliberately causes.' }
          ],
            remediations: { 'peace-is-the-natural': { steps: ['To fix this misconception, guide the student to contrast an unlocked house protected by a security system with an open.', 'Ask: \'Does the house stay safe because thieves are kind, or because the doors are locked and watched?\' Explain that.', 'Have them list three daily activities they enjoy safely and link each one to the vigilance required to protect it.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_011', difficulty: 'standard',
          question: 'The summary and context of the poem "Pushp ki Abhilasha" (The Flower\'s Desire).',
          hint: 'Review c7_engl_ch05_004 on patriotism and gratitude to soldiers to rebuild the thematic.',
          misconception: 'Students often think "Pushp ki Abhilasha" is a nature poem about gardening or flower arrangements because of the word.',
          parts: [
                { id: 'a', prompt: 'Why does the flower in the poem reject the idea of being offered to temple deities or resting on a king\'s crown?', answer: 'The flower rejects these honours',
                  options: ['The flower rejects these honours', 'Pushp ki Abhilasha'],
                  hint: 'Review c7_engl_ch05_004 on patriotism and gratitude to soldiers to rebuild the thematic context.',
                  misconception: 'Students often think "Pushp ki Abhilasha" is a nature poem about gardening or flower arrangements because of the word \'pushp\' (flower).' }
          ],
            remediations: { 'pushp-ki-abhilasha-is-a': { steps: ['To fix this, guide the student to look past the word \'flower\' and ask: \'Who walks on the path the flower wants to.', 'Remind them that poets use everyday objects like flowers as symbols to express intense love for the country.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_012', difficulty: 'standard',
          question: 'The metaphor of flowers as symbols of courage uses floral imagery to represent.',
          hint: 'Review Class 6 poetic devices, specifically how a symbol carries a deeper emotional.',
          misconception: 'Students often think that comparing a soldier to a flower means the poet is calling the soldier weak or delicate.',
          parts: [
                { id: 'a', prompt: 'What literary device compares the selfless bravery of a soldier directly to the quiet offering of a flower without using the words \'like\' or \'as\'?', answer: 'a metaphor',
                  options: ['a metaphor', 'simile'],
                  hint: 'Review Class 6 poetic devices, specifically how a symbol carries a deeper emotional meaning beyond.',
                  misconception: 'Students often think that comparing a soldier to a flower means the poet is calling the soldier weak or delicate.' }
          ],
            remediations: { 'comparing-a-soldier-to-a': { steps: ['Remind the student that in traditional and patriotic poetry, flowers represent purity, devotion, and a willing.', 'Ask them: "Does a flower give its fragrance away with sadness or with grace?" Guide them to see that the shedding.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
