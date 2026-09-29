import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch16_p1: SimDef = {
    id: 'v3_c11_eng_w_ch16_p1',
    title: 'For Elkana (Poem) · Part 1/3',
    subtitle: 'Read a family evening where the silences are part of the plot.',
    classLevel: 11, subject: 'eng_w', topic: 'For Elkana (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch16'],
    nodeIds: ['c11_eng_w_cbse_16_001', 'c11_eng_w_cbse_16_002', 'c11_eng_w_cbse_16_003', 'c11_eng_w_cbse_16_004', 'c11_eng_w_cbse_16_005', 'c11_eng_w_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a quiet observer on a lawn at dusk', intro: 'Chairs dragged onto a lawn, a wife\'s grievance, a son\'s demand for dinner — ordinary speech doing the work of poetry.', goal: 'Read understatement and ellipsis as narrative tools in a domestic poem.' },
    discovery: {
        question: 'The title says \'For Elkana\' — a biblical patriarch, or someone closer to home?',
        options: ['Ezekiel\'s own son — the dedication signals a personal, domestic scene, not scripture', 'Elkanah, father of Samuel — expect a religious poem', 'A pseudonym the poet used for himself', 'A character from a Marathi folk tale'],
        answer: 'Ezekiel\'s own son — the dedication signals a personal, domestic scene, not scripture',
        hook: 'Ezekiel\'s surname invites the biblical guess; the poem is actually an April evening, a wife\'s complaint, and a small boy changing the weather of a marriage.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'For Elkana\' (Woven Words, ch. 16) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_16_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark where each stanza shifts the \'camera\' across a family evening, then decide if \'We rise and go into the house\' closes the story or just pauses a ritual.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'For Elkana\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is Nissim Ezekiel and why is he considered a pivotal figure in Indian English poetry?', options: [
                { text: 'Nissim Ezekiel (1924–2004) was a Mumbai-born poet, professor, and critic who pioneered', outcome: 'Nissim Ezekiel (1924–2004) was a Mumbai-born poet, professor, and critic who pioneered modern.' },
                { text: 'He was a British poet', outcome: 'Not quite — Students often assume "Elkana" is a biblical reference (Elkanah, father of Samuel) and expect.', reveals: 'elkana-is-a-biblical-reference' },
                { text: 'He wrote only in Marathi', outcome: 'Not quite — Students often assume "Elkana" is a biblical reference (Elkanah, father of Samuel) and expect.', reveals: 'elkana-is-a-biblical-reference' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'For Elkana\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'Identify the three distinct verse paragraphs in "For Elkana" and state the primary narrative function of each (exposition, rising action.', options: [
                { text: 'The poem has three verse paragraphs: Paragraph 1 (lines 1-12) establishes the setting and', outcome: 'The poem has three verse paragraphs: Paragraph 1 (lines 1-12) establishes the setting and marital.' },
                { text: 'in poetry means only', outcome: 'Not quite — Students often believe "plot" in poetry means only "what happens" in linear order, ignoring how.', reveals: 'plot-in-poetry-means-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'For Elkana\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the physical setting described in the opening stanza of "For Elkana," and what time of day and season does it establish?', options: [
                { text: 'The opening stanza establishes a warm April evening on a lawn with stone steps leading', outcome: 'The opening stanza establishes a warm April evening on a lawn with stone steps leading down from.' },
                { text: 'morning in winter', outcome: 'Not quite — Students often treat setting as a static backdrop painted once at the start, missing how Ezekiel.', reveals: 'students-often-treat-setting-as' },
                { text: 'inside the house', outcome: 'Not quite — Students often treat setting as a static backdrop painted once at the start, missing how Ezekiel.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'For Elkana\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the narrator\'s immediate reaction when his wife points out the broken window-pane and implies he should fix it?', options: [
                { text: 'The narrator is "Unwilling to dispute the obvious fact that she is always right" and', outcome: 'The narrator is "Unwilling to dispute the obvious fact that she is always right" and turns "towards.' },
                { text: 'Unwilling to dispute the obvious fact that she is always right', outcome: 'Not quite — Students often confuse the narrator\'s silence with weakness or lack of opinion, missing that his.', reveals: 'students-often-confuse-the-narrator' },
                { text: 'towards the more attractive view that opens up behind my eyes and shuts her out', outcome: 'Not quite — Students often confuse the narrator\'s silence with weakness or lack of opinion, missing that his.', reveals: 'students-often-confuse-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'For Elkana\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'What are the two supporting characters in the poem "For Elkana" and what is the son\'s age as stated in the poem?', options: [
                { text: 'The two supporting characters are the wife and the son, who is seven years old', outcome: 'The two supporting characters are the wife and the son, who is seven years old.' },
                { text: 'the husband as a supporting character or giving the wrong age', outcome: 'Not quite — Students often treat supporting characters as flat or functional—e.g., "the wife nags, the son.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'For Elkana\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the definition of a primary theme in a poem?', options: [
                { text: 'The primary theme is the central, unifying idea or insight about human experience that', outcome: 'The primary theme is the central, unifying idea or insight about human experience that the poem.' },
                { text: 'the theme is the plot summary', outcome: 'Not quite — Students often believe the primary theme is simply "a family eating dinner" or "a child\'s clever.', reveals: 'the-primary-theme-is-simply' },
                { text: 'the theme is the moral lesson', outcome: 'Not quite — Students often believe the primary theme is simply "a family eating dinner" or "a child\'s clever.', reveals: 'the-primary-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your study group is annotating Ezekiel\'s \'For Elkana\'. One member insists Elkana must be Elkanah, the biblical father of Samuel, so the poem \'must be religious.\' Another says \'nothing happens — it\'s just people at dinner.\'',
            decisions: [{ prompt: 'How do you correct both readings at once?', options: [
                { text: 'Show that Elkana is Ezekiel\'s own son — the dedication signals a personal, autobiographical scene of Indian middle-class family life on an April evening. And plenty happens: Ezekiel compresses a short-story arc into the stanzas — the wife\'s complaint, the husband\'s retreat into thought, the son\'s logical performance shifting the dynamic — using understatement and gaps the reader fills.', outcome: 'Both fixes come from the same skill: treating context and stanza structure as interpretive lenses, not trivia — domestic bickering becomes art.' },
                { text: 'Go with the biblical reading — Ezekiel\'s name is biblical and Indian English poetry often uses mythology.', outcome: 'The poet\'s own notes name his son; overgeneralising from the surname and other syllabus poems produces a religious poem that isn\'t on the page.', reveals: 'elkana-is-biblical' },
                { text: 'Agree nothing happens — it\'s a static slice of domestic description.', outcome: 'The narrative runs on mental events and ellipsis: the wife\'s unspoken \'Children Must be Disciplined\', the husband\'s internal monologue, the son\'s speech — the plot is in the structure, not visible action.', reveals: 'domestic-poem-has-no-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'The couple came down the stone steps; they rise and go back in — the quarrel was never an event, it\'s the evening itself.',
            decisions: [{ prompt: 'What comes next? For Elkana (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — For Elkana (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_001', difficulty: 'standard',
          question: '\'For Elkana\' (Woven Words, ch. 16) — the context and background to this text.',
          hint: 'If stuck, review the "About the Poet" section in any previous NCERT poem chapter (e.g.',
          misconception: 'Students often assume "Elkana" is a biblical reference (Elkanah, father of Samuel) and expect a religious poem, because.',
          parts: [
                { id: 'a', prompt: 'The poem is titled "For Elkana." Who is Elkana, and how does knowing this change your expectation of the poem\'s tone?', answer: 'Elkana is Ezekiel\'s son',
                  options: ['Elkana is Ezekiel\'s son', 'Elkana is a biblical prophet', 'Elkana'],
                  hint: 'If stuck, review the "About the Poet" section in any previous NCERT poem chapter (e.g., Class 10.',
                  misconception: 'Students often assume "Elkana" is a biblical reference (Elkanah, father of Samuel) and expect a religious poem, because Ezekiel\'s surname.' },
                { id: 'b', prompt: 'Compare the setting of "For Elkana" (a warm April evening on a lawn with stone steps) to the typical settings in Ezekiel\'s other well-known poems like "Night.', answer: 'Both poems use ordinary Indian domestic settings',
                  options: ['Both poems use ordinary Indian domestic settings', 'Indianness', 'Elkana'],
                  hint: 'If stuck, review the "About the Poet" section in any previous NCERT poem chapter (e.g., Class 10.',
                  misconception: 'Students often assume "Elkana" is a biblical reference (Elkanah, father of Samuel) and expect a religious poem, because Ezekiel\'s surname.' }
          ],
            remediations: { 'elkana-is-a-biblical-reference': { steps: ['Show the student the "About the Poet" box in the NCERT text which states Ezekiel was born in Mumbai and lectured in the.', '— ask: "Does this sound like a biblical scholar?" 2.', 'Point to the dedication line "For Elkana" and the poem\'s content: a father watching his son demand dinner — ask: "Does.', 'Assign a quick web search for "Nissim Elkana son" to confirm the biographical fact.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'For Elkana\' — what happens, in what order, and why.',
          hint: 'Review "verse paragraph vs. stanza" using the Cherry Tree poem (c8_engl_ch4_13) where.',
          misconception: 'Students often believe "plot" in poetry means only "what happens" in linear order, ignoring how Ezekiel uses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'For Elkana\'',
                  options: ['The plot/narrative arc of \'For Elkana\'', '\'For Elkana\' (Woven Words, ch', 'The setting of \'For Elkana\'', 'Character analysis in \'For Elkana\''],
                  hint: 'Review "verse paragraph vs. stanza" using the Cherry Tree poem (c8_engl_ch4_13) where each stanza.',
                  misconception: 'Students often believe "plot" in poetry means only "what happens" in linear order, ignoring how Ezekiel uses **structural omission** — the.' }
          ],
            remediations: { 'plot-in-poetry-means-only': { steps: ['If a student cannot map the narrative arc, guide them through this 4-step reconstruction: (1) Number the poem\'s.', '(3) Identify the three moments where the "center of consciousness" shifts: wife → husband → son → husband →.', '(4) Ask: "Which sentence is the climax?" (Answer: the son\'s second speech).', 'This makes the invisible structural scaffolding visible.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_003', difficulty: 'standard',
          question: 'The setting of \'For Elkana\' — the place, time and atmosphere the text creates.',
          hint: 'Review "Imagery and Visual Description in Poetry" (c7_engl_ch02_013) and practice.',
          misconception: 'Students often treat setting as a static backdrop painted once at the start, missing how Ezekiel reuses the same lawn.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "atmosphere shift" to the moment the wife "surveys the scene, comments / on a broken window-pane." Identify the new atmosphere and the.', answer: 'The atmosphere shifts from idyllic silence to domestic tension',
                  options: ['The atmosphere shifts from idyllic silence to domestic tension', 'peaceful'],
                  hint: 'Review "Imagery and Visual Description in Poetry" (c7_engl_ch02_013) and practice converting three.',
                  misconception: 'Students often treat setting as a static backdrop painted once at the start, missing how Ezekiel reuses the same lawn, chairs, and house.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student physically map the poem: draw the lawn, steps, chairs, window, house interior as a floor plan.', 'Ask them to place each character on the map at three moments: opening, child\'s entrance, final exit.', 'For each moment, write one sensory detail (sound, smell, touch) that character would notice.', 'Compare how the same window-pane is "broken" (wife\'s view), "ignored" (husband\'s view), and "irrelevant" (child\'s view).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat setting as a static backdrop painted once at the start, missing how Ezekiel reuses the same lawn.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the final atmosphere ("My wife\'s delightful laughter / holds the three of us together") in resolving the tensions established.', answer: 'The resolution is earned',
                  options: ['The resolution is earned', 'forced', 'sudden'],
                  hint: 'Review "Imagery and Visual Description in Poetry" (c7_engl_ch02_013) and practice converting three.',
                  misconception: 'Students often treat setting as a static backdrop painted once at the start, missing how Ezekiel reuses the same lawn, chairs, and house.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student physically map the poem: draw the lawn, steps, chairs, window, house interior as a floor plan.', 'Ask them to place each character on the map at three moments: opening, child\'s entrance, final exit.', 'For each moment, write one sensory detail (sound, smell, touch) that character would notice.', 'Compare how the same window-pane is "broken" (wife\'s view), "ignored" (husband\'s view), and "irrelevant" (child\'s view).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_004', difficulty: 'standard',
          question: 'Character analysis in \'For Elkana\' — the central figure(s), their traits, and.',
          hint: 'Review the distinction between "showing" (actions/dialogue) and "telling" (narrator\'s.',
          misconception: 'Students often confuse the narrator\'s silence with weakness or lack of opinion, missing that his "shutting her out".',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "dramatic irony" to the moment when the narrator says "Such a logician deserves his dinner straightaway." What does the narrator know that.', answer: 'The narrator ironically validates the son\'s "rude" demand',
                  options: ['The narrator ironically validates the son\'s "rude" demand', 'shutting her out'],
                  hint: 'Review the distinction between "showing" (actions/dialogue) and "telling" (narrator\'s direct.',
                  misconception: 'Students often confuse the narrator\'s silence with weakness or lack of opinion, missing that his "shutting her out" behind his eyes is.' }
          ],
            remediations: { 'students-often-confuse-the-narrator': { steps: ['If a student makes this error: 1) Have them re-read only the narrator\'s internal thoughts (lines about "behind.', '2) Ask: "What is he doing while his mouth is closed?" 3) Create a two-column chart: Column A = What he says/does.', '4) Discuss how Column B explains Column A as deliberate choice, not passivity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_005', difficulty: 'standard',
          question: 'Supporting characters in \'For Elkana\' — the secondary figures who move the.',
          hint: 'Review the "Character Analysis: Protagonist" node (16_004) and re-read the poem marking.',
          misconception: 'Students often treat supporting characters as flat or functional—e.g., "the wife nags, the son is cute"—instead.',
          parts: [
                { id: 'a', prompt: 'What are the two supporting characters in the poem "For Elkana" and what is the son\'s age as stated in the poem?', answer: 'The two supporting characters are the wife and the son, who is seven years old',
                  options: ['The two supporting characters are the wife and the son, who is seven years old', 'the husband as a supporting character or giving the wrong age'],
                  hint: 'Review the "Character Analysis: Protagonist" node (16_004) and re-read the poem marking every line.',
                  misconception: 'Students often treat supporting characters as flat or functional—e.g., "the wife nags, the son is cute"—instead of analyzing how Ezekiel.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student reduces characters to stereotypes, guide them to: (1) List every action/speech of the wife and son.', '(2) For each, ask: "What does this reveal about them AND about the father?" (3) Find the moment the father explicitly.', '(4) Rewrite one trait for each character as a "mirror" statement (e.g., "The wife\'s attention to domestic detail.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_006', difficulty: 'standard',
          question: 'The primary theme of \'For Elkana\' — the central idea the whole text returns to.',
          hint: 'If stuck, review the distinction between plot and theme using the Class 10 example "A.',
          misconception: 'Students often believe the primary theme is simply "a family eating dinner" or "a child\'s clever argument" because they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of \'For Elkana\'',
                  options: ['The primary theme of \'For Elkana\'', '\'For Elkana\' (Woven Words, ch', 'The plot/narrative arc of \'For Elkana\'', 'The setting of \'For Elkana\''],
                  hint: 'If stuck, review the distinction between plot and theme using the Class 10 example "A Letter.',
                  misconception: 'Students often believe the primary theme is simply "a family eating dinner" or "a child\'s clever argument" because they focus on the most.' }
          ],
            remediations: { 'the-primary-theme-is-simply': { steps: ['If a student cannot move beyond plot summary, guide them through this sequence: (1) List the four distinct beats: wife.', '(2) Ask: "What does each beat reveal about how this family *works*?" (3) Generalize: "What word describes a family.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
