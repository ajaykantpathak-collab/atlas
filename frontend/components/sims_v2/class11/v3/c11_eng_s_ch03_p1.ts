import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch03_p1: SimDef = {
    id: 'v3_c11_eng_s_ch03_p1',
    title: 'Mother\'s Day · Part 1/3',
    subtitle: 'Read a body-swap as enacted resolve, and an ending as negotiated truce.',
    classLevel: 11, subject: 'eng_s', topic: 'Mother\'s Day · Part 1/3',
    chapters: ['c11_eng_s_ch03'],
    nodeIds: ['c11_eng_s_cbse_03_001', 'c11_eng_s_cbse_03_002', 'c11_eng_s_cbse_03_003', 'c11_eng_s_cbse_03_004', 'c11_eng_s_cbse_03_005', 'c11_eng_s_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a dramatist watching a suburban mother revolt politely', intro: 'A meek mother starts smoking, insults her daughter\'s boyfriend and exposes \'Pompy-ompy Pearson\' — something has clearly swapped.', goal: 'Analyse the play\'s escalating confrontations and evaluate its comedic resolution.' },
    discovery: {
        question: 'Mrs. Pearson gets her family to play rummy and share the chores — is the mother\'s exploitation actually solved?',
        options: ['No — it\'s a comedic compromise; the family clusters round her again, the structure intact with slightly better manners', 'Yes — shared chores permanently fix the power imbalance', 'Yes — the spell changed the family for good', 'No — because the swap was never real'],
        answer: 'No — it\'s a comedic compromise; the family clusters round her again, the structure intact with slightly better manners',
        hook: 'The body-swap isn\'t magic solving a problem — it\'s the visible shape of a decision: \'this is where your foot goes down.\'',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Mother\'s Day\' (Snapshots, ch. 3) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Rank the three confrontations — Doris, Cyril, George — on the rising curve, and judge whether the second swap earns the ending.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Mother\'s Day\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is the playwright of "Mother\'s Day" and what is his primary literary concern?', options: [
                { text: 'The playwright is J.B', outcome: 'The playwright is J.B. Priestley, a British novelist, playwright, and social commentator known for.' },
                { text: 'context and background', outcome: 'Not quite — Students often think "context and background" means only the author\'s biography and the historical.', reveals: 'context-and-background-means-only' },
                { text: 'a different author or saying he wrote only mysteries', outcome: 'Not quite — Students often think "context and background" means only the author\'s biography and the historical.', reveals: 'context-and-background-means-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Mother\'s Day\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the inciting incident in "Mother\'s Day" and why does it occur at the specific moment it does in the play\'s timeline?', options: [
                { text: 'The inciting incident is the personality swap between Mrs', outcome: 'The inciting incident is the personality swap between Mrs. Pearson and Mrs.' },
                { text: 'Doris entering', outcome: 'Not quite — Students often treat the body-swap as mere fantasy plot device rather than a *structural metaphor*.', reveals: 'students-often-treat-the-body' },
                { text: 'George coming home', outcome: 'Not quite — Students often treat the body-swap as mere fantasy plot device rather than a *structural metaphor*.', reveals: 'students-often-treat-the-body' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Mother\'s Day\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'List four specific physical details of the Pearson living-room mentioned in the opening stage directions that establish the play\'s setting.', options: [
                { text: 'Correct answer: (1) Small suburban semi-detached villa, (2) Two doors', outcome: 'Correct answer: (1) Small suburban semi-detached villa, (2) Two doors — one leading to front.' },
                { text: 'living room', outcome: 'Not quite — Students treat setting as a static backdrop ("the room where it happens") and atmosphere as.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Mother\'s Day\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What are the two contrasting vocal qualities the stage directions assign to Mrs. Pearson and Mrs. Fitzgerald at the opening of the play?', options: [
                { text: 'Mrs', outcome: 'Mrs. Pearson speaks in a "light, flurried sort of tone, with a touch of suburban Cockney"; Mrs.' },
                { text: 'deep voice, rather Irish perhaps', outcome: 'Not quite — Students often believe the body swap *permanently* changes Mrs. Pearson\'s personality, or that Mrs.', reveals: 'the-body-swap-permanently-changes' },
                { text: 'the body swap *permanently* changes Mrs', outcome: 'Not quite — Students often believe the body swap *permanently* changes Mrs. Pearson\'s personality, or that Mrs.', reveals: 'the-body-swap-permanently-changes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Mother\'s Day\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Identify the four supporting characters in "Mother\'s Day" and state one defining trait for each as established in the opening stage.', options: [
                { text: 'The four supporting characters are: George Pearson (husband)', outcome: 'The four supporting characters are: George Pearson (husband) — described as "solemn.' },
                { text: 'strong', outcome: 'Not quite — Students often treat supporting characters as "minor" and therefore less important for analysis.', reveals: 'students-often-treat-supporting-characters' },
                { text: 'describes them only by name or confuses their traits (e', outcome: 'Not quite — Students often treat supporting characters as "minor" and therefore less important for analysis.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Mother\'s Day\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'State the primary theme of *Mother\'s Day* in one complete thematic sentence (not a topic like "motherhood" but a full idea like "The play.', options: [
                { text: 'Correct answer: *The play argues that a mother\'s selfless labour is exploited by a', outcome: 'Correct answer: *The play argues that a mother\'s selfless labour is exploited by a complacent.' },
                { text: 'The theme is that mothers work hard', outcome: 'Not quite — Students often think the primary theme is "Mrs Fitzgerald teaches Mrs Pearson to be strong".', reveals: 'the-primary-theme-is-mrs' },
                { text: 'Mrs Fitzgerald teaches Mrs Pearson to be strong', outcome: 'Not quite — Students often think the primary theme is "Mrs Fitzgerald teaches Mrs Pearson to be strong".', reveals: 'the-primary-theme-is-mrs' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your drama society stages \'Mother\'s Day\' and a reviewer from the school paper writes: \'A timeless family comedy — the 1950s setting and Priestley\'s politics are irrelevant background; the play works identically in any era.\'',
            decisions: [{ prompt: 'Is the context really irrelevant?', options: [
                { text: 'No — the play is a pointed critique of 1950s suburban gender roles: Mrs Pearson\'s invisible labour (serving, ironing, never thanked) reflects the era\'s \'ideal\' housewife ideal, and Priestley\'s socialist concern for ordinary voices drives the satire. The one-act structure compresses the rebellion into one afternoon — genre, era and ideology are doing the work, not just the jokes.', outcome: 'Context here includes genre conventions and authorial stance — strip them and the play reads as quirky fantasy instead of social critique.' },
                { text: 'The reviewer is right — a good play transcends its setting; context is for historians.', outcome: 'Without 1950s gender norms the family\'s entitlement looks generic rather than systemic; the play\'s bite depends on recognising the \'ideal mother\' it\'s mocking.', reveals: 'context-is-optional' },
                { text: 'Context only means the playwright\'s birth year and the date of writing — the social conditions don\'t count.', outcome: 'Context is the living environment — wage roles, gender expectations, genre rules — that shapes every character\'s behaviour; dates alone illuminate nothing.', reveals: 'context-means-dates-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'The magic never fixed anything; it only let everyone watch what Mrs. Pearson\'s foot finally going down looks like.',
            decisions: [{ prompt: 'What comes next? Mother\'s Day · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mother\'s Day · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_001', difficulty: 'standard',
          question: '\'Mother\'s Day\' (Snapshots, ch. 3) — the context and background to this text.',
          hint: 'If stuck, review the Class 9 node on dramatic structure (c9_engl_ch6_4) and the Class 10.',
          misconception: 'Students often think "context and background" means only the author\'s biography and the historical date.',
          parts: [
                { id: 'a', prompt: 'Who is the playwright of "Mother\'s Day" and what is his primary literary concern?', answer: 'The playwright is J.B',
                  options: ['The playwright is J.B', 'context and background', 'a different author or saying he wrote only mysteries'],
                  hint: 'If stuck, review the Class 9 node on dramatic structure (c9_engl_ch6_4) and the Class 10 one-act.',
                  misconception: 'Students often think "context and background" means only the author\'s biography and the historical date.' }
          ],
            remediations: { 'context-and-background-means-only': { steps: ['If a student cannot link context to the play\'s meaning, do this: (1) Give them a 3-column table: Context Detail | Play.', '(2) Fill one row together: "1950s gender roles" → "Mrs.', 'Pearson serves tea, irons, stays home" → "Shows her labor is invisible." (3) Ask them to complete two more rows using.', '(4) Have them write one sentence: "The play uses the one-act structure to compress the mother\'s rebellion into a single.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Mother\'s Day\' — what happens, in what order, and why.',
          hint: 'Review c9_engl_ch6_4 (Dramatic Structure: Acts, Scenes and Stage Directions) for.',
          misconception: 'Students often treat the body-swap as mere fantasy plot device rather than a *structural metaphor* for psychological.',
          parts: [
                { id: 'a', prompt: 'What is the inciting incident in "Mother\'s Day" and why does it occur at the specific moment it does in the play\'s timeline?', answer: 'The inciting incident is the personality swap between Mrs',
                  options: ['The inciting incident is the personality swap between Mrs', 'Doris entering', 'George coming home'],
                  hint: 'Review c9_engl_ch6_4 (Dramatic Structure: Acts, Scenes and Stage Directions) for structural.',
                  misconception: 'Students often treat the body-swap as mere fantasy plot device rather than a *structural metaphor* for psychological breakthrough.' }
          ],
            remediations: { 'students-often-treat-the-body': { steps: ['Have the student reread only the first 3 pages (up to the spell) and list every phrase showing Mrs.', 'Pearson\'s *internal* desire to change ("I keep making up my mind to have it out with them," "I don\'t know how.', 'Then read the Doris confrontation and highlight every action that *mirrors* those internal wishes (refusing tea.', 'Ask: "If the spell never happened, which of these actions could Mrs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the body-swap as mere fantasy plot device rather than a *structural metaphor* for psychological.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the resolution (the second swap and the family rummy game) is earned or contrived. Support your judgment with structural evidence.', answer: 'The resolution is *earned*',
                  options: ['The resolution is *earned*', 'too easy'],
                  hint: 'Review c9_engl_ch6_4 (Dramatic Structure: Acts, Scenes and Stage Directions) for structural.',
                  misconception: 'Students often treat the body-swap as mere fantasy plot device rather than a *structural metaphor* for psychological breakthrough.' }
          ],
            remediations: { 'students-often-treat-the-body': { steps: ['Have the student reread only the first 3 pages (up to the spell) and list every phrase showing Mrs.', 'Pearson\'s *internal* desire to change ("I keep making up my mind to have it out with them," "I don\'t know how.', 'Then read the Doris confrontation and highlight every action that *mirrors* those internal wishes (refusing tea.', 'Ask: "If the spell never happened, which of these actions could Mrs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_003', difficulty: 'standard',
          question: 'The setting of \'Mother\'s Day\' — the place, time and atmosphere the text creates.',
          hint: 'Review c7_engl_ch04_005 (Atmosphere: Heat, Silence and Anticipation) and c8_engl_ch4_1.',
          misconception: 'Students treat setting as a static backdrop ("the room where it happens") and atmosphere as a single fixed mood ("it\'s.',
          parts: [
                { id: 'a', prompt: 'List four specific physical details of the Pearson living-room mentioned in the opening stage directions that establish the play\'s setting.', answer: 'Correct answer: (1) Small suburban semi-detached villa, (2) Two doors',
                  options: ['Correct answer: (1) Small suburban semi-detached villa, (2) Two doors', 'living room'],
                  hint: 'Review c7_engl_ch04_005 (Atmosphere: Heat, Silence and Anticipation) and c8_engl_ch4_1 (Setting.',
                  misconception: 'Students treat setting as a static backdrop ("the room where it happens") and atmosphere as a single fixed mood ("it\'s tense").' },
                { id: 'b', prompt: 'Explain in your own words how the "early autumn afternoon" timing contributes to the play\'s atmosphere before any dialogue begins.', answer: 'Correct answer: Early autumn suggests transition and change',
                  options: ['Correct answer: Early autumn suggests transition and change', 'it\'s just when it happens', 'afternoon'],
                  hint: 'Review c7_engl_ch04_005 (Atmosphere: Heat, Silence and Anticipation) and c8_engl_ch4_1 (Setting.',
                  misconception: 'Students treat setting as a static backdrop ("the room where it happens") and atmosphere as a single fixed mood ("it\'s tense").' },
                { id: 'c', prompt: 'The stage direction states: "It is very important that these two should have sharply contrasting voices." Apply this to the setting-atmosphere relationship.', answer: 'Correct answer: The small table forces Mrs',
                  options: ['Correct answer: The small table forces Mrs', 'where they sit'],
                  hint: 'Review c7_engl_ch04_005 (Atmosphere: Heat, Silence and Anticipation) and c8_engl_ch4_1 (Setting.',
                  misconception: 'Students treat setting as a static backdrop ("the room where it happens") and atmosphere as a single fixed mood ("it\'s tense").' },
                { id: 'd', prompt: 'Analyze how the atmosphere shifts in the living-room from the moment Doris enters (p.18) to Cyril\'s exit to the kitchen (p.22).', answer: 'Correct answer: (1) Doris\'s "astounded" reaction to smoking/playing cards',
                  options: ['Correct answer: (1) Doris\'s "astounded" reaction to smoking/playing cards', 'Doris asks for tea, Cyril asks for things'],
                  hint: 'Review c7_engl_ch04_005 (Atmosphere: Heat, Silence and Anticipation) and c8_engl_ch4_1 (Setting.',
                  misconception: 'Students treat setting as a static backdrop ("the room where it happens") and atmosphere as a single fixed mood ("it\'s tense").' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have the student re-read ONLY the stage directions (italicized text) from start to finish, highlighting every noun.', 'Create a two-column chart: left column = physical detail, right column = atmospheric effect (e.g., "muslin-covered.', 'Map the four atmospheric phases to specific page ranges using dialogue as evidence.', 'Ask: "If this play were set in a palace kitchen / a spaceship / a modern Mumbai flat, which atmospheric shifts would.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_004', difficulty: 'standard',
          question: 'Character analysis in \'Mother\'s Day\' — the central figure(s), their traits, and.',
          hint: 'Review "Stage Directions as Characterisation" in c11_eng_s_cbse_03_003 (Setting and.',
          misconception: 'Students often believe the body swap *permanently* changes Mrs. Pearson\'s personality, or that Mrs.',
          parts: [
                { id: 'a', prompt: 'Apply the "Trait + Evidence + Explanation" formula to prove that Mrs. Pearson (inhabited by Mrs.', answer: 'Trait: Assertive',
                  options: ['Trait: Assertive', 'the body swap *permanently* changes Mrs'],
                  hint: 'Review "Stage Directions as Characterisation" in c11_eng_s_cbse_03_003 (Setting and Atmosphere).',
                  misconception: 'Students often believe the body swap *permanently* changes Mrs. Pearson\'s personality, or that Mrs.' }
          ],
            remediations: { 'the-body-swap-permanently-changes': { steps: ['Re-read the final exchange where Mrs.', 'Fitzgerald warns: "Don\'t you start any explaining or apologising — or you\'re done for." 2.', 'Highlight every stage direction showing Mrs.', 'Pearson\'s *own* voice returning ("now with Mrs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_005', difficulty: 'standard',
          question: 'Supporting characters in \'Mother\'s Day\' — the secondary figures who move the.',
          hint: 'Review the PEEL method from c11_eng_s_cbse_03_004 and re-read the stage directions for.',
          misconception: 'Students often treat supporting characters as "minor" and therefore less important for analysis, writing generic.',
          parts: [
                { id: 'a', prompt: 'Identify the four supporting characters in "Mother\'s Day" and state one defining trait for each as established in the opening stage directions and early.', answer: 'The four supporting characters are: George Pearson (husband)',
                  options: ['The four supporting characters are: George Pearson (husband)', 'strong', 'describes them only by name or confuses their traits (e'],
                  hint: 'Review the PEEL method from c11_eng_s_cbse_03_004 and re-read the stage directions for each.',
                  misconception: 'Students often treat supporting characters as "minor" and therefore less important for analysis, writing generic descriptions like "Doris.' },
                { id: 'b', prompt: 'Using the PEEL structure (Point, Evidence, Explanation, Link), write a short analytical paragraph showing how George Pearson\'s dialogue in the club scene (pp.', answer: 'Point: George Pearson embodies performative masculinity that masks insecurity',
                  options: ['Point: George Pearson embodies performative masculinity that masks insecurity', 'George goes to the club and gets upset'],
                  hint: 'Review the PEEL method from c11_eng_s_cbse_03_004 and re-read the stage directions for each.',
                  misconception: 'Students often treat supporting characters as "minor" and therefore less important for analysis, writing generic descriptions like "Doris.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student writes generic descriptions, assign this 3-step remediation: (1) Create a four-column table: Character |.', '(2) For each character, find one line where they speak TO Mrs Pearson and one where they speak ABOUT her (to each other.', '(3) Rewrite one analytical paragraph using the PEEL structure, explicitly using the tabled evidence.', 'This forces movement from description to function-analysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_006', difficulty: 'standard',
          question: 'The primary theme of \'Mother\'s Day\' — the central idea the whole text returns.',
          hint: 'Review the distinction between **character arc** (individual change) and **thematic.',
          misconception: 'Students often think the primary theme is "Mrs Fitzgerald teaches Mrs Pearson to be strong" — focusing on the.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "the forty-hour week" (introduced by the swapped Mrs Pearson) to a modern Indian middle-class household: rewrite the argument for a mother.', answer: 'Correct answer (sample): *"I put in ten hours at the office and four more here',
                  options: ['Correct answer (sample): *"I put in ten hours at the office and four more here', '* A wrong answer (e.g', 'Mrs Fitzgerald teaches Mrs Pearson to be strong'],
                  hint: 'Review the distinction between **character arc** (individual change) and **thematic argument**.',
                  misconception: 'Students often think the primary theme is "Mrs Fitzgerald teaches Mrs Pearson to be strong" — focusing on the *friendship/mentorship*.' },
                { id: 'b', prompt: 'Analyse how the body-swap device *structurally* serves the theme: why must the catalyst be an *external* woman (Mrs Fitzgerald) rather than Mrs Pearson simply.', answer: 'Correct answer: *The device externalises the "permission" to rebel',
                  options: ['Correct answer: *The device externalises the "permission" to rebel', 'I couldn\'t blame them if they resented *somebody else*', 'strong and sinister', 'It\'s just a magic trick for comedy'],
                  hint: 'Review the distinction between **character arc** (individual change) and **thematic argument**.',
                  misconception: 'Students often think the primary theme is "Mrs Fitzgerald teaches Mrs Pearson to be strong" — focusing on the *friendship/mentorship*.' }
          ],
            remediations: { 'the-primary-theme-is-mrs': { steps: ['Re-read the opening dialogue (pp.', '15–16) and highlight every phrase where Mrs Pearson *minimises* her labour ("just dropping a hint," "I\'m so fond.', 'Make a two-column table: **Demand Made** vs **Mrs Pearson\'s Old Response** vs **Swapped Response** for Doris, Cyril.', 'Write one sentence answering: "What changed — the family\'s nature or the *consequence* of their demands?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
