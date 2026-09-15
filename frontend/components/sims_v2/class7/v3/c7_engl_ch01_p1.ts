import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch01_p1: SimDef = {
    id: 'v3_c7_engl_ch01_p1',
    title: 'Learning Together: The Day the River Spoke · Part 1/3',
    subtitle: 'This node covers the analysis of physical and geographical elements (coastal village.',
    classLevel: 7, subject: 'engl', topic: 'Learning Together: The Day the River Spoke · Part 1/3',
    chapters: ['c7_engl_ch01'],
    nodeIds: ['c7_engl_ch01_001', 'c7_engl_ch01_002', 'c7_engl_ch01_003', 'c7_engl_ch01_004', 'c7_engl_ch01_005', 'c7_engl_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Have you ever visited a place where the sound of crashing ocean waves mixes with the steady flow of a river.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In a coastal village, the high tide swallows the footpaths and the children simply wait for the water to fall. Is this setting just a pretty postcard — or something with real power over the story?',
        options: ['It is an active force — tides, floods, and isolation decide how villagers travel, work, and whether children reach a school', 'Just a backdrop — the same story could happen anywhere', 'A decoration — rivers are added to stories to sound nice', 'A mistake — real rivers never affect villages'],
        answer: 'It is an active force — tides, floods, and isolation decide how villagers travel, work, and whether children reach a school',
        hook: 'A setting is never window dressing. When a river floods the only path to school, geography becomes an obstacle in the plot — move the village to a dry plain and the whole struggle dissolves.',
    },
    teaching: [
        { title: 'Story Setting: Coastal Village and the River', text: 'The story setting encompasses the physical location, environmental details, and cultural background—specifically a coastal village beside a flowing river—that shape the events, mood, and characters\'.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the riverbank at high tide and low tide — list what each state of the water allows or forbids — and prove the setting is steering the plot.',
        labels: ['Story Setting: Coastal Village', 'Character Analysis: Jahnavi', 'Theme: Gender Barriers', 'The River as', 'Plot: Jahnavi\'s Conversation with', 'Theme: Courage to Pursue'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch01_001', title: 'Story Setting: Coastal Village and the River',
          caseStudy: { intro: 'Have you ever visited a place where the sound of crashing ocean waves mixes with the steady flow of a river, completely shaping how people travel, work, and.',
            decisions: [{ prompt: 'What is a story setting, and what two primary environmental features define the setting in "The Day the River Spoke"?', options: [
                { text: 'The story setting refers to the time, place, and social environment in', outcome: 'The story setting refers to the time, place, and social environment in which a narrative occurs;.' },
                { text: 'just the time of day', outcome: 'Not quite — Students often treat the setting as a static picture postcard rather than a dynamic influence.', reveals: 'students-often-treat-the-setting' },
                { text: 'only a school building', outcome: 'Not quite — Students often treat the setting as a static picture postcard rather than a dynamic influence.', reveals: 'students-often-treat-the-setting' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_003', title: 'Theme: Gender Barriers to Education',
          caseStudy: { intro: 'Have you ever noticed how sometimes boys and girls are expected to do different chores around the house, like one being asked to help in the kitchen while the.',
            decisions: [{ prompt: 'What is a gender barrier to education?', options: [
                { text: 'A gender barrier is an obstacle or rule based on gender that prevents someone—most often', outcome: 'A gender barrier is an obstacle or rule based on gender that prevents someone—most often girls—from.' },
                { text: 'it is just about living far from a school', outcome: 'Not quite — Students often confuse gender barriers with simple financial poverty.', reveals: 'students-often-confuse-gender-barriers' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_004', title: 'The River as a Character: Personification in the Story',
          caseStudy: { intro: 'Have you ever talked to your pet, your plants, or even the wind outside your window on a stormy afternoon, almost feeling like they understand you and could.',
            decisions: [{ prompt: 'What is personification? A) Comparing two things using "like" or "as" B) Giving human qualities, emotions, or actions to non-human objects.', options: [
                { text: 'B', outcome: 'The correct answer is B. Option A describes a simile, option C describes hyperbole, and option.' },
                { text: 'splashing', outcome: 'Not quite — Students often confuse personification with literal magic or setting description, believing that.', reveals: 'students-often-confuse-personification-with' },
                { text: 'flowing', outcome: 'Not quite — Students often confuse personification with literal magic or setting description, believing that.', reveals: 'students-often-confuse-personification-with' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student adapts \'The Day the River Spoke\' for a school anthology, but moves the whole story from the coastal river village to a dry desert plateau \'for variety\' — keeping every scene otherwise identical.',
            decisions: [{ prompt: 'What would this transplant break?', options: [
                { text: 'Almost everything — the river is not scenery but the story\'s machinery: it shapes the villagers\' commute, the isolation, and the voice that speaks to the protagonist. In a desert the same scenes lose their logic — no water to cross, no river to listen — so the character\'s relationship with her environment, and the imagery carrying it, must be rebuilt from scratch.', outcome: 'Setting in this story is causal, not decorative — change it and the plot\'s reasons evaporate, which is why \'same story, new backdrop\' never survives the move.' },
                { text: 'Nothing breaks — settings are interchangeable backdrops, so the story works identically on a plateau.', outcome: 'The river drives the plot — the crossing, the isolation, the speaking water — so swapping it for desert deletes the story\'s causes, not just its look.', reveals: 'setting-is-interchangeable' },
                { text: 'Only the descriptions need rewriting — the river\'s role is just pretty imagery.', outcome: 'The river does narrative work — it isolates the village and literally speaks to the protagonist — so it is plot machinery, not ornament.', reveals: 'setting-is-just-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Read the water and you read the village. In this story, the river does not just flow beside the characters — it pushes their lives around.',
            decisions: [{ prompt: 'What comes next? Learning Together: The Day the River Spoke · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Learning Together: The Day the River Spoke · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch01_001', difficulty: 'standard',
          question: 'The story setting encompasses the physical location, environmental details, and.',
          hint: 'Review the Class 6 unit on story settings and practice identifying geographical nouns and.',
          misconception: 'Students often treat the setting as a static picture postcard rather than a dynamic influence on the plot.',
          parts: [
                { id: 'a', prompt: 'What is a story setting, and what two primary environmental features define the setting in "The Day the River Spoke"?', answer: 'The story setting refers to the time, place, and social environment in',
                  options: ['The story setting refers to the time, place, and social environment in', 'just the time of day', 'only a school building'],
                  hint: 'Review the Class 6 unit on story settings and practice identifying geographical nouns and sensory.',
                  misconception: 'Students often treat the setting as a static picture postcard rather than a dynamic influence on the plot.' }
          ],
            remediations: { 'students-often-treat-the-setting': { steps: ['Guide the student by asking: "If the village were located in a flat, dry desert instead of a coastal riverbank, would.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_002', difficulty: 'standard',
          question: 'Character analysis of Jahnavi examines her traits, actions, speech, desires.',
          hint: 'Review basic trait words (e.g., determined, resilient, curious) and match them to simple.',
          misconception: 'Students often confuse a character\'s external circumstances (like being poor or unable to attend school) with their.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of Jahnavi examines her traits, actions, speech, desires, and inner',
                  options: ['Character analysis of Jahnavi examines her traits, actions, speech, desires, and inner', 'The story setting encompasses the physical location, environmental details, and cultural', 'Gender barriers to education refer to social, cultural, and economic obstacles that', 'Personification is a literary device where non-human things—such as a river, the wind, or'],
                  hint: 'Review basic trait words (e.g., determined, resilient, curious) and match them to simple character.',
                  misconception: 'Students often confuse a character\'s external circumstances (like being poor or unable to attend school) with their internal character.' }
          ],
            remediations: { 'students-often-confuse-a-character': { steps: ['When a student makes this error, guide them step-by-step: (1) Ask them to look at what Jahnavi says when she is by the.', '(2) Ask them if wanting something you do not yet have shows desire or indifference.', '(3) Explain the difference between *opportunity* (what society allows) and *aspiration* (what the heart wants).', '(4) Have them rewrite their sentence to separate her external barrier from her internal determination.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_003', difficulty: 'standard',
          question: 'Gender barriers to education refer to social, cultural, and economic obstacles.',
          hint: 'Review node c7_engl_ch01_002 to re-examine Jahnavi\'s dreams and what she hopes to learn.',
          misconception: 'Students often confuse gender barriers with simple financial poverty.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Gender barriers to education refer to social, cultural, and economic obstacles that',
                  options: ['Gender barriers to education refer to social, cultural, and economic obstacles that', 'The story setting encompasses the physical location, environmental details, and cultural', 'Character analysis of Jahnavi examines her traits, actions, speech, desires, and inner', 'Personification is a literary device where non-human things—such as a river, the wind, or'],
                  hint: 'Review node c7_engl_ch01_002 to re-examine Jahnavi\'s dreams and what she hopes to learn in school.',
                  misconception: 'Students often confuse gender barriers with simple financial poverty.' }
          ],
            remediations: { 'students-often-confuse-gender-barriers': { steps: ['If a student struggles to separate poverty from gender barriers, guide them with these steps: 1.', 'Ask: "Does the family spend money on anyone\'s education?" 2.', 'If the answer is yes (the brother goes to school), ask: "Who is allowed to go, and who is kept home?" 3.', 'Explain that when resources are directed *only* to boys while girls are forced into domestic work, it is discrimination.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_004', difficulty: 'standard',
          question: 'Personification is a literary device where non-human things—such as a river.',
          hint: 'Review Class 6 concepts on poetic devices (c6_english_u3_025), specifically looking.',
          misconception: 'Students often confuse personification with literal magic or setting description, believing that if a river speaks in.',
          parts: [
                { id: 'a', prompt: 'What is personification? A) Comparing two things using "like" or "as" B) Giving human qualities, emotions, or actions to non-human objects or nature C).', answer: 'Giving human qualities, emotions, or actions to non-human objects or nature',
                  options: ['Giving human qualities, emotions, or actions to non-human objects or nature', 'splashing', 'flowing', 'whispering secrets'],
                  hint: 'Review Class 6 concepts on poetic devices (c6_english_u3_025), specifically looking at how.',
                  misconception: 'Students often confuse personification with literal magic or setting description, believing that if a river speaks in a story, the author.' },
                { id: 'b', prompt: 'Read this sentence: "The river stretched its silver arms across the valley to welcome Jahnavi." Which part of this sentence is an example of personification?', answer: 'The river is described as having "arms" and the ability to "welcome" someone',
                  options: ['The river is described as having "arms" and the ability to "welcome" someone', 'splashing', 'flowing', 'whispering secrets'],
                  hint: 'Review Class 6 concepts on poetic devices (c6_english_u3_025), specifically looking at how.',
                  misconception: 'Students often confuse personification with literal magic or setting description, believing that if a river speaks in a story, the author.' },
                { id: 'c', prompt: 'Analyze how the author uses verbs associated with human communication when describing the river in "The Day the River Spoke." How does this change our.', answer: 'It turns the setting from a passive background into an active participant',
                  options: ['It turns the setting from a passive background into an active participant', 'splashing', 'flowing', 'whispering secrets'],
                  hint: 'Review Class 6 concepts on poetic devices (c6_english_u3_025), specifically looking at how.',
                  misconception: 'Students often confuse personification with literal magic or setting description, believing that if a river speaks in a story, the author.' }
          ],
            remediations: { 'students-often-confuse-personification-with': { steps: ['If a student struggles, guide them with these steps: 1.', 'Ask them to read the sentence aloud and underline any action or body part mentioned (e.g., "arms," "whispering,".', 'Ask: "Can actual water do this on its own in real life?" 3.', 'If no, explain that the author is dressing up the river with human traits to make it feel like a living friend.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse personification with literal magic or setting description, believing that if a river speaks in.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Personification in \'The Day the River Spoke\' is unnecessary because Jahnavi could have just talked to an older villager about her.', answer: 'The correct answer with justification is A',
                  options: ['The correct answer with justification is A', 'splashing', 'flowing', 'whispering secrets'],
                  hint: 'Review Class 6 concepts on poetic devices (c6_english_u3_025), specifically looking at how.',
                  misconception: 'Students often confuse personification with literal magic or setting description, believing that if a river speaks in a story, the author.' }
          ],
            remediations: { 'students-often-confuse-personification-with': { steps: ['If a student struggles, guide them with these steps: 1.', 'Ask them to read the sentence aloud and underline any action or body part mentioned (e.g., "arms," "whispering,".', 'Ask: "Can actual water do this on its own in real life?" 3.', 'If no, explain that the author is dressing up the river with human traits to make it feel like a living friend.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_005', difficulty: 'standard',
          question: 'The plot of Jahnavi\'s conversation with the river represents a pivotal.',
          hint: 'Review node c7_engl_ch01_004 on personification and how authors use nature as a character.',
          misconception: 'Students often think that Jahnavi\'s conversation with the river is just a fairy-tale element meant to add magic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot of Jahnavi\'s conversation with the river represents a pivotal narrative turning',
                  options: ['The plot of Jahnavi\'s conversation with the river represents a pivotal narrative turning', 'The story setting encompasses the physical location, environmental details, and cultural', 'Character analysis of Jahnavi examines her traits, actions, speech, desires, and inner', 'Gender barriers to education refer to social, cultural, and economic obstacles that'],
                  hint: 'Review node c7_engl_ch01_004 on personification and how authors use nature as a character.',
                  misconception: 'Students often think that Jahnavi\'s conversation with the river is just a fairy-tale element meant to add magic, completely missing its.' }
          ],
            remediations: { 'jahnavi-s-conversation-with-the': { steps: ['When a student fails to grasp this, guide them back to the text by asking: "Who is actually doing the talking and.', 'Show them how Jahnavi\'s spoken words are actually her own hidden thoughts finally being brought into the open air.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_006', difficulty: 'standard',
          question: 'The theme of courage to pursue one\'s dreams explores a character\'s inner.',
          hint: 'Review node c7_engl_ch01_002 to remind yourself of Jahnavi\'s core dream and the barriers.',
          misconception: 'Students often think that a character has courage only if they perform a loud, dramatic, or physically dangerous act.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theme of courage to pursue one\'s dreams explores a character\'s inner strength,',
                  options: ['The theme of courage to pursue one\'s dreams explores a character\'s inner strength,', 'The story setting encompasses the physical location, environmental details, and cultural', 'Character analysis of Jahnavi examines her traits, actions, speech, desires, and inner', 'Gender barriers to education refer to social, cultural, and economic obstacles that'],
                  hint: 'Review node c7_engl_ch01_002 to remind yourself of Jahnavi\'s core dream and the barriers in her way.',
                  misconception: 'Students often think that a character has courage only if they perform a loud, dramatic, or physically dangerous act.' }
          ],
            remediations: { 'a-character-has-courage-only': { steps: ['To fix this misconception, guide the student to examine non-physical struggles.', 'Ask: \'Is it brave to stand up against unfair rules when everyone tells you to stay silent?\' Point out that quiet.', 'Have them list both quiet choices and loud actions taken by the character to show courage.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
