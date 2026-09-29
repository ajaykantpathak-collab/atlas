import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch03_p3: SimDef = {
    id: 'v3_c11_eng_w_ch03_p3',
    title: 'The Rocking-horse Winner (Short Story) · Part 3/3',
    subtitle: 'Follow a whisper through a house to a fatal Derby win.',
    classLevel: 11, subject: 'eng_w', topic: 'The Rocking-horse Winner (Short Story) · Part 3/3',
    chapters: ['c11_eng_w_ch03'],
    nodeIds: ['c11_eng_w_cbse_03_013', 'c11_eng_w_cbse_03_014', 'c11_eng_w_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader inside a house that keeps asking for money', intro: 'A boy rides a rocking-horse furiously and names winners; the family calls it luck. Count what the luck is fed.', goal: 'Identify the structural climax and evaluate how the ending serves the critique of materialism.' },
    discovery: {
        question: 'Paul wins eighty thousand pounds on the Derby — and dies immediately after. Why would Lawrence deny the story its happy ending?',
        options: ['To make the acquisition of money literally fatal — the whisper\'s promise that luck brings more money becomes a deadly irony', 'Because the author disliked tidy resolutions', 'To punish the uncle for betting on a child', 'Because Paul\'s gift was the real ending all along'],
        answer: 'To make the acquisition of money literally fatal — the whisper\'s promise that luck brings more money becomes a deadly irony',
        hook: 'The climax isn\'t the race result — it\'s the frenzied ride the night before, where Paul forces the \'knowing\' out of a wooden horse.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Rocking-horse Winner\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_03_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the whispering house as the story\'s engine, place the true climax on the last ride, and test whether the opening counts as in medias res.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Rocking-horse Winner\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the primary symbolic function of the rocking-horse in the story? (Recall the specific object and its repeated association.)', options: [
                { text: 'The rocking-horse functions as a symbol of Paul\'s futile, obsessive attempt to generate', outcome: 'The rocking-horse functions as a symbol of Paul\'s futile, obsessive attempt to generate "luck".' },
                { text: 'it\'s just a toy he likes', outcome: 'Not quite — Students frequently confuse *plot-level irony* (Paul dies after winning) with *thematic irony* (the.', reveals: 'students-frequently-confuse-plot-level' },
                { text: 'it helps him relax', outcome: 'Not quite — Students frequently confuse *plot-level irony* (Paul dies after winning) with *thematic irony* (the.', reveals: 'students-frequently-confuse-plot-level' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Rocking-horse Winner\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in analytical paragraph writing?', options: [
                { text: 'PEEL stands for Point (topic sentence), Evidence (textual quote or close reference),', outcome: 'PEEL stands for Point (topic sentence), Evidence (textual quote or close reference), Explanation.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing skills" means summarising the story in their own words.', reveals: 'writing-skills-means-summarising-the' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means summarising the story in their own words.', reveals: 'writing-skills-means-summarising-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Rocking-horse Winner\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'List the three discussion points given in the NCERT \'Talking About the Text\' section for \'The Rocking-horse Winner\'.', options: [
                { text: 'The three points are: 1) \'Luck is necessary for success in life\', 2) Although Paul\'s', outcome: 'The three points are: 1) \'Luck is necessary for success in life\', 2) Although Paul\'s mother liked.' },
                { text: 'plot points instead', outcome: 'Not quite — Students often think a literary discussion is just sharing opinions.', reveals: 'a-literary-discussion-is-just' },
                { text: 'a literary discussion is just sharing opinions', outcome: 'Not quite — Students often think a literary discussion is just sharing opinions.', reveals: 'a-literary-discussion-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your book club debates \'The Rocking-horse Winner\': a boy rides his toy horse furiously to divine race winners, trying to stop the house whispering \'There must be more money.\' A member calls it \'a ghost story about a haunted house — spooky but shallow\'.',
            decisions: [{ prompt: 'What is the whispering house really about?', options: [
                { text: 'Post-WWI money anxiety wearing a ghost story\'s mask: Lawrence\'s genteel-poor family — \'luck\' and \'filthy lucre\' as household religion — turns domestic economics into haunting. The whispers are the metaphor for a society eating itself alive over status and cash; the boy\'s gift is doomed because feeding the craving only raises its voice.', outcome: 'Context is the lens: Lawrence\'s own mining-village class tension and post-war wealth panic turn a spooky detail into social diagnosis.' },
                { text: 'It IS a ghost story — the whispering is supernatural, end of analysis.', outcome: 'The haunting is a vehicle: treating the whispers as literal ghosts misses that they articulate the mother\'s hunger for money and the family myth of \'luck\'.', reveals: 'whispers-are-just-ghosts' },
                { text: 'It\'s a moral lesson for kids — don\'t gamble on horses.', outcome: 'The betting is symptom, not subject: the critique is of a household economy built on loveless consumption that literally consumes the child.', reveals: 'story-is-anti-gambling' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'The house kept whispering \'there must be more money\' — the story ends by showing exactly what more money costs.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Rocking-horse Winner\' — analysing the text to reach.',
          hint: 'If stuck, review the Symbolism and Irony node (c11_eng_w_cbse_03_009) focusing on the.',
          misconception: 'Students frequently confuse *plot-level irony* (Paul dies after winning) with *thematic irony* (the winning *causes*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'The Rocking-horse Winner\'',
                  options: ['Critical thinking on \'The Rocking-horse Winner\'', '\'The Rocking-horse Winner\' (Woven Words, ch', 'The plot/narrative arc of \'The Rocking-horse Winner\'', 'The setting of \'The Rocking-horse Winner\''],
                  hint: 'If stuck, review the Symbolism and Irony node (c11_eng_w_cbse_03_009) focusing on the distinction.',
                  misconception: 'Students frequently confuse *plot-level irony* (Paul dies after winning) with *thematic irony* (the winning *causes* the death because the.' }
          ],
            remediations: { 'students-frequently-confuse-plot-level': { steps: ['Direct the student to re-read the "birthday gift" sequence (pages 28-30 in NCERT) and the final Derby sequence (pages.', 'Ask: "What specific textual evidence shows the whispers *respond* to the money?" (Answer: "voices...', 'simply trilled and screamed...', '\'There must be more money!'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse *plot-level irony* (Paul dies after winning) with *thematic irony* (the winning *causes*.',
          parts: [
                { id: 'a', prompt: 'Evaluate the validity of this interpretation: "The story is a fairy tale about a magic horse; Paul\'s death is just a sad accident." Defend your judgment using.', answer: 'The interpretation is invalid',
                  options: ['The interpretation is invalid', 'fairy tale'],
                  hint: 'If stuck, review the Symbolism and Irony node (c11_eng_w_cbse_03_009) focusing on the distinction.',
                  misconception: 'Students frequently confuse *plot-level irony* (Paul dies after winning) with *thematic irony* (the winning *causes* the death because the.' }
          ],
            remediations: { 'students-frequently-confuse-plot-level': { steps: ['Direct the student to re-read the "birthday gift" sequence (pages 28-30 in NCERT) and the final Derby sequence (pages.', 'Ask: "What specific textual evidence shows the whispers *respond* to the money?" (Answer: "voices...', 'simply trilled and screamed...', '\'There must be more money!'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_014', difficulty: 'standard',
          question: 'Writing skills from \'The Rocking-horse Winner\' — using the text as a model.',
          hint: 'If stuck, review the PEEL model in c10_engl_cbse_04_007 (Diary as Literary Form) and.',
          misconception: 'Students believe "writing skills" means summarising the story in their own words.',
          parts: [
                { id: 'a', prompt: 'Compare these two responses to "Discuss the irony in Paul\'s final win." Which is stronger and why?', answer: 'Response B is stronger',
                  options: ['Response B is stronger', 'writing skills', '"writing skills" means summarising the story in their own words'],
                  hint: 'If stuck, review the PEEL model in c10_engl_cbse_04_007 (Diary as Literary Form) and practice.',
                  misconception: 'Students believe "writing skills" means summarising the story in their own words.' }
          ],
            remediations: { 'writing-skills-means-summarising-the': { steps: ['Show a side-by-side comparison: a 2-mark summary vs a 6-mark PEEL paragraph on the same prompt.', 'Have the student highlight the *Point*, *Evidence*, *Explanation*, *Link* in the strong answer using four coloured pens.', 'Give a "summary-to-analysis" conversion drill: take a summary sentence ("Paul rides the horse wildly") and expand.', 'Practice with three fresh prompts in one session, insisting on the colour-coded structure each time.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_015', difficulty: 'standard',
          question: 'Discussion points on \'The Rocking-horse Winner\' — speaking and listening around.',
          hint: 'Review character analysis of Paul (node 004) and theme of luck (node 006) to gather.',
          misconception: 'Students often think a literary discussion is just sharing opinions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'The Rocking-horse Winner\'',
                  options: ['Discussion points on \'The Rocking-horse Winner\'', '\'The Rocking-horse Winner\' (Woven Words, ch', 'The plot/narrative arc of \'The Rocking-horse Winner\'', 'The setting of \'The Rocking-horse Winner\''],
                  hint: 'Review character analysis of Paul (node 004) and theme of luck (node 006) to gather evidence.',
                  misconception: 'Students often think a literary discussion is just sharing opinions.' }
          ],
            remediations: { 'a-literary-discussion-is-just': { steps: ['1) Model a think-aloud: "When I see \'luck\', I look for the word in the text—Paul says \'God told me\', mother says \'luck.', 'I\'ll use those quotes." 2) Give sentence stems: "The text says...', 'so I think..." 3) Practice with a low-stakes topic (e.g., "Best ending for the story") before the NCERT points.', '4) Debrief: "Which stem helped you listen better?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
