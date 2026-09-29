import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch06_p3: SimDef = {
    id: 'v3_c11_eng_w_ch06_p3',
    title: 'The Third and Final Continent (Short Story) · Part 3/3',
    subtitle: 'See a moon landing become the handshake between an old Yankee and a new immigrant.',
    classLevel: 11, subject: 'eng_w', topic: 'The Third and Final Continent (Short Story) · Part 3/3',
    chapters: ['c11_eng_w_ch06'],
    nodeIds: ['c11_eng_w_cbse_06_013', 'c11_eng_w_cbse_06_014', 'c11_eng_w_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an immigrant measuring three continents of displacement', intro: 'Calcutta to a London boarding house to a Boston room with a centenarian landlady — the rent was inconceivable; so was staying.', goal: 'Read the three-continent structure as cumulative growth and evaluate the circular frame.' },
    discovery: {
        question: 'The story is set in 1969 — is the moon landing just a date stamp for flavour?',
        options: ['No — it\'s a structural engine: Mrs. Croft\'s nightly \'Splendid!\' ritual over the flag becomes the bridge between a 103-year-old widow and a new immigrant', 'Yes — it only fixes the year for exam purposes', 'No — but only because Lahiri herself watched it', 'Yes — it\'s a metaphor with no function in the plot'],
        answer: 'No — it\'s a structural engine: Mrs. Croft\'s nightly \'Splendid!\' ritual over the flag becomes the bridge between a 103-year-old widow and a new immigrant',
        hook: 'The narrator isn\'t Lahiri, and the moon isn\'t trivia — both are deliberate architecture: a flag on the moon lets two strangers share a country.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Third and Final Continent\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_06_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Order India, London and Boston as one continuous preparation — then place the climax where the narrator\'s two worlds finally meet over \'Splendid!\'',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Third and Final Continent\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Define the term "narrative perspective" as it applies to "The Third and Final Continent" and state its effect on the reader\'s access.', options: [
                { text: 'The story uses a first-person retrospective narrative perspective (the narrator looking', outcome: 'The story uses a first-person retrospective narrative perspective (the narrator looking back).' },
                { text: 'omniscient narrator', outcome: 'Not quite — Students often confuse "critical analysis" with "listing literary devices." They identify.', reveals: 'students-often-confuse-critical-analysis' },
                { text: 'critical analysis', outcome: 'Not quite — Students often confuse "critical analysis" with "listing literary devices." They identify.', reveals: 'students-often-confuse-critical-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Third and Final Continent\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the standard format of a diary entry as per CBSE Class 11 guidelines?', options: [
                { text: 'A diary entry includes the date, day, and optionally time', outcome: 'A diary entry includes the date, day, and optionally time; a salutation such as "Dear Diary".' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students often think "writing skills based on the chapter" means retelling the story in their own.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Third and Final Continent\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the three discussion topics listed under "TALKING ABOUT THE TEXT" in the NCERT textbook for this chapter?', options: [
                { text: 'The three topics are: (1) Living abroad is challenging in many ways', outcome: 'The three topics are: (1) Living abroad is challenging in many ways.' },
                { text: 'good discussion', outcome: 'Not quite — Students believe a "good discussion" means everyone agrees politely.', reveals: 'a-good-discussion-means-everyone' },
                { text: 'comprehension questions or appreciation prompts', outcome: 'Not quite — Students believe a "good discussion" means everyone agrees politely.', reveals: 'a-good-discussion-means-everyone' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a \'migration narratives\' exhibit your class curates \'The Third and Final Continent\'. A volunteer writes the placard: \'A man moves from India to London to America — a travel story about three addresses, ending happily.\'',
            decisions: [{ prompt: 'What does the placard flatten?', options: [
                { text: 'The diasporic arc: 1969 anchors it — the same week a Bengali immigrant watches a century-old landlady\'s ordinary rigor while men walk on the moon; personal settlement and epochal change are deliberately interleaved. It\'s about learning to belong across three continents — arranged marriage ripening into love — not a checklist of cities.', outcome: 'Lahiri braids the mundane and the monumental; reading it as travelogue misses how small domestic rituals carry the weight of historic transition.' },
                { text: 'The placard is fine — the title literally counts continents, so it\'s a journey story.', outcome: 'The \'third and final\' is about settlement and belonging, not itinerary — the moon landing is juxtaposed to frame a private milestone as epochal.', reveals: 'continents-are-just-stops' },
                { text: 'It\'s mainly about the landlady\'s eccentricity — a comic character sketch.', outcome: 'Mrs Croft\'s stern rituals matter as the immigrant\'s first American curriculum — her eccentricity teaches belonging; she\'s instrument, not subject.', reveals: 'landlady-is-the-subject' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'Three continents aren\'t three stories — each one trains him for the next, and the last frame drives his son past the street where America began for him.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Third and Final Continent\' — analysing the text.',
          hint: 'If stuck, review c11_eng_w_cbse_06_012 (Comprehension) for inferential question practice.',
          misconception: 'Students often confuse "critical analysis" with "listing literary devices." They identify a metaphor (e.g., "the flag.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "dramatic irony" to the scene where Mrs. Croft insists the narrator say "splendid" about the flag on the moon, even though the astronauts.', answer: 'The reader knows the flag was taken down, but Mrs',
                  options: ['The reader knows the flag was taken down, but Mrs', 'critical analysis', 'listing literary devices', 'the flag on the moon'],
                  hint: 'If stuck, review c11_eng_w_cbse_06_012 (Comprehension) for inferential question practice, then.',
                  misconception: 'Students often confuse "critical analysis" with "listing literary devices." They identify a metaphor (e.g., "the flag on the moon") and.' },
                { id: 'b', prompt: 'Analyze how the three continents (India, England, America) function as structural markers for the narrator\'s evolving identity.', answer: 'India: "ten dollars to my name"',
                  options: ['India: "ten dollars to my name"', 'critical analysis', 'listing literary devices', 'the flag on the moon'],
                  hint: 'If stuck, review c11_eng_w_cbse_06_012 (Comprehension) for inferential question practice, then.',
                  misconception: 'Students often confuse "critical analysis" with "listing literary devices." They identify a metaphor (e.g., "the flag on the moon") and.' }
          ],
            remediations: { 'students-often-confuse-critical-analysis': { steps: ['If a student\'s analysis remains at the device-identification level, intervene with a three-step scaffold: (1) Ask "What.', 'Croft forces the narrator to rehearse nightly." (2) Provide a two-column template: Column A = Device/Detail, Column.', '(3) Require the student to rewrite one analytical paragraph using the template, then peer-review using the rubric.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "critical analysis" with "listing literary devices." They identify a metaphor (e.g., "the flag.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of Lahiri\'s use of gentle humour (e.g., the "flask/thermos" confusion, the "piper/paper" misunderstanding) in conveying the.', answer: 'The humour enhances emotional gravity by humanizing the narrator',
                  options: ['The humour enhances emotional gravity by humanizing the narrator', 'lightens the mood', 'distracts from serious themes', 'critical analysis'],
                  hint: 'If stuck, review c11_eng_w_cbse_06_012 (Comprehension) for inferential question practice, then.',
                  misconception: 'Students often confuse "critical analysis" with "listing literary devices." They identify a metaphor (e.g., "the flag on the moon") and.' }
          ],
            remediations: { 'students-often-confuse-critical-analysis': { steps: ['If a student\'s analysis remains at the device-identification level, intervene with a three-step scaffold: (1) Ask "What.', 'Croft forces the narrator to rehearse nightly." (2) Provide a two-column template: Column A = Device/Detail, Column.', '(3) Require the student to rewrite one analytical paragraph using the template, then peer-review using the rubric.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_014', difficulty: 'standard',
          question: 'Writing skills from \'The Third and Final Continent\' — using the text as a model.',
          hint: 'If stuck, review c11_eng_w_cbse_06_012 (Comprehension) for evidence location and.',
          misconception: 'Students often think "writing skills based on the chapter" means retelling the story in their own words.',
          parts: [
                { id: 'a', prompt: 'What is the standard format of a diary entry as per CBSE Class 11 guidelines?', answer: 'A diary entry includes the date, day, and optionally time',
                  options: ['A diary entry includes the date, day, and optionally time', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_w_cbse_06_012 (Comprehension) for evidence location and.',
                  misconception: 'Students often think "writing skills based on the chapter" means retelling the story in their own words.' },
                { id: 'b', prompt: 'Explain why a character sketch of Mrs Croft should not merely list her physical description but also include her speech, actions, and the narrator\'s evolving.', answer: 'A character sketch requires analysis of traits revealed through multiple textual',
                  options: ['A character sketch requires analysis of traits revealed through multiple textual', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_w_cbse_06_012 (Comprehension) for evidence location and.',
                  misconception: 'Students often think "writing skills based on the chapter" means retelling the story in their own words.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Show a side-by-side comparison: a summary vs.', 'a character sketch of Mrs Croft.', 'Highlight the difference: summary narrates events; sketch analyses traits with evidence.', 'Give a template for character sketch: Introduction (role), Physical Description, Personality Traits (with evidence).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_015', difficulty: 'standard',
          question: 'Discussion points on \'The Third and Final Continent\' — speaking and listening.',
          hint: 'If stuck, review c11_eng_w_cbse_06_012 (comprehension questions) and.',
          misconception: 'Students believe a "good discussion" means everyone agrees politely.',
          parts: [
                { id: 'a', prompt: 'What are the three discussion topics listed under "TALKING ABOUT THE TEXT" in the NCERT textbook for this chapter?', answer: 'The three topics are: (1) Living abroad is challenging in many ways',
                  options: ['The three topics are: (1) Living abroad is challenging in many ways', 'good discussion', 'comprehension questions or appreciation prompts', 'a "good discussion" means everyone agrees politely'],
                  hint: 'If stuck, review c11_eng_w_cbse_06_012 (comprehension questions) and c11_eng_w_cbse_06_013.',
                  misconception: 'Students believe a "good discussion" means everyone agrees politely.' },
                { id: 'b', prompt: 'Explain in your own words why the prompt "The eccentricities of the old are often endearing" is an evaluation-level discussion topic rather than a simple.', answer: 'This prompt requires judging Mrs',
                  options: ['This prompt requires judging Mrs', 'She made him say splendid', 'endearing', 'good discussion'],
                  hint: 'If stuck, review c11_eng_w_cbse_06_012 (comprehension questions) and c11_eng_w_cbse_06_013.',
                  misconception: 'Students believe a "good discussion" means everyone agrees politely.' },
                { id: 'c', prompt: 'During a group discussion on "Living abroad is challenging," a peer says: "The narrator adjusted easily because he got a job at MIT and rented a room quickly.".', answer: 'A strong response: "I agree he secured practical basics fast',
                  options: ['A strong response: "I agree he secured practical basics fast', 'good discussion', 'a "good discussion" means everyone agrees politely'],
                  hint: 'If stuck, review c11_eng_w_cbse_06_012 (comprehension questions) and c11_eng_w_cbse_06_013.',
                  misconception: 'Students believe a "good discussion" means everyone agrees politely.' },
                { id: 'd', prompt: 'Compare how the narrator\'s relationship with Mrs. Croft evolves versus his relationship with Mala.', answer: 'Parallel: Both relationships begin with prescribed rituals (Mrs',
                  options: ['Parallel: Both relationships begin with prescribed rituals (Mrs', 'good discussion', 'a "good discussion" means everyone agrees politely'],
                  hint: 'If stuck, review c11_eng_w_cbse_06_012 (comprehension questions) and c11_eng_w_cbse_06_013.',
                  misconception: 'Students believe a "good discussion" means everyone agrees politely.' }
          ],
            remediations: { 'a-good-discussion-means-everyone': { steps: ['If a student equates discussion with agreement: (1) Assign the "Devil\'s Advocate" role — they must argue against their.', '(2) Provide a "Disagreement Stem" card: "The text suggests X, but I see Y because..." (3) Model a 3-minute fishbowl.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
