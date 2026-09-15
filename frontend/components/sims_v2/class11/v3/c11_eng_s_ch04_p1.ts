import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch04_p1: SimDef = {
    id: 'v3_c11_eng_s_ch04_p1',
    title: 'Birth · Part 1/3',
    subtitle: 'Find why the story\'s climax is a gasp, not a birth.',
    classLevel: 11, subject: 'eng_s', topic: 'Birth · Part 1/3',
    chapters: ['c11_eng_s_ch04'],
    nodeIds: ['c11_eng_s_cbse_04_001', 'c11_eng_s_cbse_04_002', 'c11_eng_s_cbse_04_003', 'c11_eng_s_cbse_04_004', 'c11_eng_s_cbse_04_005', 'c11_eng_s_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young doctor fighting a stillborn case at midnight', intro: 'A miner\'s cottage, no equipment, a stillborn child and a fading mother — and a doctor who arrived doubting his own profession.', goal: 'Place the true climax and explain why the resolution follows Andrew\'s arc, not the Morgans\'.' },
    discovery: {
        question: 'The baby is delivered at last — and lies lifeless. Many readers call the birth the climax. Where does the true turning point fall?',
        options: ['The resuscitation — the child\'s first cry is the irreversible pivot of both the medical and Andrew\'s identity arcs', 'The delivery — biggest event equals climax', 'The injection that saves the mother', 'Walking home at dawn — the quiet ending resolves everything'],
        answer: 'The resuscitation — the child\'s first cry is the irreversible pivot of both the medical and Andrew\'s identity arcs',
        hook: 'The delivery creates a crisis instead of ending one — climax is the turn, not the title event.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Context and background refers to the historical, social, cultural, and biographical information surrounding a literary work that illuminates its setting, characters, themes, and authorial intent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map injection, resuscitation, first cry and the dawn walk onto the arc, and defend an ending that skips the mother\'s recovery.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are a doctor in 1920s Wales, called to a miner\'s home at midnight for a difficult birth with no modern equipment.',
            decisions: [{ prompt: 'Who is the author of "The Citadel," and what was his profession before becoming a full-time writer?', options: [
                { text: 'A.J', outcome: 'A.J. Cronin, a Scottish physician who practiced medicine in Wales and on a luxury liner before.' },
                { text: 'context', outcome: 'Not quite — Students often think "context" means only the author\'s birth/death dates or a list of historical.', reveals: 'context-means-only-the-author' },
                { text: 'a different author or profession', outcome: 'Not quite — Students often think "context" means only the author\'s birth/death dates or a list of historical.', reveals: 'context-means-only-the-author' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a medical drama where a young doctor faces his first life-or-death case while battling personal doubts about his career and.',
            decisions: [{ prompt: 'Define the five standard stages of a narrative arc (Freytag\'s Pyramid) and identify which stage in "Birth" contains Joe Morgan\'s arrival.', options: [
                { text: 'The five stages are: (1) Exposition—establishing characters, setting, and status quo', outcome: 'The five stages are: (1) Exposition—establishing characters, setting, and status quo; (2) Rising.' },
                { text: 'climax', outcome: 'Not quite — Students believe the **birth of the child** (the delivery scene) is the climax because it\'s the.', reveals: 'the-birth-of-the-child' },
                { text: 'exposition', outcome: 'Not quite — Students believe the **birth of the child** (the delivery scene) is the climax because it\'s the.', reveals: 'the-birth-of-the-child' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking through an unfamiliar neighborhood at midnight — what do you notice? The silence, the dim lights, the cool air, the feeling of anticipation?',
            decisions: [{ prompt: 'What is the physical setting of the Morgan household in "Birth," and what time of day does the story begin?', options: [
                { text: 'The Morgan household is at Number 12 Blaina Terrace, a narrow-staired, poorly furnished', outcome: 'The Morgan household is at Number 12 Blaina Terrace, a narrow-staired, poorly furnished bedroom lit.' },
                { text: 'the mood', outcome: 'Not quite — Students often think setting is only the geographical location and time, and atmosphere is just.', reveals: 'setting-is-only-the-geographical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are a doctor called to a difficult birth at midnight — the husband paces outside, the grandmother watches you like a hawk, and the midwife doubts.',
            decisions: [{ prompt: 'Name the three supporting characters who are physically present during the birth scene in the Morgan household and state one distinguishing.', options: [
                { text: 'The three supporting characters are: (1) Joe Morgan', outcome: 'The three supporting characters are: (1) Joe Morgan — the anxious husband who paces outside.' },
                { text: 'Joe Morgan is just the husband who calls the doctor', outcome: 'Not quite — Students often treat supporting characters as mere plot devices — e.g., "Joe Morgan is just the.', reveals: 'students-often-treat-supporting-characters' },
                { text: 'The midwife is only there to be proven wrong', outcome: 'Not quite — Students often treat supporting characters as mere plot devices — e.g., "Joe Morgan is just the.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are Andrew Manson, exhausted after a night of failing to save a newborn, suddenly feeling a tiny heartbeat under your fingers.',
            decisions: [{ prompt: 'What is the difference between a story\'s *plot* and its *primary theme*? Answer in one sentence.', options: [
                { text: 'Plot is the sequence of events (what happens)', outcome: 'Plot is the sequence of events (what happens); primary theme is the central idea about human.' },
                { text: 'The theme is that a doctor delivers a baby', outcome: 'Not quite — Students often confuse the **primary theme** with the **most discussed topic** in the story.', reveals: 'students-often-confuse-the-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a literature-and-society seminar you\'re asked to modernise \'Birth\' — a young doctor resuscitating a stillborn baby in a 1920s Welsh mining cottage — \'just change the date to 2025, keep everything else identical\'. A classmate agrees: \'A birth is a birth; the decade doesn\'t change the drama.\'',
            decisions: [{ prompt: 'Would transplanting the story unchanged work?', options: [
                { text: 'No — the drama is built from 1920s Welsh mining conditions: no NHS, a doctor\'s fee a miner must weigh, no antibiotics, chloroform risks, the midwife\'s authority, a family that has already buried children. Cronin was himself a doctor writing from that world; move the date and every pressure that drives the scene evaporates.', outcome: 'Context is the living environment shaping each choice — poverty dictates the medical stakes; \'a birth is a birth\' erases why this one was a miracle.' },
                { text: 'The classmate is right — medical drama is timeless; resuscitation tension needs no period.', outcome: 'The tension came from scarcity — waiting on a \'company doctor\', paying for a midwife, working without modern equipment; 2025 changes all of it.', reveals: 'medical-drama-is-timeless' },
                { text: 'Context just means knowing Cronin was a doctor — the mining-town poverty is set dressing.', outcome: 'Biography alone explains authenticity, not stakes; the miner\'s wages, the absent safety net and infant mortality are what make the all-night fight to save the baby urgent.', reveals: 'context-is-author-bio-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Andrew walks home having \'done something real at last\' — the arc belonged to the doctor, not the delivery.',
            decisions: [{ prompt: 'What comes next? Birth · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Birth · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_001', difficulty: 'standard',
          question: 'Context and background refers to the historical, social, cultural, and.',
          hint: 'If stuck, review Class 10 node c10_engl_cbse_04_001 (Anne Frank\'s historical context) and.',
          misconception: 'Students often think "context" means only the author\'s birth/death dates or a list of historical events.',
          parts: [
                { id: 'a', prompt: 'Apply your knowledge of 1920s medical practice: Why would the midwife warn Andrew not to give chloroform if it would harm the baby, and what does this reveal.', answer: 'Chloroform could depress the baby\'s respiration, and in an era before neonatal',
                  options: ['Chloroform could depress the baby\'s respiration, and in an era before neonatal', 'context'],
                  hint: 'If stuck, review Class 10 node c10_engl_cbse_04_001 (Anne Frank\'s historical context) and practice.',
                  misconception: 'Students often think "context" means only the author\'s birth/death dates or a list of historical events.' }
          ],
            remediations: { 'context-means-only-the-author': { steps: ['If a student gives only dates/events, ask: "What did a miner earn?', 'What happened if he couldn\'t pay the doctor?', 'How did women give birth without hospitals?" Guide them to research one aspect: wages, housing, medical fees, midwife.', 'Then have them rewrite a scene from the story inserting one concrete detail they discovered (e.g., the cost of the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the organized sequence of events in.',
          hint: 'If stuck, review Class 10 "The Thief\'s Story" (c10_engl_cbse_11_008) for first-person.',
          misconception: 'Students believe the **birth of the child** (the delivery scene) is the climax because it\'s the titular event and.',
          parts: [
                { id: 'a', prompt: 'Map the following events from "Birth" onto the narrative arc stages: (A) Andrew injects Susan Morgan to save her life; (B) The child gasps and cries; (C).', answer: 'Correct mapping: (E) Exposition/Inciting Incident',
                  options: ['Correct mapping: (E) Exposition/Inciting Incident', 'most dramatic action', 'structural turning point', 'action'],
                  hint: 'If stuck, review Class 10 "The Thief\'s Story" (c10_engl_cbse_11_008) for first-person confession.',
                  misconception: 'Students believe the **birth of the child** (the delivery scene) is the climax because it\'s the titular event and involves the most.' }
          ],
            remediations: { 'the-birth-of-the-child': { steps: ['**Re-teach the distinction**: Use a two-column table: "Event" vs.', '"Structural Function." List: Delivery → Complication (new problem); Resuscitation → Climax (irreversible change.', '**Visual mapping**: Have the student draw Freytag\'s Pyramid for "Birth" twice—once with delivery as climax (showing how.', '**Protagonist-problem anchor**: Ask: "What is Andrew\'s problem at the start?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the **birth of the child** (the delivery scene) is the climax because it\'s the titular event and.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The story\'s resolution (Andrew walking home at dawn) is structurally weak because it doesn\'t show Joe Morgan\'s reaction or the mother.', answer: '**Refute.** The resolution is structurally precise',
                  options: ['**Refute.** The resolution is structurally precise', 'plot completeness', 'narrative resolution', 'action'],
                  hint: 'If stuck, review Class 10 "The Thief\'s Story" (c10_engl_cbse_11_008) for first-person confession.',
                  misconception: 'Students believe the **birth of the child** (the delivery scene) is the climax because it\'s the titular event and involves the most.' },
                { id: 'b', prompt: 'Write a 150-word alternate ending for "Birth" that changes the child\'s outcome (the child dies) but maintains the same narrative structure (five stages.', answer: 'A strong answer will: (1) Keep the five-stage arc intact',
                  options: ['A strong answer will: (1) Keep the five-stage arc intact', 'action'],
                  hint: 'If stuck, review Class 10 "The Thief\'s Story" (c10_engl_cbse_11_008) for first-person confession.',
                  misconception: 'Students believe the **birth of the child** (the delivery scene) is the climax because it\'s the titular event and involves the most.' }
          ],
            remediations: { 'the-birth-of-the-child': { steps: ['**Re-teach the distinction**: Use a two-column table: "Event" vs.', '"Structural Function." List: Delivery → Complication (new problem); Resuscitation → Climax (irreversible change.', '**Visual mapping**: Have the student draw Freytag\'s Pyramid for "Birth" twice—once with delivery as climax (showing how.', '**Protagonist-problem anchor**: Ask: "What is Andrew\'s problem at the start?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a story.',
          hint: 'Review the skill of annotating sensory details (sight, sound, touch, smell) in a prose.',
          misconception: 'Students often think setting is only the geographical location and time, and atmosphere is just "the mood." They miss.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and social environment in',
                  options: ['Setting refers to the time, place, and social environment in', 'Context and background refers to the historical, social, cultural, and biographical', 'Plot and narrative structure refers to the organized sequence of events in a story and', 'Character analysis of the protagonist involves examining the central character\'s'],
                  hint: 'Review the skill of annotating sensory details (sight, sound, touch, smell) in a prose passage.',
                  misconception: 'Students often think setting is only the geographical location and time, and atmosphere is just "the mood." They miss that setting includes.' }
          ],
            remediations: { 'setting-is-only-the-geographical': { steps: ['If a student cannot move beyond "time and place," guide them to: (1) List every sensory detail in a chosen paragraph.', '(2) Label each as sight/sound/touch/smell.', '(3) Ask: "What does this combination make you feel?" (4) Connect that feeling to Andrew\'s state of mind at that moment.', 'Repeat for the resuscitation scene to see the shift.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If stuck, re-read the kitchen scene (internal monologue) and the resuscitation scene.',
          misconception: 'Students often treat Andrew\'s success as a lucky miracle rather than the result of his deliberate, knowledge-based.',
          parts: [
                { id: 'a', prompt: 'Compare Andrew\'s attitude toward the child at three moments: when the child is born lifeless, during the fifteen-minute resuscitation, and after the first cry.', answer: 'Initially, Andrew feels a "shiver of horror" and hesitation',
                  options: ['Initially, Andrew feels a "shiver of horror" and hesitation', 'treats his attitude as static (e'],
                  hint: 'If stuck, re-read the kitchen scene (internal monologue) and the resuscitation scene (actions).',
                  misconception: 'Students often treat Andrew\'s success as a lucky miracle rather than the result of his deliberate, knowledge-based persistence.' }
          ],
            remediations: { 'students-often-treat-andrew-s': { steps: ['Have the student list every verb describing Andrew\'s actions during resuscitation (e.g., "smash," "inject," "flung,".', 'Ask: "Which of these are instinctive?', 'Which require medical knowledge?" 3.', 'Map each action to a textual cue (e.g., "whiteness meant asphyxia" → knowledge).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_005', difficulty: 'standard',
          question: 'Supporting character analysis examines how secondary figures (Joe Morgan, Mrs.',
          hint: 'Review c10_engl_cbse_01_008 (Postmaster analysis) and practice identifying three ways the.',
          misconception: 'Students often treat supporting characters as mere plot devices — e.g., "Joe Morgan is just the husband who calls the.',
          parts: [
                { id: 'a', prompt: 'Name the three supporting characters who are physically present during the birth scene in the Morgan household and state one distinguishing trait for each.', answer: 'The three supporting characters are: (1) Joe Morgan',
                  options: ['The three supporting characters are: (1) Joe Morgan', 'Joe Morgan is just the husband who calls the doctor', 'The midwife is only there to be proven wrong'],
                  hint: 'Review c10_engl_cbse_01_008 (Postmaster analysis) and practice identifying three ways the.',
                  misconception: 'Students often treat supporting characters as mere plot devices — e.g., "Joe Morgan is just the husband who calls the doctor" or "The.' },
                { id: 'b', prompt: 'The grandmother says: "Susan said not to give her the chloroform if it would harm the baby.', answer: 'The grandmother knows the depth of collective longing for this child',
                  options: ['The grandmother knows the depth of collective longing for this child', 'Joe Morgan is just the husband who calls the doctor', 'The midwife is only there to be proven wrong'],
                  hint: 'Review c10_engl_cbse_01_008 (Postmaster analysis) and practice identifying three ways the.',
                  misconception: 'Students often treat supporting characters as mere plot devices — e.g., "Joe Morgan is just the husband who calls the doctor" or "The.' },
                { id: 'c', prompt: 'Analyse the midwife\'s progression from "frightened gesture" placing the child under the bed to "sobbed hysterically...', answer: 'The midwife begins as the voice of traditional resignation',
                  options: ['The midwife begins as the voice of traditional resignation', 'Joe Morgan is just the husband who calls the doctor', 'The midwife is only there to be proven wrong'],
                  hint: 'Review c10_engl_cbse_01_008 (Postmaster analysis) and practice identifying three ways the.',
                  misconception: 'Students often treat supporting characters as mere plot devices — e.g., "Joe Morgan is just the husband who calls the doctor" or "The.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Have the student re-read only the scenes where Andrew is absent or silent (Joe waiting outside, grandmother in kitchen.', 'Ask: "What is this person feeling right now that Andrew cannot see?" 3.', 'Model a think-aloud: "The grandmother\'s \'eyes strangely alive and wise, probing\' — she\'s not just watching; she\'s.', 'Require the student to rewrite one diagnostic answer using this evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, review **c11_eng_s_cbse_04_002 (Plot and Narrative Structure)** and draw.',
          misconception: 'Students often confuse the **primary theme** with the **most discussed topic** in the story.',
          parts: [
                { id: 'a', prompt: 'What is the difference between a story\'s *plot* and its *primary theme*? Answer in one sentence.', answer: 'Plot is the sequence of events (what happens)',
                  options: ['Plot is the sequence of events (what happens)', 'The theme is that a doctor delivers a baby'],
                  hint: 'If stuck, review **c11_eng_s_cbse_04_002 (Plot and Narrative Structure)** and draw a **Freytag\'s.',
                  misconception: 'Students often confuse the **primary theme** with the **most discussed topic** in the story.' }
          ],
            remediations: { 'students-often-confuse-the-primary': { steps: ['**Re-read the last 3 pages** (from "An hour elapsed..." to the end) and highlight every verb describing Andrew\'s.', 'Notice: *heaved, persisted, rubbed, crushing, releasing, redoubled*.', '**Ask:** "What is the story\'s **final image**?" (Andrew walking with miners at dawn, thinking "done something real").', '**Complete this sentence:** "This story proves that a doctor\'s true worth is measured not by ______ but by ______.".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
