import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch12_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch12_p1',
    title: 'gtkjh izlkn f}osnh · Part 1/3',
    subtitle: 'Water was free — until someone owned the spring',
    classLevel: 12, subject: 'hin_ar', topic: 'gtkjh izlkn f}osnh · Part 1/3',
    chapters: ['c12_hin_ar_ch12'],
    nodeIds: ['c12_hin_ar_cbse_12_001', 'c12_hin_ar_cbse_12_002', 'c12_hin_ar_cbse_12_003', 'c12_hin_ar_cbse_12_004', 'c12_hin_ar_cbse_12_005', 'c12_hin_ar_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-fiction analyst', intro: 'A hill village, a drying spring, and one woman who will not accept water as charity. The real story is who controls the source.', goal: 'Read Kaale Megha Paani De as a critique of water inequality — nature\'s scarcity meeting power\'s capture.' },
    discovery: {
        question: 'In a Kumaon village, women walk kilometres for a pot of spring water while a hotel pipes it for tourists. Is the thirst natural — or arranged?',
        options: ['Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social', 'Purely natural drought', 'The village refused pipes', 'Hotels need water more'],
        answer: 'Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social',
        hook: 'The narrator first blames nature; the local, Jija, reveals the system — and her refusal of charity water is the story\'s thesis: \'not alms, but the right to water.\' Shekhar Joshi\'s hill realism turns a drink of water into a claim of dignity.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'This node provides the essential context and background for the Class 12 Hindi Aroh Chapter 12 "dkys es?kk ikuh ns" (The Thirsty Earth Asks for Water) by Shekhar Joshi, covering the author\'s life.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a spring from source to seizure: weigh geography against power in Uttarakhand\'s thirst, and judge Jija\'s refusal of water offered as charity.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are a Class 12 student in Delhi facing a summer water cut — you wait for the tanker, argue over buckets, and see the rich install borewells while.',
            decisions: [{ prompt: 'Who is the author of "dkys es?kk ikuh ns" and what is his primary literary region? (Recall level)', options: [
                { text: 'The author is Shekhar Joshi (शेखर जोशी), born in 1926 in Bageshwar, Uttarakhand', outcome: 'The author is Shekhar Joshi (शेखर जोशी), born in 1926 in Bageshwar, Uttarakhand.' },
                { text: 'es<d&eaMyh', outcome: 'Not quite — Students treat "Before You Read" as a skippable summary. They read the author\'s name and birth.', reveals: 'students-treat-before-you-read' },
                { text: 'Premchand or placing him in Rajasthan', outcome: 'Not quite — Students treat "Before You Read" as a skippable summary. They read the author\'s name and birth.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a web series where each episode reveals a letter that changes a family\'s fate — that\'s exactly how this story works.',
            decisions: [{ prompt: 'What is the narrative point of view used in the story "डाकिया के खत" and who is the narrator?', options: [
                { text: 'The story uses first-person retrospective point of view', outcome: 'The story uses first-person retrospective point of view; the narrator is an adult recalling.' },
                { text: 'third person', outcome: 'Not quite — Students think "plot = summary of events in order" and write a paragraph retelling the story.', reveals: 'plot-summary-of-events-in' },
                { text: 'the postman is the narrator', outcome: 'Not quite — Students think "plot = summary of events in order" and write a paragraph retelling the story.', reveals: 'plot-summary-of-events-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you found a diary written during a severe drought in your village.',
            decisions: [{ prompt: 'Who is the protagonist of "dkys es?kk ikuh ns" and what is their narrative perspective?', options: [
                { text: 'The protagonist is the first-person narrator ("eSa"), an educated, relatively privileged', outcome: 'The protagonist is the first-person narrator ("eSa"), an educated, relatively privileged observer.' },
                { text: 'central subject of the story\'s events', outcome: 'Not quite — Students often think the protagonist must be the "hero" or the most suffering character.', reveals: 'the-protagonist-must-be-the' },
                { text: 'the character through whose consciousness the story is filtered', outcome: 'Not quite — Students often think the protagonist must be the "hero" or the most suffering character.', reveals: 'the-protagonist-must-be-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a documentary about water scarcity in an Indian city.',
            decisions: [{ prompt: 'List the four supporting characters in "dkys es?kk ikuh ns" and give one defining action or dialogue for each.', options: [
                { text: 'The four supporting characters are: (1) banj lsuk (the elder girl)', outcome: 'The four supporting characters are: (1) banj lsuk (the elder girl) — defining action: carries water.' },
                { text: 'the poor people', outcome: 'Not quite — Students treat supporting characters as "minor" = "less important for exams".', reveals: 'students-treat-supporting-characters-as' },
                { text: 'the narrator or vague descriptions like "the poor people', outcome: 'Not quite — Students treat supporting characters as "minor" = "less important for exams".', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you see a small child tapping on your car window at a traffic signal, asking for food. You feel a pang of guilt but drive away.',
            decisions: [{ prompt: 'What is the primary theme of "dkys es?kk ikuh ns" in one sentence? (Recall the central idea the story revolves around.)', options: [
                { text: 'The primary theme is the stark inequality between the privileged and the destitute,', outcome: 'The primary theme is the stark inequality between the privileged and the destitute, exposing how.' },
                { text: 'the story is about two poor children', outcome: 'Not quite — Students often think the primary theme is "poverty" or "hunger" and the message is "we should help.', reveals: 'the-primary-theme-is-poverty' },
                { text: 'poverty', outcome: 'Not quite — Students often think the primary theme is "poverty" or "hunger" and the message is "we should help.', reveals: 'the-primary-theme-is-poverty' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family gathering, an uncle declares smartphones have ended loneliness: \'In the postman\'s day one letter decided everything; now everyone is one tap away.\' You recall the story where the man who carried everyone\'s letters died alone.',
            decisions: [{ prompt: 'What does \'डाकिया के खत\' add to the uncle\'s claim?', options: [
                { text: 'The adult narrator notes phones exist now — yet the frame\'s irony is that the postman who connected the whole village had no one to connect to him; technology changed the message\'s speed, not the human need for someone who stays.', outcome: 'The chapter reads connectivity and community as different variables: each letter was a structural hinge for a family\'s fate, and the connector himself ended in isolation — \'one tap away\' doesn\'t manufacture that bond.' },
                { text: 'Agree — instant messaging is objectively better than waiting weeks for a letter, so the loneliness argument is solved.', outcome: 'Speed isn\'t the variable the story measures: the village waited together for the postman, and the narrator\'s retrospective frame exists to show that shared anticipation was the connection — instant delivery removed the commons, not the isolation.', reveals: 'speed-equals-connection' },
                { text: 'Counter that letters were better because waiting built character — reject phones entirely.', outcome: 'The story doesn\'t romanticise scarcity — the death-letter\'s slow devastation shows what the wait cost; the frame critiques modern isolation without prescribing a return to the dak-bungalow era.', reveals: 'old-ways-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a water story as a rights story — where the poor beg for what nature gave freely, and dignity is refusing the beggar\'s bowl.',
            decisions: [{ prompt: 'What comes next? gtkjh izlkn f}osnh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — gtkjh izlkn f}osnh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_001', difficulty: 'standard',
          question: 'This node provides the essential context and background for the Class 12 Hindi.',
          hint: 'If stuck, revisit Class 11 Hindi node c11_hin_ar_cbse_01_001 (context for "Namak.',
          misconception: 'Students treat "Before You Read" as a skippable summary. They read the author\'s name and birth year, then jump to the.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "dkys es?kk ikuh ns" and what is his primary literary region? (Recall level)', answer: 'The author is Shekhar Joshi (शेखर जोशी), born in 1926 in Bageshwar, Uttarakhand',
                  options: ['The author is Shekhar Joshi (शेखर जोशी), born in 1926 in Bageshwar, Uttarakhand', 'es<d&eaMyh', 'Premchand or placing him in Rajasthan'],
                  hint: 'If stuck, revisit Class 11 Hindi node c11_hin_ar_cbse_01_001 (context for "Namak Ka Daroga") and.',
                  misconception: 'Students treat "Before You Read" as a skippable summary. They read the author\'s name and birth year, then jump to the story, missing that.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Have the student open a physical map of Uttarakhand, trace a ridge line, and mark where springs (naulas) would form.', 'Assign a 10-minute search: "Uttarakhand water crisis 2023 news" — list three headlines.', 'Re-read the "Before You Read" box aloud, pausing after each sentence to ask: "What does this tell me about the story\'s.', 'Re-attempt Diagnostic Question 2 — if still stuck, revisit Class 11 node c11_hin_ar_cbse_01_001 (context for "Namak.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_002', difficulty: 'standard',
          question: 'Plot and narrative structure in "डाकिया के खत" (or the story "डाकिया के खत".',
          hint: 'If stuck, review "Story vs Plot" distinction using a familiar film (e.g., *Sholay*.',
          misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.',
          parts: [
                { id: 'a', prompt: 'What is the narrative point of view used in the story "डाकिया के खत" and who is the narrator?', answer: 'The story uses first-person retrospective point of view',
                  options: ['The story uses first-person retrospective point of view', 'third person', 'the postman is the narrator', 'plot = summary of events in order'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a familiar film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' },
                { id: 'b', prompt: 'Explain how the episodic structure (letter by letter) controls the pacing of the story. Why doesn\'t the narrator tell all events in one continuous flow?', answer: 'The episodic structure creates rhythmic pauses',
                  options: ['The episodic structure creates rhythmic pauses', 'it\'s just how the story happened', 'plot = summary of events in order', '"plot = summary of events in order" and write a paragraph retelling the story'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a familiar film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' },
                { id: 'c', prompt: 'Map the five plot stages onto the story: identify the specific event that serves as the CLIMAX and justify why it\'s not the first or last letter.', answer: 'Climax = the letter announcing the son\'s death in war',
                  options: ['Climax = the letter announcing the son\'s death in war', 'plot = summary of events in order', '"plot = summary of events in order" and write a paragraph retelling the story'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a familiar film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' },
                { id: 'd', prompt: 'Compare the narrative time (how long the telling takes) vs. story time (how long the events take). What does the compression/expansion reveal about memory?', answer: 'Story time spans years (multiple letters over seasons)',
                  options: ['Story time spans years (multiple letters over seasons)', 'plot = summary of events in order', '"plot = summary of events in order" and write a paragraph retelling the story'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a familiar film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' }
          ],
            remediations: { 'plot-summary-of-events-in': { steps: ['Re-read ONLY the first and last paragraphs — identify the frame (adult narrator speaking).', 'List every letter mentioned in order with one-line effect on villagers.', 'Draw a plot mountain on paper — place each letter on it.', 'Ask "Why THIS order?" for each transition. Re-do Diagnostic Q3 after this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.',
          parts: [
                { id: 'a', prompt: 'Evaluate: Does the frame narrative (adult narrator bookending the childhood memory) strengthen or weaken the story\'s social commentary on rural communication?', answer: 'Strengthens',
                  options: ['Strengthens', 'plot = summary of events in order', '"plot = summary of events in order" and write a paragraph retelling the story'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a familiar film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' },
                { id: 'b', prompt: 'Create a 3-panel storyboard sketch (describe in words) for a film adaptation that visually represents the narrative structure\'s shift from collective hope.', answer: 'Panel 1: Wide shot of village square at dawn',
                  options: ['Panel 1: Wide shot of village square at dawn', 'plot = summary of events in order', '"plot = summary of events in order" and write a paragraph retelling the story'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a familiar film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' }
          ],
            remediations: { 'plot-summary-of-events-in': { steps: ['Re-read ONLY the first and last paragraphs — identify the frame (adult narrator speaking).', 'List every letter mentioned in order with one-line effect on villagers.', 'Draw a plot mountain on paper — place each letter on it.', 'Ask "Why THIS order?" for each transition. Re-do Diagnostic Q3 after this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_003', difficulty: 'standard',
          question: 'Setting in prose fiction refers to the time, place, and social environment.',
          hint: 'Review the \'Imagery and Metaphor\' node (c11_hin_ar_cbse_12_008) for sensory.',
          misconception: 'Students often treat setting as a static list of time/place facts (e.g., "village, summer, drought") and atmosphere.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the author uses the nickname "बंज लसुक" to establish both setting and atmosphere simultaneously.', answer: 'The nickname "बंज लसुक" (given',
                  options: ['The nickname "बंज लसुक" (given', 'it shows they are poor'],
                  hint: 'Review the \'Imagery and Metaphor\' node (c11_hin_ar_cbse_12_008) for sensory identification.',
                  misconception: 'Students often treat setting as a static list of time/place facts (e.g., "village, summer, drought") and atmosphere as a single adjective.' },
                { id: 'b', prompt: 'Analyze how the contrast between the landlord\'s household (thth) and the poor families\' experience of the same drought creates a layered atmosphere.', answer: 'Contrast 1: Water access',
                  options: ['Contrast 1: Water access', 'the poor suffer', 'only describes one side (e'],
                  hint: 'Review the \'Imagery and Metaphor\' node (c11_hin_ar_cbse_12_008) for sensory identification.',
                  misconception: 'Students often treat setting as a static list of time/place facts (e.g., "village, summer, drought") and atmosphere as a single adjective.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot move beyond static description, assign this 3-step remediation: 1) Re-read the opening and closing.', '2) Map each change to either setting (water level, time of day, crowd at well) or atmosphere (tone of narrator, mood.', '3) Write one paragraph explaining how a specific setting change (e.g., the well drying further) directly causes.', 'Revisit c11_hin_ar_cbse_12_003 for the foundational framework of setting-atmosphere interaction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves a systematic examination of the.',
          hint: 'If stuck, review the definition of "first-person protagonist" in c11_hin_ar_cbse_12_004.',
          misconception: 'Students often think the protagonist must be the "hero" or the most suffering character.',
          parts: [
                { id: 'a', prompt: 'Find two passages where the narrator\'s internal monologue questions social or scientific progress.', answer: 'Passage 1: "foKku dk viuk roZQ gS vkSj fo\'okl dk viuk lkeF;ZA"',
                  options: ['Passage 1: "foKku dk viuk roZQ gS vkSj fo\'okl dk viuk lkeF;ZA"', 'the protagonist must be the "hero" or the most suffering character'],
                  hint: 'If stuck, review the definition of "first-person protagonist" in c11_hin_ar_cbse_12_004 and.',
                  misconception: 'Students often think the protagonist must be the "hero" or the most suffering character.' }
          ],
            remediations: { 'the-protagonist-must-be-the': { steps: ['Re-read the opening paragraph: identify every "eSa" (I) and "esjk" (my).', 'List 5 things the narrator does vs.', 'Review node c11_hin_ar_cbse_12_004 (Class 11 Protagonist Analysis) for the definition of "first-person protagonist".', 'Complete the diagnostic question 1 again, then write a one-sentence distinction: "The protagonist is the ___; the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_005', difficulty: 'standard',
          question: 'Supporting characters are figures in a narrative who are not the central focus.',
          hint: 'If stuck on "function in story", review the concept of "foil character" from Class 11.',
          misconception: 'Students treat supporting characters as "minor" = "less important for exams".',
          parts: [
                { id: 'a', prompt: 'List the four supporting characters in "dkys es?kk ikuh ns" and give one defining action or dialogue for each.', answer: 'The four supporting characters are: (1) banj lsuk (the elder girl)',
                  options: ['The four supporting characters are: (1) banj lsuk (the elder girl)', 'the poor people', 'the narrator or vague descriptions like "the poor people'],
                  hint: 'If stuck on "function in story", review the concept of "foil character" from Class 11.',
                  misconception: 'Students treat supporting characters as "minor" = "less important for exams".' },
                { id: 'b', prompt: 'Explain why the children are called "es<d&eaMyh" (half-mother) by the neighbourhood. What does this name reveal about their social reality?', answer: 'The name "es<d&eaMyh" is given',
                  options: ['The name "es<d&eaMyh" is given', 'it\'s just a nickname', 'because they look alike'],
                  hint: 'If stuck on "function in story", review the concept of "foil character" from Class 11.',
                  misconception: 'Students treat supporting characters as "minor" = "less important for exams".' },
                { id: 'c', prompt: 'Compare the narrator\'s wife (esjh fj\'rs) and thth as two mothers facing water scarcity. How do their contrasting responses structure the story\'s class critique?', answer: 'Similarity: Both are mothers protecting children',
                  options: ['Similarity: Both are mothers protecting children', 'both are kind mothers'],
                  hint: 'If stuck on "function in story", review the concept of "foil character" from Class 11.',
                  misconception: 'Students treat supporting characters as "minor" = "less important for exams".' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If the student cannot move beyond trait-listing: 1.', 'Have them create a 3-column table: Character | Textual Evidence (quote + page) | Function in Story (plot/theme/foil).', 'Assign them to find *only* thth\'s dialogues in the last 3 pages (pp.', '94-96) and annotate each with: "What does she reveal about the narrator?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea that the.',
          hint: 'If stuck, revisit the Class 11 theme-analysis nodes (especially c11_hin_ar_cbse_13_006).',
          misconception: 'Students often think the primary theme is "poverty" or "hunger" and the message is "we should help the poor." This.',
          parts: [
                { id: 'a', prompt: 'Analyze how the contrast between the narrator\'s comfortable kitchen ("xqM+ vkSj pus ls cuk ,d izdkj dk yaw") and the children\'s "dhpM+ dk¡nks" (hollow eyes).', answer: 'The kitchen represents insulated privilege (the narrator\'s "cqokbZ"',
                  options: ['The kitchen represents insulated privilege (the narrator\'s "cqokbZ"', 'poverty', 'hunger', 'we should help the poor'],
                  hint: 'If stuck, revisit the Class 11 theme-analysis nodes (especially c11_hin_ar_cbse_13_006) and re-read.',
                  misconception: 'Students often think the primary theme is "poverty" or "hunger" and the message is "we should help the poor." This is incorrect because the.' }
          ],
            remediations: { 'the-primary-theme-is-poverty': { steps: ['If the student cannot distinguish theme from subject/message from moral, do this 3-step remediation: (1) Re-read the.', '(2) Convert each underlined claim into a "Theme Statement" (e.g., "Society treats survival as charity" → Theme.', '(3) Write one paragraph answering: "If the author wanted to teach \'help the poor,\' how would the ending change?" This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
