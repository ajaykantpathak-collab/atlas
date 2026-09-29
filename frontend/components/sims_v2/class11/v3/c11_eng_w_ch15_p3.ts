import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch15_p3: SimDef = {
    id: 'v3_c11_eng_w_ch15_p3',
    title: 'Hawk Roosting (Poem) · Part 3/3',
    subtitle: 'Sit inside a predator\'s self-justifying logic and watch form become the cage.',
    classLevel: 11, subject: 'eng_w', topic: 'Hawk Roosting (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch15'],
    nodeIds: ['c11_eng_w_cbse_15_013', 'c11_eng_w_cbse_15_014', 'c11_eng_w_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader trapped in a tyrant\'s monologue', intro: 'A hawk roosts with eyes closed, rehearsing its absolute right over creation — and no poet interrupts to correct it.', goal: 'Read the dramatic monologue as ironic exposure and analyse its circular structure.' },
    discovery: {
        question: 'The hawk declares \'There is no sophistry in my body\' and \'I kill where all is mine.\' Is Hughes endorsing this voice?',
        options: ['No — the dramatic monologue lets the tyrant\'s logic indict itself: circular, self-serving, amorally clear', 'Yes — the hawk speaks the poet\'s own creed', 'Yes — nature writing always celebrates the predator', 'No — but only because hawks can\'t actually talk'],
        answer: 'No — the dramatic monologue lets the tyrant\'s logic indict itself: circular, self-serving, amorally clear',
        hook: 'No narrator mediates — you\'re locked inside a consciousness that feels no guilt, and that entrapment is the poem\'s point.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Hawk Roosting\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_15_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the stanza openings from \'I sit\' to \'Nothing has changed,\' and test whether the rigid quatrains are decoration or the cage the argument builds.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Hawk Roosting\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in "Hawk Roosting," and why is it significant for the poem\'s meaning?', options: [
                { text: 'The poem uses a first-person monologue spoken by the hawk itself', outcome: 'The poem uses a first-person monologue spoken by the hawk itself.' },
                { text: 'third-person description', outcome: 'Not quite — Students often think the poem *celebrates* the hawk\'s power because the hawk speaks confidently and.', reveals: 'the-poem-celebrates-the-hawk' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Hawk Roosting\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Conclusion', outcome: 'Not quite — Students believe that "writing skills" for poetry means summarising the poem stanza by stanza.', reveals: 'writing-skills-for-poetry-means' },
                { text: 'writing skills', outcome: 'Not quite — Students believe that "writing skills" for poetry means summarising the poem stanza by stanza.', reveals: 'writing-skills-for-poetry-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Hawk Roosting\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the literal meaning of "sophistry" in the line "There is no sophistry in my body," and how does the hawk\'s rejection of.', options: [
                { text: 'Sophistry means clever but false reasoning used to deceive', outcome: 'Sophistry means clever but false reasoning used to deceive. The hawk rejects it because it operates.' },
                { text: 'sophistry means weakness', outcome: 'Not quite — Students often treat the hawk as a simple symbol of "evil" or "nature\'s cruelty," missing that.', reveals: 'students-often-treat-the-hawk' },
                { text: 'sophistry', outcome: 'Not quite — Students often treat the hawk as a simple symbol of "evil" or "nature\'s cruelty," missing that.', reveals: 'students-often-treat-the-hawk' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a seminar on \'power and persuasion\', a classmate offers Hughes\'s \'Hawk Roosting\' as a poem that \'shows how nature is cruel and how Hughes admires the strong.\' You\'re asked whether that reading holds.',
            decisions: [{ prompt: 'How do you steer the reading of the hawk\'s speech?', options: [
                { text: 'Point out the form: it\'s a dramatic monologue — the hawk speaks with no poet-narrator, so we inhabit a mind that feels no guilt, only certainty of dominance. The \'plot\' is the self-justifying logic tightening: \'I sit\' → \'My feet\' → \'There is no sophistry in my body\' → the world unchanged by its will. Hughes exposes the seductive reasoning of tyranny; he doesn\'t endorse it.', outcome: 'Form does the work: the monologue lets the hawk condemn itself out of its own mouth — the poem studies power, not ornithology.' },
                { text: 'Accept the classmate\'s reading — the hawk\'s confidence is impressive, so Hughes must admire strength.', outcome: 'That confuses the persona with the poet: the monologue ironically exposes the hawk\'s logic as circular and self-serving.', reveals: 'hughes-endorses-the-hawk' },
                { text: 'Argue the poem has no structure at all — nothing happens, a bird just sits there.', outcome: 'No external action isn\'t no structure: the argument is the plot — premise, evidence, conclusion, reassertion of absolute power.', reveals: 'monologue-means-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'The poem ends where it began — \'My eye has permitted no change\' — the form itself enacting a will that permits nothing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_013', difficulty: 'standard',
          question: 'Critical thinking on \'Hawk Roosting\' — analysing the text to reach.',
          hint: 'Review the difference between the *speaker* (the hawk) and the *poet* (Ted Hughes) using.',
          misconception: 'Students often think the poem *celebrates* the hawk\'s power because the hawk speaks confidently and the imagery.',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative perspective used in "Hawk Roosting," and why is it significant for the poem\'s meaning?', answer: 'The poem uses a first-person monologue spoken by the hawk itself',
                  options: ['The poem uses a first-person monologue spoken by the hawk itself', 'third-person description'],
                  hint: 'Review the difference between the *speaker* (the hawk) and the *poet* (Ted Hughes) using the notes.',
                  misconception: 'Students often think the poem *celebrates* the hawk\'s power because the hawk speaks confidently and the imagery is majestic.' },
                { id: 'b', prompt: 'Explain in your own words what the hawk means by "There is no sophistry in my body" and how this line characterizes the speaker.', answer: 'The hawk means its actions are straightforward and honest—it kills',
                  options: ['The hawk means its actions are straightforward and honest—it kills', 'sophistry', 'weakness', 'confusion'],
                  hint: 'Review the difference between the *speaker* (the hawk) and the *poet* (Ted Hughes) using the notes.',
                  misconception: 'Students often think the poem *celebrates* the hawk\'s power because the hawk speaks confidently and the imagery is majestic.' },
                { id: 'c', prompt: 'Apply the concept of dramatic irony to the poem: identify a moment where the reader understands something the hawk does not, and explain its effect.', answer: 'When the hawk says "Nothing has changed',
                  options: ['When the hawk says "Nothing has changed', 'finds no irony indicates the student reads the hawk\'s claims at face value'],
                  hint: 'Review the difference between the *speaker* (the hawk) and the *poet* (Ted Hughes) using the notes.',
                  misconception: 'Students often think the poem *celebrates* the hawk\'s power because the hawk speaks confidently and the imagery is majestic.' }
          ],
            remediations: { 'the-poem-celebrates-the-hawk': { steps: ['Re-read the poem aloud, marking every word that reveals the hawk\'s *attitude* (e.g., "convenience," "advantage,".', 'Ask: "Would the poet agree with this speaker?', 'What clues suggest distance?" 3.', 'Compare with Hughes\'s other animal poems (e.g., "The Jaguar") where animals are not given such god-like voices.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_014', difficulty: 'standard',
          question: 'Writing skills from \'Hawk Roosting\' — using the text as a model or springboard.',
          hint: 'If stuck, return to c11_eng_w_cbse_15_008 (Imagery and Metaphor) and.',
          misconception: 'Students believe that "writing skills" for poetry means summarising the poem stanza by stanza or listing poetic devices.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Conclusion', 'writing skills'],
                  hint: 'If stuck, return to c11_eng_w_cbse_15_008 (Imagery and Metaphor) and c11_eng_w_cbse_15_009 (Irony.',
                  misconception: 'Students believe that "writing skills" for poetry means summarising the poem stanza by stanza or listing poetic devices (simile, metaphor.' }
          ],
            remediations: { 'writing-skills-for-poetry-means': { steps: ['If a student produces a device-list answer, do not simply say "add explanation".', 'Instead: 1) Highlight one device in their answer (e.g., "hold Creation in my foot").', '2) Ask: "What does \'Creation\' represent here?', 'Why \'foot\' not \'claw\'?" 3) Guide them to articulate: "It suggests the hawk possesses the entire evolutionary history.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "writing skills" for poetry means summarising the poem stanza by stanza or listing poetic devices.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "A creative writing response (e.g., a diary entry from the hawk\'s perspective) requires less textual evidence than an analytical answer.".', answer: 'The claim is false',
                  options: ['The claim is false', 'writing skills'],
                  hint: 'If stuck, return to c11_eng_w_cbse_15_008 (Imagery and Metaphor) and c11_eng_w_cbse_15_009 (Irony.',
                  misconception: 'Students believe that "writing skills" for poetry means summarising the poem stanza by stanza or listing poetic devices (simile, metaphor.' }
          ],
            remediations: { 'writing-skills-for-poetry-means': { steps: ['If a student produces a device-list answer, do not simply say "add explanation".', 'Instead: 1) Highlight one device in their answer (e.g., "hold Creation in my foot").', '2) Ask: "What does \'Creation\' represent here?', 'Why \'foot\' not \'claw\'?" 3) Guide them to articulate: "It suggests the hawk possesses the entire evolutionary history.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_015', difficulty: 'standard',
          question: 'Discussion points on \'Hawk Roosting\' — speaking and listening around the text.',
          hint: 'If stuck, review the Critical Thinking node (c11_eng_w_cbse_15_013) for the "PEEL" method.',
          misconception: 'Students often treat the hawk as a simple symbol of "evil" or "nature\'s cruelty," missing that Hughes presents the.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of "sophistry" in the line "There is no sophistry in my body," and how does the hawk\'s rejection of it characterize its worldview?', answer: 'Sophistry means clever but false reasoning used to deceive',
                  options: ['Sophistry means clever but false reasoning used to deceive', 'sophistry means weakness', 'sophistry', 'weakness'],
                  hint: 'If stuck, review the Critical Thinking node (c11_eng_w_cbse_15_013) for the "PEEL" method (Point.',
                  misconception: 'Students often treat the hawk as a simple symbol of "evil" or "nature\'s cruelty," missing that Hughes presents the hawk\'s perspective *from.' },
                { id: 'b', prompt: 'Explain in your own words why the hawk says "Now I hold Creation in my foot." What does "Creation" refer to here?', answer: '"Creation" refers to the entire natural world',
                  options: ['"Creation" refers to the entire natural world', 'Creation means the nest', 'sophistry', 'weakness'],
                  hint: 'If stuck, review the Critical Thinking node (c11_eng_w_cbse_15_013) for the "PEEL" method (Point.',
                  misconception: 'Students often treat the hawk as a simple symbol of "evil" or "nature\'s cruelty," missing that Hughes presents the hawk\'s perspective *from.' },
                { id: 'c', prompt: 'Apply the concept of "dramatic monologue" to this poem: Who is the hawk addressing, and how does the absence of a listener shape the poem\'s tone?', answer: 'The hawk speaks to itself',
                  options: ['The hawk speaks to itself', 'The hawk speaks to the sun', 'sophistry', 'weakness'],
                  hint: 'If stuck, review the Critical Thinking node (c11_eng_w_cbse_15_013) for the "PEEL" method (Point.',
                  misconception: 'Students often treat the hawk as a simple symbol of "evil" or "nature\'s cruelty," missing that Hughes presents the hawk\'s perspective *from.' },
                { id: 'd', prompt: 'Analyze the structural parallel between the poem\'s opening ("I sit in the top of the wood") and closing ("I am going to keep things like this").', answer: 'The poem begins and ends with the hawk in a position of static dominance',
                  options: ['The poem begins and ends with the hawk in a position of static dominance', 'It shows the hawk is bored', 'sophistry', 'weakness'],
                  hint: 'If stuck, review the Critical Thinking node (c11_eng_w_cbse_15_013) for the "PEEL" method (Point.',
                  misconception: 'Students often treat the hawk as a simple symbol of "evil" or "nature\'s cruelty," missing that Hughes presents the hawk\'s perspective *from.' }
          ],
            remediations: { 'students-often-treat-the-hawk': { steps: ['Have the student read the poem aloud three times: once for rhythm, once emphasizing every "I/my/mine," once as.', 'Give them a two-column table: left column "Hawk\'s Claim" (quote), right column "Human Equivalent" (e.g., "I hold.', 'Ask them to explain "sophistry" using a dictionary, then find one example of political sophistry in current news.', 'Finally, have them answer textbook question 6 in writing first, then discuss — writing forces precision that speaking.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
