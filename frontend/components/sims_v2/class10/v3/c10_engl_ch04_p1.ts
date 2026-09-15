import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch04_p1: SimDef = {
    id: 'v3_c10_engl_ch04_p1',
    title: 'From the Diary of Anne Frank · Part 1/2',
    subtitle: 'Meet the girl who turned a notebook into a lifeline',
    classLevel: 10, subject: 'engl', topic: 'From the Diary of Anne Frank · Part 1/2',
    chapters: ['c10_engl_ch04'],
    nodeIds: ['c10_engl_cbse_04_001', 'c10_engl_cbse_04_002', 'c10_engl_cbse_04_003', 'c10_engl_cbse_04_004', 'c10_engl_cbse_04_005', 'c10_engl_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a historian reading a real-time document of the Holocaust', intro: 'Forbidden from trams, schools and park benches at thirteen, a girl in hiding names her diary and tells it everything she cannot tell a soul.', goal: 'Connect the diary to Holocaust history and explain Kitty as confidante, not literary device.' },
    discovery: {
        question: 'Anne Frank writes \'Dear Kitty\' instead of \'Dear Diary,\' and says \'paper has more patience than people.\' In a sealed-off annex, what is the diary actually doing for her?',
        options: ['It\'s a survival tool — writing builds her a confidante and a self that the Nazis were trying to erase', 'It\'s a teenage phase — she\'s just a normal lonely girl who wants a friend', 'It\'s homework — she planned to publish it as a book someday', 'It\'s evidence — she was recording Nazi crimes for a future trial'],
        answer: 'It\'s a survival tool — writing builds her a confidante and a self that the Nazis were trying to erase',
        hook: 'When a regime strips you of your school, your tram, your park bench — writing \'I still exist\' onto a page is not a hobby. It\'s resistance.',
    },
    teaching: [
        { title: 'Anne Frank: Background and the Historical Context of the Holocaust', text: 'The historical context of Anne Frank\'s diary refers to the systematic persecution and genocide of six million Jews by Nazi Germany and its collaborators during World War II (1939–1945), known as the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Place a 13-year-old\'s diary inside its history — trace the laws that caged her life — then prove why \'lonely teenager\' is a one-mark answer, not a three-mark one.',
        labels: ['Anne Frank: Background', 'Anne\'s Diary as', 'Anne\'s First Day at', 'Anne\'s Relationship with Her', 'Anne\'s Humour and Wit', 'Theme: Resilience, Hope'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_001', title: 'Anne Frank: Background and the Historical Context of the Holocaust',
          caseStudy: { intro: 'Imagine you are a 13-year-old student in Class 10 today, worried about board exams.',
            decisions: [{ prompt: 'What was the immediate trigger that forced the Frank family to go into hiding in July 1942?', options: [
                { text: 'Margot Frank received a call-up notice (deportation order) from the SS to report for', outcome: 'Margot Frank received a call-up notice (deportation order) from the SS to report for forced labor.' },
                { text: 'They went into hiding', outcome: 'Not quite — Students believe the Holocaust began with mass killings in 1939 or 1941, and that Anne\'s family.', reveals: 'the-holocaust-began-with-mass' },
                { text: 'Because the war started', outcome: 'Not quite — Students believe the Holocaust began with mass killings in 1939 or 1941, and that Anne\'s family.', reveals: 'the-holocaust-began-with-mass' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_002', title: 'Anne\'s Diary as a Confidante: \'Kitty\' and the Need to Write',
          caseStudy: { intro: 'Imagine you have a secret so heavy you cannot tell your parents, your best friend, or anyone — but you *must* tell someone or you will burst.',
            decisions: [{ prompt: 'What name does Anne give to her diary, and in which entry does she first explain why she chooses that name?', options: [
                { text: 'Anne names her diary "Kitty." She first explains this in the entry dated June 12, 1942,', outcome: 'Anne names her diary "Kitty." She first explains this in the entry dated June 12, 1942, writing: "I.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students believe Kitty is merely a literary device — a cute name for a diary — and that Anne\'s.', reveals: 'kitty-is-merely-a-literary' },
                { text: 'she names it after her cat', outcome: 'Not quite — Students believe Kitty is merely a literary device — a cute name for a diary — and that Anne\'s.', reveals: 'kitty-is-merely-a-literary' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_005', title: 'Anne\'s Humour and Wit: The Poem About the Talking Duck',
          caseStudy: { intro: 'Imagine you\'re in class, chatting with your friend, and the teacher catches you — again.',
            decisions: [{ prompt: 'What is the immediate reason Anne Frank writes the poem about the talking duck?', options: [
                { text: 'Anne writes the poem as her third punishment assignment from Mr', outcome: 'Anne writes the poem as her third punishment assignment from Mr.' },
                { text: 'she wrote it for fun', outcome: 'Not quite — Students often think the poem is *just* a funny story about animals and miss that it is a **coded.', reveals: 'the-poem-is-just-a' },
                { text: 'it was a homework assignment unrelated to punishment', outcome: 'Not quite — Students often think the poem is *just* a funny story about animals and miss that it is a **coded.', reveals: 'the-poem-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_006', title: 'Theme: Resilience, Hope and the Human Spirit in Adversity',
          caseStudy: { intro: 'Imagine you are preparing for a difficult exam while loud construction noise continues outside your window for weeks — you feel trapped, anxious, and.',
            decisions: [{ prompt: 'Define "resilience" specifically in the context of Anne Frank\'s diary entries prescribed for Class 10.', options: [
                { text: 'Resilience in Anne\'s diary is the sustained psychological endurance to maintain one\'s', outcome: 'Resilience in Anne\'s diary is the sustained psychological endurance to maintain one\'s identity.' },
                { text: 'she wasn\'t scared', outcome: 'Not quite — Students believe "hope" in Anne\'s diary means she was *optimistic about the war ending soon*.', reveals: 'hope-in-anne-s-diary' },
                { text: '"hope" in Anne\'s diary means she was *optimistic about the war ending soon*', outcome: 'Not quite — Students believe "hope" in Anne\'s diary means she was *optimistic about the war ending soon*.', reveals: 'hope-in-anne-s-diary' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student finishes Anne Frank\'s diary and says, \'Honestly, the family was safe in hiding — Anne complained a lot for someone who wasn\'t in a camp.\' His teacher asks him to rethink before writing his exam answer.',
            decisions: [{ prompt: 'What is wrong with the student\'s reading?', options: [
                { text: 'It ignores the lens every entry must be read through — the family hid because anti-Jewish decrees had already stripped their freedom, and discovery meant deportation. And calling Anne only a victim misses her agency: she studied, wrote, argued and planned a future inside two years of confinement. The diary records resistance by a mind, not just suffering by a body.', outcome: 'Reading her complaints without the historical context flattens the diary; \'safe\' hiding was really a shrinking cage under constant threat, and her writing itself was an act of defiance.' },
                { text: 'The student is right — since the family was never caught during the diary years, Anne\'s fears were exaggerated and her complaints immature.', outcome: 'The threat was real and eventually did find them; the diary\'s value is that it records, in real time, what persecution felt like before anyone knew how it would end.', reveals: 'hiding-meant-safety' },
                { text: 'The student is right because Anne\'s diary is just a teenage journal — it cannot be treated as evidence of anything larger.', outcome: 'Precisely because it is a real-time account without hindsight, it is a valuable historical source — it shows ordinary life under extraordinary persecution.', reveals: 'diary-is-just-journal' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'The Holocaust isn\'t background to the diary — it\'s the lens for every entry. Anne wrote in real time, not knowing the ending, which is exactly why we can\'t stop reading.',
            decisions: [{ prompt: 'What comes next? From the Diary of Anne Frank · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — From the Diary of Anne Frank · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_001', difficulty: 'standard',
          question: 'The historical context of Anne Frank\'s diary refers to the systematic.',
          hint: 'Review c9_engl_ch5_2 (Resilience theme) and practice the 4-column timeline method with.',
          misconception: 'Students believe the Holocaust began with mass killings in 1939 or 1941, and that Anne\'s family went into hiding.',
          parts: [
                { id: 'a', prompt: 'Given this timeline: (1) Hitler becomes Chancellor (Jan 1933), (2) Nuremberg Laws passed (Sep 1935), (3) Germany invades Netherlands (May 1940), (4) Frank.', answer: 'Anne receives diary: 12 June 1942 (between events 3 and 4)',
                  options: ['Anne receives diary: 12 June 1942 (between events 3 and 4)', 'because of the war'],
                  hint: 'Review c9_engl_ch5_2 (Resilience theme) and practice the 4-column timeline method with a simpler.',
                  misconception: 'Students believe the Holocaust began with mass killings in 1939 or 1941, and that Anne\'s family went into hiding "because of the war.".' }
          ],
            remediations: { 'the-holocaust-began-with-mass': { steps: ['Draw a 4-column timeline on paper: Year | German Event | Dutch Event | Frank Family Event.', 'Fill only these 6 verified points: 1933 Hitler Chancellor → Franks flee to Amsterdam; 1935 Nuremberg Laws; 1940 Germany.', 'Ask: "Which column explains WHY they hid in July 1942?" (Answer: Dutch Event column — call-up notice).', 'Practice writing one 3-sentence answer linking the call-up notice to the move into the annex.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Holocaust began with mass killings in 1939 or 1941, and that Anne\'s family went into hiding.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Anne Frank\'s diary is primarily a war document, not a teenager\'s personal diary." Defend your position with two specific examples.', answer: 'The statement is false',
                  options: ['The statement is false', 'because of the war'],
                  hint: 'Review c9_engl_ch5_2 (Resilience theme) and practice the 4-column timeline method with a simpler.',
                  misconception: 'Students believe the Holocaust began with mass killings in 1939 or 1941, and that Anne\'s family went into hiding "because of the war.".' },
                { id: 'b', prompt: 'Create a 3-event timeline for a fictional Jewish family in Amsterdam (1940–1942) that mirrors the Frank family\'s experience but changes ONE key decision (e.g.', answer: 'Timeline: (1) May 1940: Germany occupies Netherlands',
                  options: ['Timeline: (1) May 1940: Germany occupies Netherlands', 'because of the war'],
                  hint: 'Review c9_engl_ch5_2 (Resilience theme) and practice the 4-column timeline method with a simpler.',
                  misconception: 'Students believe the Holocaust began with mass killings in 1939 or 1941, and that Anne\'s family went into hiding "because of the war.".' }
          ],
            remediations: { 'the-holocaust-began-with-mass': { steps: ['Draw a 4-column timeline on paper: Year | German Event | Dutch Event | Frank Family Event.', 'Fill only these 6 verified points: 1933 Hitler Chancellor → Franks flee to Amsterdam; 1935 Nuremberg Laws; 1940 Germany.', 'Ask: "Which column explains WHY they hid in July 1942?" (Answer: Dutch Event column — call-up notice).', 'Practice writing one 3-sentence answer linking the call-up notice to the move into the annex.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_002', difficulty: 'standard',
          question: 'Anne Frank\'s diary, which she names "Kitty," functions as a trusted confidante.',
          hint: 'If stuck, review c9_engl_ch8_2 (epistolary form) and c7_engl_ch05_008 (letter as literary.',
          misconception: 'Students believe Kitty is merely a literary device — a cute name for a diary — and that Anne\'s "need to write" is just.',
          parts: [
                { id: 'a', prompt: 'In her own words, Anne writes "Paper has more patience than people." Explain what she means by this, using the context of her life in the Secret Annex.', answer: 'Anne means that unlike people',
                  options: ['Anne means that unlike people', 'paper doesn\'t talk back', 'need to write', 'diary as genre'],
                  hint: 'If stuck, review c9_engl_ch8_2 (epistolary form) and c7_engl_ch05_008 (letter as literary device).',
                  misconception: 'Students believe Kitty is merely a literary device — a cute name for a diary — and that Anne\'s "need to write" is just teenage dramatics.' },
                { id: 'b', prompt: 'Compare the opening of Anne\'s diary (June 12, 1942) with the opening of the mother\'s letter in Class 9\'s "A Mother\'s Letter to Her Daughter" (c9_engl_ch8_1).', answer: 'Anne addresses Kitty',
                  options: ['Anne addresses Kitty', 'both are personal', 'need to write', 'diary as genre'],
                  hint: 'If stuck, review c9_engl_ch8_2 (epistolary form) and c7_engl_ch05_008 (letter as literary device).',
                  misconception: 'Students believe Kitty is merely a literary device — a cute name for a diary — and that Anne\'s "need to write" is just teenage dramatics.' }
          ],
            remediations: { 'kitty-is-merely-a-literary': { steps: ['Have the student re-read only the June 12 and June 20 entries aloud, circling every pronoun addressing Kitty ("you,".', 'Ask: "If you crossed out every \'Dear Kitty\' and \'you,\' what happens to the text?" (It becomes a log.) 3.', 'Show a 2-minute clip from the 1995 documentary *Anne Frank Remembered* where Miep Gies says: "She wrote to stay sane.".', 'Assign a 3-sentence reflection: "One thing I would tell Kitty if I were Anne." This forces the shift from *observing*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_003', difficulty: 'standard',
          question: 'This topic examines Anne Frank\'s first day at school in Amsterdam as recorded.',
          hint: 'Review c9_engl_ch1_7 (First-Person Narrative Perspective) and c6_english_u1_002.',
          misconception: 'Students often think Anne\'s third essay poem is just a funny story about animals, missing that it\'s a deliberate.',
          parts: [
                { id: 'a', prompt: 'Anne writes her third essay as a poem about a father swan who bites his ducklings to death for quacking too much.', answer: 'Step 1: Recognise the poem format lets her be concise and witty',
                  options: ['Step 1: Recognise the poem format lets her be concise and witty', 'she liked poetry', 'your punishment is cruel'],
                  hint: 'Review c9_engl_ch1_7 (First-Person Narrative Perspective) and c6_english_u1_002 (Character.',
                  misconception: 'Students often think Anne\'s third essay poem is just a funny story about animals, missing that it\'s a deliberate allegory where the father.' }
          ],
            remediations: { 'anne-s-third-essay-poem': { steps: ['If a student misses the allegory: Step 1 — Reread the poem summary together, asking "Who has power?', 'What does \'quacking\' stand for?" Step 2 — Draw a two-column map: Swan/Teacher actions vs Duckling/Student actions.', 'Step 3 — Ask: "If Anne just wanted to be funny, why a swan killing its young?', 'Why not a joke about a parrot?" Step 4 — Connect to her later life: in hiding, she\'ll need to speak truth to power.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_004', difficulty: 'standard',
          question: 'Analyzing Anne\'s relationships with her classmates and Mr. Keesing involves.',
          hint: 'Review the specific diary entries dated 20 June 1942 (classmates, bet) and the subsequent.',
          misconception: 'Students often think Mr. Keesing is "mean" or "strict" throughout the chapter and that Anne\'s essays are mere.',
          parts: [
                { id: 'a', prompt: 'Compare Anne\'s relationship with her classmates to her relationship with Mr. Keesing. How does the power dynamic differ in each?', answer: 'With classmates, Anne is an equal participant',
                  options: ['With classmates, Anne is an equal participant', 'both are friendly', 'says "both are friendly" ignores the authority dynamic'],
                  hint: 'Review the specific diary entries dated 20 June 1942 (classmates, bet) and the subsequent entries.',
                  misconception: 'Students often think Mr. Keesing is "mean" or "strict" throughout the chapter and that Anne\'s essays are mere punishments she suffers.' }
          ],
            remediations: { 'mr': { steps: ['Re-read the three essay episodes side-by-side.', 'Highlight the titles and note the progression: descriptive → defensive → satirical poem.', 'Ask: "Who is the audience for each essay?', 'How does the tone change?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_005', difficulty: 'standard',
          question: 'Anne Frank\'s poem about the talking duck is a satirical verse she wrote as.',
          hint: 'Review c10_engl_cbse_04_004 (the three punishments) and Class 6 poetic devices.',
          misconception: 'Students often think the poem is *just* a funny story about animals and miss that it is a **coded protest** where Anne.',
          parts: [
                { id: 'a', prompt: 'What is the immediate reason Anne Frank writes the poem about the talking duck?', answer: 'Anne writes the poem as her third punishment assignment from Mr',
                  options: ['Anne writes the poem as her third punishment assignment from Mr', 'she wrote it for fun', 'it was a homework assignment unrelated to punishment'],
                  hint: 'Review c10_engl_cbse_04_004 (the three punishments) and Class 6 poetic devices (c6_english_u2_015).',
                  misconception: 'Students often think the poem is *just* a funny story about animals and miss that it is a **coded protest** where Anne casts herself as the.' },
                { id: 'b', prompt: 'In your own words, explain why the poem\'s ending — where the father swan bites the baby duck to death — is an example of irony.', answer: 'The ending is ironic',
                  options: ['The ending is ironic', 'it\'s sad', 'it\'s unexpected'],
                  hint: 'Review c10_engl_cbse_04_004 (the three punishments) and Class 6 poetic devices (c6_english_u2_015).',
                  misconception: 'Students often think the poem is *just* a funny story about animals and miss that it is a **coded protest** where Anne casts herself as the.' },
                { id: 'c', prompt: 'Compare the "talking duck" poem with Anne\'s first two punishment essays ("A Chatterbox" and "An Incorrigible Chatterbox").', answer: 'The first two essays are direct, reasoned arguments defending her talkativeness',
                  options: ['The first two essays are direct, reasoned arguments defending her talkativeness', 'they are all about talking'],
                  hint: 'Review c10_engl_cbse_04_004 (the three punishments) and Class 6 poetic devices (c6_english_u2_015).',
                  misconception: 'Students often think the poem is *just* a funny story about animals and miss that it is a **coded protest** where Anne casts herself as the.' }
          ],
            remediations: { 'the-poem-is-just-a': { steps: ['If a student gives the above misconception: 1) Re-read the three punishment entries in sequence (essay 1, essay 2.', '3) Ask: "If the swan = Keesing, what does the bite represent?" 4) Guide them to see the bite = the poem assignment.', '5) Have them rewrite one diary entry from Keesing\'s perspective to build empathy for both sides.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_006', difficulty: 'standard',
          question: 'The theme of resilience, hope, and the human spirit in adversity refers to the.',
          hint: 'If stuck, review the "Pink/Green Highlighter" method in ON_FAILURE on the entry dated 20.',
          misconception: 'Students believe "hope" in Anne\'s diary means she was *optimistic about the war ending soon*.',
          parts: [
                { id: 'a', prompt: 'APPLY: Below is a hypothetical diary entry written by a student during the COVID-19 lockdown: *"Day 45: The walls feel closer. Online classes are exhausting.', answer: 'Step 1: Identify adversity',
                  options: ['Step 1: Identify adversity', 'sparrow = hope', '"hope" in Anne\'s diary means she was *optimistic about the war ending soon*'],
                  hint: 'If stuck, review the "Pink/Green Highlighter" method in ON_FAILURE on the entry dated 20 June 1942.',
                  misconception: 'Students believe "hope" in Anne\'s diary means she was *optimistic about the war ending soon*.' },
                { id: 'b', prompt: 'ANALYZE: Compare how Anne Frank (in the prescribed entries) and Dr. Deepa Malik (Class 9, *Paralympics and Dr. Deepa Malik\'s Journey*) demonstrate resilience.', answer: 'the *source* of adversity, (',
                  options: ['the *source* of adversity, (', 'both are strong', '"hope" in Anne\'s diary means she was *optimistic about the war ending soon*'],
                  hint: 'If stuck, review the "Pink/Green Highlighter" method in ON_FAILURE on the entry dated 20 June 1942.',
                  misconception: 'Students believe "hope" in Anne\'s diary means she was *optimistic about the war ending soon*.' }
          ],
            remediations: { 'hope-in-anne-s-diary': { steps: ['Re-read *only* the three prescribed entries with a highlighter.', 'Count the alternations. Notice they *interleave* — hope doesn\'t come *after* despair; they coexist.', 'Write one PEEL paragraph using this structure: Point: "Anne\'s resilience is the coexistence of terror and wonder.".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
