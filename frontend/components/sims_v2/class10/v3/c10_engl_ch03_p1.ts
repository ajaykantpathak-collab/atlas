import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch03_p1: SimDef = {
    id: 'v3_c10_engl_ch03_p1',
    title: 'Two Stories About Flying · Part 1/2',
    subtitle: 'Watch a terrified seagull get tricked into his first flight',
    classLevel: 10, subject: 'engl', topic: 'Two Stories About Flying · Part 1/2',
    chapters: ['c10_engl_ch03'],
    nodeIds: ['c10_engl_cbse_03_001', 'c10_engl_cbse_03_002', 'c10_engl_cbse_03_003', 'c10_engl_cbse_03_004', 'c10_engl_cbse_03_005', 'c10_engl_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a behavioural scientist reading a bird family\'s strategy', intro: 'His brothers and sister flew days ago. He watches from the ledge, pretending to sleep, too scared to try — until his mother weaponises his own stomach.', goal: 'Analyse fear as layered psychology and support claims about the family\'s deliberate staging with evidence.' },
    discovery: {
        question: 'The young seagull\'s mother flies up with a piece of fish — then halts mid-air, just out of his reach. Starving, he dives at the fish and finds himself flying. Was the family abandoning him all along?',
        options: ['No — they staged a controlled crisis: withholding food, circling, calling, until hunger beat fear', 'Yes — they gave up on him and left him to survive or starve', 'No — the mother simply couldn\'t land on the narrow ledge', 'Partly — they abandoned him but came back when they heard him cry'],
        answer: 'No — they staged a controlled crisis: withholding food, circling, calling, until hunger beat fear',
        hook: 'The first flight wasn\'t bravery — it was engineering. His family built a situation where staying afraid cost more than jumping.',
    },
    teaching: [
        { title: 'The Young Seagull\'s Fear of Flying: Overcoming Fear (Part I)', text: 'The young seagull\'s fear of flying represents the universal psychological barrier of confronting the unknown, where innate instinct conflicts with learned apprehension, and overcoming it requires.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track every detail the author plants — the mocking siblings, the hunger, the mother hovering with fish — and argue whether the seagull conquered fear or fear was outmanoeuvred.',
        labels: ['The Young Seagull\'s Fear', 'The Role of Hunger', 'The Pilot Lost', 'The Mysterious Pilot', 'Theme: Courage, Self-Reliance', 'Narrative Technique: First-Person Point'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_001', title: 'The Young Seagull\'s Fear of Flying: Overcoming Fear (Part I)',
          caseStudy: { intro: 'Imagine standing at the edge of a high diving board for the first time — your legs shake, your heart races, and every instinct screams to step back.',
            decisions: [{ prompt: 'What specific physical detail does the author use in the opening paragraph to emphasize the height and danger of the ledge where the young.', options: [
                { text: 'The author describes "a sheer drop to the sea" and "the great expanse of sea stretching', outcome: 'The author describes "a sheer drop to the sea" and "the great expanse of sea stretching down.' },
                { text: 'the nest was high', outcome: 'Not quite — Students often think the seagull\'s fear is simply "being scared of heights" and that the solution.', reveals: 'the-seagull-s-fear-is' },
                { text: 'the wind was strong', outcome: 'Not quite — Students often think the seagull\'s fear is simply "being scared of heights" and that the solution.', reveals: 'the-seagull-s-fear-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_002', title: 'The Role of Hunger and Family in the Seagull\'s First Flight (Part I)',
          caseStudy: { intro: 'Imagine you\'re standing on a high diving board for the first time — your legs are shaking, you know the water is safe, but you just can\'t jump.',
            decisions: [{ prompt: 'What specific action does the mother seagull take with the piece of fish that finally triggers the young seagull\'s first flight?', options: [
                { text: 'The mother seagull picks up a piece of fish, flies across to the young seagull\'s ledge,', outcome: 'The mother seagull picks up a piece of fish, flies across to the young seagull\'s ledge, and halts.' },
                { text: 'she feeds him', outcome: 'Not quite — Students believe the family *abandoned* the young seagull and he flew purely by instinct when.', reveals: 'the-family-abandoned-the-young' },
                { text: 'she drops the fish', outcome: 'Not quite — Students believe the family *abandoned* the young seagull and he flew purely by instinct when.', reveals: 'the-family-abandoned-the-young' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_003', title: 'The Pilot Lost in Storm Clouds: The Black Aeroplane (Part II)',
          caseStudy: { intro: 'Imagine you are driving a car at night on a highway and suddenly a thick fog descends — your GPS fails, you can\'t see the road markings, and you don\'t know.',
            decisions: [{ prompt: 'What is the immediate reason the pilot decides to fly his old Dakota straight into the storm clouds instead of turning back to Paris?', options: [
                { text: 'The pilot decides to fly into the storm', outcome: 'The pilot decides to fly into the storm because he wants to reach England in time for a big English.' },
                { text: 'he didn\'t see the clouds', outcome: 'Not quite — Students often treat the black aeroplane as a *real, physical aircraft* that simply wasn\'t detected.', reveals: 'students-often-treat-the-black' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_004', title: 'The Mysterious Pilot of the Black Aeroplane: Mystery and Analysis (Part II)',
          caseStudy: { intro: 'Imagine you\'re driving alone on a foggy highway at night and suddenly a car appears beside you, flashing lights to guide you through the worst stretch — then.',
            decisions: [{ prompt: 'What is the control tower operator\'s exact statement about other aircraft on the night of the narrator\'s flight?', options: [
                { text: 'The control tower operator states: "No other aircraft was flying tonight', outcome: 'The control tower operator states: "No other aircraft was flying tonight.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students believe the story "solves" the mystery by the end — either the pilot was a ghost.', reveals: 'the-story-solves-the-mystery' },
                { text: 'solves', outcome: 'Not quite — Students believe the story "solves" the mystery by the end — either the pilot was a ghost.', reveals: 'the-story-solves-the-mystery' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_005', title: 'Theme: Courage, Self-Reliance and Facing the Unknown',
          caseStudy: { intro: 'Imagine you\'re standing at the edge of a diving board for the first time — your legs shake, your heart races, and the water below looks bottomless.',
            decisions: [{ prompt: 'Define the term "theme" in literature and explain how it differs from "plot" using one example from "His First Flight."', options: [
                { text: 'A theme is the central idea or underlying message about life/human nature that a story', outcome: 'A theme is the central idea or underlying message about life/human nature that a story explores.' },
                { text: 'the seagull was hungry so he flew', outcome: 'Not quite — Students believe "self-reliance" means solving problems completely alone without any help.', reveals: 'self-reliance-means-solving-problems' },
                { text: 'self-reliance', outcome: 'Not quite — Students believe "self-reliance" means solving problems completely alone without any help.', reveals: 'self-reliance-means-solving-problems' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_006', title: 'Narrative Technique: First-Person Point of View in Part II',
          caseStudy: { intro: 'Imagine you\'re sitting in a cockpit at midnight, instruments dead, fuel low, and a strange black plane appears beside you — would you trust your own eyes.',
            decisions: [{ prompt: 'What is the defining grammatical feature of first-person narration, and which pronoun does the pilot in "The Black Aeroplane" primarily use.', options: [
                { text: 'The defining feature is the use of first-person pronouns, primarily "I" (and "my," "me")', outcome: 'The defining feature is the use of first-person pronouns, primarily "I" (and "my," "me").' },
                { text: 'I saw the clouds', outcome: 'Not quite — Students believe first-person narration means the narrator is "telling the truth" or "objective".', reveals: 'first-person-narration-means-the' },
                { text: 'I turned the plane', outcome: 'Not quite — Students believe first-person narration means the narrator is "telling the truth" or "objective".', reveals: 'first-person-narration-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior student has memorised her lines for the school play but freezes at every rehearsal, terrified of the stage. Her older brother, who just read the story of the young seagull\'s first flight, says: \'I know exactly what\'s going on with you.\'',
            decisions: [{ prompt: 'What does the seagull\'s story actually suggest about her fear?', options: [
                { text: 'That the fear is self-doubt, not inability — the seagull could fly perfectly well but was paralysed by the unknown, and only hunger pushed him over the edge, where instinct took over. For the student, the fix is not more skill but the first leap — one pushed step, and the capability she already has will carry her.', outcome: 'The story\'s point is that fear of the unknown outlives itself in one moment of action — the seagull discovered wings only after falling into air, and stage fright works the same way.' },
                { text: 'It proves she should wait until she feels zero fear — the seagull only flew once he was calm and ready.', outcome: 'The seagull was never calm — he flew because hunger forced the leap while he was still terrified; waiting for fear to disappear first would have left him on the ledge forever.', reveals: 'brave-means-fearless' },
                { text: 'It proves her fear means she is genuinely not ready, since instincts warn us away from things we cannot do.', outcome: 'The seagull\'s fear was false alarm — his wings were ready while his mind was not; a prepared student\'s fright is the same kind of false signal.', reveals: 'fear-proves-unreadiness' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Sometimes the only way past a ledge is a push you don\'t recognise as love. Hunger did what courage couldn\'t — and the sea caught him gently.',
            decisions: [{ prompt: 'What comes next? Two Stories About Flying · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Two Stories About Flying · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_03_001', difficulty: 'standard',
          question: 'The young seagull\'s fear of flying represents the universal psychological.',
          hint: 'Review "identifying sensory imagery in prose" from Class 9 (c9_engl_ch2_7) and "character.',
          misconception: 'Students often think the seagull\'s fear is simply "being scared of heights" and that the solution is "bravery.".',
          parts: [
                { id: 'a', prompt: 'Identify two sensory details the author uses to describe the mother seagull\'s flight with the piece of fish, and explain how each detail intensifies the young.', answer: '1) Visual: "tearing at a piece of fish"',
                  options: ['1) Visual: "tearing at a piece of fish"', 'she flew with fish', 'explain how', 'being scared of heights'],
                  hint: 'Review "identifying sensory imagery in prose" from Class 9 (c9_engl_ch2_7) and "character internal.',
                  misconception: 'Students often think the seagull\'s fear is simply "being scared of heights" and that the solution is "bravery." In reality, the text.' }
          ],
            remediations: { 'the-seagull-s-fear-is': { steps: ['Have the student re-read paragraphs 3-5 aloud, marking every verb describing the seagull\'s physical state (trembled.', 'Ask: "What changes in his body when the fish appears?" — guide to "he leaned out desperately," "tapped the rock,".', 'Contrast with the father\'s scolding in paragraph 2 — why did that fail?', 'Write a 3-sentence answer: "Fear manifests physically as ____. The father\'s method fails because ____.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the seagull\'s fear is simply "being scared of heights" and that the solution is "bravery.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The young seagull\'s fear is entirely irrational because flying is his natural instinct." Defend or refute using evidence from the text.', answer: 'Refute',
                  options: ['Refute', 'being scared of heights', 'bravery', 'the great expanse of sea'],
                  hint: 'Review "identifying sensory imagery in prose" from Class 9 (c9_engl_ch2_7) and "character internal.',
                  misconception: 'Students often think the seagull\'s fear is simply "being scared of heights" and that the solution is "bravery." In reality, the text.' },
                { id: 'b', prompt: 'Write a 4-line internal monologue for the young seagull at the moment he sees the fish in his mother\'s beak, capturing the conflict between fear and hunger.', answer: 'Example: "The fish glints',
                  options: ['Example: "The fish glints', 'being scared of heights', 'bravery', 'the great expanse of sea'],
                  hint: 'Review "identifying sensory imagery in prose" from Class 9 (c9_engl_ch2_7) and "character internal.',
                  misconception: 'Students often think the seagull\'s fear is simply "being scared of heights" and that the solution is "bravery." In reality, the text.' }
          ],
            remediations: { 'the-seagull-s-fear-is': { steps: ['Have the student re-read paragraphs 3-5 aloud, marking every verb describing the seagull\'s physical state (trembled.', 'Ask: "What changes in his body when the fish appears?" — guide to "he leaned out desperately," "tapped the rock,".', 'Contrast with the father\'s scolding in paragraph 2 — why did that fail?', 'Write a 3-sentence answer: "Fear manifests physically as ____. The father\'s method fails because ____.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_03_002', difficulty: 'standard',
          question: 'The role of hunger and family in the seagull\'s first flight refers to how the.',
          hint: 'Review "character motivation" from Class 9 (c9_engl_ch2_4 — Sentila\'s conflict between.',
          misconception: 'Students believe the family *abandoned* the young seagull and he flew purely by instinct when hunger became unbearable.',
          parts: [
                { id: 'a', prompt: 'In the paragraph where the young seagull watches his family on the plateau, the text says: "His father and mother had come around calling to him shrilly.', answer: 'The device is **dramatic irony**',
                  options: ['The device is **dramatic irony**', 'hyperbole', 'metaphor'],
                  hint: 'Review "character motivation" from Class 9 (c9_engl_ch2_4 — Sentila\'s conflict between individual.',
                  misconception: 'Students believe the family *abandoned* the young seagull and he flew purely by instinct when hunger became unbearable.' }
          ],
            remediations: { 'the-family-abandoned-the-young': { steps: ['Re-read the three paragraphs before the flight with a highlighter: mark every verb describing the mother\'s actions.', 'Ask: "Does \'halted\' sound like a bird feeding its chick normally?" 3.', 'Create a two-column table: Column A = Family Action, Column B = Seagull\'s Reaction.', 'Fill it: Mother halts with fish → Seagull lunges.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_03_003', difficulty: 'standard',
          question: 'This topic covers the plot progression and atmospheric setting of the second.',
          hint: 'Review c9_engl_ch1_7 (First-Person Narrative Perspective) and c6_english_u4_039.',
          misconception: 'Students often treat the black aeroplane as a *real, physical aircraft* that simply wasn\'t detected by radar due.',
          parts: [
                { id: 'a', prompt: 'What is the immediate reason the pilot decides to fly his old Dakota straight into the storm clouds instead of turning back to Paris?', answer: 'The pilot decides to fly into the storm',
                  options: ['The pilot decides to fly into the storm', 'he didn\'t see the clouds'],
                  hint: 'Review c9_engl_ch1_7 (First-Person Narrative Perspective) and c6_english_u4_039 (Narrative and.',
                  misconception: 'Students often treat the black aeroplane as a *real, physical aircraft* that simply wasn\'t detected by radar due to technical error.' }
          ],
            remediations: { 'students-often-treat-the-black': { steps: ['Re-read the last three paragraphs aloud.', 'Highlight the control woman\'s exact words: "No other plane... only one on radar."', 'Ask: "If the radar was broken, would she say \'only one\' or \'radar not working\'?"', 'Connect to the title "The Black Aeroplane" — \'Black\' suggests mystery/unknown, not just colour.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_03_004', difficulty: 'standard',
          question: 'The mysterious pilot in "The Black Aeroplane" is an ambiguous literary figure.',
          hint: 'Review "First-Person Narrative Perspective" (c9_engl_ch1_7) and "Detective Genre: Clues.',
          misconception: 'Students believe the story "solves" the mystery by the end — either the pilot was a ghost (supernatural) or.',
          parts: [
                { id: 'a', prompt: 'What is the control tower operator\'s exact statement about other aircraft on the night of the narrator\'s flight?', answer: 'The control tower operator states: "No other aircraft was flying tonight',
                  options: ['The control tower operator states: "No other aircraft was flying tonight', 'A wrong answer (e.g', 'solves'],
                  hint: 'Review "First-Person Narrative Perspective" (c9_engl_ch1_7) and "Detective Genre: Clues, Deduction".',
                  misconception: 'Students believe the story "solves" the mystery by the end — either the pilot was a ghost (supernatural) or a hallucination.' },
                { id: 'b', prompt: 'Explain in your own words why the narrator describes the mysterious pilot\'s face as "not the face of a pilot" and what this description suggests about the.', answer: 'The narrator says the pilot\'s face was "not the face of a pilot"',
                  options: ['The narrator says the pilot\'s face was "not the face of a pilot"', 'The pilot looked tired', 'solves'],
                  hint: 'Review "First-Person Narrative Perspective" (c9_engl_ch1_7) and "Detective Genre: Clues, Deduction".',
                  misconception: 'Students believe the story "solves" the mystery by the end — either the pilot was a ghost (supernatural) or a hallucination.' }
          ],
            remediations: { 'the-story-solves-the-mystery': { steps: ['Have the student re-read the final two paragraphs aloud, highlighting every factual claim (radar, no other plane.', 'Create a two-column table: Column A = Evidence the pilot was physically real (sensory details, sustained interaction.', 'Column B = Evidence the pilot was not physically real (no lights, no radio, radar confirmation, sudden disappearance).', 'Ask: "Which column has more *textual* support?" (They are balanced.) 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_03_005', difficulty: 'standard',
          question: 'The theme of "Courage, Self-Reliance and Facing the Unknown" in "Two Stories.',
          hint: 'If stuck, review c10_engl_cbse_03_001 (seagull\'s fear) and c10_engl_cbse_03_003 (pilot\'s.',
          misconception: 'Students believe "self-reliance" means solving problems completely alone without any help.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "facing the unknown" to both stories: identify the exact moment each protagonist confronts the unknown, and write one sentence explaining.', answer: 'Seagull: The moment he dives for the fish and falls outward',
                  options: ['Seagull: The moment he dives for the fish and falls outward', 'I am lost', 'I will follow', 'the seagull jumped'],
                  hint: 'If stuck, review c10_engl_cbse_03_001 (seagull\'s fear) and c10_engl_cbse_03_003 (pilot\'s storm).',
                  misconception: 'Students believe "self-reliance" means solving problems completely alone without any help.' },
                { id: 'b', prompt: 'Analyze how the *nature* of the "unknown" differs for the seagull and the pilot. How does this difference shape the type of courage each displays?', answer: 'The seagull faces a *developmental* unknown',
                  options: ['The seagull faces a *developmental* unknown', 'both were scared and then brave', 'self-reliance', '"self-reliance" means solving problems completely alone without any help'],
                  hint: 'If stuck, review c10_engl_cbse_03_001 (seagull\'s fear) and c10_engl_cbse_03_003 (pilot\'s storm).',
                  misconception: 'Students believe "self-reliance" means solving problems completely alone without any help.' }
          ],
            remediations: { 'self-reliance-means-solving-problems': { steps: ['Ask the student to list every decision each protagonist makes *independently* (seagull: diving for fish, flapping wings.', 'Have them label each as "action taken alone" or "action involving another."', 'Discuss: "Does involving another mean you lose self-reliance? When a doctor follows a specialist\'s advice, is the.', 'Rewrite the definition: "Self-reliance = owning your choices, even when they involve trusting others."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_03_006', difficulty: 'standard',
          question: 'First-person point of view is a narrative technique where the story is told.',
          hint: 'If stuck, re-read the opening two pages of "The Black Aeroplane" and circle every "I".',
          misconception: 'Students believe first-person narration means the narrator is "telling the truth" or "objective" because they use "I.".',
          parts: [
                { id: 'a', prompt: 'The narrator writes, "I was happy to be alone high up above the sleeping countryside." Later, he says, "Inside the clouds, everything was suddenly black.".', answer: 'In first-person, we feel the emotional whiplash *with* the narrator',
                  options: ['In first-person, we feel the emotional whiplash *with* the narrator', 'the mood changes', 'telling the truth', 'objective'],
                  hint: 'If stuck, re-read the opening two pages of "The Black Aeroplane" and circle every "I" — then ask.',
                  misconception: 'Students believe first-person narration means the narrator is "telling the truth" or "objective" because they use "I." In "The Black.' }
          ],
            remediations: { 'first-person-narration-means-the': { steps: ['Have the student highlight every "I thought," "I felt," "I saw" in the text — physically marking the filter.', 'For each, ask: "Could a camera on the wing have recorded this?" (e.g., "I was happy" — no; "clouds were black" — yes).', 'Create a two-column table: Column A = narrator\'s inference ("he came to help"), Column B = what a camera would show ("a.', 'Discuss: the mystery exists *only* in the gap between A and B.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
