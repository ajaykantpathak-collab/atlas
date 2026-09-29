import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch17_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch17_p3: SimDef = {
    id: 'v3_c11_eng_w_ch17_p3',
    title: 'Refugee Blues (Poem) · Part 3/3',
    subtitle: 'Hear a passport expire inside a song that won\'t stop dancing.',
    classLevel: 11, subject: 'eng_w', topic: 'Refugee Blues (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch17'],
    nodeIds: ['c11_eng_w_cbse_17_013', 'c11_eng_w_cbse_17_014', 'c11_eng_w_cbse_17_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a refugee with a passport no country honours', intro: '1939: citizenship revoked by decree, every border closed, and a refrain that keeps repeating \'my dear\' as if love could hold a border open.', goal: 'Situate the poem in the 1930s refugee crisis and evaluate the blues form\'s ironic force.' },
    discovery: {
        question: 'Auden sets a Jewish refugee\'s despair to a jaunty blues tune with a lilting refrain. Inappropriate — or the sharpest choice he could make?',
        options: ['Sharpest — the song-form turns one couple\'s agony into a collective lament, and the cheery rhythm makes the horror land harder', 'Inappropriate — grief demands a solemn form', 'Sharpest — but only because blues was fashionable in 1939', 'Inappropriate — the refrain \'my dear\' softens the politics'],
        answer: 'Sharpest — the song-form turns one couple\'s agony into a collective lament, and the cheery rhythm makes the horror land harder',
        hook: 'The blues was born of dispossession — Auden borrows Black America\'s form to sing a statelessness Europe invented.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Refugee Blues\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_17_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow the speaker station to station — consul, committee, harbour, plain — and hear \'my dear\' grow more desperate with each refrain, up to the soldiers\' march.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Refugee Blues\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the precise literary definition of \'refrain\' as used in poetry, and how does it differ from simple repetition?', options: [
                { text: 'A refrain is a line or phrase repeated at regular intervals, typically at the end of', outcome: 'A refrain is a line or phrase repeated at regular intervals, typically at the end of stanzas.' },
                { text: 'refrain is just repeating words', outcome: 'Not quite — Students believe "critical analysis" means listing every poetic device they can find (alliteration.', reveals: 'critical-analysis-means-listing-every' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means listing every poetic device they can find (alliteration.', reveals: 'critical-analysis-means-listing-every' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Refugee Blues\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for poetry?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the poem or listing.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the poem or listing.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Refugee Blues\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of the refrain "my dear" in "Refugee Blues"?', options: [
                { text: 'The refrain "my dear" serves as a structural anchor in the ballad form, reinforcing the', outcome: 'The refrain "my dear" serves as a structural anchor in the ballad form, reinforcing the intimate.' },
                { text: 'repetition for emphasis', outcome: 'Not quite — Students often treat "discussion points" as a loose chat where they share personal feelings about.', reveals: 'students-often-treat-discussion-points' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a human-rights day assembly, your team picks Auden\'s \'Refugee Blues\'. A classmate objects: \'It\'s a 1939 poem about German Jews — too old and too foreign for our refugee crisis today. And why is a sad poem set to a jaunty blues rhythm?\'',
            decisions: [{ prompt: 'How do you justify the poem and explain the form?', options: [
                { text: 'Explain the specific 1939 moment — Jews stripped of citizenship by the Nuremberg Laws, \'officially dead\' while still alive, every consul and committee turning them away — then show the craft: Auden borrows the 12-bar blues\' AAB pattern, and the repeating \'my dear\' grows more desperate each refrain. The jaunty rhythm against horrific content is deliberate irony: it makes bureaucratic erasure feel personal and endless — which is exactly what makes it speak to any stateless person today.', outcome: 'The form becomes your argument: cyclical blues structure mirrors cyclical rejection — the poem isn\'t dated, it\'s diagnostic.' },
                { text: 'Concede — swap it for a recent news article about refugees, since the poem is about a historical event.', outcome: 'Dating it misses the point: the poem\'s power is that bureaucratic statelessness — passports no country honours — is a recurring reality, not a closed chapter.', reveals: 'historical-poem-is-dated' },
                { text: 'Tell the classmate the blues label just means the poem is sad — the rhythm is incidental decoration.', outcome: '\'Blues\' is a defined musical form with 12-bar structure and refrain; the clash between its swing and the despairing words is the poem\'s central irony, not decoration.', reveals: 'blues-just-means-sad' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_17_015', title: 'You made it',
          caseStudy: { intro: 'Ten thousand soldiers looking for \'you and me\' — the poem refuses closure because the refugees never got one.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_013', difficulty: 'standard',
          question: 'Critical thinking on \'Refugee Blues\' — analysing the text to reach.',
          hint: 'Review c11_eng_w_cbse_17_008 and c11_eng_w_cbse_17_009 device identification exercises.',
          misconception: 'Students believe "critical analysis" means listing every poetic device they can find (alliteration, metaphor, rhyme.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'Refugee Blues\'',
                  options: ['Critical thinking on \'Refugee Blues\'', '\'Refugee Blues\' (Woven Words, ch', 'The plot/narrative arc of \'Refugee Blues\'', 'The setting of \'Refugee Blues\''],
                  hint: 'Review c11_eng_w_cbse_17_008 and c11_eng_w_cbse_17_009 device identification exercises; then.',
                  misconception: 'Students believe "critical analysis" means listing every poetic device they can find (alliteration, metaphor, rhyme scheme) without.' }
          ],
            remediations: { 'critical-analysis-means-listing-every': { steps: ['Take one stanza (e.g., stanza 5: the committee scene).', 'Ask: "What is the *single* bureaucratic action here?', '(polite deferral: \'return next year\')." 3.', 'Ask: "What is the *single* human consequence?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_014', difficulty: 'standard',
          question: 'Writing skills from \'Refugee Blues\' — using the text as a model or springboard.',
          hint: 'If stuck, review c11_eng_w_cbse_17_008 (imagery/metaphor) and c11_eng_w_cbse_17_009.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the poem or listing devices.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for poetry?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_w_cbse_17_008 (imagery/metaphor) and c11_eng_w_cbse_17_009.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the poem or listing devices.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student produces a device-list answer: (1) Return the answer with each device circled and ask: "What does this.', '(3) Give a new question: "Analyse the effect of the fish metaphor in stanza 8." Require the student to write only the.', '(4) Provide a checklist: [ ] Quote embedded?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the poem or listing devices.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The colour \'blue\' in the title only refers to sadness." Defend or refute using evidence from the poem and the "Try This Out" question.', answer: 'Refute',
                  options: ['Refute', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_w_cbse_17_008 (imagery/metaphor) and c11_eng_w_cbse_17_009.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the poem or listing devices.' },
                { id: 'b', prompt: 'Write a 100-word response to: "How does the reference to the yew tree in stanza 3 deepen the poem\'s theme of statelessness?" Use PEEL and embed one quote.', answer: '**Point:** The yew tree symbolises rootedness and renewal denied to refugees',
                  options: ['**Point:** The yew tree symbolises rootedness and renewal denied to refugees', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_w_cbse_17_008 (imagery/metaphor) and c11_eng_w_cbse_17_009.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the poem or listing devices.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student produces a device-list answer: (1) Return the answer with each device circled and ask: "What does this.', '(3) Give a new question: "Analyse the effect of the fish metaphor in stanza 8." Require the student to write only the.', '(4) Provide a checklist: [ ] Quote embedded?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_17_015', difficulty: 'standard',
          question: 'Discussion points on \'Refugee Blues\' — speaking and listening around the text.',
          hint: 'If stuck, return to node c11_eng_w_cbse_17_013 (Critical Thinking) and re-work the five.',
          misconception: 'Students often treat "discussion points" as a loose chat where they share personal feelings about refugees ("It\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'Refugee Blues\'',
                  options: ['Discussion points on \'Refugee Blues\'', '\'Refugee Blues\' (Woven Words, ch', 'The plot/narrative arc of \'Refugee Blues\'', 'The setting of \'Refugee Blues\''],
                  hint: 'If stuck, return to node c11_eng_w_cbse_17_013 (Critical Thinking) and re-work the five textbook.',
                  misconception: 'Students often treat "discussion points" as a loose chat where they share personal feelings about refugees ("It\'s so sad!") without.' }
          ],
            remediations: { 'students-often-treat-discussion-points': { steps: ['If a student drifts into generalities, intervene with the "Three-Step Anchor": 1.', '"Read me the exact two lines you\'re responding to." 2.', '"Name the device in those lines (refrain, irony, juxtaposition, etc.)." 3.', '"Explain how *that device* creates the effect you\'re describing." Practice this in pairs using the "Try This Out" list.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
