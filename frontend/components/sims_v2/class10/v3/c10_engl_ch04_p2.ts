import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch04_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch04_p2: SimDef = {
    id: 'v3_c10_engl_ch04_p2',
    title: 'From the Diary of Anne Frank · Part 2/2',
    subtitle: 'Meet the girl who turned a notebook into a lifeline',
    classLevel: 10, subject: 'engl', topic: 'From the Diary of Anne Frank · Part 2/2',
    chapters: ['c10_engl_ch04'],
    nodeIds: ['c10_engl_cbse_04_007', 'c10_engl_cbse_04_008', 'c10_engl_cbse_04_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a historian reading a real-time document of the Holocaust', intro: 'Forbidden from trams, schools and park benches at thirteen, a girl in hiding names her diary and tells it everything she cannot tell a soul.', goal: 'Connect the diary to Holocaust history and explain Kitty as confidante, not literary device.' },
    discovery: {
        question: 'Anne Frank writes \'Dear Kitty\' instead of \'Dear Diary,\' and says \'paper has more patience than people.\' In a sealed-off annex, what is the diary actually doing for her?',
        options: ['It\'s a survival tool — writing builds her a confidante and a self that the Nazis were trying to erase', 'It\'s a teenage phase — she\'s just a normal lonely girl who wants a friend', 'It\'s homework — she planned to publish it as a book someday', 'It\'s evidence — she was recording Nazi crimes for a future trial'],
        answer: 'It\'s a survival tool — writing builds her a confidante and a self that the Nazis were trying to erase',
        hook: 'When a regime strips you of your school, your tram, your park bench — writing \'I still exist\' onto a page is not a hobby. It\'s resistance.',
    },
    teaching: [
        { title: 'Diary as a Literary Form: Features and Personal Voice', text: 'A diary as a literary form is a first-person, chronological record of personal experiences, thoughts, and feelings written in dated entries, characterised by an intimate, subjective voice that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Place a 13-year-old\'s diary inside its history — trace the laws that caged her life — then prove why \'lonely teenager\' is a one-mark answer, not a three-mark one.',
        labels: ['Diary as a Literary', 'The Holocaust and Its', 'Character Analysis: Anne\'s Personality'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_007', title: 'Diary as a Literary Form: Features and Personal Voice',
          caseStudy: { intro: 'Imagine you find an old notebook with dated pages, each beginning "Dear Diary" — you instantly know it\'s someone\'s private world captured in ink.',
            decisions: [{ prompt: 'What are the three essential structural features that distinguish a diary entry from a short story or a personal letter?', options: [
                { text: 'The three essential structural features are: (1) dated entries arranged chronologically,', outcome: 'The three essential structural features are: (1) dated entries arranged chronologically, (2).' },
                { text: 'plot, character, setting', outcome: 'Not quite — Students treat Anne\'s diary as a historical document first and a literary text second, writing.', reveals: 'students-treat-anne-s-diary' },
                { text: 'sender, receiver, address', outcome: 'Not quite — Students treat Anne\'s diary as a historical document first and a literary text second, writing.', reveals: 'students-treat-anne-s-diary' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_008', title: 'The Holocaust and Its Impact on Jewish Families: Historical Context',
          caseStudy: { intro: 'Imagine you are a 13-year-old girl in 1942 Amsterdam, handed a call-up notice ordering you to report to a "labor camp" — what would your family do?',
            decisions: [{ prompt: 'What were the Nuremberg Laws of 1935, and how did they legally define who was considered a Jew in Nazi Germany?', options: [
                { text: 'The Nuremberg Laws (1935) stripped Jews of German citizenship, prohibited', outcome: 'The Nuremberg Laws (1935) stripped Jews of German citizenship, prohibited marriage/relations.' },
                { text: 'laws that banned Jews from schools', outcome: 'Not quite — Students often believe the Holocaust "started" with mass killings in 1941–1942, overlooking the.', reveals: 'the-holocaust-started-with-mass' },
                { text: 'started', outcome: 'Not quite — Students often believe the Holocaust "started" with mass killings in 1941–1942, overlooking the.', reveals: 'the-holocaust-started-with-mass' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_009', title: 'Character Analysis: Anne\'s Personality and Maturity Beyond Her Age',
          caseStudy: { intro: 'Imagine you are writing a reference letter for Anne Frank for a "Young Resilience Award" — what specific moments from her diary would you quote to prove she.',
            decisions: [{ prompt: 'List three personality traits of Anne Frank that are evident in the prescribed diary entries, giving one brief example from the text for.', options: [
                { text: 'Correct answer: (1) Introspection/Self-awareness – e.g., her analysis of her own', outcome: 'Correct answer: (1) Introspection/Self-awareness – e.g., her analysis of her own talkativeness and.' },
                { text: 'brave, sad, happy', outcome: 'Not quite — Students equate "maturity" with "being serious/adult-like" and therefore miss that Anne\'s.', reveals: 'students-equate-maturity-with-being' },
                { text: 'brave, sad, happy" without textual anchors', outcome: 'Not quite — Students equate "maturity" with "being serious/adult-like" and therefore miss that Anne\'s.', reveals: 'students-equate-maturity-with-being' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student finishes Anne Frank\'s diary and says, \'Honestly, the family was safe in hiding — Anne complained a lot for someone who wasn\'t in a camp.\' His teacher asks him to rethink before writing his exam answer.',
            decisions: [{ prompt: 'What is wrong with the student\'s reading?', options: [
                { text: 'It ignores the lens every entry must be read through — the family hid because anti-Jewish decrees had already stripped their freedom, and discovery meant deportation. And calling Anne only a victim misses her agency: she studied, wrote, argued and planned a future inside two years of confinement. The diary records resistance by a mind, not just suffering by a body.', outcome: 'Reading her complaints without the historical context flattens the diary; \'safe\' hiding was really a shrinking cage under constant threat, and her writing itself was an act of defiance.' },
                { text: 'The student is right — since the family was never caught during the diary years, Anne\'s fears were exaggerated and her complaints immature.', outcome: 'The threat was real and eventually did find them; the diary\'s value is that it records, in real time, what persecution felt like before anyone knew how it would end.', reveals: 'hiding-meant-safety' },
                { text: 'The student is right because Anne\'s diary is just a teenage journal — it cannot be treated as evidence of anything larger.', outcome: 'Precisely because it is a real-time account without hindsight, it is a valuable historical source — it shows ordinary life under extraordinary persecution.', reveals: 'diary-is-just-journal' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_04_009', title: 'You made it',
          caseStudy: { intro: 'The Holocaust isn\'t background to the diary — it\'s the lens for every entry. Anne wrote in real time, not knowing the ending, which is exactly why we can\'t stop reading.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_007', difficulty: 'standard',
          question: 'A diary as a literary form is a first-person, chronological record of personal.',
          hint: 'Review "Epistolary Form" (c7_engl_ch05_008) and "First-Person Narration".',
          misconception: 'Students treat Anne\'s diary as a historical document first and a literary text second, writing answers that summarise.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A diary as a literary form is a first-person, chronological record of personal',
                  options: ['A diary as a literary form is a first-person, chronological record of personal', 'The historical context of Anne Frank\'s diary refers to the systematic persecution and', 'Anne Frank\'s diary', 'This topic examines Anne Frank\'s first day at school in Amsterdam as recorded in her'],
                  hint: 'Review "Epistolary Form" (c7_engl_ch05_008) and "First-Person Narration" (c7_engl_ch03_008).',
                  misconception: 'Students treat Anne\'s diary as a historical document first and a literary text second, writing answers that summarise World War II events.' }
          ],
            remediations: { 'students-treat-anne-s-diary': { steps: ['Show the student two texts — a history textbook paragraph on the annex and Anne\'s 9 July 1942 entry — ask them.', 'Have them rewrite the textbook paragraph as a diary entry using "Dear Kitty," fragmented thoughts, and one metaphor.', 'Compare both versions; explicitly label the literary devices (apostrophe, ellipsis, metaphor) that create voice.', 'Practice one board-style question: "How does the diary form allow Anne to convey fear without naming it?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_008', difficulty: 'standard',
          question: 'The Holocaust refers to the systematic, state-sponsored persecution and murder.',
          hint: 'Review the Class 10 History chapter "Nazism and the Rise of Hitler" — specifically the.',
          misconception: 'Students often believe the Holocaust "started" with mass killings in 1941–1942, overlooking the 1933–1939 legal.',
          parts: [
                { id: 'a', prompt: 'What were the Nuremberg Laws of 1935, and how did they legally define who was considered a Jew in Nazi Germany?', answer: 'The Nuremberg Laws (1935) stripped Jews of German citizenship, prohibited',
                  options: ['The Nuremberg Laws (1935) stripped Jews of German citizenship, prohibited', 'laws that banned Jews from schools', 'started'],
                  hint: 'Review the Class 10 History chapter "Nazism and the Rise of Hitler" — specifically the section.',
                  misconception: 'Students often believe the Holocaust "started" with mass killings in 1941–1942, overlooking the 1933–1939 legal persecution (Nuremberg.' },
                { id: 'b', prompt: 'Explain in your own words why the Frank family moved from Germany to Amsterdam in 1933, and how this relocation initially gave them a false sense of security.', answer: 'The Franks fled Germany after Hitler became Chancellor in 1933',
                  options: ['The Franks fled Germany after Hitler became Chancellor in 1933', 'they moved for business', 'started'],
                  hint: 'Review the Class 10 History chapter "Nazism and the Rise of Hitler" — specifically the section.',
                  misconception: 'Students often believe the Holocaust "started" with mass killings in 1941–1942, overlooking the 1933–1939 legal persecution (Nuremberg.' },
                { id: 'c', prompt: 'Using the diary entry dated 20 June 1942, identify three specific anti-Jewish decrees Anne lists and match each to its real-world historical purpose (e.g.', answer: 'Anne lists: (1) Yellow Star',
                  options: ['Anne lists: (1) Yellow Star', 'started'],
                  hint: 'Review the Class 10 History chapter "Nazism and the Rise of Hitler" — specifically the section.',
                  misconception: 'Students often believe the Holocaust "started" with mass killings in 1941–1942, overlooking the 1933–1939 legal persecution (Nuremberg.' }
          ],
            remediations: { 'the-holocaust-started-with-mass': { steps: ['Create a two-column timeline: left column = Nazi laws/decrees (1933–1944), right column = corresponding diary entry.', 'Highlight three stages: legal exclusion (1933–1939), ghettoization/segregation (1940–1941), deportation/hiding.', 'Practice writing one PEEL paragraph linking a specific law (e.g., "Jews must surrender bicycles, 1942") to Anne\'s.', 'Use the CBSE sample paper\'s case-based question on "Anne\'s list of decrees" as a template.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Holocaust "started" with mass killings in 1941–1942, overlooking the 1933–1939 legal.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Anne Frank\'s diary is primarily a coming-of-age story; the Holocaust is merely the setting." Defend or refute using three pieces.', answer: 'Refute',
                  options: ['Refute', 'started'],
                  hint: 'Review the Class 10 History chapter "Nazism and the Rise of Hitler" — specifically the section.',
                  misconception: 'Students often believe the Holocaust "started" with mass killings in 1941–1942, overlooking the 1933–1939 legal persecution (Nuremberg.' }
          ],
            remediations: { 'the-holocaust-started-with-mass': { steps: ['Create a two-column timeline: left column = Nazi laws/decrees (1933–1944), right column = corresponding diary entry.', 'Highlight three stages: legal exclusion (1933–1939), ghettoization/segregation (1940–1941), deportation/hiding.', 'Practice writing one PEEL paragraph linking a specific law (e.g., "Jews must surrender bicycles, 1942") to Anne\'s.', 'Use the CBSE sample paper\'s case-based question on "Anne\'s list of decrees" as a template.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_04_009', difficulty: 'standard',
          question: 'From \'English chapter c10_engl_cbse_04\': the skill or concept this node.',
          hint: 'Review the PEEL paragraph structure from Class 9 (c9_engl_ch1_5 writing component) and.',
          misconception: 'Students equate "maturity" with "being serious/adult-like" and therefore miss that Anne\'s playfulness, sarcasm, mood.',
          parts: [
                { id: 'a', prompt: 'List three personality traits of Anne Frank that are evident in the prescribed diary entries, giving one brief example from the text for each.', answer: 'Correct answer: (1) Introspection/Self-awareness – e.g., her analysis of her own',
                  options: ['Correct answer: (1) Introspection/Self-awareness – e.g., her analysis of her own', 'brave, sad, happy', 'brave, sad, happy" without textual anchors'],
                  hint: 'Review the PEEL paragraph structure from Class 9 (c9_engl_ch1_5 writing component) and re-read the.',
                  misconception: 'Students equate "maturity" with "being serious/adult-like" and therefore miss that Anne\'s playfulness, sarcasm, mood swings, and conflicts.' }
          ],
            remediations: { 'students-equate-maturity-with-being': { steps: ['If a student writes "Anne is mature because she is serious," do this 3-step fix: (1) Have them re-read the duck poem.', '(3) Co-write a PEEL paragraph: Point: Anne\'s maturity includes humour.', 'Explanation: She uses wit to reclaim power.', 'Link: This emotional regulation is maturity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
