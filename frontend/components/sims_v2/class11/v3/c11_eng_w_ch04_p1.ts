import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch04_p1: SimDef = {
    id: 'v3_c11_eng_w_ch04_p1',
    title: 'The Adventure of the Three Garridebs (Short Story) · Part 1/3',
    subtitle: 'See through the inheritance story to the press under the floorboards.',
    classLevel: 11, subject: 'eng_w', topic: 'The Adventure of the Three Garridebs (Short Story) · Part 1/3',
    chapters: ['c11_eng_w_ch04'],
    nodeIds: ['c11_eng_w_cbse_04_001', 'c11_eng_w_cbse_04_002', 'c11_eng_w_cbse_04_003', 'c11_eng_w_cbse_04_004', 'c11_eng_w_cbse_04_005', 'c11_eng_w_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Watson, narrating a case he misunderstood until the end', intro: 'An American lawyer, a name worth millions, a harmless recluse — Holmes hears the counterfeiters\' machinery already turning.', goal: 'Separate the decoy plot from the real one and map the story\'s structural beats.' },
    discovery: {
        question: 'Most of this Holmes story follows a hunt for a third man named Garrideb to claim millions. What is the plot actually about?',
        options: ['Luring a collector out of his room so a killer can reach the counterfeiting press buried beneath it', 'A genuine inheritance shared by three men with a rare surname', 'A legal dispute over an American estate', 'A missing-persons case solved by advertisement'],
        answer: 'Luring a collector out of his room so a killer can reach the counterfeiting press buried beneath it',
        hook: 'The story is a double helix — Watson chases the whimsical fake plot while Holmes reads the real one in an American spelling and a frayed coat.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'The Adventure of the Three Garridebs\' (Woven Words, ch. 4) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the false inheritance trail from the true criminal plot, then place the inciting incident, the Birmingham trick and the cellar climax.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'The Adventure of the Three Garridebs\', then the period, then the literary context — background turns a text from a puzzle into.',
            decisions: [{ prompt: 'Who is the narrator of *The Adventure of the Three Garridebs*, and what is his professional relationship to Sherlock Holmes?', options: [
                { text: 'The narrator is Dr', outcome: 'The narrator is Dr. John Watson, a medical doctor and Holmes\'s flatmate, chronicler, and frequent.' },
                { text: 'Holmes narrates', outcome: 'Not quite — Students often think "context" means memorizing the author\'s birth/death dates and the story\'s.', reveals: 'context-means-memorizing-the-author' },
                { text: 'an omniscient narrator', outcome: 'Not quite — Students often think "context" means memorizing the author\'s birth/death dates and the story\'s.', reveals: 'context-means-memorizing-the-author' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'The Adventure of the Three Garridebs\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the primary role of a protagonist in a short story, and how does Sherlock Holmes fulfill this role in "The Adventure of the Three.', options: [
                { text: 'The protagonist is the central character who drives the plot forward through their', outcome: 'The protagonist is the central character who drives the plot forward through their actions and.' },
                { text: 'Three Garridebs', outcome: 'Not quite — Students often think character analysis means listing adjectives (e.g., "Holmes is smart.', reveals: 'character-analysis-means-listing-adjectives' },
                { text: 'Holmes is smart, observant, cold', outcome: 'Not quite — Students often think character analysis means listing adjectives (e.g., "Holmes is smart.', reveals: 'character-analysis-means-listing-adjectives' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'The Adventure of the Three Garridebs\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List the two main supporting characters in "The Adventure of the Three Garridebs" and state their stated professions/identities when first.', options: [
                { text: 'The two main supporting characters are John Garrideb (introduced as a Counsellor at Law', outcome: 'The two main supporting characters are John Garrideb (introduced as a Counsellor at Law from.' },
                { text: 'Holmes or Watson, or missing one', outcome: 'Not quite — Students often treat John Garrideb as merely a "greedy lawyer" and Nathan Garrideb as merely.', reveals: 'students-often-treat-john-garrideb' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'The Adventure of the Three Garridebs\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the difference between the plot of a story and its primary theme?', options: [
                { text: 'The plot is the sequence of events that happen in the story (e.g., Holmes investigates a', outcome: 'The plot is the sequence of events that happen in the story (e.g., Holmes investigates a fake.' },
                { text: 'what happens', outcome: 'Not quite — Students often believe the primary theme is simply "Sherlock Holmes solves a mystery" or "greed.', reveals: 'the-primary-theme-is-simply' },
                { text: 'what it means', outcome: 'Not quite — Students often believe the primary theme is simply "Sherlock Holmes solves a mystery" or "greed.', reveals: 'the-primary-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your mystery-writing club studies \'The Adventure of the Three Garridebs\'. A member plots a knockoff where the detective just \'gets lucky and guesses the villain\', dismissing the story\'s real references — 1902 London addresses, the South African War, an American criminal — as \'period clutter we can delete\'.',
            decisions: [{ prompt: 'What do those \'clutter\' details actually do?', options: [
                { text: 'They\'re the realism engine of the genre: verifiable London geography, dated history (Boer War service) and the American underworld anchor Holmes\'s deductions in a checkable world, so readers feel the reasoning is earned, not authorial luck. Detective fiction\'s contract is that clues + context yield the solution — delete the anchors and deduction collapses into guessing.', outcome: 'The genre lives on the illusion that you could verify it all; real-world reference is load-bearing, not decorative.' },
                { text: 'The member is right — dates and street names are trivia; a detective can solve by pure intuition.', outcome: 'Holmes\'s method is contextual inference — era, place and record are the evidence; \'lucky guessing\' breaks the genre\'s promise of reproducible reasoning.', reveals: 'deduction-is-lucky-guessing' },
                { text: 'Swap 1902 London for a fantasy city — deductions work in invented worlds equally well.', outcome: 'Invented settings let authors cheat (any fact can be conjured); the Holmes contract requires a real, fixed world the reader could in principle audit.', reveals: 'realism-is-optional-in-mystery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'The absurdity was the bait — a \'whimsical\' will lowered a collector\'s guard better than any robbery could.',
            decisions: [{ prompt: 'What comes next? The Adventure of the Three Garridebs (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Adventure of the Three Garridebs (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_001', difficulty: 'standard',
          question: '\'The Adventure of the Three Garridebs\' (Woven Words, ch. 4) — the context and.',
          hint: 'If stuck, review c8_engl_ch3_4 (Detective Genre: Clues, Deduction, and Problem-Solving).',
          misconception: 'Students often think "context" means memorizing the author\'s birth/death dates and the story\'s publication year.',
          parts: [
                { id: 'a', prompt: 'Who is the narrator of *The Adventure of the Three Garridebs*, and what is his professional relationship to Sherlock Holmes?', answer: 'The narrator is Dr',
                  options: ['The narrator is Dr', 'Holmes narrates', 'an omniscient narrator', 'context'],
                  hint: 'If stuck, review c8_engl_ch3_4 (Detective Genre: Clues, Deduction, and Problem-Solving) and.',
                  misconception: 'Students often think "context" means memorizing the author\'s birth/death dates and the story\'s publication year.' },
                { id: 'b', prompt: 'In the textbook\'s "Look for these expressions" box, the phrase *syncopated dialogue* appears.', answer: '*Syncopated dialogue* implies a disjointed, irregular, or deliberately paced',
                  options: ['*Syncopated dialogue* implies a disjointed, irregular, or deliberately paced', 'it means they spoke at the same time', 'context'],
                  hint: 'If stuck, review c8_engl_ch3_4 (Detective Genre: Clues, Deduction, and Problem-Solving) and.',
                  misconception: 'Students often think "context" means memorizing the author\'s birth/death dates and the story\'s publication year.' }
          ],
            remediations: { 'context-means-memorizing-the-author': { steps: ['If a student reduces context to biography, do this: 1) Hand them a 1902 London map and ask them to trace Little Ryder.', '2) Show a 1902 newspaper snippet about Boer War veterans turning to crime.', '3) Have them role-play Holmes reading the directory: "Why does *this* name appear *now*?" 4) Require them to rewrite.', 'This forces context to function as analytical leverage, not trivia.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context" means memorizing the author\'s birth/death dates and the story\'s publication year.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of using a "whimsical" premise (three men named Garrideb inheriting millions) to lure a criminal.', answer: 'More plausible within the genre: the absurdity lowers the victim\'s guard (Nathan',
                  options: ['More plausible within the genre: the absurdity lowers the victim\'s guard (Nathan', 'context'],
                  hint: 'If stuck, review c8_engl_ch3_4 (Detective Genre: Clues, Deduction, and Problem-Solving) and.',
                  misconception: 'Students often think "context" means memorizing the author\'s birth/death dates and the story\'s publication year.' }
          ],
            remediations: { 'context-means-memorizing-the-author': { steps: ['If a student reduces context to biography, do this: 1) Hand them a 1902 London map and ask them to trace Little Ryder.', '2) Show a 1902 newspaper snippet about Boer War veterans turning to crime.', '3) Have them role-play Holmes reading the directory: "Why does *this* name appear *now*?" 4) Require them to rewrite.', 'This forces context to function as analytical leverage, not trivia.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'The Adventure of the Three Garridebs\' — what.',
          hint: 'If stuck, re-read the story focusing only on Holmes\'s actions and deductions (ignore.',
          misconception: 'Students conflate the *fake inheritance plot* (three Garridebs, five million dollars, Birmingham trip) with the *actual.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'The Adventure of the Three Garridebs\'',
                  options: ['The plot/narrative arc of \'The Adventure of the Three Garridebs\'', '\'The Adventure of the Three Garridebs\' (Woven Words, ch', 'The setting of \'The Adventure of the Three Garridebs\'', 'Character analysis in \'The Adventure of the Three Garridebs\''],
                  hint: 'If stuck, re-read the story focusing only on Holmes\'s actions and deductions (ignore Watson\'s.',
                  misconception: 'Students conflate the *fake inheritance plot* (three Garridebs, five million dollars, Birmingham trip) with the *actual narrative plot*.' }
          ],
            remediations: { 'students-conflate-the-fake-inheritance': { steps: ['Draw a two-column table: left column \'Fake Plot Events\' (letter, directory search, John Garrideb\'s tale, advertisement.', 'Ask the student to match each fake event to its real purpose (e.g., advertisement → lure Nathan out).', 'Have them retell the story in 3 sentences using only the right column.', 'Finally, rewrite the plot pyramid using only real-plot events.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_003', difficulty: 'standard',
          question: 'The setting of \'The Adventure of the Three Garridebs\' — the place, time and.',
          hint: 'If stuck, re-read the Class 7 "The Tunnel" nodes (c7_engl_ch04_005, c7_engl_ch04_008) and.',
          misconception: 'Students often treat setting as a static "background painting" and atmosphere as a single adjective ("scary," "cozy").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'The Adventure of the Three Garridebs\'',
                  options: ['The setting of \'The Adventure of the Three Garridebs\'', '\'The Adventure of the Three Garridebs\' (Woven Words, ch', 'The plot/narrative arc of \'The Adventure of the Three Garridebs\'', 'Character analysis in \'The Adventure of the Three Garridebs\''],
                  hint: 'If stuck, re-read the Class 7 "The Tunnel" nodes (c7_engl_ch04_005, c7_engl_ch04_008) and practice.',
                  misconception: 'Students often treat setting as a static "background painting" and atmosphere as a single adjective ("scary," "cozy").' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student create a two-column table: Column A = "Daytime Visit Details" (quote 5 phrases), Column B = "Night.', 'Ask: "Which column feels like a comedy?', 'Which feels like a thriller?', 'Guide them to write one PEEL paragraph: *Point* (Atmosphere shifts), *Evidence* (contrast "golden and wonderful".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_004', difficulty: 'standard',
          question: 'Character analysis in \'The Adventure of the Three Garridebs\' — the central.',
          hint: 'If stuck, review the PEEL paragraph structure from Class 9 (c9_engl_ch6_2) and the list.',
          misconception: 'Students often think character analysis means listing adjectives (e.g., "Holmes is smart, observant, cold") without.',
          parts: [
                { id: 'a', prompt: 'Apply the PEEL method to analyze one trait of Holmes (e.g., his observational skill) using a specific moment from the text. Write a complete PEEL paragraph.', answer: 'Point: Holmes possesses extraordinary observational skills',
                  options: ['Point: Holmes possesses extraordinary observational skills', 'Holmes is smart, observant, cold', 'character analysis means listing adjectives (e'],
                  hint: 'If stuck, review the PEEL paragraph structure from Class 9 (c9_engl_ch6_2) and the list of Holmes\'s.',
                  misconception: 'Students often think character analysis means listing adjectives (e.g., "Holmes is smart, observant, cold") without proving each trait with.' }
          ],
            remediations: { 'character-analysis-means-listing-adjectives': { steps: ['If a student lists traits without evidence, have them reread the story with a highlighter, marking every action Holmes.', 'Then, for each highlighted action, ask: "What does this action show about him?" and "Why does it matter to the plot?".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_005', difficulty: 'standard',
          question: 'Supporting characters in \'The Adventure of the Three Garridebs\' — the secondary.',
          hint: 'Review the STEAL method practiced in c11_eng_w_cbse_04_004 and the plot timeline.',
          misconception: 'Students often treat John Garrideb as merely a "greedy lawyer" and Nathan Garrideb as merely a "foolish old man." The.',
          parts: [
                { id: 'a', prompt: 'Using the STEAL method (Speech, Thoughts, Effect on others, Actions, Looks), complete a character trait chart for Nathan Garrideb with one textual example for.', answer: 'S (Speech): "Syracusan—of the best period',
                  options: ['S (Speech): "Syracusan—of the best period', 'Cadaverous face', 'large round spectacles', 'goat\'s beard'],
                  hint: 'Review the STEAL method practiced in c11_eng_w_cbse_04_004 and the plot timeline.',
                  misconception: 'Students often treat John Garrideb as merely a "greedy lawyer" and Nathan Garrideb as merely a "foolish old man." The specific error.' }
          ],
            remediations: { 'students-often-treat-john-garrideb': { steps: ['Re-read the two interview scenes (John\'s first visit pp.', '42-47) with a highlighter, marking every physical detail and direct quote in two colors.', 'Create a T-chart: "What the character says about themselves" vs.', '"What Holmes/narrator reveals." 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_006', difficulty: 'standard',
          question: 'The primary theme of \'The Adventure of the Three Garridebs\' — the central idea.',
          hint: 'If stuck, review the plot node (c11_eng_w_cbse_04_002) to recall the sequence of the.',
          misconception: 'Students often believe the primary theme is simply "Sherlock Holmes solves a mystery" or "greed leads to downfall.".',
          parts: [
                { id: 'a', prompt: 'Analyse how the contrast between Holmes\'s "cold mask" and his reaction to Watson\'s injury contributes to the story\'s message about loyalty.', answer: 'Throughout the story, Holmes appears detached and purely intellectual',
                  options: ['Throughout the story, Holmes appears detached and purely intellectual', 'Sherlock Holmes solves a mystery', 'greed leads to downfall'],
                  hint: 'If stuck, review the plot node (c11_eng_w_cbse_04_002) to recall the sequence of the ruse, Holmes\'s.',
                  misconception: 'Students often believe the primary theme is simply "Sherlock Holmes solves a mystery" or "greed leads to downfall." They miss that the.' }
          ],
            remediations: { 'the-primary-theme-is-simply': { steps: ['If a student confuses plot with theme, guide them through this three-step remediation: 1) Have them list the five main.', '2) Ask: "What idea connects these events?', 'What is the author saying about deception, observation, or human nature *through* these events?" 3) Have them complete.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
