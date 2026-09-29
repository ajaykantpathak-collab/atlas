import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch05_p1: SimDef = {
    id: 'v3_c12_eng_v_ch05_p1',
    title: 'On the Face of It · Part 1/3',
    subtitle: 'A tin leg, a burned face, and a garden with no locked gate',
    classLevel: 12, subject: 'eng_v', topic: 'On the Face of It · Part 1/3',
    chapters: ['c12_eng_v_ch05'],
    nodeIds: ['c12_eng_v_cbse_05_001', 'c12_eng_v_cbse_05_002', 'c12_eng_v_cbse_05_003', 'c12_eng_v_cbse_05_004', 'c12_eng_v_cbse_05_005', 'c12_eng_v_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Drama reader', intro: 'Two people the world keeps misreading meet in a garden. One afternoon is enough to change what a face means.', goal: 'Read On the Face of It as a study of alienation and connection — disability as circumstance, not subject.' },
    discovery: {
        question: 'An old man with a tin leg and a boy with a burned face meet in a garden. \'It\'s a play about disability,\' says a classmate. What\'s the truer subject?',
        options: ['Alienation — not the impairments but others\' reactions to them; the play asks what bond forms between two people the world keeps staring at', 'Correct — disability is the theme', 'The garden is the theme', 'It\'s about growing apples'],
        answer: 'Alienation — not the impairments but others\' reactions to them; the play asks what bond forms between two people the world keeps staring at',
        hook: 'The \'before you read\' label calls Derry \'defiant\' — yet his first lines are pure panic. Hold context lightly: the play isn\'t about a tin leg or a scar, it\'s about the loneliness both carried into the garden and the friendship neither expected.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'On the Face of It\' (Vistas, ch. 5) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit in Mr Lamb\'s garden through one afternoon: track how crab-apple talk, bees and open gates dismantle a boy\'s defences — and decide what the title\'s \'face of it\' really judges.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'On the Face of It\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What is the genre of "On the Face of It" and who is the author?', options: [
                { text: 'The genre is a one-act play (drama) and the author is Susan Hill', outcome: 'The genre is a one-act play (drama) and the author is Susan Hill.' },
                { text: 'short story', outcome: 'Not quite — Students treat the "Before you read" box as a spoiler or a summary to be memorised for exams.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'On the Face of It\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What are the three distinct physical settings in the play "On the Face of It" and which scene occurs in each?', options: [
                { text: 'The three settings are: (1) Mr', outcome: 'The three settings are: (1) Mr. Lamb\'s garden — Scene One and Scene Three; (2) Derry\'s house.' },
                { text: 'garden', outcome: 'Not quite — Students treat setting as "where the story happens" (a static backdrop) and atmosphere as "the.', reveals: 'students-treat-setting-as-where' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'On the Face of It\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is Derry’s physical condition and how did it happen, according to the text?', options: [
                { text: 'Derry is a 14-year-old boy with one side of his face burned by acid ("I got acid all down', outcome: 'Derry is a 14-year-old boy with one side of his face burned by acid ("I got acid all down that side.' },
                { text: 'fire burn', outcome: 'Not quite — Students often treat Derry’s change as a **sudden epiphany** caused by Mr Lamb’s "magic words.".', reveals: 'students-often-treat-derry-s' },
                { text: 'birth defect', outcome: 'Not quite — Students often treat Derry’s change as a **sudden epiphany** caused by Mr Lamb’s "magic words.".', reveals: 'students-often-treat-derry-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'On the Face of It\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Name the two supporting characters who physically appear on stage in "On the Face of It" and state one key difference in how each responds.', options: [
                { text: 'The two supporting characters who appear on stage are Mr', outcome: 'The two supporting characters who appear on stage are Mr. Lamb (Scene One and Three) and Derry\'s.' },
                { text: 'the woman at the bus stop', outcome: 'Not quite — Students treat Mr. Lamb as a "magical mentor" who "fixes" Derry through wisdom — writing answers.', reveals: 'students-treat-mr' },
                { text: 'kids who call him Lamey-Lamb', outcome: 'Not quite — Students treat Mr. Lamb as a "magical mentor" who "fixes" Derry through wisdom — writing answers.', reveals: 'students-treat-mr' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'On the Face of It\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of "On the Face of It" as distinct from its subject matter (a boy with a burned face and an old man with a tin.', options: [
                { text: 'The primary theme is that human connection and self-acceptance can overcome the', outcome: 'The primary theme is that human connection and self-acceptance can overcome the alienation caused.' },
                { text: 'the play is about a burned boy and a lame man', outcome: 'Not quite — Students conflate the primary theme with the moral "don\'t judge by appearances" or "beauty is skin.', reveals: 'students-conflate-the-primary-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A new teammate with a facial scar always sits alone at lunch and skips group events. You\'ve had one warm conversation with her and promised \'I\'ll sit with you tomorrow\' — then your own friends pull you to their table.',
            decisions: [{ prompt: 'What does \'On the Face of It\' say about your promise?', options: [
                { text: 'Keep it — actually go back. Mr Lamb\'s bitter aside \'They never do come back\' exists because kindness without return is the pattern; Derry\'s return matters precisely because everyone else failed to, and the tragedy is arriving after the chance is gone.', outcome: 'The play\'s three-scene arc builds everything on whether Derry returns; the garden means nothing as a one-visit kindness and everything as a chosen connection — your table tomorrow is the point, not your sympathy today.' },
                { text: 'She probably prefers being left alone anyway, like Derry claims to.', outcome: 'That\'s the misreading the play dismantles — Derry\'s \'I don\'t care\' is armour built from others\' stares, not preference; Mr Lamb reads the withdrawal as a wound to be answered with welcome, not respected as a wish.', reveals: 'withdrawal-equals-preference' },
                { text: 'One kind conversation already counts — you showed her someone cares.', outcome: 'The off-stage fall makes the point brutally: single visits don\'t save anyone, and the window is short; the play measures connection by the return, not the first approach.', reveals: 'one-visit-is-enough' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a one-act play for its bond, not its plot — and spot how other people\'s staring does the actual damage.',
            decisions: [{ prompt: 'What comes next? On the Face of It · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — On the Face of It · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_001', difficulty: 'standard',
          question: '\'On the Face of It\' (Vistas, ch. 5) — the context and background to this text.',
          hint: 'If stuck, review c10_engl_cbse_09_001 (The Proposal: one-act play basics) and.',
          misconception: 'Students treat the "Before you read" box as a spoiler or a summary to be memorised for exams, rather than as an active.',
          parts: [
                { id: 'a', prompt: 'What is the genre of "On the Face of It" and who is the author?', answer: 'The genre is a one-act play (drama) and the author is Susan Hill',
                  options: ['The genre is a one-act play (drama) and the author is Susan Hill', 'short story'],
                  hint: 'If stuck, review c10_engl_cbse_09_001 (The Proposal: one-act play basics) and c11_eng_h_cbse_01_001.',
                  misconception: 'Students treat the "Before you read" box as a spoiler or a summary to be memorised for exams, rather than as an active reading lens.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['If a student cannot articulate the central question or uses the box only for factual recall: (1) Have them re-read the.', '(2) Ask: "If you were the director, what would you tell the actors to focus on in every scene?" (Answer: the growing.', '(3) Give a 2-minute timed re-read of Scene One with the instruction: "Mark every moment where Derry or Mr Lamb shows.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the "Before you read" box as a spoiler or a summary to be memorised for exams, rather than as an active.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The \'Before you read\' box tells us the play is about disability." Is this claim accurate, partially accurate, or inaccurate?', answer: 'Partially accurate',
                  options: ['Partially accurate', 'accurate', 'inaccurate'],
                  hint: 'If stuck, review c10_engl_cbse_09_001 (The Proposal: one-act play basics) and c11_eng_h_cbse_01_001.',
                  misconception: 'Students treat the "Before you read" box as a spoiler or a summary to be memorised for exams, rather than as an active reading lens.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['If a student cannot articulate the central question or uses the box only for factual recall: (1) Have them re-read the.', '(2) Ask: "If you were the director, what would you tell the actors to focus on in every scene?" (Answer: the growing.', '(3) Give a 2-minute timed re-read of Scene One with the instruction: "Mark every moment where Derry or Mr Lamb shows.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'On the Face of It\' — what happens, in what order.',
          hint: 'Review c11_eng_h_cbse_01_002 (Plot and Narrative Structure) and c9_engl_ch6_4 (Dramatic.',
          misconception: 'Students often treat the play as a simple "meeting of two disabled people" and miss that the *structure itself* enacts.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "dramatic irony" to the ending of Scene One when Derry says, "I\'ll come back. You see.', answer: 'The audience hears Mr Lamb\'s closing aside: "They never do, though',
                  options: ['The audience hears Mr Lamb\'s closing aside: "They never do, though', 'Derry doesn\'t know Mr Lamb will fall'],
                  hint: 'Review c11_eng_h_cbse_01_002 (Plot and Narrative Structure) and c9_engl_ch6_4 (Dramatic Structure).',
                  misconception: 'Students often treat the play as a simple "meeting of two disabled people" and miss that the *structure itself* enacts the theme: Scene One.' }
          ],
            remediations: { 'students-often-treat-the-play': { steps: ['Have the student draw a three-box storyboard: Box 1 = Garden (Day), Box 2 = House (Evening), Box 3 = Garden (Night).', 'In each box, write ONE stage direction and ONE line of dialogue that shows Derry\'s emotional state.', 'Connect the boxes with arrows labeled "Derry leaves," "Derry returns." 4.', 'Ask: "What happens in the white space between boxes?" This makes the off-stage action visible and forces attention.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_003', difficulty: 'standard',
          question: 'The setting of \'On the Face of It\' — the place, time and atmosphere the text.',
          hint: 'If stuck, review c11_eng_h_cbse_01_003 (PEEL method for setting analysis) and.',
          misconception: 'Students treat setting as "where the story happens" (a static backdrop) and atmosphere as "the mood" (a vague feeling).',
          parts: [
                { id: 'a', prompt: 'What are the three distinct physical settings in the play "On the Face of It" and which scene occurs in each?', answer: 'The three settings are: (1) Mr',
                  options: ['The three settings are: (1) Mr', 'garden'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_003 (PEEL method for setting analysis) and c7_engl_ch04_008.',
                  misconception: 'Students treat setting as "where the story happens" (a static backdrop) and atmosphere as "the mood" (a vague feeling), missing that.' },
                { id: 'b', prompt: 'Analyze how the seasonal setting (September, ripe crab apples, "magic fruit") functions as more than background.', answer: 'September = harvest, completion, but also transition toward winter',
                  options: ['September = harvest, completion, but also transition toward winter', 'it shows it\'s autumn', 'says "it shows it\'s autumn" misses the metaphor: ripeness = readiness for change'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_003 (PEEL method for setting analysis) and c7_engl_ch04_008.',
                  misconception: 'Students treat setting as "where the story happens" (a static backdrop) and atmosphere as "the mood" (a vague feeling), missing that.' }
          ],
            remediations: { 'students-treat-setting-as-where': { steps: ['Re-read Scene One aloud, circling every sensory word (sound, sight, touch, smell).', 'Make a three-column table: Scene One / Scene Two / Scene Three — list physical details in each.', 'For each detail, ask: "What feeling does this create? How does it change?"', 'Revisit node c11_eng_h_cbse_01_003 (Class 11 Hornbill Ch1 Setting and Atmosphere) for the PEEL framework applied.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_004', difficulty: 'standard',
          question: 'Character analysis in \'On the Face of It\' — the central figure(s), their.',
          hint: 'If stuck on indirect characterization, review the "STEAL" method (Speech, Thoughts.',
          misconception: 'Students often treat Derry’s change as a **sudden epiphany** caused by Mr Lamb’s "magic words." In reality, Derry.',
          parts: [
                { id: 'a', prompt: 'Why does Derry say, "People are afraid of me," and what does this reveal about his self-perception?', answer: 'Derry believes people recoil at his face ("You think',
                  options: ['Derry believes people recoil at his face ("You think', 'people stare'],
                  hint: 'If stuck on indirect characterization, review the "STEAL" method (Speech, Thoughts, Effect.',
                  misconception: 'Students often treat Derry’s change as a **sudden epiphany** caused by Mr Lamb’s "magic words." In reality, Derry resists at every step:.' }
          ],
            remediations: { 'students-often-treat-derry-s': { steps: ['Re-read **only Derry’s lines** in Scene 1 (highlight in one colour) and Scene 2 (another colour).', 'Make a two-column table: "Defensive Language" vs "Open Language" — fill with quotes.', 'Ask: "At what exact moment does Derry *decide* to return?" (Answer: after Mr Lamb says "Once you got home, you’d never.', 'Re-attempt Diagnostic Question 4 using the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_005', difficulty: 'standard',
          question: 'Supporting characters in \'On the Face of It\' — the secondary figures who move.',
          hint: 'If stuck, revisit c11_eng_h_cbse_05_005 (Class 11 Supporting Character Analysis) and.',
          misconception: 'Students treat Mr. Lamb as a "magical mentor" who "fixes" Derry through wisdom — writing answers like "Mr.',
          parts: [
                { id: 'a', prompt: 'Name the two supporting characters who physically appear on stage in "On the Face of It" and state one key difference in how each responds to Derry\'s burned.', answer: 'The two supporting characters who appear on stage are Mr',
                  options: ['The two supporting characters who appear on stage are Mr', 'the woman at the bus stop', 'kids who call him Lamey-Lamb'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_05_005 (Class 11 Supporting Character Analysis) and identify the.',
                  misconception: 'Students treat Mr. Lamb as a "magical mentor" who "fixes" Derry through wisdom — writing answers like "Mr.' }
          ],
            remediations: { 'students-treat-mr': { steps: ['Lamb teaches Derry...", ask: "Find one line where Mr.', 'Lamb gives Derry advice about his face or future." (There isn\'t one — he says "Only you know that" and "Do you have.', 'Then ask: "What does Derry DO in the final scene that he couldn\'t do in Scene One?" (He runs back, enters through the.', 'Lamb, claims the name "Lamey-Lamb" affectionately).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_006', difficulty: 'standard',
          question: 'The primary theme of \'On the Face of It\' — the central idea the whole text.',
          hint: 'Review "theme vs. moral vs. subject" using c11_eng_h_cbse_01_006 worked examples.',
          misconception: 'Students conflate the primary theme with the moral "don\'t judge by appearances" or "beauty is skin deep." They write.',
          parts: [
                { id: 'a', prompt: 'What is the primary theme of "On the Face of It" as distinct from its subject matter (a boy with a burned face and an old man with a tin leg)?', answer: 'The primary theme is that human connection and self-acceptance can overcome the',
                  options: ['The primary theme is that human connection and self-acceptance can overcome the', 'the play is about a burned boy and a lame man'],
                  hint: 'Review "theme vs. moral vs. subject" using c11_eng_h_cbse_01_006 worked examples.',
                  misconception: 'Students conflate the primary theme with the moral "don\'t judge by appearances" or "beauty is skin deep." They write: "The theme is that.' },
                { id: 'b', prompt: 'Analyze how the parallel between Mr. Lamb\'s tin leg and Derry\'s burned face functions structurally to develop the primary theme.', answer: 'The parallel creates a structural foil: Mr',
                  options: ['The parallel creates a structural foil: Mr', 'both have disabilities so they understand each other'],
                  hint: 'Review "theme vs. moral vs. subject" using c11_eng_h_cbse_01_006 worked examples.',
                  misconception: 'Students conflate the primary theme with the moral "don\'t judge by appearances" or "beauty is skin deep." They write: "The theme is that.' }
          ],
            remediations: { 'students-conflate-the-primary-theme': { steps: ['Reread Scene 1 focusing ONLY on Derry\'s language: circle every "I think," "they think," "you think" — notice how.', 'Lamb\'s "I\'m interested in anybody.', 'Anything" with Derry\'s "I don\'t like being with people." 3.', 'Re-attempt DIAGNOSTIC_QUESTION_4: write one paragraph explaining why the play needs TWO disabled characters, not one.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
