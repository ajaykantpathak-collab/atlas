import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch05_p1: SimDef = {
    id: 'v3_c7_engl_ch05_p1',
    title: 'Bravehearts: A Homage to Our Brave Soldiers · Part 1/3',
    subtitle: 'This node covers the epistolary form, structural elements of letters (sender\'s address.',
    classLevel: 7, subject: 'engl', topic: 'Bravehearts: A Homage to Our Brave Soldiers · Part 1/3',
    chapters: ['c7_engl_ch05'],
    nodeIds: ['c7_engl_ch05_001', 'c7_engl_ch05_002', 'c7_engl_ch05_003', 'c7_engl_ch05_004', 'c7_engl_ch05_005', 'c7_engl_ch05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Have you ever received a handwritten birthday card or a letter from a grandparent living in a different city.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A soldier at a far border post could send a quick digital message — but instead writes a letter beginning with three words that change everything: a greeting so warm the family reads it twice. Why does the handwritten letter matter more?',
        options: ['It carries physical intimacy — handwriting, ink, and a moment frozen in paper that digital messages cannot hold', 'It is faster than any phone', 'It costs nothing at all to send', 'It is required by military law'],
        answer: 'It carries physical intimacy — handwriting, ink, and a moment frozen in paper that digital messages cannot hold',
        hook: 'Letter format is only the envelope — the heart of a letter is the emotion inside. An affectionate opening sets an intimate tone, and literature loves letters because they reveal inner thoughts with no narrator filtering them.',
    },
    teaching: [
        { title: 'Text Type: Letters as a Form of Communication', text: 'Letters as a form of communication serve as a personal, tangible bridge between individuals separated by distance, carrying not just information but deep emotional resonance, thoughts, and historical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Write the opening paragraph of a letter from a soldier to a younger sibling — balance warmth with duty — then mark the salutation, the reassurance, and the feeling hiding between the lines.',
        labels: ['Text Type: Letters as', 'Context: India\'s Wars', 'The National War Memorial', 'Theme: Patriotism and Gratitude', 'Plot: A Student\'s Educational', 'The Concept of Homage'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch05_001', title: 'Text Type: Letters as a Form of Communication',
          caseStudy: { intro: 'Have you ever received a handwritten birthday card or a letter from a grandparent living in a different city, and felt how much warmer it feels compared to.',
            decisions: [{ prompt: 'What are the standard structural components required in a traditional personal letter?', options: [
                { text: 'A traditional personal letter includes the sender\'s address, date, salutation (greeting),', outcome: 'A traditional personal letter includes the sender\'s address, date, salutation (greeting), body.' },
                { text: 'Respected Sir', outcome: 'Not quite — Students often believe that letter writing is merely a set of rigid rules about where to put commas.', reveals: 'letter-writing-is-merely-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_004', title: 'Theme: Patriotism and Gratitude to Soldiers',
          caseStudy: { intro: 'Imagine standing silently before the flame at the National War Memorial, reading names etched in stone, and wondering what drives a person to leave their.',
            decisions: [{ prompt: 'What is the primary emotional purpose of visiting a national war memorial or reading a homage dedicated to soldiers?', options: [
                { text: 'The primary purpose is to cultivate deep gratitude and remember the personal sacrifices', outcome: 'The primary purpose is to cultivate deep gratitude and remember the personal sacrifices made.' },
                { text: 'to memorize historical dates', outcome: 'Not quite — Students often confuse "patriotism" with loud displays of nationalism or political slogans, missing.', reveals: 'students-often-confuse-patriotism-with' },
                { text: 'to read about military weapons', outcome: 'Not quite — Students often confuse "patriotism" with loud displays of nationalism or political slogans, missing.', reveals: 'students-often-confuse-patriotism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_005', title: 'Plot: A Student\'s Educational Trip to the Memorial',
          caseStudy: { intro: 'Imagine you are visiting a place like the National War Memorial in Delhi with your school class—how do your feelings change from the noisy excitement of the.',
            decisions: [{ prompt: 'What is the very first stage of plot development in a story about an educational school trip to a memorial?', options: [
                { text: 'the introduction or setting the scene', outcome: 'The correct answer is the introduction or setting the scene, which includes the anticipation of the.' },
                { text: 'First we went to gate A, then we walked to gate B, then we went to the gift shop', outcome: 'Not quite — Students often believe that plot in an informational-style narrative means a simple list of tour.', reveals: 'plot-in-an-informational-style' },
                { text: 'plot in an informational-style narrative means a simple list of tour stops (e', outcome: 'Not quite — Students often believe that plot in an informational-style narrative means a simple list of tour.', reveals: 'plot-in-an-informational-style' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_006', title: 'The Concept of Homage: Honouring Sacrifices',
          caseStudy: { intro: 'Imagine standing silently in front of a massive black stone wall inscribed with thousands of names, where an eternal flame burns day and night.',
            decisions: [{ prompt: 'What is the primary literary and cultural meaning of paying \'homage\' to soldiers?', options: [
                { text: 'Homage is a formal expression of respect, honour, and public gratitude given to', outcome: 'Homage is a formal expression of respect, honour, and public gratitude given to individuals who.' },
                { text: 'thank you', outcome: 'Not quite — Students often believe that paying \'homage\' is just a synonym for saying "thank you" or feeling sad.', reveals: 'paying-homage-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student wants to answer a soldier\'s published letter that ends: \'Do not worry about the cold nights here; the warmth of serving our nation keeps every soldier going.\' Her first draft begins by listing facts about the glacier\'s weather.',
            decisions: [{ prompt: 'What is the soldier doing in that line — and how should her reply meet it?', options: [
                { text: 'He is using contrast to manage his family\'s worry — \'cold nights\' named honestly, then answered by \'the warmth of serving,\' turning hardship into reassurance rather than hiding it. Her reply should meet that tone: acknowledge the sacrifice, return warmth for warmth — a respectful, personal letter, not a weather report, because the letter form exists to carry feeling across the distance.', outcome: 'The line works because the letter lets him balance truth and comfort — and a reply that honours the theme of sacrifice in the same personal register completes the exchange.' },
                { text: 'He is simply reporting conditions — so her factual reply about the glacier\'s weather is the right register.', outcome: 'The line is emotional craft, not a weather report — it sets hardship against purpose to reassure readers, and a facts-only reply would miss the letter entirely.', reveals: 'letters-are-reports' },
                { text: 'He is complaining indirectly — \'cold nights\' is a coded plea for help that should be answered with alarm.', outcome: 'The contrast does the opposite — he names the cold only to dissolve the worry in the warmth of duty; reading it as complaint inverts the reassurance.', reveals: 'reassurance-is-complaint' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_006', title: 'The bigger picture',
          caseStudy: { intro: 'A letter is a conversation across distance that you can hold in your hands. Long after the ink dries, the feeling stays.',
            decisions: [{ prompt: 'What comes next? Bravehearts: A Homage to Our Brave Soldiers · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Bravehearts: A Homage to Our Brave Soldiers · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch05_001', difficulty: 'standard',
          question: 'Letters as a form of communication serve as a personal, tangible bridge between.',
          hint: 'Review Class 6 basic letter writing templates, specifically noting the difference between.',
          misconception: 'Students often believe that letter writing is merely a set of rigid rules about where to put commas and addresses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Letters as a form of communication serve as a personal, tangible bridge between',
                  options: ['Letters as a form of communication serve as a personal, tangible bridge between', 'This topic explores the historical context of India\'s post-independence wars, examining', 'The National War Memorial is a monumental tribute built to honour and remember soldiers', 'The theme of patriotism and gratitude to soldiers refers to the deep emotional bond,'],
                  hint: 'Review Class 6 basic letter writing templates, specifically noting the difference between sender.',
                  misconception: 'Students often believe that letter writing is merely a set of rigid rules about where to put commas and addresses, completely missing the.' }
          ],
            remediations: { 'letter-writing-is-merely-a': { steps: ['If a student reduces letters to mechanical formatting, guide them by asking: "If you were far away from home facing.', 'Emphasize that format is just the envelope; the heart of the letter is the message inside.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_002', difficulty: 'standard',
          question: 'This topic explores the historical context of India\'s post-independence wars.',
          hint: 'Review basic timeline skills and re-read the introductory letter in Chapter 5 about.',
          misconception: 'Students often confuse the various post-independence wars (1948, 1962, 1965, 1971, 1999) as a single continuous event.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the historical context of India\'s post-independence wars, examining',
                  options: ['This topic explores the historical context of India\'s post-independence wars, examining', 'Letters as a form of communication serve as a personal, tangible bridge between', 'The National War Memorial is a monumental tribute built to honour and remember soldiers', 'The theme of patriotism and gratitude to soldiers refers to the deep emotional bond,'],
                  hint: 'Review basic timeline skills and re-read the introductory letter in Chapter 5 about soldiers and.',
                  misconception: 'Students often confuse the various post-independence wars (1948, 1962, 1965, 1971, 1999) as a single continuous event or blend the causes.' }
          ],
            remediations: { 'students-often-confuse-the-various': { steps: ['If a student struggles to distinguish between India\'s wars, use a chronological timeline sorting activity.', 'First, draw a simple timeline on the board from 1947 to 2000.', 'Second, point to each major conflict year (1948, 1962, 1965, 1971, 1999) and pair it with its primary adversary and.', 'Third, ask the student to repeat back one key fact about each conflict using a flashcard.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_003', difficulty: 'standard',
          question: 'The National War Memorial is a monumental tribute built to honour and remember.',
          hint: 'Review Class 6 Prose unit on military history and the basics of national memorials before.',
          misconception: 'Students often confuse the National War Memorial (built for post-independence conflicts) with India Gate (built during.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The National War Memorial is a monumental tribute built to honour and remember soldiers',
                  options: ['The National War Memorial is a monumental tribute built to honour and remember soldiers', 'Letters as a form of communication serve as a personal, tangible bridge between', 'This topic explores the historical context of India\'s post-independence wars, examining', 'The theme of patriotism and gratitude to soldiers refers to the deep emotional bond,'],
                  hint: 'Review Class 6 Prose unit on military history and the basics of national memorials before tackling.',
                  misconception: 'Students often confuse the National War Memorial (built for post-independence conflicts) with India Gate (built during the British era for.' }
          ],
            remediations: { 'students-often-confuse-the-national': { steps: ['Gently remind the student of the timeline by asking: "When did India gain independence?" Then explain that India Gate.', 'Have them write down the distinct time periods for each monument to reinforce the difference.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_004', difficulty: 'standard',
          question: 'The theme of patriotism and gratitude to soldiers refers to the deep emotional.',
          hint: 'Review Class 6 Prose unit on soldier homages to reconnect with basic vocabulary.',
          misconception: 'Students often confuse "patriotism" with loud displays of nationalism or political slogans, missing the emotional core.',
          parts: [
                { id: 'a', prompt: 'A student wants to express gratitude to a soldier in a school assembly speech.', answer: 'Reciting a poem about how civilian freedom is sustained by frontline sacrifice',
                  options: ['Reciting a poem about how civilian freedom is sustained by frontline sacrifice', 'patriotism'],
                  hint: 'Review Class 6 Prose unit on soldier homages to reconnect with basic vocabulary of respect and.',
                  misconception: 'Students often confuse "patriotism" with loud displays of nationalism or political slogans, missing the emotional core of gratitude.' }
          ],
            remediations: { 'students-often-confuse-patriotism-with': { steps: ['When a student reduces patriotism to mere slogans, guide them back to the text using targeted questioning: "Look at the.', 'This grounds abstract pride in concrete human empathy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_005', difficulty: 'standard',
          question: 'The plot of a student\'s educational trip to a memorial is the sequential.',
          hint: 'Review the plot breakdown of Class 6 stories like \'The Tunnel\' to see how moving through.',
          misconception: 'Students often believe that plot in an informational-style narrative means a simple list of tour stops (e.g., "First.',
          parts: [
                { id: 'a', prompt: 'What is the very first stage of plot development in a story about an educational school trip to a memorial?', answer: 'the introduction or setting the scene',
                  options: ['the introduction or setting the scene', 'First we went to gate A, then we walked to gate B, then we went to the gift shop', 'plot in an informational-style narrative means a simple list of tour stops (e'],
                  hint: 'Review the plot breakdown of Class 6 stories like \'The Tunnel\' to see how moving through a space.',
                  misconception: 'Students often believe that plot in an informational-style narrative means a simple list of tour stops (e.g., "First we went to gate.' }
          ],
            remediations: { 'plot-in-an-informational-style': { steps: ['If a student reduces the plot to a mere sightseeing itinerary, guide them by asking: "How did the student feel when.', 'What specific sight changed their mood?" Teach them to separate the physical itinerary (where they went) from the.', 'Have them underline action verbs and emotion words in the text to see the dual journey.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that plot in an informational-style narrative means a simple list of tour stops (e.g., "First.',
          parts: [
                { id: 'a', prompt: 'Draft a 3-sentence plot outline for a new story about a student visiting the National War Memorial, ensuring a clear beginning, middle emotional turning point.', answer: 'A strong answer features: (1) An arrival scene at the memorial gates with eager',
                  options: ['A strong answer features: (1) An arrival scene at the memorial gates with eager', 'First we went to gate A, then we walked to gate B, then we went to the gift shop', 'plot in an informational-style narrative means a simple list of tour stops (e'],
                  hint: 'Review the plot breakdown of Class 6 stories like \'The Tunnel\' to see how moving through a space.',
                  misconception: 'Students often believe that plot in an informational-style narrative means a simple list of tour stops (e.g., "First we went to gate.' }
          ],
            remediations: { 'plot-in-an-informational-style': { steps: ['If a student reduces the plot to a mere sightseeing itinerary, guide them by asking: "How did the student feel when.', 'What specific sight changed their mood?" Teach them to separate the physical itinerary (where they went) from the.', 'Have them underline action verbs and emotion words in the text to see the dual journey.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_006', difficulty: 'standard',
          question: 'The concept of homage is a deep, respectful tribute or formal expression.',
          hint: 'Review Class 6 Prose: "A Homage to Our Brave Soldiers" -- Theme: Patriotism to reconnect.',
          misconception: 'Students often believe that paying \'homage\' is just a synonym for saying "thank you" or feeling sad about a war.',
          parts: [
                { id: 'a', prompt: 'What is the primary literary and cultural meaning of paying \'homage\' to soldiers?', answer: 'Homage is a formal expression of respect, honour, and public gratitude given to',
                  options: ['Homage is a formal expression of respect, honour, and public gratitude given to', 'thank you'],
                  hint: 'Review Class 6 Prose: "A Homage to Our Brave Soldiers" -- Theme: Patriotism to reconnect with basic.',
                  misconception: 'Students often believe that paying \'homage\' is just a synonym for saying "thank you" or feeling sad about a war.' }
          ],
            remediations: { 'paying-homage-is-just-a': { steps: ['If a student struggles, guide them with these steps: (1) Ask them to define what they do at a family funeral.', '(2) Explain that homage is a public ritual of remembrance, not just a passing thought.', '(3) Show them how symbols like wreaths and eternal flames turn private sadness into shared national respect.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
