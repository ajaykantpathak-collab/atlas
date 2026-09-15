import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch05_p3: SimDef = {
    id: 'v3_c7_engl_ch05_p3',
    title: 'Bravehearts: A Homage to Our Brave Soldiers · Part 3/3',
    subtitle: 'This node covers analyzing how patriotic themes and sacrifice are expressed through.',
    classLevel: 7, subject: 'engl', topic: 'Bravehearts: A Homage to Our Brave Soldiers · Part 3/3',
    chapters: ['c7_engl_ch05'],
    nodeIds: ['c7_engl_ch05_013', 'c7_engl_ch05_014', 'c7_engl_ch05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine standing in silence at the National War Memorial in New Delhi, looking at the glowing names etched.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A soldier at a far border post could send a quick digital message — but instead writes a letter beginning with three words that change everything: a greeting so warm the family reads it twice. Why does the handwritten letter matter more?',
        options: ['It carries physical intimacy — handwriting, ink, and a moment frozen in paper that digital messages cannot hold', 'It is faster than any phone', 'It costs nothing at all to send', 'It is required by military law'],
        answer: 'It carries physical intimacy — handwriting, ink, and a moment frozen in paper that digital messages cannot hold',
        hook: 'Letter format is only the envelope — the heart of a letter is the emotion inside. An affectionate opening sets an intimate tone, and literature loves letters because they reveal inner thoughts with no narrator filtering them.',
    },
    teaching: [
        { title: 'Poem: Theme of Sacrifice and Patriotism in the Poem', text: 'The theme of sacrifice and patriotism in a poem refers to the central message honouring the selfless devotion, courage, and ultimate dedication of soldiers who lay down their lives to protect their.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch05_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Write the opening paragraph of a letter from a soldier to a younger sibling — balance warmth with duty — then mark the salutation, the reassurance, and the feeling hiding between the lines.',
        labels: ['Poem: Theme of Sacrifice', 'Poem: Comparing the Poem', 'Writing: Structuring a Comparative'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch05_013', title: 'Poem: Theme of Sacrifice and Patriotism in the Poem',
          caseStudy: { intro: 'Imagine standing in silence at the National War Memorial in New Delhi, looking at the glowing names etched on the stone walls, and wondering what drives.',
            decisions: [{ prompt: 'What is the primary theme explored in poems dedicated to fallen soldiers and war heroes?', options: [
                { text: 'The primary theme is selfless sacrifice, patriotism, and enduring gratitude toward those', outcome: 'The primary theme is selfless sacrifice, patriotism, and enduring gratitude toward those who.' },
                { text: 'nature and travel', outcome: 'Not quite — Students often confuse general sadness or grief in a poem with the specific theme of patriotism and.', reveals: 'students-often-confuse-general-sadness' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_015', title: 'Writing: Structuring a Comparative Literature Answer',
          caseStudy: { intro: 'Imagine you just read a heartfelt letter about the National War Memorial in prose and a passionate poem about a soldier\'s sacrifice, and your teacher asks you.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in structured writing?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, and Link', outcome: 'PEEL stands for Point, Evidence, Explanation, and Link. A wrong answer—such as guessing "Plot.' },
                { text: 'Plot, Editing, Expression, Language', outcome: 'Not quite — Students often write two completely separate mini-essays—one paragraph entirely about the prose.', reveals: 'students-often-write-two-completely' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A student wants to answer a soldier\'s published letter that ends: \'Do not worry about the cold nights here; the warmth of serving our nation keeps every soldier going.\' Her first draft begins by listing facts about the glacier\'s weather.',
            decisions: [{ prompt: 'What is the soldier doing in that line — and how should her reply meet it?', options: [
                { text: 'He is using contrast to manage his family\'s worry — \'cold nights\' named honestly, then answered by \'the warmth of serving,\' turning hardship into reassurance rather than hiding it. Her reply should meet that tone: acknowledge the sacrifice, return warmth for warmth — a respectful, personal letter, not a weather report, because the letter form exists to carry feeling across the distance.', outcome: 'The line works because the letter lets him balance truth and comfort — and a reply that honours the theme of sacrifice in the same personal register completes the exchange.' },
                { text: 'He is simply reporting conditions — so her factual reply about the glacier\'s weather is the right register.', outcome: 'The line is emotional craft, not a weather report — it sets hardship against purpose to reassure readers, and a facts-only reply would miss the letter entirely.', reveals: 'letters-are-reports' },
                { text: 'He is complaining indirectly — \'cold nights\' is a coded plea for help that should be answered with alarm.', outcome: 'The contrast does the opposite — he names the cold only to dissolve the worry in the warmth of duty; reading it as complaint inverts the reassurance.', reveals: 'reassurance-is-complaint' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch05_015', title: 'You made it',
          caseStudy: { intro: 'A letter is a conversation across distance that you can hold in your hands. Long after the ink dries, the feeling stays.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch05_013', difficulty: 'standard',
          question: 'The theme of sacrifice and patriotism in a poem refers to the central message.',
          hint: 'Review poetic imagery and how authors use symbol and metaphor to express abstract ideas.',
          misconception: 'Students often confuse general sadness or grief in a poem with the specific theme of patriotism and sacrifice, assuming.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theme of sacrifice and patriotism in a poem refers to the central message honouring',
                  options: ['The theme of sacrifice and patriotism in a poem refers to the central message honouring', 'Letters as a form of communication serve as a personal, tangible bridge between', 'This topic explores the historical context of India\'s post-independence wars, examining', 'The National War Memorial is a monumental tribute built to honour and remember soldiers'],
                  hint: 'Review poetic imagery and how authors use symbol and metaphor to express abstract ideas like.',
                  misconception: 'Students often confuse general sadness or grief in a poem with the specific theme of patriotism and sacrifice, assuming any poem about.' }
          ],
            remediations: { 'students-often-confuse-general-sadness': { steps: ['To fix this misconception, guide the student to look specifically for the "who" and the "why" in the poem.', 'Ask: Is the person being honored protecting an individual family member at home, or are they guarding the borders for.', 'Show them how to highlight words related to the country, soil, duty, and freedom to separate personal grief from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_014', difficulty: 'standard',
          question: 'Comparing poetry and prose on soldiers involves analyzing how different.',
          hint: 'Review the basic traits of poetry (metaphor, rhythm, stanzas) versus prose (sentences.',
          misconception: 'Students often think that because a poem and a prose passage are about the same topic (soldiers), they must use the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing poetry and prose on soldiers involves analyzing how different literary',
                  options: ['Comparing poetry and prose on soldiers involves analyzing how different literary', 'Letters as a form of communication serve as a personal, tangible bridge between', 'This topic explores the historical context of India\'s post-independence wars, examining', 'The National War Memorial is a monumental tribute built to honour and remember soldiers'],
                  hint: 'Review the basic traits of poetry (metaphor, rhythm, stanzas) versus prose (sentences, paragraphs.',
                  misconception: 'Students often think that because a poem and a prose passage are about the same topic (soldiers), they must use the exact same techniques.' }
          ],
            remediations: { 'because-a-poem-and-a': { steps: ['When a student struggles to see the difference between prose and poetry on the same topic, guide them to read a prose.', 'Ask: \'Does this text tell us a direct fact, or does it paint a picture using sound and comparison?\' Have them highlight.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch05_015', difficulty: 'standard',
          question: 'Writing a comparative literature answer involves analyzing two or more literary.',
          hint: 'Review c7_engl_ch05_014 to practice listing similarities and differences between the.',
          misconception: 'Students often write two completely separate mini-essays—one paragraph entirely about the prose text and another.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in structured writing?', answer: 'PEEL stands for Point, Evidence, Explanation, and Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, and Link', 'Plot, Editing, Expression, Language'],
                  hint: 'Review c7_engl_ch05_014 to practice listing similarities and differences between the prose and poem.',
                  misconception: 'Students often write two completely separate mini-essays—one paragraph entirely about the prose text and another entirely about the.' }
          ],
            remediations: { 'students-often-write-two-completely': { steps: ['If a student writes disconnected summaries, stop and guide them using a physical side-by-side comparison chart.', 'Ask: "What word does the prose use for sacrifice, and what image does the poem use for the exact same idea?" Instruct.', 'Emphasize that a true comparative answer blends both texts within the same paragraph to show how different forms.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
