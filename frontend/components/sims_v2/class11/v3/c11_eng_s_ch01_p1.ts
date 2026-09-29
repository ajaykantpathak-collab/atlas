import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch01_p1: SimDef = {
    id: 'v3_c11_eng_s_ch01_p1',
    title: 'The Summer of the Beautiful White Horse · Part 1/3',
    subtitle: 'Test a boy\'s loophole logic against a tribe\'s absolute honesty.',
    classLevel: 11, subject: 'eng_s', topic: 'The Summer of the Beautiful White Horse · Part 1/3',
    chapters: ['c11_eng_s_ch01'],
    nodeIds: ['c11_eng_s_cbse_01_001', 'c11_eng_s_cbse_01_002', 'c11_eng_s_cbse_01_003', 'c11_eng_s_cbse_01_004', 'c11_eng_s_cbse_01_005', 'c11_eng_s_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader untangling a childhood memory from its excuses', intro: 'A stolen horse ridden at dawn by a boy who swears it isn\'t theft — the adult telling the story knows better, and so does the tribe.', goal: 'Analyse the retrospective frame and evaluate the boys\' moral reasoning against the Garoghlanian code.' },
    discovery: {
        question: 'Mourad has the neighbour\'s missing horse but insists it isn\'t stealing — \'it wouldn\'t become stealing until we offered to sell.\' By his own tribe\'s code, is he right?',
        options: ['No — the Garoghlanian reputation for honesty is absolute, and his rule is a child\'s rationalisation', 'Yes — borrowing for joy isn\'t theft in any moral system', 'Yes — the code only forbids selling stolen goods', 'No — but only because John Byro actually recognised the horse'],
        answer: 'No — the Garoghlanian reputation for honesty is absolute, and his rule is a child\'s rationalisation',
        hook: '\'Proud first, honest next\' — the boys\' loophole collapses the moment Mourad himself snaps, \'Are you inviting a member of the Garoghlanian family to steal?\'',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'The Summer of the Beautiful White Horse\' (Snapshots, ch. 1) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the adult narrator\'s nostalgia from nine-year-old Aram\'s excuses, order the events chronologically, and place the real moment of moral reckoning.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'The Summer of the Beautiful White Horse\', then the period, then the literary context — background turns a text from a puzzle into.',
            decisions: [{ prompt: 'Who is the author of "The Summer of the Beautiful White Horse" and what is his ethnic background?', options: [
                { text: 'The author is William Saroyan, an Armenian-American writer', outcome: 'The author is William Saroyan, an Armenian-American writer. A wrong answer (e.g., naming.' },
                { text: 'context and background', outcome: 'Not quite — Students often think "context and background" means memorizing facts about Armenia or Saroyan\'s.', reveals: 'context-and-background-means-memorizing' },
                { text: 'a different author or missing the Armenian connection', outcome: 'Not quite — Students often think "context and background" means memorizing facts about Armenia or Saroyan\'s.', reveals: 'context-and-background-means-memorizing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'The Summer of the Beautiful White Horse\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the.',
            decisions: [{ prompt: 'What are the five standard stages of a narrative arc in order?', options: [
                { text: 'The five stages are: 1) Exposition, 2) Rising Action, 3) Climax, 4) Falling Action, 5)', outcome: 'The five stages are: 1) Exposition, 2) Rising Action, 3) Climax, 4) Falling Action, 5) Resolution.' },
                { text: 'Introduction, Problem, Solution', outcome: 'Not quite — Students often treat the story\'s narrative order (text sequence) as identical to chronological.', reveals: 'students-often-treat-the-story' },
                { text: 'it wasn\'t stealing', outcome: 'Not quite — Students often treat the story\'s narrative order (text sequence) as identical to chronological.', reveals: 'students-often-treat-the-story' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'The Summer of the Beautiful White Horse\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the physical setting of the story\'s opening scene, and what time of day is it?', options: [
                { text: 'The opening scene takes place at Aram\'s house on Walnut Avenue, at the edge of town, with', outcome: 'The opening scene takes place at Aram\'s house on Walnut Avenue, at the edge of town, with the.' },
                { text: 'in the city at noon', outcome: 'Not quite — Students often think setting is just "where and when" and atmosphere is just "mood," treating them.', reveals: 'setting-is-just-where-and' },
                { text: 'where and when', outcome: 'Not quite — Students often think setting is just "where and when" and atmosphere is just "mood," treating them.', reveals: 'setting-is-just-where-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'The Summer of the Beautiful White Horse\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is Aram\'s age at the time of the story\'s events, and how does his age influence his narrative perspective on the horse incident?', options: [
                { text: 'Aram is nine years old', outcome: 'Aram is nine years old. His age creates a perspective of wonder and moral simplicity —.' },
                { text: 'Aram is an adult looking back', outcome: 'Not quite — Students often treat Aram as a passive observer who simply "goes along" with Mourad, missing that.', reveals: 'students-often-treat-aram-as' },
                { text: 'wasn\'t stealing', outcome: 'Not quite — Students often treat Aram as a passive observer who simply "goes along" with Mourad, missing that.', reveals: 'students-often-treat-aram-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'The Summer of the Beautiful White Horse\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List the four main supporting characters in "The Summer of the Beautiful White Horse" and state one defining trait for each, based solely.', options: [
                { text: 'The four main supporting characters are: Mourad (impulsive yet honorable), Uncle Khosrove', outcome: 'The four main supporting characters are: Mourad (impulsive yet honorable), Uncle Khosrove.' },
                { text: 'greedy', outcome: 'Not quite — Students often treat supporting characters as flat plot devices: Mourad is just "the crazy cousin,".', reveals: 'students-often-treat-supporting-characters' },
                { text: 'vengeful', outcome: 'Not quite — Students often treat supporting characters as flat plot devices: Mourad is just "the crazy cousin,".', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'The Summer of the Beautiful White Horse\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of "The Summer of the Beautiful White Horse" as defined by the narrator\'s description of the Garoghlanian family.', options: [
                { text: 'The primary theme is the inviolability of honesty as an inherited tribal identity', outcome: 'The primary theme is the inviolability of honesty as an inherited tribal identity.' },
                { text: 'famous for our honesty for something like eleven centuries', outcome: 'Not quite — Students often confuse the *act* of taking the horse with the *theme* of the story, arguing "the.', reveals: 'students-often-confuse-the-act' },
                { text: 'proud first, honest next', outcome: 'Not quite — Students often confuse the *act* of taking the horse with the *theme* of the story, arguing "the.', reveals: 'students-often-confuse-the-act' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading circle is adapting \'The Summer of the Beautiful White Horse\' into a short play. The scriptwriter adds a police chase and a courtroom verdict scene: \'A stolen horse needs a crime plot — someone\'s got to arrest Mourad.\'',
            decisions: [{ prompt: 'Does the story support a police-case climax?', options: [
                { text: 'No — the conflict is internal, not legal: the Garoghlanian tribe\'s creed (\'proud first, honest next\') means the real drama is Aram struggling to square \'no Garoghlanian could be a thief\' with the horse standing in front of him. The resolution is the tribe\'s values quietly reasserting themselves — not a court.', outcome: 'Context is the key: an Armenian immigrant community in California whose honour code makes the horse\'s presence a paradox, not a police file.' },
                { text: 'The chase works — theft is theft, and every stolen-horse story needs law and order stakes.', outcome: 'That imports a generic crime plot; the story\'s tension is moral — a boy reconciling tribal honesty with longing — and the horse is returned without any authority involved.', reveals: 'internal-conflict-needs-police' },
                { text: 'Set it in Armenia — the tribe\'s homeland is the natural stage for the horse story.', outcome: 'The story is set in California\'s San Joaquin Valley; the diaspora setting and the idealised Garoghlanian identity are essential context, not decoration.', reveals: 'story-set-in-armenia' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'The horse goes back not because anyone was caught, but because the tribe\'s name couldn\'t survive being caught.',
            decisions: [{ prompt: 'What comes next? The Summer of the Beautiful White Horse · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Summer of the Beautiful White Horse · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_001', difficulty: 'standard',
          question: '\'The Summer of the Beautiful White Horse\' (Snapshots, ch. 1) — the context and.',
          hint: 'Review the concept of "diaspora" and "immigrant community" from Class 10 History.',
          misconception: 'Students often think "context and background" means memorizing facts about Armenia or Saroyan\'s biography.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "The Summer of the Beautiful White Horse" and what is his ethnic background?', answer: 'The author is William Saroyan, an Armenian-American writer',
                  options: ['The author is William Saroyan, an Armenian-American writer', 'context and background', 'a different author or missing the Armenian connection'],
                  hint: 'Review the concept of "diaspora" and "immigrant community" from Class 10 History (Nationalism.',
                  misconception: 'Students often think "context and background" means memorizing facts about Armenia or Saroyan\'s biography.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['If a student cannot connect context to the story\'s conflict, have them: 1) List the tribe\'s three stated values (proud.', '2) Find the sentence where Aram says "No member of the Garoghlanian family could be a thief." 3) Explain in one.', '4) Re-read the opening paragraph with this paradox in mind.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'The Summer of the Beautiful White Horse\' — what.',
          hint: 'Review the narrative arc diagram and practice labeling stages in a familiar story (e.g.',
          misconception: 'Students often treat the story\'s narrative order (text sequence) as identical to chronological order, missing that the.',
          parts: [
                { id: 'a', prompt: 'Arrange these events in chronological order (earliest to latest) and label each with its narrative stage: (A) Aram and Mourad return the horse to John Byro\'s.', answer: 'Chronological order with stages: 1) B',
                  options: ['Chronological order with stages: 1) B', 'it wasn\'t stealing'],
                  hint: 'Review the narrative arc diagram and practice labeling stages in a familiar story (e.g.,.',
                  misconception: 'Students often treat the story\'s narrative order (text sequence) as identical to chronological order, missing that the horse was stolen.' }
          ],
            remediations: { 'students-often-treat-the-story': { steps: ['Draw a two-column timeline: left column = chronological events (theft → hiding → rides → Byro\'s visit → return); right.', 'Highlight every verb tense shift (past vs.', 'past perfect) to mark where the adult narrator steps in.', 'Ask: "If the story were told in real-time by nine-year-old Aram, where would it start?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_003', difficulty: 'standard',
          question: 'The setting of \'The Summer of the Beautiful White Horse\' — the place, time and.',
          hint: 'Review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) and "Imagery of Nature".',
          misconception: 'Students often think setting is just "where and when" and atmosphere is just "mood," treating them as separate labels.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'The Summer of the Beautiful White Horse\'',
                  options: ['The setting of \'The Summer of the Beautiful White Horse\'', '\'The Summer of the Beautiful White Horse\' (Snapshots, ch', 'The plot/narrative arc of \'The Summer of the Beautiful White Horse\'', 'Character analysis in \'The Summer of the Beautiful White Horse\''],
                  hint: 'Review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) and "Imagery of Nature".',
                  misconception: 'Students often think setting is just "where and when" and atmosphere is just "mood," treating them as separate labels.' }
          ],
            remediations: { 'setting-is-just-where-and': { steps: ['Have the student reread the first three paragraphs and highlight every place name and time reference.', 'Ask: "What does the narrator see, hear, smell, feel?" List them.', 'For each sensory detail, ask: "What feeling does this give you?" 4.', 'Connect: "How does the vineyard setting make the horse ride feel like a dream?" 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_004', difficulty: 'standard',
          question: 'Character analysis in \'The Summer of the Beautiful White Horse\' — the central.',
          hint: 'Review "unreliable narrator" and "dramatic irony" from Class 10 Diary of Anne Frank.',
          misconception: 'Students often treat Aram as a passive observer who simply "goes along" with Mourad, missing that Aram is the *moral.',
          parts: [
                { id: 'a', prompt: 'What is Aram\'s age at the time of the story\'s events, and how does his age influence his narrative perspective on the horse incident?', answer: 'Aram is nine years old',
                  options: ['Aram is nine years old', 'Aram is an adult looking back', 'wasn\'t stealing'],
                  hint: 'Review "unreliable narrator" and "dramatic irony" from Class 10 Diary of Anne Frank.',
                  misconception: 'Students often treat Aram as a passive observer who simply "goes along" with Mourad, missing that Aram is the *moral center* of the story.' }
          ],
            remediations: { 'students-often-treat-aram-as': { steps: ['Have the student re-read only Aram\'s direct speech and internal monologue (highlighted in text), ignoring Mourad\'s.', 'Ask: "At what exact moment does Aram stop making excuses?" — guide them to the John Byro confrontation.', 'Create a two-column chart: "What Aram SAYS" vs.', '"What Aram FEELS" — the gap reveals his moral struggle.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat Aram as a passive observer who simply "goes along" with Mourad, missing that Aram is the *moral.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether Aram\'s final decision to return the horse stems from genuine moral conviction or fear of consequences.', answer: 'Genuine moral conviction',
                  options: ['Genuine moral conviction', 'fear of Uncle Khosrove', 'It is no harm', 'wasn\'t stealing'],
                  hint: 'Review "unreliable narrator" and "dramatic irony" from Class 10 Diary of Anne Frank.',
                  misconception: 'Students often treat Aram as a passive observer who simply "goes along" with Mourad, missing that Aram is the *moral center* of the story.' }
          ],
            remediations: { 'students-often-treat-aram-as': { steps: ['Have the student re-read only Aram\'s direct speech and internal monologue (highlighted in text), ignoring Mourad\'s.', 'Ask: "At what exact moment does Aram stop making excuses?" — guide them to the John Byro confrontation.', 'Create a two-column chart: "What Aram SAYS" vs.', '"What Aram FEELS" — the gap reveals his moral struggle.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_005', difficulty: 'standard',
          question: 'Supporting characters in \'The Summer of the Beautiful White Horse\' — the.',
          hint: 'Review the STEAL method application in node c11_eng_s_cbse_01_004 (Worked Example 2) and.',
          misconception: 'Students often treat supporting characters as flat plot devices: Mourad is just "the crazy cousin," Khosrove is just.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'The Summer of the Beautiful White Horse\'',
                  options: ['Supporting characters in \'The Summer of the Beautiful White Horse\'', '\'The Summer of the Beautiful White Horse\' (Snapshots, ch', 'The plot/narrative arc of \'The Summer of the Beautiful White Horse\'', 'The setting of \'The Summer of the Beautiful White Horse\''],
                  hint: 'Review the STEAL method application in node c11_eng_s_cbse_01_004 (Worked Example 2) and re-read.',
                  misconception: 'Students often treat supporting characters as flat plot devices: Mourad is just "the crazy cousin," Khosrove is just "the angry uncle,".' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Have the student create a three-column chart: Character | Core Value | Textual Proof.', 'For each supporting character, guide them to find one moment where the character *chooses* the tribe\'s code over.', 'Ask: "If this character were removed, which thematic argument would collapse?" This forces analysis of narrative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_006', difficulty: 'standard',
          question: 'The primary theme of \'The Summer of the Beautiful White Horse\' — the central.',
          hint: 'If stuck, review the character analysis of Aram (node 004) focusing on his internal.',
          misconception: 'Students often confuse the *act* of taking the horse with the *theme* of the story, arguing "the theme is stealing".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Aram initially rationalizes that taking the horse for a ride is "not stealing," and what this reveals about his understanding.', answer: 'Aram rationalizes',
                  options: ['Aram rationalizes', 'Aram didn\'t think it was wrong', 'where did you steal this horse?', 'the theme is stealing'],
                  hint: 'If stuck, review the character analysis of Aram (node 004) focusing on his internal monologue.',
                  misconception: 'Students often confuse the *act* of taking the horse with the *theme* of the story, arguing "the theme is stealing" or "the theme is that.' },
                { id: 'b', prompt: 'Apply the concept of "theme as identity" to the following scenario: If Mourad had sold the horse to a stranger and used the money to buy a new saddle, how.', answer: 'Selling the horse would violate the theme',
                  options: ['Selling the horse would violate the theme', 'both are stealing', 'the theme is stealing', 'it wasn\'t stealing until we offered to sell'],
                  hint: 'If stuck, review the character analysis of Aram (node 004) focusing on his internal monologue.',
                  misconception: 'Students often confuse the *act* of taking the horse with the *theme* of the story, arguing "the theme is stealing" or "the theme is that.' }
          ],
            remediations: { 'students-often-confuse-the-act': { steps: ['Have the student create a two-column table: Column A = "What the boys *did*" (took horse, hid it, rode it, returned.', 'Ask: "Which column determines the *outcome*?" Guide them to see Column B (identity) forces Column D (return) despite.', 'Assign a focused re-read of the Byro confrontation scene (pages 7-8) with the prompt: "Highlight every word that refers.', 'Finally, have them rewrite the theme statement using the formula: "The story shows that [core value] is [noun phrase.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
