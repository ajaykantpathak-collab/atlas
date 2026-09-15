import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch07 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch07: SimDef = {
    id: 'v3_c6_history_ch07',
    title: 'The Delhi Sultanate',
    subtitle: 'This node covers the transition of power under Qutbuddin Aibak and the timeline of the.',
    classLevel: 6, subject: 'history', topic: 'The Delhi Sultanate',
    chapters: ['c6_history_ch07'],
    nodeIds: ['c6_history_ch07_021', 'c6_history_ch07_022', 'c6_history_ch07_023', 'c6_history_ch07_024', 'c6_history_ch07_025', 'c6_history_ch07_026'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever seen a sports team get a new coach who changes how the whole game is played?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In 1206 a man who had once been enslaved declared himself the independent ruler of Delhi — and the empire he began lasted 320 years. How does a former slave become a Sultan?',
        options: ['Qutbuddin Aibak was a trusted general of Muhammad of Ghur who took charge after his leader died', 'He won a wrestling match against the old king', 'He was secretly a prince the whole time', 'The people of Delhi elected him in a vote'],
        answer: 'Qutbuddin Aibak was a trusted general of Muhammad of Ghur who took charge after his leader died',
        hook: 'Aibak did not conquer India alone from the start — he served another ruler first and declared independence only in 1206. And the Sultanate was not one family: five successive dynasties held the throne.',
    },
    teaching: [
        { title: 'The Founding of the Delhi Sultanate', text: 'The Delhi Sultanate was the first major Islamic empire established in northern India, beginning in 1206 CE when Qutbuddin Aibak declared himself the independent ruler of Delhi.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch07_021', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stand beside Aibak at the moment of decision in 1206 — weigh the risk of declaring independence, then follow the baton of power through the dynasties that ruled until 1526.',
        labels: ['The Founding of', 'Rulers of the Delhi', 'Administration Under the Delhi', 'Architecture of the Delhi', 'Life Under the Delhi', 'The Decline of'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch07_022', title: 'Rulers of the Delhi Sultanate',
          caseStudy: { intro: 'Imagine you are building a tower made of five different colored blocks, where each block represents a different ruling family.',
            decisions: [{ prompt: 'Who was the founder of the Slave (Mamluk) dynasty?', options: [
                { text: 'Qutbuddin Aibak founded the Slave dynasty', outcome: 'Qutbuddin Aibak founded the Slave dynasty. A wrong answer here suggests the student is mixing.' },
                { text: 'kingdom', outcome: 'Not quite — Students often think the Delhi Sultanate was a single "kingdom" ruled by one king for 300 years.', reveals: 'the-delhi-sultanate-was-a' },
                { text: 'Khalji', outcome: 'Not quite — Students often think the Delhi Sultanate was a single "kingdom" ruled by one king for 300 years.', reveals: 'the-delhi-sultanate-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch07_023', title: 'Administration Under the Delhi Sultanate',
          caseStudy: { intro: 'Imagine you are the captain of a school cricket team; you make the final decisions, but you need a wicketkeeper, a coach, and a strategist to help you win.',
            decisions: [{ prompt: 'Who held the supreme authority over all political and military decisions in the Delhi Sultanate?', options: [
                { text: 'The Sultan', outcome: 'The Sultan. If a student answers "the Wazir," they are confusing the head of government with the.' },
                { text: 'the Wazir', outcome: 'Not quite — Students often believe the Sultan did all the work by himself because he was the "supreme.', reveals: 'the-sultan-did-all-the' },
                { text: 'supreme authority', outcome: 'Not quite — Students often believe the Sultan did all the work by himself because he was the "supreme.', reveals: 'the-sultan-did-all-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch07_024', title: 'Architecture of the Delhi Sultanate',
          caseStudy: { intro: 'Imagine you are walking through a city and notice a building with a tall, circular tower and curved doorways instead of flat beams.',
            decisions: [{ prompt: 'What are two new structural features introduced by the architects of the Delhi Sultanate?', options: [
                { text: 'The two features are the dome and the arch', outcome: 'The two features are the dome and the arch. A student who misses this likely confuses Sultanate.' },
                { text: 'arch and dome', outcome: 'Not quite — Students often believe that "arch and dome" means the Sultanate builders brought their own finished.', reveals: 'arch-and-dome-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch07_026', title: 'The Decline of the Delhi Sultanate',
          caseStudy: { intro: 'Think of a large, old house that starts to crack because the family living inside is arguing about who is in charge.',
            decisions: [{ prompt: 'Who was the Mongol ruler that invaded Delhi in 1398, causing great destruction?', options: [
                { text: 'The ruler was Timur (also known as Tamerlane)', outcome: 'The ruler was Timur (also known as Tamerlane). A wrong answer suggests the student is confusing the.' },
                { text: 'the Delhi Sultanate ended abruptly with Timur’s invasion', outcome: 'Not quite — Students often think the Delhi Sultanate ended abruptly with Timur’s invasion.', reveals: 'the-delhi-sultanate-ended-abruptly' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch07_021', title: 'Use it in the wild',
          caseStudy: { intro: 'Making a timeline of Delhi\'s rulers for a school exhibition, a student marks the year 1206 with a big star. His partner asks, \'Why that year — kings came and went all the time, so why is this one a turning point?\'',
            decisions: [{ prompt: 'What makes 1206 worth the star?', options: [
                { text: 'It is when the Delhi Sultanate began — Qutbuddin Aibak, who had served as a general under Muhammad of Ghur, took the throne and started a new ruling line based in Delhi that would last about three centuries and five dynasties. A \'turning point\' marks the birth of a new order, not just a new king — and a historian would look for evidence like new coinage and inscriptions in the new dynasty\'s name.', outcome: 'The star marks a change in who ruled and how — a fresh dynasty with its own capital and institutions, not just another name on a list.' },
                { text: 'The partner is right — 1206 was just another succession, and calling it a turning point is exaggeration.', outcome: 'It began a durable new political order — the Sultanate reshaped northern India for centuries, which is what separates a turning point from a routine handover.', reveals: 'dates-are-arbitrary' },
                { text: 'The year only matters because Delhi got a new ruler — any new king would deserve the same star.', outcome: 'New kings were routine; what made 1206 different was that a new dynasty and form of rule began, which is the kind of change worth marking.', reveals: 'every-succession-is-turning-point' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch07_026', title: 'You made it',
          caseStudy: { intro: 'Skill and loyalty could outrank royal birth. One act of independence in 1206 opened three centuries of Sultanate rule.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch07_021', difficulty: 'standard',
          question: 'The Delhi Sultanate was the first major Islamic empire established in northern.',
          hint: 'Review the definition of a \'dynasty\' and how power is passed down or seized.',
          misconception: 'Students often think Qutbuddin Aibak conquered India all by himself as an independent king from the start.',
          parts: [
                { id: 'a', prompt: 'Calculation: 1526 minus 1206 equals 320 years. A wrong answer reveals a struggle with basic chronological subtraction, which is vital for understanding.', answer: 'The Delhi Sultanate lasted for a total of 320 years',
                  options: ['The Delhi Sultanate lasted for a total of 320 years', 'duration'],
                  hint: 'Review the definition of a \'dynasty\' and how power is passed down or seized.',
                  misconception: 'Students often think Qutbuddin Aibak conquered India all by himself as an independent king from the start.' }
          ],
            remediations: { 'qutbuddin-aibak-conquered-india-all': { steps: ['Ask the student to draw a timeline showing two people: Muhammad of Ghur and Qutbuddin Aibak.', 'Ask them to write "1206" above the point where their roles switch.', 'Explain that Aibak was a "general" (a team member) before he became a "Sultan" (the captain).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch07_021', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Qutbuddin Aibak conquered India all by himself as an independent king from the start.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to say the Delhi Sultanate was ruled by only one family for 300 years? Why or why not?', answer: 'No, it was ruled by five successive dynasties',
                  options: ['No, it was ruled by five successive dynasties', 'Sultanate'],
                  hint: 'Review the definition of a \'dynasty\' and how power is passed down or seized.',
                  misconception: 'Students often think Qutbuddin Aibak conquered India all by himself as an independent king from the start.' }
          ],
            remediations: { 'qutbuddin-aibak-conquered-india-all': { steps: ['Ask the student to draw a timeline showing two people: Muhammad of Ghur and Qutbuddin Aibak.', 'Ask them to write "1206" above the point where their roles switch.', 'Explain that Aibak was a "general" (a team member) before he became a "Sultan" (the captain).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch07_022', difficulty: 'standard',
          question: 'The Delhi Sultanate refers to the period between 1206 and 1526 CE when five.',
          hint: 'Review the definition of a "dynasty" in the glossary or previous chapter.',
          misconception: 'Students often think the Delhi Sultanate was a single "kingdom" ruled by one king for 300 years.',
          parts: [
                { id: 'a', prompt: 'Who was the founder of the Slave (Mamluk) dynasty?', answer: 'Qutbuddin Aibak founded the Slave dynasty',
                  options: ['Qutbuddin Aibak founded the Slave dynasty', 'kingdom', 'Khalji', 'the Delhi Sultanate was a single "kingdom" ruled by one king for 300 years'],
                  hint: 'Review the definition of a "dynasty" in the glossary or previous chapter.',
                  misconception: 'Students often think the Delhi Sultanate was a single "kingdom" ruled by one king for 300 years.' },
                { id: 'b', prompt: 'Why is Razia Sultan considered a unique figure in the history of the Delhi Sultanate?', answer: 'She was the only woman to ever rule the Delhi Sultanate',
                  options: ['She was the only woman to ever rule the Delhi Sultanate', 'kingdom', 'Khalji', 'the Delhi Sultanate was a single "kingdom" ruled by one king for 300 years'],
                  hint: 'Review the definition of a "dynasty" in the glossary or previous chapter.',
                  misconception: 'Students often think the Delhi Sultanate was a single "kingdom" ruled by one king for 300 years.' },
                { id: 'c', prompt: 'If you were living in the year 1300 CE, which dynasty would you be living under?', answer: 'You would be under the Khalji dynasty',
                  options: ['You would be under the Khalji dynasty', 'kingdom', 'Khalji', 'the Delhi Sultanate was a single "kingdom" ruled by one king for 300 years'],
                  hint: 'Review the definition of a "dynasty" in the glossary or previous chapter.',
                  misconception: 'Students often think the Delhi Sultanate was a single "kingdom" ruled by one king for 300 years.' }
          ],
            remediations: { 'the-delhi-sultanate-was-a': { steps: ['First, ask the student to draw a timeline with five boxes.', 'Label each box with the name of a dynasty.', 'Explain that each box represents a new family taking charge, much like changing the captain of a sports team.', 'Have them read the names aloud to distinguish the distinct "sounds" of each dynasty.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch07_023', difficulty: 'standard',
          question: 'The administration of the Delhi Sultanate was a centralized system where the.',
          hint: 'Review the definition of a "Sultan" and the general idea of an empire.',
          misconception: 'Students often believe the Sultan did all the work by himself because he was the "supreme authority." They fail to see.',
          parts: [
                { id: 'a', prompt: 'Who held the supreme authority over all political and military decisions in the Delhi Sultanate?', answer: 'The Sultan',
                  options: ['The Sultan', 'the Wazir', 'supreme authority', 'supreme'],
                  hint: 'Review the definition of a "Sultan" and the general idea of an empire.',
                  misconception: 'Students often believe the Sultan did all the work by himself because he was the "supreme authority." They fail to see that "supreme" means.' },
                { id: 'b', prompt: 'If a Sultan wanted to send a formal letter to a neighboring ruler, which minister would he consult?', answer: 'The Diwan-i-Insha',
                  options: ['The Diwan-i-Insha', 'Diwan-i-Rasalat', 'supreme authority', 'supreme'],
                  hint: 'Review the definition of a "Sultan" and the general idea of an empire.',
                  misconception: 'Students often believe the Sultan did all the work by himself because he was the "supreme authority." They fail to see that "supreme" means.' },
                { id: 'c', prompt: 'How does the division of tasks between the Wazir and the Diwan-i-Arz illustrate the Sultan\'s need for specialization?', answer: 'It shows the Sultan needed experts to handle specific complex areas like general',
                  options: ['It shows the Sultan needed experts to handle specific complex areas like general', 'specialization', 'supreme authority', 'supreme'],
                  hint: 'Review the definition of a "Sultan" and the general idea of an empire.',
                  misconception: 'Students often believe the Sultan did all the work by himself because he was the "supreme authority." They fail to see that "supreme" means.' }
          ],
            remediations: { 'the-sultan-did-all-the': { steps: ['Ask the student to draw a hierarchy chart: Put the Sultan at the top, then draw lines to four boxes representing the.', 'Ask them to write one sentence for each minister describing what they do so the Sultan doesn\'t have to.', 'This visualizes the delegation of power.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch07_024', difficulty: 'standard',
          question: 'The architecture of the Delhi Sultanate refers to the construction style.',
          hint: 'Review basic structural components like pillars, beams, and walls.',
          misconception: 'Students often believe that "arch and dome" means the Sultanate builders brought their own finished stones from Central.',
          parts: [
                { id: 'a', prompt: 'What are two new structural features introduced by the architects of the Delhi Sultanate?', answer: 'The two features are the dome and the arch',
                  options: ['The two features are the dome and the arch', 'arch and dome'],
                  hint: 'Review basic structural components like pillars, beams, and walls.',
                  misconception: 'Students often believe that "arch and dome" means the Sultanate builders brought their own finished stones from Central Asia.' }
          ],
            remediations: { 'arch-and-dome-means-the': { steps: ['Review the concept of "cultural blending." Ask the student: "If you have a recipe for a dish from one place but use.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch07_025', difficulty: 'standard',
          question: 'Life under the Delhi Sultanate was a period where an Islamic ruling class.',
          hint: 'Review the definition of "diverse" and "majority" to ensure they understand that.',
          misconception: 'Students often think that because the state was Islamic, everyone in the territory was forced to convert to Islam.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Life under the Delhi Sultanate was a period where an Islamic ruling class governed a',
                  options: ['Life under the Delhi Sultanate was a period where an Islamic ruling class governed a', 'The Delhi Sultanate was the first major Islamic empire established in northern India,', 'The Delhi Sultanate refers to the period between 1206 and 1526 CE when five successive', 'The administration of the Delhi Sultanate was a centralized system where the Sultan acted'],
                  hint: 'Review the definition of "diverse" and "majority" to ensure they understand that population density.',
                  misconception: 'Students often think that because the state was Islamic, everyone in the territory was forced to convert to Islam.' }
          ],
            remediations: { 'because-the-state-was-islamic': { steps: ['First, ask the student to think about their own city or town—are there people of many different faiths there?', 'Explain that the Delhi Sultanate functioned similarly, where the government was one religion, but the towns and.', 'Show them that if a ruler forced everyone to change, it would have caused constant rebellions, which the Sultans.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch07_026', difficulty: 'standard',
          question: 'The decline of the Delhi Sultanate refers to the gradual weakening and eventual.',
          hint: 'Review the earlier chapters on the Tughlaq dynasty\'s expansion to understand what was.',
          misconception: 'Students often think the Delhi Sultanate ended abruptly with Timur’s invasion.',
          parts: [
                { id: 'a', prompt: 'Who was the Mongol ruler that invaded Delhi in 1398, causing great destruction?', answer: 'The ruler was Timur (also known as Tamerlane)',
                  options: ['The ruler was Timur (also known as Tamerlane)', 'the Delhi Sultanate ended abruptly with Timur’s invasion'],
                  hint: 'Review the earlier chapters on the Tughlaq dynasty\'s expansion to understand what was lost.',
                  misconception: 'Students often think the Delhi Sultanate ended abruptly with Timur’s invasion.' }
          ],
            remediations: { 'the-delhi-sultanate-ended-abruptly': { steps: ['Ask the student to look at a timeline of the dynasties (Tughlaq, Sayyid, Lodi).', 'Point out that the dates of the Lodi dynasty go up to 1526, long after 1398.', 'Explain that "decline" means a slow process of getting weaker, not a single event that wipes everything out instantly.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
