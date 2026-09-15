import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch01_p3: SimDef = {
    id: 'v3_c11_eng_w_ch01_p3',
    title: 'The Lament (Short Story) · Part 3/3',
    subtitle: 'Find the climax inside a grieving man, not in the loudest scene.',
    classLevel: 11, subject: 'eng_w', topic: 'The Lament (Short Story) · Part 3/3',
    chapters: ['c11_eng_w_ch01'],
    nodeIds: ['c11_eng_w_cbse_01_013', 'c11_eng_w_cbse_01_014', 'c11_eng_w_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener shadowing an invisible cabdriver', intro: 'Twilight snow, a phantom cabby, a son newly buried — everyone rides, nobody hears.', goal: 'Distinguish a story of character from a story of incident and locate its internal climax.' },
    discovery: {
        question: 'A cabdriver\'s son has died and he can\'t get a single passenger to listen. Where does Chekhov place the climax — the shouting drunks, or somewhere quieter?',
        options: ['The quiet turn inward — after the last fare leaves, his grief \'rends his heart with greater force\' and he sees the totality of his isolation', 'The brawl with the three young men — loudest scene equals climax', 'The officer\'s first call for a cab', 'The stable scene, because that\'s where the story ends'],
        answer: 'The quiet turn inward — after the last fare leaves, his grief \'rends his heart with greater force\' and he sees the totality of his isolation',
        hook: 'The rowdy passengers are noise on the way up — in a story of character, the climax is a realisation, not a collision.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of actively examining a text\'s components—such as narrative structure, character motivation, symbolism, and authorial choices—to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_01_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark each fare as a failed attempt to speak, find the internal climax, and decide whether the circular ending on the horse is stasis or release.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a detective arriving at a crime scene where the "crime" is human indifference—you see a cabdriver, a horse, and three fares who refuse.',
            decisions: [{ prompt: 'What is the structural significance of the story beginning and ending with Iona and his horse in near-identical stillness?', options: [
                { text: 'The circular structure frames the narrative as a closed loop of isolation: Iona begins', outcome: 'The circular structure frames the narrative as a closed loop of isolation: Iona begins and ends.' },
                { text: 'the story starts and ends similarly', outcome: 'Not quite — Students often believe "critical thinking" means offering a personal opinion ("I think the story.', reveals: 'critical-thinking-means-offering-a' },
                { text: 'critical thinking', outcome: 'Not quite — Students often believe "critical thinking" means offering a personal opinion ("I think the story.', reveals: 'critical-thinking-means-offering-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re sitting in the exam hall and the question reads: "How does Chekhov use the horse as a symbol in \'The Lament\'?',
            decisions: [{ prompt: 'Define the PEEL structure for literary analysis answers and state the function of each component in a single sentence.', options: [
                { text: 'PEEL stands for Point (topic sentence stating the analytical claim), Evidence (textual', outcome: 'PEEL stands for Point (topic sentence stating the analytical claim), Evidence (textual support.' },
                { text: 'Point, Example, Explanation, Conclusion', outcome: 'Not quite — Students believe "Writing Skills based on the chapter" means retelling the story in their own words.', reveals: 'writing-skills-based-on-the' },
                { text: 'Example', outcome: 'Not quite — Students believe "Writing Skills based on the chapter" means retelling the story in their own words.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a college admission group discussion where the topic is "Is technology making us more lonely?" You notice that the loudest voices dominate.',
            decisions: [{ prompt: 'What are the two discussion prompts given under "Talking About the Text" in the NCERT textbook for "The Lament"?', options: [
                { text: 'The two prompts are: (1) "Empathy and understanding are going out of modern society', outcome: 'The two prompts are: (1) "Empathy and understanding are going out of modern society.' },
                { text: 'sharing opinions', outcome: 'Not quite — Students believe a literary discussion is "sharing opinions" where all views are equally valid.', reveals: 'a-literary-discussion-is-sharing' },
                { text: 'personal response', outcome: 'Not quite — Students believe a literary discussion is "sharing opinions" where all views are equally valid.', reveals: 'a-literary-discussion-is-sharing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your film club is adapting Chekhov\'s \'The Lament\' — a St. Petersburg cabdriver whose son just died tries to tell his passengers, who won\'t listen. The director wants to cut the snow-and-dusk opening and add a funeral flashback: \'Give the audience the sad event directly.\'',
            decisions: [{ prompt: 'Does the rewrite honour how Chekhov builds grief?', options: [
                { text: 'No — Chekhov\'s method is objective observation: the snow, the \'phantom\' cabdriver hunched motionless, the \'gingerbread horse\' mirror Iona\'s frozen grief and social invisibility in 1880s St. Petersburg. The power is that nobody listens — a flashback dramatising the death would kill the very silence the story is about; grief finally pours out to the horse because humans refuse it.', outcome: 'Context (cabdriver precarity, Chekhov\'s clinical restraint) is the lens that makes the opening atmosphere do the emotional work — not a flashback.' },
                { text: 'The rewrite works — audiences need the funeral scene to feel the loss.', outcome: 'That reverses the point: the story withholds the event so we watch grief fail to find a listener — showing the death directly turns lament into melodrama.', reveals: 'show-the-sad-event-directly' },
                { text: 'Cut the weather too — scenery is filler; get straight to the dialogue.', outcome: 'The weather IS the psychology — snow and twilight externalise Iona\'s buried sorrow and the city\'s indifference; stripping it leaves a bare anecdote.', reveals: 'setting-is-filler' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'He finally tells the whole story — to a horse. The circle closes, but the grief has moved from suppressed to spoken.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of actively.',
          hint: 'If stuck, re-read the "Understanding the Text" questions in the NCERT textbook and write.',
          misconception: 'Students often believe "critical thinking" means offering a personal opinion ("I think the story is sad") or hunting.',
          parts: [
                { id: 'a', prompt: 'Compare the officer\'s and the young men\'s responses to Iona\'s revelation of his son\'s death.', answer: 'The officer offers performative curiosity ("Hm!',
                  options: ['The officer offers performative curiosity ("Hm!', 'both are rude', 'critical thinking', 'I think the story is sad'],
                  hint: 'If stuck, re-read the "Understanding the Text" questions in the NCERT textbook and write.',
                  misconception: 'Students often believe "critical thinking" means offering a personal opinion ("I think the story is sad") or hunting for hidden symbols.' }
          ],
            remediations: { 'critical-thinking-means-offering-a': { steps: ['Return to the text and mark every moment a character *speaks* vs.', '*fails to speak* (Iona\'s snuffle, the officer\'s closed eyes, the young men\'s insults, the porter\'s dismissal, the young.', 'Create a two-column table: "What Iona tries to say" vs.', '"How the listener responds." 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "critical thinking" means offering a personal opinion ("I think the story is sad") or hunting.',
          parts: [
                { id: 'a', prompt: 'Evaluate the critic\'s claim: "The Lament is not about grief, but about the impossibility of communication in modern urban life." Defend or refute using textual.', answer: 'The claim is partially defensible but reductive',
                  options: ['The claim is partially defensible but reductive', 'critical thinking', 'I think the story is sad', 'The horse represents God'],
                  hint: 'If stuck, re-read the "Understanding the Text" questions in the NCERT textbook and write.',
                  misconception: 'Students often believe "critical thinking" means offering a personal opinion ("I think the story is sad") or hunting for hidden symbols.' }
          ],
            remediations: { 'critical-thinking-means-offering-a': { steps: ['Return to the text and mark every moment a character *speaks* vs.', '*fails to speak* (Iona\'s snuffle, the officer\'s closed eyes, the young men\'s insults, the porter\'s dismissal, the young.', 'Create a two-column table: "What Iona tries to say" vs.', '"How the listener responds." 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_014', difficulty: 'standard',
          question: 'Writing Skills based on "The Lament" refers to the ability to compose.',
          hint: 'Review "Literary Devices: Imagery and Metaphor" (c11_eng_w_cbse_01_008) and "Literary.',
          misconception: 'Students believe "Writing Skills based on the chapter" means retelling the story in their own words or writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing Skills based on "The Lament" refers to the ability to compose structured,',
                  options: ['Writing Skills based on "The Lament" refers to the ability to compose structured,', '"Before You Read: Context and Background" is the preparatory literary analysis step where', 'Plot is the sequence of causally connected events that form the narrative arc of a story,', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review "Literary Devices: Imagery and Metaphor" (c11_eng_w_cbse_01_008) and "Literary Devices.',
                  misconception: 'Students believe "Writing Skills based on the chapter" means retelling the story in their own words or writing a character sketch as a list.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a descriptive summary instead of an analytical paragraph: (1) Return the answer with three.', '(2) Ask: "Which colour dominates?', 'That\'s your grade." (3) Co-construct one PEEL paragraph together on a micro-point (e.g., "Why \'gingerbread horse\'?").', '(4) Assign a 100-word micro-analysis on a single symbol (whip, snow, stable) using the template: "Chekhov uses [symbol].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review the "Critical Thinking: Analysis and Interpretation" node.',
          misconception: 'Students believe a literary discussion is "sharing opinions" where all views are equally valid.',
          parts: [
                { id: 'a', prompt: 'Compare the two "Talking About the Text" prompts. How does Prompt 2 ("Behind the public face...") deepen or complicate Prompt 1 ("Empathy...', answer: 'Prompt 1 diagnoses a societal symptom (loss of empathy)',
                  options: ['Prompt 1 diagnoses a societal symptom (loss of empathy)', 'sharing opinions', 'personal response', 'reader-response analysis'],
                  hint: 'If stuck, review the "Critical Thinking: Analysis and Interpretation" node (c11_eng_w_cbse_01_013).',
                  misconception: 'Students believe a literary discussion is "sharing opinions" where all views are equally valid.' }
          ],
            remediations: { 'a-literary-discussion-is-sharing': { steps: ['Have the student re-read the "Talking About the Text" prompts and underline every phrase that demands textual reference.', 'Practice the "Quote-Connect-Question" drill: pick one quote, state what it shows about the prompt, then ask a follow-up.', 'Record a 2-minute mock discussion on a phone; replay and tally how many times the speaker says "In the text..." vs.', 'Next session, require at least two "In the text..." statements before any "I think..." is allowed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
