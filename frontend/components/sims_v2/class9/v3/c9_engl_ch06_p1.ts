import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch06_p1: SimDef = {
    id: 'v3_c9_engl_ch06_p1',
    title: 'Twin Melodies · Part 1/2',
    subtitle: 'One raga, one violin, one fragile truce',
    classLevel: 9, subject: 'engl', topic: 'Twin Melodies · Part 1/2',
    chapters: ['c9_engl_ch06'],
    nodeIds: ['c9_engl_ch6_1', 'c9_engl_ch6_10', 'c9_engl_ch6_2', 'c9_engl_ch6_3', 'c9_engl_ch6_4', 'c9_engl_ch6_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theatre critic reading a family war', intro: 'In this house, music is lineage — until the radio smuggles in a violin concerto. Follow Shruti\'s secret lessons to the concert where father and daughter must share a stage or lose each other.', goal: 'Summarise \'Twin Melodies\' as a conflict-driven dramatic arc — inciting incident, secret practice, confrontation, negotiated fusion resolution — showing how each event responds to the tradition-vs-innovation tension.' },
    discovery: {
        question: 'A girl raised in a gurukul of sacred raga tradition falls in love with a Western violin. Her guru-father calls it betrayal of parampara — but is his refusal just stubbornness?',
        options: ['No — in the gurukul system, the instrument carries the whole pedagogy; the violin\'s fixed tuning and missing meend seem structurally hostile to Hindustani music', 'Yes — he\'s just a strict parent', 'No — violins were banned in India', 'Yes — he was afraid of losing students'],
        answer: 'No — in the gurukul system, the instrument carries the whole pedagogy; the violin\'s fixed tuning and missing meend seem structurally hostile to Hindustani music',
        hook: 'The climax doesn\'t crown a winner — it negotiates. Shruti plays her violin inside raga Yaman\'s framework while her father joins on tabla, and his line \'the raga remains, even if the vehicle changes\' admits a truce, not a surrender.',
    },
    teaching: [
        { title: 'Play Summary: Shruti\'s Musical Journey and Conflict', text: 'A play summary condenses the narrative arc of a dramatic work into a coherent overview that identifies the protagonist\'s central conflict, the rising action through key scenes, the climax where.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch6_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map the play\'s arc as a war of choices, not events: the radio concerto spark, the secret storehouse practice, the discovery scene, the fusion finale — and decide whether the ending truly settles tradition vs innovation.',
        labels: ['Play Summary: Shruti\'s Musical', 'Values: Pursuing Passion', 'Character Analysis: Shruti Sharma,', 'Character Analysis: Guru Nabin', 'Dramatic Structure: Acts, Scenes', 'Theme: Individual Identity'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch6_1', title: 'Play Summary: Shruti\'s Musical Journey and Conflict',
          caseStudy: { intro: 'Imagine you\'re explaining "Twin Melodies" to a friend who hasn\'t read it — you wouldn\'t just list events; you\'d highlight the emotional clash between a father.',
            decisions: [{ prompt: 'What is the inciting incident that sets Shruti\'s musical conflict in motion in Act 1 of "Twin Melodies"?', options: [
                { text: 'The inciting incident is Shruti hearing a Western violin concerto on the radio', outcome: 'The inciting incident is Shruti hearing a Western violin concerto on the radio, which awakens her.' },
                { text: 'her father forbids her from playing violin', outcome: 'Not quite — Students treat the play summary as a chronological event list ("First this happened, then that.', reveals: 'students-treat-the-play-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch6_10', title: 'Values: Pursuing Passion and Respecting Tradition',
          caseStudy: { intro: 'Imagine you love playing the guitar but your parents want you to learn the veena because it\'s your family tradition for generations.',
            decisions: [{ prompt: 'What is the central value conflict presented in "Twin Melodies" between Shruti and her father?', options: [
                { text: 'The central conflict is between Shruti\'s pursuit of her individual passion for fusion', outcome: 'The central conflict is between Shruti\'s pursuit of her individual passion for fusion music.' },
                { text: 'music disagreement', outcome: 'Not quite — Students often believe "respecting tradition" means blindly replicating the past, and "pursuing.', reveals: 'respecting-tradition-means-blindly-replicating' },
                { text: 'respecting tradition', outcome: 'Not quite — Students often believe "respecting tradition" means blindly replicating the past, and "pursuing.', reveals: 'respecting-tradition-means-blindly-replicating' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch6_3', title: 'Character Analysis: Guru Nabin Sharma (Father)',
          caseStudy: { intro: 'Imagine you\'re watching a concert where a strict classical musician father watches his daughter pick up an electric violin - you\'d feel the tension between.',
            decisions: [{ prompt: 'What is the guru-shishya parampara, and how does Guru Nabin Sharma embody this tradition in his role as a violin teacher?', options: [
                { text: 'The guru-shishya parampara is the traditional Indian system where knowledge is', outcome: 'The guru-shishya parampara is the traditional Indian system where knowledge is transmitted orally.' },
                { text: 'he just teaches her violin like a school teacher', outcome: 'Not quite — Students treat Guru Nabin Sharma as a one-dimensional "strict traditional father" who simply.', reveals: 'students-treat-guru-nabin-sharma' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch6_4', title: 'Dramatic Structure: Acts, Scenes and Stage Directions',
          caseStudy: { intro: 'Imagine you\'re directing the school annual day play: the script says "[Shruti pauses, violin lowered, spotlight narrows]"—how do you decide *how long* she.',
            decisions: [{ prompt: 'Define "stage direction" and give two examples of different types of stage directions found in a play script.', options: [
                { text: 'A stage direction is a playwright\'s written instruction (typically in brackets/italics)', outcome: 'A stage direction is a playwright\'s written instruction (typically in brackets/italics) that guides.' },
                { text: 'instructions for actors', outcome: 'Not quite — Students treat stage directions as *optional reading*—"just instructions for actors"—and skip them.', reveals: 'students-treat-stage-directions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch6_5', title: 'Theme: Individual Identity vs Family Legacy in Music',
          caseStudy: { intro: 'Imagine you love cricket but your father is a legendary classical dancer who expects you to carry forward his dance academy.',
            decisions: [{ prompt: 'What is the central conflict between Shruti and Guru Nabin Sharma regarding music, as established in Act 1 of "Twin Melodies"?', options: [
                { text: 'The central conflict is Shruti\'s desire to learn and perform Western violin and fusion', outcome: 'The central conflict is Shruti\'s desire to learn and perform Western violin and fusion music versus.' },
                { text: 'they argue about money', outcome: 'Not quite — Students often think "Individual Identity vs Family Legacy" means Shruti must choose ONE — either.', reveals: 'individual-identity-vs-family-legacy' },
                { text: 'Shruti hates music', outcome: 'Not quite — Students often think "Individual Identity vs Family Legacy" means Shruti must choose ONE — either.', reveals: 'individual-identity-vs-family-legacy' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch6_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a summary of the play \'Twin Melodies,\' a student lists: \'Act 1: Shruti hears a violin. Act 2: she practises secretly. Act 3: father finds out, they argue. Act 4: they perform together.\'',
            decisions: [{ prompt: 'What does a play summary need beyond the act list?', options: [
                { text: 'The conflict that drives it: Shruti\'s fascination with the violin collides with her guru-father\'s view of music as a sacred lineage, so the secret practice is resistance, the discovery forces confrontation, and the fusion finale is a negotiated space — not a tidy win. Frame each event as a choice under that pressure.', outcome: 'This converts the event list into a dramatic arc — conflict, escalation, climax, negotiated resolution — which is what a play summary must show.' },
                { text: 'Nothing more — naming each act in order is exactly what a summary of a play is.', outcome: 'That is a table of contents; drama is structured around choices under pressure, and without the tradition-versus-voice conflict the events have no engine.', reveals: 'act-list-is-summary' },
                { text: 'The summary should end by declaring that father and daughter fully reconcile — audiences want a clean ending.', outcome: 'The play deliberately leaves tension — the father\'s \'the raga remains, even if the vehicle changes\' is qualified acceptance, and calling it full reconciliation misreads the resolution.', reveals: 'forced-happy-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch6_5', title: 'The bigger picture',
          caseStudy: { intro: 'Drama runs on choices under pressure, not a list of scenes. Shruti\'s secret practice is resistance; the fusion concert is a negotiated peace where two musical worlds finally share one stage.',
            decisions: [{ prompt: 'What comes next? Twin Melodies · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Twin Melodies · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch6_1', difficulty: 'standard',
          question: 'A play summary condenses the narrative arc of a dramatic work into a coherent.',
          hint: 'If stuck, review c8_engl_ch4_4 (Plot: Growing a Cherry Tree from a Seed) and practice.',
          misconception: 'Students treat the play summary as a chronological event list ("First this happened, then that happened") rather than.',
          parts: [
                { id: 'a', prompt: 'What is the inciting incident that sets Shruti\'s musical conflict in motion in Act 1 of "Twin Melodies"?', answer: 'The inciting incident is Shruti hearing a Western violin concerto on the radio',
                  options: ['The inciting incident is Shruti hearing a Western violin concerto on the radio', 'her father forbids her from playing violin'],
                  hint: 'If stuck, review c8_engl_ch4_4 (Plot: Growing a Cherry Tree from a Seed) and practice labeling each.',
                  misconception: 'Students treat the play summary as a chronological event list ("First this happened, then that happened") rather than a conflict-driven.' },
                { id: 'b', prompt: 'Explain in your own words why Guru Nabin Sharma initially refuses to let Shruti learn the violin, connecting his refusal to the gurukul tradition.', answer: 'Guru Nabin refuses',
                  options: ['Guru Nabin refuses', 'he is strict', 'he dislikes Western music'],
                  hint: 'If stuck, review c8_engl_ch4_4 (Plot: Growing a Cherry Tree from a Seed) and practice labeling each.',
                  misconception: 'Students treat the play summary as a chronological event list ("First this happened, then that happened") rather than a conflict-driven.' },
                { id: 'c', prompt: 'Compare the musical philosophies represented by Shruti\'s school music teacher and Guru Nabin Sharma.', answer: 'The school teacher views tradition as a foundation for exploration',
                  options: ['The school teacher views tradition as a foundation for exploration', 'one likes Western, one likes Indian'],
                  hint: 'If stuck, review c8_engl_ch4_4 (Plot: Growing a Cherry Tree from a Seed) and practice labeling each.',
                  misconception: 'Students treat the play summary as a chronological event list ("First this happened, then that happened") rather than a conflict-driven.' }
          ],
            remediations: { 'students-treat-the-play-summary': { steps: ['If a student produces an event-list summary, do NOT say "add more analysis." Instead: (1) Have them highlight every.', '(2) Ask: "Which sentence shows Shruti *choosing* the violin despite knowing her father\'s opposition?" (3) Model.', 'This shifts focus from *what happened* to *what was at stake*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch6_10', difficulty: 'standard',
          question: 'The values of pursuing passion and respecting tradition refer to the ethical.',
          hint: 'If stuck, review c9_engl_ch6_5 (Individual Identity vs Family Legacy) to refresh the.',
          misconception: 'Students often believe "respecting tradition" means blindly replicating the past, and "pursuing passion" means.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the play\'s title "Twin Melodies" is a metaphor for the relationship between passion and tradition.', answer: 'The title suggests two distinct melodies',
                  options: ['The title suggests two distinct melodies', 'it means they both like music', 'respecting tradition', 'pursuing passion'],
                  hint: 'If stuck, review c9_engl_ch6_5 (Individual Identity vs Family Legacy) to refresh the thematic.',
                  misconception: 'Students often believe "respecting tradition" means blindly replicating the past, and "pursuing passion" means rejecting heritage.' },
                { id: 'b', prompt: 'In Act 2, Scene 3, Shruti says, "My violin speaks two languages." Apply the concept of "pursuing passion while respecting tradition" to explain what she means.', answer: 'Step 1: Identify the two languages',
                  options: ['Step 1: Identify the two languages', 'she plays two styles', 'speaks', 'respecting tradition'],
                  hint: 'If stuck, review c9_engl_ch6_5 (Individual Identity vs Family Legacy) to refresh the thematic.',
                  misconception: 'Students often believe "respecting tradition" means blindly replicating the past, and "pursuing passion" means rejecting heritage.' }
          ],
            remediations: { 'respecting-tradition-means-blindly-replicating': { steps: ['If a student holds this misconception, guide them through a three-step re-reading: (1) List every scene where tradition.', '(2) List every scene where passion drives growth (Shruti\'s compositions, her collaboration).', '(3) Identify the scenes where both operate together (the final duet, the moment Guru Nabin suggests a raga for her.', 'Ask: "Where does the play show tradition enabling passion, not blocking it?" This shifts focus from conflict.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch6_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "respecting tradition" means blindly replicating the past, and "pursuing passion" means.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the play ultimately privileges passion over tradition or tradition over passion. Defend your judgment with two pieces of textual evidence.', answer: 'The play privileges neither',
                  options: ['The play privileges neither', 'respecting tradition', 'pursuing passion'],
                  hint: 'If stuck, review c9_engl_ch6_5 (Individual Identity vs Family Legacy) to refresh the thematic.',
                  misconception: 'Students often believe "respecting tradition" means blindly replicating the past, and "pursuing passion" means rejecting heritage.' },
                { id: 'b', prompt: 'Create a short dialogue (4-6 lines) between a teenager and a grandparent where the teenager expresses a modern passion (e.g., coding, dance, sustainability).', answer: 'A strong answer shows: (1) distinct voices with authentic concerns, (2) no quick',
                  options: ['A strong answer shows: (1) distinct voices with authentic concerns, (2) no quick', 'respecting tradition', 'pursuing passion'],
                  hint: 'If stuck, review c9_engl_ch6_5 (Individual Identity vs Family Legacy) to refresh the thematic.',
                  misconception: 'Students often believe "respecting tradition" means blindly replicating the past, and "pursuing passion" means rejecting heritage.' }
          ],
            remediations: { 'respecting-tradition-means-blindly-replicating': { steps: ['If a student holds this misconception, guide them through a three-step re-reading: (1) List every scene where tradition.', '(2) List every scene where passion drives growth (Shruti\'s compositions, her collaboration).', '(3) Identify the scenes where both operate together (the final duet, the moment Guru Nabin suggests a raga for her.', 'Ask: "Where does the play show tradition enabling passion, not blocking it?" This shifts focus from conflict.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch6_2', difficulty: 'standard',
          question: 'From \'English chapter c9_engl_ch6\': the skill or concept this node teaches.',
          hint: 'Review PEEL paragraph structure using a simple familiar character (e.g., Rakesh from.',
          misconception: 'Students treat Shruti as a simple "modern vs. traditional" binary — either she\'s the "progressive one" or the.',
          parts: [
                { id: 'a', prompt: 'In Act 1, Shruti practices Western violin scales while her father teaches a student Hindustani raga in the next room.', answer: 'This action reveals Shruti\'s *conscious synthesis*',
                  options: ['This action reveals Shruti\'s *conscious synthesis*', 'rebellion', 'talented'],
                  hint: 'Review PEEL paragraph structure using a simple familiar character (e.g., Rakesh from Class 8 Cherry.',
                  misconception: 'Students treat Shruti as a simple "modern vs. traditional" binary — either she\'s the "progressive one" or the "disobedient daughter." This.' },
                { id: 'b', prompt: 'Compare Shruti\'s relationship with her violin to Guru Nabin Sharma\'s relationship with his sarangi.', answer: 'Guru Nabin treats the sarangi as a *sacred inheritance*',
                  options: ['Guru Nabin treats the sarangi as a *sacred inheritance*', 'father likes old, daughter likes new'],
                  hint: 'Review PEEL paragraph structure using a simple familiar character (e.g., Rakesh from Class 8 Cherry.',
                  misconception: 'Students treat Shruti as a simple "modern vs. traditional" binary — either she\'s the "progressive one" or the "disobedient daughter." This.' }
          ],
            remediations: { 'students-treat-shruti-as-a': { steps: ['If a student reduces Shruti to "rebellious modern girl," do this 3-step remediation: (1) Have them re-read Act 1 Scene.', 'Or her *relationship* to the raga?" (3) Compare her final *successful* performance: "What changed?', 'She didn\'t add more electronics — she *removed* the beat.', 'What does that subtraction tell you about her growth?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch6_3', difficulty: 'standard',
          question: 'From \'English chapter c9_engl_ch6\': the skill or concept this node teaches.',
          hint: 'Review STEAL method (Speech, Thoughts, Effect, Actions, Looks) from c8_engl_ch4_2 (Rakesh.',
          misconception: 'Students treat Guru Nabin Sharma as a one-dimensional "strict traditional father" who simply "doesn\'t understand".',
          parts: [
                { id: 'a', prompt: 'What is the guru-shishya parampara, and how does Guru Nabin Sharma embody this tradition in his role as a violin teacher?', answer: 'The guru-shishya parampara is the traditional Indian system where knowledge is',
                  options: ['The guru-shishya parampara is the traditional Indian system where knowledge is', 'he just teaches her violin like a school teacher'],
                  hint: 'Review STEAL method (Speech, Thoughts, Effect, Actions, Looks) from c8_engl_ch4_2 (Rakesh character.',
                  misconception: 'Students treat Guru Nabin Sharma as a one-dimensional "strict traditional father" who simply "doesn\'t understand" Shruti.' },
                { id: 'b', prompt: 'Apply the STEAL characterization method (Speech, Thoughts, Effect on others, Actions, Looks) to Guru Nabin Sharma using one piece of evidence for each element.', answer: 'Speech: "The raga has a soul',
                  options: ['Speech: "The raga has a soul', 'he is strict'],
                  hint: 'Review STEAL method (Speech, Thoughts, Effect, Actions, Looks) from c8_engl_ch4_2 (Rakesh character.',
                  misconception: 'Students treat Guru Nabin Sharma as a one-dimensional "strict traditional father" who simply "doesn\'t understand" Shruti.' }
          ],
            remediations: { 'students-treat-guru-nabin-sharma': { steps: ['Have the student re-read only Guru Nabin Sharma\'s lines (not Shruti\'s replies) in Acts 1 and 3, marking every reference.', 'Ask: "If you believed your art form would die if you compromised, how would you teach?" - this builds empathy for his.', 'Compare his teaching of Shruti vs. his other students (if shown) - does he treat her differently?', 'Write a paragraph defending his position using ONLY his vocabulary (sadhana, raga, guru, parampara) - this forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch6_4', difficulty: 'standard',
          question: 'Dramatic structure refers to the organization of a play into acts and scenes.',
          hint: 'If stuck, re-read c9_engl_ch6_1 (Play Summary) and physically mark every act/scene break.',
          misconception: 'Students treat stage directions as *optional reading*—"just instructions for actors"—and skip them during silent.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dramatic structure refers to the organization of a play into acts and scenes',
                  options: ['Dramatic structure refers to the organization of a play into acts and scenes', 'A play summary condenses the narrative arc of a dramatic work into a coherent overview', 'The values of pursuing passion and respecting tradition refer to the ethical and', 'From \'English chapter c9_engl_ch6\': the skill or concept this node teaches, applied to'],
                  hint: 'If stuck, re-read c9_engl_ch6_1 (Play Summary) and physically mark every act/scene break and.',
                  misconception: 'Students treat stage directions as *optional reading*—"just instructions for actors"—and skip them during silent reading, then wonder why.' }
          ],
            remediations: { 'students-treat-stage-directions-as': { steps: ['Hand the student a printed scene with *all stage directions highlighted in yellow*. Ask: "Read only the dialogue.', 'Have them rewrite a 3-line exchange *without* stage directions, then *with* three contrasting directions (e.g.', 'Assign a "silent scene" exercise: watch a 2-minute clip from a play/film *without sound*, listing every visible.', 'Return to "Twin Melodies"—annotate every stage direction with its *function code*: S=setting, M=movement, D=delivery.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch6_5', difficulty: 'standard',
          question: 'The theme of Individual Identity vs Family Legacy in Music explores the tension.',
          hint: 'If stuck, review c9_engl_ch6_2 and c9_engl_ch6_3 for character motivations, and.',
          misconception: 'Students often think "Individual Identity vs Family Legacy" means Shruti must choose ONE — either become a classical.',
          parts: [
                { id: 'a', prompt: 'In Act 2, Scene 3, Shruti practices violin while Guruji teaches a khayal bandish in the adjacent room.', answer: 'Step 1: Identify the two sounds',
                  options: ['Step 1: Identify the two sounds', 'they are both playing music', 'Individual Identity vs Family Legacy'],
                  hint: 'If stuck, review c9_engl_ch6_2 and c9_engl_ch6_3 for character motivations, and c9_engl_ch6_4 for.',
                  misconception: 'Students often think "Individual Identity vs Family Legacy" means Shruti must choose ONE — either become a classical vocalist like her.' }
          ],
            remediations: { 'individual-identity-vs-family-legacy': { steps: ['If a student is stuck in binary thinking: 1) Have them list 5 things Shruti LEARNED from Guruji (discipline, breath.', '3) Ask: "Which items on list 1 help list 2?', 'Which items on list 2 give new life to list 1?" 4) Guide them to see the final performance as the answer: the bandish.', 'This concrete mapping breaks the false dichotomy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
